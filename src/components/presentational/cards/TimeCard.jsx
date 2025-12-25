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
  const divRef = React.useRef(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const variantStyles = {
    primary: {
      // Purple/Indigo theme
      gradient: 'bg-gradient-to-r from-primary-400 to-primary-600',
      iconBg: 'bg-primary-50',
      iconText: 'text-primary-600',
      // Subtle purple tint by default, darker on hover
      baseBg: 'bg-indigo-50/30', 
      hoverBg: 'group-hover:bg-indigo-50/80',
      spotlight: 'from-indigo-500/20 via-purple-500/5 to-transparent'
    },
    secondary: {
      // Teal/Emerald theme
      gradient: 'bg-gradient-to-r from-secondary-400 to-secondary-600',
      iconBg: 'bg-secondary-50',
      iconText: 'text-secondary-600',
      // Subtle teal tint by default, darker on hover
      baseBg: 'bg-teal-50/30',
      hoverBg: 'group-hover:bg-teal-50/80',
      spotlight: 'from-teal-500/20 via-emerald-500/5 to-transparent' 
    },
  };

  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Changed base background to strong white for legibility, moved tint to overlay
      className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-300 hover:border-white/80 hover:shadow-md"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
    >
      {/* Tint Layer - provides the subtle color and hover deepening */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${styles.baseBg} ${styles.hoverBg}`} />

      {/* Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 40%)`,
        }}
      />
      
      {/* Colored Spotlight Hint - specific to variant - Made slightly stronger for "deepening" effect */}
       <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${variant === 'primary' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(20, 184, 166, 0.25)'}, transparent 40%)`,
        }}
      />

      {/* Existing Liquid Gradient Overlay - reduced opacity to let spotlight shine */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${variant === 'primary' ? 'from-indigo-400 to-purple-400' : 'from-teal-400 to-emerald-400'}`} />

      <div className={`mb-2 p-2 ${styles.iconBg} rounded-xl ${styles.iconText} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm relative z-10`}>
        <Icon size={22} />
      </div>
      
      <div className="text-3xl font-bold text-neutral-800 mb-0.5 tracking-tight relative z-10">
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
