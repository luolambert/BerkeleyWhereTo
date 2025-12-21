import React from 'react';
import { motion } from 'framer-motion';

/**
 * LogoImage - Animated logo image component
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {'small'|'default'|'large'} size - Logo size
 * @param {boolean} animated - Whether to animate on hover
 * @param {string} className - Additional CSS classes
 */
function LogoImage({
  src,
  alt = 'Logo',
  size = 'default',
  animated = true,
  className = '',
}) {
  const sizeStyles = {
    small: 'w-10 h-10',
    default: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  const Component = animated ? motion.img : 'img';
  const animationProps = animated ? {
    whileHover: { scale: 1.05, rotate: 5 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  } : {};

  return (
    <Component
      src={src}
      alt={alt}
      className={`
        ${sizeStyles[size] || sizeStyles.default}
        object-contain drop-shadow-md
        ${className}
      `}
      {...animationProps}
    />
  );
}

export default LogoImage;
