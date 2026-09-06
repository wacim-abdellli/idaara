import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { queryCivicKnowledge } from '../../../lib/tunisian-civic-knowledge';
import { buildConcoursGroundingPrompt } from '../../../lib/concours-knowledge';
import { buildLiveGroundingFeed } from '../../../lib/live-civic-fetcher';
import { getLocalized } from '../../../lib/locale-utils';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';
import {
  CIVIC_STAMP_RATES,
  AUTO_ENTREPRENEUR_RATES,
  FISCAL_YEAR_LABEL,
} from '../../../data/fiscal-rates';

function getGeminiKey(): string {
  return (process.env.GEMINI_API_KEY || '').trim();
}

function getGroqKey(): string {
  return (process.env.GROQ_API_KEY || '').trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// TUNISIAN CIVIC RESEARCH ENGINE (TOPICAL CHUNKS & GREETING GUARDS)
// ─────────────────────────────────────────────────────────────────────────────

export const GREETING_REGEX = /^(hi|hello|hey|bonjour|salut|coucou|salam|3aslema|aslema|ahla|mar7ba|marhaba|صباح الخير|مساء الخير|السلام|عسلامة|أهلا|مرحبا|اهلين|test|yo|cv|ça va)[\s!.,?]*$/i;

const CIVIC_KNOWLEDGE_TOPICS: Array<{ keywords: string[]; content: string }> = [
  {
    keywords: ['cin', 'identite', 'تعريف', 'بطاقة', 'بطاقه'],
    content: `[CIN — Carte d'Identité Nationale / بطاقة التعريف الوطنية]
- Authority: Commissariat de Police / Brigade Garde Nationale
- Fiscal Stamp: ${CIVIC_STAMP_RATES.cinStandardTND} DT (nouvelle) | ${CIVIC_STAMP_RATES.cinLostReplacementTND} DT (perte/vol) — ${FISCAL_YEAR_LABEL}
- Processing Delay: 10 à 15 jours
- Required: Madhmoun original (< 3 mois), 3 photos 3.5x4.5cm fond blanc, justificatif domicile (facture STEG/SONEDE), ancienne carte ou attestation de perte.`
  },
  {
    keywords: ['passeport', 'passport', 'جواز', 'سفر', 'باسبور'],
    content: `[PASSEPORT / جواز السفر]
- Authority: Commissariat de Police / Brigade Garde Nationale
- Fiscal Stamp: ${CIVIC_STAMP_RATES.passportAdultTND} DT (adulte) | ${CIVIC_STAMP_RATES.passportStudentMinorTND} DT (étudiant/élève avec attestation) — ${FISCAL_YEAR_LABEL}
- Processing Delay: 7 à 15 jours
- Required: CIN originale + copie, 4 photos fond blanc, madhmoun récent, ancien passeport (si renouvellement), timbre fiscal 80 DT (ou 25 DT).`
  },
  {
    keywords: ['b3', 'bulletin 3', 'سوابق', 'عدلية', 'casier', '3dad 3', 'بطاقة عدد 3'],
    content: `[BULLETIN N°3 / بطاقة عدد 3 — Casier Judiciaire]
- Authority: b3.interieur.gov.tn (en ligne) ou Commissariat de police
- Cost: 3 DT timbre fiscal (+ 4.500 DT frais de livraison Rapide Poste = 7.500 DT au total pour commande en ligne)
- Delay: 3 à 8 jours ouvrables
- Validity: 3 mois`
  },
  {
    keywords: ['carte grise', 'grise', 'رمادية', 'attt', 'سيارة', 'كرهبة', 'karhba', 'mutation'],
    content: `[CARTE GRISE / نقل ملكية سيارة]
- Authority: ATTT (Agence Technique des Transports Terrestres)
- Total Cost: ~145 à 250 DT (Légalisation contrat 6 DT [3 DT x 2 signatures] + Recette 30-50 DT + Visite ATTT 40-60 DT + Timbre 20-40 DT)
- Required: Contrat de vente légalisé (3 copies), ancienne carte grise, certificat de visite technique valide, attestation de non-gage, CIN vendeur et acheteur.`
  },
  {
    keywords: ['auto-entrepreneur', 'autoentrepreneur', 'مبادر', 'ذاتي', 'freelance', 'فريلانس', 'patente', 'باتيندة', '1%'],
    content: `[AUTO-ENTREPRENEUR / المبادر الذاتي]
- Platform: www.autoentrepreneur.tn / auto-entrepreneur.tn (Inscription 100% gratuite)
- Impôt unique: ${AUTO_ENTREPRENEUR_RATES.servicesTaxRate * 100}% sur CA (Services, Freelance, IT, Design) / ${AUTO_ENTREPRENEUR_RATES.commerceTaxRate * 100}% (Commerce, Industrie)
- TVA: 0% (exonération totale Art. 13 Code TVA)
- Plafond CA: 75 000 DT/an (Services)
- Facturation en devises (EUR/USD) légale via BCT. Cotisation CNSS forfaitaire trimestrielle.`
  },
  {
    keywords: ['capes', 'كاباس', 'تربية', 'تعليم', 'concours', 'مناظرة', 'مناظرات'],
    content: `[CONCOURS CAPES — وزارة التربية]
- Recrutement: 1 250 postes (Maths 230, Arabe 200, Physique 180, SVT 160, Français 110, Anglais 95, Info 85, Histoire-Géo 80...)
- Diplôme: Licence ou Maîtrise dans la spécialité (Bac+3 min)
- Inscription: www.concours.gov.tn et www.edunet.tn
- Dossier: Formulaire imprimé, CIN certifiée, B3 < 3 mois, copie certifiée diplôme + relevés de notes, certificat médical, 2 enveloppes timbrées avec adresse.`
  },
  {
    keywords: ['steg', 'sonede', 'ستاغ', 'صوناد', 'كهرباء', 'ماء'],
    content: `[STEG & SONEDE]
- STEG: Concours Ingénieurs & Cadres (180 postes), Techniciens (350 postes) via www.steg.com.tn / www.concours.gov.tn.
- SONEDE: Ingénieurs hydrauliques/électromécaniques & agents via www.sonede.com.tn / www.concours.gov.tn.`
  },
  {
    keywords: ['cnss', 'retraite', 'تقاعد', 'ضمان اجتماعي'],
    content: `[CNSS RETRAITE / جراية التقاعد والشيخوخة]
- Authority: Caisse Nationale de Sécurité Sociale (CNSS)
- Conditions: 60 ans d'âge (ou 50 ans anticipée avec 180 trimestres) + 120 trimestres cotisés minimum.
- Cost: 0 DT (Gratuit) | Delay: 30 à 60 jours
- Required: Formulaire CNSS, relevé de carrière, certificat de cessation d'activité employeur, CIN, extrait de naissance, RIB bancaire.`
  },
  {
    keywords: ['cnam', 'كنام', 'علاج', 'carnet', 'soins'],
    content: `[CNAM CARNET DE SOINS / بطاقة علاج الكنام]
- Authority: Caisse Nationale d'Assurance Maladie (CNAM)
- Filières: Publique (hôpitaux publics), Privée (médecin de famille référent), Remboursement (70%).
- Changement de filière: 1er sept au 31 oct chaque année.
- Required: Attestation CNSS, formulaire adhésion, copie CIN, extraits de naissance famille, RIB.`
  },
  {
    keywords: ['permis', 'batir', 'bâtir', 'رخصة', 'بناء', 'بلدية', 'baladiya'],
    content: `[PERMIS DE BÂTIR / رخصة البناء البلدية]
- Authority: Municipalité (Baladiya) — Service Urbanisme
- Legal Delay: 45 jours (silence = accord tacite Art. 70 Code de l'Urbanisme)
- Total Cost: 50 à 200 DT
- Required: Plans d'architecte agréé (5 copies), certificat de propriété CPF (titre foncier), plan de situation, quittance taxe TIB (zebla w kharrouba).`
  },
  {
    keywords: ['hojjet', 'wafet', 'وفاة', 'حصر', 'إرث', 'ميراث', 'ورثة'],
    content: `[HOJJET WAFET / حجة الوفاة وحصر الإرث]
- Authority: 2 Notaires (Adoul Ichhad) + Homologation Juge Cantonal
- Cost: 35 DT (Adoul) + 10.000 DT (Enregistrement Recette) | Delay: 7 à 15 jours
- Required: Extrait de décès, extraits de naissance des héritiers, acte de mariage, 2 témoins majeurs avec CIN.`
  },
  {
    keywords: ['naissance', 'ولادة', 'مضمون', 'madhmoun'],
    content: `[DÉCLARATION DE NAISSANCE / التصريح بالولادة]
- Authority: Bureau d'État Civil de la Baladiya du lieu d'accouchement
- Legal Delay: 10 jours ouvrables impératifs (passé 10 jours, jugement au tribunal obligatoire)
- Cost: 0 DT (Gratuit) | Extrait: 0.500 DT
- Required: Certificat médical d'accouchement, livret de famille / acte de mariage, CIN du déclarant.`
  },
  {
    keywords: ['fcr', 'douane', 'ديوانة', 'ن.ت', 'rs', 'خارج'],
    content: `[FCR — Franchise Changement de Résidence / الامتياز الجبائي للسيارات للتونسيين بالخارج]
- Authority: Direction Générale des Douanes (الديوانة التونسية — douane.gov.tn)
- Conditions: Être Tunisien(ne) résidant à l'étranger (TRE) depuis 2 ans minimum sans avoir séjourné plus de 120 jours en Tunisie par période de 365 jours. Âge minimum 18 ans.
- Âge maximum du véhicule: 5 ans (véhicule de tourisme) / 7 ans (camionnette ou utilitaire).`
  },
  {
    keywords: ['visa', 'visas', 'فيزا', 'تأشيرة', 'canada', 'france', 'schengen', 'tls', 'vfs', 'كندا', 'فرنسا'],
    content: `[VISAS — CANADA & SCHENGEN / تأشيرات السفر من تونس]
- Visa Canada (IRCC / VFS Global): تقديم إلكتروني حصري عبر canada.ca (بوابة IRCC). أخذ البصمات بمركز VFS Global البحيرة 1 بتونس. الرسوم: 100 CAD (الطلب) + 85 CAD (البصمات).
- Visa France / Schengen (TLScontact / BLS): تقديم عبر france-visas.gouv.fr وحجز موعد بمركز TLScontact (تونس/صفاقس) أو BLS International. الرسوم: 90 EUR (حوالي 300 د.ت).`
  },
  {
    keywords: ['transtu', 'ترانستو', 'bus', 'metro', 'حافلة', 'مترو', 'كار', 'اشتراك', 'abonnement', 'نقل'],
    content: `[TRANSTU & TRANSPORT — اشتراك الكار والمترو والنقل العمومي بتونس]
- Authority: شركة نقل تونس (Transtu — transtu.tn) / مكاتب البريد التونسي / الشركات الجهوية للنقل (SRT)
- 1. الاشتراك المدرسي والجامعي: مطبوعة تسحب من المعهد/الكلية، 2 صور شمسية، نسخة CIN أو مضمون، وصل خلاص البريد. المعلوم: 10 إلى 15 د.ت.
- 2. الاشتراك العادي للعموم: يسحب من شبابيك الوكالات التجارية (TGM، ساحة برشلونة، باب عليوة، الباساج، سليمان كاهية).`
  }
];

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();

  // If query is just a greeting, return no heavy procedure knowledge
  if (GREETING_REGEX.test(query.trim())) {
    return '';
  }

  // Filter relevant knowledge chunks by keywords
  const matchedChunks = CIVIC_KNOWLEDGE_TOPICS.filter((topic) =>
    topic.keywords.some((kw) => q.includes(kw))
  );

  let context = '';
  if (matchedChunks.length > 0) {
    context = matchedChunks.map((c) => c.content).join('\n\n');
  } else {
    // Default baseline: top 2 frequent procedures
    context = CIVIC_KNOWLEDGE_TOPICS.slice(0, 2).map((c) => c.content).join('\n\n');
  }

  const civicMatch = queryCivicKnowledge(query, locale);
  if (civicMatch) context += '\n\n' + civicMatch;

  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 2);

  if (matchedProcedures.length > 0) {
    context += '\n\n=== MATCHED PROCEDURES ===\n';
    for (const proc of matchedProcedures) {
      const title = getLocalized(proc.title, 'ar') || proc.title.fr;
      const docs = proc.requiredDocuments.map((d) => `  - ${getLocalized(d.name, 'ar') || d.name.fr}`).join('\n');
      const costs = proc.costsBreakdown.map((c) => `  - ${getLocalized(c.label, 'ar') || c.label.fr}: ${c.amountTND} DT`).join('\n');
      context += `\nPROCEDURE: ${title}\nTotal Cost: ${proc.estimatedTotalCostTND} DT | Delay: ${getLocalized(proc.estimatedProcessingTime, 'ar') || proc.estimatedProcessingTime.fr}\nRequired Documents:\n${docs}\nCosts:\n${costs}\n`;
    }
  }

  if (q.includes('concours') || q.includes('مناظرة') || q.includes('مناظرات') || q.includes('capes') || q.includes('steg') || q.includes('sonede')) {
    const concoursContext = buildConcoursGroundingPrompt(query, locale);
    if (concoursContext) context += '\n\n' + concoursContext;
  }

  return context;
}

