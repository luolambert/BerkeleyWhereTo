import { useState, useEffect, useCallback } from 'react';

/**
 * 图片轮播 Hook
 * 管理图片轮播的状态和逻辑
 * 
 * @param {string[]} images - 图片 URL 数组
 * @param {number} intervalMs - 自动轮播间隔（毫秒），默认 5000ms
 * @returns {object} - 当前索引、导航方法
 */
function useImageCarousel(images, intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 自动轮播
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [images, intervalMs]);

  // 下一张
  const next = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  // 上一张
  const prev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  // 跳转到指定图片
  const goTo = useCallback((index) => {
    if (!images || index < 0 || index >= images.length) return;
    setCurrentIndex(index);
  }, [images]);

  // 重置到第一张
  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    reset,
    hasMultiple: images && images.length > 1,
    total: images ? images.length : 0,
  };
}

export default useImageCarousel;
