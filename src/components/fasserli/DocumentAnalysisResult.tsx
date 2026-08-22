'use client';

import React from 'react';
import { OCRAnalysisResult } from '../../types/chat';
import { useLocale } from '../../context/LocaleContext';
import {
  AlertTriangle,
  Clock,
  Building2,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Info,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertOctagon,
  Scale,
  MapPin,
  FileText,
  Stamp,
} from 'lucide-react';
import Link from 'next/link';
import { getLocalized, getLocalizedArray } from '../../lib/locale-utils';

interface DocumentAnalysisResultProps {
  result: OCRAnalysisResult;
}

export const DocumentAnalysisResult: React.FC<DocumentAnalysisResultProps> = ({
  result,
}) => {
  const { locale } = useLocale();

  const docType = getLocalized(result.documentType, locale);
  const authority = getLocalized(result.issuingAuthority, locale);
  const penalty = getLocalized(result.penaltyRisk, locale);
  const summaryBullets = getLocalizedArray(result.summary, locale);
  const legalContext = getLocalized(result.legalContext, locale);

  const urgencyColors = {
    low: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    high: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-300 border-red-500/40 shadow-lg shadow-red-950/40',
  };

  const getUrgencyText = () => {
    if (result.urgency === 'critical') {
      if (locale === 'en') return 'Critical Statutory Urgency';
      if (locale === 'ar') return 'أجل قانوني ملزم وعاجل';
      if (locale === 'fr') return 'Urgence Statutaire Critique';
      return 'Délai 9anouni 3ajel barcha';
    }
    if (result.urgency === 'high') {
      if (locale === 'en') return 'High Priority Action';
      if (locale === 'ar') return 'أولوية إدارية عالية';
      if (locale === 'fr') return 'Action Prioritaire';
      return 'Priorité 3alya';
    }
    if (locale === 'en') return 'Standard Official Notice';
    if (locale === 'ar') return 'إعلام إداري معتمد';
    if (locale === 'fr') return 'Avis Régulier';
    return 'Ma3louma Idariya';
  };

  const copilotQuery = encodeURIComponent(
    `فسرلي هذه الوثيقة: ${docType} الصادرة عن ${authority} وشنوة نعمل بالضبط بخصوص الأجل ${result.deadlineDate}`
  );

  return (
    <div className="space-y-6 rounded-3xl bg-[#101217] p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative overflow-hidden">
      
      {/* ── Dossier Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{authority}</span>
            </span>
            {result.referenceNumber && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                  Réf: {result.referenceNumber}
                </span>
              </>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {docType}
          </h2>
        </div>

        {/* Urgency Pill */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold shrink-0 self-start md:self-auto ${
            urgencyColors[result.urgency] || urgencyColors.medium
          }`}
        >
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>{getUrgencyText()}</span>
        </div>
      </div>

      {/* ── Bento Grid: 3 Pillars of Civic Decoding ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Pillar 1: 3-Point Plain Language Breakdown (7 cols) */}
        <div className="md:col-span-7 rounded-2xl bg-[#151820] p-5 sm:p-6 border border-white/[0.06] space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {locale === 'ar'
                  ? '1. ماذا تعني هذه الوثيقة؟ (الخلاصة في 3 نقاط)'
                  : locale === 'en'
                  ? '1. What does this notice mean? (3 Key Points)'
                  : '1. Que signifie ce courrier ? (Synthèse en 3 points)'}
              </span>
            </div>

            <ul className="space-y-2.5">
              {summaryBullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/30 border border-white/[0.04] text-xs sm:text-sm text-zinc-200 leading-relaxed"
                >
                  <span className="flex h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-300 items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Framework Tag */}
          {legalContext && (
            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06] text-[11px] text-zinc-400 font-mono">
              <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{legalContext}</span>
            </div>
          )}
        </div>

        {/* Pillar 2: Deadlines & Penalty Risk Radar (5 cols) */}
        <div className="md:col-span-5 rounded-2xl bg-[#18151a] p-5 sm:p-6 border border-rose-500/20 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>
                {locale === 'ar'
                  ? '2. الآجال القانونية ومخاطر الخطايا'
                  : locale === 'en'
                  ? '2. Statutory Deadlines & Risk'
                  : '2. Délais Légaux & Risques de Pénalités'}
              </span>
            </div>

            {/* Deadline Pill Box */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-rose-500/30 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                {locale === 'ar' ? 'الأجل النهائي للرد :' : 'Délai d’échéance statutaire :'}
              </span>
              <p className="text-sm font-bold text-white font-mono">
                {result.deadlineDate}
              </p>
            </div>

            {/* Penalty Risk Notice */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
              <span className="text-[10px] font-mono uppercase text-rose-400 tracking-wider flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3 h-3" />
                <span>{locale === 'ar' ? 'الخطر عند التأخير :' : 'Risque en cas de dépassement :'}</span>
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {penalty}
              </p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.05]">
            * Conforme aux articles du Code de Procédure Fiscale & Code des Obligations
          </div>
        </div>

      </div>

      {/* ── Pillar 3: Action Checklist & Destination Office ── */}
      {result.actionItems && result.actionItems.length > 0 && (
        <div className="rounded-2xl bg-[#151820] p-5 sm:p-6 border border-white/[0.06] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>
              {locale === 'ar'
                ? '3. خطة العمل المباشرة والشباك المعني'
                : locale === 'en'
                ? '3. Immediate Action Plan & Competent Office'
                : '3. Plan d’Action Immédiat & Guichet Compétent'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.actionItems.map((item, idx) => {
              const task = getLocalized(item.task, locale);
              const office = getLocalized(item.office, locale);
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 rounded-md bg-emerald-500/20 text-emerald-400 items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-100 leading-snug">
                        {task}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-400 pl-7 rtl:pl-0 rtl:pr-7 font-mono">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{office}</span>
                    </div>
                  </div>

                  {item.requiredPapers && item.requiredPapers.length > 0 && (
                    <div className="pt-2.5 border-t border-white/[0.06] pl-7 rtl:pl-0 rtl:pr-7">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                        {locale === 'ar' ? 'الوثائق المطلوبة معك :' : 'Documents à apporter :'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.requiredPapers.map((paper, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/5"
                          >
                            {paper}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Copilot Action Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#13161c] to-emerald-950/20 border border-emerald-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {locale === 'ar' ? 'هل تريد استشارة المساعد حول هذا الإعلام؟' : 'Besoin de rédiger un recours ou poser une question ?'}
            </h4>
            <p className="text-xs text-zinc-400">
              {locale === 'ar'
                ? 'استشر Idaara AI لمساعدتك في كتابة الرد أو حساب الخطايا بدقة.'
                : 'Idaara AI Copilot peut rédiger votre mémoire en réponse ou calculer vos pénalités.'}
            </p>
          </div>
        </div>

        <Link
          href={`/copilot?q=${copilotQuery}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>{locale === 'ar' ? 'استشارة المساعد الذكي' : 'Consulter Idaara AI'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>

    </div>
  );
};
