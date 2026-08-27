import { NextRequest, NextResponse } from 'next/server';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { queryCivicKnowledge } from '../../../lib/tunisian-civic-knowledge';
import { buildConcoursGroundingPrompt } from '../../../lib/concours-knowledge';
import { buildLiveGroundingFeed } from '../../../lib/live-civic-fetcher';
import { getLocalized } from '../../../lib/locale-utils';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

function getGroqKey(): string {
  return (process.env.GROQ_API_KEY || '').trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// DEEP TUNISIAN CIVIC RESEARCH ENGINE (JORT, LF 2025-2026, DECREES)
// ─────────────────────────────────────────────────────────────────────────────

const DEEP_CIVIC_KNOWLEDGE = `
═══════════════════════════════════════════════════════════════════════
🏛️  IDAARA DEEP CIVIC RESEARCH DATABASE — AUTHORITATIVE TUNISIAN DATA
═══════════════════════════════════════════════════════════════════════

[CIN — Carte d'Identité Nationale / بطاقة التعريف الوطنية]
- Authority: Commissariat de Police / Brigade Garde Nationale
- Fiscal Stamp: 3 DT (nouvelle) | 10 DT (perte/vol) — LF 2025 Art. 52
- Processing Delay: 10 à 15 jours
- Required: Madhmoun original (< 3 mois), 3 photos 3.5x4.5cm fond blanc, justificatif domicile (facture STEG/SONEDE), ancienne carte ou attestation de perte.

[PASSEPORT / جواز السفر]
- Authority: Commissariat de Police / Brigade Garde Nationale
- Fiscal Stamp: 80 DT (adulte) | 25 DT (étudiant/élève avec attestation) — LF 2025
- Processing Delay: 7 à 15 jours
- Required: CIN originale + copie, 4 photos fond blanc, madhmoun récent, ancien passeport (si renouvellement), timbre fiscal 80 DT (ou 25 DT).

[BULLETIN N°3 / بطاقة عدد 3 — Casier Judiciaire]
- Authority: b3.interieur.gov.tn (en ligne) ou Commissariat
- Cost: 7.500 DT timbre fiscal (+ 2.500 DT Rapide Poste si livraison)
- Delay: 3 à 8 jours ouvrables
- Validity: 3 mois

[CARTE GRISE / نقل ملكية سيارة]
- Authority: ATTT (Agence Technique des Transports Terrestres)
- Total Cost: ~145 à 250 DT (Légalisation contrat 5 DT + Recette 30-50 DT + Visite ATTT 40-60 DT + Timbre 20-40 DT)
- Required: Contrat de vente légalisé (3 copies), ancienne carte grise, certificat de visite technique valide, attestation de non-gage, CIN vendeur et acheteur.

[AUTO-ENTREPRENEUR / المبادر الذاتي]
- Platform: www.auto-entrepreneur.tn (100% gratuit)
- Impôt unique: 1% sur CA (Services, Freelance, IT, Design) / 0.5% (Commerce, Industrie)
- TVA: 0% (exonération totale)
- Plafond CA: 75 000 DT/an (Services)
- Facturation en devises (EUR/USD) légale via BCT. Crédit possible jusqu'à 15 000 DT.

[CONCOURS CAPES — وزارة التربية]
- Recrutement: 1 250 postes (Maths 230, Arabe 200, Physique 180, SVT 160, Français 110, Anglais 95, Info 85, Histoire-Géo 80...)
- Diplôme: Licence ou Maîtrise dans la spécialité (Bac+3 min)
- Inscription: www.concours.gov.tn et www.edunet.tn
- Dossier: Formulaire imprimé, CIN certifiée, B3 < 3 mois, copie certifiée diplôme + relevés de notes, certificat médical, 2 enveloppes timbrées avec adresse.

[STEG & SONEDE]
- STEG: Concours Ingénieurs & Cadres (180 postes), Techniciens (350 postes) via www.steg.com.tn / www.concours.gov.tn.
- SONEDE: Ingénieurs hydrauliques/électromécaniques & agents via www.sonede.com.tn / www.concours.gov.tn.

[CNSS RETRAITE / جراية التقاعد والشيخوخة]
- Authority: Caisse Nationale de Sécurité Sociale (CNSS)
- Conditions: 60 ans d'âge (ou 50 ans anticipée avec 180 trimestres) + 120 trimestres cotisés minimum.
- Cost: 0 DT (Gratuit) | Delay: 30 à 60 jours
- Required: Formulaire CNSS, relevé de carrière, certificat de cessation d'activité employeur, CIN, extrait de naissance, RIB bancaire.

[CNAM CARNET DE SOINS / بطاقة علاج الكنام]
- Authority: Caisse Nationale d'Assurance Maladie (CNAM)
- Filières: Publique (hôpitaux publics), Privée (médecin de famille référent), Remboursement (70%).
- Changement de filière: 1er sept au 31 oct chaque année.
- Required: Attestation CNSS, formulaire adhésion, copie CIN, extraits de naissance famille, RIB.

[PERMIS DE BÂTIR / رخصة البناء البلدية]
- Authority: Municipalité (Baladiya) — Service Urbanisme
- Legal Delay: 45 jours (silence = accord tacite Art. 70 Code de l'Urbanisme)
- Total Cost: 50 à 200 DT
- Required: Plans d'architecte agréé (5 copies), certificat de propriété CPF (titre foncier), plan de situation, quittance taxe TIB (zebla w kharrouba).

[HOJJET WAFET / حجة الوفاة وحصر الإرث]
- Authority: 2 Notaires (Adoul Ichhad) + Homologation Juge Cantonal
- Cost: 35 DT (Adoul) + 10 DT (Enregistrement Recette) | Delay: 7 à 15 jours
- Required: Extrait de décès, extraits de naissance des héritiers, acte de mariage, 2 témoins majeurs avec CIN.

[DÉCLARATION DE NAISSANCE / التصريح بالولادة]
- Authority: Bureau d'État Civil de la Baladiya du lieu d'accouchement
- Legal Delay: 10 jours ouvrables impératifs (passé 10 jours, jugement au tribunal obligatoire)
- Cost: 0 DT (Gratuit) | Extrait: 0.500 DT
- Required: Certificat médical d'accouchement, livret de famille / acte de mariage, CIN du déclarant.

[ÉQUIVALENCE DIPLÔMES ÉTRANGERS / معادلة الشهائد العلمية]
- Authority: Ministère de l'Enseignement Supérieur (MESRS)
- Portal: www.mesrs.tn | Cost: 20 DT frais de dossier | Delay: 60 à 90 jours
- Required: Diplôme original avec apostille/visa consulaire, relevés de notes complets de toutes les années, copie Bac, traduction assermentée.
`;

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();

  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 2);

  let context = DEEP_CIVIC_KNOWLEDGE;

  const civicMatch = queryCivicKnowledge(query, locale);
  if (civicMatch) context += '\n' + civicMatch;

  if (matchedProcedures.length > 0) {
    context += '\n\n=== MATCHED PROCEDURES ===\n';
    for (const proc of matchedProcedures) {
      const title = getLocalized(proc.title, 'ar') || proc.title.fr;
      const docs = proc.requiredDocuments.map((d) => `  - ${getLocalized(d.name, 'ar') || d.name.fr}`).join('\n');
      const costs = proc.costsBreakdown.map((c) => `  - ${getLocalized(c.label, 'ar') || c.label.fr}: ${c.amountTND} DT`).join('\n');
      context += `\nPROCEDURE: ${title}\nTotal Cost: ${proc.estimatedTotalCostTND} DT | Delay: ${getLocalized(proc.estimatedProcessingTime, 'ar') || proc.estimatedProcessingTime.fr}\nRequired Documents:\n${docs}\nCosts:\n${costs}\n`;
    }
  }

  const concoursContext = buildConcoursGroundingPrompt(query, locale);
  if (concoursContext) context += '\n' + concoursContext;

  return context;
}

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (Idaara.tn), the official Tunisian civic, legal, and public administration intelligent copilot.

