'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLogo } from './BrandLogo';
import { AuthModal } from '../auth/AuthModal';
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
  User as UserIcon,
  LogOut,
  Shield,
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
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setUserDropdownOpen(false);
    setMoreOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Derived user display details
  const rawDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.user_name ||
    user?.user_metadata?.preferred_username ||
    user?.email?.split('@')[0] ||
    'Citoyen';
  const displayName =
    rawDisplayName.charAt(0).toUpperCase() + rawDisplayName.slice(1);
  const userInitial = displayName.charAt(0).toUpperCase() || 'U';
  const userAvatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  const copilotLabel =
    locale === 'ar' ? 'المساعد الذكي' : locale === 'derja' ? 'Idaara AI' : locale === 'en' ? 'Idaara AI' : 'Idaara AI';
  const moreLabel =
    locale === 'ar' ? 'المزيد' : locale === 'derja' ? 'Akther' : locale === 'en' ? 'More' : 'Plus';

  const isMoreActive = MORE_LINKS.some(
    (link) => pathname === link.href || pathname.startsWith(link.href)
  );

  const triggerCommandPalette = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  if (!pathname || pathname === '/copilot' || pathname.startsWith('/copilot')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/70 bg-zinc-950/95 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between h-14 gap-2 lg:gap-4">

          {/* ── Left: Brand Logo & Desktop Navigation ── */}
          <div className="flex items-center gap-3 lg:gap-5 min-w-0">
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label={
                locale === 'ar'
                  ? 'التنقل الرئيسي'
                  : locale === 'derja'
                  ? 'Navigation principale'
                  : locale === 'en'
                  ? 'Main Navigation'
                  : 'Navigation principale'
              }
            >
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
                          {locale === 'ar'
                            ? 'خدمات وأدوات إضافية'
                            : locale === 'derja'
                            ? 'Services w Outils zyeda'
                            : locale === 'en'
                            ? 'More Services & Tools'
                            : 'Services & Outils'}
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
                  : locale === 'en'
                  ? 'Search Idaara (Ctrl+K)'
                  : 'Rechercher sur Idaara (Ctrl+K)'
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

            {/* Account / User Profile Pill & Dropdown */}
            <div ref={userDropdownRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (user) {
                    setUserDropdownOpen((prev) => !prev);
                  } else {
                    setAuthModalOpen(true);
                  }
                }}
                className={`group flex items-center gap-2 h-8 sm:h-8.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  user
                    ? 'pl-1.5 pr-2.5 rtl:pl-2.5 rtl:pr-1.5 bg-zinc-900/85 hover:bg-zinc-850/95 text-zinc-200 hover:text-white border border-white/[0.12] hover:border-emerald-500/40 shadow-xs hover:shadow-[0_0_16px_rgba(16,185,129,0.18)]'
                    : 'px-3 py-1 bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:text-white hover:bg-zinc-850 hover:border-zinc-700'
                }`}
                title={user ? user.email || displayName : 'Connexion Citoyenne'}
                aria-expanded={user ? userDropdownOpen : undefined}
                aria-haspopup={user ? 'menu' : undefined}
              >
                {user ? (
                  <>
                    {/* Polished avatar with cleanly docked online status badge */}
                    <div className="relative shrink-0 w-6 h-6">
                      {userAvatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={userAvatarUrl}
                          alt={displayName}
                          className="w-6 h-6 rounded-full object-cover ring-1.5 ring-emerald-500/40"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-emerald-400/30">
                          {userInitial}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 rtl:-left-0.5 rtl:right-auto w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0e1015]" />
                    </div>

                    <span className="hidden sm:inline text-xs font-semibold text-zinc-100 group-hover:text-white max-w-[115px] truncate tracking-tight">
                      {displayName}
                    </span>

                    <ChevronDown
                      className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-transform duration-200 shrink-0 ${
                        userDropdownOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </>
                ) : (
                  <>
                    <UserIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="hidden sm:inline text-xs font-medium">
                      {locale === 'ar' ? 'دخول' : 'Connexion'}
                    </span>
                  </>
                )}
              </motion.button>

              {/* Sleek Floating User Account Dropdown Menu */}
              <AnimatePresence>
                {user && userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={`absolute top-full mt-2 ${
                      isRtl ? 'left-0' : 'right-0'
                    } w-64 rounded-2xl bg-[#0e1015]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl z-50 p-2 overflow-hidden text-left rtl:text-right`}
                    role="menu"
                  >
                    {/* User Card Header */}
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-1.5 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="relative shrink-0 w-8 h-8">
                          {userAvatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={userAvatarUrl}
                              alt={displayName}
                              className="w-8 h-8 rounded-full object-cover ring-1.5 ring-emerald-500/40"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-black text-sm flex items-center justify-center shadow-xs">
                              {userInitial}
                            </div>
                          )}
                          <span className="absolute -bottom-0.5 -right-0.5 rtl:-left-0.5 rtl:right-auto w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0e1015]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate leading-snug">
                            {displayName}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate leading-none mt-0.5 font-mono">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium pt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>
                          {locale === 'ar'
                            ? 'جلسة نشطة · مزامنة سحابية'
                            : locale === 'derja'
                            ? 'Session active · Cloud Sync'
                            : locale === 'en'
                            ? 'Active Session · Cloud Sync'
                            : 'Session Active · Cloud Sync'}
                        </span>
                      </div>
                    </div>

                    {/* Quick navigation items */}
                    <div className="space-y-0.5">
                      <Link
                        href="/copilot"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          {locale === 'ar'
                            ? 'استشارات المساعد الذكي'
                            : locale === 'derja'
                            ? 'Idaara AI'
                            : locale === 'en'
                            ? 'Idaara AI Copilot'
                            : 'Assistant Idaara AI'}
                        </span>
                      </Link>

                      <Link
                        href="/documents"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                      >
                        <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>
                          {locale === 'ar'
                            ? 'الوثائق والعقود'
                            : locale === 'derja'
                            ? 'Awra9ek w 3o9oud'
                            : locale === 'en'
                            ? 'Official Documents'
                            : 'Mes Documents & Contrats'}
                        </span>
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setAuthModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          {locale === 'ar'
                            ? 'إدارة الحساب والأمان'
                            : locale === 'derja'
                            ? 'Ma3loumet el 7seb'
                            : locale === 'en'
                            ? 'Account & Security'
                            : 'Détails du Compte'}
                        </span>
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="my-1.5 border-t border-white/[0.08]" />

                    {/* Sign Out Action */}
                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>
                        {locale === 'ar'
                          ? 'تسجيل الخروج'
                          : locale === 'derja'
                          ? 'Khorouj'
                          : locale === 'en'
                          ? 'Sign Out'
                          : 'Déconnexion'}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
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

            {/* Mobile User Profile Card */}
            {user ? (
              <div className="p-2.5 mb-2 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0 w-8 h-8">
                    {userAvatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={userAvatarUrl}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover ring-1.5 ring-emerald-500/40"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-black text-xs flex items-center justify-center shadow-xs">
                        {userInitial}
                      </div>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 rtl:-left-0.5 rtl:right-auto w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-zinc-400 truncate font-mono">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await signOut();
                  }}
                  className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="pb-2 mb-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-zinc-200 cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{locale === 'ar' ? 'تسجيل الدخول' : 'Connexion Citoyenne'}</span>
                </button>
              </div>
            )}

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

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};
