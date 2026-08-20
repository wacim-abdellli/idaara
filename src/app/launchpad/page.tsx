'use client';

import React, { useState } from 'react';
import { StatusComparator } from '../../components/launchpad/StatusComparator';
import { TaxCalculator } from '../../components/launchpad/TaxCalculator';
import { ExportInvoiceGen } from '../../components/launchpad/ExportInvoiceGen';
import { useLocale } from '../../context/LocaleContext';
import { Rocket, ExternalLink } from 'lucide-react';

export default function LaunchpadPage() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'comparator' | 'tax' | 'invoice'>('comparator');

  // ── Locale-aware strings ──────────────────────────────────────────────────
  const badge =
    locale === 'ar'
      ? 'منصة المستقلين والمبادرين التونسيين'
      : locale === 'en'
      ? 'Platform for Freelancers, Developers & Founders'
      : locale === 'fr'
      ? 'Plateforme Freelances, Développeurs & Fondateurs'
      : 'Plateforme mte3 Freelancers, Devs w Fondateurs';

  const title =
    locale === 'ar'
      ? '🚀 فضاء المستقلين والمبادر الذاتي'
      : locale === 'en'
      ? '🚀 Freelancer & Entrepreneur Launchpad'
      : '🚀 Launchpad Freelancers & Auto-Entrepreneurs';

  const subtitle =
    locale === 'ar'
      ? 'قارن بين الأنظمة الجبائية (مبادر ذاتي مقابل براءة مقابل SUARL)، احسب ضرائبك بـ 1%، واستخرج فواتير التصدير بالعملة الأجنبية وفق بنك تونس المركزي.'
      : locale === 'en'
      ? 'Compare legal structures (Auto-Entrepreneur vs. Sole Proprietor vs. SUARL), simulate 1% tax & CNSS dues, and generate BCT-compliant export invoices.'
      : locale === 'fr'
      ? "Comparez les statuts (Auto-Entrepreneur vs Patente vs SUARL), simulez vos impôts à 1%, et générez des factures d'exportation conformes à la BCT."
      : "Qaren bel statuts (Auto-Entrepreneur vs Patente vs SUARL), 7aseb dharibtek bel 1%, w a3mel factures export conformes lel BCT.";

  const tabs = [
    {
      id: 'comparator' as const,
      label:
        locale === 'ar'
          ? '⚖️ مقارنة الأنظمة القانونية'
          : locale === 'en'
          ? '⚖️ Legal Status Comparator'
          : locale === 'fr'
          ? '⚖️ Comparateur de Statuts'
          : '⚖️ Comparator statuts',
    },
    {
      id: 'tax' as const,
      label:
        locale === 'ar'
          ? '🧮 محاكي الضريبة 1% والـ CNSS'
          : locale === 'en'
          ? '🧮 1% Tax & CNSS Simulator'
          : locale === 'fr'
          ? '🧮 Simulateur Impôts (1%) & CNSS'
          : '🧮 Simulateur Dhariba (1%) & CNSS',
    },
    {
      id: 'invoice' as const,
      label:
        locale === 'ar'
          ? '📄 فواتير التصدير (EUR / USD)'
          : locale === 'en'
          ? '📄 Export Invoices (EUR / USD)'
          : '📄 Factures Export (EUR / USD)',
    },
  ];

  const registrationTitle =
    locale === 'ar'
      ? 'هل أنت مستعد للتسجيل كمبادر ذاتي؟'
      : locale === 'en'
      ? 'Ready to register as a Tunisian Auto-Entrepreneur?'
      : locale === 'fr'
      ? 'Prêt à vous inscrire au Statut Auto-Entrepreneur ?'
      : "7adher tnajem t9ayyed fi Statut Auto-Entrepreneur?";

  const registrationDesc =
    locale === 'ar'
      ? 'التسجيل يتم مباشرة على البوابة الوطنية الرسمية ببطاقة التعريف الوطنية ووثيقة نشاط.'
      : locale === 'en'
      ? 'Registration takes place directly on the official national portal with your CIN card and proof of activity.'
      : locale === 'fr'
      ? "L'inscription s'effectue directement sur le portail national officiel avec votre CIN et justificatif d'activité."
      : "T9ayyed directly 3al portail national rasmi m3a el CIN w wa9fiyat en9ach mte3ek.";

  const registrationBtn =
    locale === 'ar' ? 'الدخول إلى البوابة الوطنية' :
    locale === 'en' ? 'Open Official Portal (autoentrepreneur.tn)' :
    locale === 'fr' ? 'Accéder au Portail National' :
    'Portail National (autoentrepreneur.tn)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">

      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-4">
          <Rocket className="w-3 h-3" />
          <span>{badge}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-emerald-300 bg-zinc-900/60'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {activeTab === 'comparator' && <StatusComparator />}
        {activeTab === 'tax' && <TaxCalculator />}
        {activeTab === 'invoice' && <ExportInvoiceGen />}
      </div>

      {/* Official Registration CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white mb-1">{registrationTitle}</h3>
          <p className="text-xs text-zinc-400 max-w-xl">
            {registrationDesc}
          </p>
        </div>
        <a
          href="https://autoentrepreneur.tn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 shrink-0"
        >
          <span>{registrationBtn}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
