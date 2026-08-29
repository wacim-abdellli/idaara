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
  Check,
  Zap,
  Fingerprint,
  FilePenLine,
  Droplets,
  Hammer,
  Wrench,
  Shield,
  Layers,
  Award,
  ScrollText,
} from 'lucide-react';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'cost_asc' | 'cost_desc' | 'steps'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sector Definitions with refined styling
  const verticals: Array<{
    id: string;
    label: string;
    icon: React.ElementType;
    badgeColor: string;
  }> = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع الإجراءات'
          : locale === 'derja'
          ? 'El Kol'
          : locale === 'en'
          ? 'All Procedures'
          : 'Toutes les Démarches',
      icon: Layers,
      badgeColor: 'text-emerald-400',
    },
    {
      id: 'identity',
      label:
        locale === 'ar'
          ? 'الهوية والمواطنة'
          : locale === 'derja'
          ? 'Houwiya & CIN'
          : locale === 'en'
          ? 'Identity'
          : 'Identité & Citoyenneté',
      icon: Fingerprint,
      badgeColor: 'text-emerald-400',
    },
    {
      id: 'transport',
      label:
        locale === 'ar'
          ? 'النقل والسيارات'
          : locale === 'derja'
          ? 'Krahba w Permis'
          : locale === 'en'
          ? 'Transport'
          : 'Transport & Véhicules',
      icon: Car,
      badgeColor: 'text-cyan-400',
    },
    {
      id: 'business',
      label:
        locale === 'ar'
          ? 'الشركات والمشاريع'
          : locale === 'derja'
          ? 'Machari3 w Freelance'
          : locale === 'en'
          ? 'Business'
          : 'Entreprise & Freelance',
      icon: Briefcase,
      badgeColor: 'text-amber-400',
    },
    {
      id: 'housing',
      label:
        locale === 'ar'
          ? 'السكن والطاقة'
          : locale === 'derja'
          ? 'Kré, Dar, STEG'
          : locale === 'en'
          ? 'Housing'
          : 'Logement & Énergie',
      icon: Home,
      badgeColor: 'text-orange-400',
    },
    {
      id: 'healthcare',
      label:
        locale === 'ar'
          ? 'الصحة والضمان'
          : locale === 'derja'
          ? 'CNAM w CNSS'
          : locale === 'en'
          ? 'Healthcare'
          : 'Santé & Sécurité',
      icon: HeartPulse,
      badgeColor: 'text-rose-400',
    },
    {
      id: 'justice',
      label:
        locale === 'ar'
          ? 'العدل والأحوال'
          : locale === 'derja'
          ? '3adl w Baladiya'
          : locale === 'en'
          ? 'Justice'
          : 'Justice & Actes',
      icon: Scale,
      badgeColor: 'text-purple-400',
    },
    {
      id: 'customs',
      label:
        locale === 'ar'
          ? 'الديوانة والمهجر'
          : locale === 'derja'
          ? 'Diwana & FCR'
          : locale === 'en'
          ? 'Customs'
          : 'Douane & Diaspora',
      icon: Plane,
      badgeColor: 'text-teal-400',
    },
    {
      id: 'education',
      label:
        locale === 'ar'
          ? 'التعليم والمنح'
          : locale === 'derja'
          ? 'Ta3lim w Bourse'
          : locale === 'en'
          ? 'Education'
          : 'Enseignement & Bourses',
      icon: GraduationCap,
      badgeColor: 'text-blue-400',
    },
  ];

  // Procedure Vector Icon Resolver (Zero Emojis - 100% Crisp Vector SVGs)
  const getProcedureIcon = (slug: string, vertical: string): React.ElementType => {
    const s = slug.toLowerCase();
    if (s.includes('passeport')) return Fingerprint;
    if (s.includes('cin')) return ShieldCheck;
    if (s.includes('bulletin') || s.includes('b3') || s.includes('casier')) return FileCheck2;
    if (s.includes('carte-grise') || s.includes('vehicule') || s.includes('immatriculation')) return Car;
    if (s.includes('permis-de-conduire') || s.includes('permis-conduire')) return CreditCard;
    if (s.includes('contrat') || s.includes('location') || s.includes('bail')) return FilePenLine;
    if (s.includes('auto-entrepreneur') || s.includes('freelance')) return Briefcase;
    if (s.includes('societe') || s.includes('sarl') || s.includes('suarl') || s.includes('rne')) return Building2;
    if (s.includes('cnss') || s.includes('retraite') || s.includes('pension')) return Shield;
    if (s.includes('cnam') || s.includes('soins') || s.includes('carnet')) return HeartPulse;
    if (s.includes('steg') || s.includes('electricite') || s.includes('gaz')) return Zap;
    if (s.includes('sonede') || s.includes('eau')) return Droplets;
    if (s.includes('mariage') || s.includes('divorce') || s.includes('heritage') || s.includes('hojjet')) return Scale;
    if (s.includes('douane') || s.includes('fcr') || s.includes('importation')) return Plane;
    if (s.includes('bourse') || s.includes('universite') || s.includes('etudiant') || s.includes('bac')) return GraduationCap;
    if (s.includes('permis-de-batir') || s.includes('batir') || s.includes('construction')) return Hammer;
    if (s.includes('visite-technique')) return Wrench;
    
    switch(vertical) {
      case 'identity': return Fingerprint;
      case 'transport': return Car;
      case 'business': return Briefcase;
      case 'housing': return Home;
      case 'healthcare': return HeartPulse;
      case 'justice': return Scale;
      case 'customs': return Plane;
      case 'education': return GraduationCap;
      default: return FileText;
    }
  };

  // Sector Color styling
  const getSectorStyle = (vertical: string) => {
    switch (vertical) {
      case 'identity':
        return {
          badge: 'text-emerald-300 bg-emerald-950/80 border-emerald-700/50',
          avatar: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50',
          hoverBorder: 'group-hover:border-emerald-500/40',
        };
      case 'transport':
        return {
          badge: 'text-cyan-300 bg-cyan-950/80 border-cyan-700/50',
          avatar: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50',
          hoverBorder: 'group-hover:border-cyan-500/40',
        };
      case 'business':
        return {
          badge: 'text-amber-300 bg-amber-950/80 border-amber-700/50',
          avatar: 'bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/50',
          hoverBorder: 'group-hover:border-amber-500/40',
        };
      case 'housing':
        return {
          badge: 'text-orange-300 bg-orange-950/80 border-orange-700/50',
          avatar: 'bg-orange-500/10 border-orange-500/30 text-orange-400 group-hover:bg-orange-500/20 group-hover:border-orange-500/50',
          hoverBorder: 'group-hover:border-orange-500/40',
        };
      case 'healthcare':
        return {
          badge: 'text-rose-300 bg-rose-950/80 border-rose-700/50',
          avatar: 'bg-rose-500/10 border-rose-500/30 text-rose-400 group-hover:bg-rose-500/20 group-hover:border-rose-500/50',
          hoverBorder: 'group-hover:border-rose-500/40',
        };
      case 'justice':
        return {
          badge: 'text-purple-300 bg-purple-950/80 border-purple-700/50',
          avatar: 'bg-purple-500/10 border-purple-500/30 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/50',
          hoverBorder: 'group-hover:border-purple-500/40',
        };
      case 'customs':
        return {
          badge: 'text-teal-300 bg-teal-950/80 border-teal-700/50',
          avatar: 'bg-teal-500/10 border-teal-500/30 text-teal-400 group-hover:bg-teal-500/20 group-hover:border-teal-500/50',
          hoverBorder: 'group-hover:border-teal-500/40',
        };
      case 'education':
        return {
          badge: 'text-blue-300 bg-blue-950/80 border-blue-700/50',
          avatar: 'bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/50',
          hoverBorder: 'group-hover:border-blue-500/40',
        };
      default:
        return {
          badge: 'text-zinc-300 bg-zinc-900 border-white/[0.1]',
          avatar: 'bg-zinc-800 border-zinc-700 text-zinc-300 group-hover:bg-zinc-700',
          hoverBorder: 'group-hover:border-white/[0.2]',
        };
    }
  };

  // Primary Destination Office Helper
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 space-y-8 relative overflow-hidden bg-[#07080a] text-[#F5F4F0]">
      
      {/* Subtle Ambient Radial Glow */}
      <AmbientOrbs variant="emerald" />

      {/* ── 1. AUTHORITATIVE CIVIC HEADER (GENEROUS SPACING, NO CLIPPING) ── */}
      <div className="space-y-4 pt-2 relative z-10">
        
        {/* Breadcrumb / Republic Crest */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-400">
          <span className="text-emerald-400 font-bold">🇹🇳</span>
          <span>{locale === 'ar' ? 'الجمهورية التونسية' : 'République Tunisienne'}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">{locale === 'ar' ? 'الدليل الوطني للإجراءات' : 'Répertoire National des Démarches'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/40">
            JORT 2026
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-2">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {locale === 'ar'
                ? 'دليل الإجراءات الإدارية والتنابر'
                : locale === 'derja'
                ? 'Dalil el Démarchet wel Timbres'
                : locale === 'en'
                ? 'Official Administrative Procedures Directory'
                : 'Répertoire Officiel des Démarches & Timbres'}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              {locale === 'ar'
                ? '38 إجراء مدني معتمد مع التكلفة الدقيقة بالدينار، قوائم الوثائق الإلزامية، والشبابيك المعنية لتفادي المفاجآت.'
                : locale === 'derja'
                ? '38 procédure s7i7a b\'el masrouf bel mlim, el awra9 el lezmin, wel 9badhat el marje3 bech ma yrajj3oukch.'
                : locale === 'en'
                ? '38 verified civic procedures with exact statutory fees in TND, required document checklists, and competent public desks.'
                : '38 démarches administratives homologuées avec pièces obligatoires, calcul exact des timbres fiscaux et guichets compétents.'}
            </p>
          </div>

          {/* Quick Stat Indicators */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/[0.1] text-center shadow-lg">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                {locale === 'ar' ? 'الإجراءات' : 'Démarches'}
              </span>
              <span className="text-xl font-mono font-black text-emerald-400">
                {proceduresData.length}
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/[0.1] text-center shadow-lg">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                {locale === 'ar' ? 'القطاعات' : 'Secteurs'}
              </span>
              <span className="text-xl font-mono font-black text-amber-400">
                8
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 2. REFINED LUXURY SECTOR FILTER TABS ── */}
      <div className="sticky top-16 z-30 py-3 bg-[#07080a]/95 backdrop-blur-xl border-y border-white/[0.08] -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 shadow-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-[#0e1015] text-zinc-400 hover:text-white border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : v.badgeColor}`} />
                <span>{v.label}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-emerald-500/30 text-emerald-300 font-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. COMMAND & SEARCH TOOLBAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#0e1015] border border-white/[0.1] shadow-xl">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
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
            className="w-full bg-zinc-950 border border-white/[0.1] focus:border-emerald-400 rounded-xl pl-10 pr-8 rtl:pr-10 rtl:pl-8 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-3 text-zinc-400 hover:text-white p-0.5 cursor-pointer"
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
              className="bg-zinc-950 border border-white/[0.1] focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="default">{locale === 'ar' ? 'ترتيب افتراضي' : 'Par Défaut'}</option>
              <option value="cost_asc">{locale === 'ar' ? 'الأقل تكلفة أولاً' : 'Budget (Croissant)'}</option>
              <option value="cost_desc">{locale === 'ar' ? 'الأعلى تكلفة أولاً' : 'Budget (Décroissant)'}</option>
              <option value="steps">{locale === 'ar' ? 'أقل خطوات' : 'Moins d’étapes'}</option>
            </select>
          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-950 border border-white/[0.1]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="Dense Table View"
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* ── 4. PROCEDURES DISPLAY (CIVIC LUXURY CARDS OR EXECUTIVE TABLE) ── */}
      {filteredProcedures.length === 0 ? (
        <div className="py-20 text-center space-y-3 rounded-3xl bg-[#0e1015] border border-white/[0.08] shadow-2xl">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">
            {locale === 'ar' ? 'لم يتم العثور على أي إجراء' : 'Aucune démarche trouvée'}
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
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
        /* ── CIVIC LUXURY CARDS GRID (WITH VECTOR ICONS & LUXURY ACCENTS) ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProcedures.map((proc) => {
            const title = getLocalized(proc.title, locale);
            const shortDesc = getLocalized(proc.shortDescription, locale);
            const style = getSectorStyle(proc.vertical);
            const officeName = getOfficeBadge(proc.relatedOfficeTypes);
            const IconComponent = getProcedureIcon(proc.slug, proc.vertical);

            return (
              <Link key={proc.id} href={`/procedures/${proc.slug}`} className="block group">
                <SpotlightCard className={`p-5 border-white/[0.08] bg-gradient-to-b from-[#0e1015] to-[#0a0b0e] ${style.hoverBorder} shadow-xl transition-all h-full flex flex-col justify-between space-y-4 rounded-2xl relative overflow-hidden`}>
                  
                  {/* Top Bar: Vector Icon + Sector Badge + Statutory Fee */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.06]">
                    
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Vector Icon Container */}
                      <div className={`w-10 h-10 rounded-xl border ${style.avatar} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-all`}>
                        <IconComponent className="w-5 h-5 stroke-[1.75]" />
                      </div>

                      {/* Sector & Duration */}
                      <div className="space-y-1 min-w-0">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.badge} inline-block truncate max-w-[150px]`}>
                          {getVerticalLabel(proc.vertical, locale)}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                          <Clock className="w-3 h-3 text-zinc-500 shrink-0" />
                          <span>{getLocalized(proc.estimatedProcessingTime, locale)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Statutory Budget Tag in Metallic Gold */}
                    <div className="text-right rtl:text-left shrink-0">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase block">
                        {locale === 'ar' ? 'المجموع' : 'Budget'}
                      </span>
                      <span className="font-mono font-black text-xs sm:text-sm text-amber-300 bg-amber-950/70 border border-amber-800/50 px-2.5 py-1 rounded-lg inline-block shadow-sm">
                        {formatTND(proc.estimatedTotalCostTND, locale)}
                      </span>
                    </div>

                  </div>

                  {/* Title & Short Summary */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      {shortDesc}
                    </p>
                  </div>

                  {/* Destination Public Desk Ribbon */}
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-300 font-medium">
                    <span className="flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{officeName}</span>
                    </span>
                    <span className="text-zinc-400 font-mono text-[10px] shrink-0 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/[0.05]">
                      {proc.requiredDocuments.length} {locale === 'ar' ? 'وثائق' : 'pièces'}
                    </span>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>{locale === 'ar' ? 'فتح الدليل وملف الوثائق' : 'Consulter le Dossier Complet'}</span>
                    <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </div>
                  </div>

                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      ) : (
        /* ── EXECUTIVE NATIONAL DATA TABLE (DENSE TABLE VIEW) ── */
        <div className="rounded-2xl border border-white/[0.1] bg-[#0e1015] shadow-2xl overflow-hidden">
          
          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-zinc-950 border-b border-white/[0.08] text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            <div className="col-span-6 sm:col-span-5">{locale === 'ar' ? 'الإجراء الإداري' : 'Procédure Administrative'}</div>
            <div className="col-span-3 sm:col-span-3 hidden sm:block">{locale === 'ar' ? 'المصلحة المختصة' : 'Guichet Compétent'}</div>
            <div className="col-span-3 sm:col-span-2 text-center">{locale === 'ar' ? 'المدة والوثائق' : 'Délai / Pièces'}</div>
            <div className="col-span-3 sm:col-span-2 text-right rtl:text-left">{locale === 'ar' ? 'المعلوم الرسمي' : 'Tarif Légal'}</div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {filteredProcedures.map((proc) => {
              const title = getLocalized(proc.title, locale);
              const style = getSectorStyle(proc.vertical);
              const officeName = getOfficeBadge(proc.relatedOfficeTypes);
              const IconComponent = getProcedureIcon(proc.slug, proc.vertical);

              return (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.slug}`}
                  className="grid grid-cols-12 gap-3 p-3.5 sm:p-4 hover:bg-zinc-900/90 transition-colors items-center group"
                >
                  {/* Col 1: Vector Icon + Title + Sector */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl border ${style.avatar} flex items-center justify-center shrink-0`}>
                      <IconComponent className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {title}
                      </h3>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${style.badge} inline-block mt-0.5`}>
                        {getVerticalLabel(proc.vertical, locale)}
                      </span>
                    </div>
                  </div>

                  {/* Col 2: Desk Authority */}
                  <div className="col-span-3 sm:col-span-3 hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 truncate">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{officeName}</span>
                  </div>

                  {/* Col 3: Delay & Documents */}
                  <div className="col-span-3 sm:col-span-2 text-center text-[11px] font-mono text-zinc-400">
                    <div>{getLocalized(proc.estimatedProcessingTime, locale)}</div>
                    <div className="text-[10px] text-zinc-500">{proc.requiredDocuments.length} {locale === 'ar' ? 'وثائق' : 'pièces'}</div>
                  </div>

                  {/* Col 4: Statutory Fee & Arrow */}
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-2">
                    <span className="font-mono font-black text-xs sm:text-sm text-amber-300 bg-amber-950/70 border border-amber-800/50 px-2 py-0.5 rounded-lg">
                      {formatTND(proc.estimatedTotalCostTND, locale)}
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      )}

      {/* ── 5. CIVIC GUARANTEE FOOTNOTE ── */}
      <div className="p-4 rounded-2xl bg-[#0e1015] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-300 shadow-xl">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {locale === 'ar'
              ? 'جميع الإجراءات والتنابر الجبائية مطابقة لقوانين المالية الصادرة بالرائد الرسمي للجمهورية التونسية.'
              : 'Toutes les démarches et droits de timbres sont homologués selon les décrets officiels du JORT 2026.'}
          </span>
        </div>
        <Link
          href="/calculator"
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
        >
          <span>{locale === 'ar' ? 'حاسبة التنابر بالمليم' : 'Calculateur de Timbres Fiscaux'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>

    </div>
  );
}
