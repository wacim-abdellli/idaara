'use client';

import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { Stamp, Copy, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-950/20 via-[#0d0f14] to-[#07080b] p-5 sm:p-6 shadow-2xl space-y-4">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none gap-3"
      >
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
            <Stamp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
              {locale === 'ar'
                ? 'دليل التعريف بالإمضاء والتنابر الجبائية بالبلدية'
                : locale === 'derja'
                ? 'Dalil el Ta3rif bel Imdha2 wel Timbres fel Baladiya'
                : locale === 'en'
                ? 'Baladiya Legalization & Stamp Placement Guide'
                : 'Guide de Légalisation & Timbres Baladiya'}
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
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

        <div className="flex items-center space-x-3 rtl:space-x-reverse text-zinc-400 shrink-0">
          <span className="text-xs font-mono px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 font-extrabold border border-amber-500/30 shadow-sm">
            {formatTND(requiredTimbreTND, locale)}
          </span>
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expanded Instructions */}
      {isExpanded && (
        <div className="pt-4 border-t border-zinc-800/80 space-y-3 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rule 1: Copies */}
            <div className="p-4 rounded-2xl bg-[#07080b] border border-zinc-800/80 space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-extrabold text-zinc-200">
                <Copy className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'عدد النظائر (3 نسخ)'
                    : locale === 'derja'
                    ? '3 Nadhayer (Copies)'
                    : locale === 'en'
                    ? '3 Original Copies'
                    : 'Nombre d’exemplaires (3)'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
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
            <div className="p-4 rounded-2xl bg-[#07080b] border border-amber-500/20 space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-extrabold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'الإمضاء الحضوري الإلزامي'
                    : locale === 'derja'
                    ? 'Imdha2 7oudhouri'
                    : locale === 'en'
                    ? 'In-Person Signing Only'
                    : 'Signature en présence'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {locale === 'ar'
                  ? '⚠️ لا تمضِ في المنزل! يجب الإمضاء أمام عون البلدية مع الاستظهار بـ CIN.'
                  : locale === 'derja'
                  ? '⚠️ Ma ts7a7ech fel dar! El s7a7 lezemha 9odem 3oun el baladiya b’CIN.'
                  : locale === 'en'
                  ? '⚠️ Do not sign at home! Signatures must be made in front of the officer with your CIN.'
                  : '⚠️ Ne signez pas chez vous ! Les signatures se font devant l’agent avec la CIN.'}
              </p>
            </div>

            {/* Rule 3: Timbre */}
            <div className="p-4 rounded-2xl bg-[#07080b] border border-zinc-800/80 space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-extrabold text-zinc-200">
                <Stamp className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'إلصاق التنبر الجبائي'
                    : locale === 'derja'
                    ? 'Blaset el Timbre'
                    : locale === 'en'
                    ? 'Fiscal Stamp Placement'
                    : 'Emplacement du Timbre'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? `يُلصق تنبر جبائي بقيمة ${formatTND(requiredTimbreTND, locale)} في أعلى الصفحة الأولى بموضع التنبر المخصص.`
                  : locale === 'derja'
                  ? `7ott timbre fiscal b’${formatTND(requiredTimbreTND, locale)} mel fou9 fel page loula.`
                  : locale === 'en'
                  ? `Affix a ${formatTND(requiredTimbreTND, locale)} fiscal stamp on top of the first page in the designated box.`
                  : `Collez un timbre fiscal de ${formatTND(requiredTimbreTND, locale)} en haut de la 1ère page.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

