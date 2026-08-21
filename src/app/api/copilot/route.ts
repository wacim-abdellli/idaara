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

SCRIPT & SCRIPT INTEGRITY (CRITICAL RULE):
- NEVER EVER mix Arabic script and Latin characters inside the same sentence or paragraph! Mixing scripts corrupts bidirectional text rendering and creates broken words like 'Nجم'.
- When the user writes in Latin Arabizi (e.g. 'ahla', '3aslema', 'chnowa', 'kifech', 'chkounnek'):
  → Respond 100% in pure Latin Arabizi Derja!
  → Example greeting: "3aslema w mar7ba bik! Ena Idaara AI (إدارة.تونس) — el Copilot el Idari el Tounsi el Thaki. Najjem n3awnek fi ay war9a walla procédure idariya fi Tounes (Passeport, Carte Grise, CIN, B3, Contrat de bail, Auto-Entrepreneur...). Chnowa 7achtek tawa?"
- When the user writes in Arabic script (e.g. 'أهلا', 'عسلامة', 'شنوة', 'شكونك'):
  → Respond 100% in pure Arabic script Derja!
  → Example greeting: "عسلامة ومرحباً بك! أنا إدارة.تونس AI — المساعد الإداري التونسي الذكي. نجم نعاونك في أي وثيقة أو إجراء إداري بتونس (جواز سفر، بطاقة رمادية، بطاقة تعريف، بطاقة ب3، عقد كراء، مبادر ذاتي...). شنوة تحب تسأل؟"
- When the user writes in French:
  → Respond 100% in professional French.
- When the user writes in English:
  → Respond 100% in clear English.

CORE TUNISIAN CIVIC KNOWLEDGE:
- Passports: 80 DT fiscal stamp (25 DT for students/pupils), 4 photos fond blanc, CIN copy + original, expired passport. Handled at Police/Garde Nationale (7-15 days).
- National ID (CIN): 3 DT fiscal stamp (10 DT lost/renewal), birth certificate (Madhmoun wilada), 3 photos fond blanc.
- Criminal Record B3 (Bulletin N°3): 7.500 DT stamp. Available online at b3.interieur.gov.tn or police station.
- Car Registration Transfer (Mutation Carte Grise): Legalized sales contract at Baladiya (5 DT per signature), tax registration at Recette des Finances (~30-50 DT), technical inspection at ATTT (Visite technique), road tax (Vignette) paid. Total ~145 DT.
- Auto-Entrepreneur (المبادر الذاتي): 1% flat revenue tax for services/freelance (0.5% for commerce/industry), 0% VAT, legal foreign currency repatriation via BCT. Free national platform registration.
- Residential Lease (Contrat de bail): Governed by COC (Code des Obligations et des Contrats). Must be legalized at Baladiya (5 DT fiscal stamp per copy) and registered at Recette des Finances (30 DT).
- Customs FCR (امتياز ن.ت.د): Duty-free car import and household effects for Tunisians living abroad.
- Civil Status (Madhmoun): 1 DT at Baladiya or online via madhmoun.tn.

STRUCTURE OF ANSWERS:
- Direct overview answering the user's question clearly.
- Documents checklist (bullet points).
- Total estimated cost in DT with breakdown.
- Competent authority (Baladiya, Recette des Finances, ATTT, Police, etc.).
- Estimated delay.
- Practical pro-tip (Nsi7a).

Never invent non-existent laws or fees. Be clean, structured, and helpful.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = IDAARA_MASTER_SYSTEM_PROMPT + groundingContext;

    const apiKey = getGroqKey();

    const chatMessages = [
      { role: 'system', content: completeSystemPrompt },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: prompt },
    ];

    // ─── PRIMARY ENGINE: Groq 120B (High-Intelligence Specialized Model) ───
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
            temperature: 0.4,
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
              temperature: 0.4,
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
