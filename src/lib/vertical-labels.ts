import { SupportedLanguage } from '../data/translations';

const verticalLabels: Record<string, Record<SupportedLanguage, string>> = {
  identity: {
    ar: 'الهوية والمواطنة',
    derja: 'Houwiya & Citoyenneté',
    fr: 'Identité & Citoyenneté',
    en: 'Identity & Citizenship',
  },
  transport: {
    ar: 'النقل والسيارات',
    derja: 'Transport w Karahib',
    fr: 'Transport & Véhicules',
    en: 'Transport & Vehicles',
  },
  business: {
    ar: 'الشركات والمشاريع',
    derja: 'Machari3 w Business',
    fr: 'Entreprise & Freelance',
    en: 'Business & Freelance',
  },
  housing: {
    ar: 'السكن والطاقة',
    derja: 'Sken w Énergie',
    fr: 'Logement & Énergie',
    en: 'Housing & Energy',
  },
  healthcare: {
    ar: 'الصحة والضمان الاجتماعي',
    derja: 'Se7a w CNAM/CNSS',
    fr: 'Santé & Sécurité Sociale',
    en: 'Health & Social Security',
  },
  customs: {
    ar: 'الديوانة والتونسيين بالخارج',
    derja: 'Diwana w Tounes fel Kharej',
    fr: 'Douane & Diaspora',
    en: 'Customs & Diaspora',
  },
  education: {
    ar: 'التعليم والمنح الجامعية',
    derja: 'Ta3lim w Boursat',
    fr: 'Enseignement & Bourses',
    en: 'Education & Scholarships',
  },
  justice: {
    ar: 'العدل والأحوال الشخصية',
    derja: '3adl w 7ala Madaniya',
    fr: 'Justice & État Civil',
    en: 'Justice & Civil Status',
  },
};

export function getVerticalLabel(vertical: string, locale: SupportedLanguage): string {
  const entry = verticalLabels[vertical];
  if (!entry) return vertical;
  return entry[locale];
}
