import React from 'react';

/**
 * Badge - Small label badge with color variants
 * Used for: BuildingSelectionPanel (Popular, Undergrad, Grad tags)
 * 
 * @param {ReactNode} children - Badge content
 * @param {'amber'|'blue'|'purple'|'neutral'|'green'} variant - Color variant
 * @param {'small'|'default'} size - Badge size
 * @param {LucideIcon} icon - Optional icon
 * @param {string} className - Additional CSS classes
 */
function Badge({
  children,
  variant = 'neutral',
  size = 'default',
  icon: Icon,
  className = '',
}) {
  const variantStyles = {
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    green: 'bg-green-50 text-green-600 border-green-100',
  };

  const sizeStyles = {
    small: 'text-[9px] px-1.5 py-0.5',
    default: 'text-[10px] px-2 py-0.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-bold rounded-full border
        ${variantStyles[variant] || variantStyles.neutral}
        ${sizeStyles[size] || sizeStyles.default}
        ${className}
      `}
    >
      {Icon && <Icon size={size === 'small' ? 10 : 12} />}
      {children}
    </span>
  );
}

export default Badge;
