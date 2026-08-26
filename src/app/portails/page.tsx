'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  ExternalLink,
  Smartphone,
  Clock,
  Globe,
  Star,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Bot,
  Layers,
  Fingerprint,
  FileCheck,
  ScrollText,
  Rocket,
  Award,
  UserCheck,
  Shield,
  HeartPulse,
  Car,
  Coins,
  Mail,
  Building2,
  BookOpen,
  Zap,
  Droplet,
  PackageCheck,
  GraduationCap,
  Landmark,
  Briefcase,
  Scale,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { portailsData, portalCategories, EGovPortal } from '../../data/portails';
import type { SupportedLanguage } from '../../data/translations';

export default function PortailsPage() {
  const { locale, isRtl } = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [onlyMobile, setOnlyMobile] = useState<boolean>(false);
  const [only24h, setOnly24h] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastData, setToastData] = useState<{ url: string; label: string } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('idaara_portal_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Toggle favorite portal
  const toggleFavorite = (portalId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(portalId)
        ? prev.filter((id) => id !== portalId)
        : [...prev, portalId];
      try {
        localStorage.setItem('idaara_portal_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Copy URL with toast state
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToastData({
      url,
      label:
        locale === 'ar'
          ? 'تم نسخ رابط البوابة بنجاح'
          : locale === 'derja'
          ? 'Lien el portail tnesa5'
          : locale === 'en'
          ? 'Portal link copied to clipboard'
          : 'Lien du portail copié dans le presse-papier',
    });
    setTimeout(() => {
      setCopiedId(null);
      setToastData(null);
    }, 2400);
  };

  // Shortcut key / or ⌘K
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

  const getLabel = (obj: Record<string, string>) =>
    (obj as Record<SupportedLanguage, string>)[locale as SupportedLanguage] ?? obj.fr;

  const getPortalIcon = (id: string) => {
    switch (id) {
      case 'e-houwiya':
        return <Fingerprint className="w-5 h-5 text-emerald-400" />;
      case 'b3-interieur':
        return <FileCheck className="w-5 h-5 text-blue-400" />;
      case 'madania-etat-civil':
        return <ScrollText className="w-5 h-5 text-sky-400" />;
      case 'auto-entrepreneur':
        return <Rocket className="w-5 h-5 text-amber-400" />;
      case 'concours-gov':
        return <Award className="w-5 h-5 text-yellow-400" />;
      case 'aneti-portal':
        return <UserCheck className="w-5 h-5 text-teal-400" />;
      case 'e-cnss':
        return <Shield className="w-5 h-5 text-purple-400" />;
      case 'cnam-portal':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'attt-portal':
        return <Car className="w-5 h-5 text-orange-400" />;
      case 'e-finance':
        return <Coins className="w-5 h-5 text-emerald-400" />;
      case 'edinar-poste':
        return <Mail className="w-5 h-5 text-blue-400" />;
      case 'rne-tn':
        return <Building2 className="w-5 h-5 text-indigo-400" />;
      case 'iort-jort':
        return <BookOpen className="w-5 h-5 text-violet-400" />;
      case 'steg-online':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'sonede-online':
        return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'douane-gov':
        return <PackageCheck className="w-5 h-5 text-emerald-400" />;
      case 'mes-tn':
        return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case 'bct-tunisie':
        return <Landmark className="w-5 h-5 text-emerald-400" />;
      default:
        return <Globe className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'all':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'identity':
        return <Fingerprint className="w-3.5 h-3.5" />;
      case 'employment':
        return <Briefcase className="w-3.5 h-3.5" />;
      case 'business':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'finance':
        return <Coins className="w-3.5 h-3.5" />;
      case 'social':
        return <Shield className="w-3.5 h-3.5" />;
      case 'transport':
        return <Car className="w-3.5 h-3.5" />;
      case 'utilities':
        return <Zap className="w-3.5 h-3.5" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5" />;
      case 'legal':
        return <Scale className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  // Filter Logic
  const filtered = useMemo(() => {
    return portailsData.filter((portal) => {
      // Category filter
      if (activeCategory !== 'all' && portal.category !== activeCategory) {
        return false;
      }
      // Favorites filter
      if (onlyFavorites && !favorites.includes(portal.id)) {
        return false;
      }
      // Mobile app filter
      if (onlyMobile && !portal.isMobile) {
        return false;
      }
      // 24/7 online filter
      if (only24h && !portal.isOnline24h) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = portal.name.toLowerCase().includes(q);
        const urlMatch = portal.url.toLowerCase().includes(q);
        const domainMatch = portal.domain.toLowerCase().includes(q);
        const descMatch = getLabel(portal.description).toLowerCase().includes(q);
        const tagMatch = portal.tags?.some((tag) => tag.toLowerCase().includes(q));
        const servicesMatch = portal.services?.some((s) => getLabel(s).toLowerCase().includes(q));

        if (!nameMatch && !urlMatch && !domainMatch && !descMatch && !tagMatch && !servicesMatch) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, searchQuery, onlyFavorites, onlyMobile, only24h, favorites, locale]);

  // Quick Tags with Vector Icons
  const quickSearchTags = [
    { label: 'B3 & CIN', query: 'b3', icon: Fingerprint },
    { label: 'STEG & SONEDE', query: 'facture', icon: Zap },
    { label: 'Carte Grise', query: 'carte grise', icon: Car },
    { label: 'Auto-Entrepreneur', query: 'auto entrepreneur', icon: Rocket },
    { label: 'Concours', query: 'concours', icon: Award },
    { label: 'Impôts & Vignette', query: 'impot', icon: Coins },
  ];

  return (
    <main className="min-h-screen bg-[#07080b] text-white pb-24">
      {/* ── Top Header & Hero ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>
                {portailsData.length}{' '}
                {locale === 'ar' ? 'بوابة عمومية رسمية موثقة' : locale === 'derja' ? 'portails rasmiyin' : locale === 'en' ? 'Verified Tunisian e-Gov Portals' : 'Portails Publics Certifiés'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {locale === 'ar'
                ? 'دليل البوابات والخدمات الرقمية التونسية'
                : locale === 'derja'
                ? 'Dalil el Portails wel Khedmet el Ra9miya'
                : locale === 'en'
                ? 'Tunisian E-Government Portals Directory'
                : 'Annuaire des Portails E-Gouvernement Tunisiens'}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {locale === 'ar'
                ? 'دليل موحد للوصول المباشر لكافة المنصات الإدارية الرسمية للجمهورية التونسية مع تأكيد أمان الروابط.'
                : locale === 'derja'
                ? 'Khedmet el 7kouma kol-ha fi blassa wa7da — rawabit rasmiya mouwath9a.'
                : locale === 'en'
                ? 'Single sovereign gateway to all official Tunisian administrative platforms with security-verified domains.'
                : 'Accès centralisé et sécurisé à l’ensemble des téléservices officiels de l’administration tunisienne.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 shrink-0 self-start md:self-auto">
            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-zinc-200">100% .tn / .gov.tn</span>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlyFavorites
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{favorites.length} {locale === 'ar' ? 'مفضلة' : 'Favoris'}</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="pt-6 space-y-4">
          {/* Main Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-4 rtl:pr-4 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === 'ar'
                  ? 'ابحث باسم البوابة، الخدمة (مثل: B3، مضامين، بطاقة رمادية، فاتورة، خلاص)...'
                  : locale === 'derja'
                  ? 'Lawwej b’esm el portail walla el khedma (B3, madhmoun, karta grise, steg)...'
                  : locale === 'en'
                  ? 'Search by portal name, service (e.g., B3, Birth cert, Vehicle registration, Tax)...'
                  : 'Rechercher un portail ou service (ex: B3, CIN, Extrait, Carte grise, Facture STEG, Vignette)...'
              }
              className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl py-3 pl-11 pr-24 rtl:pr-11 rtl:pl-24 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
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
              {locale === 'ar' ? 'بحث سريع:' : 'Accès rapide :'}
            </span>
            {quickSearchTags.map((tag) => {
              const TagIcon = tag.icon;
              return (
                <button
                  key={tag.label}
                  onClick={() => {
                    setSearchQuery(tag.query);
                    setActiveCategory('all');
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-[11px] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <TagIcon className="w-3 h-3 text-zinc-400" />
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Tabs & Quick Toggles */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
            {/* Category Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {portalCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-md shadow-emerald-500/20 font-bold'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{getLabel(cat.label)}</span>
                </button>
              ))}
            </div>

            {/* Filter Switches */}
            <div className="flex items-center gap-2 text-xs shrink-0 self-start lg:self-auto">
              <button
                onClick={() => setOnly24h(!only24h)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs transition-all cursor-pointer ${
                  only24h
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 font-bold'
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>24/7</span>
              </button>

              <button
                onClick={() => setOnlyMobile(!onlyMobile)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs transition-all cursor-pointer ${
                  onlyMobile
                    ? 'bg-sky-500/15 text-sky-300 border-sky-500/30 font-bold'
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>App</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results Count Bar ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-5">
        <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800/50">
          <span>
            {filtered.length}{' '}
            {locale === 'ar'
              ? 'بوابة مطابقة'
              : locale === 'derja'
              ? 'portail mawjoud'
              : locale === 'en'
              ? 'portals found'
              : 'portails trouvés'}
          </span>

          {(searchQuery || activeCategory !== 'all' || onlyFavorites || onlyMobile || only24h) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setOnlyFavorites(false);
                setOnlyMobile(false);
                setOnly24h(false);
              }}
              className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              {locale === 'ar' ? 'إعادة ضبط الفلاتر' : 'Réinitialiser les filtres'}
            </button>
          )}
        </div>
      </section>

      {/* ── Portals Grid ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-zinc-900/30 border border-zinc-800/60 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {locale === 'ar' ? 'لم يتم العثور على بوابات' : 'Aucun portail trouvé'}
            </h3>
            <p className="text-xs text-zinc-400">
              {locale === 'ar'
                ? 'جرب البحث بكلمة أخرى أو اسأل مساعد إدارة الذكي.'
                : 'Essayez un autre mot-clé ou demandez directement à notre assistant IA.'}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setOnlyFavorites(false);
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                {locale === 'ar' ? 'عرض جميع البوابات' : 'Voir tous les portails'}
              </button>
              <Link
                href="/copilot"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Idaara AI</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((portal: EGovPortal) => {
              const isFav = favorites.includes(portal.id);
              const isCopied = copiedId === portal.id;

              return (
                <div
                  key={portal.id}
                  className="flex flex-col rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-emerald-500/30 p-5 transition-all duration-200 group hover:shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden"
                >
                  {/* Top Bar: Icon, Title, Fav & Copy */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                        {getPortalIcon(portal.id)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm leading-snug truncate group-hover:text-emerald-300 transition-colors">
                          {portal.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 truncate">
                          <Globe className="w-3 h-3 text-zinc-600 shrink-0" />
                          <span className="truncate">{portal.domain}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: Favorite & Copy */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleFavorite(portal.id)}
                        title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isFav
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleCopyUrl(portal.url, portal.id)}
                        title="Copier le lien"
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {portal.isOnline24h ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        24/7 En ligne
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                        <Clock className="w-2.5 h-2.5" />
                        Heures ouvrables
                      </span>
                    )}

                    {portal.isMobile && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 font-medium">
                        <Smartphone className="w-2.5 h-2.5" />
                        App Mobile
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-800/80">
                      Certifié .tn
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2 flex-grow">
                    {getLabel(portal.description)}
                  </p>

                  {/* Services Tags */}
                  <div className="mb-4 space-y-1.5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      {locale === 'ar' ? 'الخدمات المتاحة :' : 'Services Directs :'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {portal.services.map((svc, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                        >
                          <span className="text-emerald-400 text-xs">›</span>
                          <span className="truncate max-w-[190px]">{getLabel(svc)}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-3 border-t border-zinc-800/80 mt-auto flex items-center justify-between gap-2">
                    <Link
                      href={`/copilot?q=${encodeURIComponent(`Comment utiliser le portail officiel ${portal.name} (${portal.domain}) et quelles sont les démarches ?`)}`}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-emerald-400 transition-colors"
                      title="Demander à l'assistant IA"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>{locale === 'ar' ? 'إرشاد ذكي' : 'Aide IA'}</span>
                    </Link>

                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/15 transition-all hover:scale-105 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'فتح البوابة' : locale === 'en' ? 'Open Portal' : 'Accéder au portail'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Security / Phishing Citizen Notice ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-12">
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-zinc-200">
                {locale === 'ar'
                  ? 'حماية وأمان المواطن من الاحتيال الإلكتروني'
                  : 'Sécurité & Protection contre le Phishing'}
              </p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                {locale === 'ar'
                  ? 'جميع البوابات مفحوصة وموثقة وتنتهي بالنطاقات الرسمية للدولة (.tn / .gov.tn). لا تشارك كلمات السر أو رموز الهوية الرقمية في مواقع غير رسمية.'
                  : 'Tous les liens répertoriés sont certifiés domaines souverains (.tn / .gov.tn). Ne communiquez jamais vos identifiants ou code e-Houwiya sur des sites non certifiés.'}
              </p>
            </div>
          </div>

          <Link
            href="/copilot"
            className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors shrink-0 whitespace-nowrap self-end sm:self-auto border border-zinc-700"
          >
            {locale === 'ar' ? 'استشر المساعد الذكي' : 'Consulter Copilot'}
          </Link>
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
              <span className="font-mono font-bold text-xs sm:text-sm text-white px-2 py-0.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 max-w-[200px] truncate">
                {toastData.url}
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

