'use client';

import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const languages: Array<{ code: SupportedLanguage; label: string; flag: string }> = [
    { code: 'derja', label: 'Derja', flag: '🇹🇳' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'عربي', flag: '🇸🇦' },
  ];

  return (
    <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-full p-0.5 shadow-inner shrink-0">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <span className="text-xs">{lang.flag}</span>
            <span className="text-[11px] font-medium">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};
