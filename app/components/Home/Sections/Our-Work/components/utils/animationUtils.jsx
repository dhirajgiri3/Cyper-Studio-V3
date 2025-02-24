// /utils/animationUtils.jsx

export const ANIMATION_VARIANTS = {
    card: {
      hidden: { opacity: 0, y: 60 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] },
      }),
      hover: { y: -10, transition: { duration: 0.35, ease: [0.25, 0.4, 0.25, 1] } },
    },
    image: {
      hover: { scale: 1.06, transition: { duration: 0.7, ease: "easeOut" } },
    },
    content: {
      hover: { y: -6, transition: { duration: 0.35, ease: "easeOut" } },
    },
  };
  
  export const TRANSITION_VARIANTS = {
    initial: { opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
  };