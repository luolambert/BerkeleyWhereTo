import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageToggle } from '../common';
import { knowLocations as knowLocationsCN } from '../../data/buildingInfo_chinese';
import { knowLocations as knowLocationsEN } from '../../data/buildingInfo_english';
import { sortOrders } from '../../data/know_sorting';
import BuildingGrid from '../building/BuildingGrid';
import BuildingDetail from '../building/BuildingDetail';

/**
 * BuildingInfoContainer - Container component for building information
 * Manages state and view switching (grid/detail)
 */
function BuildingInfoContainer({ onBack, currentView }) {
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [language, setLanguage] = useState('EN'); // 'CN' or 'EN'
  const [sortMethod, setSortMethod] = useState('students'); // 'students', 'categorical', 'popularity'
  const [slideDirection, setSlideDirection] = useState(0);

  // Define the order of tabs to determine slide direction
  const sortOrder = ['students', 'categorical', 'popularity'];

  const handleSortChange = (newSort) => {
    if (newSort === sortMethod) return;
    const oldIndex = sortOrder.indexOf(sortMethod);
    const newIndex = sortOrder.indexOf(newSort);
    setSlideDirection(newIndex > oldIndex ? 1 : -1);
    setSortMethod(newSort);
  };

  const currentLocations = language === 'CN' ? knowLocationsCN : knowLocationsEN;
  
  // Sort the locations based on the selected method
  const sortedSections = React.useMemo(() => {
    const sortData = sortOrders[sortMethod] || [];
    
    // Check if sortData is sectioned (array of objects) or flat (array of strings)
    const isSectioned = sortData.length > 0 && typeof sortData[0] === 'object';

    if (isSectioned) {
      return sortData.map(section => ({
        title: typeof section.title === 'object' ? section.title[language === 'CN' ? 'cn' : 'en'] : section.title,
        buildings: section.ids.map(id => currentLocations.find(b => b.id === id)).filter(Boolean)
      })).filter(section => section.buildings.length > 0);
    } else {
      // Fallback for flat list (treat as one unnamed section)
      const orderMap = new Map(sortData.map((id, index) => [id, index]));
      const sorted = [...currentLocations].sort((a, b) => {
        const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : 999;
        const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : 999;
        return indexA - indexB;
      });
      return [{ title: null, buildings: sorted }];
    }
  }, [currentLocations, sortMethod, language]);

  const selectedBuilding = selectedBuildingId ? currentLocations.find(b => b.id === selectedBuildingId) : null;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'CN' ? 'EN' : 'CN');
  };

  return (
    <div className="w-full h-full relative bg-neutral-50">
      <AnimatePresence mode="sync">
        {selectedBuilding ? (
          <>
            {/* Floating Toggle for Detail View */}
            <div className="absolute top-6 right-6 z-[60]">
              <LanguageToggle language={language} onToggle={toggleLanguage} variant="floating" direction="right" />
            </div>
            <BuildingDetail 
              key="detail" 
              building={selectedBuilding} 
              onBack={() => setSelectedBuildingId(null)} 
              language={language}
            />
          </>
        ) : (
          <BuildingGrid 
            key="grid" 
            sections={sortedSections} 
            onSelect={(b) => setSelectedBuildingId(b.id)} 
            language={language}
            onToggleLanguage={toggleLanguage}
            sortMethod={sortMethod}
            onSortChange={handleSortChange}
            slideDirection={slideDirection}
            currentView={currentView}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default BuildingInfoContainer;
