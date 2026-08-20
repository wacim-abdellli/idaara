'use client';

import React, { useState } from 'react';
import { publicOfficesData, GOVERNORATES_LIST } from '../../data/offices';
import { OfficeCard } from '../../components/locator/OfficeCard';
import { useLocale } from '../../context/LocaleContext';
import { MapPin, Search, Moon, Sun, Clock, Building2, Filter } from 'lucide-react';

export default function LocatorPage() {
  const { t } = useLocale();
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scheduleMode, setScheduleMode] = useState<'regular' | 'ramadan' | 'summer'>('regular');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tous les organismes' },
    { id: 'baladiya', label: 'Municipalités (Baladiya)' },
    { id: 'recette_finances', label: 'Recettes des Finances' },
    { id: 'poste', label: 'Bureaux de Poste' },
    { id: 'attt', label: 'Agences ATTT' },
    { id: 'cnam', label: 'Centres CNAM' },
    { id: 'rne', label: 'Bureaux RNE' },
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Annuaire Géolocalisé des Services Publics Tunisiens</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          📍 Guide des Baladiyas, Recettes & Organismes Publics
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Retrouvez les adresses, numéros, horaires réels ajustés pour le Ramadan et la Séance Unique d'été de plus de 350 municipalités et guichets administratifs sur les 24 gouvernorats.
        </p>
      </div>

      {/* Schedule Mode Switcher */}
      <div className="mb-6 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-zinc-300 font-medium">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Affichage des horaires selon la saison :</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setScheduleMode('regular')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              scheduleMode === 'regular'
                ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{t('regularHours')}</span>
          </button>

          <button
            onClick={() => setScheduleMode('ramadan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              scheduleMode === 'ramadan'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>{t('ramadanHours')}</span>
          </button>

          <button
            onClick={() => setScheduleMode('summer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              scheduleMode === 'summer'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{t('summerHours')}</span>
          </button>
        </div>
      </div>

      {/* Filters Bar: Governorate + Category + Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Governorate Select */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Gouvernorat (Wilaya) :
          </label>
          <select
            value={selectedGovernorate}
            onChange={(e) => setSelectedGovernorate(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          >
            <option value="all">{t('allGovernorates')}</option>
            {GOVERNORATES_LIST.map((gov) => (
              <option key={gov} value={gov}>
                {gov}
              </option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Type d'Administration :
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Recherche par mot-clé :
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: Kasbah, Houmt Souk, Sousse..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Offices Grid */}
      {filteredOffices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              activeScheduleMode={scheduleMode}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 text-center text-zinc-400">
          <Building2 className="w-10 h-10 mx-auto text-zinc-600 mb-3" />
          <h3 className="text-base font-bold text-zinc-200">Aucun organisme trouvé</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Essayez de modifier les filtres ou le gouvernorat sélectionné.
          </p>
        </div>
      )}
    </div>
  );
}
