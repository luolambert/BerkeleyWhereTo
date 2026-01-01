import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  processElevationData, 
  createColoredSegments, 
  calculateMarkerPlacements 
} from '../services/mapService';
import { 
  BERKELEY_CENTER, 
  DEFAULT_ZOOM, 
  ELEVATION_SAMPLES,
  ROUTE_STYLE 
} from '../constants/mapConfig';

/**
 * useMapRoute Hook
 * Manages map routing, directions, and elevation data
 * 
 * @param {boolean} isLoaded - Google Maps API loaded status
 * @param {object} routePoints - { start, end } building objects
 * @param {function} onElevationLoaded - Callback when elevation data is ready
 */
function useMapRoute(isLoaded, routePoints, onElevationLoaded) {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [placements, setPlacements] = useState({ start: 'top', end: 'top' });
  const [coloredSegments, setColoredSegments] = useState([]);
  
  const directionsRendererRef = useRef(null);
  const polylinesRef = useRef([]);

  // Map load/unload callbacks
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    if (polylinesRef.current) {
      polylinesRef.current.forEach(polyline => polyline.setMap(null));
      polylinesRef.current = [];
    }
    setMap(null);
  }, []);

  // Fetch route and elevation data
  useEffect(() => {
    let isCancelled = false;

    if (isLoaded && routePoints?.start && routePoints?.end) {
      setError(null);
      if (onElevationLoaded) onElevationLoaded(null);

      const directionsService = new window.google.maps.DirectionsService();
      const elevationService = new window.google.maps.ElevationService();

      directionsService.route(
        {
          origin: { lat: routePoints.start.lat, lng: routePoints.start.lng },
          destination: { lat: routePoints.end.lat, lng: routePoints.end.lng },
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (isCancelled) return;

          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = result.routes[0];
            const path = route.overview_path;
            
            // Calculate marker placements
            setPlacements(calculateMarkerPlacements(path));

            // Fetch elevation data
            elevationService.getElevationAlongPath(
              { path, samples: ELEVATION_SAMPLES },
              (elevationResults, elevationStatus) => {
                if (isCancelled) return;

                let newColoredSegments = [];
                let newElevationData = null;

                if (elevationStatus === 'OK') {
                  const processedData = processElevationData(elevationResults);
                  newElevationData = processedData;
                  newColoredSegments = createColoredSegments(processedData);
                } else {
                  console.warn("Elevation request failed:", elevationStatus);
                }

                if (onElevationLoaded) onElevationLoaded(newElevationData);
                setColoredSegments(newColoredSegments);
                setDirections(result);
              }
            );
          } else {
            console.error(`Directions request failed: ${status}`);
            setDirections(null);
            setError(`Directions failed: ${status}`);
          }
        }
      );
    } else {
      // Reset state when no route
      setDirections(null);
      setError(null);
      setColoredSegments([]);
      if (onElevationLoaded) onElevationLoaded(null);
      
      if (map) {
        // Adjust for mobile Drawer offset
        const isMobile = window.innerWidth < 640;
        if (isMobile) {
          // Create bounds around Berkeley center to use fitBounds with padding
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(BERKELEY_CENTER);
          bounds.extend({ lat: BERKELEY_CENTER.lat + 0.005, lng: BERKELEY_CENTER.lng + 0.005 });
          bounds.extend({ lat: BERKELEY_CENTER.lat - 0.005, lng: BERKELEY_CENTER.lng - 0.005 });
          
          const viewportHeight = window.innerHeight;
          map.fitBounds(bounds, {
            top: 80,
            right: 50,
            bottom: Math.round(viewportHeight * 0.55) + 50,
            left: 50
          });
        } else {
          map.panTo(BERKELEY_CENTER);
          map.setZoom(DEFAULT_ZOOM);
        }
      }
    }

    return () => { isCancelled = true; };
  }, [isLoaded, routePoints, onElevationLoaded, map]);

  // Fit bounds when directions change
  useEffect(() => {
    if (map && directions?.routes[0]?.overview_path) {
      const bounds = new window.google.maps.LatLngBounds();
      directions.routes[0].overview_path.forEach(point => bounds.extend(point));
      
      // Responsive padding considering UI overlays
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 640;
      const viewportHeight = window.innerHeight;

      let padding = { top: 50, right: 50, bottom: 50, left: 50 };
      if (isDesktop) {
        padding.left = 600;
      } else if (isTablet) {
        padding.left = 430;
      } else {
        // Mobile: bottom Drawer takes ~55vh, add extra padding
        padding.bottom = Math.round(viewportHeight * 0.55) + 50;
        padding.top = 80;
      }

      map.fitBounds(bounds, padding);
    }
  }, [map, directions]);

  // Manage DirectionsRenderer and Polylines
  useEffect(() => {
    if (!map) return;

    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
        map: map,
        polylineOptions: ROUTE_STYLE
      });
    }

    const renderer = directionsRendererRef.current;

    if (directions) {
      renderer.setDirections(directions);
      // Hide default line if we have colored segments
      const opacity = coloredSegments.length > 0 ? 0 : ROUTE_STYLE.strokeOpacity;
      renderer.setOptions({
        polylineOptions: { ...ROUTE_STYLE, strokeOpacity: opacity }
      });
    } else {
      renderer.setDirections({ routes: [] });
    }

    if (polylinesRef.current) {
      polylinesRef.current.forEach(polyline => polyline.setMap(null));
      polylinesRef.current = [];
    }

    if (coloredSegments.length > 0) {
      const newPolylines = coloredSegments.map(segment => {
        return new window.google.maps.Polyline({
          path: segment.path,
          strokeColor: segment.color,
          strokeWeight: ROUTE_STYLE.strokeWeight,
          strokeOpacity: 1.0,
          zIndex: 10,
          map: map
        });
      });
      polylinesRef.current = newPolylines;
    }
  }, [map, directions, coloredSegments]);

  return {
    map,
    directions,
    error,
    placements,
    coloredSegments,
    onLoad,
    onUnmount,
  };
}

export default useMapRoute;
