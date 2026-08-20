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
  const { locale, t } = useLocale();
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

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Build searchable index
  const results: SearchResultItem[] = React.useMemo(() => {
    const q = query.toLowerCase().trim();

    const quickTools: SearchResultItem[] = [
      {
        id: 'tool-copilot',
        category: 'tool',
        title: locale === 'ar' ? 'المساعد الصوتي بالدارجة' : locale === 'en' ? 'Voice Copilot (Derja AI)' : 'Voice Copilot en Derja',
        subtitle: locale === 'ar' ? 'تحدث بالصوت حول أي إجراء' : locale === 'en' ? 'Speak with AI about any procedure' : 'Posez vos questions par la voix',
        url: '/copilot',
        badge: 'Voice AI',
        icon: Mic,
      },
      {
        id: 'tool-fasserli',
        category: 'tool',
        title: locale === 'ar' ? 'فسّرلي هالورقة (OCR)' : locale === 'en' ? 'Notice OCR Decoder (Fasserli)' : 'Décrypteur de Courriers (OCR)',
        subtitle: locale === 'ar' ? 'تحليل الإشعارات الجبائية والاستدعاءات' : locale === 'en' ? 'Scan and decode official letters' : 'Scannez avis fiscaux et convocations',
        url: '/fasserli',
        badge: 'Smart OCR',
        icon: Sparkles,
      },
      {
        id: 'tool-calc',
        category: 'tool',
        title: locale === 'ar' ? 'حاسبة التنابر الجبائية' : locale === 'en' ? 'Fiscal Stamps & Budget Calculator' : 'Calculateur Timbres & Budget',
        subtitle: locale === 'ar' ? 'حساب دقيق لتنابر 5د، 15د، 80د' : locale === 'en' ? 'Exact calculation for 5DT, 15DT, 80DT' : 'Calcul des timbres 5DT, 15DT, 80DT',
        url: '/calculator',
        badge: 'Budget DT',
        icon: Calculator,
      },
    ];

    if (!q) {
      return quickTools;
    }

    const matchedProcedures: SearchResultItem[] = proceduresData
      .filter((p) => {
        const title = getLocalized(p.title, locale).toLowerCase();
        const desc = getLocalized(p.shortDescription, locale).toLowerCase();
        return title.includes(q) || desc.includes(q) || p.slug.includes(q);
      })
      .slice(0, 4)
      .map((p) => ({
        id: `proc-${p.id}`,
        category: 'procedure',
        title: getLocalized(p.title, locale),
        subtitle: `${p.vertical} · ${p.estimatedProcessingTime} · ${p.estimatedTotalCostTND} DT`,
        url: `/procedures/${p.id}`,
        badge: 'Guide',
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
        subtitle: `${d.category} · ${d.requiredTimbreTND} DT Timbre`,
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
        badge: o.category,
        icon: Building2,
      }));

    return [...matchedProcedures, ...matchedDocs, ...matchedOffices, ...quickTools.filter((t) => t.title.toLowerCase().includes(q))];
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
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].url);
      }
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-fade-in-up"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800/80 gap-3">
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
            placeholder={
              locale === 'ar'
                ? 'ابحث عن إجراء، عقد، بلدية، أو تنبر...'
                : locale === 'en'
                ? 'Search a procedure, contract, municipality, or stamp...'
                : 'Rechercher une démarche, contrat, municipalité...'
            }
            className="flex-1 bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-400">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-zinc-100'
                      : 'hover:bg-zinc-900/80 border border-transparent text-zinc-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/30'
                          : 'bg-zinc-900 border border-zinc-800 text-emerald-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0 uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 shrink-0 pl-2">
                    {isSelected && (
                      <span className="hidden sm:flex items-center space-x-1 text-[10px] text-zinc-500">
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-zinc-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-zinc-600" />
              <p className="text-xs font-semibold">
                {locale === 'ar' ? 'لا توجد نتائج مطابقة' : 'Aucun résultat trouvé'}
              </p>
              <p className="text-[11px] text-zinc-600 mt-1">
                {locale === 'ar'
                  ? 'جرب البحث بكلمات أخرى مثل "جواز"، "كراء"، أو "بلدية"'
                  : 'Essayez un mot-clé comme "passeport", "bail" ou "carte grise"'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span>↑↓ {locale === 'ar' ? 'للتنقل' : 'Naviguer'}</span>
            <span>↵ {locale === 'ar' ? 'للاختيار' : 'Sélectionner'}</span>
          </div>
          <div className="flex items-center space-x-1 text-emerald-400">
            <span>Idaara Instant Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
