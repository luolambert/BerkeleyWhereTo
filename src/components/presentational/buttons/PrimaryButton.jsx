import React from 'react';
import { motion } from 'framer-motion';

/**
 * PrimaryButton - Main action button with gradient and loading state
 * Used for: LandingPage CTA, RouteInput calculate, ErrorBoundary actions
 * 
 * @param {ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state with spinner
 * @param {'blue'|'amber'|'neutral'} variant - Color variant
 * @param {'default'|'large'} size - Button size
 * @param {string} className - Additional CSS classes
 */
function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'blue',
  size = 'default',
  className = '',
}) {
  const variantStyles = {
    blue: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-primary-500/25',
    amber: 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 shadow-amber-500/30',
    neutral: 'bg-neutral-900 hover:bg-neutral-800 shadow-neutral-900/20',
  };

  const sizeStyles = {
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-bold text-white
        shadow-lg
        transition-[background,box-shadow] duration-200
        ${sizeStyles[size] || sizeStyles.default}
        ${isDisabled
          ? 'bg-neutral-400 cursor-not-allowed shadow-none'
          : variantStyles[variant] || variantStyles.blue
        }
        ${className}
      `}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
}

export default PrimaryButton;
