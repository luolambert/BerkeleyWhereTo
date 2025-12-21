import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';

/**
 * SearchInput - Search input with icon and focus styling
 * Used for: BuildingSelectionPanel
 * 
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler (receives value string)
 * @param {string} placeholder - Placeholder text
 * @param {boolean} autoFocus - Auto focus on mount
 * @param {string} className - Additional CSS classes
 */
const SearchInput = forwardRef(function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
  className = '',
}, ref) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        size={20}
      />
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className="w-full bg-neutral-100 hover:bg-neutral-50 focus:bg-white border-2 border-transparent focus:border-primary-500 rounded-2xl pl-12 pr-4 py-3 text-lg font-medium transition-[background-color,border-color] duration-200 outline-none"
      />
    </div>
  );
});

export default SearchInput;
