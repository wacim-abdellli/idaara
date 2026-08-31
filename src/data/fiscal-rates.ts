/**
 * Tunisian Statutory Fiscal & Social Rates Database
 * Verified according to the Official Gazette of the Republic of Tunisia (JORT) & Finance Law.
 */

export const FISCAL_YEAR = 2026;
export const FISCAL_YEAR_LABEL = 'Loi de Finances 2026 (JORT)';

export interface AutoEntrepreneurRates {
  servicesTaxRate: number; // 1% for services & tech
  commerceTaxRate: number; // 0.5% for trade/crafts
  annualRevenueCeilingTND: number; // 75,000 DT ceiling
  quarterlyCnssContributionTND: number; // ~50 DT / quarter
  annualCnssContributionTND: number; // ~200 DT / year
  exportTvaRate: number; // 0% (Article 13 export exemption)
}

export interface SuarlRates {
  corporateTaxRate: number; // 15% IS
  minimumBankCapitalTND: number; // 1,000 DT
}

export const AUTO_ENTREPRENEUR_RATES: AutoEntrepreneurRates = {
  servicesTaxRate: 0.01,
  commerceTaxRate: 0.005,
  annualRevenueCeilingTND: 75_000,
  quarterlyCnssContributionTND: 50,
  annualCnssContributionTND: 200,
  exportTvaRate: 0.0,
};

export const SUARL_RATES: SuarlRates = {
  corporateTaxRate: 0.15,
  minimumBankCapitalTND: 1_000,
};
