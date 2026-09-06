/**
 * Fiscal Rate Consistency Guard
 * Verifies canonical Tunisian statutory values in fiscal-rates.ts.
 * Source of truth: JORT (Official Gazette) and Finance Law.
 */
import { describe, it, expect } from 'vitest';
import {
  CIVIC_STAMP_RATES,
  AUTO_ENTREPRENEUR_RATES,
  SUARL_RATES,
} from '../data/fiscal-rates';

describe('Civic Stamp Rates — Canonical Legal Values', () => {
  it('CIN standard stamp is exactly 3.000 DT', () => {
    expect(CIVIC_STAMP_RATES.cinStandardTND).toBe(3.0);
  });

  it('CIN lost/replacement stamp is exactly 25.000 DT — NOT 10 DT', () => {
    // Guards against the 10 DT regression (audit finding P0-1)
    expect(CIVIC_STAMP_RATES.cinLostReplacementTND).toBe(25.0);
    expect(CIVIC_STAMP_RATES.cinLostReplacementTND).not.toBe(10);
  });

  it('Passport adult stamp is exactly 80.000 DT', () => {
    expect(CIVIC_STAMP_RATES.passportAdultTND).toBe(80.0);
  });

  it('Passport student/minor stamp is exactly 25.000 DT', () => {
    expect(CIVIC_STAMP_RATES.passportStudentMinorTND).toBe(25.0);
  });

  it('Bulletin B3 total cost is exactly 7.500 DT', () => {
    expect(CIVIC_STAMP_RATES.bulletin3TotalTND).toBe(7.5);
  });

  it('Bulletin B3 fiscal stamp is exactly 3.000 DT', () => {
    expect(CIVIC_STAMP_RATES.bulletin3FiscalStampTND).toBe(3.0);
  });

  it('Bulletin B3 postage is exactly 4.500 DT', () => {
    expect(CIVIC_STAMP_RATES.bulletin3PostageTND).toBe(4.5);
  });

  it('Bulletin B3 total equals fiscal stamp + postage', () => {
    expect(CIVIC_STAMP_RATES.bulletin3TotalTND).toBe(
      CIVIC_STAMP_RATES.bulletin3FiscalStampTND + CIVIC_STAMP_RATES.bulletin3PostageTND
    );
  });

  it('General invoice stamp (Timbre Facture) is exactly 1.000 DT', () => {
    expect(CIVIC_STAMP_RATES.generalInvoiceStampTND).toBe(1.0);
  });

  it('Baladiya signature légalisation is exactly 3.000 DT', () => {
    expect(CIVIC_STAMP_RATES.baladiyaSignatureLegalizationTND).toBe(3.0);
  });
});

describe('Auto-Entrepreneur Rates — Canonical Legal Values', () => {
  it('Services/IT tax rate is exactly 1% (0.01)', () => {
    expect(AUTO_ENTREPRENEUR_RATES.servicesTaxRate).toBe(0.01);
  });

  it('Commerce/crafts tax rate is exactly 0.5% (0.005)', () => {
    expect(AUTO_ENTREPRENEUR_RATES.commerceTaxRate).toBe(0.005);
  });

  it('Annual revenue ceiling is exactly 75,000 DT', () => {
    expect(AUTO_ENTREPRENEUR_RATES.annualRevenueCeilingTND).toBe(75_000);
  });

  it('Export TVA rate is 0% (exempt under Art. 13)', () => {
    expect(AUTO_ENTREPRENEUR_RATES.exportTvaRate).toBe(0.0);
  });
});

describe('SUARL Rates', () => {
  it('Corporate tax rate (IS) is exactly 15% (0.15)', () => {
    expect(SUARL_RATES.corporateTaxRate).toBe(0.15);
  });

  it('Minimum bank capital is exactly 1,000 DT', () => {
    expect(SUARL_RATES.minimumBankCapitalTND).toBe(1_000);
  });
});
