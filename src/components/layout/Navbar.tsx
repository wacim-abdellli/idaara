'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLogo } from './BrandLogo';
import {
  Sparkles,
  FileSearch,
  FileText,
  Calculator,
  MapPin,
  Rocket,
  BookOpen,
  Briefcase,
  Menu,
  X,
  Search,
  Globe,
  Phone,
  ChevronDown,
} from 'lucide-react';

// ── Core Flagship Links (Always visible on desktop lg+) ────────────────────
const PRIMARY_LINKS = [
  { href: '/copilot',    tKey: 'copilotNav',    icon: Sparkles   },
  { href: '/fasserli',   tKey: 'fasserliNav',   icon: FileSearch },
  { href: '/documents',  tKey: 'documentsNav',  icon: FileText   },
  { href: '/locator',    tKey: 'locatorNav',    icon: MapPin     },
  { href: '/procedures', tKey: 'proceduresNav', icon: BookOpen   },
] as const;

// ── Secondary / Extended Tools (In "More" dropdown on desktop) ─────────────
const MORE_LINKS = [
  { href: '/launchpad',  tKey: 'launchpadNav',  icon: Rocket,     desc: { ar: 'نظام المبادر الذاتي 1% والضرائب', fr: 'Régime Auto-Entrepreneur 1% & Factures Export', en: 'Self-entrepreneur 1% tax & export billing', derja: 'Auto-Entrepreneur 1% w faktouret export' } },
  { href: '/calculator', tKey: 'calculatorNav', icon: Calculator, desc: { ar: 'حساب معاليم التنابر والوثائق الجبائية', fr: 'Calculateur officiel de timbres fiscaux', en: 'Official fiscal stamp & duty calculator', derja: 'A7seb timbrik mrigel men ghir ghalat' } },
  { href: '/concours',   tKey: 'concoursNav',   icon: Briefcase,  desc: { ar: 'دليل ومواعيد مناظرات الوظيفة العمومية', fr: 'Portail des concours de la fonction publique', en: 'Public sector job competitions guide', derja: 'Dalil el monadharét el 3omoumiya' } },
  { href: '/portails',   tKey: 'portailsNav',   icon: Globe,      desc: { ar: '15 بوابة حكومية رقمية رسمية', fr: '15 portails officiels de l\'administration en ligne', en: '15 official Tunisian e-Gov portals', derja: '15 portail houkoumi 3la internet' } },
  { href: '/contacts',   tKey: 'contactsNav',   icon: Phone,      desc: { ar: 'أرقام الطوارئ والوزارات الرسمية', fr: 'Numéros d\'urgence (197/190/198) et ministères', en: 'Emergency (197/190/198) and ministry hotlines', derja: 'Ar9am el 7adra wel wezarat' } },
] as const;

// ── All links for mobile drawer ───────────────────────────────────────────
const ALL_MOBILE_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

