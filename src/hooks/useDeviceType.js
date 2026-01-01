import { useState, useEffect } from 'react';

// Breakpoint aligned with Tailwind's lg: (1024px)
const BREAKPOINT = 1024;

/**
 * Device type detection hook
 * @returns {'typeA' | 'typeB'} - typeA for narrow screens (< 1024px), typeB for wide screens
 */
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState(() => {
    if (typeof window === 'undefined') return 'typeB';
    return window.innerWidth >= BREAKPOINT ? 'typeB' : 'typeA';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
    
    const handleChange = (e) => {
      setDeviceType(e.matches ? 'typeB' : 'typeA');
    };

    // Initial check
    setDeviceType(mediaQuery.matches ? 'typeB' : 'typeA');

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return deviceType;
}

export default useDeviceType;
