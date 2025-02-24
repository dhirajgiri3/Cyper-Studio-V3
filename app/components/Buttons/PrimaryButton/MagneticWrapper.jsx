import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticWrapper = ({
  children,
  className = '',
  as: Component = 'div',
  strength = 0.35,
  dampening = 0.15,
  radius = 150,
  ...props
}) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const activeAnimation = useRef(null);
  const isHovered = useRef(false);
  const rectRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const updateRect = () => {
      rectRef.current = wrapper.getBoundingClientRect();
    };

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

    const animate = () => {
      if (!isHovered.current) return;
      
      // Enhanced smooth movement with velocity
      velocityRef.current.x = lerp(velocityRef.current.x, targetX - currentX, 0.1);
      velocityRef.current.y = lerp(velocityRef.current.y, targetY - currentY, 0.1);
      
      currentX += velocityRef.current.x * dampening;
      currentY += velocityRef.current.y * dampening;

      // Add slight rotation based on movement
      const rotationX = currentY * 0.05;
      const rotationY = -currentX * 0.05;

      gsap.set(content, {
        x: currentX,
        y: currentY,
        rotateX: rotationX,
        rotateY: rotationY,
        force3D: true,
        transformPerspective: 1000,
        immediateRender: true
      });

      activeAnimation.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (!rectRef.current) updateRect();
      
      const rect = rectRef.current;
      const { clientX, clientY } = e;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      if (distance < radius) {
        // Enhanced easing curve for more natural movement
        const easeFactor = Math.pow(1 - Math.min(distance / radius, 1), 1.5);
        targetX = distanceX * strength * easeFactor;
        targetY = distanceY * strength * easeFactor;
        
        if (!isHovered.current) {
          isHovered.current = true;
          animate();
        }
      } else if (isHovered.current) {
        targetX = 0;
        targetY = 0;
      }
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      velocityRef.current = { x: 0, y: 0 };
      
      gsap.to(content, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      if (activeAnimation.current) {
        cancelAnimationFrame(activeAnimation.current);
      }
    };
  }, [strength, dampening, radius]);

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
          transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default React.memo(MagneticWrapper);