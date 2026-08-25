'use client';

import React, { useState } from 'react';
import { DocumentTemplate } from '../../types/document';
import { generatePDFFromElement } from '../../lib/pdf-generator';
import { Download, Printer, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';
import { triggerConfetti } from '../../lib/utils';
import { useLocale } from '../../context/LocaleContext';

interface PDFPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string | number>;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ template, formData }) => {
  const { locale } = useLocale();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDFFromElement('official-doc-render', `${template.slug}-idaara-tn.pdf`);
      triggerConfetti();
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const previewBannerText =
    locale === 'ar'
      ? 'معاينة متجهة عالية الدقة (جاهزة للطباعة والتوقيع)'
      : locale === 'derja'
      ? 'Aperçu HD Vectoriel (7adhra lel Imprimer)'
      : locale === 'en'
      ? 'High-Definition Vector Preview (Ready to Print & Sign)'
      : "Aperçu Vectoriel Haute Définition (Prêt à l'impression)";

  const printBtnText =
    locale === 'ar' ? 'طباعة' : locale === 'derja' ? 'Imprimer' : locale === 'en' ? 'Print' : 'Imprimer';

  const downloadBtnText =
    locale === 'ar'
      ? 'تحميل PDF'
      : locale === 'derja'
      ? 'Telechargi PDF'
      : locale === 'en'
      ? 'Download PDF'
      : 'Télécharger PDF';

