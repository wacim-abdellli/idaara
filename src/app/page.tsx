'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
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
  const { t, locale, isRtl } = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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
      title: locale === 'ar' ? "1. المساعد الصوتي بالدارجة" : locale === 'fr' ? "1. Voice Copilot en Derja" : "1. Derja Voice Copilot",
      desc: locale === 'ar' ? "تكلّم بالدارجة التونسية بكل تلقائية لمعرفة كل الأوراق والوثائق والتنابر في ثوانٍ." : locale === 'fr' ? "Parlez librement en dialecte tunisien pour obtenir vos démarches, pièces et timbres fiscaux." : "Tkallem bel Derja 🇹🇳 kima te7ki m3a sa7bek. Fasserli, a3tini les timbres, w kol étape fel idara.",
      href: "/copilot",
      icon: Mic,
      badge: "Voice AI",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    },
    {
      id: 'fasserli-ocr',
      title: locale === 'ar' ? "2. فسّرلي هالورقة (OCR الذكي)" : locale === 'fr' ? "2. Scanner & Décrypter (OCR)" : "2. Fasserli Hal War9a (OCR)",
      desc: locale === 'ar' ? "صوّر أي إعلام ضريبي أو استدعاء رسمي للحصول على ملخص بـ 3 نقاط والآجال القانونية." : locale === 'fr' ? "Scannez vos courriers administratifs et obtenez un résumé clair en 3 points avec les délais." : "Soiwer ay wathi9a idariya (Tanbih dhariba, convocation) w khalli l'AI tfassarelk 3 points essentiels.",
      href: "/fasserli",
      icon: FileSearch,
      badge: "Smart OCR",
      color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30",
    },
    {
      id: 'smart-pdf',
      title: locale === 'ar' ? "3. استخراج الوثائق الرسمية" : locale === 'fr' ? "3. Formulaires PDF Officiels" : "3. Smart PDF Forms",
      desc: locale === 'ar' ? "استخرج عقود الكراء، التواكل، والتصاريح بالشرف بجودة عالية جاهزة للتعريف بالإمضاء." : locale === 'fr' ? "Générez vos baux de location, procurations et déclarations conformes prêts pour la Baladiya." : "Générez vos contrats de location, procurations, et actes de vente vectoriels prêts pour la Baladiya.",
      href: "/documents",
      icon: FileText,
      badge: "Vector PDF",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
    },
    {
      id: 'calculator',
      title: locale === 'ar' ? "4. حاسبة التنابر والأوراق" : locale === 'fr' ? "4. Calculateur de Timbres" : "4. Timbre & Awra9 Budget",
      desc: locale === 'ar' ? "احتساب دقيق لمعاليم التنابر الجبائية وقائمة تفاعلية بالوثائق المطلوبة لكل ملف." : locale === 'fr' ? "Estimation exacte des timbres fiscaux (5 DT, 15 DT, 80 DT) et suivi des pièces requises." : "Calculateur exact des timbres fiscaux (5 DT, 15 DT, 80 DT) et checklist interactive.",
      href: "/calculator",
      icon: Calculator,
      badge: "Budget TND",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    },
    {
      id: 'locator',
      title: locale === 'ar' ? "5. دليل البلديات والمصالح" : locale === 'fr' ? "5. Annuaire des Municipalités" : "5. Guide des Baladiyas",
      desc: locale === 'ar' ? "أكثر من 350 بلدية وقباضة بـ 24 ولاية مع توقيت رمضان والحصة الواحدة والمسار GPS." : locale === 'fr' ? "350+ Municipalités et Recettes sur 24 gouvernorats avec horaires Ramadan et séance unique." : "350+ Municipalités, Recettes et CNSS sur les 24 gouvernorats avec horaires Ramadan.",
      href: "/locator",
      icon: MapPin,
      badge: "24 Wilayas",
      color: "from-emerald-500/20 to-cyan-500/10 border-emerald-500/30",
    },
    {
      id: 'launchpad',
      title: locale === 'ar' ? "6. فضاء المستقلين والشركات" : locale === 'fr' ? "6. Freelance & Entreprise" : "6. Freelancer Launchpad",
      desc: locale === 'ar' ? "دليل المبادر الذاتي بضريبة 1%، فواتير التصدير بالعملة الأجنبية، والتسجيل بـ RNE." : locale === 'fr' ? "Statut Auto-Entrepreneur à 1%, facturation export en EUR/USD conforme BCT et RNE." : "Statut Auto-Entrepreneur à 1%, facturation export internationale en EUR/USD conforme BCT.",
      href: "/launchpad",
      icon: Rocket,
      badge: "Freelance 1%",
      color: "from-rose-500/20 to-amber-500/10 border-rose-500/30",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-md shadow-emerald-950">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] mb-6">
          {t('heroHeadline')}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent underline decoration-emerald-500/30 decoration-4 underline-offset-8">
            {t('heroHeadlineHighlight')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
          {t('heroSubheadline')}
        </p>

        {/* Voice Search Hero Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleSearchSubmit}
            className="glass-panel p-1.5 sm:p-2 rounded-2xl border border-zinc-700/80 shadow-2xl flex items-center space-x-2 rtl:space-x-reverse relative hover:border-emerald-500/50 transition-colors"
          >
            <div className="px-2 text-zinc-400 shrink-0">
              <Search className="w-5 h-5 text-emerald-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('voiceSearchBarPlaceholder')}
              className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none px-1 py-2"
            />
            <Link
              href="/copilot"
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
            >
              <Mic className="w-4 h-4 animate-pulse" />
              <span>{locale === 'ar' ? 'تكلّم' : locale === 'fr' ? 'Parler' : 'Tkallem'}</span>
            </Link>
          </form>

          {/* Quick Voice Bar Sub-label */}
          <div className="mt-2.5 flex items-center justify-center space-x-2 rtl:space-x-reverse text-[11px] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Moteur vocal en Derja tunisienne & Arabizi actif</span>
          </div>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/copilot"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Mic className="w-4 h-4" />
            <span>{t('heroCTA')}</span>
          </Link>

          <Link
            href="/fasserli"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs sm:text-sm border border-zinc-700 transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <FileSearch className="w-4 h-4 text-emerald-400" />
            <span>{t('heroSecondaryCTA')}</span>
          </Link>
        </div>
      </section>

      {/* Quick Launch Procedures Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                {locale === 'ar' ? 'أهم الإجراءات الأكثر طلباً (دخول سريع)' : 'Procédures les plus courantes :'}
              </h3>
            </div>
            <Link
              href="/procedures"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 rtl:space-x-reverse font-semibold"
            >
              <span>{locale === 'ar' ? 'عرض الكل' : 'Voir tout'} (25+)</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {proceduresData.slice(0, 6).map((proc) => {
              const title = proc.title[locale] || proc.title['derja'];
              return (
                <Link
                  key={proc.id}
                  href={`/procedures/${proc.id}`}
                  className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-emerald-500/40 transition-all group text-start"
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('featuresTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.id}
                href={feat.href}
                className={`glass-panel rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl flex flex-col justify-between group ${feat.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-zinc-700">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{locale === 'ar' ? 'فتح الخدمة' : 'Accéder au service'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Zero Storage Privacy & Security Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-zinc-950 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1 text-center sm:text-start">
            <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t('zeroStorageBanner')}
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {t('zeroStorageSub')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
