import { Procedure } from './procedure';

export interface ChatMessageAction {
  label: {
    derja: string;
    fr: string;
    ar: string;
  };
  type: 'procedure_link' | 'pdf_form' | 'office_link' | 'calculator_link';
  payload: string; // url or id
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'derja' | 'fr' | 'ar';
  audioUrl?: string;
  relatedProcedure?: Partial<Procedure>;
  actions?: ChatMessageAction[];
  timbreBreakdown?: {
    totalTND: number;
    items: Array<{ label: string; amount: number }>;
  };
}

export interface OCRAnalysisResult {
  id: string;
  documentType: {
    derja: string;
    fr: string;
    ar: string;
  };
  issuingAuthority: {
    derja: string;
    fr: string;
    ar: string;
  };
  referenceNumber?: string;
  dateDetected?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  deadlineDate?: string;
  penaltyRisk: {
    derja: string;
    fr: string;
    ar: string;
  };
  summary: {
    derja: string[];
    fr: string[];
    ar: string[];
  };
  actionItems: Array<{
    task: { derja: string; fr: string; ar: string };
    office: { derja: string; fr: string; ar: string };
    requiredPapers: string[];
    feeTND?: number;
  }>;
  legalContext: {
    derja: string;
    fr: string;
    ar: string;
  };
}
