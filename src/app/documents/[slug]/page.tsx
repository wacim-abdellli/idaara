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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Minimalist Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800/60">
        <div>
          <Link
            href="/documents"
            className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-zinc-400 hover:text-zinc-200 transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>
              {locale === 'ar'
                ? 'النماذج والعقود'
                : locale === 'derja'
                ? 'Les formulaires wel contrats'
                : locale === 'en'
                ? 'All templates'
                : 'Tous les formulaires'}
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Stamp className="w-3 h-3 text-amber-400" />
              <span>{template.requiredTimbreTND} DT</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{description}</p>
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
