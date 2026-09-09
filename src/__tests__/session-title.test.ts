import { describe, it, expect } from 'vitest';
import { summarizePromptToTitle } from '../lib/session-title';

describe('Smart Session Title Summarizer', () => {
  describe('Greetings and Identity Prompts', () => {
    it('summarizes "chkiunek" to "Présentation Idaara AI" in derja/fr', () => {
      expect(summarizePromptToTitle('chkiunek', 'derja')).toBe('Présentation Idaara AI');
      expect(summarizePromptToTitle('chkiunek', 'fr')).toBe('Présentation Idaara AI');
    });

    it('summarizes "chkoun enti" and variations', () => {
      expect(summarizePromptToTitle('chkoun enti', 'derja')).toBe('Présentation Idaara AI');
      expect(summarizePromptToTitle('chkounek', 'derja')).toBe('Présentation Idaara AI');
      expect(summarizePromptToTitle('chkoun entouma', 'derja')).toBe('Présentation Idaara AI');
    });

    it('summarizes English identity prompts to "About Idaara AI"', () => {
      expect(summarizePromptToTitle('who are you?', 'en')).toBe('About Idaara AI');
      expect(summarizePromptToTitle('who made you', 'en')).toBe('About Idaara AI');
    });

    it('summarizes Arabic identity prompts to "التعريف بمنصة إدارة"', () => {
      expect(summarizePromptToTitle('من أنت', 'ar')).toBe('التعريف بمنصة إدارة');
      expect(summarizePromptToTitle('من انت وما هي إدارتي؟', 'ar')).toBe('التعريف بمنصة إدارة');
    });

    it('summarizes simple conversational greetings to presentation', () => {
      expect(summarizePromptToTitle('3aslema', 'derja')).toBe('Présentation Idaara AI');
      expect(summarizePromptToTitle('bonjour', 'fr')).toBe('Présentation Idaara AI');
      expect(summarizePromptToTitle('hello!', 'en')).toBe('About Idaara AI');
      expect(summarizePromptToTitle('مرحبا', 'ar')).toBe('التعريف بمنصة إدارة');
    });
  });

  describe('Civic Procedure Prompts', () => {
    it('summarizes passport renewal questions', () => {
      expect(summarizePromptToTitle('chnuwa lezemni bech nbadal el passeport mte3i?', 'derja')).toBe('Passeport Tunisien');
      expect(summarizePromptToTitle('كيفاش نجدد جواز السفر التونسي؟', 'ar')).toBe('جواز السفر التونسي');
      expect(summarizePromptToTitle('how do I renew my passport?', 'en')).toBe('Tunisian Passport');
    });

    it('summarizes national identity card (CIN) questions', () => {
      expect(summarizePromptToTitle('kifech n5arej cin jdida', 'derja')).toBe("Carte d'Identité (CIN)");
      expect(summarizePromptToTitle('أوراق بطاقة التعريف الوطنية', 'ar')).toBe('بطاقة التعريف الوطنية (CIN)');
    });

    it('summarizes criminal record (B3) questions', () => {
      expect(summarizePromptToTitle('awra9 el B3 bita9at sawabi9 3adliya', 'derja')).toBe('Bulletin N°3 (B3)');
      expect(summarizePromptToTitle('استخراج بطاقة السوابق العدلية ب3', 'ar')).toBe('بطاقة السوابق العدلية (ب3)');
    });

    it('summarizes vehicle registration (carte grise / ATTT) questions', () => {
      expect(summarizePromptToTitle('chrit karhba jdid kifech nbeddel el carte grise', 'derja')).toBe('Mutation Carte Grise');
      expect(summarizePromptToTitle('إجراءات نقل ملكية سيارة والبطاقة الرمادية', 'ar')).toBe('البطاقة الرمادية للسيارات');
    });

    it('summarizes auto-entrepreneur 1% questions', () => {
      expect(summarizePromptToTitle('kifech n9ayed fi statut auto-entrepreneur 1%', 'derja')).toBe('Statut Auto-Entrepreneur');
      expect(summarizePromptToTitle('التسجيل في نظام المبادر الذاتي 1%', 'ar')).toBe('نظام المبادر الذاتي (1%)');
    });

    it('summarizes lease agreement (contrat de bail) questions', () => {
      expect(summarizePromptToTitle('a3melli contrat kre sakani mrigel lel baladiya', 'derja')).toBe('Contrat de Bail & Location');
      expect(summarizePromptToTitle('عقد كراء منزل ومصادقة البلدية', 'ar')).toBe('عقد كراء سكني وتصديق');
    });

    it('summarizes utility questions (STEG & SONEDE)', () => {
      expect(summarizePromptToTitle('kifech n5alles facture steg online', 'derja')).toBe('Factures STEG & SONEDE');
      expect(summarizePromptToTitle('فاتورة الصوناد والكهرباء', 'ar')).toBe('خدمات وفواتير الستاغ والصوناد');
    });
  });

  describe('Conversational Fluff Stripping & Edge Cases', () => {
    it('handles empty or whitespace strings with a dignified fallback', () => {
      expect(summarizePromptToTitle('', 'derja')).toBe('Consultation Idaria');
      expect(summarizePromptToTitle('   ', 'ar')).toBe('استشارة إدارية');
      expect(summarizePromptToTitle('   ', 'en')).toBe('Civic Consultation');
      expect(summarizePromptToTitle('   ', 'fr')).toBe('Démarche Citoyenne');
    });

    it('strips French filler phrases and capitalizes topics', () => {
      const title = summarizePromptToTitle('comment faire pour obtenir une attestation fiscale');
      expect(title).toBe('Obtenir Une Attestation Fiscale');
    });

    it('caps long topic titles at 32 characters gracefully', () => {
      const longPrompt = 'demande urgente pour la restitution de garantie et remboursement suite a un litige';
      const title = summarizePromptToTitle(longPrompt);
      expect(title.length).toBeLessThanOrEqual(35);
    });
  });
});
