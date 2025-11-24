import React, { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { Github } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import NavigationPage from './views/NavigationPage';
import InfoPage from './views/InfoPage';
import LandingPage from './views/LandingPage';
import { buildings } from './data/buildings';
import { buildings as advancedBuildings } from './data/advanced_building';

// Combine buildings for lookup to support both Freshman and Advanced modes
// Some buildings might have different names in different lists (e.g. LeConte vs Physics North)
const ALL_BUILDINGS = [...buildings, ...advancedBuildings];

const LIBRARIES = ['places', 'geometry'];

function AppContent({ 
  isLoaded, 
  startLocation, setStartLocation,
  endLocation, setEndLocation,
  travelTimes, setTravelTimes,
  isCalculating, setIsCalculating,
  routePoints, setRoutePoints,
  elevationData, setElevationData,
  activeField, setActiveField,
  calculateRoute
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigation = location.pathname === '/go';

  // Metadata updates
  React.useEffect(() => {
    if (location.pathname === '/know') {
      document.title = 'BerkeleyWhereToKnow';
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = '/WhereToKnow_Logo.png';
    } else if (location.pathname === '/go') {
      document.title = 'BerkeleyWhereToGo';
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = '/WhereToGo_Logo.png';
    } else {
      // Landing Page
      document.title = 'Berkeley Where To';
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = '/WhereToGo_Logo.png'; // Default to Go logo or maybe a generic one
    }
  }, [location.pathname]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-50">
      <motion.a
        href="https://github.com/luolambert/BerkeleyWhereToGo"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[20px] z-[200] w-10 h-10 bg-white rounded-full shadow-xl border border-neutral-200 flex items-center justify-center"
        title="View on GitHub"
        initial={{ opacity: 0, right: '60px' }}
        animate={{ 
          opacity: 1, 
          right: isNavigation ? '60px' : '20px' 
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Github className="w-5 h-5 text-neutral-900" />
      </motion.a>
      <LayoutGroup>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<RootRedirector />} />
            <Route 
              path="/go" 
              element={
                <NavigationPage 
                  isLoaded={isLoaded}
                  startLocation={startLocation}
                  setStartLocation={setStartLocation}
                  endLocation={endLocation}
                  setEndLocation={setEndLocation}
                  travelTimes={travelTimes}
                  setTravelTimes={setTravelTimes}
                  isCalculating={isCalculating}
                  setIsCalculating={setIsCalculating}
                  routePoints={routePoints}
                  setRoutePoints={setRoutePoints}
                  elevationData={elevationData}
                  setElevationData={setElevationData}
                  activeField={activeField}
                  setActiveField={setActiveField}
                  calculateRoute={calculateRoute}
                />
              } 
            />
            <Route path="/know" element={<InfoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

function RootRedirector() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('berkeleywheretogo')) {
    return <Navigate to="/go" replace />;
  } 
  
  if (hostname.includes('berkeleywheretoknow')) {
    return <Navigate to="/know" replace />;
  }
  
  return <LandingPage />;
}

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  // Lifted state for NavigationPage
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
    <BrowserRouter>
      <AppContent 
        isLoaded={isLoaded}
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
        travelTimes={travelTimes}
        setTravelTimes={setTravelTimes}
        isCalculating={isCalculating}
        setIsCalculating={setIsCalculating}
        routePoints={routePoints}
        setRoutePoints={setRoutePoints}
        elevationData={elevationData}
        setElevationData={setElevationData}
        activeField={activeField}
        setActiveField={setActiveField}
        calculateRoute={calculateRoute}
      />
    </BrowserRouter>
  );
}

export default App;
