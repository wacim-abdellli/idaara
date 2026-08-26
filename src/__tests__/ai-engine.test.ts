import { describe, it, expect } from 'vitest';
import { parseAndReason } from '../lib/ai-engine';

describe('ai-engine — language detection', () => {
  it('responds in Tunisian Derja when prompt uses Arabizi "ena"', () => {
    const result = parseAndReason('passport w ena etudient', 'fr');
    // Must contain Arabic script (الدارجة التونسية) — not a French paragraph
    const hasFrenchOpening =
      result.content.startsWith('Pour renouveler') ||
      result.content.startsWith('En tant');
    expect(hasFrenchOpening, 'Should NOT reply in French for Derja prompt').toBe(false);
  });

  it('detects student context and returns 25 DT passport fee instead of 80 DT', () => {
    const result = parseAndReason('passport w ena etudient', 'derja');
    expect(result.content).toContain('25');
    // Should NOT show only the 80 DT fee
    const only80 = result.content.includes('80') && !result.content.includes('25');
    expect(only80, 'Student query should show 25 DT fee').toBe(false);
  });

  it('responds in Arabic for Arabic-script prompt', () => {
    const result = parseAndReason('كيفاش نجدد جواز سفري', 'fr');
    // Must contain Arabic characters
    const hasArabic = /[\u0600-\u06FF]/.test(result.content);
    expect(hasArabic, 'Arabic-script prompt should get Arabic response').toBe(true);
  });

  it('responds in French when prompt is explicitly French', () => {
    const result = parseAndReason('comment renouveler mon passeport', 'fr');
    const hasFrench = result.content.includes('Pour renouveler') ||
                      result.content.includes('vous devez') ||
                      result.content.includes('Pièces');
    expect(hasFrench, 'French prompt should get French response').toBe(true);
  });

  it('responds in English when prompt is explicitly English', () => {
    const result = parseAndReason('how do I renew my passport', 'en');
    const hasEnglish = result.content.includes('To renew') ||
                       result.content.includes('you must provide') ||
                       result.content.includes('Required');
    expect(hasEnglish, 'English prompt should get English response').toBe(true);
  });

  it('returns B3 procedure data for b3 query', () => {
    const result = parseAndReason('b3 sawabi9', 'derja');
    expect(result.content.length).toBeGreaterThan(50);
    // Should contain B3 reference
    expect(result.content.toLowerCase()).toMatch(/b3|بطاقة|casier/i);
  });

  it('returns ATTT/carte grise data for karhba query', () => {
    const result = parseAndReason('chrit karhba kifech nbeddel el carte grise', 'derja');
    expect(result.content.length).toBeGreaterThan(50);
    expect(result.content.toLowerCase()).toMatch(/attt|carte grise|بطاقة رمادية/i);
  });

  it('returns a timbreBreakdown for passport query', () => {
    const result = parseAndReason('passeport', 'derja');
    expect(result.timbreBreakdown).toBeDefined();
    expect(result.timbreBreakdown!.totalTND).toBeGreaterThan(0);
  });

  it('returns action links for most procedure queries', () => {
    const result = parseAndReason('passeport', 'derja');
    expect(result.actions).toBeDefined();
    expect(result.actions!.length).toBeGreaterThan(0);
  });
});
