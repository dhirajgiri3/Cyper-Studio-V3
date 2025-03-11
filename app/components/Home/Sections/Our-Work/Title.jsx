import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Observer } from "gsap/dist/Observer";
import MagneticWrapper from "../../../Buttons/PrimaryButton/MagneticWrapper";
import SparkleEffect from "../../../Animations/Effects/Sparkle";

gsap.registerPlugin(ScrollTrigger, Observer);

// Custom throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const WorkItem = React.memo(
  ({ item, index, color, isSparkleActive }) => {
    const itemRef = useRef(null);
    const textRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
      if (!textRef.current) return;

      // Split text into words and characters for animation
      const text = textRef.current;
      const words = item.title.split(" ");
      text.innerHTML = "";

      const wordSpans = words.map((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";
        wordSpan.style.overflow = "hidden";

        const chars = word.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(20px) rotateX(-90deg)";
          wordSpan.appendChild(span);
          return span;
        });

        // Add space after each word except the last
        if (wordIndex < words.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          space.style.marginRight = "0.25em"; // Consistent word spacing
          wordSpan.appendChild(space);
        }

        text.appendChild(wordSpan);
        return { wordSpan, chars };
      });

      // Create staggered animation for words and characters
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each word's characters with stagger
      wordSpans.forEach(({ chars }, wordIndex) => {
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "back.out(1.7)",
            delay: wordIndex * 0.1,
          },
          wordIndex * 0.1
        );
      });

      // Enhance container animation
      gsap.fromTo(
        itemRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
          rotateX: -5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );

      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    }, [item.title]);

    return (
      <MagneticWrapper
      strength={0.2} // Adjusted for a smoother effect
      dampening={0.1}
      radius={100}
      className="relative magnetic-item"
      >
      <div
        ref={itemRef}
        className={`
        work-item
        relative z-20
        px-0 py-5
        rounded-xl
        transition-transform duration-300 ease-out
        flex items-center gap-2
        font-medium tracking-tight
        ${color}
        active:scale-95
        justify-center
        overflow-hidden
        backdrop-blur-sm
        max-w-[200px] mx-auto bg-white
        `}
        role="button"
        tabIndex={0}
        aria-label={item.title}
      >
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white" />
        <SparkleEffect isActive={isSparkleActive} />
        <span
        className="text-lg relative transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
        >
        {item.icon}
        </span>
        <span
        ref={textRef}
        className="hidden xs:inline relative transform transition-transform duration-300 text-gray-800 font-semibold text-sm whitespace-nowrap"
        >
        {item.title}
        </span>
        <span
        className="xs:hidden relative transform transition-transform duration-300 text-gray-800 font-semibold text-sm"
        >
        {item.title.split(" ")[0]}
        </span>
      </div>
      </MagneticWrapper>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.isSparkleActive === nextProps.isSparkleActive &&
      prevProps.color === nextProps.color
    );
  }
);

