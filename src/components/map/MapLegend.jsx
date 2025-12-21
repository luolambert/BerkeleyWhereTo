import React from 'react';
import { AnimatedText } from '../common';

/**
 * MapLegend Component
 * Displays slope intensity legend on the map
 * 
 * @param {string} language - 'CN' | 'EN'
 */
function MapLegend({ language }) {
  const labels = {
    title: language === 'CN' ? '坡度强度' : 'Slope Intensity',
    flat: language === 'CN' ? '平坦 (<3%)' : 'Flat (<3%)',
    moderate: language === 'CN' ? '中等 (3-8%)' : 'Moderate (3-8%)',
    steep: language === 'CN' ? '陡峭 (>8%)' : 'Steep (>8%)',
  };

  return (
    <div className="absolute bottom-8 right-16 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 z-50">
      <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
        <AnimatedText textKey={`legend-title-${language}`}>
          {labels.title}
        </AnimatedText>
      </h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-xs font-medium text-gray-600">
            <AnimatedText textKey={`legend-flat-${language}`}>{labels.flat}</AnimatedText>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-xs font-medium text-gray-600">
            <AnimatedText textKey={`legend-mod-${language}`}>{labels.moderate}</AnimatedText>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-2 bg-blue-900 rounded-full"></div>
          <span className="text-xs font-medium text-gray-600">
            <AnimatedText textKey={`legend-steep-${language}`}>{labels.steep}</AnimatedText>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MapLegend;
