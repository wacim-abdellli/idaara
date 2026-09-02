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
const COOKIE_NAME = 'idaara_locale';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function readLocaleCookie(): SupportedLanguage | null {
  if (typeof document === 'undefined') return null;
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (!match) return null;
    const val = match.split('=')[1] as SupportedLanguage;
    return VALID_LOCALES.includes(val) ? val : null;
  } catch {
    return null;
  }
}

function writeLocaleCookie(locale: SupportedLanguage) {
  if (typeof document === 'undefined') return;
  try {
    document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    // Also persist in localStorage as secondary backup
    localStorage.setItem(COOKIE_NAME, locale);
  } catch {
    // noop
  }
}

function applyDomLocale(l: SupportedLanguage) {
  document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
  const langMap: Record<SupportedLanguage, string> = {
    ar: 'ar', derja: 'fr-TN', fr: 'fr', en: 'en',
  };
  document.documentElement.setAttribute('lang', langMap[l] || 'fr');
}

interface LocaleProviderProps {
  children: React.ReactNode;
  /** Server-read initial locale from cookie (passed from layout.tsx) */
  initialLocale?: SupportedLanguage;
}

export function LocaleProvider({ children, initialLocale = 'fr' }: LocaleProviderProps) {
  // Use server-provided initialLocale — no mismatch, no flash
  const [locale, setLocaleState] = useState<SupportedLanguage>(initialLocale);

  // On mount, confirm with cookie (handles edge case where cookie changed in another tab)
  useEffect(() => {
    const cookieLocale = readLocaleCookie();
    if (cookieLocale && cookieLocale !== locale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync cookie locale if changed externally
      setLocaleState(cookieLocale);
      applyDomLocale(cookieLocale);
    } else {
      applyDomLocale(locale);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = (newLocale: SupportedLanguage) => {
    setLocaleState(newLocale);
    writeLocaleCookie(newLocale);
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
