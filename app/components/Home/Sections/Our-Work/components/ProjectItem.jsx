// /ProjectItem.jsx

import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// Removed parallax import
import MagneticButton from "./MagneticButton";
import { calculateDynamicPadding } from "./utils/layoutUtils";
import { ANIMATION_VARIANTS } from "./utils/animationUtils";
import { CARD_MIN_DIMENSIONS } from "./constants/cardConstants";
import { isReducedMotion } from "../../../../Buttons/utils/performanceUtils";

const ProjectItem = memo(({ project, index, variant, totalProjects }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const [dynamicPadding, setDynamicPadding] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const preferReducedMotion = isReducedMotion();

  useEffect(() => {
    if (!cardRef.current) return;

    // Use a more efficient resize observation approach
    const updateDimensions = () => {
      if (!cardRef.current) return;
      const width = cardRef.current.offsetWidth;
      const height = cardRef.current.offsetHeight;

      if (width !== cardDimensions.width || height !== cardDimensions.height) {
        setCardDimensions({ width, height });
        setDynamicPadding(calculateDynamicPadding(width, height, variant));
      }
    };

    // Initial measurement
    updateDimensions();

    // Set up resize observer with lower frequency for performance
    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(updateDimensions);
    });

    resizeObserver.observe(cardRef.current);
    return () => resizeObserver.disconnect();
  }, [variant, cardDimensions.width, cardDimensions.height]);

  // Mouse hover effects are handled separately, so we don't need parallax config anymore

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || preferReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Reduce the divisor to make the effect more subtle (from 30 to 60)
    const x = (e.clientX - rect.left - rect.width / 2) / 60;
    const y = (e.clientY - rect.top - rect.height / 2) / 60;

    // Reduced enhancement for cards without background image
    const noBackgroundEnhancement = !project.backgroundImage ? 1.2 : 0.8;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * noBackgroundEnhancement}deg) rotateY(${x * noBackgroundEnhancement}deg) scale3d(1.01, 1.01, 1.01)`;

        // Add mouse-follow effect for text cards
        if (!project.backgroundImage && imageRef.current) {
          // Subtle parallax effect for the text background
          const moveX = x * 1; // Reduced from 2 to 1
          const moveY = y * 1; // Reduced from 2 to 1
          imageRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.03)`;
        }
      }
    });
  }, [preferReducedMotion, project.backgroundImage]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || preferReducedMotion) return;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      }

      // Reset image transform for cards without background
      if (!project.backgroundImage && imageRef.current) {
        imageRef.current.style.transform = "translate3d(0, 0, 0) scale(1.05)";
      }
    });
  }, [preferReducedMotion, project.backgroundImage]);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative h-full w-full transition-all duration-300 ease-out hover:z-30 ${variant === "mobile" ? "aspect-[4/5] xs:aspect-[3/4]" : ""}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: "2000px",
        height: "100%",
        minHeight: CARD_MIN_DIMENSIONS.height[variant === "hero" ? "lg" : "md"],
      }}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 1.2, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] } }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover="hover"
    >
      <Link href={project.link || "/"} className="block h-full w-full">
        <motion.div
          className={`relative h-full w-full rounded-[20px] overflow-hidden bg-gradient-to-br from-white/[0.1] via-white/[0.06] to-transparent backdrop-blur-xl transition-all duration-500 ease-out group-hover:from-white/[0.14] group-hover:via-white/[0.1] group-hover:to-transparent shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] ${variant === "mobile" ? "p-4 xs:p-5 sm:p-6" : ""}`}
          style={{ padding: dynamicPadding?.padding, transformStyle: "preserve-3d" }}
          variants={ANIMATION_VARIANTS.card}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] to-purple-500/[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.06] to-transparent" />
            <div className="absolute inset-0 border border-white/15 rounded-[20px] group-hover:border-white/25 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/85" />
          </div>

          {project.backgroundImage ? (
            <motion.div
              ref={imageRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.backgroundImage})`, scale: 1.05 }}
              variants={ANIMATION_VARIANTS.image}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b transition-opacity duration-500"
                style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.9) 100%)` }}
                initial={{ opacity: 0.75 }}
                whileHover={{ opacity: 0.55 }}
              />
            </motion.div>
          ) : (
            <motion.div
              ref={imageRef}
              className="absolute inset-0 overflow-hidden"
              variants={ANIMATION_VARIANTS.image}
            >
              {/* Fancy text background when no image is available */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-indigo-900/40" />

              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[10%] opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob-slow" />
                  <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-blob-slow-reverse" />
                </div>
              </div>

              {/* Project name as fancy text */}
              <div className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
                  }}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Animated circles */}
                    <div className="absolute w-[120%] h-[120%] opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-blue-500/20 animate-blob-slow" />
                      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/20 animate-blob-slow-reverse" />
                    </div>

                    {/* Particle effect - conditionally rendered based on device performance */}
                    {!preferReducedMotion && (
                      <div className="absolute inset-0 opacity-30">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full bg-white/50 hardware-accelerated"
                            style={{
                              width: `${Math.random() * 6 + 2}px`,
                              height: `${Math.random() * 6 + 2}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animation: `floating ${Math.random() * 10 + 15}s linear infinite`,
                              animationDelay: `${Math.random() * 5}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Main text */}
                  <motion.div
                    className="relative z-10 flex flex-col items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.25, 0.4, 0.25, 1]
                      }
                    }}
                  >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center tracking-tight leading-none select-none">
                      <span className="block text-shimmer">{project.name}</span>
                    </h2>

                    {project.tagline && (
                      <p className="text-sm sm:text-base md:text-lg text-white/70 text-center max-w-md mt-2 sm:mt-4">
                        {project.tagline}
                      </p>
                    )}
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2 border-pulse" />
                  <div className="absolute inset-y-10 -left-px w-px bg-gradient-to-b from-transparent via-white/20 to-transparent border-pulse" />
                  <div className="absolute inset-y-10 -right-px w-px bg-gradient-to-b from-transparent via-white/20 to-transparent border-pulse" />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/20 rounded-tl-lg border-pulse" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20 rounded-tr-lg border-pulse" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/20 rounded-bl-lg border-pulse" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/20 rounded-br-lg border-pulse" />
                </motion.div>
              </div>

              {/* Overlay gradient for content readability */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b transition-opacity duration-500"
                style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)` }}
                initial={{ opacity: 0.75 }}
                whileHover={{ opacity: 0.55 }}
              />
            </motion.div>
          )}

          <motion.div
            ref={contentRef}
            className={`relative h-full flex flex-col justify-end ${variant === "mobile" ? "gap-3 xs:gap-4" : "gap-4 md:gap-6"}`}
            style={{ gap: dynamicPadding?.elementSpacing }}
            variants={ANIMATION_VARIANTS.content}
          >
            <div className={`space-y-3 ${variant === "mobile" ? "xs:space-y-3" : "xs:space-y-4"}`}>
              <motion.div className="flex flex-wrap items-center gap-1.5 xs:gap-2" initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ delay: 0.15 }}>
                {project.tags?.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 xs:px-3 py-1 xs:py-1.5 text-[11px] xs:text-xs font-medium tracking-wide text-white/95 bg-black/15 rounded-full border border-white/[0.2] transition-all duration-300 backdrop-blur-md group-hover:bg-black/25 group-hover:border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <div className="space-y-2 xs:space-y-3">
                <h3 className={`font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-white ${variant === "mobile" ? "text-base xs:text-lg sm:text-xl" : "text-lg xs:text-xl sm:text-2xl lg:text-3xl"}`}>
                  {project.name}
                </h3>
                <p className={`text-white/75 line-clamp-2 xs:line-clamp-3 transition-colors duration-300 group-hover:text-white ${variant === "mobile" ? "text-xs xs:text-sm" : "text-sm xs:text-base"}`}>
                  {project.tagline}
                </p>
              </div>
            </div>
          </motion.div>

          {variant !== "mobile" && (
            <div className="hidden lg:block">
              <MagneticButton isVisible={isHovered} />
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;