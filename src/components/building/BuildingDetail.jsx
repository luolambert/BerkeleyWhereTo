import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, Info, ExternalLink, 
  Camera, BookOpen, Ghost, Accessibility, ChevronDown, 
  Globe, ChevronLeft, ChevronRight 
} from 'lucide-react';
import MarkdownText from '../common/MarkdownText';
import { buildingImages } from '../../data/buildingImage';

/**
 * 建筑详情页组件
 * 显示单个建筑的完整信息，包括图片轮播、描述、冷知识等
 */
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
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-[background-color,color,opacity] duration-200 z-40 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-[background-color,color,opacity] duration-200 z-40 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-[width,background-color] duration-200 ${
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
            <div className="flex flex-col items-center gap-2 text-white/80 animate-bounce">
                <span className="text-xs font-medium tracking-widest uppercase">{labels.scroll}</span>
                <ChevronDown className="w-6 h-6" />
            </div>
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

export default BuildingDetail;
