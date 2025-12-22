import { useMemo } from 'react';

/**
 * useBuildingGridText - BuildingGrid页面文本配置Hook
 * 
 * 将所有I18N文本配置从UI组件中分离
 * 
 * @param {string} language - 当前语言 'CN' | 'EN'
 * @returns {object} 文本配置对象
 */
function useBuildingGridText(language) {
  return useMemo(() => {
    const isCN = language === 'CN';
    
    return {
      title: isCN 
        ? "探索伯克利校园建筑背后的故事与传说" 
        : "Discover the stories and legends behind Berkeley's campus buildings",
      
      viewDetails: isCN ? "查看详情" : "View Details",
      
      sortOptions: isCN ? [
        { id: 'students', label: '适合学生' },
        { id: 'categorical', label: '按类别' },
        { id: 'popularity', label: '热门程度' },
      ] : [
        { id: 'students', label: 'For Students' },
        { id: 'categorical', label: 'Categorical' },
        { id: 'popularity', label: 'Popularity' },
      ],
      
      disclaimer: isCN ? [
        "信息为个人收集，可能不准确或过时。",
        "图片来源于 Google 或加州大学伯克利分校官网。"
      ] : [
        "Information collected personally, may be inaccurate or outdated.",
        "Images sourced from Google or UC Berkeley official website."
      ]
    };
  }, [language]);
}

export default useBuildingGridText;
