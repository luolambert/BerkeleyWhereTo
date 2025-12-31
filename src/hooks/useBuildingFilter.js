import { useMemo } from 'react';

/**
 * useBuildingFilter - 建筑过滤业务逻辑Hook
 * 
 * 统一封装BuildingSelectionPanel的过滤逻辑
 * 
 * @param {Array} buildings - 建筑数据数组
 * @param {string} searchTerm - 搜索关键词
 * @param {string} activeCategory - 激活的类别
 * @param {Array} categories - 类别定义数组
 * @returns {Array} 过滤后的建筑数组
 */
function useBuildingFilter(buildings, searchTerm, activeCategory, categories) {
  return useMemo(() => {
    if (!buildings || buildings.length === 0) return [];

    return buildings.filter((b) => {
      const matchesSearch = b.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === "all") return true;
      if (activeCategory === "popular") return b.popular;

      const categoryDef = categories.find(c => c.id === activeCategory);
      if (categoryDef && categoryDef.match) {
        return categoryDef.match.includes(b.category);
      }

      return b.category === activeCategory;
    });
  }, [buildings, searchTerm, activeCategory, categories]);
}

export default useBuildingFilter;
