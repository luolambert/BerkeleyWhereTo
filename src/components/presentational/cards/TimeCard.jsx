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
    <div className="glass-liquid p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-white/40 transition-colors duration-300">
      
      {/* Liquid Gradient Overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${variant === 'primary' ? 'from-indigo-400 to-purple-400' : 'from-teal-400 to-emerald-400'}`} />

      <div className={`mb-3 p-3 ${styles.iconBg} rounded-2xl ${styles.iconText} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm relative z-10`}>
        <Icon size={26} />
      </div>
      
      <div className="text-4xl font-bold text-neutral-800 mb-1 tracking-tight relative z-10">
        {time}
        <span className="text-sm font-semibold text-neutral-500 ml-1">
          min
        </span>
      </div>
      
      <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider relative z-10">
        {label}
      </div>
    </div>
  );
}

export default TimeCard;
