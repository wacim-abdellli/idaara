'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { SupportedLanguage } from '../../data/translations';

// ── Crisp vector flags that render 100% identically on Windows, Mac, iOS, Android ──
const FlagTN: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 36 36" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs`} aria-hidden="true">
    <rect width="36" height="36" fill="#E70013" />
    <circle cx="18" cy="18" r="9" fill="#FFFFFF" />
    <path
      d="M18,10.5 A7.5,7.5 0 1,0 18,25.5 A6,6 0 1,1 18,13.5 Z"
      fill="#E70013"
      transform="translate(1.5, 0)"
    />
    <polygon
      points="19.5,14.5 20.3,16.5 22.5,16.5 20.7,17.8 21.4,19.8 19.5,18.5 17.6,19.8 18.3,17.8 16.5,16.5 18.7,16.5"
      fill="#E70013"
    />
  </svg>
);

const FlagFR: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 36 36" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs`} aria-hidden="true">
    <rect width="12" height="36" x="0" fill="#002395" />
    <rect width="12" height="36" x="12" fill="#FFFFFF" />
    <rect width="12" height="36" x="24" fill="#ED2939" />
  </svg>
);

const FlagGB: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 36 36" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs`} aria-hidden="true">
    <rect width="36" height="36" fill="#012169" />
    <path d="M0,0 L36,36 M36,0 L0,36" stroke="#FFFFFF" strokeWidth="5.5" />
    <path d="M0,0 L36,36 M36,0 L0,36" stroke="#C8102E" strokeWidth="2.2" />
    <path d="M18,0 V36 M0,18 H36" stroke="#FFFFFF" strokeWidth="9" />
    <path d="M18,0 V36 M0,18 H36" stroke="#C8102E" strokeWidth="5" />
  </svg>
);

interface LangOption {
  code: SupportedLanguage;
  label: string;
  native: string;
  sub: string;
  flag: React.FC<{ className?: string }>;
}

const LANGUAGES: LangOption[] = [
  { code: 'derja', label: 'TN', native: 'Derja',    sub: 'Tounsi 🇹🇳', flag: FlagTN },
  { code: 'fr',    label: 'FR', native: 'Français', sub: 'France 🇫🇷', flag: FlagFR },
  { code: 'ar',    label: 'ع',  native: 'العربية',  sub: 'تونس 🇹🇳',  flag: FlagTN },
  { code: 'en',    label: 'EN', native: 'English',  sub: 'Global 🌐', flag: FlagGB },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, isRtl } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
  const CurrentFlag = current.flag;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0 select-none">
      {/* ── Trigger Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 h-8 px-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
          open
            ? 'bg-zinc-800 border-zinc-700 text-white shadow-xs'
            : 'bg-zinc-900/90 border-zinc-800/90 text-zinc-300 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/80'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={
          locale === 'ar'
            ? 'مختار اللغة'
            : locale === 'derja'
            ? 'Changement de langue'
            : locale === 'en'
            ? 'Language selector'
            : 'Sélecteur de langue'
        }
      >
        <CurrentFlag className="w-3.5 h-3.5" />
        <span className="font-bold text-xs tracking-tight">{current.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* ── Dropdown Panel (RTL-aware positioning) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className={`absolute top-full mt-2 w-48 bg-zinc-950/98 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-[70] ${
              isRtl ? 'left-0' : 'right-0'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-850 bg-zinc-900/40">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-2.5 h-2.5" />
                {locale === 'ar'
                  ? 'اللغة'
                  : locale === 'derja'
                  ? 'Lougha'
                  : locale === 'en'
                  ? 'Language'
                  : 'Langue'}
              </span>
            </div>

            {/* Options */}
            <div className="p-1 space-y-0.5">
              {LANGUAGES.map((lang) => {
                const isActive = locale === lang.code;
                const FlagComponent = lang.flag;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setLocale(lang.code);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-all duration-100 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/25'
                        : 'text-zinc-300 hover:bg-zinc-850 hover:text-white border border-transparent'
                    }`}
                  >
                    <FlagComponent className="w-4 h-4" />
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-xs">{lang.native}</span>
                        <span className="text-[10px] font-mono text-zinc-500">({lang.label})</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{lang.sub}</span>
                    </div>
                    {isActive && (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1 rtl:mr-1 rtl:ml-0" />
                    )}
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
