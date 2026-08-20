'use client';

import React, { useState } from 'react';
import { PublicOffice } from '../../types/office';
import { useLocale } from '../../context/LocaleContext';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Stamp,
  Moon,
  Sun
} from 'lucide-react';

interface OfficeCardProps {
  office: PublicOffice;
  activeScheduleMode: 'regular' | 'ramadan' | 'summer';
}

export const OfficeCard: React.FC<OfficeCardProps> = ({
  office,
  activeScheduleMode,
}) => {
  const { locale } = useLocale();

  const name = office.name[locale] || office.name['derja'];
  const tips = office.tips?.[locale] || office.tips?.['derja'];

  const getScheduleText = () => {
    switch (activeScheduleMode) {
      case 'ramadan':
        return {
          icon: <Moon className="w-3.5 h-3.5 text-amber-400" />,
          label: "Horaire Ramadan",
          text: `${office.schedule.ramadan.days} : ${office.schedule.ramadan.hours}`,
        };
      case 'summer':
        return {
          icon: <Sun className="w-3.5 h-3.5 text-orange-400" />,
          label: "Séance Unique (Été)",
          text: `${office.schedule.summer.days} : ${office.schedule.summer.hours}`,
        };
      default:
        return {
          icon: <Clock className="w-3.5 h-3.5 text-emerald-400" />,
          label: "Horaire Normal",
          text: `${office.schedule.regular.days} : ${office.schedule.regular.hours}`,
        };
    }
  };

  const scheduleInfo = getScheduleText();

  const categoryLabels: Record<string, string> = {
    baladiya: "Municipalité / Baladiya",
    recette_finances: "Recette des Finances",
    poste: "Bureau de Poste (La Poste TN)",
    cnss: "Caisse CNSS",
    cnam: "Centre CNAM",
    attt: "Agence ATTT (Transports)",
    rne: "Registre Entreprises (RNE)",
    police_garde: "Poste de Police / Garde",
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-all">
      <div>
        {/* Category & Wilaya Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
            {categoryLabels[office.category] || office.category}
          </span>
          <span className="text-xs font-semibold text-zinc-400">
            📍 {office.governorate} · {office.delegation}
          </span>
        </div>

        {/* Office Title */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {name}
        </h3>

        {/* Address & Phone */}
        <div className="space-y-1.5 text-xs text-zinc-400 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{office.address}</span>
          </div>
          {office.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <a
                href={`tel:${office.phone}`}
                className="hover:text-emerald-400 transition-colors font-mono"
              >
                {office.phone}
              </a>
            </div>
          )}
        </div>

        {/* Dynamic Schedule Banner */}
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs mb-4">
          <div className="flex items-center space-x-1.5 font-bold text-zinc-200 mb-1">
            {scheduleInfo.icon}
            <span>{scheduleInfo.label} :</span>
          </div>
          <p className="text-zinc-400 font-mono text-[11px]">{scheduleInfo.text}</p>
        </div>

        {/* Services Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {office.hasConformeService && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Copie Conforme / Baladiya</span>
            </span>
          )}
          {office.hasTimbreVendor && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 flex items-center space-x-1">
              <Stamp className="w-3 h-3" />
              <span>Vente Timbres Fiscaux</span>
            </span>
          )}
        </div>

        {/* Local Citizen Tips */}
        {tips && (
          <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 mb-4">
            💡 <strong className="text-zinc-300">Astuce locale :</strong> {tips}
          </div>
        )}
      </div>

      {/* Navigation Button */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-end">
        <a
          href={office.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Itinéraire GPS (Google Maps)</span>
        </a>
      </div>
    </div>
  );
};
