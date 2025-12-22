import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, User, Info, ExternalLink, 
  Camera, BookOpen, Ghost, Accessibility, ChevronDown
} from 'lucide-react';
import { AnimatedText, MarkdownText } from '../common';
import { buildingImages } from '../../data/buildingImage';
import useImageCarousel from '../../hooks/useImageCarousel';
import { DURATIONS, EASINGS, PAGE_VARIANTS } from '../../constants/animations';
import { BackButton, CarouselArrow } from '../presentational/buttons';
import { CarouselDots } from '../presentational/media';
import { MetaBadge, TagList } from '../presentational/badges';
import { InfoListSection } from '../presentational/sections';

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

  // Use centralized carousel hook (with preload and auto-play)
  const { currentIndex, next, prev, goTo, hasMultiple } = useImageCarousel(images, 5000);

  return (
    <motion.div 
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] w-full h-full overflow-y-auto bg-white"
    >
      {/* Hero Section - Full Screen Carousel */}
      <div className="relative w-full h-screen group bg-black">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            src={images[currentIndex]} 
            alt={`${building.title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATIONS.carousel, ease: EASINGS.easeInOut }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
        
        {/* Navigation Arrows (Only if multiple images) */}
        {hasMultiple && (
          <>
            <CarouselArrow
              direction="left"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100"
            />
            <CarouselArrow
              direction="right"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100"
            />

            {/* Dots Indicator */}
            <CarouselDots
              total={images.length}
              current={currentIndex}
              onChange={goTo}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40"
            />
          </>
        )}

        <BackButton
          onClick={onBack}
          className="absolute top-6 left-6 z-50"
        />

        {/* Bottom Left Info */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-30 flex flex-col justify-end h-full pb-24 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full pointer-events-auto">
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
            >
              {building.title}
            </motion.h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm sm:text-base font-medium">
              <MetaBadge icon={Calendar} text={`${labels.built} ${building.yearBuilt}`} />
              <MetaBadge icon={User} text={building.architect} />
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
            <AnimatedText textKey={`intro-${language}`}>
              {labels.intro}
            </AnimatedText>
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
          <InfoListSection
            icon={BookOpen}
            title={labels.funFacts}
            items={building.funFacts}
            variant="blue"
            language={language}
            sectionKey="funFacts"
          />
        )}

        {/* Student Tips */}
        {building.studentTips && (
          <InfoListSection
            icon={Info}
            title={labels.studentTips}
            items={building.studentTips}
            variant="amber"
            language={language}
            sectionKey="studentTips"
          />
        )}

        {/* Legend & Photo Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {building.relatedLegend && (
            <InfoListSection
              icon={Ghost}
              title={labels.legend}
              items={[building.relatedLegend]}
              variant="purple"
              language={language}
              sectionKey="legend"
            />
          )}

          {building.photoSpots && (
            <InfoListSection
              icon={Camera}
              title={labels.photoSpots}
              items={building.photoSpots}
              variant="pink"
              language={language}
              sectionKey="photoSpots"
            />
          )}
        </div>

        {/* Accessibility & Link */}
        <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-neutral-100">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-neutral-900 font-bold">
              <Accessibility className="w-5 h-5" />
              <span>
                <AnimatedText textKey={`accessibility-${language}`}>
                  {labels.accessibility}
                </AnimatedText>
              </span>
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
                <span>
                  <AnimatedText textKey={`officialWeb-${language}`}>
                    {labels.officialWeb}
                  </AnimatedText>
                </span>
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
