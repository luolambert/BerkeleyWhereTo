import React from 'react';
import { MarkdownText, AnimatedText } from '../../common';

/**
 * InfoListSection - Colored info section with icon, title, and bullet list
 * Used for: BuildingDetail (Fun Facts, Student Tips, Legend, Photo Spots)
 * 
 * @param {LucideIcon} icon - Section icon component
 * @param {string} title - Section title
 * @param {string[]} items - List of items (supports markdown)
 * @param {'blue'|'amber'|'purple'|'pink'} variant - Color variant
 * @param {string} language - Current language for animation keys
 * @param {string} sectionKey - Unique key for animations
 */
function InfoListSection({
  icon: Icon,
  title,
  items = [],
  variant = 'blue',
  language = 'EN',
  sectionKey = 'section',
}) {
  const variantStyles = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800',
      bulletColor: 'text-blue-400',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-900',
      textColor: 'text-amber-800',
      bulletColor: 'text-amber-400',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-900',
      textColor: 'text-purple-800',
      bulletColor: 'text-purple-400',
    },
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      iconColor: 'text-pink-600',
      titleColor: 'text-pink-900',
      textColor: 'text-pink-800',
      bulletColor: 'text-pink-400',
    },
  };

  const styles = variantStyles[variant] || variantStyles.blue;

  if (!items || items.length === 0) return null;

  return (
    <section className={`${styles.bg} rounded-2xl p-8 border ${styles.border}`}>
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className={`w-6 h-6 ${styles.iconColor}`} />}
        <h3 className={`text-xl font-bold ${styles.titleColor}`}>
          <AnimatedText textKey={`${sectionKey}-title-${language}`}>
            {title}
          </AnimatedText>
        </h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className={`flex gap-3 ${styles.textColor}`}>
            <span className={`font-bold ${styles.bulletColor} select-none`}>•</span>
            <span><MarkdownText text={item} /></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InfoListSection;
