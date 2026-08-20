export interface FormFieldSchema {
  id: string;
  name: string;
  label: {
    derja: string;
    fr: string;
    ar: string;
  };
  placeholder?: {
    derja: string;
    fr: string;
    ar: string;
  };
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'radio';
  options?: Array<{ value: string; label: { derja: string; fr: string; ar: string } }>;
  required: boolean;
  helpText?: {
    derja: string;
    fr: string;
    ar: string;
  };
  section?: string;
  validationRegex?: string;
}

export interface DocumentTemplate {
  slug: string;
  id: string;
  category: 'contracts' | 'authorizations' | 'declarations' | 'identity' | 'business';
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
  officialCode?: string;
  legalBasis: string;
  requiresLegalisation: boolean;
  requiredTimbreTND: number;
  sections: Array<{
    id: string;
    title: { derja: string; fr: string; ar: string };
  }>;
  fields: FormFieldSchema[];
  sampleData?: Record<string, string | number>;
}
