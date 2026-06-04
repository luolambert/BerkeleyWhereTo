import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { buildings } from '../data/buildings';
import { buildings as advancedBuildings } from '../data/advanced_building';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/appConfig';
import { calculateTravelTime } from '../services/mapService';

// Combine buildings for lookup
const ALL_BUILDINGS = [...buildings, ...advancedBuildings];

/**
 * Initial navigation state
 */
const initialState = {
  startLocation: '',
  endLocation: '',
  travelTimes: null,
  isCalculating: false,
  routePoints: null,
  elevationData: null,
  activeField: null, // 'start' | 'end' | null
  language: DEFAULT_LANGUAGE, // 'CN' | 'EN'
};

/**
 * NavigationContext
 * Manages all navigation states to eliminate prop drilling
 */
const NavigationContext = createContext(null);

/**
 * NavigationProvider
 * Wraps the app to provide navigation state and methods
 */
export function NavigationProvider({ children, isLoaded }) {
  const [startLocation, setStartLocation] = useState(initialState.startLocation);
  const [endLocation, setEndLocation] = useState(initialState.endLocation);
  const [travelTimes, setTravelTimes] = useState(initialState.travelTimes);
  const [isCalculating, setIsCalculating] = useState(initialState.isCalculating);
  const [routePoints, setRoutePoints] = useState(initialState.routePoints);
  const [elevationData, setElevationData] = useState(initialState.elevationData);
  const [activeField, setActiveField] = useState(initialState.activeField);
  const [language, setLanguage] = useState(initialState.language);
  const routeRequestIdRef = useRef(0);

  // Toggle language
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === SUPPORTED_LANGUAGES.CN ? SUPPORTED_LANGUAGES.EN : SUPPORTED_LANGUAGES.CN);
  }, []);

  // Calculate route - uses mapService for API calls
  const calculateRoute = useCallback(async () => {
    if (!startLocation || !endLocation || !isLoaded) return;

    const requestId = routeRequestIdRef.current + 1;
    routeRequestIdRef.current = requestId;

    setIsCalculating(true);
    setTravelTimes(null);
    setElevationData(null);
    
    const startBuilding = ALL_BUILDINGS.find(b => b.name === startLocation);
    const endBuilding = ALL_BUILDINGS.find(b => b.name === endLocation);

    if (!startBuilding || !endBuilding) {
      console.error('Invalid building selection');
      if (routeRequestIdRef.current === requestId) {
        setIsCalculating(false);
        setTravelTimes(null);
      }
      return;
    }

    setRoutePoints({ start: startBuilding, end: endBuilding });

    try {
      // Use mapService to eliminate code duplication
      const travelTime = await calculateTravelTime(
        { lat: startBuilding.lat, lng: startBuilding.lng },
        { lat: endBuilding.lat, lng: endBuilding.lng }
      );
      if (routeRequestIdRef.current === requestId) {
        setTravelTimes(travelTime);
      }
    } catch (error) {
      console.error('Route calculation failed:', error.message);
      if (routeRequestIdRef.current === requestId) {
        setTravelTimes(null);
      }
    } finally {
      if (routeRequestIdRef.current === requestId) {
        setIsCalculating(false);
      }
    }
  }, [startLocation, endLocation, isLoaded]);

  // Reset all states
  const resetNavigation = useCallback(() => {
    setStartLocation('');
    setEndLocation('');
    setTravelTimes(null);
    setRoutePoints(null);
    setElevationData(null);
    setActiveField(null);
    setIsCalculating(false);
  }, []);

  // Toggle input field focus state
  const toggleField = useCallback((field) => {
    setActiveField(current => current === field ? null : field);
  }, []);

  // Select building and close panel
  const selectBuilding = useCallback((buildingName) => {
    if (activeField === 'start') {
      setStartLocation(buildingName);
    } else if (activeField === 'end') {
      setEndLocation(buildingName);
    }
    setActiveField(null);
  }, [activeField]);

  const value = {
    // State
    startLocation,
    endLocation,
    travelTimes,
    isCalculating,
    routePoints,
    elevationData,
    activeField,
    language,
    
    // Setters (Keep only necessary ones)
    setStartLocation,
    setEndLocation,
    setElevationData,
    
    // Methods
    calculateRoute,
    resetNavigation,
    toggleField,
    selectBuilding,
    toggleLanguage,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * useNavigation Hook
 * Consumes navigation state and methods in components
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export default NavigationContext;
