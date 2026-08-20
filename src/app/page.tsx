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
  Zap,
} from 'lucide-react';

// ─── Signature element: CSS rubber stamp ──────────────────────────────────────
// Runs a single entrance animation (scale + blur dissolve) then rests at 3% opacity.
// No library, no image file — pure CSS from globals.css `.stamp-watermark`.
function StampWatermark({ locale }: { locale: string }) {
  const text =
    locale === 'ar' ? '✓ مقبول' : '✓ APPROUVÉ';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
    >
      <span className="stamp-watermark select-none">{text}</span>
    </div>
  );
}

export default function HomePage() {
  const { t, locale, isRtl } = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(searchQuery.trim() ? `/copilot?q=${encodeURIComponent(searchQuery)}` : '/copilot');
  };

  const coreFeatures = [
    {
      id: 'voice-copilot',
      title: locale === 'ar' ? 'المساعد الصوتي بالدارجة' : locale === 'fr' ? 'Voice Copilot en Derja' : 'Derja Voice Copilot',
      desc: locale === 'ar'
        ? 'تكلّم بالدارجة التونسية لمعرفة أوراقك وتنابرك في ثوانٍ.'
        : locale === 'fr'
        ? 'Posez vos questions en Derja ou Français, recevez les démarches et timbres.'
        : 'Tkallem bel Derja, Idaara AI yfahmek w yajibek fel 7in.',
      href: '/copilot',
      icon: Mic,
      badge: 'Voice AI',
      accentClass: 'group-hover:border-emerald-500/50',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'fasserli-ocr',
      title: locale === 'ar' ? 'فسّرلي هالورقة (OCR)' : locale === 'fr' ? 'Scanner & Décrypter (OCR)' : 'Fasserli Hal War9a',
      desc: locale === 'ar'
        ? 'صوّر أي وثيقة رسمية واحصل على ملخص بـ 3 نقاط والآجال القانونية.'
        : locale === 'fr'
        ? 'Scannez un courrier officiel, obtenez un résumé 3-points avec les délais légaux.'
        : 'Soiwer ay wathi9a idariya — Tanbih, convocation — w Idaara AI yfassarelk 3 points.',
      href: '/fasserli',
      icon: FileSearch,
      badge: 'Smart OCR',
      accentClass: 'group-hover:border-indigo-500/40',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'smart-pdf',
      title: locale === 'ar' ? 'الوثائق الرسمية PDF' : locale === 'fr' ? 'Formulaires PDF Officiels' : 'Smart PDF Forms',
      desc: locale === 'ar'
        ? 'استخرج عقود الكراء والتواكل والتصاريح بالشرف جاهزة للتعريف.'
        : locale === 'fr'
        ? 'Générez baux de location, procurations, actes de vente — prêts pour la Baladiya.'
        : 'A3mel contrats location, procurations, déclarations — mriglin lel Baladiya.',
      href: '/documents',
      icon: FileText,
      badge: 'Vector PDF',
      accentClass: 'group-hover:border-purple-500/40',
      iconColor: 'text-purple-400',
    },
    {
      id: 'calculator',
      title: locale === 'ar' ? 'حاسبة التنابر والأوراق' : locale === 'fr' ? 'Calculateur de Timbres' : 'Timbre & Awra9 Budget',
      desc: locale === 'ar'
        ? 'احتساب دقيق لتنابر 5 د.ت — 15 د.ت — 80 د.ت وقائمة تفاعلية بالوثائق.'
        : locale === 'fr'
        ? 'Estimation exacte des timbres (5 DT, 15 DT, 80 DT) et checklist interactive.'
        : "E7seb el timbres (5 DT, 15 DT, 80 DT) w checklist awra9ek qbel ma tmchi.",
      href: '/calculator',
      icon: Calculator,
      badge: 'Budget TND',
      accentClass: 'group-hover:border-amber-500/40',
      iconColor: 'text-amber-400',
    },
    {
      id: 'locator',
      title: locale === 'ar' ? 'دليل البلديات والمصالح' : locale === 'fr' ? 'Annuaire des Organismes' : 'Guide des Baladiyas',
      desc: locale === 'ar'
        ? '350+ بلدية وقباضة بـ 24 ولاية — أوقات رمضان والحصة الواحدة والمسار GPS.'
        : locale === 'fr'
        ? '350+ municipalités, Recettes et CNSS — horaires Ramadan, Été et itinéraire GPS.'
        : '350+ Municipalités w Recettes 3al 24 Wilayas — Ramadan, Sayf, GPS itinéraire.',
      href: '/locator',
      icon: MapPin,
      badge: '24 Wilayas',
      accentClass: 'group-hover:border-cyan-500/40',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'launchpad',
      title: locale === 'ar' ? 'فضاء المستقل والشركات' : locale === 'fr' ? 'Freelance & Entreprise' : 'Freelancer Launchpad',
      desc: locale === 'ar'
        ? 'ضريبة 1% للمبادر الذاتي، الفواتير بالعملة الأجنبية، والتسجيل في RNE.'
        : locale === 'fr'
        ? "Statut Auto-Entrepreneur à 1%, facturation export EUR/USD conforme BCT, RNE."
        : 'Statut Auto-Entrepreneur 0.5%→1%, Facture export EUR/USD, Enregistrement RNE.',
      href: '/launchpad',
      icon: Rocket,
      badge: 'Freelance 1%',
      accentClass: 'group-hover:border-rose-500/40',
      iconColor: 'text-rose-400',
    },
  ];

  // Hero headline — split for the display/highlight treatment
  const heroMain = t('heroHeadline');
  const heroAccent = t('heroHeadlineHighlight');

  return (
    <div className="space-y-20 sm:space-y-24 pb-20">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-20 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden">

        {/* Signature watermark stamp — ONE bold moment, then quiet */}
        <StampWatermark locale={locale} />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

        {/* Eyebrow badge */}
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full bg-[#111316] border border-emerald-500/25 text-[11px] font-semibold text-emerald-400 mb-8 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* SIGNATURE TYPOGRAPHY —
            DM Serif Display for the main line (weight 400, the italic weight is stunning),
            then the highlight phrase in the brand stamp-green.
            The unexpected serif in a government-tech product is the distinctive choice. */}
        <h1 className="relative z-10">
          <span className="display-heading block text-4xl sm:text-6xl lg:text-7xl text-[#F5F4F0] mb-3">
            {heroMain}
          </span>
          <span className="display-heading block text-4xl sm:text-6xl lg:text-7xl italic"
            style={{ color: 'var(--stamp-green)' }}>
            {heroAccent}
          </span>
        </h1>

        {/* Subtitle — plain, plain, plain. Does one job: clarify. */}
        <p className="relative z-10 text-sm sm:text-base text-[#9A9DA6] max-w-xl mx-auto leading-relaxed mt-6 mb-10">
          {t('heroSubheadline')}
        </p>

        {/* Search bar */}
        <div className="relative z-10 max-w-xl mx-auto mb-10">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-[#111316] border border-zinc-800 rounded-2xl p-1.5 shadow-2xl hover:border-emerald-500/40 transition-colors"
          >
            <Search className="w-4 h-4 text-zinc-600 mx-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('voiceSearchBarPlaceholder')}
              className="flex-1 bg-transparent text-sm text-[#F5F4F0] placeholder-zinc-600 focus:outline-none py-2 min-w-0"
            />
            <Link
              href="/copilot"
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-2.5 rounded-xl font-bold text-xs text-[#0C0D0F] shrink-0 transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--stamp-green)', boxShadow: '0 4px 20px rgba(0,192,127,0.25)' }}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'تكلّم' : locale === 'fr' ? 'Parler' : 'Tkallem'}</span>
            </Link>
          </form>

          <p className="mt-2.5 text-[11px] text-zinc-600 flex items-center justify-center space-x-1.5 rtl:space-x-reverse">
            <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
            <span>
              {locale === 'ar'
                ? 'يفهم الدارجة التونسية، العربية والفرنسية'
                : 'Comprend le Derja tunisien, l\'Arabizi et le Français'}
            </span>
          </p>
        </div>

        {/* CTAs — primary + secondary, clear verbs */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/copilot"
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-[#0C0D0F] flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--stamp-green)', boxShadow: '0 4px 24px rgba(0,192,127,0.28)' }}
          >
            <Mic className="w-4 h-4" />
            <span>{t('heroCTA')}</span>
          </Link>

          <Link
            href="/fasserli"
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm text-zinc-200 bg-[#111316] border border-zinc-800 hover:border-zinc-600 hover:text-white flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all"
          >
            <FileSearch className="w-4 h-4 text-indigo-400" />
            <span>{t('heroSecondaryCTA')}</span>
          </Link>
        </div>
      </section>

      {/* ── QUICK LAUNCH ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {locale === 'ar' ? 'أكثر الإجراءات طلباً' : 'Démarches les plus fréquentes'}
              </p>
            </div>
            <Link
              href="/procedures"
              className="flex items-center space-x-1 rtl:space-x-reverse text-xs font-semibold text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <span>{locale === 'ar' ? 'الكل' : 'Tout voir'} (25+)</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {proceduresData.slice(0, 6).map((proc) => {
              const title = getLocalized(proc.title, locale);
              return (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.id}`}
                  className="p-3 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 transition-all group text-start"
                >
                  <span className="text-[9px] uppercase font-extrabold tracking-wider block mb-1.5"
                    style={{ color: 'var(--stamp-green)' }}>
                    {proc.vertical}
                  </span>
                  <h4 className="text-[11px] font-semibold text-zinc-300 group-hover:text-white line-clamp-2 leading-tight transition-colors">
                    {title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES GRID ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center mb-12">
          <h2 className="display-heading text-3xl sm:text-4xl text-[#F5F4F0] mb-3">
            {t('featuresTitle')}
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.id}
                href={feat.href}
                className={`glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800/80 transition-all duration-200 hover:shadow-2xl flex flex-col justify-between group ${feat.accentClass}`}
              >
                <div>
                  {/* Icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-4 h-4 ${feat.iconColor}`} />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & description — active voice, plain language */}
                  <h3 className="text-sm font-bold text-[#F5F4F0] mb-2 group-hover:text-white transition-colors leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[12px] text-zinc-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* CTA row — always the same verb family */}
                <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold transition-all"
                  style={{ color: 'var(--stamp-green)' }}>
                  <span>{locale === 'ar' ? 'فتح الخدمة' : 'Ouvrir'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── PRIVACY BANNER ───────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border flex flex-col sm:flex-row items-center gap-5"
          style={{ borderColor: 'rgba(0,192,127,0.20)', background: 'linear-gradient(135deg, rgba(0,192,127,0.06), rgba(17,19,22,0.9))' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,192,127,0.12)', border: '1px solid rgba(0,192,127,0.30)' }}>
            <Lock className="w-6 h-6" style={{ color: 'var(--stamp-green)' }} />
          </div>

          <div className="space-y-1 text-center sm:text-start">
            <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--stamp-green)' }} />
              <h3 className="text-sm font-bold text-[#F5F4F0]">{t('zeroStorageBanner')}</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">{t('zeroStorageSub')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
