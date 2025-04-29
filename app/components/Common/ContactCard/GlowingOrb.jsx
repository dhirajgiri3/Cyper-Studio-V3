import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * GlowingOrb Component
 * 
 * A decorative background element that creates a glowing orb effect
 * with customizable position, color, intensity, and animation.
 * 
 * @param {Object} props
 * @param {string} props.position - Position of the orb: "top-left", "top-right", "bottom-left", "bottom-right", "center"
 * @param {string} props.color - Color theme of the orb: "blue", "purple", "green", "amber", "cyan", etc.
 * @param {number} props.intensity - Brightness/opacity of the orb (0-1)
 * @param {boolean} props.pulse - Whether the orb should pulse/animate
 */
const GlowingOrb = memo(({ 
  position = "top-left", 
  color = "blue", 
  intensity = 0.7,
  pulse = false 
}) => {
  // Map color names to gradient values
  const colorMap = useMemo(() => ({
    blue: {
      primary: "rgba(59, 130, 246, 0.5)",
      secondary: "rgba(37, 99, 235, 0.2)",
      tertiary: "rgba(96, 165, 250, 0.1)"
    },
    purple: {
      primary: "rgba(139, 92, 246, 0.5)",
      secondary: "rgba(124, 58, 237, 0.2)",
      tertiary: "rgba(167, 139, 250, 0.1)"
    },
    green: {
      primary: "rgba(16, 185, 129, 0.5)",
      secondary: "rgba(5, 150, 105, 0.2)",
      tertiary: "rgba(52, 211, 153, 0.1)"
    },
    amber: {
      primary: "rgba(245, 158, 11, 0.5)",
      secondary: "rgba(217, 119, 6, 0.2)",
      tertiary: "rgba(251, 191, 36, 0.1)"
    },
    cyan: {
      primary: "rgba(6, 182, 212, 0.5)",
      secondary: "rgba(8, 145, 178, 0.2)",
      tertiary: "rgba(34, 211, 238, 0.1)"
    },
    // Default fallback
    default: {
      primary: "rgba(59, 130, 246, 0.5)",
      secondary: "rgba(37, 99, 235, 0.2)",
      tertiary: "rgba(96, 165, 250, 0.1)"
    }
  }), []);

  // Get color values based on the color prop
  const colorValues = useMemo(() => {
    return colorMap[color] || colorMap.default;
  }, [color, colorMap]);

  // Determine position classes
  const positionClasses = useMemo(() => {
    switch (position) {
      case "top-left":
        return "-top-40 -left-40";
      case "top-right":
        return "-top-40 -right-40";
      case "bottom-left":
        return "-bottom-40 -left-40";
      case "bottom-right":
        return "-bottom-40 -right-40";
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      default:
        return "-top-40 -left-40"; // Default to top-left
    }
  }, [position]);

  // Animation variants for pulsing effect
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [intensity, intensity * 1.2, intensity],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    static: {
      scale: 1,
      opacity: intensity
    }
  };

  return (
    <motion.div
      className={`absolute ${positionClasses} w-80 h-80 rounded-full pointer-events-none z-0`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={pulse ? "pulse" : "static"}
      variants={pulseVariants}
      transition={{ duration: 1 }}
      style={{
        background: `radial-gradient(circle, ${colorValues.primary} 0%, ${colorValues.secondary} 40%, ${colorValues.tertiary} 70%, transparent 100%)`,
        filter: "blur(40px)",
        willChange: "transform, opacity"
      }}
    />
  );
});

GlowingOrb.displayName = "GlowingOrb";
export default GlowingOrb;
