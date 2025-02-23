import PropTypes from 'prop-types';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { debounce } from "lodash"
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js"

import { cn } from '../../../lib/utils';

import SVGPathCommander from 'svg-path-commander';

// Function to convert SVG path "d" to vertices
function parsePathToVertices(path, sampleLength = 15) {
  const commander = new SVGPathCommander(path);
  const points = [];
  let lastPoint = null;
  const totalLength = commander.getTotalLength();
  let length = 0;

  while (length < totalLength) {
    const point = commander.getPointAtLength(length);
    if (!lastPoint || point.x !== lastPoint.x || point.y !== lastPoint.y) {
      points.push({ x: point.x, y: point.y });
      lastPoint = point;
    }
    length += sampleLength;
  }

  const finalPoint = commander.getPointAtLength(totalLength);
  if (lastPoint && (finalPoint.x !== lastPoint.x || finalPoint.y !== lastPoint.y)) {
    points.push({ x: finalPoint.x, y: finalPoint.y });
  }

  return points;
}

function calculatePosition(value, containerSize, elementSize) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100;
    return containerSize * percentage;
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2;
}

const GravityContext = createContext(null);

const MatterBody = forwardRef(({
  children,
  className,
  matterBodyOptions = {
    friction: 0.1,
    restitution: 0.1,
    density: 0.001,
    isStatic: false,
    frictionAir: 0.001, // Add air friction
    collisionFilter: {
      category: 0x0001,
      mask: 0xFFFFFFFF,
      group: 0
    }
  },
  bodyType = "rectangle",
  isDraggable = true,
  sampleLength = 15,
  x = 0,
  y = 0,
  angle = 0,
  scale = 1, // Add scale option
  velocity = { x: 0, y: 0 }, // Add initial velocity
  angularVelocity = 0, // Add rotation speed
  ...props
}, ref) => {
  const elementRef = useRef(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.registerElement(idRef.current, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      sampleLength,
      isDraggable,
      x,
      y,
      angle,
      scale,
      velocity,
      angularVelocity,
      ...props,
    })

    return () => context.unregisterElement(idRef.current)
  }, [props, children, matterBodyOptions, isDraggable])

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute",
        className,
        isDraggable && "pointer-events-none"
      )}
    >
      {children}
    </div>
  )
});

// Add this at the top level outside any component
const engineInstance = Engine.create();
const bodiesMapInstance = new Map();

