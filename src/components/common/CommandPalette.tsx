'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { proceduresData } from '../../data/procedures';
import { documentTemplatesData } from '../../data/documentTemplates';
import { publicOfficesData } from '../../data/offices';
import { getLocalized } from '../../lib/locale-utils';
import {
  Search,
  BookOpen,
  FileText,
  Building2,
  Mic,
  Calculator,
  ArrowRight,
  Sparkles,
  Briefcase,
  X,
  CornerDownLeft,
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  category: 'procedure' | 'document' | 'office' | 'tool';
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
  icon: React.ElementType;
}

export const CommandPalette: React.FC = () => {
  const { locale } = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Toggle on Ctrl+K or Cmd+K or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      setSelectedIndex(0);
      setQuery('');
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Build searchable index
  const results: SearchResultItem[] = React.useMemo(() => {
    const q = query.toLowerCase().trim();

    const quickTools: SearchResultItem[] = [
      {
        id: 'tool-copilot',
        category: 'tool',
        title:
          locale === 'ar'
            ? 'المساعد الإداري الذكي (Idaara AI)'
            : locale === 'derja'
            ? 'Idaara AI bel Derja'
            : locale === 'en'
            ? 'Idaara AI (Civic Chat)'
            : 'Idaara AI (Copilote Civique)',
        subtitle:
          locale === 'ar'
            ? 'مساعد إداري وقانوني متكامل للإجراءات والمناظرات'
            : locale === 'derja'
            ? 'Assistant idari w 9anouni lel awra9 wel démarches'
            : locale === 'en'
            ? 'Full civic & legal AI chat for Tunisian procedures & concours'
            : 'Assistant IA complet pour les démarches et concours tunisiens',
        url: '/copilot',
        badge: 'AI',
        icon: Sparkles,
      },
      {
        id: 'tool-fasserli',
        category: 'tool',
        title:
          locale === 'ar'
            ? 'فسّرلي هالورقة (OCR)'
            : locale === 'derja'
            ? 'Fasserli Hal War9a (OCR)'
            : locale === 'en'
            ? 'Notice OCR Decoder'
            : 'Décrypteur de Courriers (OCR)',
        subtitle:
          locale === 'ar'
            ? 'تحليل الإشعارات الجبائية والاستدعاءات'
            : locale === 'derja'
            ? 'Ta7lil les avis d’imposition wel convocations'
            : locale === 'en'
            ? 'Scan and decode official Tunisian letters'
            : 'Scannez avis fiscaux et convocations',
        url: '/fasserli',
        badge: 'OCR',
        icon: Sparkles,
      },
      {
        id: 'tool-calc',
        category: 'tool',
        title:
          locale === 'ar'
            ? 'حاسبة التنابر الجبائية'
            : locale === 'derja'
            ? 'Calculateur el Timbres wel Masrouf'
            : locale === 'en'
            ? 'Stamp & Budget Calculator'
            : 'Calculateur Timbres & Budget',
        subtitle:
          locale === 'ar'
            ? 'حساب دقيق لتنابر 5د، 15د، 80د'
            : locale === 'derja'
            ? '7seb s7i7 lel timbres 3DT, 5DT, 15DT, 80DT'
            : locale === 'en'
            ? 'Exact calculation for 5DT, 15DT, 80DT stamps'
            : 'Calcul exact des timbres 5DT, 15DT, 80DT',
        url: '/calculator',
        badge: 'DT',
        icon: Calculator,
      },
      {
        id: 'tool-concours',
        category: 'tool',
        title:
          locale === 'ar'
            ? 'المناظرات الوطنية (الوظيفة العمومية)'
            : locale === 'derja'
            ? 'Radar el Concourat (STEG, SONEDE, CAPES...)'
            : locale === 'en'
            ? 'National Concours Tracker (Public Sector)'
            : 'Concours Publics (STEG, SONEDE, CAPES)',
        subtitle:
          locale === 'ar'
            ? 'متابعة انتدابات الدولة مع الوثائق والتسجيل'
            : locale === 'derja'
            ? 'Suivi des intidhabat m3a l’awra9 w lien d’inscription'
            : locale === 'en'
            ? 'Real-time job notices and exam dossiers'
            : 'Suivi des recrutements de l’État et constitution du dossier',
        url: '/concours',
        badge: '2026',
        icon: Briefcase,
      },
    ];

    if (!q) return quickTools;

    const matchedProcedures: SearchResultItem[] = proceduresData
      .filter((p) => {
        const title = getLocalized(p.title, locale).toLowerCase();
        const desc = getLocalized(p.shortDescription, locale).toLowerCase();
        return title.includes(q) || desc.includes(q) || p.slug.includes(q) || p.tags.some(tag => tag.includes(q));
      })
      .slice(0, 4)
      .map((p) => ({
        id: `proc-${p.id}`,
        category: 'procedure',
        title: getLocalized(p.title, locale),
        subtitle: `${getLocalized(p.estimatedProcessingTime, locale)} · ${p.estimatedTotalCostTND.toFixed(3)} DT`,
        url: `/procedures/${p.id}`,
        badge: locale === 'ar' ? 'دليل' : locale === 'derja' ? 'Dalil' : locale === 'en' ? 'Guide' : 'Guide',
        icon: BookOpen,
      }));

    const matchedDocs: SearchResultItem[] = documentTemplatesData
      .filter((d) => {
        const title = getLocalized(d.title, locale).toLowerCase();
        const desc = getLocalized(d.description, locale).toLowerCase();
        return title.includes(q) || desc.includes(q);
      })
      .slice(0, 3)
      .map((d) => ({
        id: `doc-${d.id}`,
        category: 'document',
        title: getLocalized(d.title, locale),
        subtitle: `${d.category} · ${d.requiredTimbreTND} DT`,
        url: `/documents/${d.slug}`,
        badge: 'PDF',
        icon: FileText,
      }));

    const matchedOffices: SearchResultItem[] = publicOfficesData
      .filter((o) => {
        const name = getLocalized(o.name, locale).toLowerCase();
        return (
          name.includes(q) ||
          o.governorate.toLowerCase().includes(q) ||
          o.delegation.toLowerCase().includes(q)
        );
      })
      .slice(0, 3)
      .map((o) => ({
        id: `office-${o.id}`,
        category: 'office',
        title: getLocalized(o.name, locale),
        subtitle: `${o.governorate} · ${o.delegation}`,
        url: `/locator`,
        badge: locale === 'ar' ? 'مكتب' : locale === 'derja' ? 'Bureau' : locale === 'en' ? 'Office' : 'Bureau',
        icon: Building2,
      }));

    const filteredTools = quickTools.filter((t) =>
      t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)
    );

    return [...matchedProcedures, ...matchedDocs, ...matchedOffices, ...filteredTools];
  }, [query, locale]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) handleSelect(results[selectedIndex].url);
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const placeholder =
    locale === 'ar'
      ? 'ابحث عن إجراء، عقد، بلدية، أو تنبر...'
      : locale === 'derja'
      ? 'Lawwej 3la procédure, contrat, baladiya, timbre...'
      : locale === 'en'
      ? 'Search procedures, contracts, municipalities, or stamps...'
      : 'Rechercher une démarche, contrat, municipalité ou timbre...';

  const navHint =
    locale === 'ar'
      ? 'للتنقل'
      : locale === 'derja'
      ? 'Tbadal'
      : locale === 'en'
      ? 'Navigate'
      : 'Naviguer';
  const selectHint =
    locale === 'ar'
      ? 'للاختيار'
      : locale === 'derja'
      ? 'Tnakheb'
      : locale === 'en'
      ? 'Select'
      : 'Sélectionner';

  const emptyTitle =
    locale === 'ar'
      ? 'لا توجد نتائج مطابقة'
      : locale === 'derja'
      ? 'Ma fammech natija'
      : locale === 'en'
      ? 'No results found'
      : 'Aucun résultat trouvé';
  const emptyHint =
    locale === 'ar'
      ? 'جرب كلمات مثل «جواز» أو «كراء» أو «بلدية»'
      : locale === 'derja'
      ? 'Jarreb klem kima «passeport», «krè», walla «baladiya»'
      : locale === 'en'
      ? 'Try keywords like "passport", "lease", or "carte grise"'
      : 'Essayez «passeport», «bail» ou «carte grise»';

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/80 backdrop-blur-xl"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/80"
        style={{
          background: 'linear-gradient(135deg, rgba(9,11,14,0.97) 0%, rgba(18,20,25,0.97) 100%)',
          boxShadow: '0 0 0 1px rgba(16,185,129,0.08), 0 25px 60px rgba(0,0,0,0.6), 0 0 80px rgba(16,185,129,0.05)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top emerald accent line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-800/60 gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-600 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-mono bg-zinc-900/80 border border-zinc-700/60 text-zinc-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2.5 space-y-1">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-emerald-500/12 border border-emerald-500/25'
                      : 'hover:bg-zinc-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25'
                          : 'bg-zinc-900/80 border border-zinc-800 text-emerald-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-3">
                    {isSelected && (
                      <span className="hidden sm:flex items-center">
                        <CornerDownLeft className="w-3 h-3 text-zinc-600" />
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 rtl:rotate-180 ${isSelected ? 'text-emerald-400' : 'text-zinc-700'}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-14 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Search className="w-5 h-5 text-zinc-700" />
              </div>
              <p className="text-sm font-semibold text-zinc-400">{emptyTitle}</p>
              <p className="text-[11px] text-zinc-600 mt-1.5 max-w-xs mx-auto">{emptyHint}</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-5 py-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-800">↑↓</kbd>
              <span>{navHint}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-800">↵</kbd>
              <span>{selectHint}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-500/60">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {locale === 'ar'
                ? 'محرك بحث إدارة'
                : locale === 'derja'
                ? 'Moteur Recherche Idaara'
                : locale === 'en'
                ? 'Idaara Civic Search'
                : 'Moteur de Recherche Idaara'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
