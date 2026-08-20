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
      : locale === 'fr'
      ? 'Plateforme Freelances, Développeurs & Fondateurs'
      : 'Plateforme mte3 Freelancers, Devs w Fondateurs';

  const title =
    locale === 'ar'
      ? '🚀 منصة المستقل والمبادر'
      : '🚀 Freelancer & Entrepreneur Launchpad';

  const subtitle =
    locale === 'ar'
      ? 'قارن بين الأنظمة الجبائية (مبادر ذاتي مقابل براءة مقابل SUARL)، احسب ضرائبك بـ 1%، واستخرج فواتير التصدير بالعملة الأجنبية وفق بنك تونس المركزي.'
      : locale === 'fr'
      ? "Comparez les statuts (Auto-Entrepreneur vs Patente vs SUARL), simulez vos impôts à 1%, et générez des factures d'exportation conformes à la BCT."
      : "Qaren bel statuts (Auto-Entrepreneur vs Patente vs SUARL), 7aseb dharibtek bel 1%, w a3mel factures export conformes lel BCT.";

  const tabs = [
    {
      id: 'comparator' as const,
      label:
        locale === 'ar'
          ? '⚖️ مقارنة الأنظمة القانونية'
          : locale === 'fr'
          ? '⚖️ Comparateur de Statuts'
          : '⚖️ Comparator statuts',
    },
    {
      id: 'tax' as const,
      label:
        locale === 'ar'
          ? '🧮 محاكي الضريبة 1% والـ CNSS'
          : locale === 'fr'
          ? '🧮 Simulateur Impôts (1%) & CNSS'
          : '🧮 Simulateur Dhariba (1%) & CNSS',
    },
    {
      id: 'invoice' as const,
      label:
        locale === 'ar'
          ? '📄 فواتير التصدير (EUR / USD)'
          : '📄 Factures Export (EUR / USD)',
    },
  ];

  const registrationTitle =
    locale === 'ar'
      ? 'هل أنت مستعد للتسجيل كمبادر ذاتي؟'
      : locale === 'fr'
      ? 'Prêt à vous inscrire au Statut Auto-Entrepreneur ?'
      : "7adher tnajem t9ayyed fi Statut Auto-Entrepreneur?";

  const registrationDesc =
    locale === 'ar'
      ? 'التسجيل يتم مباشرة على البوابة الوطنية الرسمية ببطاقة التعريف الوطنية ووثيقة نشاط.'
      : locale === 'fr'
      ? "L'inscription s'effectue directement sur le portail national officiel avec votre CIN et justificatif d'activité."
      : "T9ayyed directly 3al portail national rasmi m3a el CIN w wa9fiyat en9ach mte3ek.";

  const registrationBtn =
    locale === 'ar' ? 'الدخول إلى البوابة الوطنية' :
    locale === 'fr' ? 'Accéder au Portail National' :
    'Portail National (autoentrepreneur.tn)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      {/* Header */}
      <div className="mb-8">
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
      <div className="relative scroll-fade-x mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-3 border-b border-zinc-800/80">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mb-12">
        {activeTab === 'comparator' && <StatusComparator />}
        {activeTab === 'tax' && <TaxCalculator />}
        {activeTab === 'invoice' && <ExportInvoiceGen />}
      </div>

      {/* Registration CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white mb-1">{registrationTitle}</h4>
          <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">{registrationDesc}</p>
        </div>
        <a
          href="https://autoentrepreneur.tn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
        >
          <span>{registrationBtn}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
