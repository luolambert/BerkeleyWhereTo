import React from 'react';
import { motion } from 'framer-motion';
import { SPRINGS } from '../../../constants/animations';

/**
 * ModeToggle - Mode toggle component with spring animation
 */
function ModeToggle({ options = [], activeId, onChange, className = '', layoutId = 'modeToggle' }) {
  return (
    <div className={`bg-neutral-100 p-1 rounded-xl flex items-center gap-1 shrink-0 relative ${className}`}>
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => onChange(option.id)}
          whileTap={{ scale: 0.95 }}
          className={`relative px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 z-10 ${
            activeId === option.id
              ? 'text-primary-600'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {/* Animated background for active state */}
          {activeId === option.id && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-white rounded-lg shadow-sm z-[-1]"
              transition={SPRINGS.stiff}
            />
          )}
          {option.label}
        </motion.button>
      ))}
    </div>
  );
}

export default ModeToggle;