export const Navbar: React.FC = () => {
  const { t, locale, isRtl } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const copilotLabel = locale === 'ar' ? 'المساعد الذكي' : 'Idaara AI';
  const moreLabel =
    locale === 'ar' ? 'المزيد' : locale === 'fr' ? 'Plus' : locale === 'derja' ? 'Akther' : 'More';

  const isMoreActive = MORE_LINKS.some(
    (link) => pathname === link.href || pathname.startsWith(link.href)
  );

  const triggerCommandPalette = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/70 bg-zinc-950/95 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between h-14 gap-2 lg:gap-4">

          {/* ── Left: Brand Logo & Desktop Navigation ── */}
          <div className="flex items-center gap-3 lg:gap-5 min-w-0">
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main Navigation">
              {PRIMARY_LINKS.map(({ href, tKey }) => {
                const isActive = pathname === href || pathname.startsWith(href);
                const label = t(tKey);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-150 shrink-0 select-none ${
                      isActive
                        ? 'text-emerald-300 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-zinc-800/90 rounded-xl -z-10 border border-zinc-700/60 shadow-xs"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}

              {/* ── "More / المزيد" Dropdown Trigger ── */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
                    isMoreActive
                      ? 'text-emerald-300 font-bold bg-zinc-900/80 border border-emerald-500/30'
                      : moreOpen
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                  aria-expanded={moreOpen}
                  aria-haspopup="menu"
                >
                  <span>{moreLabel}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      moreOpen ? 'rotate-180 text-emerald-400' : 'text-zinc-500'
                    }`}
                  />
                </button>

                {/* ── "More" Mega Dropdown Menu ── */}
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      role="menu"
                      className={`absolute top-full mt-2 w-72 bg-zinc-950/98 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl shadow-2xl shadow-black/80 p-2 z-[70] ${
                        isRtl ? 'right-0' : 'left-0'
                      }`}
                    >
                      <div className="px-2.5 py-1.5 mb-1 border-b border-zinc-850">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {isRtl ? 'الخدمات والأدوات الإضافية' : 'Services & Outils'}
                        </p>
                      </div>

                      <div className="space-y-1">
                        {MORE_LINKS.map(({ href, tKey, icon: Icon, desc }) => {
                          const isActive = pathname === href || pathname.startsWith(href);
                          const description = desc[locale as keyof typeof desc] ?? desc.fr;
                          return (
                            <Link
                              key={href}
                              href={href}
                              role="menuitem"
                              onClick={() => setMoreOpen(false)}
                              className={`flex items-start gap-3 p-2 rounded-xl text-xs transition-all duration-120 group ${
                                isActive
                                  ? 'bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/25'
                                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                              }`}
                            >
                              <div
                                className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                                  isActive
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-zinc-900 group-hover:bg-zinc-800 text-zinc-400 group-hover:text-emerald-400'
                                } transition-colors`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                  {t(tKey)}
                                </div>
                                <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5 font-normal">
                                  {description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>

          {/* ── Right Side: Search Trigger, Language Dropdown, AI Copilot CTA, Mobile Toggle ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger Button (Desktop) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerCommandPalette}
              className="hidden lg:flex items-center gap-2 h-8 px-2.5 xl:px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-all cursor-pointer shrink-0 shadow-xs max-w-[130px] xl:max-w-[160px]"
              title={
                locale === 'ar'
                  ? 'بحث في إدارة (Ctrl+K)'
                  : locale === 'derja'
                  ? 'Lawwej fi Idaara (Ctrl+K)'
                  : locale === 'fr'
                  ? 'Rechercher sur Idaara (Ctrl+K)'
                  : 'Search Idaara (Ctrl+K)'
              }
            >
              <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-xs text-zinc-400 truncate">{t('quickSearchPrompt')}</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-500 rounded border border-zinc-700 shrink-0">
                ⌘K
              </kbd>
            </motion.button>

            {/* Language Switcher Dropdown */}
            <LanguageSwitcher />

            {/* AI Copilot CTA Button */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/copilot"
                className="flex items-center gap-1.5 h-8 px-3 sm:px-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span className="whitespace-nowrap">{copilotLabel}</span>
              </Link>
            </motion.div>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
              aria-label={
                ({
                  ar: 'فتح/إغلاق القائمة',
                  derja: 'Bawweb/sakker el menu',
                  fr: 'Ouvrir/fermer le menu',
                  en: 'Toggle menu',
                } as Record<string, string>)[locale] ?? 'Toggle menu'
              }
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-zinc-800/90 bg-zinc-950/98 px-4 py-4 space-y-1 overflow-hidden"
          >
            {/* Quick Search inside Mobile Drawer */}
            <div className="pb-2 mb-2 border-b border-zinc-850">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerCommandPalette();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-zinc-500" />
                  <span>{t('quickSearchPrompt')}</span>
                </div>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-500 rounded border border-zinc-700">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            {/* Mobile Drawer Links */}
            <div className="grid grid-cols-1 gap-1">
              {ALL_MOBILE_LINKS.map(({ href, tKey, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href);
                return (
                  <motion.div key={href} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-zinc-500" />
                      <span>{t(tKey)}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
