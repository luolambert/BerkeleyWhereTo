import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, AnimatedText, LanguageToggle } from '../common';
import useHeaderScrollAnimation from '../../hooks/useHeaderScrollAnimation';
import { DURATIONS, EASINGS, SPRINGS, PAGE_VARIANTS } from '../../constants/animations';
import { BuildingCard } from '../presentational/cards';
import { SegmentedControl } from '../presentational/controls';
import { SectionTitle } from '../presentational/sections';

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
  currentView,
  textConfig  // NEW: text configuration from Container
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

  // Text config with backwards compatibility (fallback for standalone mode)
  const defaultTextConfig = React.useMemo(() => {
    const isCN = language === 'CN';
    return {
      title: isCN 
        ? "探索伯克利校园建筑背后的故事与传说" 
        : "Discover the stories and legends behind Berkeley's campus buildings",
      viewDetails: isCN ? "查看详情" : "View Details",
      disclaimer: isCN ? [
        "信息为个人收集，可能不准确或过时。",
        "图片来源于 Google 或加州大学伯克利分校官网。"
      ] : [
        "Information collected personally, may be inaccurate or outdated.",
        "Images sourced from Google or UC Berkeley official website."
      ],
      sortOptions: isCN ? [
        { id: 'students', label: '适合学生' },
        { id: 'categorical', label: '按类别' },
        { id: 'popularity', label: '热门程度' },
      ] : [
        { id: 'students', label: 'For Students' },
        { id: 'categorical', label: 'Categorical' },
        { id: 'popularity', label: 'Popularity' },
      ]
    };
  }, [language]);

  const { title, viewDetails, disclaimer, sortOptions } = textConfig || defaultTextConfig;


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
                <SegmentedControl
                  options={sortOptions}
                  activeId={sortMethod}
                  onChange={onSortChange}
                  layoutId="activeSort"
                  language={language}
                />
                
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
                  <SectionTitle>
                    <AnimatedText textKey={`sectionTitle-${sectionIndex}-${language}`}>
                      {section.title}
                    </AnimatedText>
                  </SectionTitle>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.buildings.map((building) => (
                    <BuildingCard
                      key={building.id}
                      title={building.title}
                      summary={building.summary}
                      imageUrl={building.images[0]}
                      viewDetailsText={viewDetails}
                      onClick={() => onSelect(building)}
                      language={language}
                      buildingId={building.id}
                    />
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
          <p><AnimatedText textKey={`disclaimer1-${language}`}>{disclaimer[0]}</AnimatedText></p>
          <p><AnimatedText textKey={`disclaimer2-${language}`}>{disclaimer[1]}</AnimatedText></p>
        </div>
      </div>
    </motion.div>
  );
}

export default BuildingGrid;
