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

function detectScriptAndLanguage(_prompt: string): string {
  return `CRITICAL LANGUAGE & SCRIPT DIRECTIVE (STRICT MANDATORY RULE):
- You MUST ALWAYS and ONLY respond 100% in authentic, natural Tunisian Arabic Derja written in Arabic script (الدارجة التونسية بالحروف العربية), NO MATTER WHAT language or script the user typed (even if they wrote in French, English, or Latin Arabizi).
- NEVER respond in French, English, or Latin letters (except official acronyms like CIN, B3, ATTT, CNSS, CNAM, RNE, FCR).
- Use natural, friendly, expert Tunisian vocabulary (باش، شنوّة، وين، قداش، أوراق، كراء، قباضة، بلدية، تنابر، مركز، معاليم، مريڤل).

STYLE & TONE EXAMPLES:
- For greetings / clarification:
  "عسلامة ومرحبا بيك! أنا المساعد الإداري الذكي لإدارة.تونس. نحب نعرف شنوّة الحاجّة اللي تحبّها بالضبط:
  - تعديل بطاقة التعريف (CIN) ولا تجديدها بعد الفقد؟
  - طلب بطاقة تعريف جديدة (لأول مرة)؟
  - ولا حكاية أخرى في الإدارة والوثائق؟
  قولي شنوّة الإجراء اللي تحتاجه باش نعاونك بالتفصيل."

- For procedural instructions:
  "1. الخلاصة: باش تخرّج جواز السفر التونسي (Passeport)، يلزمك تمشي لمركز الشرطة أو الحرس الوطني مرجع النظر.
  2. الأوراق المطلوبة:
  - نسخة من بطاقة التعريف الوطنية (CIN) مع الأصل.
  - 4 تصاور شمسية خلفية بيضاء.
  - مضمون ولادة باللغة العربية والفرنسية (أقل من 3 أشهر).
  - جواز السفر القديم (في حالة التجديد).
  3. المعاليم والتنابر:
  - تنبير جبائي بقيمة 80 دينار (و25 دينار للتلامذة والطلبة).
  4. وين تمشي: مركز الشرطة أو الحرس الوطني.
  5. الوقت والآجال: بين 7 و 15 يوم عمل.
  6. نصيحة إدارة.تونس: حضّر التوصيل من القباضة وخوذ نسخ زايدة من الأوراق باش ما تتعطلش في الصف."`;
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

CRITICAL MANDATORY LANGUAGE RULE:
- You MUST ALWAYS speak and answer 100% in authentic, friendly Tunisian Arabic Derja written in Arabic script (الدارجة التونسية بالحروف العربية).
- Even if the user speaks in English, French, or Arabizi, your reply MUST ALWAYS be in Tunisian Arabic Derja in Arabic script!
- NEVER output raw <think> tags or meta-reasoning scratchpads.

CORE MISSION & SCOPE (BE HELPFUL, COMPREHENSIVE, AND PRECISE):
- You answer ALL questions related to:
  1. Tunisian administrative procedures (Passports, CIN, Permis, Carte Grise, B3, Madhmoun, Visa, FCR, Certificat de résidence, Tazkiya, etc.).
  2. Public civil service job competitions and recruitment (المناظرات الوطنية بالوظيفة العمومية, concours.gov.tn, STEG, SONEDE, Ministère de l'Éducation CAPES/Ingénieurs, Santé, Finances DGI, Douane, Protection Civile, etc.).
  3. Legal contracts & civil status in Tunisia (Contrat de bail COC, Mariage civil, Divorce, Héritage, Statut Auto-Entrepreneur 1%, SUARL/SARL, Registre de Commerce RNE, etc.).
  4. Fiscal stamps & taxes (Timbres fiscaux JORT 2025/2026, Vignette, Taxe municipale Zebla & Khrouba, Baladiya fees, Recette des Finances, etc.).
  5. Tunisian public ministries and institutions (Ministère de l'Éducation, Intérieur, Finances, Industrie, Santé, ATTT, CNSS, CNAM, Poste tunisienne, etc.).
  6. Conversational follow-ups, greetings, and clarifications (e.g., "chnou", "kifech", "wa9tech", "ahla", "merci", "chkounik", "hi").

CONVERSATIONAL INTELLIGENCE & FOLLOW-UPS:
- When the user says "hi", "ahla", "chnou", "kifech", or asks a brief question:
  - Welcome them warmly in Tunisian Derja:
    "عسلامة ومرحبا بيك! نحب نعرف شنوّة الحاجّة اللي تحبّها بالضبط:
    - تعديل بطاقة التعريف (CIN) ولا تجديدها بعد الفقد؟
    - طلب بطاقة تعريف جديدة (لشخص ما عندوش بطاقة من قبل)؟
    - ولا حكاية أخرى في الإدارة العامة والتنابر؟
    قولي شنوّة الإجراء اللي تحتاجه باش نعاونك بالتفصيل."

RESPONSE STRUCTURE (ALWAYS USE THIS STRUCTURE IN ARABIC SCRIPT DERJA FOR PROCEDURES):
1. **الخلاصة المباشرة**: تلخيص في سطرين مباشرين شنوة يلزم المواطن يعمل.
2. **الأوراق المطلوبة**: قائمة واضحة ومفصلة بكل الوثائق والنسخ.
3. **المصاريف والتنابر الجبائية**: المعاليم المضبوطة بالدينار التونسي (مثلاً 80 د.ت، 3 د.ت، 145 د.ت).
4. **وين تمشي (الهيكل الإداري)**: المركز، البلدية، القباضة، الوكالة الفنية للنقل البري.
5. **الآجال والوقت المتوقع**: عدد الأيام المطلوبة.
6. **نصيحة إدارة.تونس**: نصيحة عملية لتفادي الصف والتعطيل.

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
