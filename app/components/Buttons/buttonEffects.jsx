import { css } from 'styled-components';

const RIPPLE_DURATION = 600; // Duration in milliseconds

export const createRipples = (event, button) => {
  if (!button || !event) return;

  try {
    // Remove any existing ripples
    button.querySelectorAll('.ripple-element').forEach(ripple => ripple.remove());

    const rect = button.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate the diagonal length for proper scaling
    const size = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-element';

    ripple.style.cssText = `
      position: absolute;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.4) 40%,
        rgba(255, 255, 255, 0) 70%
      );
      transform: scale(0);
      opacity: 0.8;
    `;

    // Ensure button has relative positioning
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.appendChild(ripple);

    // Trigger animation
    requestAnimationFrame(() => {
      ripple.style.transition = `all ${RIPPLE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });

    // Clean up
    setTimeout(() => {
      if (ripple && ripple.parentElement === button) {
        ripple.remove();
      }
    }, RIPPLE_DURATION);

  } catch (error) {
    console.warn('Ripple effect failed:', error);
  }
};

export const buttonEffects = {
  ripple: css`
    position: relative;
    overflow: hidden;
    
    .ripple-element {
      position: absolute;
      pointer-events: none;
      z-index: 0;
    }
  `,

  magnetic: css`
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    
    &:hover {
      transform: translateZ(0) scale(1.02);
    }
  `,

  glowOnHover: css`
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      inset: -1px;
      background: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 255, 255, 0.15),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
      transform: translate3d(0, 0, 0);
    }

    &:hover::before {
      opacity: 1;
    }

    &::after {
      content: '';
      position: absolute;
      inset: -20px;
      background: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 255, 255, 0.08),
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: -2;
      transform: translate3d(0, 0, 0);
    }

    &:hover::after {
      opacity: 1;
    }
  `,

  morphing: css`
    transition: border-radius 0.3s ease, transform 0.3s ease;
    
    &:hover {
      border-radius: 1.2rem 0.8rem 1rem 1.2rem;
    }
  `,

  smoothScale: css`
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    &:hover {
      transform: scale3d(1.03, 1.03, 1);
    }
  `,

  shimmer: css`
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transform: skewX(-20deg);
      transition: 0.75s;
    }

    &:hover::before {
      left: 150%;
    }
  `
};
