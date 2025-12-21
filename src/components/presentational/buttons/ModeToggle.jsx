import React from 'react';

/**
 * ModeToggle - Mode toggle component (placeholder for Phase 1B)
 */
function ModeToggle({ options = [], activeId, onChange, className = '' }) {
  return (
    <div className={`bg-neutral-100 p-1 rounded-xl flex items-center gap-1 shrink-0 ${className}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`px-3 py-2 rounded-lg text-sm font-bold transition-[background-color,color,box-shadow] duration-200 ${
            activeId === option.id
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default ModeToggle;
