'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
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
  Building2,
  ChevronRight,
  Eye,
  Sliders,
  FileCode2,
  Terminal,
  Zap,
  Activity,
} from 'lucide-react';
import { formatTND } from '../lib/utils';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();

  // Interactive State
  const [searchVal, setSearchVal] = useState('');
  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'tax' | 'lease'>('passport');
  const [interactiveBudget, setInteractiveBudget] = useState<number>(35000);
  const [selectedWilaya, setSelectedWilaya] = useState('Tunis');
  const [activeVoiceWave, setActiveVoiceWave] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/copilot?q=${encodeURIComponent(searchVal)}`);
    } else {
      router.push('/copilot');
    }
  };

  // Inspector Documents Data
  const inspectorDocs = {
    passport: {
      type: locale === 'en' ? 'National Passport Renewal' : 'Renouvellement Passeport Tunisien',
      authority: 'Ministère de l’Intérieur (Poste de Police / Garde)',
      fee: '86.000 DT',
      time: '7 - 15 jours',
      stamp: '80.000 DT (Tarif Ordinaire)',
      status: 'Dossier Conforme',
      points: [
        locale === 'en' ? 'Requires 80 DT fiscal stamp from Recette' : 'Timbre fiscal 80 DT obligatoire de la Recette',
        locale === 'en' ? '4 official white-background photos' : '4 photos d’identité récentes sur fond blanc',
        locale === 'en' ? 'Surrender of expiring passport' : 'Restitution de l’ancien passeport',
      ],
    },
    tax: {
      type: locale === 'en' ? 'Municipal Property Tax Assessment' : 'Avis d’Imposition Fiscale (Zebla w Khrouba)',
      authority: 'Direction Générale des Impôts & Baladiya',
      fee: '85.000 DT',
      time: 'Avant le 31 Décembre',
      stamp: 'Taxe Forfaitaire Bâtie',
      status: 'Échéance en cours',
      points: [
        locale === 'en' ? 'Statutory annual sanitation tax' : 'Taxe municipale annuelle sur les immeubles bâtis',
        locale === 'en' ? 'Payable at local Recette Municipale' : 'Paiement à la Recette Municipale ou par carte',
        locale === 'en' ? '0.75% monthly late penalty risk' : 'Pénalité de 0.75% par mois en cas de retard',
      ],
    },
    lease: {
      type: locale === 'en' ? 'Residential Lease Agreement' : 'Contrat de Location Résidentiel (3a9d Kré)',
      authority: 'Municipalité (Baladiya Ta3rif bel Imdha2)',
      fee: '35.000 DT',
      time: 'Immédiat au guichet',
      stamp: '30 DT Enregistrement + 5 DT Baladiya',
      status: 'Homologué COC',
      points: [
        locale === 'en' ? 'Code of Obligations (COC) compliant' : 'Conforme aux articles 1104 du Code des Contrats',
        locale === 'en' ? 'Mandatory in-person signature legalization' : 'Légalisation des signatures en présence physique',
        locale === 'en' ? 'Registration at Recette des Finances' : 'Enregistrement obligatoire à la Recette',
      ],
    },
  };

  const currentDoc = inspectorDocs[activeInspectorDoc];

  // Dynamic calculation for the interactive tax & timbre slider
  const simulatedTax = interactiveBudget * 0.01;
  const simulatedCnss = 200; // ~50 DT / quarter
  const simulatedNet = interactiveBudget - simulatedTax - simulatedCnss;

  const wilayaData: Record<string, { baladiya: string; recette: string; status: string }> = {
    Tunis: { baladiya: 'Kasbah / Bab Bhar (08:30 - 16:30)', recette: 'Beb Souika & Kasbah (08:00 - 15:30)', status: 'Ouvert' },
    Ariana: { baladiya: 'Ariana Ville / Menzah 6 (08:30 - 16:30)', recette: 'Ariana Centre (08:00 - 15:30)', status: 'Ouvert' },
    Sousse: { baladiya: 'Bouhsina / Khezama (08:30 - 16:30)', recette: 'Sousse Médina (08:00 - 15:30)', status: 'Ouvert' },
    Sfax: { baladiya: 'Sfax Ville / Sakiet Ezzit (08:30 - 16:30)', recette: 'Sfax Port & Centre (08:00 - 15:30)', status: 'Ouvert' },
    Nabeul: { baladiya: 'Nabeul / Hammamet (08:30 - 16:30)', recette: 'Nabeul Centre (08:00 - 15:30)', status: 'Ouvert' },
    Bizerte: { baladiya: 'Bizerte Ville / Menzel B. (08:30 - 16:30)', recette: 'Bizerte Port (08:00 - 15:30)', status: 'Ouvert' },
  };

  return (
    <div className="space-y-24 sm:space-y-36 pb-28 relative overflow-hidden">

      {/* ── 1. MONUMENTAL HERO STAGE ── */}
      <section className="relative pt-6 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Ambient Glows */}
        <div className="absolute -top-12 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Typographic Narrative & Voice Launcher */}
          <div className="lg:col-span-6 space-y-6 text-left rtl:text-right relative z-10">
            
            {/* Live National Registry Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 shadow-xl shadow-emerald-950/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>IDAARA AI · NATIONAL CIVIC PLATFORM</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-normal">JORT 2026</span>
            </div>

            {/* Monumental Editorial Headline */}
            <h1 className="leading-[1.05] tracking-tight">
              <span className="display-heading block text-4xl sm:text-6xl lg:text-7xl text-[#F5F4F0] font-normal">
                {t('heroHeadline')}
              </span>
              <span
                className="display-heading block text-4xl sm:text-6xl lg:text-7xl italic mt-1 font-serif"
                style={{ color: 'var(--stamp-green)' }}
              >
                {t('heroHeadlineHighlight')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              {t('heroSubheadline')}
            </p>

            {/* Integrated Fast Action Search Deck */}
            <div className="space-y-3 pt-2">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-emerald-500/70 rounded-2xl p-2 shadow-2xl transition-all max-w-xl group"
              >
                <Search className="w-4 h-4 text-zinc-500 mx-3 shrink-0 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder={t('voiceSearchBarPlaceholder')}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-2 min-w-0"
                />
                <Link
                  href="/copilot"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'المساعد الصوتي' : 'Voice Copilot'}</span>
                </Link>
              </form>

              {/* Direct Procedure Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {locale === 'en' ? 'Direct Access:' : 'Accès Direct :'}
                </span>
                {[
                  { name: 'Passeport', cost: '86 DT', href: '/procedures/passeport-renouvellement' },
                  { name: 'Carte Grise', cost: '145 DT', href: '/procedures/mutation-carte-grise' },
                  { name: 'Contrat Bail', cost: '35 DT', href: '/documents/contrat-location' },
                  { name: 'Auto-Entrepreneur', cost: '1% Tax', href: '/launchpad' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-xs text-zinc-300 transition-all group"
                  >
                    <span className="group-hover:text-emerald-300 transition-colors">{item.name}</span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{item.cost}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Physical Laser Document Scanner & Legal Telemetry (Tactile Inspector) */}
          <div className="lg:col-span-6 relative">
            
            {/* Interactive Document Switcher Tabs */}
            <div className="flex items-center gap-2 mb-3">
              {[
                { id: 'passport' as const, label: '🪪 Passeport', tag: '86 DT' },
                { id: 'tax' as const, label: '📄 Avis Fiscal', tag: 'DGI' },
                { id: 'lease' as const, label: '⚖️ Contrat Bail', tag: 'Baladiya' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInspectorDoc(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    activeInspectorDoc === tab.id
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-zinc-800'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* The Document Visual Card with Sweeping Laser Scan Line */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/90 bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 shadow-2xl relative overflow-hidden animate-border-glow">
              
              {/* Sweeping Laser Beam Animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser pointer-events-none z-20" />

              {/* Document Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50">
                      DOCUMENT OFFICIEL
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">RÉP. TUNISIENNE</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {currentDoc.type}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{currentDoc.authority}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">Total Estimé</span>
                  <span className="text-base sm:text-lg font-mono font-extrabold text-amber-400">{currentDoc.fee}</span>
                </div>
              </div>

              {/* Key Verification Points */}
              <div className="py-4 space-y-2.5 relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SYNTHÈSE JURIDIQUE & EXIGENCES :</span>
                </div>

                <div className="space-y-2">
                  {currentDoc.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Footer Bar */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between relative z-10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]">
                    ⏱ {currentDoc.time}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 text-[11px]">
                    {currentDoc.stamp}
                  </span>
                </div>

                <Link
                  href="/procedures"
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold group"
                >
                  <span>Dossier Complet</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ── 2. INTERACTIVE FISCAL STAMP & 1% TAX STUDIO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-zinc-800/90 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-zinc-950 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>SIMULATEUR INTERACTIF EN DIRECT</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {locale === 'ar' ? 'حاسبة الضرائب والتنابر التفاعلية' : 'Calculateur Budgétaire & Fiscal en Direct'}
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              {locale === 'ar'
                ? 'حرّك المؤشر لمعرفة الضريبة 1% ومساهمة الضمان الاجتماعي وصافي الدخل.'
                : 'Ajustez le curseur de chiffre d’affaires pour simuler en temps réel vos impôts au forfait de 1% et vos cotisations CNSS.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider Control */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-semibold">Chiffre d’Affaires Annuel Estimé (TND) :</span>
                  <span className="text-lg font-mono font-extrabold text-emerald-400">
                    {interactiveBudget.toLocaleString()} DT
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={75000}
                  step={1000}
                  value={interactiveBudget}
                  onChange={(e) => setInteractiveBudget(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>5 000 DT</span>
                  <span>Plafond Légal : 75 000 DT / an</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Avantage Loi Auto-Entrepreneur (Décret 2020-33) :</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Taux unique libératoire de 1% pour les prestations de services et développeurs. Exonération totale de TVA à l’exportation avec rapatriement de devises (EUR / USD) homologué Banque Centrale.
                </p>
              </div>
            </div>

            {/* Calculated Breakdown Display */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">1. Impôt 1% (Services)</span>
                <span className="text-xl font-mono font-extrabold text-amber-400">
                  {formatTND(simulatedTax, locale)}
                </span>
                <span className="text-[10px] text-zinc-500">Annuel forfaitaire</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">2. CNSS Santé</span>
                <span className="text-xl font-mono font-extrabold text-zinc-200">
                  {formatTND(simulatedCnss, locale)}
                </span>
                <span className="text-[10px] text-zinc-500">~50 DT / trimestre</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-300">3. Revenu Net</span>
                <span className="text-xl font-mono font-extrabold text-emerald-400">
                  {formatTND(simulatedNet, locale)}
                </span>
                <span className="text-[10px] text-emerald-300/80">Dans votre poche</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 3. TERRITORIAL RADAR: 24 WILAYAS PUBLIC DESKS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-zinc-800/80">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              RÉSEAU TERRITORIAL EN DIRECT
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {locale === 'ar' ? 'دليل المصالح وأوقات العمل بالولايات' : 'Horaires et Guichets Ouverts par Wilaya'}
            </h2>
          </div>

          {/* Wilaya Selector Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.keys(wilayaData).map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWilaya(w)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedWilaya === w
                    ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Municipalités & Baladiyas ({selectedWilaya})</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                Ouvert
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-300">
              {wilayaData[selectedWilaya].baladiya}
            </p>
            <p className="text-[11px] text-zinc-500 pt-1">
              Légalisation de signature (Ta3rif bel Imdha2) & Extraits d’état civil.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>Recettes des Finances ({selectedWilaya})</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                Ouvert
              </span>
            </div>
            <p className="text-xs font-mono text-amber-300">
              {wilayaData[selectedWilaya].recette}
            </p>
            <p className="text-[11px] text-zinc-500 pt-1">
              Vente des timbres fiscaux (80 DT, 15 DT, 5 DT, 3 DT) et enregistrement des contrats.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. ZERO-STORAGE PRIVACY PROTOCOL ── */}
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
