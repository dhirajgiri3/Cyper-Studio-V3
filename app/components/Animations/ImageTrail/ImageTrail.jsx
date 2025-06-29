"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import {
  throttleFrame,
  isReducedMotion,
} from "../../Buttons/utils/performanceUtils.js";

// Enhanced styled components with more visually appealing defaults and hardware acceleration
const ImageTrailWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  transform: translateZ(0);
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.$size || 230}px;
  aspect-ratio: ${(props) => props.$aspectRatio || 1.2};
  border-radius: ${(props) => (props.$rounded ? "50%" : "7px")};
  opacity: 0;
  overflow: hidden;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: ${(props) => props.$shadow || "0 10px 25px rgba(0, 0, 0, 0.15)"};
  transform-origin: center;
`;

const ImageInner = styled.div`
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-size: cover;
  background-position: center;
  position: absolute;
  top: -10px;
  left: -10px;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  filter: ${(props) => props.$filter || "none"};
`;

// Enhanced helper functions
const lerp = (a, b, n) => (1 - n) * a + n * b;
const random = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(random(min, max + 1));
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * Enhanced ImageTrail component that creates a beautiful trail of images following the mouse
 * @param {Object} props - Component props
 * @param {React.RefObject} props.containerRef - Reference to the parent container element
 * @param {string} props.className - Additional CSS classes for the wrapper
 * @param {Array} props.images - Array of image paths to use in the trail
 * @param {Object} props.options - Configuration options for the trail
 * @returns {JSX.Element} - Rendered component
 */
const ImageTrail = ({
  containerRef = null,
  className = "",
  images: providedImages = null,
  options = {},
}) => {
  // Default configuration with more advanced options that can be overridden with props
  const config = useMemo(
    () => ({
      // Core settings
      imageSize: options.imageSize || 230,
      aspectRatio: options.aspectRatio || 1.2,
      threshold: options.threshold,
      maxConcurrentAnimations: options.maxConcurrentAnimations || 3,
      animationDuration: options.animationDuration || 1,
      fadeOutDuration: options.fadeOutDuration || 0.4,
      flyOutDistance: options.flyOutDistance || 120,

      // Visual effects
      scaleRange: options.scaleRange || [0.2, 1],
      rotationVariance: options.rotationVariance || 20,
      isRounded: options.rounded || false,
      useFilters: options.useFilters !== false,
      enableParallax: options.enableParallax !== false,
      useBlendMode: options.blendMode || null,
      colorVariations: options.colorVariations || false,
      mirrorEffect: options.mirrorEffect || false,

      // Advanced settings
      shadowIntensity: options.shadowIntensity || 1,
      easingIn: options.easingIn || "back.out(1.7)",
      easingOut: options.easingOut || "power2.inOut",
      adaptiveThreshold: options.adaptiveThreshold !== false,
      imageVariety: options.imageVariety || "sequential", // "sequential", "random", "paired"
      optimizeForMobile: options.optimizeForMobile !== false,
      resizeDebounce: options.resizeDebounce || 250,

      // Special effects
      glowEffect: options.glowEffect || false,
      trailDensity: clamp(options.trailDensity || 1, 0.2, 2),
      depthEffect: options.depthEffect || false,
      initialRotation: options.initialRotation || [0, 0],
    }),
    [options]
  );

  // State and refs
  const imageTrailRef = useRef(Array(10).fill(null)); // Initialize with 10 null elements
  const wrapperRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const cacheMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const zIndexValRef = useRef(1);
  const lastAngleRef = useRef(0);
  const animationFrameRef = useRef(null);
  const activeAnimationsRef = useRef(0);
  const isRunningRef = useRef(false);
  const isMouseInContainerRef = useRef(false);
  const mouseSpeedRef = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const containerDimensionsRef = useRef({ width: 0, height: 0 });
  const animationQueueRef = useRef([]);
  const isTouchDeviceRef = useRef(false);

  // Default images if not provided via props
  const [images] = useState(
    providedImages || [
      "/Assets/Image/Trlimg/1.jpg",
      "/Assets/Image/Trlimg/3.jpg",
      "/Assets/Image/Trlimg/5.jpg",
      "/Assets/Image/Trlimg/7.jpg",
      "/Assets/Image/Trlimg/9.jpg",
      "/Assets/Image/Trlimg/11.jpg",
      "/Assets/Image/Trlimg/13.jpg",
      "/Assets/Image/Trlimg/15.jpg",
      "/Assets/Image/Trlimg/17.jpg",
      "/Assets/Image/Trlimg/19.jpg",
    ]
  );

  // Create enhanced image effects and variations
  const [imageEffects] = useState(() =>
    images.map(() => ({
      // Visual filters
      filter: config.useFilters
        ? `hue-rotate(${random(-30, 30)}deg) brightness(${random(
            0.9,
            1.1
          )}) contrast(${random(0.95, 1.05)})`
        : "none",

      // Scale variations for more natural feel
      scaleAdjust: random(0.85, 1.15),

      // Positional offsets for more organic movement
      offset: {
        x: random(-15, 15),
        y: random(-15, 15),
      },

      // Random shadow intensity for depth
      shadowIntensity: random(0.8, 1.2) * config.shadowIntensity,

      // Rotation preferences
      rotationBias: random(-0.3, 0.3), // Tendency to rotate in a specific direction

      // Animation timing variations
      timingOffset: random(-0.1, 0.1), // Slight variation in animation timing

      // Special effect parameters
      glow: config.glowEffect ? random(0.7, 1.3) : 0,
      depth: config.depthEffect ? random(0.8, 1.2) : 1,
    }))
  );

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => isReducedMotion(), []);

  // Dynamically adjust threshold based on device performance and motion preference
  const threshold = useMemo(() => {
    const baseThreshold = config.threshold || (prefersReducedMotion ? 120 : 60);
    // Mobile devices get higher thresholds to reduce animations
    return config.optimizeForMobile &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
      ? baseThreshold * 1.5
      : baseThreshold;
  }, [config.threshold, config.optimizeForMobile, prefersReducedMotion]);

  // Function to detect container dimensions
  const updateContainerDimensions = useCallback(() => {
    if (!wrapperRef.current) return;

    const containerElement =
      containerRef?.current || wrapperRef.current.parentElement;
    if (!containerElement) return;

    containerDimensionsRef.current = {
      width: containerElement.offsetWidth,
      height: containerElement.offsetHeight,
    };
  }, [containerRef]);

  // Enhanced mouse move handler with throttling
  const handleMouseMove = useCallback(
    throttleFrame((e) => {
      if (!isRunningRef.current) return;

      const prevX = mousePosRef.current.x;
      const prevY = mousePosRef.current.y;

      // Get correct mouse position whether it's a touch event or mouse event
      const clientX =
        e.clientX !== undefined
          ? e.clientX
          : e.touches && e.touches[0]
          ? e.touches[0].clientX
          : prevX;
      const clientY =
        e.clientY !== undefined
          ? e.clientY
          : e.touches && e.touches[0]
          ? e.touches[0].clientY
          : prevY;

      mousePosRef.current.x = clientX;
      mousePosRef.current.y = clientY;

      // Calculate velocity with smoothing
      velocityRef.current.x = lerp(
        velocityRef.current.x,
        mousePosRef.current.x - prevX,
        0.3
      );
      velocityRef.current.y = lerp(
        velocityRef.current.y,
        mousePosRef.current.y - prevY,
        0.3
      );

      // Calculate mouse speed with a more accurate algorithm
      const instantSpeed = Math.hypot(
        mousePosRef.current.x - prevX,
        mousePosRef.current.y - prevY
      );

      // Smooth mouse speed for more consistent animations
      mouseSpeedRef.current = lerp(mouseSpeedRef.current, instantSpeed, 0.2);

      // Ensure we're tracking that the mouse is in the container
      if (!isMouseInContainerRef.current) {
        isMouseInContainerRef.current = true;
      }
    }),
    []
  );

  // Handle mouse enter event
  const handleMouseEnter = useCallback(() => {
    isMouseInContainerRef.current = true;
  }, []);

  // Handle mouse leave event
  const handleMouseLeave = useCallback(() => {
    isMouseInContainerRef.current = false;
  }, []);

  // Optimized touch handlers
  const handleTouchStart = useCallback((e) => {
    isTouchDeviceRef.current = true;
    isMouseInContainerRef.current = true;

    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      mousePosRef.current.x = touch.clientX;
      mousePosRef.current.y = touch.clientY;
      lastMousePosRef.current = { ...mousePosRef.current };
      cacheMousePosRef.current = { ...mousePosRef.current };
    }
  }, []);

  // Optimized touch move handler
  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches && e.touches[0]) {
        // Prevent scrolling on touch devices when interacting with the trail
        if (config.preventScrollOnTouch && e.cancelable) {
          e.preventDefault();
        }

        // Convert touch event to mouse-like coordinates
        const touch = e.touches[0];
        const mouseEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY,
        };
        handleMouseMove(mouseEvent);
      }
    },
    [handleMouseMove, config.preventScrollOnTouch]
  );

  // Handle touch end event
  const handleTouchEnd = useCallback(() => {
    isMouseInContainerRef.current = false;

    // Reset velocity on touch end for more natural animations
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  // Handle window resize with debouncing
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      updateContainerDimensions();

      // Reset positions on resize
      if (typeof window !== "undefined") {
        mousePosRef.current = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };
        lastMousePosRef.current = { ...mousePosRef.current };
        cacheMousePosRef.current = { ...mousePosRef.current };
      }
    }, config.resizeDebounce);
  }, [updateContainerDimensions, config.resizeDebounce]);

  // Choose image based on strategy
  const getNextImageIndex = useCallback(() => {
    const currentIndex = zIndexValRef.current % images.length;

    switch (config.imageVariety) {
      case "random":
        return randomInt(0, images.length - 1);
      case "paired":
        // Returns pairs of the same image for a more coherent visual
        return (Math.floor(currentIndex / 2) * 2) % images.length;
      case "sequential":
      default:
        return currentIndex;
    }
  }, [images.length, config.imageVariety]);

  // Create shadow effect based on configuration
  const createShadowEffect = useCallback(
    (intensity, isHovering = false) => {
      if (config.mirrorEffect) {
        return `
        0 ${15 * intensity}px ${25 * intensity}px rgba(0,0,0,${
          0.2 * intensity
        }),
        0 0 ${5 * intensity}px rgba(255,255,255,${0.2 * intensity})
      `;
      }

      return `0 ${10 * intensity}px ${25 * intensity}px rgba(0,0,0,${
        0.15 * intensity
      })`;
    },
    [config.mirrorEffect]
  );

  // Enhanced image animation function
  const showNextImage = useCallback(() => {
    if (activeAnimationsRef.current >= config.maxConcurrentAnimations) {
      // Queue the animation if we're at capacity
      if (animationQueueRef.current.length < 5) {
        // Limit queue size
        animationQueueRef.current.push(Date.now());
      }
      return;
    }

    const mousePos = mousePosRef.current;
    const cacheMousePos = cacheMousePosRef.current;
    const velocity = velocityRef.current;
    const mouseSpeed = mouseSpeedRef.current;

    // Calculate direction vector
    let dx = mousePos.x - cacheMousePos.x;
    let dy = mousePos.y - cacheMousePos.y;

    // Calculate the angle with some variance for natural movement
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    // Apply variance to rotation with smooth transitions from previous angles
    const angleVarianceFactor = Math.min(1, mouseSpeed / 50); // Higher speed = more variance
    const angleVariance =
      random(-config.rotationVariance, config.rotationVariance) *
      angleVarianceFactor;

    // Smooth the angle transition
    const finalAngle = lerp(lastAngleRef.current, angle + angleVariance, 0.3);

    // Add slight variance to the rotation for more organic motion
    const rotationDirection =
      Math.abs(finalAngle - lastAngleRef.current) < 180
        ? finalAngle > lastAngleRef.current
          ? 1
          : -1
        : finalAngle > lastAngleRef.current
        ? -1
        : 1;

    const startAngle = finalAngle - rotationDirection * random(10, 25);

    lastAngleRef.current = finalAngle;

    // Calculate distance and normalize direction vectors
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }

    // Scale movement based on mouse speed for more dynamic motion
    const speedFactor = clamp(mouseSpeed / 20, 0.8, 1.8);
    dx *= (distance * speedFactor) / 120;
    dy *= (distance * speedFactor) / 120;

    // Increment z-index for proper layering
    zIndexValRef.current++;

    // Get the next image based on selected strategy
    const imgIndex = getNextImageIndex();
    const img = imageTrailRef.current[imgIndex];
    const effect = imageEffects[imgIndex];

    if (!img) return;

    // Kill any existing animations on this element to prevent conflicts
    gsap.killTweensOf(img);
    gsap.killTweensOf(img.firstChild);

    activeAnimationsRef.current++;

    // Dynamic scale range based on mouse speed and effect parameters
    const minScale = config.scaleRange[0];
    const maxScale = config.scaleRange[1] * effect.scaleAdjust;
    const speedInfluence = clamp(mouseSpeed / 50, 0, 1);
    const finalScale = minScale + (maxScale - minScale) * speedInfluence;

    // Apply visual effects according to configuration
    let filterValue = effect.filter;

    // Apply any color variation effects if enabled
    if (config.colorVariations) {
      const hue = (zIndexValRef.current * 20) % 360;
      filterValue = `hue-rotate(${hue}deg) ${effect.filter.replace(
        /hue-rotate\([^)]+\)/,
        ""
      )}`;
    }

    // Apply glow effect if enabled
    if (config.glowEffect && effect.glow > 0) {
      const glowColor = config.glowColor || "rgba(255,255,255,0.3)";
      img.style.boxShadow = `0 0 ${15 * effect.glow}px ${glowColor}`;
    }

    // Apply blend mode if specified
    if (config.useBlendMode) {
      img.style.mixBlendMode = config.useBlendMode;
    }

    // Apply filter to image inner
    if (img.firstChild) {
      img.firstChild.style.filter = filterValue;
    }

    // Create enhanced animation timeline with more visual appeal
    const timeline = gsap.timeline({
      onComplete: () => {
        activeAnimationsRef.current--;

        // Process queue if we have pending animations
        if (animationQueueRef.current.length > 0) {
          animationQueueRef.current.shift();
          if (isRunningRef.current && isMouseInContainerRef.current) {
            showNextImage();
          }
        }
      },
    });

    // Calculate position with more organic variation
    const containerRect = containerRef?.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    // Initial position with offset for organic feel
    const startX =
      cacheMousePos.x -
      containerRect.left -
      img.offsetWidth / 2 +
      effect.offset.x;
    const startY =
      cacheMousePos.y -
      containerRect.top -
      img.offsetHeight / 2 +
      effect.offset.y;

    // Add subtle variation to flight path
    const flyDistanceVariation = random(0.8, 1.2);
    const flyDistance =
      config.flyOutDistance * flyDistanceVariation * (0.8 + mouseSpeed / 100);

    // Adjust end position with more dynamic factors
    const endX =
      mousePos.x -
      containerRect.left -
      img.offsetWidth / 2 +
      dx * flyDistance +
      random(-20, 20) * speedInfluence;

    const endY =
      mousePos.y -
      containerRect.top -
      img.offsetHeight / 2 +
      dy * flyDistance +
      random(-20, 20) * speedInfluence;

    // Apply depth effect if enabled
    const perspective = config.depthEffect
      ? `perspective(${800 * effect.depth}px)`
      : "";

    // Build the animation sequence with improved timing and effects
    const reducedDuration = prefersReducedMotion
      ? 0.5
      : config.animationDuration;

    // Calculate shadow based on effect settings
    const startShadow = createShadowEffect(effect.shadowIntensity * 0.7);
    const peakShadow = createShadowEffect(effect.shadowIntensity * 1.2, true);
    const endShadow = createShadowEffect(effect.shadowIntensity * 0.4);

    // Initial appearance animation
    timeline.fromTo(
      img,
      {
        opacity: 0,
        scale: 0.1,
        zIndex: zIndexValRef.current,
        x: startX,
        y: startY,
        rotation: startAngle,
        boxShadow: startShadow,
        filter: config.glowEffect ? `blur(5px)` : "none",
      },
      {
        duration: reducedDuration,
        ease: config.easingIn,
        opacity: 1,
        scale: finalScale,
        x:
          mousePos.x -
          containerRect.left -
          img.offsetWidth / 2 +
          velocity.x * 2 +
          effect.offset.x,
        y:
          mousePos.y -
          containerRect.top -
          img.offsetHeight / 2 +
          velocity.y * 2 +
          effect.offset.y,
        rotation: finalAngle,
        boxShadow: peakShadow,
        filter: "none",
        immediateRender: true,
      },
      0
    );

    // Add subtle inner parallax effect to the image content if enabled
    if (config.enableParallax && img.firstChild) {
      timeline.fromTo(
        img.firstChild,
        {
          scale: 1.2,
          x: -velocity.x * (isTouchDeviceRef.current ? 2 : 5),
          y: -velocity.y * (isTouchDeviceRef.current ? 2 : 5),
        },
        {
          duration: reducedDuration * 1.2,
          ease: "power2.out",
          scale: 1,
          x: velocity.x * (isTouchDeviceRef.current ? 1 : 2),
          y: velocity.y * (isTouchDeviceRef.current ? 1 : 2),
        },
        0
      );
    }

    // Add mirror/reflection effect if enabled
    if (config.mirrorEffect) {
      timeline.to(
        img,
        {
          boxShadow: endShadow,
          duration: reducedDuration * 0.8,
          transformOrigin: "center bottom",
          transform: `${perspective} rotateX(${random(3, 8)}deg)`,
        },
        0.2
      );
    }

    // Fade out and fly away with enhanced motion
    timeline
      .to(
        img,
        {
          duration: prefersReducedMotion ? 0.2 : config.fadeOutDuration,
          ease: "power1.out",
          opacity: 0,
          delay: reducedDuration * 0.3,
        },
        reducedDuration * 0.3
      )
      .to(
        img,
        {
          duration: prefersReducedMotion ? 0.7 : config.animationDuration * 1.2,
          ease: config.easingOut,
          x: endX,
          y: endY,
          rotation: finalAngle + rotationDirection * random(5, 15),
          boxShadow: endShadow,
        },
        reducedDuration * 0.1
      );
  }, [
    config,
    prefersReducedMotion,
    containerRef,
    createShadowEffect,
    getNextImageIndex,
    imageEffects,
  ]);

  // Main animation loop with advanced performance optimizations
  const render = useCallback(() => {
    if (!isRunningRef.current) return;

    const mousePos = mousePosRef.current;
    const lastMousePos = lastMousePosRef.current;
    const cacheMousePos = cacheMousePosRef.current;

    // Apply smoother motion with variable easing based on movement speed
    const minEasing = 0.05; // Minimum easing for slow movements
    const maxEasing = 0.2; // Maximum easing for fast movements
    const easingFactor = clamp(
      minEasing + (mouseSpeedRef.current / 200) * (maxEasing - minEasing),
      minEasing,
      maxEasing
    );

    // Apply exponential smoothing to mouse position
    cacheMousePosRef.current.x = lerp(
      cacheMousePos.x,
      mousePos.x,
      easingFactor
    );
    cacheMousePosRef.current.y = lerp(
      cacheMousePos.y,
      mousePos.y,
      easingFactor
    );

    // Only process animation if mouse is inside the container and component is active
    if (isMouseInContainerRef.current) {
      const distance = Math.hypot(
        mousePos.x - lastMousePos.x,
        mousePos.y - lastMousePos.y
      );

      // Dynamic threshold based on current mouse speed and configuration
      let dynamicThreshold = threshold;

      if (config.adaptiveThreshold) {
        // Lower threshold for faster movements, higher for slower ones
        const speedFactor = mouseSpeedRef.current > 50 ? 0.7 : 1.0;
        dynamicThreshold = Math.max(threshold * speedFactor, 30);

        // Adjust threshold based on device
        if (isTouchDeviceRef.current) {
          dynamicThreshold *= 1.5; // Higher threshold for touch devices
        }

        // Adjust threshold based on trail density setting
        dynamicThreshold /= config.trailDensity;
      }

      // Check if we should create a new image
      if (
        distance > dynamicThreshold &&
        activeAnimationsRef.current < config.maxConcurrentAnimations
      ) {
        showNextImage();
        lastMousePosRef.current = { ...mousePos };
      }
    }

    animationFrameRef.current = requestAnimationFrame(render);
  }, [
    threshold,
    showNextImage,
    config.maxConcurrentAnimations,
    config.adaptiveThreshold,
    config.trailDensity,
  ]);

  // Initialize component on mount
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Detect touch device
    isTouchDeviceRef.current =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    // Initialize positions at center of viewport
    mousePosRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    lastMousePosRef.current = { ...mousePosRef.current };
    cacheMousePosRef.current = { ...mousePosRef.current };
    velocityRef.current = { x: 0, y: 0 };

    // Update container dimensions
    updateContainerDimensions();

    // Start the animation loop
    isRunningRef.current = true;
    animationFrameRef.current = requestAnimationFrame(render);

    // Get the container element
    let container;

    if (containerRef?.current) {
      container = containerRef.current;
    } else if (wrapperRef.current) {
      container = wrapperRef.current.parentElement;
    } else {
      // If we can't find the container, use the window as a fallback
      container = window;
    }

    // Set initial state to true if using window as container
    if (container === window) {
      isMouseInContainerRef.current = true;
    }

    // Add event listeners based on device capability
    if (isTouchDeviceRef.current) {
      // Touch event listeners
      container.addEventListener("touchmove", handleTouchMove, {
        passive: !config.preventScrollOnTouch,
      });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, {
        passive: true,
      });
    } else {
      // Mouse event listeners
      container.addEventListener("mousemove", handleMouseMove);

      // Only add enter/leave listeners if not using window
      if (container !== window) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
      }
    }

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup function with comprehensive removal of all event listeners and animations
    return () => {
      isRunningRef.current = false;

      // Remove event listeners from the container
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);

        // Only remove enter/leave listeners if not using window
        if (container !== window) {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        }
      }

      // Remove window listeners
      window.removeEventListener("resize", handleResize);

      // Clear any pending timeouts
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Kill any remaining GSAP animations
      imageTrailRef.current.forEach((img) => {
        if (img) gsap.killTweensOf(img);
        if (img?.firstChild) gsap.killTweensOf(img.firstChild);
      });

      // Clear animation queue
      animationQueueRef.current = [];
    };
  }, [
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
    handleResize,
    render,
    config.preventScrollOnTouch,
  ]);

  return (
    <ImageTrailWrapper ref={wrapperRef} className={className}>
      {images.map((src, index) => (
        <ImageWrapper
          key={index}
          ref={(el) => (imageTrailRef.current[index] = el)}
          $size={config.imageSize}
          $aspectRatio={config.aspectRatio}
          $rounded={config.isRounded}
          $shadow={createShadowEffect(1)}
        >
          <ImageInner
            style={{ backgroundImage: `url(${src})` }}
            $filter={imageEffects[index].filter}
          />
        </ImageWrapper>
      ))}
    </ImageTrailWrapper>
  );
};

export default ImageTrail;
