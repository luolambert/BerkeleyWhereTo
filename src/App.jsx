import React, { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Header from './components/Header';
import MapContainer from './components/MapContainer';
import RouteInput from './components/RouteInput';
import TravelTimeDisplay from './components/TravelTimeDisplay';
import ElevationChart from './components/ElevationChart';
import { buildings } from './data/buildings';

const LIBRARIES = ['places', 'geometry'];

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [travelTimes, setTravelTimes] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [routePoints, setRoutePoints] = useState(null);
  const [elevationData, setElevationData] = useState(null);

  const calculateRoute = useCallback(async () => {
    if (!startLocation || !endLocation || !isLoaded) return;

    setIsCalculating(true);
    setElevationData(null); // Reset elevation data
    
    // Find building objects
    const startBuilding = buildings.find(b => b.name === startLocation);
    const endBuilding = buildings.find(b => b.name === endLocation);

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
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end sm:justify-center sm:items-start p-4 sm:p-8 lg:p-12">
        <div className="pointer-events-auto w-full max-w-md space-y-4">
          <Header />
          <RouteInput 
            startLocation={startLocation}
            setStartLocation={setStartLocation}
            endLocation={endLocation}
            setEndLocation={setEndLocation}
            onCalculate={calculateRoute}
            isCalculating={isCalculating}
          />
          
          {/* Results Area */}
          <div className="relative min-h-[100px] space-y-4">
            {travelTimes && (
              <TravelTimeDisplay 
                walkingTime={travelTimes.walking}
                scooterTime={travelTimes.scooter}
              />
            )}
            {elevationData && (
                <ElevationChart data={elevationData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
