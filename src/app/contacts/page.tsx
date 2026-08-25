'use client';

import React, { useState } from 'react';
import { Phone, ExternalLink, Shield, Heart, Zap, Scale, AlertTriangle, Wrench } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { emergencyContacts, ministriesData, EmergencyContact } from '../../data/contacts';
import type { SupportedLanguage } from '../../data/translations';

export default function ContactsPage() {
  const { locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState<'all' | 'emergency' | 'health' | 'civic' | 'utility'>('all');

  const getLabel = (obj: Record<string, string>) =>
    (obj as Record<SupportedLanguage, string>)[locale as SupportedLanguage] ?? obj.fr;

  const heroTitle: Record<SupportedLanguage, string> = {
    ar: 'الأرقام الضرورية دائماً في متناول يدك',
    fr: 'Les numéros essentiels toujours à portée de main',
    en: 'Essential numbers always at your fingertips',
    derja: 'El ar9am el mouhimma taw dejjem fi iedek',
  };
  const heroSub: Record<SupportedLanguage, string> = {
    ar: 'خدمات الطوارئ، الوزارات، والأرقام الضرورية لكل مواطن تونسي',
    fr: 'Services d\'urgence, ministères et numéros essentiels pour chaque citoyen tunisien',
    en: 'Emergency services, ministries and essential numbers for every Tunisian citizen',
    derja: 'Khedamet el 7adra, el wezarat, w kol ar9am elli tekhtej bihom ka mwaten tounsi',
  };

  const categoryCfg: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: Record<SupportedLanguage, string> }> = {
    emergency: { icon: Shield, color: 'text-red-400', label: { ar: 'طوارئ', fr: 'Urgences', en: 'Emergency', derja: 'Urgence' } },
    health:    { icon: Heart, color: 'text-rose-400', label: { ar: 'صحة', fr: 'Santé', en: 'Health', derja: 'Se77a' } },
    civic:     { icon: Scale, color: 'text-blue-400', label: { ar: 'مدني', fr: 'Civique', en: 'Civic', derja: 'Madani' } },
    utility:   { icon: Zap, color: 'text-yellow-400', label: { ar: 'خدمات', fr: 'Services', en: 'Utilities', derja: 'Khadamet' } },
    legal:     { icon: Scale, color: 'text-violet-400', label: { ar: 'قانوني', fr: 'Juridique', en: 'Legal', derja: '9anoni' } },
  };

  const bigThree = emergencyContacts.filter((c) => ['police', 'samu', 'pompiers'].includes(c.id));
  const rest = emergencyContacts.filter((c) => !['police', 'samu', 'pompiers'].includes(c.id));
  const filteredRest = activeCategory === 'all' ? rest : rest.filter((c) => c.category === activeCategory);

  const bigColors: Record<string, { border: string; bg: string; num: string }> = {
    police:   { border: 'border-red-500/40',    bg: 'bg-red-500/5',    num: 'text-red-400' },
    samu:     { border: 'border-orange-500/40', bg: 'bg-orange-500/5', num: 'text-orange-400' },
    pompiers: { border: 'border-amber-500/40',  bg: 'bg-amber-500/5',  num: 'text-amber-400' },
  };

  const freeLabel: Record<SupportedLanguage, string>  = { ar: 'مجاني', fr: 'Appel gratuit', en: 'Free call', derja: 'Majjanen' };
  const h24Label: Record<SupportedLanguage, string>   = { ar: '24/7', fr: '24h/24', en: '24/7', derja: '24/7' };
  const callLabel: Record<SupportedLanguage, string>  = { ar: 'اتصل الآن', fr: 'Appeler', en: 'Call now', derja: 'Appel' };
  const miniTitle: Record<SupportedLanguage, string>  = { ar: 'الوزارات', fr: 'Ministères', en: 'Ministries', derja: 'El Wezarat' };
  const siteLabel: Record<SupportedLanguage, string>  = { ar: 'الموقع', fr: 'Site web', en: 'Website', derja: 'El Site' };
  const allLabel: Record<SupportedLanguage, string>   = { ar: 'الكل', fr: 'Tous', en: 'All', derja: 'El Kol' };

  const filterCategories: Array<'all' | 'emergency' | 'health' | 'civic' | 'utility'> = ['all', 'emergency', 'health', 'civic', 'utility'];

  return (
    <main className="min-h-screen bg-[#090a0d] text-white pb-24">

      {/* ── Hero ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-5">
          <Phone className="w-3.5 h-3.5" />
          <span>{emergencyContacts.length} numéros essentiels</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          {getLabel(heroTitle)}
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {getLabel(heroSub)}
        </p>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">

        {/* ── Big 3 Emergency Numbers ── */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bigThree.map((c) => {
              const col = bigColors[c.id] ?? bigColors.police;
              return (
                <a
                  key={c.id}
                  href={`tel:${c.number.replace(/\s/g, '')}`}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 ${col.border} ${col.bg} p-6 sm:p-8 hover:scale-[1.02] transition-transform cursor-pointer group`}
                >
                  <span className="text-5xl">{c.icon}</span>
                  <div className="text-5xl font-black font-mono tracking-tight text-white group-hover:scale-110 transition-transform">
                    {c.number}
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white text-sm">{getLabel(c.name)}</p>
                    {c.description && (
                      <p className="text-xs text-zinc-400 mt-1">{getLabel(c.description)}</p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {getLabel(freeLabel)}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                      {getLabel(h24Label)}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── Other Contacts ── */}
        <section>
          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
            {filterCategories.map((cat) => {
              const cfg = cat === 'all' ? null : categoryCfg[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-500'
                      : 'text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? getLabel(allLabel) : getLabel(cfg!.label)}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRest.map((c: EmergencyContact) => {
              const cfg = categoryCfg[c.category];
              const IconComp = cfg?.icon ?? Wrench;
              return (
                <a
                  key={c.id}
                  href={`tel:${c.number.replace(/\s/g, '')}`}
                  className="flex items-start gap-4 rounded-2xl bg-[#14161d] border border-white/[0.08] p-4 hover:border-emerald-500/30 transition-all group cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className="text-2xl">{c.icon}</span>
                    <IconComp className={`w-3.5 h-3.5 ${cfg?.color ?? 'text-zinc-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-xs leading-snug">{getLabel(c.name)}</p>
                    <p className={`text-2xl font-black font-mono mt-1 group-hover:scale-105 transition-transform inline-block ${cfg?.color ?? 'text-zinc-300'}`}>
                      {c.number}
                    </p>
                    {c.description && (
                      <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{getLabel(c.description)}</p>
                    )}
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {c.isTollFree && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                          {getLabel(freeLabel)}
                        </span>
                      )}
                      {c.available24h && (
                        <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full font-mono">
                          {getLabel(h24Label)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Phone className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-0.5" />
                </a>
              );
            })}
          </div>
        </section>

        {/* ── Ministries Table ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle className="w-5 h-5 text-zinc-500" />
            <h2 className="text-xl font-bold text-white">{getLabel(miniTitle)}</h2>
          </div>
          <div className="rounded-2xl bg-[#14161d] border border-white/[0.08] overflow-hidden">
            <div className="divide-y divide-white/[0.06]">
              {ministriesData.map((m) => (
                <div key={m.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{getLabel(m.name)}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{m.address}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`tel:${m.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white font-mono bg-zinc-800/60 hover:bg-zinc-700/60 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {m.phone}
                    </a>
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {getLabel(siteLabel)}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
