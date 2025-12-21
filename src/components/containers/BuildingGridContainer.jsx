import React from 'react';
import BuildingGrid from '../building/BuildingGrid';

/**
 * BuildingGridContainer
 * Container component that manages state and business logic for BuildingGrid
 * 
 * Current responsibilities:
 * - Provides interface between parent and BuildingGrid
 * - Future: Will extract useHeaderScrollAnimation and text config management
 * 
 * Note: Full separation would require significant refactoring of BuildingGrid's
 * scroll animation logic. Currently acting as a thin wrapper with documentation
 * of intended separation.
 */
function BuildingGridContainer({
  sections,
  onSelect,
  language,
  onToggleLanguage,
  sortMethod,
  onSortChange,
  slideDirection,
  currentView,
}) {
  // Text configuration that should be managed by Container
  const textConfig = React.useMemo(() => ({
    title: language === 'CN' 
      ? "探索伯克利校园建筑背后的故事与传说" 
      : "Discover the stories and legends behind Berkeley's campus buildings",
    viewDetails: language === 'CN' ? "查看详情" : "View Details",
    disclaimer: language === 'CN' ? [
      "信息为个人收集，可能不准确或过时。",
      "图片来源于 Google 或加州大学伯克利分校官网。"
    ] : [
      "Information collected personally, may be inaccurate or outdated.",
      "Images sourced from Google or UC Berkeley official website."
    ],
    sortOptions: language === 'CN' ? [
      { id: 'students', label: '适合学生' },
      { id: 'categorical', label: '按类别' },
      { id: 'popularity', label: '热门程度' },
    ] : [
      { id: 'students', label: 'For Students' },
      { id: 'categorical', label: 'Categorical' },
      { id: 'popularity', label: 'Popularity' },
    ],
  }), [language]);

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
