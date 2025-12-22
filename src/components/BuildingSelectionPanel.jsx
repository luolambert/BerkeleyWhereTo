import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { buildings as freshmanBuildings } from "../data/buildings";
import { buildings as advancedBuildings } from "../data/advanced_building";
import { getCategoriesByMode } from "../constants/buildingCategories";
import { SearchInput } from "./presentational/inputs";
import { CategoryPills } from "./presentational/controls";
import { ModeToggle } from "./presentational/buttons";
import { SelectableBuildingCard } from "./presentational/cards";
import { GlassPanel } from "./presentational/panels";

/**
 * BuildingSelectionPanel - Presentational Component with backwards compatibility
 * 
 * Can work standalone (with internal state) or as pure presentational (with props from Container)
 */
const BuildingSelectionPanel = ({ 
  // Core callbacks (always required)
  onSelect, 
  onClose, 
  selectedValue,
  // Optional: for Container mode (pure presentational)
  filteredBuildings: externalBuildings,
  categories: externalCategories,
  searchTerm: externalSearchTerm,
  activeCategory: externalActiveCategory,
  mode: externalMode,
  onSearchChange,
  onCategoryChange,
  onModeChange
}) => {
  // Internal state (for standalone mode)
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [internalActiveCategory, setInternalActiveCategory] = useState("all");
  const [internalMode, setInternalMode] = useState("freshman");
  const inputRef = useRef(null);

  // Determine if using Container mode or standalone mode
  const isContainerMode = externalBuildings !== undefined;
  
  // Use external or internal values
  const searchTerm = isContainerMode ? externalSearchTerm : internalSearchTerm;
  const activeCategory = isContainerMode ? externalActiveCategory : internalActiveCategory;
  const mode = isContainerMode ? externalMode : internalMode;
  
  // Get categories
  const categories = isContainerMode ? externalCategories : getCategoriesByMode(mode);

  // Get buildings (standalone mode only)
  const currentBuildings = mode === 'freshman' ? freshmanBuildings : advancedBuildings;
  
  // Filter buildings (standalone mode only)
  const filteredBuildings = isContainerMode ? externalBuildings : currentBuildings.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategory === "all") return matchesSearch;
    if (activeCategory === "popular") return matchesSearch && b.popular;
    const categoryDef = categories.find(c => c.id === activeCategory);
    if (categoryDef && categoryDef.match) {
      return matchesSearch && categoryDef.match.includes(b.category);
    }
    return matchesSearch && b.category === activeCategory;
  });

  // Handlers
  const handleSearchChange = isContainerMode ? onSearchChange : setInternalSearchTerm;
  const handleCategoryChange = isContainerMode ? onCategoryChange : setInternalActiveCategory;
  const handleModeChange = isContainerMode ? onModeChange : (newMode) => {
    setInternalMode(newMode);
    setInternalActiveCategory("all");
  };

  // Focus search input when mounted
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <GlassPanel variant="elevated" padding="none" className="h-full w-full flex flex-col overflow-hidden rounded-3xl">
      {/* Header */}
      <div className="p-6 border-b border-neutral-100 flex items-center gap-4 bg-white/50 shrink-0">
        <SearchInput
          ref={inputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a building..."
          autoFocus
        />
        
        <ModeToggle
          options={[
            { id: 'freshman', label: 'Freshman' },
            { id: 'advanced', label: 'Advanced' },
          ]}
          activeId={mode}
          onChange={handleModeChange}
        />

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors shrink-0"
        >
          <X size={20} />
        </button>
      </div>

      {/* Categories */}
      <div className="px-6 py-3 border-b border-neutral-100 bg-white/50 shrink-0">
        <CategoryPills
          categories={categories}
          activeId={activeCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/50">
        {filteredBuildings.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
            {filteredBuildings.map((b) => (
              <SelectableBuildingCard
                key={b.id}
                name={b.name}
                category={b.category}
                isSelected={selectedValue === b.name}
                isPopular={b.popular}
                isUndergrad={b.undergrad}
                isGrad={b.grad}
                onClick={() => onSelect(b.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-400 py-12">
            <p className="text-lg font-medium">No buildings found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default BuildingSelectionPanel;
