export interface EmergencyContact {
  id: string;
  name: { ar: string; fr: string; en: string; derja: string };
  number: string;
  icon: string;
  category: 'emergency' | 'health' | 'civic' | 'utility' | 'legal';
  available24h: boolean;
  isTollFree: boolean;
  description?: { ar: string; fr: string; en: string; derja: string };
}

export interface Ministry {
  id: string;
  name: { ar: string; fr: string; en: string; derja: string };
  phone: string;
  website: string;
  address: string;
}

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'police',
    name: { ar: 'الشرطة — النجدة', fr: 'Police Secours', en: 'Police Emergency', derja: 'El chorta — en-nejda' },
    number: '197',
    icon: '🚓',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'اتصل في حالة الطوارئ أو الجريمة', fr: 'Appelez en cas d\'urgence ou de crime', en: 'Call in case of emergency or crime', derja: 'Appel fi 7alat el khatra walla jari2ma' },
  },
  {
    id: 'samu',
    name: { ar: 'SAMU — الإسعاف', fr: 'SAMU — Urgences médicales', en: 'SAMU — Medical Emergency', derja: 'SAMU — el 7adra' },
    number: '190',
    icon: '🚑',
    category: 'health',
    available24h: true,
    isTollFree: true,
    description: { ar: 'طوارئ طبية وإسعاف', fr: 'Urgences médicales et ambulances', en: 'Medical emergencies and ambulances', derja: '7alat tibbiya w ambulances' },
  },
  {
    id: 'pompiers',
    name: { ar: 'الحماية المدنية', fr: 'Pompiers / Protection Civile', en: 'Fire Brigade', derja: 'El 7maya el madaniya' },
    number: '198',
    icon: '🚒',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'حرائق وكوارث وحوادث', fr: 'Incendies, catastrophes et accidents', en: 'Fires, disasters and accidents', derja: '7ri9a, kéwareth w 7awadth' },
  },
  {
    id: 'sos-violence',
    name: { ar: 'خط نجدة ضحايا العنف', fr: 'SOS Violence — Femmes et Enfants', en: 'SOS Violence Hotline', derja: 'Khat mosanadett dhaya2 el 3onf' },
    number: '1899',
    icon: '🆘',
    category: 'emergency',
    available24h: true,
    isTollFree: true,
    description: { ar: 'خط مساندة ضحايا العنف الأسري', fr: 'Soutien aux victimes de violence domestique', en: 'Support for domestic violence victims', derja: 'Mosanadda l dhaya2 el 3onf el osri' },
  },
  {
    id: 'anti-corruption',
    name: { ar: 'الخط الأخضر لمكافحة الفساد (INLUCC)', fr: 'N° vert anti-corruption INLUCC', en: 'Anti-Corruption Hotline (INLUCC)', derja: 'Khat el 5adher: fased w blleghlou' },
    number: '0800 100 200',
    icon: '📞',
    category: 'civic',
    available24h: false,
    isTollFree: true,
    description: { ar: 'الإبلاغ عن الفساد', fr: 'Signalement de corruption', en: 'Report corruption', derja: 'Blleghou 3al fesad — majjanen' },
  },
  {
    id: 'cnss-line',
    name: { ar: 'الخط الأخضر CNSS', fr: 'Ligne verte CNSS', en: 'CNSS Green Line', derja: 'Khat el 5adher CNSS' },
    number: '80 100 066',
    icon: '🛡️',
    category: 'civic',
    available24h: false,
    isTollFree: true,
    description: { ar: 'استفسارات الضمان الاجتماعي', fr: 'Renseignements CNSS', en: 'CNSS social security inquiries', derja: 'Tes2el 3al CNSS mte3ek majjanen' },
  },
  {
    id: 'pharmacies',
    name: { ar: 'الصيدليات المناوبة', fr: 'Pharmacies de garde', en: 'On-duty Pharmacies', derja: 'Farmashiyet el naouba' },
    number: '3636',
    icon: '💊',
    category: 'health',
    available24h: true,
    isTollFree: false,
    description: { ar: 'معرفة الصيدليات المفتوحة', fr: 'Trouver la pharmacie ouverte la nuit', en: 'Find open pharmacies', derja: 'Find el farmashia el 7adera' },
  },
  {
    id: 'steg-panne',
    name: { ar: 'أعطال الكهرباء — STEG', fr: 'Pannes électricité STEG', en: 'STEG Power Outage', derja: 'STEG — daww t9atta3 w blleghlou' },
    number: '71 341 000',
    icon: '⚡',
    category: 'utility',
    available24h: true,
    isTollFree: false,
  },
  {
    id: 'sonede-fuite',
    name: { ar: 'أعطال الماء — SONEDE', fr: 'Fuites d\'eau SONEDE', en: 'SONEDE Water Leak', derja: 'SONEDE — me2 yeddi w blleghlou' },
    number: '71 847 000',
    icon: '💧',
    category: 'utility',
    available24h: true,
    isTollFree: false,
  },
  {
    id: 'centre-empoisonnement',
    name: { ar: 'مركز مكافحة التسمم', fr: 'Centre Anti-Poison de Tunis', en: 'Poison Control Center', derja: 'Centre Anti-Poison Tunis' },
    number: '71 578 000',
    icon: '☠️',
    category: 'health',
    available24h: true,
    isTollFree: false,
    description: { ar: 'حالات التسمم والسموم', fr: 'Urgences empoisonnement', en: 'Poisoning emergencies', derja: '7alat et-tasammom' },
  },
  {
    id: 'croissant-rouge',
    name: { ar: 'الهلال الأحمر التونسي', fr: 'Croissant-Rouge Tunisien', en: 'Tunisian Red Crescent', derja: 'El Hilel el A7mar Tounsi' },
    number: '71 800 153',
    icon: '🌙',
    category: 'health',
    available24h: false,
    isTollFree: false,
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
