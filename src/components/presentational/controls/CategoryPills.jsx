import React from 'react';
import { motion } from 'framer-motion';
import { SPRINGS } from '../../../constants/animations';
import { Dock, DockIcon } from '../../ui/dock';

/**
 * CategoryPills - Horizontal scrollable category button group with spring animation
 * Enhanced with Magic UI Dock fisheye magnification effect
 * Used for: BuildingSelectionPanel categories
 * 
 * @param {Array<{id: string, label: string, icon?: LucideIcon}>} categories - Category list
 * @param {string} activeId - Currently selected category ID
 * @param {function} onChange - Selection change handler (receives category id)
 * @param {string} className - Additional CSS classes
 * @param {string} layoutId - Framer Motion layoutId for animated background
 */
function CategoryPills({
  categories = [],
  activeId,
  onChange,
  className = '',
  layoutId = 'categoryPill',
}) {
  return (
    <div className={`overflow-x-auto overflow-y-visible no-scrollbar ${className}`}>
      <Dock
        magnification={1.12}
        distance={100}
        direction="middle"
        className="flex gap-2 overflow-visible py-2 relative z-50 w-max"
      >
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeId === cat.id;
        
        return (
          <DockIcon key={cat.id}>
            <motion.button
              onClick={() => onChange(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold 
                whitespace-nowrap transition-colors duration-200
                ${isActive
                  ? 'text-white z-20'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 z-10'
                }
              `}
            >
              {/* Animated background for active state - z-index above other buttons */}
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 bg-primary-600 rounded-xl shadow-lg shadow-primary-500/30 z-10"
                  transition={SPRINGS.stiff}
                />
              )}
              <span className="relative z-20 flex items-center gap-2">
                {Icon && <Icon size={16} />}
                {cat.label}
              </span>
            </motion.button>
          </DockIcon>
        );
      })}
    </Dock>
    </div>
  );
}

export default CategoryPills;

