import React from 'react';
import { motion } from 'framer-motion';

/**
 * IconButton - Circular icon button with multiple variants
 * Used for: Reset button, Language toggle, Back button, Close button
 * 
 * @param {LucideIcon} icon - Lucide icon component
 * @param {function} onClick - Click handler
 * @param {'ghost'|'filled'|'glass'} variant - Visual variant
 * @param {'small'|'default'|'large'} size - Button size
 * @param {string} title - Tooltip text
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disabled state
 */
function IconButton({
  icon: Icon,
  onClick,
  variant = 'ghost',
  size = 'default',
  title,
  className = '',
  disabled = false,
}) {
  const variantStyles = {
    ghost: 'hover:bg-amber-50 text-amber-400 hover:text-amber-500',
    filled: 'bg-primary-600 hover:bg-primary-700 text-white',
    glass: 'bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border border-white/10',
  };

  const sizeStyles = {
    small: 'p-1.5',
    default: 'p-2.5',
    large: 'p-3',
  };

  const iconSizes = {
    small: 14,
    default: 20,
    large: 24,
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.95, rotate: 90 } : {}}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        rounded-full
        transition-colors duration-200
        ${sizeStyles[size] || sizeStyles.default}
        ${disabled ? 'opacity-50 cursor-not-allowed' : variantStyles[variant] || variantStyles.ghost}
        ${className}
      `}
    >
      {Icon && <Icon size={iconSizes[size] || 18} />}
    </motion.button>
  );
}

export default IconButton;