const Title = () => {
  const titleRef = useRef(null);
  const workItemsRef = useRef(null);
  const containerRef = useRef(null);
  const blobRef = useRef(null);
  const [sparkleIndices, setSparkleIndices] = useState([0, 2]);
  const intervalRef = useRef(null);

  const workItemsData = useMemo(
    () => [
      { title: "E-commerce Solutions", icon: "🛍️" },
      { title: "AI & ML Integration", icon: "🤖" },
      { title: "Mobile Applications", icon: "📱" },
      { title: "Cloud Architecture", icon: "☁️" },
      { title: "Blockchain Systems", icon: "🔗" },
      { title: "UI/UX Design", icon: "🎨" },
    ],
    []
  );

  const colors = useMemo(
    () => [
      "bg-rose-100",
      "bg-sky-100",
      "bg-amber-100",
      "bg-emerald-100",
      "bg-violet-100",
      "bg-indigo-100",
    ],
    []
  );

  const getUniqueColors = useCallback(() => {
    return [...colors]
      .sort(() => Math.random() - 0.5)
      .slice(0, workItemsData.length);
  }, [colors, workItemsData.length]);

  const uniqueColors = useMemo(() => getUniqueColors(), [getUniqueColors]);

  // Add effect for infinite sparkle sequence
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSparkleIndices((prev) => {
        const newIndices = prev.map((idx) => (idx + 2) % workItemsData.length);
        return newIndices;
      });
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [workItemsData.length]);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !workItemsRef.current)
      return;

    // Enhanced Blob setup
    const createBlob = () => {
      const blob = document.createElement("div");
      blob.className =
        "blob absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none z-1 will-change-transform";

      // Create multiple gradients for richer color transitions
      const gradients = [
        "rgba(146, 190, 255)",
        "rgba(255, 182, 193, .4)",
        "rgba(144, 238, 144, .2)",
        "rgba(230, 190, 255, 0)",
        "rgba(255, 215, 0, 0)",
      ];

      blob.style.background = `
        radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
          ${gradients[0]} 0%, 
          ${gradients[1]} 35%, 
          ${gradients[2]} 50%,
          ${gradients[3]} 80%,
          ${gradients[4]} 100%)
      `;


      blob.style.transition = "background 0.5s ease";

      return blob;
    };

    const blob = createBlob();
    blobRef.current = blob;
    containerRef.current.insertBefore(blob, containerRef.current.firstChild);

    let animationFrameId;
    let mouseX = 50;
    let mouseY = 50;
    let currentX = 50;
    let currentY = 50;

    // Easing function for smooth interpolation
    const ease = (current, target, factor = 0.125) => {
      return current + (target - current) * factor;
    };
    
    const updateBlobPosition = () => {
      if (!blobRef.current) return;

      // Smoothly interpolate position with easing
      currentX = ease(currentX, mouseX, 0.075); // Reduced factor for smoother movement
      currentY = ease(currentY, mouseY, 0.075); // Reduced factor for smoother movement

      // Apply position with transform for better performance
      blobRef.current.style.setProperty("--mouse-x", `${currentX}%`);
      blobRef.current.style.setProperty("--mouse-y", `${currentY}%`);

      animationFrameId = requestAnimationFrame(updateBlobPosition);
    };

    // More efficient mouse move handler with built-in smoothing
    const handleMouseMove = throttle((e) => {
      if (!containerRef.current || !blobRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position with slight smoothing
      mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    }, 16); // 60fps throttle

    // Start animation
    updateBlobPosition();

    // Event listeners
    containerRef.current.addEventListener("mousemove", handleMouseMove);

    // Title animation setup with scroll-based effect
    const title = titleRef.current;
    const text = title.textContent;
    title.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.position = "relative";
      if (char === " ") span.style.marginRight = "0.5em";
      wrapper.appendChild(span);
      return span;
    });

    title.appendChild(wrapper);

    // Scroll-based title animation
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          markers: false,
        },
      }
    );

    // --- Revised interactive tilt effect for title letters ---
    // Now attaching events to the wrapper so the bounding rectangle reflects the actual letters.

    const handleMouseLeave = () => {
      gsap.to(chars, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    wrapper.removeEventListener("mousemove", handleMouseMove);
    wrapper.removeEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    // Enhanced work items animation - ENHANCED VERSION
    const workItems = workItemsRef.current.children;

    gsap.set(workItems, {
      opacity: 0,
      scale: 0.97, // slightly different initial scale for smooth reveal
      y: 30, // less vertical offset for a subtle entrance
      rotateX: -5, // milder initial rotation
    });

    Array.from(workItems).forEach((item, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "center center",
          scrub: true,
          // markers: true, // uncomment for debugging
        },
      });

      // Combined reveal with a gentle bounce and refined rotations
      tl.fromTo(
        item,
        {
          opacity: 0,
          scale: 0.97,
          y: 30,
          rotateX: -5,
          rotateY: i % 2 === 0 ? 3 : -3,
          x: 0,
          rotateZ: 0,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          x: i % 2 === 0 ? 8 : -8,
          rotateZ: i % 2 === 0 ? 1 : -1,
          ease: "back.out(1.7)",
          duration: 1.2,
        }
      );
    });

    // Retain hover effect as is for interactivity
    Array.from(workItems).forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      if (blobRef.current?.parentNode) {
        blobRef.current.remove();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (titleRef.current) {
        titleRef.current.removeEventListener("mousemove", handleMouseMove);
        titleRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] xs:min-h-[85vh] sm:min-h-[90vh] 
        py-10 xs:py-14 sm:py-16 md:py-20 
        flex flex-col items-center justify-center 
        relative 
        px-3 xs:px-4 sm:px-6 md:px-8 
        overflow-hidden"
    >
      {/* <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-500/20 to-transparent" /> */}

      <h1
        ref={titleRef}
        className="title-transparent text-black
            text-9xl xs:text-10xl sm:text-11xl md:text-12xl lg:text-13xl
            font-black relative z-10 text-center 
            mb-10 xs:mb-12 sm:mb-14 md:mb-16
            px-2 xs:px-4
            leading-tight
            tracking-tight
            [text-wrap:balance]
            select-none text-center"
      >
        Our Work
      </h1>

      <div
        ref={workItemsRef}
        className="w-full 
            max-w-[96%] xs:max-w-[94%] sm:max-w-[92%] md:max-w-[88%] lg:max-w-[84%] 
            mt-4 xs:mt-6 sm:mt-8 
            relative z-20 
            grid grid-cols-2 md:grid-cols-3
            gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7
            [perspective:2000px]
            px-2 xs:px-3 sm:px-4"
        role="list"
        aria-label="Our work categories"
      >
        {workItemsData.map((item, index) => (
          <WorkItem
            key={item.title}
            item={item}
            index={index}
            color={uniqueColors[index]}
            isSparkleActive={sparkleIndices.includes(index)}
          />
        ))}
      </div>

      {/* Enhanced gradient overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 xs:h-36 sm:h-40 
        bg-gradient-to-t from-light/40 via-light/20 to-transparent pointer-events-none"
      />
    </div>
  );
};

export default React.memo(Title);
