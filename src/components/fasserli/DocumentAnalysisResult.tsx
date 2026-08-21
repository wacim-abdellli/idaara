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
    critical: 'bg-red-500/15 text-red-300 border-red-500/30',
  };

  const getUrgencyText = () => {
    if (result.urgency === 'critical') {
      if (locale === 'en') return 'Critical Urgency';
      if (locale === 'ar') return 'عاجل جداً';
      if (locale === 'fr') return 'Urgentissime';
      return '7aja 3ajla barcha';
    }
    if (result.urgency === 'high') {
      if (locale === 'en') return 'High Priority';
      if (locale === 'ar') return 'أولوية قصوى';
      if (locale === 'fr') return 'Priorité Haute';
      return 'Priorité 3alya';
    }
    if (locale === 'en') return 'Information Notice';
    if (locale === 'ar') return 'إعلام / معلومة';
    if (locale === 'fr') return 'Information';
    return 'Ma3louma';
  };

  const section1Title =
    locale === 'en'
      ? '1. What does this document mean? (3 Key Points)'
      : locale === 'ar'
      ? '1. ماذا تعني هذه الوثيقة؟ (تفسير في 3 نقاط واضحة)'
      : locale === 'fr'
      ? '1. Que signifie ce document ? (Explication en 3 points clairs)'
      : '1. Chnowa ma3naha hal war9a? (Explication en 3 points)';

  const section2Title =
    locale === 'en'
      ? '2. Legal Deadlines & Penalty Risks'
      : locale === 'ar'
      ? '2. الآجال القانونية ومخاطر الخطايا'
      : locale === 'fr'
      ? '2. Délais légaux & Risques de pénalités'
      : '2. El Âjel wel Khnayet (Délais & Risques)';

  const section3Title =
    locale === 'en'
      ? '3. What should you do now? (Action Plan & Target Office)'
      : locale === 'ar'
      ? '3. ماذا يجب أن تفعل الآن؟ (خطة العمل والإجراءات)'
      : locale === 'fr'
      ? '3. Que devez-vous faire maintenant ? (Plan d’action)'
      : '3. Chnowa lezmek ta3mel tawa? (Plan d’action)';

  const deadlineLabel =
    locale === 'en' ? 'Response deadline:' : locale === 'ar' ? 'أجل الرد :' : locale === 'fr' ? 'Délai de réponse :' : 'Délai mte3 el reponse :';

  const penaltyLabel =
    locale === 'en' ? 'Risk in case of delay:' : locale === 'ar' ? 'الخطر عند التأخير :' : locale === 'fr' ? 'Risque en cas de retard :' : "Khnayet ken t'ta5ar :";

  const officeLabel =
    locale === 'en' ? 'Guichet / Office:' : locale === 'ar' ? 'المكتب / الشباك :' : locale === 'fr' ? 'Guichet compétent :' : 'Guichet :';

  const papersLabel =
    locale === 'en' ? 'Required papers with you:' : locale === 'ar' ? 'الوثائق المطلوبة معك :' : locale === 'fr' ? 'Documents à apporter :' : 'Awra9 lezmin m3ak :';

  const legalLabel =
    locale === 'en' ? 'Legal Framework:' : locale === 'ar' ? 'الإطار القانوني :' : locale === 'fr' ? 'Cadre juridique :' : 'Cadre juridique :';

  const copilotBtn =
    locale === 'en' ? 'Ask Copilot about this notice' : locale === 'ar' ? 'اسأل المساعد الصوتي عن هذه الوثيقة' : locale === 'fr' ? 'Poser une question au Copilot' : 'Es2el el Copilot 3la hal war9a';

  return (
    <div className="space-y-6 glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl">
      {/* Header with Title & Urgency Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-1">
            <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{authority}</span>
            {result.referenceNumber && (
              <span className="font-mono text-zinc-500">· Réf: {result.referenceNumber}</span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {docType}
          </h2>
        </div>

        <div className="flex items-center">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${
              urgencyColors[result.urgency]
            }`}
          >
            {result.urgency === 'critical' || result.urgency === 'high' ? (
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <Info className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{getUrgencyText()}</span>
          </span>
        </div>
      </div>

      {/* 1. Plain-Language Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
            1
          </span>
          <span>{section1Title}</span>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl p-4 sm:p-5 border border-zinc-800 space-y-2.5">
          {summaryBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200 leading-relaxed">
              <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Deadlines & Penalties */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs">
            2
          </span>
          <span>{section2Title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{deadlineLabel}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white font-mono">
              {result.deadlineDate}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-red-400">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold">{penaltyLabel}</span>
            </div>
            <p className="text-xs text-red-200 leading-relaxed">
              {penalty}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Action Plan & Next Steps */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
            3
          </span>
          <span>{section3Title}</span>
        </div>

        <div className="space-y-3">
          {result.actionItems.map((action, idx) => {
            const task = getLocalized(action.task, locale);
            const office = getLocalized(action.office, locale);

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white">{task}</p>
                      <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                        <Building2 className="w-3 h-3" />
                        <span>{officeLabel} {office}</span>
                      </p>
                    </div>
                  </div>

                  {action.feeTND !== undefined && (
                    <div className="px-2.5 py-1 rounded-lg bg-zinc-800 text-amber-300 font-mono font-bold text-xs shrink-0">
                      {action.feeTND.toFixed(3)} DT
                    </div>
                  )}
                </div>

                {action.requiredPapers && action.requiredPapers.length > 0 && (
                  <div className="pt-3 border-t border-zinc-800/80 text-xs">
                    <span className="text-zinc-400 font-semibold block mb-1.5">
                      {papersLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {action.requiredPapers.map((paper, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 text-[11px] border border-zinc-700/60"
                        >
                          ✓ {paper}
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

      {/* Legal Basis & Copilot Call-to-Action */}
      <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-zinc-600 shrink-0" />
          <span>{legalLabel} <strong className="text-zinc-400 font-normal">{legalContext}</strong></span>
        </div>

        <Link
          href={`/copilot`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{copilotBtn}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
