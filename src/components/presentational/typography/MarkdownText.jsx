import React from 'react';

/**
 * 简单的 Markdown 渲染组件
 * 支持：链接 [text](url) 和 粗体 **text**
 */
const MarkdownText = ({ text, className = "" }) => {
  if (!text) return null;
  
  // Split by links [text](url) OR bold markers **text**
  const regex = /(\[.*?\]\(.*?\)|(?:\*\*.*?\*\*))/g;
  const parts = text.split(regex);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Handle Links: [text](url)
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            const [_, linkText, linkUrl] = match;
            return (
              <a 
                key={index} 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-800 transition-colors font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                {linkText}
              </a>
            );
          }
        }

        // Handle Bold: **text**
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-neutral-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default MarkdownText;
