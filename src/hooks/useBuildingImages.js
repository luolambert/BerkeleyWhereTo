import { useState, useEffect } from "react";
import { listBuildingImages } from "../services/storageService";

const imageCache = new Map();

export function useBuildingImages(buildingId) {
  const [images, setImages] = useState(() => {
    if (imageCache.has(buildingId)) {
      return imageCache.get(buildingId);
    }
    return [];
  });
  const [loading, setLoading] = useState(!imageCache.has(buildingId));

  useEffect(() => {
    if (imageCache.has(buildingId)) {
      setImages(imageCache.get(buildingId));
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchImages = async () => {
      const urls = await listBuildingImages(buildingId);
      if (mounted) {
        if (urls.length > 0) {
          imageCache.set(buildingId, urls);
          setImages(urls);
        }
        setLoading(false);
      }
    };

    fetchImages();

    return () => {
      mounted = false;
    };
  }, [buildingId]);

  return { images, loading, hasImages: images.length > 0 };
}

export function clearImageCache(buildingId) {
  if (buildingId) {
    imageCache.delete(buildingId);
  } else {
    imageCache.clear();
  }
}

