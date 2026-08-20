'use client';

import React, { useState } from 'react';
import { documentTemplatesData } from '../../data/documentTemplates';
import { DocumentCard } from '../../components/documents/DocumentCard';
import { useLocale } from '../../context/LocaleContext';
import { FileText, ShieldCheck, Sparkles, Search } from 'lucide-react';

export default function DocumentsPage() {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous les Formulaires' },
    { id: 'contracts', label: 'Contrats & Baux' },
    { id: 'authorizations', label: 'Procurations & Mandats' },
    { id: 'declarations', label: 'Déclarations sur l’honneur' },
  ];

  const filteredTemplates = documentTemplatesData.filter((tmpl) => {
    const matchesSearch =
      tmpl.title.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.title.derja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.title.ar.includes(searchQuery);

    const matchesCat = selectedCategory === 'all' || tmpl.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Générateur Vectoriel de Documents Administratifs Tunisiens</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          📝 Formulaires & Contrats Prêts pour la Baladiya
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Générez en quelques clics vos contrats de location, procurations, déclarations sur l'honneur et actes de vente au format officiel certifié avec emplacements timbres fiscaux et zones de légalisation.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un modèle..."
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
