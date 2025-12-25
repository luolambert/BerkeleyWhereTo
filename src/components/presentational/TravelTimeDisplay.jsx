import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Bike } from 'lucide-react';
import { AnimatedText } from '../common';
import { useNavigation } from '../../context/NavigationContext';
import useTranslation from '../../hooks/useTranslation';
import { TimeCard } from './cards';

function TravelTimeDisplay({ walkingTime, scooterTime }) {
  const { language } = useNavigation();
  const { t } = useTranslation(language);

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="grid grid-cols-2 gap-3 mt-3 overflow-hidden"
    >
      {/* Walking Card */}
      <motion.div variants={item}>
        <TimeCard
          icon={Footprints}
          time={walkingTime}
          label={t('navigation.walking')}
          unit={t('navigation.min')}
          variant="primary"
          language={language}
          labelKey="walking"
          unitKey="min"
        />
      </motion.div>

      {/* Scooter Card */}
      <motion.div variants={item}>
        <TimeCard
          icon={Bike}
          time={scooterTime}
          label={t('navigation.scooter')}
          unit={t('navigation.min')}
          variant="secondary"
          language={language}
          labelKey="scooter"
          unitKey="min2"
        />
      </motion.div>
    </motion.div>
  );
}

export default React.memo(TravelTimeDisplay);
