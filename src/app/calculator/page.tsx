'use client';

import React, { useState } from 'react';
import { proceduresData, getProcedureById } from '../../data/procedures';
import { TimbreCostBreakdown } from '../../components/calculator/TimbreCostBreakdown';
import { ChecklistTracker } from '../../components/calculator/ChecklistTracker';
import { DossierKitExport } from '../../components/calculator/DossierKitExport';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { Stamp, ArrowRight, ShieldCheck, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const { locale } = useLocale();
  const [selectedProcId, setSelectedProcId] = useState<string>('passeport-renouvellement');

  const selectedProcedure = getProcedureById(selectedProcId) || proceduresData[0];

  const headlineMain =
    locale === 'ar'
      ? 'حاسبة التنابر الجبائية'
      : locale === 'en'
      ? 'Fiscal Stamp & Budget'
      : 'Calculateur des Timbres';

  const headlineAccent =
    locale === 'ar'
      ? 'وميزانية الأوراق.'
      : locale === 'en'
      ? 'Counter & Dossier.'
      : 'Fiscaux & Pièces.';

  const subtitle =
    locale === 'ar'
      ? 'احتساب المصاريف القانونية الدقيقة (تنابر 3 د.ت، 5 د.ت، 15 د.ت، 80 د.ت، صور شمسية، نسخ مطابقة) حتى لا تُفاجأ عند الشباك.'
      : locale === 'en'
      ? 'Calculate the exact statutory fiscal stamps, photo fees, and copy costs for any Tunisian administrative procedure before heading to the counter.'
      : "Calculez le montant exact des timbres fiscaux (3 DT, 5 DT, 15 DT, 80 DT), photos d'identité et copies conformes pour éviter tout imprévu au guichet.";

  const officialTariffs = [
    { amount: '3.000 DT', label: locale === 'en' ? 'Municipal Signature (Légalisation)' : 'Ta3rif bel Imdha2 Baladiya', desc: 'Tarif unitaire' },
    { amount: '5.000 DT', label: locale === 'en' ? 'Civil Status & Mandates' : 'Tawkîl & 7alet Madaniya', desc: 'Recette des Finances' },
    { amount: '15.000 DT', label: locale === 'en' ? 'Commercial Deeds & Bail' : '3a9d Kré & Bita9a B3', desc: 'Recette / Enregistrement' },
    { amount: '80.000 DT', label: locale === 'en' ? 'Ordinary Passport Stamp' : 'Timbre Passeport Tounsi', desc: 'Tarif officiel' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">

      {/* ── 2-Column Hero Header (Balances Left & Right space perfectly) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-amber-400">
            <Stamp className="w-3.5 h-3.5" />
            <span>Barème Officiel · Recette des Finances & Baladiya</span>
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

        {/* Right: Live Official Fiscal Tariff Hub (Fills the empty space) */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'en' ? 'Statutory Stamp Tariffs' : 'Timbres Fiscaux en Vigueur'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                JORT 2026
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {officialTariffs.map((tariff, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-amber-400">
                      {tariff.amount}
                    </span>
                    <span className="text-[9px] text-zinc-500">
                      {tariff.desc}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-300 font-medium line-clamp-1">
                    {tariff.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Procedure Picker Grid with visual badges ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="font-bold uppercase tracking-wider text-[11px] text-zinc-400">
            {locale === 'ar' ? 'اختر الإجراء المعني :' : locale === 'en' ? 'Select procedure to calculate:' : 'Sélectionner la démarche :'}
          </span>
          <span className="font-mono text-[11px]">
            {proceduresData.length} démarches
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {proceduresData.map((p) => {
            const isSelected = p.id === selectedProcId;
            const title = getLocalized(p.title, locale);

            return (
              <button
                key={p.id}
                onClick={() => setSelectedProcId(p.id)}
                className={`p-3 rounded-2xl text-left rtl:text-right transition-all duration-150 border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/40 text-white border-emerald-400 shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-500/40'
                    : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider block mb-1 text-emerald-400/80">
                    {p.vertical}
                  </span>
                  <h4 className="text-xs font-semibold leading-snug line-clamp-2">
                    {title}
                  </h4>
                </div>
                <div className="pt-2 mt-2 border-t border-zinc-800/60 text-[10px] font-mono font-bold text-amber-400">
                  ~ {p.estimatedTotalCostTND.toFixed(3)} DT
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Grid: Cost Breakdown & Checklist ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cost Breakdown + Guide Link */}
        <div className="lg:col-span-5 space-y-4">
          <TimbreCostBreakdown procedure={selectedProcedure} />

          <Link
            href={`/procedures/${selectedProcedure.id}`}
            className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-900 group transition-all"
          >
            <div>
              <p className="text-xs font-bold text-zinc-200 group-hover:text-emerald-300 transition-colors">
                {locale === 'ar' ? 'هل تريد الدليل خطوة بخطوة؟' : locale === 'en' ? 'Need the step-by-step guide?' : 'Besoin du guide étape par étape ?'}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {locale === 'ar' ? 'اطلع على الأجل والمكاتب المعنية' : locale === 'en' ? 'Detailed deadlines, offices, and required documents' : 'Délais, bureaux et documents requis en détail'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold shrink-0">
              <span>{locale === 'ar' ? 'الدليل' : locale === 'en' ? 'View guide' : 'Voir guide'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Right: Checklist & Printable Kit */}
        <div className="lg:col-span-7 space-y-4">
          <ChecklistTracker procedure={selectedProcedure} />
          <DossierKitExport procedure={selectedProcedure} />
        </div>
      </div>
    </div>
  );
}
