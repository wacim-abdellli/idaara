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
  const { locale, isRtl } = useLocale();

  const total = procedure.costsBreakdown.reduce(
    (acc, curr) => acc + curr.amountTND * curr.quantity,
    0
  );

  const getCategoryIcon = (cat: TimbreCostItem['category']) => {
    switch (cat) {
      case 'timbre_fiscal':
        return <Stamp className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'photo':
        return <Camera className="w-4 h-4 text-blue-400 shrink-0" />;
      case 'legalisation':
        return <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />;
      default:
        return <Coins className="w-4 h-4 text-zinc-400 shrink-0" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {locale === 'ar' ? 'تفاصيل التنابر والمعاليم' : locale === 'fr' ? 'Détail des Timbres & Frais' : 'Tafassil el Timbres wel Masarif'}
            </h3>
            <span className="text-[10px] text-zinc-400 block">
              {locale === 'ar' ? 'المجموع التقديري' : 'Budget estimatif'}
            </span>
          </div>
        </div>

        <div className="text-end">
          <span className="inline-block px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-sm font-extrabold border border-emerald-500/30">
            {formatTND(total, locale)}
          </span>
        </div>
      </div>

      {/* Items list */}
      {procedure.costsBreakdown.length > 0 ? (
        <div className="space-y-2.5">
          {procedure.costsBreakdown.map((item) => {
            const label = item.label[locale] || item.label['derja'];
            const subtotal = item.amountTND * item.quantity;

            return (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                  <div className="p-1.5 rounded-lg bg-zinc-800">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">{label}</h4>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {item.quantity} × {formatTND(item.amountTND, locale)}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-zinc-100 shrink-0">
                  {formatTND(subtotal, locale)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center text-xs text-zinc-400">
          {locale === 'ar' ? 'هذا الإجراء مجاني ولا يتطلب أي تنبر جبائي.' : 'Cette démarche ne nécessite aucun timbre fiscal (Gratuit).'}
        </div>
      )}

      {/* Advice tip */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed">
        💡 <strong>{locale === 'ar' ? 'نصيحة' : 'Astuce'} :</strong> {locale === 'ar' ? 'اقتنِ التنابر الجبائية مباشرة من القباضات المالية الرسمية لتفادي الزيادات غير القانونية لدى الأكشاك.' : "N'achetez vos timbres qu'auprès des Recettes des Finances officielles pour éviter les majorations illégales."}
      </div>
    </div>
  );
};
