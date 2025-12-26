import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Bike } from 'lucide-react';
import { AnimatedText } from '../../common';

/**
 * TimeCard - Travel time display card (Phase 3 Upgrade)
 * Now uses the premium `glass-liquid` utility for that rich, tactile feel.
 */
function TimeCard({
  time,
  label,
  icon: Icon = Footprints,
  variant = 'primary', // 'primary' | 'secondary'
  language = 'EN',
}) {
  const divRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
      iconBg: 'bg-indigo-50',
      iconText: 'text-indigo-600',
      hoverGlow: 'from-indigo-400/20 to-purple-400/20',
      spotlight: 'rgba(99, 102, 241, 0.15)'
    },
    secondary: {
      // Teal/Emerald theme
      iconBg: 'bg-teal-50',
      iconText: 'text-teal-600',
      hoverGlow: 'from-teal-400/20 to-emerald-400/20',
      spotlight: 'rgba(20, 184, 166, 0.15)' 
    },
  };

  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card relative w-full p-4 flex flex-col items-center justify-center text-center overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${styles.spotlight}, transparent 40%)`,
        }}
      />

      {/* Subtle Gradient Glow on Hover */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${styles.hoverGlow} z-0`} />

      {/* Content */}
      <div className={`mb-2 p-2.5 rounded-2xl ${styles.iconBg} ${styles.iconText} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm relative z-10 ring-1 ring-inset ring-black/5`}>
        <Icon size={22} className="stroke-[2.5px]" />
      </div>
      
      <div className="text-3xl font-bold text-neutral-800 mb-0.5 tracking-tight relative z-10 flex items-baseline justify-center">
        {time}
        <span className="text-sm font-semibold text-neutral-500 ml-1">
          min
        </span>
      </div>
      
      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest relative z-10">
        {label}
      </div>
    </div>
  );
}

export default TimeCard;
