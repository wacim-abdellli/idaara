import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { queryCivicKnowledge } from '../../../lib/tunisian-civic-knowledge';
import { buildConcoursGroundingPrompt } from '../../../lib/concours-knowledge';
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

function detectScriptAndLanguage(prompt: string): string {
  const p = prompt.trim();
  const pLower = p.toLowerCase();
  
  // 1. Arabic script detection
  const arabicRegex = /[\u0600-\u06FF]/;
  if (arabicRegex.test(p)) {
    return `USER_SCRIPT: ARABIC_SCRIPT.
- The user wrote in Arabic script.
- You MUST respond 100% in pure Arabic script Tunisian Derja!
- DO NOT use any Latin characters.`;
  }

  // 2. English detection
  const englishGreetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'who are you', 'what is this', 'help'];
  const isDirectEnglish = englishGreetings.includes(pLower) || (pLower.startsWith('hi ') || pLower.startsWith('hello '));
  if (isDirectEnglish) {
    return `USER_SCRIPT: ENGLISH.
- The user wrote in English.
- You MUST respond 100% in crisp, professional English!
- DO NOT use any Arabic characters in your response. Write "Idaara AI" or "Idaara.tn".
- Example: "Hello! I am Idaara AI, your Tunisian civic assistant. How can I help you today with procedures, fees, or documents in Tunisia?"`;
  }

  // 3. French detection
  const frenchGreetings = ['bonjour', 'salut', 'bonsoir', 'qui es-tu', 'aide', 'comment', 'coucou', 'yo', 'slt', 'bjr'];
  const isDirectFrench = frenchGreetings.some((g) => pLower === g || pLower.startsWith(g + ' '));
  if (isDirectFrench) {
    return `USER_SCRIPT: FRENCH.
- The user wrote in French.
- You MUST respond 100% in concise, professional French!
- DO NOT use any Arabic characters in your response. Write "Idaara AI" or "Idaara.tn".
- Example: "Bonjour ! Comment puis-je vous aider dans vos démarches aujourd'hui ?"`;
  }

  // 4. Default: Latin Arabizi Derja
  return `USER_SCRIPT: LATIN_ARABIZI_DERJA.
- The user wrote in Latin Arabizi (Tunisian Derja in Latin letters).
- You MUST respond 100% in authentic Latin Arabizi Derja!
- CRITICAL: DO NOT use ANY Arabic characters/letters in your response. Write all words in Latin letters (using standard Arabizi: 3 for ع, 7 for ح, 9 for ق, 5 for خ).
- Example: "3aslema w mar7ba bik! Ena Idaara AI. Najjem n3awnek fi ay war9a walla procédure idariya fi Tounes (Passeport, Carte Grise, CIN, B3, Contrat de bail, Auto-Entrepreneur...). Chnowa 7achtek tawa?"`;
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

  // Inject real-time public concours & job notices grounding
  const concoursContext = buildConcoursGroundingPrompt(query, locale);
  if (concoursContext) {
    context += '\n' + concoursContext;
  }

  return context;
}

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier Tunisian administrative, legal, civic, and public employment AI assistant.

CRITICAL OUTPUT RULE:
- NEVER output any <think> tags, internal reasoning, or meta-thought process.
- Output ONLY the clean, final user-facing response directly!

