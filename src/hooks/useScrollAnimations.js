import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * 滚动动画 Hook
 * 基于滚动位置生成各种动画值
 * 
 * @param {object} options - 配置选项
 * @param {number} options.scrollRange - 滚动范围（像素），默认 150
 * @returns {object} - 滚动相关的动画值
 */
function useScrollAnimations({ scrollRange = 150 } = {}) {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  // 基础进度值 (0-1)
  const scrollProgress = useTransform(scrollY, [0, scrollRange], [0, 1]);
  
  // Header 容器动画
  const headerHeight = useTransform(scrollProgress, [0, 1], [160, 60]);
  const headerPaddingTop = useTransform(scrollProgress, [0, 1], [24, 12]);
  const headerPaddingBottom = useTransform(scrollProgress, [0, 1], [16, 12]);
  
  // 背景效果
  const bgOpacity = useTransform(scrollProgress, [0, 1], [0, 0.9]);

  // 标题淡出（更快）
  const titleOpacity = useTransform(scrollProgress, [0, 0.4], [1, 0]);

  // Logo 变换
  const logoScale = useTransform(scrollProgress, [0, 1], [1, 0.8]);
  const logoTop = useTransform(scrollProgress, [0, 1], ["-4px", "50%"]);
  const logoLeft = useTransform(scrollProgress, [0, 1], ["50%", "0%"]);
  const logoX = useTransform(scrollProgress, [0, 1], ["-50%", "0%"]);
  const logoY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  // 副标题变换
  const subtitleFontSize = useTransform(scrollProgress, [0, 1], [18, 14]);
  const subtitleOpacity = useTransform(scrollProgress, [0, 1], [1, 0.85]);
  const subtitleTop = useTransform(scrollProgress, [0, 1], ["56px", "50%"]);
  const subtitleY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  // 控制栏变换
  const controlsTop = useTransform(scrollProgress, [0, 1], ["85px", "50%"]);
  const controlsLeft = useTransform(scrollProgress, [0, 1], ["50%", "100%"]);
  const controlsX = useTransform(scrollProgress, [0, 1], ["-50%", "-100%"]);
  const controlsY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  return {
    scrollRef,
    scrollProgress,
    
    // Header 相关
    header: {
      height: headerHeight,
      paddingTop: headerPaddingTop,
      paddingBottom: headerPaddingBottom,
      bgOpacity,
    },
    
    // Logo 相关
    logo: {
      scale: logoScale,
      top: logoTop,
      left: logoLeft,
      x: logoX,
      y: logoY,
    },
    
    // 标题相关
    title: {
      opacity: titleOpacity,
    },
    
    // 副标题相关
    subtitle: {
      fontSize: subtitleFontSize,
      opacity: subtitleOpacity,
      top: subtitleTop,
      y: subtitleY,
    },
    
    // 控制栏相关
    controls: {
      top: controlsTop,
      left: controlsLeft,
      x: controlsX,
      y: controlsY,
    },
  };
}

export default useScrollAnimations;
