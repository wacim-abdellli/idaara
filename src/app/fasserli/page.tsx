'use client';

import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { DocumentUploader } from '../../components/fasserli/DocumentUploader';
import { SampleDocsPicker } from '../../components/fasserli/SampleDocsPicker';
import { DocumentAnalysisResult } from '../../components/fasserli/DocumentAnalysisResult';
import { SampleDocItem, sampleDocumentsList } from '../../data/sampleDocuments';
import { OCRAnalysisResult } from '../../types/chat';
import { ShieldCheck, Sparkles, FileSearch } from 'lucide-react';

export default function FasserliPage() {
  const { t } = useLocale();
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
      // Return a realistic custom OCR breakdown
      setAnalysisResult({
        id: `ocr-custom-${Date.now()}`,
        documentType: {
          derja: "Avis d'Imposition & Taxe Foncière (Zebla w Khrouba)",
          fr: "Avis d'Imposition - Taxe sur les Immeubles Bâtis",
          ar: "إعلام بالمعلوم على العقارات المبنية (الزبلة والخروبة)",
        },
        issuingAuthority: {
          derja: "Baladiyat el Marje3 el Tourabi",
          fr: "Recette Municipale Territoriale",
          ar: "القباضة البلدية المختصة ترابياً",
        },
        referenceNumber: "TAX-MUN-2026/9021",
        dateDetected: "Aujourd'hui",
        urgency: "medium",
        deadlineDate: "Avant le 31 Décembre 2026",
        penaltyRisk: {
          derja: "Khnayet 0.75% par mois ba3d fin d'année.",
          fr: "Pénalités de retard de 0.75% par mois à compter de l'échéance légale.",
          ar: "توظيف خطية تأخير بنسبة 0.75% شهرياً بعد انقضاء الأجل القانوني.",
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
          ]
        },
        actionItems: [
          {
            task: {
              derja: "5alles el ma3loum fel 9badha el baladiya.",
              fr: "Régler la taxe à la recette municipale.",
              ar: "دفع المعلوم البلدي بالقباضة واستلام الوصل."
            },
            office: {
              derja: "Recette Municipale",
              fr: "Recette Municipale / Baladiya",
              ar: "القباضة البلدية"
            },
            requiredPapers: ["Avis d'imposition", "CIN de l'occupant/propriétaire"],
            feeTND: 85
          }
        ],
        legalContext: {
          derja: "Code de la Fiscalité Locale Tunisien.",
          fr: "Code de la Fiscalité Locale.",
          ar: "مجلة الجباية المحلية التونسية."
        }
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart OCR & Administrative Document Decoder</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          📄 Fasserli Hal War9a · فسّرلي هالورقة
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Soiwer ay wathi9a idariya (Tanbih dhariba, convocation, avis cnss, 3a9la) w khalli Idaara AI t'fassarlek chnowa fihom b'loughet el mowaten w chnowa lezmek ta3mel.
        </p>
      </div>

      {/* Zero Storage Reassurance */}
      <div className="mb-6 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs text-zinc-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-semibold text-zinc-100">{t('zeroStorageBanner')} : </span>
            <span className="text-zinc-400">{t('zeroStorageSub')}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload & Samples */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Col: Upload zone */}
        <div className="lg:col-span-6 space-y-6">
          <DocumentUploader
            onAnalyze={handleCustomUpload}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Right Col: Samples */}
        <div className="lg:col-span-6 space-y-4">
          <SampleDocsPicker
            onSelectSample={handleSelectSample}
            selectedId={selectedSample?.id}
          />
        </div>
      </div>

      {/* Result Section */}
      {analysisResult && (
        <div className="mt-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
            <FileSearch className="w-4 h-4 text-emerald-400" />
            <span>Taqrir el Tahlil el Idari (Rapport d'analyse du document) :</span>
          </div>
          <DocumentAnalysisResult result={analysisResult} />
        </div>
      )}
    </div>
  );
}
