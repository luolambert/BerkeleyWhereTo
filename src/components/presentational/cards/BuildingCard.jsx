import React from 'react';
import { AnimatedText } from '../../common';
import { WobbleCard } from '../../ui/wobble-card';
import { usePreload } from '../../../context/PreloadContext';
import { useBuildingImages } from '../../../hooks/useBuildingImages';

/**
 * BuildingCard - Building display card with image background and hover effects
 * Used for: BuildingGrid
 * 
 * @param {string} title - Building name
 * @param {string} summary - Brief description
 * @param {string} imageUrl - Background image URL (optional, will auto-fetch if not provided)
 * @param {string} viewDetailsText - Hover badge text (e.g., "View Details")
 * @param {function} onClick - Click handler
 * @param {string} language - Current language for animation key
 * @param {string} buildingId - Building ID for animation key
 */
function BuildingCard({
  title,
  summary,
  imageUrl: propImageUrl,
  viewDetailsText = 'View Details',
  onClick,
  language = 'EN',
  buildingId,
}) {
  const { failedImages } = usePreload();
  const { images: dynamicImages } = useBuildingImages(buildingId);
  
  const imageUrl = propImageUrl || dynamicImages[0] || null;
  const isImageFailed = imageUrl && failedImages.includes(imageUrl);

  return (
    <WobbleCard
      containerClassName="group h-full w-full bg-transparent overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
      className="relative h-[280px] p-0 overflow-hidden"
      onClick={onClick}
    >
      {imageUrl && !isImageFailed && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.15]"
        />
      )}

      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center z-5">
          <div className="text-center text-white/50">
            <div className="text-4xl mb-2">🏛️</div>
            <p className="text-xs font-medium">
              {language === 'CN' ? '暂无图片' : 'No Image'}
            </p>
          </div>
        </div>
      )}

      {isImageFailed && (
        <div className="absolute inset-0 bg-neutral-700 flex items-center justify-center z-5">
          <div className="text-center text-white/70">
            <div className="text-3xl mb-1">⚠️</div>
            <p className="text-xs font-medium">
              {language === 'CN' ? '图片加载失败' : 'Image Load Failed'}
            </p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
        <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
          <AnimatedText textKey={`viewDetails-${language}`}>
            {viewDetailsText}
          </AnimatedText>
        </span>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors text-shadow-sm">
          {title}
        </h3>
        <p className="text-sm text-white/80 line-clamp-1 leading-relaxed font-medium">
          <AnimatedText textKey={`card-summary-${buildingId}-${language}`}>
            {summary}
          </AnimatedText>
        </p>
      </div>
    </WobbleCard>
  );
}

export default BuildingCard;

