/**
 * Complete Google Maps API Mock for Testing
 * This allows us to test logic dependent on Google Maps without loading the actual API.
 */
import { vi } from 'vitest'

const createGoogleMapsMock = () => {
  // Mock LatLngBounds needs to be functional for some logic
  class LatLngBounds {
    constructor() {
      this.extend = vi.fn();
      this.getCenter = vi.fn(() => ({ lat: () => 0, lng: () => 0 }));
    }
  }

  return {
    maps: {
      Map: vi.fn(() => ({
        setCenter: vi.fn(),
        setZoom: vi.fn(),
        setOptions: vi.fn(),
        panTo: vi.fn(),
        fitBounds: vi.fn(),
      })),
      Marker: vi.fn(() => ({
        setMap: vi.fn(),
        setPosition: vi.fn(),
      })),
      Polyline: vi.fn(() => ({
        setMap: vi.fn(),
        setPath: vi.fn(),
      })),
      LatLng: vi.fn((lat, lng) => ({
        lat: () => lat,
        lng: () => lng,
      })),
      LatLngBounds: LatLngBounds,
      DirectionsService: vi.fn(() => ({
        route: vi.fn((request, callback) => {
          callback({ 
            routes: [{
              overview_path: [
                { lat: () => 0, lng: () => 0 },
                { lat: () => 1, lng: () => 1 }
              ]
            }] 
          }, 'OK');
        }),
      })),
      DirectionsRenderer: vi.fn(() => ({
        setMap: vi.fn(),
        setDirections: vi.fn(),
        setOptions: vi.fn(),
      })),
      ElevationService: vi.fn(() => ({
        getElevationAlongPath: vi.fn((request, callback) => {
          callback([], 'OK');
        }),
      })),
      DistanceMatrixService: vi.fn(() => ({
        getDistanceMatrix: vi.fn(),
      })),
      TravelMode: {
        WALKING: 'WALKING',
        DRIVING: 'DRIVING',
        BICYCLING: 'BICYCLING',
        TRANSIT: 'TRANSIT',
      },
      DirectionsStatus: {
        OK: 'OK',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
      geometry: {
        spherical: {
          computeDistanceBetween: vi.fn(() => 100), // Default 100m
        },
      },
    },
  };
};

export default createGoogleMapsMock;
