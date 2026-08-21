'use client';

import React, { useState } from 'react';
import { StatusComparator } from '../../components/launchpad/StatusComparator';
import { TaxCalculator } from '../../components/launchpad/TaxCalculator';
import { ExportInvoiceGen } from '../../components/launchpad/ExportInvoiceGen';
import { useLocale } from '../../context/LocaleContext';
import { ExternalLink, Sparkles, Scale, Calculator, FileSpreadsheet, BadgePercent, ShieldCheck } from 'lucide-react';

export default function LaunchpadPage() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'comparator' | 'tax' | 'invoice'>('comparator');

  const headlineMain =
    locale === 'ar'
      ? 'فضاء المستقلين والمشاريع'
      : locale === 'en'
      ? 'Freelancer & Founder'
      : 'Espace Freelance & Création';

  const headlineAccent =
    locale === 'ar'
      ? 'والمبادر الذاتي.'
      : locale === 'en'
      ? 'Launchpad 1% Tax.'
      : "d'Entreprise (1%).";

  const subtitle =
    locale === 'ar'
      ? 'قارن بين الأنظمة الجبائية (مبادر ذاتي مقابل براءة مقابل SUARL)، احسب ضرائبك بـ 1%، واستخرج فواتير التصدير بالعملة الأجنبية وفق بنك تونس المركزي.'
      : locale === 'en'
      ? 'Compare legal structures (Auto-Entrepreneur vs. Sole Proprietor vs. SUARL), simulate 1% flat tax & CNSS dues, and generate BCT-compliant foreign currency export invoices.'
      : "Comparez les régimes fiscaux (Auto-Entrepreneur vs Patente vs SUARL), simulez vos impôts au taux forfaitaire de 1%, et éditez vos factures d'exportation conformes à la BCT.";

  const tabs = [
    {
      id: 'comparator' as const,
      label:
        locale === 'ar'
          ? 'مقارنة الأنظمة القانونية'
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
          : locale === 'en'
          ? 'FX Export Invoices (EUR / USD)'
          : 'Facturation Export (EUR / USD)',
      icon: FileSpreadsheet,
    },
  ];

  const frameworkSpecs = [
    { title: '1% Impôt Unique', desc: 'Prestations de services & devs', tag: 'Loi de Finances' },
    { title: '~50 DT / Trimestre', desc: 'Couverture santé CNSS', tag: 'Forfaitaire' },
    { title: '0% TVA Export', desc: 'Devises EUR / USD rapatriées', tag: 'Non assujetti' },
    { title: 'BCT Conforme', desc: 'Factures export homologuées', tag: 'Banque Centrale' },
  ];

  const registrationTitle =
    locale === 'ar'
      ? 'هل أنت مستعد للتسجيل كمبادر ذاتي؟'
      : locale === 'en'
      ? 'Ready to enroll in the Tunisian Auto-Entrepreneur Regime?'
      : 'Prêt à vous inscrire au Statut Auto-Entrepreneur ?';

  const registrationDesc =
    locale === 'ar'
      ? 'التسجيل يتم مباشرة على البوابة الوطنية الرسمية ببطاقة التعريف الوطنية ووثيقة نشاط للحصول على البطاقة الجبائية وتغطية CNSS.'
      : locale === 'en'
      ? 'Registration takes place on the official national portal with your national ID card (CIN) to obtain your tax card and CNSS healthcare coverage.'
      : "L'adhésion s'effectue en ligne sur le portail officiel de l'État pour bénéficier de la couverture maladie CNSS et de la carte professionnelle.";

  const registrationBtn =
    locale === 'ar' ? 'البوابة الوطنية (autoentrepreneur.tn)' :
    locale === 'en' ? 'National Portal (autoentrepreneur.tn)' :
    'Portail National (autoentrepreneur.tn)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">

      {/* ── 2-Column Hero Header (Balances Left & Right space) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-emerald-400 font-bold">/</span>
            <span>Loi de Finances · Régime Auto-Entrepreneur 1% & BCT Export</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <span
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: National Tax & BCT Hub Widget (Fills empty space) */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950 shadow-xl space-y-3">
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
                <div
                  key={idx}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Segmented Navigation Tabs ── */}
      <div className="border-b border-zinc-800">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs font-semibold rounded-t-2xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-emerald-300 bg-zinc-900/70 font-bold shadow-sm'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Active Tab Panel ── */}
      <div>
        {activeTab === 'comparator' && <StatusComparator />}
        {activeTab === 'tax' && <TaxCalculator />}
        {activeTab === 'invoice' && <ExportInvoiceGen />}
      </div>

      {/* ── Official Registration Banner ── */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-br from-emerald-950/20 via-zinc-900/90 to-zinc-950">
        <div className="space-y-1 text-center sm:text-start">
          <h3 className="text-sm sm:text-base font-bold text-white">{registrationTitle}</h3>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
            {registrationDesc}
          </p>
        </div>
        <a
          href="https://autoentrepreneur.tn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 shrink-0"
        >
          <span>{registrationBtn}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
