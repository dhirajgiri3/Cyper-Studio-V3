import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import styled from 'styled-components';

const CanvasContainer = styled(Canvas)`
    height: 100%; /* Change 'full' to '100vh' for appropriate styling */
    width: 100%;
    position: relative;
    margin: 0 auto;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 50vh;
    }
`

const Scene = ({ children }) => {
    return (
        <CanvasContainer 
            camera={{ position: [0, 0, 5], fov: 70 }}
            shadows
            dpr={[1, 2]}
        >
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
        </CanvasContainer>
    );
};

export default Scene;
