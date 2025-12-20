import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DURATIONS, EASINGS, GPU_ACCELERATED_STYLE } from '../../constants/animations';

/**
 * ImageCarousel - Reusable image carousel component
 * Features: auto-play, manual navigation, dot indicators, preload, GPU acceleration
 * 
 * @param {string[]} images - Array of image URLs
 * @param {number} interval - Auto-rotation interval in ms (default: 5000)
 * @param {string} alt - Base alt text for images
 * @param {boolean} showControls - Whether to show navigation arrows
 * @param {boolean} showDots - Whether to show dot indicators
 * @param {string} className - Additional CSS classes for container
 */
function ImageCarousel({ 
  images = [], 
  interval = 5000, 
  alt = 'Image',
  showControls = true,
  showDots = true,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = images.length > 1;

  // Auto-rotation
  useEffect(() => {
    if (!hasMultiple) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, hasMultiple]);

  // Preload next image
  useEffect(() => {
    if (!hasMultiple) return;
    
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentIndex, images, hasMultiple]);

  // Navigation handlers
  const goNext = useCallback((e) => {
    e?.stopPropagation();
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, hasMultiple]);

  const goPrev = useCallback((e) => {
    e?.stopPropagation();
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, hasMultiple]);

  const goTo = useCallback((index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className={`bg-neutral-200 flex items-center justify-center ${className}`}>
        <span className="text-neutral-400">No images</span>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Image display with crossfade and GPU acceleration */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATIONS.carousel, ease: EASINGS.easeInOut }}
          style={GPU_ACCELERATED_STYLE}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation arrows */}
      {showControls && hasMultiple && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-[background-color,color,opacity] duration-200 z-40 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-[background-color,color,opacity] duration-200 z-40 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && hasMultiple && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2 h-2 rounded-full transition-[width,background-color] duration-200 ${
                idx === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
