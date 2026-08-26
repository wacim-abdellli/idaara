import { proceduresData, getProcedureById } from '../data/procedures';
import { Procedure } from '../types/procedure';
import { ChatMessageAction } from '../types/chat';
import { getLocalized } from './locale-utils';
import { SupportedLanguage } from '../data/translations';

export interface ReasonerResponse {
  content: string;
  relatedProcedureId?: string;
  actions?: ChatMessageAction[];
  timbreBreakdown?: {
    totalTND: number;
    items: Array<{ label: string; amount: number }>;
  };
}

// Smart prompt language detector:
// Detects whether the user wants Arabic/Derja, French, or English.
// When user writes in Arabic, Derja, or Arabizi (or casual greetings like "hi"),
// the response is ALWAYS in authentic Tunisian Arabic Derja (بالحروف العربية).
function resolveResponseLanguage(prompt: string, uiLocale: SupportedLanguage | string): 'ar' | 'derja' | 'fr' | 'en' {
  const q = prompt.toLowerCase().trim();

  // 1. Check for Arabic script
  if (/[\u0600-\u06FF]/.test(prompt)) {
    return 'ar';
  }

  // 2. Check for explicit English queries
  if (/^(how|what|where|can i|please|is it|how to|why|tell me)\b/i.test(q)) {
    return 'en';
  }

  // 3. Check for explicit French queries
  if (/^(comment|quels|quelles|combien|est-ce|bonjour|pourriez|je veux|faire|obtenir|renouveler)\b/i.test(q)) {
    return 'fr';
  }

  // 4. Default to Tunisian Arabic Derja for all other prompts (including Arabizi, 'hi', 'salam', etc.)
  if (uiLocale === 'en' && q.length > 8) return 'en';
  if (uiLocale === 'fr' && q.length > 8 && !/(\b(kifech|chnowa|lezem|bech|mte3|3aslema|ahla|win)\b)/i.test(q)) return 'fr';
  return 'derja';
}

