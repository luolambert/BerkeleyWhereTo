import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoGo from '../assets/WhereToGo_Logo.png';
import logoKnow from '../assets/WhereToKnow_Logo.png';
import { FADE_VARIANTS } from '../constants/animations';
import { PrimaryButton } from '../components/presentational/buttons';
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
        {/* OPTIMIZATION: Removed layout prop to avoid re-layouts, added willChange hint */}
        <motion.div 
          className="relative group cursor-pointer overflow-hidden"
          onClick={() => navigate('/go')}
          onMouseEnter={() => setHoveredSide('go')}
          onMouseLeave={() => setHoveredSide(null)}
          initial={false}
          animate={{ 
            flex: hoveredSide === 'go' ? 1.5 : (hoveredSide === 'know' ? 0.8 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
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
            <p className="text-lg text-neutral-600 max-w-md font-medium">
              Navigate the Berkeley campus with ease. Find the quickest routes and estimate travel times.
            </p>
            
            <PrimaryButton
              variant="blue"
              className="mt-12"
              onClick={() => navigate('/go')}
            >
              Start Navigation
            </PrimaryButton>
          </motion.div>
        </motion.div>

        {/* Divider (Desktop) - OPTIMIZATION: Removed layout prop */}
        <div 
            className="hidden md:block w-px bg-neutral-200 relative z-30"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full border border-neutral-100 shadow-sm">
            <span className="text-neutral-400 font-bold text-sm">OR</span>
          </div>
        </div>

        {/* Right Side - Where To Know */}
        {/* OPTIMIZATION: Removed layout prop to avoid re-layouts */}
        <motion.div 
          className="relative group cursor-pointer overflow-hidden"
          onClick={() => navigate('/know')}
          onMouseEnter={() => setHoveredSide('know')}
          onMouseLeave={() => setHoveredSide(null)}
          initial={false}
          animate={{ 
            flex: hoveredSide === 'know' ? 1.5 : (hoveredSide === 'go' ? 0.8 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 to-white z-0" />
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
              Where To <span className="text-amber-600">Know</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-md font-medium">
              Discover the stories, history, and secrets behind every building on campus.
            </p>
            
            <PrimaryButton
              variant="amber"
              className="mt-12"
              onClick={() => navigate('/know')}
            >
              Explore Buildings
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}

export default LandingPage;
