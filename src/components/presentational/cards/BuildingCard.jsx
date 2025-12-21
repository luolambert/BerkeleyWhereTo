import React from 'react';
import { AnimatedText } from '../../common';

/**
 * BuildingCard - Building display card with image background and hover effects
 * Used for: BuildingGrid
 * 
 * @param {string} title - Building name
 * @param {string} summary - Brief description
 * @param {string} imageUrl - Background image URL
 * @param {string} viewDetailsText - Hover badge text (e.g., "View Details")
 * @param {function} onClick - Click handler
 * @param {string} language - Current language for animation key
 * @param {string} buildingId - Building ID for animation key
 */
function BuildingCard({
  title,
  summary,
  imageUrl,
  viewDetailsText = 'View Details',
  onClick,
  language = 'EN',
  buildingId,
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-[transform,box-shadow] duration-300 overflow-hidden h-[280px]"
    >
      {/* Full background image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Hover "View Details" badge */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
          <AnimatedText textKey={`viewDetails-${language}`}>
            {viewDetailsText}
          </AnimatedText>
        </span>
      </div>

      {/* Text Content - Overlaid at bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors text-shadow-sm">
          {title}
        </h3>
        <p className="text-sm text-white/80 line-clamp-1 leading-relaxed font-medium">
          <AnimatedText textKey={`card-summary-${buildingId}-${language}`}>
            {summary}
          </AnimatedText>
        </p>
      </div>
    </div>
  );
}

export default BuildingCard;
