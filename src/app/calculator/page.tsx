'use client';

import React, { useState } from 'react';
import { proceduresData, getProcedureById } from '../../data/procedures';
import { TimbreCostBreakdown } from '../../components/calculator/TimbreCostBreakdown';
import { ChecklistTracker } from '../../components/calculator/ChecklistTracker';
import { useLocale } from '../../context/LocaleContext';
import { Calculator, Stamp, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const { locale } = useLocale();
  const [selectedProcId, setSelectedProcId] = useState<string>('passeport-renouvellement');

  const selectedProcedure = getProcedureById(selectedProcId) || proceduresData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Calculateur de Timbres Fiscaux & Suivi de Pièces Administratives</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          🧮 Timbre & Awra9 Budget Calculator
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          E7seb el budget exact mte3 ay procédure (Timbres 5 DT, 15 DT, 80 DT, photos d'identité, copies conformes) bech ma yetfaji2ech 3al guichet.
        </p>
      </div>

      {/* Procedure Picker Tabs */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          {proceduresData.map((p) => {
            const isSelected = p.id === selectedProcId;
            const title = p.title[locale] || p.title['derja'];

            return (
              <button
                key={p.id}
                onClick={() => setSelectedProcId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span>{title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Cost Breakdown & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cost Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <TimbreCostBreakdown procedure={selectedProcedure} />
          
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold block">Besoin d'un guide étape par étape ?</span>
              <span>Découvrez les délais et bureaux de dépôt associés</span>
            </div>
            <Link
              href={`/procedures/${selectedProcedure.id}`}
              className="inline-flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span>Voir guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Checklist */}
        <div className="lg:col-span-7">
          <ChecklistTracker procedure={selectedProcedure} />
        </div>
      </div>
    </div>
  );
}
