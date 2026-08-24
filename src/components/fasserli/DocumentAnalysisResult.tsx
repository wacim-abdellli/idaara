'use client';

import React from 'react';
import { OCRAnalysisResult } from '../../types/chat';
import { useLocale } from '../../context/LocaleContext';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Sparkles,
  ArrowRight,
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

  const urgencyBadge =
    result.urgency === 'critical'
      ? 'bg-red-500/15 text-red-300 border-red-500/30'
      : result.urgency === 'high'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';

  const urgencyLabel =
    result.urgency === 'critical'
      ? (locale === 'ar' ? 'أجل ملزم وعاجل جداً' : locale === 'en' ? 'Critical Urgency' : locale === 'derja' ? 'Ajel 3ajel barcha' : 'Urgence Critique')
      : result.urgency === 'high'
      ? (locale === 'ar' ? 'أولوية عالية' : locale === 'en' ? 'High Priority' : locale === 'derja' ? 'Awlawiya 3aliya' : 'Priorité Haute')
      : (locale === 'ar' ? 'إعلام رسمي معتمد' : locale === 'en' ? 'Official Notice' : locale === 'derja' ? 'I3lam Rasmi' : 'Avis Officiel');

  const refPrefix =
    locale === 'ar' ? 'المرجع :' : locale === 'en' ? 'Ref:' : locale === 'derja' ? 'Réf:' : 'Réf :';

  const deadlineDisplay =
    !result.deadlineDate || result.deadlineDate === 'غير محدد' || result.deadlineDate === 'Non spécifié' || result.deadlineDate === 'UNKNOWN'
      ? (locale === 'ar' ? 'غير محدد' : locale === 'en' ? 'Unspecified / N/A' : locale === 'derja' ? 'Moch m7addad' : 'Non spécifié')
      : result.deadlineDate;

  const copilotQuery = encodeURIComponent(
    `فسرلي هذه الوثيقة: ${docType} الصادرة عن ${authority} وشنوة نعمل بالضبط بخصوص الأجل ${deadlineDisplay}`
  );

  return (
    <div className="space-y-6 pt-4">
      {/* ── Minimalist Dossier Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-300 font-semibold">{authority}</span>
            {result.referenceNumber && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{refPrefix} {result.referenceNumber}</span>
              </>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {docType}
          </h2>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 self-start sm:self-auto ${urgencyBadge}`}>
          {urgencyLabel}
        </span>
      </div>

      {/* ── 1. Key Points ── */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {locale === 'ar'
              ? '1. الخلاصة في 3 نقاط واضحة'
              : locale === 'en'
              ? '1. Summary in 3 Key Points'
              : locale === 'derja'
              ? '1. El 5olasa fi 3 n9at wadh7a'
              : '1. Synthèse en 3 points'}
          </span>
        </h3>

        <div className="space-y-2">
          {summaryBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-sm text-zinc-200 leading-relaxed"
            >
              <span
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
                className="inline-flex items-center justify-center text-center h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs leading-none shrink-0 mt-0.5 select-none"
              >
                {idx + 1}
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Deadlines & Legal Risk ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {locale === 'ar'
                ? 'الأجل النهائي للرد :'
                : locale === 'en'
                ? 'Statutory Deadline :'
                : locale === 'derja'
                ? 'El wa9t el 9anouni :'
                : 'Délai d’échéance statutaire :'}
            </span>
          </span>
          <p className="text-sm font-bold text-white font-mono">
            {deadlineDisplay}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider block flex items-center gap-1 font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {locale === 'ar'
                ? 'مخاطر التأخير :'
                : locale === 'en'
                ? 'Risk in Case of Delay :'
                : locale === 'derja'
                ? 'Mochkla fi sourat ta5ir :'
                : 'Risque en cas de retard :'}
            </span>
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {penalty}
          </p>
        </div>
      </div>

      {/* ── 3. Actions & Target Office ── */}
      {result.actionItems && result.actionItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>
              {locale === 'ar'
                ? '2. ما يجب فعله والشباك المعني'
                : locale === 'en'
                ? '2. Action Plan & Target Office'
                : locale === 'derja'
                ? '2. Chnowa ta3mel wel guichet el ma3ni'
                : '2. Plan d’action & Guichet'}
            </span>
          </h3>

          <div className="space-y-2">
            {result.actionItems.map((item, idx) => {
              const task = getLocalized(item.task, locale);
              const office = getLocalized(item.office, locale);
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold text-sm">✓</span>
                    <p className="text-sm font-semibold text-white leading-snug">{task}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pl-6 rtl:pl-0 rtl:pr-6 font-mono">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <Building2 className="w-3 h-3 text-emerald-400" />
                      <span>{office}</span>
                    </span>

                    {item.requiredPapers && item.requiredPapers.length > 0 && (
                      <span className="text-zinc-500">
                        {locale === 'ar' ? 'الوثائق:' : locale === 'en' ? 'Docs:' : locale === 'derja' ? 'Awra9:' : 'Papiers:'} {item.requiredPapers.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Copilot Action Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-zinc-200">
            {locale === 'ar'
              ? 'هل تريد استشارة المساعد الذكي حول هذه الوثيقة أو صياغة رد؟'
              : locale === 'en'
              ? 'Need help drafting a response or inquiring about this document?'
              : locale === 'derja'
              ? 'T7eb tchawer Idaara AI bech tekteb reponse wala tfasser akther?'
              : 'Besoin d’aide pour rédiger une réponse ou contester ce courrier ?'}
          </p>
        </div>

        <Link
          href={`/copilot?q=${copilotQuery}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>
            {locale === 'ar'
              ? 'استشارة المساعد'
              : locale === 'en'
              ? 'Consult Copilot'
              : locale === 'derja'
              ? 'Chawer Idaara AI'
              : 'Consulter Idaara AI'}
          </span>
          <ArrowRight className="w-3 h-3 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};