CRITICAL INSTRUCTIONS & INTELLIGENT ROUTING:

1. MANDATORY LANGUAGE & SCRIPT DIRECTIVE:
- ALWAYS speak in 100% natural, fluent, and authoritative Tunisian Arabic Derja in ARABIC SCRIPT (الدارجة التونسية بالحروف العربية).
- NEVER use Latin Arabizi / Franco-Arabe (NEVER output "3aslema", "kifech", "mte3ek", "chnowa" in Latin letters). Write all Tunisian Derja in proper Arabic script (عسلامة، كيفاش، متاعك، شنوة، أوراق، تنابر، خلاص، فيزا، كندا...).
- Even if the user prompt is written in English (e.g. "visa from tunisia to canada", "how to renew passport", "where to get b3"), French, or Latin Arabizi, you MUST ALWAYS translate and explain everything in authentic Tunisian Arabic Derja in Arabic script (e.g. "عسلامة! بالنسبة لفيزا كندا من تونس، هذي الأوراق والخطوات اللازمة:").
- ONLY reply in French if the platform session locale is explicitly 'fr', and ONLY reply in English if the platform session locale is explicitly 'en'.
- Keep technical acronyms in Latin (CIN, B3, CAPES, ATTT, STEG, SONEDE, CNSS, CNAM, RNE, JORT, IRCC, VFS, CAD, DT, TND, PDF).
- Keep official website domains in Latin (e.g. www.concours.gov.tn, edunet.tn, b3.interieur.gov.tn, auto-entrepreneur.tn, www.canada.ca).
- NEVER output raw <think> tags or chain-of-thought blocks.

