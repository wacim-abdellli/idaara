'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLogo } from './BrandLogo';
import { Sparkles, FileSearch, FileText, Calculator, MapPin, Rocket, BookOpen, Briefcase, Menu, X, Search } from 'lucide-react';

const NAV_LINKS = [
  { href: '/copilot',    tKey: 'copilotNav',    icon: Sparkles },
  { href: '/fasserli',   tKey: 'fasserliNav',   icon: FileSearch },
  { href: '/documents',  tKey: 'documentsNav',  icon: FileText },
  { href: '/calculator', tKey: 'calculatorNav', icon: Calculator },
  { href: '/concours',   tKey: 'concoursNav',   icon: Briefcase },
  { href: '/locator',    tKey: 'locatorNav',    icon: MapPin },
  { href: '/launchpad',  tKey: 'launchpadNav',  icon: Rocket },
  { href: '/procedures', tKey: 'proceduresNav', icon: BookOpen },
] as const;

export const Navbar: React.FC = () => {
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copilotLabel = locale === 'ar' ? 'المساعد الذكي' : 'Idaara AI';

  const triggerCommandPalette = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3">

          {/* Left: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-4 lg:gap-6 min-w-0">
            {/* Brand logo */}
            <BrandLogo />

            {/* Desktop Navigation with spring layoutId pill */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, tKey }) => {
                const isActive = pathname === href || pathname.startsWith(href);
                const label = t(tKey);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-150 shrink-0 select-none ${
                      isActive
                        ? 'text-emerald-300 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-zinc-800/90 rounded-xl -z-10 border border-zinc-700/60 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side: Search, Language Switcher, AI Copilot CTA, Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search CTA (visible on xl screens) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerCommandPalette}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors cursor-pointer shrink-0 shadow-sm"
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
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-xs text-zinc-400">{t('quickSearchPrompt')}</span>
              <kbd className="inline-block px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-500 rounded border border-zinc-700">
                ⌘K
              </kbd>
            </motion.button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* AI Copilot CTA Button */}
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/copilot"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{copilotLabel}</span>
              </Link>
            </motion.div>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
              aria-label={
                {
                  ar: 'فتح/إغلاق القائمة',
                  derja: 'Bawweb/sakker el menu',
                  fr: 'Ouvrir/fermer le menu',
                  en: 'Toggle menu',
                }[locale] ?? 'Toggle menu'
              }
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* ── Mobile Dropdown Menu with AnimatePresence ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-zinc-800 bg-zinc-950/98 px-4 py-4 space-y-1 overflow-hidden"
          >
            {NAV_LINKS.map(({ href, tKey, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href);
              const label = t(tKey);
              return (
                <motion.div key={href} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-zinc-500" />
                    <span>{label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