const IDAARA_MASTER_SYSTEM_PROMPT = `You are Idaara AI (Idaara.tn), the official Tunisian civic, legal, and public administration intelligent copilot.

CRITICAL INSTRUCTIONS & INTELLIGENT ROUTING:

1. MANDATORY UNIVERSAL LANGUAGE RULE — TUNISIAN DERJA IN ARABIC SCRIPT ONLY (NO MATTER WHAT):
- You MUST ALWAYS AND WITHOUT ANY EXCEPTION speak and respond in 100% authentic, fluent, and warm Tunisian Arabic Derja in ARABIC SCRIPT (الدارجة التونسية بالحروف العربية).
- NO MATTER WHAT language the user writes in (English, French, Standard Arabic, Latin Arabizi, Spanish, etc.) and NO MATTER what locale is selected, your entire output MUST ALWAYS be in Tunisian Arabic Derja in Arabic script.
- NEVER output responses in English. NEVER output responses in French. NEVER output responses in Modern Standard Arabic. NEVER output in Latin Arabizi.
- Translate and explain all foreign terms, requirements, steps, and procedures into natural Tunisian Derja in Arabic script (عسلامة، كيفاش، متاعك، شنوة، أوراق، تنابر، خلاص، باسبور، فيزا، كندا، فرنسا...).
- Keep only technical acronyms and domain URLs in Latin (CIN, B3, CAPES, ATTT, STEG, SONEDE, CNSS, CNAM, RNE, JORT, IRCC, VFS, CAD, DT, TND, PDF, www.concours.gov.tn, www.canada.ca).
- NEVER output raw <think> tags or chain-of-thought blocks.

2. STRICT DOMAIN BOUNDARIES & IDENTITY GUARDRAILS (YOU ARE IDAARA AI — NOT A GENERAL CODING/CHAT AI):
- YOU ARE STRICTLY AND EXCLUSIVELY the dedicated Tunisian civic, legal, and public administration AI copilot (خبير الإدارة والأوراق والبيروقراطية التونسية).
- IN-SCOPE CIVIC TOPICS: Tunisian administrative procedures (Passport, CIN, B3, Carte Grise, Permis), Tunisian taxes & fiscal stamps (القباضة والتنابر), public recruitment concours (STEG, SONEDE, CAPES), legal contracts & authorizations (عقود الكراء والتوكيلات), self-entrepreneur 1% & RNE business setup (المبادر الذاتي والشركات), CNSS/CNAM social security, deciphering official letters/fines (فسرلي أوراق القباضة والعدل المنفذ), and Visas/Travel from Tunisia (فيزا كندا، فيزا شنغن/فرنسا عبر TLS/VFS/IRCC).
- OUT-OF-SCOPE OFF-TOPIC QUESTIONS: Software engineering, coding commands (e.g. "npm run build 2>&1", writing Python/JavaScript/React code, database SQL queries), math homework, gaming, general chat.
- When an out-of-scope question is received:
  - DO NOT answer the technical/coding question.
  - Politely and wittily decline in authentic Tunisian Arabic Derja in ARABIC SCRIPT (الدارجة التونسية بالحروف العربية):
    "عسلامة! راهو أنا **Idaara AI** مخصص حصرياً للإجراءات، الأوراق، والبيروقراطية التونسية 🇹🇳 (موش للمطورين ولا البرمجة والكود 😄).
    
    تنجم تسألني على:
    - 🛂 **الأوراق والوثائق والتأشيرات**: باسبور، بطاقة تعريف (CIN)، بطاقة عدد 3، نقل ملكية سيارة (ATTT)، فيزا كندا وشنغن
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
    const { prompt: bodyPrompt, message, locale = 'derja', history = [], think = false } = body;

    // ── Input Sanitisation ────────────────────────────────────────────────────
    const MAX_MESSAGE_CHARS = 2000;
    const rawMessage: string =
      typeof (body as Record<string, unknown>)?.message === 'string'
        ? ((body as Record<string, unknown>).message as string)
        : typeof bodyPrompt === 'string'
        ? bodyPrompt
        : typeof message === 'string'
        ? message
        : '';
    if (!rawMessage.trim()) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }
    if (rawMessage.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Message too long. Maximum ${MAX_MESSAGE_CHARS} characters.` },
        { status: 400 }
      );
    }
    // Strip null bytes / dangerous control chars; preserve Arabic/Derja unicode
    const sanitisedMessage = rawMessage
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      .trim();
    // ── End Sanitisation ─────────────────────────────────────────────────────

    const prompt = sanitisedMessage;
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

    const isGreeting = GREETING_REGEX.test(prompt.trim());

    const thinkDirective = think
      ? `\n🧠 DEEP CIVIC THINKING & LEGAL REASONING MODE ACTIVATED:
- Perform an exhaustive, step-by-step statutory breakdown.
- Mention specific official decrees, legal deadlines, compound fiscal stamp breakdowns, exemptions, appeal processes, and potential pitfalls.`
      : '';

    const [groundingContext, liveFeed] = await Promise.all([
      buildGroundingContext(prompt, locale),
      isGreeting ? Promise.resolve('') : buildLiveGroundingFeed(),
    ]);

    const languageDirective = `\nCRITICAL UNIVERSAL DIRECTIVE — TUNISIAN ARABIC DERJA ONLY (NO MATTER WHAT):
- You MUST ALWAYS speak, formulate, and answer strictly in 100% authentic Tunisian Arabic Derja in ARABIC SCRIPT (الدارجة التونسية بالحروف العربية) NO MATTER WHAT language the user uses (English, French, Arabizi, Standard Arabic, etc.).
- NEVER respond in English, French, or Standard Arabic.
- Translate and explain all foreign terms, requirements, steps, and procedures into natural Tunisian Derja in Arabic script (e.g. "عسلامة! بالنسبة لفيزا كندا من تونس، هذي الأوراق والخطوات اللازمة:").
- STRICT DOMAIN BOUNDARY: If the user asks an off-topic question (coding like "npm run build", general chat), decline warmly in Tunisian Derja in character as Idaara AI.`;

    const greetingDirective = isGreeting
      ? `\nCRITICAL DIRECTIVE — GREETING INTENT DETECTED:
- The user has sent a greeting ('${prompt.trim()}').
- Respond in 2-4 lines of pure, warm Tunisian Arabic Derja in Arabic script (الدارجة التونسية).
- Welcome them to Idaara.tn, explain that you are their civic assistant for Tunisian administration, paperwork, stamps, and official procedures.
- Ask them: شنوة الإجراء ولا الورقة اللي تحب تقضيها ولا تستفسر عليها اليوم؟
- DO NOT dump procedural text, DO NOT mention Transtu, Visas, or Passports unprompted.`
      : '';

    const completeSystemPrompt = `${IDAARA_MASTER_SYSTEM_PROMPT}\n${languageDirective}\n${temporalDirective}${thinkDirective}${greetingDirective}\n${liveFeed}\n\n${groundingContext}`;

    // ─── TIER 1: Google Gemini 2.5 Flash (Master of Tunisian Derja & Civic Knowledge) ───
    const geminiKey = getGeminiKey();
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          systemInstruction: completeSystemPrompt,
          generationConfig: {
            temperature: think ? 0.1 : 0.25,
            maxOutputTokens: think ? 1600 : 1200,
            topP: 0.95,
          },
        });

        // Format history for Gemini chat (alternating user/model)
        const geminiHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
        for (const m of safeHistory) {
          geminiHistory.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          });
        }

        const chat = model.startChat({
          history: geminiHistory,
        });

        const geminiPromise = chat.sendMessage(prompt);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini request timed out')), 12000)
        );

        const geminiRes = await Promise.race([geminiPromise, timeoutPromise]);
        let reply = geminiRes.response.text();

        if (reply && reply.trim()) {
          reply = reply.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
          reply = reply.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();
          if (reply.length > 5) {
            return NextResponse.json({
              success: true,
              result: {
                content: reply,
                source: 'idaara-gemini-ai',
                providerName: 'Idaara AI',
              },
            });
          }
        }
      } catch (geminiErr) {
        console.warn('[Copilot Route] Gemini call failed, falling back to Groq:', geminiErr);
      }
    }

    // ─── TIER 2: Groq Multi-Model Cascade ───
    const apiKey = getGroqKey();

    const chatMessages = [
      { role: 'system', content: completeSystemPrompt },
      ...safeHistory.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: prompt },
    ];

    if (apiKey) {
      const groqModels = [
        'llama-3.3-70b-versatile',
        'llama-3.1-8b-instant',
      ];
      for (const model of groqModels) {
        try {
          const llmController = new AbortController();
          const llmTimeout = setTimeout(() => llmController.abort(), 12000);

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

  } catch (error: unknown) {
    console.error('[Copilot Route] Internal error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
