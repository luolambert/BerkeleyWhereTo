import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGo from '../assets/WhereToGo_Logo.png';
import logoKnow from '../assets/WhereToKnow_Logo.png';

function Header({ onNavigate, currentView, hasResults, centered = false }) {
  const [isHovering, setIsHovering] = React.useState(false);
  const closeTimeoutRef = React.useRef(null);
  const openTimeoutRef = React.useRef(null);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Add 0.2s delay before opening
    openTimeoutRef.current = setTimeout(() => {
        setIsHovering(true);
    }, 200);
  };

  const cancelOpen = () => {
      if (openTimeoutRef.current) {
          clearTimeout(openTimeoutRef.current);
          openTimeoutRef.current = null;
      }
  };

  const closeMenu = () => {
    cancelOpen(); // Cancel any pending open
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 200);
  };

  const isNavigation = currentView === 'navigation';
  
  // Layout IDs for morphing
  const mainLayoutId = isNavigation ? 'go-header' : 'know-header';
  const dropdownLayoutId = isNavigation ? 'know-header' : 'go-header';

  // Content
  const mainTitle = isNavigation ? 'Where To Go' : 'Where To Know';
  const mainSubtitle = isNavigation ? 'Campus Navigation' : 'Explore Buildings';
  
  const dropdownTitle = isNavigation ? 'Where To Know' : 'Where To Go';
  const dropdownSubtitle = isNavigation ? 'Explore Buildings' : 'Campus Navigation';
  const dropdownTargetView = isNavigation ? 'info' : 'navigation';

  // Logos
  const mainLogo = isNavigation ? logoGo : logoKnow;
  const dropdownLogo = isNavigation ? logoKnow : logoGo;

  // Helper to determine if subtitle should be gray/arrowless (Explore Buildings)
  const isExploreSubtitle = (subtitle) => subtitle === 'Explore Buildings';

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full relative z-50 ${centered ? 'flex justify-center items-start pt-12' : ''}`}
    >
      <div 
        className={`relative ${centered ? 'inline-flex items-center' : ''}`}
        onMouseLeave={closeMenu}
      >
        {/* 
            Background Layer - The "Expanding" Effect 
            Separated from content to allow it to scale independently
        */}
        <motion.div 
            layoutId={`${mainLayoutId}-bg`}
            className={
                centered 
                ? "fixed inset-0 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white/0 z-0 pointer-events-none" // Know View: Massive, transparent, centered
                : "absolute inset-0 glass rounded-2xl shadow-xl shadow-primary-900/10 bg-white/90 backdrop-blur-md border border-white/20 z-0" // Go View: Standard Panel
            }
            transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] // Smooth "Apple-like" ease
            }}
        />

        {/* 
            Content Layer - Smooth Translation
            Sits on top of the background
        */}
        <motion.div 
            layoutId={`${mainLayoutId}-content`}
            className={`relative z-20 transition-all duration-300
                ${centered 
                    ? 'flex items-center gap-6 justify-center' // Know View: Row, Centered Content
                    : 'px-6 py-4 flex items-center gap-4' // Go View: Padding inside the glass panel
                }
            `}
        >
            {/* Logo - Hover Trigger */}
            <motion.div 
                layoutId={`${mainLayoutId}-logo`}
                className={`flex items-center justify-center shrink-0 cursor-pointer ${centered ? 'w-20 h-20' : 'w-10 h-10'}`}
                onMouseEnter={openMenu}
                onMouseLeave={cancelOpen}
            >
                <img src={mainLogo} alt="App Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </motion.div>

            <div className={`min-w-0 ${centered ? 'text-left' : ''}`}>
                <motion.h1 
                    layoutId={`${mainLayoutId}-title`}
                    className={`font-bold text-neutral-800 tracking-tight leading-tight whitespace-nowrap overflow-hidden text-ellipsis
                        ${centered ? 'text-4xl' : 'text-xl'}
                    `}
                >
                Berkeley <span className="text-primary-600">{mainTitle}</span>
                </motion.h1>
                <motion.p 
                    layoutId={`${mainLayoutId}-subtitle`}
                    className={`font-medium truncate
                        ${centered ? 'text-lg' : 'text-xs'}
                        ${isExploreSubtitle(mainSubtitle) ? 'text-neutral-500' : 'text-neutral-500'}
                    `}
                >
                    {mainSubtitle}
                </motion.p>
            </div>
        </motion.div>

        {/* Dropdown Bar */}
        <AnimatePresence>
            {isHovering && (
                <motion.button
                    layoutId={dropdownLayoutId}
                    initial={!centered 
                        ? (hasResults ? { opacity: 0, x: -10 } : { opacity: 0, x: 10 }) 
                        : { opacity: 0, x: 10, scale: 0.95 }
                    }
                    animate={!centered
                        ? (hasResults ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 })
                        : { opacity: 1, x: 0, scale: 1 }
                    }
                    exit={!centered
                        ? (hasResults ? { opacity: 0, x: -10 } : { opacity: 0, x: 10 }) // Exit to right (towards logo)
                        : { opacity: 0, x: 10, scale: 0.95 }
                    }
                    transition={!centered ? { duration: 0.2 } : { type: "spring", stiffness: 400, damping: 30 }}
                    
                    onMouseEnter={openMenu}
                    onClick={() => {
                        onNavigate(dropdownTargetView);
                        setIsHovering(false);
                    }}
                    className={`absolute glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl shadow-primary-900/10 bg-white/95 backdrop-blur-md border border-white/20 z-10 text-left hover:bg-white transition-colors
                        ${centered
                            ? 'right-full top-1/2 -translate-y-1/2 mr-4 w-full max-w-sm' // Know View: Left of content, vertically centered
                            : hasResults 
                                ? 'top-0 left-full ml-4 w-full' // Go View (Results): Side
                                : 'bottom-full left-0 mb-2 w-full' // Go View (Default): Above
                        }
                    `}
                >
                    <motion.div 
                        layoutId={`${dropdownLayoutId}-logo`}
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                    >
                        <img src={dropdownLogo} alt="App Logo" className="w-full h-full object-contain drop-shadow-sm" />
                    </motion.div>
                    <div className="min-w-0">
                        <motion.h1 
                            layoutId={`${dropdownLayoutId}-title`}
                            className="text-xl font-bold text-neutral-800 tracking-tight leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                        Berkeley <span className="text-primary-600">{dropdownTitle}</span>
                        </motion.h1>
                        <motion.p 
                            layoutId={`${dropdownLayoutId}-subtitle`}
                            className={`text-xs font-medium truncate flex items-center gap-1
                                ${isExploreSubtitle(dropdownSubtitle) ? 'text-neutral-500' : 'text-primary-600'}
                            `}
                        >
                            {dropdownSubtitle} 
                            {!isExploreSubtitle(dropdownSubtitle) && !centered && <span>&rarr;</span>}
                        </motion.p>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;
