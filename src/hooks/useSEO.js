import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../constants/seoConfig';

/**
 * Custom hook for dynamic SEO updates
 * Updates title, description, keywords, OG tags based on current route
 */
export function useSEO() {
  const location = useLocation();

  useEffect(() => {
    // Determine which config to use based on pathname
    let config;
    if (location.pathname === '/go') {
      config = SEO_CONFIG.go;
    } else if (location.pathname === '/know') {
      config = SEO_CONFIG.know;
    } else {
      config = SEO_CONFIG.landing;
    }

    // Update document title
    document.title = config.title;

    // Update favicon
    const faviconLink = document.querySelector("link[rel~='icon']");
    if (faviconLink) {
      faviconLink.href = config.favicon;
    }

    // Update or create meta description
    updateMetaTag('name', 'description', config.description);

    // Update or create meta keywords
    updateMetaTag('name', 'keywords', config.keywords);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', config.ogTitle);
    updateMetaTag('property', 'og:description', config.ogDescription);
    updateMetaTag('property', 'og:image', config.ogImage);
    updateMetaTag(
      'property',
      'og:url',
      `https://berkeleywhereto.vercel.app${location.pathname}`
    );

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', config.ogTitle);
    updateMetaTag('name', 'twitter:description', config.ogDescription);
    updateMetaTag('name', 'twitter:image', config.ogImage);

    // Update canonical URL
    const canonicalLink = document.querySelector("link[rel='canonical']");
    if (canonicalLink) {
      canonicalLink.href = `https://berkeleywhereto.vercel.app${location.pathname}`;
    }
  }, [location.pathname]);
}

/**
 * Helper function to update or create a meta tag
 */
function updateMetaTag(attribute, value, content) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);

  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

export default useSEO;
