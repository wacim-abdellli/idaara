'use client';

import React, { useState } from 'react';
import { documentTemplatesData } from '../../data/documentTemplates';
import { DocumentCard } from '../../components/documents/DocumentCard';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { FileText, Search } from 'lucide-react';

export default function DocumentsPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع النماذج والعقود'
          : locale === 'en'
          ? 'All Templates & Forms'
          : locale === 'fr'
          ? 'Tous les Formulaires'
          : 'Les Formulaires el Kol',
    },
    {
      id: 'contracts',
      label:
        locale === 'ar'
          ? 'عقود الكراء والبيع'
          : locale === 'en'
          ? 'Contracts & Leases'
          : 'Contrats & Baux',
    },
    {
      id: 'authorizations',
      label:
        locale === 'ar'
          ? 'التواكيل والتفويض'
          : locale === 'en'
          ? 'Power of Attorney & Mandates'
          : 'Procurations & Mandats',
    },
    {
      id: 'declarations',
      label:
        locale === 'ar'
          ? 'تصاريح على الشرف'
          : locale === 'en'
          ? 'Sworn Declarations'
          : 'Déclarations sur l’honneur',
    },
  ];

  const filteredTemplates = documentTemplatesData.filter((tmpl) => {
    const title = getLocalized(tmpl.title, locale).toLowerCase();
    const desc = getLocalized(tmpl.description, locale).toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch = title.includes(q) || desc.includes(q);
    const matchesCat = selectedCategory === 'all' || tmpl.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const pageTitle =
    locale === 'ar'
      ? '📝 استمارات وعقود جاهزة للبلدية'
      : locale === 'en'
      ? '📝 Official Forms & Legal Contracts for Baladiya'
      : locale === 'fr'
      ? '📝 Formulaires & Contrats Prêts pour la Baladiya'
      : '📝 3ou9oud w Formulaires 7adhra lel Baladiya';

  const pageDesc =
    locale === 'ar'
      ? 'استخرج في ثوانٍ عقود الكراء، التواكيل، والتصاريح على الشرف بصيغة رسمية مطابقة مع مواقع التنابر ومناطق التعريف بالإمضاء.'
      : locale === 'en'
      ? 'Generate certified lease contracts, powers of attorney, and sworn declarations in seconds, formatted with exact fiscal stamp slots and legalization zones.'
      : locale === 'fr'
      ? "Générez en quelques clics vos contrats de location, procurations, déclarations sur l'honneur au format officiel avec emplacements timbres fiscaux."
      : "Talla3 fi thweni 3a9d kré, tawkîl, tasrîh bi charaf b'format rasmi mrigel lel Baladiya.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-4">
          <FileText className="w-3 h-3" />
          <span>
            {locale === 'ar'
              ? 'مُولّد الوثائق والعقود الإدارية التونسية'
              : locale === 'en'
              ? 'Tunisian Vector Administrative Documents Generator'
              : 'Générateur Vectoriel de Documents Administratifs'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
          {pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          {pageDesc}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === 'ar'
                ? 'ابحث عن نموذج...'
                : locale === 'en'
                ? 'Search a template...'
                : 'Rechercher un modèle...'
            }
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <DocumentCard key={template.slug} template={template} />
        ))}
      </div>
    </div>
  );
}
