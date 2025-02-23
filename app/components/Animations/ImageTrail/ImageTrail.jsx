"use client"; // Ensure this is a client-side component

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const ImageTrailWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
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
  will-change: transform, filter;
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
`;

const lerp = (a, b, n) => (1 - n) * a + n * b;

const ImageTrail = () =>
{
    const imageTrailRef = useRef([]);
    const [images] = useState([
        '/Assets/Image/Trlimg/1.jpg',
        '/Assets/Image/Trlimg/2.jpg',
        '/Assets/Image/Trlimg/3.jpg',
        '/Assets/Image/Trlimg/4.jpg',
        '/Assets/Image/Trlimg/5.jpg',
        '/Assets/Image/Trlimg/6.jpg',
        '/Assets/Image/Trlimg/7.jpg',
        '/Assets/Image/Trlimg/8.jpg',
        '/Assets/Image/Trlimg/9.jpg',
        '/Assets/Image/Trlimg/10.jpg',
        '/Assets/Image/Trlimg/11.jpg',
        '/Assets/Image/Trlimg/12.jpg',
        '/Assets/Image/Trlimg/13.jpg',
        '/Assets/Image/Trlimg/14.jpg',
        '/Assets/Image/Trlimg/15.jpg',
        '/Assets/Image/Trlimg/16.jpg',
        '/Assets/Image/Trlimg/17.jpg',
        '/Assets/Image/Trlimg/18.jpg',
        '/Assets/Image/Trlimg/19.jpg',
        '/Assets/Image/Trlimg/20.jpg',
    ]);

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { ...mousePos };
    let cacheMousePos = { ...mousePos };
    let zIndexVal = 1;
    let lastAngle = 0;

    const threshold = 80; // Minimum distance to trigger image animation

    useEffect(() =>
    {
        const handleMouseMove = (e) =>
        {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        };

        const showNextImage = () =>
        {
            let dx = mousePos.x - cacheMousePos.x; // Changed to 'let'
            let dy = mousePos.y - cacheMousePos.y; // Changed to 'let'

            // Calculate the angle
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            if (angle < 0) angle += 360;

            const isMovingClockwise = angle >= lastAngle;
            const startAngle = isMovingClockwise ? angle - 10 : angle + 10;

            lastAngle = angle;

            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance !== 0)
            {
                dx /= distance;
                dy /= distance;
            }

            dx *= distance / 150;
            dy *= distance / 150;

            zIndexVal++;

            const imgIndex = zIndexVal % images.length;
            const img = imageTrailRef.current[imgIndex];

            gsap.killTweensOf(img);

            gsap.timeline({
                onStart: () => onImageActivated(),
                onComplete: () => onImageDeactivated(),
            })
                .fromTo(img, {
                    opacity: 1,
                    filter: 'brightness(80%)',
                    scale: 0.1,
                    zIndex: zIndexVal,
                    x: cacheMousePos.x - img.offsetWidth / 2,
                    y: cacheMousePos.y - img.offsetHeight / 2,
                    rotation: startAngle,
                }, {
                    duration: 1,
                    ease: 'power2',
                    scale: 1,
                    filter: 'brightness(100%)',
                    x: mousePos.x - img.offsetWidth / 2 + (dx * 70),
                    y: mousePos.y - img.offsetHeight / 2 + (dy * 70),
                    rotation: lastAngle,
                }, 0)
                .to(img, {
                    duration: 0.4,
                    ease: 'expo',
                    opacity: 0,
                }, 0.5)
                .to(img, {
                    duration: 1.5,
                    ease: 'power4',
                    x: `+=${dx * 120}`,
                    y: `+=${dy * 120}`,
                }, 0.05);
        };

        const onImageActivated = () =>
        {
            // Increment the counter for active images (this logic is to manage images if needed)
        };

        const onImageDeactivated = () =>
        {
            // Decrement the counter for active images (this logic is to manage images if needed)
        };

        const render = () =>
        {
            const distance = Math.hypot(mousePos.x - lastMousePos.x, mousePos.y - lastMousePos.y);

            if (distance > threshold)
            {
                showNextImage();
                lastMousePos = { ...mousePos };
            }

            cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.1);
            cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.1);

            if (zIndexVal > images.length) zIndexVal = 1;

            requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', handleMouseMove);

        requestAnimationFrame(render);

        return () =>
        {
            window.removeEventListener('mousemove', handleMouseMove);
        };
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

export default ImageTrail;
