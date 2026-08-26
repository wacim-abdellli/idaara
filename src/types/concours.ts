import { LocalizedString } from '../lib/locale-utils';

export type ConcoursCategory =
  | 'all'
  | 'education'
  | 'energy_industry'
  | 'health'
  | 'finance'
  | 'tech_telecom'
  | 'interior_security'
  | 'transport_postal';

export type EducationLevel =
  | 'all'
  | 'doctorat'
  | 'ingenieur'
  | 'master'
  | 'licence'
  | 'technicien'
  | 'bac'
  | 'sans_diplome';

export type ConcoursStatus = 'open' | 'closing_soon' | 'upcoming' | 'evaluating';

export interface ConcoursItem {
  id: string;
  title: LocalizedString;
  ministry: LocalizedString;
  institution: LocalizedString; // e.g. "STEG", "SONEDE", "Ministère de l'Éducation"
  category: ConcoursCategory;
  educationLevel: EducationLevel;
  positionsCount: number;
  deadlineDate: string; // YYYY-MM-DD
  deadlineDisplay: LocalizedString;
  status: ConcoursStatus;
  officialPortalUrl: string;
  referenceNumber: string;
  requiredDocuments: LocalizedString[];
  examStages: LocalizedString[];
  conditions: LocalizedString[];
  estimatedSalaryRangeTND?: string;
}