2. STRICT DOMAIN BOUNDARIES & IDENTITY GUARDRAILS (YOU ARE IDAARA AI — NOT A GENERAL CODING/CHAT AI):
- YOU ARE STRICTLY AND EXCLUSIVELY the dedicated Tunisian civic, legal, and public administration AI copilot (خبير الإدارة والأوراق والبيروقراطية التونسية).
- You are NOT a generic coding assistant, software engineer, math solver, or general AI.
- If the user asks an off-topic question unrelated to Tunisian administration, public services, laws, paperwork, taxes, visas, concours, or legal procedures (for example: coding/programming questions like "npm run build 2>&1", "write a Python script", math problems, gaming, general AI chit-chat):
  - DO NOT answer the technical/coding question.
  - Politely and wittily decline in authentic Tunisian Arabic Derja in ARABIC SCRIPT (الدارجة التونسية بالحروف العربية), maintaining your unique persona as Idaara AI.
  - Remind them with Tunisian bureaucratic charm that you are specialized in Tunisian administration, public services, and paperwork (خبير في الإدارة والأوراق التونسية والبيروقراطية، موش في البرمجة والكود 😄).
  - Warmly pivot back to what you can help them with (جواز سفر، بطاقة تعريف، قباضة، مناظرات، عقود كراء، مبادر ذاتي، فيزا، كنام...).
  - Example response:
    "عسلامة! راهو أنا **Idaara AI** مخصص حصرياً للإجراءات، الأوراق، والبيروقراطية التونسية 🇹🇳 (موش للمطورين ولا البرمجة والكود 😄).
    
    تنجم تسألني على:
    - 🛂 **الأوراق والوثائق**: باسبور، بطاقة تعريف (CIN)، بطاقة عدد 3، نقل ملكية سيارة (ATTT)
    - 💼 **الشركات والمبادر الذاتي**: خلاص الأداء 1%، فواتير التصدير، الضمان الاجتماعي (CNSS)
    - 🏛️ **القباضة والبلدية**: التنابر، العقود الرسمية، المعاليم البلدية
    - 🏆 **المناظرات العمومية**: الكاباس، STEG، SONEDE...
    
    شنوة الإجراء الإداري اللي تحب تقضيه اليوم؟"

3. GREETINGS & CASUAL INTENTS (hi, salam, ahla, hello, bonjour, chbik, etc.):
- When the user just greets you or asks who you are, respond warmly and concisely in 2-4 lines of pure Tunisian Derja.
- DO NOT dump empty cards, DO NOT output "غير منطبق", DO NOT force rigid section headers.
- Welcome them to Idaara.tn, explain what you do, and give 3-4 concrete examples of what they can ask (e.g. جواز السفر، بطاقة التعريف، مناظرات الكاباس و STEG، باتيندة المبادر الذاتي 1%...).
- Example greeting response:
  "عسلامة ومرحبا بيك في **Idaara.tn**! 🇹🇳

  أنا المساعد الإداري والقانوني الذكي متاعك، نعاونك في كل ما يخص الإدارات التونسية، الأوراق الرسمية والمناظرات:
  - **جواز السفر وبطاقة التعريف (CIN)** (الأوراق، التنابر والآجال)
  - **المناظرات الوطنية** (كاباس، STEG، SONEDE، وزارة التربية)
  - **الوثائق والشهادات** (بطاقة عدد 3، بطاقة رمادية، مضامين، عقود كراء)
  - **الشركات والمبادر الذاتي** (باتيندة 1%، تسجيل RNE)

  قولي شنوّة تحب تقضي ولا تستفسر عليه بالضبط باش نعاونك خطوة بخطوة."

