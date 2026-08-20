'use client';

import React from 'react';
import { Procedure, TimbreCostItem } from '../../types/procedure';
import { useLocale } from '../../context/LocaleContext';
import { formatTND } from '../../lib/utils';
import { getLocalized } from '../../lib/locale-utils';
import { Calculator, Stamp, Camera, FileCheck, Coins, Lightbulb } from 'lucide-react';

interface TimbreCostBreakdownProps {
  procedure: Procedure;
}

export const TimbreCostBreakdown: React.FC<TimbreCostBreakdownProps> = ({ procedure }) => {
  const { locale } = useLocale();

  const total = procedure.costsBreakdown.reduce(
    (acc, curr) => acc + curr.amountTND * curr.quantity,
    0
  );

  const getCategoryIcon = (cat: TimbreCostItem['category']) => {
    switch (cat) {
      case 'timbre_fiscal':
        return <Stamp className="w-4 h-4 text-amber-400" />;
      case 'photo':
        return <Camera className="w-4 h-4 text-blue-400" />;
      case 'legalisation':
        return <FileCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Coins className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getCategoryBg = (cat: TimbreCostItem['category']) => {
    switch (cat) {
      case 'timbre_fiscal': return 'bg-amber-500/10 border-amber-500/20';
      case 'photo':         return 'bg-blue-500/10 border-blue-500/20';
      case 'legalisation':  return 'bg-emerald-500/10 border-emerald-500/20';
      default:              return 'bg-zinc-800/60 border-zinc-700/50';
    }
  };

  const tip =
    locale === 'ar'
      ? 'اقتنِ التنابر الجبائية مباشرةً من القباضات المالية الرسمية لتفادي الزيادات غير القانونية.'
      : locale === 'en'
      ? 'Buy your fiscal stamps directly at official Recettes des Finances to avoid unauthorized fees.'
      : locale === 'fr'
      ? "N'achetez vos timbres qu'auprès des Recettes des Finances officielles pour éviter les majorations illégales."
      : "Ashtri timbres mte3ek men Recette des Finances rasmiyin bech ma yakhdhoulekch bezzef.";

  return (
    <div className="glass-panel rounded-2xl p-5 border border-zinc-800/80 space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20">
            <Calculator className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">
              {locale === 'ar'
                ? 'تفاصيل التنابر والمعاليم'
                : locale === 'en'
                ? 'Stamps & Fees Breakdown'
                : locale === 'fr'
                ? 'Détail des Timbres & Frais'
                : 'Tafassil el Timbres wel Masarif'}
            </h3>
            <span className="text-[10px] text-zinc-500">
              {locale === 'ar' ? 'تقدير ميزانية الإجراء' : locale === 'en' ? 'Budget estimate' : 'Budget estimatif'}
            </span>
          </div>
        </div>

        {/* Total badge */}
        <div className="flex flex-col items-end">
          <span className="text-[9px] text-zinc-500 mb-0.5">
            {locale === 'ar' ? 'المجموع' : locale === 'en' ? 'Total' : 'Total'}
          </span>
          <span className="px-3 py-1 rounded-xl bg-emerald-500 text-zinc-950 font-mono font-extrabold text-sm shadow-md shadow-emerald-500/30">
            {formatTND(total, locale)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Items list */}
      {procedure.costsBreakdown.length > 0 ? (
        <div className="space-y-2">
          {procedure.costsBreakdown.map((item) => {
            const label = getLocalized(item.label, locale);
            const subtotal = item.amountTND * item.quantity;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border flex items-center gap-3 ${getCategoryBg(item.category)}`}
              >
                <div className="p-1.5 rounded-lg bg-zinc-900/80 shrink-0">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-semibold text-zinc-100 leading-tight truncate">{label}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {item.quantity > 1 ? `${item.quantity} × ` : ''}{formatTND(item.amountTND, locale)}
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-zinc-100 shrink-0 tabular-nums">
                  {formatTND(subtotal, locale)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <span className="text-2xl">🎉</span>
          <p className="text-xs text-emerald-400 font-semibold mt-1">
            {locale === 'ar' ? 'هذا الإجراء مجاني تماماً' : locale === 'en' ? 'This procedure is completely free' : 'Cette démarche est totalement gratuite'}
          </p>
        </div>
      )}

      {/* Tip */}
      <div className="flex items-start space-x-2.5 rtl:space-x-reverse p-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-300/90 leading-relaxed">{tip}</p>
      </div>
    </div>
  );
};
