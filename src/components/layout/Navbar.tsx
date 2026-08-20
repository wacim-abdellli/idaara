'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Mic,
  FileSearch,
  FileText,
  Calculator,
  MapPin,
  Rocket,
  BookOpen,
  Menu,
  X,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, locale, isRtl } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/copilot', label: t('copilotNav'), icon: Mic },
    { href: '/fasserli', label: t('fasserliNav'), icon: FileSearch },
    { href: '/documents', label: t('documentsNav'), icon: FileText },
    { href: '/calculator', label: t('calculatorNav'), icon: Calculator },
    { href: '/locator', label: t('locatorNav'), icon: MapPin },
    { href: '/launchpad', label: t('launchpadNav'), icon: Rocket },
    { href: '/procedures', label: t('proceduresNav'), icon: BookOpen },
  ];

  const voiceLabel =
    locale === 'ar' ? 'صوتي' : locale === 'fr' ? 'Voice AI' : 'Voice AI';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-2xl">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-2">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 rtl:space-x-reverse group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950 group-hover:scale-105 transition-transform duration-200">
              <span className="text-base">🏛️</span>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="font-extrabold text-sm text-white tracking-tight">Idaara</span>
                <span className="text-[9px] font-bold px-1 py-px rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  .tn
                </span>
              </div>
              <span className="text-[8px] text-zinc-500 tracking-wide mt-0.5 font-medium">
                إدارة.تونس
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-0.5 rtl:space-x-reverse flex-1 mx-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/70'
                  }`}
                >
                  <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-600'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Tools */}
          <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse shrink-0">
            <LanguageSwitcher />
            <Link
              href="/copilot"
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[11px] font-bold shadow-md shadow-emerald-500/25 transition-all hover:scale-105 shrink-0"
            >
              <Zap className="w-3 h-3" />
              <span>{voiceLabel}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-zinc-800 bg-zinc-950/98 backdrop-blur-2xl px-4 pt-2 pb-5 space-y-0.5 animate-fade-in-up">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/copilot"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-3 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold shadow-md"
          >
            <Zap className="w-4 h-4" />
            <span>Voice AI Copilot</span>
          </Link>
        </div>
      )}
    </header>
  );
};
