import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * CarouselArrow - Carousel navigation arrow (placeholder for Phase 3)
 */
function CarouselArrow({ direction = 'left', onClick, className = '' }) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className={`p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-[background-color,color] duration-200 ${className}`}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      <Icon className="w-8 h-8" />
    </button>
  );
}

export default CarouselArrow;
