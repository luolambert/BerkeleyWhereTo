import React, { forwardRef, useState, useId } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * SearchInput - Search input with floating label animation
 * Used for: BuildingSelectionPanel
 * 
 * Features a floating label that animates up when focused or has value,
 * with glassmorphism styling that supports future theme switching.
 */
const SearchInput = forwardRef(function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
  className = '',
}, ref) {
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputId = useId();
  
  // Label floats when focused or has input value
  const isActive = isFocused || value.length > 0;

  return (
    <div className={cn('relative flex-1', className)}>
      <Search
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-250',
          isActive ? 'text-primary-500' : 'text-neutral-400'
        )}
        size={20}
      />
      
      <input
        ref={ref}
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autoFocus}
        className={cn(
          'w-full rounded-2xl pl-12 pr-4 py-3 text-lg font-medium outline-none',
          'border-2 transition-all duration-250',
          isActive
            ? 'bg-white border-primary-500'
            : 'bg-neutral-100 border-transparent hover:bg-neutral-50'
        )}
      />
      
      {/* Floating label with glassmorphism effect */}
      <label
        htmlFor={inputId}
        className={cn(
          'absolute left-12 pointer-events-none select-none origin-left',
          'transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isActive ? [
            'top-0 -translate-y-1/2 scale-[0.85]',
            'text-primary-500 font-medium',
            'px-2 py-0.5 rounded-md',
            'bg-white/90 backdrop-blur-sm',
            'shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
          ] : [
            'top-1/2 -translate-y-1/2 scale-100',
            'text-neutral-400'
          ]
        )}
      >
        {placeholder}
      </label>
    </div>
  );
});

export default SearchInput;
