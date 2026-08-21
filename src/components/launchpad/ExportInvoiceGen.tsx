'use client';

import React, { useState } from 'react';
import { FileText, Download, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';
import { generatePDFFromElement } from '../../lib/pdf-generator';
import { triggerConfetti } from '../../lib/utils';
import { useLocale } from '../../context/LocaleContext';

export const ExportInvoiceGen: React.FC = () => {
  const { locale } = useLocale();
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [clientName, setClientName] = useState('Acme Corp SAS (Paris, France)');
  const [description, setDescription] = useState('Fullstack Software Engineering & AI Integration Services');
  const [amountEUR, setAmountEUR] = useState(2500);
  const [freelancerName, setFreelancerName] = useState('Yassine Ben Salem');
  const [matricule, setMatricule] = useState('AE-TN-2026-8890');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadInvoice = async () => {
    setIsGenerating(true);
    try {
      await generatePDFFromElement('export-invoice-render', `Facture-Export-${invoiceNumber}.pdf`);
      triggerConfetti();
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const title =
    locale === 'ar'
      ? 'استخراج فاتورة تصدير دولية (EUR / USD)'
      : locale === 'en'
      ? 'International FX Export Invoice Generator'
      : "Générateur de Facture d'Export Internationale (EUR / USD)";

  const subtitle =
    locale === 'ar'
      ? 'مطابقة لمواصفات بنك تونس المركزي (BCT) مع التنصيص على الإعفاء من الأداء على القيمة المضافة (TVA)'
      : locale === 'en'
      ? 'Compliant with Central Bank of Tunisia (BCT) foreign exchange rules with mandatory 0% VAT export exemption clause'
      : "Conforme Banque Centrale de Tunisie (BCT) avec mention d'exonération TVA à l'exportation";

  const btnText =
    isGenerating
      ? (locale === 'en' ? 'Generating...' : 'Export en cours...')
      : (locale === 'ar' ? 'تحميل الفاتورة PDF' : locale === 'en' ? 'Download Vector PDF' : 'Télécharger Facture PDF');

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-all cursor-pointer border border-zinc-700"
            title="Imprimer la facture"
          >
            <span>{locale === 'ar' ? 'طباعة' : locale === 'en' ? 'Print' : 'Imprimer'}</span>
          </button>

          <button
            onClick={handleDownloadInvoice}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-40"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{btnText}</span>
          </button>
        </div>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            {locale === 'en' ? 'Your Full Name / Entity:' : 'Votre Nom / Société :'}
          </label>
          <input
            type="text"
            value={freelancerName}
            onChange={(e) => setFreelancerName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            {locale === 'en' ? 'National Tax ID / Matricule:' : 'Matricule / Identifiant :'}
          </label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            {locale === 'en' ? 'Foreign Client & Country:' : 'Client Étranger :'}
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            {locale === 'en' ? 'Service Description:' : 'Prestation de Service :'}
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            {locale === 'en' ? 'Net Amount (€ EUR):' : 'Montant Net (€ EUR) :'}
          </label>
          <input
            type="number"
            value={amountEUR}
            onChange={(e) => setAmountEUR(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Visual render of invoice */}
      <div className="bg-zinc-950 p-4 sm:p-6 rounded-2xl border border-zinc-800 overflow-x-auto flex justify-center">
        <div
          id="export-invoice-render"
          className="w-[180mm] min-h-[220mm] bg-white text-zinc-900 p-8 shadow-xl flex flex-col justify-between font-sans text-xs"
        >
          <div>
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4 mb-4">
              <div>
                <h2 className="font-extrabold text-base text-zinc-900 uppercase tracking-tight">
                  {freelancerName}
                </h2>
                <p className="text-[11px] text-zinc-500">Tunis, République Tunisienne</p>
                <p className="text-[11px] text-zinc-500">Identifiant National: {matricule}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 block">
                  FACTURE D'EXPORTATION
                </span>
                <p className="font-mono text-xs text-zinc-700">{invoiceNumber}</p>
                <p className="text-[10px] text-zinc-400">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 rounded mb-6 border border-zinc-200">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                FACTURÉ À (CLIENT INTERNATIONAL) :
              </span>
              <p className="font-bold text-zinc-800">{clientName}</p>
            </div>

            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="border-b-2 border-zinc-800 text-[10px] uppercase text-zinc-500">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">TVA</th>
                  <th className="py-2 text-right">Total (€ EUR)</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-zinc-200">
                  <td className="py-3 font-medium text-zinc-800">{description}</td>
                  <td className="py-3 text-right text-zinc-500">0% (Export)</td>
                  <td className="py-3 text-right font-bold text-zinc-900">
                    {amountEUR.toLocaleString()} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200">
            <div className="flex justify-between items-center bg-zinc-50 p-3 rounded font-bold">
              <span className="text-zinc-700">NET À PAYER :</span>
              <span className="text-base text-emerald-700">{amountEUR.toLocaleString()} € EUR</span>
            </div>

            <div className="text-[9px] text-zinc-500 leading-relaxed bg-zinc-100 p-2.5 rounded border border-zinc-200">
              <strong>Mention légale fiscale obligatoire :</strong> Facture établie hors taxes conformément aux dispositions de l'article 11 du Code de la TVA tunisien (Exportation de services). Rapatriement de devises soumis à la réglementation de la Banque Centrale de Tunisie (BCT).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
