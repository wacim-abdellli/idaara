'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mic, FileSearch, FileText, Calculator, MapPin, Rocket, BookOpen, Menu, X, Zap, Search } from 'lucide-react';

const NAV_LINKS = [
  { href: '/copilot',    tKey: 'copilotNav',    icon: Mic },
  { href: '/fasserli',   tKey: 'fasserliNav',   icon: FileSearch },
  { href: '/documents',  tKey: 'documentsNav',  icon: FileText },
  { href: '/calculator', tKey: 'calculatorNav', icon: Calculator },
  { href: '/locator',    tKey: 'locatorNav',    icon: MapPin },
  { href: '/launchpad',  tKey: 'launchpadNav',  icon: Rocket },
  { href: '/procedures', tKey: 'proceduresNav', icon: BookOpen },
] as const;

export const Navbar: React.FC = () => {
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const voiceLabel = locale === 'ar' ? 'صوتي' : 'Voice AI';

  const triggerCommandPalette = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center h-14 gap-3">

          {/* ── Brand logo — sleek typographic signature ── */}
          <Link href="/" className="flex items-center group shrink-0 pr-1">
            <span className="font-extrabold text-base sm:text-lg text-white tracking-tight group-hover:opacity-90 transition-opacity">
              Idaara<span className="text-emerald-400">.tn</span>
            </span>
          </Link>

          {/* ── Desktop Navigation — text-only, whitespace-nowrap ── */}
          <nav className="hidden lg:flex items-center flex-1 mx-1 overflow-hidden">
            <div className="flex items-center gap-0.5">
              {NAV_LINKS.map(({ href, tKey }) => {
                const isActive = pathname === href || pathname.startsWith(href);
                const label = t(tKey);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                      isActive
                        ? 'bg-zinc-800 text-emerald-400 font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ── Search CTA (desktop) ── */}
          <button
            onClick={triggerCommandPalette}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors cursor-pointer shrink-0"
            title="Search Idaara (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs text-zinc-400">{t('quickSearchPrompt')}</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-500 rounded border border-zinc-700">
              ⌘K
            </kbd>
          </button>

          {/* ── Right side controls ── */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Voice CTA Button */}
            <Link
              href="/copilot"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{voiceLabel}</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950/98 px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ href, tKey, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href);
            const label = t(tKey);
            return (
              <Link
                key={href}
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
            );
          })}
        </div>
      )}
    </header>
  );
};
