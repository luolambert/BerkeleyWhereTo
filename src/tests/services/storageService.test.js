import { describe, it, expect, vi, afterEach } from 'vitest'
import { listBuildingImages } from '../../services/storageService'

describe('storageService', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns an empty image list for buildings missing from the image manifest', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(listBuildingImages('missing_building')).resolves.toEqual([])
  })
})
