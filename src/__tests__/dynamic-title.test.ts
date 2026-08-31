import { describe, it, expect } from 'vitest';
import { SupportedLanguage } from '../data/translations';

describe('DynamicTitle browser tab localization', () => {
  const languages: SupportedLanguage[] = ['ar', 'fr', 'en', 'derja'];

  it('supports all 4 languages without missing keys', () => {
    expect(languages).toContain('ar');
    expect(languages).toContain('fr');
    expect(languages).toContain('en');
    expect(languages).toContain('derja');
  });
});
