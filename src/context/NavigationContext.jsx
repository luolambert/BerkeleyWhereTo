import React, { createContext, useContext, useState, useCallback } from 'react';
import { buildings } from '../data/buildings';
import { buildings as advancedBuildings } from '../data/advanced_building';

// Combine buildings for lookup
const ALL_BUILDINGS = [...buildings, ...advancedBuildings];

/**
 * 导航状态初始值
 */
const initialState = {
  startLocation: '',
  endLocation: '',
  travelTimes: null,
  isCalculating: false,
  routePoints: null,
  elevationData: null,
  activeField: null, // 'start' | 'end' | null
};

/**
 * NavigationContext
 * 管理导航页面的所有状态，消除 prop drilling
 */
const NavigationContext = createContext(null);

/**
 * NavigationProvider
 * 包装应用，提供导航状态和方法
 */
export function NavigationProvider({ children, isLoaded }) {
  const [startLocation, setStartLocation] = useState(initialState.startLocation);
  const [endLocation, setEndLocation] = useState(initialState.endLocation);
  const [travelTimes, setTravelTimes] = useState(initialState.travelTimes);
  const [isCalculating, setIsCalculating] = useState(initialState.isCalculating);
  const [routePoints, setRoutePoints] = useState(initialState.routePoints);
  const [elevationData, setElevationData] = useState(initialState.elevationData);
  const [activeField, setActiveField] = useState(initialState.activeField);

  // 计算路线
  const calculateRoute = useCallback(async () => {
    if (!startLocation || !endLocation || !isLoaded) return;

    setIsCalculating(true);
    setElevationData(null);
    
    const startBuilding = ALL_BUILDINGS.find(b => b.name === startLocation);
    const endBuilding = ALL_BUILDINGS.find(b => b.name === endLocation);

    if (!startBuilding || !endBuilding) {
      alert("Please select valid buildings from the list.");
      setIsCalculating(false);
      return;
    }

    setRoutePoints({ start: startBuilding, end: endBuilding });

    const service = new window.google.maps.DistanceMatrixService();
    
    try {
      const result = await service.getDistanceMatrix({
        origins: [{ lat: startBuilding.lat, lng: startBuilding.lng }],
        destinations: [{ lat: endBuilding.lat, lng: endBuilding.lng }],
        travelMode: window.google.maps.TravelMode.WALKING,
      });

      if (result.rows[0].elements[0].status === "OK") {
        const walkingDuration = result.rows[0].elements[0].duration.value;
        const walkingMin = Math.round(walkingDuration / 60);
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

  // 重置所有状态
  const resetNavigation = useCallback(() => {
    setStartLocation('');
    setEndLocation('');
    setTravelTimes(null);
    setRoutePoints(null);
    setElevationData(null);
    setActiveField(null);
    setIsCalculating(false);
  }, []);

  // 切换输入框激活状态
  const toggleField = useCallback((field) => {
    setActiveField(current => current === field ? null : field);
  }, []);

  // 选择建筑并关闭面板
  const selectBuilding = useCallback((buildingName) => {
    if (activeField === 'start') {
      setStartLocation(buildingName);
    } else if (activeField === 'end') {
      setEndLocation(buildingName);
    }
    setActiveField(null);
  }, [activeField]);

  const value = {
    // 状态
    startLocation,
    endLocation,
    travelTimes,
    isCalculating,
    routePoints,
    elevationData,
    activeField,
    
    // Setters（仅保留必要的）
    setStartLocation,
    setEndLocation,
    setElevationData,
    
    // 方法
    calculateRoute,
    resetNavigation,
    toggleField,
    selectBuilding,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * useNavigation Hook
 * 在组件中使用导航状态和方法
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export default NavigationContext;
