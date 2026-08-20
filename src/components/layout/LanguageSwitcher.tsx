'use client';

import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const languages: Array<{ code: SupportedLanguage; label: string; title: string }> = [
    { code: 'derja', label: 'TN',  title: 'Derja Tounsi 🇹🇳' },
    { code: 'fr',    label: 'FR',  title: 'Français 🇫🇷' },
    { code: 'ar',    label: 'AR',  title: 'عربي 🇸🇦' },
  ];

  return (
    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 gap-0.5 shrink-0">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            title={lang.title}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all duration-200 cursor-pointer leading-none ${
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
