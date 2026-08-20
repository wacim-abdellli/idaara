'use client';

import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const languages: Array<{ code: SupportedLanguage; label: string }> = [
    { code: 'derja', label: '🇹🇳' },
    { code: 'fr',    label: 'FR' },
    { code: 'ar',    label: 'ع' },
  ];

  return (
    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 shadow-inner shrink-0 gap-0.5">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            title={lang.code === 'derja' ? 'Derja 🇹🇳' : lang.code === 'fr' ? 'Français' : 'عربي'}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all duration-200 cursor-pointer leading-none ${
              isActive
                ? 'bg-zinc-700 text-emerald-300 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};
