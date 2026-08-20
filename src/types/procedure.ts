export type ProcedureVertical =
  | 'identity'
  | 'transport'
  | 'business'
  | 'housing'
  | 'healthcare'
  | 'customs';

export interface RequiredDocument {
  id: string;
  name: {
    derja: string;
    fr: string;
    ar: string;
  };
  description?: {
    derja: string;
    fr: string;
    ar: string;
  };
  copiesConformes?: number;
  originalRequired: boolean;
  notes?: string;
}

export interface TimbreCostItem {
  id: string;
  label: {
    derja: string;
    fr: string;
    ar: string;
  };
  amountTND: number;
  quantity: number;
  category: 'timbre_fiscal' | 'legalisation' | 'photo' | 'frais_dossier' | 'autre';
}

export interface StepGuide {
  stepNumber: number;
  title: {
    derja: string;
    fr: string;
    ar: string;
  };
  description: {
    derja: string;
    fr: string;
    ar: string;
  };
  targetOffice: string;
  estimatedDuration: string;
  tips?: {
    derja: string;
    fr: string;
    ar: string;
  };
}

export interface Procedure {
  id: string;
  slug: string;
  vertical: ProcedureVertical;
  title: {
    derja: string;
    fr: string;
    ar: string;
  };
  shortDescription: {
    derja: string;
    fr: string;
    ar: string;
  };
  fullDescription: {
    derja: string;
    fr: string;
    ar: string;
  };
  iconName: string;
  tags: string[];
  estimatedTotalCostTND: number;
  estimatedProcessingTime: string;
  urgencyLevel?: 'low' | 'medium' | 'high';
  requiredDocuments: RequiredDocument[];
  costsBreakdown: TimbreCostItem[];
  steps: StepGuide[];
  relatedOfficeTypes: string[];
  templateSlug?: string;
  faq?: Array<{
    q: { derja: string; fr: string; ar: string };
    a: { derja: string; fr: string; ar: string };
  }>;
}
