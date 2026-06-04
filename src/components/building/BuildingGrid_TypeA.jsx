// TypeA BuildingGrid - Optimized for mobile portrait + iPad portrait (< 1024px)
// V3: Fixed header layout using flex instead of absolute positioning

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedText, LanguageToggle } from '../common';
import { Header } from '../presentational/layout';
import useHeaderScrollAnimation_TypeA from '../../hooks/useHeaderScrollAnimation_TypeA';
import { PAGE_VARIANTS } from '../../constants/animations';
import { BuildingCard } from '../presentational/cards';
import { SegmentedControl } from '../presentational/controls';
import { SectionTitle } from '../presentational/sections';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

/**
 * TypeA Building Grid Component (V3)
 * Uses flex layout for reliable centering
 * Initial: Centered [Logo+Title] [Subtitle] [Controls + Language]
 * Scrolled: Compact row [Logo | Controls | Language]
 */
function BuildingGrid_TypeA({ 
  sections, 
  onSelect, 
  language, 
  onToggleLanguage, 
  sortMethod, 
  onSortChange, 
  slideDirection,
  currentView,
  textConfig
}) {
  const scrollRef = React.useRef(null);
  const disclaimerRef = React.useRef(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showGoHeader, setShowGoHeader] = useState(false);
  const navigate = useNavigate();
  
  // Toggle Go header visibility
  const handleHeaderClick = useCallback((e) => {
    e.stopPropagation();
    setShowGoHeader(prev => !prev);
  }, []);
  
  // Navigate to Go page
  const handleNavigateToGo = useCallback((e) => {
    e.stopPropagation();
    navigate('/go');
  }, [navigate]);
  
  // Close header when clicking outside
  useEffect(() => {
    if (!showGoHeader) return;
    
    const handleClickOutside = () => {
      setShowGoHeader(false);
    };
    
    // Delay to avoid immediate close from the same click
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showGoHeader]);
  
  const { scrollYProgress } = useScroll({ container: scrollRef });
  
  // Directly manipulate DOM to avoid React re-render that triggers Header animation
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (disclaimerRef.current) {
      const isAtBottom = progress > 0.985;
      disclaimerRef.current.style.opacity = isAtBottom ? '1' : '0';
      disclaimerRef.current.style.transform = isAtBottom ? 'translateY(0)' : 'translateY(20px)';
      disclaimerRef.current.style.pointerEvents = isAtBottom ? 'auto' : 'none';
    }
  });

  // Use simplified header animation hook
  const {
    contentOffsetY,
    header,
    logoScale,
    fadeOut,
    headerAnimationProgress,
  } = useHeaderScrollAnimation_TypeA(scrollRef);

  // Track scroll state for layout switching
  useMotionValueEvent(headerAnimationProgress, 'change', (progress) => {
    setIsScrolled(progress > 0.5);
  });
  
  const enterDirection = slideDirection;

  // Subtitle words for TypewriterEffect
  const subtitleWords = React.useMemo(() => {
    const isCN = language === 'CN';
    if (isCN) {
      return [{ text: "探索伯克利校园建筑背后的故事与传说" }];
    }
    return [
      { text: "Discover" }, { text: "the" }, { text: "stories" },
      { text: "behind" }, { text: "Berkeley's" }, { text: "buildings" },
    ];
  }, [language]);

  const defaultTextConfig = React.useMemo(() => {
    const isCN = language === 'CN';
    return {
      viewDetails: isCN ? "查看详情" : "View Details",
      disclaimer: isCN ? [
        "信息为个人收集，可能不准确或过时。",
        "图片来源于 Google 或加州大学伯克利分校官网。"
      ] : [
        "Information collected personally, may be inaccurate or outdated.",
        "Images sourced from Google or UC Berkeley official website."
      ],
      sortOptions: isCN ? [
        { id: 'students', label: '学生' },
        { id: 'categorical', label: '类别' },
        { id: 'popularity', label: '热门' },
      ] : [
        { id: 'students', label: 'Students' },
        { id: 'categorical', label: 'Category' },
        { id: 'popularity', label: 'Popular' },
      ]
    };
  }, [language]);

  const { viewDetails, disclaimer, sortOptions } = textConfig || defaultTextConfig;

  return (
    <motion.div 
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col overflow-hidden"
    >
      {/* Increased bottom padding pb-40 for disclaimer clearance */}
      <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden pb-40 no-scrollbar">
        
        {/* Animated Header with Flex Layout */}
        <motion.div 
          className="sticky top-0 z-40 px-4"
          style={{
            height: header.height,
            paddingTop: header.paddingY,
            paddingBottom: header.paddingY,
          }}
        >
          {/* Background */}
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgb(250, 250, 250)',
              opacity: header.bgOpacity,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
          
          {/* Header Content - Flex Layout */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            
            {/* Expanded State: Centered vertical layout */}
            {!isScrolled && (
              <motion.div 
                className="flex flex-col items-center gap-1 w-full -mt-[25px]"
                style={{ opacity: fadeOut.opacity, scale: fadeOut.scale }}
              >
                {/* Row 1: Logo + Title - clickable to toggle Go header */}
                <div className="relative">
                  <motion.div 
                    style={{ scale: logoScale }} 
                    className="-mt-[2px] cursor-pointer"
                    onClick={handleHeaderClick}
                  >
                    <Header 
                      currentView={currentView} 
                      centered={true}
                      compact={true}
                      hideSubtitle={true}
                      isHovering={false}
                    />
                  </motion.div>
                  
                </div>
                
                {/* Row 2: Subtitle - enlarged 1.1x to 15.4px, raised 4mm */}
                <TypewriterEffectSmooth
                  key={`subtitle-typewriter-${language}`}
                  words={subtitleWords}
                  className="px-2 -mt-[15px]"
                  textClassName="font-medium !text-neutral-600 !text-[15.4px]"
                  hideCursor={false}
                  cursorClassName="!h-[calc(1.1em+0.1mm)] !w-[2px] bg-amber-500 translate-y-[0.45mm]"
                  duration={1.9}
                  delay={0.3}
                />
                
                {/* Row 3: Controls + Language - raised 7mm total */}
                <div className="flex items-center justify-center gap-3 mt-[4px]">
                  <div className="scale-90 origin-center">
                    <SegmentedControl
                      options={sortOptions}
                      activeId={sortMethod}
                      onChange={onSortChange}
                      layoutId="activeSort-typeA"
                      language={language}
                      compact={true}
                    />
                  </div>
                  <LanguageToggle 
                    language={language} 
                    onToggle={onToggleLanguage} 
                    variant="floating" 
                    direction="right" 
                  />
                </div>
              </motion.div>
            )}
            
            {/* Collapsed State: Grid layout with 1.5mm upward shift */}
            {isScrolled && (
              <motion.div 
                className="grid grid-cols-[auto_1fr_auto] items-center w-full gap-2 -translate-y-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Left: Logo only - clickable to toggle Go header */}
                <motion.div 
                  style={{ scale: logoScale }} 
                  className="flex-shrink-0 scale-150 origin-left cursor-pointer"
                  onClick={handleHeaderClick}
                >
                  <Header 
                    currentView={currentView} 
                    centered={false}
                    compact={true}
                    hideTitle={true}
                    hideSubtitle={true}
                    isHovering={false}
                  />
                </motion.div>
                
                {/* Center: Controls - centered in middle column */}
                <div className="flex justify-center">
                  <div className="scale-90 origin-center">
                    <SegmentedControl
                      options={sortOptions}
                      activeId={sortMethod}
                      onChange={onSortChange}
                      layoutId="activeSort-typeA-collapsed"
                      language={language}
                      compact={true}
                    />
                  </div>
                </div>
                
                {/* Right: Language */}
                <div className="flex-shrink-0">
                  <LanguageToggle 
                    language={language} 
                    onToggle={onToggleLanguage} 
                    variant="floating" 
                    direction="right" 
                  />
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {showGoHeader && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  <div 
                    className="px-4 py-3 bg-white rounded-2xl cursor-pointer 
                               hover:bg-neutral-50 transition-colors border border-neutral-200
                               w-fit"
                    style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 0, 0, 0.08)' }}
                    onClick={handleNavigateToGo}
                  >
                    <Header 
                      currentView="navigation" 
                      compact={true}
                      hideSubtitle={false}
                      isHovering={false}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scrollable Content - raised 5mm */}
        <div className="px-4 -mt-[11px]">
          <AnimatePresence mode="popLayout" initial={false} custom={enterDirection}>
            <motion.div 
              key={sortMethod}
              className="w-full"
              style={{ y: contentOffsetY }}
              custom={enterDirection}
              variants={{
                initial: (dir) => ({ 
                  opacity: 0.8, 
                  x: `calc(${dir * 100}% + ${dir * 80}px)` 
                }),
                animate: { 
                  opacity: 1, 
                  x: 0 
                },
                exit: (dir) => ({ 
                  opacity: 0.8, 
                  x: `calc(${-dir * 100}% + ${-dir * 80}px)` 
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ 
                type: 'tween',
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <div className="space-y-4">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-10' : ''}>
                    {section.title && (
                      <SectionTitle compact className="mb-3">
                        <AnimatedText textKey={`sectionTitle-${sectionIndex}-${language}`}>
                          {section.title}
                        </AnimatedText>
                      </SectionTitle>
                    )}
                    {/* Single column grid for TypeA */}
                    <div className="grid grid-cols-1 gap-4">
                      {section.buildings.map((building) => (
                        <div className="relative group block h-full w-full" key={building.id}>
                           <BuildingCard
                              title={building.title}
                              summary={building.summary}
                              viewDetailsText={viewDetails}
                              onClick={() => onSelect(building)}
                              language={language}
                              buildingId={building.id}
                              compact={true}
                            />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Disclaimer - controlled via ref to avoid re-renders */}
      <div 
        ref={disclaimerRef}
        className="fixed bottom-[39px] left-4 right-4 z-50 pointer-events-none transition-all duration-300 ease-out opacity-0 translate-y-5"
      >
        <div className="text-[9px] text-neutral-400 font-medium bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-neutral-100 text-center">
          <p>{disclaimer[0]}</p>
          <p>{disclaimer[1]}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default BuildingGrid_TypeA;
