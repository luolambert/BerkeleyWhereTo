import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Settings2, Map, MapPin } from 'lucide-react';
import BuildingSelect from './BuildingSelect';

function RouteInput({ startLocation, setStartLocation, endLocation, setEndLocation, onCalculate, isCalculating }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-3xl p-6 sm:p-8 w-full shadow-2xl shadow-primary-900/10 border border-white/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
          <Navigation className="text-primary-600" size={20} />
          Plan Your Route
        </h2>
        <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-primary-600 transition-colors">
          <Settings2 size={18} />
        </button>
      </div>

      <div className="space-y-5">
        {/* Start Location */}
        <BuildingSelect 
          label="Start"
          value={startLocation}
          onChange={setStartLocation}
          placeholder="Select starting point..."
          icon={Map}
        />

        {/* End Location */}
        <BuildingSelect 
          label="Destination"
          value={endLocation}
          onChange={setEndLocation}
          placeholder="Select destination..."
          icon={MapPin}
        />

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCalculate}
          disabled={isCalculating}
          className={`w-full mt-4 py-4 rounded-xl font-bold text-white shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 transition-all
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
