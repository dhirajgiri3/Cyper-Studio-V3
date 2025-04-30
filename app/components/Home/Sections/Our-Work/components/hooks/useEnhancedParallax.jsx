// /hooks/useEnhancedParallax.jsx

import { useSpring, useMotionValue } from "framer-motion";

export const useEnhancedParallax = (ref, options = {}) => {
  // Even softer spring for smoother, more natural motion with less oscillation
  const springConfig = { stiffness: 100, damping: 70, mass: 1.2 };

  // Return static values instead of scroll-based parallax values
  // This effectively disables the scroll-based parallax effect
  const y = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  const rotateX = useMotionValue(0);

  return { y, scale: scaleValue, rotateX };
};