import React from 'react';

/**
 * PageTitle - Large page title with optional accent color
 * 
 * @param {ReactNode} children - Title content
 * @param {string} accent - Optional accent text (different color)
 * @param {'default'|'large'|'hero'} size - Title size
 * @param {string} className - Additional CSS classes
 */
function PageTitle({
  children,
  accent,
  size = 'default',
  className = '',
}) {
  const sizeStyles = {
    default: 'text-3xl sm:text-4xl',
    large: 'text-4xl sm:text-5xl',
    hero: 'text-5xl sm:text-6xl md:text-7xl',
  };

  return (
    <h1
      className={`
        font-bold text-neutral-900 tracking-tight leading-tight
        ${sizeStyles[size] || sizeStyles.default}
        ${className}
      `}
    >
      {children}
      {accent && (
        <span className="text-primary-600"> {accent}</span>
      )}
    </h1>
  );
}

export default PageTitle;
