import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SlideTransition - Reusable slide track animation container
 * 
 * Creates a carousel-like transition where old content slides out
 * while new content slides in from the opposite direction.
 * Uses Framer Motion's custom prop to lock direction for exit animations.
 * 
 * @param {string|number} activeKey - Key that triggers animation when changed
 * @param {number} direction - Slide direction: 1 = from right, -1 = from left
 * @param {number} gap - Gap between old and new content in pixels (default: 70)
 * @param {number} duration - Animation duration in seconds (default: 0.35)
 * @param {string} className - Additional CSS classes for the container
 * @param {React.ReactNode} children - Content to animate
 */
function SlideTransition({
  activeKey,
  direction = 1,
  gap = 70,
  duration = 0.35,
  className = '',
  children,
}) {
  const variants = {
    initial: (dir) => ({
      opacity: 1,
      x: `calc(${dir * 100}% + ${dir * gap}px)`,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir) => ({
      opacity: 1,
      x: `calc(${-dir * 100}% + ${-dir * gap}px)`,
    }),
  };

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.div
        key={activeKey}
        className={className}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          type: 'tween',
          duration,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default SlideTransition;
