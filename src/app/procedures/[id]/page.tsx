'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProcedureById } from '../../../data/procedures';
import { getTemplateBySlug } from '../../../data/documentTemplates';
import { useLocale } from '../../../context/LocaleContext';
import { TimbreCostBreakdown } from '../../../components/calculator/TimbreCostBreakdown';
import { ChecklistTracker } from '../../../components/calculator/ChecklistTracker';
import { DossierKitExport } from '../../../components/calculator/DossierKitExport';
import { getLocalized } from '../../../lib/locale-utils';
import { getVerticalLabel } from '../../../lib/vertical-labels';
import {
  ArrowLeft,
  Clock,
  Coins,
  Building2,
  FileText,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
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

  const { locale } = useLocale();

  const title = getLocalized(procedure.title, locale);
  const fullDesc = getLocalized(procedure.fullDescription, locale);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link
        href="/procedures"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
        <span>
          {locale === 'ar'
            ? 'الرجوع إلى دليل الإجراءات'
            : locale === 'derja'
            ? 'Arje3 l’dalil el démarches'
            : locale === 'en'
            ? 'Back to procedures'
            : 'Retour à la liste des démarches'}
        </span>
      </Link>

      {/* Hero Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              {getVerticalLabel(procedure.vertical, locale)}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>
                {locale === 'ar'
                  ? 'المدة التقديرية :'
                  : locale === 'derja'
                  ? 'El Wa9t el Te9ribi :'
                  : locale === 'en'
                  ? 'Est. duration:'
                  : 'Délai estimé :'}{' '}
                <strong className="text-zinc-200 font-semibold">{getLocalized(procedure.estimatedProcessingTime, locale)}</strong>
              </span>
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {locale === 'ar'
                ? 'معلوم التنابر :'
                : locale === 'derja'
                ? 'Masrouf el Timbres :'
                : locale === 'en'
                ? 'Stamp budget:'
                : 'Budget Timbres :'}
            </span>
            <span className="font-mono font-extrabold text-emerald-400">{formatTND(procedure.estimatedTotalCostTND, locale)}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          {fullDesc}
        </p>

        {/* Quick Action Badges */}
        {procedure.templateSlug && getTemplateBySlug(procedure.templateSlug) && (
          <div className="pt-4 border-t border-zinc-800/80 flex items-center">
            <Link
              href={`/documents/${procedure.templateSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>
                {locale === 'ar'
                  ? 'استخراج النموذج وتعميره تلقائياً'
                  : locale === 'derja'
                  ? 'Talla3 el Formulaire w 3ammrou direct'
                  : locale === 'en'
                  ? 'Fill official form online'
                  : 'Remplir le formulaire officiel en ligne'}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Main Grid: Steps & Interactive Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Step-by-Step Chronological Guide */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800 space-y-6 shadow-xl">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 pb-4 border-b border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {locale === 'ar'
                  ? 'المسار الإجرائي خطوة بخطوة'
                  : locale === 'derja'
                  ? 'El Khatwet el Idariya Khatwa b’Khatwa'
                  : locale === 'en'
                  ? 'Step-by-step procedure guide'
                  : 'Étapes et Démarches (Marahal el Idara)'}
              </span>
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 rtl:before:left-auto rtl:before:right-3.5 before:w-0.5 before:bg-zinc-800">
              {procedure.steps.map((step) => {
                const stepTitle = getLocalized(step.title, locale);
                const stepDesc = getLocalized(step.description, locale);
                const tips = step.tips ? getLocalized(step.tips, locale) : undefined;

                return (
                  <div key={step.stepNumber} className="relative flex items-start gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-zinc-950 font-extrabold text-xs shrink-0 shadow-lg shadow-emerald-500/30 z-10">
                      {step.stepNumber}
                    </div>

                    <div className="flex-1 space-y-1.5 pt-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">{stepTitle}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{stepDesc}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-zinc-500">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{getLocalized(step.targetOffice, locale)}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{step.estimatedDuration}</span>
                        </span>
                      </div>

                      {tips && (
                        <div className="mt-2.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{tips}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Offices Link */}
          <div className="p-5 rounded-3xl glass-panel border border-zinc-800 flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold block">
                {locale === 'ar'
                  ? 'هل تبحث عن أقرب مركز أو بلدية؟'
                  : locale === 'derja'
                  ? 'Tlawej 3la a9rab markez walla baladiya?'
                  : locale === 'en'
                  ? 'Looking for the closest office or municipality?'
                  : 'Vous cherchez le bureau le plus proche ?'}
              </span>
              <span className="text-zinc-500">
                {locale === 'ar'
                  ? 'اطلع على دليل المصالح والبلديات حسب ولايتك'
                  : locale === 'derja'
                  ? 'Chouf les adresses wel baladiyas fi wilaytek'
                  : locale === 'en'
                  ? 'Browse official offices in your governorate'
                  : 'Consultez les adresses dans votre gouvernorat'}
              </span>
            </div>
            <Link
              href={`/locator`}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all shrink-0 hover:scale-105"
            >
              {locale === 'ar' ? 'دليل المصالح' : locale === 'derja' ? 'Dalil el Masale7' : locale === 'en' ? 'Office Locator' : 'Annuaire GPS'}
            </Link>
          </div>
        </div>

        {/* Right Column: Costs & Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <TimbreCostBreakdown procedure={procedure} />
          <ChecklistTracker procedure={procedure} />
          <DossierKitExport procedure={procedure} />
        </div>
      </div>
    </div>
  );
}
