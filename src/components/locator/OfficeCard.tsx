'use client';

import React from 'react';
import { PublicOffice } from '../../types/office';
import { useLocale } from '../../context/LocaleContext';
import {
  MapPin,
  Phone,
  Clock,
  Navigation2,
  CheckCircle2,
  Stamp,
  Moon,
  Sun,
  Lightbulb
} from 'lucide-react';

interface OfficeCardProps {
  office: PublicOffice;
  activeScheduleMode: 'regular' | 'ramadan' | 'summer';
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  baladiya:         { label: 'Municipalité / Baladiya', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' },
  recette_finances: { label: 'Recette des Finances',   color: 'bg-amber-500/10 text-amber-400 border-amber-500/25' },
  poste:            { label: 'Bureau de Poste',         color: 'bg-blue-500/10 text-blue-400 border-blue-500/25' },
  cnss:             { label: 'Caisse CNSS',              color: 'bg-purple-500/10 text-purple-400 border-purple-500/25' },
  cnam:             { label: 'Centre CNAM',              color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25' },
  attt:             { label: 'Agence ATTT',              color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25' },
  rne:              { label: 'Registre Entreprises',     color: 'bg-rose-500/10 text-rose-400 border-rose-500/25' },
  police_garde:     { label: 'Poste de Police/Garde',   color: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/40' },
};

export const OfficeCard: React.FC<OfficeCardProps> = ({ office, activeScheduleMode }) => {
  const { locale } = useLocale();

  const name = office.name[locale] || office.name['derja'];
  const tips = office.tips?.[locale] || office.tips?.['derja'];
  const cat = categoryConfig[office.category] || { label: office.category, color: 'bg-zinc-800 text-zinc-400 border-zinc-700' };

  const scheduleInfo = (() => {
    switch (activeScheduleMode) {
      case 'ramadan':
        return {
          icon: <Moon className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Horaire Ramadan',
          text: `${office.schedule.ramadan.days} : ${office.schedule.ramadan.hours}`,
          bg: 'bg-amber-500/8 border-amber-500/20',
        };
      case 'summer':
        return {
          icon: <Sun className="w-3.5 h-3.5 text-orange-400" />,
          label: "Séance Unique (Été)",
          text: `${office.schedule.summer.days} : ${office.schedule.summer.hours}`,
          bg: 'bg-orange-500/8 border-orange-500/20',
        };
      default:
        return {
          icon: <Clock className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Horaire Normal',
          text: `${office.schedule.regular.days} : ${office.schedule.regular.hours}`,
          bg: 'bg-emerald-500/5 border-zinc-800',
        };
    }
  })();

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-zinc-800/80 flex flex-col justify-between hover:border-zinc-700 hover:shadow-xl transition-all duration-200 group">
      <div className="space-y-3">

        {/* Category badge + Location */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${cat.color}`}>
            {cat.label}
          </span>
          <span className="text-[10px] text-zinc-500 font-medium flex items-center space-x-1 rtl:space-x-reverse">
            <MapPin className="w-3 h-3 text-zinc-600 shrink-0" />
            <span>{office.governorate} · {office.delegation}</span>
          </span>
        </div>

        {/* Office name */}
        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-emerald-100 transition-colors">
          {name}
        </h3>

        {/* Address & Phone */}
        <div className="space-y-1.5">
          <div className="flex items-start space-x-2 rtl:space-x-reverse text-[11px] text-zinc-500">
            <MapPin className="w-3 h-3 text-zinc-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{office.address}</span>
          </div>
          {office.phone && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-[11px]">
              <Phone className="w-3 h-3 text-zinc-600 shrink-0" />
              <a
                href={`tel:${office.phone}`}
                className="text-zinc-400 hover:text-emerald-400 transition-colors font-mono tabular-nums"
              >
                {office.phone}
              </a>
            </div>
          )}
        </div>

        {/* Schedule Banner */}
        <div className={`p-3 rounded-xl border text-[11px] ${scheduleInfo.bg}`}>
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold text-zinc-300 mb-1">
            {scheduleInfo.icon}
            <span>{scheduleInfo.label} :</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">{scheduleInfo.text}</p>
        </div>

        {/* Service badges */}
        <div className="flex flex-wrap gap-1.5">
          {office.hasConformeService && (
            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 flex items-center space-x-1 rtl:space-x-reverse font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Copie Conforme</span>
            </span>
          )}
          {office.hasTimbreVendor && (
            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/60 flex items-center space-x-1 rtl:space-x-reverse font-semibold">
              <Stamp className="w-3 h-3" />
              <span>Vente Timbres</span>
            </span>
          )}
        </div>

        {/* Tips */}
        {tips && (
          <div className="flex items-start space-x-2 rtl:space-x-reverse p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <Lightbulb className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-zinc-400 leading-relaxed">{tips}</p>
          </div>
        )}
      </div>

      {/* Navigation Button */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60">
        <a
          href={office.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30"
        >
          <Navigation2 className="w-3.5 h-3.5" />
          <span>Itinéraire GPS</span>
        </a>
      </div>
    </div>
  );
};
