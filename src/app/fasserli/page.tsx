'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { DocumentUploader } from '../../components/fasserli/DocumentUploader';
import { SampleDocsPicker } from '../../components/fasserli/SampleDocsPicker';
import { DocumentAnalysisResult } from '../../components/fasserli/DocumentAnalysisResult';
import { SampleDocItem, sampleDocumentsList } from '../../data/sampleDocuments';
import { OCRAnalysisResult } from '../../types/chat';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn } from '../../components/motion/FadeInStagger';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import { ShieldCheck, FileSearch, Sparkles, FileText, Lock, CheckCircle2, ScanLine } from 'lucide-react';

export default function FasserliPage() {
  const { t, locale } = useLocale();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleDocItem | null>(sampleDocumentsList[0]);
  const [analysisResult, setAnalysisResult] = useState<OCRAnalysisResult | null>(
    sampleDocumentsList[0].simulatedOCRResult
  );
  const reportRef = useRef<HTMLDivElement | null>(null);

  const handleSelectSample = async (sample: SampleDocItem) => {
    setSelectedSample(sample);
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('sampleId', sample.id);
      formData.append('documentName', sample.id);
      const res = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult(sample.simulatedOCRResult);
      }
    } catch (e) {
      setAnalysisResult(sample.simulatedOCRResult);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleCustomUpload = async (file: File | null, redact: boolean) => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentName', file.name);
      formData.append('redact', String(redact));
      const res = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      }
    } catch (e) {
      console.error('OCR custom upload error:', e);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const headlineMain =
    locale === 'ar'
      ? 'قارئ الوثائق والإعلامات الإدارية'
      : locale === 'derja'
      ? 'Fasserli Hal War9a'
      : locale === 'en'
      ? 'Administrative OCR'
      : 'Décrypteur de Courriers';

  const headlineAccent =
    locale === 'ar'
      ? 'وفك الرموز بالذكاء الاصطناعي.'
      : locale === 'derja'
      ? 'w Scanner bel AI.'
      : locale === 'en'
      ? '& Legal AI Decoder.'
      : '& Avis Officiels.';

  const subtitle =
    locale === 'ar'
      ? 'صوّر أي إشعار أو وثيقة إدارية (إعلام ضريبي، تنبيه CNSS، استدعاء أمني أو عدلي) وسيفسّرها لك المساعد بـ 3 نقاط واضحة مع الآجال القانونية والخطايا وخطة العمل.'
      : locale === 'derja'
      ? 'Souwer ay war9a idariya (avis d\'imposition, convocation, CNSS...) w Idaara AI tfaserlek kol chay fi 3 n9at m3a el wa9t el 9anouni.'
      : locale === 'en'
      ? 'Scan any official notice (tax adjustment, police summons, CNSS demand) and Idaara AI will summarize it in 3 points with strict statutory deadlines.'
      : "Scannez n'importe quel courrier officiel (redressement fiscal, convocation, mise en demeure CNSS) et obtenez une synthèse juridique en 3 points.";

  const supportedTypes = [
    {
      name:
        locale === 'ar'
          ? 'المراجعة الجبائية والضرائب'
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
          ? 'محاضر وإشعارات عدول التنفيذ'
          : locale === 'derja'
          ? "Actes 3adoul Iched"
          : locale === 'en'
          ? 'Bailiff Formal Notices'
          : "Actes d'Huissier Notaire",
      tag: '3adoul Iched',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative overflow-hidden">
      
      {/* Cinematic Ambient Glow */}
      <AmbientOrbs variant="cyan" />

      {/* ── Top Hero Section ── */}
      <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6 border-b border-white/[0.08] relative">
        <div className="lg:col-span-7 space-y-3.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IDAARA AI · SCANNER & LEGAL DECODER</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0] font-bold">
              {headlineMain}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="display-heading block text-3xl sm:text-5xl italic font-bold text-emerald-400"
            >
              {headlineAccent}
            </motion.span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Conforme Code Fiscal 2026</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Storage & Confidentialité</span>
            </span>
          </div>
        </div>

        {/* Right Radar: Recognized state document formats */}
        <div className="lg:col-span-5 relative z-10">
          <SpotlightCard className="p-4 sm:p-5 border-white/[0.08] bg-[#12141a]/80 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-white/[0.08]">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-300 flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'en' ? 'Recognized Notice Formats' : 'Formats & Courriers Reconnus'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                <Lock className="w-2.5 h-2.5" />
                <span>Zero-Storage</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {supportedTypes.map((type, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      {type.tag}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-200 font-semibold line-clamp-1">
                    {type.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>

      {/* ── Studio Center Deck: Upload Canvas + Sample Notice Dossiers ── */}
      <FadeIn direction="up" delay={0.1} className="space-y-6">
        {/* Upload Studio */}
        <div className="max-w-4xl mx-auto w-full">
          <DocumentUploader
            onAnalyze={handleCustomUpload}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Verified Sample Dossiers */}
        <div className="max-w-4xl mx-auto w-full pt-2">
          <SampleDocsPicker
            onSelectSample={handleSelectSample}
            selectedId={selectedSample?.id}
            isAnalyzing={isAnalyzing}
          />
        </div>
      </FadeIn>

      {/* ── Live Generated Civic Legal Report ── */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            ref={reportRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pt-8 border-t border-white/[0.08] scroll-mt-16 max-w-5xl mx-auto w-full space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                <FileSearch className="w-4 h-4 text-emerald-400" />
                <span>
                  {locale === 'ar'
                    ? 'تقرير التحليل القانوني والإداري للوثيقة :'
                    : locale === 'en'
                    ? 'Administrative OCR Analysis & Legal Report :'
                    : locale === 'fr'
                    ? "Rapport d'Analyse Juridique du Document :"
                    : "Taqrir el Tahlil el Idari (Rapport d'analyse) :"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                ✓ CERTIFIÉ JORT
              </span>
            </div>

            <DocumentAnalysisResult result={analysisResult} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
