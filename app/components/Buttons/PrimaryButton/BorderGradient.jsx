import React from 'react';
import { motion } from 'framer-motion';

const BorderGradient = ({ children, active = false, className = '' }) => {
  return (
    <motion.div
      className={`
        relative group overflow-hidden
        before:absolute before:inset-0
        before:p-[1px]
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white/20
        before:to-transparent
        before:rounded-[inherit]
        before:opacity-0
        before:transition-opacity
        before:duration-300
        hover:before:opacity-100
        ${className}
      `}
      style={{
        '--x': '50%',
        '--y': '50%',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
      }}
      animate={active ? {
        '--gradient-x': ['0%', '100%'],
        '--gradient-y': ['0%', '100%']
      } : {}}
      transition={{
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'mirror'
      }}
    >
      {children}
      <motion.div
        className="absolute inset-[1px] rounded-[inherit] bg-black/50 backdrop-blur-sm"
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
};

export default React.memo(BorderGradient);