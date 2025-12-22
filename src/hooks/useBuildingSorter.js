import { useMemo } from 'react';

/**
 * useBuildingSorter - 建筑排序业务逻辑Hook
 * 
 * 将排序算法从UI组件中完全分离
 * 
 * @param {Array} buildings - 建筑数据数组
 * @param {string} sortMethod - 排序方法: 'students' | 'categorical' | 'popularity'
 * @param {string} language - 当前语言
 * @returns {Array} sections - 分组后的建筑数据
 */
function useBuildingSorter(buildings, sortMethod, language) {
  return useMemo(() => {
    if (!buildings || buildings.length === 0) return [];

    // Sort by Students (推荐给学生 / Recommended for Students)
    if (sortMethod === 'students') {
      const undergrad = buildings.filter(b => b.undergrad);
      const grad = buildings.filter(b => b.grad && !b.undergrad);
      const both = buildings.filter(b => b.undergrad && b.grad);

      return [
        {
          title: language === 'CN' ? '适合本科生' : 'For Undergraduates',
          buildings: undergrad.length > 0 ? undergrad : both
        },
        ...(grad.length > 0 ? [{
          title: language === 'CN' ? '适合研究生' : 'For Graduate Students',
          buildings: grad
        }] : [])
      ];
    }

    // Sort by Category
    if (sortMethod === 'categorical') {
      const categoryMap = {};
      buildings.forEach(building => {
        const cat = building.category || 'Other';
        if (!categoryMap[cat]) {
          categoryMap[cat] = [];
        }
        categoryMap[cat].push(building);
      });

      return Object.entries(categoryMap).map(([category, bldgs]) => ({
        title: category,
        buildings: bldgs
      }));
    }

    // Sort by Popularity
    if (sortMethod === 'popularity') {
      const popular = buildings.filter(b => b.popular).sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
      const regular = buildings.filter(b => !b.popular);

      return [
        ...(popular.length > 0 ? [{
          title: language === 'CN' ? '热门建筑' : 'Popular Buildings',
          buildings: popular
        }] : []),
        {
          title: language === 'CN' ? '其他建筑' : 'Other Buildings',
          buildings: regular
        }
      ];
    }

    // Default: no grouping
    return [{ title: '', buildings }];
  }, [buildings, sortMethod, language]);
}

export default useBuildingSorter;
