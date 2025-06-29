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

    // Enhanced 3D effect with more pronounced tilt
    // Using a smaller divisor for stronger effect
    const x = (e.clientX - rect.left - rect.width / 2) / 40; // Changed from 60 to 40
    const y = (e.clientY - rect.top - rect.height / 2) / 40; // Changed from 60 to 40

    // Enhanced tilt effect for cards without background image
    const noBackgroundEnhancement = !project.backgroundImage ? 1.8 : 0.8; // Increased from 1.2 to 1.8

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      if (cardRef.current) {
        // Enhanced perspective and rotation for more dramatic 3D effect
        cardRef.current.style.transform = `perspective(800px) rotateX(${-y * noBackgroundEnhancement}deg) rotateY(${x * noBackgroundEnhancement}deg) scale3d(1.02, 1.02, 1.02)`;

        // Enhanced parallax effect for text cards
        if (!project.backgroundImage && imageRef.current) {
          // More pronounced parallax effect for the text background
          const moveX = x * 2.5; // Increased from 1 to 2.5
          const moveY = y * 2.5; // Increased from 1 to 2.5
          imageRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;

          // Add subtle rotation to inner content for enhanced 3D effect
          if (contentRef.current) {
            contentRef.current.style.transform = `translate3d(${moveX * 0.5}px, ${moveY * 0.5}px, 20px)`;
          }
        }
      }
    });
  }, [preferReducedMotion, project.backgroundImage]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || preferReducedMotion) return;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      if (cardRef.current) {
        // Smooth transition back to default state
        cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      }

      // Reset image transform for cards without background
      if (!project.backgroundImage && imageRef.current) {
        imageRef.current.style.transform = "translate3d(0, 0, 0) scale(1.05)";
      }

      // Reset content transform
      if (!project.backgroundImage && contentRef.current) {
        contentRef.current.style.transform = "translate3d(0, 0, 0)";
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
        transformPerspective: "1500px", // Enhanced perspective for better 3D effect
        transformStyle: "preserve-3d", // Ensure 3D effect is preserved
        height: "100%",
        minHeight: CARD_MIN_DIMENSIONS.height[variant === "hero" ? "lg" : "md"],
        willChange: "transform", // Performance optimization
      }}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 1.2,
          delay: index * 0.1,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover="hover"
    >
      <Link href={project.link || "/"} className="block h-full w-full">
        <motion.div
          className={`relative h-full w-full rounded-[20px] overflow-hidden bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-transparent backdrop-blur-xl transition-all duration-500 ease-out group-hover:from-white/[0.18] group-hover:via-white/[0.12] group-hover:to-transparent ${variant === "mobile" ? "p-4 xs:p-5 sm:p-6" : ""}`}
          style={{
            padding: dynamicPadding?.padding,
            transformStyle: "preserve-3d",
            transition: "box-shadow 0.5s ease-out, transform 0.3s ease-out"
          }}
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
              {/* Enhanced gradient background when no image is available */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50" />

              {/* Subtle noise texture for depth */}
              <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-noise-pattern" />

              {/* Refined animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[10%] opacity-40">
                  {/* Larger, more subtle gradient blobs */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-blob-slow transform-gpu" />
                  <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tr from-indigo-500/30 to-pink-500/30 rounded-full blur-3xl animate-blob-slow-reverse transform-gpu" />
                </div>
              </div>

              {/* Project name as fancy text - simplified and more elegant */}
              <div className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
                  }}
                >
                  {/* Simplified background elements */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Subtle animated accent */}
                    <div className="absolute w-[140%] h-[140%] opacity-20">
                      <div className="absolute top-1/3 left-1/3 w-2/3 h-2/3 rounded-full bg-blue-400/30 animate-blob-slow transform-gpu" />
                      <div className="absolute bottom-1/3 right-1/3 w-2/3 h-2/3 rounded-full bg-purple-400/30 animate-blob-slow-reverse transform-gpu" />
                    </div>

                    {/* Refined particle effect - fewer particles for cleaner look */}
                    {!preferReducedMotion && (
                      <div className="absolute inset-0 opacity-40">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full bg-white/60 hardware-accelerated"
                            style={{
                              width: `${Math.random() * 4 + 2}px`,
                              height: `${Math.random() * 4 + 2}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animation: `floating ${Math.random() * 15 + 20}s linear infinite`,
                              animationDelay: `${Math.random() * 5}s`,
                              transform: 'translateZ(0)'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Main text - cleaner layout with better typography */}
                  <motion.div
                    className="relative z-10 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
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
                    {/* Project name with enhanced text styling */}
                    <div className="relative">
                      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center tracking-tight leading-none select-none">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">{project.name}</span>
                      </h2>
                      {/* Subtle glow effect */}
                      <div className="absolute -inset-1 bg-white/5 blur-xl opacity-50 rounded-full"></div>
                    </div>

                    {/* Simplified tagline with better spacing */}
                    {project.tagline && (
                      <p className="text-sm sm:text-base md:text-lg text-white/80 text-center max-w-md mt-4 sm:mt-6 px-4 backdrop-blur-sm bg-black/10 rounded-full py-2 border border-white/10">
                        {project.tagline}
                      </p>
                    )}
                  </motion.div>

                  {/* Simplified decorative elements - just one horizontal line for cleaner look */}
                  <div className="absolute -inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-y-1/2" />

                  {/* Simplified corner accents - just two corners for cleaner look */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-white/30 rounded-tl-lg" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-white/30 rounded-br-lg" />
                </motion.div>
              </div>

              {/* Improved overlay gradient for content readability */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b transition-opacity duration-500"
                style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.8) 100%)` }}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 0.6 }}
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