import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { AnimatedText } from '../../common';

/**
 * Liquid Glass Spring Configuration
 * Smooth, fluid motion inspired by Apple's iOS liquid glass design
 */
const LIQUID_GLASS_SPRING = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
  mass: 0.9,
};

/**
 * SegmentedControl - iOS-style segmented control with liquid glass animation
 * Features smooth, fluid transitions inspired by Apple's design language
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
    <LayoutGroup>
      <div className="flex items-center p-1 bg-neutral-100/95 backdrop-blur-md rounded-full border border-neutral-200/60 shadow-inner relative">
        {options.map((option) => {
          const isActive = activeId === option.id;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`
                relative px-4 py-1.5 rounded-full text-sm 
                z-10 whitespace-nowrap cursor-pointer
                ${isActive
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-550 font-medium hover:text-neutral-700'
                }
              `}
              // Smooth text color transition
              animate={{
                color: isActive ? 'rgb(23, 23, 23)' : 'rgb(115, 115, 115)',
              }}
              transition={{
                duration: 0.25,
                ease: [0.32, 0.72, 0, 1], // Apple-style easing
              }}
            >
              {/* Liquid Glass Animated Background */}
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full z-[-1]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.95) 100%)',
                    boxShadow: `
                      0 1px 3px rgba(0,0,0,0.06),
                      0 4px 12px rgba(0,0,0,0.04),
                      inset 0 1px 0 rgba(255,255,255,0.8),
                      inset 0 -1px 0 rgba(0,0,0,0.02)
                    `,
                  }}
                  initial={false}
                  transition={LIQUID_GLASS_SPRING}
                />
              )}
              <AnimatedText textKey={`segment-${option.id}-${language}`}>
                {option.label}
              </AnimatedText>
            </motion.button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export default SegmentedControl;
