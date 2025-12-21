import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { ANIMATION } from '../constants/appConfig';

/**
 * useHeaderScrollAnimation Hook
 * Manages scroll-based header animations for the Know page
 * 
 * Two-stage animation:
 * - Stage 1 (0-50%): Header animates, content stays in place
 * - Stage 2 (50%-100%): Header fixed, content scrolls normally
 * 
 * @param {React.RefObject} scrollRef - Scroll container ref
 * @param {React.RefObject} containerRef - Header container ref
 * @param {React.RefObject} logoRef - Logo element ref
 */
function useHeaderScrollAnimation(scrollRef, containerRef, logoRef) {
  const [centerPosition, setCenterPosition] = useState(0);
  const { scrollY } = useScroll({ container: scrollRef });

  // Calculate center position for logo centering
  useEffect(() => {
    const calculateCenter = () => {
      if (containerRef.current && logoRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const logoWidth = logoRef.current.offsetWidth;
        const center = (containerWidth - logoWidth) / 2;
        setCenterPosition(center);
      }
    };

    calculateCenter();
    window.addEventListener('resize', calculateCenter);
    const timer = setTimeout(calculateCenter, 100);
    
    return () => {
      window.removeEventListener('resize', calculateCenter);
      clearTimeout(timer);
    };
  }, [containerRef, logoRef]);

  const SCROLL_RANGE = ANIMATION.SCROLL_RANGE;

  // Base scroll progress
  const scrollProgress = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1]);
  
  // Header animation progress (first half of scroll)
  const headerAnimationProgress = useTransform(scrollProgress, [0, 0.5], [0, 1], { clamp: true });
  
  // Content offset to compensate scroll during header animation
  const contentOffsetY = useTransform(scrollProgress, [0, 0.5], [0, 100]);

  // Header container styles
  const header = {
    height: useTransform(headerAnimationProgress, [0, 1], [160, 60]),
    paddingTop: useTransform(headerAnimationProgress, [0, 1], [24, 12]),
    paddingBottom: useTransform(headerAnimationProgress, [0, 1], [16, 12]),
    bgOpacity: useTransform(headerAnimationProgress, [0, 1], [0, 0.9]),
  };

  // Title styles
  const title = {
    opacity: useTransform(headerAnimationProgress, [0, 0.8], [1, 0]),
  };

  // Logo styles
  const logo = {
    scale: useTransform(headerAnimationProgress, [0, 1], [1, 0.7]),
    top: useTransform(headerAnimationProgress, [0, 1], ["-8px", "50%"]),
    left: useTransform(headerAnimationProgress, [0, 1], [centerPosition, 24]),
    y: useTransform(headerAnimationProgress, [0, 1], ["0%", "-50%"]),
  };

  // Subtitle styles
  const subtitle = {
    fontSize: useTransform(headerAnimationProgress, [0, 1], [18, 14]),
    opacity: useTransform(headerAnimationProgress, [0, 1], [1, 0.85]),
    top: useTransform(headerAnimationProgress, [0, 1], ["56px", "50%"]),
    y: useTransform(headerAnimationProgress, [0, 1], ["0%", "-50%"]),
  };

  // Controls styles
  const controls = {
    top: useTransform(headerAnimationProgress, [0, 1], ["85px", "50%"]),
    left: useTransform(headerAnimationProgress, [0, 1], ["50%", "100%"]),
    x: useTransform(headerAnimationProgress, [0, 1], ["-50%", "-100%"]),
    y: useTransform(headerAnimationProgress, [0, 1], ["0%", "-50%"]),
  };

  return {
    scrollY,
    contentOffsetY,
    header,
    title,
    logo,
    subtitle,
    controls,
  };
}

export default useHeaderScrollAnimation;
