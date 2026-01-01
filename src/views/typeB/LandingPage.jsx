import React, { useState } from 'react';
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
  const [hoveredSide, setHoveredSide] = useState(null); // 'go' | 'know' | null

  return (
    <motion.div 
      className="relative w-full h-screen overflow-hidden bg-neutral-50 flex flex-col md:flex-row"
      variants={FADE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <InteractiveGridPattern
        className="fixed inset-0 z-[5] opacity-90"
        width={23}
        height={23}
        squares={[90, 50]}
        hoveredSide={hoveredSide}
      />
      
      <LayoutGroup>
        <motion.div 
          className="relative group overflow-hidden"
          onMouseEnter={() => setHoveredSide('go')}
          onMouseLeave={() => setHoveredSide(null)}
          initial={false}
          animate={{ 
            flex: hoveredSide === 'go' ? 1.5 : (hoveredSide === 'know' ? 0.8 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ type: "spring", stiffness: 210, damping: 20 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-indigo-100 to-slate-50 z-0" />
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500 z-10" />
          
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center"
          >
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
            
            <h2 className="flex items-center justify-center text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight gap-2">
              Where To 
              <AnimatedShinyText 
                className="inline-flex items-center justify-center px-2 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 font-bold"
                shimmerWidth={200}
              >
                <span className="bg-gradient-to-tl from-sky-300 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Go</span>
              </AnimatedShinyText>
            </h2>
            <TextGenerateEffect 
              words="Find the quickest routes across UC Berkeley campus." 
              className="text-lg text-neutral-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-4"
              duration={0.4}
              staggerDelay={0.16}
            />
            
            <div className="mt-8">
              <ShimmerButton
                className="shadow-2xl hover:scale-105 transition-transform"
                background="#2563eb"
                shimmerColor="#93c5fd"
                shimmerDuration="2.5s"
                onClick={() => navigate('/go')}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white lg:text-lg">
                  Start Navigation
                </span>
              </ShimmerButton>
            </div>
          </motion.div>
        </motion.div>

        <div className="hidden md:block w-px bg-neutral-200/50 relative z-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-full border border-neutral-200 shadow-sm">
            <span className="text-neutral-400 font-bold text-xs">OR</span>
          </div>
        </div>

        <motion.div 
          className="relative group overflow-hidden"
          onMouseEnter={() => setHoveredSide('know')}
          onMouseLeave={() => setHoveredSide(null)}
          initial={false}
          animate={{ 
            flex: hoveredSide === 'know' ? 1.5 : (hoveredSide === 'go' ? 0.8 : 1) 
          }}
          style={{ willChange: 'flex' }}
          transition={{ type: "spring", stiffness: 210, damping: 20 }}>
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-200 via-orange-100 to-yellow-50 z-0" />
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500 z-10" />
          
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center"
          >
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
            
            <h2 className="flex items-center justify-center text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight gap-2">
              Where To 
              <AnimatedShinyText 
                className="inline-flex items-center justify-center px-2 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 font-bold"
                shimmerWidth={200}
              >
                <span className="bg-gradient-to-tl from-amber-300 via-amber-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[-1px_-1px_2px_rgba(245,158,11,0.3)]">Know</span>
              </AnimatedShinyText>
            </h2>
            <TextGenerateEffect 
              words="Uncover the history and secrets of Cal buildings." 
              className="text-lg text-neutral-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-4"
              duration={0.4}
              staggerDelay={0.16}
            />
            
            <div className="mt-8">
              <ShimmerButton
                className="shadow-2xl hover:scale-105 transition-transform"
                background="#d97706"
                shimmerColor="#fcd34d"
                shimmerDuration="2.5s"
                onClick={() => navigate('/know')}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white lg:text-lg">
                  Explore Buildings
                </span>
              </ShimmerButton>
            </div>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}

export default LandingPage;
