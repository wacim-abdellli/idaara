'use client';

import React from 'react';
import { Procedure, TimbreCostItem } from '../../types/procedure';
import { useLocale } from '../../context/LocaleContext';
import { formatTND } from '../../lib/utils';
import { Calculator, Stamp, Camera, FileCheck, Coins } from 'lucide-react';

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

  return (
    <div className="glass-panel rounded-2xl p-6 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">
            Tafassil el Timbres wel Masarif (Calculateur)
          </h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-zinc-500 block uppercase font-bold">
            Total Estimé
          </span>
          <span className="text-xl font-extrabold text-emerald-400">
            {formatTND(total, locale)}
          </span>
        </div>
      </div>

      {procedure.costsBreakdown.length > 0 ? (
        <div className="space-y-3">
          {procedure.costsBreakdown.map((item) => {
            const label = item.label[locale] || item.label['derja'];
            const subtotal = item.amountTND * item.quantity;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-zinc-800/80">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">{label}</h4>
                    <span className="text-[11px] text-zinc-500">
                      {item.quantity} x {formatTND(item.amountTND, locale)}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-sm font-bold text-zinc-100">
                  {formatTND(subtotal, locale)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center text-xs text-zinc-400">
          Cette démarche ne nécessite aucun timbre fiscal payant (Procédure gratuite).
        </div>
      )}

      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
        💡 <strong>Conseil Idaara :</strong> N'achetez vos timbres fiscaux qu'auprès des Recettes des Finances officielles ou bureaux de poste pour éviter les majorations illégales des revendeurs tiers.
      </div>
    </div>
  );
};