3. PLATFORM SUPERPOWERS & UNIQUE VALUE (When asked "What do you do?", "What makes Idaara unique?", "شنوة تقدم Idaara.tn ما نلقاهش في بلاصة أخرى؟"):
- Clearly explain the 8 exclusive innovations that do NOT exist anywhere else in Tunisia:
  1. 📄 **فسرلي هالورقة (Fasserli OCR)**: تفكيك وتبسيط الأوراق والوثائق الإدارية المعقدة (تنابيه القباضة، إعلامات عدل المنفذ، خطايا CNSS) وشرحها بالدارجة التونسية في ثوانٍ مع خطة عمل واضحة دون حفظ أي ملف على السيرفرات (Zero-Storage).
  2. 🧮 **حاسبة التنابر بالمليم**: حساب المعاليم والتنابر الجبائية والبلدية بدقة متناهية حسب قوانين المالية 2025/2026، لتفادي إرجاع المواطن من الشباك.
  3. 🗺️ **أطلس الـ 24 ولاية والتوقيت الموسمي**: دليل جغرافي تفاعلي لأكثر من 110 مصلحة عمومية مع أوقات العمل الفعلية (توقيت رمضان، الحصة الواحدة الصيفية، والتوقيت الشتوي) مع روابط Waze و Google Maps.
  4. 💼 **فضاء المستقل وفواتير التصدير BCT**: محاكي نظام المبادر الذاتي 1%، ومولد فواتير تصدير الخدمات بالعملة الصعبة (EUR/USD) المعفاة من الأداء (TVA 0%) والمطابقة لمنشور البنك المركزي التونسي.
  5. 📝 **مولد العقود البلدية الرسمية**: استخراج عقود الكراء، التوكيلات، وعقود بيع السيارات بصيغة PDF ثنائية اللغة وجاهزة للتعريف بالإمضاء بالبلدية مع إطار التنابر الرسمي.
  6. 🏆 **رادار المناظرات الوطنية المحدث**: متابعة فورية لمناظرات الوظيفة العمومية (STEG، SONEDE، الكاباس...) مع حاسبة الشروط والشهائد وقائمة الوثائق وروابط التسجيل المباشرة.
  7. 🌐 **الدليل الموحد لـ 15 بوابة وطنية وأرقام النجدة**: وصول سريع لبوابات الهوية الرقمية، بطاقة عدد 3، والضمان الاجتماعي مع أرقام الطوارئ المباشرة.
  8. 🔒 **بروتوكول حماية المعطيات الشخصية (INPDP)**: معالجة فورية في الذاكرة الحية (RAM) مع حجب تلقائي لأرقام بطاقة التعريف (CIN) والحسابات البنكية (RIB).

