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
    ar: 'إدارة تونس — دليلك الإداري والجبائي الذكي | Idaara.tn',
    fr: 'Idaara.tn — Copilote Citoyen & Démarches Administratives',
    en: 'Idaara.tn — Smart Civic Copilot & Tunisian Procedures',
    derja: 'Idaara.tn — Msa3dek el Dheki fel Idara wel Awra9',
  },
  '/copilot': {
    ar: 'المساعد الإداري الذكي | Idaara AI',
    fr: 'Idaara AI — Copilote Citoyen & Démarches',
    en: 'Idaara AI — Smart Civic Assistant',
    derja: 'Idaara AI — Msa3dek el Idari el Dheki',
  },
  '/fasserli': {
    ar: 'فسّرلي — فك رموز وتلخيص الوثائق الإدارية | Idaara.tn',
    fr: 'Fasserli — Décryptage de Documents & OCR | Idaara.tn',
    en: 'Fasserli — Document Decoder & OCR | Idaara.tn',
    derja: 'Fasserli — Fasser Awra9ek el Idariya | Idaara.tn',
  },
  '/documents': {
    ar: 'نماذج الوثائق والعقود القانونية (PDF) | Idaara.tn',
    fr: 'Modèles de Documents & Contrats PDF | Idaara.tn',
    en: 'Legal Contracts & Document Templates | Idaara.tn',
    derja: 'Modélet el 39oud wel Awra9 (PDF) | Idaara.tn',
  },
  '/procedures': {
    ar: 'دليل الإجراءات والمعاملات الإدارية | Idaara.tn',
    fr: 'Guide des Démarches Administratives | Idaara.tn',
    en: 'Administrative Procedures Directory | Idaara.tn',
    derja: 'Dalil el Démarches wel Awra9 el Idariya | Idaara.tn',
  },
  '/calculator': {
    ar: 'حاسبة التنابر والرسوم الجبائية الرسمية | Idaara.tn',
    fr: 'Calculateur Officiel de Timbres Fiscaux | Idaara.tn',
    en: 'Official Fiscal Stamp & Duty Calculator | Idaara.tn',
    derja: 'A7seb Timbrik wel Ma3alim el Jibaiya | Idaara.tn',
  },
  '/concours': {
    ar: 'رادار مناظرات الوظيفة العمومية | Idaara.tn',
    fr: 'Portail des Concours de la Fonction Publique | Idaara.tn',
    en: 'Public Sector Competitions & Jobs | Idaara.tn',
    derja: 'Radar Concourat el Wadhifa el 3omoumiya | Idaara.tn',
  },
  '/locator': {
    ar: 'دليل البلديات والمصالح العمومية في تونس | Idaara.tn',
    fr: 'Annuaire des Municipalités & Services Publics | Idaara.tn',
    en: 'Municipalities & Public Offices Directory | Idaara.tn',
    derja: 'Dalil el Baladiyet wel Masale7 el 3omoumiya | Idaara.tn',
  },
  '/launchpad': {
    ar: 'فضاء المبادر الذاتي وحساب الضرائب (1%) | Idaara.tn',
    fr: 'Espace Auto-Entrepreneur & Fiscalité 1% | Idaara.tn',
    en: 'Auto-Entrepreneur & 1% Tax Simulator | Idaara.tn',
    derja: 'Espace Auto-Entrepreneur w Dhariba 1% | Idaara.tn',
  },
  '/portails': {
    ar: 'دليل البوابات الحكومية الرقمية الرسمية | Idaara.tn',
    fr: "Portails Officiels de l'Administration en Ligne | Idaara.tn",
    en: 'Official e-Government Portals Directory | Idaara.tn',
    derja: 'Bawwabet el Idara el Ra9miya | Idaara.tn',
  },
  '/contacts': {
    ar: 'أرقام الطوارئ والوزارات الرسمية في تونس | Idaara.tn',
    fr: "Numéros d'Urgence & Ministères Tunisiens | Idaara.tn",
    en: 'Emergency Numbers & Ministry Contacts | Idaara.tn',
    derja: 'Noumrouwet el 7adra wel Wezarat fi Tounes | Idaara.tn',
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
        const title = getLocalized(procedure.title, locale);
        const costLabel =
          procedure.estimatedTotalCostTND > 0
            ? ` (${procedure.estimatedTotalCostTND} DT)`
            : locale === 'ar'
            ? ' (مجاني)'
            : locale === 'derja'
            ? ' (Bel Mèjjen)'
            : locale === 'en'
            ? ' (Free)'
            : ' (Gratuit)';
        
        const suffix =
          locale === 'ar'
            ? 'دليل الإجراءات | Idaara.tn'
            : locale === 'derja'
            ? 'Dalil el Démarches | Idaara.tn'
            : locale === 'en'
            ? 'Procedures Directory | Idaara.tn'
            : 'Guide des Démarches | Idaara.tn';

        document.title = `${title}${costLabel} — ${suffix}`;
        return;
      }
    }

    // 3. Check for dynamic document route: /documents/[slug]
    if (pathname.startsWith('/documents/')) {
      const slug = pathname.replace('/documents/', '').split('/')[0];
      const template = getTemplateBySlug(slug);
      if (template) {
        const title = getLocalized(template.title, locale);
        const pdfSuffix =
          locale === 'ar'
            ? 'استمارة PDF جاهزة | نماذج إضبارة'
            : locale === 'derja'
            ? 'Modèle PDF 7adher | Awra9 Idaara'
            : locale === 'en'
            ? 'Printable PDF Template | Idaara Documents'
            : 'Modèle PDF Certifié | Documents Idaara';

        document.title = `${title} — ${pdfSuffix}`;
        return;
      }
    }

    // Fallback default localized title
    document.title =
      locale === 'ar'
        ? 'إدارة تونس — دليلك الإداري والجبائي الذكي'
        : locale === 'derja'
        ? 'Idaara.tn — Msa3dek el Idari el Dheki'
        : locale === 'en'
        ? 'Idaara.tn — Smart Civic Copilot'
        : 'Idaara.tn — Copilote Citoyen & Démarches';
  }, [pathname, locale]);

  return null;
}
