import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const useMagneticEffect = (
  strength = 0.3,
  dampening = 0.8,
  smoothing = 0.2,
  radius = 100
) => {
  const magneticRef = useRef(null);
  const frame = useRef(null);
  const velocity = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  const updateTransform = useCallback(
    (target, offsetX, offsetY, immediate = false) => {
      if (!target) return;

      // Apply velocity with smoothing
      if (!immediate) {
        velocity.current.x = lerp(
          velocity.current.x,
          offsetX,
          smoothing
        );
        velocity.current.y = lerp(
          velocity.current.y,
          offsetY,
          smoothing
        );
      } else {
        velocity.current.x = offsetX;
        velocity.current.y = offsetY;
      }

      gsap.to(target, {
        x: velocity.current.x,
        y: velocity.current.y,
        duration: immediate ? 0 : 0.45,
        ease: "power2.out",
      });
    },
    [smoothing]
  );

  const handleMouseMove = useCallback(
    (e) => {
      const target = magneticRef.current;
      if (!target) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = target.getBoundingClientRect();
      const midX = left + width / 2;
      const midY = top + height / 2;
      const dx = clientX - midX;
      const dy = clientY - midY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Dynamic strength based on distance
      const distanceStrength = Math.max(0, 1 - distance / radius);
      const effectiveStrength = strength * distanceStrength * dampening;
      
      // Apply non-linear transformation for more natural movement
      const angle = Math.atan2(dy, dx);
      const pull = Math.min(distance, radius) / radius;
      const offsetX = Math.cos(angle) * pull * effectiveStrength * distance;
      const offsetY = Math.sin(angle) * pull * effectiveStrength * distance;

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (distance <= radius) {
          isHovered.current = true;
          updateTransform(target, offsetX, offsetY);
        } else if (isHovered.current) {
          handleMouseLeave();
        }
      });
    },
    [strength, dampening, radius, updateTransform]
  );

  const handleMouseLeave = useCallback(() => {
    const target = magneticRef.current;
    if (!target) return;
    
    isHovered.current = false;
    if (frame.current) cancelAnimationFrame(frame.current);
    
    // Smooth return to original position
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        velocity.current = { x: 0, y: 0 };
      },
    });
  }, []);

  // Add touch support
  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    },
    [handleMouseMove]
  );

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    // Add touch event listeners
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleMouseLeave);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      if (element) {
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleMouseLeave);
      }
    };
  }, [handleTouchMove, handleMouseLeave]);

  return { magneticRef, handleMouseMove, handleMouseLeave };
};

export default useMagneticEffect;
