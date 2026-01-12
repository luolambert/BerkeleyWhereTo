import React from 'react';
import BuildingDetail from '../building/BuildingDetail';
import { useBuildingImages } from '../../hooks/useBuildingImages';
import useImageCarousel from '../../hooks/useImageCarousel';

/**
 * BuildingDetailContainer
 * Container component that manages state and business logic for BuildingDetail
 * 
 * Responsibilities:
 * - Image source selection (dynamically from Supabase Storage)
 * - Carousel state management via useImageCarousel hook
 * - Label text configuration based on language
 * 
 * The BuildingDetail component receives all data as props and focuses on rendering.
 */
function BuildingDetailContainer({ building, onBack, language }) {
  // Get images dynamically from Supabase Storage
  const { images: dynamicImages } = useBuildingImages(building.id);
  
  const images = React.useMemo(() => {
    if (dynamicImages.length > 0) return dynamicImages;
    return building.images || [];
  }, [dynamicImages, building.images]);

  // Use centralized carousel hook
  const carousel = useImageCarousel(images, 5000);

  // Label configuration (i18n)
  const labels = React.useMemo(() => (
    language === 'CN' ? {
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
    }
  ), [language]);

  return (
    <BuildingDetail
      building={building}
      onBack={onBack}
      language={language}
      images={images}
      carousel={carousel}
      labels={labels}
    />
  );
}

export default BuildingDetailContainer;
