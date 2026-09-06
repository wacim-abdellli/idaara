'use client';

import React from 'react';
import { sampleDocumentsList, SampleDocItem } from '../../data/sampleDocuments';
import { useLocale } from '../../context/LocaleContext';
import { FileText, AlertCircle, Sparkles, Building2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { getLocalized } from '../../lib/locale-utils';

interface SampleDocsPickerProps {
  onSelectSample: (sample: SampleDocItem) => void;
  selectedId?: string;
  isAnalyzing?: boolean;
}

export const SampleDocsPicker: React.FC<SampleDocsPickerProps> = ({
  onSelectSample,
  selectedId,
  isAnalyzing,
}) => {
  const { locale } = useLocale();

  const sectionHeading =
    locale === 'ar'
      ? 'جرّب وثيقة رسمية نموذجية (أمثلة واقعية لإشعارات ومراسلات الدولة) :'
      : locale === 'derja'
      ? 'Wathaye9 rasmiya tounes (Amthila wa9i3iya lel ta7lil) :'
      : locale === 'en'
      ? 'Try with a verified sample notice (Real Tunisian official letters) :'
      : "Tester un courrier type (Exemples réels d'avis administratifs) :";

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{sectionHeading}</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          {sampleDocumentsList.length}{' '}
          {locale === 'ar'
            ? 'نماذج متوفرة'
            : locale === 'derja'
            ? 'modèles disponibles'
            : locale === 'en'
            ? 'sample docs'
            : 'modèles certifiés'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sampleDocumentsList.map((doc) => {
          const isSelected = selectedId === doc.id;
          const title = getLocalized(doc.title, locale);
          const category = getLocalized(doc.category, locale);

          const urgencyConfig =
            doc.simulatedOCRResult.urgency === 'critical'
              ? {
                  label:
                    locale === 'ar'
                      ? 'عاجل جداً'
                      : locale === 'derja'
                      ? '3ajel barcha'
                      : locale === 'en'
                      ? 'Critical'
                      : 'Critique',
                  badge: 'bg-red-500/15 text-red-300 border-red-500/30',
                }
              : doc.simulatedOCRResult.urgency === 'high'
              ? {
                  label:
                    locale === 'ar'
                      ? 'أولوية عالية'
                      : locale === 'derja'
                      ? 'Awlawiya 3aliya'
                      : locale === 'en'
                      ? 'High'
                      : 'Élevée',
                  badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                }
              : {
                  label:
                    locale === 'ar'
                      ? 'عادي'
                      : locale === 'derja'
                      ? '3adi'
                      : locale === 'en'
                      ? 'Normal'
                      : 'Normal',
                  badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
                };

          return (
            <button
              key={doc.id}
              onClick={() => onSelectSample(doc)}
              disabled={isAnalyzing}
              className={`p-4 rounded-2xl text-left rtl:text-right transition-all duration-200 border flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                isSelected
                  ? 'bg-[#121c17] border-emerald-500 shadow-xl shadow-emerald-950 ring-1 ring-emerald-500/40 scale-[1.02]'
                  : 'bg-[#12141a]/80 hover:bg-[#151821] border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Active Indicator Top Glow */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
              )}

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400/90 truncate">
                    {category}
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${urgencyConfig.badge}`}
                  >
                    {urgencyConfig.label}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-zinc-100 group-hover:text-white leading-snug line-clamp-2">
                  {title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-3 pt-2.5 border-t border-white/[0.06]">
                <span className="flex items-center gap-1 text-zinc-400 font-mono text-[10px]">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>
                    {(doc.simulatedOCRResult.deadlineDate || '').split('(')[0].trim() ||
                      (locale === 'ar'
                        ? 'الأجل القانوني'
                        : locale === 'derja'
                        ? 'Ajel 9anouni'
                        : locale === 'en'
                        ? 'Legal deadline'
                        : 'Délai légal')}
                  </span>
                </span>
                <span className="text-emerald-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-[10px]">
                  <span>
                    {locale === 'ar'
                      ? 'تحليل'
                      : locale === 'derja'
                      ? 'Fasserli hal war9a'
                      : locale === 'en'
                      ? 'Test'
                      : 'Tester'}
                  </span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
