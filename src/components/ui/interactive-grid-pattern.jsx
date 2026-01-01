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
  layout = 'horizontal',
  containerRef = null,
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [squaresState, setSquaresState] = useState(new Map());
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1080);
  
  // Use refs to avoid stale closure issues in event handlers
  const currentSquareRef = useRef(null);
  const isTouchingRef = useRef(false);
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  const patternId = useId();

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Divider ratio based on hoveredSide
  const getDividerRatio = useCallback(() => {
    if (hoveredSide === 'go') return 1.5 / 2.3;
    if (hoveredSide === 'know') return 0.8 / 2.3;
    return 0.5;
  }, [hoveredSide]);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      const target = containerRef?.current || svgRef.current;
      if (!target) {
        rafRef.current = null;
        return;
      }
      
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        const current = currentSquareRef.current;
        if (current !== null) {
          currentSquareRef.current = null;
          setSquaresState(prev => {
            if (!prev.has(current)) return prev;
            const next = new Map(prev);
            next.set(current, { active: false, timestamp: Date.now() });
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
        const current = currentSquareRef.current;
        
        if (current !== index) {
          if (current !== null) {
            setSquaresState(prev => {
              const next = new Map(prev);
              if (prev.has(current)) {
                next.set(current, { active: false, timestamp: Date.now() });
              }
              return next;
            });
          }
          
          currentSquareRef.current = index;
          setSquaresState(prev => {
            const next = new Map(prev);
            next.set(index, { active: true, timestamp: Date.now() });
            return next;
          });
        }
      }
      
      rafRef.current = null;
    });
  }, [width, height, horizontal, vertical, containerRef]);

  const handleMouseLeave = useCallback(() => {
    const current = currentSquareRef.current;
    if (current !== null) {
      setSquaresState(prev => {
        const next = new Map(prev);
        if (prev.has(current)) {
          next.set(current, { active: false, timestamp: Date.now() });
        }
        return next;
      });
      currentSquareRef.current = null;
    }
  }, []);

  // Core position processing - shared by touch
  const processPosition = useCallback((clientX, clientY) => {
    const target = containerRef?.current || svgRef.current;
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      const current = currentSquareRef.current;
      if (current !== null) {
        currentSquareRef.current = null;
        setSquaresState(prev => {
          if (!prev.has(current)) return prev;
          const next = new Map(prev);
          next.set(current, { active: false, timestamp: Date.now() });
          return next;
        });
      }
      return;
    }
    
    const col = Math.floor(x / width);
    const row = Math.floor(y / height);
    
    if (col >= 0 && col < horizontal && row >= 0 && row < vertical) {
      const index = row * horizontal + col;
      const current = currentSquareRef.current;
      
      if (current !== index) {
        if (current !== null) {
          setSquaresState(prev => {
            const next = new Map(prev);
            if (prev.has(current)) {
              next.set(current, { active: false, timestamp: Date.now() });
            }
            return next;
          });
        }
        
        currentSquareRef.current = index;
        setSquaresState(prev => {
          const next = new Map(prev);
          next.set(index, { active: true, timestamp: Date.now() });
          return next;
        });
      }
    }
  }, [width, height, horizontal, vertical, containerRef]);

  // Touch handlers
  const handleTouchStart = useCallback(() => {
    isTouchingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isTouchingRef.current) return;
    if (rafRef.current) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    rafRef.current = requestAnimationFrame(() => {
      processPosition(touch.clientX, touch.clientY);
      rafRef.current = null;
    });
  }, [processPosition]);

  const handleTouchEnd = useCallback(() => {
    isTouchingRef.current = false;
    const current = currentSquareRef.current;
    if (current !== null) {
      setSquaresState(prev => {
        const next = new Map(prev);
        if (prev.has(current)) {
          next.set(current, { active: false, timestamp: Date.now() });
        }
        return next;
      });
      currentSquareRef.current = null;
    }
  }, []);

  // Global mouse and touch listeners
  useEffect(() => {
    const container = containerRef?.current;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Touch events: listen on container if provided, otherwise document
    const touchTarget = container || document;
    touchTarget.addEventListener('touchstart', handleTouchStart, { passive: true });
    touchTarget.addEventListener('touchmove', handleTouchMove, { passive: true });
    touchTarget.addEventListener('touchend', handleTouchEnd);
    touchTarget.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      touchTarget.removeEventListener('touchstart', handleTouchStart);
      touchTarget.removeEventListener('touchmove', handleTouchMove);
      touchTarget.removeEventListener('touchend', handleTouchEnd);
      touchTarget.removeEventListener('touchcancel', handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd, containerRef]);

  // Clean up faded squares after animation completes (1000ms)
  useEffect(() => {
    if (squaresState.size === 0) return;
    
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
  }, [squaresState.size]);

  const isLeftSide = useCallback((col) => {
    const dividerRatio = getDividerRatio();
    const squareXRatio = (col * width + width / 2) / viewportWidth;
    return squareXRatio < dividerRatio;
  }, [width, viewportWidth, getDividerRatio]);

  const isTopSide = useCallback((row) => {
    const dividerRatio = getDividerRatio();
    const squareYRatio = (row * height + height / 2) / viewportHeight;
    return squareYRatio < dividerRatio;
  }, [height, viewportHeight, getDividerRatio]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      className={cn("pointer-events-none", className)}
      style={{ touchAction: 'none' }}
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
      
      {Array.from(squaresState.entries()).map(([index, data]) => {
        const col = index % horizontal;
        const row = Math.floor(index / horizontal);
        const x = col * width;
        const y = row * height;
        const isBlue = layout === 'vertical' ? isTopSide(row) : isLeftSide(col);
        const color = isBlue ? "rgb(59, 130, 246)" : "rgb(245, 158, 11)";
        
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
