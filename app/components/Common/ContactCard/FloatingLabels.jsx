import React, { useState, useEffect } from 'react';
import { Gravity, MatterBody } from '../../Animations/Gravity/Gravity';

// Floating label component using MatterBody with client-side randomization
const FloatingLabel = ({ label, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [labelConfig, setLabelConfig] = useState({
        x: '50%',
        y: '50%',
        angle: 0,
        scale: 1,
        velocity: { x: 0, y: 0 },
        angularVelocity: 0,
        gradient: 'from-blue-500/20 to-purple-600/15'
    });

    // Gradients for labels
    const gradients = [
        'from-blue-500/20 to-purple-600/15',
        'from-indigo-500/20 to-cyan-400/15',
        'from-violet-500/20 to-fuchsia-400/15',
        'from-purple-500/20 to-pink-500/15',
        'from-blue-600/20 to-cyan-300/15',
    ];

    // Initialize values on client-side only to avoid hydration mismatch
    useEffect(() => {
        // Use deterministic values based on index for initial server render
        // Then update with random values on client
        const seedValue = index + 1;

        // Generate pseudo-random values based on index
        const x = `${((seedValue * 17) % 80) + 10}%`;
        const y = `${((seedValue * 23) % 80) + 10}%`;
        const angle = (seedValue * 37) % 360;
        const scale = 0.85 + ((seedValue * 0.1) % 0.3);

        const velocity = {
            x: ((seedValue % 5) - 2.5) * 0.8,
            y: (((seedValue + 3) % 5) - 2.5) * 0.8
        };

        const angularVelocity = ((seedValue % 7) - 3.5) * 0.08;
        const gradientIndex = seedValue % gradients.length;

        setLabelConfig({
            x,
            y,
            angle,
            scale,
            velocity,
            angularVelocity,
            gradient: gradients[gradientIndex]
        });

        setInitialized(true);
    }, [index]);

    if (!initialized) {
        return null; // Don't render until client-side initialization
    }

    return (
        <MatterBody
            x={labelConfig.x}
            y={labelConfig.y}
            angle={labelConfig.angle}
            scale={labelConfig.scale}
            velocity={labelConfig.velocity}
            angularVelocity={labelConfig.angularVelocity}
            bodyType="rectangle"
            isDraggable={true}
            matterBodyOptions={{
                friction: 0.01, // Even lower friction for smoother movement
                restitution: 0.8, // Increased bounciness
                density: 0.0005, // Lower density for lighter feel
                frictionAir: 0.0006, // Reduced for more floating movement
                isStatic: false,
                collisionFilter: {
                    category: 0x0001,
                    mask: 0xFFFFFFFF,
                    group: 0
                }
            }}
        >
            <div
                className={`
                    px-4 py-2 rounded-full
                    bg-gradient-to-r ${isHovered ? "from-black/70 to-black/60" : labelConfig.gradient}
                    backdrop-blur-md
                    border-[1.5px] ${isHovered ? "border-white/60" : "border-white/30"}
                    ${isHovered ? "shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "shadow-[0_0_15px_rgba(102,126,234,0.1)]"}
                    transition-all duration-300
                    cursor-grab active:cursor-grabbing
                    transform ${isHovered ? "scale-110" : "scale-100"}
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span className={`
                    text-xs font-medium
                    text-transparent bg-clip-text
                    ${isHovered ? "bg-gradient-to-r from-white to-blue-100" : "bg-gradient-to-r from-white/95 to-white/85"}
                    whitespace-nowrap
                `}>
                    {label}
                </span>
            </div>
        </MatterBody>
    );
};

function FloatingLabels({ floatingLabels = [] }) {
    // Client-side rendering check to avoid hydration mismatch
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Extract text from floatingLabels objects
    const labels = floatingLabels.map(label =>
        typeof label === 'object' && label.text ? label.text : label
    );

    if (!isClient) {
        // Return a placeholder during server-side rendering
        return (
            <div className="absolute inset-0 overflow-hidden z-10 opacity-0">
                {/* Server-side placeholder */}
            </div>
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-auto">
            <Gravity
                debug={false}
                gravity={{ x: 0, y: 0.004 }} // Light gravity for floating effect
                grabCursor={true}
                resetOnResize={true}
                addTopWall={true}
                autoStart={true}
                className="pointer-events-auto"
            >
                {Array.isArray(labels) && labels.map((label, index) => (
                    <FloatingLabel key={index} label={label} index={index} />
                ))}
            </Gravity>
        </div>
    );
}

export default FloatingLabels;
