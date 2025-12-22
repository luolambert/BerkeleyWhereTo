import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { DURATIONS, EASINGS } from '../../../constants/animations';

/**
 * GitHubLink Component
 * Fixed-position GitHub icon that adjusts position based on current page
 * 
 * @param {boolean} isGoPage - Whether currently on Go page (affects positioning)
 */
function GitHubLink({ isGoPage = false }) {
  return (
    <motion.a
      href="https://github.com/luolambert/BerkeleyWhereToGo"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 z-[200] w-10 h-10 bg-white rounded-full shadow-xl border border-neutral-200 flex items-center justify-center"
      title="View on GitHub"
      initial={{ opacity: 0, scale: 0.8, right: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        right: isGoPage ? 56 : 20
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ 
        duration: 1, 
        ease: EASINGS.apple,
        right: { duration: 1, ease: EASINGS.apple }
      }}
    >
      <Github className="w-5 h-5 text-neutral-900" />
    </motion.a>
  );
}

export default GitHubLink;

