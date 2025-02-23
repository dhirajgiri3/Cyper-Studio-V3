// src/components/FloatingLabels.jsx
import React, { useState, memo, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gravity, MatterBody } from '../../Animations/Gravity/Gravity';

const labelVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 }
  })
};

const FloatingLabels = memo(({ floatingLabels }) => {
  const [bounds, setBounds] = useState({ 
    top: -100, 
    left: -100, 
    right: 1000, 
    bottom: 1000 
  });

  useEffect(() => {
    const updateBounds = () => {
      if (typeof window !== 'undefined') {
        setBounds({
          top: -100,
          left: -100,
          right: window.innerWidth + 100,
          bottom: window.innerHeight + 100
        });
      }
    };

    updateBounds();
    const handler = requestAnimationFrame(updateBounds);
    return () => cancelAnimationFrame(handler);
  }, []);

  const gravityConfig = useMemo(() => ({
    gravity: { x: 0, y: 0.1 },
    debug: false,
    grabCursor: true,
    resetOnResize: false,
    bounds
  }), [bounds]);

  return (
    <div className="h-full floating-labels-container absolute inset-0 overflow-hidden z-11">
      <Gravity {...gravityConfig}>
        {floatingLabels.map((label, index) => (
          <MatterBody
            key={label.id}
            matterBodyOptions={{
              friction: 0.2,
              restitution: 0.5,
              density: 0.001
            }}
            x={`${Math.random() * 90 + 5}%`}
            y={`${Math.random() * 90 + 5}%`}
          >
            <motion.span
              custom={index}
              variants={labelVariants}
              className={`${label.className} px-4 py-2 rounded-full text-xs font-medium 
                bg-neutral-800/30 backdrop-blur-md border border-neutral-500/50 text-neutral-200
                hover:bg-primary/10 hover:border-primary/40 hover:text-primary-light 
                transition-all duration-300 cursor-grab select-none`}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {label.text}
            </motion.span>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
});

FloatingLabels.displayName = 'FloatingLabels';
export default FloatingLabels;