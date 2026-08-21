import { NextRequest, NextResponse } from 'next/server';
import { parseAndReason } from '../../../lib/ai-engine';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.AI_PROVIDER_API_KEY || '';

const SYSTEM_PROMPT = `You are Idaara AI, the official intelligent assistant for Idaara.tn — the Tunisian civic administrative platform.

You respond naturally to ANY message — greetings, questions, casual conversation — in the SAME language the user wrote in:
- Tunisian Derja (Arabic colloquial) → reply in Derja
- French → reply in French
- Arabic (standard) → reply in Arabic
- English → reply in English

Your expertise is Tunisian administrative procedures:
- Official documents: Passport renewal, National ID (CIN), Carte Grise, B3 criminal record, birth certificates
- Stamp fees (Timbres fiscaux): Recette des Finances, Baladiya, ATTT, Garde Nationale, Police
- Auto-Entrepreneur 1% tax regime, FCR export regime, Patente
- Lease contracts (Contrat de bail), property registration
- Tunisian laws: COC, JORT decrees, Loi de Finances 2024

When a user says hi / hello / bonjour / 3aslema → respond with a warm, short greeting and ask how you can help with their administrative needs.

When asked about a procedure:
1. List required documents concisely
2. State the total estimated cost in TND
3. Name the competent authority (office to go to)
4. Give estimated processing time

Keep responses concise, warm, and practical. Use bullet points for document lists.
Never make up laws or fees — if unsure, say so honestly.
Never respond in a different language than what the user used.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    // If Gemini API key is configured — use real LLM
    if (GEMINI_API_KEY) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: SYSTEM_PROMPT,
        });

        // Build conversation history for multi-turn
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
            source: 'gemini',
          },
        });
      } catch (geminiError) {
        console.error('Gemini error, falling back to local engine:', geminiError);
        // Fall through to local engine
      }
    }

    // Fallback: local keyword-based engine
    const result = parseAndReason(prompt, locale);
    return NextResponse.json({ success: true, result: { ...result, source: 'local' } });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
