'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLocale } from '../../context/LocaleContext';
import {
  Search,
  X,
  ArrowRight,
  Stamp,
  Fingerprint,
  FileCheck2,
  FilePenLine,
  Car,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { formatTND } from '../../lib/utils';
import { getLocalized } from '../../lib/locale-utils';
import { proceduresData } from '../../data/procedures';

const AmbientOrbs = dynamic(
  () => import('../motion/AmbientOrbs').then((m) => m.AmbientOrbs),
  { ssr: false }
);

export function HeroSection() {
  const { t, locale } = useLocale();
  const router = useRouter();

  // Search & Omni-Command State
  const [searchVal, setSearchVal] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/procedures?q=${encodeURIComponent(searchVal)}`);
    } else {
      router.push('/procedures');
    }
  };

  // Filtered procedures for live autocomplete
  const filteredProcedures = searchVal.trim()
    ? proceduresData.filter((p) => {
        const query = searchVal.toLowerCase();
        const titleMatch =
          p.title.fr.toLowerCase().includes(query) ||
          p.title.ar.includes(query) ||
          p.title.derja.toLowerCase().includes(query) ||
          (p.title.en ? p.title.en.toLowerCase().includes(query) : false);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(query));
        return titleMatch || tagMatch;
      }).slice(0, 5)
    : [];

  // Top 6 Statutory Procedures with Authority (Zero Emojis - 100% Vector SVGs)
  const statutoryIndex = [
    {
      id: 'passeport-renouvellement',
      icon: Fingerprint,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      name: locale === 'ar' ? 'جواز السفر' : locale === 'derja' ? 'Passeport' : locale === 'en' ? 'Passport Renewal' : 'Passeport Tunisien',
      cost: '86.000 DT',
      authority: locale === 'ar' ? 'مركز الشرطة / الحرس' : 'Police / Garde',
      time: locale === 'ar' ? '7-15 يوم' : '7-15 jours',
      href: '/procedures/passeport-renouvellement',
    },
    {
      id: 'bulletin-numero-3',
      icon: FileCheck2,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/30',
      name: locale === 'ar' ? 'بطاقة السوابق (B3)' : locale === 'derja' ? 'Bulletin N°3' : locale === 'en' ? 'Police Record (B3)' : 'Extrait B3 (Casier)',
      cost: '7.500 DT',
      authority: locale === 'ar' ? 'عبر الإنترنت / البريد' : 'En ligne / Rapide Poste',
      time: locale === 'ar' ? '2-5 أيام' : '2-5 jours',
      href: '/procedures/bulletin-numero-3',
    },
    {
      id: 'contrat-location',
      icon: FilePenLine,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/30',
      name: locale === 'ar' ? 'عقد الكراء السكني' : locale === 'derja' ? '3a9d Kré' : locale === 'en' ? 'Residential Lease' : 'Contrat de Location',
      cost: '35.000 DT',
      authority: locale === 'ar' ? 'البلدية والقباضة' : 'Baladiya & Recette',
      time: locale === 'ar' ? 'فوري' : 'Immédiat',
      href: '/documents/contrat-location',
    },
    {
      id: 'mutation-carte-grise',
      icon: Car,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10 border-blue-500/30',
      name: locale === 'ar' ? 'البطاقة الرمادية' : locale === 'derja' ? 'Carte Grise' : locale === 'en' ? 'Vehicle Title Transfer' : 'Carte Grise (ATTT)',
      cost: '145.000 DT',
      authority: 'ATTT / Mines',
      time: locale === 'ar' ? '3-7 أيام' : '3-7 jours',
      href: '/procedures/mutation-carte-grise',
    },
    {
      id: 'auto-entrepreneur',
      icon: Briefcase,
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/10 border-violet-500/30',
      name: locale === 'ar' ? 'المبادر الذاتي' : locale === 'derja' ? 'Auto-Entrepreneur' : locale === 'en' ? 'Self-Entrepreneur' : 'Auto-Entrepreneur',
      cost: locale === 'ar' ? 'ضريبة 1%' : '1% Impôt',
      authority: 'RNE / BCT',
      time: locale === 'ar' ? 'فوري عبر المنصة' : 'En ligne',
      href: '/launchpad',
    },
    {
      id: 'cin-premiere-demande',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      name: locale === 'ar' ? 'بطاقة التعريف (CIN)' : locale === 'derja' ? 'Bita9at Ta3rif' : locale === 'en' ? 'National ID (CIN)' : 'Carte CIN',
      cost: '3.000 DT',
      authority: locale === 'ar' ? 'مركز الشرطة' : 'Poste de Police',
      time: locale === 'ar' ? '15-21 يوم' : '15-21 jours',
      href: '/procedures/cin-premiere-demande',
    },
  ];

  return (
    <section className="relative pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-6">
      {/* Subtle Ambient Radial Lighting */}
      <AmbientOrbs variant="emerald" />

      {/* Monumental Display Headline */}
      <div className="space-y-3 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
          <span>{t('heroHeadline')}</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
            {t('heroHeadlineHighlight')}
          </span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed pt-1">
          {t('heroSubheadline')}
        </p>
      </div>

      {/* ── OMNI-COMMAND SEARCH BAR (CENTERPIECE) ── */}
      <div className="max-w-2xl mx-auto relative z-30 pt-1">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center bg-[#0e1015] border-2 border-white/[0.12] focus-within:border-emerald-400 focus-within:shadow-[0_0_35px_rgba(16,185,129,0.25)] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-2xl transition-all"
        >
          <Search className="w-5 h-5 text-emerald-400 ml-3 mr-2 rtl:ml-2 rtl:mr-3 shrink-0" />

          <input
            ref={searchInputRef}
            type="text"
            value={searchVal}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder={t('voiceSearchBarPlaceholder')}
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none py-2 px-1 min-w-0"
          />

          {searchVal && (
            <button
              type="button"
              onClick={() => setSearchVal('')}
              className="p-1 rounded-lg text-zinc-400 hover:text-white mr-1 rtl:ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Keyboard Shortcut Indicator */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800/80 border border-white/[0.08] text-[10px] font-mono text-zinc-400 mr-2 rtl:ml-2">
            <span>⌘K</span>
          </div>

          {/* Search Action Button */}
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl font-extrabold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/25 transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <span>{locale === 'ar' ? 'بحث' : 'Rechercher'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </form>

        {/* Floating Autocomplete Dropdown */}
        <AnimatePresence>
          {isSearchFocused && filteredProcedures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute left-0 right-0 top-full mt-2 bg-[#0e1015] border border-white/[0.15] rounded-2xl shadow-2xl overflow-hidden text-left rtl:text-right z-50 divide-y divide-white/[0.06]"
            >
              {filteredProcedures.map((proc) => (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.slug}`}
                  className="p-3 sm:p-3.5 hover:bg-zinc-900 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                >
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {getLocalized(proc.title, locale)}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {getLocalized(proc.shortDescription, locale)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-extrabold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/40">
                      {formatTND(proc.estimatedTotalCostTND, locale)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors rtl:rotate-180" />
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. OFFICIAL STATUTORY FISCAL STAMP REFERENCE INDEX ── */}
      <div className="pt-2 max-w-5xl mx-auto space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1 border-b border-white/[0.06] pb-2">
          <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Stamp className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {locale === 'ar'
                ? 'جدول المعاليم والتنابر الجبائية الرسمية الأكثر طلباً :'
                : locale === 'derja'
                ? 'Tableau el Timbres wel Masrouf el Rasmi :'
                : locale === 'en'
                ? 'Official Statutory Stamp & Tariff Scale (Key Procedures):'
                : 'Barème Officiel des Timbres & Droits Fiscaux :'}
            </span>
          </span>

          <Link
            href="/procedures"
            className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1"
          >
            <span>
              {locale === 'ar'
                ? `دليل الـ ${proceduresData.length} إجراء كـاملاً`
                : `Voir les ${proceduresData.length} Démarches`}
            </span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {statutoryIndex.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={item.href}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.08] hover:border-emerald-500/40 flex flex-col justify-between space-y-2.5 text-left rtl:text-right transition-all group h-full shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl border ${item.iconBg} flex items-center justify-center ${item.iconColor} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-white/[0.06]">
                      {item.time}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                      {item.authority}
                    </p>
                  </div>

                  <div className="pt-1.5 border-t border-white/[0.06]">
                    <span className="text-xs font-mono font-black text-amber-300">
                      {item.cost}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
