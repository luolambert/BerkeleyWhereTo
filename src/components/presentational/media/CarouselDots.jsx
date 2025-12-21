import React from 'react';

/**
 * CarouselDots - Dot indicators for carousels
 * 
 * @param {number} total - Total number of dots
 * @param {number} current - Current active index
 * @param {function} onChange - Handler when dot is clicked (receives index)
 * @param {string} className - Additional CSS classes
 */
function CarouselDots({
  total = 0,
  current = 0,
  onChange,
  className = '',
}) {
  if (total <= 1) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: total }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onChange?.(idx)}
          className={`w-2 h-2 rounded-full transition-[width,background-color] duration-200 ${
            idx === current
              ? 'bg-white w-6'
              : 'bg-white/50 hover:bg-white/80'
          }`}
          aria-label={`Go to image ${idx + 1}`}
        />
      ))}
    </div>
  );
}

export default CarouselDots;
