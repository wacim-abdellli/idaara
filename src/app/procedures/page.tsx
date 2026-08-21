'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { proceduresData } from '../../data/procedures';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { formatTND } from '../../lib/utils';
import {
  Search,
  ArrowRight,
  Clock,
  Coins,
  CreditCard,
  Car,
  Briefcase,
  Home,
  HeartPulse,
  Plane,
  FileCheck2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

  const verticals: Array<{ id: string; label: string; icon: React.ElementType }> = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع الإجراءات'
          : locale === 'en'
          ? 'All Procedures'
          : 'Toutes les Démarches',
      icon: FileCheck2,
    },
    {
      id: 'identity',
      label:
        locale === 'ar'
          ? 'الهوية والمواطنة'
          : locale === 'en'
          ? 'Identity & Citizenship'
          : 'Identité & Citoyenneté',
      icon: CreditCard,
    },
    {
      id: 'transport',
      label:
        locale === 'ar'
          ? 'النقل والسيارات'
          : locale === 'en'
          ? 'Transport & Vehicles'
          : 'Transport & Véhicules',
      icon: Car,
    },
    {
      id: 'business',
      label:
        locale === 'ar'
          ? 'الشركات والمشاريع'
          : locale === 'en'
          ? 'Business & Freelance'
          : 'Entreprise & Freelance',
      icon: Briefcase,
    },
    {
      id: 'housing',
      label:
        locale === 'ar'
          ? 'السكن والطاقة'
          : locale === 'en'
          ? 'Housing & Energy'
          : 'Logement & Énergie',
      icon: Home,
    },
    {
      id: 'healthcare',
      label:
        locale === 'ar'
          ? 'الصحة والضمان الاجتماعي'
          : locale === 'en'
          ? 'Health & CNAM / CNSS'
          : 'Santé & Sécurité Sociale',
      icon: HeartPulse,
    },
    {
      id: 'customs',
      label:
        locale === 'ar'
          ? 'الديوانة والتونسيين بالخارج'
          : locale === 'en'
          ? 'Customs & Diaspora (FCR)'
          : 'Douane & Diaspora (FCR)',
      icon: Plane,
    },
  ];

  const filteredProcedures = proceduresData.filter((proc) => {
    const title = getLocalized(proc.title, locale).toLowerCase();
    const shortDesc = getLocalized(proc.shortDescription, locale).toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesVertical =
      selectedVertical === 'all' || proc.vertical === selectedVertical;
    const matchesSearch =
      title.includes(q) ||
      shortDesc.includes(q) ||
      proc.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesVertical && matchesSearch;
  });

  const featuredProcedures = proceduresData.slice(0, 4);

  const headlineMain =
    locale === 'ar'
      ? 'دليل الإجراءات الإدارية'
      : locale === 'en'
      ? 'Official Procedures'
      : 'Répertoire Officiel des Démarches';

  const headlineAccent =
    locale === 'ar'
      ? 'خطوة بخطوة.'
      : locale === 'en'
      ? 'Dossier Registry.'
      : 'Administratives.';

  const subtitle =
    locale === 'ar'
      ? 'تعرف على الوثائق المطلوبة، مصاريف التنابر الجبائية، الآجال والمكاتب المعنية لكل إجراء إداري دون مفاجآت.'
      : locale === 'en'
      ? 'Comprehensive citizen guide with exact fiscal stamp calculations, document checklists, and target public desks across Tunisia.'
      : 'Liste exhaustive des pièces requises, calcul des timbres fiscaux au millime près, délais légaux et guichets compétents.';

  const civicStats = [
    { label: locale === 'en' ? 'Verified Dossiers' : 'Démarches Certifiées', val: '11 Procédures', desc: 'JORT & Décrets' },
    { label: locale === 'en' ? 'Fiscal Stamp Accuracy' : 'Précision Timbres', val: '100% Exact', desc: 'Barème Officiel' },
    { label: locale === 'en' ? 'Average Step Count' : 'Étapes Moyennes', val: '3 - 4 Étapes', desc: 'Circuit optimisé' },
    { label: locale === 'en' ? 'Competent Desks' : 'Guichets & Baladiyas', val: '24 Wilayas', desc: 'Couverture nationale' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">

      {/* ── 2-Column Hero Header (Balances Left & Right space) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span>JORT & Code Administratif Tunisien</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <span
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Civic Standards Hub Widget (Fills empty space) */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'en' ? 'Public Service Framework' : 'Garanties Civiques'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                Mise à jour 2026
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {civicStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-white">
                      {stat.val}
                    </span>
                    <span className="text-[9px] text-zinc-500">
                      {stat.desc}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium line-clamp-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Fast-Track Quick Access Cards ── */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {locale === 'ar' ? 'أكثر الإجراءات طلباً' : locale === 'en' ? 'Fast-Track Citizen Demands' : 'Démarches Populaires'}
            </span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {proceduresData.length} {locale === 'ar' ? 'إجراء متاح' : 'procédures certifiées'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {featuredProcedures.map((proc) => {
            const title = getLocalized(proc.title, locale);
            return (
              <Link
                key={proc.id}
                href={`/procedures/${proc.id}`}
                className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-400/90">
                      {proc.vertical}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {proc.estimatedProcessingTime}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-zinc-200 group-hover:text-white leading-snug line-clamp-2">
                    {title}
                  </h3>
                </div>
                <div className="pt-2.5 mt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-amber-400">
                    {formatTND(proc.estimatedTotalCostTND, locale)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Sidebar Categories + Procedure Dossiers Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Category Filter Menu + Search */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === 'ar'
                  ? 'ابحث عن إجراء (جواز سفر، بطاقة تعريف...)'
                  : locale === 'en'
                  ? 'Search procedures (e.g. Passport, CIN...)'
                  : 'Rechercher une démarche...'
              }
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Categories List */}
          <div className="glass-panel rounded-2xl p-2 border border-zinc-800/80 space-y-1">
            {verticals.map((v) => {
              const Icon = v.icon;
              const isSelected = selectedVertical === v.id;
              const count =
                v.id === 'all'
                  ? proceduresData.length
                  : proceduresData.filter((p) => p.vertical === v.id).length;

              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVertical(v.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-zinc-950' : 'text-zinc-500'}`} />
                    <span className="truncate">{v.label}</span>
                  </div>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-zinc-950/20 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Procedure Dossier Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
            <span>
              {filteredProcedures.length} {locale === 'ar' ? 'إجراء معتمد' : 'procédures trouvées'}
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredProcedures.map((proc) => {
              const title = getLocalized(proc.title, locale);
              const shortDesc = getLocalized(proc.shortDescription, locale);

              return (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.id}`}
                  className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800/80 hover:border-zinc-700 hover:shadow-xl transition-all duration-200 block group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-zinc-800/80">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {proc.vertical}
                        </span>
                        <span className="text-zinc-600 text-xs">·</span>
                        <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span>{proc.estimatedProcessingTime}</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right rtl:text-left">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                          {locale === 'ar' ? 'المصاريف' : 'Budget'}
                        </span>
                        <span className="font-mono font-bold text-sm text-amber-400">
                          {formatTND(proc.estimatedTotalCostTND, locale)}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl line-clamp-2">
                      {shortDesc}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono shrink-0">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {proc.steps.length} {locale === 'ar' ? 'مراحل' : 'étapes'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {proc.requiredDocuments.length} {locale === 'ar' ? 'وثائق' : 'pièces'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
