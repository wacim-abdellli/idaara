'use client';

import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const languages: Array<{ code: SupportedLanguage; label: string; flag: string }> = [
    { code: 'derja', label: 'Derja', flag: '🇹🇳' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-full p-1 shadow-inner">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};
