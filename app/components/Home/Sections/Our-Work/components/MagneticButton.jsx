// /MagneticButton.jsx

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({ isVisible }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [buttonSize] = useState(80);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current || !isVisible) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const strength = 0.25; // Slightly reduced for subtlety
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    };

    if (isVisible) window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={buttonRef}
      className="absolute pointer-events-none z-50"
      style={{
        width: buttonSize,
        height: buttonSize,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
    >
      <div className="w-full h-full rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-md">
        <motion.div
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MagneticButton;