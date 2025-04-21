import React, { memo, useMemo, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import { getOptimizedAnimationSettings } from '../utils/performanceUtils';

const ParticleEffect = memo(({ particles, color, reducedMotion = false }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef(new Set());

  const particleColors = useMemo(() => color ? [color] : [
    "bg-white",  // Made even more visible
    "bg-blue-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
  ], [color]);

  // Get optimized animation settings based on device capabilities
  const animSettings = useMemo(() =>
    getOptimizedAnimationSettings({ defaultDuration: 0.5 })
  , []);

  const getParticleProps = useCallback(() => {
    // Generate a random angle and distance for a natural burst direction
    const angle = Math.random() * 2 * Math.PI;
    // Use smaller distance for reduced motion
    const distance = reducedMotion ?
      (Math.random() * 30 + 10) : // smaller distance for reduced motion
      (Math.random() * 50 + 20); // normal distance

    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;
    const rotation = reducedMotion ? Math.random() * 180 : Math.random() * 360; // less rotation for reduced motion
    const peakScale = reducedMotion ?
      (Math.random() * 0.2 + 1.1) : // smaller scale for reduced motion
      (Math.random() * 0.4 + 1.2); // normal scale

    // Use optimized duration based on device capabilities
    const duration = reducedMotion ?
      (0.3 + Math.random() * 0.1) : // shorter duration for reduced motion
      (animSettings.duration + Math.random() * 0.2); // normal duration

    return {
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      xOffset,
      yOffset,
      rotation,
      scale: peakScale,
      duration,
    };
  }, [particleColors]);

  const renderParticle = useCallback((particle) => {
    const props = getParticleProps();

    // Use smaller particle size for reduced motion
    const particleSize = reducedMotion ? 2 : 3;

    return (
      <motion.span
        key={particle.id}
        className={`absolute inline-flex rounded-full ${props.color} particle`}
        // Set initial position using left/top in px based on cursor coordinates
        style={{
          left: `${particle.initialX || particle.x}px`,
          top: `${particle.initialY || particle.y}px`,
          width: `${particleSize}px`,
          height: `${particleSize}px`,
          boxShadow: reducedMotion ? '0 0 5px currentColor' : '0 0 10px currentColor',
          mixBlendMode: 'plus-lighter',
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'subpixel-antialiased',
          opacity: 0.9
        }}
        initial={{
          scale: 0,
          rotate: 0,
          opacity: 1
        }}
        animate={{
          left: `${(particle.initialX || particle.x) + props.xOffset}px`,
          top: `${(particle.initialY || particle.y) + props.yOffset}px`,
          scale: [0, props.scale, 0],
          rotate: props.rotation,
          opacity: [1, 0.8, 0]
        }}
        transition={{
          duration: props.duration,
          ease: animSettings.ease,
          scale: { times: [0, 0.5, 1] },
          opacity: { times: [0, 0.7, 1] }
        }}
        onAnimationComplete={() => {
          particlesRef.current.delete(particle.id);
        }}
      />
    );
  }, [getParticleProps, reducedMotion, animSettings.ease]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 2,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="sync">
        {particles.map(particle => renderParticle(particle))}
      </AnimatePresence>
    </div>
  );
});

ParticleEffect.propTypes = {
  particles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      initialX: PropTypes.number,
      initialY: PropTypes.number,
    })
  ).isRequired,
  color: PropTypes.string,
  reducedMotion: PropTypes.bool,
};

ParticleEffect.displayName = 'ParticleEffect';

export { ParticleEffect };
