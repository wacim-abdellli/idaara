'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { DocumentUploader } from '../../components/fasserli/DocumentUploader';
import { SampleDocsPicker } from '../../components/fasserli/SampleDocsPicker';
import { DocumentAnalysisResult } from '../../components/fasserli/DocumentAnalysisResult';
import { SampleDocItem, sampleDocumentsList } from '../../data/sampleDocuments';
import { OCRAnalysisResult } from '../../types/chat';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn, FadeInStagger, FadeInItem } from '../../components/motion/FadeInStagger';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import { ShieldCheck, FileSearch, Sparkles, FileText, Lock, CheckCircle2 } from 'lucide-react';

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
      : locale === 'derja'
      ? 'Fasserli Hal War9a'
      : locale === 'en'
      ? 'Administrative OCR'
      : 'Décrypteur de Courriers';

  const headlineAccent =
    locale === 'ar'
      ? 'وقارئ الوثائق الذكي.'
      : locale === 'derja'
      ? 'w Scanner bel AI.'
      : locale === 'en'
      ? '& Legal Decoder.'
      : '& Avis Officiels.';

  const subtitle =
    locale === 'ar'
      ? 'صوّر أي وثيقة إدارية (إعلام ضريبي، استدعاء، إشعار CNSS) وسيفسّرها لك المساعد بـ 3 نقاط مع الآجال القانونية وما يجب فعله.'
      : locale === 'derja'
      ? 'Souwer ay war9a idariya (avis d\'imposition, convocation, CNSS...) w Idaara AI tfaserlek kol chay fi 3 n9at m3a el wa9t el 9anouni.'
      : locale === 'en'
      ? 'Scan any official notice (tax adjustment, police summons, CNSS demand) and Idaara AI will summarize it in 3 points with strict statutory deadlines.'
      : "Scannez n'importe quel courrier officiel (redressement fiscal, convocation, mise en demeure CNSS) et obtenez une synthèse juridique en 3 points.";

  const supportedTypes = [
    {
      name:
        locale === 'ar'
          ? 'الإعلامات والضرائب'
          : locale === 'derja'
          ? 'Avis Fiscaux w Contrôle'
          : locale === 'en'
          ? 'Tax Audit & Adjustments'
          : 'Avis Fiscaux & Contrôle',
      tag: 'DGI / Recette',
    },
    {
      name:
        locale === 'ar'
          ? 'تنبيهات الضمان الاجتماعي'
          : locale === 'derja'
          ? 'Mises en Demeure CNSS'
          : locale === 'en'
          ? 'CNSS Social Demands'
          : 'Mises en Demeure CNSS',
      tag: 'Daman Ijtima3i',
    },
    {
      name:
        locale === 'ar'
          ? 'الاستدعاءات الأمنية والعدلية'
          : locale === 'derja'
          ? 'Convocations Markez w Ma7kma'
          : locale === 'en'
          ? 'Police & Court Summons'
          : 'Convocations & Justice',
      tag: 'Tribunal / Police',
    },
    {
      name:
        locale === 'ar'
          ? 'محاضر عدول التنفيذ'
          : locale === 'derja'
          ? "Actes 3adoul Iched"
          : locale === 'en'
          ? 'Bailiff Formal Notices'
          : "Actes d'Huissier Notaire",
      tag: '3adoul Iched',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 relative overflow-hidden">

      {/* Cinematic Ambient Orbs */}
      <AmbientOrbs variant="cyan" />

      {/* ── 2-Column Hero Header (Balances Left & Right space) ── */}
      <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80 relative">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-emerald-400 font-bold">/</span>
            <span>OCR Juridique Tunisien · Confidentialité 100% Locale</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </motion.span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Supported Document Categories Radar */}
        <div className="lg:col-span-5 relative z-10">
          <SpotlightCard className="p-4 sm:p-5 border-zinc-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'en' ? 'Supported Notice Formats' : 'Courriers & Actes Reconnus'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Zero-Storage</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {supportedTypes.map((type, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                      {type.tag}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-200 font-semibold line-clamp-1">
                    {type.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>

      {/* ── Zero Storage Privacy Guarantee ── */}
      <FadeIn direction="up" delay={0.1}>
        <SpotlightCard className="p-4 border-emerald-500/20 flex items-center justify-between bg-emerald-950/20 shadow-md">
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-100">{t('zeroStorageBanner')} : </span>
              <span className="text-zinc-400">{t('zeroStorageSub')}</span>
            </div>
          </div>
        </SpotlightCard>
      </FadeIn>

      {/* ── Main Grid: Upload & Sample Documents ── */}
      <FadeIn direction="up" delay={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
      </FadeIn>

      {/* ── Result Section with AnimatePresence ── */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pt-6 border-t border-zinc-800/80"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
