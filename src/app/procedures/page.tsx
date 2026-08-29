'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { proceduresData } from '../../data/procedures';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { getVerticalLabel } from '../../lib/vertical-labels';
import { formatTND } from '../../lib/utils';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import {
  Search,
  ArrowRight,
  Clock,
  CreditCard,
  Car,
  Briefcase,
  Home,
  HeartPulse,
  Plane,
  FileCheck2,
  ShieldCheck,
  Building2,
  ArrowUpDown,
  FileText,
  Stamp,
  CheckCircle2,
  GraduationCap,
  Scale,
  LayoutGrid,
  List,
  X,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Info,
} from 'lucide-react';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'cost_asc' | 'cost_desc' | 'steps'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Localized sector configurations
  const verticals: Array<{
    id: string;
    label: string;
    icon: React.ElementType;
    color: string;
    accentBg: string;
  }> = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع الإجراءات'
          : locale === 'derja'
          ? 'El Procédures el Kol'
          : locale === 'en'
          ? 'All Procedures'
          : 'Toutes les Démarches',
      icon: FileCheck2,
      color: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'identity',
      label:
        locale === 'ar'
          ? 'الهوية والمواطنة'
          : locale === 'derja'
          ? 'Houwiya & CIN'
          : locale === 'en'
          ? 'Identity & Citizenship'
          : 'Identité & Citoyenneté',
      icon: CreditCard,
      color: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'transport',
      label:
        locale === 'ar'
          ? 'النقل والسيارات'
          : locale === 'derja'
          ? 'Krahba w Permis'
          : locale === 'en'
          ? 'Transport & Vehicles'
          : 'Transport & Véhicules',
      icon: Car,
      color: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'business',
      label:
        locale === 'ar'
          ? 'الشركات والمشاريع'
          : locale === 'derja'
          ? 'Machari3 w Freelance'
          : locale === 'en'
          ? 'Business & Freelance'
          : 'Entreprise & Freelance',
      icon: Briefcase,
      color: 'text-amber-400',
      accentBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    },
    {
      id: 'housing',
      label:
        locale === 'ar'
          ? 'السكن والطاقة'
          : locale === 'derja'
          ? 'Kré, Dar, STEG'
          : locale === 'en'
          ? 'Housing & Energy'
          : 'Logement & Énergie',
      icon: Home,
      color: 'text-orange-400',
      accentBg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    },
    {
      id: 'healthcare',
      label:
        locale === 'ar'
          ? 'الصحة والضمان'
          : locale === 'derja'
          ? 'CNAM w CNSS'
          : locale === 'en'
          ? 'Health & Social Security'
          : 'Santé & Sécurité Sociale',
      icon: HeartPulse,
      color: 'text-rose-400',
      accentBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    },
    {
      id: 'justice',
      label:
        locale === 'ar'
          ? 'العدل والأحوال الشخصية'
          : locale === 'derja'
          ? '3adl w Baladiya'
          : locale === 'en'
          ? 'Justice & Civil Status'
          : 'Justice & État Civil',
      icon: Scale,
      color: 'text-purple-400',
      accentBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'customs',
      label:
        locale === 'ar'
          ? 'الديوانة والمهجر (FCR)'
          : locale === 'derja'
          ? 'Diwana & FCR'
          : locale === 'en'
          ? 'Customs & Diaspora (FCR)'
          : 'Douane & Diaspora (FCR)',
      icon: Plane,
      color: 'text-teal-400',
      accentBg: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
    },
    {
      id: 'education',
      label:
        locale === 'ar'
          ? 'التعليم والمنح'
          : locale === 'derja'
          ? 'Ta3lim w Bourse'
          : locale === 'en'
          ? 'Education & Scholarships'
          : 'Enseignement & Bourses',
      icon: GraduationCap,
      color: 'text-blue-400',
      accentBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    },
  ];

  // Helper to map procedure vertical to color styling
  const getSectorStyle = (vertical: string) => {
    switch (vertical) {
      case 'identity':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'transport':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25';
      case 'business':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
      case 'housing':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/25';
      case 'healthcare':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
      case 'justice':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/25';
      case 'customs':
        return 'text-teal-400 bg-teal-500/10 border-teal-500/25';
      case 'education':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/25';
      default:
        return 'text-zinc-300 bg-zinc-800/80 border-white/[0.1]';
    }
  };

  // Helper to display primary office authority badge
  const getOfficeBadge = (relatedOffices?: string[]) => {
    if (!relatedOffices || relatedOffices.length === 0) return 'Guichet Public';
    const primary = relatedOffices[0];
    switch (primary) {
      case 'police_garde':
        return locale === 'ar' ? 'مركز الشرطة / الحرس' : 'Poste de Police / Garde';
      case 'recette_finances':
        return locale === 'ar' ? 'القباضة المالية' : 'Recette des Finances';
      case 'baladiya':
        return locale === 'ar' ? 'البلدية' : 'Municipalité (Baladiya)';
      case 'attt':
        return 'ATTT (Mines)';
      case 'cnss':
        return 'CNSS';
      case 'cnam':
        return 'CNAM';
      case 'rne':
        return 'RNE / Registre';
      case 'douane':
        return locale === 'ar' ? 'الديوانة' : 'Bureau de Douane';
      case 'tribunal':
        return locale === 'ar' ? 'المحكمة' : 'Tribunal';
      default:
        return locale === 'ar' ? 'مصلحة عمومية' : 'Administration';
    }
  };

  // Filter and sort logic
  const filteredProcedures = useMemo(() => {
    let list = proceduresData.filter((proc) => {
      const matchesVertical = selectedVertical === 'all' || proc.vertical === selectedVertical;
      if (!matchesVertical) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const titleMatch =
        proc.title.fr.toLowerCase().includes(q) ||
        proc.title.ar.includes(q) ||
        proc.title.derja.toLowerCase().includes(q) ||
        (proc.title.en ? proc.title.en.toLowerCase().includes(q) : false);

      const descMatch =
        proc.shortDescription.fr.toLowerCase().includes(q) ||
        proc.shortDescription.ar.includes(q) ||
        proc.shortDescription.derja.toLowerCase().includes(q);

      const tagMatch = proc.tags.some((t) => t.toLowerCase().includes(q));

      return titleMatch || descMatch || tagMatch;
    });

    if (sortBy === 'cost_asc') {
      list = [...list].sort((a, b) => a.estimatedTotalCostTND - b.estimatedTotalCostTND);
    } else if (sortBy === 'cost_desc') {
      list = [...list].sort((a, b) => b.estimatedTotalCostTND - a.estimatedTotalCostTND);
    } else if (sortBy === 'steps') {
      list = [...list].sort((a, b) => a.steps.length - b.steps.length);
    }

    return list;
  }, [searchQuery, selectedVertical, sortBy]);

  // Quick Key Procedures Strip
  const quickKeyProcedures = [
    { slug: 'passeport-renouvellement', label: locale === 'ar' ? 'جواز السفر (86 DT)' : 'Passeport (86 DT)' },
    { slug: 'bulletin-numero-3', label: locale === 'ar' ? 'بطاقة السوابق B3 (7.5 DT)' : 'Bulletin N°3 (7.5 DT)' },
    { slug: 'mutation-carte-grise', label: locale === 'ar' ? 'البطاقة الرمادية (145 DT)' : 'Carte Grise (145 DT)' },
    { slug: 'contrat-location', label: locale === 'ar' ? 'عقد الكراء (35 DT)' : 'Bail d’Habitation (35 DT)' },
    { slug: 'cin-premiere-demande', label: locale === 'ar' ? 'بطاقة التعريف CIN (3 DT)' : 'Carte CIN (3 DT)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 relative overflow-hidden bg-[#07080a] text-[#F5F4F0]">
      
      {/* Subtle Ambient Lighting */}
      <AmbientOrbs variant="emerald" />

      {/* ── 1. SOVEREIGN REPUBLIC HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-white/[0.08] relative z-10">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.1] text-xs font-semibold text-zinc-300">
            <span className="text-emerald-400 font-bold">🇹🇳</span>
            <span>
              {locale === 'ar'
                ? 'الجمهورية التونسية · الدليل الوطني للإجراءات والرسوم الجبائية'
                : locale === 'derja'
                ? 'El Joumhouriya el Tounsiya · Dalil el Démarchet wel Timbres'
                : locale === 'en'
                ? 'Republic of Tunisia · National Civic Procedures & Tariff Registry'
                : 'République Tunisienne · Répertoire Officiel des Démarches & Droits Fiscaux'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 font-bold">JORT 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {locale === 'ar'
              ? 'دليل الإجراءات الإدارية والتنابر'
              : locale === 'derja'
              ? 'Dalil el Démarchet wel Timbres'
              : locale === 'en'
              ? 'Official Administrative Procedures Directory'
              : 'Répertoire Officiel des Démarches & Timbres'}
          </h1>
          
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {locale === 'ar'
              ? '38 إجراء مدني معتمد مع قوائم الوثائق الإلزامية، مبالغ التنابر الجبائية بالمليم، والشبابيك المعنية لتفادي المفاجآت.'
              : locale === 'derja'
              ? '38 procédure s7i7a b\'el masrouf bel mlim, el awra9 el lezmin, wel 9badhat el marje3 bech ma yrajj3oukch.'
              : locale === 'en'
              ? '38 verified civic procedures with mandatory document checklists, statutory stamp fees in TND, and competent desk locations.'
              : '38 démarches administratives homologuées avec pièces obligatoires, calcul exact des timbres fiscaux et guichets compétents.'}
          </p>
        </div>

        {/* Quick Statutory Reference Summary */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-zinc-900/90 border border-white/[0.1] text-center">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">
              {locale === 'ar' ? 'الإجراءات' : 'Démarches'}
            </span>
            <span className="text-lg font-mono font-extrabold text-emerald-400">
              {proceduresData.length}
            </span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-zinc-900/90 border border-white/[0.1] text-center">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">
              {locale === 'ar' ? 'القطاعات' : 'Secteurs'}
            </span>
            <span className="text-lg font-mono font-extrabold text-amber-400">
              8
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. STICKY HORIZONTAL SECTOR DECK ── */}
      <div className="sticky top-16 z-30 py-2.5 bg-[#07080a]/95 backdrop-blur-md border-y border-white/[0.08] -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/25 font-black'
                    : 'bg-zinc-900/90 text-zinc-300 hover:text-white border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : v.color}`} />
                <span>{v.label}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-zinc-950/20 text-zinc-950 font-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. SEARCH, SORT & VIEW CONTROLS TOOLBAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/[0.08]">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === 'ar'
                ? 'ابحث عن إجراء (جواز سفر، بطاقة رمادية، كراء...)'
                : locale === 'derja'
                ? 'Lawwej 3la procédure (Passeport, CIN, Krè...)'
                : locale === 'en'
                ? 'Filter procedures (e.g. Passport, Lease, B3...)'
                : 'Filtrer les démarches (Passeport, Bail, Carte Grise...)'
            }
            className="w-full bg-[#0c0d12] border border-white/[0.1] focus:border-emerald-400 rounded-xl pl-9 pr-8 rtl:pr-9 rtl:pl-8 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-2.5 text-zinc-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results Counter, Sort & View Mode Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          
          <span className="text-xs font-mono text-zinc-300 shrink-0">
            <span className="text-emerald-400 font-bold">{filteredProcedures.length}</span> / {proceduresData.length}{' '}
            {locale === 'ar' ? 'إجراء' : 'démarches'}
          </span>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 shrink-0 hidden sm:inline-block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'cost_asc' | 'cost_desc' | 'steps')}
              className="bg-[#0c0d12] border border-white/[0.1] focus:border-emerald-400 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="default">{locale === 'ar' ? 'ترتيب افتراضي' : 'Par Défaut'}</option>
              <option value="cost_asc">{locale === 'ar' ? 'الأقل تكلفة أولاً' : 'Budget (Croissant)'}</option>
              <option value="cost_desc">{locale === 'ar' ? 'الأعلى تكلفة أولاً' : 'Budget (Décroissant)'}</option>
              <option value="steps">{locale === 'ar' ? 'أقل خطوات' : 'Moins d’étapes'}</option>
            </select>
          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-[#0c0d12] border border-white/[0.1]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'grid'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="Dense Table View"
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'list'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* ── 4. PROCEDURES DISPLAY (COMPACT GRID OR DENSE LIST) ── */}
      {filteredProcedures.length === 0 ? (
        <div className="py-16 text-center space-y-3 rounded-3xl bg-zinc-950/80 border border-white/[0.08]">
          <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">
            {locale === 'ar' ? 'لم يتم العثور على أي إجراء' : 'Aucune démarche trouvée'}
          </h3>
          <p className="text-xs text-zinc-400">
            {locale === 'ar' ? 'جرب البحث بكلمات أخرى أو اختر قطاعاً مختلفاً' : 'Essayez d’autres termes de recherche ou réinitialisez les filtres.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedVertical('all'); }}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            {locale === 'ar' ? 'إعادة ضبط البحث' : 'Réinitialiser les filtres'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* ── CIVIC CARD MODERNISM GRID (2 or 3 COLUMNS) ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProcedures.map((proc) => {
            const title = getLocalized(proc.title, locale);
            const shortDesc = getLocalized(proc.shortDescription, locale);
            const sectorBadgeStyle = getSectorStyle(proc.vertical);
            const officeName = getOfficeBadge(proc.relatedOfficeTypes);

            return (
              <Link key={proc.id} href={`/procedures/${proc.slug}`} className="block group">
                <SpotlightCard className="p-4 sm:p-5 border-white/[0.08] bg-[#0c0d12] hover:border-emerald-500/40 shadow-xl transition-all h-full flex flex-col justify-between space-y-3 rounded-2xl relative overflow-hidden">
                  
                  {/* Top Line: Sector Badge + Duration + Statutory Budget */}
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${sectorBadgeStyle} inline-block`}>
                        {getVerticalLabel(proc.vertical, locale)}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                        <Clock className="w-3 h-3 text-zinc-500 shrink-0" />
                        <span>{getLocalized(proc.estimatedProcessingTime, locale)}</span>
                      </div>
                    </div>

                    <div className="text-right rtl:text-left shrink-0">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase block">
                        {locale === 'ar' ? 'المجموع' : 'Budget'}
                      </span>
                      <span className="font-mono font-black text-sm text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        {formatTND(proc.estimatedTotalCostTND, locale)}
                      </span>
                    </div>
                  </div>

                  {/* Title & Short Summary */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                      {shortDesc}
                    </p>
                  </div>

                  {/* Destination Public Desk Badge */}
                  <div className="p-2 rounded-xl bg-zinc-950/80 border border-white/[0.05] flex items-center justify-between text-[10px] text-zinc-300 font-medium">
                    <span className="flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{officeName}</span>
                    </span>
                    <span className="text-zinc-400 font-mono shrink-0">
                      {proc.requiredDocuments.length} {locale === 'ar' ? 'وثائق' : 'pièces'}
                    </span>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>{locale === 'ar' ? 'فتح الملف والإجراء' : 'Consulter le Guide'}</span>
                    <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </div>
                  </div>

                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      ) : (
        /* ── DENSE TABLE / LIST VIEW (1-LINE ROWS FOR RAPID SCAN) ── */
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d12] shadow-xl overflow-hidden divide-y divide-white/[0.06]">
          {filteredProcedures.map((proc) => {
            const title = getLocalized(proc.title, locale);
            const sectorBadgeStyle = getSectorStyle(proc.vertical);
            const officeName = getOfficeBadge(proc.relatedOfficeTypes);

            return (
              <Link
                key={proc.id}
                href={`/procedures/${proc.slug}`}
                className="p-3 sm:p-3.5 hover:bg-zinc-900/80 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-emerald-400 shrink-0 font-bold text-xs">
                    <FileCheck2 className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-300 font-mono mt-0.5">
                      <span className={`px-1.5 py-0.2 rounded border ${sectorBadgeStyle}`}>
                        {getVerticalLabel(proc.vertical, locale)}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Building2 className="w-3 h-3 text-zinc-500" />
                        <span>{officeName}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>{getLocalized(proc.estimatedProcessingTime, locale)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-black text-xs sm:text-sm text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-lg">
                    {formatTND(proc.estimatedTotalCostTND, locale)}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all">
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── 5. CIVIC GUARANTEE & STATUTORY SOURCES FOOTNOTE ── */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {locale === 'ar'
              ? 'جميع الإجراءات والتنابر الجبائية مطابقة لقوانين المالية الصادرة بالرائد الرسمي للجمهورية التونسية.'
              : 'Toutes les démarches et droits de timbres sont homologués selon les décrets de la Loi de Finances au JORT.'}
          </span>
        </div>
        <Link
          href="/calculator"
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
        >
          <span>{locale === 'ar' ? 'حاسبة التنابر بالمليم' : 'Calculateur de Timbres'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>

    </div>
  );
}
