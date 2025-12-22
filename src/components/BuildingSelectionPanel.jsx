import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { SearchInput } from "./presentational/inputs";
import { CategoryPills } from "./presentational/controls";
import { ModeToggle } from "./presentational/buttons";
import { SelectableBuildingCard } from "./presentational/cards";
import { GlassPanel } from "./presentational/panels";

/**
 * BuildingSelectionPanel - Pure Presentational Component
 * 
 * Only responsible for UI rendering, receives all data and handlers via props
 */
const BuildingSelectionPanel = ({ 
  // Data
  filteredBuildings,
  categories,
  // State
  searchTerm,
  activeCategory,
  mode,
  selectedValue,
  // Handlers
  onSearchChange,
  onCategoryChange,
  onModeChange,
  onSelect,
  onClose
}) => {
  const inputRef = useRef(null);


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
          onChange={onSearchChange}
          placeholder="Search for a building..."
          autoFocus
        />
        
        <ModeToggle
          options={[
            { id: 'freshman', label: 'Freshman' },
            { id: 'advanced', label: 'Advanced' },
          ]}
          activeId={mode}
          onChange={onModeChange}
        />

        <button
          onClick={onClose}
          className="p-3 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="px-6 py-3 border-b border-neutral-100 bg-white/50 shrink-0">
        <CategoryPills
          categories={categories}
          activeId={activeCategory}
          onChange={onCategoryChange}
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
          <div className="h-full flex flex-col items-center justify-center text-neutral-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No buildings found</p>
            <p className="text-sm">Try adjusting your search or category</p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default BuildingSelectionPanel;
