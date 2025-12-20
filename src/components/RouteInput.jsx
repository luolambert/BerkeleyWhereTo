import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Map, MapPin, RefreshCw, Globe } from 'lucide-react';
import BuildingSelect from './BuildingSelect';
import { useNavigation } from '../context/NavigationContext';
import useTranslation from '../hooks/useTranslation';

function RouteInput({ startLocation, endLocation, onCalculate, activeField, onFieldFocus, onReset }) {
  const { isCalculating, language, toggleLanguage } = useNavigation();
  const { t } = useTranslation(language);
  const [isLangHovered, setIsLangHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 w-full shadow-2xl shadow-neutral-900/20 border border-white/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
          <Navigation className="text-primary-600" size={20} />
          {t('navigation.planRoute')}
        </h2>
        <div className="flex items-center gap-2">
          {/* Language Toggle Button - Expandable on Hover */}
          <motion.div
            className="relative flex items-center"
            onHoverStart={() => setIsLangHovered(true)}
            onHoverEnd={() => setIsLangHovered(false)}
          >
            {/* Expanded Language Option (slides out on hover) */}
            <AnimatePresence>
              {isLangHovered && (
                <motion.button
                  initial={{ opacity: 0, width: 0, x: 10 }}
                  animate={{ opacity: 1, width: 'auto', x: 0 }}
                  exit={{ opacity: 0, width: 0, x: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={toggleLanguage}
                  className="mr-1 px-2 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold whitespace-nowrap overflow-hidden hover:bg-primary-100 transition-colors"
                >
                  {language === 'CN' ? 'EN' : '中文'}
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Globe Icon Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-primary-600 transition-colors"
              title={language === 'CN' ? 'Switch to English' : '切换到中文'}
            >
              <Globe size={18} />
            </motion.button>
          </motion.div>
          
          {/* Reset Button */}
          <motion.button 
            whileTap={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            onClick={onReset}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-primary-600 transition-colors"
            title="Clear selection"
          >
            <RefreshCw size={18} />
          </motion.button>
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
        />

        {/* End Location */}
        <BuildingSelect 
          label={t('navigation.destination')}
          value={endLocation}
          onFocus={() => onFieldFocus('end')}
          isActive={activeField === 'end'}
          placeholder={t('navigation.selectDestination')}
          icon={MapPin}
        />

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCalculate}
          disabled={isCalculating}
          className={`w-full mt-4 py-4 rounded-xl font-bold text-white shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 transition-[background,box-shadow] duration-200
            ${isCalculating 
              ? 'bg-neutral-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400'
            }`}
        >
          {isCalculating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('navigation.calculating')}
            </>
          ) : (
            <>
              {t('navigation.getDirections')}
              <Navigation size={18} className="rotate-90" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default RouteInput;
