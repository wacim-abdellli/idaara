'use client';

import React, { useState, useRef, Suspense } from 'react';
import Loading from '../loading';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { DocumentUploader } from '../../components/fasserli/DocumentUploader';
import { DocumentAnalysisResult } from '../../components/fasserli/DocumentAnalysisResult';
import { OCRAnalysisResult } from '../../types/chat';
import { FadeIn } from '../../components/motion/FadeInStagger';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import { Sparkles, Lock, CheckCircle2, FileSearch } from 'lucide-react';

export default function FasserliPage() {
  const { locale } = useLocale();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<OCRAnalysisResult | null>(null);
  const reportRef = useRef<HTMLDivElement | null>(null);

  const handleCustomUpload = async (file: File | null) => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentName', file.name);
      const res = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      }
    } catch (e) {
      console.error('OCR upload error:', e);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const currentYear = new Date().getFullYear();

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

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 relative overflow-hidden">
      
      {/* Cinematic Ambient Glow */}
      <AmbientOrbs variant="cyan" />

      {/* ── Minimalist Clean Header ── */}
      <FadeIn direction="up" className="text-center space-y-3 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {locale === 'ar'
              ? 'المساعد الذكي · محلل الوثائق'
              : locale === 'derja'
              ? 'IDAARA AI · War9a Decoder'
              : locale === 'en'
              ? 'IDAARA AI · Scanner & Legal Decoder'
              : 'IDAARA AI · Scanner & Décodeur Juridique'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          <span>{headlineMain} </span>
          <span className="text-emerald-400 italic">{headlineAccent}</span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex items-center justify-center gap-3 pt-1 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {locale === 'ar'
                ? `مطابق لمجلة الجباية ${currentYear}`
                : locale === 'derja'
                ? `Conforme Code Fiscal ${currentYear}`
                : locale === 'en'
                ? `Fiscal Code ${currentYear} Compliant`
                : `Conforme Code Fiscal ${currentYear}`}
            </span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {locale === 'ar'
                ? 'حماية البيانات وحذف فوري (Zero-Storage)'
                : locale === 'derja'
                ? 'Zero-Storage & protection données'
                : locale === 'en'
                ? 'Zero-Storage & Privacy Protected'
                : 'Zero-Storage & Confidentialité'}
            </span>
          </span>
        </div>
      </FadeIn>

      {/* ── Centerpiece Upload Studio ── */}
      <FadeIn direction="up" delay={0.1}>
        <DocumentUploader
          onAnalyze={handleCustomUpload}
          isAnalyzing={isAnalyzing}
        />
      </FadeIn>

      {/* ── Live Generated Civic Legal Report ── */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            ref={reportRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pt-6 border-t border-white/[0.08] scroll-mt-16"
          >
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                <FileSearch className="w-4 h-4 text-emerald-400" />
                <span>
                  {locale === 'ar'
                    ? 'تقرير التحليل القانوني والإداري للوثيقة :'
                    : locale === 'en'
                    ? 'Administrative OCR Analysis & Legal Report :'
                    : locale === 'derja'
                    ? 'Rapport d\'analyse 9anouniya mta3 el war9a :'
                    : "Rapport d'Analyse Juridique du Document :"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                {locale === 'ar'
                  ? `✓ مطابق للرائد الرسمي JORT ${currentYear}`
                  : locale === 'derja'
                  ? `✓ Certifié JORT ${currentYear}`
                  : locale === 'en'
                  ? `✓ JORT ${currentYear} Certified`
                  : `✓ Certifié JORT ${currentYear}`}
              </span>
            </div>

            <DocumentAnalysisResult result={analysisResult} />
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </Suspense>
  );
}
