'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTemplateBySlug, documentTemplatesData } from '../../../data/documentTemplates';
import { FormWizard } from '../../../components/documents/FormWizard';
import { PDFPreview } from '../../../components/documents/PDFPreview';
import { useLocale } from '../../../context/LocaleContext';
import { ArrowLeft, FileText, Stamp, ShieldCheck } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link & Header */}
      <div className="mb-6">
        <Link
          href="/documents"
          className="inline-flex items-center space-x-1 text-xs text-zinc-400 hover:text-emerald-400 mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Rojou3 lel 9ayma (Tous les formulaires)</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold mb-1">
              <Stamp className="w-3.5 h-3.5" />
              <span>Modèle Certifié Baladiya & Recette</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{description}</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-right">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Timbre Requis</span>
            <span className="text-sm font-bold text-emerald-400">{template.requiredTimbreTND} DT</span>
          </div>
        </div>
      </div>

      {/* Grid: Form on Left, PDF Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Wizard */}
        <div className="lg:col-span-5 space-y-6">
          <FormWizard
            template={template}
            formData={formData}
            onChangeField={handleChangeField}
            onAutoFillSample={handleAutoFill}
          />
        </div>

        {/* Live Vector PDF Preview */}
        <div className="lg:col-span-7">
          <PDFPreview template={template} formData={formData} />
        </div>
      </div>
    </div>
  );
}
