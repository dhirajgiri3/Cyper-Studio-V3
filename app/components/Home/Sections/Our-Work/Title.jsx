import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
  // Removed lazy and Suspense as they weren't used in the provided snippet
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Observer } from "gsap/dist/Observer"; // Observer is imported but not used in Title, consider removing if not needed elsewhere
import MagneticWrapper from "../../../Buttons/PrimaryButton/MagneticWrapper";
import SparkleEffect from "../../../Animations/Effects/Sparkle";
import { isReducedMotion } from "../../../Buttons/utils/performanceUtils";

gsap.registerPlugin(ScrollTrigger, Observer);

// Custom throttle function with improved performance
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// --- WorkItem Component (assuming no changes needed here based on the error) ---
const WorkItem = React.memo(
  ({ item, index, color, isSparkleActive, onClick }) => {
    const itemRef = useRef(null);
    const textRef = useRef(null);
    const animationRef = useRef(null);
    const preferReducedMotion = isReducedMotion();

    useEffect(() => {
      if (
        !textRef.current ||
        preferReducedMotion ||
        typeof window === "undefined"
      )
        return; // Added window check

      // Split text into words and characters for animation
      const text = textRef.current;
      const words = item.title.split(" ");
      text.innerHTML = ""; // Clear existing content safely

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
          space.innerHTML = " ";
          space.style.display = "inline-block";
          space.style.marginRight = "0.25em"; // Consistent word spacing
          wordSpan.appendChild(space);
        }

        text.appendChild(wordSpan);
        return { wordSpan, chars };
      });

      // Create staggered animation for words and characters with performance optimization
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        onComplete: function () {
          // Use function() for 'this' context
          // Clean up ScrollTrigger to prevent memory leaks
          this.scrollTrigger?.kill();
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
            delay: wordIndex * 0.1, // Use delay instead of position parameter for clarity
            force3D: true,
          }
          // Removed position parameter for simplicity with delay
        );
      });

      // Enhance container animation
      const containerTl = gsap.fromTo(
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
          force3D: true,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none reverse",
          },
          onComplete: function () {
            // Use function() for 'this' context
            // Clean up ScrollTrigger to prevent memory leaks
            this.scrollTrigger?.kill();
          },
        }
      );

      animationRef.current = { tl, containerTl };

      return () => {
        // Ensure animations and scrollTriggers are properly killed
        animationRef.current?.tl?.kill(); // Kill the timeline itself
        animationRef.current?.tl?.scrollTrigger?.kill();
        animationRef.current?.containerTl?.kill(); // Kill the timeline itself
        animationRef.current?.containerTl?.scrollTrigger?.kill();
        animationRef.current = null; // Clear the ref
      };
    }, [item.title, preferReducedMotion]); // Removed index as it's unlikely to change for a specific item

    return (
      <MagneticWrapper
        strength={0.15} // Reduced for smoother effect and better performance
        dampening={0.1}
        radius={100}
        className="relative magnetic-item group"
      >
        <div
          ref={itemRef}
          className={`work-item relative z-20 px-0 py-4 sm:py-5 rounded-xl transition-all duration-300 ease-out flex items-center gap-2 font-medium tracking-tight max-w-[200px] mx-auto ${color} active:scale-95 justify-center overflow-hidden hover:shadow-md`}
          role="button"
          tabIndex={0}
          onClick={onClick}
          aria-label={item.title}
        >
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-white/0 pointer-events-none" />

          <SparkleEffect isActive={isSparkleActive} />

          <span
            className="text-xl relative z-10 transition-all duration-300 group-hover:scale-125 mr-1"
            aria-hidden="true"
          >
            {item.icon}
          </span>

          <span
            ref={textRef}
            className="hidden xs:inline relative z-10 transform transition-transform duration-300 text-white font-semibold text-sm whitespace-nowrap"
          >
            {/* Render title directly if reduced motion is preferred or JS is disabled */}
            {preferReducedMotion ? item.title : null}
          </span>

          {/* Fallback for small screens or initial render */}
          <span className="xs:hidden relative z-10 transform transition-transform duration-300 text-white font-semibold text-sm">
            {item.title.split(" ")[0]}
          </span>
        </div>
      </MagneticWrapper>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.item.title === nextProps.item.title && // Check title stability too
      prevProps.isSparkleActive === nextProps.isSparkleActive &&
      prevProps.color === nextProps.color &&
      prevProps.onClick === nextProps.onClick // Compare onClick handler reference
    );
  }
);

