'use client';

import React, { useState } from 'react';
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
  ArrowUpRight,
  Shield,
  FileCode2,
  Sliders,
} from 'lucide-react';
import { formatTND } from '../lib/utils';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'voice' | 'ocr' | 'forms' | 'timbres'>('voice');
  const [stampSliderVal, setStampSliderVal] = useState<number>(80);
  const [selectedWilaya, setSelectedWilaya] = useState('Tunis');
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/copilot?q=${encodeURIComponent(searchVal)}`);
    } else {
      router.push('/copilot');
    }
  };

  const fastProcedures = [
    {
      id: 'passeport-renouvellement',
      title: locale === 'ar' ? 'تجديد جواز السفر' : locale === 'en' ? 'Passport Renewal' : 'Renouvellement Passeport',
      cost: '86.000 DT',
      time: '7-15j',
      category: 'Identité',
      href: '/procedures/passeport-renouvellement',
    },
    {
      id: 'mutation-carte-grise',
      title: locale === 'ar' ? 'تحويل ملكية سيارة' : locale === 'en' ? 'Car Registration Transfer' : 'Mutation Carte Grise',
      cost: '145.000 DT',
      time: '1-3j',
      category: 'Transport',
      href: '/procedures/mutation-carte-grise',
    },
    {
      id: 'contrat-location',
      title: locale === 'ar' ? 'عقد كراء سكني مصادق' : locale === 'en' ? 'Certified Lease Agreement' : 'Contrat de Bail Baladiya',
      cost: '35.000 DT',
      time: 'Immédiat',
      category: 'Baladiya',
      href: '/documents/contrat-location',
    },
    {
      id: 'bulletin-numero-3',
      title: locale === 'ar' ? 'بطاقة السوابق العدلية (B3)' : locale === 'en' ? 'Criminal Record (B3)' : 'Casier Judiciaire (B3)',
      cost: '7.500 DT',
      time: '3-8j',
      category: 'Justice',
      href: '/procedures/bulletin-numero-3',
    },
    {
      id: 'auto-entrepreneur',
      title: locale === 'ar' ? 'المبادر الذاتي (ضريبة 1%)' : locale === 'en' ? 'Auto-Entrepreneur 1% Tax' : 'Statut Auto-Entrepreneur',
      cost: '0.000 DT',
      time: '24-48h',
      category: 'Fiscalité',
      href: '/launchpad',
    },
    {
      id: 'fcr-regime-douanier',
      title: locale === 'ar' ? 'امتياز ن.ت (FCR) للتونسيين' : locale === 'en' ? 'FCR Customs Exemption' : 'Régime Douanier FCR',
      cost: '50.000 DT',
      time: '5-10j',
      category: 'Douane',
      href: '/procedures/fcr-regime-douanier',
    },
  ];

  const wilayaHours: Record<string, { baladiya: string; recette: string }> = {
    Tunis: { baladiya: '08:30 – 16:30 (Kasbah / Bab Bhar)', recette: '08:00 – 15:30 (Beb Souika / Kasbah)' },
    Ariana: { baladiya: '08:30 – 16:30 (Menzah 6 / Ariana Ville)', recette: '08:00 – 15:30 (Ariana Centre)' },
    Sousse: { baladiya: '08:30 – 16:30 (Bouhsina / Khezama)', recette: '08:00 – 15:30 (Sousse Médina)' },
    Sfax: { baladiya: '08:30 – 16:30 (Sfax Ville / Sakiet Ezzit)', recette: '08:00 – 15:30 (Sfax Port)' },
    Nabeul: { baladiya: '08:30 – 16:30 (Nabeul / Hammamet)', recette: '08:00 – 15:30 (Nabeul Centre)' },
    Bizerte: { baladiya: '08:30 – 16:30 (Bizerte Ville / Menzel B.)', recette: '08:00 – 15:30 (Bizerte Port)' },
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 relative overflow-hidden">

      {/* ── 1. THE GRAND CIVIC DESK (HERO) ── */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">

          {/* Top Line & Authority Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>RÉSEAU CITOYEN TUNISIEN</span>
              </div>
              <span className="text-zinc-600 text-xs hidden sm:inline">·</span>
              <span className="text-xs text-zinc-400 hidden sm:inline font-mono">
                Homologation JORT & Code des Obligations
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Storage Garanti</span>
              </span>
              <span className="text-zinc-700">|</span>
              <span className="text-amber-400 font-bold">24 Wilayas</span>
            </div>
          </div>

          {/* Majestic Hero Statement */}
          <div className="max-w-4xl space-y-4">
            <h1 className="leading-[1.08] tracking-tight">
              <span className="display-heading block text-4xl sm:text-6xl lg:text-7xl text-[#F5F4F0]">
                {t('heroHeadline')}
              </span>
              <span
                className="display-heading block text-4xl sm:text-6xl lg:text-7xl italic mt-1 font-serif"
                style={{ color: 'var(--stamp-green)' }}
              >
                {t('heroHeadlineHighlight')}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed pt-1">
              {t('heroSubheadline')}
            </p>
          </div>

          {/* Interactive Action Console Deck (Tactile Instrument Bar) */}
          <div className="glass-panel rounded-3xl p-3 sm:p-4 border border-zinc-800/90 bg-zinc-950/80 shadow-2xl space-y-3">
            
            {/* Top Interactive Mode Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActiveTab('voice')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'voice'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{locale === 'ar' ? 'مساعد صوتي' : '1. Voice Copilot (Derja)'}</span>
              </button>

              <button
                onClick={() => setActiveTab('ocr')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ocr'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
                }`}
              >
                <FileSearch className="w-4 h-4" />
                <span>{locale === 'ar' ? 'تفسير وثيقة' : '2. Décrypteur OCR'}</span>
              </button>

              <button
                onClick={() => setActiveTab('forms')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'forms'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{locale === 'ar' ? 'استمارات وعقود' : '3. Formulaires PDF'}</span>
              </button>

              <button
                onClick={() => setActiveTab('timbres')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'timbres'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
                }`}
              >
                <Stamp className="w-4 h-4" />
                <span>{locale === 'ar' ? 'حاسبة التنابر' : '4. Timbres Fiscaux'}</span>
              </button>
            </div>

            {/* Dynamic Console Stage */}
            <div className="p-5 sm:p-7 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
              
              {activeTab === 'voice' && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-left rtl:text-right">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                      <span>AUDIO STREAMING · RECONNAISSANCE VOCALE DERJA</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {locale === 'ar'
                        ? 'تحدث مباشرة بلهجتك التونسية حول أي وثيقة أو مطلب'
                        : 'Posez votre question administrative à la voix en Derja tunisienne'}
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                      {locale === 'ar'
                        ? 'المساعد يتعرف على العبارات التونسية ويستخرج لك قائمة الوثائق والتنابر والآجال بدقة.'
                        : 'Idaara AI comprend le dialecte tunisien (Franco-Arabe ou Arabe) et extrait instantanément les pièces nécessaires.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href="/copilot"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'ابدأ التحدث الآن' : 'Parler en Derja Tunisienne'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'ocr' && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-left rtl:text-right">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold">
                      <span>OCR EPHEMERAL PIPELINE · ZERO DATA RETENTION</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {locale === 'ar'
                        ? 'صوّر أي إشعار أو استدعاء رسمي واحصل على الشرح في 3 نقاط'
                        : 'Scannez un avis de redressement, convocation ou mise en demeure CNSS'}
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                      {locale === 'ar'
                        ? 'كشف المخاطر والآجال القانونية والخطايا المالية قبل فوات الأوان مع خصوصية تامة.'
                        : 'Synthèse claire en 3 points : signification légale, délais de recours et guichet compétent.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href="/fasserli"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <FileSearch className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'افتح قارئ الوثائق' : 'Scanner une lettre officielle'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'forms' && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-left rtl:text-right">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-mono font-bold">
                      <span>COC CONFORMITÉ · EXPORT PDF VECTORIEL HAUTE RÉSOLUTION</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {locale === 'ar'
                        ? 'عقود كراء، تواكيل، وتصاريح على الشرف مطابقة لمواصفات البلدية'
                        : 'Contrats de bail, procurations et déclarations prêtes pour la légalisation'}
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                      {locale === 'ar'
                        ? 'مُهيأة بمربعات التنابر ومناطق التعريف بالإمضاء الرسمية جاهزة للطباعة والتوقيع.'
                        : 'Emplacements de timbres fiscaux (3 DT / 5 DT / 30 DT) et mentions légales conformes au Code des Obligations.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href="/documents"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-xl shadow-purple-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'اختر نموذج العقد' : 'Choisir un modèle officiel'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'timbres' && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-left rtl:text-right">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold">
                      <span>BARÈME OFFICIEL DES RECETTES DES FINANCES & BALADIYAS</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {locale === 'ar'
                        ? 'احسب ميزانية التنابر والصور والنسخ المطابقة قبل الذهاب للشبابيك'
                        : 'Calculateur budgétaire au millime près : 3 DT, 5 DT, 15 DT, 80 DT'}
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                      {locale === 'ar'
                        ? 'تجنب المفاجآت والطوابير بسبب نقص تنبري جبائي واعرف التكلفة الدقيقة.'
                        : 'Consultez la ventilation des frais légaux pour chaque démarche administrative en Tunisie.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href="/calculator"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-xl shadow-amber-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'افتح الحاسبة' : 'Lancer le Calculateur'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* Direct Instant Search Input Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-emerald-500/50 rounded-2xl p-1.5 transition-all"
            >
              <Search className="w-4 h-4 text-zinc-500 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder={t('voiceSearchBarPlaceholder')}
                className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-2"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold text-xs transition-colors shrink-0 cursor-pointer"
              >
                <span>{locale === 'ar' ? 'بحث' : 'Rechercher'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      </section>

      {/* ── 2. THE STATUTORY DOSSIER HIGHWAY (POPULAR PROCEDURES) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-zinc-800/80">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              ACCÈS RAPIDE AUX DÉMARCHES
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {locale === 'ar' ? 'الإجراءات الأكثر طلباً لدى المواطنين' : 'Démarches Populaires Homologuées'}
            </h2>
          </div>
          <Link
            href="/procedures"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 group"
          >
            <span>{locale === 'ar' ? 'عرض كامل الدليل (11 إجراء)' : 'Voir tout le répertoire (11 dossiers)'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fastProcedures.map((proc) => (
            <Link
              key={proc.id}
              href={proc.href}
              className="glass-panel rounded-3xl p-5 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all duration-200 group flex flex-col justify-between space-y-4 hover:-translate-y-0.5 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                    {proc.category}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{proc.time}</span>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {proc.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-amber-400">
                  {proc.cost}
                </span>
                <span className="text-xs text-zinc-500 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <span>Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. LIVE REGIONAL CIVIC RADAR (TERRITORIAL PULSE) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                GÉOLOCALISATION & SÉANCES
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {locale === 'ar' ? 'مواعيد العمل الرسمية حسب الولاية' : 'Horaires et Guichets par Région (24 Wilayas)'}
              </h2>
            </div>

            {/* Region Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {Object.keys(wilayaHours).map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWilaya(w)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedWilaya === w
                      ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{locale === 'en' ? `Municipalities (${selectedWilaya})` : `Services Municipaux (Baladiyas ${selectedWilaya})`}</span>
              </div>
              <p className="text-xs font-mono text-cyan-300/90">
                {wilayaHours[selectedWilaya].baladiya}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>{locale === 'en' ? `Tax Desks (${selectedWilaya})` : `Recettes des Finances (${selectedWilaya})`}</span>
              </div>
              <p className="text-xs font-mono text-amber-300/90">
                {wilayaHours[selectedWilaya].recette}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ZERO-STORAGE SECURITY GUARANTEE ── */}
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
