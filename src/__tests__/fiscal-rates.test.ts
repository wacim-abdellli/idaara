import { describe, it, expect } from 'vitest';
import {
  FISCAL_YEAR,
  FISCAL_YEAR_LABEL,
  AUTO_ENTREPRENEUR_RATES,
  SUARL_RATES,
  CIVIC_STAMP_RATES,
} from '../data/fiscal-rates';

describe('fiscal-rates — Tunisian Statutory Constants', () => {
  it('defines valid current fiscal year', () => {
    expect(FISCAL_YEAR).toBeGreaterThanOrEqual(2025);
    expect(FISCAL_YEAR_LABEL).toContain(FISCAL_YEAR.toString());
  });

  it('defines correct Auto-Entrepreneur regime rates per Law 2023-33', () => {
    expect(AUTO_ENTREPRENEUR_RATES.servicesTaxRate).toBe(0.01); // 1%
    expect(AUTO_ENTREPRENEUR_RATES.commerceTaxRate).toBe(0.005); // 0.5%
    expect(AUTO_ENTREPRENEUR_RATES.annualRevenueCeilingTND).toBe(75000); // 75,000 DT ceiling
    expect(AUTO_ENTREPRENEUR_RATES.exportTvaRate).toBe(0); // 0% Article 13 export
    expect(AUTO_ENTREPRENEUR_RATES.annualCnssContributionTND).toBe(200);
  });

  it('defines SUARL statutory parameters', () => {
    expect(SUARL_RATES.corporateTaxRate).toBe(0.15); // 15% IS
    expect(SUARL_RATES.minimumBankCapitalTND).toBe(1000); // 1,000 DT
  });

  it('defines statutory civic stamp rates matching Tunisian Finance Laws', () => {
    expect(CIVIC_STAMP_RATES.cinStandardTND).toBe(3.0);
    expect(CIVIC_STAMP_RATES.cinLostReplacementTND).toBe(25.0);
    expect(CIVIC_STAMP_RATES.passportAdultTND).toBe(80.0);
    expect(CIVIC_STAMP_RATES.passportStudentMinorTND).toBe(25.0);
    expect(CIVIC_STAMP_RATES.bulletin3TotalTND).toBe(7.5);
    expect(CIVIC_STAMP_RATES.generalInvoiceStampTND).toBe(1.0);
    expect(CIVIC_STAMP_RATES.baladiyaSignatureLegalizationTND).toBe(3.0);
    expect(CIVIC_STAMP_RATES.birthCertificateTND).toBe(0.5);
  });
});
