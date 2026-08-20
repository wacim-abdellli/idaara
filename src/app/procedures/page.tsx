'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { proceduresData } from '../../data/procedures';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { formatTND } from '../../lib/utils';
import {
  BookOpen,
  Search,
  ArrowRight,
  Clock,
  Coins,
  CreditCard,
  Car,
  Briefcase,
  Home,
  HeartPulse,
  Plane,
} from 'lucide-react';

export default function ProceduresPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

  const verticals: Array<{ id: string; label: string; icon: React.ElementType }> = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع الإجراءات'
          : locale === 'en'
          ? 'All Procedures'
          : 'Toutes les Démarches',
      icon: BookOpen,
    },
    {
      id: 'identity',
      label:
        locale === 'ar'
          ? '🪪 الهوية والمواطنة'
          : locale === 'en'
          ? '🪪 Identity & Citizenship'
          : '🪪 Identité & Citoyenneté',
      icon: CreditCard,
    },
    {
      id: 'transport',
      label:
        locale === 'ar'
          ? '🚗 النقل والسيارات'
          : locale === 'en'
          ? '🚗 Transport & Vehicles'
          : '🚗 Transport & Véhicules',
      icon: Car,
    },
    {
      id: 'business',
      label:
        locale === 'ar'
          ? '🏢 الشركات والمشاريع'
          : locale === 'en'
          ? '🏢 Business & Freelancing'
          : '🏢 Entreprise & Freelance',
      icon: Briefcase,
    },
    {
      id: 'housing',
      label:
        locale === 'ar'
          ? '🏠 السكن والطاقة'
          : locale === 'en'
          ? '🏠 Housing & Utilities'
          : '🏠 Logement & Énergie',
      icon: Home,
    },
    {
      id: 'healthcare',
      label:
        locale === 'ar'
          ? '🏥 الصحة والضمان الاجتماعي'
          : locale === 'en'
          ? '🏥 Health & Social Security'
          : '🏥 Santé & CNAM/CNSS',
      icon: HeartPulse,
    },
    {
      id: 'customs',
      label:
        locale === 'ar'
          ? '✈️ الديوانة والتونسيين بالخارج'
          : locale === 'en'
          ? '✈️ Customs & Diaspora (FCR)'
          : '✈️ Douane & Diaspora',
      icon: Plane,
    },
  ];

  const filteredProcedures = proceduresData.filter((proc) => {
    const title = getLocalized(proc.title, locale).toLowerCase();
    const shortDesc = getLocalized(proc.shortDescription, locale).toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesVertical =
      selectedVertical === 'all' || proc.vertical === selectedVertical;
    const matchesSearch =
      title.includes(q) ||
      shortDesc.includes(q) ||
      proc.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesVertical && matchesSearch;
  });

  const headerTitle =
    locale === 'ar'
      ? '📚 دليل الإجراءات الإدارية التونسية'
      : locale === 'en'
      ? '📚 Official Administrative Procedures Catalog'
      : '📚 Catalogue des Procédures Administratives';

  const headerDesc =
    locale === 'ar'
      ? 'تعرف على الوثائق المطلوبة، مصاريف التنابر الجبائية، الآجال والمكاتب المعنية لكل إجراء إداري.'
      : locale === 'en'
      ? 'Find the complete checklist of required documents, exact fiscal stamp fees, legal deadlines, and designated service desks for every procedure.'
      : 'Retrouvez la liste complète des pièces à fournir, les montants des timbres fiscaux, les délais de délivrance et les guichets compétents pour chaque démarche.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-4">
          <BookOpen className="w-3 h-3" />
          <span>
            {locale === 'ar'
              ? 'دليل الإدارة · الإجراءات الإدارية خطوة بخطوة'
              : locale === 'en'
              ? 'Citizen Guide · Comprehensive Tunisian Administrative Catalog'
              : 'Dalil el Idara · Guide Exhaustif des Démarches Citoyennes'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
          {headerTitle}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          {headerDesc}
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVertical(v.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                selectedVertical === v.id
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
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
            placeholder={
              locale === 'ar'
                ? 'ابحث عن إجراء (جواز سفر، بطاقة تعريف...)'
                : locale === 'en'
                ? 'Search procedure (e.g. Passport, CIN...)'
                : 'Rechercher une démarche (ex: Passeport, CIN...)'
            }
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Procedures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcedures.map((proc) => {
          const title = getLocalized(proc.title, locale);
          const shortDesc = getLocalized(proc.shortDescription, locale);

          return (
            <Link
              key={proc.id}
              href={`/procedures/${proc.id}`}
              className="glass-panel rounded-2xl p-6 border border-zinc-800/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {proc.vertical}
                  </span>
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{proc.estimatedProcessingTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold text-zinc-200">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>~ {formatTND(proc.estimatedTotalCostTND)}</span>
                </div>

                <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs font-bold text-emerald-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>
                    {locale === 'ar' ? 'التفاصيل' : locale === 'en' ? 'View Details' : 'Détails'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
