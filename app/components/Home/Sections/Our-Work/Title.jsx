import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MagneticWrapper from "../../../Buttons/PrimaryButton/MagneticWrapper";
import SparkleEffect from "../../../Animations/Effects/Sparkle";
import { isReducedMotion } from "../../../Buttons/utils/performanceUtils";
import { BadgePlusIcon,  } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Optimized throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// WorkItem Component - Enhanced for better animations and visuals
const WorkItem = React.memo(
  ({ item, index, color, isSparkleActive, onClick }) => {
    const itemRef = useRef(null);
    const textRef = useRef(null);
    const animationRef = useRef(null);
    const preferReducedMotion = isReducedMotion();

    useEffect(() => {
      if (!textRef.current || preferReducedMotion || typeof window === "undefined") return;

      // Split text for more refined animation
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
          span.classList.add("char-span"); // Add a class for easier selection
          wordSpan.appendChild(span);
          return span;
        });

        // Add space between words
        if (wordIndex < words.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = " ";
          space.style.display = "inline-block";
          space.style.marginRight = "0.25em";
          wordSpan.appendChild(space);
        }

        text.appendChild(wordSpan);
        return { wordSpan, chars };
      });

      // Create refined staggered animation with better easing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        onComplete: function() {
          this.scrollTrigger?.kill();
        },
      });

      // Animate each character with improved timing
      wordSpans.forEach(({ chars }, wordIndex) => {
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.015,
            ease: "back.out(1.5)",
            delay: wordIndex * 0.08,
            force3D: true,
          }
        );
      });

      // Enhanced container animation with subtle 3D effect
      const containerTl = gsap.fromTo(
        itemRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.97,
          rotateX: -3,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none reverse",
          },
          onComplete: function() {
            this.scrollTrigger?.kill();
          },
        }
      );

      animationRef.current = { tl, containerTl };

      return () => {
        // Clean up animations
        animationRef.current?.tl?.kill();
        animationRef.current?.tl?.scrollTrigger?.kill();
        animationRef.current?.containerTl?.kill();
        animationRef.current?.containerTl?.scrollTrigger?.kill();
        animationRef.current = null;
      };
    }, [item.title, preferReducedMotion]);

    return (
      <MagneticWrapper
        strength={0.12}
        dampening={0.09}
        radius={100}
        className="relative magnetic-item group"
      >
        <div
          ref={itemRef}
          className={`work-item relative z-20 px-3 py-4 sm:py-5 rounded-xl transition-all duration-300 ease-out flex items-center gap-3 font-medium tracking-tight max-w-full mx-auto ${color} active:scale-95 justify-center overflow-hidden hover:shadow-lg`}
          role="button"
          tabIndex={0}
          onClick={onClick}
          aria-label={item.title}
        >
          {/* Enhanced hover effect with gradient */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/15 to-white/0 pointer-events-none" />
          
          {/* Added subtle inner border */}
          <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Enhanced sparkle effect */}
          <SparkleEffect isActive={isSparkleActive} size={0.6} />

          <span
            className="text-xl relative z-10 transition-all duration-300 group-hover:scale-110 mr-1"
            aria-hidden="true"
          >
            {item.icon}
          </span>

          <span
            ref={textRef}
            className="hidden xs:inline relative z-10 transform transition-transform duration-300 text-white font-semibold text-sm whitespace-nowrap"
          >
            {preferReducedMotion ? item.title : null}
          </span>

          {/* Fallback for small screens */}
          <span className="xs:hidden relative z-10 transform transition-transform duration-300 text-white font-semibold text-sm">
            {item.title.split(" ")[0]}
          </span>
        </div>
      </MagneticWrapper>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.title === nextProps.item.title &&
      prevProps.isSparkleActive === nextProps.isSparkleActive &&
      prevProps.color === nextProps.color &&
      prevProps.onClick === nextProps.onClick
    );
  }
);

WorkItem.displayName = "WorkItem";

