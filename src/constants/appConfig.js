/**
 * General application configuration constants
 */

// Supported languages
export const SUPPORTED_LANGUAGES = {
  CN: 'CN',
  EN: 'EN',
};

// Default language
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.EN;

// Carousel configuration
export const CAROUSEL = {
  INTERVAL_MS: 5000,  // Auto-rotation interval (ms)
};

// Animation configuration
export const ANIMATION = {
  SCROLL_RANGE: 150,  // Scroll animation range (pixels)
  SPRING: {
    stiffness: 500,
    damping: 35,
    mass: 0.8,
  },
  APPLE_EASE: [0.32, 0.72, 0, 1],  // Apple style easing curve
};

// Sorting options
export const SORT_OPTIONS = [
  { id: 'students', labelKey: 'forStudents' },
  { id: 'categorical', labelKey: 'categorical' },
  { id: 'popularity', labelKey: 'popularity' },
];

// Sort order (used for calculating slide direction)
export const SORT_ORDER = ['students', 'categorical', 'popularity'];

// Estimated scooter speed factor (relative to walking)
export const SCOOTER_SPEED_FACTOR = 4;

// Google Maps libraries
export const GOOGLE_MAPS_LIBRARIES = ['places', 'geometry'];

// External links
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/luolambert/BerkeleyWhereToGo',
  BERKELEY_SEAL: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg',
};
