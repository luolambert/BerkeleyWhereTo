import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../../common';
import { SPRINGS } from '../../../constants/animations';

/**
 * SegmentedControl - iOS-style segmented control with animated background
 * Used for: BuildingGrid sort options
 * 
 * @param {Array<{id: string, label: string}>} options - Available options
 * @param {string} activeId - Currently selected option ID
 * @param {function} onChange - Selection change handler (receives option id)
 * @param {string} layoutId - Framer Motion layoutId for animated background
 * @param {string} language - Current language for animation keys
 */
function SegmentedControl({
  options = [],
  activeId,
  onChange,
  layoutId = 'activeSegment',
  language = 'EN',
}) {
  return (
    <div className="flex items-center p-1 bg-neutral-100/80 backdrop-blur-md rounded-full border border-white/20 shadow-inner relative">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`
            relative px-4 py-1.5 rounded-full text-sm 
            transition-colors duration-200 z-10 whitespace-nowrap
            ${activeId === option.id
              ? 'text-neutral-900 font-semibold'
              : 'text-neutral-500 font-medium hover:text-neutral-700'
            }
          `}
        >
          {/* Animated background for active state */}
          {activeId === option.id && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] rounded-full z-[-1]"
              transition={SPRINGS.stiff}
            />
          )}
          <AnimatedText textKey={`segment-${option.id}-${language}`}>
            {option.label}
          </AnimatedText>
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;
