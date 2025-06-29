import React, { useState } from 'react';
import { Gravity, MatterBody } from '../../Animations/Gravity/Gravity';

function GravityLabels({ labels = [] }) {
  // Only render on client-side to avoid hydration issues
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-0">
        {/* Server-side placeholder */}
      </div>
    );
  }

  // Extract text from labels objects if needed
  const labelTexts = labels.map(label =>
    typeof label === 'object' && label.text ? label.text : label
  );

  // Define colors for different labels - using darker versions of colors with minimalist style
  const colors = [
    { bg: 'rgba(30, 64, 175, 0.75)', border: 'rgba(59, 130, 246, 0.5)' },  // Dark Blue
    { bg: 'rgba(88, 28, 135, 0.75)', border: 'rgba(168, 85, 247, 0.5)' },  // Dark Purple
    { bg: 'rgba(6, 95, 70, 0.75)', border: 'rgba(16, 185, 129, 0.5)' },    // Dark Green
    { bg: 'rgba(157, 23, 77, 0.75)', border: 'rgba(236, 72, 153, 0.5)' },  // Dark Pink
    { bg: 'rgba(146, 64, 14, 0.75)', border: 'rgba(245, 158, 11, 0.5)' },  // Dark Amber
    { bg: 'rgba(14, 116, 144, 0.75)', border: 'rgba(6, 182, 212, 0.5)' },  // Dark Cyan
    { bg: 'rgba(49, 46, 129, 0.75)', border: 'rgba(99, 102, 241, 0.5)' },  // Dark Indigo
    { bg: 'rgba(12, 74, 110, 0.75)', border: 'rgba(14, 165, 233, 0.5)' },  // Dark Sky
  ];

  return (
    <div className="absolute inset-0 overflow-hidden z-[15] pointer-events-auto">
      <Gravity
        gravity={{ x: 0, y: 0.2 }}
        className="w-full h-full"
        grabCursor={false}
        resetOnResize={true}
        addTopWall={true}
        autoStart={true}
        debug={false}
      >
        {labelTexts.map((label, index) => {
          // Better distribution of labels across the container
          // Spread labels more evenly across the container
          const xPos = `${((index * 23) % 80) + 10}%`;
          const yPos = `${((index * 31) % 60) + 10}%`;
          const angle = (index * 13) % 20 - 10;

          // Add stronger initial velocity for more dynamic movement
          const velocity = {
            x: ((index % 7) - 3) * 0.8,
            y: ((index % 5) - 2) * 0.5
          };
          const colorIndex = index % colors.length;

          return (
            <MatterBody
              key={index}
              matterBodyOptions={{
                friction: 0.1,
                restitution: 0.5,
                density: 0.0008,
                frictionAir: 0.01,
                collisionFilter: {
                  category: 0x0001,
                  mask: 0xFFFFFFFF,
                  group: 0
                }
              }}
              x={xPos}
              y={yPos}
              angle={angle}
              velocity={velocity}
              angularVelocity={(index % 5 - 2) * 0.1}
              isDraggable={false}
            >
              <div
                className="text-sm md:text-base font-medium rounded-full hover:cursor-grab active:cursor-grabbing px-4 py-2 transition-all duration-300 pointer-events-auto backdrop-blur-xl hover:scale-110"
                style={{
                  backgroundColor: colors[colorIndex].bg,
                  color: 'white',
                  border: `1.5px solid ${colors[colorIndex].border}`,
                  boxShadow: `0 4px 15px rgba(0, 0, 0, 0.3)`,
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}
              >
                {label}
              </div>
            </MatterBody>
          );
        })}
      </Gravity>
    </div>
  );
}

export default GravityLabels;
