import React from 'react';

/**
 * SectionTitle - Section title with left border (placeholder for Phase 3)
 */
function SectionTitle({ children, className = '' }) {
  return (
    <h3 className={`text-xl font-bold text-neutral-800 mb-6 pl-2 border-l-4 border-blue-500 ${className}`}>
      {children}
    </h3>
  );
}

export default SectionTitle;
