import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { PreloadProvider, usePreload } from '../../context/PreloadContext'
import { preloadAllImages, preloadPublicAssets } from '../../services/preloadService'

// Mock preload services
vi.mock('../../services/preloadService', () => ({
  preloadAllImages: vi.fn(),
  preloadPublicAssets: vi.fn(),
}))

const wrapper = ({ children }) => (
  <PreloadProvider>
    {children}
  </PreloadProvider>
)

describe('PreloadContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts preloading on mount', async () => {
    // Setup mock resolution
    vi.mocked(preloadPublicAssets).mockResolvedValue()
    vi.mocked(preloadAllImages).mockImplementation(({ onProgress }) => {
      onProgress(50, 100)
      return Promise.resolve({ failedUrls: [] })
    })

    const { result } = renderHook(() => usePreload(), { wrapper })
    
    // Initial state
    expect(result.current.isPreloading).toBe(true)
    expect(result.current.progress).toBe(0)

    // Wait for effect
    await waitFor(() => {
      expect(preloadPublicAssets).toHaveBeenCalled()
      expect(preloadAllImages).toHaveBeenCalled()
    })
    
    // Check progress update
    expect(result.current.progress).toBe(50)
    expect(result.current.isComplete).toBe(true)
    expect(result.current.isPreloading).toBe(false)
  })

  it('handles failed images', async () => {
    vi.mocked(preloadPublicAssets).mockResolvedValue()
    vi.mocked(preloadAllImages).mockResolvedValue({ 
      failedUrls: ['/img/bad.jpg'] 
    })

    const { result } = renderHook(() => usePreload(), { wrapper })

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true)
    })

    expect(result.current.failedImages).toEqual(['/img/bad.jpg'])
  })
})
