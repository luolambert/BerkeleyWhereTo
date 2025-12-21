import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header';
import { AnimatedText, LanguageToggle } from '../common';
import useHeaderScrollAnimation from '../../hooks/useHeaderScrollAnimation';
import { DURATIONS, EASINGS, SPRINGS, PAGE_VARIANTS } from '../../constants/animations';

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
  const logoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  
  // Use extracted scroll animation hook
  const {
    contentOffsetY,
    header,
    title: titleStyle,
    logo,
    subtitle,
    controls,
  } = useHeaderScrollAnimation(scrollRef, containerRef, logoRef);

  const title = language === 'CN' 
    ? "探索伯克利校园建筑背后的故事与传说" 
    : "Discover the stories and legends behind Berkeley's campus buildings";
  
  const viewDetailsText = language === 'CN' ? "查看详情" : "View Details";
  
  const disclaimerText = language === 'CN' ? [
    "信息为个人收集，可能不准确或过时。",
    "图片来源于 Google 或加州大学伯克利分校官网。"
  ] : [
    "Information collected personally, may be inaccurate or outdated.",
    "Images sourced from Google or UC Berkeley official website."
  ];

  const sortOptions = language === 'CN' ? [
    { id: 'students', label: '适合学生' },
    { id: 'categorical', label: '按类别' },
    { id: 'popularity', label: '热门程度' },
  ] : [
    { id: 'students', label: 'For Students' },
    { id: 'categorical', label: 'Categorical' },
    { id: 'popularity', label: 'Popularity' },
  ];

  return (
    <motion.div 
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col overflow-hidden"
    >
      {/* Scrollable Container */}
      <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden px-6 sm:px-8 pb-12">
        
        {/* Sticky Header Container */}
        <motion.div 
          className="sticky top-0 z-40 -mx-6 sm:-mx-8 px-8 mb-6"
          style={{
            height: header.height,
            paddingTop: header.paddingTop,
            paddingBottom: header.paddingBottom,
            willChange: 'height, padding',
          }}
        >
          {/* Background Layer */}
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgb(250, 250, 250)',
              opacity: header.bgOpacity,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
          <div ref={containerRef} className="mx-auto w-full max-w-[1920px] h-full relative">
             {/* Main Header Component (Logo) */}
             <motion.div 
               ref={logoRef}
               className="absolute w-auto"
               style={{
                 scale: logo.scale,
                 top: logo.top,
                 left: logo.left,
                 y: logo.y,
                 transformOrigin: '0% 50%',
                 willChange: 'transform',
               }}
             >
                <Header 
                    currentView={currentView} 
                    centered={true}
                    titleOpacity={titleStyle.opacity}
                    compact={true}
                    hideSubtitle={true}
                />
             </motion.div>

             {/* Subtitle */}
             <motion.p 
               className="absolute text-neutral-600 font-medium text-center whitespace-nowrap w-auto"
               style={{
                 fontSize: subtitle.fontSize,
                 opacity: subtitle.opacity,
                 top: subtitle.top,
                 left: '50%',
                 x: '-50%',
                 y: subtitle.y
               }}
             >
                <AnimatedText textKey={`subtitle-${language}`}>
                  {title}
                </AnimatedText>
             </motion.p>

             {/* Controls Row */}
             <motion.div 
               className="absolute flex items-center gap-4 w-auto"
               style={{
                 top: controls.top,
                 left: controls.left,
                 x: controls.x,
                 y: controls.y
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
                          transition={SPRINGS.stiff}
                        />
                      )}
                      <AnimatedText textKey={`sort-${option.id}-${language}`}>
                        {option.label}
                      </AnimatedText>
                    </button>
                  ))}
                </div>
                
                {/* Language Toggle */}
                <LanguageToggle language={language} onToggle={onToggleLanguage} variant="floating" direction="right" />
             </motion.div>
          </div>
        </motion.div>

        {/* Content Grid - Slide Transition */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={sortMethod}
            className="w-[90%] max-w-[1920px] mx-auto pb-12 space-y-12"
            style={{
              y: contentOffsetY
            }}
            initial={{ opacity: 0, x: slideDirection * 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideDirection * 25 }}
            transition={{ 
              duration: DURATIONS.fast, 
              ease: EASINGS.apple
            }}
          >
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.title && (
                  <h3 className="text-xl font-bold text-neutral-800 mb-6 pl-2 border-l-4 border-blue-500">
                    <AnimatedText textKey={`sectionTitle-${sectionIndex}-${language}`}>
                      {section.title}
                    </AnimatedText>
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
                            <AnimatedText textKey={`viewDetails-${language}`}>
                              {viewDetailsText}
                            </AnimatedText>
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
                          <AnimatedText textKey={`card-summary-${building.id}-${language}`}>
                            {building.summary}
                          </AnimatedText>
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
          <p><AnimatedText textKey={`disclaimer1-${language}`}>{disclaimerText[0]}</AnimatedText></p>
          <p><AnimatedText textKey={`disclaimer2-${language}`}>{disclaimerText[1]}</AnimatedText></p>
        </div>
      </div>
    </motion.div>
  );
}

export default BuildingGrid;
