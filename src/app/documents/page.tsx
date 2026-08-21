'use client';

import React, { useState } from 'react';
import { documentTemplatesData } from '../../data/documentTemplates';
import { DocumentCard } from '../../components/documents/DocumentCard';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { FileText, Search, ShieldCheck, CheckCircle2, Download, Stamp, Sparkles } from 'lucide-react';

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

  const headlineMain =
    locale === 'ar'
      ? 'نماذج العقود والاستمارات'
      : locale === 'en'
      ? 'Official Legal Forms'
      : 'Formulaires & Contrats';

  const headlineAccent =
    locale === 'ar'
      ? 'المطابقة للبلدية.'
      : locale === 'en'
      ? '& Certified Contracts.'
      : 'Homologués Baladiya.';

  const subtitle =
    locale === 'ar'
      ? 'استخرج في ثوانٍ عقود الكراء، التواكيل، والتصاريح على الشرف بصيغة رسمية مطابقة مع مواقع التنابر ومناطق التعريف بالإمضاء.'
      : locale === 'en'
      ? 'Generate certified lease contracts, powers of attorney, and sworn declarations formatted with exact fiscal stamp slots and legalization zones.'
      : "Générez en quelques clics vos contrats de location, procurations, déclarations sur l'honneur au format officiel conforme avec emplacements timbres fiscaux.";

  const legalSpecs = [
    { title: locale === 'en' ? 'COC Compliance' : 'Conformité Code COC', desc: locale === 'en' ? 'Valid before Tunisian courts & banks' : 'Articles 1104 & suivants' },
    { title: locale === 'en' ? 'Stamp Pre-alignment' : 'Cadres Timbres Fiscaux', desc: locale === 'en' ? 'Slots for 3 DT / 5 DT / 30 DT' : 'Réservés pour la recette' },
    { title: locale === 'en' ? 'Baladiya Legalization' : 'Mention Ta3rif bel Imdha2', desc: locale === 'en' ? 'Formatted for municipal stamps' : 'Espace légalisation officiel' },
    { title: locale === 'en' ? 'Instant Vector PDF' : 'Export PDF Vectoriel A4', desc: locale === 'en' ? 'Print ready, 0 sign-up needed' : 'Prêt à imprimer immédiatement' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">

      {/* ── 2-Column Hero Header (Balances Left & Right space) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-emerald-400 font-bold">/</span>
            <span>Code des Obligations et des Contrats (COC)</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <span
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Official Legalization & Standards Hub */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Stamp className="w-3.5 h-3.5 text-amber-400" />
                <span>{locale === 'en' ? 'Legal Form Specifications' : 'Normes Administratives'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                100% Conforme
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {legalSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="text-[10px] font-bold text-zinc-200 truncate">
                      {spec.title}
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-500 line-clamp-1">
                    {spec.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ── Templates Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <DocumentCard key={template.slug} template={template} />
        ))}
      </div>
    </div>
  );
}
