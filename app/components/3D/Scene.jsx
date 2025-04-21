import React, { Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, BakeShadows } from '@react-three/drei';
import styled from 'styled-components';
import { isReducedMotion } from '../Buttons/utils/performanceUtils';

const CanvasContainer = styled(Canvas)`
    height: 100%;
    width: 100%;
    position: relative;
    margin: 0 auto;
`

const Scene = ({ children }) => {
    const [isClient, setIsClient] = useState(false);
    const reducedMotion = useMemo(() => isReducedMotion(), []);

    // Set lower performance settings for users with reduced motion preference
    const dprRange = useMemo(() =>
        reducedMotion ? [0.8, 1.5] : [1, 2]
    , [reducedMotion]);

    // Set client-side state on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Memoize the scene setup for better performance
    const sceneSetup = useMemo(() => (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[5, 5, 5]}
                castShadow
                intensity={0.5}
            />
            <Suspense fallback={null}>
                {children}
            </Suspense>
            <Environment preset='sunset' />

            {/* Performance optimizations */}
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <BakeShadows />
        </>
    ), [children]);

    return (
        <CanvasContainer
            camera={{ position: [0, 0, 5], fov: 70 }}
            shadows
            dpr={dprRange}
            gl={{
                antialias: !reducedMotion, // Disable antialiasing for reduced motion
                powerPreference: 'high-performance',
                alpha: true,
                stencil: false,
                depth: true,
            }}
            performance={{ min: 0.5 }}
            frameloop={reducedMotion ? 'demand' : 'always'} // Use demand-based rendering for reduced motion
        >
            {sceneSetup}
        </CanvasContainer>
    );
};

export default React.memo(Scene);
