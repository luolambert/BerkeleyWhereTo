import { useScroll, useTransform } from 'framer-motion';
import { ANIMATION } from '../constants/appConfig';

/**
 * useHeaderScrollAnimation_TypeA Hook (V2 - Simplified)
 * Uses simple scroll-based transforms for header collapse animation
 * No complex centerPosition calculation - relies on flex layout instead
 */
function useHeaderScrollAnimation_TypeA(scrollRef) {
  const { scrollY } = useScroll({ container: scrollRef });

  // Longer scroll range for smoother animation
  const SCROLL_RANGE = ANIMATION.SCROLL_RANGE * 0.8;

  const scrollProgress = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1]);
  const headerAnimationProgress = useTransform(scrollProgress, [0, 0.5], [0, 1], { clamp: true });
  
  // Content offset to keep content in view during header collapse
  const contentOffsetY = useTransform(scrollProgress, [0, 0.5], [0, 80]);

  // Header container - collapses from full to compact
  const header = {
    height: useTransform(headerAnimationProgress, [0, 1], [170, 56]),
    paddingY: useTransform(headerAnimationProgress, [0, 1], [16, 8]),
    bgOpacity: useTransform(headerAnimationProgress, [0, 1], [0, 0.95]),
  };

  // Logo scale - enlarged 1.1x for TypeA
  const logoScale = useTransform(headerAnimationProgress, [0, 1], [0.75, 0.60]);

  // Elements that fade out during scroll
  const fadeOut = {
    opacity: useTransform(headerAnimationProgress, [0, 0.5], [1, 0]),
    scale: useTransform(headerAnimationProgress, [0, 0.5], [1, 0.95]),
  };

  // Elements visibility (for conditional rendering)
  const isCollapsed = useTransform(headerAnimationProgress, (v) => v > 0.5);

  return {
    scrollY,
    scrollProgress,
    headerAnimationProgress,
    contentOffsetY,
    header,
    logoScale,
    fadeOut,
    isCollapsed,
  };
}

export default useHeaderScrollAnimation_TypeA;
