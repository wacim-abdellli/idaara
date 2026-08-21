import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { queryCivicKnowledge } from '../../../lib/tunisian-civic-knowledge';
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

function detectScriptAndLanguage(prompt: string, locale: string): string {
  const arabicRegex = /[\u0600-\u06FF]/;
  const isArabicScript = arabicRegex.test(prompt);

  if (isArabicScript) {
    return 'USER_SCRIPT: ARABIC_SCRIPT_DERJA. You MUST respond 100% in pure Arabic script Tunisian Derja! Do NOT use Latin characters.';
  }

  const pLower = prompt.toLowerCase();
  const frenchKeywords = ['comment', 'renouveler', 'obtenir', 'passeport', 'pourquoi', 'combien', 'quelles', 'quels', 'documents', 'frais', 'bonjour', 'mutation'];
  const hasDerjaWords = ['3aslema', 'chnowa', 'kifech', 'n7eb', 'n5arej', 'karhba', 'awra9', 'bita9at', 'ta3rif', 'b3', 'sfoufet', 'chkoun', 'chkounnek', 'ahla'].some((w) => pLower.includes(w));

  if (locale === 'fr' && !hasDerjaWords && frenchKeywords.some((w) => pLower.includes(w))) {
    return 'USER_SCRIPT: FRENCH. You MUST respond 100% in clean, professional French.';
  }

  if (locale === 'en' && !hasDerjaWords && !pLower.includes('3aslema')) {
    return 'USER_SCRIPT: ENGLISH. You MUST respond 100% in clean, helpful English.';
  }

  return 'USER_SCRIPT: LATIN_ARABIZI_DERJA. The user wrote in Latin Arabizi (e.g. n7eb, 3aslema, chnowa, kifech, bita9et ta3rif). You MUST respond 100% in authentic Latin Arabizi Derja! Do NOT write in Arabic script! Use Arabizi formatting (e.g. "Bech t5arrej Bita9at Ta3rif (CIN) fi Tounes, lezmek...").';
}

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();
  
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 3);

  let context = queryCivicKnowledge(query, locale);

  if (matchedProcedures.length > 0) {
    context += '\n\n=== VERIFIED STATUTORY SPECS ===\n';
    for (const proc of matchedProcedures) {
      const title = getLocalized(proc.title, locale);
      const docs = proc.requiredDocuments.map((d) => `- ${getLocalized(d.name, locale)}`).join('\n');
      const costs = proc.costsBreakdown.map((c) => `- ${getLocalized(c.label, locale)}: ${c.amountTND.toFixed(3)} DT`).join('\n');
      const steps = proc.steps.map((s) => `${s.stepNumber}. ${getLocalized(s.title, locale)} (${s.targetOffice})`).join('\n');

      context += `
--- PROCEDURE: ${title} ---
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
  }

  return context;
}

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier Tunisian administrative and legal AI copilot.

RESPONSE STRUCTURE (MAKE IT SUPER EASY AND CLEAR):
Whenever explaining a procedure, always structure your response with these clear sections:
1. **Direct Answer (Khousla)**: 1-2 sentence direct summary of what the user needs.
2. **Awra9 el Matlouba (Required Documents)**: Clean bulleted list with exact documents, copies, and conditions.
3. **Masrouf & Timbres (Fees in DT)**: Bullet points or table with exact costs in Tunisian Dinars (DT) and total.
4. **Win Temchi (Competent Authority)**: Exact public office to visit (Police station, Baladiya, Recette des Finances, ATTT, etc.).
5. **El Wa9t (Delay)**: Expected delay.
6. **Nsi7a men Idaara (Pro-Tip)**: Practical tip to avoid long queues or save money.

SCRIPT & SCRIPT INTEGRITY (STRICT):
- NEVER MIX Arabic script and Latin letters inside the same sentence. It breaks bidirectional text formatting.
- If user writes in Latin Arabizi (e.g. 'n7eb n5arej bita9et ta3rif', 'ahla', '3aslema', 'chnowa', 'kifech'):
  → Respond 100% in pure Latin Arabizi Derja!
- If user writes in Arabic script:
  → Respond 100% in pure Arabic script Derja!

CORE TUNISIAN CIVIC KNOWLEDGE (OFFICIAL JORT):
- **Passports**: 80 DT fiscal stamp (25 DT for students/pupils), 4 photos fond blanc, CIN copy + original, expired passport. Handled at Police/Garde Nationale (7-15 days).
- **National ID (CIN)**: 3 DT fiscal stamp (10 DT lost/renewal), birth certificate (Madhmoun wilada < 3 months), 3 photos fond blanc. Handled at Police/Garde Nationale (10-15 days).
- **Criminal Record B3 (Bulletin N°3)**: 7.500 DT stamp. Available online at b3.interieur.gov.tn or police station.
- **Car Registration Transfer (Mutation Carte Grise)**: Legalized sales contract at Baladiya (5 DT per signature), tax registration at Recette des Finances (~30-50 DT), technical inspection at ATTT (Visite technique), road tax (Vignette) paid. Total ~145 DT at ATTT.
- **Auto-Entrepreneur (المبادر الذاتي)**: 1% flat revenue tax for services/freelance (0.5% for commerce/industry), 0% VAT, legal foreign currency repatriation via BCT. Free national platform registration.
- **Residential Lease (Contrat de bail)**: Governed by COC (Code des Obligations et des Contrats). Must be legalized at Baladiya (5 DT fiscal stamp per copy) and registered at Recette des Finances (30 DT).
- **Customs FCR (امتياز ن.ت.د)**: Duty-free car import and household effects for Tunisians living abroad.
- **Civil Status (Madhmoun)**: 1 DT at Baladiya or online via madhmoun.tn.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const scriptDirective = detectScriptAndLanguage(prompt, locale);
    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = `${IDAARA_MASTER_SYSTEM_PROMPT}\n\n${scriptDirective}\n\n${groundingContext}`;

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
            temperature: 0.3,
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
          // Fallback to Qwen on Groq
          const qwenRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'qwen/qwen3.6-27b',
              messages: chatMessages,
              temperature: 0.3,
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
