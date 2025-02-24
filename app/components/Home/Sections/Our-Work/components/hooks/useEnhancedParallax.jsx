// /hooks/useEnhancedParallax.jsx

import { useEffect, useRef } from "react";
import { useScroll, useSpring, useMotionValue } from "framer-motion";

export const useEnhancedParallax = (ref, options = {}) => {
  const { sensitivity = 30, rotation = false, scale = false, depth = 1 } = options;
  const { scrollY } = useScroll();
  // Softer spring for smoother, more natural motion
  const springConfig = { stiffness: 200, damping: 40, mass: 1 };
  const y = useSpring(useMotionValue(0), springConfig);
  const scaleValue = useSpring(1, springConfig);
  const rotateX = useSpring(0, springConfig);
  const elementData = useRef({ offsetTop: 0, height: 0 });

  // Cache offsetTop and height on mount
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      elementData.current = {
        offsetTop: rect.top + window.scrollY,
        height: rect.height,
      };
    }
  }, [ref]);

  // Calculate parallax using cached values
  useEffect(() => {
    const calculateParallax = (currentScrollY) => {
      const { offsetTop, height } = elementData.current;
      if (!offsetTop || !height) return;
      const elementCenterY = offsetTop + height / 2;
      const viewportCenterY = currentScrollY + window.innerHeight / 2;
      const distanceFromCenter = elementCenterY - viewportCenterY;
      const parallaxY = (distanceFromCenter * sensitivity * depth) / 1000;
      y.set(-parallaxY);
      if (scale) {
        const scrollProgress = Math.abs(distanceFromCenter) / (window.innerHeight / 2);
        const scaleAmount = 1 - Math.min(0.1, scrollProgress * 0.05); // Subtler scale
        scaleValue.set(scaleAmount);
      }
      if (rotation) {
        const rotationAmount = distanceFromCenter * 0.015; // Smoother rotation
        rotateX.set(rotationAmount);
      }
    };
    const unsubscribe = scrollY.onChange(calculateParallax);
    return () => unsubscribe();
  }, [scrollY, y, scaleValue, rotateX, sensitivity, rotation, scale, depth]);

  return { y, scale: scaleValue, rotateX };
};