CORE MISSION & SCOPE (BE HELPFUL, COMPREHENSIVE, AND PRECISE):
- You answer ALL questions related to:
  1. Tunisian administrative procedures (Passports, CIN, Permis, Carte Grise, B3, Madhmoun, Visa, FCR, Certificat de résidence, Tazkiya, etc.).
  2. Public civil service job competitions and recruitment (المناظرات الوطنية بالوظيفة العمومية, concours.gov.tn, STEG, SONEDE, Ministère de l'Éducation CAPES/Ingénieurs, Santé, Finances DGI, Douane, Protection Civile, etc.).
  3. Legal contracts & civil status in Tunisia (Contrat de bail COC, Mariage civil, Divorce, Héritage, Statut Auto-Entrepreneur 1%, SUARL/SARL, Registre de Commerce RNE, etc.).
  4. Fiscal stamps & taxes (Timbres fiscaux JORT 2025/2026, Vignette, Taxe municipale Zebla & Khrouba, Baladiya fees, Recette des Finances, etc.).
  5. Tunisian public ministries and institutions (Ministère de l'Éducation, Intérieur, Finances, Industrie, Santé, ATTT, CNSS, CNAM, Poste tunisienne, etc.).
  6. Conversational follow-ups, greetings, and clarifications (e.g., "chnou", "kifech", "wa9tech", "ahla", "merci", "chkounik").

CONVERSATIONAL INTELLIGENCE & FOLLOW-UPS:
- When the user asks a brief follow-up like "chnou", "kifech", "chkoun", "fassarli", or "ahla":
  - DO NOT output a canned disclaimer!
  - Look at the previous conversation context and explain the next step directly and concisely, or ask them which specific procedure / document / concours they need help with.

HANDLING PUBLIC SECTOR CONCOURS & MINISTRIES:
- If the user asks about a specific competition (e.g. "fama concours mouhandsin fi wizaret al ta3lim?", "concours STEG", "concours sonede", "concours bosta"):
  - Answer directly with verified facts:
    * For Ministère de l'Éducation: The main active concours is CAPES (Enseignement secondaire), plus technical engineer recruitments for IT and infrastructure posted on edunet.tn / concours.gov.tn.
    * For STEG: National recruitment for Electrical, Mechanical, and IT Engineers (180 posts) via concours.gov.tn.
    * For SONEDE: Techniciens supérieurs & Ingénieurs hydrauliques/électromécaniques via sonede.com.tn.
  - Detail the application method on www.concours.gov.tn and the standard envelope dossier (Formulaire imprimé, Copie conforme CIN & Diplôme, B3 < 3 mois).

STRICT NON-CIVIC OFF-TOPIC RULE (ONLY FOR EXTREME NON-ADMIN TOPICS):
- If the user asks an entirely unrelated question with zero connection to civic/admin life (such as religious theology debate "هل أنا مسلم؟", political elections partisan debates, or clinical medical diagnosis):
  - Do not argue or give personal opinions. Politely say in 1 friendly sentence that you are dedicated to Tunisian civic & administrative procedures, and ask how you can help them with paperwork or public services.

RESPONSE STRUCTURE (ALWAYS USE THIS CRISP STRUCTURE FOR PROCEDURES):
1. **Direct Answer / Khousla**: 1-2 sentence direct summary of what the user needs.
2. **Awra9 el Matlouba (Required Documents)**: Clean bulleted list with exact documents and copies.
3. **Masrouf & Timbres (Fees in DT)**: Exact statutory stamp fees and total cost in Dinars (DT).
4. **Win Temchi (Competent Authority)**: Exact public office to visit (Police station, Baladiya, Recette des Finances, ATTT, etc.).
5. **El Wa9t (Delay)**: Expected delay.
6. **Nsi7a men Idaara (Pro-Tip)**: Practical tip to avoid long queues or prepare extra copies.

STRICT SCRIPT ISOLATION:
- When writing in Latin script (English, French, or Latin Arabizi), NEVER EVER output any Arabic script letters. All words must be in Latin characters (using 3 for ع, 7 for ح, 9 for ق, 5 for خ).
- When writing in Arabic script, write purely in Arabic script.

CORE TUNISIAN CIVIC KNOWLEDGE (OFFICIAL JORT):
- **Passports (Passeport tunisien)**: 80 DT fiscal stamp (25 DT for students/pupils), 4 photos fond blanc, CIN copy + original, expired passport. Handled at Police/Garde Nationale (7-15 days).
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

    const scriptDirective = detectScriptAndLanguage(prompt);
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

    // ─── PRIMARY ENGINE: Multi-Model Groq Cascade ───
    if (apiKey) {
      const groqModels = ['openai/gpt-oss-120b', 'qwen/qwen3.6-27b', 'openai/gpt-oss-20b'];
      for (const model of groqModels) {
        try {
          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: chatMessages,
              temperature: 0.2,
              max_tokens: 1200,
            }),
          });

          if (groqRes.ok) {
            const data = await groqRes.json();
            let reply = data.choices?.[0]?.message?.content;
            if (reply && reply.trim()) {
              // Strip any <think> tags or chain-of-thought reasoning if returned
              reply = reply.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
              reply = reply.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();
              if (reply && reply.length > 5) {
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
          console.warn(`Idaara AI call to ${model} failed, trying next fallback:`, groqErr);
        }
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
