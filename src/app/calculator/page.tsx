'use client';

import React, { useState } from 'react';
import { proceduresData, getProcedureById } from '../../data/procedures';
import { TimbreCostBreakdown } from '../../components/calculator/TimbreCostBreakdown';
import { ChecklistTracker } from '../../components/calculator/ChecklistTracker';
import { DossierKitExport } from '../../components/calculator/DossierKitExport';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { Calculator, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const { locale } = useLocale();
  const [selectedProcId, setSelectedProcId] = useState<string>('passeport-renouvellement');

  const selectedProcedure = getProcedureById(selectedProcId) || proceduresData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">

      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold mb-4">
          <Calculator className="w-3 h-3" />
          <span>
            {locale === 'ar'
              ? 'حاسبة التنابر الجبائية وتتبع ملف الإجراء'
              : locale === 'en'
              ? 'Fiscal Stamps Calculator & Checklist Tracker'
              : locale === 'fr'
              ? 'Calculateur de Timbres Fiscaux & Suivi de Pièces'
              : 'E7seb el Timbres w Lawwej 3la Awra9ek'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
          <span className="text-2xl sm:text-3xl mr-2">🧮</span>
          {locale === 'ar'
            ? 'حاسبة التنابر والأوراق الإدارية'
            : locale === 'en'
            ? 'Timbre & Papers Budget Calculator'
            : 'Timbre & Awra9 Budget Calculator'}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'احسب المصاريف الدقيقة لأي إجراء إداري (تنابر 5 د.ت، 15 د.ت، 80 د.ت، صور شمسية، نسخ مطابقة) حتى لا تفاجأ عند الشباك.'
            : locale === 'en'
            ? 'Calculate the exact budget for any administrative procedure (5 DT, 15 DT, 80 DT stamps, ID photos, certified copies) to avoid surprises at the desk.'
            : locale === 'fr'
            ? "Calculez le budget exact pour chaque démarche (Timbres 5 DT, 15 DT, 80 DT, photos d'identité, copies conformes) pour éviter les mauvaises surprises au guichet."
            : "E7seb el budget exact mte3 ay procédure (Timbres 5 DT, 15 DT, 80 DT, photos d'identité, copies conformes) bech ma yetfaji2ech 3al guichet."}
        </p>
      </div>

      {/* Procedure Picker Tabs — horizontal scroll with fade */}
      <div>
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
          {locale === 'ar' ? 'اختر الإجراء :' : locale === 'en' ? 'Select procedure:' : 'Choisir la démarche :'}
        </p>
        <div className="relative scroll-fade-x">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {proceduresData.map((p) => {
              const isSelected = p.id === selectedProcId;
              const title = getLocalized(p.title, locale);

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProcId(p.id)}
                  className={`px-3.5 py-2 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all duration-150 border shrink-0 ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/25'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
                  }`}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Cost Breakdown & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cost Breakdown + Guide Link */}
        <div className="lg:col-span-5 space-y-4">
          <TimbreCostBreakdown procedure={selectedProcedure} />

          <Link
            href={`/procedures/${selectedProcedure.id}`}
            className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900 group transition-all"
          >
            <div>
              <p className="text-xs font-bold text-zinc-200 group-hover:text-emerald-300 transition-colors">
                {locale === 'ar' ? 'هل تريد الدليل خطوة بخطوة؟' : locale === 'en' ? 'Need the step-by-step guide?' : 'Besoin du guide étape par étape ?'}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {locale === 'ar' ? 'اطلع على الأجل والمكاتب المعنية' : locale === 'en' ? 'Detailed deadlines, offices, and required documents' : 'Délais, bureaux et documents requis en détail'}
              </p>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold shrink-0">
              <span>{locale === 'ar' ? 'الدليل' : locale === 'en' ? 'View guide' : 'Voir guide'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
