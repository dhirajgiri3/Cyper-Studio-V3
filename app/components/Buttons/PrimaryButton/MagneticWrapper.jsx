import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { throttleFrame, debounceFrame } from '../utils/performanceUtils';

const MagneticWrapper = ({
  children,
  className = '',
  as: Component = 'div',
  strength = 0.35,
  dampening = 0.15,
  radius = 150,
  disabled = false,
  ...props
}) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const activeAnimation = useRef(null);
  const isHovered = useRef(false);
  const rectRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });

  // Memoize the lerp function to avoid recreating it on each render
  const lerp = useMemo(() => {
    return (start, end, factor) => start * (1 - factor) + end * factor;
  }, []);

  // Create throttled and debounced functions outside of the effect
  const throttledMouseMove = useMemo(() => {
    return throttleFrame((e, targetXY, rect, isHovered, animate) => {
      const { clientX, clientY } = e;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        // Enhanced easing curve for more natural movement
        const easeFactor = Math.pow(1 - Math.min(distance / radius, 1), 1.5);
        targetXY.x = distanceX * strength * easeFactor;
        targetXY.y = distanceY * strength * easeFactor;

        if (!isHovered.current) {
          isHovered.current = true;
          animate();
        }
      } else if (isHovered.current) {
        targetXY.x = 0;
        targetXY.y = 0;
      }
    });
  }, [radius, strength]);

  const debouncedUpdateRect = useMemo(() => {
    return debounceFrame((wrapper, rectRef) => {
      if (wrapper) {
        rectRef.current = wrapper.getBoundingClientRect();
      }
    }, 100);
  }, []);

  useEffect(() => {
    // Skip all effects if disabled
    if (disabled) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const updateRect = () => {
      debouncedUpdateRect(wrapper, rectRef);
    };

    // Use refs to store state between renders
    const targetXY = { x: 0, y: 0 };
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      if (!isHovered.current) return;

      // Enhanced smooth movement with velocity
      velocityRef.current.x = lerp(velocityRef.current.x, targetXY.x - currentX, 0.1);
      velocityRef.current.y = lerp(velocityRef.current.y, targetXY.y - currentY, 0.1);

      currentX += velocityRef.current.x * dampening;
      currentY += velocityRef.current.y * dampening;

      // Add slight rotation based on movement - limit rotation for better performance
      const rotationX = Math.min(Math.max(currentY * 0.05, -5), 5); // Clamp between -5 and 5 degrees
      const rotationY = Math.min(Math.max(-currentX * 0.05, -5), 5); // Clamp between -5 and 5 degrees

      // Use GSAP batching for better performance
      gsap.set(content, {
        x: currentX,
        y: currentY,
        rotateX: rotationX,
        rotateY: rotationY,
        force3D: true,
        transformPerspective: 1000,
        immediateRender: false // Avoid forcing immediate render
      });

      activeAnimation.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (!rectRef.current) updateRect();
      throttledMouseMove(e, targetXY, rectRef.current, isHovered, animate);
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      velocityRef.current = { x: 0, y: 0 };

      // Use a simpler animation for better performance
      gsap.to(content, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5, // Shorter duration for better performance
        ease: 'power2.out' // Simpler easing function
      });
    };

    // Initial setup
    updateRect();

    // Use passive event listeners for better performance
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    wrapper.addEventListener('mousemove', handleMouseMove, { passive: true });
    wrapper.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      if (activeAnimation.current) {
        cancelAnimationFrame(activeAnimation.current);
        activeAnimation.current = null;
      }
    };
  }, [strength, dampening, radius, disabled, lerp, throttledMouseMove, debouncedUpdateRect]);

  // If disabled, render without magnetic effect
  if (disabled) {
    return (
      <Component
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={wrapperRef}
      className={`magnetic-wrapper ${className}`}
      style={{
        touchAction: 'none',
        perspective: '1000px'
      }}
      {...props}
    >
      <div
        ref={contentRef}
        className="magnetic-content w-full h-full"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default React.memo(MagneticWrapper);