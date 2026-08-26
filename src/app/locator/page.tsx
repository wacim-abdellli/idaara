'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicOfficesData, GOVERNORATES_LIST } from '../../data/offices';
import { OfficeCard } from '../../components/locator/OfficeCard';
import { useLocale } from '../../context/LocaleContext';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn, FadeInStagger, FadeInItem } from '../../components/motion/FadeInStagger';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import { MapPin, Search, Moon, Sun, Clock, Building2, Navigation2, PhoneCall } from 'lucide-react';

export default function LocatorPage() {
  const { t, locale } = useLocale();
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scheduleMode, setScheduleMode] = useState<'regular' | 'ramadan' | 'summer'>('regular');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع الولايات (24)'
          : locale === 'derja'
          ? 'El Wilayat el Kol (24)'
          : locale === 'en'
          ? 'All Regions (24)'
          : 'Toutes les Régions (24)',
    },
    {
      id: 'Tunis',
      label:
        locale === 'ar'
          ? 'تونس الكبرى'
          : locale === 'derja'
          ? 'Tounes el Kobra'
          : locale === 'en'
          ? 'Tunis & Suburbs'
          : 'Tunis & Banlieue',
    },
    { id: 'Ariana', label: locale === 'ar' ? 'أريانة' : 'Ariana' },
    { id: 'Ben Arous', label: locale === 'ar' ? 'بن عروس' : 'Ben Arous' },
    { id: 'Manouba', label: locale === 'ar' ? 'منوبة' : 'Manouba' },
    {
      id: 'Sousse',
      label:
        locale === 'ar'
          ? 'سوسة والساحل'
          : locale === 'derja'
          ? 'Soussa wel Sahel'
          : locale === 'en'
          ? 'Sousse & Sahel'
          : 'Sousse & Sahel',
    },
    { id: 'Monastir', label: locale === 'ar' ? 'المنستير' : 'Monastir' },
    { id: 'Mahdia', label: locale === 'ar' ? 'المهدية' : 'Mahdia' },
    { id: 'Sfax', label: locale === 'ar' ? 'صفاقس' : 'Sfax' },
    {
      id: 'Nabeul',
      label:
        locale === 'ar'
          ? 'نابل والوطن القبلي'
          : locale === 'derja'
          ? 'Nabeul / Cap Bon'
          : locale === 'en'
          ? 'Nabeul / Cap Bon'
          : 'Nabeul / Cap Bon',
    },
    { id: 'Zaghouan', label: locale === 'ar' ? 'زغوان' : 'Zaghouan' },
    { id: 'Bizerte', label: locale === 'ar' ? 'بنزرت' : 'Bizerte' },
    { id: 'Béja', label: locale === 'ar' ? 'باجة' : 'Béja' },
    { id: 'Jendouba', label: locale === 'ar' ? 'جندوبة' : 'Jendouba' },
    { id: 'Le Kef', label: locale === 'ar' ? 'الكاف' : 'Le Kef' },
    { id: 'Siliana', label: locale === 'ar' ? 'سليانة' : 'Siliana' },
    { id: 'Kairouan', label: locale === 'ar' ? 'القيروان' : 'Kairouan' },
    { id: 'Kasserine', label: locale === 'ar' ? 'القصرين' : 'Kasserine' },
    { id: 'Sidi Bouzid', label: locale === 'ar' ? 'سيدي بوزيد' : 'Sidi Bouzid' },
    { id: 'Gabès', label: locale === 'ar' ? 'قابس' : 'Gabès' },
    {
      id: 'Médenine',
      label:
        locale === 'ar'
          ? 'مدنين وجربة'
          : locale === 'derja'
          ? 'Mednine w Jerba'
          : locale === 'en'
          ? 'Djerba / Médenine'
          : 'Djerba / Médenine',
    },
    { id: 'Tataouine', label: locale === 'ar' ? 'تطاوين' : 'Tataouine' },
    { id: 'Gafsa', label: locale === 'ar' ? 'قفصة' : 'Gafsa' },
    { id: 'Tozeur', label: locale === 'ar' ? 'توزر' : 'Tozeur' },
    { id: 'Kébili', label: locale === 'ar' ? 'قبلي' : 'Kébili' },
  ];

  const categories = [
    {
      id: 'all',
      label:
        locale === 'ar'
          ? 'جميع الإدارات'
          : locale === 'derja'
          ? 'El Masale7 el Kol'
          : locale === 'en'
          ? 'All Agencies & Offices'
          : 'Tous les organismes',
    },
    {
      id: 'baladiya',
      label:
        locale === 'ar'
          ? 'البلديات'
          : locale === 'derja'
          ? 'Baladiyas'
          : locale === 'en'
          ? 'Municipalities (Baladiya)'
          : 'Municipalités (Baladiya)',
    },
    {
      id: 'recette_finances',
      label:
        locale === 'ar'
          ? 'القباضات المالية'
          : locale === 'derja'
          ? '9badhat Maliya'
          : locale === 'en'
          ? 'Tax Offices (Recette des Finances)'
          : 'Recettes des Finances',
    },
    {
      id: 'poste',
      label:
        locale === 'ar'
          ? 'مراكز البريد'
          : locale === 'derja'
          ? 'Bousta'
          : locale === 'en'
          ? 'Post Offices (La Poste)'
          : 'Bureaux de Poste',
    },
    {
      id: 'attt',
      label:
        locale === 'ar'
          ? 'وكالات النقل الفني (ATTT)'
          : locale === 'derja'
          ? 'Agences ATTT'
          : locale === 'en'
          ? 'ATTT Transport Agencies'
          : 'Agences ATTT',
    },
    {
      id: 'cnam',
      label:
        locale === 'ar'
          ? 'مراكز التأمين على المرض (CNAM)'
          : locale === 'derja'
          ? 'Marakez CNAM'
          : locale === 'en'
          ? 'CNAM Health Centers'
          : 'Centres CNAM',
    },
    {
      id: 'rne',
      label:
        locale === 'ar'
          ? 'السجل الوطني للمؤسسات (RNE)'
          : locale === 'derja'
          ? 'Bureaux RNE'
          : locale === 'en'
          ? 'RNE Business Registry'
          : 'Bureaux RNE',
    },
    {
      id: 'cnss',
      label:
        locale === 'ar'
          ? 'الضمان الاجتماعي (CNSS)'
          : locale === 'derja'
          ? 'Marakez CNSS'
          : locale === 'en'
          ? 'CNSS Social Security'
          : 'Caisses CNSS',
    },
    {
      id: 'police_garde',
      label:
        locale === 'ar'
          ? 'مراكز الشرطة والحرس'
          : locale === 'derja'
          ? 'Commissariats & Garde'
          : locale === 'en'
          ? 'Police & Garde Nationale'
          : 'Police & Garde Nationale',
    },
    {
      id: 'steg',
      label:
        locale === 'ar'
          ? 'الكهرباء والغاز (STEG)'
          : locale === 'derja'
          ? 'Agences STEG'
          : locale === 'en'
          ? 'STEG (Electricity & Gas)'
          : 'Agences STEG',
    },
    {
      id: 'sonede',
      label:
        locale === 'ar'
          ? 'توزيع المياه (SONEDE)'
          : locale === 'derja'
          ? 'Agences SONEDE'
          : locale === 'en'
          ? 'SONEDE (Water Authority)'
          : 'Agences SONEDE',
    },
    {
      id: 'tribunal',
      label:
        locale === 'ar'
          ? 'المحاكم الابتدائية'
          : locale === 'derja'
          ? 'Tribunaux'
          : locale === 'en'
          ? 'Courts (Tribunaux)'
          : 'Tribunaux',
    },
    {
      id: 'aneti',
      label:
        locale === 'ar'
          ? 'وكالات التشغيل (ANETI)'
          : locale === 'derja'
          ? 'Agences ANETI'
          : locale === 'en'
          ? 'ANETI Employment Offices'
          : 'Agences ANETI',
    },
    {
      id: 'hopital',
      label:
        locale === 'ar'
          ? 'المستشفيات الجهوية'
          : locale === 'derja'
          ? 'Hôpitaux'
          : locale === 'en'
          ? 'Hospitals (CHU/CHR)'
          : 'Hôpitaux',
    },
    {
      id: 'ministere',
      label:
        locale === 'ar'
          ? 'الوزارات'
          : locale === 'derja'
          ? 'Ministères'
          : locale === 'en'
          ? 'Ministries'
          : 'Ministères',
    },
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
      active: 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20',
      idle: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900',
    },
    {
      id: 'ramadan' as const,
      icon: <Moon className="w-3.5 h-3.5" />,
      label: t('ramadanHours'),
      active: 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20',
      idle: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900',
    },
    {
      id: 'summer' as const,
      icon: <Sun className="w-3.5 h-3.5" />,
      label: t('summerHours'),
      active: 'bg-orange-500 text-zinc-950 font-bold shadow-md shadow-orange-500/20',
      idle: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900',
    },
  ];

  const headlineMain =
    locale === 'ar'
      ? 'دليل البلديات والمصالح الإدارية'
      : locale === 'derja'
      ? 'Dalil el Baladiyas wel Masale7'
      : locale === 'en'
      ? 'Municipalities & Public Offices'
      : 'Annuaire des Municipalités';

  const headlineAccent =
    locale === 'ar'
      ? 'عبر 24 ولاية.'
      : locale === 'derja'
      ? 'Fi 24 Wilaya.'
      : locale === 'en'
      ? 'GPS Directory (24 Wilayas).'
      : '& Services Publics.';

  const subtitle =
    locale === 'ar'
      ? 'ابحث عن عناوين وأرقام هواتف وأوقات عمل أكثر من 350 بلدية ومصلحة عمومية عبر 24 ولاية — بما فيها توقيت رمضان والحصة الواحدة.'
      : locale === 'derja'
      ? 'Lawwej 3la les adresses, numérowet, w aw9at el khedma (Taw9it Romdhan w Séance Unique) mte3 akther men 350 baladiya w masla7a fi 24 wilaya.'
      : locale === 'en'
      ? 'Locate exact GPS coordinates, phone numbers, and official opening hours (including Ramadan & summer single-shift schedules) for over 350 public offices across all 24 governorates.'
      : "Retrouvez adresses, numéros de téléphone et horaires réels (Ramadan & Séance Unique d'été) de plus de 350 municipalités et guichets sur les 24 gouvernorats.";

  const coverageSpecs = [
    {
      title: locale === 'ar' ? '350+ مصلحة وبلدية' : locale === 'derja' ? '350+ Masla7a' : locale === 'en' ? '350+ Public Desks' : '350+ Organismes',
      desc: locale === 'ar' ? 'بلديات وقباضات مالية' : locale === 'derja' ? 'Baladiyas & 9badhat' : locale === 'en' ? 'Baladiyas & Tax Offices' : 'Baladiyas & Recettes',
      tag: '24 Wilayas',
    },
    {
      title: locale === 'ar' ? 'تحديد دقيق للموقع GPS' : locale === 'derja' ? 'GPS Mrigel' : locale === 'en' ? 'Precise GPS' : 'GPS Précis',
      desc: locale === 'ar' ? 'توجيه عبر Waze وMaps' : locale === 'derja' ? 'Navigation Waze & Maps' : locale === 'en' ? 'Waze & Maps Navigation' : 'Navigation Waze & Maps',
      tag: 'Direct Link',
    },
    {
      title: locale === 'ar' ? 'توقيت الفصول' : locale === 'derja' ? 'Aw9at Romdhan w Sayf' : locale === 'en' ? 'Seasonal Hours' : 'Séances Saisons',
      desc: locale === 'ar' ? 'رمضان وحصة الصيف' : locale === 'derja' ? 'Romdhan w Séance Unique' : locale === 'en' ? 'Ramadan & Summer shift' : 'Ramadan & Été synchro',
      tag: locale === 'ar' ? 'فوري' : locale === 'derja' ? 'Temps réel' : locale === 'en' ? 'Real-time' : 'Temps réel',
    },
    {
      title: locale === 'ar' ? 'اتصال هاتفي مباشر' : locale === 'derja' ? 'Talifoun Direct' : locale === 'en' ? 'Direct Phone Call' : 'Appel Direct',
      desc: locale === 'ar' ? 'أرقام هواتف موثقة' : locale === 'derja' ? 'Numérowet vérifiés' : locale === 'en' ? 'Verified phone lines' : 'Standards téléphoniques',
      tag: locale === 'ar' ? 'موثقة' : locale === 'derja' ? 'Vérifiés' : locale === 'en' ? 'Verified' : 'Vérifiés',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 relative overflow-hidden">

      {/* Cinematic Ambient Glow */}
      <AmbientOrbs variant="emerald" />

      {/* ── 2-Column Hero Header (Balances Left & Right space) ── */}
      <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80 relative">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-emerald-400 font-bold">/</span>
            <span>
              {locale === 'ar'
                ? '24 ولاية · 350+ مصلحة ومقر بلدي محدد جغرافياً'
                : locale === 'derja'
                ? '24 Wilaya · 350+ Masla7a w Baladiya Géolocalisés'
                : locale === 'en'
                ? '24 Governorates · 350+ Geocoded Public Desks'
                : '24 Gouvernorats · 350+ Guichets Géolocalisés'}
            </span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </motion.span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Coverage & Radar Hub Widget (Fills empty space) */}
        <div className="lg:col-span-5 relative z-10">
          <SpotlightCard className="p-4 sm:p-5 border-zinc-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Navigation2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {locale === 'ar'
                    ? 'الشبكة الإدارية الوطنية'
                    : locale === 'derja'
                    ? 'Echbéka el idariya el wataniya'
                    : locale === 'en'
                    ? 'Territorial Civic Radar'
                    : 'Réseau Administratif National'}
                </span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full font-bold">
                24 Wilayas
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {coverageSpecs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white truncate">
                      {spec.title}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-semibold">
                      {spec.tag}
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-500 line-clamp-1">
                    {spec.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>

      {/* ── Schedule Season Control Banner ── */}
      <FadeIn direction="up" delay={0.1} className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {locale === 'ar'
                ? 'الجداول الزمنية الرسمية حسب الفصل :'
                : locale === 'derja'
                ? 'Taw9it rasmiye 7asb el fasl :'
                : locale === 'en'
                ? 'Official Operating Hours by Season:'
                : 'Horaires Officiels selon la Saison :'}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">
            {locale === 'ar'
              ? 'تبديل التوقيت الشتوي / توقيت رمضان / توقيت الحصة الواحدة'
              : locale === 'derja'
              ? 'Taw9it 3adi / Taw9it Romdhan / Séance Unique fi sayf'
              : locale === 'en'
              ? 'Live display of statutory administrative work shifts'
              : 'Affichage en temps réel des séances administratives homologuées'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
          {scheduleButtons.map(({ id, icon, label, active, idle }) => (
            <motion.button
              key={id}
              onClick={() => setScheduleMode(id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                scheduleMode === id ? active : idle
              }`}
            >
              {icon}
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* ── Quick Regions Bar ── */}
      <FadeIn direction="up" delay={0.15} className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {regions.map((r) => {
          const isSelected = (r.id === 'all' && selectedGovernorate === 'all') || selectedGovernorate === r.id;
          return (
            <motion.button
              key={r.id}
              onClick={() => setSelectedGovernorate(r.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold shadow-sm'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {r.label}
            </motion.button>
          );
        })}
      </FadeIn>

      {/* ── Filter Dropdowns & Search ── */}
      <FadeIn direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Governorate */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            {locale === 'ar' ? 'الولاية :' : locale === 'derja' ? 'El Wilaya :' : locale === 'en' ? 'Governorate (Wilaya):' : 'Gouvernorat (Wilaya) :'}
          </label>
          <select
            value={selectedGovernorate}
            onChange={(e) => setSelectedGovernorate(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
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
            {locale === 'ar' ? "نوع الإدارة :" : locale === 'derja' ? 'Naw3iyet el idara :' : locale === 'en' ? "Administration Type:" : "Type d'Administration :"}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none transition-colors cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            {locale === 'ar'
              ? 'البحث بالكلمة :'
              : locale === 'derja'
              ? 'Lawwej bel kelma :'
              : locale === 'en'
              ? 'Search Keyword:'
              : 'Recherche par mot-clé :'}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === 'ar'
                  ? 'مثال: القصبة، المهدية، صفاقس...'
                  : locale === 'derja'
                  ? 'Mathalan: Kasbah, Sousse, Ariana...'
                  : locale === 'en'
                  ? 'Ex: Kasbah, Sousse, Ariana...'
                  : 'Ex: Kasbah, Houmt Souk, Sousse...'
              }
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── Results Count ── */}
      <FadeIn direction="up" delay={0.25} className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          {filteredOffices.length > 0
            ? locale === 'ar'
              ? `${filteredOffices.length} إدارة ومصلحة`
              : locale === 'derja'
              ? `${filteredOffices.length} masla7a mawjouda`
              : locale === 'en'
              ? `${filteredOffices.length} public office${filteredOffices.length > 1 ? 's' : ''} listed`
              : `${filteredOffices.length} organisme${filteredOffices.length > 1 ? 's' : ''} répertorié${filteredOffices.length > 1 ? 's' : ''}`
            : ''}
        </span>
      </FadeIn>

      {/* ── Offices Grid ── */}
      <AnimatePresence mode="popLayout">
        {filteredOffices.length > 0 ? (
          <FadeInStagger
            key={`${selectedGovernorate}-${selectedCategory}-${searchQuery}`}
            faster
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredOffices.map((office) => (
              <FadeInItem key={office.id}>
                <OfficeCard
                  office={office}
                  activeScheduleMode={scheduleMode}
                />
              </FadeInItem>
            ))}
          </FadeInStagger>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass-panel rounded-3xl p-16 text-center border border-zinc-800"
          >
            <Building2 className="w-10 h-10 mx-auto text-zinc-700 mb-4" />
            <h3 className="text-sm font-bold text-zinc-400 mb-1">
              {locale === 'ar'
                ? 'لا توجد نتائج'
                : locale === 'derja'
                ? 'Ma l9inéch masla7a'
                : locale === 'en'
                ? 'No offices found'
                : 'Aucun organisme trouvé'}
            </h3>
            <p className="text-xs text-zinc-600">
              {locale === 'ar'
                ? 'حاول تعديل المرشحات أو تغيير الولاية.'
                : locale === 'derja'
                ? 'Baddel el filtre walla el wilaya bech tal9a el masale7.'
                : locale === 'en'
                ? 'Try changing the filters or governorate.'
                : 'Essayez de modifier les filtres ou le gouvernorat.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
