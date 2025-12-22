import React from 'react';
import BuildingGrid from '../building/BuildingGrid';
import { buildings } from '../../data/advanced_building';
import useBuildingSorter from '../../hooks/useBuildingSorter';
import useBuildingGridText from '../../hooks/useBuildingGridText';

/**
 * BuildingGridContainer - 完整的业务逻辑容器
 * 
 * 负责:
 * - 数据获取 (buildings)
 * - 排序业务逻辑 (via useBuildingSorter)
 * - 文本配置 (via useBuildingGridText)
 * - 状态管理 (sortMethod, slideDirection)
 * 
 * BuildingGrid组件现在是纯Presentational，只负责渲染
 */
function BuildingGridContainer({ 
  language, 
  onToggleLanguage, 
  sortMethod, 
  onSortChange,
  onSelect,
  currentView 
}) {
  const [slideDirection, setSlideDirection] = React.useState(1);
  
  // Business logic: sorting
  const sections = useBuildingSorter(buildings, sortMethod, language);
  
  // Business logic: text configuration
  const textConfig = useBuildingGridText(language);
  
  // Track sort direction for animations
  const prevSortMethod = React.useRef(sortMethod);
  React.useEffect(() => {
    if (prevSortMethod.current !== sortMethod) {
      // Determine slide direction based on option order
      const options = textConfig.sortOptions;
      const prevIndex = options.findIndex(opt => opt.id === prevSortMethod.current);
      const newIndex = options.findIndex(opt => opt.id === sortMethod);
      setSlideDirection(newIndex > prevIndex ? 1 : -1);
      prevSortMethod.current = sortMethod;
    }
  }, [sortMethod, textConfig.sortOptions]);
  
  return (
    <BuildingGrid
      sections={sections}
      onSelect={onSelect}
      language={language}
      onToggleLanguage={onToggleLanguage}
      sortMethod={sortMethod}
      onSortChange={onSortChange}
      slideDirection={slideDirection}
      currentView={currentView}
      textConfig={textConfig}
    />
  );
}

export default BuildingGridContainer;
