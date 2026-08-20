'use client';

import React from 'react';
import { Check, X, Sparkles, Shield, Rocket } from 'lucide-react';

export const StatusComparator: React.FC = () => {
  const statuses = [
    {
      id: 'auto-entrepreneur',
      name: "Statut Auto-Entrepreneur",
      badge: "Recommandé Freelances & Devs 🚀",
      taxRate: "1% (Services) / 0.5% (Commerce)",
      cnss: "Forfaitaire symbolique (~50 DT / trimestre)",
      comptable: "Non requis (Plateforme en ligne)",
      capital: "0 DT",
      facturation: "Factures avec Matricule National QR",
      maxChiffreAffaire: "Jusqu'à 75 000 DT / an",
      color: "border-emerald-500 bg-emerald-950/20",
    },
    {
      id: 'patente-personne-physique',
      name: "Patente Personne Physique",
      badge: "Professions libérales & Artisans",
      taxRate: "Barème progressif IRPP (Jusqu'à 35%)",
      cnss: "Régime des Indépendants (Palier déclaré)",
      comptable: "Recommandé / Bilan annuel simplifié",
      capital: "0 DT",
      facturation: "Factures avec Matricule Fiscal Recette",
      maxChiffreAffaire: "Illimité",
      color: "border-zinc-800 bg-zinc-900/60",
    },
    {
      id: 'suarl',
      name: "Société SUARL (Personne Morale)",
      badge: "Startups & Sociétés d'Export",
      taxRate: "15% IS (Impôt sur les Sociétés)",
      cnss: "Gérant majoritaire non salarié",
      comptable: "Obligatoire (Comptable agréé)",
      capital: "1 000 DT (Bloqué en banque)",
      facturation: "Société commerciale RNE",
      maxChiffreAffaire: "Illimité",
      color: "border-zinc-800 bg-zinc-900/60",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h3 className="text-lg font-bold text-white">
          Comparateur des Statuts Juridiques en Tunisie
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Trouvez la structure fiscale et juridique idéale pour votre activité de freelance ou d'entreprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((s) => (
          <div
            key={s.id}
            className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${s.color}`}
          >
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700 block w-fit mb-3">
                {s.badge}
              </span>
              <h4 className="text-base font-bold text-white mb-4">{s.name}</h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[11px]">Taux d'Impôt :</span>
                  <span className="font-semibold text-zinc-200">{s.taxRate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Cotisations CNSS :</span>
                  <span className="font-semibold text-zinc-200">{s.cnss}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Comptable / Déclarations :</span>
                  <span className="font-semibold text-zinc-200">{s.comptable}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Plafond Chiffre d'Affaires :</span>
                  <span className="font-semibold text-zinc-200">{s.maxChiffreAffaire}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Capital de départ :</span>
                  <span className="font-semibold text-zinc-200">{s.capital}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
