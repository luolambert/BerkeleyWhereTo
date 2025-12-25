import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { AnimatedText } from '../typography';
import { DURATIONS } from '../../../constants/animations';

/**
 * LanguageToggle Component
 * A reusable language toggle button with hover-expand animation
 * 
 * @param {string} language - Current language ('CN' | 'EN')
 * @param {function} onToggle - Callback when language is toggled
 * @param {string} variant - Style variant ('default' | 'floating')
 * @param {string} direction - Expand direction ('left' | 'right')
 */
function LanguageToggle({ language, onToggle, variant = 'default', direction = 'left' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  
  const alternateLanguage = language === 'CN' ? 'EN' : '中文';
  const title = language === 'CN' ? 'Switch to English' : '切换到中文';
  
  // Style variants
  const styles = {
    default: {
      expandedButton: 'px-2 py-1 rounded-full bg-amber-50 text-amber-400 text-xs font-bold whitespace-nowrap overflow-hidden hover:bg-amber-100 hover:text-amber-500 transition-colors',
      iconButton: 'p-2 rounded-full hover:bg-amber-50 text-amber-400 hover:text-amber-500 transition-colors',
      iconSize: 20,
    },
    floating: {
      expandedButton: 'px-2 py-1.5 rounded-full bg-white/90 text-neutral-700 text-xs font-bold whitespace-nowrap overflow-hidden hover:bg-white shadow-sm border border-neutral-100 transition-[background-color,box-shadow]',
      iconButton: 'p-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-600 hover:text-blue-600 shadow-sm hover:shadow border border-neutral-200 transition-[background-color,box-shadow,color] duration-200',
      iconSize: 18,
    },
  };
  
  const s = styles[variant] || styles.default;
  
  // Direction determines position of expanded button
  const isLeft = direction === 'left';
  const transformOrigin = isLeft ? 'right center' : 'left center';
  const positionClass = isLeft 
    ? 'right-full mr-1'  // Expand to left of icon
    : 'left-full ml-1';   // Expand to right of icon

  // Handle click with rotation animation
  // EN -> CN: rotate +180 (clockwise)
  // CN -> EN: rotate -180 (counter-clockwise)
  const handleClick = () => {
    if (language === 'EN') {
      // EN -> CN: rotate clockwise (+180)
      setRotationAngle(prev => prev + 180);
    } else {
      // CN -> EN: rotate counter-clockwise (-180)
      setRotationAngle(prev => prev - 180);
    }
    onToggle();
  };
  
  return (
    <motion.div
      className="relative flex items-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Globe Icon Button - Always in flow */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={s.iconButton}
        title={title}
      >
        <motion.span
          animate={{ rotate: rotationAngle }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          <Globe size={s.iconSize} />
        </motion.span>
      </motion.button>
      
      {/* Expanded Language Option - Absolutely positioned */}
      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: DURATIONS.fast, ease: 'easeOut' }}
            style={{ transformOrigin }}
            onClick={handleClick}
            className={`absolute top-1/2 -translate-y-1/2 ${positionClass} ${s.expandedButton}`}
          >
            <AnimatedText textKey={`langOpt-${language}`}>
              {alternateLanguage}
            </AnimatedText>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LanguageToggle;

