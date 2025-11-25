import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, User, Info, ExternalLink, Camera, BookOpen, Ghost, Accessibility, ChevronDown, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './Header';
import { useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { knowLocations as knowLocationsCN } from '../data/buildingInfo_chinese';
import { knowLocations as knowLocationsEN } from '../data/buildingInfo_english';
import { buildingImages } from '../data/buildingImage';

// Simple Markdown Renderer Component
const MarkdownText = ({ text, className = "" }) => {
  if (!text) return null;
  
  // Split by links [text](url) OR bold markers **text**
  const regex = /(\[.*?\]\(.*?\)|(?:\*\*.*?\*\*))/g;
  const parts = text.split(regex);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Handle Links: [text](url)
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            const [_, linkText, linkUrl] = match;
            return (
              <a 
                key={index} 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-800 transition-colors font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                {linkText}
              </a>
            );
          }
        }

        // Handle Bold: **text**
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-neutral-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

import { sortOrders } from '../data/know_sorting';

// ... (imports remain the same)

function BuildingInfo({ onBack, currentView }) {
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [language, setLanguage] = useState('CN'); // 'CN' or 'EN'
  const [sortMethod, setSortMethod] = useState('students'); // 'students', 'categorical', 'popularity'

  const currentLocations = language === 'CN' ? knowLocationsCN : knowLocationsEN;
  
  // Sort the locations based on the selected method
  // Returns an array of sections: { title, buildings: [] }
  const sortedSections = React.useMemo(() => {
    const sortData = sortOrders[sortMethod] || [];
    
    // Check if sortData is sectioned (array of objects) or flat (array of strings)
    // Based on refactor, it should be sectioned. But handling legacy just in case/robustness.
    const isSectioned = sortData.length > 0 && typeof sortData[0] === 'object';

    if (isSectioned) {
      return sortData.map(section => ({
        title: typeof section.title === 'object' ? section.title[language === 'CN' ? 'cn' : 'en'] : section.title,
        buildings: section.ids.map(id => currentLocations.find(b => b.id === id)).filter(Boolean)
      })).filter(section => section.buildings.length > 0);
    } else {
      // Fallback for flat list (treat as one unnamed section)
      const orderMap = new Map(sortData.map((id, index) => [id, index]));
      const sorted = [...currentLocations].sort((a, b) => {
        const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : 999;
        const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : 999;
        return indexA - indexB;
      });
      return [{ title: null, buildings: sorted }];
    }
  }, [currentLocations, sortMethod]);

  const selectedBuilding = selectedBuildingId ? currentLocations.find(b => b.id === selectedBuildingId) : null;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'CN' ? 'EN' : 'CN');
  };

  return (
    <div className="w-full h-full relative bg-neutral-50">
      <AnimatePresence mode="wait">
        {selectedBuilding ? (
          <>
            {/* Floating Toggle for Detail View */}
            <div className="absolute top-6 right-6 z-[60]">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md hover:bg-white text-neutral-800 rounded-full shadow-sm hover:shadow-md transition-all border border-neutral-200 group"
              >
                <Globe className="w-4 h-4 text-neutral-600 group-hover:text-blue-600 transition-colors" />
                <span className="text-sm font-medium w-6 text-center">
                  {language === 'CN' ? 'EN' : '中'}
                </span>
              </button>
            </div>
            <BuildingDetail 
              key="detail" 
              building={selectedBuilding} 
              onBack={() => setSelectedBuildingId(null)} 
              language={language}
            />
          </>
        ) : (
          <BuildingGrid 
            key="grid" 
            sections={sortedSections} 
            onSelect={(b) => setSelectedBuildingId(b.id)} 
            language={language}
            onToggleLanguage={toggleLanguage}
            sortMethod={sortMethod}
            onSortChange={setSortMethod}
            currentView={currentView}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BuildingGrid({ sections, onSelect, language, onToggleLanguage, sortMethod, onSortChange, currentView }) {
  const scrollRef = React.useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  const SCROLL_RANGE = 150;

  // Container animations
  const headerHeight = useTransform(scrollY, [0, SCROLL_RANGE], [160, 60]);
  const headerPaddingTop = useTransform(scrollY, [0, SCROLL_RANGE], [24, 12]);
  const headerPaddingBottom = useTransform(scrollY, [0, SCROLL_RANGE], [16, 12]);
  const bgOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [0, 0.9]);
  const blurAmount = useTransform(scrollY, [0, SCROLL_RANGE], [0, 12]);
  const shadowOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [0, 0.05]);

  // Convert to CSS strings
  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(250, 250, 250, ${v})`);
  const backdropFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);
  const boxShadow = useTransform(shadowOpacity, (v) => `0 1px 2px rgba(0, 0, 0, ${v})`);

  // Title fade out (in Header component)
  const titleOpacity = useTransform(scrollY, [0, SCROLL_RANGE * 0.4], [1, 0]);

  // Logo scale
  const logoScale = useTransform(scrollY, [0, SCROLL_RANGE], [1, 0.8]);

  // Subtitle animations
  const subtitleFontSize = useTransform(scrollY, [0, SCROLL_RANGE], [18, 14]);
  const subtitleOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [1, 0.85]);
  
  // Controls scale
  const controlsScale = useTransform(scrollY, [0, SCROLL_RANGE], [1, 1]);

  // Layout Transforms (Absolute Positioning)
  
  // Logo: Center Top -> Left Center
  const logoTop = useTransform(scrollY, [0, SCROLL_RANGE], ["-4px", "50%"]);
  const logoLeft = useTransform(scrollY, [0, SCROLL_RANGE], ["50%", "0%"]);
  const logoX = useTransform(scrollY, [0, SCROLL_RANGE], ["-50%", "0%"]);
  const logoY = useTransform(scrollY, [0, SCROLL_RANGE], ["0%", "-50%"]);

  // Subtitle: Center Middle -> Center Middle (but moves up)
  const subtitleTop = useTransform(scrollY, [0, SCROLL_RANGE], ["56px", "50%"]);
  const subtitleLeft = useTransform(scrollY, [0, SCROLL_RANGE], ["50%", "50%"]); // Stays centered horizontally
  const subtitleX = useTransform(scrollY, [0, SCROLL_RANGE], ["-50%", "-50%"]);
  const subtitleY = useTransform(scrollY, [0, SCROLL_RANGE], ["0%", "-50%"]);

  // Controls: Center Bottom -> Right Center
  const controlsTop = useTransform(scrollY, [0, SCROLL_RANGE], ["85px", "50%"]);
  const controlsLeft = useTransform(scrollY, [0, SCROLL_RANGE], ["50%", "100%"]);
  const controlsX = useTransform(scrollY, [0, SCROLL_RANGE], ["-50%", "-100%"]);
  const controlsY = useTransform(scrollY, [0, SCROLL_RANGE], ["0%", "-50%"]);

  const title = language === 'CN' 
    ? "Discover the stories and legends behind Berkeley's campus buildings"
    : "Discover the stories and legends behind Berkeley's campus buildings"; 

  const viewDetailsText = language === 'CN' ? "查看详情" : "View Details";
  const disclaimerText = language === 'CN' 
    ? ["Information collected personally, may be inaccurate or outdated.", "Images sourced from Google or UC Berkeley official website."]
    : ["Information collected personally, may be inaccurate or outdated.", "Images sourced from Google or UC Berkeley official website."];

  const sortOptions = [
    { id: 'students', label: language === 'CN' ? 'For Students' : 'For Students' },
    { id: 'categorical', label: language === 'CN' ? 'Categorical' : 'Categorical' },
    { id: 'popularity', label: language === 'CN' ? 'Popularity' : 'Popularity' },
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
            backgroundColor,
            backdropFilter,
            boxShadow
          }}
        >
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
                 left: subtitleLeft,
                 x: subtitleX,
                 y: subtitleY
               }}
             >
                {title}
             </motion.p>

             {/* Controls Row */}
             <motion.div 
               className="absolute flex items-center gap-4 w-auto"
               style={{
                 scale: controlsScale,
                 top: controlsTop,
                 left: controlsLeft,
                 x: controlsX,
                 y: controlsY
               }}
             >
                {/* Sort Control */}
                <div className="flex items-center p-1 bg-neutral-200/50 backdrop-blur-xl rounded-full border border-white/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] relative">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onSortChange(option.id)}
                      className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 z-10 whitespace-nowrap ${
                        sortMethod === option.id
                          ? 'text-neutral-900'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      {sortMethod === option.id && (
                        <motion.div
                          layoutId="activeSort"
                          className="absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] rounded-full z-[-1]"
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 30 
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
                    className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-neutral-50 text-neutral-800 rounded-full shadow-sm hover:shadow border border-neutral-200 group transition-all"
                >
                    <Globe className="w-3.5 h-3.5 text-neutral-600 group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs font-medium w-5 text-center">
                    {language === 'CN' ? 'EN' : '中'}
                    </span>
                </button>
             </motion.div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="w-[90%] max-w-[1920px] mx-auto pb-12 space-y-12">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h3 className="text-xl font-bold text-neutral-800 mb-6 pl-2 border-l-4 border-blue-500">
                  {section.title}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {section.buildings.map((building) => (
                  <motion.div
                    key={building.id}
                    onClick={() => onSelect(building)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    // Image background card style
                    className="group cursor-pointer relative rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-[280px]"
                  >
                    {/* Full background image */}
                    <motion.img 
                      src={building.images[0]} 
                      alt={building.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay - Darker at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Hover "View Details" badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                          {viewDetailsText}
                      </span>
                    </div>

                    {/* Text Content - Overlaid at bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
                      <motion.h3 
                        className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors text-shadow-sm"
                      >
                        {building.title}
                      </motion.h3>
                      <p className="text-sm text-white/80 line-clamp-1 leading-relaxed font-medium">
                        {building.summary}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

function BuildingDetail({ building, onBack, language }) {
  const labels = language === 'CN' ? {
    built: "建成于",
    intro: "简介",
    funFacts: "冷知识",
    studentTips: "学生生存指南",
    legend: "校园传说",
    photoSpots: "最佳拍照点",
    accessibility: "无障碍设施",
    officialWeb: "官方网站",
    scroll: "下滑查看详情"
  } : {
    built: "Built",
    intro: "Introduction",
    funFacts: "Fun Facts",
    studentTips: "Student Survival Guide",
    legend: "Campus Legend",
    photoSpots: "Best Photo Spots",
    accessibility: "Accessibility",
    officialWeb: "Official Web",
    scroll: "Scroll for details"
  };

  // Get images from centralized file, fallback to building.images
  const images = buildingImages[building.id] && buildingImages[building.id].length > 0
    ? buildingImages[building.id]
    : building.images || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotation for carousel
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] w-full h-full overflow-y-auto bg-white"
    >
      {/* Hero Section - Full Screen Carousel */}
      <div className="relative w-full h-screen group bg-black">
        <AnimatePresence>
          <motion.img 
            key={currentImageIndex}
            src={images[currentImageIndex]} 
            alt={`${building.title} - Image ${currentImageIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
        
        {/* Navigation Arrows (Only if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-all z-40 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-all z-40 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-colors border border-white/10 group z-50"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Bottom Left Info */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-30 flex flex-col justify-end h-full pb-24 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full pointer-events-auto">
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
            >
              {building.title}
            </motion.h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm sm:text-base font-medium">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <Calendar className="w-4 h-4" />
                <span>{labels.built} {building.yearBuilt}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <User className="w-4 h-4" />
                <span>{building.architect}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center z-30 pointer-events-none">
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-white/80"
            >
                <span className="text-xs font-medium tracking-widest uppercase">{labels.scroll}</span>
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        
        {/* Summary & Description */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 border-l-4 border-blue-500 pl-4">
            {labels.intro}
          </h2>
          <p className="text-xl text-neutral-800 font-medium mb-6 leading-relaxed">
            <MarkdownText text={building.summary} />
          </p>
          <div className="text-neutral-600 leading-relaxed whitespace-pre-line text-lg">
            <MarkdownText text={building.description} />
          </div>
        </section>

        {/* Fun Facts */}
        {building.funFacts && (
          <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-900">{labels.funFacts}</h3>
            </div>
            <ul className="space-y-4">
              {building.funFacts.map((fact, index) => (
                <li key={index} className="flex gap-3 text-blue-800">
                  <span className="font-bold text-blue-400 select-none">•</span>
                  <span><MarkdownText text={fact} /></span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Student Tips */}
        {building.studentTips && (
          <section className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold text-amber-900">{labels.studentTips}</h3>
            </div>
            <ul className="space-y-4">
              {building.studentTips.map((tip, index) => (
                <li key={index} className="flex gap-3 text-amber-800">
                  <span className="font-bold text-amber-400 select-none">•</span>
                  <span><MarkdownText text={tip} /></span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Legend & Photo Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {building.relatedLegend && (
            <section className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <Ghost className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-purple-900">{labels.legend}</h3>
              </div>
              <p className="text-purple-800 leading-relaxed">
                <MarkdownText text={building.relatedLegend} />
              </p>
            </section>
          )}

          {building.photoSpots && (
            <section className="bg-pink-50 rounded-2xl p-8 border border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-6 h-6 text-pink-600" />
                <h3 className="text-lg font-bold text-pink-900">{labels.photoSpots}</h3>
              </div>
              <ul className="space-y-3">
                {building.photoSpots.map((spot, index) => (
                  <li key={index} className="text-pink-800 text-sm">
                    <MarkdownText text={spot} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Accessibility & Link */}
        <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-neutral-100">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-neutral-900 font-bold">
              <Accessibility className="w-5 h-5" />
              <span>{labels.accessibility}</span>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed">
              <MarkdownText text={building.accessibility} />
            </p>
          </div>
          
          {building.officialLink && (
            <div className="shrink-0">
              <a 
                href={building.officialLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                <span>{labels.officialWeb}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Tags */}
        {building.tags && (
          <div className="flex flex-wrap gap-2 pt-4">
            {building.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="h-20" /> {/* Bottom spacer */}
      </div>
    </motion.div>
  );
}

export default BuildingInfo;
