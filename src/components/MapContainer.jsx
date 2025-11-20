import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, DirectionsRenderer, OverlayView } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 37.8715, // Berkeley coordinates
  lng: -122.2600
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "poi.school",
      elementType: "geometry",
      stylers: [{ color: "#fdb515" }] // Berkeley Gold for schools
    }
  ]
};

const CustomMarker = ({ position, label, type, placement = 'top' }) => {
  const getPixelPositionOffset = (width, height) => {
    // Adjust offset based on placement
    // The dot is 12px (h-3). We want the dot to be centered/anchored at the position.
    if (placement === 'top') {
      // Container: Label -> Arrow -> Dot
      // Anchor is at the bottom of the container (Dot)
      return { x: -(width / 2), y: -(height - 6) }; // Shift up by height, adjust for dot center
    } else {
      // Container: Dot -> Arrow -> Label
      // Anchor is at the top of the container (Dot)
      return { x: -(width / 2), y: -6 }; // Shift up slightly to center the dot
    }
  };

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className="flex flex-col items-center transform transition-transform hover:scale-110 z-50">
        {placement === 'top' ? (
          <>
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 mb-0 whitespace-nowrap">
                <div className={`w-3 h-3 rounded-full ${type === 'start' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-bold text-gray-800 text-sm">{label}</span>
            </div>
            <div className={`w-4 h-4 transform rotate-45 -mt-2 border-r border-b border-gray-100 bg-white z-10`}></div>
            <div className={`w-3 h-3 rounded-full -mt-2 ${type === 'start' ? 'bg-green-500' : 'bg-red-500'} ring-4 ring-white shadow-sm z-20`}></div>
          </>
        ) : (
          <>
            <div className={`w-3 h-3 rounded-full -mb-2 ${type === 'start' ? 'bg-green-500' : 'bg-red-500'} ring-4 ring-white shadow-sm z-20`}></div>
            <div className={`w-4 h-4 transform rotate-45 -mb-2 border-l border-t border-gray-100 bg-white z-10`}></div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 mt-0 whitespace-nowrap">
                <div className={`w-3 h-3 rounded-full ${type === 'start' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-bold text-gray-800 text-sm">{label}</span>
            </div>
          </>
        )}
      </div>
    </OverlayView>
  );
};

const MapContainer = ({ isLoaded, routePoints, onElevationLoaded }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [placements, setPlacements] = useState({ start: 'top', end: 'top' });
  const [coloredSegments, setColoredSegments] = useState([]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    if (isLoaded && routePoints && routePoints.start && routePoints.end) {
      const directionsService = new window.google.maps.DirectionsService();
      const elevationService = new window.google.maps.ElevationService();

      directionsService.route(
        {
          origin: { lat: routePoints.start.lat, lng: routePoints.start.lng },
          destination: { lat: routePoints.end.lat, lng: routePoints.end.lng },
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setError(null);

            // Calculate placements
            const route = result.routes[0];
            const path = route.overview_path;
            
            let startPlace = 'top';
            let endPlace = 'top';

            if (path && path.length > 1) {
                const startNode = path[0];
                const nextNode = path[1];
                if (nextNode.lat() > startNode.lat()) startPlace = 'bottom';

                const endNode = path[path.length - 1];
                const prevNode = path[path.length - 2];
                if (endNode.lat() > prevNode.lat()) {
                    endPlace = 'top';
                } else {
                    endPlace = 'bottom';
                }
            }
            setPlacements({ start: startPlace, end: endPlace });

            // Fetch Elevation Data
            elevationService.getElevationAlongPath({
                path: path,
                samples: 256
            }, (elevationResults, elevationStatus) => {
                if (elevationStatus === 'OK') {
                    // Process elevation data
                    let cumulativeDistance = 0;
                    const processedData = elevationResults.map((point, index) => {
                        if (index > 0) {
                            const prev = elevationResults[index - 1].location;
                            const curr = point.location;
                            const dist = window.google.maps.geometry.spherical.computeDistanceBetween(prev, curr);
                            cumulativeDistance += dist;
                        }
                        return {
                            distance: cumulativeDistance,
                            elevation: point.elevation,
                            location: point.location
                        };
                    });

                    // Pass data up to parent for the chart
                    if (onElevationLoaded) {
                        onElevationLoaded(processedData);
                    }

                    // Create Colored Segments with Merging
                    const segments = [];
                    let currentPath = [];
                    let currentColor = null;

                    for (let i = 0; i < processedData.length - 1; i++) {
                        const p1 = processedData[i];
                        const p2 = processedData[i+1];
                        const dist = p2.distance - p1.distance;
                        const rise = p2.elevation - p1.elevation;
                        
                        const slope = dist > 0 ? (rise / dist) * 100 : 0; 
                        
                        // Monochromatic Blue Scale
                        let color = '#93C5FD'; // Blue-300 (Flat/Easy) < 3%
                        if (Math.abs(slope) > 8) {
                            color = '#1E3A8A'; // Blue-900 (Steep) > 8%
                        } else if (Math.abs(slope) > 3) {
                            color = '#2563EB'; // Blue-600 (Moderate) 3-8%
                        }

                        if (currentColor === null) {
                            currentColor = color;
                            currentPath.push(p1.location);
                            currentPath.push(p2.location);
                        } else if (color === currentColor) {
                            // Continue current segment
                            currentPath.push(p2.location);
                        } else {
                            // End current segment and start new one
                            segments.push({
                                path: currentPath,
                                color: currentColor
                            });
                            // Start new segment from the last point to ensure continuity
                            currentPath = [p1.location, p2.location];
                            currentColor = color;
                        }
                    }
                    
                    // Push the final segment
                    if (currentPath.length > 1) {
                        segments.push({
                            path: currentPath,
                            color: currentColor
                        });
                    }
                    
                    setColoredSegments(segments);

                } else {
                    console.warn("Elevation request failed:", elevationStatus);
                }
            });

          } else {
            console.error(`Directions request failed: ${status}`, result);
            setDirections(null);
            setError(`Directions failed: ${status}`);
          }
        }
      );
    } else {
        setDirections(null);
        setError(null);
        setColoredSegments([]);
        if (onElevationLoaded) onElevationLoaded(null);
    }
  }, [isLoaded, routePoints, onElevationLoaded]);

  React.useEffect(() => {
    if (map && directions && directions.routes[0].bounds) {
      map.fitBounds(directions.routes[0].bounds);
    }
  }, [map, directions]);

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
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {directions && (
        <>
            {/* Colored Route Segments */}
            {coloredSegments.length > 0 ? (
                coloredSegments.map((segment, index) => (
                    <Polyline
                        key={index}
                        path={segment.path}
                        options={{
                            strokeColor: segment.color,
                            strokeWeight: 8,
                            strokeOpacity: 1.0,
                            zIndex: 10, // Ensure it sits on top
                        }}
                    />
                ))
            ) : (
                // Fallback if elevation fails
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        suppressMarkers: true,
                        polylineOptions: {
                            strokeColor: "#3B82F6",
                            strokeWeight: 8,
                            strokeOpacity: 0.8,
                        },
                        preserveViewport: false 
                    }}
                />
            )}

            {/* Custom Start Marker */}
            <CustomMarker 
                position={directions.routes[0].legs[0].start_location}
                label={routePoints.start.name}
                type="start"
                placement={placements.start}
            />
            {/* Custom End Marker */}
            <CustomMarker 
                position={directions.routes[0].legs[0].end_location}
                label={routePoints.end.name}
                type="end"
                placement={placements.end}
            />
        </>
      )}
      
      {/* Legend - Moved to avoid zoom controls */}
      {coloredSegments.length > 0 && (
          <div className="absolute bottom-8 right-16 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 z-50">
              <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Slope Intensity</h4>
              <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                      <div className="w-6 h-2 bg-blue-300 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-600">Flat (&lt;3%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-600">Moderate (3-8%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-6 h-2 bg-blue-900 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-600">Steep (&gt;8%)</span>
                  </div>
              </div>
          </div>
      )}

      {error && (
        <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}
    </GoogleMap>
  );
};

export default MapContainer;
