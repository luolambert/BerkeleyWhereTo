import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "../inputs";
import { CategoryPills } from "../controls";
import { ModeToggle } from "../buttons";
import { SelectableBuildingCard } from "../cards";
import GlassPanel from "./GlassPanel";
import { HoverEffect } from "../../ui/card-hover-effect";
import { SlideTransition } from "../../common";

/**
 * BuildingSelectionPanel - Pure Presentational Component
 * 
 * Uses two nested SlideTransitions:
 * - Outer: triggered by mode change (animates categories + cards)
 * - Inner: triggered by category change (animates cards only)
 */
const BuildingSelectionPanel = ({ 
  // Core callbacks
  onSelect, 
  onClose, 
  selectedValue,
  // Required data from Container
  filteredBuildings,
  categories,
  searchTerm,
  activeCategory,
  mode,
  modeSlideDirection,
  categorySlideDirection,
  // Required handlers from Container
  onSearchChange,
  onCategoryChange,
  onModeChange,
  // Layout variant
  compact = false
}) => {
  const inputRef = useRef(null);

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
      <div className={cn(
        "border-b border-neutral-100 bg-white/50 shrink-0 flex items-center gap-2",
        compact ? "p-3" : "p-6"
      )}>
        <SearchInput
          ref={inputRef}
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search for a building..."
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
          className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors shrink-0"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <SlideTransition
          activeKey={mode}
          direction={modeSlideDirection}
          gap={70}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className={cn(
            "border-b border-neutral-100 bg-white/50 shrink-0 overflow-hidden relative z-20",
            compact ? "px-3 py-2" : "px-6 py-3"
          )}>
            <CategoryPills
              categories={categories}
              activeId={activeCategory}
              onChange={onCategoryChange}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <SlideTransition
              activeKey={activeCategory}
              direction={categorySlideDirection}
              gap={70}
              className="h-full"
            >
              <div className={cn(
                "h-full overflow-y-auto no-scrollbar bg-neutral-50/50",
                compact ? "p-0.5" : "p-6"
              )}>
                {filteredBuildings && filteredBuildings.length > 0 ? (
                  <HoverEffect 
                    items={filteredBuildings}
                    className={compact ? "gap-2 py-0" : "gap-3 py-0"}
                    disableTouch={true}
                    style={{ 
                      gridTemplateColumns: compact 
                        ? 'repeat(2, 1fr)' 
                        : 'repeat(auto-fill, minmax(185px, 1fr))' 
                    }}
                    renderItem={(b) => (
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
                    )}
                  />
                ) : (
                  <div className="text-center text-neutral-400 py-12">
                    <p className="text-lg font-medium">No buildings found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </SlideTransition>
          </div>
        </SlideTransition>
      </div>
    </GlassPanel>
  );
};

export default BuildingSelectionPanel;
