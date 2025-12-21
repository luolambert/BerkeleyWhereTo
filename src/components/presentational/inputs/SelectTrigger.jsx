import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AnimatedText } from '../../common';

/**
 * SelectTrigger - Dropdown select trigger button
 * Used for: BuildingSelect (start/end location selection)
 * 
 * @param {string} label - Field label
 * @param {string} value - Selected value (or null for placeholder)
 * @param {string} placeholder - Placeholder when no value selected
 * @param {LucideIcon} icon - Optional icon
 * @param {boolean} isActive - Whether the dropdown is open
 * @param {function} onClick - Click handler
 * @param {string} language - Current language for animation keys
 * @param {string} className - Additional CSS classes
 */
function SelectTrigger({
  label,
  value,
  placeholder = 'Select...',
  icon: Icon,
  isActive = false,
  onClick,
  language = 'EN',
  className = '',
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Label */}
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 ml-1">
        <AnimatedText textKey={`label-${label}-${language}`}>
          {label}
        </AnimatedText>
      </label>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`
          w-full text-left bg-white/50 hover:bg-white/80 
          transition-[background-color,border-color,box-shadow] duration-200 
          border rounded-xl px-4 py-3 flex items-center justify-between shadow-sm
          ${isActive ? 'border-primary-500 ring-2 ring-primary-100 bg-white' : 'border-neutral-200'}
          ${value ? 'border-primary-500/50' : ''}
        `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && (
            <Icon
              size={18}
              className={isActive || value ? 'text-primary-500' : 'text-neutral-400'}
            />
          )}
          <span className={`font-medium truncate ${value ? 'text-neutral-800' : 'text-neutral-400'}`}>
            {value || (
              <AnimatedText textKey={`placeholder-${placeholder}-${language}`}>
                {placeholder}
              </AnimatedText>
            )}
          </span>
        </div>
        <div className={`text-neutral-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-primary-500' : ''}`}>
          <ChevronDown size={16} />
        </div>
      </motion.button>
    </div>
  );
}

export default SelectTrigger;
