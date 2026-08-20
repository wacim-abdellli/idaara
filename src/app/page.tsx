'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
import { VoiceVisualizer } from '../components/copilot/VoiceVisualizer';
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
  CheckCircle2,
  Lock,
  Zap,
  Stamp
} from 'lucide-react';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/copilot?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/copilot');
    }
  };

  const coreFeatures = [
    {
      id: 'voice-copilot',
      title: "1. Derja-Native Voice Copilot",
      desc: "Tkallem bel Derja 🇹🇳 kima te7ki m3a sa7bek. Fasserli, a3tini les timbres, w kol étape fel idara fi thweni.",
      href: "/copilot",
      icon: Mic,
      badge: "Voice-First AI",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    },
    {
      id: 'fasserli-ocr',
      title: "2. Fasserli Hal War9a (Smart OCR)",
      desc: "Soiwer ay wathi9a idariya (Tanbih dhariba, convocation, mise en demeure cnss) w khalli l'AI tfassarelk 3 points essentiels.",
      href: "/fasserli",
      icon: FileSearch,
      badge: "Vision OCR",
      color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30",
    },
    {
      id: 'smart-pdf',
      title: "3. Auto-Filled Official PDF Forms",
      desc: "Générez vos contrats de location, procurations, et actes de vente vectoriels prêts pour la signature légalisée à la Baladiya.",
      href: "/documents",
      icon: FileText,
      badge: "Vector PDF",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
    },
    {
      id: 'calculator',
      title: "4. Timbre & Awra9 Budget",
      desc: "Calculateur exact des timbres fiscaux (5 DT, 15 DT, 80 DT) et checklist interactive de vos pièces justificatives.",
      href: "/calculator",
      icon: Calculator,
      badge: "Budget TND",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    },
    {
      id: 'locator',
      title: "5. Annuaire Municipal & Horaires",
      desc: "350+ Municipalités, Recettes des finances et bureaux CNSS sur les 24 gouvernorats avec horaires Ramadan et séance unique.",
      href: "/locator",
      icon: MapPin,
      badge: "24 Wilayas",
      color: "from-emerald-500/20 to-cyan-500/10 border-emerald-500/30",
    },
    {
      id: 'launchpad',
      title: "6. Freelancer & Startup Launchpad",
      desc: "Statut Auto-Entrepreneur à 1%, facturation export internationale en EUR/USD conforme BCT, et immatriculation RNE.",
      href: "/launchpad",
      icon: Rocket,
      badge: "Freelance 1%",
      color: "from-rose-500/20 to-amber-500/10 border-rose-500/30",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-6 shadow-lg shadow-emerald-950/40 animate-pulse">
          <span>🇹🇳</span>
          <span>{t('heroBadge')}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
          {t('heroHeadline')}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent underline decoration-emerald-500/40 decoration-4">
            {t('heroHeadlineHighlight')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {t('heroSubheadline')}
        </p>

        {/* Voice Search Hero Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleSearchSubmit}
            className="glass-panel p-2 rounded-2xl border border-zinc-700 shadow-2xl flex items-center space-x-2 relative"
          >
            <div className="pl-3 text-zinc-400">
              <Search className="w-5 h-5 text-emerald-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('voiceSearchBarPlaceholder')}
              className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none px-2 py-2.5"
            />
            <Link
              href="/copilot"
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
            >
              <Mic className="w-4 h-4 animate-pulse" />
              <span>Tkallem</span>
            </Link>
          </form>

          {/* Quick Voice Bar Visualizer Preview */}
          <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Moteur vocal en Derja tunisienne & Arabizi actif</span>
          </div>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/copilot"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Mic className="w-4 h-4" />
            <span>{t('heroCTA')}</span>
          </Link>

          <Link
            href="/fasserli"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-sm border border-zinc-700 transition-all flex items-center justify-center space-x-2"
          >
            <FileSearch className="w-4 h-4 text-emerald-400" />
            <span>{t('heroSecondaryCTA')}</span>
          </Link>
        </div>
      </section>

      {/* Quick Launch Procedures Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Ahamm el Procédures el Mosta3mla (Accès Rapide) :
              </h3>
            </div>
            <Link
              href="/procedures"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
            >
              <span>Voir tout (25+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {proceduresData.slice(0, 6).map((proc) => {
              const title = proc.title[locale] || proc.title['derja'];
              return (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.id}`}
                  className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-emerald-500/40 transition-all group text-left"
                >
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    {proc.vertical}
                  </span>
                  <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-white line-clamp-2 leading-tight">
                    {title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('featuresTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.id}
                href={feat.href}
                className={`glass-panel rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between group ${feat.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-zinc-700">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Accéder au service</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Zero Storage Privacy & Security Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-zinc-950 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Protocole de Confidentialité Zéro-Stockage
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Vos pièces d'identité, CIN, quittances et courriers administratifs sont analysés <strong>exclusivement en mémoire vive (RAM)</strong> de manière éphémère et <strong>immédiatement détruits</strong>. Aucune donnée citoyenne n'est conservée ni partagée avec des tiers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