export function parseAndReason(prompt: string, locale: SupportedLanguage | string = 'derja'): ReasonerResponse {
  const query = prompt.toLowerCase().trim();
  const lang = resolveResponseLanguage(prompt, locale);

  // Check if student/pupil context is present
  const isStudent =
    query.includes('etudient') ||
    query.includes('etudiant') ||
    query.includes('talib') ||
    query.includes('telmidth') ||
    query.includes('طالب') ||
    query.includes('تلميذ') ||
    query.includes('pupil') ||
    query.includes('student');

  // ── 1. PASSPORT (جواز السفر) ───────────────────────────────────────────────
  if (
    query.includes('passeport') ||
    query.includes('passport') ||
    query.includes('safra') ||
    query.includes('voyage') ||
    query.includes('جواز') ||
    query.includes('سفر')
  ) {
    const p = getProcedureById('passeport-renouvellement');

    return formatProcedureResponse(p, lang, {
      derja: isStudent
        ? "بما أنك تلميذ أو طالب (Étudiant)، معلوم جواز السفر التونسي متاعك هو **25 د.ت فقط** (عوضاً عن 80 د.ت)!\n\nالأوراق المطلوبة:\n1. **تنبير جبائي بـ 25 DT** (يلزمك شهادة حضور أصلية من المعهد أو الكلية)\n2. **4 تصاور شمسية جدد** بخلفية بيضاء\n3. **نسخة من بطاقة التعريف الوطنية (CIN)** مع الأصل للاستظهار\n4. **جواز السفر القديم** (في حالة التجديد)\n\nيُودع الملف بمركز الشرطة أو الحرس الوطني مرجع النظر، ويحضر في غضون **7 إلى 15 يوم عمل**."
        : "باش تبدل أو تطلع جواز السفر التونسي يلزمك الأوراق التالية:\n1. **تنبير جبائي بقيمة 80 DT** (أو 25 DT للطلبة والتلاميذ بشهادة حضور)\n2. **4 تصاور شمسية جدد** بخلفية بيضاء\n3. **نسخة من بطاقة التعريف الوطنية (CIN)** مع الأصل\n4. **جواز السفر القديم**\n\nالملف يُودع في مركز الشرطة أو الحرس الوطني مرجع النظر لسكناك، وياخو بين **7 و 15 يوم عمل** باش يحضر.",
      fr: isStudent
        ? "En tant qu'élève ou étudiant, vous bénéficiez du tarif réduit de **25 TND** (au lieu de 80 TND) pour le passeport tunisien.\n\nPièces requises :\n1. Timbre fiscal de **25 TND** + Certificat de scolarité / d'inscription universitaire original\n2. 4 photos d'identité récentes sur fond blanc\n3. Copie de la CIN (originale requise au dépôt)\n4. L'ancien passeport (si renouvellement)\n\nDépôt au poste de police ou brigade de la garde nationale sous 7 à 15 jours."
        : "Pour renouveler votre passeport tunisien, vous devez fournir un timbre fiscal de 80 TND (25 TND pour élèves/étudiants), 4 photos d'identité récentes sur fond blanc, une copie de la CIN et l'ancien passeport. Le dépôt s'effectue au poste de police ou brigade de la garde nationale de votre circonscription sous 7 à 15 jours.",
      ar: isStudent
        ? "بصفتك تلميذاً أو طالباً، تتمتع بالمعلوم المخفض لجواز السفر التونسي وقدره **25 ديناراً فقط** (عوضاً عن 80 ديناراً).\n\nالأوراق المطلوبة:\n1. **طابع جبائي بقيمة 25 د.ت** + شهادة حضور مدرسية أو ترسيم جامعي أصلية حديثة\n2. **4 صور شمسية حديثة** بخلفية بيضاء\n3. **نسخة من بطاقة التعريف الوطنية (CIN)** مع الاستظهار بالأصل\n4. **جواز السفر القديم** في حالة التجديد\n\nيُودع الملف بمركز الأمن الوطني أو الحرس الوطني لمرجع النظر، ويستغرق من **7 إلى 15 يوماً**."
        : "لتجديد جواز السفر التونسي، يتطلب الملف طابعاً جبائياً بقيمة 80 ديناراً (أو 25 ديناراً للتلاميذ والطلبة)، 4 صور شمسية خلفية بيضاء، بطاقة التعريف الوطنية وجواز السفر القديم. يُودع الملف بمركز الأمن الوطني أو الحرس الوطني لمرجع النظر ويستغرق من 7 إلى 15 يوماً.",
      en: isStudent
        ? "As a student or pupil, you are eligible for the reduced **25 TND** fiscal stamp (instead of 80 TND) for your Tunisian passport.\n\nRequired documents:\n1. **25 TND fiscal stamp** + Original valid student registration certificate\n2. **4 recent white-background photos**\n3. **National ID (CIN) copy** + original for verification\n4. **Expiring passport**\n\nSubmit at your local Police or National Guard station (processing time: 7-15 days)."
        : "To renew your Tunisian passport, you must provide an 80 TND fiscal stamp (25 TND for students/pupils), 4 recent white-background photos, a copy of your National ID (CIN), and your expiring passport. Submit your file to your local Police or National Guard station (processing time: 7-15 days).",
    });
  }

  // ── 2. CARTE GRISE (البطاقة الرمادية) ─────────────────────────────────────
  if (
    query.includes('carte grise') ||
    query.includes('karhba') ||
    query.includes('sayara') ||
    query.includes('mutation') ||
    query.includes('chrit') ||
    query.includes('رمادية') ||
    query.includes('سيارة')
  ) {
    const p = getProcedureById('mutation-carte-grise');
    return formatProcedureResponse(p, lang, {
      derja: "باش تبدل البطاقة الرمادية بعد ما شريت كرهبة مستعملة يلزمك الأوراق هذي:\n1. **عقد بيع سيارة** مصحح ومعرف بالإمضاء في البلدية ومسجل في القباضة المالية\n2. **البطاقة الرمادية الأصلية مشطوبة** من البائع\n3. **شهادة فحص فني (Visite technique)** سارية المفعول\n4. **وصل خلاص معلوم الجولان (Vignette)**\n\nالملف يتصب لدى أقرب مركز للوكالة الفنية للنقل البري (ATTT)، والمعلوم التقديري حوالي **145 د.ت**.",
      fr: "Pour la mutation de carte grise après l'achat d'un véhicule d'occasion, préparez :\n1. L'acte de vente légalisé à la Baladiya et enregistré à la Recette des Finances\n2. La carte grise originale barrée\n3. Un certificat de visite technique valide\n4. La quittance de la taxe de circulation (Vignette)\n\nLe dossier est à déposer auprès du centre ATTT territorialement compétent (frais moyens : ~145 DT).",
      ar: "لتحويل ملكية البطاقة الرمادية بعد شراء سيارة مستعملة، يتطلب الملف:\n1. عقد بيع مصادق عليه بالبلدية ومسجل بالقباضة المالية\n2. البطاقة الرمادية الأصلية مشطوبة\n3. شهادة فحص فني سارية المفعول\n4. وصل خلاص معلوم الجولان (Vignette)\n\nيُودع الملف لدى الوكالة الفنية للنقل البري (ATTT). التكلفة التقديرية حوالي 145 ديناراً.",
      en: "For vehicle registration transfer (Carte Grise), you must provide:\n1. Bill of sale legalized at the Baladiya and registered at the Tax Office\n2. Original crossed-out registration card\n3. Valid technical inspection certificate\n4. Road tax receipt (Vignette)\n\nSubmit the file to your regional ATTT office (approx. total fees: 145 DT).",
    });
  }

  // ── 3. BULLETIN N°3 (بطاقة السوابق العدلية) ────────────────────────────────
  if (
    query.includes('b3') ||
    query.includes('bulletin') ||
    query.includes('sawabi9') ||
    query.includes('casier') ||
    query.includes('عدلية') ||
    query.includes('سوابق')
  ) {
    const p = getProcedureById('bulletin-3-b3');
    return formatProcedureResponse(p, lang, {
      derja: "باش تاخذ بطاقة السوابق العدلية (بطاقة عدد 3 - B3):\n1. **تنبير جبائي بقيمة 7.500 د.ت**\n2. **نسخة من بطاقة التعريف الوطنية (CIN)**\n3. **مضمون ولادة أصلي** (عند الاقتضاء)\n\nتنجم تقدم المطلب مباشرة عبر الإنترنت في موقع وزارة الداخلية (b3.interieur.gov.tn) والتوصيل يجيك بالبريد السريع Rapide-Poste، ولا تودع الملف في مركز الشرطة أو الحرس الوطني. تاخذ بين **3 و 8 أيام**.",
      fr: "Pour obtenir votre Bulletin N°3 (Casier judiciaire) :\n1. Timbre fiscal de 7.500 TND\n2. Copie conforme de la CIN\n3. Extrait de naissance pour les premières demandes\n\nVous pouvez effectuer la demande en ligne sur b3.interieur.gov.tn ou directement au commissariat de police (Délai : 3 à 8 jours).",
      ar: "للحصول على بطاقة السوابق العدلية (بطاقة عدد 3) :\n1. طابع جبائي بقيمة 7.500 دينار\n2. نسخة من بطاقة التعريف الوطنية\n3. مضمون ولادة أصلي عند الاقتضاء\n\nيمكنك إيداع المطلب إلكترونياً عبر موقع وزارة الداخلية (b3.interieur.gov.tn) أو مباشرة بمركز الأمن (الآجال: 3 إلى 8 أيام).",
      en: "To obtain your Criminal Record Certificate (Bulletin N°3) :\n1. 7.500 TND fiscal stamp\n2. Copy of National ID card (CIN)\n3. Original birth certificate if requested\n\nYou can apply online at b3.interieur.gov.tn or at your local police station (Processing: 3 to 8 days).",
    });
  }

  // ── 4. AUTO-ENTREPRENEUR (المبادر الذاتي 1%) ──────────────────────────────
  if (
    query.includes('auto') ||
    query.includes('entrepreneur') ||
    query.includes('freelance') ||
    query.includes('moubeder') ||
    query.includes('patente') ||
    query.includes('مبادر')
  ) {
    const p = getProcedureById('auto-entrepreneur-creation') || proceduresData[0];
    return {
      content:
        lang === 'fr'
          ? "Le statut Auto-Entrepreneur en Tunisie offre un régime libératoire au taux unique de 1% sur le chiffre d'affaires pour les freelances et prestataires de services, avec exonération totale de TVA et facturation devises conforme BCT. L'inscription est 100% gratuite sur la plateforme nationale."
          : lang === 'en'
          ? "The Tunisian Auto-Entrepreneur status grants a 1% flat income tax rate for service freelancers and tech developers, with 0% VAT on exports and legal foreign currency repatriation (BCT). Registration is completely free on the national portal."
          : "نظام المبادر الذاتي في تونس يمنحك ضريبة موحدة ومخفضة بنسبة **1% فقط** على رقم المعاملات للأنشطة الخدماتية والفريلانس، مع إعفاء كامل من الأداء على القيمة المضافة (0% TVA)، وتغطية صحية واجتماعية (CNSS)، وحق فوترة التصدير بالعملة الصعبة (EUR/USD) بطريقة قانونية معتمدة من البنك المركزي. التسجيل مجاني بالكامل على المنصة الوطنية.",
      relatedProcedureId: p.id,
      timbreBreakdown: {
        totalTND: 0,
        items: [{ label: lang === 'fr' ? 'Inscription plateforme (Gratuit)' : 'التسجيل بالمنصة الوطنية (مجاني)', amount: 0 }],
      },
      actions: [
        {
          label: { derja: '🚀 فضاء المستقل 1%', fr: 'Espace Freelance & 1%', ar: 'فضاء المبادر الذاتي', en: 'Freelance Hub' },
          type: 'procedure_link',
          payload: '/launchpad',
        },
      ],
    };
  }

  // ── 5. RESIDENTIAL LEASE CONTRACT (عقد الكراء) ─────────────────────────────
  if (
    query.includes('bail') ||
    query.includes('location') ||
    query.includes('kre') ||
    query.includes('kiraa') ||
    query.includes('dar') ||
    query.includes('كراء') ||
    query.includes('عقد')
  ) {
    const p = getProcedureById('contrat-location-residentiel') || proceduresData[0];
    return {
      content:
        lang === 'fr'
          ? "Pour un contrat de bail résidentiel conforme, remplissez le contrat officiel conforme au Code des Obligations, effectuez la légalisation des signatures à la Baladiya (5 DT de timbre municipal par copie) et l'enregistrement à la Recette des Finances (30 DT)."
          : lang === 'en'
          ? "For a valid residential lease contract in Tunisia, complete the official agreement, legalize signatures in person at the Baladiya (5 DT municipal stamp per copy), and register it at the Recette des Finances (30 DT registration fee) within 60 days."
          : "باش تعمل عقد كراء سكني قانوني ومريقل:\n1. عمر نموذج العقد المطابق لمجلة الالتزامات والعقود التونسية\n2. امشِ للبلدية للتعريف بالإمضاء (معلوم بلدي 5 د.ت للنسخة)\n3. سجلو وجوباً بالقباضة المالية (معلوم التسجيل 30 د.ت) في أجل لا يتجاوز 60 يوماً لحماية حقوق الطرفين.",
      relatedProcedureId: p.id,
      timbreBreakdown: {
        totalTND: 35.0,
        items: [
          { label: 'Enregistrement Recette (تسجيل القباضة)', amount: 30.0 },
          { label: 'Timbre Baladiya (معلوم البلدية)', amount: 5.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📄 استخراج عقد كراء PDF', fr: 'Générer Contrat de Bail PDF', ar: 'استخراج عقد كراء PDF', en: 'Generate Lease PDF' },
          type: 'pdf_form',
          payload: '/documents/contrat-location',
        },
      ],
    };
  }

  // ── 6. RETRAITE CNSS (جراية التقاعد) ──────────────────────────────────────
  if (
    query.includes('retraite') ||
    query.includes('pension') ||
    query.includes('ta9a3od') ||
    query.includes('ta9a3ed') ||
    query.includes('تقاعد') ||
    query.includes('شيخوخة') ||
    query.includes('جراية')
  ) {
    const p = getProcedureById('cnss-retraite-pension');
    return {
      content:
        lang === 'fr'
          ? "Pour liquider votre pension de retraite CNSS en Tunisie, vous devez avoir atteint 60 ans (ou 50 ans avec 180 trimestres pour retraite anticipée) et justifier d'au moins 120 trimestres cotisés. Pièces requises : Formulaire CNSS, relevé de carrière, certificat de cessation d'activité de l'employeur, RIB bancaire et extrait de naissance."
          : lang === 'en'
          ? "To claim your CNSS retirement pension in Tunisia, you must reach the legal age (60 years, or 50 for early retirement with 180 quarters) and have at least 120 validated quarters. Required dossier: CNSS retirement form, career statement, employer cessation of activity certificate, bank RIB, and birth certificate."
          : "باش تصب ملف جراية التقاعد في الـ CNSS، يلزم تكون بلغت السن القانونية (60 سنة عموماً أو 50 سنة للتقاعد النسبي بشرط 180 ثلاثية) وتكون مصرح بـ 120 ثلاثية على الأقل.\n\nالأوراق المطلوبة:\n- مطبوعة جراية الشيخوخة من الصندوق\n- كشف الحياة المهنية (Relevé de carrière)\n- شهادة في التوقف عن العمل مسلّمة من آخر مؤجر\n- نسخة من بطاقة التعريف الوطنية و كشف هوية بنكية (RIB)\n- مضمون ولادة أصلي حديث.",
      relatedProcedureId: p?.id || 'cnss-retraite-pension',
      timbreBreakdown: {
        totalTND: 0,
        items: [{ label: 'إيداع الملف بالصندوق (مجاني)', amount: 0 }],
      },
      actions: [
        {
          label: { derja: '📋 دليل جراية التقاعد', fr: 'Démarche Retraite CNSS', ar: 'دليل جراية التقاعد', en: 'Retirement Guide' },
          type: 'procedure_link',
          payload: '/procedures/cnss-retraite-pension',
        },
      ],
    };
  }

  // ── 7. PERMIS DE BÂTIR (رخصة البناء) ──────────────────────────────────────
  if (
    query.includes('batir') ||
    query.includes('construire') ||
    query.includes('bnina') ||
    query.includes('bne') ||
    query.includes('بناء') ||
    query.includes('رخصة بناء') ||
    query.includes('رخصة البناء')
  ) {
    const p = getProcedureById('permis-de-batir');
    return {
      content:
        lang === 'fr'
          ? "Pour obtenir un permis de bâtir municipal en Tunisie, préparez : 5 exemplaires des plans visés par un architecte agréé, un certificat de propriété récent de la CPF, un plan de situation, et la quittance de la taxe des immeubles (TIB). Le délai légal d'instruction municipal est de 45 jours."
          : lang === 'en'
          ? "To obtain a municipal building permit (Permis de Bâtir) in Tunisia, you must submit: 5 copies of architectural plans certified by a registered architect, an updated property title from CPF, a site plan, and property tax receipt (TIB). The statutory response delay is 45 days."
          : "باش تاخذ رخصة بناء من البلدية، يلزمك تحضر الملف التالي:\n1. **5 نسخ من الأمثلة الهندسية** مصادق عليها من مهندس معماري مرسم بعمادة المهندسين\n2. **شهادة ملكية أصلية وحديثة** من إدارة الملكية العقارية (CPF)\n3. **مثال موقعي** يوضح مكان العقار\n4. **وصل خلاص الأداء البلدي** على العقارات المبنية (الزبلة والخروبة)\n\nالأجل القانوني لرد البلدية هو **45 يوماً** من تاريخ إيداع المطلب بمكتب الضبط.",
      relatedProcedureId: p?.id || 'permis-de-batir',
      timbreBreakdown: {
        totalTND: 120.0,
        items: [
          { label: 'معلوم رخصة البناء البلدية', amount: 80.0 },
          { label: 'تنابر ورسوم التصفيف', amount: 40.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📋 ملف رخصة البناء', fr: 'Dossier Permis de Bâtir', ar: 'ملف رخصة البناء', en: 'Building Permit Guide' },
          type: 'procedure_link',
          payload: '/procedures/permis-de-batir',
        },
      ],
    };
  }

  // ── 8. HOJJET WAFET / HERITAGE (حجة الوفاة وحصر الإرث) ────────────────────
  if (
    query.includes('wafet') ||
    query.includes('heritage') ||
    query.includes('irth') ||
    query.includes('terka') ||
    query.includes('hojja') ||
    query.includes('وفاة') ||
    query.includes('إرث') ||
    query.includes('حجة وفاة') ||
    query.includes('تركة')
  ) {
    const p = getProcedureById('hojjet-wafet-heritage');
    return {
      content:
        lang === 'fr'
          ? "Pour établir une Hojjet Wafet (acte de notoriété après décès) en Tunisie, rendez-vous chez deux notaires (Adoul Ichhad) avec l'extrait de décès, les extraits de naissance de tous les héritiers, l'acte de mariage et 2 témoins majeurs. L'acte est ensuite enregistré à la Recette et homologué par le juge cantonal pour débloquer les comptes et biens."
          : lang === 'en'
          ? "To obtain a Certificate of Inheritance (Hojjet Wafet) in Tunisia, visit two certified notaries (Adoul) with the deceased's death certificate, birth certificates of all heirs, marriage contract, and 2 adult witnesses. Once drafted, register it at the Tax Office and obtain cantonal judge approval to unfreeze bank accounts and transfer properties."
          : "باش تخرج حجة الوفاة وحصر الإرث في تونس:\n1. توجه لـ **2 عدول إشهاد** مصحوباً بمضمون وفاة الهالك، مضامين ولادة الورثة الشرعيين الكل، وعقد الزواج أو الدفتر العائلي\n2. يلزم حضور **2 شهود رشداء** حاملين لبطاقات تعريفهم الوطنية\n3. بعد تحرير الحجة، يتم تسجيلها بالقباضة المالية ومصادقة قاضي الناحية عليها لتمكين الورثة من التصرف في التركة والحسابات البنكية.",
      relatedProcedureId: p?.id || 'hojjet-wafet-heritage',
      timbreBreakdown: {
        totalTND: 45.0,
        items: [
          { label: 'أتعاب عدلي الإشهاد', amount: 35.0 },
          { label: 'معلوم تسجيل القباضة', amount: 10.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📋 دليل حجة الوفاة والإرث', fr: 'Démarche Hojjet Wafet', ar: 'دليل حجة الوفاة والإرث', en: 'Inheritance Guide' },
          type: 'procedure_link',
          payload: '/procedures/hojjet-wafet-heritage',
        },
      ],
    };
  }

  // ── 9. DECLARATION DE PERTE (تصريح بالضياع) ────────────────────────────────
  if (
    query.includes('dha3et') ||
    query.includes('dha3li') ||
    query.includes('dhaya3') ||
    query.includes('perte') ||
    query.includes('perdu') ||
    query.includes('ضياع') ||
    query.includes('ضاعت') ||
    query.includes('تصريح بضياع')
  ) {
    return {
      content:
        lang === 'fr'
          ? "En cas de perte d'un document officiel (CIN, Passeport, Carte Grise), générez une déclaration sur l'honneur de perte, faites légaliser votre signature à la Baladiya (timbre municipal 3 DT), puis déposez-la au poste de police pour obtenir l'attestation de perte."
          : lang === 'en'
          ? "If you have lost an official document (National ID, Passport, Registration Card), generate a Sworn Declaration of Loss, legalize it at the Baladiya (3 TND municipal stamp), and present it at your police station to obtain the official loss certificate for duplicate issuance."
          : "في حالة ضياع وثيقة رسمية (بطاقة تعريف، جواز سفر، بطاقة رمادية):\n1. استخرج تصريحاً بالضياع على الشرف وعمره بالبيانات المطلوبة\n2. عرّف بالإمضاء عليه في البلدية (معلوم بلدي 3 د.ت)\n3. هز التصريح لمركز الشرطة أو الحرس الوطني مرجع النظر باش تاخذ **شهادة ضياع رسمية** تقدمها في ملف استخراج النظير.",
      timbreBreakdown: {
        totalTND: 3.0,
        items: [{ label: 'طابع بلدي تصريح بالضياع', amount: 3.0 }],
      },
      actions: [
        {
          label: { derja: '📄 استخراج تصريح بضياع PDF', fr: 'Générer Déclaration de Perte PDF', ar: 'استخراج تصريح بالضياع PDF', en: 'Generate Loss PDF' },
          type: 'pdf_form',
          payload: '/documents/declaration-perte',
        },
      ],
    };
  }

  // ── 10. CONCOURS (المناظرات الوطنية) ──────────────────────────────────────
  if (
    query.includes('concour') ||
    query.includes('intidhab') ||
    query.includes('recrutement') ||
    query.includes('مناظرة') ||
    query.includes('انتداب') ||
    query.includes('وظيفة') ||
    query.includes('steg') ||
    query.includes('sonede') ||
    query.includes('capes') ||
    query.includes('mouhandsin')
  ) {
    return {
      content:
        lang === 'fr'
          ? "Concours nationaux de la fonction publique actuellement ouverts en Tunisie (2026) :\n1. **STEG** : Recrutement de 180 Ingénieurs & Cadres techniques (Délai : 25 Mars 2026)\n2. **Ministère de l'Éducation (CAPES)** : 1 250 Professeurs d'enseignement secondaire (Délai : 10 Avril 2026)\n3. **SONEDE** : 95 Techniciens Supérieurs en Hydraulique & Électromécanique (Délai : 30 Mars 2026)\n4. **Ministère des Finances (DGI)** : 110 Inspecteurs & Contrôleurs des Impôts (Délai : 18 Avril 2026)\n\nL'inscription s'effectue obligatoirement sur **www.concours.gov.tn**. Pièces requises : Fiche imprimée, copie conforme CIN, diplôme et extrait de casier B3 récent."
          : lang === 'en'
          ? "Currently active Tunisian national public competitions (2026):\n1. **STEG**: Recruitment of 180 Power, Systems & IT Engineers (Deadline: March 25, 2026)\n2. **Ministry of Education (CAPES)**: 1,250 Secondary School Teachers (Deadline: April 10, 2026)\n3. **SONEDE**: 95 Hydraulic & Mechanical Senior Techs (Deadline: March 30, 2026)\n4. **Ministry of Finance (DGI)**: 110 Tax Inspectors & Audit Officers (Deadline: April 18, 2026)\n\nPreliminary registration is mandatory on **www.concours.gov.tn**. Required dossier: Printed application receipt, certified copy of National ID (CIN), certified degree, and recent Bulletin N°3 (< 3 months)."
          : "أهم المناظرات الوطنية المفتوحة بالوظيفة العمومية والمؤسسات الوطنية لسنة 2026:\n1. **الشركة التونسية للكهرباء والغاز (STEG)**: انتداب 180 مهندساً وإطاراً فنياً (آخر أجل: 25 مارس 2026)\n2. **وزارة التربية (الكاباس CAPES)**: انتداب 1250 أستاذ تعليم ثانوي (آخر أجل: 10 أفريل 2026)\n3. **الشركة الوطنية لاستغلال وتوزيع المياه (SONEDE)**: انتداب 95 تقنياً سامياً (آخر أجل: 30 مارس 2026)\n4. **وزارة المالية (الجباية والقباضات)**: انتداب 110 متفقدين ومراقبي أداءات (آخر أجل: 18 أفريل 2026)\n\nالتسجيل الأولي يتم وجوباً عبر البوابة الرسمية **www.concours.gov.tn** مع إعداد ملف يحتوي على استمارة الترشح، نسخة مطابقة للأصل من بطاقة التعريف والشهادة العلمية، وبطاقة عدد 3 حديثة.",
      actions: [
        {
          label: { derja: '💼 رادار المناظرات', fr: 'Radar des Concours', ar: 'رادار المناظرات', en: 'Concours Radar' },
          type: 'procedure_link',
          payload: '/concours',
        },
        {
          label: { derja: '📋 دليل الإجراءات', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
          type: 'procedure_link',
          payload: '/procedures',
        },
      ],
    };
  }

  // ── 11. GREETINGS (عسلامة / مرحبا / HI) ──────────────────────────────────
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query === '3aslema' ||
    query === 'ahla' ||
    query === 'bonjour' ||
    query === 'salut' ||
    query === 'salam' ||
    query === 'مرحبا' ||
    query === 'سلام' ||
    query === 'عسلامة' ||
    query === 'أهلا' ||
    query.startsWith('3aslema') ||
    query.startsWith('bonjour') ||
    query.startsWith('salam') ||
    query.startsWith('عسلامة')
  ) {
    return {
      content:
        lang === 'fr'
          ? "Bonjour ! Bienvenue sur **Idaara.tn**. Posez toutes vos questions sur les démarches administratives tunisiennes, les concours publics et le calcul des timbres fiscaux."
          : lang === 'en'
          ? "Hello! Welcome to **Idaara.tn**. Ask me anything about Tunisian administrative procedures, public concours, legal PDF contracts, or fiscal stamp calculations."
          : "عسلامة ومرحباً بك في **Idaara.tn**! 🇹🇳\n\nأنا المساعد الإداري الذكي متاعك، تنجم تسألني بالدارجة على أي إجراء إداري، وثيقة رسمية، أو مناظرة عمومية:\n- **جواز السفر وبطاقة التعريف (CIN)** (الأوراق، التنابر والآجال)\n- **البطاقة الرمادية ورخص السياقة (ATTT)**\n- **بطاقة السوابق العدلية (بطاقة عدد 3 - B3)**\n- **المناظرات الوطنية المفتوحة** (STEG، كاباس، SONEDE)\n- **عقود الكراء والتوكيلات الرسمية** (PDF جاهز للبلدية)\n- **نظام المبادر الذاتي 1% وفواتير التصدير**\n\nشنوة تحب تقضي ولا تستفسر عليه بالضبط؟",
      actions: [
        {
          label: { derja: '💼 رادار المناظرات', fr: 'Radar des Concours', ar: 'رادار المناظرات', en: 'Concours Radar' },
          type: 'procedure_link',
          payload: '/concours',
        },
        {
          label: { derja: '📋 دليل الإجراءات', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
          type: 'procedure_link',
          payload: '/procedures',
        },
        {
          label: { derja: '🧮 حاسبة التنابر', fr: 'Calculateur de Timbres', ar: 'حاسبة التنابر', en: 'Stamp Calculator' },
          type: 'calculator_link',
          payload: '/calculator',
        },
      ],
    };
  }

  // ── 12. DYNAMIC PROCEDURE MATCHING ─────────────────────────────────────────
  const matchedProcedure = proceduresData.find((p) => {
    const title = getLocalized(p.title, 'fr').toLowerCase();
    const titleAr = getLocalized(p.title, 'ar').toLowerCase();
    const tags = p.tags.map((t) => t.toLowerCase());
    return (
      query.split(' ').some((word) => word.length > 2 && (title.includes(word) || titleAr.includes(word) || tags.includes(word)))
    );
  });

  if (matchedProcedure) {
    const isArabicOrDerja = lang === 'ar' || lang === 'derja';
    const title = getLocalized(matchedProcedure.title, isArabicOrDerja ? 'ar' : lang);
    const desc = getLocalized(matchedProcedure.shortDescription, isArabicOrDerja ? 'ar' : lang);
    const delay = getLocalized(matchedProcedure.estimatedProcessingTime, isArabicOrDerja ? 'ar' : lang);
    const cost = matchedProcedure.estimatedTotalCostTND;

    return {
      content:
        isArabicOrDerja
          ? `بخصوص **${title}**:\n${desc}\n\n- **المدة التقديرية للجاهزية**: ${delay}\n- **الميزانية التقديرية للتنابر والمعاليم**: ${cost.toFixed(3)} د.ت`
          : lang === 'en'
          ? `Regarding **${title}**:\n${desc}\n\n- Estimated Processing Time: ${delay}\n- Estimated Statutory Cost: ${cost.toFixed(3)} TND`
          : `Concernant **${title}** :\n${desc}\n\n- Délai moyen estimé : ${delay}\n- Budget estimé des frais et timbres : ${cost.toFixed(3)} DT`,
      relatedProcedureId: matchedProcedure.id,
      timbreBreakdown: {
        totalTND: cost,
        items: matchedProcedure.costsBreakdown.map((c) => ({
          label: getLocalized(c.label, isArabicOrDerja ? 'ar' : lang),
          amount: c.amountTND,
        })),
      },
      actions: [
        {
          label: { derja: '📋 تفاصيل الإجراء كامل', fr: 'Consulter la démarche', ar: 'تفاصيل الإجراء', en: 'View Procedure' },
          type: 'procedure_link',
          payload: `/procedures/${matchedProcedure.id}`,
        },
        {
          label: { derja: '🧮 احسب التنابر', fr: 'Calculer Timbres', ar: 'حاسبة التنابر', en: 'Stamp Calculator' },
          type: 'calculator_link',
          payload: `/calculator?proc=${matchedProcedure.id}`,
        },
      ],
    };
  }

  // ── 13. FALLBACK CONTEXTUAL RESPONSE ───────────────────────────────────────
  return {
    content:
      lang === 'fr'
        ? "Merci pour votre question. Vous pouvez me poser toutes vos questions en Derja, Français ou Arabe sur les démarches administratives, concours publics ou timbres fiscaux (ex: renouvellement de passeport, carte grise, bulletin N°3, concours STEG, contrat de bail, ou statut auto-entrepreneur)."
        : lang === 'en'
        ? "Thank you for your question. You can ask me in Derja, Arabic, or English about any Tunisian administrative procedure, public exam, or fiscal stamp (e.g. Passport renewal, Vehicle registration, B3 record, STEG concours, Lease contracts, or 1% Auto-Entrepreneur tax)."
        : "شكراً على سؤالك. تنجم تسألني بالدارجة التونسية على أي وثيقة إدارية، إجراء رسمي، أو مناظرة عمومية (مثل: تجديد جواز السفر، البطاقة الرمادية، بطاقة عدد 3، مناظرة STEG، عقود الكراء، المبادر الذاتي، أو حساب التنابر والمعاليم).",
    actions: [
      {
        label: { derja: '💼 رادار المناظرات', fr: 'Radar des Concours', ar: 'رادار المناظرات', en: 'Concours Radar' },
        type: 'procedure_link',
        payload: '/concours',
      },
      {
        label: { derja: '📋 دليل الإجراءات', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
        type: 'procedure_link',
        payload: '/procedures',
      },
      {
        label: { derja: '🧮 حاسبة التنابر', fr: 'Calculateur de Timbres', ar: 'حاسبة التنابر', en: 'Stamp Calculator' },
        type: 'calculator_link',
        payload: '/calculator',
      },
    ],
  };
}

function formatProcedureResponse(
  p: Procedure | undefined,
  lang: 'derja' | 'fr' | 'ar' | 'en',
  contentMap: { derja: string; fr: string; ar: string; en: string }
): ReasonerResponse {
  if (!p) {
    return {
      content: contentMap[lang],
      actions: [],
    };
  }

  const isArabicOrDerja = lang === 'ar' || lang === 'derja';

  return {
    content: contentMap[lang],
    relatedProcedureId: p.id,
    timbreBreakdown: {
      totalTND: p.estimatedTotalCostTND,
      items: p.costsBreakdown.map((c) => ({
        label: getLocalized(c.label, isArabicOrDerja ? 'ar' : lang),
        amount: c.amountTND,
      })),
    },
    actions: [
      {
        label: { derja: '📋 تفاصيل الإجراء كامل', fr: 'Consulter la démarche', ar: 'تفاصيل الإجراء', en: 'Full Dossier Guide' },
        type: 'procedure_link',
        payload: `/procedures/${p.id}`,
      },
      {
        label: { derja: '🧮 احسب التنابر', fr: 'Calculer Timbres', ar: 'حاسبة التنابر', en: 'Calculate Timbre Fees' },
        type: 'calculator_link',
        payload: `/calculator?proc=${p.id}`,
      },
    ],
  };
}
