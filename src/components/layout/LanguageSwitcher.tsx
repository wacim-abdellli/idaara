'use client';

import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

const LANGUAGES: Array<{ code: SupportedLanguage; label: string; title: string }> = [
  { code: 'derja', label: 'TN', title: 'Derja Tounsi 🇹🇳' },
  { code: 'fr',    label: 'FR', title: 'Français 🇫🇷' },
  { code: 'ar',    label: 'AR', title: 'عربي' },
  { code: 'en',    label: 'EN', title: 'English 🇬🇧' },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 gap-px shrink-0">
      {LANGUAGES.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            title={lang.title}
            aria-label={lang.title}
            aria-pressed={isActive}
            className={`w-8 h-6 text-[10px] font-bold rounded-full transition-all duration-150 cursor-pointer leading-none shrink-0 ${
              isActive
                ? 'bg-zinc-700 text-emerald-300 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};
