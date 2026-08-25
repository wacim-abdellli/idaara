'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTemplateBySlug } from '../../../data/documentTemplates';
import { FormWizard } from '../../../components/documents/FormWizard';
import { PDFPreview } from '../../../components/documents/PDFPreview';
import { BaladiyaStampGuide } from '../../../components/documents/BaladiyaStampGuide';
import { useLocale } from '../../../context/LocaleContext';
import { ArrowLeft, Stamp } from 'lucide-react';
import { getLocalized } from '../../../lib/locale-utils';

export default function DocumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const template = getTemplateBySlug(resolvedParams.slug);

  if (!template) {
    notFound();
  }

  const { locale } = useLocale();
  const [formData, setFormData] = useState<Record<string, string | number>>(
    template.sampleData || {}
  );

  const title = getLocalized(template.title, locale);
  const description = getLocalized(template.description, locale);

  const handleChangeField = (fieldName: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleAutoFill = () => {
    if (template.sampleData) {
      setFormData(template.sampleData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back link & Header */}
      <div className="space-y-4">
        <Link
          href="/documents"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold text-zinc-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          <span>
            {locale === 'ar'
              ? 'الرجوع إلى قائمة النماذج والعقود'
              : locale === 'derja'
              ? 'Arje3 lel les formulaires wel contrats'
              : locale === 'en'
              ? 'Back to all document templates'
              : 'Retour à la liste des formulaires'}
          </span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-[#0d0f14] border border-white/[0.08] shadow-2xl">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-amber-400 font-bold">
              <Stamp className="w-4 h-4 shrink-0" />
              <span>
                {locale === 'ar'
                  ? 'نموذج رسمي معتمد ومطابق لتراتيب البلدية والقباضة المالية'
                  : locale === 'derja'
                  ? 'Modèle Homologué Baladiya & Recette'
                  : locale === 'en'
                  ? 'Certified Legal Model for Baladiya & Recette'
                  : 'Modèle Certifié Baladiya & Recette'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">{description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#07080b] border border-amber-500/25 text-right rtl:text-left shrink-0 shadow-lg">
            <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-wider">
              {locale === 'ar'
                ? 'التنبر المطلوب'
                : locale === 'derja'
                ? 'El Timbre el Matloub'
                : locale === 'en'
                ? 'Required Stamp'
                : 'Timbre Requis'}
            </span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">{template.requiredTimbreTND} DT</span>
          </div>
        </div>
      </div>

      {/* Baladiya Legalization & Stamp Placement Guide Banner */}
      <BaladiyaStampGuide
        requiredTimbreTND={template.requiredTimbreTND}
        requiresLegalisation={template.requiresLegalisation}
        documentTitle={title}
      />

      {/* Grid: Form on Left, PDF Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Wizard */}
        <div className="lg:col-span-5 space-y-6">
          <FormWizard
            template={template}
            formData={formData}
            onChangeField={handleChangeField}
            onAutoFillSample={handleAutoFill}
          />
        </div>

        {/* Live Vector PDF Preview with Sticky positioning */}
        <div className="lg:col-span-7 lg:sticky lg:top-20">
          <PDFPreview template={template} formData={formData} />
        </div>
      </div>
    </div>
  );
}
