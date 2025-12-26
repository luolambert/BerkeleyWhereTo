import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * RippleButton - A button with ripple effect on click
 * Based on Magic UI's RippleButton component
 */
const RippleButton = React.forwardRef(
  (
    {
      className,
      children,
      rippleColor = '#ffffff',
      duration = '600ms',
      onClick,
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState([]);

    const handleClick = (event) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, key: Date.now() };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          );
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          'relative cursor-pointer overflow-hidden',
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
        <span className="pointer-events-none absolute inset-0 z-20">
          {buttonRipples.map((ripple) => (
            <span
              className="animate-rippling absolute rounded-full"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: 'scale(0)',
                '--duration': duration,
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

export { RippleButton };
