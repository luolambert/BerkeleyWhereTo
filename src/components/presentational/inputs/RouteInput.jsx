import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Map, MapPin, RefreshCw } from 'lucide-react';
import BuildingSelect from './BuildingSelect';
import { AnimatedText, LanguageToggle } from '../../common';
import { useNavigation } from '../../../context/NavigationContext';
import useTranslation from '../../../hooks/useTranslation';
import { SLIDE_VARIANTS } from '../../../constants/animations';

import { PrimaryButton, IconButton } from '../buttons';
import { RippleButton } from '../../ui/ripple-button';

function RouteInput({ startLocation, endLocation, onCalculate, activeField, onFieldFocus, onReset, compact = false }) {
  const { isCalculating, language, toggleLanguage } = useNavigation();
  const { t } = useTranslation(language);
  
  return (
    <motion.div 
      variants={SLIDE_VARIANTS}
      initial="initial"
      animate="animate"
    >
      <div className={compact 
        ? "w-full p-0 space-y-3 relative" 
        : "w-full glass-liquid p-5 sm:p-6 space-y-4 relative overflow-hidden"
      }>
        {!compact && (
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        )}
        
        <div className="flex items-center justify-between relative z-10">
          <h2 className={compact 
            ? "text-lg font-bold text-neutral-800 flex items-center gap-2"
            : "text-2xl font-bold text-neutral-800 flex items-center gap-3"
          }>
            <Navigation size={compact ? 20 : 26} strokeWidth={2.5} className="text-primary-600 fill-primary-600/10" />
            <AnimatedText textKey={`planRoute-${language}`}>
              {t('navigation.planRoute')}
            </AnimatedText>
          </h2>
          <div className="flex items-center gap-2">
            <LanguageToggle language={language} onToggle={toggleLanguage} variant="default" />
            <IconButton
              icon={RefreshCw}
              onClick={onReset}
              variant="ghost"
              title="Clear selection"
              className="hover:bg-neutral-100/50 rounded-full"
            />
          </div>
        </div>

        <div className={compact ? "space-y-3 relative z-10" : "space-y-4 relative z-10"}>
          <BuildingSelect 
            label={t('navigation.start')}
            value={startLocation}
            onFocus={() => onFieldFocus('start')}
            isActive={activeField === 'start'}
            placeholder={t('navigation.selectStart')}
            icon={Map}
            language={language}
          />

          <BuildingSelect 
            label={t('navigation.destination')}
            value={endLocation}
            onFocus={() => onFieldFocus('end')}
            isActive={activeField === 'end'}
            placeholder={t('navigation.selectDestination')}
            icon={MapPin}
            language={language}
          />

          <RippleButton
            onClick={onCalculate}
            disabled={isCalculating}
            rippleColor="rgba(255, 255, 255, 0.4)"
            duration="600ms"
            className={`
                w-full relative group overflow-hidden rounded-full ${compact ? 'p-3 mt-2' : 'p-4 mt-3'}
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-primary-500/30
                ${isCalculating ? 'cursor-not-allowed opacity-80' : ''}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-shimmer" />
            
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
            
            <span className={`relative z-10 flex items-center justify-center gap-3 text-white font-bold ${compact ? 'text-base' : 'text-lg'} tracking-wide`}>
                {isCalculating ? (
                    <AnimatedText textKey={`calculating-${language}`}>
                    {t('navigation.calculating')}
                    </AnimatedText>
                ) : (
                    <>
                    <AnimatedText textKey={`getDirections-${language}`}>
                        {t('navigation.getDirections')}
                    </AnimatedText>
                    <Navigation size={20} className="text-white fill-white/20 rotate-90" />
                    </>
                )}
            </span>
          </RippleButton>
        </div>
      </div>
    </motion.div>
  );
}

export default RouteInput;
