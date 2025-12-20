import { useState, useEffect, useCallback } from 'react';

/**
 * Image Carousel Hook
 * Manages state and logic for image carousels
 * 
 * @param {string[]} images - Array of image URLs
 * @param {number} intervalMs - Auto-rotation interval (ms), default 5000ms
 * @returns {object} - Current index and navigation methods
 */
function useImageCarousel(images, intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [images, intervalMs]);

  // Next slide
  const next = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  // Previous slide
  const prev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  // Jump to specific image
  const goTo = useCallback((index) => {
    if (!images || index < 0 || index >= images.length) return;
    setCurrentIndex(index);
  }, [images]);

  // Reset to first slide
  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    reset,
    hasMultiple: images && images.length > 1,
    total: images ? images.length : 0,
  };
}

export default useImageCarousel;
