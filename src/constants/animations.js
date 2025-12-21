/**
 * Animation Design System
 * Centralized animation tokens for consistent motion design
 */

// Duration tokens (seconds)
export const DURATIONS = {
  instant: 0.1,   // Micro-interactions, instant feedback
  fast: 0.2,      // Button presses, small state changes
  normal: 0.35,   // Page transitions, panel slides
  slow: 0.5,      // Large-scale animations, dramatic reveals
  carousel: 0.6,  // Image crossfade for smooth viewing
};

// Easing functions (cubic-bezier)
export const EASINGS = {
  easeOut: [0.25, 0.1, 0.25, 1],        // Standard deceleration
  easeInOut: [0.4, 0, 0.2, 1],          // Symmetric acceleration
  sharp: [0.4, 0, 0.6, 1],              // Snappy feel
  apple: [0.32, 0.72, 0, 1],            // iOS-style smooth curve
};

// Spring physics configurations
export const SPRINGS = {
  gentle: { type: 'spring', stiffness: 300, damping: 30 },
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  stiff: { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 },
  bouncy: { type: 'spring', stiffness: 400, damping: 25 },
};

// Page transition variants
export const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: DURATIONS.fast, ease: EASINGS.sharp }
  },
};

// Fade only variants (for overlays, modals)
export const FADE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATIONS.fast } },
  exit: { opacity: 0, transition: { duration: DURATIONS.instant } },
};

// Scale + Fade variants (for cards, panels)
export const SCALE_VARIANTS = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: DURATIONS.fast }
  },
};

// Slide variants (for panels, drawers)
export const SLIDE_VARIANTS = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { ...SPRINGS.snappy }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: DURATIONS.fast }
  },
};

// Stagger configuration for list items
export const STAGGER = {
  fast: { staggerChildren: 0.03 },
  normal: { staggerChildren: 0.05 },
  slow: { staggerChildren: 0.1 },
};

// Hardware acceleration hints for CSS
export const GPU_ACCELERATED_STYLE = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
};

// Utility: Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility: Get motion-safe transition
export const getTransition = (normalConfig) => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }
  return normalConfig;
};

// Reduced motion safe variants - automatically simplifies animations
export const getMotionSafeVariants = (variants) => {
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: DURATIONS.instant } },
      exit: { opacity: 0, transition: { duration: DURATIONS.instant } },
    };
  }
  return variants;
};

// Carousel specific configuration
export const CAROUSEL_CONFIG = {
  autoPlayInterval: 5000,
  transitionDuration: DURATIONS.carousel,
  preloadCount: 1, // Number of images to preload ahead
};

// Text switch animation (for language toggle)
export const TEXT_VARIANTS = {
  initial: { opacity: 0, y: 3 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeOut }
  },
  exit: { 
    opacity: 0, 
    y: -3,
    transition: { duration: DURATIONS.instant, ease: EASINGS.sharp }
  },
};
