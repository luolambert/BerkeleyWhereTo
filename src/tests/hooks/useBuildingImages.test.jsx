import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useBuildingImages, clearImageCache } from '../../hooks/useBuildingImages'
import { listBuildingImages } from '../../services/storageService'

vi.mock('../../services/storageService', () => ({
  listBuildingImages: vi.fn(),
}))

describe('useBuildingImages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    clearImageCache()
  })

  it('clears the previous building images when the next building has none', async () => {
    vi.mocked(listBuildingImages)
      .mockResolvedValueOnce(['/images/buildings/doe/1.jpg'])
      .mockResolvedValueOnce([])

    const { result, rerender } = renderHook(
      ({ buildingId }) => useBuildingImages(buildingId),
      { initialProps: { buildingId: 'doe' } }
    )

    await waitFor(() => {
      expect(result.current.images).toEqual(['/images/buildings/doe/1.jpg'])
    })

    rerender({ buildingId: 'missing_building' })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.images).toEqual([])
      expect(result.current.hasImages).toBe(false)
    })
  })
})
