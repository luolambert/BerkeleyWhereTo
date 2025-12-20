import { useCallback } from 'react';
import translations from '../locales';

/**
 * Translation Hook
 * Retrieves translated text based on language code
 * 
 * @param {string} language - Language code ('CN' | 'EN')
 * @returns {object} - Translation utilities
 */
function useTranslation(language = 'EN') {
  // Get translations for current language
  const t = translations[language] || translations.EN;
  
  /**
   * Retrieves translation for a given key
   * @param {string} key - Translation key, e.g., 'building.viewDetails'
   * @param {string} defaultValue - Default value if key is not found
   * @returns {string} Translated text
   */
  const translate = useCallback((key, defaultValue = key) => {
    const keys = key.split('.');
    let result = t;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof result === 'string' ? result : defaultValue;
  }, [t]);

  return {
    t: translate,        // Translation function
    translations: t,     // Full translation object
    language,           // Current language code
    isEnglish: language === 'EN',
    isChinese: language === 'CN',
  };
}

export default useTranslation;
