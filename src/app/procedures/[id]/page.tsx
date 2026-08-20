'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProcedureById } from '../../../data/procedures';
import { useLocale } from '../../../context/LocaleContext';
import { TimbreCostBreakdown } from '../../../components/calculator/TimbreCostBreakdown';
import { ChecklistTracker } from '../../../components/calculator/ChecklistTracker';
import {
  ArrowLeft,
  Clock,
  Coins,
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatTND } from '../../../lib/utils';

export default function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const procedure = getProcedureById(resolvedParams.id);

  if (!procedure) {
    notFound();
  }

  const { locale, isRtl } = useLocale();

  const title = procedure.title[locale] || procedure.title['derja'];
  const fullDesc = procedure.fullDescription[locale] || procedure.fullDescription['derja'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/procedures"
        className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-zinc-400 hover:text-emerald-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
        <span>{locale === 'ar' ? 'الرجوع إلى دليل الإجراءات' : 'Retour à la liste des démarches'}</span>
      </Link>

      {/* Hero Header Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-7 border border-zinc-800 mb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
              {procedure.vertical}
            </span>
            <span className="text-xs text-zinc-400 flex items-center space-x-1 rtl:space-x-reverse">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{locale === 'ar' ? 'المدة التقديرية :' : 'Délai estimé :'} {procedure.estimatedProcessingTime}</span>
            </span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center space-x-1.5 rtl:space-x-reverse">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{locale === 'ar' ? 'معلوم التنابر :' : 'Budget Timbres :'}</span>
            <span className="font-mono font-bold text-emerald-400">{formatTND(procedure.estimatedTotalCostTND, locale)}</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          {fullDesc}
        </p>

        {/* Quick Action Badges */}
        {procedure.templateSlug && (
          <div className="pt-3 border-t border-zinc-800/80 flex items-center">
            <Link
              href={`/documents/${procedure.templateSlug}`}
              className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>{locale === 'ar' ? 'استخراج النموذج وتعميره تلقائياً' : 'Remplir le formulaire officiel en ligne'}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Main Grid: Steps & Interactive Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Left Column: Step-by-Step Chronological Guide */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800 space-y-5">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 rtl:space-x-reverse pb-3.5 border-b border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{locale === 'ar' ? 'المسار الإجرائي خطوة بخطوة' : 'Étapes et Démarches (Marahal el Idara)'}</span>
            </h2>

            <div className="space-y-5 relative before:absolute before:inset-0 before:left-3 rtl:before:left-auto rtl:before:right-3 before:w-0.5 before:bg-zinc-800">
              {procedure.steps.map((step) => {
                const stepTitle = step.title[locale] || step.title['derja'];
                const stepDesc = step.description[locale] || step.description['derja'];
                const tips = step.tips?.[locale] || step.tips?.['derja'];

                return (
                  <div key={step.stepNumber} className="relative flex items-start space-x-3.5 rtl:space-x-reverse">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs shrink-0 shadow-md shadow-emerald-500/30 z-10">
                      {step.stepNumber}
                    </div>

                    <div className="flex-1 space-y-1 pt-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white">{stepTitle}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{stepDesc}</p>

                      <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] text-zinc-500">
                        <span className="flex items-center space-x-1 rtl:space-x-reverse text-emerald-400">
                          <Building2 className="w-3 h-3" />
                          <span>{step.targetOffice}</span>
                        </span>
                        <span className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedDuration}</span>
                        </span>
                      </div>

                      {tips && (
                        <div className="mt-2 p-2 rounded-lg bg-zinc-900/70 border border-zinc-800 text-[11px] text-amber-300">
                          💡 {tips}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Offices Link */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold block">{locale === 'ar' ? 'هل تبحث عن أقرب مركز أو بلدية؟' : 'Vous cherchez le bureau le plus proche ?'}</span>
              <span>{locale === 'ar' ? 'اطلع على دليل المصالح والبلديات حسب ولايتك' : 'Consultez les adresses dans votre gouvernorat'}</span>
            </div>
            <Link
              href={`/locator`}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors shrink-0"
            >
              {locale === 'ar' ? 'دليل المصالح' : 'Annuaire GPS'}
            </Link>
          </div>
        </div>

        {/* Right Column: Costs & Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <TimbreCostBreakdown procedure={procedure} />
          <ChecklistTracker procedure={procedure} />
        </div>
      </div>
    </div>
  );
}
