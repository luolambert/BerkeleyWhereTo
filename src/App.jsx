import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { PreloadProvider } from './context/PreloadContext';
import { ErrorBoundary } from './components/common';
import { GitHubLink } from './components/presentational';
import { useDeviceType } from './hooks/useDeviceType';
import { useSEO } from './hooks/useSEO';
import * as TypeAViews from './views/typeA';
import * as TypeBViews from './views/typeB';
import { GOOGLE_MAPS_LIBRARIES } from './constants/mapConfig';

function AppContent({ isLoaded }) {
  const location = useLocation();
  const deviceType = useDeviceType();
  
  // Dynamic SEO updates based on current route
  useSEO();
  
  // Select views based on device type
  const Views = deviceType === 'typeA' ? TypeAViews : TypeBViews;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-50">
      <GitHubLink isGoPage={location.pathname === '/go'} />
      <LayoutGroup>
        <AnimatePresence mode="wait">
          <Routes location={location} key={`${location.pathname}-${deviceType}`}>
            <Route path="/" element={<RootRedirector Views={Views} />} />
            <Route 
              path="/go" 
              element={
                <ErrorBoundary>
                  <NavigationProvider isLoaded={isLoaded}>
                    <Views.NavigationPage isLoaded={isLoaded} />
                  </NavigationProvider>
                </ErrorBoundary>
              } 
            />
            <Route path="/know" element={
              <ErrorBoundary>
                <Views.InfoPage />
              </ErrorBoundary>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

function RootRedirector({ Views }) {
  const hostname = window.location.hostname;
  
  if (hostname.includes('berkeleywheretogo')) {
    return <Navigate to="/go" replace />;
  } 
  
  if (hostname.includes('berkeleywheretoknow')) {
    return <Navigate to="/know" replace />;
  }
  
  return <Views.LandingPage />;
}

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES
  });

  return (
    <PreloadProvider>
      <BrowserRouter>
        <AppContent isLoaded={isLoaded} />
      </BrowserRouter>
    </PreloadProvider>
  );
}

export default App;
