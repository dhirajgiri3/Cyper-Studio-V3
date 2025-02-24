import React, { useState, useEffect, useCallback, useMemo } from 'react';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const Sparkle = ({ color = '#FFF', size = 5, style = {} }) => (
  <span
    className="absolute inline-block pointer-events-none animate-sparkle"
    style={{
      ...style,
      width: `${size}px`,
      height: `${size}px`,
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </svg>
  </span>
);

const SparkleEffect = React.memo(({ isActive = false }) => {
  const [sparkles, setSparkles] = useState([]);

  const colors = useMemo(() => [
    '#FFE8A3', '#FFC2E2', '#B6E3FF', '#B8F0C0',
    '#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD'
  ], []);

  const createSparkle = useCallback(() => ({
    id: Math.random(),
    color: colors[Math.floor(Math.random() * colors.length)],
    size: random(8, 22),
    style: {
      top: random(-10, 110) + '%',
      left: random(-10, 110) + '%',
      zIndex: 3,
      opacity: random(60, 100) / 100,
      animationDuration: `${random(800, 1500)}ms`,
      animationDelay: `${random(0, 200)}ms`
    },
  }), [colors]);

  useEffect(() => {
    if (!isActive) {
      setSparkles([]);
      return;
    }

    setSparkles(Array.from({ length: 3 }, createSparkle));
    
    const intervalId = setInterval(() => {
      setSparkles(currentSparkles => {
        const newSparkle = createSparkle();
        return [...currentSparkles, newSparkle]
          .slice(-6)
          .filter(spark => spark.id !== currentSparkles[0]?.id);
      });
    }, 350);

    return () => clearInterval(intervalId);
  }, [isActive, createSparkle]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});

export default SparkleEffect;
