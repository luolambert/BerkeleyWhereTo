import { describe, it, expect, vi } from 'vitest'
import {
  calculateTravelTime,
  getSlopeColor, 
  processElevationData, 
  createColoredSegments,
  calculateMarkerPlacements 
} from '../../services/mapService'
import { SLOPE_COLORS } from '../../constants/mapConfig'

describe('mapService', () => {
  describe('calculateTravelTime', () => {
    it('returns at least one minute for a positive route duration', async () => {
      window.google.maps.DistanceMatrixService = vi.fn(function DistanceMatrixService() {
        this.getDistanceMatrix = vi.fn().mockResolvedValue({
          rows: [{
            elements: [{
              status: 'OK',
              duration: { value: 10 },
            }]
          }]
        })
      })

      await expect(
        calculateTravelTime({ lat: 1, lng: 1 }, { lat: 1, lng: 2 })
      ).resolves.toEqual({ walking: 1, scooter: 1 })
    })
  })

  describe('getSlopeColor', () => {
    it('returns flat color for slopes under 3%', () => {
      // Assuming defined thresholds: <3 FLAT, 3-8 MODERATE, >8 STEEP
      expect(getSlopeColor(2)).toBe(SLOPE_COLORS.FLAT)
      expect(getSlopeColor(-2.5)).toBe(SLOPE_COLORS.FLAT)
      expect(getSlopeColor(0)).toBe(SLOPE_COLORS.FLAT)
    })
    
    it('returns moderate color for slopes 3-8%', () => {
      expect(getSlopeColor(3.1)).toBe(SLOPE_COLORS.MODERATE)
      expect(getSlopeColor(5)).toBe(SLOPE_COLORS.MODERATE)
      expect(getSlopeColor(8)).toBe(SLOPE_COLORS.MODERATE)
      expect(getSlopeColor(-7)).toBe(SLOPE_COLORS.MODERATE)
    })
    
    it('returns steep color for slopes above 8%', () => {
      expect(getSlopeColor(8.1)).toBe(SLOPE_COLORS.STEEP)
      expect(getSlopeColor(15)).toBe(SLOPE_COLORS.STEEP)
      expect(getSlopeColor(-20)).toBe(SLOPE_COLORS.STEEP)
    })
  })

  describe('processElevationData', () => {
    it('calculates cumulative distance correctly', () => {
      // Mock window.google.maps.geometry.spherical.computeDistanceBetween
      // Our mock setup returns 100m by default
      
      const mockInput = [
        { location: { lat: 1, lng: 1 }, elevation: 10 },
        { location: { lat: 1, lng: 2 }, elevation: 20 },
        { location: { lat: 1, lng: 3 }, elevation: 30 },
      ]

      const result = processElevationData(mockInput)
      
      expect(result).toHaveLength(3)
      expect(result[0].distance).toBe(0)
      expect(result[1].distance).toBe(100)
      expect(result[2].distance).toBe(200)
      expect(result[1].elevation).toBe(20)
    })
  })

  describe('createColoredSegments', () => {
    it('creates segments based on slope', () => {
      // This test relies on processElevationData logic
      // Setup data that creates specific slopes
      
      // With distance=100m (from mock)
      // Rise of 1m = 1% slope (Flat)
      // Rise of 6m = 6% slope (Moderate)
      // Rise of 10m = 10% slope (Steep)
      
      const mockProcessedData = [
        { distance: 0, elevation: 0, location: 'A' },
        { distance: 100, elevation: 1, location: 'B' },   // Slope 1% -> FLAT
        { distance: 200, elevation: 7, location: 'C' },   // Slope (7-1)/100 = 6% -> MODERATE
        { distance: 300, elevation: 17, location: 'D' },  // Slope (17-7)/100 = 10% -> STEEP
      ]
      
      const segments = createColoredSegments(mockProcessedData)
      
      // Should result in 3 segments with different colors
      expect(segments).toHaveLength(3)
      
      expect(segments[0].color).toBe(SLOPE_COLORS.FLAT)
      expect(segments[0].path).toEqual(['A', 'B'])
      
      expect(segments[1].color).toBe(SLOPE_COLORS.MODERATE)
      expect(segments[1].path).toEqual(['B', 'C'])
      
      expect(segments[2].color).toBe(SLOPE_COLORS.STEEP)
      expect(segments[2].path).toEqual(['C', 'D'])
    })

    it('merges continuous segments of same color', () => {
      const mockProcessedData = [
        { distance: 0, elevation: 0, location: 'A' },
        { distance: 100, elevation: 1, location: 'B' }, // 1%
        { distance: 200, elevation: 2, location: 'C' }, // 1%
      ]

      const segments = createColoredSegments(mockProcessedData)
      
      expect(segments).toHaveLength(1)
      expect(segments[0].path).toEqual(['A', 'B', 'C'])
      expect(segments[0].color).toBe(SLOPE_COLORS.FLAT)
    })
  })

  describe('calculateMarkerPlacements', () => {
    it('returns default top/top for empty path', () => {
      expect(calculateMarkerPlacements([])).toEqual({ start: 'top', end: 'top' })
    })

    it('calculates start position based on next point', () => {
      // Helper to create mock LatLng with lat() method
      const mkLat = (lat) => ({ lat: () => lat })

      // Next point is North (higher lat) -> Start should be bottom to avoid overlap
      const pathNorth = [mkLat(10), mkLat(11)]
      expect(calculateMarkerPlacements(pathNorth).start).toBe('bottom')

      // Next point is South (lower lat) -> Start should be top
      const pathSouth = [mkLat(10), mkLat(9)]
      expect(calculateMarkerPlacements(pathSouth).start).toBe('top')
    })

    it('calculates end position based on prev point', () => {
      const mkLat = (lat) => ({ lat: () => lat })

      // End point is North of prev (higher lat) -> End should be top
      const pathUp = [mkLat(10), mkLat(11)] 
      expect(calculateMarkerPlacements(pathUp).end).toBe('top')

      // End point is South of prev (lower lat) -> End should be bottom
      const pathDown = [mkLat(11), mkLat(10)]
      expect(calculateMarkerPlacements(pathDown).end).toBe('bottom')
    })
  })
})
