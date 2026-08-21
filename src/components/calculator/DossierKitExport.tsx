'use client';

import React from 'react';
import { Procedure } from '../../types/procedure';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { formatTND } from '../../lib/utils';
import { Printer, Stamp, Clock, FileCheck2 } from 'lucide-react';

interface DossierKitExportProps {
  procedure: Procedure;
  checkedDocumentIds?: string[];
}

export const DossierKitExport: React.FC<DossierKitExportProps> = ({
  procedure,
}) => {
  const { locale } = useLocale();

  const title = getLocalized(procedure.title, locale);
  const total = procedure.costsBreakdown.reduce(
    (acc, curr) => acc + curr.amountTND * curr.quantity,
    0
  );

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const deadlineLabel =
    locale === 'ar' ? 'الأجل :' : locale === 'en' ? 'Processing Time:' : 'Délai :';

  const feesCountLabel =
    locale === 'ar'
      ? `${procedure.costsBreakdown.length} معاليم وتنابر`
      : locale === 'en'
      ? `${procedure.costsBreakdown.length} stamps & fees items`
      : `${procedure.costsBreakdown.length} frais & timbres`;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {locale === 'ar'
                ? 'ملخص الإجراء للطباعة والإيداع (Dossier Kit)'
                : locale === 'en'
                ? 'Printable Procedure Dossier Kit'
                : 'Kit Récapitulatif du Dossier (À Imprimer)'}
            </span>
          </h4>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {locale === 'ar'
              ? 'اطبع أو احفظ بطاقة الإجراء مع قائمة الوثائق وميزانية التنابر لأخذها معك'
              : locale === 'en'
              ? 'Print or save this checklist sheet with exact fees to take with you'
              : 'Emportez ce récapitulatif avec vous pour acheter vos timbres sans imprévu'}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{locale === 'ar' ? 'طباعة / حفظ PDF' : locale === 'en' ? 'Print / Save PDF' : 'Imprimer / PDF'}</span>
        </button>
      </div>

      {/* Mini Visual Printable Sheet Preview */}
      <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between text-zinc-300">
          <span className="font-bold text-white">{title}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            {formatTND(total, locale)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{deadlineLabel} {procedure.estimatedProcessingTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stamp className="w-3.5 h-3.5 text-amber-400" />
            <span>{feesCountLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
