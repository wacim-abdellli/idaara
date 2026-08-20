'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '../../context/LocaleContext';
import { ShieldCheck, Heart, FileText, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLocale();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/90 text-zinc-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🏛️</span>
              <span className="font-bold text-base text-white">Idaara.tn · إدارة.تونس</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {t('heroSubheadline')}
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-lg text-[11px]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Zero-Storage Privacy Protocol</span>
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-sm">Services Intelligents</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/copilot" className="hover:text-emerald-400 transition-colors">
                  🎙️ Voice Copilot (Derja AI)
                </Link>
              </li>
              <li>
                <Link href="/fasserli" className="hover:text-emerald-400 transition-colors">
                  📄 Fasserli Hal War9a (OCR)
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-emerald-400 transition-colors">
                  📝 Smart PDF Form Generator
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-emerald-400 transition-colors">
                  🧮 Timbre & Awra9 Budget
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Directories & Guides */}
          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-sm">Annuaires & Démarches</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/locator" className="hover:text-emerald-400 transition-colors">
                  📍 Guide des Baladiyas (24 Wilayas)
                </Link>
              </li>
              <li>
                <Link href="/launchpad" className="hover:text-emerald-400 transition-colors">
                  🚀 Freelance & Auto-Entrepreneur
                </Link>
              </li>
              <li>
                <Link href="/procedures" className="hover:text-emerald-400 transition-colors">
                  📚 25+ Démarches Officielles
                </Link>
              </li>
              <li>
                <a
                  href="http://www.iort.gov.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Journal Officiel (JORT)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Standards & Legal */}
          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-sm">Transparence & Cadre</h4>
            <p className="text-zinc-500 text-xs leading-relaxed mb-3">
              {t('footerDisclaimer')}
            </p>
            <div className="text-[11px] text-zinc-500">
              Version 1.0.0 (Production) · 🇹🇳 Made with care for all Tunisians.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs">
          <p>© {new Date().getFullYear()} Idaara.tn. Tous droits réservés.</p>
          <div className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Bniyet b'kol 7ob fi Tounes</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>bech traye7 l'mowaten.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
