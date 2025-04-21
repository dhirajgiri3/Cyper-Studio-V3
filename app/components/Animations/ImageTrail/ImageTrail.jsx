"use client"; // Ensure this is a client-side component

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { throttleFrame, isReducedMotion } from '../../Buttons/utils/performanceUtils';

const ImageTrailWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none; /* Prevent interference with underlying elements */
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 230px;
  aspect-ratio: 1.2;
  border-radius: 7px;
  opacity: 0;
  overflow: hidden;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

// Changed component from Image to div for background image support
const ImageInner = styled.div`
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-size: cover;
  background-position: center;
  position: absolute;
  top: -10px;
  left: -10px;
  transform: translate3d(0, 0, 0);
  will-change: transform;
`;

const lerp = (a, b, n) => (1 - n) * a + n * b;

const ImageTrail = () => {
    const imageTrailRef = useRef([]);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const cacheMousePosRef = useRef({ x: 0, y: 0 });
    const zIndexValRef = useRef(1);
    const lastAngleRef = useRef(0);
    const animationFrameRef = useRef(null);
    const activeAnimationsRef = useRef(0);
    const isRunningRef = useRef(false);

    // Reduce the number of images for better performance
    const [images] = useState([
        '/Assets/Image/Trlimg/1.jpg',
        '/Assets/Image/Trlimg/3.jpg',
        '/Assets/Image/Trlimg/5.jpg',
        '/Assets/Image/Trlimg/7.jpg',
        '/Assets/Image/Trlimg/9.jpg',
        '/Assets/Image/Trlimg/11.jpg',
        '/Assets/Image/Trlimg/13.jpg',
        '/Assets/Image/Trlimg/15.jpg',
        '/Assets/Image/Trlimg/17.jpg',
        '/Assets/Image/Trlimg/19.jpg',
    ]);

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => isReducedMotion(), []);

    // Adjust threshold based on device performance and motion preference
    const threshold = useMemo(() =>
        prefersReducedMotion ? 120 : 80
    , [prefersReducedMotion]);

    // Optimized mouse move handler with throttling
    const handleMouseMove = useCallback(
        throttleFrame((e) => {
            if (!isRunningRef.current) return;
            mousePosRef.current.x = e.clientX;
            mousePosRef.current.y = e.clientY;
        }),
        []
    );

    // Optimized image animation function
    const showNextImage = useCallback(() => {
        if (activeAnimationsRef.current >= 3) return; // Limit concurrent animations

        const mousePos = mousePosRef.current;
        const cacheMousePos = cacheMousePosRef.current;

        let dx = mousePos.x - cacheMousePos.x;
        let dy = mousePos.y - cacheMousePos.y;

        // Calculate the angle
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;

        const isMovingClockwise = angle >= lastAngleRef.current;
        const startAngle = isMovingClockwise ? angle - 10 : angle + 10;

        lastAngleRef.current = angle;

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance !== 0) {
            dx /= distance;
            dy /= distance;
        }

        // Scale movement based on distance for more natural motion
        dx *= distance / 150;
        dy *= distance / 150;

        zIndexValRef.current++;

        const imgIndex = zIndexValRef.current % images.length;
        const img = imageTrailRef.current[imgIndex];

        if (!img) return;

        // Kill any existing animations on this element
        gsap.killTweensOf(img);

        activeAnimationsRef.current++;

        // Create optimized animation timeline
        gsap.timeline({
            onStart: () => {
                // No-op for performance
            },
            onComplete: () => {
                activeAnimationsRef.current--;
            },
        })
        .fromTo(img, {
            opacity: 1,
            filter: 'brightness(80%)',
            scale: 0.1,
            zIndex: zIndexValRef.current,
            x: cacheMousePos.x - (img.offsetWidth / 2),
            y: cacheMousePos.y - (img.offsetHeight / 2),
            rotation: startAngle,
        }, {
            duration: prefersReducedMotion ? 0.7 : 1,
            ease: 'power2',
            scale: 1,
            filter: 'brightness(100%)',
            x: mousePos.x - (img.offsetWidth / 2) + (dx * 70),
            y: mousePos.y - (img.offsetHeight / 2) + (dy * 70),
            rotation: lastAngleRef.current,
        }, 0)
        .to(img, {
            duration: prefersReducedMotion ? 0.3 : 0.4,
            ease: 'expo',
            opacity: 0,
        }, 0.5)
        .to(img, {
            duration: prefersReducedMotion ? 1 : 1.5,
            ease: 'power4',
            x: `+=${dx * 120}`,
            y: `+=${dy * 120}`,
        }, 0.05);
    }, [images, prefersReducedMotion]);

    // Main animation loop with performance optimizations
    const render = useCallback(() => {
        if (!isRunningRef.current) return;

        const mousePos = mousePosRef.current;
        const lastMousePos = lastMousePosRef.current;
        const cacheMousePos = cacheMousePosRef.current;

        const distance = Math.hypot(mousePos.x - lastMousePos.x, mousePos.y - lastMousePos.y);

        if (distance > threshold && activeAnimationsRef.current < 3) {
            showNextImage();
            lastMousePosRef.current = { ...mousePos };
        }

        // Smoother lerp for cache position
        cacheMousePosRef.current.x = lerp(cacheMousePos.x, mousePos.x, 0.1);
        cacheMousePosRef.current.y = lerp(cacheMousePos.y, mousePos.y, 0.1);

        if (zIndexValRef.current > images.length) zIndexValRef.current = 1;

        animationFrameRef.current = requestAnimationFrame(render);
    }, [threshold, showNextImage, images.length]);

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        // Initialize positions
        mousePosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        lastMousePosRef.current = { ...mousePosRef.current };
        cacheMousePosRef.current = { ...mousePosRef.current };

        // Start the animation loop
        isRunningRef.current = true;
        animationFrameRef.current = requestAnimationFrame(render);

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup function
        return () => {
            isRunningRef.current = false;
            window.removeEventListener('mousemove', handleMouseMove);

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            // Kill any remaining GSAP animations
            imageTrailRef.current.forEach(img => {
                if (img) gsap.killTweensOf(img);
            });
        };
    }, [handleMouseMove, render]);

    // Memoize the image components to prevent unnecessary re-renders
    const imageElements = useMemo(() => {
        return images.map((src, i) => (
            <ImageWrapper key={i} ref={(el) => (imageTrailRef.current[i] = el)}>
                <ImageInner style={{ backgroundImage: `url(${src})` }} />
            </ImageWrapper>
        ));
    }, [images]);

    return (
        <ImageTrailWrapper>
            {images.map((src, i) => (
                <ImageWrapper key={i} ref={(el) => (imageTrailRef.current[i] = el)}>
                    <ImageInner style={{ backgroundImage: `url(${src})` }} />
                </ImageWrapper>
            ))}
        </ImageTrailWrapper>
    );
};

// Export as memoized component to prevent unnecessary re-renders
export default ImageTrail;
