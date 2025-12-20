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
 * Preload all images with progress tracking
 * @param {Object} options
 * @param {function(number, number)} options.onProgress - Progress callback (loaded, total)
 * @param {function(string)} options.onError - Error callback for failed images
 * @returns {Promise<{success: number, failed: number}>}
 */
export async function preloadAllImages({ onProgress, onError } = {}) {
  const urls = getAllImageUrls();
  const total = urls.length;
  let loaded = 0;
  let failed = 0;
  
  if (total === 0) {
    return { success: 0, failed: 0 };
  }
  
  // Log start
  console.log(`[Preload] Starting to preload ${total} images...`);
  
  // Use Promise.allSettled to handle all images regardless of individual failures
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      try {
        await preloadImage(url);
        loaded++;
        onProgress?.(loaded + failed, total);
        return { status: 'success', url };
      } catch (error) {
        failed++;
        onError?.(url);
        onProgress?.(loaded + failed, total);
        return { status: 'failed', url };
      }
    })
  );
  
  // Log completion
  console.log(`[Preload] Complete: ${loaded} loaded, ${failed} failed`);
  
  return { success: loaded, failed };
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
