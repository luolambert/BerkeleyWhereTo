/**
 * Preload Service
 * Handles preloading of images and other resources for better UX
 */

import buildingImages from '../data/buildingImages.json';
import { getImageUrl } from './storageService';

/**
 * Get all unique image URLs from local storage
 * @returns {Promise<string[]>} Array of image URLs
 */
export async function getAllImageUrls() {
  const urls = Object.entries(buildingImages).flatMap(([buildingId, filenames]) => (
    filenames.map((filename) => getImageUrl(buildingId, filename))
  ));
  return [...new Set(urls)];
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
      const loadUrl = attempts > 1 ? `${url}${url.includes('?') ? '&' : '?'}retry=${Date.now()}` : url;
      await preloadImage(loadUrl);
      return { success: true, url, attempts };
    } catch {
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
export async function preloadAllImages({ onProgress, onError, concurrency = 6 } = {}) {
  const urls = await getAllImageUrls();
  const total = urls.length;
  let loaded = 0;
  let failed = 0;
  const failedUrls = [];
  
  if (total === 0) {
    return { success: 0, failed: 0, failedUrls: [] };
  }
  
  const maxWorkers = Math.max(1, Math.min(concurrency, total));
  let index = 0;

  const worker = async () => {
    while (index < total) {
      const currentIndex = index++;
      const url = urls[currentIndex];
      const result = await preloadImageWithRetry(url);
      if (result.success) {
        loaded++;
      } else {
        failed++;
        failedUrls.push(url);
        onError?.(url);
      }
      onProgress?.(loaded + failed, total);
    }
  };

  await Promise.all(Array.from({ length: maxWorkers }, () => worker()));
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
