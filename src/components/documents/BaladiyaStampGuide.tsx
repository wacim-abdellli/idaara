'use client';

import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { Stamp, Copy, AlertTriangle, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { formatTND } from '../../lib/utils';

interface BaladiyaStampGuideProps {
  requiredTimbreTND: number;
  requiresLegalisation: boolean;
  documentTitle: string;
}

export const BaladiyaStampGuide: React.FC<BaladiyaStampGuideProps> = ({
  requiredTimbreTND,
  requiresLegalisation,
  documentTitle,
}) => {
  const { locale } = useLocale();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-zinc-900/90 to-zinc-950 p-4 sm:p-5 shadow-lg space-y-3">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Stamp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
              {locale === 'ar'
                ? 'دليل التعريف بالإمضاء والتنابر الجبائية بالبلدية'
                : locale === 'derja'
                ? 'Dalil el Ta3rif bel Imdha2 wel Timbres fel Baladiya'
                : locale === 'en'
                ? 'Baladiya Legalization & Stamp Placement Guide'
                : 'Guide de Légalisation & Timbres Baladiya'}
            </h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              {locale === 'ar'
                ? 'اتبع هذه الإرشادات لتفادي رفض العقد لدى شباك البلدية'
                : locale === 'derja'
                ? 'Tabba3 hal 9awa3ed bech el baladiya ma tarja3kch'
                : locale === 'en'
                ? 'Follow these rules to avoid rejection at the municipal window'
                : 'Suivez ces consignes pour éviter le rejet de votre document au guichet'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-zinc-400">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
            {formatTND(requiredTimbreTND, locale)}
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded Instructions */}
      {isExpanded && (
        <div className="pt-3 border-t border-zinc-800/80 space-y-3 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Rule 1: Copies */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-zinc-200">
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {locale === 'ar'
                    ? 'عدد النظائر'
                    : locale === 'derja'
                    ? '3 Nadhayer (Copies)'
                    : locale === 'en'
                    ? 'Copies Count'
                    : 'Nombre d’exemplaires'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'اطبع 3 نظائر أصلية (نسخة لكل طرف ونسخة للتسجيل بالقباضة).'
                  : locale === 'derja'
                  ? 'Imprimer 3 copies d’origine (noskha l’kol we7ed w noskha lel 9badha).'
                  : locale === 'en'
                  ? 'Print 3 original copies (1 per party + 1 for tax registration).'
                  : 'Imprimez 3 exemplaires originaux (1 pour chaque partie + 1 pour la Recette).'}
              </p>
            </div>

            {/* Rule 2: Signature */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-zinc-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {locale === 'ar'
                    ? 'الإمضاء الحضوري'
                    : locale === 'derja'
                    ? 'Imdha2 7oudhouri'
                    : locale === 'en'
                    ? 'In-Person Signing'
                    : 'Signature en présence'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? '⚠️ لا تمضِ في المنزل! يجب الإمضاء أمام عون البلدية مع الاستظهار بـ CIN.'
                  : locale === 'derja'
                  ? '⚠️ Ma ts7a7ech fel dar! El s7a7 lezemha 9odem 3oun el baladiya b’CIN.'
                  : locale === 'en'
                  ? '⚠️ Do not sign at home! Signatures must be made in front of the officer.'
                  : '⚠️ Ne signez pas chez vous ! Les signatures se font devant l’agent avec la CIN.'}
              </p>
            </div>

            {/* Rule 3: Timbre */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-zinc-200">
                <Stamp className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {locale === 'ar'
                    ? 'إلصاق التنبر'
                    : locale === 'derja'
                    ? 'Blaset el Timbre'
                    : locale === 'en'
                    ? 'Stamp Affixing'
                    : 'Emplacement Timbre'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? `يُلصق تنبر جبائي بقيمة ${formatTND(requiredTimbreTND, locale)} في أعلى الصفحة الأولى.`
                  : locale === 'derja'
                  ? `7ott timbre fiscal b’${formatTND(requiredTimbreTND, locale)} mel fou9 fel page loula.`
                  : locale === 'en'
                  ? `Affix a ${formatTND(requiredTimbreTND, locale)} fiscal stamp on top of the first page.`
                  : `Collez un timbre fiscal de ${formatTND(requiredTimbreTND, locale)} en haut de la 1ère page.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
