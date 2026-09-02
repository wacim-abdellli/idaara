import { describe, it, expect } from 'vitest';
import { formatTND, formatNumber, isRTL, slugify } from '../lib/utils';

describe('formatNumber — space-separated thousands formatting', () => {
  it('formats large numbers with spaces for deterministic SSR and hydration stability', () => {
    expect(formatNumber(75000)).toBe('75 000');
    expect(formatNumber(1000)).toBe('1 000');
    expect(formatNumber(1250000)).toBe('1 250 000');
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(0)).toBe('0');
  });
});

describe('formatTND — fee formatting and free cost handling', () => {
  it('formats zero or negative amounts as localized Free strings', () => {
    expect(formatTND(0, 'fr')).toBe('Gratuit');
    expect(formatTND(0, 'ar')).toBe('مجاني');
    expect(formatTND(0, 'derja')).toBe('Bel Mèjjen');
    expect(formatTND(0, 'en')).toBe('Free');
    expect(formatTND(-5, 'fr')).toBe('Gratuit');
  });

  it('formats positive amounts with 3 decimals and correct currency suffixes', () => {
    expect(formatTND(86, 'fr')).toBe('86.000 TND');
    expect(formatTND(86, 'ar')).toBe('86.000 د.ت');
    expect(formatTND(86, 'derja')).toBe('86.000 DT');
    expect(formatTND(7.5, 'derja')).toBe('7.500 DT');
    expect(formatTND(145.25, 'en')).toBe('145.250 TND');
  });
});

describe('isRTL & slugify utilities', () => {
  it('isRTL returns true only for Arabic locale "ar"', () => {
    expect(isRTL('ar')).toBe(true);
    expect(isRTL('derja')).toBe(false);
    expect(isRTL('fr')).toBe(false);
    expect(isRTL('en')).toBe(false);
  });

  it('slugify converts strings to clean kebab-case', () => {
    expect(slugify('Contrat de Location 2026')).toBe('contrat-de-location-2026');
    expect(slugify('Passeport Tunisien & CIN')).toBe('passeport-tunisien-cin');
  });
});
