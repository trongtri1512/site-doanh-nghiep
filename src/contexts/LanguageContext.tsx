import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_default: boolean;
  is_active: boolean;
  display_order: number;
}

interface Translation {
  translation_key: string;
  translation_value: string;
  category: string;
}

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: Language[];
  translations: Record<string, string>;
  setLanguage: (languageCode: string) => void;
  t: (key: string, fallback?: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Detect language from URL
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      return 'en';
    }
    return localStorage.getItem('language') || 'vi';
  });

  // Fetch available languages
  const { data: availableLanguages = [] } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data as Language[];
    }
  });

  // Fetch translations for current language
  const { data: translationsData = [], isLoading: loading } = useQuery({
    queryKey: ['translations', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('translation_key, translation_value, category')
        .eq('language_code', currentLanguage);
      
      if (error) throw error;
      return data as Translation[];
    },
    enabled: !!currentLanguage
  });

  // Convert translations array to object for easy lookup
  const translations = React.useMemo(() => {
    const translationMap: Record<string, string> = {};
    translationsData.forEach(translation => {
      translationMap[translation.translation_key] = translation.translation_value;
    });
    return translationMap;
  }, [translationsData]);

  const setLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    
    // Update URL based on language
    const currentPath = window.location.pathname;
    let newPath: string;
    
    if (languageCode === 'en') {
      // Switch to English - add /en prefix
      if (currentPath.startsWith('/en')) {
        return; // Already on English route
      }
      newPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
    } else {
      // Switch to Vietnamese - remove /en prefix
      if (!currentPath.startsWith('/en')) {
        return; // Already on Vietnamese route
      }
      newPath = currentPath.replace(/^\/en/, '') || '/';
    }
    
    window.history.pushState({}, '', newPath);
    window.location.reload(); // Reload to apply language changes
  };

  const t = (key: string, fallback?: string) => {
    return translations[key] || fallback || key;
  };

  // Set default language on first load
  useEffect(() => {
    if (availableLanguages.length > 0 && !localStorage.getItem('language')) {
      const defaultLang = availableLanguages.find(lang => lang.is_default);
      if (defaultLang) {
        setLanguage(defaultLang.code);
      }
    }
  }, [availableLanguages]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages,
        translations,
        setLanguage,
        t,
        loading
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};