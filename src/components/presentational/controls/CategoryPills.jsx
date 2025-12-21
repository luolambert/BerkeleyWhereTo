import React from 'react';

/**
 * CategoryPills - Horizontal scrollable category button group
 * Used for: BuildingSelectionPanel categories
 * 
 * @param {Array<{id: string, label: string, icon?: LucideIcon}>} categories - Category list
 * @param {string} activeId - Currently selected category ID
 * @param {function} onChange - Selection change handler (receives category id)
 * @param {string} className - Additional CSS classes
 */
function CategoryPills({
  categories = [],
  activeId,
  onChange,
  className = '',
}) {
  return (
    <div className={`flex gap-2 overflow-x-auto no-scrollbar ${className}`}>
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeId === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold 
              whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200
              ${isActive
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }
            `}
          >
            {Icon && <Icon size={16} />}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryPills;
