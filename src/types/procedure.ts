import { LocalizedString } from '../lib/locale-utils';

export type ProcedureVertical =
  | 'identity'
  | 'transport'
  | 'business'
  | 'housing'
  | 'healthcare'
  | 'customs'
  | 'education'
  | 'justice';

export interface RequiredDocument {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  copiesConformes?: number;
  originalRequired: boolean;
  notes?: string;
}

export interface TimbreCostItem {
  id: string;
  label: LocalizedString;
  amountTND: number;
  quantity: number;
  category: 'timbre_fiscal' | 'legalisation' | 'photo' | 'frais_dossier' | 'autre';
}

export interface StepGuide {
  stepNumber: number;
  title: LocalizedString;
  description: LocalizedString;
  targetOffice: LocalizedString;
  estimatedDuration: string;
  tips?: LocalizedString;
}

export interface Procedure {
  id: string;
  slug: string;
  vertical: ProcedureVertical;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  iconName: string;
  tags: string[];
  estimatedTotalCostTND: number;
  estimatedProcessingTime: LocalizedString;
  urgencyLevel?: 'low' | 'medium' | 'high';
  requiredDocuments: RequiredDocument[];
  costsBreakdown: TimbreCostItem[];
  steps: StepGuide[];
  relatedOfficeTypes: string[];
  templateSlug?: string;
  faq?: Array<{
    q: LocalizedString;
    a: LocalizedString;
  }>;
}
