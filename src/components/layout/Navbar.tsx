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
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, isRtl } = useLocale();
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 rtl:space-x-reverse group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950 group-hover:scale-105 transition-transform duration-200">
              <span className="text-lg">🏛️</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="font-extrabold text-base text-white tracking-tight">Idaara</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  .tn
                </span>
              </div>
              <span className="text-[9px] text-zinc-400 tracking-wide font-medium">
                إدارة.تونس · Copilot
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Tools & Language Switcher */}
          <div className="hidden sm:flex items-center space-x-2.5 rtl:space-x-reverse shrink-0">
            <LanguageSwitcher />
            <Link
              href="/copilot"
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
            >
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              <span>Voice AI</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                  isActive
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
