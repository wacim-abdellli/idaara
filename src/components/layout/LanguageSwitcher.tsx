'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

const LANGUAGES: Array<{ code: SupportedLanguage; flag: string; label: string; native: string }> = [
  { code: 'derja', flag: '🇹🇳', label: 'TN', native: 'Derja'    },
  { code: 'fr',    flag: '🇫🇷', label: 'FR', native: 'Français' },
  { code: 'ar',    flag: '🇹🇳', label: 'ع',  native: 'العربية'  },
  { code: 'en',    flag: '🇬🇧', label: 'EN', native: 'English'  },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 h-8 px-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${
          open
            ? 'bg-zinc-800 border-zinc-600 text-white'
            : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-zinc-800/80'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="font-bold tracking-wide">{current.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute right-0 top-full mt-2 w-40 bg-zinc-900 border border-zinc-700/70 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-[60]"
          >
            {/* Header */}
            <div className="px-3 pt-2.5 pb-1.5 border-b border-zinc-800">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Language</p>
            </div>

            {/* Options */}
            <div className="p-1.5 space-y-0.5">
              {LANGUAGES.map((lang) => {
                const isActive = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => { setLocale(lang.code); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-100 cursor-pointer text-left ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold">{lang.label}</span>
                      <span className="text-zinc-500 ml-1.5 font-normal">{lang.native}</span>
                    </div>
                    {isActive && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
