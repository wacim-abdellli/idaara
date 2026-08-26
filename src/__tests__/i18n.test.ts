import { describe, it, expect } from 'vitest';
import { translations } from '../data/translations';
import type { SupportedLanguage } from '../data/translations';

const LOCALES: SupportedLanguage[] = ['ar', 'fr', 'en', 'derja'];

describe('i18n — 4-locale parity', () => {
  const referenceLocale: SupportedLanguage = 'fr';
  const referenceKeys = Object.keys(translations[referenceLocale]);

  for (const locale of LOCALES) {
    it(`locale "${locale}" has all ${referenceKeys.length} translation keys`, () => {
      const localeKeys = Object.keys(translations[locale]);
      const missing = referenceKeys.filter((k) => !localeKeys.includes(k));

      expect(missing, `Missing keys in "${locale}": ${missing.join(', ')}`).toHaveLength(0);
    });

    it(`locale "${locale}" has no empty string values`, () => {
      const emptyKeys = Object.entries(translations[locale])
        .filter(([, v]) => typeof v === 'string' && v.trim() === '')
        .map(([k]) => k);

      expect(emptyKeys, `Empty values in "${locale}": ${emptyKeys.join(', ')}`).toHaveLength(0);
    });
  }

  it('all locales have the same number of keys', () => {
    const counts = LOCALES.map((l) => ({ locale: l, count: Object.keys(translations[l]).length }));
    const uniqueCounts = new Set(counts.map((c) => c.count));
    expect(
      uniqueCounts.size,
      `Locale key count mismatch: ${JSON.stringify(counts)}`
    ).toBe(1);
  });

  it('appName is consistently "Idaara.tn" across all 4 locales', () => {
    for (const l of LOCALES) {
      expect(translations[l].appName).toBe('Idaara.tn');
    }
  });
});