// Main Title Component
const Title = () => {
  const titleRef = useRef(null);
  const workItemsRef = useRef(null);
  const containerRef = useRef(null);
  const blobRef = useRef(null);
  const preferReducedMotion = isReducedMotion();

  // For sparkle animation effect
  const [sparkleIndices, setSparkleIndices] = useState([0, 3]);
  const intervalRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Updated work items to reflect your services
  const workItemsData = useMemo(
    () => [
      { title: "E-commerce Platforms", icon: "🛍️", category: "ecommerce" },
      { title: "Healthcare Solutions", icon: "⚕️", category: "healthcare" },
      { title: "EdTech Applications", icon: "📚", category: "edtech" },
      { title: "SaaS Development", icon: "☁️", category: "saas" },
      { title: "AI & ML Integration", icon: "🤖", category: "ai" },
      { title: "Custom Software", icon: "💻", category: "custom" },
    ],
    []
  );

  // Refined color palette - more modern and cohesive
  const colors = useMemo(
    () => [
      "bg-gradient-to-br from-blue-500 to-blue-700", // E-commerce
      "bg-gradient-to-br from-emerald-500 to-emerald-700", // Healthcare
      "bg-gradient-to-br from-amber-500 to-amber-700", // EdTech
      "bg-gradient-to-br from-indigo-500 to-indigo-700", // SaaS
      "bg-gradient-to-br from-violet-500 to-violet-700", // AI & ML
      "bg-gradient-to-br from-rose-500 to-rose-700", // Custom Software
    ],
    []
  );

  // Color assignment
  const uniqueColors = useMemo(() => {
    return workItemsData.map((_, index) => colors[index % colors.length]);
  }, [colors, workItemsData]);

  const handleCategoryClick = useCallback((category) => {
    setActiveCategory(category);
    // Dispatch event for parent component
    if (typeof window !== "undefined") {
      const event = new CustomEvent("category-selected", {
        detail: { category },
      });
      window.dispatchEvent(event);

      // Scroll to the work section
      const ourWorkSection = document.getElementById("our-work-section");
      if (ourWorkSection) {
        setTimeout(() => {
          ourWorkSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  // Sparkle animation effect
  useEffect(() => {
    if (preferReducedMotion || typeof window === "undefined") return;

    let isMounted = true;

    // Delay start for hydration stability
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (isMounted) {
          setSparkleIndices((prev) => {
            const length = workItemsData.length;
            if (length < 2) return prev;
            
            // Create a more randomized sparkle effect
            let nextIndex1 = Math.floor(Math.random() * length);
            let nextIndex2 = Math.floor(Math.random() * length);
            
            // Ensure indices are different
            while (nextIndex1 === nextIndex2) {
              nextIndex2 = Math.floor(Math.random() * length);
            }
            
            return [nextIndex1, nextIndex2];
          });
        }
      }, 2500);
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [workItemsData.length, preferReducedMotion]);

  // Listen for category updates
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
  }, []);

  // Main animation effect
  useEffect(() => {
    if (typeof window === "undefined" || preferReducedMotion) {
      return;
    }

    // Create GSAP context
    let ctx = gsap.context(() => {
      if (!containerRef.current || !titleRef.current || !workItemsRef.current) {
        return;
      }

      // Enhanced blob effect
      let blobElement = null;
      const createBlob = () => {
        const blob = document.createElement("div");
        blob.className = "blob absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none z-1 will-change-transform";
        
        // More vibrant gradient with better blending
        const gradients = [
          "rgba(59, 130, 246, 0.45)", // Blue
          "rgba(139, 92, 246, 0.35)", // Purple
          "rgba(34, 211, 238, 0.2)",  // Cyan
          "rgba(6, 182, 212, 0.1)",   // Light cyan
          "rgba(0, 0, 0, 0)",         // Transparent
        ];
        
        blob.style.background = `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradients[0]} 0%, ${gradients[1]} 25%, ${gradients[2]} 40%, ${gradients[3]} 65%, ${gradients[4]} 100%)`;
        blob.style.transition = "background 0.5s ease";
        blob.style.filter = "blur(40px)"; // Add blur for softer effect
        return blob;
      };

      // Create blob with slight delay
      const blobTimer = setTimeout(() => {
        if (containerRef.current && !blobRef.current) {
          blobElement = createBlob();
          blobRef.current = blobElement;
          containerRef.current.insertBefore(blobElement, containerRef.current.firstChild);
        }
      }, 100);

      // Blob animation
      let animationFrameId;
      let mouseX = 50;
      let mouseY = 50;
      let currentX = 50;
      let currentY = 50;
      const ease = (current, target, factor = 0.08) =>
        current + (target - current) * factor;

      const updateBlobPosition = () => {
        if (!blobRef.current) return;
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
      }, 16);

      // Start animation
      const interactionTimer = setTimeout(() => {
        if (containerRef.current) {
          updateBlobPosition();
          containerRef.current.addEventListener("mousemove", handleMouseMove);
        }
      }, 100);

      // Title Animation - Complete redesign
      const titleEl = titleRef.current;
      const titleText = titleEl.textContent || "Our Work";
      titleEl.innerHTML = "";

      const titleWrapper = document.createElement("div");
      titleWrapper.style.position = "relative";
      titleWrapper.style.display = "inline-block";
      titleWrapper.style.willChange = "transform";
      titleWrapper.className = "title-wrapper";

      // Split title into words first, then characters
      const words = titleText.split(" ");
      
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.position = "relative";
        wordSpan.className = "word";
        
        // Add characters
        const chars = word.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.position = "relative";
          span.style.willChange = "transform, opacity";
          span.className = "char";
          wordSpan.appendChild(span);
          return span;
        });
        
        titleWrapper.appendChild(wordSpan);
        
        // Add space after word (except last word)
        if (wordIndex < words.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          space.className = "word-space";
          titleWrapper.appendChild(space);
        }
      });
      
      titleEl.appendChild(titleWrapper);
      
      // Get all characters for animation
      const allChars = titleWrapper.querySelectorAll(".char");
      
      // Enhanced title animation with 3D effect
      gsap.fromTo(
        allChars,
        { 
          opacity: 0, 
          y: 50, 
          rotateX: -40,
          transformOrigin: "50% 50% -20px"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.03,
          ease: "back.out(1.7)",
          duration: 0.7,
          scrollTrigger: {
            trigger: titleEl,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
          onComplete: function() {
            this.scrollTrigger?.kill();
            
            // Add subtle hover animation after initial animation
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(allChars, {
              y: -5,
              stagger: 0.01,
              ease: "power2.out",
              duration: 0.4
            });
            
            titleWrapper.addEventListener("mouseenter", () => hoverTl.play());
            titleWrapper.addEventListener("mouseleave", () => hoverTl.reverse());
          }
        }
      );

      // Interactive tilt effect for title
      const handleTitleMouseMove = throttle((e) => {
        if (!titleWrapper) return;
        const rect = titleWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8; // Reduced tilt for subtlety
        const rotateX = -((e.clientY - centerY) / rect.height) * 8;
        
        gsap.to(titleWrapper, {
          rotateY,
          rotateX,
          transformPerspective: 1000,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power2.out",
        });
      }, 16);

      const handleMouseLeave = () => {
        gsap.to(titleWrapper, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      titleWrapper.addEventListener("mousemove", handleTitleMouseMove);
      titleWrapper.addEventListener("mouseleave", handleMouseLeave);

      // Work Items Animation
      const workItemsContainer = workItemsRef.current;
      const workItems = gsap.utils.toArray(workItemsContainer.children);

      if (workItems.length > 0) {
        gsap.set(workItems, {
          opacity: 0,
          scale: 0.95,
          y: 25,
          rotateX: -3,
          force3D: true,
        });

        // Improved staggered entrance with better visual flow
        ScrollTrigger.batch(workItems, {
          batchMax: 3,
          start: "top bottom-=80px",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              stagger: { 
                each: 0.12,
                from: "start" // Start from the first element
              },
              duration: 0.75,
              ease: "back.out(1.4)",
              overwrite: true,
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              scale: 0.95,
              y: 25,
              rotateX: -3,
              stagger: 0.08,
              duration: 0.5,
              ease: "power2.in",
              overwrite: true,
            }),
        });
      }

      // Cleanup function
      return () => {
        clearTimeout(blobTimer);
        clearTimeout(interactionTimer);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        if (containerRef.current) {
          containerRef.current.removeEventListener("mousemove", handleMouseMove);
        }
        
        if (titleWrapper) {
          titleWrapper.removeEventListener("mousemove", handleTitleMouseMove);
          titleWrapper.removeEventListener("mouseleave", handleMouseLeave);
        }
        
        if (blobRef.current?.parentNode) {
          blobRef.current.remove();
          blobRef.current = null;
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, [preferReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="min-h-[90vh] xs:min-h-[95vh] py-16 xs:py-20 sm:py-24 md:py-28 flex flex-col items-center justify-center relative px-3 xs:px-4 sm:px-6 md:px-8 overflow-hidden bg-black isolate"
    >
      {/* Enhanced background with better gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.15),transparent_80%)] opacity-70 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#07070c] -z-10" />

      {/* Subtle pattern overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] -z-10" />
      <div className="absolute inset-0 bg-noise-pattern mix-blend-overlay opacity-[0.025] -z-10 pointer-events-none" />

      {/* Main title with enhanced styling */}
      <h1
        ref={titleRef}
        className="text-white text-9xl xs:text-10xl sm:text-11xl md:text-12xl lg:text-13xl font-black relative z-10 text-center mb-12 xs:mb-14 sm:mb-16 md:mb-18 px-2 xs:px-4 leading-tight tracking-tight [text-wrap:balance] select-none transition-all duration-500"
      >
        Our Work {/* Initial text for SSR/non-JS */}
      </h1>

      {/* Service items grid with improved spacing */}
      <div
        ref={workItemsRef}
        className="w-full max-w-[96%] xs:max-w-[94%] sm:max-w-[92%] md:max-w-[88%] lg:max-w-[84%] mt-4 xs:mt-6 sm:mt-8 relative z-20 grid grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 [perspective:2000px] px-2 xs:px-3 sm:px-4"
        role="list"
        aria-label="Our services"
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

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] pointer-events-none opacity-60 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-black/30 to-transparent" />
      </div>
    </div>
  );
};

export default React.memo(Title);