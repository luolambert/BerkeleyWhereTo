import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoGo from '../assets/WhereToGo_Logo.png';
import logoKnow from '../assets/WhereToKnow_Logo.png';

function LandingPage() {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState(null); // 'go' | 'know' | null

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-50 flex flex-col md:flex-row">
      <LayoutGroup>
        {/* Left Side - Where To Go */}
        <motion.div 
          layout
          className="relative group cursor-pointer overflow-hidden"
          onClick={() => navigate('/go')}
          onMouseEnter={() => setHoveredSide('go')}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{ 
            flex: hoveredSide === 'go' ? 1.5 : (hoveredSide === 'know' ? 0.8 : 1) 
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500 z-10" />
          
          <motion.div 
            layout="position"
            className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              animate={{ 
                scale: hoveredSide === 'go' ? 1.1 : 1,
                rotate: hoveredSide === 'go' ? -5 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-48 h-48 mb-8 drop-shadow-2xl"
            >
              <img src={logoGo} alt="Where To Go" className="w-full h-full object-contain" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight">
              Where To <span className="text-blue-600">Go</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-md font-medium">
              Navigate the Berkeley campus with ease. Find the quickest routes and estimate travel times.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:bg-blue-700 transition-all"
            >
              Start Navigation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Divider (Desktop) */}
        <motion.div 
            layout
            className="hidden md:block w-px bg-neutral-200 relative z-30"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full border border-neutral-100 shadow-sm">
            <span className="text-neutral-400 font-bold text-sm">OR</span>
          </div>
        </motion.div>

        {/* Right Side - Where To Know */}
        <motion.div 
          layout
          className="relative group cursor-pointer overflow-hidden"
          onClick={() => navigate('/know')}
          onMouseEnter={() => setHoveredSide('know')}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{ 
            flex: hoveredSide === 'know' ? 1.5 : (hoveredSide === 'go' ? 0.8 : 1) 
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 to-white z-0" />
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500 z-10" />
          
          <motion.div 
            layout="position"
            className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              animate={{ 
                scale: hoveredSide === 'know' ? 1.1 : 1,
                rotate: hoveredSide === 'know' ? 5 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-48 h-48 mb-8 drop-shadow-2xl"
            >
              <img src={logoKnow} alt="Where To Know" className="w-full h-full object-contain" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight">
              Where To <span className="text-amber-600">Know</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-md font-medium">
              Discover the stories, history, and secrets behind every building on campus.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-8 py-3 bg-amber-500 text-white rounded-full font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:bg-amber-600 transition-all"
            >
              Explore Buildings
            </motion.button>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

export default LandingPage;
