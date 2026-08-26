'use client';

import React, { useState } from 'react';
import { Procedure } from '../../types/procedure';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { formatTND, triggerConfetti } from '../../lib/utils';
import { generatePDFFromElement, printElement } from '../../lib/pdf-generator';
import { Printer, Stamp, Clock, FileCheck2, Download, Building2, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface DossierKitExportProps {
  procedure: Procedure;
  checkedDocumentIds?: string[];
}

export const DossierKitExport: React.FC<DossierKitExportProps> = ({
  procedure,
}) => {
  const { locale } = useLocale();
  const [isGenerating, setIsGenerating] = useState(false);

  const title = getLocalized(procedure.title, locale);
  const total = procedure.costsBreakdown.reduce(
    (acc, curr) => acc + curr.amountTND * curr.quantity,
    0
  );

  const handlePrint = () => {
    printElement('printable-procedure-dossier');
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDFFromElement(
        'printable-procedure-dossier',
        `Dossier-Idaara-${procedure.id}.pdf`
      );
      triggerConfetti();
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const deadlineLabel =
    locale === 'ar' ? 'الأجل :' : locale === 'derja' ? 'Délai :' : locale === 'en' ? 'Processing Time:' : 'Délai :';

  const feesCountLabel =
    locale === 'ar'
      ? `${procedure.costsBreakdown.length} معاليم وتنابر`
      : locale === 'derja'
      ? `${procedure.costsBreakdown.length} frais & timbres`
      : locale === 'en'
      ? `${procedure.costsBreakdown.length} stamps & fees items`
      : `${procedure.costsBreakdown.length} frais & timbres`;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#0d0e12] border border-white/[0.08] space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {locale === 'ar'
                ? 'ملخص الإجراء للطباعة والإيداع (Dossier Kit)'
                : locale === 'derja'
                ? 'Kit Récapitulatif du Dossier (À Imprimer)'
                : locale === 'en'
                ? 'Printable Procedure Dossier Kit'
                : 'Kit Récapitulatif du Dossier (À Imprimer)'}
            </span>
          </h4>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {locale === 'ar'
              ? 'اطبع أو احفظ بطاقة الإجراء مع قائمة الوثائق وميزانية التنابر لأخذها معك'
              : locale === 'derja'
              ? 'Emportez ce récapitulatif avec vous pour acheter vos timbres sans imprévu'
              : locale === 'en'
              ? 'Print or save this checklist sheet with exact fees to take with you'
              : 'Emportez ce récapitulatif avec vous pour acheter vos timbres sans imprévu'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-all cursor-pointer border border-zinc-700"
            title={locale === 'ar' ? 'طباعة الورقة' : locale === 'derja' ? 'Imprimer la fiche' : locale === 'en' ? 'Print sheet' : 'Imprimer la fiche'}
          >
            <Printer className="w-4 h-4 text-zinc-400" />
            <span>{locale === 'ar' ? 'طباعة' : locale === 'derja' ? 'Imprimer' : locale === 'en' ? 'Print' : 'Imprimer'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{locale === 'ar' ? 'حفظ PDF' : locale === 'derja' ? 'Télécharger PDF' : locale === 'en' ? 'Export PDF' : 'Télécharger PDF'}</span>
          </button>
        </div>
      </div>

      {/* Mini Visual Printable Sheet Preview */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between text-zinc-300">
          <span className="font-bold text-white truncate max-w-[200px] sm:max-w-none">{title}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold shrink-0">
            {formatTND(total, locale)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{deadlineLabel} {getLocalized(procedure.estimatedProcessingTime, locale)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stamp className="w-3.5 h-3.5 text-amber-400" />
            <span>{feesCountLabel}</span>
          </div>
        </div>
      </div>

      {/* ── HIGH-RES A4 OFFICIAL DOSSIER CONTAINER (FOR PDF & PRINT ONLY) ── */}
      <div className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none z-[-100]" aria-hidden="true">
        <div
          id="printable-procedure-dossier"
          dir={locale === 'ar' || locale === 'derja' ? 'rtl' : 'ltr'}
          className={`w-[210mm] min-h-[280mm] bg-white text-zinc-900 p-8 sm:p-10 space-y-4 ${
            locale === 'ar' || locale === 'derja' ? 'text-right' : 'text-left'
          }`}
          style={{ fontFamily: locale === 'ar' || locale === 'derja' ? 'Cairo, "Noto Sans Arabic", sans-serif' : 'system-ui, -apple-system, sans-serif' }}
        >
          {/* Republic Header */}
          <div className="flex items-start justify-between border-b-2 border-zinc-900 pb-3">
            <div className={locale === 'ar' || locale === 'derja' ? 'text-right text-xs space-y-0.5' : 'text-left text-xs space-y-0.5'}>
              <p className="font-bold uppercase tracking-wider text-xs text-zinc-950">
                {locale === 'ar' ? 'الجمهورية التونسية' : locale === 'en' ? 'Republic of Tunisia' : 'République Tunisienne'}
              </p>
              <p className="text-[11px] text-zinc-600">
                {locale === 'ar' ? 'البوابة الوطنية للإجراءات الإدارية' : locale === 'en' ? 'National Administrative Procedures Portal' : 'Portail National des Démarches Administratives'}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono">Idaara.tn · Homologation JORT 2026</p>
            </div>

            <div className="text-center px-4 py-1.5 rounded-lg border border-zinc-300 bg-zinc-50">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 block">
                {locale === 'ar' ? 'بطاقة إرشادية رسمية' : 'FICHE OFFICIELLE'}
              </span>
              <span className="text-xs font-extrabold text-emerald-800 uppercase">{procedure.vertical}</span>
            </div>

            <div className={locale === 'ar' || locale === 'derja' ? 'text-left text-xs space-y-0.5' : 'text-right text-xs space-y-0.5'}>
              <p className="font-bold text-xs text-zinc-950">
                {locale === 'ar' ? 'République Tunisienne' : 'الجمهورية التونسية'}
              </p>
              <p className="text-[11px] text-zinc-600">
                {locale === 'ar' ? "Portail de l'Administration" : 'البوابة الوطنية للإجراءات'}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono">إدارة.تونس</p>
            </div>
          </div>

          {/* Procedure Title & Meta */}
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold tracking-wider block">
                {locale === 'ar' ? 'الملف الإداري الرسمي' : 'Dossier Administratif / الملف الإداري'}
              </span>
              <h1 className="text-lg font-extrabold text-zinc-950">{title}</h1>
              <p className="text-xs text-zinc-600">
                {getLocalized(procedure.shortDescription, locale)}
              </p>
            </div>

            <div className={`shrink-0 ${locale === 'ar' || locale === 'derja' ? 'pr-4 border-r text-left' : 'pl-4 border-l text-right'} border-zinc-200`}>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                {locale === 'ar' ? 'المجموع التقديري' : locale === 'en' ? 'Estimated Total' : 'Total Estimé'}
              </span>
              <span className="text-lg font-mono font-extrabold text-emerald-700">
                {formatTND(total, locale)}
              </span>
              <span className="text-[10px] text-zinc-500 block">
                {locale === 'ar' ? `الأجل : ${getLocalized(procedure.estimatedProcessingTime, locale)}` : `Délai : ${getLocalized(procedure.estimatedProcessingTime, locale)}`}
              </span>
            </div>
          </div>

          {/* Grid: Required Documents & Costs */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* Required Documents */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1.5 border-b border-zinc-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{locale === 'ar' ? 'الوثائق والأوراق المطلوبة' : 'Pièces Requises (الأوراق المطلوبة)'}</span>
              </h3>

              <div className="space-y-2 text-xs">
                {procedure.requiredDocuments.map((doc, idx) => (
                  <div key={doc.id || idx} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex items-start gap-2">
                    <div className="w-4 h-4 rounded border border-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-zinc-900 text-xs leading-tight">{getLocalized(doc.name, locale)}</p>
                      {doc.description && (
                        <p className="text-[10px] text-zinc-500 mt-0.5">{getLocalized(doc.description, locale)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees & Stamp Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1.5 border-b border-zinc-200 flex items-center gap-1.5">
                <Stamp className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{locale === 'ar' ? 'المعاليم والتنابر الجبائية' : 'Timbres & Frais (المعاليم والتنابر)'}</span>
              </h3>

              <table className="w-full text-xs border border-zinc-200 rounded-lg overflow-hidden">
                <thead className="bg-zinc-100 text-zinc-700 font-bold">
                  <tr>
                    <th className={`p-2 ${locale === 'ar' || locale === 'derja' ? 'text-right' : 'text-left'}`}>
                      {locale === 'ar' ? 'البيان' : 'Désignation'}
                    </th>
                    <th className={`p-2 ${locale === 'ar' || locale === 'derja' ? 'text-left' : 'text-right'}`}>
                      {locale === 'ar' ? 'المبلغ' : 'Tarif'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {procedure.costsBreakdown.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 text-zinc-800">{getLocalized(item.label, locale)}</td>
                      <td className={`p-2 ${locale === 'ar' || locale === 'derja' ? 'text-left' : 'text-right'} font-mono font-bold text-zinc-950`}>
                        {item.amountTND.toFixed(3)} {locale === 'ar' ? 'د.ت' : 'DT'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-zinc-100 font-bold">
                    <td className="p-2 text-zinc-900">{locale === 'ar' ? 'المجموع الجملي' : 'Total / المجموع'}</td>
                    <td className={`p-2 ${locale === 'ar' || locale === 'derja' ? 'text-left' : 'text-right'} font-mono text-emerald-800`}>
                      {total.toFixed(3)} {locale === 'ar' ? 'د.ت' : 'DT'}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Municipal Stamp Placement Box */}
              <div className="mt-3 p-2.5 border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-700 block">
                    {locale === 'ar' ? 'موضع ختم وتأشيرة الإدارة' : 'Cadre Réservé aux Timbres'}
                  </span>
                  <span className="text-[9px] text-zinc-500">
                    {locale === 'ar' ? 'القباضة المالية / البلدية' : 'Recette des Finances / Baladiya'}
                  </span>
                </div>
                <div className="w-12 h-12 border border-zinc-400 rounded flex items-center justify-center text-[8px] text-zinc-400 text-center uppercase">
                  {locale === 'ar' ? 'الختم' : 'Cachet'}
                </div>
              </div>
            </div>

          </div>

          {/* Procedure Steps Roadmap */}
          <div className="space-y-2 pt-2 border-t border-zinc-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              {locale === 'ar' ? 'مسار الإيداع والشبابيك الإدارية' : 'Démarches & Guichets (مسار الإيداع)'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {procedure.steps.map((step) => (
                <div key={step.stepNumber} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-4 h-4 rounded-full bg-zinc-900 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <span className="font-bold text-zinc-900 truncate">{getLocalized(step.title, locale)}</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-semibold">{getLocalized(step.targetOffice, locale)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer certification */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-[10px] text-zinc-500">
            <span>
              {locale === 'ar' ? 'محرر عبر بوابة إدارة.تونس الرسمية · مطابقة للتشريع الوطني' : 'Généré par Idaara.tn — BCT & JORT Conforme'}
            </span>
            <span>
              {locale === 'ar' ? 'إمضاء المواطن : ___________________' : 'Signature du Citoyen : ___________________'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
