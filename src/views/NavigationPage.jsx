import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';
import { Header } from '../components/common';
import MapContainer from '../components/MapContainer';
import { RouteInput } from '../components/presentational/inputs';
import { TravelTimeDisplay, ElevationChart } from '../components/presentational';
import { BuildingSelectionContainer } from '../components/containers';
import { EXTERNAL_LINKS } from '../constants/appConfig';
import { SCALE_VARIANTS } from '../constants/animations';

function NavigationPage({ isLoaded }) {
  const {
    startLocation,
    endLocation,
    travelTimes,
    routePoints,
    elevationData,
    activeField,
    setElevationData,
    calculateRoute,
    resetNavigation,
    toggleField,
    selectBuilding,
  } = useNavigation();


  return (
    <motion.div 
        key="navigation"
        className="absolute inset-0 w-full h-full"
        variants={SCALE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
    >
        {/* Map Background */}
        <div className="absolute inset-0 z-0">
            <MapContainer 
                isLoaded={isLoaded} 
                routePoints={routePoints} 
                onElevationLoaded={setElevationData}
            />
        </div>

        {/* Berkeley Seal (Top Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-auto">
            <img 
                src={EXTERNAL_LINKS.BERKELEY_SEAL}
                alt="Berkeley Seal" 
                className="w-16 h-16 opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
            />
        </div>


        {/* Floating Panel Container */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
            {/* Left Panel - Route Input */}
            <div className="relative w-full sm:w-[400px] lg:w-[450px] shrink-0 flex flex-col justify-center pointer-events-auto">
                <div className={`w-full ${travelTimes ? 'space-y-3' : 'space-y-3'}`}>
                <Header 
                    currentView="navigation" 
                    hasResults={!!travelTimes}
                />
                <RouteInput 
                    startLocation={startLocation}
                    endLocation={endLocation}
                    onCalculate={calculateRoute}
                    activeField={activeField}
                    onFieldFocus={toggleField}
                    onReset={resetNavigation}
                />
                
                {/* Results Area */}
                <div className="relative min-h-[100px] space-y-2">
                    <AnimatePresence mode="wait">
                        {travelTimes && (
                            <TravelTimeDisplay 
                                key="travel-times"
                                walkingTime={travelTimes.walking}
                                scooterTime={travelTimes.scooter}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {elevationData && (
                            <ElevationChart 
                                key="elevation-chart"
                                data={elevationData} 
                            />
                        )}
                    </AnimatePresence>
                </div>
                </div>
            </div>

            {/* Right Panel - Building Selection (Floating) */}
            <AnimatePresence>
                {activeField && (
                    <div className="flex-1 relative min-w-0 pointer-events-none">
                        <motion.div 
                            className="absolute inset-0 pointer-events-auto z-20 pr-0 lg:pr-20"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ 
                              x: { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: 0.15, ease: "easeOut" }
                            }}
                        >
                            <BuildingSelectionContainer 
                                selectedValue={activeField === 'start' ? startLocation : endLocation}
                                onSelect={selectBuilding}
                                onClose={() => toggleField(null)}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    </motion.div>
  );
}

export default NavigationPage;
