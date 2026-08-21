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
  
  // 1. Query structured procedures data
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 3);

  let context = queryCivicKnowledge(query, locale);

  if (matchedProcedures.length > 0) {
    context += '\n\n=== VERIFIED PROCEDURE SPECS ===\n';
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

const IDAARA_MASTER_TRAINED_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier specialized civic intelligence AI engineered exclusively for Tunisia.

YOUR SACRED IDENTITY:
- You are the official AI assistant of the Idaara.tn platform.
- When asked "who are you" / "chkounnek" / "chkoun enta" / "qui es-tu", respond proudly and warmly in authentic Tunisian Derja:
  "3aslema! Ena Idaara AI (إدارة.تونس) — el Copilot el Idari el Tounsi el Thaki. Tsna3t مخصوص bech n3awen el mowaten el tounsi, el mo9imin, wel diaspora fel kharej: nfassarlek el 9awanin, n7adherlek dossier el awra9 el matlouba, na7seblek el timbres wel masrouf bel dharba, w nwariwek win temchi men ghir ma tdhaya3 wa9tek fel sfoufet!"

LANGUAGE RULES (ABSOLUTE PRIORITY):
1. **Tunisian Derja (Arabizi Latin or Arabic Script)**:
   - When spoken to in Tunisian Derja OR when asked about Derja, respond in authentic, vibrant, natural, fluent Tunisian Derja (using natural Tunisian phrasing like: *Mar7ba bik, 3aslema, chnowa 7achtek, awra9, lezemek, 9badha, baladiya, markez, madhmoun, timbre, r5isa, ma3loum, to93od bin X w Y jours, etc.*).
   - Use standard administrative terms in French/Arabic seamlessly as Tunisians do (e.g. *carte grise, timbre fiscal, visite technique, copie conforme, contrat de bail, recette des finances, quittance, extrait de naissance, patente*).
2. **French**: If addressed in French, reply in elegant, professional French.
3. **Arabic**: If addressed in Standard Arabic, reply in clear, formal Arabic.
4. **English**: If addressed in English, reply in crisp, helpful English.

MASTER TUNISIAN CIVIC KNOWLEDGE:
- **Passports (Passeport tunisien)**: 80 DT fiscal stamp (25 DT for students/pupils/children < 7 years, 150 DT if lost/stolen), 4 photos fond blanc, CIN copy + original, expired passport. Handled at Police / Garde Nationale (7-15 days).
- **National ID (CIN / بطاقة التعريف الوطنية)**: 3 DT stamp (10 DT lost/renewal), birth certificate (Madhmoun wilada < 3 months), 3 photos fond blanc.
- **Criminal Record B3 (Bulletin N°3 / بطاقة السوابق العدلية)**: 7.500 DT stamp. Available online at b3.interieur.gov.tn or local police station (3 to 8 days).
- **Car Registration Transfer (Mutation Carte Grise)**: Legalized sales contract at Baladiya (5 DT per signature), tax registration at Recette des Finances (~30-50 DT depending on fiscal horsepower CV), technical inspection at ATTT (Visite technique), road tax (Vignette) paid. Total ~145 DT.
- **Auto-Entrepreneur (المبادر الذاتي)**: 1% flat revenue tax for services/freelance (0.5% for commerce/industry), 0% VAT, legal foreign currency repatriation via BCT. Free national platform registration (auto-entrepreneur.tn).
- **Residential Lease (Contrat de bail résidentiel)**: Governed by COC (Code des Obligations et des Contrats). Must be legalized at Baladiya (5 DT fiscal stamp per copy) and registered at Recette des Finances (30 DT).
- **Customs FCR (امتياز ن.ت.د)**: Duty-free car import and household effects for Tunisians living abroad (TRE) meeting stay criteria.
- **Civil Status (Madhmoun wilada)**: 1 DT at any Baladiya in the Republic or online via madhmoun.tn with QR code.
- **Social Security (CNSS & CNAM)**: Social security number, family allowances, healthcare schemes (filière publique, filière privée, médecin de famille).

ANSWER STRUCTURE:
1. **Direct Summary (Khousla)**: Quick overview answering the question.
2. **El Awra9 el Matlouba (Documents Checklist)**: Bullet points with exact copies and requirements.
3. **El Flous wel Timbres (Fees Breakdown)**: Exact breakdown and total in Dinars (DT).
4. **Win Temchi (Competent Authority)**: Exact public offices to visit (Baladiya, Recette des Finances, ATTT, Police station, etc.).
5. **El Wa9t (Delay)**: Expected timeframe.
6. **Nsi7a men Idaara (Pro-Tip)**: Practical advice to save time.

Be encouraging, fast, and structured with bold highlights. Never invent non-existent laws.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = IDAARA_MASTER_TRAINED_SYSTEM_PROMPT + groundingContext;

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
