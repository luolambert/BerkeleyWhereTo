import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * HoverEffect - A grid component that adds a smooth sliding background effect on hover.
 * 
 * @param {Array} items - The array of data items to render.
 * @param {Function} renderItem - A function that returns the React element for each item. (item, index) => ReactNode
 * @param {string} className - Additional classes for the grid container.
 * @param {string} layoutId - Unique ID for the layout animation to prevent conflict between multiple grids.
 */
export const HoverEffect = ({
  items,
  renderItem,
  className,
  layoutId = "hoverBackground",
  ...props
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      {...props}
      className={cn(
        "grid py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.id || idx}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="sync">
            {hoveredIndex === idx && (
              <motion.span
                className="absolute block bg-primary-50 border border-primary-300/50 z-0"
                style={{ top: '-7px', left: '-5px', right: '-5px', bottom: '-3px', borderRadius: '21px' }}
                layoutId={layoutId}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: "spring", stiffness: 500, damping: 30 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full w-full">
            {renderItem(item, idx)}
          </div>
        </div>
      ))}
    </div>
  );
};
