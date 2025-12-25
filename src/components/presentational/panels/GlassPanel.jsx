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
    default: 'bg-white/90 backdrop-blur-md border border-neutral-200/50 shadow-xl shadow-neutral-900/25',
    elevated: 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.18),0_30px_60px_-12px_rgba(0,0,0,0.14),inset_0_1px_0_0_rgba(255,255,255,0.95)]',
    dark: 'bg-neutral-900/90 backdrop-blur-md border border-white/10 shadow-xl shadow-neutral-900/35',
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
