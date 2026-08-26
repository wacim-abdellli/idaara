'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Phone,
  ExternalLink,
  Shield,
  Heart,
  Zap,
  Scale,
  Building2,
  Copy,
  Check,
  Search,
  X,
  Sparkles,
  PhoneCall,
  MapPin,
  Globe,
  Radio,
  LifeBuoy,
  ShieldAlert,
  Flame,
  HeartPulse,
  HeartHandshake,
  Baby,
  Pill,
  Droplets,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { emergencyContacts, ministriesData, EmergencyContact, Ministry } from '../../data/contacts';
import type { SupportedLanguage } from '../../data/translations';

export default function ContactsPage() {
  const { locale, isRtl } = useLocale();
  const [activeCategory, setActiveCategory] = useState<'all' | 'emergency' | 'health' | 'civic' | 'utility'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastData, setToastData] = useState<{ number: string; label: string } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const getLabel = (obj: Record<string, string>) =>
    (obj as Record<SupportedLanguage, string>)[locale as SupportedLanguage] ?? obj.fr;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopiedId(id);
    setToastData({
      number: text,
      label:
        locale === 'ar'
          ? 'تم نسخ رقم الهاتف بنجاح'
          : locale === 'derja'
          ? 'Noumrou tnesa5 fel presse-papier'
          : locale === 'en'
          ? 'Phone number copied to clipboard'
          : 'Numéro copié dans le presse-papier',
    });
    setTimeout(() => {
      setCopiedId(null);
      setToastData(null);
    }, 2400);
  };

  const handleSmartCall = (e: React.MouseEvent, number: string, id: string) => {
    const isMobile =
      typeof window !== 'undefined' &&
      (/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia('(pointer:coarse)').matches && window.innerWidth < 1024));

    if (!isMobile) {
      e.preventDefault();
      handleCopy(number, id);
    }
  };

  // Keyboard shortcut / or ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getContactIcon = (id: string) => {
    switch (id) {
      case 'police':
        return <ShieldAlert className="w-6 h-6 text-red-400" />;
      case 'garde-nationale':
        return <Shield className="w-6 h-6 text-rose-400" />;
      case 'samu':
        return <HeartPulse className="w-6 h-6 text-red-400" />;
      case 'pompiers':
        return <Flame className="w-6 h-6 text-amber-400" />;
      case 'sos-violence':
        return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 'enfance-1809':
        return <Baby className="w-5 h-5 text-sky-400" />;
      case 'anti-corruption':
        return <Scale className="w-5 h-5 text-amber-400" />;
      case 'cnss-line':
        return <Shield className="w-5 h-5 text-purple-400" />;
      case 'centre-empoisonnement':
        return <AlertTriangle className="w-5 h-5 text-emerald-400" />;
      case 'pharmacies':
        return <Pill className="w-5 h-5 text-cyan-400" />;
      case 'steg-panne':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'sonede-fuite':
        return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'croissant-rouge':
        return <Heart className="w-5 h-5 text-red-400" />;
      case 'douane-hotline':
        return <Package className="w-5 h-5 text-emerald-400" />;
      default:
        return <Phone className="w-5 h-5 text-emerald-400" />;
    }
  };

  // Top flagship emergency numbers
  const flagshipIds = ['police', 'garde-nationale', 'samu', 'pompiers'];
  const flagshipNumbers = emergencyContacts.filter((c) => flagshipIds.includes(c.id));
  const generalContacts = emergencyContacts.filter((c) => !flagshipIds.includes(c.id));

  // Localized dictionaries
  const i18n = {
    badge: {
      ar: 'دليل الأرقام الاستعجالية والإدارية الرسمية',
      fr: 'Numéros d\'urgence et annuaire officiel',
      en: 'Official Emergency & Administrative Directory',
      derja: 'Ar9am el 7adra wel idara er-rasmiya',
    },
    title: {
      ar: 'أرقام النجدة والوزارات دائماً في متناولك',
      fr: 'Numéros essentiels & Urgences 24/7',
      en: 'Essential Numbers & 24/7 Emergency',
      derja: 'Ar9am el Nejda wel Wezarat fi Iedek',
    },
    sub: {
      ar: 'اتصال مباشر ومجاني بخدمات النجدة الوطنية، مراكز الإسعاف، أرقام الشكاوى والوزارات التونسية.',
      fr: 'Appels directs et gratuits vers les services de secours, urgences médicales, dépannage et ministères.',
      en: 'Direct toll-free calls to national emergency services, medical ambulances, public utilities, and ministries.',
      derja: 'Kallam direct w blech flous en-nejda, el is3af, el pannes wel wezarat el kol.',
    },
    searchPlaceholder: {
      ar: 'ابحث برقم الهاتف، الخدمة (مثل: إسعاف، شرطة، حرس، ماء، كهرباء، عنف، وزارة)...',
      fr: 'Rechercher un numéro ou service (ex: SAMU, Police, 198, STEG, SONEDE, CNSS, Santé)...',
      en: 'Search by phone number or service (e.g. Police, SAMU, Fire, STEG, Water, CNSS)...',
      derja: 'Lawwej b’noumrou walla khedma (is3af, chorta, 7ars, me2, dhaou, wezara)...',
    },
    quickSearch: {
      ar: 'بحث سريع :',
      fr: 'Accès rapide :',
      en: 'Quick access:',
      derja: 'A3mel tala :',
    },
    directCall: {
      ar: 'اتصال فوري',
      fr: 'Appeler',
      en: 'Call now',
      derja: 'Kallem fawri',
    },
    freeCall: {
      ar: 'رقم أخضر مجاني',
      fr: 'Appel gratuit',
      en: 'Toll-free',
      derja: 'Majjanen',
    },
    online24h: {
      ar: 'متاح 24/7',
      fr: '24h/24 · 7j/7',
      en: '24/7 Available',
      derja: '24/7 Ma7loul',
    },
    ministriesTitle: {
      ar: 'دليل أرقام ومواقع الوزارات الرسمية',
      fr: 'Annuaire des Ministères de la République Tunisienne',
      en: 'Ministries of the Republic of Tunisia Directory',
      derja: 'Dalil Wezarat el Joumhouriya et-Tounsiya',
    },
    ministriesSub: {
      ar: 'المقرات المركزية، أرقام الموزع الهاتفي، وروابط البوابات الإلكترونية الرسمية.',
      fr: 'Sièges centraux, standards téléphoniques officiels et portails web certifiés.',
      en: 'Central headquarters, official switchboard numbers, and certified state portals.',
      derja: 'El ma9arrat el markaziya, noumrou el standard w les sites el rasmiyin.',
    },
    visitSite: {
      ar: 'الموقع الرسمي',
      fr: 'Site web',
      en: 'Website',
      derja: 'El Site',
    },
    copySuccess: {
      ar: 'تم النسخ !',
      fr: 'Copié !',
      en: 'Copied!',
      derja: 'Mnsou5 !',
    },
    allFilter: {
      ar: 'الكل',
      fr: 'Tous les numéros',
      en: 'All Numbers',
      derja: 'El Kol',
    },
    emergencyFilter: {
      ar: 'طوارئ ونجدة',
      fr: 'Urgences & Secours',
      en: 'Emergency & Rescue',
      derja: 'Urgence w Nejda',
    },
    healthFilter: {
      ar: 'صحة وإسعاف',
      fr: 'Santé & Médical',
      en: 'Health & Medical',
      derja: 'Se77a w Is3af',
    },
    civicFilter: {
      ar: 'مواطنة وحقوق',
      fr: 'Citoyenneté & Droits',
      en: 'Civic & Rights',
      derja: 'Madani w 7o9ou9',
    },
    utilityFilter: {
      ar: 'أعطال وخدمات',
      fr: 'Pannes & Services',
      en: 'Utilities & Outages',
      derja: 'Pannes w Khadamet',
    },
  };

  const categoryCfg: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
    emergency: { icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    health:    { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    civic:     { icon: Scale, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
    utility:   { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  };

  // Filtered lists
  const filteredGeneral = useMemo(() => {
    return generalContacts.filter((c) => {
      if (activeCategory !== 'all' && c.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = getLabel(c.name).toLowerCase().includes(q);
        const numMatch = c.number.replace(/\s/g, '').includes(q.replace(/\s/g, ''));
        const descMatch = c.description ? getLabel(c.description).toLowerCase().includes(q) : false;
        const tagMatch = c.tags?.some((t) => t.toLowerCase().includes(q));
        if (!nameMatch && !numMatch && !descMatch && !tagMatch) {
          return false;
        }
      }
      return true;
    });
  }, [generalContacts, activeCategory, searchQuery, locale]);

  const filteredMinistries = useMemo(() => {
    if (!searchQuery.trim()) return ministriesData;
    const q = searchQuery.toLowerCase().trim();
    return ministriesData.filter((m) => {
      const nameMatch = getLabel(m.name).toLowerCase().includes(q);
      const phoneMatch = m.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''));
      const addrMatch = m.address.toLowerCase().includes(q);
      return nameMatch || phoneMatch || addrMatch;
    });
  }, [searchQuery, locale]);

  const quickTags = [
    { label: 'Police (197)', query: '197', icon: ShieldAlert },
    { label: 'Garde (193)', query: '193', icon: Shield },
    { label: 'SAMU (190)', query: '190', icon: HeartPulse },
    { label: 'Pompiers (198)', query: '198', icon: Flame },
    { label: 'STEG', query: 'steg', icon: Zap },
    { label: 'SONEDE', query: 'sonede', icon: Droplets },
    { label: 'SOS Violence', query: '1899', icon: HeartHandshake },
  ];

  return (
    <main className="min-h-screen bg-[#07080b] text-white pb-24">
      {/* ── Top Header & Hero ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{getLabel(i18n.badge)}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {getLabel(i18n.title)}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {getLabel(i18n.sub)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 shrink-0 self-start md:self-auto">
            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2 font-mono">
              <LifeBuoy className="w-4 h-4 text-red-400" />
              <span className="text-zinc-200">24/7 Gratuit</span>
            </div>
          </div>
        </div>

        {/* ── Search Bar & Quick Tags ── */}
        <div className="pt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-4 rtl:pr-4 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getLabel(i18n.searchPlaceholder)}
              className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20 rounded-2xl py-3 pl-11 pr-24 rtl:pr-11 rtl:pl-24 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pl-3 flex items-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pl-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-950 border border-zinc-800 rounded">
                  /
                </kbd>
              </div>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-xs">
            <span className="text-[11px] text-zinc-400 font-medium shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {getLabel(i18n.quickSearch)}
            </span>
            {quickTags.map((tag) => {
              const TagIcon = tag.icon;
              return (
                <button
                  key={tag.label}
                  onClick={() => setSearchQuery(tag.query)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-[11px] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <TagIcon className="w-3 h-3 text-zinc-400" />
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FLAGSHIP 4 SOVEREIGN EMERGENCY HOTLINES ── */}
      {!searchQuery && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flagshipNumbers.map((c) => {
              const isCopied = copiedId === c.id;
              return (
                <div
                  key={c.id}
                  className="rounded-2xl bg-gradient-to-b from-[#14161f] to-[#0c0d12] border border-white/[0.08] hover:border-red-500/40 p-5 transition-all duration-200 group hover:shadow-xl hover:shadow-red-500/5 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Top Bar with Icon & Status */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner shrink-0">
                      {getContactIcon(c.id)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {getLabel(i18n.online24h)}
                      </span>
                      <button
                        onClick={() => handleCopy(c.number, c.id)}
                        title={locale === 'ar' ? 'نسخ الرقم' : locale === 'derja' ? 'Copier el numéro' : locale === 'en' ? 'Copy number' : 'Copier le numéro'}
                        className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Big Number */}
                  <div className="my-2">
                    <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white group-hover:text-red-400 transition-colors">
                      {c.number}
                    </div>
                    <h3 className="font-bold text-white text-sm mt-1 leading-snug">
                      {getLabel(c.name)}
                    </h3>
                    {c.description && (
                      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                        {getLabel(c.description)}
                      </p>
                    )}
                  </div>

                  {/* Direct Call Button */}
                  <a
                    href={`tel:${c.number.replace(/\s/g, '')}`}
                    onClick={(e) => handleSmartCall(e, c.number, c.id)}
                    className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{getLabel(i18n.directCall)} ({c.number})</span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── GENERAL HOTLINES & DIRECTORY ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5">
        {/* Category Tabs */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{getLabel(i18n.allFilter)}</span>
            </button>
            <button
              onClick={() => setActiveCategory('emergency')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'emergency'
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>{getLabel(i18n.emergencyFilter)}</span>
            </button>
            <button
              onClick={() => setActiveCategory('health')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'health'
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <HeartPulse className="w-3 h-3" />
              <span>{getLabel(i18n.healthFilter)}</span>
            </button>
            <button
              onClick={() => setActiveCategory('civic')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'civic'
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <Scale className="w-3 h-3" />
              <span>{getLabel(i18n.civicFilter)}</span>
            </button>
            <button
              onClick={() => setActiveCategory('utility')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'utility'
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{getLabel(i18n.utilityFilter)}</span>
            </button>
          </div>

          <span className="text-xs text-zinc-400 shrink-0 font-mono hidden sm:inline">
            {filteredGeneral.length} {locale === 'ar' ? 'رقم' : 'lignes'}
          </span>
        </div>

        {/* General Hotlines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGeneral.map((c: EmergencyContact) => {
            const isCopied = copiedId === c.id;
            const cfg = categoryCfg[c.category] ?? categoryCfg.civic;
            const IconComp = cfg.icon;

            return (
              <div
                key={c.id}
                className="flex flex-col rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-emerald-500/30 p-4 transition-all group relative justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                        {getContactIcon(c.id)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-xs leading-snug truncate group-hover:text-emerald-300 transition-colors">
                          {getLabel(c.name)}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                            <IconComp className="w-2.5 h-2.5" />
                            {c.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(c.number, c.id)}
                      title={locale === 'ar' ? 'نسخ' : locale === 'derja' ? 'Copier' : locale === 'en' ? 'Copy' : 'Copier'}
                      className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="my-2">
                    <div className="text-2xl font-black font-mono tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {c.number}
                    </div>
                    {c.description && (
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                        {getLabel(c.description)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 mt-2 flex items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    {c.isTollFree && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                        {getLabel(i18n.freeCall)}
                      </span>
                    )}
                    {c.available24h && (
                      <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full font-mono border border-zinc-800">
                        {getLabel(i18n.online24h)}
                      </span>
                    )}
                  </div>

                  <a
                    href={`tel:${c.number.replace(/\s/g, '')}`}
                    onClick={(e) => handleSmartCall(e, c.number, c.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-200 text-xs font-bold transition-all cursor-pointer border border-zinc-700 hover:border-emerald-500"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{getLabel(i18n.directCall)}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MINISTRIES SOVEREIGN DIRECTORY ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-14 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>{getLabel(i18n.ministriesTitle)}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">{getLabel(i18n.ministriesSub)}</p>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {filteredMinistries.length} {locale === 'ar' ? 'وزارة رسمية' : 'ministères'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredMinistries.map((m: Ministry) => (
            <div
              key={m.id}
              className="rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-zinc-700 p-4 transition-all flex flex-col justify-between gap-3 group"
            >
              <div>
                <h3 className="font-bold text-white text-sm leading-snug group-hover:text-emerald-300 transition-colors">
                  {getLabel(m.name)}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span className="truncate">{m.address}</span>
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
                <a
                  href={`tel:${m.phone.replace(/\s/g, '')}`}
                  onClick={(e) => handleSmartCall(e, m.phone, m.id)}
                  className="flex items-center gap-1.5 text-xs text-zinc-200 hover:text-white font-mono bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-800 transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{m.phone}</span>
                </a>

                <a
                  href={m.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors px-2.5 py-1.5 rounded-xl hover:bg-emerald-500/10"
                >
                  <span>{getLabel(i18n.visitSite)}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Toast Notification Banner ── */}
      {toastData && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0c0e14]/95 border border-emerald-500/30 text-emerald-400 shadow-[0_12px_40px_-5px_rgba(0,192,127,0.3)] backdrop-blur-xl">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-xs sm:text-sm text-white px-2 py-0.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                {toastData.number}
              </span>
              <span className="text-xs text-zinc-300 font-medium whitespace-nowrap">
                {toastData.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


