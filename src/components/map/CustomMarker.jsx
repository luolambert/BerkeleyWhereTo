import React from 'react';
import { OverlayView } from '@react-google-maps/api';

/**
 * CustomMarker Component
 * Displays a styled marker with label on the map
 * 
 * @param {object} position - { lat, lng } coordinates
 * @param {string} label - Marker label text
 * @param {string} type - 'start' | 'end' determines color
 * @param {string} placement - 'top' | 'bottom' label position
 */
function CustomMarker({ position, label, type, placement = 'top' }) {
  const getPixelPositionOffset = (width, height) => {
    // Adjust offset based on placement
    // The dot is 12px (h-3). We want the dot to be centered/anchored at the position.
    if (placement === 'top') {
      // Container: Label -> Arrow -> Dot
      // Anchor is at the bottom of the container (Dot)
      return { x: -(width / 2), y: -(height - 6) };
    } else {
      // Container: Dot -> Arrow -> Label
      // Anchor is at the top of the container (Dot)
      return { x: -(width / 2), y: -6 };
    }
  };

  const dotColor = type === 'start' ? 'bg-green-500' : 'bg-red-500';

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className="flex flex-col items-center transform transition-transform hover:scale-110 z-50">
        {placement === 'top' ? (
          <>
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 mb-0 whitespace-nowrap">
              <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
              <span className="font-bold text-gray-800 text-sm">{label}</span>
            </div>
            <div className="w-4 h-4 transform rotate-45 -mt-2 border-r border-b border-gray-100 bg-white z-10"></div>
            <div className={`w-3 h-3 rounded-full -mt-2 ${dotColor} ring-4 ring-white shadow-sm z-20`}></div>
          </>
        ) : (
          <>
            <div className={`w-3 h-3 rounded-full -mb-2 ${dotColor} ring-4 ring-white shadow-sm z-20`}></div>
            <div className="w-4 h-4 transform rotate-45 -mb-2 border-l border-t border-gray-100 bg-white z-10"></div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 mt-0 whitespace-nowrap">
              <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
              <span className="font-bold text-gray-800 text-sm">{label}</span>
            </div>
          </>
        )}
      </div>
    </OverlayView>
  );
}

export default CustomMarker;
