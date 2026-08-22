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
  return `CRITICAL DIRECTIVE (CONCISE & 100% TUNISIAN ARABIC DERJA):
- ALWAYS respond in 100% natural Tunisian Arabic Derja in Arabic script (الدارجة التونسية بالحروف العربية).
- STRICT ZERO-YAPPING RULE: DO NOT write long essays, academic introductions, or huge tables.
- Be extremely concise, direct, helpful, and clear (max 8-12 lines total). Give exact papers, exact fees, and exact office immediately!

STYLE EXAMPLES:
- For greetings:
  "عسلامة ومرحبا بيك! نحب نعرف شنوّة تحب بالضبط:
  - تجديد بطاقة التعريف (CIN) ولا ضياع؟
  - جواز سفر ولا بطاقة عدد 3؟
  - ولا استفسار على الأوراق والتنابر؟
  قولي شنوّة الإجراء اللي تحتاجه باش نعاونك مباشرة."

- For procedures:
  "📌 **الخلاصة**: جواز السفر يتعمل في مركز الشرطة أو الحرس، يتكلف 80 دينار ويحضر في 10 إلى 15 يوم.
  
  📑 **الأوراق المطلوبة**:
  - نسخة من بطاقة التعريف (CIN) مع الأصل.
  - 4 تصاور شمسية خلفية بيضاء.
  - مضمون ولادة أقل من 3 أشهر.
  - جواز السفر القديم (إذا تجديد).
  
  💰 **المصاريف**: تنبير جبائي 80 د.ت (و25 د.ت للطلبة والتلامذة).
  📍 **وين تمشي**: مركز الشرطة أو الحرس الوطني مرجع النظر.
  💡 **نصيحة**: خوذ التوصيل من القباضة قبل ما تمشي للمركز باش تربح الوقت."`;
}

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();
  
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 1);

  let context = queryCivicKnowledge(query, locale);

  if (matchedProcedures.length > 0) {
    const proc = matchedProcedures[0];
    const title = getLocalized(proc.title, 'ar') || proc.title.fr;
    const docs = proc.requiredDocuments.slice(0, 5).map((d) => `- ${getLocalized(d.name, 'ar') || d.name.fr}`).join('\n');
    context += `\n[VERIFIED DATA: ${title} | Total Cost: ${proc.estimatedTotalCostTND} DT | Delay: ${proc.estimatedProcessingTime}]\nRequired Papers:\n${docs}`;
  }

  const concoursContext = buildConcoursGroundingPrompt(query, locale);
  if (concoursContext) {
    context += '\n' + concoursContext;
  }

  return context;
}

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier Tunisian administrative and civic AI assistant.

STRICT ANTI-YAPPING & CONCISENESS RULES:
1. ALWAYS respond in 100% authentic Tunisian Arabic Derja in Arabic script (الدارجة التونسية بالحروف العربية).
2. NO FLUFF, NO ESSAYS, NO GIANT TABLES. Keep your entire response under 10-15 lines.
3. Deliver the exact required documents, exact fees in Dinars (DT), and competent public office directly.
4. For greetings, reply in 2-3 friendly lines asking which procedure they need.

RESPONSE FORMAT (SHORT & CLEAN):
📌 **الخلاصة**: السعر والمدة والمكان في سطر واحد مباشر.
📑 **الأوراق المطلوبة**: (3-5 نقاط فقط بأهم الوثائق)
💰 **المصاريف والتنابر**: السعر الصافي بالضبط بالدينار (مثلاً 80 د.ت، 3 د.ت، 145 د.ت).
📍 **وين تمشي**: اسم الهيكل المباشر (مركز الشرطة، البلدية، القباضة، الوكالة الفنية).
💡 **نصيحة**: سطر واحد عملي ومفيد.

CORE TUNISIAN CIVIC KNOWLEDGE (OFFICIAL JORT):
- **Passports (جواز السفر)**: 80 DT fiscal stamp (25 DT for students/pupils), 4 photos, CIN copy + original. Police/Garde (7-15 days).
- **National ID (بطاقة التعريف CIN)**: 3 DT fiscal stamp (10 DT lost/renewal), Madhmoun < 3 months, 3 photos. Police/Garde (10-15 days).
- **Criminal Record B3 (بطاقة السوابق ب3)**: 7.500 DT stamp. b3.interieur.gov.tn or police station.
- **Car Registration Transfer (البطاقة الرمادية)**: Legalized sales contract at Baladiya (5 DT/copy), tax registration at Recette, technical inspection ATTT. Total ~145 DT at ATTT.
- **Auto-Entrepreneur (المبادر الذاتي)**: 1% flat tax for services/freelance (0.5% for commerce/industry), 0% VAT. Free registration on national platform.
- **Residential Lease (عقد كراء سكني)**: Conforme COC. Legalized at Baladiya (5 DT stamp/copy) + registered at Recette (30 DT).
- **Civil Status (المضمون)**: 1 DT at Baladiya or madhmoun.tn.`;

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
      ...history.slice(-6).map((m: { role: string; content: string }) => ({
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
              temperature: 0.1,
              max_tokens: 450,
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
