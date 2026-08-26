export interface EmergencyContact {
  id: string;
  name: { ar: string; fr: string; en: string; derja: string };
  number: string;
  icon: string;
  category: 'emergency' | 'health' | 'civic' | 'utility' | 'legal';
  available24h: boolean;
  isTollFree: boolean;
  description?: { ar: string; fr: string; en: string; derja: string };
  tags?: string[];
}

export interface Ministry {
  id: string;
  name: { ar: string; fr: string; en: string; derja: string };
  phone: string;
  website: string;
  address: string;
  tags?: string[];
}

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'police',
    name: { ar: 'الشرطة — النجدة الوطنية', fr: 'Police Secours', en: 'Police Emergency', derja: 'El Chorta — En-Nejda' },
    number: '197',
    icon: '🚓',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'نداء النجدة الفوري والتدخل الأمني السريع داخل المناطق البلدية', fr: 'Intervention d\'urgence et sécurité publique en zone urbaine', en: 'Immediate emergency police dispatch in municipal zones', derja: 'Nejda fawriya w amn fel mdina' },
    tags: ['police', 'secours', 'crime', 'vol', 'urgence', 'chorta', '197'],
  },
  {
    id: 'garde-nationale',
    name: { ar: 'الحرس الوطني (خارج البلديات والطرقات)', fr: 'Garde Nationale', en: 'National Guard', derja: 'El 7ars el Watani' },
    number: '193',
    icon: '🛡️',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'التدخل الأمني بالطرقات السريعة، المناطق الريفية، والحدودية', fr: 'Sécurité et urgences sur autoroutes, zones rurales et périurbaines', en: 'Highway safety, rural emergency, and coastal/border zones', derja: 'Amn fel kayeset, l\'autoroute wel blayes el barra mel mdina' },
    tags: ['garde nationale', 'hars', 'autoroute', 'kayes', 'securite', '193'],
  },
  {
    id: 'samu',
    name: { ar: 'الإسعاف الطبي الاستعجالي (SAMU)', fr: 'SAMU — Urgences Médicales', en: 'SAMU — Medical Emergency', derja: 'SAMU — El 7adra et-Tibbiya' },
    number: '190',
    icon: '🚑',
    category: 'health',
    available24h: true,
    isTollFree: true,
    description: { ar: 'سيارات الإسعاف الطبي المتنقل والتدخل السريع للحالات الحرجة', fr: 'Ambulances médicalisées d\'urgence et réanimation 24/7', en: 'Mobile intensive care ambulance and critical care dispatch', derja: 'Ambulance w is3af tibbi fawri fel wa9t' },
    tags: ['samu', 'ambulance', 'hopital', 'sante', 'urgence', 'medecin', '190'],
  },
  {
    id: 'pompiers',
    name: { ar: 'الحماية المدنية (الإطفاء والإنقاذ)', fr: 'Protection Civile / Pompiers', en: 'Civil Protection & Fire Brigade', derja: 'El 7maya el Madaniya' },
    number: '198',
    icon: '🚒',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'إطفاء الحرائق، حوادث المرور، الإنقاذ المائي، والكوارث الطبيعية', fr: 'Lutte contre les incendies, secours routier et sauvetage', en: 'Fire extinguishing, rescue, road accidents, and natural disasters', derja: '7ri9a, 7awadeth el kayes, in9adh w kawareth' },
    tags: ['pompiers', 'protection civile', 'feu', 'incendie', 'accident', 'inondation', '198'],
  },
  {
    id: 'sos-violence',
    name: { ar: 'الرقم الأخضر للإشعار بالعنف ضد المرأة', fr: 'Ligne Verte Anti-Violence Femmes & Enfants', en: 'Domestic Violence Helpline', derja: 'El Khat el 5adher l’dhaya2 el 3onf' },
    number: '1899',
    icon: '🆘',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'الإشعار والإحاطة النفسية والقانونية لضحايا العنف الأسري', fr: 'Écoute, signalement et assistance juridique aux victimes de violences', en: 'Confidential support, legal guidance, and shelter for victims', derja: 'I7ata nafsiya w 9anouniya l’dhaya2 el 3onf' },
    tags: ['violence', 'femme', 'enfant', 'famille', 'aide', 'sos', '1899'],
  },
  {
    id: 'enfance-1809',
    name: { ar: 'الرقم الأخضر للإشعار بالطفولة المهددة', fr: 'Protection de l\'Enfance en Danger', en: 'Child Protection Helpline', derja: 'Khat 7mayet et-Toufoula' },
    number: '1809',
    icon: '👶',
    category: 'civic',
    available24h: true,
    isTollFree: true,
    description: { ar: 'الإبلاغ عن حالات الخطر المحدق بالأطفال والإحاطة النفسية', fr: 'Signalement d\'enfants en situation de danger ou de maltraitance', en: 'Reporting child endangerment and psychological support', derja: 'Bllegh 3la ayy sghir fi 7alat khatar' },
    tags: ['enfant', 'enfance', 'protection', 'maltraitance', 'sghir', '1809'],
  },
  {
    id: 'anti-corruption',
    name: { ar: 'الخط الأخضر للتبليغ عن الفساد', fr: 'N° Vert Signalement Corruption', en: 'Anti-Corruption Hotline', derja: 'Khat el 5adher: bllegh 3al fesad' },
    number: '80 100 200',
    icon: '⚖️',
    category: 'civic',
    available24h: false,
    isTollFree: true,
    description: { ar: 'الإبلاغ عن الرشوة والفساد وسوء استخدام السلطة الإدارية', fr: 'Signalement citoyen des faits de corruption et abus de pouvoir', en: 'Citizen reporting for corruption and administrative misconduct', derja: 'Bllegh 3al rachwa wel fesad el idari' },
    tags: ['corruption', 'inlucc', 'rachwa', 'justice', 'fased'],
  },
  {
    id: 'cnss-line',
    name: { ar: 'الرقم الأخضر للصندوق الوطني للضمان الاجتماعي', fr: 'Centre d\'Appel CNSS', en: 'CNSS Social Security Hotline', derja: 'Khat CNSS el 5adher' },
    number: '80 100 066',
    icon: '🛡️',
    category: 'civic',
    available24h: false,
    isTollFree: true,
    description: { ar: 'الاستفسار عن الانخراط، كشف الأجور، وملفات التقاعد والجرايات', fr: 'Renseignements affiliations, carrières et dossiers de retraite', en: 'Affiliation status, wage records, and pension claims', derja: 'Es2el 3al CNSS mte3ek, el jaraya wel chahriyét' },
    tags: ['cnss', 'retraite', 'salaire', 'social', 'ta9a3od'],
  },
  {
    id: 'centre-empoisonnement',
    name: { ar: 'مركز المساعدة الطبية ومكافحة التسمم بتونس', fr: 'Centre Anti-Poisons de Tunis (CAMU)', en: 'Tunis Poison Control Center', derja: 'Centre Anti-Poison Tunis' },
    number: '71 578 000',
    icon: '☠️',
    category: 'health',
    available24h: true,
    isTollFree: false,
    description: { ar: 'استشارات عاجلة في حالات التسمم الدوائي، الغذائي، والكيميائي ولغات الحشرات', fr: 'Conseils toxicologiques d\'urgence pour intoxications médicamenteuses ou chimiques', en: 'Emergency toxicological guidance for poisonings and bites', derja: '7alat et-tasammom bel dwa, mekla walla 7acharat' },
    tags: ['poison', 'toxique', 'medicament', 'morsure', 'urgence', 'hopital'],
  },
  {
    id: 'pharmacies',
    name: { ar: 'خدمة الصيدليات المناوبة بالليل (SMS/Vocal)', fr: 'Pharmacies de Garde de Nuit', en: 'Night Duty Pharmacies Directory', derja: 'Farmashiyet el lill wel naouba' },
    number: '3636',
    icon: '💊',
    category: 'health',
    available24h: true,
    isTollFree: false,
    description: { ar: 'معرفة الصيدليات المفتوحة ليلاً وأيام العطل بكامل تراب الجمهورية', fr: 'Trouver instantanément la pharmacie de garde ouverte dans votre ville', en: 'Locate open night-shift pharmacies across all governorates', derja: 'A3ref el farmashia el ma7loula fi 7oumtek fel lill' },
    tags: ['pharmacie', 'garde', 'medicament', 'nuit', 'farmacia'],
  },
  {
    id: 'steg-panne',
    name: { ar: 'مركز نداء أعطال الكهرباء والغاز (STEG)', fr: 'Centre de Dépannage STEG', en: 'STEG Power & Gas Emergency', derja: 'STEG — Reklamation el Dhaou wel Gaz' },
    number: '71 341 000',
    icon: '⚡',
    category: 'utility',
    available24h: true,
    isTollFree: false,
    description: { ar: 'الإبلاغ عن انقطاع التيار الكهربائي، تسرب الغاز، أو سقوط الأسلاك', fr: 'Signalement de pannes électriques, fuites de gaz ou câbles tombés', en: 'Report power outages, gas leaks, or fallen power lines', derja: 'Ballegh 3al 9assan el dhaou walla fuite gaz' },
    tags: ['steg', 'electricite', 'gaz', 'panne', 'dhaou', 'coupure'],
  },
  {
    id: 'sonede-fuite',
    name: { ar: 'الرقم الأخضر ونداء طوارئ مياه الشرب (SONEDE)', fr: 'Numéro Vert Fuites & Pannes SONEDE', en: 'SONEDE Water Emergency Hotline', derja: 'SONEDE — Khat el 5adher el Me2' },
    number: '80 100 319',
    icon: '💧',
    category: 'utility',
    available24h: true,
    isTollFree: true,
    description: { ar: 'الإبلاغ عن انفجار قنوات المياه، انقطاع الإمداد، أو التسربات بالشارع', fr: 'Signalement de rupture de canalisation ou coupure d\'eau potable', en: 'Report burst water mains, supply cuts, or street leaks', derja: 'Ballegh 3al fuite me2 walla 9assan el me2' },
    tags: ['sonede', 'eau', 'fuite', 'coupure', 'me2', 'panne'],
  },
  {
    id: 'croissant-rouge',
    name: { ar: 'الهلال الأحمر التونسي — المقر المركزي', fr: 'Croissant-Rouge Tunisien', en: 'Tunisian Red Crescent', derja: 'El Hilel el A7mar Tounsi' },
    number: '71 800 153',
    icon: '🌙',
    category: 'health',
    available24h: false,
    isTollFree: false,
    description: { ar: 'العمل الإغاثي الإنساني، حملات التبرع بالدم، والتطوع المجتمعي', fr: 'Action humanitaire, don de sang et secourisme communautaire', en: 'Humanitarian relief, blood donation campaigns, and volunteering', derja: 'Tabarrou3 bel damm w a3mel khayriya' },
    tags: ['croissant rouge', 'don du sang', 'secourisme', 'aide'],
  },
  {
    id: 'douane-hotline',
    name: { ar: 'الرقم الأخضر للديوانة التونسية', fr: 'Numéro Vert Douane Tunisienne', en: 'Tunisian Customs Hotline', derja: 'Khat el Douane el 5adher' },
    number: '80 100 376',
    icon: '🛃',
    category: 'civic',
    available24h: false,
    isTollFree: true,
    description: { ar: 'الاستفسار عن إجراءات FCR، المعاليم الجمركية، والتبليغ عن التجاوزات', fr: 'Renseignements FCR, régimes douaniers et réclamations', en: 'Inquiries regarding FCR vehicle duty and customs clearance', derja: 'Es2el 3al FCR wel diwana mte3ek' },
    tags: ['douane', 'fcr', 'taxe', 'import', 'diwana'],
  },
];

