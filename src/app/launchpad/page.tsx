'use client';

import React, { useState } from 'react';
import { StatusComparator } from '../../components/launchpad/StatusComparator';
import { TaxCalculator } from '../../components/launchpad/TaxCalculator';
import { ExportInvoiceGen } from '../../components/launchpad/ExportInvoiceGen';
import { Rocket, ShieldCheck, FileCheck, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LaunchpadPage() {
  const [activeTab, setActiveTab] = useState<'comparator' | 'tax' | 'invoice'>('comparator');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Rocket className="w-3.5 h-3.5" />
          <span>Plateforme Dédiée aux Développeurs, Freelances & Fondateurs</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          🚀 Freelancer & Entrepreneur Launchpad
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Lancez votre activité en Tunisie en toute sérénité : comparez les statuts (Auto-Entrepreneur vs Patente vs SUARL), simulez vos impôts à 1%, et générez des factures d'exportation conformes à la BCT.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-zinc-800 pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('comparator')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'comparator'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          ⚖️ Comparateur de Statuts
        </button>

        <button
          onClick={() => setActiveTab('tax')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'tax'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          🧮 Simulateur Impôts (1%) & CNSS
        </button>

        <button
          onClick={() => setActiveTab('invoice')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'invoice'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          📄 Factures Export (EUR / USD)
        </button>
      </div>

      {/* Content based on Tab */}
      <div className="mb-12">
        {activeTab === 'comparator' && <StatusComparator />}
        {activeTab === 'tax' && <TaxCalculator />}
        {activeTab === 'invoice' && <ExportInvoiceGen />}
      </div>

      {/* Auto-Entrepreneur Platform Quick Link Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white mb-1">
            Prêt à vous inscrire au Statut Auto-Entrepreneur ?
          </h4>
          <p className="text-xs text-zinc-400 max-w-xl">
            L'inscription s'effectue directement sur le portail national officiel avec votre CIN et justificatif d'activité.
          </p>
        </div>

        <a
          href="https://autoentrepreneur.tn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
        >
          <span>Accéder au Portail National</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
