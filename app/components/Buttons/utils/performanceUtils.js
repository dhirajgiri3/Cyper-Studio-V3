const PERFORMANCE_THRESHOLD = 16.67; // 60fps threshold in ms
const MEMORY_THRESHOLD = 2000; // 2GB RAM threshold for low-end devices
const CORES_THRESHOLD = 4; // CPU cores threshold for low-end devices

// Cache for device capability checks
let deviceCapabilityCache = {
  isLowEnd: null,
  lastChecked: 0
};

export const throttleFrame = (callback, threshold = PERFORMANCE_THRESHOLD) => {
  let frameId = null;
  let lastTimestamp = 0;

  return (...args) => {
    const now = performance.now();

    if (now - lastTimestamp < threshold) {
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

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    // Fallback for browsers that don't support this media query
    return false;
  }
};

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

/**
 * Detects if the current device is a low-end device based on memory, CPU cores, and other factors.
 * Uses caching to avoid expensive checks on every call.
 * @returns {boolean} True if the device is considered low-end
 */
export const isLowEndDevice = () => {
  // Use cached result if available and not expired (cache valid for 1 minute)
  const now = Date.now();
  if (deviceCapabilityCache.isLowEnd !== null && now - deviceCapabilityCache.lastChecked < 60000) {
    return deviceCapabilityCache.isLowEnd;
  }

  // Default to false if not in browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  let isLow = false;

  try {
    // Check available memory if possible
    if (navigator.deviceMemory !== undefined && navigator.deviceMemory < (MEMORY_THRESHOLD / 1000)) {
      isLow = true;
    }

    // Check CPU cores if possible
    if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < CORES_THRESHOLD) {
      isLow = true;
    }

    // Check for mobile device as a heuristic
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // If it's a mobile device and we couldn't determine memory/CPU, assume it might be low-end
    if (isMobile && navigator.deviceMemory === undefined && navigator.hardwareConcurrency === undefined) {
      isLow = true;
    }

    // Update cache
    deviceCapabilityCache = {
      isLowEnd: isLow,
      lastChecked: now
    };

    return isLow;
  } catch (e) {
    console.warn('Error detecting device capabilities:', e);
    return false;
  }
};

/**
 * Optimizes animations based on device capabilities
 * @param {Object} options - Animation options
 * @param {number} options.defaultDuration - Default animation duration
 * @param {number} options.defaultDelay - Default animation delay
 * @returns {Object} Optimized animation options
 */
export const getOptimizedAnimationSettings = (options = {}) => {
  const { defaultDuration = 0.3, defaultDelay = 0 } = options;

  const reducedMotion = isReducedMotion();
  const lowEndDevice = isLowEndDevice();

  // Most aggressive reduction for both reduced motion and low-end device
  if (reducedMotion && lowEndDevice) {
    return {
      duration: defaultDuration * 0.4,
      delay: 0,
      ease: 'linear'
    };
  }

  // Reduced settings for reduced motion preference
  if (reducedMotion) {
    return {
      duration: defaultDuration * 0.5,
      delay: defaultDelay * 0.5,
      ease: 'easeOut'
    };
  }

  // Reduced settings for low-end device
  if (lowEndDevice) {
    return {
      duration: defaultDuration * 0.7,
      delay: defaultDelay * 0.5,
      ease: 'easeOut'
    };
  }

  // Default settings for high-end devices
  return {
    duration: defaultDuration,
    delay: defaultDelay,
    ease: 'easeInOut'
  };
};