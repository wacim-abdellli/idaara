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

  const applyDomLocale = (l: SupportedLanguage) => {
    const isRtlLocale = l === 'ar';
    document.documentElement.setAttribute('dir', isRtlLocale ? 'rtl' : 'ltr');
    const langMap: Record<SupportedLanguage, string> = {
      ar: 'ar',
      derja: 'fr-TN',
      fr: 'fr',
      en: 'en',
    };
    document.documentElement.setAttribute('lang', langMap[l] || 'fr');
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('idaara_locale') as SupportedLanguage;
      if (saved && VALID_LOCALES.includes(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe localStorage sync
        setLocaleState(saved);
        applyDomLocale(saved);
      }
    } catch {
      // localStorage not available (private mode / restricted browser)
    }
  }, []);

  const setLocale = (newLocale: SupportedLanguage) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('idaara_locale', newLocale);
    } catch {
      // noop
    }
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
