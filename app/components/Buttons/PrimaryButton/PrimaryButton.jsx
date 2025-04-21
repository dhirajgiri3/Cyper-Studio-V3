import React, { useState, useCallback, useMemo, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import MagneticWrapper from './MagneticWrapper';
import { sizeClasses, variantClasses, glowEffects } from './buttonStyles';
import { createRipples } from './buttonEffects';
import * as perf from '../utils/performanceUtils';

// Lazy load non-essential components for better performance
const BlobEffect = lazy(() => import('./BlobEffect'));
const BorderGradient = lazy(() => import('./BorderGradient'));
const ParticleEffect = lazy(() => import('./ParticleEffect').then(mod => ({ default: mod.ParticleEffect })));

// Reduce max particles for better performance
const MAX_PARTICLES = 8;

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

  // Check for reduced motion preference
  const reducedMotion = useMemo(() => perf.isReducedMotion(), []);

  // Initialize performance optimizations
  useEffect(() => {
    if (buttonRef.current) {
      cleanupRef.current = perf.optimizeElement(buttonRef.current);
    }

    // Cleanup function
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      setParticles([]);
    };
  }, []);

  const buttonClassNames = useMemo(() =>
    `relative inline-flex items-center justify-center font-medium tracking-wide overflow-hidden whitespace-nowrap ${sizeClasses[size]} ${variantClasses[variant]} ${glowEffects[variant]} ${className} button-container z-10`
  , [size, variant, className]);

  // Throttled particle creation on mouse move with reduced motion awareness
  const addParticle = useCallback((e) => {
    if (!buttonRef.current || (reducedMotion && particles.length >= 3)) return;

    // Skip particle creation sometimes for reduced motion
    if (reducedMotion && Math.random() > 0.5) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const particle = {
      id: uuidv4(),
      x, y,
      initialX: x,
      initialY: y,
    };

    // Use functional update to avoid stale state
    setParticles(prev => {
      // For reduced motion, keep fewer particles
      const limit = reducedMotion ? Math.min(4, MAX_PARTICLES) : MAX_PARTICLES;
      return [...prev, particle].slice(-limit);
    });
  }, [particles.length, reducedMotion]);

  // Use more aggressive throttling for reduced motion
  const addParticleThrottled = useMemo(() =>
    perf.throttleFrame(addParticle, reducedMotion ? 100 : 16)
  , [addParticle, reducedMotion]);

  const handleMouseDown = useCallback((e) => {
    if (withRipple && buttonRef.current) {
      e.persist();

      // Use performance monitoring to track ripple effect performance
      perf.monitorPerformance(() => {
        requestAnimationFrame(() => {
          // Adjust ripple options based on reduced motion preference
          const adjustedOptions = reducedMotion ?
            { ...rippleOptions, duration: rippleOptions.duration * 0.7 } :
            rippleOptions;

          // Pass customization options for ripple effect
          createRipples(e, buttonRef.current, adjustedOptions);
        });
      });
    }
  }, [withRipple, rippleOptions, reducedMotion]);

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
        transition: {
          duration: reducedMotion ? 0.2 : 0.3,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      whileTap={{
        scale: reducedMotion ? 0.99 : 0.98,
        transition: {
          duration: reducedMotion ? 0.05 : 0.1,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      {withParticles && isHovered && (
        <Suspense fallback={null}>
          <AnimatePresence mode="sync">
            <ParticleEffect
              key="particles"
              particles={particles}
              color={particleColor}
              reducedMotion={reducedMotion}
            />
          </AnimatePresence>
        </Suspense>
      )}
    </motion.button>
  );

  if (withBorder) {
    wrappedButton = (
      <Suspense fallback={wrappedButton}>
        <BorderGradient>{wrappedButton}</BorderGradient>
      </Suspense>
    );
  }

  if (withBlob) {
    wrappedButton = (
      <Suspense fallback={wrappedButton}>
        <BlobEffect color={blobColor} reducedMotion={reducedMotion}>{wrappedButton}</BlobEffect>
      </Suspense>
    );
  }

  // Adjust magnetic effect based on reduced motion preference
  return (
    <MagneticWrapper
      strength={reducedMotion ? 0.1 : 0.2}
      dampening={reducedMotion ? 0.9 : 0.8}
      radius={reducedMotion ? 80 : 100}
      disabled={reducedMotion && perf.isLowEndDevice()}
    >
      {wrappedButton}
    </MagneticWrapper>
  );
};

export default React.memo(PrimaryButton);
