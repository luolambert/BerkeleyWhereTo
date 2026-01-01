// NavigationPage TypeA - Mobile/iPad Portrait optimized (V7)
// Full-screen map with bottom Drawer, click-to-toggle header switch
// Fixed: Drawer overlay, map centering, slope legend in drawer

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { Header, LanguageToggle } from '../../components/common';
import MapContainer from '../../components/MapContainer';
import { RouteInput } from '../../components/presentational/inputs';
import { TravelTimeDisplay, ElevationChart } from '../../components/presentational';
import { BuildingSelectionContainer } from '../../components/containers';
import { IconButton } from '../../components/presentational/buttons';
import { RefreshCw } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
} from '../../components/ui/drawer';
import { SCALE_VARIANTS } from '../../constants/animations';

// Inline SlopeLegend for Drawer - horizontal layout
function SlopeLegend({ language }) {
  const labels = {
    flat: language === 'CN' ? '平坦' : 'Flat',
    moderate: language === 'CN' ? '中等' : 'Moderate', 
    steep: language === 'CN' ? '陡峭' : 'Steep',
  };

  return (
    <div className="flex items-center justify-center gap-4 py-3 border-t border-neutral-100">
      <div className="flex items-center gap-2">
        <div className="w-4 h-2 bg-blue-300 rounded-full"></div>
        <span className="text-xs text-neutral-500">{labels.flat} (&lt;3%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-2 bg-blue-600 rounded-full"></div>
        <span className="text-xs text-neutral-500">{labels.moderate} (3-8%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-2 bg-blue-900 rounded-full"></div>
        <span className="text-xs text-neutral-500">{labels.steep} (&gt;8%)</span>
      </div>
    </div>
  );
}

function NavigationPage({ isLoaded }) {
  const navigate = useNavigate();
  const {
    startLocation,
    endLocation,
    travelTimes,
    routePoints,
    elevationData,
    setStartLocation,
    setEndLocation,
    setElevationData,
    calculateRoute,
    resetNavigation,
    language,
    toggleLanguage,
  } = useNavigation();

  // Drawer defaults to open
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  
  // Click Header to toggle Know interface header
  const [showKnowHeader, setShowKnowHeader] = useState(false);
  
  // Building selection panel state
  const [showBuildingPanel, setShowBuildingPanel] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  // Handle field focus - open building panel
  const handleFieldFocus = useCallback((field) => {
    setCurrentField(field);
    setShowBuildingPanel(true);
  }, []);

  // Handle building selection
  const handleBuildingSelect = useCallback((buildingName) => {
    if (currentField === 'start') {
      setStartLocation(buildingName);
    } else if (currentField === 'end') {
      setEndLocation(buildingName);
    }
    setShowBuildingPanel(false);
    setCurrentField(null);
  }, [currentField, setStartLocation, setEndLocation]);

  // Close building panel
  const handleCloseBuildingPanel = useCallback(() => {
    setShowBuildingPanel(false);
    setCurrentField(null);
  }, []);

  // Toggle Know header on click
  const handleHeaderClick = useCallback(() => {
    setShowKnowHeader(prev => !prev);
  }, []);

  // Navigate to Know page
  const handleNavigateToKnow = useCallback(() => {
    navigate('/know');
  }, [navigate]);

  // Check if we have results
  const hasResults = !!travelTimes;

  return (
    <motion.div 
      key="navigation-typeA"
      className="absolute inset-0 w-full h-full"
      variants={SCALE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Full-screen Map - no paddingBottom, let fitBounds handle centering */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          isLoaded={isLoaded} 
          routePoints={routePoints} 
          onElevationLoaded={setElevationData}
          hideLegend={true}
        />
      </div>

      {/* Bottom Drawer - showOverlay=false to not block building panel */}
      <Drawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        modal={false}
      >
        <DrawerContent 
          className="max-h-[55vh] bg-white border-t border-neutral-200 shadow-lg"
          showOverlay={false}
        >
          {/* Header Row - click to toggle Know header */}
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="cursor-pointer" onClick={handleHeaderClick}>
              <Header 
                currentView="navigation" 
                hasResults={hasResults}
                hideSubtitle={true}
                compact={true}
              />
            </div>
            
            {/* Show Language + Refresh next to Header when has results */}
            {hasResults && (
              <div className="flex items-center gap-2">
                <LanguageToggle language={language} onToggle={toggleLanguage} variant="default" />
                <IconButton
                  icon={RefreshCw}
                  onClick={resetNavigation}
                  variant="ghost"
                  title="Clear selection"
                  className="hover:bg-neutral-100/50 rounded-full"
                />
              </div>
            )}
          </div>
          
          {/* Expandable Know Header */}
          <AnimatePresence>
            {showKnowHeader && (
              <motion.div
                className="px-6 py-2 bg-white/80 border-b border-neutral-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="p-3 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
                  onClick={handleNavigateToKnow}
                >
                  <Header 
                    currentView="info" 
                    compact={true}
                    hideSubtitle={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="px-6 pb-3 space-y-3 overflow-y-auto flex-1">
            {!hasResults ? (
              <RouteInput 
                startLocation={startLocation}
                endLocation={endLocation}
                onCalculate={calculateRoute}
                activeField={currentField}
                onFieldFocus={handleFieldFocus}
                onReset={resetNavigation}
                compact={true}
              />
            ) : (
              /* Results view */
              <div className="space-y-3">
                <TravelTimeDisplay 
                  walkingTime={travelTimes.walking}
                  scooterTime={travelTimes.scooter}
                />
                
                {elevationData && (
                  <ElevationChart data={elevationData} />
                )}
              </div>
            )}
          </div>

          {/* Slope Legend at bottom of Drawer when has results */}
          {hasResults && elevationData && (
            <SlopeLegend language={language} />
          )}
        </DrawerContent>
      </Drawer>

      {/* Floating Button (shown when Drawer is closed) */}
      <AnimatePresence>
        {!isDrawerOpen && (
          <motion.button
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 
                       bg-primary-500 text-white px-6 py-3 rounded-full 
                       shadow-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            Open Navigation
          </motion.button>
        )}
      </AnimatePresence>

      {/* Building Selection Panel */}
      <AnimatePresence>
        {showBuildingPanel && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-stretch justify-center p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full h-full bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl"
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <BuildingSelectionContainer 
                selectedValue={currentField === 'start' ? startLocation : endLocation}
                onSelect={handleBuildingSelect}
                onClose={handleCloseBuildingPanel}
                compact={true}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default NavigationPage;