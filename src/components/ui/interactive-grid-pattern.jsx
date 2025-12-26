import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { cn } from "../../lib/utils";

/**
 * InteractiveGridPattern - Faithful recreation of Magic UI's implementation
 * 
 * Animation logic from official:
 * - Enter: fast (150ms) 
 * - Leave: slow (1000ms)
 * - CSS transition handles all animations
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  hoveredSide = null,
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [currentSquare, setCurrentSquare] = useState(null);
  // Map<index, { active: boolean, timestamp: number }>
  const [squares_state, setSquaresState] = useState(new Map());
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  const patternId = useId();

  // Track viewport width
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Divider ratio based on hoveredSide
  const getDividerRatio = useCallback(() => {
    if (hoveredSide === 'go') return 1.5 / 2.3;
    if (hoveredSide === 'know') return 0.8 / 2.3;
    return 0.5;
  }, [hoveredSide]);

  // Mouse move handler - track squares mouse passes over
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (!svgRef.current) {
        rafRef.current = null;
        return;
      }
      
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        // Mouse left the grid area
        if (currentSquare !== null) {
          setCurrentSquare(null);
          // Mark current square as fading
          setSquaresState(prev => {
            if (!prev.has(currentSquare)) return prev;
            const next = new Map(prev);
            next.set(currentSquare, { active: false, timestamp: Date.now() });
            return next;
          });
        }
        rafRef.current = null;
        return;
      }
      
      const col = Math.floor(x / width);
      const row = Math.floor(y / height);
      
      if (col >= 0 && col < horizontal && row >= 0 && row < vertical) {
        const index = row * horizontal + col;
        
        if (currentSquare !== index) {
          // Mark old square as fading
          if (currentSquare !== null) {
            setSquaresState(prev => {
              const next = new Map(prev);
              if (prev.has(currentSquare)) {
                next.set(currentSquare, { active: false, timestamp: Date.now() });
              }
              return next;
            });
          }
          
          // Set new square as active
          setCurrentSquare(index);
          setSquaresState(prev => {
            const next = new Map(prev);
            next.set(index, { active: true, timestamp: Date.now() });
            return next;
          });
        }
      }
      
      rafRef.current = null;
    });
  }, [width, height, horizontal, vertical, currentSquare]);

  // Handle mouse leaving the document
  const handleMouseLeave = useCallback(() => {
    if (currentSquare !== null) {
      setSquaresState(prev => {
        const next = new Map(prev);
        if (prev.has(currentSquare)) {
          next.set(currentSquare, { active: false, timestamp: Date.now() });
        }
        return next;
      });
      setCurrentSquare(null);
    }
  }, [currentSquare]);

  // Global mouse listener
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Clean up faded squares after animation completes (1000ms)
  useEffect(() => {
    if (squares_state.size === 0) return;
    
    const timer = setInterval(() => {
      const now = Date.now();
      setSquaresState(prev => {
        const next = new Map();
        let changed = false;
        
        prev.forEach((data, index) => {
          if (data.active) {
            // Active squares stay
            next.set(index, data);
          } else if (now - data.timestamp < 1000) {
            // Still fading (CSS animation in progress)
            next.set(index, data);
          } else {
            // Fade complete, remove
            changed = true;
          }
        });
        
        return changed ? next : prev;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [squares_state.size]);

  // Determine if square is on left or right
  const isLeftSide = useCallback((col) => {
    const dividerRatio = getDividerRatio();
    const squareXRatio = (col * width + width / 2) / viewportWidth;
    return squareXRatio < dividerRatio;
  }, [width, viewportWidth, getDividerRatio]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      className={cn("pointer-events-none", className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={width}
            height={height}
            fill="transparent"
            stroke="currentColor"
            strokeOpacity={0}
            strokeWidth={1}
          />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      
      {/* Render all tracked squares with CSS transitions */}
      {Array.from(squares_state.entries()).map(([index, data]) => {
        const col = index % horizontal;
        const row = Math.floor(index / horizontal);
        const x = col * width;
        const y = row * height;
        const left = isLeftSide(col);
        const color = left ? "rgb(59, 130, 246)" : "rgb(245, 158, 11)";
        
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            fill={color}
            className={cn(
              // Core animation: fast in (150ms), slow out (1000ms) - matching official
              data.active 
                ? "transition-opacity duration-150 ease-in-out" 
                : "transition-opacity duration-1000 ease-out",
              // Opacity based on state
              data.active ? "opacity-70" : "opacity-0",
              squaresClassName
            )}
          />
        );
      })}
    </svg>
  );
}
