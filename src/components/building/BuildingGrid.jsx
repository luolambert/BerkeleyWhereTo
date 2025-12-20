import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useScroll, useTransform } from 'framer-motion';
import Header from '../Header';

/**
 * Building Grid Component
 * Displays a list of building cards with support for categorization and dynamic scrolling
 */
function BuildingGrid({ 
  sections, 
  onSelect, 
  language, 
  onToggleLanguage, 
  sortMethod, 
  onSortChange, 
  slideDirection, 
  currentView 
}) {
  const scrollRef = React.useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  const SCROLL_RANGE = 150;

  // Use a single progress value as base
  const scrollProgress = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1]);
  
  // Header container animations - Derived from scrollProgress
  const headerHeight = useTransform(scrollProgress, [0, 1], [160, 60]);
  const headerPaddingTop = useTransform(scrollProgress, [0, 1], [24, 12]);
  const headerPaddingBottom = useTransform(scrollProgress, [0, 1], [16, 12]);
  
  // Background effects
  const bgOpacity = useTransform(scrollProgress, [0, 1], [0, 0.9]);

  // Title fade out faster
  const titleOpacity = useTransform(scrollProgress, [0, 0.4], [1, 0]);

  // Logo transformations
  const logoScale = useTransform(scrollProgress, [0, 1], [1, 0.8]);
  const logoTop = useTransform(scrollProgress, [0, 1], ["-4px", "50%"]);
  const logoLeft = useTransform(scrollProgress, [0, 1], ["50%", "0%"]);
  const logoX = useTransform(scrollProgress, [0, 1], ["-50%", "0%"]);
  const logoY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  // Subtitle transformations
  const subtitleFontSize = useTransform(scrollProgress, [0, 1], [18, 14]);
  const subtitleOpacity = useTransform(scrollProgress, [0, 1], [1, 0.85]);
  const subtitleTop = useTransform(scrollProgress, [0, 1], ["56px", "50%"]);
  const subtitleY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  // Controls transformations
  const controlsTop = useTransform(scrollProgress, [0, 1], ["85px", "50%"]);
  const controlsLeft = useTransform(scrollProgress, [0, 1], ["50%", "100%"]);
  const controlsX = useTransform(scrollProgress, [0, 1], ["-50%", "-100%"]);
  const controlsY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);

  const title = "Discover the stories and legends behind Berkeley's campus buildings";
  const viewDetailsText = language === 'CN' ? "查看详情" : "View Details";
  const disclaimerText = [
    "Information collected personally, may be inaccurate or outdated.",
    "Images sourced from Google or UC Berkeley official website."
  ];

  const sortOptions = [
    { id: 'students', label: 'For Students' },
    { id: 'categorical', label: 'Categorical' },
    { id: 'popularity', label: 'Popularity' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full h-full flex flex-col overflow-hidden"
    >
      {/* Scrollable Container */}
      <div ref={scrollRef} className="w-full h-full overflow-y-auto px-6 sm:px-8 pb-12">
        
        {/* Sticky Header Container */}
        <motion.div 
          className="sticky top-0 z-40 -mx-6 sm:-mx-8 px-8 mb-6"
          style={{
            height: headerHeight,
            paddingTop: headerPaddingTop,
            paddingBottom: headerPaddingBottom,
          }}
        >
          {/* Background Layer */}
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgb(250, 250, 250)',
              opacity: bgOpacity,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
          <div className="mx-auto w-full max-w-[1920px] h-full relative">
             {/* Main Header Component (Logo) */}
             <motion.div 
               className="absolute w-auto"
               style={{
                 scale: logoScale,
                 top: logoTop,
                 left: logoLeft,
                 x: logoX,
                 y: logoY
               }}
             >
                <Header 
                    currentView={currentView} 
                    centered={true}
                    titleOpacity={titleOpacity}
                    compact={true}
                    hideSubtitle={true}
                />
             </motion.div>

             {/* Subtitle */}
             <motion.p 
               className="absolute text-neutral-600 font-medium text-center whitespace-nowrap w-auto"
               style={{
                 fontSize: subtitleFontSize,
                 opacity: subtitleOpacity,
                 top: subtitleTop,
                 left: '50%',
                 x: '-50%',
                 y: subtitleY
               }}
             >
                {title}
             </motion.p>

             {/* Controls Row */}
             <motion.div 
               className="absolute flex items-center gap-4 w-auto"
               style={{
                 top: controlsTop,
                 left: controlsLeft,
                 x: controlsX,
                 y: controlsY
               }}
             >
                {/* Sort Control - iOS Segmented Control Style */}
                <div className="flex items-center p-1 bg-neutral-100/80 backdrop-blur-md rounded-full border border-white/20 shadow-inner relative">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onSortChange(option.id)}
                      className={`relative px-4 py-1.5 rounded-full text-sm transition-colors duration-200 z-10 whitespace-nowrap ${
                        sortMethod === option.id
                          ? 'text-neutral-900 font-semibold'
                          : 'text-neutral-500 font-medium hover:text-neutral-700'
                      }`}
                    >
                      {sortMethod === option.id && (
                        <motion.div
                          layoutId="activeSort"
                          className="absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] rounded-full z-[-1]"
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 35,
                            mass: 0.8
                          }}
                        />
                      )}
                      {option.label}
                    </button>
                  ))}
                </div>
                
                {/* Language Toggle */}
                <button
                    onClick={onToggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-neutral-50 text-neutral-800 rounded-full shadow-sm hover:shadow border border-neutral-200 group transition-[background-color,box-shadow] duration-200"
                >
                    <Globe className="w-3.5 h-3.5 text-neutral-600 group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs font-medium w-5 text-center">
                    {language === 'CN' ? 'EN' : '中'}
                    </span>
                </button>
             </motion.div>
          </div>
        </motion.div>

        {/* Content Grid - Slide Transition */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={sortMethod}
            className="w-[90%] max-w-[1920px] mx-auto pb-12 space-y-12"
            initial={{ opacity: 0, x: slideDirection * 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideDirection * 25 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.32, 0.72, 0, 1] // Apple-like ease
            }}
          >
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.title && (
                  <h3 className="text-xl font-bold text-neutral-800 mb-6 pl-2 border-l-4 border-blue-500">
                    {section.title}
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.buildings.map((building) => (
                    <div
                      key={building.id}
                      onClick={() => onSelect(building)}
                      className="group cursor-pointer relative rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-[transform,box-shadow] duration-300 overflow-hidden h-[280px]"
                    >
                      {/* Full background image */}
                      <img 
                        src={building.images[0]} 
                        alt={building.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      {/* Hover "View Details" badge */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                            {viewDetailsText}
                        </span>
                      </div>

                      {/* Text Content - Overlaid at bottom */}
                      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
                        <h3 
                          className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors text-shadow-sm"
                        >
                          {building.title}
                        </h3>
                        <p className="text-sm text-white/80 line-clamp-1 leading-relaxed font-medium">
                          {building.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Disclaimer */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none text-left">
        <div className="text-[10px] text-neutral-400 font-medium bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md border border-neutral-100 inline-block">
          <p>{disclaimerText[0]}</p>
          <p>{disclaimerText[1]}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default BuildingGrid;
