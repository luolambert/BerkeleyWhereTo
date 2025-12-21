import React from 'react';

/**
 * TagList - List of tags (placeholder for Phase 3)
 * Used for: BuildingDetail tags
 */
function TagList({ tags = [], className = '' }) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium uppercase tracking-wider"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagList;
