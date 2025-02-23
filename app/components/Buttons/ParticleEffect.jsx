import React, { memo, useMemo, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";

const ParticleEffect = memo(({ particles, color }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef(new Set());

  const particleColors = useMemo(() => color ? [color] : [
    "bg-white",  // Made even more visible
    "bg-blue-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
  ], [color]);

  const getParticleProps = useCallback(() => {
    // Generate a random angle and distance for a natural burst direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 50 + 20; // random distance between 20 and 70 pixels
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;
    const rotation = Math.random() * 360;
    const peakScale = Math.random() * 0.4 + 1.2; // peak scale between 1.2 and 1.6
    const duration = 0.4 + Math.random() * 0.2; // duration between 0.4s and 0.6s

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

    return (
      <motion.span
        key={particle.id}
        className={`absolute inline-flex w-3 h-3 rounded-full ${props.color} particle`}
        // Set initial position using left/top in px based on cursor coordinates
        style={{
          left: `${particle.initialX || particle.x}px`,
          top: `${particle.initialY || particle.y}px`,
          boxShadow: '0 0 10px currentColor',
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
          ease: "easeOut",
          scale: { times: [0, 0.5, 1] },
          opacity: { times: [0, 0.7, 1] }
        }}
        onAnimationComplete={() => {
          particlesRef.current.delete(particle.id);
        }}
      />
    );
  }, [getParticleProps]);

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
};

ParticleEffect.displayName = 'ParticleEffect';

export { ParticleEffect };
