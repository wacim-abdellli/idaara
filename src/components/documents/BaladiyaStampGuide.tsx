'use client';

import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { Stamp, Copy, AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { formatTND } from '../../lib/utils';

interface BaladiyaStampGuideProps {
  requiredTimbreTND: number;
  requiresLegalisation: boolean;
  documentTitle: string;
}

export const BaladiyaStampGuide: React.FC<BaladiyaStampGuideProps> = ({
  requiredTimbreTND,
}) => {
  const { locale } = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  const guideTitle =
    locale === 'ar'
      ? 'دليل وشروط البلدية والقباضة المالية'
      : locale === 'derja'
      ? 'Chourout el Baladiya wel Recette'
      : locale === 'en'
      ? 'Baladiya & Tax Office Rules'
      : 'Consignes Baladiya & Recette des Finances';

  const briefSummary =
    locale === 'ar'
      ? `3 نظائر أصلية · إمضاء حضوري بالبلدية · تنبر ${formatTND(requiredTimbreTND, locale)}`
      : locale === 'derja'
      ? `3 copies d’origine · Imdha2 7oudhouri · Timbre ${formatTND(requiredTimbreTND, locale)}`
      : locale === 'en'
      ? `3 original copies · In-person signing · ${formatTND(requiredTimbreTND, locale)} stamp`
      : `3 exemplaires · Signature sur place · Timbre ${formatTND(requiredTimbreTND, locale)}`;

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 text-xs overflow-hidden transition-all">
      {/* Clickable Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3.5 sm:px-4 text-left rtl:text-right hover:bg-zinc-800/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse min-w-0">
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-zinc-200 truncate">{guideTitle} :</span>
          <span className="text-zinc-400 text-[11px] hidden sm:inline truncate">{briefSummary}</span>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse text-zinc-400 shrink-0">
          <span className="text-[11px] text-amber-400 font-medium font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            {formatTND(requiredTimbreTND, locale)}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="p-4 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-zinc-400 bg-zinc-950/40 animate-fade-in-up">
          <div className="space-y-1">
            <span className="font-bold text-zinc-200 flex items-center gap-1.5">
              <Copy className="w-3 h-3 text-emerald-400" />
              {locale === 'ar' ? '3 نظائر أصلية' : '3 Exemplaires'}
            </span>
            <p className="leading-relaxed">
              {locale === 'ar'
                ? 'نسخة لكل طرف ونسخة للتسجيل بالقباضة المالية.'
                : '1 exemplaire par partie + 1 pour la Recette.'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              {locale === 'ar' ? 'إمضاء حضوري' : 'Signature en présence'}
            </span>
            <p className="leading-relaxed">
              {locale === 'ar'
                ? 'لا تمضِ في المنزل! الإمضاء حصراً أمام عون البلدية مع بطاقة التعريف.'
                : 'Ne signez pas chez vous ! Signature devant l’agent avec CIN.'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-zinc-200 flex items-center gap-1.5">
              <Stamp className="w-3 h-3 text-amber-400" />
              {locale === 'ar' ? 'التنبر الجبائي' : 'Timbre fiscal'}
            </span>
            <p className="leading-relaxed">
              {locale === 'ar'
                ? `إلصاق تنبر بقيمة ${formatTND(requiredTimbreTND, locale)} في أعلى الصفحة الأولى.`
                : `Coller un timbre de ${formatTND(requiredTimbreTND, locale)} en haut de page.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


