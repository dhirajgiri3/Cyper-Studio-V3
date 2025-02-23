// Performance utility functions for button components
const PERFORMANCE_THRESHOLD = 16.67; // 60fps threshold in ms

export const throttleFrame = (callback) => {
  let frameId = null;
  let lastTimestamp = 0;
  
  return (...args) => {
    const now = performance.now();
    
    if (now - lastTimestamp < PERFORMANCE_THRESHOLD) {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        callback(...args);
        lastTimestamp = now;
      });
      return;
    }
    
    callback(...args);
    lastTimestamp = now;
  };
};

export const optimizeElement = (element) => {
  if (!element) return () => {};
  
  const originalStyles = {
    willChange: element.style.willChange,
    transform: element.style.transform,
    backfaceVisibility: element.style.backfaceVisibility,
    WebkitFontSmoothing: element.style.WebkitFontSmoothing
  };
  
  // Apply performance optimizations
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translate3d(0, 0, 0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.WebkitFontSmoothing = 'subpixel-antialiased';
  
  // Return cleanup function
  return () => {
    if (element) {
      element.style.willChange = originalStyles.willChange;
      element.style.transform = originalStyles.transform;
      element.style.backfaceVisibility = originalStyles.backfaceVisibility;
      element.style.WebkitFontSmoothing = originalStyles.WebkitFontSmoothing;
    }
  };
};

export const debounceFrame = (callback, wait = 100) => {
  let timeoutId = null;
  let frameId = null;

  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (frameId) cancelAnimationFrame(frameId);
    
    timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(() => {
        callback(...args);
        frameId = null;
      });
      timeoutId = null;
    }, wait);
  };
};

export const batchUpdates = (updates) => {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      updates();
      resolve();
    });
  });
};

export const monitorPerformance = (callback) => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  if (duration > PERFORMANCE_THRESHOLD) {
    console.warn(`Performance warning: Operation took ${duration.toFixed(2)}ms`);
  }
  
  return duration;
};

export const isReducedMotion = () => 
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getReducedAnimationDuration = (defaultDuration) => 
  isReducedMotion() ? defaultDuration * 0.5 : defaultDuration;

export const cleanupAnimations = (refs = []) => {
  refs.forEach(ref => {
    if (ref.current) {
      if (typeof ref.current === 'number') {
        cancelAnimationFrame(ref.current);
      }
      if (ref.current.cancel) {
        ref.current.cancel();
      }
    }
  });
};