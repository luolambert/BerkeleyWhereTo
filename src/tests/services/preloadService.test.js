import { describe, it, expect, vi, afterEach } from 'vitest'
import { getAllImageUrls } from '../../services/preloadService'

describe('preloadService', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('only preloads images explicitly listed in the image manifest', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    const urls = await getAllImageUrls()

    expect(urls.length).toBeGreaterThan(0)
    expect(urls).toContain('/images/buildings/doe/1.jpg')
    expect(urls).not.toContain('/images/buildings/foothill/1.jpg')
  })
})
