/**
 * Preload Service
 * Handles preloading of images and other resources for better UX
 */

import { buildingImages } from '../data/buildingImage';

const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/building-images`
  : null;

/**
 * Get full Supabase Storage URL for a building image
 * @param {string} buildingId - Building identifier
 * @param {string} filename - Image filename (e.g., '1.jpg')
 * @returns {string} Full Supabase Storage URL
 */
export function getSupabaseImageUrl(buildingId, filename) {
  if (!SUPABASE_STORAGE_URL) {
    console.warn('[Preload] Supabase URL not configured');
    return null;
  }
  return `${SUPABASE_STORAGE_URL}/${buildingId}/${filename}`;
}

/**
 * Collect all unique image URLs from buildingImage.js (single source of truth)
 * @returns {string[]} Array of unique Supabase image URLs
 */
export function getAllImageUrls() {
  const urls = new Set();
  
  if (!SUPABASE_STORAGE_URL) {
    console.warn('[Preload] Supabase URL not configured, skipping image preload');
    return [];
  }
  
  Object.entries(buildingImages).forEach(([buildingId, filenames]) => {
    if (Array.isArray(filenames)) {
      filenames.forEach(filename => {
        if (filename && typeof filename === 'string') {
          urls.add(getSupabaseImageUrl(buildingId, filename));
        }
      });
    }
  });
  
  return Array.from(urls).filter(Boolean);
}

/**
 * Preload a single image
 * @param {string} url - Image URL to preload
 * @returns {Promise<void>}
 */
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load: ${url}`));
    img.src = url;
  });
}

/**
 * Preload a single image with retry mechanism
 * @param {string} url - Image URL to preload
 * @param {number} maxRetries - Maximum retry attempts (default: 3)
 * @param {number} retryDelay - Delay between retries in ms (default: 1000)
 * @returns {Promise<{success: boolean, url: string, attempts: number}>}
 */
export async function preloadImageWithRetry(url, maxRetries = 3, retryDelay = 1000) {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    attempts++;
    try {
      // Add cache-busting timestamp on retry
      const loadUrl = attempts > 1 ? `${url}${url.includes('?') ? '&' : '?'}retry=${Date.now()}` : url;
      await preloadImage(loadUrl);
      return { success: true, url, attempts };
    } catch (error) {
      if (attempts < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  console.error(`[Preload] ✗ Failed after ${maxRetries} attempts: ${url}`);
  return { success: false, url, attempts };
}

/**
 * Preload all images with progress tracking and retry mechanism
 * @param {Object} options
 * @param {function(number, number)} options.onProgress - Progress callback (loaded, total)
 * @param {function(string)} options.onError - Error callback for failed images
 * @returns {Promise<{success: number, failed: number, failedUrls: string[]}>}
 */
export async function preloadAllImages({ onProgress, onError } = {}) {
  const urls = getAllImageUrls();
  const total = urls.length;
  let loaded = 0;
  let failed = 0;
  const failedUrls = [];
  
  if (total === 0) {
    return { success: 0, failed: 0, failedUrls: [] };
  }
  
  // Use Promise.allSettled to handle all images regardless of individual failures
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const result = await preloadImageWithRetry(url);
      if (result.success) {
        loaded++;
      } else {
        failed++;
        failedUrls.push(url);
        onError?.(url);
      }
      onProgress?.(loaded + failed, total);
      return result;
    })
  );
  if (failedUrls.length > 0) {
    console.warn('[Preload] Failed images:', failedUrls);
  }
  
  return { success: loaded, failed, failedUrls };
}

/**
 * Preload public assets (logos, etc.)
 * @returns {Promise<void>}
 */
export async function preloadPublicAssets() {
  const publicAssets = [
    '/WhereToGo_Logo.png',
    '/WhereToKnow_Logo.png'
  ];
  
  await Promise.allSettled(publicAssets.map(preloadImage));
}