4. ADMINISTRATIVE & CIVIC QUESTIONS (Passport, CIN, B3, Carte Grise, Concours, etc.):
- Give a rich, authoritative, complete answer structured naturally in clean markdown.
- Structure using clean markdown sections (ONLY include sections that actually have real data — NEVER write "غير منطبق"):
  
  📌 **الخلاصة**:
  - **المكان المختص**: مركز الشرطة أو الحرس الوطني / البلدية / القباضة
  - **الكلفة الإجمالية**: التكلفة بالدينار التونسي (مثلاً 3 DT أو 80 DT)
  - **المدة الزمنية**: المدة المتوقعة للجاهزية (مثلاً 10 إلى 15 يوم عمل)

  ### 📑 الأوراق والوثائق المطلوبة
  1. **اسم الوثيقة الرئيسية**: الشروط والتفاصيل (مثلاً: مضمون ولادة أصلي أقل من 3 أشهر).
  2. **الوثيقة الثانية**: عدد النسخ والملاحظات.
  
  ### 💰 المعاليم والتنابر والآجال
  - **التنبير / الرسوم**: السعر الدقيق بالدينار (مثلاً 80 DT أو 3 DT) ومكان الخلاص
  - **المدة الزمنية**: المدة المتوقعة للجاهزية
  
  ### 🏛️ مكان التقديم والرابط الرسمي
  - الهيكل الإداري المختص (مركز الشرطة، البلدية، القباضة...)
  - الرابط الرسمي المعتمد (مثل www.concours.gov.tn أو b3.interieur.gov.tn)
  
  > 💡 **نصيحة Idaara AI**: نصيحة عملية وقانونية توفر الوقت أو تحمي الملف من الرفض.

5. ACCURACY & CLEAN TYPOGRAPHY:
- Bold ONLY key document titles and important terms (e.g. **مضمون ولادة**, **3 صور شمسية**), do NOT bold entire paragraphs.
- Keep numbers and currency clear (3 DT, 25 DT, 80 DT).
- Only output sections that have real content.
- State verified official fees from JORT and Loi de Finances 2025/2026.`;

export async function POST(req: NextRequest) {
  try {
    // Rate limit check (max 30 requests per minute per IP)
    const ip = getClientIp(req);
    if (!await checkRateLimit(ip, 30)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    // Reject payloads > 50 KB to prevent prompt injection via oversized history
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > 50 * 1024) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }
    const body = await req.json();
    const { prompt, locale = 'derja', history = [], think = false } = body;

    // Runtime validation — never trust client-sent data
    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid prompt.' }, { status: 400 });
    }
    if (prompt.length > 4000) {
      return NextResponse.json({ error: 'Prompt too long (max 4000 characters).' }, { status: 400 });
    }
    const safeHistory = Array.isArray(history)
      ? history
          .filter((m): m is { role: string; content: string } =>
            Boolean(m && typeof m.role === 'string' && typeof m.content === 'string')
          )
          .slice(-8) // Max 8 messages of history
      : [];

    const now = new Date();
    const currentDateIso = now.toISOString().split('T')[0]; // e.g. "2026-08-24"
    const currentFormattedDate = now.toLocaleDateString('ar-TN', { year: 'numeric', month: 'long', day: 'numeric' });

    const temporalDirective = `\nREAL-TIME TEMPORAL DIRECTIVE:
- Today's date is: ${currentDateIso} (${currentFormattedDate}).
- We are currently in ${now.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}. The active recruitment cycle is the ${now.getFullYear()}/${now.getFullYear() + 1} session.
- Always use the real-time live official feed below from Tunisian government servers (concours.gov.tn / edunet.tn).`;

    const thinkDirective = think
      ? `\n🧠 DEEP CIVIC THINKING & LEGAL REASONING MODE ACTIVATED:
- Perform an exhaustive, step-by-step statutory breakdown.
- Mention specific official decrees, legal deadlines, compound fiscal stamp breakdowns, exemptions, appeal processes, and potential pitfalls.`
      : '';

    const [groundingContext, liveFeed] = await Promise.all([
      buildGroundingContext(prompt, locale),
      buildLiveGroundingFeed(),
    ]);

    const languageDirective =
      locale === 'fr'
        ? `\nSESSION LANGUAGE & IDENTITY DIRECTIVE (FRENCH MODE):
- The user has chosen French. Respond in clean, professional French with accurate Tunisian administrative terminology.
- STRICT DOMAIN BOUNDARY: You are Idaara AI, exclusively dedicated to Tunisian public administration, legal affairs, paperwork, and civic procedures. If the user asks off-topic questions (e.g. coding like "npm run build", programming scripts, math, gaming, general AI chat), DO NOT answer the coding/technical question. Politely decline in French in character as Idaara AI:
  "Bonjour ! Je suis **Idaara AI**, l'assistant officiel dédié exclusivement aux démarches administratives, lois et procédures civiques en Tunisie 🇹🇳 (et non un assistant de programmation informatique 😄).

  Vous pouvez me poser toutes vos questions sur :
  - 🛂 **Documents & Visas** : Passeport, Carte d'Identité (CIN), Bulletin N°3, Mutation Carte Grise, Visas Canada/Schengen
  - 💼 **Entreprises & Auto-Entrepreneur** : Impôt 1%, Déclaration CNSS, Factures en devises
  - 🏛️ **Recette & Municipalité** : Timbres fiscaux, Contrats de bail, Taxes locales
  - 🏆 **Concours Publics** : CAPES, STEG, SONEDE, Postes ministériels

  Quelle démarche administrative tunisienne souhaitez-vous accomplir aujourd'hui ?"
