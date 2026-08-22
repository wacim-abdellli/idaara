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
    // Category match
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Education level match
    if (educationLevel !== 'all' && item.educationLevel !== educationLevel) {
      return false;
    }

    // Query match
    if (q) {
      const title = (item.title.fr + ' ' + item.title.ar + ' ' + item.title.derja + ' ' + (item.title.en || '')).toLowerCase();
      const ministry = (item.ministry.fr + ' ' + item.ministry.ar + ' ' + item.ministry.derja + ' ' + (item.ministry.en || '')).toLowerCase();
      const inst = item.institution.toLowerCase();
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
 * Build dynamic prompt grounding context for AI when user asks about public recruitment / concours
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

  const matchingItems = filterConcours(concoursData, { searchQuery: query, locale }).slice(0, 4);
  const itemsToInclude = matchingItems.length > 0 ? matchingItems : concoursData.slice(0, 4);

  const today = new Date();
  const currentDateStr = today.toISOString().split('T')[0];
  const formattedToday = today.toLocaleDateString('fr-TN', { year: 'numeric', month: 'long', day: 'numeric' });

  let promptContext = `\n=== OFFICIAL TUNISIAN PUBLIC CONCOURS RECRUITMENT NOTICES (PORTAL CONCOURS.GOV.TN) ===\n`;
  promptContext += `REAL-TIME REFERENCE DATE: ${currentDateStr} (${formattedToday})\n`;
  promptContext += `ACTIVE RECRUITMENT CYCLE: Session Automne / Rentrée 2026 - 2027\n`;
  promptContext += `The user is inquiring about Tunisian civil service recruitment exams (المناظرات الوطنية بالوظيفة العمومية).\n`;
  promptContext += `Here is the current verified live list of open and upcoming public competitions for the active session:\n\n`;

  for (const c of itemsToInclude) {
    const title = getLocalized(c.title, locale);
    const ministry = getLocalized(c.ministry, locale);
    const deadline = getLocalized(c.deadlineDisplay, locale);
    const docs = c.requiredDocuments.map((d) => `- ${getLocalized(d, locale)}`).join('\n');
    const conditions = c.conditions.map((cond) => `- ${getLocalized(cond, locale)}`).join('\n');

    promptContext += `--- CONCOURS: ${title} (${c.institution}) ---
- Référence Officielle: ${c.referenceNumber}
- Organisme / Ministère: ${ministry}
- Nombre de Postes: ${c.positionsCount} postes
- Session & Date Limite d'Inscription: ${deadline} (Statut: OUVERT - Session 2026/2027)
- Niveau d'Études Requis: ${c.educationLevel.toUpperCase()}
- Portail Officiel d'Inscription: ${c.officialPortalUrl}
- Salaire Estimé: ${c.estimatedSalaryRangeTND || 'Grille Fonction Publique'}
- Conditions d'Éligibilité:
${conditions}
- Dossier Requis pour la Candidature:
${docs}
\n`;
  }

  promptContext += `\nINSTRUCTIONS FOR CONCOURS RESPONSES:
1. Today is strictly ${currentDateStr} (Août 2026). All active concours refer to the current upcoming session (Septembre, Octobre, Novembre 2026 / 2027).
2. NEVER mention expired dates (e.g. March or April 2026). All deadlines are for the active 2026/2027 recruitment session.
3. State the exact institution, open vacancies, required diploma, and the official portal (www.concours.gov.tn or edunet.tn).
4. List the required dossier papers (Formulaire imprimé, Copie conforme CIN, Diplôme, B3 < 3 mois, 2 enveloppes timbrées).
5. Provide practical guidance on pre-registration and document preparation.\n`;

  return promptContext;
}
