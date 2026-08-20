'use client';

import React, { useState } from 'react';
import { publicOfficesData, GOVERNORATES_LIST } from '../../data/offices';
import { OfficeCard } from '../../components/locator/OfficeCard';
import { useLocale } from '../../context/LocaleContext';
import { MapPin, Search, Moon, Sun, Clock, Building2, ChevronDown } from 'lucide-react';

export default function LocatorPage() {
  const { t, locale } = useLocale();
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scheduleMode, setScheduleMode] = useState<'regular' | 'ramadan' | 'summer'>('regular');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all',             label: locale === 'ar' ? 'جميع الإدارات' : 'Tous les organismes' },
    { id: 'baladiya',        label: locale === 'ar' ? 'البلديات' : 'Municipalités (Baladiya)' },
    { id: 'recette_finances',label: locale === 'ar' ? 'القباضات المالية' : 'Recettes des Finances' },
    { id: 'poste',           label: locale === 'ar' ? 'مراكز البريد' : 'Bureaux de Poste' },
    { id: 'attt',            label: 'Agences ATTT' },
    { id: 'cnam',            label: 'Centres CNAM' },
    { id: 'rne',             label: 'Bureaux RNE' },
  ];

  const filteredOffices = publicOfficesData.filter((office) => {
    const matchesGov =
      selectedGovernorate === 'all' || office.governorate === selectedGovernorate;
    const matchesCat =
      selectedCategory === 'all' || office.category === selectedCategory;
    const matchesSearch =
      office.name.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.name.derja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.delegation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGov && matchesCat && matchesSearch;
  });

  const scheduleButtons = [
    {
      id: 'regular' as const,
      icon: <Clock className="w-3.5 h-3.5" />,
      label: t('regularHours'),
      active: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      idle: 'text-zinc-500 hover:text-zinc-300',
    },
    {
      id: 'ramadan' as const,
      icon: <Moon className="w-3.5 h-3.5" />,
      label: t('ramadanHours'),
      active: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      idle: 'text-zinc-500 hover:text-zinc-300',
    },
    {
      id: 'summer' as const,
      icon: <Sun className="w-3.5 h-3.5" />,
      label: t('summerHours'),
      active: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
      idle: 'text-zinc-500 hover:text-zinc-300',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-4">
          <MapPin className="w-3 h-3" />
          <span>
            {locale === 'ar'
              ? 'دليل الإدارات والبلديات التونسية — 24 ولاية'
              : 'Annuaire Géolocalisé des Services Publics Tunisiens'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
          <span className="text-2xl sm:text-3xl mr-2">📍</span>
          {locale === 'ar'
            ? 'دليل البلديات والمصالح الإدارية'
            : 'Guide Baladiyas, Recettes & Organismes'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'ابحث عن عناوين وأرقام هواتف وأوقات عمل أكثر من 350 بلدية ومصلحة عمومية عبر 24 ولاية — بما فيها توقيت رمضان والحصة الواحدة.'
            : "Retrouvez adresses, numéros et horaires réels (Ramadan & Séance Unique d'été) de plus de 350 municipalités et guichets sur les 24 gouvernorats."}
        </p>
      </div>

      {/* Schedule Mode Switcher */}
      <div className="mb-6 p-4 rounded-2xl glass-panel border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-zinc-400 font-medium">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>{locale === 'ar' ? 'عرض الجداول الزمنية حسب الفصل :' : 'Affichage des horaires selon la saison :'}</span>
        </div>

        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          {scheduleButtons.map(({ id, icon, label, active, idle }) => (
            <button
              key={id}
              onClick={() => setScheduleMode(id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 rtl:space-x-reverse transition-all ${
                scheduleMode === id ? active : idle
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {/* Governorate */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            {locale === 'ar' ? 'الولاية :' : 'Gouvernorat (Wilaya) :'}
          </label>
          <select
            value={selectedGovernorate}
            onChange={(e) => setSelectedGovernorate(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="all">{t('allGovernorates')}</option>
            {GOVERNORATES_LIST.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            {locale === 'ar' ? "نوع الإدارة :" : "Type d'Administration :"}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            {locale === 'ar' ? 'البحث بالكلمة :' : 'Recherche par mot-clé :'}
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'مثال: الكاسبة، المهدية، صفاقس...' : 'Ex: Kasbah, Houmt Souk, Sousse...'}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-zinc-500">
          {filteredOffices.length > 0
            ? locale === 'ar'
              ? `${filteredOffices.length} إدارة وجدت`
              : `${filteredOffices.length} organisme${filteredOffices.length > 1 ? 's' : ''} trouvé${filteredOffices.length > 1 ? 's' : ''}`
            : ''}
        </p>
      </div>

      {/* Offices Grid */}
      {filteredOffices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOffices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              activeScheduleMode={scheduleMode}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-16 text-center border border-zinc-800">
          <Building2 className="w-10 h-10 mx-auto text-zinc-700 mb-4" />
          <h3 className="text-sm font-bold text-zinc-400 mb-1">
            {locale === 'ar' ? 'لا توجد نتائج' : 'Aucun organisme trouvé'}
          </h3>
          <p className="text-xs text-zinc-600">
            {locale === 'ar' ? 'حاول تعديل المرشحات أو تغيير الولاية.' : 'Essayez de modifier les filtres ou le gouvernorat.'}
          </p>
        </div>
      )}
    </div>
  );
}