export const ministriesData: Ministry[] = [
  {
    id: 'interieur',
    name: { ar: 'وزارة الداخلية', fr: 'Ministère de l\'Intérieur', en: 'Ministry of Interior', derja: 'Wezaret el Da5liya' },
    phone: '+216 71 333 000',
    website: 'https://www.interieur.gov.tn',
    address: 'Place de la Kasbah, 1008 Tunis',
  },
  {
    id: 'finances',
    name: { ar: 'وزارة المالية', fr: 'Ministère des Finances', en: 'Ministry of Finance', derja: 'Wezaret el Maliya' },
    phone: '+216 71 571 888',
    website: 'https://www.finances.gov.tn',
    address: 'Place de la Kasbah, 1008 Tunis',
  },
  {
    id: 'education',
    name: { ar: 'وزارة التربية الوطنية', fr: 'Ministère de l\'Éducation', en: 'Ministry of Education', derja: 'Wezaret el Tarbiya' },
    phone: '+216 71 786 300',
    website: 'https://www.education.gov.tn',
    address: 'Rue Bab Bnet, 1030 Tunis',
  },
  {
    id: 'sante',
    name: { ar: 'وزارة الصحة', fr: 'Ministère de la Santé', en: 'Ministry of Health', derja: 'Wezaret es-Se77a' },
    phone: '+216 71 578 000',
    website: 'https://www.santetunisie.rns.tn',
    address: 'Bab Saadoun, 1006 Tunis',
  },
  {
    id: 'justice',
    name: { ar: 'وزارة العدل', fr: 'Ministère de la Justice', en: 'Ministry of Justice', derja: 'Wezaret el 3adl' },
    phone: '+216 71 232 000',
    website: 'https://www.justice.gov.tn',
    address: 'Cité El Khadra, 1003 Tunis',
  },
  {
    id: 'emploi',
    name: { ar: 'وزارة الشغل', fr: 'Ministère de l\'Emploi', en: 'Ministry of Employment', derja: 'Wezaret el 5edma' },
    phone: '+216 71 780 900',
    website: 'https://www.emploi.gov.tn',
    address: 'Avenue Bab Bnet, Tunis',
  },
  {
    id: 'transport',
    name: { ar: 'وزارة النقل', fr: 'Ministère du Transport', en: 'Ministry of Transport', derja: 'Wezaret en-Na9l' },
    phone: '+216 71 355 100',
    website: 'https://www.transport.gov.tn',
    address: 'Rue Hedi Nouira, 1001 Tunis',
  },
  {
    id: 'affaires-sociales',
    name: { ar: 'وزارة الشؤون الاجتماعية', fr: 'Ministère des Affaires Sociales', en: 'Ministry of Social Affairs', derja: 'Wezaret ech-Chou2oun el Ijtima3iya' },
    phone: '+216 71 786 655',
    website: 'https://www.social.gov.tn',
    address: 'Bab Bnet, Tunis',
  },
  {
    id: 'agriculture',
    name: { ar: 'وزارة الفلاحة', fr: 'Ministère de l\'Agriculture', en: 'Ministry of Agriculture', derja: 'Wezaret el Fla7a' },
    phone: '+216 71 783 200',
    website: 'https://www.agriculture.gov.tn',
    address: 'Rue Alain Savary, 1002 Tunis',
  },
  {
    id: 'commerce',
    name: { ar: 'وزارة التجارة', fr: 'Ministère du Commerce', en: 'Ministry of Commerce', derja: 'Wezaret et-Tejara' },
    phone: '+216 71 350 600',
    website: 'https://www.commerce.gov.tn',
    address: 'Rue 8601, Montplaisir, Tunis',
  },
];
