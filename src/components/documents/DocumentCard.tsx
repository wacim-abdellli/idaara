'use client';

import React from 'react';
import Link from 'next/link';
import { DocumentTemplate } from '../../types/document';
import { useLocale } from '../../context/LocaleContext';
import { FileText, ArrowRight, Stamp, ShieldCheck } from 'lucide-react';
import { formatTND } from '../../lib/utils';
import { getLocalized } from '../../lib/locale-utils';

interface DocumentCardProps {
  template: DocumentTemplate;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ template }) => {
  const { locale } = useLocale();

  const title = getLocalized(template.title, locale);
  const description = getLocalized(template.description, locale);

  const fillBtnText =
    locale === 'ar' ? 'تعبئة واستخراج PDF' : locale === 'en' ? 'Fill & Generate PDF' : 'Remplir le PDF';

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800/80 flex flex-col justify-between hover:border-zinc-700 hover:shadow-2xl transition-all duration-200 group relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold truncate max-w-[140px]">
              {template.category}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 rtl:space-x-reverse shrink-0">
            {template.requiresLegalisation && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 flex items-center space-x-1 rtl:space-x-reverse">
                <Stamp className="w-3 h-3" />
                <span>Baladiya</span>
              </span>
            )}
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-zinc-900 text-emerald-400 border border-zinc-800">
              {formatTND(template.requiredTimbreTND, locale)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Legal basis badge */}
        {template.legalBasis && (
          <div className="mb-4 text-[10px] text-zinc-500 font-mono flex items-center space-x-1 rtl:space-x-reverse truncate">
            <ShieldCheck className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="truncate">{template.legalBasis}</span>
          </div>
        )}
      </div>

      {/* Footer / CTA */}
      <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between">
        <div className="text-[11px] font-mono text-zinc-500">
          <span>{template.fields.length} {locale === 'ar' ? 'حقول' : 'champs'}</span>
        </div>

        <Link
          href={`/documents/${template.slug}`}
          className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer"
        >
          <span>{fillBtnText}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};
