import React from 'react';

/**
 * GradientBackground - Gradient overlay background layer
 * 
 * @param {'blue'|'amber'|'black'|'white'} variant - Gradient color variant
 * @param {'t'|'b'|'br'|'bl'|'tr'|'tl'} direction - Gradient direction
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Optional children to render on top
 */
function GradientBackground({
  variant = 'blue',
  direction = 'br',
  className = '',
  children,
}) {
  const directionMap = {
    t: 'to-t',
    b: 'to-b',
    br: 'to-br',
    bl: 'to-bl',
    tr: 'to-tr',
    tl: 'to-tl',
  };

  const variantStyles = {
    blue: `bg-gradient-${directionMap[direction]} from-primary-50 via-white to-secondary-50`,
    amber: `bg-gradient-${directionMap[direction]} from-amber-50 via-white to-amber-100`,
    black: `bg-gradient-${directionMap[direction]} from-black/80 via-black/40 to-transparent`,
    white: `bg-gradient-${directionMap[direction]} from-white via-white/80 to-transparent`,
  };

  return (
    <div className={`absolute inset-0 ${variantStyles[variant] || variantStyles.blue} ${className}`}>
      {children}
    </div>
  );
}

export default GradientBackground;
