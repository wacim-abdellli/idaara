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

export function parseAndReason(prompt: string, locale: SupportedLanguage | string = 'derja'): ReasonerResponse {
  const query = prompt.toLowerCase().trim();
  const lang = locale === 'ar' ? 'ar' : locale === 'en' ? 'en' : locale === 'fr' ? 'fr' : 'derja';

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
    return formatProcedureResponse(p, lang, {
      derja: "Bech t'beddel el Passeport mte3ek lezmek:\n1. Timbre fiscal mte3 80 DT (25 DT kenek etudiant/telmidth)\n2. 4 tsawer chamsiya jdod b'khalfiya baydha2\n3. Copie CIN m3a l'original\n4. El passeport el 9dim mte3ek\n\nEl dossier yetsabb fi Markez el Chorta walla el 7aras el marje3 el tourabi mte3 seknek. Yo93od bin 7 w 15 jours bech ye7dher.",
      fr: "Pour renouveler votre passeport tunisien, vous devez fournir un timbre fiscal de 80 TND (25 TND pour élèves/étudiants), 4 photos d'identité récentes sur fond blanc, une copie de la CIN et l'ancien passeport. Le dépôt s'effectue au poste de police ou brigade de la garde nationale de votre circonscription sous 7 à 15 jours.",
      ar: "لتجديد جواز السفر التونسي، يتطلب الملف طابعاً جبائياً بقيمة 80 ديناراً (أو 25 ديناراً للتلاميذ والطلبة)، 4 صور شمسية خلفية بيضاء، بطاقة التعريف الوطنية وجواز السفر القديم. يُودع الملف بمركز الأمن الوطني أو الحرس الوطني لمرجع النظر ويستغرق من 7 إلى 15 يوماً.",
      en: "To renew your Tunisian passport, you must provide an 80 TND fiscal stamp (25 TND for students/pupils), 4 recent white-background photos, a copy of your National ID (CIN), and your expiring passport. Submit your file to your local Police or National Guard station (processing time: 7-15 days).",
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
