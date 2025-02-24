// /ProjectItem.jsx

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEnhancedParallax } from "./hooks/useEnhancedParallax";
import MagneticButton from "./MagneticButton";
import { calculateDynamicPadding } from "./utils/layoutUtils";
import { ANIMATION_VARIANTS } from "./utils/animationUtils";
import { CARD_MIN_DIMENSIONS } from "./constants/cardConstants";

const ProjectItem = ({ project, index, variant, totalProjects }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const [dynamicPadding, setDynamicPadding] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setCardDimensions({ width, height });
      setDynamicPadding(calculateDynamicPadding(width, height, variant));
    });
    resizeObserver.observe(cardRef.current);
    return () => resizeObserver.disconnect();
  }, [variant]);

  const getParallaxConfig = (variant) => ({
    hero: { sensitivity: 25, depth: 1.2 },
    vertical: { sensitivity: 20, depth: 1 },
    wide: { sensitivity: 18, depth: 0.9 },
    normal: { sensitivity: 15, depth: 0.7 },
    square: { sensitivity: 18, depth: 0.9 },
  }[variant] || { sensitivity: 15, depth: 0.7 });

  const cardParallax = useEnhancedParallax(cardRef, { ...getParallaxConfig(variant), rotation: true, scale: true });
  const imageParallax = useEnhancedParallax(imageRef, { sensitivity: 35, depth: 1.3 });
  const contentParallax = useEnhancedParallax(contentRef, { sensitivity: 20, depth: 0.4 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative h-full w-full transition-all duration-300 ease-out hover:z-30 ${variant === "mobile" ? "aspect-[4/5] xs:aspect-[3/4]" : ""}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        y: cardParallax.y,
        rotateX: cardParallax.rotateX,
        scale: cardParallax.scale,
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

          <motion.div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.backgroundImage})`, y: imageParallax.y, scale: 1.05 }}
            variants={ANIMATION_VARIANTS.image}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b transition-opacity duration-500"
              style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.9) 100%)` }}
              initial={{ opacity: 0.75 }}
              whileHover={{ opacity: 0.55 }}
            />
          </motion.div>

          <motion.div
            ref={contentRef}
            className={`relative h-full flex flex-col justify-end ${variant === "mobile" ? "gap-3 xs:gap-4" : "gap-4 md:gap-6"}`}
            style={{ y: contentParallax.y, gap: dynamicPadding?.elementSpacing }}
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
};

export default ProjectItem;