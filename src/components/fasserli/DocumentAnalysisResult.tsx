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
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    critical: 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse',
  };

  const getUrgencyBadge = () => {
    if (result.urgency === 'critical') {
      if (locale === 'en') return '🚨 Critical Urgency';
      if (locale === 'ar') return '🚨 عاجل جداً';
      if (locale === 'fr') return '🚨 Urgentissime';
      return '🚨 7aja 3ajla barcha';
    }
    if (result.urgency === 'high') {
      if (locale === 'en') return '⚠️ High Priority';
      if (locale === 'ar') return '⚠️ أولوية قصوى';
      if (locale === 'fr') return '⚠️ Priorité Haute';
      return '⚠️ Priorité 3alya';
    }
    if (locale === 'en') return 'ℹ️ Notice / Information';
    if (locale === 'ar') return 'ℹ️ إعلام / معلومة';
    if (locale === 'fr') return 'ℹ️ Information';
    return 'ℹ️ Ma3louma';
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
    <div className="space-y-6 glass-panel rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-2xl">
      {/* Header with Title & Urgency Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-zinc-400 font-medium mb-1">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{authority}</span>
            {result.referenceNumber && (
              <span className="font-mono text-zinc-500">· Réf: {result.referenceNumber}</span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {docType}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${
              urgencyColors[result.urgency]
            }`}
          >
            {getUrgencyBadge()}
          </span>
        </div>
      </div>

      {/* 1. Plain-Language Summary */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-bold text-emerald-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
            1
          </span>
          <span>{section1Title}</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          {summaryBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 rtl:space-x-reverse text-xs sm:text-sm text-zinc-200">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Deadlines & Penalties Card */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-bold text-amber-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs">
            2
          </span>
          <span>{section2Title}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/30">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-400 text-xs font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>{deadlineLabel}</span>
            </div>
            <p className="text-sm font-semibold text-zinc-100">
              {result.deadlineDate || '30 jours'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-red-500/30">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-red-400 text-xs font-bold mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>{penaltyLabel}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">{penalty}</p>
          </div>
        </div>
      </div>

      {/* 3. Action Checklist & Target Office */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-bold text-indigo-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
            3
          </span>
          <span>{section3Title}</span>
        </div>

        <div className="space-y-3">
          {result.actionItems.map((item, idx) => {
            const task = getLocalized(item.task, locale);
            const office = getLocalized(item.office, locale);

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse font-semibold text-sm text-zinc-100">
                    <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{task}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-400">
                  <span className="flex items-center space-x-1 rtl:space-x-reverse text-emerald-400">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{officeLabel} {office}</span>
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <span className="font-medium text-zinc-300">{papersLabel} </span>
                  <span>{item.requiredPapers.join(' · ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal reference note */}
      <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{legalLabel} {legalContext}</span>
        </div>
        <Link
          href="/copilot"
          className="flex items-center space-x-1 rtl:space-x-reverse text-emerald-400 hover:text-emerald-300 font-medium"
        >
          <span>{copilotBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};
