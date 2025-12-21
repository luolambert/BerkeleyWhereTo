import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/**
 * BackButton - Glass-style back button (placeholder for Phase 3)
 */
function BackButton({ onClick, className = '' }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-colors border border-white/10 group ${className}`}
    >
      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
    </motion.button>
  );
}

export default BackButton;
