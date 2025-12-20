import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { preloadAllImages, preloadPublicAssets } from '../services/preloadService';

const PreloadContext = createContext(null);

/**
 * PreloadProvider - Global preload state management
 * Starts preloading on mount and tracks progress
 */
export function PreloadProvider({ children }) {
  const [isPreloading, setIsPreloading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Prevent double execution in Strict Mode
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startPreload = async () => {
      // Preload public assets first (fast)
      await preloadPublicAssets();
      
      // Then preload building images (slower)
      await preloadAllImages({
        onProgress: (loaded, total) => {
          setProgress(Math.round((loaded / total) * 100));
        },
        onError: (url) => {
          // Silently log failures, don't block UX
          console.warn(`[Preload] Failed: ${url}`);
        }
      });
      
      setIsPreloading(false);
      setIsComplete(true);
    };

    startPreload();
  }, []);

  const value = {
    isPreloading,
    progress,
    isComplete
  };

  return (
    <PreloadContext.Provider value={value}>
      {children}
    </PreloadContext.Provider>
  );
}

/**
 * usePreload Hook - Access preload state
 * @returns {{ isPreloading: boolean, progress: number, isComplete: boolean }}
 */
export function usePreload() {
  const context = useContext(PreloadContext);
  if (!context) {
    // Return default values if used outside provider
    return { isPreloading: false, progress: 100, isComplete: true };
  }
  return context;
}

export default PreloadContext;
