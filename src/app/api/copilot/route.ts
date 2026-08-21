import { NextRequest, NextResponse } from 'next/server';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { documentTemplatesData } from '../../../data/documentTemplates';
import { getLocalized } from '../../../lib/locale-utils';

const PRIMARY_GROQ_KEY = process.env.GROQ_API_KEY || '';

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();
  
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 4);

  if (matchedProcedures.length === 0) return '';

  let context = '\n\n=== OFFICIAL DATABASE GROUNDING (JORT & MINISTERIAL DATA) ===\n';
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

const IDAARA_SPECIALIZED_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the specialized native civic AI created exclusively for Tunisian citizens, residents, and diaspora.

YOUR ROLE & IDENTITY:
- You are an expert Tunisian legal and administrative copilot. You know every administrative procedure, law, required paper, fiscal stamp (timbre fiscal), tax rate, and municipal process in Tunisia inside out.
- You speak directly to the citizen with warmth, clarity, empathy, and absolute accuracy.
- You make bureaucracy effortless and stress-free.

LANGUAGE RULES (CRITICAL):
1. **Tunisian Derja (Arabizi Latin or Arabic script)**:
   - If the user greets or asks in Derja (e.g. "3aslema", "chnowa lezemni...", "kifech nbeddel carte grise", "awra9 el passeport", "chrit karhba", "sfoufet"), ALWAYS reply in authentic, natural, fluent Tunisian Derja!
   - Use standard administrative terms in French/Arabic when natural (e.g. *carte grise, timbre fiscal, visite technique, copie conforme, contrat de bail, recette des finances, quittance, extrait de naissance*).
2. **French**: If user writes in French, reply in professional, polished French.
3. **Arabic**: If user writes in Standard Arabic, reply in formal, clear Arabic.
4. **English**: If user writes in English, reply in crisp, professional English.

MASTER CIVIC KNOWLEDGE (TUNISIA):
1. **Passports (Passeport tunisien)**:
   - Ordinary stamp: 80 DT. Pupils/students/children under 7: 25 DT.
   - 4 photos fond blanc, CIN copy + original, expired passport, certificate of enrollment if student.
   - Handled at Police/Garde Nationale (7 to 15 days).
2. **National ID (CIN / بطاقة التعريف)**:
   - Ordinary fee: 3 DT stamp. Renewal/Lost: 10 DT.
   - Extrait de naissance (Madhmoun), 3 photos, certificate of residence/work if changed.
3. **Criminal Record (Bulletin N°3 / بطاقة السوابق العدلية)**:
   - Fiscal stamp: 7.500 DT.
   - Available online at b3.interieur.gov.tn or local police station (3 to 8 days).
4. **Car Registration Transfer (Mutation Carte Grise)**:
   - Legalized sales contract at Baladiya (5 DT stamp per signature).
   - Tax registration at Recette des Finances (~30-50 DT depending on fiscal horsepower CV).
   - Technical inspection certificate from ATTT (Visite technique).
   - Road tax receipt (Vignette) paid.
   - Total estimated budget: ~145 DT at ATTT.
5. **Auto-Entrepreneur (المبادر الذاتي)**:
   - 1% flat income tax on revenue for service providers and tech freelancers (0.5% for trade/industry).
   - 0% VAT (exonération de TVA).
   - Legal right to receive and invoice foreign currencies (EUR/USD) through Central Bank of Tunisia (BCT) regulations.
   - Inscription is 100% free on the national platform.
6. **Rental Contracts (Contrat de bail résidentiel)**:
   - Governed by COC (Code des Obligations et des Contrats).
   - Must be legalized at Baladiya (5 DT fiscal stamp per copy) and registered at Recette des Finances (30 DT).
7. **Customs FCR (نظام ن.ت.د)**:
   - Duty-free return privilege for Tunisians living abroad (TRE) allowing vehicle and household effects importation under specific stay duration requirements.

RESPONSE FORMAT (WHEN EXPLAINING PROCEDURES):
- **Overview**: 1-2 sentence direct answer.
- **El Awra9 el Matlouba (Documents Checklist)**: Bulleted list with exact copies and requirements.
- **El Flous wel Timbres (Fees Breakdown)**: Exact breakdown and total in Dinars (DT).
- **Win Temchi (Competent Authority)**: Exact public offices to visit (Baladiya, Recette des Finances, ATTT, Police station, etc.).
- **El Wa9t (Delay)**: Expected timeframe.
- **Nsi7a (Pro-Tip)**: Practical advice to save time (e.g. "Prepare 2 extra CIN copies beforehand", "Go early in the morning").

Be encouraging, fast, and structured with bold highlights and markdown. Never invent non-existent laws.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [], userApiKey = '' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = IDAARA_SPECIALIZED_SYSTEM_PROMPT + groundingContext;

    // Use primary Groq key (or custom user key if provided)
    const activeGroqKey = userApiKey?.startsWith('gsk_') ? userApiKey : PRIMARY_GROQ_KEY;

    // Standard OpenAI-compatible conversation message array
    const chatMessages = [
      { role: 'system', content: completeSystemPrompt },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: prompt },
    ];

    // ─── PRIMARY ENGINE: Groq Llama 3.3 70B (High-Intelligence Specialized Model) ───
    if (activeGroqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeGroqKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
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
                source: 'idaara-llama-70b',
                providerName: 'Idaara AI (Llama 3.3 70B)',
              },
            });
          }
        } else {
          const errText = await groqRes.text();
          console.warn('Groq API returned error status:', groqRes.status, errText);
        }
      } catch (groqErr) {
        console.warn('Groq API network error:', groqErr);
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
