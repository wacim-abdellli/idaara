'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { proceduresData } from '../../data/procedures';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { formatTND } from '../../lib/utils';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn, FadeInStagger, FadeInItem } from '../../components/motion/FadeInStagger';
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
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
  ArrowUpDown,
  FileText,
  Stamp,
  CheckCircle2,
  Mic,
  Zap,
} from 'lucide-react';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'cost_asc' | 'cost_desc' | 'steps'>('default');

  const verticals: Array<{ id: string; label: string; icon: React.ElementType }> = [
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
    },
    {
      id: 'identity',
      label:
        locale === 'ar'
          ? 'الهوية والمواطنة'
          : locale === 'derja'
          ? 'Awra9 el Houwiya (CIN & Passeport)'
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
          : locale === 'derja'
          ? 'Krahba w Permis (ATTT)'
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
          : locale === 'derja'
          ? 'Machari3 w Freelance'
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
          : locale === 'derja'
          ? 'Kré, Dar, w STEG'
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
          : locale === 'derja'
          ? 'CNAM w CNSS'
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
          : locale === 'derja'
          ? 'Diwana & FCR'
          : locale === 'en'
          ? 'Customs & Diaspora (FCR)'
          : 'Douane & Diaspora (FCR)',
      icon: Plane,
    },
  ];

  const lifeScenarios = [
    {
      id: 'passeport-renouvellement',
      label:
        locale === 'ar'
          ? 'تجديد جواز السفر'
          : locale === 'derja'
          ? 'Baddel el Passeport'
          : locale === 'en'
          ? 'Passport Renewal'
          : 'Renouvellement Passeport',
      tag: '80 DT',
    },
    {
      id: 'mutation-carte-grise',
      label:
        locale === 'ar'
          ? 'شراء سيارة (بطاقة رمادية)'
          : locale === 'derja'
          ? 'Chrayen Krahba (Carte Grise)'
          : locale === 'en'
          ? 'Car Purchase (Carte Grise)'
          : 'Achat Voiture (Carte Grise)',
      tag: '145 DT',
    },
    {
      id: 'bulletin-numero-3',
      label:
        locale === 'ar'
          ? 'بطاقة السوابق العدلية (B3)'
          : locale === 'derja'
          ? 'Bita9a B3 (Casier)'
          : locale === 'en'
          ? 'B3 Police Record'
          : 'Extrait B3 (Casier)',
      tag: '7.5 DT',
    },
    {
      id: 'auto-entrepreneur-creation',
      label:
        locale === 'ar'
          ? 'نظام المبادر الذاتي'
          : locale === 'derja'
          ? 'Statut Auto-Entrepreneur'
          : locale === 'en'
          ? 'Auto-Entrepreneur Status'
          : 'Statut Auto-Entrepreneur',
      tag: '0 DT',
    },
    {
      id: 'contrat-location-residentiel',
      label:
        locale === 'ar'
          ? 'عقد كراء سكني مصادق'
          : locale === 'derja'
          ? 'Contrat de Bail Baladiya'
          : locale === 'en'
          ? 'Residential Lease Contract'
          : 'Contrat de Bail Baladiya',
      tag: '35 DT',
    },
    {
      id: 'fcr-regime-douanier',
      label:
        locale === 'ar'
          ? 'امتياز الديوانة (ن.ت.د / FCR)'
          : locale === 'derja'
          ? 'Imtiyaz FCR Diwana'
          : locale === 'en'
          ? 'FCR Customs Privilege'
          : 'Régime Douanier FCR',
      tag: '50 DT',
    },
  ];

  const filteredProcedures = useMemo(() => {
    let procs = proceduresData.filter((proc) => {
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

    if (sortBy === 'cost_asc') {
      procs = [...procs].sort((a, b) => a.estimatedTotalCostTND - b.estimatedTotalCostTND);
    } else if (sortBy === 'cost_desc') {
      procs = [...procs].sort((a, b) => b.estimatedTotalCostTND - a.estimatedTotalCostTND);
    } else if (sortBy === 'steps') {
      procs = [...procs].sort((a, b) => a.steps.length - b.steps.length);
    }

    return procs;
  }, [searchQuery, selectedVertical, sortBy, locale]);

  const featuredProcedures = proceduresData.slice(0, 4);

  const headlineMain =
    locale === 'ar'
      ? 'دليل الإجراءات الإدارية'
      : locale === 'derja'
      ? 'Dalil el Démarches wel Awra9'
      : locale === 'en'
      ? 'Official Procedures'
      : 'Répertoire Officiel des Démarches';

  const headlineAccent =
    locale === 'ar'
      ? 'خطوة بخطوة.'
      : locale === 'derja'
      ? 'Khatwa b’Khatwa.'
      : locale === 'en'
      ? 'Dossier Registry.'
      : 'Administratives.';

  const subtitle =
    locale === 'ar'
      ? 'تعرف على الوثائق المطلوبة، مصاريف التنابر الجبائية، الآجال والمكاتب المعنية لكل إجراء إداري دون مفاجآت.'
      : locale === 'derja'
      ? 'A3ref el awra9 el matlouba, masrouf el timbres, el wa9t wel blasa win temchi l’ay démarche men ghir t3ab.'
      : locale === 'en'
      ? 'Comprehensive citizen guide with exact fiscal stamp calculations, document checklists, and target public desks across Tunisia.'
      : 'Liste exhaustive des pièces requises, calcul des timbres fiscaux au millime près, délais légaux et guichets compétents.';

  const civicStats = [
    {
      label:
        locale === 'ar'
          ? 'إجراءات موثقة'
          : locale === 'derja'
          ? 'Démarches vérifiés'
          : locale === 'en'
          ? 'Verified Dossiers'
          : 'Démarches Certifiées',
      val: '11 Procédures',
      desc: 'JORT & Décrets',
    },
    {
      label:
        locale === 'ar'
          ? 'دقة التنابر'
          : locale === 'derja'
          ? 'Di9et el Timbres'
          : locale === 'en'
          ? 'Fiscal Stamp Accuracy'
          : 'Précision Timbres',
      val: '100% Exact',
      desc: 'Barème Officiel',
    },
    {
      label:
        locale === 'ar'
          ? 'معدل المراحل'
          : locale === 'derja'
          ? 'Khatwet'
          : locale === 'en'
          ? 'Average Step Count'
          : 'Étapes Moyennes',
      val: '3 - 4 Étapes',
      desc: 'Circuit optimisé',
    },
    {
      label:
        locale === 'ar'
          ? 'المصالح المعنية'
          : locale === 'derja'
          ? 'Baladiyas w Guichets'
          : locale === 'en'
          ? 'Competent Desks'
          : 'Guichets & Baladiyas',
      val: '24 Wilayas',
      desc: 'Couverture nationale',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 relative overflow-hidden">

      {/* Cinematic Ambient Orbs */}
      <AmbientOrbs variant="mixed" />

      {/* ── 2-Column Hero Header (Balanced Layout with Glow) ── */}
      <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80 relative">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-emerald-400 font-bold">/</span>
            <span>JORT & Code Administratif Tunisien</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </motion.span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Civic Standards Hub Widget */}
        <div className="lg:col-span-5 relative z-10">
          <SpotlightCard className="p-4 sm:p-5 border-zinc-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'en' ? 'Public Service Framework' : 'Garanties Civiques'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>JORT 2026</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {civicStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
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
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>

      {/* ── Life-Event Quick Scenario Pills ── */}
      <FadeIn direction="up" delay={0.1} className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {locale === 'ar'
                ? 'أكثر الإجراءات طلباً'
                : locale === 'derja'
                ? 'El Démarches el Maftou7a Barcha'
                : locale === 'en'
                ? 'Fast-Track Citizen Demands'
                : 'Démarches Populaires'}
            </span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {proceduresData.length}{' '}
            {locale === 'ar'
              ? 'إجراء متاح'
              : locale === 'derja'
              ? 'démarche mawjouda'
              : locale === 'en'
              ? 'homologated dossiers'
              : 'dossiers homologués'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {lifeScenarios.map((scenario) => (
            <motion.div key={scenario.id} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/procedures/${scenario.id}`}
                className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all duration-200 group flex flex-col justify-between h-full shadow-sm"
              >
                <span className="text-xs font-bold text-zinc-200 group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                  {scenario.label}
                </span>
                <div className="pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    {scenario.tag}
                  </span>
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all rtl:rotate-180" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* ── Filter & Search Control Bar ── */}
      <FadeIn direction="up" delay={0.15} className="p-3 sm:p-4 rounded-2xl glass-panel border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === 'ar'
                ? 'ابحث عن إجراء (جواز سفر، بطاقة تعريف، كراء...)'
                : locale === 'derja'
                ? 'Lawwej 3la démarche (Passeport, CIN, Krè...)'
                : locale === 'en'
                ? 'Search procedures (e.g. Passport, CIN, Lease...)'
                : 'Rechercher une démarche (Passeport, CIN, Bail...)'
            }
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all"
          />
        </div>

        {/* Sort & Quick Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="text-[11px] uppercase font-bold text-zinc-500">{locale === 'en' ? 'Sort:' : 'Trier :'}</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'default' | 'cost_asc' | 'cost_desc' | 'steps')}
            className="bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="default">{locale === 'en' ? 'Recommended' : 'Par Défaut'}</option>
            <option value="cost_asc">{locale === 'en' ? 'Budget (Lowest first)' : 'Budget (Moins cher d’abord)'}</option>
            <option value="cost_desc">{locale === 'en' ? 'Budget (Highest first)' : 'Budget (Plus élevé d’abord)'}</option>
            <option value="steps">{locale === 'en' ? 'Fewest Steps' : 'Moins d’étapes'}</option>
          </select>
        </div>
      </FadeIn>

      {/* ── Main Layout: Sidebar Categories + Procedure Dossiers Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Category Filter Menu */}
        <FadeIn direction="right" delay={0.2} className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <div className="glass-panel rounded-3xl p-3 border border-zinc-800/80 space-y-1 shadow-lg">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {locale === 'en' ? 'Filter by Sector' : 'Domaines d’administration'}
            </div>

            {verticals.map((v) => {
              const Icon = v.icon;
              const isSelected = selectedVertical === v.id;
              const count =
                v.id === 'all'
                  ? proceduresData.length
                  : proceduresData.filter((p) => p.vertical === v.id).length;

              return (
                <motion.button
                  key={v.id}
                  onClick={() => setSelectedVertical(v.id)}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
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
                </motion.button>
              );
            })}
          </div>

          {/* Quick Voice Assistant Banner */}
          <SpotlightCard className="p-4 border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-zinc-900 space-y-2.5 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Mic className="w-4 h-4" />
              <span>{locale === 'en' ? 'Voice Question?' : 'Question vocale ?'}</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              {locale === 'en'
                ? 'Speak in Derja or French and Idaara AI will identify the exact documents and stamp fees.'
                : 'Posez votre question en Derja ou Français à l’IA Vocale pour obtenir les étapes en direct.'}
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/copilot"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200 hover:underline pt-1"
              >
                <span>{locale === 'ar' ? 'استشارة المساعد الذكي' : locale === 'en' ? 'Ask Idaara AI' : 'Consulter Idaara AI'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </motion.div>
          </SpotlightCard>
        </FadeIn>

        {/* Right Column: Procedure Dossier Cards with Stagger and Spotlight */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
            <span className="font-semibold text-zinc-400">
              {filteredProcedures.length}{' '}
              {locale === 'ar'
                ? 'إجراء معتمد'
                : locale === 'derja'
                ? 'démarche homologuée'
                : locale === 'en'
                ? 'verified procedures'
                : 'procédures homologuées'}
            </span>
          </div>

          <FadeInStagger faster className="space-y-4">
            {filteredProcedures.map((proc) => {
              const title = getLocalized(proc.title, locale);
              const shortDesc = getLocalized(proc.shortDescription, locale);

              return (
                <FadeInItem key={proc.id}>
                  <Link href={`/procedures/${proc.id}`} className="block group">
                    <SpotlightCard className="p-5 sm:p-6 border-zinc-800/80 hover:border-zinc-700 shadow-xl relative overflow-hidden">
                      {/* Top Hover Gradient */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-zinc-800/80">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {proc.vertical}
                            </span>
                            <span className="text-zinc-600 text-xs">·</span>
                            <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-500" />
                              <span>{proc.estimatedProcessingTime}</span>
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                            {title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                          <div className="text-right rtl:text-left">
                            <span className="text-[9px] text-zinc-500 uppercase font-bold block">
                              {locale === 'ar'
                                ? 'المصاريف'
                                : locale === 'derja'
                                ? 'El Masrouf'
                                : locale === 'en'
                                ? 'Est. Budget'
                                : 'Budget'}
                            </span>
                            <span className="font-mono font-bold text-sm text-amber-400">
                              {formatTND(proc.estimatedTotalCostTND, locale)}
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all shadow-md">
                            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                          </div>
                        </div>
                      </div>

                      {/* Description & Step Breadcrumbs */}
                      <div className="pt-3.5 space-y-3">
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                          {shortDesc}
                        </p>

                        {/* Step Timeline Breadcrumbs */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {proc.steps.map((step, sIdx) => {
                            const stepTitle = getLocalized(step.title, locale);
                            return (
                              <div key={sIdx} className="flex items-center gap-1 text-[10px] text-zinc-400">
                                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 flex items-center gap-1 text-zinc-300">
                                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[9px] flex items-center justify-center font-bold">
                                    {sIdx + 1}
                                  </span>
                                  <span className="truncate max-w-[120px]">{stepTitle}</span>
                                </span>
                                {sIdx < proc.steps.length - 1 && (
                                  <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0 rtl:rotate-180" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Bottom Metadata Badges */}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-500 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                              {proc.requiredDocuments.length}{' '}
                              {locale === 'ar'
                                ? 'وثائق مطلوبة'
                                : locale === 'derja'
                                ? 'awra9'
                                : locale === 'en'
                                ? 'docs required'
                                : 'pièces'}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                              {proc.costsBreakdown.length}{' '}
                              {locale === 'ar'
                                ? 'معاليم/تنابر'
                                : locale === 'derja'
                                ? 'timbres/frais'
                                : locale === 'en'
                                ? 'fees/stamps'
                                : 'frais'}
                            </span>
                          </div>

                          <span className="text-emerald-400 font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1 text-xs">
                            <span>
                              {locale === 'ar'
                                ? 'فتح الملف'
                                : locale === 'derja'
                                ? '7el el dossier'
                                : locale === 'en'
                                ? 'Open Dossier'
                                : 'Consulter le dossier'}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </div>
    </div>
  );
}
