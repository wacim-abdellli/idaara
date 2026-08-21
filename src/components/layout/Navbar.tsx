'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mic, FileSearch, FileText, Calculator, MapPin, Rocket, BookOpen, Menu, X, Zap, Search, Landmark } from 'lucide-react';

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

          {/* ── Brand logo — fixed width, never reflows ── */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0 min-w-0" style={{ width: 110 }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-950 group-hover:scale-105 transition-transform shrink-0">
              <Landmark className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-sm text-white tracking-tight">Idaara</span>
                <span className="text-[9px] font-bold px-1 py-px rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">.tn</span>
              </div>
              <span className="text-[8px] text-zinc-500 tracking-wide mt-0.5 font-medium whitespace-nowrap">إدارة.تونس</span>
            </div>
          </Link>

          {/* ── Desktop Navigation — text-only, whitespace-nowrap ── */}
          <nav className="hidden lg:flex items-center flex-1 mx-1 overflow-hidden">
            <div className="flex items-center space-x-px">
              {NAV_LINKS.map(({ href, tKey }) => {
                const isActive = pathname === href || pathname.startsWith(href);
                const label = t(tKey);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors duration-100 ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/80'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ── Right controls — fixed layout ── */}
          <div className="flex items-center space-x-2 shrink-0 ml-auto">
            {/* Ctrl+K Command Palette Trigger Button */}
            <button
              onClick={triggerCommandPalette}
              title="Search (Ctrl + K)"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline-block text-[11px] font-medium text-zinc-400">{t('quickSearchPrompt')}</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-zinc-950 border border-zinc-700 rounded text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Language switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Voice AI CTA */}
            <Link
              href="/copilot"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[11px] font-bold shadow-md shadow-emerald-500/25 transition-all hover:scale-105 shrink-0 whitespace-nowrap"
            >
              <Zap className="w-3 h-3 shrink-0" />
              <span>{voiceLabel}</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950/98 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-1 animate-fade-in-up">
          {/* Locale switcher inside mobile menu */}
          <div className="pb-3 mb-2 border-b border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-semibold">Langue / اللغة :</span>
            <LanguageSwitcher />
          </div>

          {NAV_LINKS.map(({ href, tKey, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{t(tKey)}</span>
              </Link>
            );
          })}

          <Link
            href="/copilot"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 mt-3 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold shadow-md"
          >
            <Zap className="w-4 h-4" />
            <span>Voice AI Copilot</span>
          </Link>
        </div>
      )}
    </header>
  );
};
