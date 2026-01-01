import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { NavigationProvider, useNavigation } from '../../context/NavigationContext'
import { calculateTravelTime } from '../../services/mapService'

// Mock mapService completely
vi.mock('../../services/mapService', () => ({
  calculateTravelTime: vi.fn(),
}))

// Wrapper for testing hook
const wrapper = ({ children }) => (
  // Mock isLoaded=true by default
  <NavigationProvider isLoaded={true}>
    {children}
  </NavigationProvider>
)

describe('NavigationContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('provides default state', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper })
    
    expect(result.current.startLocation).toBe('')
    expect(result.current.endLocation).toBe('')
    expect(result.current.language).toBe('EN') // Default matches appConfig
  })

  it('toggles language', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper })
    
    act(() => {
      result.current.toggleLanguage()
    })
    expect(result.current.language).toBe('CN')

    act(() => {
      result.current.toggleLanguage()
    })
    expect(result.current.language).toBe('EN')
  })

  it('selects building based on active field', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper })

    // Set active field to START
    act(() => {
      result.current.toggleField('start')
    })
    
    // Select building
    act(() => {
      result.current.selectBuilding('Sather Gate')
    })
    
    expect(result.current.startLocation).toBe('Sather Gate')
    expect(result.current.activeField).toBe(null) // Should close panel
    
    // Set active field to END
    act(() => {
      result.current.toggleField('end')
    })
    
    act(() => {
      result.current.selectBuilding('Moffitt Library')
    })
    
    expect(result.current.endLocation).toBe('Moffitt Library')
  })

  it('calculates route correctly when buildings are valid', async () => {
    const { result } = renderHook(() => useNavigation(), { wrapper })
    
    // Setup inputs
    act(() => {
      result.current.setStartLocation('Sather Gate')
      result.current.setEndLocation('Moffitt Library')
    })
    
    // Mock API response
    vi.mocked(calculateTravelTime).mockResolvedValue({
      walking: 10,
      scooter: 3
    })
    
    // Trigger calculation
    await act(async () => {
      await result.current.calculateRoute()
    })
    
    expect(calculateTravelTime).toHaveBeenCalled()
    expect(result.current.travelTimes).toEqual({ walking: 10, scooter: 3 })
    expect(result.current.routePoints).not.toBeNull()
    expect(result.current.routePoints.start.name).toBe('Sather Gate')
  })

  it('handles route calculation error gracefully', async () => {
    const { result } = renderHook(() => useNavigation(), { wrapper })
    
    act(() => {
      result.current.setStartLocation('Sather Gate')
      result.current.setEndLocation('Moffitt Library')
    })

    // Mock API failure
    vi.mocked(calculateTravelTime).mockRejectedValue(new Error('API Error'))
    
    await act(async () => {
      await result.current.calculateRoute()
    })
    
    expect(result.current.isCalculating).toBe(false)
    // Travel times should remain null (or whatever previous state)
    expect(result.current.travelTimes).toBeNull()
  })

  it('resets navigation state', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper })
    
    // Set some dirty state
    act(() => {
      result.current.setStartLocation('Foo')
      result.current.toggleField('start')
    })
    
    act(() => {
      result.current.resetNavigation()
    })
    
    expect(result.current.startLocation).toBe('')
    expect(result.current.activeField).toBe(null)
  })
})
