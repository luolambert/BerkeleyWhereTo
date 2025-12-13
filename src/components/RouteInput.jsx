import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Map, MapPin, RefreshCw } from 'lucide-react';
import BuildingSelect from './BuildingSelect';

function RouteInput({ startLocation, setStartLocation, endLocation, setEndLocation, onCalculate, isCalculating, activeField, onFieldFocus, onReset }) {
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
          Plan Your Route
        </h2>
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

      <div className="space-y-5">
        {/* Start Location */}
        <BuildingSelect 
          label="Start"
          value={startLocation}
          onFocus={() => onFieldFocus('start')}
          isActive={activeField === 'start'}
          placeholder="Select starting point..."
          icon={Map}
        />

        {/* End Location */}
        <BuildingSelect 
          label="Destination"
          value={endLocation}
          onFocus={() => onFieldFocus('end')}
          isActive={activeField === 'end'}
          placeholder="Select destination..."
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
              Calculating...
            </>
          ) : (
            <>
              Get Directions
              <Navigation size={18} className="rotate-90" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default RouteInput;
