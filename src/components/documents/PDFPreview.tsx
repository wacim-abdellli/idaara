'use client';

import React, { useState, useEffect } from 'react';
import { DocumentTemplate } from '../../types/document';
import { generatePDFFromElement, printElement } from '../../lib/pdf-generator';
import { Download, Printer, ShieldCheck, QrCode, Globe2 } from 'lucide-react';
import { triggerConfetti } from '../../lib/utils';
import { useLocale } from '../../context/LocaleContext';

interface PDFPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string | number>;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ template, formData }) => {
  const { locale } = useLocale();
  const [docLang, setDocLang] = useState<'ar' | 'fr' | 'en' | 'derja'>(locale);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setDocLang(locale);
  }, [locale]);

  const isRtl = docLang === 'ar' || docLang === 'derja';

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDFFromElement('official-doc-render', `${template.slug}-${docLang}-idaara-tn.pdf`);
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
    docLang === 'ar'
      ? 'معاينة وثيقة رسمية متجهة عالية الدقة (جاهزة للطباعة والتعريف بالإمضاء)'
      : docLang === 'derja'
      ? 'Aperçu HD Vectoriel (7adhra lel Imprimer w Ta3rif bel Imdha2)'
      : docLang === 'en'
      ? 'High-Definition Vector Preview (Ready to Print & Legalize)'
      : "Aperçu Vectoriel Haute Définition (Prêt à l'impression & légalisation)";

  const printBtnText =
    docLang === 'ar' ? 'طباعة' : docLang === 'derja' ? 'Imprimer' : docLang === 'en' ? 'Print' : 'Imprimer';

  const downloadBtnText =
    docLang === 'ar'
      ? 'تحميل PDF'
      : docLang === 'derja'
      ? 'Telechargi PDF'
      : docLang === 'en'
      ? 'Download PDF'
      : 'Télécharger PDF';

  const generatingBtnText =
    docLang === 'ar'
      ? 'جار الإعداد...'
      : docLang === 'derja'
      ? 'Ta7dhir...'
      : docLang === 'en'
      ? 'Generating...'
      : 'Génération...';

  const docTitle =
    docLang === 'ar'
      ? template.title.ar
      : docLang === 'derja'
      ? template.title.derja
      : docLang === 'en'
      ? template.title.en
      : template.title.fr;

  const subtitleSecondLang = docLang === 'ar' ? template.title.fr : template.title.ar;

  return (
    <div className="space-y-4">
      {/* Top Action Bar with Language Switcher */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0d0f14] border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-zinc-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">{previewBannerText}</span>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer border border-zinc-700 hover:scale-[1.02] shadow-sm"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span>{printBtnText}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.03] cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? generatingBtnText : downloadBtnText}</span>
            </button>
          </div>
        </div>

        {/* Language Tabs Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-0.5">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {docLang === 'ar'
                ? 'لغة الوثيقة الرسمية المستخرجة :'
                : docLang === 'en'
                ? 'Official Document Language:'
                : 'Langue du document officiel :'}
            </span>
          </span>

          <div className="inline-flex p-1 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setDocLang('ar')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                docLang === 'ar'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🇹🇳 العربية
            </button>
            <button
              type="button"
              onClick={() => setDocLang('fr')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                docLang === 'fr'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🇫🇷 Français
            </button>
            <button
              type="button"
              onClick={() => setDocLang('en')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                docLang === 'en'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setDocLang('derja')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                docLang === 'derja'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🇹🇳 Derja
            </button>
          </div>
        </div>
      </div>

      {/* The Official Document Paper Render Canvas */}
      <div className="bg-[#08090c] p-3 sm:p-6 rounded-3xl border border-white/[0.06] overflow-x-auto flex flex-col items-center shadow-inner relative">
        <div className="self-end mb-2 text-[10px] font-mono text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
          A4 · 210 × 297 mm · 300 DPI
        </div>

        <div
          id="official-doc-render"
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`w-[210mm] min-h-[280mm] bg-white text-zinc-900 p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative rounded-sm border border-zinc-200 ${
            isRtl ? 'font-sans text-right' : 'font-serif text-left'
          }`}
          style={{ fontFamily: isRtl ? 'Cairo, "Noto Sans Arabic", Tahoma, sans-serif' : 'Times New Roman, Georgia, serif' }}
        >
          {/* Header Republic & Timbre Box */}
          <div>
            <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-3 mb-4">
              <div className={isRtl ? 'text-right space-y-0.5' : 'text-left space-y-0.5'}>
                <p className="font-bold uppercase tracking-wider text-xs">
                  {isRtl ? 'الجمهورية التونسية' : docLang === 'en' ? 'Republic of Tunisia' : 'République Tunisienne'}
                </p>
                <p className="text-[11px] text-zinc-600">
                  {isRtl ? 'وزارة الداخلية' : docLang === 'en' ? 'Ministry of Interior' : "Ministère de l'Intérieur"}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {isRtl ? 'مطابق للتشريع الوطني (م.ا.ع)' : docLang === 'en' ? 'Compliant with Tunisian Code of Obligations' : 'Conforme Code des Obligations (COC)'}
                </p>
              </div>

              {/* Fiscal Stamp Box Guideline */}
              <div className="w-20 h-20 border-2 border-dashed border-zinc-400 rounded flex flex-col items-center justify-center p-1 text-center bg-zinc-50 shrink-0 mx-2">
                <span className="text-[8px] font-sans font-bold uppercase text-zinc-500">
                  {isRtl ? 'موضع' : docLang === 'en' ? 'Stamp' : 'Emplacement'}
                </span>
                <span className="text-[8px] font-sans font-bold text-amber-700">
                  {isRtl ? 'التنبر الجبائي' : docLang === 'en' ? 'Fiscal Stamp' : 'Timbre Fiscal'}
                </span>
                <span className="text-[8px] font-sans text-zinc-500 mt-0.5 font-bold">
                  ({template.requiredTimbreTND} {isRtl ? 'د.ت' : 'DT'})
                </span>
              </div>

              <div className={isRtl ? 'text-left space-y-0.5' : 'text-right space-y-0.5'}>
                <p className="font-bold text-xs uppercase">
                  {isRtl ? 'République Tunisienne' : 'الجمهورية التونسية'}
                </p>
                <p className="text-[11px] text-zinc-600">
                  {isRtl ? "Ministère de l'Intérieur" : 'وزارة الداخلية'}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {isRtl ? 'Homologation Idaara.tn' : 'إدارة.تونس'}
                </p>
              </div>
            </div>

            {/* Document Main Title */}
            <div className="text-center my-4">
              <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide underline decoration-zinc-400 decoration-1 underline-offset-4">
                {docTitle}
              </h1>
              <h2 className="text-sm font-bold text-zinc-600 mt-0.5">
                {subtitleSecondLang}
              </h2>
              <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
                {isRtl ? `المرجع القانوني: ${template.legalBasis}` : `Réf Juridique: ${template.legalBasis}`}
              </p>
            </div>

            {/* Document Dynamic Body Content */}
            <div className="text-xs space-y-3 leading-relaxed text-zinc-800">
              
              {/* 1. CONTRAT DE LOCATION */}
              {template.slug === 'contrat-location' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p className="font-bold uppercase text-[11px] text-zinc-900">بين الممضيين أسفله :</p>
                      <p>
                        <strong>1. الطرف الأول (المسوّغ / صاحب العقار) :</strong> {formData.bailleur_name || '...........................................'}، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.bailleur_cin || '................'}</strong>، 
                        والقاطن بـ {formData.bailleur_address || '...........................................'}.
                      </p>
                      <p>
                        <strong>2. الطرف الثاني (المكتري / المسوّغ له) :</strong> {formData.locataire_name || '...........................................'}، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.locataire_cin || '................'}</strong>.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">الفصل الأول : موضوع الكراء</h3>
                      <p>سوغ الطرف الأول للطرف الثاني المحل السكني الكائن بـ : <strong>{formData.bien_address || '...........................................................................'}</strong>.</p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">الفصل الثاني : المدة وسريان العقد</h3>
                      <p>حُددت مدة هذا العقد بـ <strong>{formData.duree_mois || '12'} شهراً</strong>، ابتداءً من تاريخ <strong>{formData.date_debut || '../../....'}</strong>، قابلة للتجديد باتفاق الطرفين.</p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">الفصل الثالث : معين الكراء والضمان</h3>
                      <p>تم الاتفاق على معين كراء شهري قدره <strong>{formData.loyer_mensuel || '........'} دينار تونسي</strong>، يدفع مسبقاً في بداية كل شهر. كما سدد المكتري مبلغ <strong>{formData.caution_garantie || '........'} دينار</strong> كضمان مسترجع عند انتهاء العلاقة الكرائية وتسليم المحل بحالته.</p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">الفصل الرابع : التعريف بالإمضاء والتسجيل</h3>
                      <p>يلتزم الطرفان بالتعريف بإمضائهما لدى مصالح البلدية وتسجيل هذا العقد وجوباً بالقباضة المالية في الآجال القانونية.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p className="font-bold uppercase text-[11px] text-zinc-900">ENTRE LES SOUSSIGNÉS :</p>
                      <p>
                        <strong>1. Le Bailleur :</strong> {formData.bailleur_name || '...........................................'}, 
                        titulaire de la CIN n° <strong>{formData.bailleur_cin || '................'}</strong>, 
                        demeurant à {formData.bailleur_address || '...........................................'}.
                      </p>
                      <p>
                        <strong>2. Le Preneur (Locataire) :</strong> {formData.locataire_name || '...........................................'}, 
                        titulaire de la CIN n° <strong>{formData.locataire_cin || '................'}</strong>.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">Article 1 : Objet du Contrat</h3>
                      <p>Le bailleur donne en location au preneur, qui accepte, le local à usage d'habitation situé à : <strong>{formData.bien_address || '...........................................................................'}</strong>.</p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">Article 2 : Durée & Prise d'Effet</h3>
                      <p>Le présent bail est consenti pour une durée de <strong>{formData.duree_mois || '12'} mois</strong>, prenant effet à compter du <strong>{formData.date_debut || '../../....'}</strong>, renouvelable d'accord exprès.</p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">Article 3 : Loyer & Caution</h3>
                      <p>Location consentie moyennant un loyer mensuel de <strong>{formData.loyer_mensuel || '........'} Dinars Tunisiens (TND)</strong>. Le locataire a versé à titre de caution la somme de <strong>{formData.caution_garantie || '........'} TND</strong>.</p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-0.5 text-zinc-900">Article 4 : Enregistrement & Légalisation</h3>
                      <p>Les parties s'engagent à faire légaliser leurs signatures auprès de la Municipalité et à enregistrer le présent acte à la Recette des Finances.</p>
                    </div>
                  </>
                )
              )}

              {/* 2. PROCURATION OFFICIELLE */}
              {template.slug === 'procuration-officielle' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p className="font-bold uppercase text-[11px] text-zinc-900">تفويض وتوكيل رسمي (إنابة) :</p>
                      <p>
                        إني الممضي أسفله (الموكّل) : <strong>{formData.mandant_name || '...........................................'}</strong>، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.mandant_cin || '................'}</strong>،
                      </p>
                      <p>
                        أفوض وأوكل بمقتضى هذا التوكيل السيد(ة) (الوكيل) :<br/>
                        <strong>{formData.mandataire_name || '...........................................'}</strong>، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.mandataire_cin || '................'}</strong>.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-1 text-zinc-900">موضوع التوكيل والصلاحيات الممنوحة :</h3>
                      <p className="p-3 bg-white border border-zinc-300 rounded italic text-zinc-900 leading-relaxed">
                        "{formData.objet_procuration || 'القيام مقامي وباسمي في كافة الإجراءات الإدارية وتوقيع جميع الوثائق والاستمارات الرسمية وسحب المستخرجات لدى المصالح والإدارات العمومية والخاصة.'}"
                      </p>
                    </div>
                    <p className="text-[10px] text-zinc-500">
                      يظل هذا التوكيل ساري المفعول ما لم يتم إلغاؤه كتابياً وبصفة رسمية طبقاً لمجلة الالتزامات والعقود.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p className="font-bold uppercase text-[11px] text-zinc-900">DÉLÉGATION DE POUVOIR (MANDAT) :</p>
                      <p>
                        Je soussigné(e) (Le Mandant) : <strong>{formData.mandant_name || '...........................................'}</strong>, 
                        titulaire de la CIN n° <strong>{formData.mandant_cin || '................'}</strong>,
                      </p>
                      <p>
                        Donne par la présente plein pouvoir et procuration spéciale à (Le Mandataire) :<br/>
                        <strong>{formData.mandataire_name || '...........................................'}</strong>, 
                        titulaire de la CIN n° <strong>{formData.mandataire_cin || '................'}</strong>.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-[11px] mb-1 text-zinc-900">Objet et Étendue du Mandat :</h3>
                      <p className="p-3 bg-white border border-zinc-300 rounded italic text-zinc-900">
                        "{formData.objet_procuration || 'Effectuer en mon nom et pour mon compte toutes démarches administratives, signer tout document et formulaire officiel requis auprès des administrations et organismes publics.'}"
                      </p>
                    </div>
                  </>
                )
              )}

              {/* 3. DÉCLARATION SUR L'HONNEUR */}
              {template.slug === 'declaration-honneur' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        إني الممضي أسفله : <strong>{formData.declarant_name || '...........................................'}</strong>، 
                        حامل بطاقة التعريف الوطنية عدد <strong>{formData.declarant_cin || '................'}</strong>،
                      </p>
                      <p className="font-bold text-zinc-900 pt-1">
                        أصرح بشرفي وبكامل وعيي ومسؤوليتي القانونية بما يلي :
                      </p>
                      <div className="p-3 bg-white border border-zinc-300 rounded italic text-zinc-900 leading-relaxed">
                        "{formData.details_declaration || 'أصرح بشرفي بصحة البيانات المذكورة أعلاه للإدلاء بها لدى المصالح المعنية لكل ما يقتضيه القانون.'}"
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500">
                      حُرر هذا التصريح عن حسن نية للإدلاء به لدى الإدارة المعنية طبقاً للتشاريع الجاري بها العمل.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        Je soussigné(e) : <strong>{formData.declarant_name || '...........................................'}</strong>, 
                        titulaire de la Carte d'Identité Nationale n° <strong>{formData.declarant_cin || '................'}</strong>,
                      </p>
                      <p className="font-bold text-zinc-900 pt-1">
                        Déclare sur l'honneur et en pleine conscience juridique :
                      </p>
                      <div className="p-3 bg-white border border-zinc-300 rounded italic text-zinc-900 leading-relaxed">
                        "{formData.details_declaration || 'Déclaration sur l honneur établie pour servir et valoir ce que de droit.'}"
                      </div>
                    </div>
                  </>
                )
              )}

              {/* 4. CONTRAT DE VENTE DE VÉHICULE */}
              {template.slug === 'contrat-vente-vehicule' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        <strong>الطرف الأول (البائع) :</strong> {formData.vendeur_name || '...........................................'} (ب.ت.و: {formData.vendeur_cin || '........'})<br/>
                        <strong>الطرف الثاني (المشتري) :</strong> {formData.acheteur_name || '...........................................'} (ب.ت.و: {formData.acheteur_cin || '........'})
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded">
                        <p>
                          <strong>بيانات العربة :</strong> {formData.marque_modele || '................'} | 
                          رقم التسجيل: <strong>{formData.immatriculation || '.... تونس ....'}</strong> | 
                          رقم الهيكل: {formData.chassis_num || '................................'}
                        </p>
                        <p className="mt-1 font-bold text-emerald-800">
                          الثمن المتفق عليه : {formData.prix_vente || '........'} دينار تونسي (TND) خالص ومقبوض.
                        </p>
                      </div>
                      <p className="text-[11px] text-zinc-700">
                        يسلم البائع العربة مع وثائقها الرسمية ويتعهد المشتري بإتمام إجراءات نقل الملكية (البطاقة الرمادية) بالوكالة الفنية للنقل البري (ATTT).
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        <strong>Vendeur :</strong> {formData.vendeur_name || '...........................................'} (CIN: {formData.vendeur_cin || '........'})<br/>
                        <strong>Acheteur :</strong> {formData.acheteur_name || '...........................................'} (CIN: {formData.acheteur_cin || '........'})
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded">
                        <p>
                          <strong>Véhicule :</strong> {formData.marque_modele || '................'} | 
                          Immatriculation: <strong>{formData.immatriculation || '.... TU ....'}</strong> | 
                          Châssis: {formData.chassis_num || '................................'}
                        </p>
                        <p className="mt-1 font-bold text-emerald-800">
                          Prix convenu : {formData.prix_vente || '........'} Dinars Tunisiens (TND) payé intégralement.
                        </p>
                      </div>
                      <p className="text-[11px] text-zinc-700">
                        Le vendeur cède le véhicule en l'état et l'acquéreur s'engage à effectuer la mutation auprès de l'ATTT.
                      </p>
                    </div>
                  </>
                )
              )}

              {/* 5. RECONNAISSANCE DE DETTE */}
              {template.slug === 'reconnaissance-dette' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        إني الممضي أسفله (المدين) : <strong>{formData.debiteur_name || '...........................................'}</strong>، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.debiteur_cin || '................'}</strong>،<br/>
                        أقر وأعترف بموجب هذا السند بأنني مدين للسيد(ة) (الدائن) : <strong>{formData.creancier_name || '...........................................'}</strong>، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.creancier_cin || '................'}</strong>.
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded">
                        <p className="font-bold text-sm text-zinc-900">
                          مبلغ الدين : {formData.montant_chiffres ? `${formData.montant_chiffres} د.ت` : '.............. د.ت'}
                        </p>
                        <p className="text-[11px] text-zinc-600 italic">
                          لسان القلم : {formData.montant_lettres || '...........................................................................'}
                        </p>
                      </div>
                      <p className="text-[11px]">
                        <strong>أجل الوفاء والالتزام :</strong> يتعهد المدين بخلاص كامل المبلغ المذكور في أجل أقصاه <strong>{formData.date_echeance || 'يوم/شهر/سنة'}</strong>. {formData.modalites_paiement || ''}
                      </p>
                      <p className="text-[10px] text-zinc-500 italic">
                        التزام صادر طبقاً لأحكام الفصول 339 وما بعدها من مجلة الالتزامات والعقود (م.ا.ع).
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        Je soussigné(e) (Le Débiteur) : <strong>{formData.debiteur_name || '...........................................'}</strong>, 
                        titulaire de la CIN n° <strong>{formData.debiteur_cin || '................'}</strong>,<br/>
                        Reconnais par le présent acte devoir à (Le Créancier) : <strong>{formData.creancier_name || '...........................................'}</strong>, 
                        titulaire de la CIN n° <strong>{formData.creancier_cin || '................'}</strong>.
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded">
                        <p className="font-bold text-sm text-zinc-900">
                          Montant de la Dette : {formData.montant_chiffres ? `${formData.montant_chiffres} TND` : '.............. TND'}
                        </p>
                        <p className="text-[11px] text-zinc-600 italic">
                          En toutes lettres : {formData.montant_lettres || '...........................................................................'}
                        </p>
                      </div>
                      <p className="text-[11px]">
                        <strong>Échéance :</strong> Remboursement intégral exigible le <strong>{formData.date_echeance || 'JJ/MM/AAAA'}</strong>. {formData.modalites_paiement || ''}
                      </p>
                      <p className="text-[10px] text-zinc-500 italic">
                        Engagement pris sous l'empire des dispositions des articles 339 et suivants du Code des Obligations et des Contrats (COC).
                      </p>
                    </div>
                  </>
                )
              )}

              {/* 6. DÉCLARATION DE PERTE */}
              {template.slug === 'declaration-perte' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        إني الممضي أسفله : <strong>{formData.declarant_name || '...........................................'}</strong>، 
                        حامل وثيقة هوية عدد <strong>{formData.declarant_cin || '................'}</strong>،<br/>
                        القاطن بـ : <strong>{formData.declarant_address || '...........................................................................'}</strong>.
                      </p>
                      <p className="font-bold text-zinc-900">
                        أصرح بشرفي بضياع الوثيقة الرسمية التالية :
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded space-y-1">
                        <p><strong>طبيعة الوثيقة :</strong> {formData.nature_document || '...........................................'}</p>
                        <p><strong>رقم الوثيقة (إن وجد) :</strong> {formData.numero_document_perdu || 'غير محدد'}</p>
                        <p><strong>تاريخ الضياع التقريبي :</strong> {formData.date_perte || 'يوم/شهر/سنة'}</p>
                      </div>
                      {formData.circonstances_perte && (
                        <p className="text-[11px] italic text-zinc-700">
                          <strong>ظروف الضياع :</strong> "{formData.circonstances_perte}"
                        </p>
                      )}
                      <p className="text-[10px] text-red-700 italic">
                        حُرر هذا التصريح لطلب نظير رسمي. وكل تصريح كاذب يعرض صاحبه للعقوبات المنصوص عليها بالفصل 173 من المجلة الجزائية.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        Je soussigné(e) : <strong>{formData.declarant_name || '...........................................'}</strong>, 
                        titulaire de la pièce d'identité n° <strong>{formData.declarant_cin || '................'}</strong>,<br/>
                        Demeurant à : <strong>{formData.declarant_address || '...........................................................................'}</strong>.
                      </p>
                      <p className="font-bold text-zinc-900">
                        Déclare sur l'honneur avoir égaré le document officiel suivant :
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded space-y-1">
                        <p><strong>Nature du document :</strong> {formData.nature_document || '...........................................'}</p>
                        <p><strong>Numéro (si connu) :</strong> {formData.numero_document_perdu || 'Non spécifié'}</p>
                        <p><strong>Date approximative :</strong> {formData.date_perte || 'JJ/MM/AAAA'}</p>
                      </div>
                      {formData.circonstances_perte && (
                        <p className="text-[11px] italic text-zinc-700">
                          <strong>Circonstances :</strong> "{formData.circonstances_perte}"
                        </p>
                      )}
                      <p className="text-[10px] text-red-700 italic">
                        Fait pour servir et valoir ce que de droit. Toute fausse déclaration expose son auteur aux peines de l'Article 173 du Code Pénal.
                      </p>
                    </div>
                  </>
                )
              )}

              {/* 7. ATTESTATION D'HÉBERGEMENT */}
              {template.slug === 'attestation-hebergement' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        إني الممضي أسفله (المستضيف) : <strong>{formData.host_name || '...........................................'}</strong>، 
                        حامل بطاقة تعريف وطنية عدد <strong>{formData.host_cin || '................'}</strong>،<br/>
                        القاطن بالعنوان التالي : <strong>{formData.host_address || '...........................................................................'}</strong>.
                      </p>
                      <p className="font-bold text-zinc-900">
                        أشهد وأصرح بشرفي بإيواء واستضافة الشخص المذكور أدناه بمحلي :
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded space-y-1">
                        <p><strong>الاسم واللقب (الضيف) :</strong> {formData.guest_name || '...........................................'}</p>
                        <p><strong>الجنسية :</strong> {formData.guest_nationality || '................'} | <strong>رقم جواز السفر :</strong> {formData.guest_passport || '................'}</p>
                        <p><strong>فترة الإقامة :</strong> من <strong>{formData.date_debut || 'يوم/شهر/سنة'}</strong> إلى <strong>{formData.date_fin || 'يوم/شهر/سنة'}</strong></p>
                      </div>
                      <p className="text-[10px] text-zinc-500 italic">
                        شهادة محررة للإدلاء بها لدى المصالح القنصلية والإدارية المختصة لملفات التأشيرة والإقامة.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <p>
                        Je soussigné(e) (L'Hébergeant) : <strong>{formData.host_name || '...........................................'}</strong>, 
                        titulaire de la CIN n° <strong>{formData.host_cin || '................'}</strong>,<br/>
                        Demeurant au logement sis à : <strong>{formData.host_address || '...........................................................................'}</strong>.
                      </p>
                      <p className="font-bold text-zinc-900">
                        Certifie sur l'honneur héberger à mon domicile la personne suivante :
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded space-y-1">
                        <p><strong>Nom de l'Invité :</strong> {formData.guest_name || '...........................................'}</p>
                        <p><strong>Nationalité :</strong> {formData.guest_nationality || '................'} | <strong>N° Passeport :</strong> {formData.guest_passport || '................'}</p>
                        <p><strong>Période du séjour :</strong> Du <strong>{formData.date_debut || 'JJ/MM/AAAA'}</strong> au <strong>{formData.date_fin || 'JJ/MM/AAAA'}</strong></p>
                      </div>
                      <p className="text-[10px] text-zinc-500 italic">
                        Attestation établie pour satisfaire aux exigences des autorités consulaires et de séjour.
                      </p>
                    </div>
                  </>
                )
              )}

              {/* 8. ATTESTATION DE TRAVAIL */}
              {template.slug === 'attestation-travail' && (
                isRtl ? (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <div className="border-b border-zinc-300 pb-1.5">
                        <p className="font-bold text-zinc-900 text-sm">{formData.company_name || 'المؤسسة / الشركة'}</p>
                        <p className="text-[10px] text-zinc-500">المعرف الجبائي / السجل الوطني للمؤسسات : {formData.matricule_fiscal || '........................'}</p>
                      </div>
                      <p>
                        تشهد إدارة <strong>{formData.company_name || 'المؤسسة'}</strong> بأن :
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded space-y-1">
                        <p>السيد(ة) : <strong>{formData.employee_name || '...........................................'}</strong></p>
                        <p>حامل(ة) لبطاقة تعريف وطنية عدد : <strong>{formData.employee_cin || '................'}</strong></p>
                        <p>يشغل / اشتغل لدينا خطة : <strong>{formData.employee_position || '...........................................'}</strong></p>
                        <p>بموجب عقد عمل : <strong>{formData.type_contrat || 'CDI'}</strong> ابتداءً من تاريخ <strong>{formData.date_embauche || 'يوم/شهر/سنة'}</strong>.</p>
                      </div>
                      <p className="text-[11px] text-zinc-700">
                        سُلمت هذه الشهادة للمعني(ة) بالأمر للإدلاء بها في حدود ما يسمح به القانون وطبقاً لأحكام الفصل 14 من مجلة الشغل التونسية.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded space-y-2">
                      <div className="border-b border-zinc-300 pb-1.5">
                        <p className="font-bold text-zinc-900 text-sm">{formData.company_name || 'ENTREPRISE / SOCIÉTÉ'}</p>
                        <p className="text-[10px] text-zinc-500">Matricule Fiscal / RNE : {formData.matricule_fiscal || '........................'}</p>
                      </div>
                      <p>
                        Nous soussignés, <strong>{formData.company_name || 'la direction de l entreprise'}</strong>, certifions que :
                      </p>
                      <div className="p-2.5 bg-white border border-zinc-300 rounded space-y-1">
                        <p>Monsieur / Madame : <strong>{formData.employee_name || '...........................................'}</strong></p>
                        <p>Titulaire de la CIN n° : <strong>{formData.employee_cin || '................'}</strong></p>
                        <p>Occupe actuellement le poste de : <strong>{formData.employee_position || '...........................................'}</strong></p>
                        <p>Sous contrat : <strong>{formData.type_contrat || 'CDI'}</strong> depuis le <strong>{formData.date_embauche || 'JJ/MM/AAAA'}</strong>.</p>
                      </div>
                      <p className="text-[11px] text-zinc-700">
                        Certificat délivré en application de l'Article 14 du Code du Travail tunisien pour servir et valoir ce que de droit.
                      </p>
                    </div>
                  </>
                )
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
                    {isRtl ? 'إمضاء المصرح / Signature du Déclarant' : 'Signature du Déclarant'}
                  </span>
                  <span className="text-[8px] text-zinc-500 italic">
                    {isRtl ? '"اطلعت عليه وصادقت - تصريح صحيح"' : '"Lu et approuvé - Déclaration sincère"'}
                  </span>
                </div>
              </div>
            ) : template.slug === 'attestation-travail' ? (
              <div className="max-w-xs mx-auto mb-3">
                <div className="text-center p-2.5 border border-zinc-400 rounded min-h-[65px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[10px] font-bold uppercase text-zinc-800">
                    {isRtl ? 'ختم وإمضاء المؤجر / Cachet Employeur' : "Cachet & Signature de l'Employeur"}
                  </span>
                  <span className="text-[8px] text-zinc-500 italic">
                    {isRtl ? '"للإدلاء به في حدود ما يسمح به القانون"' : '"Pour servir et valoir ce que de droit"'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 border border-zinc-400 rounded min-h-[60px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[9px] font-bold uppercase text-zinc-800">
                    {template.slug === 'contrat-location'
                      ? isRtl ? 'الطرف الأول (المسوّغ)' : 'Le Bailleur'
                      : template.slug === 'contrat-vente-vehicule'
                      ? isRtl ? 'الطرف الأول (البائع)' : 'Le Vendeur'
                      : template.slug === 'procuration-officielle'
                      ? isRtl ? 'الموكّل (Le Mandant)' : 'Le Mandant'
                      : template.slug === 'reconnaissance-dette'
                      ? isRtl ? 'المدين (Le Débiteur)' : 'Le Débiteur'
                      : isRtl ? 'المستضيف (L\'Hébergeant)' : "L'Hébergeant"}
                  </span>
                  <span className="text-[8px] text-zinc-400 italic">
                    {isRtl ? '"اطلعت ووافقت"' : '"Lu et approuvé"'}
                  </span>
                </div>

                <div className="text-center p-2 border border-zinc-400 rounded min-h-[60px] flex flex-col justify-between bg-zinc-50/50">
                  <span className="text-[9px] font-bold uppercase text-zinc-800">
                    {template.slug === 'contrat-location'
                      ? isRtl ? 'الطرف الثاني (المكتري)' : 'Le Locataire'
                      : template.slug === 'contrat-vente-vehicule'
                      ? isRtl ? 'الطرف الثاني (المشتري)' : "L'Acquéreur"
                      : template.slug === 'procuration-officielle'
                      ? isRtl ? 'الوكيل (Le Mandataire)' : 'Le Mandataire'
                      : template.slug === 'reconnaissance-dette'
                      ? isRtl ? 'الدائن (Le Créancier)' : 'Le Créancier'
                      : isRtl ? 'الضيف (L\'Hébergé)' : "L'Hébergé"}
                  </span>
                  <span className="text-[8px] text-zinc-400 italic">
                    {isRtl ? '"اطلعت ووافقت"' : '"Lu et approuvé"'}
                  </span>
                </div>
              </div>
            )}

            {/* Baladiya Official Legalization Zone */}
            <div className="p-2 border-2 border-zinc-700 bg-zinc-50 rounded flex items-center justify-between">
              <div className={isRtl ? 'text-right text-[9px] space-y-0.5' : 'text-left text-[9px] space-y-0.5'}>
                <p className="font-bold text-zinc-900">
                  {isRtl ? 'إطار مخصص لضابط الحالة المدنية بالبلدية (التعريف بالإمضاء)' : "CADRE RÉSERVÉ À L'OFFICIER DE L'ÉTAT CIVIL (BALADIYA)"}
                </p>
                <p className="text-zinc-600">
                  {isRtl ? 'تم التعريف بالإمضاء في : ...... / ...... / 2026' : 'Signature légalisée le : ...... / ...... / 2026'}
                </p>
                <p className="text-zinc-600">
                  {isRtl ? 'لدى ضابط الحالة المدنية ببلدية .............................' : 'Par devant nous, Officier de l\'État Civil de la Municipalité de .............................'}
                </p>
              </div>

              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 border border-zinc-400 bg-white flex items-center justify-center p-1">
                  <QrCode className="w-6 h-6 text-zinc-800" />
                </div>
                <span className="text-[7px] text-zinc-500 font-sans mt-0.5">IDAARA.TN-VERIFIED</span>
              </div>
            </div>

            <div className="text-center mt-2 text-[7px] text-zinc-400 font-sans">
              {isRtl
                ? 'وثيقة رسمية محررة عبر منصة إدارة.تونس السيادية · مطابقة للمواصفات الإدارية للجمهورية التونسية'
                : 'Document officiel généré via Idaara.tn · Conforme aux normes administratives de la République Tunisienne'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

