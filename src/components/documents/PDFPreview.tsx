'use client';

import React, { useState } from 'react';
import { DocumentTemplate } from '../../types/document';
import { generatePDFFromElement, printElement } from '../../lib/pdf-generator';
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
    printElement('official-doc-render');
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
          className="w-[210mm] min-h-[280mm] bg-white text-zinc-900 p-8 sm:p-10 shadow-2xl flex flex-col justify-between font-serif relative"
          style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
        >
          {/* Header Republic & Timbre Box */}
          <div>
            <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-3 mb-4">
              <div className="text-left text-xs space-y-0.5">
                <p className="font-bold uppercase tracking-wider text-xs">République Tunisienne</p>
                <p className="text-[11px] text-zinc-600">Ministère de l'Intérieur</p>
                <p className="text-[11px] text-zinc-600">Conforme Code des Obligations (COC)</p>
              </div>

              {/* Fiscal Stamp Box Guideline */}
              <div className="w-20 h-20 border-2 border-dashed border-zinc-400 rounded flex flex-col items-center justify-center p-1 text-center bg-zinc-50">
                <span className="text-[8px] font-sans font-bold uppercase text-zinc-500">
                  Emplacement
                </span>
                <span className="text-[8px] font-sans font-bold text-amber-700">
                  Timbre Fiscal
                </span>
                <span className="text-[8px] font-sans text-zinc-400 mt-0.5">
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
            <div className="text-center my-4">
              <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide underline decoration-zinc-400 decoration-1 underline-offset-4">
                {template.title.fr}
              </h1>
              <h2 className="text-base font-bold mt-0.5" dir="rtl">
                {template.title.ar}
              </h2>
              <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
                Réf Juridique: {template.legalBasis}
              </p>
            </div>

            {/* Document Dynamic Body Content */}
            <div className="text-xs space-y-3 leading-relaxed text-zinc-800">
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

              {template.slug === 'reconnaissance-dette' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded space-y-3">
                    <p>
                      Je soussigné(e) (Le Débiteur) : <strong>{formData.debiteur_name || '...........................................'}</strong>, 
                      titulaire de la CIN n° <strong>{formData.debiteur_cin || '................'}</strong>,<br/>
                      Reconnais par le présent acte devoir à (Le Créancier) : <strong>{formData.creancier_name || '...........................................'}</strong>, 
                      titulaire de la CIN n° <strong>{formData.creancier_cin || '................'}</strong>.
                    </p>
                    <div className="p-3 bg-white border border-zinc-300 rounded">
                      <p className="font-bold text-base text-zinc-900">
                        Montant de la Dette : {formData.montant_chiffres ? `${formData.montant_chiffres} TND` : '.............. TND'}
                      </p>
                      <p className="text-xs text-zinc-600 italic">
                        En toutes lettres : {formData.montant_lettres || '...........................................................................'}
                      </p>
                    </div>
                    <p className="text-xs">
                      <strong>Échéance & Modalités :</strong> Remboursement intégral exigible le <strong>{formData.date_echeance || 'JJ/MM/AAAA'}</strong>. {formData.modalites_paiement || ''}
                    </p>
                    <p className="text-[10px] text-zinc-500 italic">
                      Engagement pris sous l'empire des dispositions des articles 339 et suivants du Code des Obligations et des Contrats (COC).
                    </p>
                  </div>
                </>
              )}

              {template.slug === 'declaration-perte' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded space-y-3">
                    <p>
                      Je soussigné(e) : <strong>{formData.declarant_name || '...........................................'}</strong>, 
                      titulaire du document d'identité n° <strong>{formData.declarant_cin || '................'}</strong>,<br/>
                      Demeurant à : <strong>{formData.declarant_address || '...........................................................................'}</strong>.
                    </p>
                    <p className="font-semibold text-zinc-800">
                      Déclare sur l'honneur avoir égaré le document officiel suivant :
                    </p>
                    <div className="p-3 bg-white border border-zinc-300 rounded space-y-1">
                      <p><strong>Nature du document :</strong> {formData.nature_document || '...........................................'}</p>
                      <p><strong>Numéro du document (si connu) :</strong> {formData.numero_document_perdu || 'Non spécifié'}</p>
                      <p><strong>Date approximative de la perte :</strong> {formData.date_perte || 'JJ/MM/AAAA'}</p>
                    </div>
                    {formData.circonstances_perte && (
                      <p className="text-xs italic text-zinc-600">
                        <strong>Circonstances :</strong> "{formData.circonstances_perte}"
                      </p>
                    )}
                    <p className="text-[10px] text-red-700 italic">
                      Fait pour servir et valoir ce que de droit en vue de la délivrance d'un duplicata officiel. Toute fausse déclaration expose son auteur aux peines de l'Article 173 du Code Pénal.
                    </p>
                  </div>
                </>
              )}

              {template.slug === 'attestation-hebergement' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded space-y-3">
                    <p>
                      Je soussigné(e) (L'Hébergeant) : <strong>{formData.host_name || '...........................................'}</strong>, 
                      titulaire de la CIN n° <strong>{formData.host_cin || '................'}</strong>,<br/>
                      Demeurant au logement sis à : <strong>{formData.host_address || '...........................................................................'}</strong>.
                    </p>
                    <p className="font-semibold text-zinc-800">
                      Certifie sur l'honneur héberger à mon domicile la personne suivante :
                    </p>
                    <div className="p-3 bg-white border border-zinc-300 rounded space-y-1">
                      <p><strong>Nom & Prénom de l'Invité :</strong> {formData.guest_name || '...........................................'}</p>
                      <p><strong>Nationalité :</strong> {formData.guest_nationality || '................'} | <strong>N° Passeport :</strong> {formData.guest_passport || '................'}</p>
                      <p><strong>Période du séjour :</strong> Du <strong>{formData.date_debut || 'JJ/MM/AAAA'}</strong> au <strong>{formData.date_fin || 'JJ/MM/AAAA'}</strong></p>
                    </div>
                    <p className="text-[10px] text-zinc-500 italic">
                      Attestation établie pour satisfaire aux exigences des autorités consulaires et de séjour. L'hébergeant déclare assurer la prise en charge matérielle durant la période susmentionnée.
                    </p>
                  </div>
                </>
              )}

              {template.slug === 'attestation-travail' && (
                <>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded space-y-3">
                    <div className="border-b border-zinc-300 pb-2">
                      <p className="font-bold text-zinc-900 text-sm">{formData.company_name || 'ENTREPRISE / SOCIÉTÉ'}</p>
                      <p className="text-[10px] text-zinc-500">Matricule Fiscal / RNE : {formData.matricule_fiscal || '........................'}</p>
                    </div>
                    <p>
                      Nous soussignés, <strong>{formData.company_name || 'la direction de l entreprise'}</strong>, certifions par la présente que :
                    </p>
                    <div className="p-3 bg-white border border-zinc-300 rounded space-y-1">
                      <p>Monsieur / Madame : <strong>{formData.employee_name || '...........................................'}</strong></p>
                      <p>Titulaire de la CIN n° : <strong>{formData.employee_cin || '................'}</strong></p>
                      <p>Occupe actuellement le poste de : <strong>{formData.employee_position || '...........................................'}</strong></p>
                      <p>Sous contrat de type : <strong>{formData.type_contrat || 'CDI'}</strong> depuis le <strong>{formData.date_embauche || 'JJ/MM/AAAA'}</strong>.</p>
                    </div>
                    <p className="text-xs text-zinc-600">
                      Le/la salarié(e) est libre de tout engagement envers notre entreprise à ce jour et quitte l'établissement en règle avec nos services.
                    </p>
                    <p className="text-[10px] text-zinc-500 italic">
                      Certificat délivré en application de l'Article 14 du Code du Travail tunisien pour servir et valoir ce que de droit.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Legalization & Signature Box */}
          <div className="pt-3 border-t-2 border-zinc-800 mt-4">
            {/* Signatures */}
            {['declaration-honneur', 'declaration-perte'].includes(template.slug) ? (
              <div className="max-w-xs mx-auto mb-3">
                <div className="text-center p-2.5 border border-zinc-400 rounded min-h-[65px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[10px] font-bold uppercase text-zinc-800">
                    Signature du Déclarant / إمضاء المصرح
                  </span>
                  <span className="text-[8px] text-zinc-500 italic">"Lu et approuvé - Déclaration sincère"</span>
                </div>
              </div>
            ) : template.slug === 'attestation-travail' ? (
              <div className="max-w-xs mx-auto mb-3">
                <div className="text-center p-2.5 border border-zinc-400 rounded min-h-[65px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[10px] font-bold uppercase text-zinc-800">
                    Cachet & Signature de l'Employeur / ختم وإمضاء المؤجر
                  </span>
                  <span className="text-[8px] text-zinc-500 italic">"Pour servir et valoir ce que de droit"</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 border border-zinc-400 rounded min-h-[60px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[9px] font-bold uppercase text-zinc-800">
                    {template.slug === 'contrat-location'
                      ? 'Le Bailleur (المسوغ)'
                      : template.slug === 'contrat-vente-vehicule'
                      ? 'Le Vendeur (البائع)'
                      : template.slug === 'procuration-officielle'
                      ? 'Le Mandant (الموكل)'
                      : template.slug === 'reconnaissance-dette'
                      ? 'Le Débiteur (المدين)'
                      : "L'Hébergeant (المستضيف)"}
                  </span>
                  <span className="text-[8px] text-zinc-400 italic">"Lu et approuvé"</span>
                </div>

                <div className="text-center p-2 border border-zinc-400 rounded min-h-[60px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[9px] font-bold uppercase text-zinc-800">
                    {template.slug === 'contrat-location'
                      ? 'Le Locataire (المكتري)'
                      : template.slug === 'contrat-vente-vehicule'
                      ? "L'Acquéreur (المشتري)"
                      : template.slug === 'procuration-officielle'
                      ? 'Le Mandataire (الوكيل)'
                      : template.slug === 'reconnaissance-dette'
                      ? 'Le Créancier (الدائن)'
                      : "L'Hébergé (الضيف)"}
                  </span>
                  <span className="text-[8px] text-zinc-400 italic">"Lu et approuvé"</span>
                </div>
              </div>
            )}

            {/* Baladiya Official Legalization Zone */}
            <div className="p-2 border-2 border-zinc-700 bg-zinc-50 rounded flex items-center justify-between">
              <div className="text-left text-[9px] space-y-0.5">
                <p className="font-bold text-zinc-900">CADRE RÉSERVÉ À L'OFFICIER DE L'ÉTAT CIVIL (BALADIYA)</p>
                <p className="text-zinc-600">Signature légalisée le : ...... / ...... / 2026</p>
                <p className="text-zinc-600">Par devant nous, Officier de l'État Civil de la Municipalité de .............................</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border border-zinc-400 bg-white flex items-center justify-center p-1">
                  <QrCode className="w-6 h-6 text-zinc-800" />
                </div>
                <span className="text-[7px] text-zinc-500 font-sans mt-0.5">IDAARA.TN-VERIFIED</span>
              </div>
            </div>

            <div className="text-center mt-2 text-[7px] text-zinc-400 font-sans">
              Document officiel généré via Idaara.tn · Conforme aux normes administratives de la République Tunisienne
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
