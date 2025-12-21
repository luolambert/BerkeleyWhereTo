import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

/**
 * HeaderContainer
 * Container component that manages state and navigation logic for Header
 * 
 * Responsibilities:
 * - Hover menu state management (isHovering)
 * - Timer management for open/close delays
 * - Navigation actions
 * - View-specific configuration
 * 
 * The Header component receives all data and callbacks as props.
 */
function HeaderContainer({
  currentView,
  hasResults = false,
  centered = false,
  hideTitle = false,
  hideSubtitle = false,
  compact = false,
  titleOpacity = 1,
  backgroundOpacity = 1,
}) {
  const [isHovering, setIsHovering] = React.useState(false);
  const closeTimeoutRef = React.useRef(null);
  const openTimeoutRef = React.useRef(null);
  const navigate = useNavigate();

  // Menu control handlers
  const openMenu = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 200);
  }, []);

  const cancelOpen = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }, []);

  const closeMenu = React.useCallback(() => {
    cancelOpen();
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 200);
  }, [cancelOpen]);

  // Navigation handler
  const handleNavigate = React.useCallback((route) => {
    navigate(route);
    setIsHovering(false);
  }, [navigate]);

  // View-specific configuration
  const isNavigation = currentView === 'navigation';
  const config = React.useMemo(() => ({
    mainLayoutId: isNavigation ? 'go-header' : 'know-header',
    dropdownLayoutId: isNavigation ? 'know-header' : 'go-header',
    mainTitle: isNavigation ? 'Where To Go' : 'Where To Know',
    mainSubtitle: isNavigation ? 'Campus Navigation' : 'Explore Buildings',
    dropdownTitle: isNavigation ? 'Where To Know' : 'Where To Go',
    dropdownSubtitle: isNavigation ? 'Explore Buildings' : 'Campus Navigation',
    dropdownTargetRoute: isNavigation ? '/know' : '/go',
  }), [isNavigation]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    };
  }, []);

  return (
    <Header
      currentView={currentView}
      hasResults={hasResults}
      centered={centered}
      hideTitle={hideTitle}
      hideSubtitle={hideSubtitle}
      compact={compact}
      titleOpacity={titleOpacity}
      backgroundOpacity={backgroundOpacity}
      isHovering={isHovering}
      config={config}
      onOpenMenu={openMenu}
      onCancelOpen={cancelOpen}
      onCloseMenu={closeMenu}
      onNavigate={handleNavigate}
    />
  );
}

export default HeaderContainer;
