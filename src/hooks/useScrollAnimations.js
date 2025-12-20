import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * Scroll Animations Hook
 * Generates various animation values based on scroll position
 * 
 * @param {object} options - Configuration options
 * @param {number} options.scrollRange - Scroll range in pixels, default 150
 * @returns {object} - Scroll-related animation values
 */
function useScrollAnimations({ scrollRange = 150 } = {}) {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  // Base progress value (0-1)
  const scrollProgress = useTransform(scrollY, [0, scrollRange], [0, 1]);
  
  // Header container animations
  const headerHeight = useTransform(scrollProgress, [0, 1], [160, 60]);
  const headerPaddingTop = useTransform(scrollProgress, [0, 1], [24, 12]);
  const headerPaddingBottom = useTransform(scrollProgress, [0, 1], [16, 12]);
  
  // Background effects
  const bgOpacity = useTransform(scrollProgress, [0, 1], [0, 0.9]);

  // Title fade out (faster)
  const titleOpacity = useTransform(scrollProgress, [0, 0.4], [1, 0]);

  // Logo transformations
  const logoScale = useTransform(scrollProgress, [0, 1], [1, 0.8]);
  const logoTop = useTransform(scrollProgress, [0, 1], ["-4px", "50%"]);
  const logoLeft = useTransform(scrollProgress, [0, 1], ["50%", "0%"]);
  const logoX = useTransform(scrollProgress, [0, 1], ["-50%", "0%"]);
  const logoY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  // Subtitle transformations
  const subtitleFontSize = useTransform(scrollProgress, [0, 1], [18, 14]);
  const subtitleOpacity = useTransform(scrollProgress, [0, 1], [1, 0.85]);
  const subtitleTop = useTransform(scrollProgress, [0, 1], ["56px", "50%"]);
  const subtitleY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  // Controls bar transformations
  const controlsTop = useTransform(scrollProgress, [0, 1], ["85px", "50%"]);
  const controlsLeft = useTransform(scrollProgress, [0, 1], ["50%", "100%"]);
  const controlsX = useTransform(scrollProgress, [0, 1], ["-50%", "-100%"]);
  const controlsY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  return {
    scrollRef,
    scrollProgress,
    
    // Header related
    header: {
      height: headerHeight,
      paddingTop: headerPaddingTop,
      paddingBottom: headerPaddingBottom,
      bgOpacity,
    },
    
    // Logo related
    logo: {
      scale: logoScale,
      top: logoTop,
      left: logoLeft,
      x: logoX,
      y: logoY,
    },
    
    // Title related
    title: {
      opacity: titleOpacity,
    },
    
    // Subtitle related
    subtitle: {
      fontSize: subtitleFontSize,
      opacity: subtitleOpacity,
      top: subtitleTop,
      y: subtitleY,
    },
    
    // Controls related
    controls: {
      top: controlsTop,
      left: controlsLeft,
      x: controlsX,
      y: controlsY,
    },
  };
}

export default useScrollAnimations;
