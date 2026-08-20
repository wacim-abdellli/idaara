import { proceduresData, getProcedureById } from '../data/procedures';
import { ChatMessage, ChatMessageAction } from '../types/chat';

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

  // Keyword intents mapping
  if (
    query.includes('passeport') ||
    query.includes('passport') ||
    query.includes('safra') ||
    query.includes('voyage') ||
    query.includes('جواز') ||
    query.includes('سفر')
  ) {
    const p = getProcedureById('passeport-renouvellement')!;
    if (locale === 'ar') {
      return {
        content: `لتجديد جواز السفر التونسي، يتطلب الملف تنبراً جبائياً بقيمة 80 ديناراً (أو 25 ديناراً للتلاميذ والطلبة)، 4 صور شمسية خلفية بيضاء، بطاقة التعريف الوطنية وجواز السفر القديم. يُودع الملف بمركز الأمن الوطني أو الحرس الوطني لمقر سكناك.`,
        relatedProcedureId: p.id,
        timbreBreakdown: {
          totalTND: 86.0,
          items: [
            { label: 'تنبر جبائي (80 د.ت)', amount: 80.0 },
            { label: '4 صور شمسية (6 د.ت)', amount: 6.0 },
          ],
        },
        actions: [
          {
            label: { derja: '📋 Chouf el Dossier Kemel', fr: 'Consulter la fiche démarche', ar: '📋 الاطلاع على تفاصيل الإجراء' },
            type: 'procedure_link',
            payload: `/procedures/${p.id}`,
          },
          {
            label: { derja: '🧮 7seb el Timbres', fr: 'Calculer les timbres', ar: '🧮 حاسبة التنابر والوثائق' },
            type: 'calculator_link',
            payload: `/calculator?proc=${p.id}`,
          },
        ],
      };
    }

    if (locale === 'fr') {
      return {
        content: `Pour renouveler votre passeport tunisien, vous devez fournir un timbre fiscal de 80 TND (25 TND pour élèves/étudiants), 4 photos d'identité fond blanc, une copie de la CIN et l'ancien passeport. Le dépôt s'effectue au poste de police ou brigade de la garde nationale territorialement compétent.`,
        relatedProcedureId: p.id,
        timbreBreakdown: {
          totalTND: 86.0,
          items: [
            { label: 'Timbre fiscal passeport', amount: 80.0 },
            { label: '4 Photos d’identité', amount: 6.0 },
          ],
        },
        actions: [
          {
            label: { derja: '📋 Chouf el Dossier Kemel', fr: 'Consulter la démarche', ar: 'تفاصيل الإجراء' },
            type: 'procedure_link',
            payload: `/procedures/${p.id}`,
          },
          {
            label: { derja: '🧮 7seb el Timbres', fr: 'Calculateur budget timbres', ar: 'حاسبة التنابر' },
            type: 'calculator_link',
            payload: `/calculator?proc=${p.id}`,
          },
        ],
      };
    }

    // Derja default
    return {
      content: `Bech t'beddel el Passeport mte3ek lezmek:\n1. Timbre fiscal mte3 80 DT (25 DT kenek etudiant/telmidth)\n2. 4 tsawer chamsiya jdod b'khalfiya baydha2\n3. Copie CIN m3a l'original\n4. El passeport el 9dim mte3ek\n\nEl dossier yetsabb fi Markez el Chorta walla el 7aras el marje3 el tourabi mte3 seknek. Yo93od bin 7 w 15 jours bech ye7dher.`,
      relatedProcedureId: p.id,
      timbreBreakdown: {
        totalTND: 86.0,
        items: [
          { label: 'Timbre fiscal (Recette des finances)', amount: 80.0 },
          { label: '4 Tsawer chamsiya', amount: 6.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📋 Dossier el Passeport Kemel', fr: 'Guide Passeport', ar: 'دليل الجواز الكامل' },
          type: 'procedure_link',
          payload: `/procedures/${p.id}`,
        },
        {
          label: { derja: '🧮 7seb el Budget wel Timbres', fr: 'Calculer Timbres', ar: 'حساب التنابر' },
          type: 'calculator_link',
          payload: `/calculator?proc=${p.id}`,
        },
        {
          label: { derja: '📍 A9reb Markez Chorta', fr: 'Trouver le commissariat', ar: 'أقرب مركز أمن' },
          type: 'office_link',
          payload: `/locator?cat=police_garde`,
        },
      ],
    };
  }

  // Carte grise / Car sale
  if (
    query.includes('carte grise') ||
    query.includes('karhba') ||
    query.includes('sayara') ||
    query.includes('mutation') ||
    query.includes('chrit') ||
    query.includes('vente') ||
    query.includes('سيارة') ||
    query.includes('رمادية')
  ) {
    const p = getProcedureById('mutation-carte-grise')!;
    if (locale === 'ar') {
      return {
        content: `لتحويل ملكية سيارة وتغيير البطاقة الرمادية بعد الشراء، لديك أجل 15 يوماً للقيام بالإجراءات:\n1. إبرام عقد البيع والتعريف بالإمضاء في البلدية.\n2. تسجيل العقد بالقباضة المالية (معلوم التسجيل).\n3. إيداع الملف بالوكالة الفنية للنقل البري (ATTT) مع شهادة الفحص الفني والبطاقة الرمادية السابقة.`,
        relatedProcedureId: p.id,
        timbreBreakdown: {
          totalTND: 145.0,
          items: [
            { label: 'تسجيل العقد بالقباضة', amount: 100.0 },
            { label: 'معاليم البطاقة الجديدة ATTT', amount: 40.0 },
            { label: 'التعريف بالإمضاء (البلدية)', amount: 5.0 },
          ],
        },
        actions: [
          {
            label: { derja: '📄 3abbi 3a9d Bay3 Karhba PDF', fr: 'Générer Contrat de Vente PDF', ar: '📄 إعداد عقد بيع سيارة جاهز للطباعة' },
            type: 'pdf_form',
            payload: `/documents/contrat-vente-vehicule`,
          },
          {
            label: { derja: '📋 Guide el Carte Grise', fr: 'Guide Mutation', ar: 'تفاصيل تحويل الملكية' },
            type: 'procedure_link',
            payload: `/procedures/${p.id}`,
          },
        ],
      };
    }

    return {
      content: `Mabrouk el Karhba! Bech t'baddel el Carte Grise fi esmek 3andek délai 15 jours max:\n1. Sa77e7 Contrat de vente mou3arref bel imdha2 fel Baladiya (Beye3 w Chari).\n2. Sajjel el Contrat fel Recette des Finances w 5alles les droits d'enregistrement (environ 100 DT).\n3. Sobb el dossier fel ATTT m3a Carte grise l'9dima m'sa77a7 fiha el beye3, Visite technique sal7a, w copie CIN.`,
      relatedProcedureId: p.id,
      timbreBreakdown: {
        totalTND: 145.0,
        items: [
          { label: 'Enregistrement contrat fel Recette', amount: 100.0 },
          { label: 'Frais carte grise ATTT', amount: 40.0 },
          { label: 'Légalisation signature Baladiya', amount: 5.0 },
        ],
      },
      actions: [
        {
          label: { derja: '📄 Talla3 Contrat Bay3 Karhba PDF', fr: 'Générer Contrat Vente PDF', ar: 'عقد بيع سيارة PDF' },
          type: 'pdf_form',
          payload: `/documents/contrat-vente-vehicule`,
        },
        {
          label: { derja: '📋 Etape par étape Carte Grise', fr: 'Guide Carte Grise', ar: 'دليل الإجراء الكامل' },
          type: 'procedure_link',
          payload: `/procedures/${p.id}`,
        },
        {
          label: { derja: '📍 A9reb Agence ATTT', fr: 'Agences ATTT', ar: 'فروع وكالة النقل' },
          type: 'office_link',
          payload: `/locator?cat=attt`,
        },
      ],
    };
  }

  // Location / Contrat de bail
  if (
    query.includes('kré') ||
    query.includes('kre') ||
    query.includes('location') ||
    query.includes('bail') ||
    query.includes('dar') ||
    query.includes('كراء') ||
    query.includes('إيجار')
  ) {
    const p = getProcedureById('contrat-location-habitation')!;
    return {
      content: `Bech ta3mel Contrat de Location (3a9d Kré) mrigel w ma ya3mloulekch mochekla fel Baladiya:\n1. Lezem 3 nsa5 men el contrat fihom l'adresse bel gde, el soum bel chhar, w montant el dhamen.\n2. Tsa77ou el kéri wel mektéri fel Baladiya (Copie conforme / Légalisation).\n3. Tsaljouh fel Recette des Finances (1% men el kré el sanawi) bech ya5ou date certaine w yabda 9anouni 100%.`,
      relatedProcedureId: p.id,
      actions: [
        {
          label: { derja: '📝 Talla3 Contrat Kré PDF Hadher', fr: 'Générer Contrat de Bail PDF', ar: '📝 استخراج عقد كراء قانوني جاهز' },
          type: 'pdf_form',
          payload: `/documents/contrat-location`,
        },
        {
          label: { derja: '📋 Dalil el Kré wel Timbres', fr: 'Guide Location', ar: 'دليل الكراء والتسجيل' },
          type: 'procedure_link',
          payload: `/procedures/${p.id}`,
        },
      ],
    };
  }

  // Auto-entrepreneur / Freelance
  if (
    query.includes('auto') ||
    query.includes('entrepreneur') ||
    query.includes('freelance') ||
    query.includes('patente') ||
    query.includes('charika') ||
    query.includes('مبادر') ||
    query.includes('ذاتي') ||
    query.includes('باتيندة')
  ) {
    const p = getProcedureById('statut-auto-entrepreneur')!;
    return {
      content: `Nidham el Auto-Entrepreneur fi Tounes houwa a7sen 7al lel Freelancers w les prestataires de services:\n- Dhariba sghira barcha: 1% lel services w 0.5% lel commerce/artisanat.\n- CNSS forfaitaire m5afadh (environ 50-60 DT par trimestre).\n- Men ghir comptable, kol chay 3la plateforme en ligne, w te5ou carte d'auto-entrepreneur mrigla b'QR code rasmi.`,
      relatedProcedureId: p.id,
      actions: [
        {
          label: { derja: '🚀 Freelancer & Startup Launchpad', fr: 'Ouvrir Freelance Launchpad', ar: '🚀 فضاء المستقلين والمبادر الذاتي' },
          type: 'procedure_link',
          payload: `/launchpad`,
        },
        {
          label: { derja: '📋 Guide Auto-Entrepreneur', fr: 'Guide Auto-Entrepreneur', ar: 'دليل المبادر الذاتي' },
          type: 'procedure_link',
          payload: `/procedures/${p.id}`,
        },
      ],
    };
  }

  // General / Fallback administrative response
  return {
    content: `Idaara.tn Copilot fhem talab mte3ek: "${prompt}".\n\nTnajjem tes'elni 3la ay procédure idariya fi Tounes kima:\n- 🪪 **Passeport, CIN, Extrait de naissance, B3**\n- 🚗 **Carte grise, Permis de conduire, Contrat de vente**\n- 💼 **Statut Auto-Entrepreneur, Patente, RNE, Facturation export**\n- 🏠 **Contrat de bail, Compteur STEG, SONEDE**\n- 🏥 **Remboursements CNAM, CNSS**\n- ✈️ **Régime FCR & Douane**\n\nChnowa el procédure elli t7eb nfassarlek awra9ha walla n7adherlek el PDF mte3ha?`,
    actions: [
      {
        label: { derja: '📚 Chouf el Dalil el Kemel (25+ Procédures)', fr: 'Catalogue complet des démarches', ar: '📚 تصفح دليل الإجراءات الكامل' },
        type: 'procedure_link',
        payload: `/procedures`,
      },
      {
        label: { derja: '📄 Fasserli Hal War9a (OCR)', fr: 'Analyser un document', ar: '📄 تفسير وثيقة مصورة (OCR)' },
        type: 'procedure_link',
        payload: `/fasserli`,
      },
    ],
  };
}
