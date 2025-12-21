import React from 'react';

/**
 * MetaBadge - Meta info badge with icon (placeholder for Phase 3)
 * Used for: BuildingDetail (year, architect)
 */
function MetaBadge({ icon: Icon, text, className = '' }) {
  return (
    <div className={`flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );
}

export default MetaBadge;
