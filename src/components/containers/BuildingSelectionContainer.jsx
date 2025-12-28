import React from 'react';
import { BuildingSelectionPanel } from '../presentational/panels';
import { buildings as freshmanBuildings } from '../../data/buildings';
import { buildings as advancedBuildings } from '../../data/advanced_building';
import { getCategoriesByMode } from '../../constants/buildingCategories';
import useBuildingFilter from '../../hooks/useBuildingFilter';

/**
 * BuildingSelectionContainer - Business logic container for building selection
 * 
 * Responsibilities:
 * - Data fetching (buildings based on mode)
 * - Filter logic (via useBuildingFilter hook)
 * - State management (searchTerm, activeCategory, mode)
 * - Separate slide directions for mode and category transitions
 * 
 * BuildingSelectionPanel becomes a pure Presentational component
 */
function BuildingSelectionContainer({ onSelect, onClose, selectedValue }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [mode, setMode] = React.useState("freshman");
  
  // Separate direction states for different animation scopes
  const [modeSlideDirection, setModeSlideDirection] = React.useState(1);
  const [categorySlideDirection, setCategorySlideDirection] = React.useState(1);
  
  
  // Get categories based on mode
  const categories = getCategoriesByMode(mode);
  
  // Get buildings based on mode
  const currentBuildings = mode === 'freshman' ? freshmanBuildings : advancedBuildings;
  
  // Filter buildings using business logic hook
  const filteredBuildings = useBuildingFilter(currentBuildings, searchTerm, activeCategory, categories);
  
  // Handle mode change - affects categories + cards
  const handleModeChange = React.useCallback((newMode, direction) => {
    setModeSlideDirection(direction);
    setMode(newMode);
    setActiveCategory("all"); // Reset category on mode change
  }, []);
  
  // Handle category change - affects cards only
  const handleCategoryChange = React.useCallback((newCategory, direction) => {
    setCategorySlideDirection(direction);
    setActiveCategory(newCategory);
  }, []);
  
  return (
    <BuildingSelectionPanel
      // Data
      filteredBuildings={filteredBuildings}
      categories={categories}
      
      // State
      searchTerm={searchTerm}
      activeCategory={activeCategory}
      mode={mode}
      selectedValue={selectedValue}
      modeSlideDirection={modeSlideDirection}
      categorySlideDirection={categorySlideDirection}
      
      // Handlers
      onSearchChange={setSearchTerm}
      onCategoryChange={handleCategoryChange}
      onModeChange={handleModeChange}
      onSelect={onSelect}
      onClose={onClose}
    />
  );
}

export default BuildingSelectionContainer;
