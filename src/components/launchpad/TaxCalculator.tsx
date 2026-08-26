'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { formatTND } from '../../lib/utils';
import { useLocale } from '../../context/LocaleContext';

export const TaxCalculator: React.FC = () => {
  const { locale } = useLocale();
  const [revenue, setRevenue] = useState<number>(35000);
  const [activityType, setActivityType] = useState<'services' | 'commerce'>('services');

  // Auto-entrepreneur calculation
  const taxRate = activityType === 'services' ? 0.01 : 0.005;
  const annualTax = revenue * taxRate;
  const annualCnss = 200; // ~50 DT per quarter
  const totalDeductions = annualTax + annualCnss;
  const netIncome = revenue - totalDeductions;
  const effectiveRate = ((totalDeductions / revenue) * 100).toFixed(2);

  const title =
    locale === 'ar'
      ? 'محاكي الضرائب والـ CNSS للمبادر الذاتي'
      : locale === 'en'
      ? 'Auto-Entrepreneur Tax & CNSS Simulator'
      : locale === 'fr'
      ? 'Simulateur Fiscal & Social Auto-Entrepreneur'
      : 'Simulateur Dhariba & CNSS Auto-Entrepreneur';

  const revenueLabel =
    locale === 'ar'
      ? 'رقم المعاملات السنوي التقديري (د.ت) :'
      : locale === 'en'
      ? 'Estimated Annual Revenue (TND):'
      : locale === 'fr'
      ? "Chiffre d'Affaires Annuel Estimé (TND) :"
      : "Chiffre d'Affaires fi l'3am (TND) :";

  const activityLabel =
    locale === 'ar' ? 'نوع النشاط :' : locale === 'derja' ? 'Type el activité :' : locale === 'en' ? 'Activity Type:' : "Type d'Activité :";

  const taxLabel =
    locale === 'ar'
      ? 'الضريبة الجزافية السنوية :'
      : locale === 'derja'
      ? 'Impôt forfaitaire fi l3am :'
      : locale === 'en'
      ? 'Annual Flat Tax:'
      : 'Impôt Forfaitaire Annuel :';

  const cnssLabel =
    locale === 'ar'
      ? 'مساهمة الضمان الاجتماعي (CNSS) :'
      : locale === 'derja'
      ? 'Cotisation CNSS fi l3am :'
      : locale === 'en'
      ? 'Annual CNSS Contribution:'
      : 'Cotisation CNSS Annuelle :';

  const netLabel =
    locale === 'ar'
      ? 'الدخل الصافي في جيبك :'
      : locale === 'derja'
      ? 'Revenu net fi jibek :'
      : locale === 'en'
      ? 'Net Income in Your Pocket:'
      : 'Revenu Net dans votre poche :';

  const effectiveRateLabel =
    locale === 'ar'
      ? 'نسبة الاقتطاع الإجمالية الفعلية :'
      : locale === 'derja'
      ? 'Taux el prélèvement el kol :'
      : locale === 'en'
      ? 'Effective total deduction rate:'
      : 'Taux de prélèvement effectif global :';

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
            <Calculator className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white">
            {title}
          </h3>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
          {locale === 'ar' ? 'النظام الجزافي' : locale === 'derja' ? 'Régime simplifié' : locale === 'en' ? 'Flat Regime' : 'Régime Simplifié'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">
              {revenueLabel}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5000}
                max={75000}
                step={1000}
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="font-mono text-sm font-bold text-emerald-400 min-w-[90px] text-right">
                {revenue.toLocaleString()} DT
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              {activityLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActivityType('services')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
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
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
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
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400">{taxLabel}</span>
            <span className="font-mono font-bold text-zinc-200">
              {formatTND(annualTax, locale)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400">{cnssLabel}</span>
            <span className="font-mono font-bold text-zinc-200">
              {formatTND(annualCnss, locale)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold pt-1">
            <span className="text-emerald-400">{netLabel}</span>
            <span className="font-mono text-base text-emerald-400">
              {formatTND(netIncome, locale)}
            </span>
          </div>

          <div className="text-[11px] text-zinc-500 pt-1">
            {effectiveRateLabel} <strong className="text-emerald-400">{effectiveRate}%</strong> {locale === 'en' ? 'only!' : 'seulement!'}
          </div>
        </div>
      </div>
    </div>
  );
};
