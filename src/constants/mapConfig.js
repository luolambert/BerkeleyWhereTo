/**
 * Map related configuration constants
 */

// UC Berkeley campus center coordinates
export const BERKELEY_CENTER = {
  lat: 37.8715,
  lng: -122.2620
};

// Default map zoom level
export const DEFAULT_ZOOM = 16;

// Elevation sample points count
export const ELEVATION_SAMPLES = 256;

// Slope thresholds (percentage)
export const SLOPE_THRESHOLDS = {
  FLAT: 3,      // < 3% Flat
  MODERATE: 8,  // 3-8% Moderate
  // > 8% Steep
};

// Slope color mapping
export const SLOPE_COLORS = {
  FLAT: '#93C5FD',      // Blue-300 (Flat)
  MODERATE: '#2563EB',  // Blue-600 (Moderate)
  STEEP: '#1E3A8A',     // Blue-900 (Steep)
};

// Route line style
export const ROUTE_STYLE = {
  strokeColor: '#3B82F6',
  strokeWeight: 8,
  strokeOpacity: 0.8,
};

// Map style configuration
export const MAP_STYLES = [
  {
    featureType: "poi.school",
    elementType: "geometry",
    stylers: [{ color: "#fdb515" }] // Berkeley Gold
  }
];

// Map options
export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: MAP_STYLES,
};

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: 640,   // Small screens
  LG: 1024,  // Large screens
};

// Map padding configuration
export const MAP_PADDING = {
  desktop: { top: 50, right: 50, bottom: 50, left: 600 },
  tablet: { top: 50, right: 50, bottom: 50, left: 430 },
  mobile: { top: 200, right: 50, bottom: 50, left: 50 },
};