WorkItem.displayName = "WorkItem"; // Add display name for easier debugging

// --- Title Component ---
const Title = () => {
  const titleRef = useRef(null);
  const workItemsRef = useRef(null);
  const containerRef = useRef(null);
  const blobRef = useRef(null);
  // Removed unused animationsRef
  const preferReducedMotion = isReducedMotion();

  // Use fixed initial indices for deterministic server rendering
  const [sparkleIndices, setSparkleIndices] = useState([0, 2]);
  const intervalRef = useRef(null);
  // We track activeCategory to update UI when a category is selected
  const [activeCategory, setActiveCategory] = useState(null);

  const workItemsData = useMemo(
    () => [
      { title: "E-commerce Solutions", icon: "🛍️", category: "live" },
      { title: "AI & ML Integration", icon: "🤖", category: "development" },
      { title: "Mobile Applications", icon: "📱", category: "live" },
      { title: "Cloud Architecture", icon: "☁️", category: "development" },
      { title: "Blockchain Systems", icon: "🔗", category: "upcoming" },
      { title: "UI/UX Design", icon: "🎨", category: "live" },
    ],
    []
  );

  const colors = useMemo(
    () => [
      "bg-gradient-to-br from-rose-600 to-rose-800",
      "bg-gradient-to-br from-blue-600 to-blue-800",
      "bg-gradient-to-br from-amber-600 to-amber-800",
      "bg-gradient-to-br from-emerald-600 to-emerald-800",
      "bg-gradient-to-br from-violet-600 to-violet-800",
      "bg-gradient-to-br from-indigo-600 to-indigo-800",
    ],
    []
  );

  // Use a deterministic approach for color assignment
  const uniqueColors = useMemo(() => {
    return workItemsData.map((_, index) => colors[index % colors.length]);
  }, [colors, workItemsData]);

  const handleCategoryClick = useCallback((category) => {
    setActiveCategory(category);
    // Dispatch custom event to communicate with OurWork component
    if (typeof window !== "undefined") {
      const event = new CustomEvent("category-selected", {
        detail: { category },
      });
      window.dispatchEvent(event);

      // Scroll to the OurWork section (Ensure the target element exists with this ID)
      const ourWorkSection = document.getElementById("our-work-section");
      if (ourWorkSection) {
        // Delay scroll slightly to allow state update and potential rendering changes
        setTimeout(() => {
          ourWorkSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        console.warn(
          "Element with ID 'our-work-section' not found for scrolling."
        );
      }
    }
  }, []); // Empty dependency array assumes category doesn't change callback logic

  // Add effect for infinite sparkle sequence - only on client side
  useEffect(() => {
    if (preferReducedMotion || typeof window === "undefined") return;

    let isMounted = true; // Flag to prevent state update on unmounted component

    // Skip the first update to ensure hydration matches
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (isMounted) {
          setSparkleIndices((prev) => {
            // Ensure we have enough items to avoid infinite loops if length is small
            const length = workItemsData.length;
            if (length < 2) return prev; // Need at least 2 items
            // A simple way to shift indices, ensuring they are different
            const nextIndex1 = (prev[0] + 1) % length;
            let nextIndex2 = (prev[1] + 1) % length;
            // Ensure the two indices are different
            if (nextIndex1 === nextIndex2) {
              nextIndex2 = (nextIndex2 + 1) % length;
            }
            return [nextIndex1, nextIndex2];
          });
        }
      }, 3000);
    }, 1000); // Delay the start of the animation

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Clear the ref
      }
    };
  }, [workItemsData.length, preferReducedMotion]); // Dependencies

  // Listen for category updates from ProjectCard
  useEffect(() => {
    const handleCategoryUpdate = (event) => {
      if (event.detail && event.detail.category) {
        setActiveCategory(event.detail.category);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("category-updated", handleCategoryUpdate);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("category-updated", handleCategoryUpdate);
      }
    };
  }, []); // No dependencies needed

  // Main animation effect
  useEffect(() => {
    // Ensure this runs only on the client and not during SSR/hydrate phase mismatches
    if (typeof window === "undefined" || preferReducedMotion) {
      return;
    }

    // --- Context for GSAP ---
    // Use GSAP context for easier cleanup
    let ctx = gsap.context(() => {
      // Ensure refs are current
      if (!containerRef.current || !titleRef.current || !workItemsRef.current) {
        console.warn("GSAP Context: Refs not available yet.");
        return;
      }

      // --- Enhanced Blob Setup ---
      let blobElement = null; // Use local variable within context
      const createBlob = () => {
        const blob = document.createElement("div");
        blob.className =
          "blob absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none z-1 will-change-transform";
        const gradients = [
          "rgba(59, 130, 246, 0.4)", // Blue-500
          "rgba(139, 92, 246, 0.3)", // Purple-500
          "rgba(34, 211, 238, 0.15)", // Cyan-400
          "rgba(6, 182, 212, 0.05)", // Cyan-500
          "rgba(0, 0, 0, 0)", // Transparent
        ];
        blob.style.background = `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradients[0]} 0%, ${gradients[1]} 30%, ${gradients[2]} 45%, ${gradients[3]} 70%, ${gradients[4]} 100%)`;
        blob.style.transition = "background 0.5s ease";
        return blob;
      };

      // Delay blob creation slightly
      const blobTimer = setTimeout(() => {
        if (containerRef.current && !blobRef.current) {
          // Check ref too
          blobElement = createBlob();
          blobRef.current = blobElement; // Assign to ref
          containerRef.current.insertBefore(
            blobElement,
            containerRef.current.firstChild
          );
        }
      }, 50); // Shorter delay might be okay

      // --- Blob Animation ---
      let animationFrameId;
      let mouseX = 50;
      let mouseY = 50;
      let currentX = 50;
      let currentY = 50;
      const ease = (current, target, factor = 0.075) =>
        current + (target - current) * factor;

      const updateBlobPosition = () => {
        if (!blobRef.current) return; // Use ref here
        currentX = ease(currentX, mouseX);
        currentY = ease(currentY, mouseY);
        blobRef.current.style.setProperty("--mouse-x", `${currentX}%`);
        blobRef.current.style.setProperty("--mouse-y", `${currentY}%`);
        animationFrameId = requestAnimationFrame(updateBlobPosition);
      };

      const handleMouseMove = throttle((e) => {
        if (!containerRef.current || !blobRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      }, 16); // ~60fps throttle

      // Start animation and listeners after a short delay
      const interactionTimer = setTimeout(() => {
        if (containerRef.current) {
          updateBlobPosition();
          containerRef.current.addEventListener("mousemove", handleMouseMove);
        }
      }, 100);

      // --- Title Animation ---
      const titleEl = titleRef.current;
      const titleText = titleEl.textContent || "Our Work";
      titleEl.innerHTML = ""; // Clear for setup

      const titleWrapper = document.createElement("div");
      titleWrapper.style.position = "relative";
      titleWrapper.style.display = "inline-block";
      titleWrapper.style.willChange = "transform"; // Hint browser for optimization

      const chars = titleText.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.position = "relative";
        span.style.willChange = "transform, opacity"; // Optimize char animation
        if (char === " ") span.style.marginRight = "0.25em"; // Adjust spacing if needed
        titleWrapper.appendChild(span);
        return span;
      });
      titleEl.appendChild(titleWrapper);

      // Improved title animation - smoother and more direct
      gsap.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.03, // Faster stagger for smoother appearance
          ease: "back.out(1.2)", // More natural bounce
          duration: 0.6, // Faster animation
          scrollTrigger: {
            trigger: titleEl,
            start: "top 90%", // Trigger earlier
            end: "top 40%",
            toggleActions: "play none none reverse", // Simple toggle instead of scrub
          },
          onComplete: function () {
            this.scrollTrigger?.kill();
          },
        }
      );
      // No need to push to animationsRef here, GSAP context handles cleanup

      // Interactive tilt effect for title letters
      const handleTitleMouseMove = throttle((e) => {
        if (!titleWrapper) return;
        const rect = titleWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateY = ((e.clientX - centerX) / rect.width) * 10; // Max 10deg tilt
        const rotateX = -((e.clientY - centerY) / rect.height) * 10;
        gsap.to(chars, {
          rotateY,
          rotateX,
          duration: 0.4,
          ease: "power2.out",
        });
      }, 16);

      const handleMouseLeave = () => {
        gsap.to(chars, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      titleWrapper.addEventListener("mousemove", handleTitleMouseMove);
      titleWrapper.addEventListener("mouseleave", handleMouseLeave);

      // --- Work Items Entrance Animation ---
      const workItemsContainer = workItemsRef.current;
      const workItems = gsap.utils.toArray(workItemsContainer.children); // Use GSAP utility

      if (workItems.length > 0) {
        gsap.set(workItems, {
          // Initial hidden state
          opacity: 0,
          scale: 0.97,
          y: 30,
          rotateX: -5,
          force3D: true,
        });

        // Staggered entrance animation using ScrollTrigger batch
        ScrollTrigger.batch(workItems, {
          // interval: 0.1, // Time between triggers
          batchMax: 3, // Max 3 animating at once (adjust based on grid columns)
          start: "top bottom-=100px", // Trigger when item enters viewport
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.15, // Stagger within the batch
              duration: 0.8,
              ease: "back.out(1.5)",
              overwrite: true, // Overwrite if scrolling back and forth quickly
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              scale: 0.97,
              y: 30,
              rotateX: -5,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.in",
              overwrite: true,
            }),
        });
      }

      // --- Cleanup function for this context ---
      return () => {
        // GSAP context automatically cleans up animations/ScrollTriggers created within it
        // We only need to clean up things created *outside* GSAP or manually, like timeouts/listeners

        clearTimeout(blobTimer);
        clearTimeout(interactionTimer);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        if (containerRef.current) {
          containerRef.current.removeEventListener(
            "mousemove",
            handleMouseMove
          );
        }
        if (titleWrapper) {
          titleWrapper.removeEventListener("mousemove", handleTitleMouseMove);
          titleWrapper.removeEventListener("mouseleave", handleMouseLeave);
        }
        if (blobRef.current?.parentNode) {
          blobRef.current.remove();
          blobRef.current = null; // Clear the ref
        }
      };
    }, containerRef); // Scope the context to the main container

    // Return the cleanup function provided by GSAP context
    return () => ctx.revert();
  }, [preferReducedMotion]); // Dependency array includes preferReducedMotion

  // We're using workItemsData directly in the render, so we don't need categoryItems
  // This will be handled by the parent component that receives the category selection event

  return (
    <div
      ref={containerRef}
      className="min-h-[90vh] xs:min-h-[95vh] py-16 xs:py-20 sm:py-24 md:py-28 flex flex-col items-center justify-center relative px-3 xs:px-4 sm:px-6 md:px-8 overflow-hidden bg-black isolate"
    >
      {/* Simplified background with subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.1),transparent_80%)] opacity-70 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#07070c] -z-10" />

      {/* Light grid overlay with reduced opacity */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] -z-10" />
      <div className="absolute inset-0 bg-noise-pattern mix-blend-overlay opacity-[0.02] -z-10 pointer-events-none" />

      <h1
        ref={titleRef}
        className="text-white text-9xl xs:text-10xl sm:text-11xl md:text-12xl lg:text-13xl font-black relative z-10 text-center mb-10 xs:mb-12 sm:mb-14 md:mb-16 px-2 xs:px-4 leading-tight tracking-tight [text-wrap:balance] select-none transition-all duration-500"
      >
        Our Work {/* Initial text for SSR/non-JS */}
      </h1>

      <div
        ref={workItemsRef}
        className="w-full max-w-[96%] xs:max-w-[94%] sm:max-w-[92%] md:max-w-[88%] lg:max-w-[84%] mt-4 xs:mt-6 sm:mt-8 relative z-20 grid grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 [perspective:2000px] px-2 xs:px-3 sm:px-4"
        role="list"
        aria-label="Our work categories"
      >
        {workItemsData.map((item, index) => (
          <WorkItem
            key={item.title}
            item={item}
            index={index}
            color={uniqueColors[index]}
            isSparkleActive={sparkleIndices.includes(index) || activeCategory === item.category}
            onClick={() => handleCategoryClick(item.category)}
          />
        ))}
      </div>

      {/* Glowing accent */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] pointer-events-none opacity-50 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-black/30 to-transparent" />
      </div>
    </div>
  );
};

// Use React.memo for the Title component as well if its props rarely change
export default React.memo(Title);
