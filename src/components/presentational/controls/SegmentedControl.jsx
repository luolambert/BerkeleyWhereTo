import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../../common';

/**
 * Liquid Glass Spring Configuration
 * Smooth, fluid motion inspired by Apple's iOS liquid glass design
 * Higher stiffness = faster, lower damping = more bounce
 */
const LIQUID_GLASS_SPRING = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

/**
 * SegmentedControl - iOS-style segmented control with liquid glass animation
 * Features smooth, fluid transitions inspired by Apple's design language
 * 
 * Bug Fix: Moved background element to container level instead of nesting inside buttons.
 * This ensures the sliding animation works correctly by animating a single element's
 * position rather than relying on cross-parent layoutId transitions.
 * 
 * @param {Array<{id: string, label: string}>} options - Available options
 * @param {string} activeId - Currently selected option ID
 * @param {function} onChange - Selection change handler (receives option id)
 * @param {string} language - Current language for animation keys
 */
function SegmentedControl({
  options = [],
  activeId,
  onChange,
  language = 'EN',
}) {
  // Refs for tracking button positions
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  
  // State for active indicator position/size
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Calculate active button position
  const updateIndicatorPosition = useCallback(() => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[activeId];
    
    if (container && activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [activeId, isInitialized]);

  // Update position on activeId change or mount
  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  // Update position on window resize
  useEffect(() => {
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [updateIndicatorPosition]);

  return (
    <div 
      ref={containerRef}
      className="flex items-center p-1 bg-neutral-100/95 backdrop-blur-md rounded-full border border-neutral-200/60 shadow-inner relative"
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-full pointer-events-none"
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
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          opacity: isInitialized ? 1 : 0,
        }}
        transition={isInitialized ? LIQUID_GLASS_SPRING : { duration: 0 }}
      />
      
      {options.map((option, index) => {
        const isActive = activeId === option.id;
        
        // Calculate direction on click: compare clicked index with current active index
        const handleClick = () => {
          const currentIndex = options.findIndex(opt => opt.id === activeId);
          const direction = index > currentIndex ? 1 : -1;
          // Pass both the new id and the direction
          onChange(option.id, direction);
        };
        
        return (
          <motion.button
            key={option.id}
            ref={(el) => { buttonRefs.current[option.id] = el; }}
            onClick={handleClick}
            className={`
              relative px-4 py-1.5 rounded-full text-sm 
              z-10 whitespace-nowrap cursor-pointer
              ${isActive
                ? 'font-semibold'
                : 'font-medium hover:text-neutral-700'
              }
            `}
            animate={{
              color: isActive ? 'rgb(23, 23, 23)' : 'rgb(115, 115, 115)',
            }}
            transition={{
              duration: 0.25,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <AnimatedText textKey={`segment-${option.id}-${language}`}>
              {option.label}
            </AnimatedText>
          </motion.button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
