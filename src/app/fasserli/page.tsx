'use client';

import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { DocumentUploader } from '../../components/fasserli/DocumentUploader';
import { SampleDocsPicker } from '../../components/fasserli/SampleDocsPicker';
import { DocumentAnalysisResult } from '../../components/fasserli/DocumentAnalysisResult';
import { SampleDocItem, sampleDocumentsList } from '../../data/sampleDocuments';
import { OCRAnalysisResult } from '../../types/chat';
import { ShieldCheck, FileSearch, Sparkles } from 'lucide-react';

export default function FasserliPage() {
  const { t, locale } = useLocale();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleDocItem | null>(null);
  const [analysisResult, setAnalysisResult] = useState<OCRAnalysisResult | null>(
    sampleDocumentsList[0].simulatedOCRResult
  );

  const handleSelectSample = (sample: SampleDocItem) => {
    setSelectedSample(sample);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(sample.simulatedOCRResult);
      setIsAnalyzing(false);
    }, 500);
  };

  const handleCustomUpload = (_file: File | null, _redact: boolean) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        id: `ocr-custom-${Date.now()}`,
        documentType: {
          derja: "Avis d'Imposition & Taxe Foncière (Zebla w Khrouba)",
          fr: "Avis d'Imposition - Taxe sur les Immeubles Bâtis",
          ar: "إعلام بالمعلوم على العقارات المبنية (الزبلة والخروبة)",
          en: "Municipal Property Tax Notice (Zebla w Khrouba)",
        },
        issuingAuthority: {
          derja: "Baladiyat el Marje3 el Tourabi",
          fr: "Recette Municipale Territoriale",
          ar: "القباضة البلدية المختصة ترابياً",
          en: "Territorial Municipal Tax Office",
        },
        referenceNumber: "TAX-MUN-2026/9021",
        dateDetected: "Aujourd'hui",
        urgency: "medium",
        deadlineDate: "Avant le 31 Décembre 2026",
        penaltyRisk: {
          derja: "Khnayet 0.75% par mois ba3d fin d'année.",
          fr: "Pénalités de retard de 0.75% par mois à compter de l'échéance légale.",
          ar: "توظيف خطية تأخير بنسبة 0.75% شهرياً بعد انقضاء الأجل القانوني.",
          en: "Monthly late penalty of 0.75% following the statutory deadline.",
        },
        summary: {
          derja: [
            "Wathi9at khalas dharibet el baladiya (Zebla w khrouba) mte3 el dar.",
            "El mablagh el matloub houwa 85 DT lel 3am el 7ali.",
            "Tnajjem t5allas direct fel Baladiya walla en ligne bel carte bancaire."
          ],
          fr: [
            "Avis de taxe municipale annuelle sur les immeubles bâtis pour le logement.",
            "Le montant net exigible est de 85 TND au titre de l'année en cours.",
            "Le règlement peut être effectué au guichet municipal ou en ligne."
          ],
          ar: [
            "إعلام باستخلاص المعلوم البلدي السنوي على العقارات المبنية.",
            "المبلغ الصافي المستوجب دفعه هو 85 ديناراً عن السنة الجارية.",
            "يمكن الدفع مباشرة بشباك القباضة البلدية أو عن بعد."
          ],
          en: [
            "Annual municipal property and sanitation tax assessment.",
            "The statutory amount due is 85 TND for the current fiscal year.",
            "Settlement can be completed directly at the municipal counter or online via debit card."
          ]
        },
        actionItems: [
          {
            task: {
              derja: "5alles el ma3loum fel 9badha el baladiya.",
              fr: "Régler la taxe à la recette municipale.",
              ar: "دفع المعلوم البلدي بالقباضة واستلام الوصل.",
              en: "Pay the municipal tax at the local tax office and collect receipt."
            },
            office: {
              derja: "Recette Municipale",
              fr: "Recette Municipale / Baladiya",
              ar: "القباضة البلدية",
              en: "Municipal Tax Desk"
            },
            requiredPapers: ["Avis d'imposition", "CIN de l'occupant/propriétaire"],
            feeTND: 85
          }
        ],
        legalContext: {
          derja: "Code de la Fiscalité Locale Tunisien.",
          fr: "Code de la Fiscalité Locale.",
          ar: "مجلة الجباية المحلية التونسية.",
          en: "Tunisian Local Taxation Code (Code de la Fiscalité Locale)."
        }
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const headlineMain =
    locale === 'ar'
      ? 'فسّرلي هالورقة'
      : locale === 'en'
      ? 'Administrative OCR'
      : 'Décrypteur de Courriers';

  const headlineAccent =
    locale === 'ar'
      ? 'وقارئ الوثائق الذكي.'
      : locale === 'en'
      ? '& Legal Decoder.'
      : '& Avis Officiels.';

  const subtitle =
    locale === 'ar'
      ? 'صوّر أي وثيقة إدارية (إعلام ضريبي، استدعاء، إشعار CNSS) وسيفسّرها لك المساعد بـ 3 نقاط مع الآجال القانونية وما يجب فعله.'
      : locale === 'en'
      ? 'Scan any official notice (tax adjustment, police summons, CNSS demand) and Idaara AI will summarize it in 3 points with strict statutory deadlines.'
      : "Scannez n'importe quel courrier officiel (redressement fiscal, convocation, mise en demeure CNSS) et obtenez une synthèse juridique en 3 points.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">

      {/* ── Editorial Header ── */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OCR Juridique Tunisien · Confidentialité 100% Locale</span>
        </div>

        <h1 className="leading-tight">
          <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
            {headlineMain}
          </span>
          <span
            className="display-heading block text-3xl sm:text-5xl italic"
            style={{ color: 'var(--stamp-green)' }}
          >
            {headlineAccent}
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl pt-1">
          {subtitle}
        </p>
      </div>

      {/* ── Zero Storage Privacy Guarantee ── */}
      <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20 flex items-center justify-between bg-emerald-950/20">
        <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-zinc-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-semibold text-zinc-100">{t('zeroStorageBanner')} : </span>
            <span className="text-zinc-400">{t('zeroStorageSub')}</span>
          </div>
        </div>
      </div>

      {/* ── Main Grid: Upload & Sample Documents ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Upload zone */}
        <div className="lg:col-span-6 space-y-6">
          <DocumentUploader
            onAnalyze={handleCustomUpload}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Right: Samples */}
        <div className="lg:col-span-6 space-y-4">
          <SampleDocsPicker
            onSelectSample={handleSelectSample}
            selectedId={selectedSample?.id}
          />
        </div>
      </div>

      {/* ── Result Section ── */}
      {analysisResult && (
        <div className="pt-6 border-t border-zinc-800/80">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
            <FileSearch className="w-4 h-4 text-emerald-400" />
            <span>
              {locale === 'ar'
                ? 'تقرير التحليل القانوني والإداري للوثيقة :'
                : locale === 'en'
                ? 'Administrative OCR Analysis & Legal Report :'
                : locale === 'fr'
                ? "Rapport d'analyse administrative du document :"
                : "Taqrir el Tahlil el Idari (Rapport d'analyse) :"}
            </span>
          </div>
          <DocumentAnalysisResult result={analysisResult} />
        </div>
      )}
    </div>
  );
}
