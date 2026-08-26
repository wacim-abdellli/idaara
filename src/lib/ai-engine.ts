import { proceduresData, getProcedureById } from '../data/procedures';
import { Procedure } from '../types/procedure';
import { ChatMessageAction } from '../types/chat';
import { getLocalized } from './locale-utils';

export interface ReasonerResponse {
  content: string;
  relatedProcedureId?: string;
  actions?: ChatMessageAction[];
  timbreBreakdown?: {
    totalTND: number;
    items: Array<{ label: string; amount: number }>;
  };
}

import { SupportedLanguage } from '../data/translations';

// Smart prompt language detector
function resolveResponseLanguage(prompt: string, uiLocale: SupportedLanguage | string): 'ar' | 'derja' | 'fr' | 'en' {
  const q = prompt.toLowerCase();

  // 1. Check for Arabic script
  if (/[\u0600-\u06FF]/.test(prompt)) {
    return 'ar';
  }

  // 2. Check for Tunisian Derja / Arabizi markers
  const derjaMarkers = [
    'ena', 'chnowa', 'chnou', 'chnia', 'kifech', 'kifeh', 'lezemni', 'n7eb', 'nheb', 'bech',
    'fi', 'mte3i', 'mte3ek', 'karhba', 'war9a', 'wra9', 'win', 'wa9tech', 'chkoun', 'bita9a',
    '3aslema', 'ahla', 'sahbi', 'khouya', 'flous', '9badha', 'chrit', 'etudient', 'etudiant',
    'talib', 'telmidth', 'mrigel', 'tounes', 'tounsi', 'haka', 'hedhi', 'hada'
  ];

  const hasDerja = derjaMarkers.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(q));
  if (hasDerja) {
    return 'derja';
  }

  // 3. Check for explicit English
  if (/^(how|what|where|can i|please|is it|how to|why)\b/i.test(q)) {
    return 'en';
  }

  // 4. Check for explicit French
  if (/^(comment|quels|quelles|combien|est-ce|bonjour|pourriez|je veux|faire)\b/i.test(q)) {
    return 'fr';
  }

  // 5. Default to Tunisian Derja / Arabic for sovereign platform experience
  if (uiLocale === 'ar') return 'ar';
  if (uiLocale === 'en') return 'en';
  if (uiLocale === 'fr' && (q.length < 5 || !hasDerja)) return 'fr';
  return 'derja';
}

