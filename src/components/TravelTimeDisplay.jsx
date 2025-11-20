import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Bike } from 'lucide-react';

function TravelTimeDisplay({ walkingTime, scooterTime }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 mt-4"
    >
      {/* Walking Card */}
      <motion.div 
        variants={item}
        className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-lg shadow-primary-900/5 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600" />
        <div className="mb-2 p-2 bg-primary-50 rounded-full text-primary-600 group-hover:scale-110 transition-transform duration-300">
          <Footprints size={24} />
        </div>
        <div className="text-3xl font-bold text-neutral-800 mb-1">
          {walkingTime}<span className="text-sm font-medium text-neutral-500 ml-1">min</span>
        </div>
        <div className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Walking</div>
      </motion.div>

      {/* Scooter Card */}
      <motion.div 
        variants={item}
        className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-lg shadow-secondary-900/5 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 to-secondary-600" />
        <div className="mb-2 p-2 bg-secondary-50 rounded-full text-secondary-600 group-hover:scale-110 transition-transform duration-300">
          <Bike size={24} />
        </div>
        <div className="text-3xl font-bold text-neutral-800 mb-1">
          {scooterTime}<span className="text-sm font-medium text-neutral-500 ml-1">min</span>
        </div>
        <div className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Scooter</div>
      </motion.div>
    </motion.div>
  );
}

export default TravelTimeDisplay;
