import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { PreloadProvider } from './context/PreloadContext';
import { ErrorBoundary, GitHubLink } from './components/common';
import NavigationPage from './views/NavigationPage';
import InfoPage from './views/InfoPage';
import LandingPage from './views/LandingPage';

const LIBRARIES = ['places', 'geometry'];

function AppContent({ isLoaded }) {
  const location = useLocation();

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
      document.title = 'Berkeley Where To';
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = '/WhereToGo_Logo.png';
    }
  }, [location.pathname]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-50">
      <GitHubLink />
      <LayoutGroup>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<RootRedirector />} />
            <Route 
              path="/go" 
              element={
                <ErrorBoundary>
                  <NavigationProvider isLoaded={isLoaded}>
                    <NavigationPage isLoaded={isLoaded} />
                  </NavigationProvider>
                </ErrorBoundary>
              } 
            />
            <Route path="/know" element={
              <ErrorBoundary>
                <InfoPage />
              </ErrorBoundary>
            } />
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

  return (
    <PreloadProvider>
      <BrowserRouter>
        <AppContent isLoaded={isLoaded} />
      </BrowserRouter>
    </PreloadProvider>
  );
}

export default App;
