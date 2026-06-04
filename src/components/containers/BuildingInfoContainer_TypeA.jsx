// TypeA BuildingInfoContainer - Optimized for mobile portrait + iPad portrait
// Uses BuildingGrid_TypeA for mobile-optimized layout

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageToggle } from '../common';
import { knowLocations as knowLocationsCN } from '../../data/buildingInfo_chinese';
import { knowLocations as knowLocationsEN } from '../../data/buildingInfo_english';
import { sortOrders } from '../../data/know_sorting';
import BuildingGrid_TypeA from '../building/BuildingGrid_TypeA';
import BuildingDetail from '../building/BuildingDetail';

/**
 * TypeA BuildingInfoContainer - Container for mobile/tablet portrait
 * Same logic as TypeB, uses BuildingGrid_TypeA for presentation
 */
function BuildingInfoContainer_TypeA({ currentView }) {
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [language, setLanguage] = useState('EN');
  const [sortMethod, setSortMethod] = useState('students');
  const [slideDirection, setSlideDirection] = useState(1);

  const handleSortChange = (newSort, direction) => {
    if (newSort === sortMethod) return;
    setSlideDirection(direction);
    setSortMethod(newSort);
  };

  const currentLocations = language === 'CN' ? knowLocationsCN : knowLocationsEN;
  
  const sortedSections = React.useMemo(() => {
    const sortData = sortOrders[sortMethod] || [];
    const isSectioned = sortData.length > 0 && typeof sortData[0] === 'object';

    if (isSectioned) {
      return sortData.map(section => ({
        title: typeof section.title === 'object' ? section.title[language === 'CN' ? 'cn' : 'en'] : section.title,
        buildings: section.ids.map(id => currentLocations.find(b => b.id === id)).filter(Boolean)
      })).filter(section => section.buildings.length > 0);
    } else {
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
            <div className="absolute top-4 right-4 z-[60]">
              <LanguageToggle language={language} onToggle={toggleLanguage} variant="floating" direction="left" />
            </div>
            <BuildingDetail 
              key="detail" 
              building={selectedBuilding} 
              onBack={() => setSelectedBuildingId(null)} 
              language={language}
            />
          </>
        ) : (
          <BuildingGrid_TypeA 
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

export default BuildingInfoContainer_TypeA;
