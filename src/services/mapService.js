/**
 * Map Service Layer
 * Encapsulates Google Maps API calls for consistent interface
 */

import { 
  SLOPE_THRESHOLDS, 
  SLOPE_COLORS, 
  ELEVATION_SAMPLES 
} from '../constants/mapConfig';
import { SCOOTER_SPEED_FACTOR } from '../constants/appConfig';

/**
 * Calculates travel time between two points
 * @param {object} origin - Starting point { lat, lng }
 * @param {object} destination - Ending point { lat, lng }
 * @returns {Promise<{ walking: number, scooter: number }>} Time in minutes
 */
export async function calculateTravelTime(origin, destination) {
  const service = new window.google.maps.DistanceMatrixService();
  
  const result = await service.getDistanceMatrix({
    origins: [{ lat: origin.lat, lng: origin.lng }],
    destinations: [{ lat: destination.lat, lng: destination.lng }],
    travelMode: window.google.maps.TravelMode.WALKING,
  });

  if (result.rows[0].elements[0].status !== "OK") {
    throw new Error(`Distance calculation failed: ${result.rows[0].elements[0].status}`);
  }

  const walkingDuration = result.rows[0].elements[0].duration.value; // in seconds
  const walkingMin = walkingDuration > 0
    ? Math.max(1, Math.ceil(walkingDuration / 60))
    : 0;
  const scooterMin = walkingDuration > 0
    ? Math.max(1, Math.ceil(walkingMin / SCOOTER_SPEED_FACTOR))
    : 0;

  return {
    walking: walkingMin,
    scooter: scooterMin,
  };
}

/**
 * Retrieves route directions
 * @param {object} origin - Starting point { lat, lng }
 * @param {object} destination - Ending point { lat, lng }
 * @returns {Promise<google.maps.DirectionsResult>}
 */
export async function getDirections(origin, destination) {
  const directionsService = new window.google.maps.DirectionsService();
  
  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          resolve(result);
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      }
    );
  });
}

/**
 * Fetches elevation data along a path
 * @param {google.maps.LatLng[]} path - Array of path coordinates
 * @param {number} samples - Number of sample points
 * @returns {Promise<Array>} Array of elevation data
 */
export async function getElevationAlongPath(path, samples = ELEVATION_SAMPLES) {
  const elevationService = new window.google.maps.ElevationService();
  
  return new Promise((resolve, reject) => {
    elevationService.getElevationAlongPath(
      { path, samples },
      (results, status) => {
        if (status === 'OK') {
          resolve(results);
        } else {
          reject(new Error(`Elevation request failed: ${status}`));
        }
      }
    );
  });
}

/**
 * Processes elevation data and calculates cumulative distance
 * @param {Array} elevationResults - Elevation results from Google Maps
 * @returns {Array} Processed elevation data
 */
export function processElevationData(elevationResults) {
  let cumulativeDistance = 0;
  
  return elevationResults.map((point, index) => {
    if (index > 0) {
      const prev = elevationResults[index - 1].location;
      const curr = point.location;
      const dist = window.google.maps.geometry.spherical.computeDistanceBetween(prev, curr);
      cumulativeDistance += dist;
    }
    return {
      distance: cumulativeDistance,
      elevation: point.elevation,
      location: point.location
    };
  });
}

/**
 * Determines color based on slope percentage
 * @param {number} slope - Slope percentage
 * @returns {string} Color hex value
 */
export function getSlopeColor(slope) {
  const absSlope = Math.abs(slope);
  
  if (absSlope > SLOPE_THRESHOLDS.MODERATE) {
    return SLOPE_COLORS.STEEP;
  } else if (absSlope > SLOPE_THRESHOLDS.FLAT) {
    return SLOPE_COLORS.MODERATE;
  }
  return SLOPE_COLORS.FLAT;
}

/**
 * Creates colored segments based on slope
 * @param {Array} processedData - Processed elevation data
 * @returns {Array} Array of segments { path, color }
 */
export function createColoredSegments(processedData) {
  const segments = [];
  let currentPath = [];
  let currentColor = null;

  for (let i = 0; i < processedData.length - 1; i++) {
    const p1 = processedData[i];
    const p2 = processedData[i + 1];
    const dist = p2.distance - p1.distance;
    const rise = p2.elevation - p1.elevation;
    
    const slope = dist > 0 ? (rise / dist) * 100 : 0;
    const color = getSlopeColor(slope);

    if (currentColor === null) {
      currentColor = color;
      currentPath.push(p1.location);
      currentPath.push(p2.location);
    } else if (color === currentColor) {
      currentPath.push(p2.location);
    } else {
      segments.push({ path: currentPath, color: currentColor });
      currentPath = [p1.location, p2.location];
      currentColor = color;
    }
  }
  
  if (currentPath.length > 1) {
    segments.push({ path: currentPath, color: currentColor });
  }
  
  return segments;
}

/**
 * Determines marker placement to avoid path obstruction
 * @param {google.maps.LatLng[]} path - Path coordinates
 * @returns {{ start: string, end: string }} Placement positions ('top' | 'bottom')
 */
export function calculateMarkerPlacements(path) {
  let startPlace = 'top';
  let endPlace = 'top';

  if (path && path.length > 1) {
    const startNode = path[0];
    const nextNode = path[1];
    if (nextNode.lat() > startNode.lat()) startPlace = 'bottom';

    const endNode = path[path.length - 1];
    const prevNode = path[path.length - 2];
    if (endNode.lat() > prevNode.lat()) {
      endPlace = 'top';
    } else {
      endPlace = 'bottom';
    }
  }

  return { start: startPlace, end: endPlace };
}

export default {
  calculateTravelTime,
  getDirections,
  getElevationAlongPath,
  processElevationData,
  getSlopeColor,
  createColoredSegments,
  calculateMarkerPlacements,
};
