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
    ar: 'Idaara.tn',
    fr: 'Idaara.tn',
    en: 'Idaara.tn',
    derja: 'Idaara.tn',
  },
  '/copilot': {
    ar: 'Idaara AI | Idaara.tn',
    fr: 'Idaara AI | Idaara.tn',
    en: 'Idaara AI | Idaara.tn',
    derja: 'Idaara AI | Idaara.tn',
  },
  '/fasserli': {
    ar: 'Fasserli OCR | Idaara.tn',
    fr: 'Fasserli OCR | Idaara.tn',
    en: 'Fasserli OCR | Idaara.tn',
    derja: 'Fasserli OCR | Idaara.tn',
  },
  '/documents': {
    ar: 'الوثائق والعقود | Idaara.tn',
    fr: 'Documents & Contrats | Idaara.tn',
    en: 'Documents & Contracts | Idaara.tn',
    derja: 'Modélet & 39oud | Idaara.tn',
  },
  '/procedures': {
    ar: 'دليل الإجراءات | Idaara.tn',
    fr: 'Guide des Démarches | Idaara.tn',
    en: 'Procedures Directory | Idaara.tn',
    derja: 'Dalil el Démarches | Idaara.tn',
  },
  '/calculator': {
    ar: 'حاسبة التنابر | Idaara.tn',
    fr: 'Calculateur Timbres | Idaara.tn',
    en: 'Stamp Calculator | Idaara.tn',
    derja: 'Calculateur Timbres | Idaara.tn',
  },
  '/concours': {
    ar: 'رادار المناظرات | Idaara.tn',
    fr: 'Radar Concours | Idaara.tn',
    en: 'Concours Radar | Idaara.tn',
    derja: 'Radar Concourat | Idaara.tn',
  },
  '/locator': {
    ar: 'دليل البلديات | Idaara.tn',
    fr: 'Atlas Baladiyas | Idaara.tn',
    en: 'Atlas Baladiyas | Idaara.tn',
    derja: 'Atlas Baladiyas | Idaara.tn',
  },
  '/launchpad': {
    ar: 'فضاء المستقل (1%) | Idaara.tn',
    fr: 'Espace Freelance 1% | Idaara.tn',
    en: 'Freelance Hub (1%) | Idaara.tn',
    derja: 'Espace Freelance 1% | Idaara.tn',
  },
  '/portails': {
    ar: 'البوابات الحكومية | Idaara.tn',
    fr: 'Portails e-Gov | Idaara.tn',
    en: 'e-Gov Portals | Idaara.tn',
    derja: 'Portails e-Gov | Idaara.tn',
  },
  '/contacts': {
    ar: 'أرقام الطوارئ | Idaara.tn',
    fr: "Numéros d'Urgence | Idaara.tn",
    en: 'Emergency Numbers | Idaara.tn',
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
    document.title = 'Idaara.tn';
  }, [pathname, locale]);

  return null;
}
