import { describe, it, expect } from 'vitest';
import { parseAndReason } from '../lib/ai-engine';

describe('ai-engine — language detection & Arabic Derja enforcement', () => {
  it('responds in pure Arabic script Derja when prompt is "hi"', () => {
    const result = parseAndReason('hi', 'derja');
    // Must contain Arabic characters
    expect(/[\u0600-\u06FF]/.test(result.content), 'Greeting response should be in Arabic script').toBe(true);
    // Must NOT start with Latin Arabizi like "3aslema!"
    expect(result.content.startsWith('3aslema'), 'Should NOT start with Latin Arabizi').toBe(false);
  });

  it('responds in Arabic script Derja when prompt uses Arabizi "kifech"', () => {
    const result = parseAndReason('kifech nbeddel el carte grise', 'fr');
    expect(/[\u0600-\u06FF]/.test(result.content), 'Derja query should get Arabic script response').toBe(true);
    expect(result.content.toLowerCase()).not.toContain('bech tbeddel');
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

  it('returns B3 procedure data in Arabic script for b3 query', () => {
    const result = parseAndReason('b3 sawabi9', 'derja');
    expect(result.content.length).toBeGreaterThan(50);
    expect(/[\u0600-\u06FF]/.test(result.content)).toBe(true);
    expect(result.content).toContain('7.500');
  });

  it('returns ATTT/carte grise data in Arabic script for karhba query', () => {
    const result = parseAndReason('chrit karhba kifech nbeddel el carte grise', 'derja');
    expect(result.content.length).toBeGreaterThan(50);
    expect(/[\u0600-\u06FF]/.test(result.content)).toBe(true);
    expect(result.content).toContain('145');
  });

  it('returns a timbreBreakdown for passport query', () => {
    const result = parseAndReason('passeport', 'derja');
    expect(result.timbreBreakdown).toBeDefined();
    expect(result.timbreBreakdown!.totalTND).toBeGreaterThan(0);
  });

  it('returns action links with Arabic script labels for Derja queries', () => {
    const result = parseAndReason('hi', 'derja');
    expect(result.actions).toBeDefined();
    expect(result.actions!.length).toBeGreaterThan(0);
    const firstActionDerja = result.actions![0].label.derja;
    expect(/[\u0600-\u06FF]/.test(firstActionDerja), 'Action label for derja should be in Arabic script').toBe(true);
  });
});
