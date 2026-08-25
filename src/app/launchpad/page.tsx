'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusComparator } from '../../components/launchpad/StatusComparator';
import { TaxCalculator } from '../../components/launchpad/TaxCalculator';
import { ExportInvoiceGen } from '../../components/launchpad/ExportInvoiceGen';
import { useLocale } from '../../context/LocaleContext';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn, FadeInStagger, FadeInItem } from '../../components/motion/FadeInStagger';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import { ExternalLink, Sparkles, Scale, Calculator, FileSpreadsheet, BadgePercent, ShieldCheck } from 'lucide-react';

export default function LaunchpadPage() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'comparator' | 'tax' | 'invoice'>('comparator');

  const headlineMain =
    locale === 'ar'
      ? 'فضاء المستقلين والمشاريع'
      : locale === 'derja'
      ? 'Fadha2 el Freelancers w el Machari3'
      : locale === 'en'
      ? 'Freelancer & Founder'
      : 'Espace Freelance & Création';

  const headlineAccent =
    locale === 'ar'
      ? 'والمبادر الذاتي.'
      : locale === 'derja'
      ? 'w el Auto-Entrepreneur (1%).'
      : locale === 'en'
      ? 'Launchpad 1% Tax.'
      : "d'Entreprise (1%).";

  const subtitle =
    locale === 'ar'
      ? 'قارن بين الأنظمة الجبائية (مبادر ذاتي مقابل براءة مقابل SUARL)، احسب ضرائبك بـ 1%، واستخرج فواتير التصدير بالعملة الأجنبية وفق بنك تونس المركزي.'
      : locale === 'derja'
      ? '9aren bin el statuts (Auto-Entrepreneur vs Patente vs SUARL)، a7seb dharibtek b’1%، w talla3 factures export bi-devises mrigla m3a el BCT.'
      : locale === 'en'
      ? 'Compare legal structures (Auto-Entrepreneur vs. Sole Proprietor vs. SUARL), simulate 1% flat tax & CNSS dues, and generate BCT-compliant foreign currency export invoices.'
      : "Comparez les régimes fiscaux (Auto-Entrepreneur vs Patente vs SUARL), simulez vos impôts au taux forfaitaire de 1%, et éditez vos factures d'exportation conformes à la BCT.";

  const tabs = [
    {
      id: 'comparator' as const,
      label:
        locale === 'ar'
          ? 'مقارنة الأنظمة القانونية'
          : locale === 'derja'
          ? 'M9arna bin les Statuts'
          : locale === 'en'
          ? 'Legal Status Matrix'
          : 'Comparateur des Statuts',
      icon: Scale,
    },
    {
      id: 'tax' as const,
      label:
        locale === 'ar'
          ? 'محاكي الضريبة 1% والـ CNSS'
          : locale === 'derja'
          ? 'Calculateur Driba 1% w CNSS'
          : locale === 'en'
          ? '1% Flat Tax & CNSS Simulator'
          : 'Simulateur Impôts 1% & CNSS',
      icon: Calculator,
    },
    {
      id: 'invoice' as const,
      label:
        locale === 'ar'
          ? 'فواتير التصدير (EUR / USD)'
          : locale === 'derja'
          ? 'Factures Export (EUR / USD)'
          : locale === 'en'
          ? 'FX Export Invoices (EUR / USD)'
          : 'Facturation Export (EUR / USD)',
      icon: FileSpreadsheet,
    },
  ];

  const frameworkSpecs = [
    {
      title:
        locale === 'ar'
          ? '1% ضريبة وحيدة'
          : locale === 'derja'
          ? '1% Driba Wa7ida'
          : locale === 'en'
          ? '1% Single Flat Tax'
          : '1% Impôt Unique',
      desc:
        locale === 'ar'
          ? 'للخدمات والمطورين'
          : locale === 'derja'
          ? 'Services & Développeurs'
          : locale === 'en'
          ? 'Service providers & devs'
          : 'Prestations de services & devs',
      tag: 'Loi de Finances',
    },
    {
      title:
        locale === 'ar'
          ? '~50 د.ت / ثلاثية'
          : locale === 'derja'
          ? '~50 DT / Thlethya'
          : locale === 'en'
          ? '~50 DT / Quarter'
          : '~50 DT / Trimestre',
      desc:
        locale === 'ar'
          ? 'تغطية صحية CNSS'
          : locale === 'derja'
          ? 'Couverture CNSS'
          : locale === 'en'
          ? 'CNSS Health coverage'
          : 'Couverture santé CNSS',
      tag: 'Forfaitaire',
    },
    {
      title:
        locale === 'ar'
          ? '0% TVA للتصدير'
          : locale === 'derja'
          ? '0% TVA fel Export'
          : locale === 'en'
          ? '0% VAT on Export'
          : '0% TVA Export',
      desc:
        locale === 'ar'
          ? 'تحويل العملة الصعبة'
          : locale === 'derja'
          ? 'Devises EUR / USD'
          : locale === 'en'
          ? 'EUR / USD repatriation'
          : 'Devises EUR / USD rapatriées',
      tag: 'Non assujetti',
    },
    {
      title:
        locale === 'ar'
          ? 'مطابق للبنك المركزي'
          : locale === 'derja'
          ? 'BCT Conforme'
          : locale === 'en'
          ? 'BCT Compliant'
          : 'BCT Conforme',
      desc:
        locale === 'ar'
          ? 'فواتير تصدير قانونية'
          : locale === 'derja'
          ? 'Factures export homologuées'
          : locale === 'en'
          ? 'Homologated FX invoices'
          : 'Factures export homologuées',
      tag: 'Banque Centrale',
    },
  ];

  const registrationTitle =
    locale === 'ar'
      ? 'هل أنت مستعد للتسجيل كمبادر ذاتي؟'
      : locale === 'derja'
      ? 'Meste3ed bech t9ayed fi statut Auto-Entrepreneur?'
      : locale === 'en'
      ? 'Ready to enroll in the Tunisian Auto-Entrepreneur Regime?'
      : 'Prêt à vous inscrire au Statut Auto-Entrepreneur ?';

  const registrationDesc =
    locale === 'ar'
      ? 'التسجيل يتم مباشرة على البوابة الوطنية الرسمية ببطاقة التعريف الوطنية ووثيقة نشاط للحصول على البطاقة الجبائية وتغطية CNSS.'
      : locale === 'derja'
      ? 'El tarsim yet3adda en ligne 3al portail el rasmi mte3 el dawla b’CIN bech tekhedh el carte professionnelle mte3ek w couverture CNSS.'
      : locale === 'en'
      ? 'Registration takes place on the official national portal with your national ID card (CIN) to obtain your tax card and CNSS healthcare coverage.'
      : "L'adhésion s'effectue en ligne sur le portail officiel de l'État pour bénéficier de la couverture maladie CNSS et de la carte professionnelle.";

  const registrationBtn =
    locale === 'ar'
      ? 'البوابة الوطنية (autoentrepreneur.tn)'
      : locale === 'derja'
      ? 'El Portail el Rasmi (autoentrepreneur.tn)'
      : locale === 'en'
      ? 'National Portal (autoentrepreneur.tn)'
      : 'Portail National (autoentrepreneur.tn)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 relative overflow-hidden">

      {/* Cinematic Ambient Orbs */}
      <AmbientOrbs variant="emerald" />

      {/* ── 2-Column Hero Header (Balances Left & Right space) ── */}
      <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80 relative">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-emerald-400 font-bold">/</span>
            <span>
              {locale === 'ar'
                ? 'قانون المالية · نظام المبادر الذاتي 1% وتصدير الخدمات BCT'
                : locale === 'derja'
                ? 'Loi de Finances · Statut Auto-Entrepreneur 1% & BCT Export'
                : locale === 'en'
                ? 'Finance Law · Self-Entrepreneur 1% Tax & BCT Export'
                : 'Loi de Finances · Régime Auto-Entrepreneur 1% & BCT Export'}
            </span>
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

        {/* Right: National Tax & BCT Hub Widget */}
        <div className="lg:col-span-5 relative z-10">
          <SpotlightCard className="p-4 sm:p-5 border-zinc-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <BadgePercent className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'en' ? 'Tax Regime Parameters' : 'Régime Fiscal & Avantages'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                Loi 2020-33
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {frameworkSpecs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white truncate">
                      {spec.title}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">
                      {spec.tag}
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-500 line-clamp-1">
                    {spec.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>

      {/* ── Segmented Navigation Tabs with Spring Motion ── */}
      <FadeIn direction="up" delay={0.1} className="border-b border-zinc-800">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`py-3.5 px-4 text-xs font-semibold rounded-t-2xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-emerald-300 bg-zinc-900/70 font-bold shadow-sm'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </FadeIn>

      {/* ── Active Tab Panel with AnimatePresence ── */}
      <FadeIn direction="up" delay={0.15}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'comparator' && <StatusComparator />}
            {activeTab === 'tax' && <TaxCalculator />}
            {activeTab === 'invoice' && <ExportInvoiceGen />}
          </motion.div>
        </AnimatePresence>
      </FadeIn>

      {/* ── Official Registration Banner ── */}
      <FadeIn direction="up" delay={0.2}>
        <SpotlightCard className="p-6 sm:p-7 border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-br from-emerald-950/20 via-zinc-900/90 to-zinc-950 shadow-2xl">
          <div className="space-y-1 text-center sm:text-start rtl:sm:text-right">
            <h3 className="text-sm sm:text-base font-bold text-white">{registrationTitle}</h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              {registrationDesc}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://autoentrepreneur.tn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all shrink-0 cursor-pointer"
            >
              <span>{registrationBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </SpotlightCard>
      </FadeIn>
    </div>
  );
}
