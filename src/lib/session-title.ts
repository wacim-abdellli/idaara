/**
 * 🏛️ Idaara.tn — Smart Civic Session Title Generator
 * Generates concise, 2-4 word summaries ("resume of the prompt")
 * for the chat session sidebar and header instead of raw literal prompt text.
 */

export interface TopicPattern {
  keywords: RegExp;
  titles: {
    ar: string;
    derja: string;
    en: string;
    fr: string;
  };
}

const TOPIC_PATTERNS: TopicPattern[] = [
  // 1. Greetings / Identity / Who are you? ("chkiunek", "chkoun enti", etc.)
  {
    keywords: /(?:chki?unek|chkou?nek|chkoun\s+enti|chkoun\s+entouma|qui\s+es[- ]tu|qui\s+êtes[- ]vous|who\s+are\s+you|who\s+made\s+you|c['\s]?est\s+quoi\s+idaara|من\s+أنت|من\s+انت|ما\s+هي\s+إدارتي|ما\s+هو\s+هذا\s+الموقع|^(?:3as+lema|aslema|ahla|salam|mar7ba|bonjour|salut|hello|hi|coucou|صباح\s+الخير|مساء\s+الخير|السلام|عسلامة|أهلا|مرحبا)[\s!.,?]*$)/i,
    titles: {
      ar: 'التعريف بمنصة إدارة',
      derja: 'Présentation Idaara AI',
      en: 'About Idaara AI',
      fr: 'Présentation Idaara AI',
    },
  },

  // 2. Passeport
  {
    keywords: /(?:passeport|passport|جواز(?:\s+سفر)?|باسبور)/i,
    titles: {
      ar: 'جواز السفر التونسي',
      derja: 'Passeport Tunisien',
      en: 'Tunisian Passport',
      fr: 'Passeport Tunisien',
    },
  },

  // 3. Carte d'Identité (CIN)
  {
    keywords: /(?:\bcin\b|identite|identité|بطاقة\s+(?:ال)?تعريف|bita9at\s+(?:el\s*)?ta3rif)/i,
    titles: {
      ar: 'بطاقة التعريف الوطنية (CIN)',
      derja: 'Carte d\'Identité (CIN)',
      en: 'National ID Card (CIN)',
      fr: 'Carte d\'Identité (CIN)',
    },
  },

  // 4. Bulletin N°3 (B3) / Casier Judiciaire
  {
    keywords: /(?:\bb3\b|bulletin\s*(?:n[°o])?\s*3|سوابق|عدلية|casier|3dad\s+3|bita9at\s+sawabi9)/i,
    titles: {
      ar: 'بطاقة السوابق العدلية (ب3)',
      derja: 'Bulletin N°3 (B3)',
      en: 'Criminal Record (B3)',
      fr: 'Bulletin N°3 (B3)',
    },
  },

  // 5. Carte Grise / ATTT / Voiture / Karhba
  {
    keywords: /(?:carte\s+grise|grise|karhba|كرهبة|رمادية|\battt\b|mutation\s+carte|visite\s+technique)/i,
    titles: {
      ar: 'البطاقة الرمادية للسيارات',
      derja: 'Mutation Carte Grise',
      en: 'Vehicle Registration',
      fr: 'Mutation Carte Grise',
    },
  },

  // 6. Auto-Entrepreneur / Freelance / 1%
  {
    keywords: /(?:auto[- ]entrepreneur|مبادر(?:\s+ذاتي)?|freelance|فريلانس|patente|باتيندة|\b1\s*%\b)/i,
    titles: {
      ar: 'نظام المبادر الذاتي (1%)',
      derja: 'Statut Auto-Entrepreneur',
      en: 'Auto-Entrepreneur (1%)',
      fr: 'Statut Auto-Entrepreneur',
    },
  },

  // 7. Contrat de Bail / Location / Kré
  {
    keywords: /(?:contrat|bail|location|louer|kr[eé]|كراء|عقد\s+كراء)/i,
    titles: {
      ar: 'عقد كراء سكني وتصديق',
      derja: 'Contrat de Bail & Location',
      en: 'Residential Lease Contract',
      fr: 'Contrat de Bail Conforme',
    },
  },

  // 8. Concours / CAPES / Recrutement
  {
    keywords: /(?:concours|capes|كاباس|مناظرة|مناظرات|edunet|wadhifa|recrutement)/i,
    titles: {
      ar: 'مناظرات الوظيفة العمومية',
      derja: 'Concours Fonction Publique',
      en: 'Public Job Competitions',
      fr: 'Concours Fonction Publique',
    },
  },

  // 9. CNSS & Retraite
  {
    keywords: /(?:\bcnss\b|retraite|تقاعد|ضمان\s+اجتماعي|jarraya|pension)/i,
    titles: {
      ar: 'الضمان الاجتماعي والتقاعد',
      derja: 'CNSS & Retraite',
      en: 'CNSS & Pension',
      fr: 'CNSS & Retraite',
    },
  },

  // 10. CNAM & Carnet de soins
  {
    keywords: /(?:\bcnam\b|soins|علاج|كنام|carnet\s+de\s+soins|remboursement)/i,
    titles: {
      ar: 'التأمين على المرض (كنام)',
      derja: 'CNAM & Carnet de soins',
      en: 'CNAM Health Coverage',
      fr: 'CNAM & Carnet de soins',
    },
  },

  // 11. STEG & SONEDE / Factures
  {
    keywords: /(?:\bsteg\b|\bsonede\b|ستاغ|صوناد|كهرباء|ماء|facture\s+steg|facture\s+sonede)/i,
    titles: {
      ar: 'خدمات وفواتير الستاغ والصوناد',
      derja: 'Factures STEG & SONEDE',
      en: 'STEG & SONEDE Utilities',
      fr: 'Factures STEG & SONEDE',
    },
  },

  // 12. Douane & FCR
  {
    keywords: /(?:douane|\bfcr\b|ديوانة|تخليص|n\.t\.d)/i,
    titles: {
      ar: 'الديوانة والامتياز الجبائي FCR',
      derja: 'Douane & Avantage FCR',
      en: 'Customs & FCR Exemption',
      fr: 'Douane & Avantage FCR',
    },
  },

  // 13. Extrait de Naissance / Madhmoun
  {
    keywords: /(?:madhmoun|مضمون(?:\s+ولادة)?|naissance|etat\s+civil)/i,
    titles: {
      ar: 'مضمون ولادة والحالة المدنية',
      derja: 'Extrait de Naissance',
      en: 'Birth Certificate',
      fr: 'Extrait de Naissance',
    },
  },

  // 14. Permis de Conduire
  {
    keywords: /(?:permis\s+de\s+conduire|permis|سياقة|رخصة\s+سياقة)/i,
    titles: {
      ar: 'رخصة السياقة',
      derja: 'Permis de Conduire',
      en: 'Driving License',
      fr: 'Permis de Conduire',
    },
  },

  // 15. Permis de Bâtir
  {
    keywords: /(?:permis\s+de\s+b[aâ]tir|رخصة\s+بناء|construction)/i,
    titles: {
      ar: 'رخصة البناء البلدية',
      derja: 'Permis de Bâtir',
      en: 'Building Permit',
      fr: 'Permis de Bâtir',
    },
  },

  // 16. Hojjet Wafet & Héritage
  {
    keywords: /(?:hojjet|wafet|حجة\s+وفاة|ورثة|ميراث|إرث|ارث|succession)/i,
    titles: {
      ar: 'حجة الوفاة وحصر الإرث',
      derja: 'Hojjet Wafet & Héritage',
      en: 'Inheritance & Succession',
      fr: 'Hojjet Wafet & Héritage',
    },
  },

  // 17. Timbres Fiscaux
  {
    keywords: /(?:timbres?|timbres?\s+fiscaux|timbre\s+fiscal|طابع\s+(?:جبائي|مالي)|ت[ن]?مبر|معلوم\s+التنبير|quittance)/i,
    titles: {
      ar: 'التنابر والمعاليم الجبائية',
      derja: 'Timbres Fiscaux',
      en: 'Fiscal Stamp Fees',
      fr: 'Timbres Fiscaux',
    },
  },

  // 18. Légalisation Baladiya
  {
    keywords: /(?:baladiya|بلدية|ta3rif|l[eé]galisation|conforme|تعريف\s+بالإمضاء)/i,
    titles: {
      ar: 'التعريف بالإمضاء والبلدية',
      derja: 'Légalisation Baladiya',
      en: 'Baladiya Legalization',
      fr: 'Légalisation Baladiya',
    },
  },
];

// Conversational filler patterns to strip when extracting custom topics
const FILLER_PATTERNS = [
  /^(?:quelles?\s+sont\s+les\s+d[ée]marches\s+(?:pour|de)|comment\s+faire\s+pour|comment\s+puis[- ]je|je\s+voudrais\s+savoir|quel\s+est\s+le\s+prix\s+de|combien\s+co[uû]te|quels?\s+sont\s+les\s+documents\s+pour|aide[- ]moi\s+pour|comment\s+obtenir|est[- ]ce\s+que|j['\s]?aimerais\s+savoir|pouvez[- ]vous\s+m['\s]?aider\s+pour)\s*/i,
  /^(?:chnu?wa\s+lezemni\s+bech|kifech\s+na3mel\s+(?:bech)?|kifech\s+najem|chnia\s+wra9|awra9\s+el|9oli\s+3la|chkoun|win\s+najem|billahi|bellehi|aman|ya5i|brabi|za3ma)\s*/i,
  /^(?:ما\s+هي\s+الإجراءات\s+المطلوبة\s+ل|ما\s+هي\s+الوثائق\s+المطلوبة\s+ل|كيفاش\s+نعمل\s+باش|كيف\s+يمكنني|أريد\s+معرفة|كم\s+يبلغ\s+معلوم|بالله\s+قل\s+لي|أين\s+يمكنني|ساعدني\s+في)\s*/i,
  /^(?:what\s+are\s+the\s+steps\s+for|how\s+to\s+get|how\s+do\s+i|tell\s+me\s+about|what\s+documents\s+do\s+i\s+need\s+for|where\s+can\s+i|can\s+you\s+help\s+me\s+with)\s*/i,
];

/**
 * Summarizes a user's prompt into a clean, concise 2-4 word resume/title.
 */
export function summarizePromptToTitle(prompt: string, locale: string = 'derja'): string {
  if (!prompt || !prompt.trim()) {
    return locale === 'ar'
      ? 'استشارة إدارية'
      : locale === 'en'
      ? 'Civic Consultation'
      : locale === 'fr'
      ? 'Démarche Citoyenne'
      : 'Consultation Idaria';
  }

  const clean = prompt.trim();

  // 1. Check known civic and identity topic patterns
  for (const pattern of TOPIC_PATTERNS) {
    if (pattern.keywords.test(clean)) {
      const loc = (locale === 'ar' || locale === 'derja' || locale === 'en' || locale === 'fr') ? locale : 'derja';
      return pattern.titles[loc];
    }
  }

  // 2. Fallback: Clean conversational fluff and extract the core topic
  let stripped = clean;
  for (const filler of FILLER_PATTERNS) {
    stripped = stripped.replace(filler, '');
  }

  // Remove trailing punctuation
  stripped = stripped.replace(/[?!.:;،؟]+$/g, '').trim();

  if (!stripped || stripped.length < 2) {
    return locale === 'ar'
      ? 'استشارة إدارية'
      : locale === 'en'
      ? 'Civic Consultation'
      : locale === 'fr'
      ? 'Démarche Citoyenne'
      : 'Consultation Idaria';
  }

  // Capitalize first character of words if Latin script
  const isArabic = /[\u0600-\u06FF]/.test(stripped);
  if (!isArabic) {
    stripped = stripped
      .split(/\s+/)
      .slice(0, 4)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  } else {
    stripped = stripped.split(/\s+/).slice(0, 4).join(' ');
  }

  // Cap at 32 chars
  if (stripped.length > 32) {
    stripped = stripped.slice(0, 32).trim() + '...';
  }

  return stripped;
}
