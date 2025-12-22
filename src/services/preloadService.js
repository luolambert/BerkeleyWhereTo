/**
 * Preload Service
 * Handles preloading of images and other resources for better UX
 */

import { buildingImages } from '../data/buildingImage';
import { knowLocations as knowLocationsCN } from '../data/buildingInfo_chinese';
import { knowLocations as knowLocationsEN } from '../data/buildingInfo_english';

/**
 * Collect all unique image URLs from building data
 * @returns {string[]} Array of unique image URLs
 */
export function getAllImageUrls() {
  const urls = new Set();
  
  // Collect from centralized buildingImages
  Object.values(buildingImages).forEach(images => {
    if (Array.isArray(images)) {
      images.forEach(url => {
        if (url && typeof url === 'string') {
          urls.add(url);
        }
      });
    }
  });
  
  // Collect from building info (CN + EN)
  [...knowLocationsCN, ...knowLocationsEN].forEach(building => {
    if (building.images && Array.isArray(building.images)) {
      building.images.forEach(url => {
        if (url && typeof url === 'string') {
          urls.add(url);
        }
      });
    }
  });
  
  return Array.from(urls);
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
      if (attempts > 1) {
        console.log(`[Preload] ✓ Loaded after ${attempts} attempts: ${url}`);
      }
      return { success: true, url, attempts };
    } catch (error) {
      if (attempts < maxRetries) {
        console.log(`[Preload] Retry ${attempts}/${maxRetries} for: ${url}`);
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
  
  // Log start
  console.log(`[Preload] Starting to preload ${total} images...`);
  
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
  
  // Log completion
  console.log(`[Preload] Complete: ${loaded} loaded, ${failed} failed`);
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
