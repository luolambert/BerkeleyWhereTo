import React, { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { Github } from 'lucide-react';
import Header from './components/Header';
import MapContainer from './components/MapContainer';
import RouteInput from './components/RouteInput';
import TravelTimeDisplay from './components/TravelTimeDisplay';
import ElevationChart from './components/ElevationChart';
import BuildingSelectionPanel from './components/BuildingSelectionPanel';
import BuildingInfo from './components/BuildingInfo';
import { buildings } from './data/buildings';
import { buildings as advancedBuildings } from './data/advanced_building';

// Combine buildings for lookup to support both Freshman and Advanced modes
// Some buildings might have different names in different lists (e.g. LeConte vs Physics North)
const ALL_BUILDINGS = [...buildings, ...advancedBuildings];

const LIBRARIES = ['places', 'geometry'];

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  const [currentView, setCurrentView] = useState('navigation'); // 'navigation' | 'info'
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [travelTimes, setTravelTimes] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [routePoints, setRoutePoints] = useState(null);
  const [elevationData, setElevationData] = useState(null);
  const [activeField, setActiveField] = useState(null); // 'start' | 'end' | null

  const calculateRoute = useCallback(async () => {
    if (!startLocation || !endLocation || !isLoaded) return;

    setIsCalculating(true);
    setElevationData(null); // Reset elevation data
    
    // Find building objects
    // Find building objects
    // Search in the combined list to ensure we find the building regardless of which mode it was selected from
    const startBuilding = ALL_BUILDINGS.find(b => b.name === startLocation);
    const endBuilding = ALL_BUILDINGS.find(b => b.name === endLocation);

    if (!startBuilding || !endBuilding) {
      alert("Please select valid buildings from the list.");
      setIsCalculating(false);
      return;
    }

    // Update route points for the map
    setRoutePoints({ start: startBuilding, end: endBuilding });

    const service = new window.google.maps.DistanceMatrixService();
    
    try {
      const result = await service.getDistanceMatrix({
        origins: [{ lat: startBuilding.lat, lng: startBuilding.lng }],
        destinations: [{ lat: endBuilding.lat, lng: endBuilding.lng }],
        travelMode: window.google.maps.TravelMode.WALKING,
      });

      if (result.rows[0].elements[0].status === "OK") {
        const walkingDuration = result.rows[0].elements[0].duration.value; // in seconds
        const walkingMin = Math.round(walkingDuration / 60);
                // Estimate scooter time assuming a speed of 20 km/h (4× faster than the default walking speed of 5 km/h)
          // This simple conversion uses the walking duration as a baseline and scales it down
          const scooterMin = Math.round(walkingMin / 4);

        setTravelTimes({
          walking: walkingMin,
          scooter: scooterMin
        });
      } else {
        console.error("Error calculating distance:", result);
        alert("Could not calculate distance. Please try again.");
      }
    } catch (error) {
      console.error("Error with Distance Matrix API:", error);
      alert("Error connecting to Google Maps API.");
    } finally {
      setIsCalculating(false);
    }

  }, [startLocation, endLocation, isLoaded]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-50">
      <a
        href="https://github.com/luolambert/BerkeleyWhereToGo"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[20px] right-[60px] z-50 w-10 h-10 bg-white rounded-full shadow-xl border border-neutral-200 flex items-center justify-center hover:scale-110 transition-all duration-300"
        title="View on GitHub"
      >
        <Github className="w-5 h-5 text-neutral-900" />
      </a>
      <LayoutGroup>
      <AnimatePresence mode="wait">
        {currentView === 'navigation' ? (
            <motion.div 
                key="navigation"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                {/* Map Background */}
                <div className="absolute inset-0 z-0">
                    <MapContainer 
                        isLoaded={isLoaded} 
                        routePoints={routePoints} 
                        onElevationLoaded={setElevationData}
                    />
                </div>

                {/* Berkeley Logo (Top Right) */}
                <div className="absolute top-4 right-4 z-20 pointer-events-auto">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg" 
                    alt="Berkeley Seal" 
                    className="w-16 h-16 opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                    />
                </div>

                {/* Floating Panel Container */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
                    {/* Left Panel - Route Input */}
                    <div className="relative w-full sm:w-[400px] lg:w-[450px] shrink-0 flex flex-col justify-center pointer-events-auto">
                        <div className={`w-full ${travelTimes ? 'space-y-2' : 'space-y-4'}`}>
                        <Header 
                            onNavigate={setCurrentView} 
                            currentView={currentView} 
                            hasResults={!!travelTimes}
                        />
                        <RouteInput 
                            startLocation={startLocation}
                            setStartLocation={setStartLocation}
                            endLocation={endLocation}
                            setEndLocation={setEndLocation}
                            onCalculate={calculateRoute}
                            isCalculating={isCalculating}
                            activeField={activeField}
                            onFieldFocus={(field) => setActiveField(current => current === field ? null : field)}
                            onReset={() => {
                                setStartLocation('');
                                setEndLocation('');
                                setTravelTimes(null);
                                setRoutePoints(null);
                                setElevationData(null);
                                setActiveField(null);
                                setIsCalculating(false);
                            }}
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
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <BuildingSelectionPanel 
                                        selectedValue={activeField === 'start' ? startLocation : endLocation}
                                        onSelect={(buildingName) => {
                                            if (activeField === 'start') setStartLocation(buildingName);
                                            else setEndLocation(buildingName);
                                            setActiveField(null);
                                        }}
                                        onClose={() => setActiveField(null)}
                                    />
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        ) : (
            <motion.div 
                key="info"
                className="absolute inset-0 w-full h-full z-50 overflow-hidden bg-neutral-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                 <div className="relative z-10 w-full h-full flex flex-col items-center">
                     {/* Centered Header */}
                     <div className="w-full flex justify-center shrink-0">
                        <Header 
                            currentView={currentView} 
                            onNavigate={setCurrentView} 
                            centered={true}
                        />
                     </div>

                     <div className="flex-1 w-full overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                        <BuildingInfo />
                     </div>
                 </div>
            </motion.div>
        )}
      </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

export default App;
