import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Map, MapPin, RefreshCw } from 'lucide-react';
import BuildingSelect from './BuildingSelect';
import { AnimatedText, LanguageToggle } from '../../common';
import { useNavigation } from '../../../context/NavigationContext';
import useTranslation from '../../../hooks/useTranslation';
import { SLIDE_VARIANTS } from '../../../constants/animations';
import { GlassPanel } from '../panels';
import { PrimaryButton, IconButton } from '../buttons';

function RouteInput({ startLocation, endLocation, onCalculate, activeField, onFieldFocus, onReset }) {
  const { isCalculating, language, toggleLanguage } = useNavigation();
  const { t } = useTranslation(language);
  
  return (
    <motion.div 
      variants={SLIDE_VARIANTS}
      initial="initial"
      animate="animate"
    >
      <GlassPanel variant="elevated" padding="large" className="w-full rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
            <Navigation className="text-primary-600" size={20} />
            <AnimatedText textKey={`planRoute-${language}`}>
              {t('navigation.planRoute')}
            </AnimatedText>
          </h2>
          <div className="flex items-center gap-2">
            {/* Language Toggle Button */}
            <LanguageToggle language={language} onToggle={toggleLanguage} variant="default" />
            
            {/* Reset Button */}
            <IconButton
              icon={RefreshCw}
              onClick={onReset}
              variant="ghost"
              title="Clear selection"
            />
          </div>
        </div>



      <div className="space-y-5">
        {/* Start Location */}
        <BuildingSelect 
          label={t('navigation.start')}
          value={startLocation}
          onFocus={() => onFieldFocus('start')}
          isActive={activeField === 'start'}
          placeholder={t('navigation.selectStart')}
          icon={Map}
          language={language}
        />

        {/* End Location */}
        <BuildingSelect 
          label={t('navigation.destination')}
          value={endLocation}
          onFocus={() => onFieldFocus('end')}
          isActive={activeField === 'end'}
          placeholder={t('navigation.selectDestination')}
          icon={MapPin}
          language={language}
        />

        {/* Calculate Button */}
        <PrimaryButton
          onClick={onCalculate}
          disabled={isCalculating}
          loading={isCalculating}
          className="w-full mt-4"
          size="large"
        >
          {isCalculating ? (
            <AnimatedText textKey={`calculating-${language}`}>
              {t('navigation.calculating')}
            </AnimatedText>
          ) : (
            <>
              <AnimatedText textKey={`getDirections-${language}`}>
                {t('navigation.getDirections')}
              </AnimatedText>
              <Navigation size={18} className="rotate-90" />
            </>
          )}
        </PrimaryButton>
      </div>
    </GlassPanel>
    </motion.div>
  );
}

export default RouteInput;
