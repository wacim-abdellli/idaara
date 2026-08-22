'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, locale } = useLocale();
  const pathname = usePathname();

  if (!pathname || pathname === '/copilot' || pathname.startsWith('/copilot')) {
    return null;
  }

  const servicesTitle =
    locale === 'ar'
      ? 'الخدمات الذكية'
      : locale === 'derja'
      ? 'Khedmetna el Thakiya'
      : locale === 'en'
      ? 'Smart Services'
      : 'Services Intelligents';

  const directoryTitle =
    locale === 'ar'
      ? 'الأدلة والإجراءات'
      : locale === 'derja'
      ? 'Dalil el Idara wel Démarches'
      : locale === 'en'
      ? 'Directories & Guides'
      : 'Annuaires & Démarches';

  const legalTitle =
    locale === 'ar'
      ? 'الشفافية والإطار القانوني'
      : locale === 'derja'
      ? 'El Chafafiya wel 9anoun'
      : locale === 'en'
      ? 'Framework & Transparency'
      : 'Transparence & Cadre';

  const servicesLinks = [
    {
      href: '/copilot',
      label:
        locale === 'ar'
          ? 'المساعد الذكي (Idaara AI)'
          : locale === 'derja'
          ? 'Idaara AI bel Derja'
          : locale === 'en'
          ? 'Idaara AI (Civic Copilot)'
          : 'Idaara AI (Copilote Civique)',
    },
    {
      href: '/fasserli',
      label:
        locale === 'ar'
          ? 'قارئ الوثائق الذكي (OCR)'
          : locale === 'derja'
          ? 'Fasserli el War9a (OCR)'
          : locale === 'en'
          ? 'Document Decoder (OCR)'
          : 'Décrypteur de Courriers (OCR)',
    },
    {
      href: '/documents',
      label:
        locale === 'ar'
          ? 'نماذج العقود والاستمارات الرسمية'
          : locale === 'derja'
          ? 'Les Contrats wel Wathaye9 PDF'
          : locale === 'en'
          ? 'Official Legal Forms & Contracts'
          : 'Formulaires & Contrats PDF',
    },
    {
      href: '/calculator',
      label:
        locale === 'ar'
          ? 'حاسبة التنابر وميزانية الإجراء'
          : locale === 'derja'
          ? 'Calculateur el Timbres wel Masrouf'
          : locale === 'en'
          ? 'Fiscal Stamp & Budget Calculator'
          : 'Calculateur de Timbres Fiscaux',
    },
    {
      href: '/concours',
      label:
        locale === 'ar'
          ? 'رادار المناظرات الوطنية (الوظيفة العمومية)'
          : locale === 'derja'
          ? 'Radar el Concourat (STEG, SONEDE, CAPES)'
          : locale === 'en'
          ? 'National Public Concours Radar'
          : 'Radar des Concours Nationaux (STEG, CAPES)',
    },
  ];

  const directoryLinks = [
    {
      href: '/locator',
      label:
        locale === 'ar'
          ? 'دليل البلديات والمصالح (24 ولاية)'
          : locale === 'derja'
          ? 'Baladiyas w Masale7 (24 Wilaya)'
          : locale === 'en'
          ? 'Public Offices & Baladiyas (24 Wilayas)'
          : 'Guide des Baladiyas (24 Wilayas)',
    },
    {
      href: '/launchpad',
      label:
        locale === 'ar'
          ? 'فضاء المستقل والمبادر الذاتي'
          : locale === 'derja'
          ? 'Statut Auto-Entrepreneur 1%'
          : locale === 'en'
          ? 'Freelancers & Auto-Entrepreneurs'
          : 'Freelance & Auto-Entrepreneur',
    },
    {
      href: '/procedures',
      label:
        locale === 'ar'
          ? 'دليل الإجراءات الإدارية الرسمية'
          : locale === 'derja'
          ? 'Dalil el Procédures el Rasmiya'
          : locale === 'en'
          ? 'Official Procedures Catalog'
          : 'Catalogue des Démarches',
    },
  ];

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/95 text-zinc-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo />
            <p className="text-zinc-500 text-xs leading-relaxed">
              {t('heroSubheadline')}
            </p>
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-emerald-400/90 bg-emerald-950/30 border border-emerald-800/40 px-3 py-1.5 rounded-xl text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span>Zero-Storage Privacy Protocol</span>
            </div>
          </div>

          {/* Col 2: Core Tools (Clean text, no icons) */}
          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-xs uppercase tracking-wider">
              {servicesTitle}
            </h4>
            <ul className="space-y-2.5">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors text-xs inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Directories & Guides (Clean text, no icons) */}
          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-xs uppercase tracking-wider">
              {directoryTitle}
            </h4>
            <ul className="space-y-2.5">
              {directoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors text-xs inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="http://www.iort.gov.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 rtl:space-x-reverse text-zinc-400 hover:text-emerald-400 transition-colors text-xs"
                >
                  <span>Journal Officiel (JORT)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Standards & Legal */}
          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-xs uppercase tracking-wider">
              {legalTitle}
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed mb-3">
              {t('footerDisclaimer')}
            </p>
            <div className="text-[11px] text-zinc-600 font-mono">
              Version 1.0.0 · Production
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs">
          <p>© {new Date().getFullYear()} Idaara.tn. {locale === 'en' ? 'All rights reserved.' : locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}</p>
          <div className="mt-3 sm:mt-0 text-[11px] text-zinc-600">
            {locale === 'en'
              ? 'Independent civic technology project for Tunisia.'
              : locale === 'ar'
              ? 'مشروع تكنولوجي مدني مستقل للمواطن التونسي.'
              : 'Projet civique indépendant pour les citoyens tunisiens.'}
          </div>
        </div>
      </div>
    </footer>
  );
};
