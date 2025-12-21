import React from 'react';
import { Building2, Users } from 'lucide-react';
import Badge from '../badges/Badge';

/**
 * SelectableBuildingCard - Selectable building card for selection panels
 * Used for: BuildingSelectionPanel building grid
 * 
 * @param {string} name - Building name
 * @param {string} category - Building category
 * @param {boolean} isSelected - Whether this card is selected
 * @param {boolean} isPopular - Show popular badge
 * @param {boolean} isUndergrad - Show undergrad tag
 * @param {boolean} isGrad - Show grad tag
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
function SelectableBuildingCard({
  name,
  category,
  isSelected = false,
  isPopular = false,
  isUndergrad = false,
  isGrad = false,
  onClick,
  className = '',
}) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left p-3 rounded-2xl border 
        transition-[border-color,box-shadow,transform] duration-200 
        group relative overflow-hidden
        ${isSelected
          ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500'
          : 'bg-white border-neutral-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5'
        }
        ${className}
      `}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-2">
        <div
          className={`
            p-1.5 rounded-xl transition-colors
            ${isSelected
              ? 'bg-primary-100 text-primary-600'
              : 'bg-neutral-100 text-neutral-500 group-hover:bg-primary-50 group-hover:text-primary-600'
            }
          `}
        >
          <Building2 size={18} />
        </div>
        {isPopular && (
          <Badge variant="amber" icon={Users}>
            Popular
          </Badge>
        )}
      </div>

      {/* Building Name */}
      <div className="font-bold text-neutral-800 group-hover:text-primary-700 transition-colors text-sm leading-tight break-words">
        {name}
      </div>

      {/* Category */}
      <div className="text-xs text-neutral-500 mt-1 font-medium">
        {category}
      </div>

      {/* Student Type Tags */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {isUndergrad && (
          <Badge variant="blue" size="small">
            Undergrad
          </Badge>
        )}
        {isGrad && (
          <Badge variant="purple" size="small">
            Grad
          </Badge>
        )}
      </div>
    </button>
  );
}

export default SelectableBuildingCard;
