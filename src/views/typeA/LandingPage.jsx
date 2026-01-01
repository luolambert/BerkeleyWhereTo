// TypeA LandingPage - Optimized for mobile portrait + iPad portrait (< 1024px)
// Layout: Vertical stacking (flex-col), supports both hover and tap interactions

import React, { useState, useRef } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoGo from '../../assets/WhereToGo_Logo.png';
import logoKnow from '../../assets/WhereToKnow_Logo.png';
import { FADE_VARIANTS } from '../../constants/animations';
import { LogoImage } from '../../components/presentational/media';
import { ShimmerButton } from '../../components/ui/shimmer-button';
import { AnimatedShinyText } from '../../components/ui/animated-shiny-text';
import { TextGenerateEffect } from '../../components/ui/text-generate-effect';
import { InteractiveGridPattern } from '../../components/ui/interactive-grid-pattern';

function LandingPage() {
  const navigate = useNavigate();
  const [activeSide, setActiveSide] = useState(null); // 'go' | 'know' | null
  const containerRef = useRef(null);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-neutral-50 flex flex-col touch-none"
      variants={FADE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <InteractiveGridPattern
        className="fixed inset-0 z-[5] opacity-90"
        width={20}
        height={20}
        squares={[60, 80]}
        hoveredSide={activeSide}
        layout="vertical"
        containerRef={containerRef}
      />
      
      <LayoutGroup>
        {/* Go Section - Top Half */}
        <motion.div 
          className="relative group overflow-hidden cursor-pointer"
          onPointerDown={() => setActiveSide('go')}
          initial={false}
          animate={{ 
            flex: activeSide === 'go' ? 1.3 : (activeSide === 'know' ? 0.7 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-indigo-100 to-slate-50 z-0" />
          <motion.div 
            className="absolute inset-0 z-10"
            animate={{
              backgroundColor: activeSide === 'go' ? 'rgba(37, 99, 235, 0.05)' : 'rgba(37, 99, 235, 0)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              animate={{ 
                scale: activeSide === 'go' ? 1.08 : 1,
                rotate: activeSide === 'go' ? -3 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mb-4"
            >
              <LogoImage src={logoGo} alt="Where To Go" size="medium" animated={false} />
            </motion.div>
            
            <h2 className="flex items-center justify-center text-3xl font-bold text-neutral-800 mb-2 tracking-tight gap-1.5">
              Where To 
              <AnimatedShinyText 
                className="inline-flex items-center justify-center px-1.5 py-0.5 transition ease-out font-bold"
                shimmerWidth={150}
              >
                <span className="bg-gradient-to-tl from-sky-300 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">Go</span>
              </AnimatedShinyText>
            </h2>
            
            <TextGenerateEffect 
              words="Find the quickest routes across UC Berkeley campus." 
              className="text-sm text-neutral-600 font-medium max-w-[280px] leading-relaxed"
              duration={0.4}
              staggerDelay={0.14}
            />
            
            <motion.div 
              className="mt-4"
              animate={{ scale: activeSide === 'go' ? 1.02 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ShimmerButton
                className="shadow-xl active:scale-95 transition-transform"
                background="#2563eb"
                shimmerColor="#93c5fd"
                shimmerDuration="2.5s"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/go');
                }}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white">
                  Start Navigation
                </span>
              </ShimmerButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Horizontal Divider */}
        <div className="h-px w-full bg-neutral-200/60 relative z-30 flex-shrink-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-sm">
            <span className="text-neutral-400 font-bold text-xs">OR</span>
          </div>
        </div>

        {/* Know Section - Bottom Half */}
        <motion.div 
          className="relative group overflow-hidden cursor-pointer"
          onPointerDown={() => setActiveSide('know')}
          initial={false}
          animate={{ 
            flex: activeSide === 'know' ? 1.3 : (activeSide === 'go' ? 0.7 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-200 via-orange-100 to-yellow-50 z-0" />
          <motion.div 
            className="absolute inset-0 z-10"
            animate={{
              backgroundColor: activeSide === 'know' ? 'rgba(217, 119, 6, 0.05)' : 'rgba(217, 119, 6, 0)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              animate={{ 
                scale: activeSide === 'know' ? 1.08 : 1,
                rotate: activeSide === 'know' ? 3 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mb-4"
            >
              <LogoImage src={logoKnow} alt="Where To Know" size="medium" animated={false} />
            </motion.div>
            
            <h2 className="flex items-center justify-center text-3xl font-bold text-neutral-800 mb-2 tracking-tight gap-1.5">
              Where To 
              <AnimatedShinyText 
                className="inline-flex items-center justify-center px-1.5 py-0.5 transition ease-out font-bold"
                shimmerWidth={150}
              >
                <span className="bg-gradient-to-tl from-amber-300 via-amber-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[-1px_-1px_2px_rgba(245,158,11,0.3)]">Know</span>
              </AnimatedShinyText>
            </h2>
            
            <TextGenerateEffect 
              words="Uncover the history and secrets of Cal buildings." 
              className="text-sm text-neutral-600 font-medium max-w-[280px] leading-relaxed"
              duration={0.4}
              staggerDelay={0.14}
            />
            
            <motion.div 
              className="mt-4"
              animate={{ scale: activeSide === 'know' ? 1.02 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ShimmerButton
                className="shadow-xl active:scale-95 transition-transform"
                background="#d97706"
                shimmerColor="#fcd34d"
                shimmerDuration="2.5s"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/know');
                }}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white">
                  Explore Buildings
                </span>
              </ShimmerButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}

export default LandingPage;
