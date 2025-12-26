import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "../../lib/utils";

/**
 * Dock - Magic UI macOS-style dock with fisheye magnification effect
 * Uses scale transform + horizontal margin for natural button sizing
 */

const DEFAULT_MAGNIFICATION = 1.15;
const DEFAULT_DISTANCE = 100;

const Dock = React.forwardRef(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(
          className,
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          }
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

/**
 * DockIcon - Individual dock item with scale-based magnification
 * Uses scale for visual effect + horizontal margin for layout spacing
 */
const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}) => {
  const ref = useRef(null);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale transform for magnification
  const scaleTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, magnification, 1]
  );

  // Horizontal margin to create space for scaled element
  const marginTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [0, 8, 0]
  );

  const scaleSpring = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const marginSpring = useSpring(marginTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ 
        scale: scaleSpring,
        marginLeft: marginSpring,
        marginRight: marginSpring,
      }}
      className={cn(
        "origin-center cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
