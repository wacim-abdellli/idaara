'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { proceduresData } from '../../data/procedures';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { getVerticalLabel } from '../../lib/vertical-labels';
import { formatTND } from '../../lib/utils';
import {
  Search,
  ArrowRight,
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
  GraduationCap,
  Scale,
  LayoutGrid,
  List,
  X,
  Zap,
  Fingerprint,
  FilePenLine,
  Droplets,
  Hammer,
  Wrench,
  Shield,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'cost_asc' | 'cost_desc' | 'steps'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sector Definitions
  const verticals: Array<{
    id: string;
    label: string;
    icon: React.ElementType;
    color: string;
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
          : 'Toutes les démarches',
      icon: Layers,
      color: 'text-emerald-400',
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
      color: 'text-emerald-400',
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
      color: 'text-cyan-400',
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
      color: 'text-amber-400',
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
      color: 'text-orange-400',
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
      color: 'text-rose-400',
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
      color: 'text-purple-400',
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
      color: 'text-teal-400',
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
      color: 'text-blue-400',
    },
  ];

  // Procedure Vector Icon Resolver
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

    switch (vertical) {
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

  // Color mapping per sector
  const getSectorColor = (vertical: string) => {
    switch (vertical) {
      case 'identity': return 'text-emerald-400';
      case 'transport': return 'text-cyan-400';
      case 'business': return 'text-amber-400';
      case 'housing': return 'text-orange-400';
      case 'healthcare': return 'text-rose-400';
      case 'justice': return 'text-purple-400';
      case 'customs': return 'text-teal-400';
      case 'education': return 'text-blue-400';
      default: return 'text-zinc-400';
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

  const heroHeadline =
    locale === 'ar'
      ? 'دليل الإجراءات الإدارية والتنابر'
      : locale === 'derja'
      ? 'Dalil el Awra9 wel Timbres'
      : locale === 'en'
      ? 'Official Administrative Procedures Directory'
      : 'Répertoire Officiel des Démarches & Timbres';

  const heroSubheadline =
    locale === 'ar'
      ? `${proceduresData.length} إجراء مدني معتمد مع التكلفة الدقيقة بالدينار، قوائم الوثائق الإلزامية، والشبابيك المعنية لتفادي المفاجآت.`
      : locale === 'derja'
      ? `${proceduresData.length} 9adhya s7i7a b'el masrouf bel mlim, el awra9 el lezmin, wel 9badhat el marje3.`
      : locale === 'en'
      ? `${proceduresData.length} verified civic procedures with exact statutory fees in TND, required document checklists, and competent public desks.`
      : `${proceduresData.length} démarches administratives homologuées avec pièces obligatoires, calcul exact des timbres fiscaux et guichets compétents.`;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20 space-y-8">
        
        {/* ── 1. EXPANSIVE CLEAN HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>JORT {new Date().getFullYear()} · République Tunisienne</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {heroHeadline}
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              {heroSubheadline}
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-zinc-400">
            <span className="px-3.5 py-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <strong className="text-white font-bold">{proceduresData.length}</strong> démarches
            </span>
            <span className="px-3.5 py-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
              <strong className="text-white font-bold">8</strong> secteurs
            </span>
          </div>
        </div>

        {/* ── 2. REFINED MINIMALIST SECTOR TABS ── */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                className={`px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-800 text-white font-bold border border-white/15 shadow-sm'
                    : 'bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/50 hover:border-zinc-700/60 font-medium'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
                <span>{v.label}</span>
                <span
                  className={`text-[11px] font-mono ${
                    isSelected ? 'text-emerald-400 font-bold' : 'text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 3. SEARCH & CONTROLS TOOLBAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
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
              className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-emerald-500/60 rounded-xl pl-10 pr-8 rtl:pr-10 rtl:pl-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
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
            
            <span className="text-xs font-mono text-zinc-400 shrink-0">
              <span className="text-emerald-400 font-bold">{filteredProcedures.length}</span> / {proceduresData.length}{' '}
              {locale === 'ar' ? 'إجراء' : 'démarches'}
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 shrink-0 hidden sm:inline-block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'cost_asc' | 'cost_desc' | 'steps')}
                className="bg-zinc-950/80 border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="default">{locale === 'ar' ? 'ترتيب افتراضي' : 'Par Défaut'}</option>
                <option value="cost_asc">{locale === 'ar' ? 'الأقل تكلفة أولاً' : 'Budget (Croissant)'}</option>
                <option value="cost_desc">{locale === 'ar' ? 'الأعلى تكلفة أولاً' : 'Budget (Décroissant)'}</option>
                <option value="steps">{locale === 'ar' ? 'أقل خطوات' : 'Moins d’étapes'}</option>
              </select>
            </div>

            {/* Grid vs List View Toggle */}
            <div className="flex items-center p-0.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

        {/* ── 4. PROCEDURES DISPLAY (AIRY EXPANSIVE CARDS OR CLEAN TABLE) ── */}
        {filteredProcedures.length === 0 ? (
          <div className="py-20 text-center space-y-3 rounded-3xl bg-zinc-900/30 border border-zinc-800">
            <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {locale === 'ar' ? 'لم يتم العثور على أي إجراء' : 'Aucune démarche trouvée'}
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {locale === 'ar' ? 'جرب البحث بكلمات أخرى أو اختر قطاعاً مختلفاً' : 'Essayez d’autres termes de recherche ou réinitialisez les filtres.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedVertical('all'); }}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              {locale === 'ar' ? 'إعادة ضبط البحث' : 'Réinitialiser les filtres'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ── AIRY FLUID CARDS GRID ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProcedures.map((proc) => {
              const title = getLocalized(proc.title, locale);
              const shortDesc = getLocalized(proc.shortDescription, locale);
              const sectorColor = getSectorColor(proc.vertical);
              const officeName = getOfficeBadge(proc.relatedOfficeTypes);
              const IconComponent = getProcedureIcon(proc.slug, proc.vertical);

              return (
                <Link key={proc.id} href={`/procedures/${proc.slug}`} className="block group">
                  <div className="p-6 rounded-3xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/70 hover:border-emerald-500/40 transition-all duration-200 h-full flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5">
                    
                    {/* Clean Top Line: Category + Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <IconComponent className={`w-4 h-4 ${sectorColor}`} />
                        <span className="text-zinc-400">{getVerticalLabel(proc.vertical, locale)}</span>
                      </div>

                      <span className="font-mono font-bold text-xs sm:text-sm text-amber-400">
                        {formatTND(proc.estimatedTotalCostTND, locale)}
                      </span>
                    </div>

                    {/* Body: Title & 2-Line Summary */}
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {shortDesc}
                      </p>
                    </div>

                    {/* Clean Footer */}
                    <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-zinc-300 truncate">{officeName}</span>
                        <span>·</span>
                        <span>{proc.requiredDocuments.length} {locale === 'ar' ? 'وثائق' : 'pièces'}</span>
                        <span>·</span>
                        <span className="text-zinc-500">{getLocalized(proc.estimatedProcessingTime, locale)}</span>
                      </div>

                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all shrink-0 ml-2" />
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* ── DENSE CLEAN TABLE VIEW ── */
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 shadow-sm overflow-hidden divide-y divide-zinc-800/70">
            {filteredProcedures.map((proc) => {
              const title = getLocalized(proc.title, locale);
              const sectorColor = getSectorColor(proc.vertical);
              const officeName = getOfficeBadge(proc.relatedOfficeTypes);
              const IconComponent = getProcedureIcon(proc.slug, proc.vertical);

              return (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.slug}`}
                  className="p-4 hover:bg-zinc-800/50 transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                      <IconComponent className={`w-4 h-4 ${sectorColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono mt-0.5">
                        <span>{getVerticalLabel(proc.vertical, locale)}</span>
                        <span>·</span>
                        <span>{officeName}</span>
                        <span>·</span>
                        <span>{getLocalized(proc.estimatedProcessingTime, locale)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono font-bold text-xs text-amber-400">
                      {formatTND(proc.estimatedTotalCostTND, locale)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-all rtl:rotate-180" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── 5. CIVIC FOOTNOTE ── */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
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
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>{locale === 'ar' ? 'حاسبة التنابر بالمليم' : 'Calculateur de Timbres Fiscaux'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </div>
  );
}
