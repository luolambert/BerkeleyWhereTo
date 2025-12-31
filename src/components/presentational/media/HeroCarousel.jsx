import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { DURATIONS, EASINGS } from '../../../constants/animations';
import CarouselArrow from '../buttons/CarouselArrow';
import CarouselDots from './CarouselDots';

/**
 * HeroCarousel - Full-screen image carousel for BuildingDetail hero section
 * 
 * @param {string[]} images - Array of image URLs
 * @param {number} currentIndex - Current image index
 * @param {function} onNext - Next image handler
 * @param {function} onPrev - Previous image handler
 * @param {function} onGoTo - Go to specific index handler
 * @param {boolean} hasMultiple - Whether there are multiple images
 * @param {string} alt - Base alt text for images
 * @param {string} scrollText - Text for scroll indicator
 */
function HeroCarousel({
  images = [],
  currentIndex = 0,
  onNext,
  onPrev,
  onGoTo,
  hasMultiple = false,
  alt = 'Image',
  scrollText = 'Scroll for details',
}) {
  if (images.length === 0) {
    return (
      <div className="w-full h-screen bg-neutral-200 flex items-center justify-center">
        <span className="text-neutral-400">No images</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-100 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATIONS.carousel, ease: EASINGS.easeInOut }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />

      {/* Navigation Arrows */}
      {hasMultiple && (
        <>
          <CarouselArrow
            direction="left"
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100"
          />
          <CarouselArrow
            direction="right"
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100"
          />

          <CarouselDots
            total={images.length}
            current={currentIndex}
            onChange={onGoTo}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40"
          />
        </>
      )}
      
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-30 pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-white/80 animate-bounce">
          <span className="text-xs font-medium tracking-widest uppercase">{scrollText}</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
