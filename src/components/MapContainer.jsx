import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useNavigation } from '../context/NavigationContext';
import { CustomMarker, MapLegend } from './map';
import useMapRoute from '../hooks/useMapRoute';
import { BERKELEY_CENTER, DEFAULT_ZOOM, MAP_OPTIONS } from '../constants/mapConfig';

const containerStyle = {
  width: '100%',
  height: '100%'
};

/**
 * MapContainer Component
 * Displays Google Map with route visualization and elevation-based coloring
 * 
 * @param {boolean} hideLegend - Hide the slope legend (for TypeA where legend is in Drawer)
 */
function MapContainer({ isLoaded, routePoints, onElevationLoaded, hideLegend = false, mapLoadError = null }) {
  const { language } = useNavigation();
  
  const {
    directions,
    error,
    placements,
    coloredSegments,
    onLoad,
    onUnmount,
  } = useMapRoute(isLoaded, routePoints, onElevationLoaded);

  if (mapLoadError) {
    return (
      <div className="w-full h-full bg-red-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-sm">
          <p className="text-red-700 text-lg font-semibold">Map unavailable</p>
          <p className="text-red-600 text-sm mt-2">
            Google Maps could not be loaded. Check the API key, network, or quota.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-gray-500 text-lg font-medium">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={BERKELEY_CENTER}
      zoom={DEFAULT_ZOOM}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={MAP_OPTIONS}
    >
      {directions && routePoints && (
        <>
          <CustomMarker 
            position={directions.routes[0].legs[0].start_location}
            label={routePoints.start.name}
            type="start"
            placement={placements.start}
          />
          <CustomMarker 
            position={directions.routes[0].legs[0].end_location}
            label={routePoints.end.name}
            type="end"
            placement={placements.end}
          />
        </>
      )}
      
      {/* Only show legend when not hidden and has colored segments */}
      {!hideLegend && directions && coloredSegments.length > 0 && (
        <MapLegend language={language} />
      )}

      {error && (
        <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </GoogleMap>
  );
}

export default MapContainer;
