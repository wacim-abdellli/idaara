import { concoursData } from '../data/concours';
import { ConcoursItem, ConcoursCategory, EducationLevel } from '../types/concours';
import { getLocalized } from './locale-utils';

/**
 * Filter concours items by category, education level, and search keywords
 */
export function filterConcours(
  items: ConcoursItem[],
  filters: {
    category?: ConcoursCategory;
    educationLevel?: EducationLevel;
    searchQuery?: string;
    locale?: string;
  }
): ConcoursItem[] {
  const { category = 'all', educationLevel = 'all', searchQuery = '', locale = 'fr' } = filters;
  const q = searchQuery.toLowerCase().trim();

  return items.filter((item) => {
    if (category !== 'all' && item.category !== category) return false;
    if (educationLevel !== 'all' && item.educationLevel !== educationLevel) return false;

    if (q) {
      const title = (item.title.fr + ' ' + item.title.ar + ' ' + item.title.derja + ' ' + (item.title.en || '')).toLowerCase();
      const ministry = (item.ministry.fr + ' ' + item.ministry.ar + ' ' + item.ministry.derja + ' ' + (item.ministry.en || '')).toLowerCase();
      const inst = (item.institution.fr + ' ' + item.institution.ar + ' ' + item.institution.derja + ' ' + (item.institution.en || '')).toLowerCase();
      const ref = item.referenceNumber.toLowerCase();

      const matches =
        title.includes(q) ||
        ministry.includes(q) ||
        inst.includes(q) ||
        ref.includes(q) ||
        q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || inst.includes(word) || ministry.includes(word)));

      if (!matches) return false;
    }

    return true;
  });
}

/**
 * Build official Tunisian public employment grounding for copilot
 */
export function buildConcoursGroundingPrompt(query: string, locale: string = 'derja'): string {
  const q = query.toLowerCase();

  const isConcoursQuery =
    q.includes('concour') ||
    q.includes('intidhab') ||
    q.includes('recrutement') ||
    q.includes('munadhara') ||
    q.includes('مناظرة') ||
    q.includes('انتداب') ||
    q.includes('وظيفة عمومية') ||
    q.includes('steg') ||
    q.includes('sonede') ||
    q.includes('capes') ||
    q.includes('poste.tn') ||
    q.includes('concours.gov.tn') ||
    q.includes('khidmat') ||
    q.includes('poste') ||
    q.includes('khdma') ||
    q.includes('bosta') ||
    q.includes('ansi');

  if (!isConcoursQuery) {
    return '';
  }

  const matchingItems = filterConcours(concoursData, { searchQuery: query, locale }).slice(0, 3);
  const itemsToInclude = matchingItems.length > 0 ? matchingItems : concoursData.slice(0, 3);

  let promptContext = `\n=== OFFICIAL TUNISIAN PUBLIC EMPLOYMENT & CONCOURS LEGAL FRAMEWORK ===\n`;
  promptContext += `OFFICIAL STATUS IN TUNISIA:
- Public recruitment competitions in Tunisia are officially opened by Ministerial Decrees published in the JORT (الرائد الرسمي للجمهورية التونسية).
- Registrations are carried out in real time on the National Public Sector Recruitment Portal: www.concours.gov.tn and institutional portals (e.g. edunet.tn for Ministère de l'Éducation, steg.com.tn for STEG, sonede.com.tn for SONEDE).
- When citizens inquire about open competitions, provide the verified statutory requirements, exact diploma levels, scoring methods, and required dossier so they can prepare their physical and electronic files in advance.
- Direct candidates to verify live open calls directly on www.concours.gov.tn.\n\n`;

  for (const c of itemsToInclude) {
    const title = getLocalized(c.title, locale);
    const ministry = getLocalized(c.ministry, locale);
    const docs = c.requiredDocuments.map((d) => `- ${getLocalized(d, locale)}`).join('\n');
    const conditions = c.conditions.map((cond) => `- ${getLocalized(cond, locale)}`).join('\n');

    promptContext += `--- OFFICIAL FRAMEWORK: ${title} (${getLocalized(c.institution, locale)}) ---
- Organisme / Ministère: ${ministry}
- Cadre Juridique: Décrets d'organisation de la fonction publique (JORT)
- Niveau d'Études Requis: ${c.educationLevel.toUpperCase()}
- Portail Officiel de Dépôt: ${c.officialPortalUrl}
- Salaire / Grille Estimée: ${c.estimatedSalaryRangeTND || 'Grille Officielle de la Fonction Publique'}
- Conditions Légales d'Éligibilité:
${conditions}
- Dossier Officiel Requis:
${docs}
\n`;
  }

  return promptContext;
}
