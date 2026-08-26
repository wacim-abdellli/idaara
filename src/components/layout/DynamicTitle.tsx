'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { getProcedureById } from '../../data/procedures';
import { getTemplateBySlug } from '../../data/documentTemplates';
import { getLocalized } from '../../lib/locale-utils';
import { SupportedLanguage } from '../../data/translations';

const ROUTE_TITLES: Record<string, Record<SupportedLanguage, string>> = {
  '/': {
    ar: 'Idaara.tn — دليلك الإداري الذكي',
    fr: 'Idaara.tn — AI Copilot & Démarches Administratives',
    en: 'Idaara.tn — AI Civic Copilot & Procedures',
    derja: 'Idaara.tn — Assistant Idari Tounsi',
  },
  '/copilot': {
    ar: 'المساعد الذكي | Idaara.tn',
    fr: 'AI Copilot | Idaara.tn',
    en: 'AI Copilot | Idaara.tn',
    derja: 'Idaara AI | Idaara.tn',
  },
  '/fasserli': {
    ar: 'فسّرلي الورقة (OCR) | Idaara.tn',
    fr: 'Fasserli OCR | Idaara.tn',
    en: 'Fasserli OCR | Idaara.tn',
    derja: 'Fasserli OCR | Idaara.tn',
  },
  '/documents': {
    ar: 'الوثائق والعقود الرسمية | Idaara.tn',
    fr: 'Documents & Contrats | Idaara.tn',
    en: 'Legal Documents & Contracts | Idaara.tn',
    derja: 'Modélet & 39oud | Idaara.tn',
  },
  '/procedures': {
    ar: 'دليل الإجراءات الإدارية | Idaara.tn',
    fr: 'Guide des Démarches | Idaara.tn',
    en: 'Procedures Directory | Idaara.tn',
    derja: 'Dalil el Démarches | Idaara.tn',
  },
  '/calculator': {
    ar: 'حاسبة التنابر والرسوم | Idaara.tn',
    fr: 'Calculateur de Timbres | Idaara.tn',
    en: 'Stamp Calculator | Idaara.tn',
    derja: 'Calculateur Timbres | Idaara.tn',
  },
  '/concours': {
    ar: 'رادار المناظرات الوطنية | Idaara.tn',
    fr: 'Radar des Concours | Idaara.tn',
    en: 'Public Concours Radar | Idaara.tn',
    derja: 'Radar el Concourat | Idaara.tn',
  },
  '/locator': {
    ar: 'أطلس البلديات والمصالح | Idaara.tn',
    fr: 'Atlas Baladiyas & Guichets | Idaara.tn',
    en: 'Baladiyas & Public Offices | Idaara.tn',
    derja: 'Atlas Baladiyas & 9badhat | Idaara.tn',
  },
  '/launchpad': {
    ar: 'فضاء المستقل (1%) | Idaara.tn',
    fr: 'Espace Freelance 1% | Idaara.tn',
    en: 'Freelance Hub (1% Tax) | Idaara.tn',
    derja: 'Espace Freelance 1% | Idaara.tn',
  },
  '/portails': {
    ar: 'دليل البوابات الحكومية | Idaara.tn',
    fr: 'Portails e-Gov | Idaara.tn',
    en: 'e-Gov Portals Directory | Idaara.tn',
    derja: 'Portails e-Gov | Idaara.tn',
  },
  '/contacts': {
    ar: 'أرقام الطوارئ والمصالح | Idaara.tn',
    fr: "Numéros d'Urgence & Contacts | Idaara.tn",
    en: 'Emergency Numbers & Helplines | Idaara.tn',
    derja: 'Noumrouwet el 7adra | Idaara.tn',
  },
};

export function DynamicTitle() {
  const pathname = usePathname();
  const { locale } = useLocale();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Check for exact static route match
    if (ROUTE_TITLES[pathname]) {
      const match = ROUTE_TITLES[pathname][locale] || ROUTE_TITLES[pathname]['fr'];
      if (match) {
        document.title = match;
        return;
      }
    }

    // 2. Check for dynamic procedure route: /procedures/[id]
    if (pathname.startsWith('/procedures/')) {
      const id = pathname.replace('/procedures/', '').split('/')[0];
      const procedure = getProcedureById(id);
      if (procedure) {
        const title = getLocalized(procedure.title, locale === 'derja' ? 'fr' : locale);
        const costLabel =
          procedure.estimatedTotalCostTND > 0
            ? ` (${procedure.estimatedTotalCostTND} DT)`
            : locale === 'ar'
            ? ' (مجاني)'
            : ' (Gratuit)';
        document.title = `${title}${costLabel} | Idaara.tn`;
        return;
      }
    }

    // 3. Check for dynamic document route: /documents/[slug]
    if (pathname.startsWith('/documents/')) {
      const slug = pathname.replace('/documents/', '').split('/')[0];
      const template = getTemplateBySlug(slug);
      if (template) {
        const title = getLocalized(template.title, locale === 'derja' ? 'fr' : locale);
        document.title = `${title} (PDF) | Idaara.tn`;
        return;
      }
    }

    // Fallback default title
    const fallbackMap: Record<SupportedLanguage, string> = {
      ar: 'Idaara.tn — دليلك الإداري الذكي',
      fr: 'Idaara.tn — AI Copilot & Démarches Administratives',
      en: 'Idaara.tn — AI Civic Copilot & Procedures',
      derja: 'Idaara.tn — Assistant Idari Tounsi',
    };
    document.title = fallbackMap[locale] || fallbackMap['fr'];
  }, [pathname, locale]);

  return null;
}
