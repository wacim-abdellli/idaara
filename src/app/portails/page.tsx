'use client';

import React, { useState, useMemo } from 'react';
import { ExternalLink, Smartphone, Clock, Globe } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { portailsData, portalCategories, EGovPortal } from '../../data/portails';
import type { SupportedLanguage } from '../../data/translations';

export default function PortailsPage() {
  const { locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? portailsData
      : portailsData.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const getLabel = (obj: Record<string, string>) =>
    (obj as Record<SupportedLanguage, string>)[locale as SupportedLanguage] ?? obj.fr;

  const heroTitle: Record<SupportedLanguage, string> = {
    ar: 'كل البوابات الإلكترونية في مكان واحد',
    fr: 'Tous les portails e-gov tunisiens',
    en: 'All Tunisian e-Gov Portals',
    derja: 'Kol el Portails el Hkoumiyin fi Blassa Wa7da',
  };
  const heroSub: Record<SupportedLanguage, string> = {
    ar: 'وصول مباشر لكل الخدمات الرقمية الحكومية التونسية — بدون بحث إضافي',
    fr: 'Accès direct à tous les services numériques gouvernementaux tunisiens',
    en: 'Direct access to all Tunisian government digital services',
    derja: '5edmet el 7kouma kol-ha fi blassa wa7da — men ghir ma t7awwej',
  };
  const visitLabel: Record<SupportedLanguage, string> = {
    ar: 'زيارة الموقع',
    fr: 'Visiter',
    en: 'Visit',
    derja: 'Zour',
  };
  const servicesLabel: Record<SupportedLanguage, string> = {
    ar: 'الخدمات المتاحة',
    fr: 'Services disponibles',
    en: 'Available services',
    derja: 'Khedamet metofahha',
  };
  const onlineLabel: Record<SupportedLanguage, string> = {
    ar: '24/7 متاح',
    fr: 'Disponible 24/7',
    en: 'Available 24/7',
    derja: 'Metofe7 24/7',
  };
  const mobileLabel: Record<SupportedLanguage, string> = {
    ar: 'تطبيق موبايل',
    fr: 'App Mobile',
    en: 'Mobile App',
    derja: 'App Mobili',
  };

  return (
    <main className="min-h-screen bg-[#090a0d] text-white pb-24">

      {/* ── Hero ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-5">
          <Globe className="w-3.5 h-3.5" />
          <span>{portailsData.length} portails officiels</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          {getLabel(heroTitle)}
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {getLabel(heroSub)}
        </p>
      </section>

      {/* ── Category Filter ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {portalCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {getLabel(cat.label)}
            </button>
          ))}
        </div>
      </section>

      {/* ── Portal Grid ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((portal: EGovPortal) => (
            <div
              key={portal.id}
              className="flex flex-col rounded-2xl bg-[#14161d] border border-white/[0.08] p-5 hover:border-emerald-500/30 transition-all duration-200 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl leading-none">{portal.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{portal.name}</h3>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {portal.isOnline24h && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                          <Clock className="w-2.5 h-2.5" />
                          24/7
                        </span>
                      )}
                      {portal.isMobile && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded-full border border-sky-500/20">
                          <Smartphone className="w-2.5 h-2.5" />
                          App
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 leading-relaxed mb-3 flex-grow">
                {getLabel(portal.description)}
              </p>

              {/* Services */}
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                  {getLabel(servicesLabel)}
                </p>
                <ul className="space-y-1">
                  {portal.services.slice(0, 3).map((svc, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                      <span className="text-emerald-500 mt-0.5 shrink-0">›</span>
                      <span>{getLabel(svc)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors mt-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {getLabel(visitLabel)} →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