export function parseAndReason(prompt: string, locale: SupportedLanguage | string = 'derja'): ReasonerResponse {
  const query = prompt.toLowerCase().trim();
  const lang = resolveResponseLanguage(prompt, locale);

  // Check if student/pupil mentioned
  const isStudent =
    query.includes('etudient') ||
    query.includes('etudiant') ||
    query.includes('talib') ||
    query.includes('telmidth') ||
    query.includes('طالب') ||
    query.includes('تلميذ') ||
    query.includes('pupil') ||
    query.includes('student');

  // 1. Check direct matches for known administrative intents
  if (
    query.includes('passeport') ||
    query.includes('passport') ||
    query.includes('safra') ||
    query.includes('voyage') ||
    query.includes('جواز') ||
    query.includes('سفر')
  ) {
    const p = getProcedureById('passeport-renouvellement')!;
    const passportFee = isStudent ? 25 : 80;

    return formatProcedureResponse(p, lang, {
      derja: isStudent
        ? "بما أنك تلميذ ولا طالب (Étudiant)، معلوم جواز السفر متاعك هو **25 د.ت فقط** (عوضاً عن 80 د.ت)!\n\nالأوراق المطلوبة لتجديد جواز السفر:\n1. **تنبير جبائي بـ 25 DT** (يلزمك شهادة حضور مدرسية أو جامعية أصلية)\n2. **4 تصاور شمسية جدد** بخلفية بيضاء\n3. **نسخة من بطاقة التعريف الوطنية (CIN)** مع الأصل للاستظهار\n4. **جواز السفر القديم** (في حالة التجديد)\n\nيُودع الملف بمركز الشرطة أو الحرس الوطني مرجع النظر لسكناك، ويحضر في غضون **7 إلى 15 يوم عمل**."
        : "باش تبدل ولا تطلع جواز السفر التونسي يلزمك:\n1. **تنبير جبائي بقيمة 80 DT** (أو 25 DT للطلبة والتلاميذ بشهادة حضور)\n2. **4 تصاور شمسية جدد** بخلفية بيضاء\n3. **نسخة من بطاقة التعريف (CIN)** مع الأصل\n4. **جواز السفر القديم**\n\nالملف يتصب في مركز الشرطة ولا الحرس الوطني مرجع النظر لسكناك، وياخو بين **7 و 15 يوم** باش يحضر.",
      fr: isStudent
        ? "En tant qu'élève ou étudiant, vous bénéficiez du tarif réduit de **25 TND** (au lieu de 80 TND) pour le passeport tunisien.\n\nPièces requises :\n1. Timbre fiscal de **25 TND** + Certificat de scolarité / d'inscription universitaire original\n2. 4 photos d'identité récentes sur fond blanc\n3. Copie de la CIN (originale requise au dépôt)\n4. L'ancien passeport (si renouvellement)\n\nDépôt au poste de police ou brigade de la garde nationale sous 7 à 15 jours."
        : "Pour renouveler votre passeport tunisien, vous devez fournir un timbre fiscal de 80 TND (25 TND pour élèves/étudiants), 4 photos d'identité récentes sur fond blanc, une copie de la CIN et l'ancien passeport. Le dépôt s'effectue au poste de police ou brigade de la garde nationale de votre circonscription sous 7 à 15 jours.",
      ar: isStudent
        ? "بصفتك تلميذاً أو طالباً، تتمتع بالمعلوم المخفض لجواز السفر التونسي وقدره **25 ديناراً فقط** (عوضاً عن 80 ديناراً).\n\nالأوراق والوثائق المطلوبة:\n1. **طابع جبائي بقيمة 25 د.ت** + شهادة حضور مدرسية أو ترسيم جامعي أصلية حديثة\n2. **4 صور شمسية حديثة** بخلفية بيضاء\n3. **نسخة من بطاقة التعريف الوطنية (CIN)** مع الاستظهار بالأصل\n4. **جواز السفر القديم** في حالة التجديد\n\nيُودع الملف بمركز الأمن الوطني أو الحرس الوطني لمرجع النظر، ويستغرق استخراجه من **7 إلى 15 يوماً**."
        : "لتجديد جواز السفر التونسي، يتطلب الملف طابعاً جبائياً بقيمة 80 ديناراً (أو 25 ديناراً للتلاميذ والطلبة)، 4 صور شمسية خلفية بيضاء، بطاقة التعريف الوطنية وجواز السفر القديم. يُودع الملف بمركز الأمن الوطني أو الحرس الوطني لمرجع النظر ويستغرق من 7 إلى 15 يوماً.",
      en: isStudent
        ? "As a student or pupil, you are eligible for the reduced **25 TND** fiscal stamp (instead of 80 TND) for your Tunisian passport.\n\nRequired documents:\n1. **25 TND fiscal stamp** + Original valid student registration certificate\n2. **4 recent white-background photos**\n3. **National ID (CIN) copy** + original for verification\n4. **Expiring passport**\n\nSubmit at your local Police or National Guard station (processing time: 7-15 days)."
        : "To renew your Tunisian passport, you must provide an 80 TND fiscal stamp (25 TND for students/pupils), 4 recent white-background photos, a copy of your National ID (CIN), and your expiring passport. Submit your file to your local Police or National Guard station (processing time: 7-15 days).",
    });
  }

  if (
    query.includes('carte grise') ||
    query.includes('karhba') ||
    query.includes('sayara') ||
    query.includes('mutation') ||
    query.includes('chrit') ||
    query.includes('رمادية') ||
    query.includes('سيارة')
  ) {
    const p = getProcedureById('mutation-carte-grise')!;
    return formatProcedureResponse(p, lang, {
      derja: "Bech tbeddel el Carte Grise ba3d ma chrit karhba lezmek:\n1. Contrat de vente (3a9d bay3) msa7a7 w m3arref fel baladiya w mosajjal fel 9badha (Recette)\n2. El Carte Grise l'asliya\n3. Chehedet fahs fanni (Visite technique) sel7a\n4. Quittance taxe de circulation (Vignette) khalsa\n\nEl dossier yetsabb fel Agence Technique des Transports Terrestres (ATTT). El ma3loum ta9rib 145 DT.",
      fr: "Pour la mutation de carte grise après l'achat d'un véhicule d'occasion, préparez :\n1. L'acte de vente légalisé à la Baladiya et enregistré à la Recette des Finances\n2. La carte grise originale barrée\n3. Un certificat de visite technique valide\n4. La quittance de la taxe de circulation (Vignette)\n\nLe dossier est à déposer auprès du centre ATTT territorialement compétent (frais moyens : ~145 DT).",
      ar: "لتحويل ملكية البطاقة الرمادية بعد شراء سيارة مستعملة، يتطلب الملف:\n1. عقد بيع مصادق عليه بالبلدية ومسجل بالقباضة المالية\n2. البطاقة الرمادية الأصلية مشطوبة\n3. شهادة فحص فني سارية المفعول\n4. وصل خلاص معلوم الجولان (Vignette)\n\nيُودع الملف لدى الوكالة الفنية للنقل البري (ATTT). التكلفة التقديرية حوالي 145 ديناراً.",
      en: "For vehicle registration transfer (Carte Grise), you must provide:\n1. Bill of sale legalized at the Baladiya and registered at the Tax Office\n2. Original crossed-out registration card\n3. Valid technical inspection certificate\n4. Road tax receipt (Vignette)\n\nSubmit the file to your regional ATTT office (approx. total fees: 145 DT).",
    });
  }

  if (
    query.includes('b3') ||
    query.includes('bulletin') ||
    query.includes('sawabi9') ||
    query.includes('casier') ||
    query.includes('عدلية') ||
    query.includes('سوابق')
  ) {
    const p = getProcedureById('bulletin-numero-3')!;
    return formatProcedureResponse(p, lang, {
      derja: "Bech tekhou B3 (Bita9at el Sawabi9 el 3adliya):\n1. Timbre fiscal mte3 7.500 DT\n2. Copie CIN\n3. Madhmoun wilada asly ken matloub\n\nTnejjem tsebha direct en ligne 3al site mte3 wizarat el dakhiliya (b3.interieur.gov.tn) walla fel markez. To93od bin 3 w 8 jours.",
      fr: "Pour obtenir votre Bulletin N°3 (Casier judiciaire) :\n1. Timbre fiscal de 7.500 TND\n2. Copie conforme de la CIN\n3. Extrait de naissance pour les premières demandes\n\nVous pouvez effectuer la demande en ligne sur b3.interieur.gov.tn ou directement au commissariat de police (Délai : 3 à 8 jours).",
      ar: "للحصول على بطاقة السوابق العدلية (بطاقة عدد 3) :\n1. طابع جبائي بقيمة 7.500 دينار\n2. نسخة من بطاقة التعريف الوطنية\n3. مضمون ولادة أصلي عند الاقتضاء\n\nيمكنك إيداع المطلب إلكترونياً عبر موقع وزارة الداخلية (b3.interieur.gov.tn) أو مباشرة بمركز الأمن (الآجال: 3 إلى 8 أيام).",
      en: "To obtain your Criminal Record Certificate (Bulletin N°3) :\n1. 7.500 TND fiscal stamp\n2. Copy of National ID card (CIN)\n3. Original birth certificate if requested\n\nYou can apply online at b3.interieur.gov.tn or at your local police station (Processing: 3 to 8 days).",
    });
  }

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
        lang === 'ar'
          ? "نظام المبادر الذاتي بتونس يمنحك ضريبة موحدة ومخفضة بنسبة 1% فقط على رقم المعاملات للأنشطة الخدماتية والمستقلين، مع إعفاء كامل من الأداء على القيمة المضافة (TVA). التسجيل مجاني تماماً بالمنصة الوطنية للمبادر الذاتي."
          : lang === 'en'
          ? "The Tunisian Auto-Entrepreneur status grants a 1% flat income tax rate for service freelancers and tech developers, with 0% VAT on exports and legal foreign currency repatriation (BCT). Registration is completely free on the national portal."
          : lang === 'fr'
          ? "Le statut Auto-Entrepreneur en Tunisie offre un régime libératoire au taux unique de 1% sur le chiffre d'affaires pour les freelances et prestataires de services, avec exonération totale de TVA et facturation devises conforme BCT. L'inscription est 100% gratuite."
          : "Statut Auto-Entrepreneur fi Tounes ya3tik impôt 1% barka 3al chiffre d'affaires mte3ek lel services wel freelance, m3a zéro TVA w droit bech tda5al devises (EUR/USD) men bara b'tor9 9anouniya.",
      relatedProcedureId: p.id,
      timbreBreakdown: {
        totalTND: 0,
        items: [{ label: lang === 'ar' ? 'التسجيل بالمنصة الوطنية (مجاني)' : 'Inscription plateforme nationale (Gratuit)', amount: 0 }],
      },
      actions: [
        {
          label: { derja: '🚀 Espace Freelance Launchpad', fr: 'Espace Freelance & 1%', ar: 'فضاء المبادر الذاتي', en: 'Freelance Hub' },
          type: 'procedure_link',
          payload: '/launchpad',
        },
      ],
    };
  }

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
        lang === 'ar'
          ? "لإبرام عقد كراء سكني قانوني، يجب تعمير نموذج العقد مطابق لمجلة الالتزامات والعقود، ثم التعريف بالإمضاء وجوباً بالبلدية (طابع بلدي 5 د.ت)، ثم تسجيله بالقباضة المالية (معلوم 30 د.ت) لحماية الطرفين قانونياً."
          : lang === 'en'
          ? "For a valid residential lease contract in Tunisia, complete the official agreement, legalize signatures in person at the Baladiya (5 DT municipal stamp per copy), and register it at the Recette des Finances (30 DT registration fee) within 60 days."
          : lang === 'fr'
          ? "Pour un contrat de bail résidentiel conforme, remplissez le contrat officiel conforme au Code des Obligations, effectuez la légalisation des signatures à la Baladiya (5 DT de timbre municipal par copie) et l'enregistrement à la Recette des Finances (30 DT)."
          : "Bech ta3mel contrat kré mrigel lel Baladiya, 3ammer el modèle mte3 el contrat, emchi lel Baladiya 3arref bel imdha2 (5 DT timbre baladi), w ba3d sajjlou fel 9badha (30 DT).",
      relatedProcedureId: p.id,
      timbreBreakdown: {
        totalTND: 35.0,
        items: [
          { label: 'Enregistrement Recette', amount: 30.0 },
          { label: 'Timbre Baladiya', amount: 5.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📄 A3mel Contrat Bail PDF', fr: 'Générer Contrat de Bail PDF', ar: 'استخراج عقد كراء PDF', en: 'Generate Lease PDF' },
          type: 'pdf_form',
          payload: '/documents/contrat-location',
        },
      ],
    };
  }

  // Retraite CNSS Intent
  if (
    query.includes('retraite') ||
    query.includes('pension') ||
    query.includes('ta9a3od') ||
    query.includes('ta9a3ed') ||
    query.includes('تقاعد') ||
    query.includes('شيخوخة') ||
    query.includes('جراية')
  ) {
    const p = getProcedureById('cnss-retraite-pension')!;
    return {
      content:
        lang === 'ar'
          ? "للحصول على جراية التقاعد (CNSS)، يجب بلوغ السن القانونية (60 سنة عموماً أو 50 سنة للتقاعد النسبي) مع استيفاء 120 ثلاثية مصرح بها على الأقل. يتطلب الملف: مطبوعة جراية الشيخوخة من الصندوق، كشف الحياة المهنية (Relevé de carrière)، شهادة في التوقف عن العمل مسلّمة من آخر مؤجر، كشف هوية بنكية (RIB)، ومضمون ولادة أصلي."
          : lang === 'en'
          ? "To claim your CNSS retirement pension in Tunisia, you must reach the legal age (60 years, or 50 for early retirement with 180 quarters) and have at least 120 validated quarters. Required dossier: CNSS retirement form, career statement, employer cessation of activity certificate, bank RIB, and birth certificate."
          : lang === 'fr'
          ? "Pour liquider votre pension de retraite CNSS en Tunisie, vous devez avoir atteint 60 ans (ou 50 ans avec 180 trimestres pour retraite anticipée) et justifier d'au moins 120 trimestres cotisés. Pièces requises : Formulaire CNSS, relevé de carrière, certificat de cessation d'activité de l'employeur, RIB bancaire et extrait de naissance."
          : "Bech tsob dossier el Retraite fel CNSS, lezem tkoun wassalt 60 sne (walla 50 sne ken 3andek 180 trimestres) w msajjel au moins 120 trimestres. T7adher: formulaire CNSS, relevé de carrière, chhadet in9ita3 men 3and el batron, copie CIN, w RIB.",
      relatedProcedureId: p?.id || 'cnss-retraite-pension',
      timbreBreakdown: {
        totalTND: 0,
        items: [{ label: lang === 'ar' ? 'إيداع الملف بالصندوق (مجاني)' : 'Dépôt dossier CNSS (Gratuit)', amount: 0 }],
      },
      actions: [
        {
          label: { derja: '📋 Guide Retraite CNSS', fr: 'Démarche Retraite CNSS', ar: 'دليل جراية التقاعد', en: 'Retirement Guide' },
          type: 'procedure_link',
          payload: '/procedures/cnss-retraite-pension',
        },
      ],
    };
  }

  // Permis de Bâtir Intent
  if (
    query.includes('batir') ||
    query.includes('construire') ||
    query.includes('bnina') ||
    query.includes('bne') ||
    query.includes('بناء') ||
    query.includes('رخصة بناء') ||
    query.includes('رخصة البناء')
  ) {
    const p = getProcedureById('permis-de-batir')!;
    return {
      content:
        lang === 'ar'
          ? "للحصول على رخصة البناء من البلدية، يتطلب الملف إعداد أمثلة هندسية معمارية مصادق عليها من مهندس معماري مرسم (5 نسخ)، شهادة ملكية أصلية حديثة من إدارة الملكية العقارية (CPF)، مثال موقعي، ووصل خلاص الأداء البلدي (الزبلة والخروبة). الأجل القانوني لرد البلدية هو 45 يوماً."
          : lang === 'en'
          ? "To obtain a municipal building permit (Permis de Bâtir) in Tunisia, you must submit: 5 copies of architectural plans certified by a registered architect, an updated property title from CPF, a site plan, and property tax receipt (TIB). The statutory response delay is 45 days."
          : lang === 'fr'
          ? "Pour obtenir un permis de bâtir municipal en Tunisie, préparez : 5 exemplaires des plans visés par un architecte agréé, un certificat de propriété récent de la CPF, un plan de situation, et la quittance de la taxe des immeubles (TIB). Le délai légal d'instruction municipal est de 45 jours."
          : "Bech te5ou Rokhset Bné mel Baladiya, lezem t7adher: plans msa77in men 3and architecte agréé (5 copies), chhadet melkiya men CPF, plan de situation, w quittance khlas zebla w kharrouba. El Baladiya 3andha 45 jours delai legal bech tjeweb.",
      relatedProcedureId: p?.id || 'permis-de-batir',
      timbreBreakdown: {
        totalTND: 120.0,
        items: [
          { label: 'Droit municipal permis', amount: 80.0 },
          { label: 'Timbres & Alignement', amount: 40.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📋 Dossier Rokhset Bné', fr: 'Dossier Permis de Bâtir', ar: 'ملف رخصة البناء', en: 'Building Permit Guide' },
          type: 'procedure_link',
          payload: '/procedures/permis-de-batir',
        },
      ],
    };
  }

  // Hojjet Wafet / Heritage Intent
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
    const p = getProcedureById('hojjet-wafet-heritage')!;
    return {
      content:
        lang === 'ar'
          ? "لاستخراج حجة الوفاة وحصر الإرث، يجب التوجه لعدلي إشهاد (Notaires) مصحوباً بمضمون وفاة الهالك، مضامين ولادة كافة الورثة الشرعيين، عقد الزواج أو الدفتر العائلي، وشاهدين رشيدين حاملين لبطاقات تعريفهما. بعد التحرير يتم تسجيلها بالقباضة المالية ومصادقة قاضي الناحية لتمكين الورثة من التصرف في الحسابات والعقارات."
          : lang === 'en'
          ? "To obtain a Certificate of Inheritance (Hojjet Wafet) in Tunisia, visit two certified notaries (Adoul) with the deceased's death certificate, birth certificates of all heirs, marriage contract, and 2 adult witnesses. Once drafted, register it at the Tax Office and obtain cantonal judge approval to unfreeze bank accounts and transfer properties."
          : lang === 'fr'
          ? "Pour établir une Hojjet Wafet (acte de notoriété après décès) en Tunisie, rendez-vous chez deux notaires (Adoul Ichhad) avec l'extrait de décès, les extraits de naissance de tous les héritiers, l'acte de mariage et 2 témoins majeurs. L'acte est ensuite enregistré à la Recette et homologué par le juge cantonal pour débloquer les comptes et biens."
          : "Bech t5arraj Hojjet Wafet, temchi l'2 3doul ichhed m3ak: madhmoun wafet el mayyet, madhamin el ouratha kol, 3a9d zawaj, w 2 chhoud b'CIN mte3hom. Ba3d tsajjalha fel 9badha w tsadde9ha fel Ma7kama bech t7ell el compte bancaire walla te9sem el terka.",
      relatedProcedureId: p?.id || 'hojjet-wafet-heritage',
      timbreBreakdown: {
        totalTND: 45.0,
        items: [
          { label: 'Honoraires 3doul ichhed', amount: 35.0 },
          { label: 'Enregistrement Recette', amount: 10.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📋 Guide Hojjet Wafet', fr: 'Démarche Hojjet Wafet', ar: 'دليل حجة الوفاة والإرث', en: 'Inheritance Guide' },
          type: 'procedure_link',
          payload: '/procedures/hojjet-wafet-heritage',
        },
      ],
    };
  }

  // Déclaration de Perte Document Intent
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
        lang === 'ar'
          ? "في حالة ضياع وثيقة رسمية (بطاقة تعريف، جواز سفر، بطاقة رمادية)، يجب تحرير تصريح بالضياع والتعريف بالإمضاء عليه بالبلدية (طابع بلدي 3 د.ت) ثم التوجه لمركز الأمن الوطني لاستخراج شهادة ضياع رسمية لتقديمها ضمن ملف النظير."
          : lang === 'en'
          ? "If you have lost an official document (National ID, Passport, Registration Card), generate a Sworn Declaration of Loss, legalize it at the Baladiya (3 TND municipal stamp), and present it at your police station to obtain the official loss certificate for duplicate issuance."
          : lang === 'fr'
          ? "En cas de perte d'un document officiel (CIN, Passeport, Carte Grise), générez une déclaration sur l'honneur de perte, faites légaliser votre signature à la Baladiya (timbre municipal 3 DT), puis déposez-la au poste de police pour obtenir l'attestation de perte."
          : "Ken dhy3etlek war9a rasmiya (CIN, Passeport, Carte Grise), 3ammer Tasri7 b'Dhiya3, emchi 3arref bel imdha2 fel Baladiya (3 DT timbre), w hezzou lel markez bech te5ou chhadet dhiya3 w t3awadh war9tek.",
      timbreBreakdown: {
        totalTND: 3.0,
        items: [{ label: 'Timbre Baladiya déclaration perte', amount: 3.0 }],
      },
      actions: [
        {
          label: { derja: '📄 A3mel Tasri7 Dhiya3 PDF', fr: 'Générer Déclaration de Perte PDF', ar: 'استخراج تصريح بالضياع PDF', en: 'Generate Loss PDF' },
          type: 'pdf_form',
          payload: '/documents/declaration-perte',
        },
      ],
    };
  }

  // Reconnaissance de Dette Intent
  if (
    query.includes('dette') ||
    query.includes('dayn') ||
    query.includes('tsalef') ||
    query.includes('salleft') ||
    query.includes('دين') ||
    query.includes('اعتراف بدين') ||
    query.includes('إقرار بدين')
  ) {
    return {
      content:
        lang === 'ar'
          ? "لإثبات قرض مالي بين الأفراد بطريقة قانونية ملزمة، يجب تحرير إقرار واعتراف بدين يتضمن هوية الدائن والمدين، المبلغ بالأرقام والحروف، تاريخ الاستحقاق وشروط السداد، مع التعريف بالإمضاء وجوباً بالبلدية (طابع بلدي 5 د.ت) طبقاً للفصول 339 إلى 348 من مجلة الالتزامات والعقود."
          : lang === 'en'
          ? "To legally secure a personal loan in Tunisia, draft a formal Debt Acknowledgment stating creditor/debtor IDs, exact amount in digits and words, due date, and repayment terms. Signatures must be legalized at the Baladiya (5 TND stamp) pursuant to Articles 339-348 of the COC."
          : lang === 'fr'
          ? "Pour formaliser un prêt financier entre particuliers en Tunisie, rédigez une Reconnaissance de Dette mentionnant l'identité des parties, le montant en chiffres et en lettres, l'échéance et les modalités. Légalisez obligatoirement les signatures à la Baladiya (timbre 5 DT) conformément aux articles 339 à 348 du COC."
          : "Bech t'dhamen flousek mrigel fi tsallif, a3mel I9rar w I3tiraf b'Dayn fih esm el dayen wel madin, el montant bel ar9am wel klem, date e5er ajal lel 5lass, w sa77a7 m3a el ta3rif bel imdha2 fel Baladiya (5 DT timbre).",
      timbreBreakdown: {
        totalTND: 5.0,
        items: [{ label: 'Timbre Baladiya reconnaissance dette', amount: 5.0 }],
      },
      actions: [
        {
          label: { derja: '📄 A3mel I3tiraf b\'Dayn PDF', fr: 'Générer Reconnaissance de Dette PDF', ar: 'استخراج إقرار بدين PDF', en: 'Generate Debt PDF' },
          type: 'pdf_form',
          payload: '/documents/reconnaissance-dette',
        },
      ],
    };
  }

  // 2. Dynamic Search across all procedures in proceduresData
  const matchedProcedure = proceduresData.find((p) => {
    const title = getLocalized(p.title, 'fr').toLowerCase();
    const titleAr = getLocalized(p.title, 'ar').toLowerCase();
    const tags = p.tags.map((t) => t.toLowerCase());
    return (
      query.split(' ').some((word) => word.length > 2 && (title.includes(word) || titleAr.includes(word) || tags.includes(word)))
    );
  });

  if (matchedProcedure) {
    const title = getLocalized(matchedProcedure.title, lang === 'derja' ? 'fr' : lang);
    const desc = getLocalized(matchedProcedure.shortDescription, lang === 'derja' ? 'fr' : lang);
    const cost = matchedProcedure.estimatedTotalCostTND;

    return {
      content:
        lang === 'ar'
          ? `بخصوص ${title} :\n${desc}\n\nالمدة التقديرية : ${matchedProcedure.estimatedProcessingTime}.\nالميزانية التقديرية للتنابر والمعاليم : ${cost.toFixed(3)} د.ت.`
          : lang === 'en'
          ? `Regarding ${title} :\n${desc}\n\nEstimated Processing Time: ${matchedProcedure.estimatedProcessingTime}.\nEstimated Total Statutory Cost: ${cost.toFixed(3)} TND.`
          : `Concernant ${title} :\n${desc}\n\nDélai moyen estimé : ${matchedProcedure.estimatedProcessingTime}.\nBudget estimé des frais et timbres : ${cost.toFixed(3)} DT.`,
      relatedProcedureId: matchedProcedure.id,
      timbreBreakdown: {
        totalTND: cost,
        items: matchedProcedure.costsBreakdown.map((c) => ({
          label: getLocalized(c.label, lang === 'derja' ? 'fr' : lang),
          amount: c.amountTND,
        })),
      },
      actions: [
        {
          label: { derja: '📋 Chouf el Dossier Kemel', fr: 'Consulter la démarche', ar: 'تفاصيل الإجراء', en: 'View Procedure' },
          type: 'procedure_link',
          payload: `/procedures/${matchedProcedure.id}`,
        },
        {
          label: { derja: '🧮 7seb el Timbres', fr: 'Calculer Timbres', ar: 'حاسبة التنابر', en: 'Stamp Calculator' },
          type: 'calculator_link',
          payload: `/calculator?proc=${matchedProcedure.id}`,
        },
      ],
    };
  }

  // Check for Concours and Public Recruitment intents
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
        lang === 'ar'
          ? "المناظرات الوطنية المفتوحة حالياً بالوظيفة العمومية والمنشآت الوطنية (2026):\n1. **الشركة التونسية للكهرباء والغاز (STEG)**: انتداب 180 مهندساً وإطاراً فنياً (آخر أجل: 25 مارس 2026)\n2. **وزارة التربية (الكاباس CAPES)**: انتداب 1250 أستاذ تعليم ثانوي (آخر أجل: 10 أفريل 2026)\n3. **الشركة الوطنية لاستغلال وتوزيع المياه (SONEDE)**: انتداب 95 تقنياً سامياً (آخر أجل: 30 مارس 2026)\n4. **وزارة المالية (الجباية والقباضات)**: انتداب 110 متفقدين ومراقبي أداءات (آخر أجل: 18 أفريل 2026)\n\nالتسجيل الأولي يتم وجوباً عبر البوابة الوطنية للانتداب بالقطاع العمومي **www.concours.gov.tn** مع إعداد ملف يحتوي على استمارة الترشح، نسخة مطابقة للأصل من بطاقة التعريف والشهادة العلمية، وبطاقة عدد 3 حديثة."
          : lang === 'en'
          ? "Currently active Tunisian national public competitions (2026):\n1. **STEG**: Recruitment of 180 Power, Systems & IT Engineers (Deadline: March 25, 2026)\n2. **Ministry of Education (CAPES)**: 1,250 Secondary School Teachers (Deadline: April 10, 2026)\n3. **SONEDE**: 95 Hydraulic & Mechanical Senior Techs (Deadline: March 30, 2026)\n4. **Ministry of Finance (DGI)**: 110 Tax Inspectors & Audit Officers (Deadline: April 18, 2026)\n\nPreliminary registration is mandatory on **www.concours.gov.tn**. Required dossier: Printed application receipt, certified copy of National ID (CIN), certified degree, and recent Bulletin N°3 (< 3 months)."
          : lang === 'fr'
          ? "Concours nationaux de la fonction publique actuellement ouverts en Tunisie (2026) :\n1. **STEG** : Recrutement de 180 Ingénieurs & Cadres techniques (Délai : 25 Mars 2026)\n2. **Ministère de l'Éducation (CAPES)** : 1 250 Professeurs d'enseignement secondaire (Délai : 10 Avril 2026)\n3. **SONEDE** : 95 Techniciens Supérieurs en Hydraulique & Électromécanique (Délai : 30 Mars 2026)\n4. **Ministère des Finances (DGI)** : 110 Inspecteurs & Contrôleurs des Impôts (Délai : 18 Avril 2026)\n\nL'inscription s'effectue obligatoirement sur **www.concours.gov.tn**. Pièces requises : Fiche imprimée, copie conforme CIN, diplôme et extrait de casier B3 récent."
          : "Les concours maftou7in tawa fi Tounes (2026):\n1. **STEG**: Inscription Ingénieurs w Cadres (180 postes, dernier délai 25 Mars 2026)\n2. **Wizarat el Tarbiya (CAPES)**: Asatidhat Ta3lim Thanawi (1250 postes, dernier délai 10 Avril 2026)\n3. **SONEDE**: Techniciens Supérieurs (95 postes, dernier délai 30 Mars 2026)\n4. **Wizarat el Maliya (Jibaya)**: Motafaqdin w Mura9bin (110 postes, dernier délai 18 Avril 2026)\n\nL'inscription lezemha tsir 3al site officiel **www.concours.gov.tn**. El wra9 el matlouba: Formulaire matbou3, Copie conforme CIN w Diplôme, w B3 jdida (< 3 chhour).",
      actions: [
        {
          label: { derja: '💼 Radar el Concourat', fr: 'Radar des Concours', ar: 'رادار المناظرات', en: 'Concours Radar' },
          type: 'procedure_link',
          payload: '/concours',
        },
        {
          label: { derja: '📋 Guide des Démarches', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
          type: 'procedure_link',
          payload: '/procedures',
        },
      ],
    };
  }

  // Check for short conversational follow-ups (chnou, kifech, wa9tech, chkounik)
  if (
    query === 'chnou' ||
    query === 'chnowa' ||
    query === 'chnia' ||
    query === 'kifech' ||
    query === 'kifeh' ||
    query === 'شنو' ||
    query === 'شنوة' ||
    query === 'كيفاش' ||
    query === 'quoi' ||
    query === 'comment'
  ) {
    return {
      content:
        lang === 'ar'
          ? "تفضل، حدد لي الإجراء أو الوثيقة التي تريد الاستفسار عنها (مثل: أوراق جواز السفر، كيفية تجديد بطاقة التعريف، استخراج بطاقة عدد 3، المناظرات المفتوحة، أو معلوم التنابر بالدينار)."
          : lang === 'en'
          ? "Please tell me which procedure or document you need details on (e.g. Passport requirements, National ID renewal, Criminal record B3, active public concours, or stamp fees)."
          : lang === 'fr'
          ? "Précisez-moi la démarche ou le document qui vous intéresse (ex: papiers du passeport, renouvellement CIN, extrait B3, concours ouverts, ou calcul des timbres)."
          : "9oli 3la anahou dossier walla war9a t7eb tefhemha (mthelen: awra9 el Passeport, CIN jdida, extrait B3, les concours maftou7in tawa, walla 7seb el timbres).",
      actions: [
        {
          label: { derja: '💼 Radar el Concourat', fr: 'Radar des Concours', ar: 'رادار المناظرات', en: 'Concours Radar' },
          type: 'procedure_link',
          payload: '/concours',
        },
        {
          label: { derja: '📋 Guide des Démarches', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
          type: 'procedure_link',
          payload: '/procedures',
        },
      ],
    };
  }

  // Check for Platform Capabilities / Unique Value intents ("What do you do?", "What makes Idaara unique?", "chnowa ta3mel?", "خدمات الموقع")
  if (
    query.includes('unique') ||
    query.includes('service') ||
    query.includes('serve') ||
    query.includes('avantage') ||
    query.includes('pourquoi') ||
    query.includes('why') ||
    query.includes('chnowa tzid') ||
    query.includes('chnowa ta3mel') ||
    query.includes('chnia el khadamat') ||
    query.includes('chnowa fih') ||
    query.includes('شنوة تقدم') ||
    query.includes('شنوة الخدمات') ||
    query.includes('علاش') ||
    query.includes('مميزات') ||
    query.includes('خدمات الموقع') ||
    query.includes('ماذا يقدم')
  ) {
    return {
      content:
        lang === 'ar'
          ? "مرحباً بك! منصة **إدارة.تونس** تقدم لك 8 خدمات حصرية لا تتوفر في أي مكان آخر بتونس:\n\n" +
            "1. 📄 **فسرلي هالورقة (Fasserli OCR)**: تفكيك الأوراق والوثائق المعقدة (تنابيه، خطايا، إعلامات) وشرحها بالدارجة في ثوانٍ دون حفظ الملفات.\n" +
            "2. 🧮 **حاسبة التنابر بالمليم**: حساب المعاليم الدقيقة حسب قانون المالية لتفادي إرجاعك من شباك الإدارة.\n" +
            "3. 🗺️ **أطلس الـ 24 ولاية والتوقيت الموسمي**: دليل جغرافي تفاعلي لأكثر من 110 مصلحة عمومية مع أوقات العمل الفعلية (رمضان / الصيف / الشتاء) وروابط Waze.\n" +
            "4. 💼 **فضاء المستقل وفواتير التصدير BCT**: محاكي ضريبة 1% ومولد فواتير تصدير الخدمات بالعملة الصعبة معفاة من الأداء (TVA 0%).\n" +
            "5. 📝 **مولد العقود البلدية الرسمية**: استخراج عقود كراء وتوكيلات جاهزة للتعريف بالإمضاء بالبلدية.\n" +
            "6. 🏆 **رادار المناظرات المباشر**: متابعة مناظرات STEG، SONEDE، الكاباس مع الشروط والوثائق المطلوبة.\n" +
            "7. 🌐 **الدليل الموحد للبوابات الحكومية**: وصول فوري لـ 15 بوابة وطنية (الهوية الرقمية، B3، CNSS...).\n" +
            "8. 🔒 **بروتوكول الخصوصية المطلق (INPDP)**: حجب تلقائي لأرقام بطاقة التعريف والحسابات البنكية وحذف فوري للبيانات."
          : lang === 'en'
          ? "Welcome! **Idaara.tn** delivers 8 exclusive civic superpowers that don't exist anywhere else in Tunisia:\n\n" +
            "1. 📄 **Fasserli OCR Decoder**: Instant plain-Derja translation and step-by-step action plans for complex bureaucratic notices (court bailiffs, tax audits, CNSS demands) with zero cloud storage.\n" +
            "2. 🧮 **Exact Fiscal Stamp Calculator**: Down-to-the-millime calculation of statutory stamps & fees to ensure you never get rejected at the counter.\n" +
            "3. 🗺️ **24-Wilaya GPS Atlas & Seasonal Shifts**: Geocoded directory of 110+ public offices with Ramadan, Summer, and Regular operating hours + Waze/Maps links.\n" +
            "4. 💼 **Freelance Launchpad & BCT Export Invoicing**: 1% flat tax simulator and compliant foreign currency export invoice generator (0% VAT under Art. 11 Code TVA).\n" +
            "5. 📝 **Statutory Municipal Contract Builder**: Instantly generate bilingual PDF contracts (Leases, Power of Attorney) formatted with official stamp boxes for Baladiya legalization.\n" +
            "6. 🏆 **Live Concours Radar**: Up-to-date tracking of public sector recruitment (STEG, SONEDE, CAPES) with eligibility checklists and salary estimates.\n" +
            "7. 🌐 **15 Unified e-Gov Portals**: Direct shortcuts to e-Houwiya, B3 online, e-CNSS, and emergency hotlines.\n" +
            "8. 🔒 **Zero-Storage Privacy Protocol**: 100% in-memory ephemeral processing with automatic PII masking (CIN & bank RIBs)."
          : lang === 'derja'
          ? "Mar7ba bik! **Idaara.tn** ta3tik 8 7ajet 7asriya ma tal9ahom fi 7atta blasa okhra fi Tounes:\n\n" +
            "1. 📄 **Fasserli hal War9a (OCR)**: Tfassarlek ay war9a s3iba (tanbih 9badha, 3adel monfedh, khteyet CNSS) bel Derja fi thweni w ta3tik chnowa lezmek ta3mel b'zero stockage.\n" +
            "2. 🧮 **Calculateur Timbres bel Mellim**: Te7seblek 9ad-9ad el masrouf wel timbres mte3 el loi de finances bech ma yraj3oukch mel guichet.\n" +
            "3. 🗺️ **Atlas 24 Wilaya w Taw9it Romdhan/Sayf**: Akther men 110 masla7a b'GPS, noumrouwat w aw9at el 5edma el sa7i7a.\n" +
            "4. 💼 **Espace Freelance 1% w Facturation BCT**: 7assebet el Auto-Entrepreneur w factures export devises (EUR/USD) 0% TVA mrigla m3a el Banque Centrale.\n" +
            "5. 📝 **Générateur Contrats Baladiya**: T5arrej contrat kré walla tawkil PDF 7adher lel ta3rif bel imdha2 fel Baladiya.\n" +
            "6. 🏆 **Radar el Concourat**: Taba3 les concours el maftou7in (STEG, SONEDE, CAPES) m3a el wra9 wel conditions.\n" +
            "7. 🌐 **Dalil 15 Portail e-Gov**: Dokhol direct l'e-Houwiya, B3 en ligne, e-CNSS w noumrouwat el 7adra.\n" +
            "8. 🔒 **Sécurité 100% INPDP**: Zero stockage lel CIN walla RIB mte3ek, el traitement fel RAM kahaw."
          : "Bienvenue ! **Idaara.tn** vous offre 8 super-pouvoirs civiques exclusifs introuvables ailleurs en Tunisie :\n\n" +
            "1. 📄 **Fasserli (Décodeur OCR Éphémère)** : Décryptage instantané du jargon administratif complexe (avis de redressement, huissier de justice, CNSS) en Derja claire avec zéro stockage de fichiers.\n" +
            "2. 🧮 **Calculateur de Timbres au Millime Près** : Évaluation exacte des droits fiscaux selon la Loi de Finances pour éviter tout refus au guichet.\n" +
            "3. 🗺️ **Atlas des 24 Gouvernorats & Horaires Saisonniers** : Plus de 110 guichets géolocalisés avec horaires réels (Ramadan, Séance Unique, Hiver) et itinéraires Waze/Maps.\n" +
            "4. 💼 **Espace Freelance 1% & Facturation BCT** : Simulateur de régime auto-entrepreneur et génération de factures d'exportation en devises (0% TVA conforme BCT).\n" +
            "5. 📝 **Générateur de Contrats Prêts pour la Baladiya** : Création instantanée de contrats de bail et procurations conformes pour légalisation de signature.\n" +
            "6. 🏆 **Radar des Concours Nationaux** : Veille continue sur les recrutements publics (STEG, SONEDE, CAPES) avec critères et pièces requises.\n" +
            "7. 🌐 **Annuaire Unifié de 15 Portails e-Gov** : Accès direct à e-Houwiya, B3 en ligne, e-CNSS et numéros d'urgence.\n" +
            "8. 🔒 **Protocole Zéro-Stockage INPDP** : Traitement éphémère en mémoire vive avec masquage automatique des CIN et coordonnées bancaires.",
      actions: [
        {
          label: { derja: '📄 Fasserli OCR', fr: 'Scanner un Document (Fasserli)', ar: 'فحص وتفسير وثيقة (OCR)', en: 'Document OCR' },
          type: 'procedure_link',
          payload: '/fasserli',
        },
        {
          label: { derja: '🧮 Calculateur Timbres', fr: 'Calculateur Timbres', ar: 'حاسبة التنابر بالمليم', en: 'Stamp Calculator' },
          type: 'calculator_link',
          payload: '/calculator',
        },
        {
          label: { derja: '🚀 Espace Freelance 1%', fr: 'Launchpad Freelance 1%', ar: 'فضاء المستقل 1%', en: 'Freelance Hub' },
          type: 'procedure_link',
          payload: '/launchpad',
        },
        {
          label: { derja: '🗺️ Atlas 24 Wilayas', fr: 'Atlas des 24 Wilayas', ar: 'أطلس الـ 24 ولاية', en: '24-Wilaya Atlas' },
          type: 'office_link',
          payload: '/locator',
        },
      ],
    };
  }

  // Check for greetings (hi, hello, 3aslema, bonjour, salam, ahla)
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
    query.startsWith('3aslema') ||
    query.startsWith('bonjour') ||
    query.startsWith('salam')
  ) {
    return {
      content:
        lang === 'ar'
          ? "مرحباً بك في إدارة.تونس! اسألني عن أي إجراء إداري، وثيقة رسمية، أو مناظرة عمومية (جواز سفر، بطاقة رمادية، بطاقة ب3، مناظرة STEG، عقد كراء، مبادر ذاتي...)."
          : lang === 'en'
          ? "Hello! Welcome to Idaara.tn. Ask me anything in English, French, or Derja about Tunisian administrative procedures, public concours, or stamp fees."
          : lang === 'derja'
          ? "3aslema! Mar7ba bik fi Idaara.tn. Es'elni bel Derja 3la ay war9a, procédure, concours maftou7, walla timbre mte3 l'Idara (Passeport, Carte Grise, B3, STEG, Contrat de bail, Auto-Entrepreneur...)."
          : "Bonjour ! Bienvenue sur Idaara.tn. Posez toutes vos questions sur les démarches administratives tunisiennes, concours publics et timbres fiscaux.",
      actions: [
        {
          label: { derja: '💼 Radar el Concourat', fr: 'Radar des Concours', ar: 'رادار المناظرات', en: 'Concours Radar' },
          type: 'procedure_link',
          payload: '/concours',
        },
        {
          label: { derja: '📋 Guide des Démarches', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
          type: 'procedure_link',
          payload: '/procedures',
        },
        {
          label: { derja: '🧮 Calculateur de Timbres', fr: 'Calculateur de Timbres', ar: 'حاسبة التنابر', en: 'Stamp Calculator' },
          type: 'calculator_link',
          payload: '/calculator',
        },
      ],
    };
  }

  // 3. Fallback Contextual AI Assistant Response
  return {
    content:
      lang === 'ar'
        ? "شكراً على استفسارك. يمكنك سؤالي بالدارجة التونسية، الفرنسية، أو الإنجليزية عن أي وثيقة إدارية أو مناظرة (مثل: تجديد جواز السفر، تحويل ملكية سيارة، بطاقة التعريف، بطاقة عدد 3، مناظرة STEG، عقود الكراء، المبادر الذاتي، أو معاليم التنابر)."
        : lang === 'en'
        ? "Thank you for your question. You can ask me in Tunisian Derja, French, or English about any administrative paperwork or public concours (e.g. Passport renewal, Car registration, National ID, Criminal record B3, STEG/CAPES exams, Lease contracts, Auto-Entrepreneur 1% tax, or statutory fiscal stamp costs)."
        : lang === 'derja'
        ? "Mar7ba bik! Tnejjem tes'elni bel Derja 3la ay war9a idariya walla concours (Passeport, Carte Grise, CIN, B3, Concours STEG/CAPES, Contrat de bail, Statut Auto-Entrepreneur 1%, walla timbres fiscaux)."
        : "Merci pour votre demande. Posez votre question en Derja tunisienne ou Français concernant n'importe quel dossier administratif ou concours public (Renouvellement passeport, Mutation carte grise, CIN, Bulletin N°3, Concours STEG/CAPES, Contrat de bail, Statut Auto-Entrepreneur 1%, ou timbres fiscaux).",
    actions: [
      {
        label: { derja: '📋 Guide des Démarches', fr: 'Toutes les démarches', ar: 'جميع الإجراءات', en: 'All Procedures' },
        type: 'procedure_link',
        payload: '/procedures',
      },
      {
        label: { derja: '🧮 Calculateur de Timbres', fr: 'Calculateur de Timbres', ar: 'حاسبة التنابر', en: 'Stamp Calculator' },
        type: 'calculator_link',
        payload: '/calculator',
      },
    ],
  };
}

function formatProcedureResponse(
  p: Procedure,
  lang: 'derja' | 'fr' | 'ar' | 'en',
  contentMap: { derja: string; fr: string; ar: string; en: string }
): ReasonerResponse {
  return {
    content: contentMap[lang],
    relatedProcedureId: p.id,
    timbreBreakdown: {
      totalTND: p.estimatedTotalCostTND,
      items: p.costsBreakdown.map((c) => ({
        label: getLocalized(c.label, lang === 'derja' ? 'fr' : lang),
        amount: c.amountTND,
      })),
    },
    actions: [
      {
        label: { derja: '📋 Chouf el Dossier Kemel', fr: 'Consulter la démarche', ar: 'تفاصيل الإجراء', en: 'Full Dossier Guide' },
        type: 'procedure_link',
        payload: `/procedures/${p.id}`,
      },
      {
        label: { derja: '🧮 7seb el Timbres', fr: 'Calculer Timbres', ar: 'حاسبة التنابر', en: 'Calculate Timbre Fees' },
        type: 'calculator_link',
        payload: `/calculator?proc=${p.id}`,
      },
    ],
  };
}
