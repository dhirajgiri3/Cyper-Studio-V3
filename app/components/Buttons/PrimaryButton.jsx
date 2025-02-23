import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import MagneticWrapper from './MagneticWrapper';
import BlobEffect from './BlobEffect';
import BorderGradient from './BorderGradient';
import { ParticleEffect } from './ParticleEffect';
import { sizeClasses, variantClasses, glowEffects } from './buttonStyles';
import { createRipples } from './buttonEffects';
import * as perf from './utils/performanceUtils';

const MAX_PARTICLES = 12;

const PrimaryButton = ({
  children,
  className = '',
  size = 'medium',
  variant = 'primary',
  withBlob = false,
  withBorder = false,
  withParticles = false,
  withRipple = true,
  particleColor,
  blobColor,
  rippleOptions = { duration: 600, color: 'rgba(255,255,255,0.8)' },
  additionalStyles = {},
  ...props
}) => {
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const cleanupRef = useRef(null);

  // Initialize performance optimizations
  useEffect(() => {
    if (buttonRef.current) {
      cleanupRef.current = perf.optimizeElement(buttonRef.current);
    }
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      setParticles([]);
    };
  }, []);

  const buttonClassNames = useMemo(() => `
    relative inline-flex items-center justify-center
    font-medium tracking-wide overflow-hidden whitespace-nowrap
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${glowEffects[variant]}
    ${className}
    button-container z-10
  `, [size, variant, className]);

  // Throttled particle creation on mouse move
  const addParticle = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const particle = {
      id: uuidv4(),
      x, y,
      initialX: x,
      initialY: y,
    };
    setParticles(prev => [...prev, particle].slice(-MAX_PARTICLES));
  }, []);

  const addParticleThrottled = useMemo(() => perf.throttleFrame(addParticle), [addParticle]);

  const handleMouseDown = useCallback((e) => {
    if (withRipple && buttonRef.current) {
      e.persist();
      requestAnimationFrame(() => {
        // Pass customization options for ripple effect if needed
        createRipples(e, buttonRef.current, rippleOptions);
      });
    }
  }, [withRipple, rippleOptions]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setParticles([]);
  }, []);

  let wrappedButton = (
    <motion.button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={withParticles ? addParticleThrottled : undefined}
      className={buttonClassNames}
      style={{
        ...additionalStyles,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased',
      }}
      whileHover={{ 
        scale: 1,
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      {withParticles && isHovered && (
        <AnimatePresence mode="sync">
          <ParticleEffect 
            key="particles"
            particles={particles} 
            color={particleColor}
          />
        </AnimatePresence>
      )}
    </motion.button>
  );

  if (withBorder) {
    wrappedButton = <BorderGradient>{wrappedButton}</BorderGradient>;
  }

  if (withBlob) {
    wrappedButton = <BlobEffect color={blobColor}>{wrappedButton}</BlobEffect>;
  }

  return (
    <MagneticWrapper
      strength={0.2}
      dampening={0.8}
      radius={100}
    >
      {wrappedButton}
    </MagneticWrapper>
  );
};

export default React.memo(PrimaryButton);
