import React from 'react';

/**
 * GlassPanel - Reusable glassmorphism panel container
 * Used for: RouteInput, Header, BuildingSelectionPanel, MapLegend, etc.
 * 
 * @param {ReactNode} children - Panel content
 * @param {string} className - Additional CSS classes
 * @param {'default'|'elevated'|'dark'} variant - Visual variant
 * @param {'none'|'small'|'default'|'large'} padding - Padding size
 */
function GlassPanel({
  children,
  className = '',
  variant = 'default',
  padding = 'default',
}) {
  const variantStyles = {
    default: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg',
    elevated: 'bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl shadow-neutral-900/20',
    dark: 'bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-lg',
  };

  const paddingStyles = {
    none: '',
    small: 'p-3',
    default: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      className={`
        rounded-2xl
        ${variantStyles[variant] || variantStyles.default}
        ${paddingStyles[padding] || paddingStyles.default}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default GlassPanel;
