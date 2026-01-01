import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useBuildingFilter from '../../hooks/useBuildingFilter'

const mockBuildings = [
  { name: 'Library', category: 'Academic', popular: true },
  { name: 'Gym', category: 'Sports', popular: false },
  { name: 'Lab', category: 'Research', popular: false },
]

const mockCategories = [
  { id: 'Academic', match: ['Academic'] },
  { id: 'Sports', match: ['Sports'] },
]

describe('useBuildingFilter', () => {
  it('filters by category', () => {
    // Initial: All
    const { result, rerender } = renderHook(
      ({ term, cat }) => useBuildingFilter(mockBuildings, term, cat, mockCategories),
      { initialProps: { term: '', cat: 'all' } }
    )
    expect(result.current).toHaveLength(3)

    // Filter Academic
    rerender({ term: '', cat: 'Academic' })
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('Library')

    // Filter Popular
    rerender({ term: '', cat: 'popular' })
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('Library')
  })

  it('filters by search term', () => {
    const { result, rerender } = renderHook(
      ({ term, cat }) => useBuildingFilter(mockBuildings, term, cat, mockCategories),
      { initialProps: { term: '', cat: 'all' } }
    )
    
    rerender({ term: 'Gym', cat: 'all' })
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('Gym')
    
    // Case insensitive
    rerender({ term: 'gym', cat: 'all' })
    expect(result.current).toHaveLength(1)
  })

  it('combines category and search', () => {
    const { result, rerender } = renderHook(
      ({ term, cat }) => useBuildingFilter(mockBuildings, term, cat, mockCategories),
      { initialProps: { term: 'Lib', cat: 'Academic' } }
    )
    
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('Library')
    
    // Gym is not in Academic
    rerender({ term: 'Gym', cat: 'Academic' })
    expect(result.current).toHaveLength(0)
  })
})