  const generatingBtnText =
    locale === 'ar'
      ? 'جار الإعداد...'
      : locale === 'derja'
      ? 'Ta7dhir...'
      : locale === 'en'
      ? 'Generating...'
      : 'Génération...';

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 gap-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{previewBannerText}</span>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{printBtnText}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGenerating ? generatingBtnText : downloadBtnText}</span>
          </button>
        </div>
      </div>

      {/* The Official Document Paper Render Canvas */}
      <div className="bg-zinc-950 p-4 sm:p-8 rounded-2xl border border-zinc-800 overflow-x-auto flex justify-center">
        <div
          id="official-doc-render"
          className="w-[210mm] min-h-[297mm] bg-white text-zinc-900 p-10 sm:p-12 shadow-2xl flex flex-col justify-between font-serif relative"
          style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
        >
          {/* Header Republic & Timbre Box */}
          <div>
            <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-4 mb-6">
              <div className="text-left text-xs space-y-0.5">
                <p className="font-bold uppercase tracking-wider text-xs">République Tunisienne</p>
                <p className="text-[11px] text-zinc-600">Ministère de l'Intérieur</p>
                <p className="text-[11px] text-zinc-600">Conforme Code des Obligations (COC)</p>
              </div>

              {/* Fiscal Stamp Box Guideline */}
              <div className="w-24 h-24 border-2 border-dashed border-zinc-400 rounded flex flex-col items-center justify-center p-1 text-center bg-zinc-50">
                <span className="text-[9px] font-sans font-bold uppercase text-zinc-500">
                  Emplacement
                </span>
                <span className="text-[9px] font-sans font-bold text-amber-700">
                  Timbre Fiscal
                </span>
                <span className="text-[8px] font-sans text-zinc-400 mt-1">
                  ({template.requiredTimbreTND} DT)
                </span>
              </div>

              <div className="text-right text-xs space-y-0.5" dir="rtl">
                <p className="font-bold text-xs">الجمهورية التونسية</p>
                <p className="text-[11px] text-zinc-600">وزارة الداخلية</p>
                <p className="text-[11px] text-zinc-600">مطابق للتشريع الوطني</p>
              </div>
            </div>

            {/* Document Main Title */}
            <div className="text-center my-6">
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide underline decoration-zinc-400 decoration-1 underline-offset-4">
                {template.title.fr}
              </h1>
              <h2 className="text-lg font-bold mt-1" dir="rtl">
                {template.title.ar}
              </h2>
              <p className="text-[10px] text-zinc-500 font-sans mt-1">
                Réf Juridique: {template.legalBasis}
              </p>
            </div>

            {/* Document Dynamic Body Content */}
            <div className="text-xs space-y-5 leading-relaxed text-zinc-800">
              {template.slug === 'contrat-location' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded">
                    <p className="font-bold mb-2 uppercase text-[11px]">ENTRE LES SOUSSIGNÉS :</p>
                    <p>
                      <strong>1. Le Bailleur :</strong> {formData.bailleur_name || '...........................................'}, 
                      titulaire de la CIN n° <strong>{formData.bailleur_cin || '................'}</strong>, 
                      demeurant à {formData.bailleur_address || '...........................................'}.
                    </p>
                    <p className="mt-2">
                      <strong>2. Le Preneur (Locataire) :</strong> {formData.locataire_name || '...........................................'}, 
                      titulaire de la CIN n° <strong>{formData.locataire_cin || '................'}</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase text-[11px] mb-1">Article 1 : Objet du Contrat</h3>
                    <p>
                      Le bailleur donne en location au preneur, qui accepte, le local à usage d'habitation situé à l'adresse suivante : 
                      <strong> {formData.bien_address || '...........................................................................'}</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase text-[11px] mb-1">Article 2 : Durée & Prise d'Effet</h3>
                    <p>
                      Le présent bail est consenti pour une durée de <strong>{formData.duree_mois || '12'} mois</strong>, 
                      prenant effet à compter du <strong>{formData.date_debut || '../../....'}</strong>, renouvelable par tacite reconduction.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase text-[11px] mb-1">Article 3 : Loyer & Modalités de Paiement</h3>
                    <p>
                      La présente location est consentie moyennant un loyer mensuel de 
                      <strong> {formData.loyer_mensuel || '........'} Dinars Tunisiens (TND)</strong>, payable d'avance le 1er de chaque mois.
                      Le locataire a versé à titre de caution la somme de <strong>{formData.caution_garantie || '........'} TND</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase text-[11px] mb-1">Article 4 : Enregistrement & Légalisation</h3>
                    <p>
                      Les deux parties s'engagent à faire légaliser leurs signatures auprès des services municipaux compétents et à enregistrer le présent contrat à la Recette des Finances.
                    </p>
                  </div>
                </>
              )}

              {template.slug === 'procuration-officielle' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded">
                    <p className="font-bold mb-2 uppercase text-[11px]">DÉLÉGATION DE POUVOIR (MANDAT) :</p>
                    <p>
                      Je soussigné(e) <strong>{formData.mandant_name || '...........................................'}</strong>, 
                      titulaire de la CIN n° <strong>{formData.mandant_cin || '................'}</strong>,
                    </p>
                    <p className="mt-2">
                      Donne par la présente plein pouvoir et procuration spéciale à :<br/>
                      <strong>{formData.mandataire_name || '...........................................'}</strong>, 
                      titulaire de la CIN n° <strong>{formData.mandataire_cin || '................'}</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase text-[11px] mb-1">Objet et Étendue du Mandat :</h3>
                    <p className="p-3 bg-zinc-50 border border-zinc-200 rounded italic">
                      "{formData.objet_procuration || 'Effectuer en mon nom et pour mon compte toutes démarches administratives, signer tout document et formulaire officiel requis auprès des administrations et organismes publics.'}"
                    </p>
                  </div>
                </>
              )}

              {template.slug === 'declaration-honneur' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded">
                    <p>
                      Je soussigné(e) <strong>{formData.declarant_name || '...........................................'}</strong>, 
                      titulaire de la Carte d'Identité Nationale n° <strong>{formData.declarant_cin || '................'}</strong>,
                    </p>
                    <p className="mt-3">
                      Déclare sur l'honneur et en pleine conscience juridique :
                    </p>
                    <p className="mt-2 p-3 bg-zinc-50 border border-zinc-200 rounded italic">
                      "{formData.details_declaration || 'Déclaration sur l honneur établie pour servir et valoir ce que de droit.'}"
                    </p>
                  </div>
                </>
              )}

              {template.slug === 'contrat-vente-vehicule' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded">
                    <p>
                      <strong>Vendeur :</strong> {formData.vendeur_name || '...........................................'} (CIN: {formData.vendeur_cin || '........'})<br/>
                      <strong>Acheteur :</strong> {formData.acheteur_name || '...........................................'} (CIN: {formData.acheteur_cin || '........'})
                    </p>
                    <p className="mt-2">
                      <strong>Véhicule :</strong> {formData.marque_modele || '................'} | 
                      Immatriculation: <strong>{formData.immatriculation || '.... TU ....'}</strong> | 
                      Châssis: {formData.chassis_num || '................................'}
                    </p>
                    <p className="mt-2">
                      <strong>Prix convenu :</strong> {formData.prix_vente || '........'} Dinars Tunisiens (TND).
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Legalization & Signature Box */}
          <div className="pt-6 border-t-2 border-zinc-800 mt-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 border border-zinc-300 rounded min-h-[100px] flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase text-zinc-600">
                  Signature de la Première Partie
                </span>
                <span className="text-[9px] text-zinc-400 italic">"Lu et approuvé"</span>
              </div>

              <div className="text-center p-3 border border-zinc-300 rounded min-h-[100px] flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase text-zinc-600">
                  Signature de la Seconde Partie
                </span>
                <span className="text-[9px] text-zinc-400 italic">"Lu et approuvé"</span>
              </div>
            </div>

            {/* Baladiya Official Legalization Zone */}
            <div className="p-3 border-2 border-zinc-700 bg-zinc-50 rounded flex items-center justify-between">
              <div className="text-left text-[10px] space-y-0.5">
                <p className="font-bold text-zinc-900">CADRE RÉSERVÉ À L'OFFICIER DE L'ÉTAT CIVIL (BALADIYA)</p>
                <p className="text-zinc-600">Signature légalisée le : ...... / ...... / 2026</p>
                <p className="text-zinc-600">Par devant nous, Officier de l'État Civil de la Municipalité de .............................</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border border-zinc-400 bg-white flex items-center justify-center p-1">
                  <QrCode className="w-8 h-8 text-zinc-800" />
                </div>
                <span className="text-[8px] text-zinc-500 font-sans mt-0.5">IDAARA.TN-VERIFIED</span>
              </div>
            </div>

            <div className="text-center mt-3 text-[8px] text-zinc-400 font-sans">
              Document généré électroniquement via la plateforme souveraine Idaara.tn · Conforme aux normes administratives
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
