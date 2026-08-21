import { NextRequest, NextResponse } from 'next/server';
import { parseAndReason } from '../../../lib/ai-engine';

const SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier civic intelligence assistant for Tunisian administrative procedures, paperwork, and public services.

You respond naturally, warmly, and accurately to ANY user message — from simple greetings (3aslema, bonjour, hi) to complex legal inquiries.

LANGUAGE MATCHING:
- If user speaks/writes in Tunisian Derja (Arabic script or Arabizi/Latin) → Respond in warm, authentic Tunisian Derja.
- If user writes in French → Respond in professional, clear French.
- If user writes in Standard Arabic → Respond in formal, precise Arabic.
- If user writes in English → Respond in crisp, helpful English.

CORE EXPERTISE & TUNISIAN LEGAL KNOWLEDGE:
1. Passports (Passeport tunisien): 80 DT fiscal stamp (25 DT for students/pupils), 4 photos, CIN copy, old passport. Handled at Police/Garde Nationale (7-15 days).
2. National ID (CIN / بطاقة التعريف): 3 DT stamp (10 DT renewal/lost), birth certificate (Madhmoun), 3 photos.
3. Criminal Record Bulletin N°3 (B3 / بطاقة السوابق العدلية): 7.500 DT stamp. Available online at b3.interieur.gov.tn or police station.
4. Car Registration & Sale (Mutation Carte Grise): Sale contract legalized at Baladiya + registered at Recette des Finances (~30-50 DT) + technical inspection (Visite ATTT) + Vignette tax receipt. Total ~145 DT.
5. Auto-Entrepreneur (المبادر الذاتي): 1% flat revenue tax for services, 0.5% for commerce/industry, 0% VAT, legal foreign currency repatriation via BCT. Free national platform registration.
6. Rental Lease (Contrat de bail): Must comply with COC (Code des Obligations et des Contrats), 5 DT municipal stamp per copy at Baladiya, 30 DT registration at Recette des Finances.
7. Customs & FCR (امتياز ن.ت.د): Return privilege for Tunisians abroad, duty discounts, vehicle import criteria.
8. Statutory Fiscal Stamps (Timbres fiscaux): 5 DT (municipality/Baladiya), 15 DT (courts/certificates), 80 DT (passports), 100-300 DT (specialized licenses).

STYLE & FORMATTING:
- Structure answers clearly with bullet points and bold highlights.
- Always include: (1) Required documents list, (2) Total estimated budget in TND/DT, (3) Competent public office, (4) Estimated timeframe.
- If greeting (hi / 3aslema / bonjour), greet back enthusiastically and suggest 3-4 popular topics they can ask about.
- Never invent non-existent laws or unverified costs.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [], userApiKey = '', provider = 'auto' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

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
          systemInstruction: SYSTEM_PROMPT,
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
          { role: 'system', content: SYSTEM_PROMPT },
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
            temperature: 0.6,
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
