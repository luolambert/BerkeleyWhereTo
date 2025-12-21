import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Bike } from 'lucide-react';
import { AnimatedText } from '../../common';

/**
 * TimeCard - Travel time display card (placeholder for Phase 3)
 * Used for: TravelTimeDisplay
 */
function TimeCard({
  time,
  label,
  icon: Icon = Footprints,
  variant = 'primary', // 'primary' | 'secondary'
  language = 'EN',
}) {
  const variantStyles = {
    primary: {
      gradient: 'bg-gradient-to-r from-primary-400 to-primary-600',
      iconBg: 'bg-primary-50',
      iconText: 'text-primary-600',
    },
    secondary: {
      gradient: 'bg-gradient-to-r from-secondary-400 to-secondary-600',
      iconBg: 'bg-secondary-50',
      iconText: 'text-secondary-600',
    },
  };

  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-lg shadow-primary-900/5 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-full h-1 ${styles.gradient}`} />
      <div className={`mb-2 p-2 ${styles.iconBg} rounded-full ${styles.iconText} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <div className="text-3xl font-bold text-neutral-800 mb-1">
        {time}
        <span className="text-sm font-medium text-neutral-500 ml-1">
          min
        </span>
      </div>
      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default TimeCard;
