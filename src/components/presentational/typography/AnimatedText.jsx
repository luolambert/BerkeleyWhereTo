import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT_VARIANTS } from '../../../constants/animations';

/**
 * AnimatedText Component
 * Provides smooth crossfade animation when text content changes (e.g., language switch)
 * 
 * @param {string} textKey - Unique key for AnimatePresence (typically language + text identifier)
 * @param {React.ReactNode} children - Text content to render
 * @param {string} as - HTML element to render (default: 'span')
 * @param {string} className - Additional CSS classes
 */
function AnimatedText({ 
  textKey, 
  children, 
  as: Component = 'span', 
  className = '',
  ...props 
}) {
  const MotionComponent = motion[Component] || motion.span;
  
  return (
    <AnimatePresence mode="wait">
      <MotionComponent
        key={textKey}
        variants={TEXT_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        style={{ display: 'inline-block' }}
        {...props}
      >
        {children}
      </MotionComponent>
    </AnimatePresence>
  );
}

export default AnimatedText;
