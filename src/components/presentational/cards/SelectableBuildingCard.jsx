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
      style={{ height: '116px' }}
      className={`
        flex flex-col gap-3 p-4 bg-white rounded-2xl border-2 
        transition-all duration-200 cursor-pointer
        ${isSelected
          ? 'border-primary-500 shadow-md'
          : 'border-neutral-200 hover:border-primary-400 hover:shadow-lg'
        }
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
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

      <h3 className="text-lg font-bold text-neutral-900 leading-tight break-words">
        {name}
      </h3>
      
      <p className="text-sm text-neutral-600">
        {category}
      </p>
      
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
