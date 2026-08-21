'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, translations } from '../data/translations';

interface LocaleContextType {
  locale: SupportedLanguage;
  setLocale: (locale: SupportedLanguage) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const VALID_LOCALES: SupportedLanguage[] = ['derja', 'fr', 'ar', 'en'];

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLanguage>('derja');

  useEffect(() => {
    const saved = localStorage.getItem('idaara_locale') as SupportedLanguage;
    if (saved && VALID_LOCALES.includes(saved)) {
      setLocaleState(saved);
      applyDomLocale(saved);
    }
  }, []);

  const applyDomLocale = (l: SupportedLanguage) => {
    if (l === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', l === 'fr' ? 'fr' : l === 'en' ? 'en' : 'fr-TN');
    }
  };

  const setLocale = (newLocale: SupportedLanguage) => {
    setLocaleState(newLocale);
    localStorage.setItem('idaara_locale', newLocale);
    applyDomLocale(newLocale);
  };

  const isRtl = locale === 'ar';

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations['en']?.[key] || translations['fr']?.[key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isRtl }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
