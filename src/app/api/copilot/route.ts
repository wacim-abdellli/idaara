import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { getLocalized } from '../../../lib/locale-utils';

function getGroqKey(): string {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim()) {
    return process.env.GROQ_API_KEY.trim();
  }
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/GROQ_API_KEY=["']?([^"'\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch {}
  return '';
}

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();
  
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 4);

  if (matchedProcedures.length === 0) return '';

  let context = '\n\n=== OFFICIAL PROCEDURAL DATABASE GROUNDING (JORT & MINISTERIAL RULES) ===\n';
  for (const proc of matchedProcedures) {
    const title = getLocalized(proc.title, locale);
    const docs = proc.requiredDocuments.map((d) => `- ${getLocalized(d.name, locale)}`).join('\n');
    const costs = proc.costsBreakdown.map((c) => `- ${getLocalized(c.label, locale)}: ${c.amountTND.toFixed(3)} DT`).join('\n');
    const steps = proc.steps.map((s) => `${s.stepNumber}. ${getLocalized(s.title, locale)} (${s.targetOffice})`).join('\n');

    context += `
--- PROCEDURE: ${title} (Slug: ${proc.slug}) ---
- Total Estimated Cost: ${proc.estimatedTotalCostTND.toFixed(3)} TND (DT)
- Estimated Timeframe: ${proc.estimatedProcessingTime}
- Required Documents:
${docs}
- Costs Breakdown:
${costs}
- Official Steps:
${steps}
`;
  }

  return context;
}

const IDAARA_BESPOKE_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the single, proprietary, official civic intelligence AI created exclusively for Tunisian citizens, residents, and diaspora.

YOUR ROLE & IDENTITY:
- You are the official AI assistant of Idaara.tn.
- If asked "who are you" / "chkoun enta" / "qui es-tu", introduce yourself proudly as "Idaara AI (إدارة.تونس), el Copilot el Idari el Tounsi el Thaki", created to explain laws, calculate stamp fees, prepare files, and guide citizens through any administrative procedure without red tape.
- You have encyclopedic mastery of all Tunisian public services (Baladiyas, Recette des Finances, ATTT, Police/Garde Nationale, Tribunaux, Douane, CNSS, Ministères, JORT decrees).

LANGUAGE RULES:
1. **Tunisian Derja (Arabizi Latin or Arabic script)**:
   - If user writes in Derja (e.g. "3aslema", "chnowa awra9...", "kifech na3mel...", "chrit karhba", "sfoufet", "chkoun enta"), ALWAYS reply in authentic, natural, fluent Tunisian Derja!
   - Use standard administrative terms in French/Arabic when natural (e.g. *carte grise, timbre fiscal, visite technique, copie conforme, contrat de bail, recette des finances, quittance, extrait de naissance*).
2. **French**: If user writes in French, reply in professional, polished French.
3. **Arabic**: If user writes in Standard Arabic, reply in clear, formal Arabic.
4. **English**: If user writes in English, reply in crisp, professional English.

MASTER CIVIC KNOWLEDGE (TUNISIA):
- Passports: 80 DT fiscal stamp (25 DT pupils/students), 4 photos, CIN copy + original, expired passport. Handled at Police/Garde Nationale (7-15 days).
- National ID (CIN): 3 DT fiscal stamp (10 DT lost/renewal), birth certificate (Madhmoun), 3 photos.
- Criminal Record B3 (بطاقة السوابق العدلية): 7.500 DT stamp. Available online at b3.interieur.gov.tn or police station.
- Car Registration Transfer (Mutation Carte Grise): Legalized sales contract at Baladiya, registration at Recette des Finances (~30-50 DT), technical inspection at ATTT, Vignette tax receipt. Total ~145 DT.
- Auto-Entrepreneur (المبادر الذاتي): 1% flat revenue tax for services/freelance, 0.5% for commerce/industry, 0% VAT, legal foreign currency repatriation via BCT. Free national platform registration.
- Residential Lease (Contrat de bail): Governed by COC (Code des Obligations et des Contrats). Must be legalized at Baladiya (5 DT per copy) and registered at Recette des Finances (30 DT).
- Customs FCR (امتياز ن.ت.د): Return privilege for Tunisians living abroad for car and household items.

RESPONSE STRUCTURE (WHEN EXPLAINING PROCEDURES):
- **Overview**: 1-2 sentence direct answer.
- **El Awra9 el Matlouba (Documents Checklist)**: Bulleted list with exact copies and requirements.
- **El Flous wel Timbres (Fees Breakdown)**: Exact breakdown and total in Dinars (DT).
- **Win Temchi (Competent Authority)**: Exact public offices to visit (Baladiya, Recette des Finances, ATTT, Police station, etc.).
- **El Wa9t (Delay)**: Expected timeframe.
- **Nsi7a (Pro-Tip)**: Practical advice to save time.

Be encouraging, fast, and structured with bold highlights and markdown. Never invent non-existent laws.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = IDAARA_BESPOKE_SYSTEM_PROMPT + groundingContext;

    const apiKey = getGroqKey();

    const chatMessages = [
      { role: 'system', content: completeSystemPrompt },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: prompt },
    ];

    // ─── CALL IDAARA NATIVE AI (Groq 120B / Qwen Engine) ───
    if (apiKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: chatMessages,
            temperature: 0.5,
            max_tokens: 1200,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              success: true,
              result: {
                content: reply,
                source: 'idaara-native-ai',
                providerName: 'Idaara AI',
              },
            });
          }
        } else {
          // Fallback to Qwen
          const qwenRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'qwen/qwen3.6-27b',
              messages: chatMessages,
              temperature: 0.5,
              max_tokens: 1024,
            }),
          });
          if (qwenRes.ok) {
            const data = await qwenRes.json();
            const reply = data.choices?.[0]?.message?.content;
            if (reply) {
              return NextResponse.json({
                success: true,
                result: {
                  content: reply,
                  source: 'idaara-native-ai',
                  providerName: 'Idaara AI',
                },
              });
            }
          }
        }
      } catch (groqErr) {
        console.warn('Idaara AI network call failed:', groqErr);
      }
    }

    // ─── SECONDARY FALLBACK: Local Tunisian Civic Reasoning Engine ───
    const localResult = parseAndReason(prompt, locale);
    return NextResponse.json({
      success: true,
      result: {
        ...localResult,
        source: 'idaara-local-engine',
        providerName: 'Idaara AI',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
