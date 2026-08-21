'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
import { getLocalized } from '../lib/locale-utils';
import { proceduresData } from '../data/procedures';
import {
  Mic,
  FileSearch,
  FileText,
  Calculator,
  MapPin,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Search,
  Lock,
  CheckCircle2,
  Clock,
  Stamp,
  Zap,
  Building2,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';
import { formatTND } from '../lib/utils';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSimulationStep, setActiveSimulationStep] = useState(0);

  // Simulation steps for the Interactive Civic Terminal widget
  const simulationSteps = [
    {
      query: locale === 'ar' ? 'شنوة يلزمني باش نبدل الباسبور؟' : locale === 'en' ? 'What do I need to renew my passport?' : "Chnowa lezemni bech n'baddel el passeport?",
      detection: locale === 'en' ? 'Identified: Passport Renewal (Police/Garde)' : 'Démarche identifiée : Renouvellement Passeport (Police)',
      cost: '86.000 DT',
      time: '7 - 15 jours',
      papers: ['Ancien Passeport', 'Timbre Fiscal 80 DT', '4 Photos Fond Blanc', 'Copie CIN'],
    },
    {
      query: locale === 'ar' ? 'فسرلي هذا الإعلام بالضريبة البلدية' : locale === 'en' ? 'Explain this municipal property tax notice' : "Fasserli l'avis d'imposition zebla w khrouba",
      detection: locale === 'en' ? 'Identified: Municipal Property Tax Assessment' : 'Démarche identifiée : Avis de Taxe Foncière (Baladiya)',
      cost: '85.000 DT',
      time: 'Avant le 31 Décembre',
      papers: ['Avis Recette', 'Justificatif Domicile', 'CIN Propriétaire'],
    },
    {
      query: locale === 'ar' ? 'كيفاش نسجل في المبادر الذاتي 1%؟' : locale === 'en' ? 'How do I register for Auto-Entrepreneur 1%?' : 'Kifech n9ayed fi statut Auto-Entrepreneur 1%?',
      detection: locale === 'en' ? 'Identified: Auto-Entrepreneur Status Registration' : 'Démarche identifiée : Statut Auto-Entrepreneur (1% Flat Tax)',
      cost: '0.000 DT (Gratuit)',
      time: '24 - 48 heures',
      papers: ['Copie CIN', 'Justificatif Activité Freelance', 'Relevé RIB Bancaire'],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSimulationStep((prev) => (prev + 1) % simulationSteps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [simulationSteps.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(searchQuery.trim() ? `/copilot?q=${encodeURIComponent(searchQuery)}` : '/copilot');
  };

  const currentSim = simulationSteps[activeSimulationStep];

  const quickBadges = [
    { label: locale === 'en' ? 'Passport Renewal' : 'Passeport Tunisien', cost: '86 DT', href: '/procedures/passeport-renouvellement' },
    { label: locale === 'en' ? 'Car Registration Transfer' : 'Carte Grise (Mutation)', cost: '145 DT', href: '/procedures/mutation-carte-grise' },
    { label: locale === 'en' ? 'Rental Lease Agreement' : 'Contrat de Bail Baladiya', cost: '35 DT', href: '/documents/contrat-location' },
    { label: locale === 'en' ? 'Auto-Entrepreneur 1%' : 'Auto-Entrepreneur 1%', cost: '0 DT', href: '/launchpad' },
    { label: locale === 'en' ? 'Criminal Record (B3)' : 'Bulletin N°3 (B3)', cost: '7.5 DT', href: '/procedures/bulletin-numero-3' },
  ];

  const heroMain = t('heroHeadline');
  const heroAccent = t('heroHeadlineHighlight');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── 1. CINEMATIC HERO SECTION: SPLIT INTERACTIVE WORKSPACE ── */}
      <section className="relative pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Bold Narrative & Search */}
          <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
            {/* Live Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400 shadow-xl shadow-emerald-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('heroBadge')}</span>
              <span className="text-zinc-600">·</span>
              <span className="font-mono text-zinc-400 text-[10px]">JORT 2026</span>
            </div>

            {/* Headline */}
            <h1 className="leading-[1.1]">
              <span className="display-heading block text-3xl sm:text-5xl lg:text-6xl text-[#F5F4F0] tracking-tight">
                {heroMain}
              </span>
              <span
                className="display-heading block text-3xl sm:text-5xl lg:text-6xl italic mt-1"
                style={{ color: 'var(--stamp-green)' }}
              >
                {heroAccent}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              {t('heroSubheadline')}
            </p>

            {/* Interactive Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-emerald-500/60 rounded-2xl p-1.5 shadow-2xl transition-all max-w-xl group"
            >
              <Search className="w-4 h-4 text-zinc-500 mx-3 shrink-0 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('voiceSearchBarPlaceholder')}
                className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-2 min-w-0"
              />
              <Link
                href="/copilot"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'تكلم بالدارجة' : locale === 'en' ? 'Voice Copilot' : 'Voice AI'}</span>
              </Link>
            </form>

            {/* Quick Fast-Track Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 mr-1">
                {locale === 'en' ? 'Fast-Track:' : 'Direct :'}
              </span>
              {quickBadges.map((badge, idx) => (
                <Link
                  key={idx}
                  href={badge.href}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/30 text-xs text-zinc-300 transition-all cursor-pointer group"
                >
                  <span className="group-hover:text-emerald-300 transition-colors">{badge.label}</span>
                  <span className="font-mono text-[10px] text-amber-400 font-semibold">{badge.cost}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Live Simulation Terminal */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800/90 bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-zinc-950 shadow-2xl space-y-4 relative overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 ml-1">
                    Idaara Live Engine
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                  <Cpu className="w-2.5 h-2.5" />
                  <span>Realtime Inference</span>
                </span>
              </div>

              {/* Simulated Prompt Bubble */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                  <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Tunisian Citizen Voice Input (Derja):</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                  "{currentSim.query}"
                </p>
              </div>

              {/* Simulated Analysis Card */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white text-[11px] truncate max-w-[200px]">
                    {currentSim.detection}
                  </span>
                  <span className="font-mono font-extrabold text-amber-400 text-xs shrink-0">
                    {currentSim.cost}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>{locale === 'en' ? 'Estimated Processing:' : 'Délai moyen :'} <strong className="text-zinc-200">{currentSim.time}</strong></span>
                </div>

                {/* Required Papers Pills */}
                <div className="pt-2 border-t border-zinc-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    {locale === 'en' ? 'Auto-Calculated Dossier Checklist:' : 'Pièces requises & Timbres :'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSim.papers.map((paper, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-md bg-zinc-950 text-zinc-300 text-[10px] border border-zinc-800 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{paper}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terminal Progress Indicators */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-500 font-mono">
                <span>Scenario {activeSimulationStep + 1} / {simulationSteps.length}</span>
                <div className="flex gap-1.5">
                  {simulationSteps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSimulationStep(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSimulationStep === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BESPOKE BENTO GRID: THE 6 CIVIC ENGINES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'Unified Civic Architecture' : 'Plateforme Citoyenne Intégrée'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('featuresTitle')}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Module 1: Voice Copilot */}
          <Link
            href="/copilot"
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-lg shadow-emerald-950">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  Derja AI
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {locale === 'en' ? 'Derja Voice Copilot' : 'Voice Copilot en Derja'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'en'
                  ? 'Speak directly in Tunisian Derja, French, or English. Ask about any procedure or stamp cost with instant voice reasoning.'
                  : 'Posez vos questions administratives à la voix en Derja tunisienne ou Français pour obtenir démarches, pièces et timbres.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>{locale === 'en' ? 'Open Voice Studio' : 'Lancer le Voice Copilot'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Module 2: Fasserli OCR */}
          <Link
            href="/fasserli"
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform shadow-lg shadow-indigo-950">
                  <FileSearch className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                  Zero-Storage OCR
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                {locale === 'en' ? 'Administrative Notice OCR' : 'Fasserli Hal War9a (OCR)'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'en'
                  ? 'Scan tax assessments, police summons, or CNSS formal demands to get a 3-point explanation and statutory deadlines.'
                  : 'Scannez vos courriers officiels (redressement fiscal, convocations, CNSS) et obtenez une synthèse avec délais de réponse.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>{locale === 'en' ? 'Scan Document' : 'Décrypter un courrier'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Module 3: Smart PDF Forms */}
          <Link
            href="/documents"
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shadow-lg shadow-purple-950">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40">
                  Baladiya Ready
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {locale === 'en' ? 'Certified Legal PDF Forms' : 'Formulaires & Contrats PDF'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'en'
                  ? 'Generate residential lease contracts, powers of attorney, and sworn declarations formatted with stamp zones.'
                  : 'Générez des contrats de location, procurations et déclarations sur l’honneur conformes avec zones de légalisation.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>{locale === 'en' ? 'Generate PDF' : 'Générer un formulaire'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Module 4: Timbre Calculator */}
          <Link
            href="/calculator"
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-lg shadow-amber-950">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  Barème JORT
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {locale === 'en' ? 'Fiscal Stamp Budget Counter' : 'Calculateur de Timbres'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'en'
                  ? 'Exact calculation of statutory fiscal stamps (3 DT, 5 DT, 15 DT, 80 DT), photos, and certified copies.'
                  : 'Calculez le montant exact des timbres fiscaux (3 DT, 5 DT, 15 DT, 80 DT) et exportez votre checklist de dossier.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>{locale === 'en' ? 'Calculate Costs' : 'Estimer les frais'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Module 5: Office Locator */}
          <Link
            href="/locator"
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-lg shadow-cyan-950">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  350+ Guichets
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {locale === 'en' ? 'Baladiya & Office Locator' : 'Annuaire des Municipalités'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'en'
                  ? 'Locate public offices across 24 governorates with real-time Ramadan and Summer single-shift operating hours.'
                  : 'Adresses, téléphones et horaires réels (Ramadan & Séance Unique d’été) de plus de 350 guichets sur 24 wilayas.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>{locale === 'en' ? 'Search Offices' : 'Trouver un guichet'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Module 6: Freelance Launchpad */}
          <Link
            href="/launchpad"
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform shadow-lg shadow-rose-950">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/40">
                  1% Flat Tax
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                {locale === 'en' ? 'Freelancer & Founder Hub' : 'Espace Freelance & 1% Tax'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'en'
                  ? 'Simulate 1% Auto-Entrepreneur tax, generate BCT-compliant FX export invoices (EUR/USD), and compare legal forms.'
                  : 'Simulateur d’impôt 1%, facturation internationale en devises (EUR/USD) conforme BCT et comparateur de statuts.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>{locale === 'en' ? 'Launchpad Suite' : 'Accéder au Hub'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

        </div>
      </section>

      {/* ── 3. ZERO-STORAGE PRIVACY GUARANTEE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-zinc-900/90 to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left rtl:text-right">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{t('zeroStorageBanner')}</span>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800/50">
                  100% Client-Side
                </span>
              </h4>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                {t('zeroStorageSub')}
              </p>
            </div>
          </div>

          <Link
            href="/fasserli"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs transition-all hover:scale-105 shrink-0 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{locale === 'en' ? 'Test Secure OCR' : 'Tester le Scanner Sécurisé'}</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
