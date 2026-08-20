import { LocalizedString } from '../lib/locale-utils';

export interface FormFieldSchema {
  id: string;
  name: string;
  label: LocalizedString;
  placeholder?: LocalizedString;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'radio';
  options?: Array<{ value: string; label: LocalizedString }>;
  required: boolean;
  helpText?: LocalizedString;
  section?: string;
  validationRegex?: string;
}

export interface DocumentTemplate {
  slug: string;
  id: string;
  category: 'contracts' | 'authorizations' | 'declarations' | 'identity' | 'business';
  title: LocalizedString;
  description: LocalizedString;
  officialCode?: string;
  legalBasis: string;
  requiresLegalisation: boolean;
  requiredTimbreTND: number;
  sections: Array<{
    id: string;
    title: LocalizedString;
  }>;
  fields: FormFieldSchema[];
  sampleData?: Record<string, string | number>;
}
