'use client';

import React, { useState } from 'react';
import { FileText, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { generatePDFFromElement } from '../../lib/pdf-generator';
import { triggerConfetti } from '../../lib/utils';

export const ExportInvoiceGen: React.FC = () => {
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

  return (
    <div className="glass-panel rounded-2xl p-6 border border-zinc-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Générateur de Facture d'Export Internationale (EUR / USD)</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Conforme Banque Centrale de Tunisie (BCT) avec mention d'exonération TVA à l'exportation
          </p>
        </div>

        <button
          onClick={handleDownloadInvoice}
          disabled={isGenerating}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? 'Export en cours...' : 'Télécharger Facture PDF'}</span>
        </button>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Votre Nom / Société :</label>
          <input
            type="text"
            value={freelancerName}
            onChange={(e) => setFreelancerName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Matricule / Identifiant :</label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Client Étranger :</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-zinc-400 mb-1">Prestation de Service :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Montant Net (€ EUR) :</label>
          <input
            type="number"
            value={amountEUR}
            onChange={(e) => setAmountEUR(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Visual render of invoice */}
      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 overflow-x-auto flex justify-center">
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
