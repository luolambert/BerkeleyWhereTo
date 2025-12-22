import React from 'react';
import BuildingSelectionPanel from '../BuildingSelectionPanel';
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
 * 
 * BuildingSelectionPanel becomes a pure Presentational component
 */
function BuildingSelectionContainer({ onSelect, onClose, selectedValue }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [mode, setMode] = React.useState("freshman");
  
  // Get categoriesconst categories = getCategoriesByMode(mode);
  
  // Get buildings based on mode
  const currentBuildings = mode === 'freshman' ? freshmanBuildings : advancedBuildings;
  
  // Filter buildings using business logic hook
  const filteredBuildings = useBuildingFilter(currentBuildings, searchTerm, activeCategory, categories);
  
  // Handle mode change
  const handleModeChange = React.useCallback((newMode) => {
    setMode(newMode);
    setActiveCategory("all"); // Reset category on mode change
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
      
      // Handlers
      onSearchChange={setSearchTerm}
      onCategoryChange={setActiveCategory}
      onModeChange={handleModeChange}
      onSelect={onSelect}
      onClose={onClose}
    />
  );
}

export default BuildingSelectionContainer;
