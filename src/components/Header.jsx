import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {/* Glass Pill Header */}
      <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl shadow-primary-900/10 bg-white/90 backdrop-blur-md border border-white/20">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
          <MapPin size={20} strokeWidth={2.5} />
        </div>
        <div>
            <h1 className="text-xl font-bold text-neutral-800 tracking-tight leading-tight">
            Berkeley <span className="text-primary-600">Where-To-Go</span>
            </h1>
            <p className="text-xs text-neutral-500 font-medium">Campus Navigation</p>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
