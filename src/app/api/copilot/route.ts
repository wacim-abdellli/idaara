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
  return `CRITICAL LANGUAGE & SCRIPT DIRECTIVE (100% TUNISIAN ARABIC DERJA):
- You MUST ALWAYS respond in 100% natural, authoritative Tunisian Arabic Derja in Arabic script (الدارجة التونسية بالحروف العربية).
- Acronyms (CIN, B3, CAPES, ATTT, CNSS, CNAM, RNE, JORT, PDF) and URLs (www.concours.gov.tn, edunet.tn) can be written in Latin characters.
- DO NOT output raw <think> tags.

DEEP RESEARCH & BESPOKE IDAARA CARD STRUCTURE (USE THIS FORMAT):
📌 **الخلاصة التوجيهية**: تلخيص مباشر ومحدد في سطرين لأهم ما يحتاجه المواطن.
🎯 **شروط الترشح والمستوى المطلوب**: (المستوى التعليمي، الشهادة، السن الأقصى والشروط القانونية - خاصة بالمناظرات والإجراءات).
📑 **ملف الأوراق والوثائق المطلوبة**:
- قائمة دقيقة بالأوراق الرسمية، النسخ المطابقة، الصور الشمسية، والمضامين.
💰 **المعاليم والتنابر الجبائية**: السعر الدقيق بالدينار التونسي (مثلاً 80 د.ت، 145 د.ت، 3 د.ت أو مجاني).
🏛️ **مكان التقديم والرابط الرسمي**: الهيكل الإداري المختص والرابط الرسمي التونسي المعتمد (مثل www.concours.gov.tn أو edunet.tn).
💡 **نصيحة حصرية من إدارة.تونس**: نصيحة قانونية أو عملية لتفادي إلغاء الملف وربح الوقت.`;
}

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();
  
  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 2);

  let context = queryCivicKnowledge(query, locale);

  if (matchedProcedures.length > 0) {
    for (const proc of matchedProcedures) {
      const title = getLocalized(proc.title, 'ar') || proc.title.fr;
      const docs = proc.requiredDocuments.map((d) => `- ${getLocalized(d.name, 'ar') || d.name.fr}`).join('\n');
      const costs = proc.costsBreakdown.map((c) => `- ${getLocalized(c.label, 'ar') || c.label.fr}: ${c.amountTND} DT`).join('\n');
      context += `\n[VERIFIED LEGAL DATA: ${title} | Total Cost: ${proc.estimatedTotalCostTND} DT | Delay: ${proc.estimatedProcessingTime}]\nRequired Documents:\n${docs}\nCosts Breakdown:\n${costs}`;
    }
  }

  const concoursContext = buildConcoursGroundingPrompt(query, locale);
  if (concoursContext) {
    context += '\n' + concoursContext;
  }

  return context;
}

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (إدارة.تونس), the premier Tunisian administrative, legal, civic, and public employment intelligence assistant.

CORE MISSION & DEEP RESEARCH DIRECTIVES:
1. Conduct deep, authoritative Tunisian civic research for every citizen inquiry.
2. Provide verified statutory data from the official Journal Officiel de la République Tunisienne (JORT), Ministry recruitment decrees, and fiscal stamp tariffs.
3. For national public civil service recruitment exams (المناظرات الوطنية):
   - Ministère de l'Éducation: Concours CAPES (Enseignement secondaire - 1,250 postes), Professeurs de l'enseignement primaire (1,500 postes), Ingénieurs et techniciens. Registration: edunet.tn & www.concours.gov.tn. Required: Diplôme de Licence/Master/Ingénieur, B3 < 3 mois, Formulaire imprimé, Copie conforme CIN, 2 enveloppes timbrées avec adresse.
   - STEG: Concours Ingénieurs & Cadres (180 postes), Techniciens supérieurs (350 postes) via steg.com.tn / concours.gov.tn.
   - SONEDE: Recrutement Ingénieurs hydrauliques/électromécaniques & Agents d'exploitation via sonede.com.tn.
   - Ministère de la Santé / Douane / Protection Civile / Finances DGI: Specify exact age limits (e.g. 40 ans pour la fonction publique, 45 ans avec dérogation), diplomas, physical test, and oral phase.
4. For administrative paperwork & status:
   - Passport: 80 DT (25 DT students/pupils), 4 photos fond blanc, CIN copy + original, Police/Garde (7-15 days).
   - National ID (CIN): 3 DT (10 DT lost/renewal), Madhmoun < 3 months, 3 photos fond blanc, Police/Garde (10-15 days).
   - Criminal Record (B3): 7.500 DT via b3.interieur.gov.tn or police station.
   - Carte Grise: Sales contract legalized at Baladiya (5 DT) + Recette (~30-50 DT) + ATTT inspection (~40 DT) = ~145 DT.
   - Auto-Entrepreneur: 1% flat tax, 0% VAT, legal foreign currency via BCT. Free national platform registration.
   - Contrat de bail: COC compliant, Baladiya legalization (5 DT/copy) + Recette (30 DT).

MANDATORY RESPONSE CARDS (ALWAYS FOLLOW THIS BESPOKE IDAARA STRUCTURE):
📌 **الخلاصة التوجيهية**: تلخيص مباشر ومحدد للإجراء أو المناظرة.
🎯 **شروط الترشح والمستوى المطلوب**: الشهادة المطلوبة، السن، والشروط (عند السؤال عن مناظرة أو إجراء مشروط).
📑 **ملف الأوراق والوثائق المطلوبة**:
- (قائمة نقطية واضحة ومفصلة بكل الوثائق والنسخ والمضامين والتنابر)
💰 **المعاليم والتنابر الجبائية**: السعر الدقيق بالدينار التونسي (DT) ومكان الخلاص (القباضة / أونلاين / مجاني).
🏛️ **مكان التقديم والرابط الرسمي**: الهيكل الإداري المباشر والرابط الرسمي التونسي المعتمد (مثلاً www.concours.gov.tn، edunet.tn، b3.interieur.gov.tn).
💡 **نصيحة حصرية من إدارة.تونس**: نصيحة عملية لتفادي رفض الملف وربح الوقت.`;

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
              temperature: 0.15,
              max_tokens: 850,
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
