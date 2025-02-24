import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BlobEffect = ({ children, color = 'rgba(255, 255, 255, 0.1)' }) => {
  const blobRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const blob = blobRef.current;
    if (!container || !blob) return;

    const updateBlobPosition = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      blob.style.setProperty('--x', `${x}%`);
      blob.style.setProperty('--y', `${y}%`);
    };

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => updateBlobPosition(e));
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        pointerEvents: 'none', // <-- added so mouse events reach inner button
      }}
      initial={{ borderRadius: '1rem' }}
      whileHover={{ borderRadius: '1.2rem 0.8rem 1rem 1.2rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.div
        ref={blobRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-300"
        style={{
          background: `radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            ${color} 0%,
            transparent 50%
          )`,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'subpixel-antialiased'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};

export default React.memo(BlobEffect);