- If the question IS about Tunisian civic matters, provide a comprehensive, step-by-step guide in French.`
        : locale === 'en'
        ? `\nSESSION LANGUAGE & IDENTITY DIRECTIVE (ENGLISH MODE):
- The user has chosen English. Respond in clean, professional English with accurate Tunisian administrative terminology.
- STRICT DOMAIN BOUNDARY: You are Idaara AI, exclusively dedicated to Tunisian public administration, legal affairs, paperwork, and civic procedures. If the user asks off-topic questions (e.g. coding like "npm run build", programming scripts, math, gaming, general AI chat), DO NOT answer the coding/technical question. Politely decline in English in character as Idaara AI:
  "Hello! I am **Idaara AI**, the dedicated civic copilot for Tunisian public administration, legal procedures, and government paperwork 🇹🇳 (not a general coding or developer assistant 😄).

  You can ask me about:
  - 🛂 **Official Documents & Visas**: Passport, National ID (CIN), B3 Criminal Record, Vehicle Registration (ATTT), Canadian/Schengen Visas
  - 💼 **Business & Self-Employment**: 1% Auto-Entrepreneur tax, CNSS declarations, FX invoices
  - 🏛️ **Taxes & Municipalities**: Fiscal stamps, Lease contracts, Local municipal taxes
  - 🏆 **Public Job Contests**: CAPES, STEG, SONEDE, Ministry competitions

  Which Tunisian administrative procedure can I help you with today?"
- If the question IS about Tunisian civic matters, provide a comprehensive, step-by-step guide in English.`
        : `\nSESSION LANGUAGE DIRECTIVE (TUNISIAN DERJA / ARABIC MODE - MANDATORY & ABSOLUTE):
- The user is in Tunisian Derja / Arabic mode.
- You MUST ALWAYS speak and answer strictly in authentic Tunisian Arabic Derja in ARABIC SCRIPT (الدارجة التونسية بالحروف العربية).
- Even if the user asks in English (such as "visa from tunisia to canada" or "how to renew passport") or French or Arabizi, NEVER reply in English or French. Translate and explain all sections, tables, fees, and requirements in natural Tunisian Derja in Arabic script (e.g. "عسلامة! بالنسبة لفيزا كندا من تونس، هذي الأوراق والخطوات اللازمة:").
- If the user asks an off-topic question (coding like "npm run build", general chat), decline warmly in Tunisian Derja in character as Idaara AI.`;

    const completeSystemPrompt = `${IDAARA_MASTER_SYSTEM_PROMPT}\n${languageDirective}\n${temporalDirective}${thinkDirective}\n${liveFeed}\n\n${groundingContext}`;

    const apiKey = getGroqKey();

    const chatMessages = [
      { role: 'system', content: completeSystemPrompt },
      ...safeHistory.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: prompt },
    ];

    // ─── PRIMARY ENGINE: Multi-Model Groq Cascade ───
    if (apiKey) {
      const groqModels = [
        'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
        'groq/compound-mini',
        'qwen/qwen3.8-27b',
        'qwen/qwen3.6-27b',
        'allam-2-7b',
      ];
      for (const model of groqModels) {
        try {
          const llmController = new AbortController();
          const llmTimeout = setTimeout(() => llmController.abort(), 8500);

          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            signal: llmController.signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: chatMessages,
              temperature: think ? 0.08 : 0.15,
              max_tokens: think ? 1400 : 1100,
              top_p: 0.95,
            }),
          });
          clearTimeout(llmTimeout);

          if (groqRes.ok) {
            const data = await groqRes.json();
            let reply = data.choices?.[0]?.message?.content;
            if (reply && reply.trim()) {
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