// Modify the Gravity component
const Gravity = forwardRef(({
  children,
  debug = false,
  gravity = { x: 0, y: 1 },
  grabCursor = true,
  resetOnResize = true,
  addTopWall = true,
  autoStart = true,
  className,
  ...props
}, ref) => {
  const canvas = useRef(null);
  const render = useRef();
  const runner = useRef();
  const frameId = useRef();
  const mouseConstraint = useRef();
  const mouseDown = useRef(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const isRunning = useRef(false);

  // Use singleton engine and bodiesMap
  const engine = useRef(engineInstance);
  const bodiesMap = useRef(bodiesMapInstance);

  // Register Matter.js body in the physics world
  const registerElement = useCallback(
    (id, element, props) => {
      if (!canvas.current) return
      const width = element.offsetWidth * (props.scale || 1)
      const height = element.offsetHeight * (props.scale || 1)
      const canvasRect = canvas.current.getBoundingClientRect()

      const angle = (props.angle || 0) * (Math.PI / 180)

      const x = calculatePosition(props.x, canvasRect.width, width)
      const y = calculatePosition(props.y, canvasRect.height, height)

      let body
      if (props.bodyType === "circle") {
        const radius = Math.max(width, height) / 2
        body = Bodies.circle(x, y, radius, {
          ...props.matterBodyOptions,
          angle: angle,
          render: {
            fillStyle: debug ? "#888888" : "#00000000",
            strokeStyle: debug ? "#333333" : "#00000000",
            lineWidth: debug ? 3 : 0,
          },
        })
      } else if (props.bodyType === "svg") {
        const paths = element.querySelectorAll("path")
        const vertexSets = []

        paths.forEach((path) => {
          const d = path.getAttribute("d")
          const p = parsePathToVertices(d, props.sampleLength)
          // Apply scale to vertices
          const scaledVertices = p.map(vertex => ({
            x: vertex.x * props.scale,
            y: vertex.y * props.scale
          }))
          vertexSets.push(scaledVertices)
        })

        body = Bodies.fromVertices(x, y, vertexSets, props.matterBodyOptions)
      } else {
        body = Bodies.rectangle(x, y, width, height, {
          ...props.matterBodyOptions,
          angle: angle,
          render: {
            fillStyle: debug ? "#888888" : "#00000000",
            strokeStyle: debug ? "#333333" : "#00000000",
            lineWidth: debug ? 3 : 0,
          },
        })
      }

      if (body) {
        // Apply initial velocities
        Matter.Body.setVelocity(body, props.velocity)
        Matter.Body.setAngularVelocity(body, props.angularVelocity * (Math.PI / 180))
        
        World.add(engine.current.world, [body])
        bodiesMap.current.set(id, { element, body, props })
      }
    },
    [debug]
  )

  // Unregister Matter.js body from the physics world
  const unregisterElement = useCallback((id) => {
    const body = bodiesMap.current.get(id)
    if (body) {
      World.remove(engine.current.world, body.body)
      bodiesMap.current.delete(id)
    }
  }, [])

  // Keep react elements in sync with the physics world
  const updateElements = useCallback(() => {
    bodiesMap.current.forEach(({ element, body }) => {
      const { x, y } = body.position
      const rotation = body.angle * (180 / Math.PI)

      element.style.transform = `translate(${
        x - element.offsetWidth / 2
      }px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`
    })

    frameId.current = requestAnimationFrame(updateElements)
  }, [])

  const initializeRenderer = useCallback(() => {
    if (!canvas.current) return

    const height = canvas.current.offsetHeight
    const width = canvas.current.offsetWidth

    Common.setDecomp(require("poly-decomp"))

    engine.current.gravity.x = gravity.x
    engine.current.gravity.y = gravity.y

    render.current = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        width,
        height,
        wireframes: false,
        background: "#00000000",
      },
    })

    const mouse = Mouse.create(render.current.canvas)
    mouseConstraint.current = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: debug,
        },
      },
    })

    // Add walls
    const walls = [
      // Floor
      Bodies.rectangle(width / 2, height + 10, width, 20, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }),

      // Right wall
      Bodies.rectangle(width + 10, height / 2, 20, height, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }),

      // Left wall
      Bodies.rectangle(-10, height / 2, 20, height, {
        isStatic: true,
        friction: 1,
        render: {
          visible: debug,
        },
      }),
    ]

    const topWall = addTopWall
      ? Bodies.rectangle(width / 2, -10, width, 20, {
          isStatic: true,
          friction: 1,
          render: {
            visible: debug,
          },
        })
      : null

    if (topWall) {
      walls.push(topWall)
    }

    const touchingMouse = () =>
      Query.point(
        engine.current.world.bodies,
        mouseConstraint.current?.mouse.position || { x: 0, y: 0 }
      ).length > 0

    if (grabCursor) {
      Events.on(engine.current, "beforeUpdate", (event) => {
        if (canvas.current) {
          if (!mouseDown.current && !touchingMouse()) {
            canvas.current.style.cursor = "default"
          } else if (touchingMouse()) {
            canvas.current.style.cursor = mouseDown.current
              ? "grabbing"
              : "grab"
          }
        }
      })

      canvas.current.addEventListener("mousedown", (event) => {
        mouseDown.current = true

        if (canvas.current) {
          if (touchingMouse()) {
            canvas.current.style.cursor = "grabbing"
          } else {
            canvas.current.style.cursor = "default"
          }
        }
      })
      canvas.current.addEventListener("mouseup", (event) => {
        mouseDown.current = false

        if (canvas.current) {
          if (touchingMouse()) {
            canvas.current.style.cursor = "grab"
          } else {
            canvas.current.style.cursor = "default"
          }
        }
      })
    }

    World.add(engine.current.world, [mouseConstraint.current, ...walls])

    render.current.mouse = mouse

    runner.current = Runner.create()
    Render.run(render.current)
    updateElements()
    runner.current.enabled = false

    if (autoStart) {
      runner.current.enabled = true
      startEngine()
    }
  }, [updateElements, debug, autoStart])

  // Clear the Matter.js world
  const clearRenderer = useCallback(() => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current)
    }

    if (mouseConstraint.current) {
      World.remove(engine.current.world, mouseConstraint.current)
    }

    if (render.current) {
      Mouse.clearSourceEvents(render.current.mouse)
      Render.stop(render.current)
      render.current.canvas.remove()
    }

    if (runner.current) {
      Runner.stop(runner.current)
    }

    if (engine.current) {
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
    }

    bodiesMap.current.clear()
  }, [])

  const handleResize = useCallback(() => {
    if (!canvas.current || !resetOnResize) return

    const newWidth = canvas.current.offsetWidth
    const newHeight = canvas.current.offsetHeight

    setCanvasSize({ width: newWidth, height: newHeight })

    // Clear and reinitialize
    clearRenderer()
    initializeRenderer()
  }, [clearRenderer, initializeRenderer, resetOnResize])

  const startEngine = useCallback(() => {
    if (runner.current) {
      runner.current.enabled = true

      Runner.run(runner.current, engine.current)
    }
    if (render.current) {
      Render.run(render.current)
    }
    frameId.current = requestAnimationFrame(updateElements)
    isRunning.current = true
  }, [updateElements, canvasSize])

  const stopEngine = useCallback(() => {
    if (!isRunning.current) return

    if (runner.current) {
      Runner.stop(runner.current)
    }
    if (render.current) {
      Render.stop(render.current)
    }
    if (frameId.current) {
      cancelAnimationFrame(frameId.current)
    }
    isRunning.current = false
  }, [])

  const reset = useCallback(() => {
    stopEngine()
    bodiesMap.current.forEach(({ element, body, props }) => {
      body.angle = props.angle || 0

      const x = calculatePosition(
        props.x,
        canvasSize.width,
        element.offsetWidth
      )
      const y = calculatePosition(
        props.y,
        canvasSize.height,
        element.offsetHeight
      )
      body.position.x = x
      body.position.y = y
    })
    updateElements()
    handleResize()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      start: startEngine,
      stop: stopEngine,
      reset,
    }),
    [startEngine, stopEngine]
  )

  useEffect(() => {
    if (!resetOnResize) return

    const debouncedResize = debounce(handleResize, 500)
    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      debouncedResize.cancel()
    }
  }, [handleResize, resetOnResize])

  useEffect(() => {
    initializeRenderer()
    return clearRenderer
  }, [initializeRenderer, clearRenderer])

  useEffect(() => {
    // Cleanup function
    return () => {
      if (isRunning.current) {
        stopEngine();
      }
      clearRenderer();
    };
  }, []);

  return (
    <GravityContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={canvas}
        className={cn(className, "absolute top-0 left-0 w-full h-full")}
        {...props}
      >
        {children}
      </div>
    </GravityContext.Provider>
  )
});

// PropTypes definitions
MatterBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  matterBodyOptions: PropTypes.shape({
    friction: PropTypes.number,
    restitution: PropTypes.number,
    density: PropTypes.number,
    isStatic: PropTypes.bool,
    frictionAir: PropTypes.number, // Add air friction
    collisionFilter: PropTypes.shape({
      category: PropTypes.number,
      mask: PropTypes.number,
      group: PropTypes.number
    })
  }),
  bodyType: PropTypes.oneOf(["rectangle", "circle", "svg"]),
  isDraggable: PropTypes.bool,
  sampleLength: PropTypes.number,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  angle: PropTypes.number,
  scale: PropTypes.number, // Add scale option
  velocity: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }), // Add initial velocity
  angularVelocity: PropTypes.number, // Add rotation speed
};

Gravity.propTypes = {
  children: PropTypes.node.isRequired,
  debug: PropTypes.bool,
  gravity: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  grabCursor: PropTypes.bool,
  resetOnResize: PropTypes.bool,
  addTopWall: PropTypes.bool,
  autoStart: PropTypes.bool,
  className: PropTypes.string,
};

// Display names for React DevTools
MatterBody.displayName = "MatterBody";
Gravity.displayName = "Gravity";

export { Gravity, MatterBody };
