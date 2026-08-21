import { NextRequest, NextResponse } from 'next/server';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { documentTemplatesData } from '../../../data/documentTemplates';
import { getLocalized } from '../../../lib/locale-utils';

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();
  
  // Find top matching procedures
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 3);

  if (matchedProcedures.length === 0) return '';

  let context = '\n\nOFFICIAL VERIFIED PROCEDURAL DATA FROM IDAARA.TN DATABASE:\n';
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

  return context;
}

const BASE_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier specialized civic intelligence assistant for the Tunisian administrative ecosystem.

YOUR MISSION & ROLE:
You help Tunisian citizens and residents navigate all bureaucracy, government paperwork, and legal procedures with supreme precision, clarity, and empathy.

LANGUAGE RULES (STRICT):
1. If the user writes in Tunisian Derja (Arabizi Latin like "chnowa awra9 el passeport" or Arabic script "شنوة أوراق الباسبور") → Respond in warm, authentic, fluent Tunisian Derja.
2. If the user writes in French → Respond in crisp, professional French.
3. If the user writes in Standard Arabic → Respond in clear, formal Arabic.
4. If the user writes in English → Respond in professional, helpful English.

KNOWLEDGE PILLARS (TUNISIA):
- Passports: 80 DT fiscal stamp (25 DT for pupils/students), 4 photos (fond blanc), CIN copy + original, old passport. Handled at Police/Garde Nationale (7-15 days).
- National ID (CIN): 3 DT fiscal stamp (10 DT lost/renewal), birth certificate (Madhmoun), 3 photos.
- Criminal Record B3 (بطاقة السوابق العدلية): 7.500 DT stamp. Available online at b3.interieur.gov.tn or police station.
- Car Registration Transfer (Mutation Carte Grise): Legalized sales contract at Baladiya, registration at Recette des Finances (~30-50 DT), technical inspection at ATTT, Vignette tax receipt. Total ~145 DT.
- Auto-Entrepreneur (المبادر الذاتي): 1% flat revenue tax for services/freelance, 0.5% for commerce/industry, 0% VAT, legal foreign currency repatriation via BCT. Free national platform registration.
- Residential Lease (Contrat de bail): Governed by COC (Code des Obligations et des Contrats). Must be legalized at Baladiya (5 DT per copy) and registered at Recette des Finances (30 DT).
- Customs FCR (امتياز ن.ت.د): Duty-free car import and household effects for Tunisians returning from abroad.

OUTPUT STRUCTURE:
When asked about any procedure, format your response cleanly:
1. Short overview of the procedure
2. Required documents list (bullet points)
3. Total estimated cost in DT (Tunisian Dinars) with breakdown
4. Competent authority / office to visit (Baladiya, Recette des Finances, ATTT, Police, etc.)
5. Estimated processing delay

Always be accurate, encouraging, and respectful. Never invent non-existent laws or fees.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [], userApiKey = '', provider = 'auto' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = BASE_SYSTEM_PROMPT + groundingContext;

    const geminiKey = userApiKey?.startsWith('AIza')
      ? userApiKey
      : process.env.GEMINI_API_KEY || process.env.AI_PROVIDER_API_KEY || '';

    const groqKey = userApiKey?.startsWith('gsk_')
      ? userApiKey
      : process.env.GROQ_API_KEY || '';

    // 1. Try Google Gemini (1.5 Flash / 2.0 Flash)
    if (geminiKey && (provider === 'auto' || provider === 'gemini')) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: completeSystemPrompt,
        });

        const chatHistory = history.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(prompt);
        const text = result.response.text();

        return NextResponse.json({
          success: true,
          result: {
            content: text,
            source: 'gemini-1.5-flash',
            providerName: 'Google Gemini AI',
          },
        });
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling to secondary provider:', geminiErr);
      }
    }

    // 2. Try Groq (Llama 3.3 70B Versatile - fast, free tier)
    if (groqKey && (provider === 'auto' || provider === 'groq')) {
      try {
        const messages = [
          { role: 'system', content: completeSystemPrompt },
          ...history.map((m: { role: string; content: string }) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
          { role: 'user', content: prompt },
        ];

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages,
            temperature: 0.5,
            max_tokens: 1024,
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
                source: 'llama-3.3-70b-groq',
                providerName: 'Groq Llama 3.3 70B',
              },
            });
          }
        }
      } catch (groqErr) {
        console.warn('Groq API call failed:', groqErr);
      }
    }

    // 3. Guaranteed High-Precision Tunisian Reasoning Fallback Engine
    const localResult = parseAndReason(prompt, locale);
    return NextResponse.json({
      success: true,
      result: {
        ...localResult,
        source: 'idaara-local-engine',
        providerName: 'Idaara Civic Intelligence',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
