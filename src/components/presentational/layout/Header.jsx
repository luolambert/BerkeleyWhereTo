import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoGo from '../../../assets/WhereToGo_Logo.png';
import logoKnow from '../../../assets/WhereToKnow_Logo.png';

/**
 * Header Component (Presentational)
 * Pure visual component - all state and logic handled by HeaderContainer
 * 
 * @param {string} currentView - 'navigation' | 'info'
 * @param {boolean} hasResults - Whether route results are displayed
 * @param {boolean} centered - Use centered layout (Know page)
 * @param {boolean} hideTitle - Hide title text
 * @param {boolean} hideSubtitle - Hide subtitle text
 * @param {boolean} compact - Use compact layout
 * @param {number} titleOpacity - Title opacity (0-1)
 * @param {number} backgroundOpacity - Background opacity (0-1)
 * @param {boolean} isHovering - Whether dropdown is showing
 * @param {object} config - View configuration { mainLayoutId, dropdownLayoutId, mainTitle, mainSubtitle, dropdownTitle, dropdownSubtitle, dropdownTargetRoute }
 * @param {function} onOpenMenu - Callback when hover starts
 * @param {function} onCancelOpen - Callback when hover cancelled
 * @param {function} onCloseMenu - Callback when hover ends
 * @param {function} onNavigate - Callback for navigation (receives route)
 */
function Header({ 
  currentView, 
  hasResults = false, 
  centered = false, 
  hideTitle = false, 
  hideSubtitle = false, 
  compact = false, 
  titleOpacity = 1, 
  backgroundOpacity = 1,
  isHovering = false,
  config,
  onOpenMenu,
  onCancelOpen,
  onCloseMenu,
  onNavigate
}) {
  const isNavigation = currentView === 'navigation';
  
  // Use config from props or derive from currentView for backward compatibility
  const mainLayoutId = config?.mainLayoutId || (isNavigation ? 'go-header' : 'know-header');
  const dropdownLayoutId = config?.dropdownLayoutId || (isNavigation ? 'know-header' : 'go-header');
  const mainTitle = config?.mainTitle || (isNavigation ? 'Where To Go' : 'Where To Know');
  const mainSubtitle = config?.mainSubtitle || (isNavigation ? 'Campus Navigation' : 'Explore Buildings');
  const dropdownTitle = config?.dropdownTitle || (isNavigation ? 'Where To Know' : 'Where To Go');
  const dropdownSubtitle = config?.dropdownSubtitle || (isNavigation ? 'Explore Buildings' : 'Campus Navigation');
  const dropdownTargetRoute = config?.dropdownTargetRoute || (isNavigation ? '/know' : '/go');

  // Logos
  const mainLogo = isNavigation ? logoGo : logoKnow;
  const dropdownLogo = isNavigation ? logoKnow : logoGo;

  // Helper to determine if subtitle should be gray/arrowless
  const isExploreSubtitle = (subtitle) => subtitle === 'Explore Buildings';

  // Handler wrappers
  const handleCloseMenu = onCloseMenu || (() => {});
  const handleOpenMenu = onOpenMenu || (() => {});
  const handleCancelOpen = onCancelOpen || (() => {});
  const handleNavigate = onNavigate || (() => {});

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${compact ? 'w-auto' : 'w-full'} relative z-50 ${centered ? 'flex justify-center items-start pt-6' : ''} ${compact ? '!pt-0' : ''}`}
    >
      <div 
        className={`relative ${centered ? 'inline-flex items-center' : ''} ${compact ? 'flex items-center' : ''}`}
        onMouseLeave={handleCloseMenu}
      >
        {/* Background Layer */}
        <motion.div 
            layoutId={`${mainLayoutId}-bg`}
            style={{ opacity: backgroundOpacity }}
            className={
                (centered || compact)
                ? "fixed inset-0 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white/0 z-0 pointer-events-none"
                : "absolute inset-0 glass rounded-2xl shadow-2xl shadow-neutral-900/30 bg-white/95 backdrop-blur-xl border border-neutral-200/60 z-0"
            }
            transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1]
            }}
        />

        {/* Content Layer */}
        <motion.div 
            layoutId={`${mainLayoutId}-content`}
            className={`relative z-20 transition-[padding] duration-200
                ${centered 
                    ? 'flex items-center gap-6 justify-center'
                    : compact 
                        ? 'flex items-center gap-4'
                        : 'px-6 py-4 flex items-center gap-4'
                }
            `}
        >
            {/* Logo - Hover Trigger */}
            <motion.div 
                layoutId={`${mainLayoutId}-logo`}
                className={`flex items-center justify-center shrink-0 cursor-pointer ${centered ? 'w-20 h-20' : 'w-10 h-10'}`}
                onMouseEnter={handleOpenMenu}
                onMouseLeave={handleCancelOpen}
            >
                <img src={mainLogo} alt="App Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </motion.div>

            <motion.div 
              className={`min-w-0 ${centered ? 'text-left' : ''} ${hideTitle ? 'hidden' : 'block'}`}
              style={{ opacity: titleOpacity }}
            >
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
                        ${hideSubtitle ? 'hidden' : 'block'}
                    `}
                >
                    {mainSubtitle}
                </motion.p>
            </motion.div>
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
                        ? (hasResults ? { opacity: 0, x: -10 } : { opacity: 0, x: 10 })
                        : { opacity: 0, x: 10, scale: 0.95 }
                    }
                    transition={!centered ? { duration: 0.2 } : { type: "spring", stiffness: 400, damping: 30 }}
                    
                    onMouseEnter={handleOpenMenu}
                    onClick={() => handleNavigate(dropdownTargetRoute)}
                    className={`absolute glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-neutral-900/30 bg-white/95 backdrop-blur-xl border border-neutral-200/60 z-10 text-left hover:bg-white transition-colors
                        ${centered
                            ? 'right-full top-1/2 -translate-y-1/2 mr-4 w-full max-w-sm'
                            : hasResults 
                                ? 'top-0 left-full ml-4 w-full'
                                : 'bottom-full left-0 mb-2 w-full'
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
