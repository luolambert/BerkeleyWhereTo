import React from 'react';

/**
 * PageContainer - Main page container with consistent styling
 * 
 * @param {ReactNode} children - Page content
 * @param {'default'|'full'|'narrow'} maxWidth - Max width variant
 * @param {string} className - Additional CSS classes
 */
function PageContainer({
  children,
  maxWidth = 'default',
  className = '',
}) {
  const maxWidthStyles = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    full: 'max-w-[1920px]',
  };

  return (
    <div
      className={`
        min-h-screen bg-neutral-50
        ${className}
      `}
    >
      <div className={`mx-auto w-full ${maxWidthStyles[maxWidth] || maxWidthStyles.default}`}>
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
