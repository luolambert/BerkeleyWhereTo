/**
 * UI Colors Design Token System
 * Centralized color management for consistent theming
 */

// Primary brand colors
export const BRAND = {
  primary: '#3B82F6',       // Blue-500 - Main brand color
  primaryLight: '#93C5FD',  // Blue-300 - Light accent
  primaryDark: '#1E3A8A',   // Blue-900 - Dark accent
  berkeleyGold: '#fdb515',  // UC Berkeley Gold
};

// Semantic colors
export const SEMANTIC = {
  success: '#22C55E',  // Green-500
  error: '#EF4444',    // Red-500
  warning: '#F59E0B',  // Amber-500
  info: '#3B82F6',     // Blue-500
};

// Neutral colors (from Tailwind neutral palette)
export const NEUTRAL = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
};

// Chart colors
export const CHART = {
  line: '#3B82F6',          // Blue-500
  areaGradientStart: 0.3,   // Opacity at start
  areaGradientEnd: 0.05,    // Opacity at end
  tick: '#9CA3AF',          // Gray-400
};

// Slope visualization colors (matches mapConfig)
export const SLOPE = {
  flat: '#93C5FD',     // Blue-300 - < 3%
  moderate: '#2563EB', // Blue-600 - 3-8%
  steep: '#1E3A8A',    // Blue-900 - > 8%
};

// Route colors
export const ROUTE = {
  default: '#3B82F6',  // Blue-500
  start: '#22C55E',    // Green-500
  end: '#EF4444',      // Red-500
};

// Interactive states (Tailwind classes mapping)
export const UI_CLASSES = {
  // Primary button
  buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
  buttonSecondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700',
  
  // Links
  link: 'text-blue-600 hover:text-blue-800',
  
  // Badges
  badge: 'bg-blue-50 text-blue-600 border-blue-100',
  
  // Cards
  cardHighlight: 'bg-blue-50 border-blue-100',
};
