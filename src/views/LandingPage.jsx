import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoGo from '../assets/WhereToGo_Logo.png';
import logoKnow from '../assets/WhereToKnow_Logo.png';
import { FADE_VARIANTS } from '../constants/animations';
import { LogoImage } from '../components/presentational/media';

function LandingPage() {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState(null); // 'go' | 'know' | null

  return (
    <motion.div 
      className="relative w-full h-screen overflow-hidden bg-neutral-50 flex flex-col md:flex-row"
      variants={FADE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <LayoutGroup>
        {/* Left Side - Where To Go */}
        <motion.div 
          className="relative group overflow-hidden"
          onMouseEnter={() => setHoveredSide('go')}
          onMouseLeave={() => setHoveredSide(null)}
          initial={false}
          animate={{ 
            flex: hoveredSide === 'go' ? 1.5 : (hoveredSide === 'know' ? 0.8 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          {/* Deeper blue gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-slate-50 z-0" />
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500 z-10" />
          
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Logo with hover animation */}
            <motion.div
              animate={{ 
                scale: hoveredSide === 'go' ? 1.1 : 1,
                rotate: hoveredSide === 'go' ? -5 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mb-8"
            >
              <LogoImage src={logoGo} alt="Where To Go" size="large" animated={false} />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight">
              Where To <span className="text-blue-600">Go</span>
            </h2>
            <p className="text-lg text-neutral-600 font-medium">
              Find the quickest routes across UC Berkeley campus.
            </p>
            
            {/* Outline button style */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/go')}
              className="mt-12 px-8 py-3 bg-white rounded-full border border-blue-200 text-blue-600 font-semibold shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
            >
              Start Navigation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Divider (Desktop) */}
        <div className="hidden md:block w-px bg-neutral-200/50 relative z-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-full border border-neutral-200 shadow-sm">
            <span className="text-neutral-400 font-bold text-xs">OR</span>
          </div>
        </div>

        {/* Right Side - Where To Know */}
        <motion.div 
          className="relative group overflow-hidden"
          onMouseEnter={() => setHoveredSide('know')}
          onMouseLeave={() => setHoveredSide(null)}
          initial={false}
          animate={{ 
            flex: hoveredSide === 'know' ? 1.5 : (hoveredSide === 'go' ? 0.8 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          {/* Cream/yellow gradient background */}
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 via-orange-50/50 to-yellow-50/30 z-0" />
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500 z-10" />
          
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Logo with hover animation */}
            <motion.div
              animate={{ 
                scale: hoveredSide === 'know' ? 1.1 : 1,
                rotate: hoveredSide === 'know' ? 5 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mb-8"
            >
              <LogoImage src={logoKnow} alt="Where To Know" size="large" animated={false} />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight">
              Where To <span className="text-amber-500">Know</span>
            </h2>
            <p className="text-lg text-neutral-600 font-medium">
              Uncover the history and secrets of Cal buildings.
            </p>
            
            {/* Outline button style */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/know')}
              className="mt-12 px-8 py-3 bg-white rounded-full border border-amber-200 text-amber-500 font-semibold shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200"
            >
              Explore Buildings
            </motion.button>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}

export default LandingPage;
