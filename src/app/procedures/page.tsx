'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { proceduresData } from '../../data/procedures';
import { useLocale } from '../../context/LocaleContext';
import { formatTND } from '../../lib/utils';
import {
  BookOpen,
  Search,
  ArrowRight,
  Clock,
  Coins,
  ShieldCheck,
  CreditCard,
  Car,
  Briefcase,
  Home,
  HeartPulse,
  Plane
} from 'lucide-react';
import { ProcedureVertical } from '../../types/procedure';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

  const verticals: Array<{ id: string; label: string; icon: React.ElementType }> = [
    { id: 'all', label: 'Toutes les Démarches', icon: BookOpen },
    { id: 'identity', label: '🪪 Identité & Citoyenneté', icon: CreditCard },
    { id: 'transport', label: '🚗 Transport & Véhicules', icon: Car },
    { id: 'business', label: '🏢 Entreprise & Freelance', icon: Briefcase },
    { id: 'housing', label: '🏠 Logement & Énergie', icon: Home },
    { id: 'healthcare', label: '🏥 Santé & CNAM/CNSS', icon: HeartPulse },
    { id: 'customs', label: '✈️ Douane & Diaspora', icon: Plane },
  ];

  const filteredProcedures = proceduresData.filter((proc) => {
    const matchesVertical =
      selectedVertical === 'all' || proc.vertical === selectedVertical;
    const matchesSearch =
      proc.title.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.title.derja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.title.ar.includes(searchQuery) ||
      proc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesVertical && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Dalil el Idara · Guide Exhaustif des Démarches Citoyennes</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          📚 Catalogue des Procédures Administratives (V1)
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Retrouvez la liste complète des pièces à fournir, les montants des timbres fiscaux, les délais de délivrance et les guichets compétents pour chaque démarche.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVertical(v.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedVertical === v.id
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une démarche (ex: Passeport, CIN...)"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Procedures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcedures.map((proc) => {
          const title = proc.title[locale] || proc.title['derja'];
          const desc = proc.shortDescription[locale] || proc.shortDescription['derja'];

          return (
            <div
              key={proc.id}
              className="glass-panel rounded-2xl p-6 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                    {proc.vertical}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-zinc-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proc.estimatedProcessingTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{desc}</p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-zinc-500 text-[11px] block">Coût Timbres :</span>
                  <span className="font-bold text-emerald-400">
                    {formatTND(proc.estimatedTotalCostTND, locale)}
                  </span>
                </div>

                <Link
                  href={`/procedures/${proc.id}`}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                >
                  <span>Guide Détaillé</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
