import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Header, AnimatedText, LanguageToggle } from '../common';
import useHeaderScrollAnimation from '../../hooks/useHeaderScrollAnimation';
import { DURATIONS, EASINGS, SPRINGS, PAGE_VARIANTS } from '../../constants/animations';
import { BuildingCard } from '../presentational/cards';
import { SegmentedControl } from '../presentational/controls';
import { SectionTitle } from '../presentational/sections';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';
import { TracingBeam } from '../ui/tracing-beam';


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
  slideDirection, // Direction is now calculated at click time
  currentView,
  textConfig
}) {
  const scrollRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const disclaimerRef = React.useRef(null);
  
  // Use Framer Motion's useScroll to track scroll progress
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
  
  // Direction for enter and exit animations
  // Enter: new content comes from the direction of click (positive = from right)
  // Exit: old content goes in the opposite direction
  const enterDirection = slideDirection;
  const exitDirection = -slideDirection;
  
  const {
    contentOffsetY,
    header,
    title: titleStyle,
    logo,
    subtitle,
    controls,
  } = useHeaderScrollAnimation(scrollRef, containerRef, logoRef);

  const subtitleWords = React.useMemo(() => {
    const isCN = language === 'CN';
    if (isCN) {
      return [
        { text: "探索伯克利校园建筑背后的故事与传说" },
      ];
    }
    return [
      { text: "Discover" }, { text: "the" }, { text: "stories" },
      { text: "and" }, { text: "legends" }, { text: "behind" },
      { text: "Berkeley's" }, { text: "campus" }, { text: "buildings" },
    ];
  }, [language]);

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
      <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden px-6 sm:px-8 pb-12 no-scrollbar">
        
        <motion.div 
          className="sticky top-0 z-40 -mx-6 sm:-mx-8 px-8 mb-6"
          style={{
            height: header.height,
            paddingTop: header.paddingTop,
            paddingBottom: header.paddingBottom,
            willChange: 'height, padding',
          }}
        >
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgb(250, 250, 250)',
              opacity: header.bgOpacity,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
          <div ref={containerRef} className="mx-auto w-full max-w-[1920px] h-full relative">
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

             <motion.div 
               className="absolute flex justify-center w-full"
               style={{
                 opacity: subtitle.opacity,
                 top: subtitle.top,
                 left: 0,
                 y: subtitle.y
               }}
             >
                <TypewriterEffectSmooth
                  key={`subtitle-typewriter-${language}`}
                  words={subtitleWords}
                  className="translate-x-[0.9mm]"
                  textClassName="font-medium !text-neutral-600"
                  textStyle={{ fontSize: subtitle.fontSize }}
                  hideCursor={false}
                  cursorClassName="!h-[calc(1.1em+0.1mm)] !w-[2px] bg-amber-500 translate-y-[0.45mm]"
                  duration={1.9}
                  delay={0.3}
                />
             </motion.div>

             <motion.div 
               className="absolute flex items-center gap-4 w-auto"
               style={{
                 top: controls.top,
                 left: controls.left,
                 x: controls.x,
                 y: controls.y
               }}
             >
                <SegmentedControl
                  options={sortOptions}
                  activeId={sortMethod}
                  onChange={onSortChange}
                  layoutId="activeSort"
                  language={language}
                />
                
                <LanguageToggle language={language} onToggle={onToggleLanguage} variant="floating" direction="right" />
             </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout" initial={false} custom={enterDirection}>
          <motion.div 
            key={sortMethod}
            className="w-full"
            style={{
              y: contentOffsetY
            }}
            custom={enterDirection}
            variants={{
              initial: (dir) => ({ 
                opacity: 1, 
                x: `calc(${dir * 100}% + ${dir * 120}px)` 
              }),
              animate: { 
                opacity: 1, 
                x: 0 
              },
              exit: (dir) => ({ 
                opacity: 1, 
                x: `calc(${-dir * 100}% + ${-dir * 120}px)` 
              }),
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
              type: 'tween',
              duration: 0.35,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <TracingBeam className="!max-w-none w-full" containerRef={scrollRef}>
              <div className="w-[90%] max-w-[1920px] mx-auto pb-12 space-y-12">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {section.title && (
                      <SectionTitle>
                        <AnimatedText textKey={`sectionTitle-${sectionIndex}-${language}`}>
                          {section.title}
                        </AnimatedText>
                      </SectionTitle>
                    )}
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-0"
                    >
                      {section.buildings.map((building) => (
                          <div className="relative group block h-full w-full" key={building.id}>
                             <BuildingCard
                                title={building.title}
                                summary={building.summary}
                                viewDetailsText={viewDetails}
                                onClick={() => onSelect(building)}
                                language={language}
                                buildingId={building.id}
                              />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </TracingBeam>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Disclaimer - controlled via ref to avoid re-renders */}
      <div 
        ref={disclaimerRef}
        className="fixed bottom-8 left-4 z-50 text-left transition-all duration-300 ease-out opacity-0 translate-y-5 pointer-events-none"
      >
        <div className="text-[10px] text-neutral-400 font-medium bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md border border-neutral-100 inline-block">
          <p><AnimatedText textKey={`disclaimer1-${language}`}>{disclaimer[0]}</AnimatedText></p>
          <p><AnimatedText textKey={`disclaimer2-${language}`}>{disclaimer[1]}</AnimatedText></p>
        </div>
      </div>
    </motion.div>
  );
}

export default BuildingGrid;
