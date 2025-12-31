import React from 'react';
import { motion } from 'framer-motion';

/**
 * StickyHeader - Sticky header container with animated background
 * 
 * @param {ReactNode} children - Header content
 * @param {object} style - Motion style values (height, paddingTop, etc.)
 * @param {number} bgOpacity - Background opacity (0-1)
 * @param {string} className - Additional CSS classes
 */
function StickyHeader({
  children,
  style = {},
  bgOpacity = 0,
  className = '',
}) {
  return (
    <motion.div
      className={`sticky top-0 z-50 -mx-6 sm:-mx-8 px-6 sm:px-8 mb-6 ${className}`}
      style={{
        height: style.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        willChange: 'height, padding',
      }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgb(250, 250, 250)',
          opacity: bgOpacity,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      />
      {/* Content */}
      <div className="mx-auto w-full max-w-[1920px] h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default StickyHeader;
