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
- Example: "Hello! I am Idaara AI (إدارة.تونس), your Tunisian civic assistant. How can I help you today with procedures, fees, or documents in Tunisia?"`;
  }

  // 3. French detection
  const frenchGreetings = ['bonjour', 'salut', 'bonsoir', 'qui es-tu', 'aide', 'comment', 'coucou', 'yo', 'slt', 'bjr'];
  const isDirectFrench = frenchGreetings.some((g) => pLower === g || pLower.startsWith(g + ' '));
  if (isDirectFrench) {
    return `USER_SCRIPT: FRENCH.
- The user wrote in French.
- You MUST respond 100% in concise, professional French!
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

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier Tunisian administrative, legal, and civic AI assistant.

STRICT CIVIC DOMAIN BOUNDARY & GUARDRAILS (ABSOLUTE MANDATORY RULE):
- You are EXCLUSIVELY a Tunisian Civic, Administrative, Legal, and Fiscal AI assistant.
- YOUR SCOPE IS STRICTLY RESTRICTED TO:
  1. Tunisian administrative procedures (Passports, CIN, Permis, Carte Grise, B3, Madhmoun, Visa, FCR, Certificat de résidence, etc.)
  2. Legal contracts & civil status in Tunisia (Contrat de bail, Mariage civil, Divorce, Héritage, Statut Auto-Entrepreneur 1%, SUARL/SARL, etc.)
  3. Fiscal stamps & taxes (Timbres fiscaux JORT 2025/2026, Vignette, Baladiya fees, Recette des Finances, etc.)
  4. Public civil service exams and recruitment competitions (المناظرات الوطنية بالوظيفة العمومية, concours.gov.tn, STEG, SONEDE, Éducation CAPES, Santé, Finances, Douane, Protection Civile).
  5. Public institutions & public services in Tunisia (Baladiya, Recette des Finances, ATTT, CNSS, CNAM, Douane, Poste tunisienne, Ministères, etc.)

STRICT REFUSAL OF OUT-OF-SCOPE TOPICS (RELIGION, POLITICS, MEDICAL, GENERAL):
- If the user asks ANY question outside Tunisian administration/civic/legal/fiscal topics (e.g. Religion, Faith, "هل أنا مسلم؟", Theology, Politics, Medical advice, Personal counseling, General programming outside civic tools, Gaming, Sports, Jokes, Homework, Random trivia):
  - YOU MUST NEVER answer the out-of-scope question itself. DO NOT philosophize or give religious/personal opinions.
  - REJECT the question politely in 1-2 sentences and redirect the user exclusively to Tunisian administration, documents, and procedures.
  - Use the exact script/language of the user:
    * In Arabic: "أنا **مساعد إدارة.تونس الذكي**، ومهمتي مخصصة حصرياً للإجراءات الإدارية، القانونية، والجبائية في تونس (مثل جواز السفر، بطاقة التعريف، التنابر، عقود الكراء، ونظام المبادر الذاتي). كيف يمكنني مساعدتك في وثائقك أو معاملاتك الإدارية اليوم؟"
    * In Latin Arabizi: "Ena **Idaara AI**, el assistant el idari el mkhases 7asryan lel wra9, el procédures, w el jiba2iyat fi Tounes (Passeport, CIN, Carte Grise, B3, Timbres, Contrats, Auto-Entrepreneur...). Kifech najjem n3awnek fi ay war9a walla démarche idariya lyoum?"
    * In French: "Je suis **Idaara AI**, votre assistant dédié exclusivement aux démarches administratives et juridiques en Tunisie. Comment puis-je vous aider dans vos formalités ?"
    * In English: "I am **Idaara AI**, the dedicated civic AI assistant exclusively focused on Tunisian administrative, legal, and fiscal procedures. How can I assist you with your Tunisian civic procedures today?"

RESPONSE STRUCTURE (ALWAYS USE THIS STRUCTURE FOR PROCEDURES):
1. **Direct Answer (Khousla)**: 1-2 sentence direct summary of what the user needs.
2. **Awra9 el Matlouba (Required Documents)**: Clean bulleted list with exact documents and copies.
3. **Masrouf & Timbres (Fees in DT)**: Exact statutory stamp fees and total cost in Dinars (DT).
4. **Win Temchi (Competent Authority)**: Exact public office to visit (Police station, Baladiya, Recette des Finances, ATTT, etc.).
5. **El Wa9t (Delay)**: Expected delay.
6. **Nsi7a men Idaara (Pro-Tip)**: Practical tip to avoid long queues, student discounts, or prepare extra copies.

STRICT SCRIPT ISOLATION:
- When writing in Latin script (English, French, or Latin Arabizi), NEVER EVER output any Arabic script letters. All words must be in Latin characters.
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

    // ─── PRIMARY ENGINE: Groq 120B / Qwen ───
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
            temperature: 0.2,
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
              temperature: 0.2,
              max_tokens: 1024,
            }),
          });
          if (qwenRes.ok) {
            const data = await qwenRes.json();
            let reply = data.choices?.[0]?.message?.content;
            if (reply) {
              // Strip any <think> tags if present
              reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
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
