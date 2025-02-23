import { css } from 'styled-components';

export const sizeClasses = {
  small: "px-4 py-2 text-sm rounded-full",
  medium: "px-6 py-3 text-sm rounded-full",
  large: "px-8 py-3 text-base rounded-full",
};

export const variantClasses = {
  default: `
    bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900
    text-neutral-50 
    border border-neutral-800/10
    hover:border-neutral-700/20
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-out
  `,
  primary: `
    bg-gradient-to-r from-primary-dark via-primary to-primary-light
    text-white 
    border border-primary/10
    hover:border-primary-light/30
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-out
  `,
  secondary: `
    bg-gradient-to-r from-accent-2/80 to-accent-2
    text-neutral-200 font-light
    border-none
    hover:from-accent-1 hover:to-accent-2
    hover:border-accent-3/50
    hover:text-neutral-900
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-smooth
  `,
  light: `
    bg-light 
    text-neutral-900
    hover:border-neutral-300/20
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-smooth
  `,
  success: `
    bg-semantic-success
    text-white
    border border-semantic-success/10
    hover:shadow-[0_8px_25px_-5px_rgba(16,185,129,0.25)]
    hover:border-semantic-success/20
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-smooth
  `,
  danger: `
    bg-semantic-danger
    text-white
    border border-semantic-danger/10
    hover:shadow-[0_8px_25px_-5px_rgba(239,68,68,0.25)]
    hover:border-semantic-danger/20
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-smooth
  `,
  outline: `
    bg-white
    border-2
    border-primary/80
    text-primary-dark
    hover:bg-primary-50
    hover:border-primary
    hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)]
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-smooth
  `,
  ghost: `
    bg-transparent
    text-accent-1
    hover:bg-primary-50
    hover:text-primary
    active:transform active:scale-[0.98]
    transition-all duration-300 ease-smooth
    focus:ring-2 focus:ring-primary-100
  `,
};

export const glowEffects = {
  default: "after:bg-neutral-900/10",
  primary: `
    after:bg-primary/20
    after:blur-xl
    after:animate-pulse
  `,
  secondary: "after:bg-accent-3/15",
  success: "after:bg-semantic-success/15",
  danger: "after:bg-semantic-danger/15",
  outline: "after:bg-primary/10",
  ghost: "after:bg-primary/10",
};

export const buttonStyles = {
  gradientBorder: css`
    --gradient-angle: 0deg;
    --border-size: 2px;
    
    background: linear-gradient(
      var(--gradient-angle),
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.05)
    );
    background-clip: padding-box;
    border: var(--border-size) solid transparent;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: calc(-1 * var(--border-size));
      z-index: -1;
      background: linear-gradient(
        var(--gradient-angle),
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
      border-radius: inherit;
      animation: rotate 3s linear infinite;
    }

    @property --gradient-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes rotate {
      to {
        --gradient-angle: 360deg;
      }
    }
  `,

  glassMorphism: css`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  `,

  magneticHover: css`
    transform-style: preserve-3d;
    transform: perspective(800px) translateZ(0);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    
    &:hover {
      transform: perspective(800px) translateZ(20px);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at var(--mouse-x, center) var(--mouse-y, center),
        rgba(255, 255, 255, 0.08),
        transparent 100px
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::after {
      opacity: 1;
    }
  `
};
