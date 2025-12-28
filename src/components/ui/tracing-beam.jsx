"use client";
import React, { useEffect, useLayoutEffect, useRef, useState, useId } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
  containerRef // NEW: scrollable container ref
}) => {
  const ref = useRef(null);
  const gradientId = useId(); // Unique id to prevent gradient conflicts
  
  // Track container scroll progress (not element visibility)
  // Only use container - scrollYProgress will be 0 at top, 1 at bottom
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Sync initial height measurement
  useLayoutEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Observe content height changes (e.g., when sorting changes)
  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height > 0) {
          setSvgHeight(height);
        }
      }
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Ensure minimum height for valid gradient calculations
  const effectiveHeight = Math.max(svgHeight, 100);

  // Calculate gradient position for the beam head effect
  // The gradient moves with scroll, creating a solid line with a gradient head at the bottom
  const gradientStart = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, effectiveHeight - 50]),
    { stiffness: 500, damping: 90 }
  );
  const gradientEnd = useSpring(
    useTransform(scrollYProgress, [0, 0.001, 1], [0, 50, effectiveHeight - 40]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}>
      <div className="absolute top-2 left-0 md:left-4">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 5px",
          }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 bg-white">
          <div
            className="h-2 w-2 rounded-full bg-amber-500" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${effectiveHeight - 68}`}
          width="20"
          height={effectiveHeight - 68}
          className="ml-4 block"
          aria-hidden="true">
          {/* Background gray line - full length */}
          <motion.path
            d={`M 19 0V ${effectiveHeight - 40}`}
            fill="none"
            stroke="#D4D4D4"
            strokeOpacity="0.16"
            strokeWidth="1.25"
          />
          {/* Animated progress line - grows with scroll, with gradient beam effect */}
          <motion.path
            d={`M 19 0V ${effectiveHeight - 40}`}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={gradientStart}
              y2={gradientEnd}>
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
