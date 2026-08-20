export type SupportedLanguage = 'derja' | 'fr' | 'ar';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubheadline: string;
  heroCTA: string;
  heroSecondaryCTA: string;
  voiceSearchBarPlaceholder: string;
  voiceActivePrompt: string;
  voiceListening: string;
  featuresTitle: string;
  featuresSubtitle: string;
  copilotNav: string;
  fasserliNav: string;
  documentsNav: string;
  calculatorNav: string;
  locatorNav: string;
  launchpadNav: string;
  proceduresNav: string;
  footerDisclaimer: string;
  ramadanHours: string;
  summerHours: string;
  regularHours: string;
  timbreTotal: string;
  generatePdfBtn: string;
  downloadPdfBtn: string;
  fillFormPrompt: string;
  searchPlaceholder: string;
  allGovernorates: string;
  allCategories: string;
  zeroStorageBanner: string;
  zeroStorageSub: string;
}

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  derja: {
    appName: "Idaara.tn",
    appSubtitle: "إدارة.تونس",
    heroBadge: "Awwel Copilot Idari bel Derja w AI fi Tounes",
    heroHeadline: "Fasserli, 3abbi w a3tini l'awra9 fi",
    heroHeadlineHighlight: "Thweni ma3doudin.",
    heroSubheadline: "Matdhaya3ch wa9tek fel sfoufet w l'awra9 el ne9sa. Es'el bel derja, faser awra9ek bel OCR, w a3mel les contrats wel procurations mte3ek mriglin lel Baladiya.",
    heroCTA: "Jarreb el Voice Copilot",
    heroSecondaryCTA: "Fasserli Hal War9a (OCR)",
    voiceSearchBarPlaceholder: "Ekteb walla tkallem bel Derja... (mthelen: 'Chnouwa lezemni lel passeport?')",
    voiceActivePrompt: "9oul chnowa 7achtek, Idaara AI tesma3 fik...",
    voiceListening: "9a3ed nesma3 fik...",
    featuresTitle: "Koll chay tes7a9ou m3a l'Idara fi blasa wa7da",
    featuresSubtitle: "Men ghir te3b, men ghir ma yarj3ouk 3la timbre ne9es walla war9a ghalta.",
    copilotNav: "Voice Copilot",
    fasserliNav: "Fasserli OCR",
    documentsNav: "Smart PDF",
    calculatorNav: "Timbre & Awra9",
    locatorNav: "Guide Baladiyas",
    launchpadNav: "Freelance Hub",
    proceduresNav: "Dalil el Idara",
    footerDisclaimer: "Idaara.tn menassa mosta9ella lel mowaten el tounsi bech tsahalou l'awra9 wel 9awanin el rasmiya.",
    ramadanHours: "Taw9it Romdhan",
    summerHours: "Séance Unique (Sayf)",
    regularHours: "Taw9it 3adi (Chte)",
    timbreTotal: "El Majmou3 el Te9ribi lel Timbres",
    generatePdfBtn: "Talla3 el Wathi9a PDF",
    downloadPdfBtn: "Telechargi el PDF",
    fillFormPrompt: "3abbi el ma3loumet mte3ek lena:",
    searchPlaceholder: "Lawwej 3la procédure, Baladiya, Recette...",
    allGovernorates: "El Wilayat el Kol (24)",
    allCategories: "El Masale7 el Kol",
    zeroStorageBanner: "Zero-Storage Privacy Protocol",
    zeroStorageSub: "Les documents mte3ek yet3aljou fi la7dha w yetfas5ou direct men el mémoire.",
  },
  fr: {
    appName: "Idaara.tn",
    appSubtitle: "Administration Tunisienne Intelligente",
    heroBadge: "1er Copilot Administratif Vocal & IA en Tunisie",
    heroHeadline: "Expliquez, Remplissez et Obtenez vos papiers en",
    heroHeadlineHighlight: "Quelques Secondes.",
    heroSubheadline: "Ne perdez plus votre temps dans les files d'attente pour un timbre manquant. Posez vos questions en Derja ou Français, analysez vos courriers par OCR et générez vos formulaires officiels.",
    heroCTA: "Lancer le Voice Copilot",
    heroSecondaryCTA: "Analyser un document (OCR)",
    voiceSearchBarPlaceholder: "Écrivez ou dictez votre demande... (ex: 'Papiers renouvellement passeport')",
    voiceActivePrompt: "Parlez librement, l'IA Idaara vous écoute...",
    voiceListening: "Écoute en cours...",
    featuresTitle: "Tous les services administratifs tunisiens unifiés",
    featuresSubtitle: "Évitez les allers-retours inutiles grâce à nos calculateurs de timbres et formulaires officiels.",
    copilotNav: "Voice Copilot",
    fasserliNav: "Scanner OCR",
    documentsNav: "Smart PDF",
    calculatorNav: "Calculateur Timbres",
    locatorNav: "Annuaire Baladiyas",
    launchpadNav: "Freelance Hub",
    proceduresNav: "Démarches",
    footerDisclaimer: "Idaara.tn est un assistant citoyen indépendant basé sur les textes juridiques et décrets officiels du JORT.",
    ramadanHours: "Horaire Ramadan",
    summerHours: "Séance Unique (Été)",
    regularHours: "Horaire Normal (Hiver)",
    timbreTotal: "Budget Total Estimé des Timbres",
    generatePdfBtn: "Générer le Document PDF",
    downloadPdfBtn: "Télécharger le PDF Vectoriel",
    fillFormPrompt: "Renseignez les champs requis :",
    searchPlaceholder: "Rechercher une démarche, municipalité, recette...",
    allGovernorates: "Toutes les Régions (24)",
    allCategories: "Tous les Organismes",
    zeroStorageBanner: "Protocole de Confidentialité Zéro-Stockage",
    zeroStorageSub: "Vos pièces d'identité et courriers sont analysés en mémoire vive éphémère puis supprimés instantanément.",
  },
  ar: {
    appName: "إدارة.تونس",
    appSubtitle: "المساعد الإداري الذكي الأول في تونس",
    heroBadge: "أول مساعد إداري صوتي بالدارجة والذكاء الاصطناعي",
    heroHeadline: "فسّر، عمّر وخرّج أوراقك القانونية في",
    heroHeadlineHighlight: "ثوانٍ معدودة.",
    heroSubheadline: "لا تضيّع وقتك في الطوابير بسبب تنبري ناقص أو وثيقة غير مطابقة. اسأل بالدارجة التونسية، صوّر أي وثيقة لتفسيرها فورياً، واستخرج عقودك وتواكلك جاهزة للتعريف بالإمضاء في البلدية.",
    heroCTA: "جرب المساعد الصوتي",
    heroSecondaryCTA: "فسّرلي هالورقة (OCR)",
    voiceSearchBarPlaceholder: "اكتب أو تكلّم بالدارجة... (مثال: 'شنوة يلزمني لتجديد جواز السفر؟')",
    voiceActivePrompt: "تكلّم بكل تلقائية، إدارة.تونس تسمع فيك...",
    voiceListening: "جار الاستماع...",
    featuresTitle: "كل الإجراءات الإدارية التونسية في منصة واحدة",
    featuresSubtitle: "وداعاً للمفاجآت عند الشبابيك بفضل حاسبة التنابر والوثائق الرسمية التلقائية.",
    copilotNav: "المساعد الصوتي",
    fasserliNav: "فسّرلي هالورقة",
    documentsNav: "الوثائق الرسمية",
    calculatorNav: "حاسبة التنابر",
    locatorNav: "دليل البلديات",
    launchpadNav: "فضاء المستقلين",
    proceduresNav: "دليل الإجراءات",
    footerDisclaimer: "إدارة.تونس منصة مواطنية مستقلة مستندة إلى النصوص القانونية والرائد الرسمي للجمهورية التونسية.",
    ramadanHours: "توقيت شهر رمضان",
    summerHours: "الحصة الواحدة (الصيف)",
    regularHours: "التوقيت العادي (الحصتان)",
    timbreTotal: "المجموع التقديري لمعاليم التنابر",
    generatePdfBtn: "استخراج وثيقة PDF",
    downloadPdfBtn: "تحميل الوثيقة الرسمية",
    fillFormPrompt: "أدخل البيانات المطلوبة لإعداد الوثيقة:",
    searchPlaceholder: "ابحث عن إجراء، بلدية، قباضة مالية...",
    allGovernorates: "كامل ولايات الجمهورية (24)",
    allCategories: "جميع الإدارات والمصالح",
    zeroStorageBanner: "بروتوكول حماية الخصوصية المطلقة (Zero-Storage)",
    zeroStorageSub: "تتم معالجة الوثائق وبطاقات التعريف بصورة مؤقتة في الذاكرة الحية وتُحذف فورياً.",
  }
};
