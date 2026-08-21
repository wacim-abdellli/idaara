'use client';

import React from 'react';
import { sampleDocumentsList, SampleDocItem } from '../../data/sampleDocuments';
import { useLocale } from '../../context/LocaleContext';
import { FileText, AlertCircle, Sparkles } from 'lucide-react';
import { getLocalized } from '../../lib/locale-utils';

interface SampleDocsPickerProps {
  onSelectSample: (sample: SampleDocItem) => void;
  selectedId?: string;
}

export const SampleDocsPicker: React.FC<SampleDocsPickerProps> = ({
  onSelectSample,
  selectedId,
}) => {
  const { locale } = useLocale();

  const sectionHeading =
    locale === 'ar'
      ? 'جرّب وثيقة نموذجية (أمثلة حقيقية لإشعارات ومراسلات إدارية) :'
      : locale === 'en'
      ? 'Try with a sample official notice (Real administrative letters) :'
      : locale === 'fr'
      ? "Tester un document type (Exemples réels d'avis administratifs) :"
      : "Jarreb b'un document type (Avis & courriers réels) :";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>{sectionHeading}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sampleDocumentsList.map((doc) => {
          const isSelected = selectedId === doc.id;
          const title = getLocalized(doc.title, locale);
          const category = getLocalized(doc.category, locale);

          const urgencyLabel =
            doc.simulatedOCRResult.urgency === 'critical'
              ? (locale === 'ar' ? 'عاجل جداً' : locale === 'en' ? 'Critical' : locale === 'fr' ? 'Critique' : '3ajel')
              : doc.simulatedOCRResult.urgency === 'high'
              ? (locale === 'ar' ? 'أولوية عالية' : locale === 'en' ? 'High' : locale === 'fr' ? 'Élevée' : '3ali')
              : (locale === 'ar' ? 'عادي' : locale === 'en' ? 'Normal' : 'Normal');

          return (
            <button
              key={doc.id}
              onClick={() => onSelectSample(doc)}
              className={`p-3.5 rounded-2xl text-left rtl:text-right transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950 ring-1 ring-emerald-500/30'
                  : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-2">
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400/90 block mb-0.5 truncate">
                    {category}
                  </span>
                  <h4 className="text-xs font-bold text-zinc-200 leading-snug line-clamp-2">
                    {title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-2 pt-2 border-t border-zinc-800/80">
                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>
                  {locale === 'en' ? 'Urgency:' : 'Urgence :'} <span className="font-semibold text-zinc-300">{urgencyLabel}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
