import { Procedure } from './procedure';
import { LocalizedString, LocalizedStringArray } from '../lib/locale-utils';

export interface ChatMessageAction {
  label: LocalizedString;
  type: 'procedure_link' | 'pdf_form' | 'office_link' | 'calculator_link';
  payload: string; // url or id
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: string;
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
  documentType: LocalizedString;
  issuingAuthority: LocalizedString;
  referenceNumber?: string;
  dateDetected?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  deadlineDate?: string;
  penaltyRisk: LocalizedString;
  summary: LocalizedStringArray;
  actionItems: Array<{
    task: LocalizedString;
    office: LocalizedString;
    requiredPapers: string[];
    feeTND?: number;
  }>;
  legalContext: LocalizedString;
}
