'use client';

import React from 'react';
import Link from 'next/link';
import { DocumentTemplate } from '../../types/document';
import { useLocale } from '../../context/LocaleContext';
import { FileText, ArrowRight, ShieldCheck, Stamp } from 'lucide-react';
import { formatTND } from '../../lib/utils';

interface DocumentCardProps {
  template: DocumentTemplate;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ template }) => {
  const { locale } = useLocale();

  const title = template.title[locale] || template.title['derja'];
  const description = template.description[locale] || template.description['derja'];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 hover:shadow-xl transition-all group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-1.5">
            {template.requiresLegalisation && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                <Stamp className="w-3 h-3" />
                <span>Baladiya</span>
              </span>
            )}
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
              {template.category}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div className="text-[11px] text-zinc-400">
          <span className="text-zinc-500">Timbre estimé: </span>
          <span className="font-semibold text-emerald-400">{formatTND(template.requiredTimbreTND, locale)}</span>
        </div>

        <Link
          href={`/documents/${template.slug}`}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors"
        >
          <span>3abbi el PDF</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
