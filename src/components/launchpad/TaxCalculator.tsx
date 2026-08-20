'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { formatTND } from '../../lib/utils';

export const TaxCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(35000);
  const [activityType, setActivityType] = useState<'services' | 'commerce'>('services');

  // Auto-entrepreneur calculation
  const taxRate = activityType === 'services' ? 0.01 : 0.005;
  const annualTax = revenue * taxRate;
  const annualCnss = 200; // ~50 DT per quarter
  const totalDeductions = annualTax + annualCnss;
  const netIncome = revenue - totalDeductions;
  const effectiveRate = ((totalDeductions / revenue) * 100).toFixed(2);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">
            Simulateur Fiscal & Social Auto-Entrepreneur
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
          Régime Simplifié
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">
              Chiffre d'Affaires Annuel Estimé (TND) :
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min={5000}
                max={75000}
                step={1000}
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="font-mono text-sm font-bold text-emerald-400 min-w-[90px] text-right">
                {revenue.toLocaleString()} DT
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Type d'Activité :
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActivityType('services')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  activityType === 'services'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                }`}
              >
                Services / IT (1%)
              </button>
              <button
                type="button"
                onClick={() => setActivityType('commerce')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  activityType === 'commerce'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                }`}
              >
                Commerce / Artisans (0.5%)
              </button>
            </div>
          </div>
        </div>

        {/* Results Metrics */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400">Impôt Forfaitaire Annuel :</span>
            <span className="font-mono font-bold text-zinc-200">
              {formatTND(annualTax, 'derja')}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400">Cotisation CNSS Annuelle :</span>
            <span className="font-mono font-bold text-zinc-200">
              {formatTND(annualCnss, 'derja')}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold pt-1">
            <span className="text-emerald-400">Revenu Net dans votre poche :</span>
            <span className="font-mono text-base text-emerald-400">
              {formatTND(netIncome, 'derja')}
            </span>
          </div>

          <div className="text-[11px] text-zinc-500 pt-1">
            Taux de prélèvement effectif global : <strong className="text-emerald-400">{effectiveRate}%</strong> seulement!
          </div>
        </div>
      </div>
    </div>
  );
};
