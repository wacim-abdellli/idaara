import { PublicOffice, Governorate, OfficeCategory } from '../types/office';

export const publicOfficesData: PublicOffice[] = [
  // ================= TUNIS =================
  {
    id: 'baladiya-tunis-centrale',
    name: {
      derja: "Baladiyat Tunis el Markaziya (Hôtel de Ville)",
      fr: "Municipalité de Tunis - Hôtel de Ville (La Kasbah)",
      ar: "بلدية تونس - القصر البلدي (القصبة)",
      en: "Municipality of Tunis - City Hall (La Kasbah)",
    },
    category: 'baladiya',
    governorate: 'Tunis',
    delegation: 'Médina',
    address: "Place de la Kasbah, 1006 Tunis",
    phone: "+216 71 561 000",
    coordinates: { lat: 36.7992, lng: 10.1658 },
    googleMapsUrl: "https://maps.google.com/?q=36.7992,10.1658",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30 (Samedi 09:00 - 12:00 permanence)" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00 (Séance Unique)" },
    },
    tips: {
      derja: "Femme guichet express lel copie conforme. A7sen wa9t bech temchi: 08:45 sbe7.",
      fr: "Guichet rapide pour légalisation de signature. Affluence modérée entre 8h30 et 10h.",
      ar: "شباك سريع للتعريف بالإمضاء ومطابقة الأصل. أفضل وقت لتفادي الاكتظاظ: 8:45 صباحاً.",
      en: "Fast-track counter for signature legalization. Moderately busy between 8:30 and 10:00.",
    }
  },
  {
    id: 'recette-finances-bebedzira',
    name: {
      derja: "Recette des Finances Bab El Dzirah",
      fr: "Recette des Finances - Bab El Jazira",
      ar: "القباضة المالية باب الجزيرة - تونس",
      en: "Treasury Office (Recette des Finances) - Bab El Jazira",
    },
    category: 'recette_finances',
    governorate: 'Tunis',
    delegation: 'Bab El Bhar',
    address: "Avenue Bab Djedid / Bab Dzira, Tunis",
    phone: "+216 71 324 150",
    coordinates: { lat: 36.7925, lng: 10.1740 },
    googleMapsUrl: "https://maps.google.com/?q=36.7925,10.1740",
    hasConformeService: false,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:15 - 16:30 (Caisse ferme à 16:00)" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:00" },
      summer: { days: "Lundi - Vendredi", hours: "07:15 - 13:30" },
    },
    tips: {
      derja: "Tnajjem techri timbres passeport, permis, w contrat kré lena. 5alles bel espèce walla carte bancaire.",
      fr: "Tous timbres fiscaux disponibles. Paiement par carte bancaire ou espèces.",
      ar: "توفر جميع التنابر الجبائية (جواز، سيارات، عقود). الدفع نقداً أو بالبطاقة البنكية.",
      en: "All tax stamps available (passport, vehicles, contracts). Pay by card or cash.",
    }
  },
  {
    id: 'poste-centrale-tunis',
    name: {
      derja: "Poste Centrale Tunis (Rue Charles de Gaulle)",
      fr: "Poste Centrale de Tunis - Charles de Gaulle",
      ar: "مكتب البريد المركزي - شارع شارل ديغول تونس",
      en: "Central Post Office of Tunis - Charles de Gaulle",
    },
    category: 'poste',
    governorate: 'Tunis',
    delegation: 'Bab Bhar',
    address: "Rue Charles de Gaulle, 1000 Tunis",
    phone: "+216 71 320 000",
    coordinates: { lat: 36.7997, lng: 10.1772 },
    googleMapsUrl: "https://maps.google.com/?q=36.7997,10.1772",
    hasConformeService: false,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:00 - 18:00 (Non-stop) / Samedi 09:00 - 12:15" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:00" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 13:30" },
    }
  },
  {
    id: 'attt-tunis-menzah',
    name: {
      derja: "Agence ATTT Tunis (El Menzah)",
      fr: "Agence Technique des Transports Terrestres - El Menzah",
      ar: "الوكالة الفنية للنقل البري - المنزه تونس",
      en: "Land Transport Technical Agency (ATTT) - El Menzah",
    },
    category: 'attt',
    governorate: 'Tunis',
    delegation: 'El Menzah',
    address: "Cité El Khadra / Avenue Habib Bourguiba, Tunis",
    phone: "+216 71 789 220",
    coordinates: { lat: 36.8320, lng: 10.1850 },
    googleMapsUrl: "https://maps.google.com/?q=36.8320,10.1850",
    hasConformeService: false,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:00 - 15:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 13:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:00 - 13:00" },
    }
  },
  {
    id: 'rne-centre-urbain',
    name: {
      derja: "Siège RNE Centre Urbain Nord",
      fr: "Centre National du Registre des Entreprises (RNE)",
      ar: "المركز الوطني للسجل الوطني للمؤسسات - المركز العمراني الشمالي",
      en: "National Business Register (RNE) Center",
    },
    category: 'rne',
    governorate: 'Tunis',
    delegation: 'El Menzah',
    address: "Centre Urbain Nord, 1082 Tunis",
    phone: "+216 70 248 000",
    coordinates: { lat: 36.8450, lng: 10.1980 },
    googleMapsUrl: "https://maps.google.com/?q=36.8450,10.1980",
    hasConformeService: false,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 16:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:00" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 13:30" },
    }
  },

  // ================= ARIANA =================
  {
    id: 'baladiya-ariana-centrale',
    name: {
      derja: "Baladiyat Ariana (Centre-ville)",
      fr: "Municipalité de l'Ariana - Siège Central",
      ar: "بلدية أريانة - المقر المركزي",
      en: "Municipality of Ariana - Main Office",
    },
    category: 'baladiya',
    governorate: 'Ariana',
    delegation: 'Ariana Ville',
    address: "Avenue Habib Bourguiba, 2080 Ariana",
    phone: "+216 71 712 111",
    coordinates: { lat: 36.8625, lng: 10.1956 },
    googleMapsUrl: "https://maps.google.com/?q=36.8625,10.1956",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },
  {
    id: 'cnam-ariana',
    name: {
      derja: "Centre Régional CNAM Ariana",
      fr: "Centre Régional CNAM - Ariana",
      ar: "المركز الجهوي للصندوق الوطني للتأمين على المرض - أريانة",
      en: "Regional CNAM Center - Ariana",
    },
    category: 'cnam',
    governorate: 'Ariana',
    delegation: 'Ariana Ville',
    address: "Rue Ahmed Khabthani, Ariana",
    phone: "+216 71 700 890",
    coordinates: { lat: 36.8601, lng: 10.1920 },
    googleMapsUrl: "https://maps.google.com/?q=36.8601,10.1920",
    hasConformeService: false,
    hasTimbreVendor: false,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:00 - 16:00" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 13:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 13:30" },
    }
  },

  // ================= SOUSSE =================
  {
    id: 'baladiya-sousse-centrale',
    name: {
      derja: "Baladiyat Sousse (Corniche / Boujaafar)",
      fr: "Municipalité de Sousse - Siège Central",
      ar: "بلدية سوسة - المقر المركزي (الكورنيش)",
      en: "Municipality of Sousse - Main Office",
    },
    category: 'baladiya',
    governorate: 'Sousse',
    delegation: 'Sousse Ville',
    address: "Rue de la République, 4000 Sousse",
    phone: "+216 73 224 811",
    coordinates: { lat: 35.8256, lng: 10.6370 },
    googleMapsUrl: "https://maps.google.com/?q=35.8256,10.6370",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },
  {
    id: 'recette-finances-sousse-port',
    name: {
      derja: "Recette des Finances Sousse Port",
      fr: "Recette des Finances - Sousse Port",
      ar: "القباضة المالية سوسة الميناء",
      en: "Treasury Office (Recette des Finances) - Sousse Port",
    },
    category: 'recette_finances',
    governorate: 'Sousse',
    delegation: 'Sousse Ville',
    address: "Avenue Habib Bourguiba, Sousse",
    phone: "+216 73 225 120",
    coordinates: { lat: 35.8280, lng: 10.6410 },
    googleMapsUrl: "https://maps.google.com/?q=35.8280,10.6410",
    hasConformeService: false,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:15 - 16:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:00" },
      summer: { days: "Lundi - Vendredi", hours: "07:15 - 13:30" },
    }
  },

  // ================= SFAX =================
  {
    id: 'baladiya-sfax-centrale',
    name: {
      derja: "Baladiyat Sfax (Hédi Chaker)",
      fr: "Municipalité de Sfax - Siège Central",
      ar: "بلدية صفاقس - قصر البلدية (ساحة الاستقلال)",
      en: "Municipality of Sfax - Main Office",
    },
    category: 'baladiya',
    governorate: 'Sfax',
    delegation: 'Sfax Ville',
    address: "Avenue Habib Bourguiba, 3000 Sfax",
    phone: "+216 74 220 800",
    coordinates: { lat: 34.7406, lng: 10.7603 },
    googleMapsUrl: "https://maps.google.com/?q=34.7406,10.7603",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },
  {
    id: 'attt-sfax',
    name: {
      derja: "Agence ATTT Sfax (Route de Gabès)",
      fr: "Agence Technique des Transports Terrestres - Sfax",
      ar: "الوكالة الفنية للنقل البري - صفاقس (طريق قابس)",
      en: "Land Transport Technical Agency (ATTT) - Sfax",
    },
    category: 'attt',
    governorate: 'Sfax',
    delegation: 'Sfax Sud',
    address: "Km 3 Route de Gabès, Sfax",
    phone: "+216 74 468 900",
    coordinates: { lat: 34.7200, lng: 10.7350 },
    googleMapsUrl: "https://maps.google.com/?q=34.7200,10.7350",
    hasConformeService: false,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:00 - 15:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 13:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:00 - 13:00" },
    }
  },

  // ================= NABEUL =================
  {
    id: 'baladiya-nabeul',
    name: {
      derja: "Baladiyat Nabeul (Jarre)",
      fr: "Municipalité de Nabeul - Siège Central",
      ar: "بلدية نابل - المقر المركزي",
      en: "Municipality of Nabeul - Main Office",
    },
    category: 'baladiya',
    governorate: 'Nabeul',
    delegation: 'Nabeul Ville',
    address: "Avenue Habib Bourguiba, 8000 Nabeul",
    phone: "+216 72 285 433",
    coordinates: { lat: 36.4560, lng: 10.7376 },
    googleMapsUrl: "https://maps.google.com/?q=36.4560,10.7376",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },

  // ================= BIZERTE =================
  {
    id: 'baladiya-bizerte',
    name: {
      derja: "Baladiyat Bizerte (Vieux Port)",
      fr: "Municipalité de Bizerte - Siège Central",
      ar: "بلدية بنزرت - المقر المركزي",
      en: "Municipality of Bizerte - Main Office",
    },
    category: 'baladiya',
    governorate: 'Bizerte',
    delegation: 'Bizerte Nord',
    address: "Avenue Taïeb Mhiri, 7000 Bizerte",
    phone: "+216 72 431 333",
    coordinates: { lat: 37.2744, lng: 9.8739 },
    googleMapsUrl: "https://maps.google.com/?q=37.2744,9.8739",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },

  // ================= MONASTIR =================
  {
    id: 'baladiya-monastir',
    name: {
      derja: "Baladiyat Monastir (Bourguiba)",
      fr: "Municipalité de Monastir",
      ar: "بلدية المنستير - المقر المركزي",
      en: "Municipality of Monastir",
    },
    category: 'baladiya',
    governorate: 'Monastir',
    delegation: 'Monastir Ville',
    address: "Place du 7 Novembre, 5000 Monastir",
    phone: "+216 73 461 400",
    coordinates: { lat: 35.7770, lng: 10.8260 },
    googleMapsUrl: "https://maps.google.com/?q=35.7770,10.8260",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },

  // ================= GABÈS =================
  {
    id: 'baladiya-gabes',
    name: {
      derja: "Baladiyat Gabès (Centre Ville)",
      fr: "Municipalité de Gabès",
      ar: "بلدية قابس - المقر المركزي",
      en: "Municipality of Gabès",
    },
    category: 'baladiya',
    governorate: 'Gabès',
    delegation: 'Gabès Ville',
    address: "Avenue Farhat Hached, 6000 Gabès",
    phone: "+216 75 270 500",
    coordinates: { lat: 33.8815, lng: 10.0982 },
    googleMapsUrl: "https://maps.google.com/?q=33.8815,10.0982",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },

  // ================= KAIROUAN =================
  {
    id: 'baladiya-kairouan',
    name: {
      derja: "Baladiyat el Kairouan",
      fr: "Municipalité de Kairouan",
      ar: "بلدية القيروان - المقر الرئيسي",
      en: "Municipality of Kairouan",
    },
    category: 'baladiya',
    governorate: 'Kairouan',
    delegation: 'Kairouan Nord',
    address: "Avenue de la République, 3100 Kairouan",
    phone: "+216 77 232 500",
    coordinates: { lat: 35.6781, lng: 10.0963 },
    googleMapsUrl: "https://maps.google.com/?q=35.6781,10.0963",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },

  // ================= MÉDENINE (Djerba / Zarzis) =================
  {
    id: 'baladiya-djerba-houmt-souk',
    name: {
      derja: "Baladiyat Djerba Houmt Souk",
      fr: "Municipalité de Djerba - Houmt Souk",
      ar: "بلدية جربة حومة السوق",
      en: "Municipality of Djerba - Houmt Souk",
    },
    category: 'baladiya',
    governorate: 'Médenine',
    delegation: 'Djerba Houmt Souk',
    address: "Avenue Habib Bourguiba, 4180 Houmt Souk",
    phone: "+216 75 650 015",
    coordinates: { lat: 33.8750, lng: 10.8580 },
    googleMapsUrl: "https://maps.google.com/?q=33.8750,10.8580",
    hasConformeService: true,
    hasTimbreVendor: true,
    schedule: {
      regular: { days: "Lundi - Vendredi", hours: "08:30 - 13:00 / 14:00 - 17:30" },
      ramadan: { days: "Lundi - Vendredi", hours: "08:00 - 14:30" },
      summer: { days: "Lundi - Vendredi", hours: "07:30 - 14:00" },
    }
  },

  // ================= CNSS — ALL 24 GOUVERNORATS =================
  {
    id: 'cnss-tunis-centre', name: { derja: 'CNSS Tunis Centre (Avenue de Paris)', fr: 'CNSS Tunis Centre — Avenue de Paris', ar: 'الصندوق الوطني للضمان الاجتماعي — تونس المركز', en: 'CNSS Tunis Centre — Avenue de Paris' }, category: 'cnss', governorate: 'Tunis', delegation: 'Tunis Ville', address: 'Avenue de Paris, 1000 Tunis', phone: '+216 71 354 600', coordinates: { lat: 36.8065, lng: 10.1815 }, googleMapsUrl: 'https://maps.google.com/?q=36.8065,10.1815', hasConformeService: false, hasTimbreVendor: false, website: 'https://e-cnss.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: '7adher shéhéda el CNSS mte3ek online 3al e-cnss.tn qbal ma temchi.', fr: 'Téléchargez votre attestation CNSS sur e-cnss.tn avant de vous déplacer.', ar: 'حمّل شهادة الانخراط من e-cnss.tn قبل التنقل لتوفير الوقت.', en: 'Download your CNSS certificate from e-cnss.tn before you go.' }
  },
  {
    id: 'cnss-ariana', name: { derja: 'CNSS Ariana', fr: 'CNSS Ariana — Cité Ennasr', ar: 'الصندوق الوطني للضمان الاجتماعي — أريانة', en: 'CNSS Ariana — Cité Ennasr' }, category: 'cnss', governorate: 'Ariana', delegation: 'Ariana Ville', address: 'Cité Ennasr, Ariana', phone: '+216 71 703 000', coordinates: { lat: 36.8625, lng: 10.1946 }, googleMapsUrl: 'https://maps.google.com/?q=36.8625,10.1946', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-ben-arous', name: { derja: 'CNSS Ben Arous', fr: 'CNSS Ben Arous', ar: 'الصندوق الوطني للضمان الاجتماعي — بن عروس', en: 'CNSS Ben Arous' }, category: 'cnss', governorate: 'Ben Arous', delegation: 'Ben Arous', address: 'Avenue Habib Bourguiba, Ben Arous', phone: '+216 71 382 000', coordinates: { lat: 36.7533, lng: 10.2277 }, googleMapsUrl: 'https://maps.google.com/?q=36.7533,10.2277', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-manouba', name: { derja: 'CNSS Manouba', fr: 'CNSS Manouba', ar: 'الصندوق الوطني للضمان الاجتماعي — منوبة', en: 'CNSS Manouba' }, category: 'cnss', governorate: 'Manouba', delegation: 'Manouba', address: 'Manouba Centre', phone: '+216 71 601 000', coordinates: { lat: 36.8081, lng: 10.0986 }, googleMapsUrl: 'https://maps.google.com/?q=36.8081,10.0986', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-sfax', name: { derja: 'CNSS Sfax', fr: 'CNSS Sfax — Direction Régionale', ar: 'الصندوق الوطني للضمان الاجتماعي — صفاقس', en: 'CNSS Sfax — Regional Directorate' }, category: 'cnss', governorate: 'Sfax', delegation: 'Sfax Ville', address: 'Avenue Habib Bourguiba, 3000 Sfax', phone: '+216 74 224 000', coordinates: { lat: 34.7406, lng: 10.7603 }, googleMapsUrl: 'https://maps.google.com/?q=34.7406,10.7603', hasConformeService: false, hasTimbreVendor: false, website: 'https://e-cnss.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: 'Sfax wadhmar — 7adher le numéro de dossier mte3ek.', fr: 'Sfax très fréquenté — préparez votre numéro de dossier.', ar: 'مزدحم في صفاقس — احضر رقم الملف مسبقاً.', en: 'Very busy in Sfax — have your file number ready.' }
  },
  {
    id: 'cnss-sousse', name: { derja: 'CNSS Sousse', fr: 'CNSS Sousse', ar: 'الصندوق الوطني للضمان الاجتماعي — سوسة', en: 'CNSS Sousse' }, category: 'cnss', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Léopold Senghor, 4000 Sousse', phone: '+216 73 224 000', coordinates: { lat: 35.8245, lng: 10.6346 }, googleMapsUrl: 'https://maps.google.com/?q=35.8245,10.6346', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-nabeul', name: { derja: 'CNSS Nabeul', fr: 'CNSS Nabeul', ar: 'الصندوق الوطني للضمان الاجتماعي — نابل', en: 'CNSS Nabeul' }, category: 'cnss', governorate: 'Nabeul', delegation: 'Nabeul', address: 'Avenue Habib Bourguiba, 8000 Nabeul', phone: '+216 72 286 000', coordinates: { lat: 36.4561, lng: 10.7376 }, googleMapsUrl: 'https://maps.google.com/?q=36.4561,10.7376', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-bizerte', name: { derja: 'CNSS Bizerte', fr: 'CNSS Bizerte', ar: 'الصندوق الوطني للضمان الاجتماعي — بنزرت', en: 'CNSS Bizerte' }, category: 'cnss', governorate: 'Bizerte', delegation: 'Bizerte Nord', address: 'Avenue Habib Bourguiba, 7000 Bizerte', phone: '+216 72 433 000', coordinates: { lat: 37.2744, lng: 9.8739 }, googleMapsUrl: 'https://maps.google.com/?q=37.2744,9.8739', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-beja', name: { derja: 'CNSS Béja', fr: 'CNSS Béja', ar: 'الصندوق الوطني للضمان الاجتماعي — باجة', en: 'CNSS Béja' }, category: 'cnss', governorate: 'Béja', delegation: 'Béja Nord', address: 'Béja Centre', phone: '+216 78 456 000', coordinates: { lat: 36.7256, lng: 9.1817 }, googleMapsUrl: 'https://maps.google.com/?q=36.7256,9.1817', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-jendouba', name: { derja: 'CNSS Jendouba', fr: 'CNSS Jendouba', ar: 'الصندوق الوطني للضمان الاجتماعي — جندوبة', en: 'CNSS Jendouba' }, category: 'cnss', governorate: 'Jendouba', delegation: 'Jendouba Nord', address: 'Avenue Habib Bourguiba, Jendouba', phone: '+216 78 630 000', coordinates: { lat: 36.5011, lng: 8.7803 }, googleMapsUrl: 'https://maps.google.com/?q=36.5011,8.7803', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-kef', name: { derja: 'CNSS Le Kef', fr: 'CNSS Le Kef', ar: 'الصندوق الوطني للضمان الاجتماعي — الكاف', en: 'CNSS Le Kef' }, category: 'cnss', governorate: 'Le Kef', delegation: 'Le Kef Ouest', address: 'Le Kef Centre', phone: '+216 78 221 000', coordinates: { lat: 36.1824, lng: 8.7148 }, googleMapsUrl: 'https://maps.google.com/?q=36.1824,8.7148', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-siliana', name: { derja: 'CNSS Siliana', fr: 'CNSS Siliana', ar: 'الصندوق الوطني للضمان الاجتماعي — سليانة', en: 'CNSS Siliana' }, category: 'cnss', governorate: 'Siliana', delegation: 'Siliana Nord', address: 'Siliana Centre', phone: '+216 78 870 000', coordinates: { lat: 36.0843, lng: 9.3708 }, googleMapsUrl: 'https://maps.google.com/?q=36.0843,9.3708', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-monastir', name: { derja: 'CNSS Monastir', fr: 'CNSS Monastir', ar: 'الصندوق الوطني للضمان الاجتماعي — المنستير', en: 'CNSS Monastir' }, category: 'cnss', governorate: 'Monastir', delegation: 'Monastir', address: 'Avenue Habib Bourguiba, 5000 Monastir', phone: '+216 73 461 000', coordinates: { lat: 35.7643, lng: 10.8113 }, googleMapsUrl: 'https://maps.google.com/?q=35.7643,10.8113', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-mahdia', name: { derja: 'CNSS Mahdia', fr: 'CNSS Mahdia', ar: 'الصندوق الوطني للضمان الاجتماعي — المهدية', en: 'CNSS Mahdia' }, category: 'cnss', governorate: 'Mahdia', delegation: 'Mahdia', address: 'Avenue Habib Bourguiba, 5100 Mahdia', phone: '+216 73 681 000', coordinates: { lat: 35.5047, lng: 11.0622 }, googleMapsUrl: 'https://maps.google.com/?q=35.5047,11.0622', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-kairouan', name: { derja: 'CNSS Kairouan', fr: 'CNSS Kairouan', ar: 'الصندوق الوطني للضمان الاجتماعي — القيروان', en: 'CNSS Kairouan' }, category: 'cnss', governorate: 'Kairouan', delegation: 'Kairouan Nord', address: 'Avenue de la République, 3100 Kairouan', phone: '+216 77 231 000', coordinates: { lat: 35.6772, lng: 10.0978 }, googleMapsUrl: 'https://maps.google.com/?q=35.6772,10.0978', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-kasserine', name: { derja: 'CNSS Kasserine', fr: 'CNSS Kasserine', ar: 'الصندوق الوطني للضمان الاجتماعي — القصرين', en: 'CNSS Kasserine' }, category: 'cnss', governorate: 'Kasserine', delegation: 'Kasserine Nord', address: 'Avenue Habib Bourguiba, 1200 Kasserine', phone: '+216 77 471 000', coordinates: { lat: 35.1676, lng: 8.8365 }, googleMapsUrl: 'https://maps.google.com/?q=35.1676,8.8365', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-sidi-bouzid', name: { derja: 'CNSS Sidi Bouzid', fr: 'CNSS Sidi Bouzid', ar: 'الصندوق الوطني للضمان الاجتماعي — سيدي بوزيد', en: 'CNSS Sidi Bouzid' }, category: 'cnss', governorate: 'Sidi Bouzid', delegation: 'Sidi Bouzid Ouest', address: 'Sidi Bouzid Centre', phone: '+216 76 630 000', coordinates: { lat: 35.0382, lng: 9.4849 }, googleMapsUrl: 'https://maps.google.com/?q=35.0382,9.4849', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-gabes', name: { derja: 'CNSS Gabès', fr: 'CNSS Gabès', ar: 'الصندوق الوطني للضمان الاجتماعي — قابس', en: 'CNSS Gabès' }, category: 'cnss', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Avenue Habib Bourguiba, 6000 Gabès', phone: '+216 75 274 000', coordinates: { lat: 33.8881, lng: 10.0982 }, googleMapsUrl: 'https://maps.google.com/?q=33.8881,10.0982', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-medenine', name: { derja: 'CNSS Médenine', fr: 'CNSS Médenine', ar: 'الصندوق الوطني للضمان الاجتماعي — مدنين', en: 'CNSS Médenine' }, category: 'cnss', governorate: 'Médenine', delegation: 'Médenine Nord', address: 'Avenue Habib Bourguiba, 4100 Médenine', phone: '+216 75 640 000', coordinates: { lat: 33.3547, lng: 10.5053 }, googleMapsUrl: 'https://maps.google.com/?q=33.3547,10.5053', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-tataouine', name: { derja: 'CNSS Tataouine', fr: 'CNSS Tataouine', ar: 'الصندوق الوطني للضمان الاجتماعي — تطاوين', en: 'CNSS Tataouine' }, category: 'cnss', governorate: 'Tataouine', delegation: 'Tataouine Nord', address: 'Tataouine Centre', phone: '+216 75 860 000', coordinates: { lat: 32.9211, lng: 10.4510 }, googleMapsUrl: 'https://maps.google.com/?q=32.9211,10.4510', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-gafsa', name: { derja: 'CNSS Gafsa', fr: 'CNSS Gafsa', ar: 'الصندوق الوطني للضمان الاجتماعي — قفصة', en: 'CNSS Gafsa' }, category: 'cnss', governorate: 'Gafsa', delegation: 'Gafsa Nord', address: 'Avenue Habib Bourguiba, 2100 Gafsa', phone: '+216 76 221 000', coordinates: { lat: 34.4250, lng: 8.7842 }, googleMapsUrl: 'https://maps.google.com/?q=34.4250,8.7842', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-tozeur', name: { derja: 'CNSS Tozeur', fr: 'CNSS Tozeur', ar: 'الصندوق الوطني للضمان الاجتماعي — توزر', en: 'CNSS Tozeur' }, category: 'cnss', governorate: 'Tozeur', delegation: 'Tozeur', address: 'Tozeur Centre', phone: '+216 76 452 000', coordinates: { lat: 33.9197, lng: 8.1335 }, googleMapsUrl: 'https://maps.google.com/?q=33.9197,8.1335', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-kebili', name: { derja: 'CNSS Kébili', fr: 'CNSS Kébili', ar: 'الصندوق الوطني للضمان الاجتماعي — قبلي', en: 'CNSS Kébili' }, category: 'cnss', governorate: 'Kébili', delegation: 'Kébili Sud', address: 'Kébili Centre', phone: '+216 75 491 000', coordinates: { lat: 33.7042, lng: 8.9688 }, googleMapsUrl: 'https://maps.google.com/?q=33.7042,8.9688', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'cnss-zaghouan', name: { derja: 'CNSS Zaghouan', fr: 'CNSS Zaghouan', ar: 'الصندوق الوطني للضمان الاجتماعي — زغوان', en: 'CNSS Zaghouan' }, category: 'cnss', governorate: 'Zaghouan', delegation: 'Zaghouan', address: 'Zaghouan Centre', phone: '+216 72 681 000', coordinates: { lat: 36.4028, lng: 10.1433 }, googleMapsUrl: 'https://maps.google.com/?q=36.4028,10.1433', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },

  // ================= POLICE / GARDE NATIONALE =================
  {
    id: 'commissariat-central-tunis', name: { derja: 'Commissariat Central Tunis (Bab Bhar)', fr: 'Commissariat Central de Tunis — Bab Bhar', ar: 'المفوضية العامة للأمن — تونس (باب البحر)', en: 'Central Police Station of Tunis — Bab Bhar' }, category: 'police_garde', governorate: 'Tunis', delegation: 'Bab El Bhar', address: 'Avenue Habib Bourguiba, Bab Bhar, 1000 Tunis', phone: '+216 71 254 530', coordinates: { lat: 36.7980, lng: 10.1780 }, googleMapsUrl: 'https://maps.google.com/?q=36.7980,10.1780', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24 — 7j/7' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24 — 7j/7' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24 — 7j/7' } }, tips: { derja: 'CIN w passeport: men 08:00 lel 16:00 faqat. Haja urgence: tout le temps.', fr: 'CIN et passeport: 08h00-16h00 uniquement. Urgences: 24h/24.', ar: 'بطاقة التعريف والجواز: من 08:00 إلى 16:00 فقط. الطوارئ: على مدار الساعة.', en: 'ID card and passport: 08:00-16:00 only. Emergencies: 24/7.' }
  },
  {
    id: 'commissariat-sfax', name: { derja: 'Commissariat de Police Sfax Ville', fr: 'Commissariat de Police — Sfax Ville', ar: 'مركز الشرطة — صفاقس المدينة', en: 'Police Station — Sfax City' }, category: 'police_garde', governorate: 'Sfax', delegation: 'Sfax Médina', address: 'Avenue Ali Belhouane, 3000 Sfax', phone: '+216 74 299 000', coordinates: { lat: 34.7420, lng: 10.7620 }, googleMapsUrl: 'https://maps.google.com/?q=34.7420,10.7620', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }, tips: { derja: 'Dossier passeport men 08:00 lel 15:00. 7el warrak qbal.', fr: "Dossier passeport de 08h à 15h. Préparez votre dossier à l'avance.", ar: 'ملف جواز السفر من 08:00 إلى 15:00. أعد الملف مسبقاً.', en: 'Passport applications from 08:00 to 15:00. Prepare your documents in advance.' }
  },
  {
    id: 'commissariat-sousse', name: { derja: 'Commissariat de Police Sousse', fr: 'Commissariat de Police — Sousse Ville', ar: 'مركز الشرطة — سوسة', en: 'Police Station — Sousse City' }, category: 'police_garde', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Habib Bourguiba, 4000 Sousse', phone: '+216 73 226 777', coordinates: { lat: 35.8250, lng: 10.6340 }, googleMapsUrl: 'https://maps.google.com/?q=35.8250,10.6340', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'commissariat-nabeul', name: { derja: 'Commissariat de Police Nabeul', fr: 'Commissariat de Police — Nabeul', ar: 'مركز الشرطة — نابل', en: 'Police Station — Nabeul' }, category: 'police_garde', governorate: 'Nabeul', delegation: 'Nabeul', address: 'Avenue Habib Thameur, 8000 Nabeul', phone: '+216 72 285 777', coordinates: { lat: 36.4560, lng: 10.7370 }, googleMapsUrl: 'https://maps.google.com/?q=36.4560,10.7370', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'commissariat-bizerte', name: { derja: 'Commissariat de Police Bizerte', fr: 'Commissariat de Police — Bizerte', ar: 'مركز الشرطة — بنزرت', en: 'Police Station — Bizerte' }, category: 'police_garde', governorate: 'Bizerte', delegation: 'Bizerte Nord', address: 'Avenue Habib Bourguiba, 7000 Bizerte', phone: '+216 72 431 777', coordinates: { lat: 37.2740, lng: 9.8730 }, googleMapsUrl: 'https://maps.google.com/?q=37.2740,9.8730', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'garde-nationale-kasserine', name: { derja: 'Brigade Garde Nationale Kasserine', fr: 'Brigade de la Garde Nationale — Kasserine', ar: 'ثكنة الحرس الوطني — القصرين', en: 'National Guard Brigade — Kasserine' }, category: 'police_garde', governorate: 'Kasserine', delegation: 'Kasserine Nord', address: 'Kasserine Centre', phone: '+216 77 470 300', coordinates: { lat: 35.1680, lng: 8.8360 }, googleMapsUrl: 'https://maps.google.com/?q=35.1680,8.8360', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'garde-nationale-gabes', name: { derja: 'Commissariat de Police Gabès', fr: 'Commissariat de Police — Gabès', ar: 'مركز الشرطة — قابس', en: 'Police Station — Gabès' }, category: 'police_garde', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Avenue Habib Bourguiba, 6000 Gabès', phone: '+216 75 272 477', coordinates: { lat: 33.8880, lng: 10.0980 }, googleMapsUrl: 'https://maps.google.com/?q=33.8880,10.0980', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'garde-nationale-tataouine', name: { derja: 'Brigade Garde Nationale Tataouine', fr: 'Brigade de la Garde Nationale — Tataouine', ar: 'ثكنة الحرس الوطني — تطاوين', en: 'National Guard Brigade — Tataouine' }, category: 'police_garde', governorate: 'Tataouine', delegation: 'Tataouine Nord', address: 'Tataouine Centre', phone: '+216 75 860 100', coordinates: { lat: 32.9211, lng: 10.4510 }, googleMapsUrl: 'https://maps.google.com/?q=32.9211,10.4510', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'garde-nationale-kebili', name: { derja: 'Brigade Garde Nationale Kébili', fr: 'Brigade de la Garde Nationale — Kébili', ar: 'ثكنة الحرس الوطني — قبلي', en: 'National Guard Brigade — Kébili' }, category: 'police_garde', governorate: 'Kébili', delegation: 'Kébili Sud', address: 'Kébili Centre', phone: '+216 75 490 300', coordinates: { lat: 33.7042, lng: 8.9688 }, googleMapsUrl: 'https://maps.google.com/?q=33.7042,8.9688', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'garde-nationale-tozeur', name: { derja: 'Brigade Garde Nationale Tozeur', fr: 'Brigade de la Garde Nationale — Tozeur', ar: 'ثكنة الحرس الوطني — توزر', en: 'National Guard Brigade — Tozeur' }, category: 'police_garde', governorate: 'Tozeur', delegation: 'Tozeur', address: 'Tozeur Centre', phone: '+216 76 452 300', coordinates: { lat: 33.9190, lng: 8.1340 }, googleMapsUrl: 'https://maps.google.com/?q=33.9190,8.1340', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'garde-nationale-sidi-bouzid', name: { derja: 'Brigade Garde Nationale Sidi Bouzid', fr: 'Brigade de la Garde Nationale — Sidi Bouzid', ar: 'ثكنة الحرس الوطني — سيدي بوزيد', en: 'National Guard Brigade — Sidi Bouzid' }, category: 'police_garde', governorate: 'Sidi Bouzid', delegation: 'Sidi Bouzid Ouest', address: 'Sidi Bouzid Centre', phone: '+216 76 630 300', coordinates: { lat: 35.0380, lng: 9.4850 }, googleMapsUrl: 'https://maps.google.com/?q=35.0380,9.4850', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },

  // ================= ATTT =================
  {
    id: 'attt-tunis-siege', name: { derja: 'ATTT Siège Central (Cité Mahrajène)', fr: 'ATTT — Siège National, Cité Mahrajène', ar: 'الوكالة الفنية للنقل البري — المقر المركزي', en: 'ATTT — National Headquarters, Cité Mahrajène' }, category: 'attt', governorate: 'Tunis', delegation: 'El Omrane Supérieur', address: 'Rue 8601, Cité Mahrajène, 1082 Tunis', phone: '+216 71 780 064', coordinates: { lat: 36.8239, lng: 10.1722 }, googleMapsUrl: 'https://maps.google.com/?q=36.8239,10.1722', hasConformeService: false, hasTimbreVendor: false, website: 'https://attt.nat.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: '7adher contrat el bi3 el mouwatha9 w el carte grise el qadima. Khedmet tawil!', fr: 'Apportez le contrat de vente légalisé et l\'ancienne carte grise. Délais longs!', ar: 'أحضر عقد البيع الموثق والبطاقة الرمادية القديمة. الإجراءات تستغرق وقتاً.', en: 'Bring the notarized sales contract and the old registration card (carte grise). Long waits!' }
  },
  {
    id: 'attt-sousse', name: { derja: 'ATTT Sousse', fr: 'ATTT — Agence de Sousse', ar: 'الوكالة الفنية للنقل البري — سوسة', en: 'ATTT — Sousse Branch' }, category: 'attt', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Habib Bourguiba, 4000 Sousse', phone: '+216 73 242 200', coordinates: { lat: 35.8280, lng: 10.6390 }, googleMapsUrl: 'https://maps.google.com/?q=35.8280,10.6390', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'attt-nabeul', name: { derja: 'ATTT Nabeul', fr: 'ATTT — Agence de Nabeul', ar: 'الوكالة الفنية للنقل البري — نابل', en: 'ATTT — Nabeul Branch' }, category: 'attt', governorate: 'Nabeul', delegation: 'Nabeul', address: 'Nabeul Centre', phone: '+216 72 286 200', coordinates: { lat: 36.4500, lng: 10.7400 }, googleMapsUrl: 'https://maps.google.com/?q=36.4500,10.7400', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'attt-bizerte', name: { derja: 'ATTT Bizerte', fr: 'ATTT — Agence de Bizerte', ar: 'الوكالة الفنية للنقل البري — بنزرت', en: 'ATTT — Bizerte Branch' }, category: 'attt', governorate: 'Bizerte', delegation: 'Bizerte Nord', address: 'Bizerte Centre', phone: '+216 72 432 200', coordinates: { lat: 37.2700, lng: 9.8700 }, googleMapsUrl: 'https://maps.google.com/?q=37.2700,9.8700', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'attt-gabes', name: { derja: 'ATTT Gabès', fr: 'ATTT — Agence de Gabès', ar: 'الوكالة الفنية للنقل البري — قابس', en: 'ATTT — Gabès Branch' }, category: 'attt', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Route de Tunis, 6000 Gabès', phone: '+216 75 274 200', coordinates: { lat: 33.8900, lng: 10.1000 }, googleMapsUrl: 'https://maps.google.com/?q=33.8900,10.1000', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'attt-medenine', name: { derja: 'ATTT Médenine', fr: 'ATTT — Agence de Médenine', ar: 'الوكالة الفنية للنقل البري — مدنين', en: 'ATTT — Médenine Branch' }, category: 'attt', governorate: 'Médenine', delegation: 'Médenine Nord', address: 'Médenine Centre', phone: '+216 75 642 200', coordinates: { lat: 33.3500, lng: 10.5100 }, googleMapsUrl: 'https://maps.google.com/?q=33.3500,10.5100', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'attt-gafsa', name: { derja: 'ATTT Gafsa', fr: 'ATTT — Agence de Gafsa', ar: 'الوكالة الفنية للنقل البري — قفصة', en: 'ATTT — Gafsa Branch' }, category: 'attt', governorate: 'Gafsa', delegation: 'Gafsa Nord', address: 'Gafsa Centre', phone: '+216 76 221 200', coordinates: { lat: 34.4300, lng: 8.7800 }, googleMapsUrl: 'https://maps.google.com/?q=34.4300,8.7800', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },

  // ================= HOSPITALS =================
  {
    id: 'hopital-charles-nicolle', name: { derja: 'Hôpital Charles Nicolle Tunis', fr: 'Hôpital Charles Nicolle — CHU Tunis', ar: 'المستشفى الجامعي شارل نيكول — تونس', en: 'Charles Nicolle University Hospital — Tunis' }, category: 'hopital', governorate: 'Tunis', delegation: 'Bab Saadoun', address: 'Rue Djebel Lakhdar, Bab Saadoun, 1006 Tunis', phone: '+216 71 578 000', coordinates: { lat: 36.8144, lng: 10.1658 }, googleMapsUrl: 'https://maps.google.com/?q=36.8144,10.1658', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24 — Urgences' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24 — Urgences' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24 — Urgences' } }, tips: { derja: 'A7sen hôpital fi Tunis — consultations externes men 08:00 lel 16:00.', fr: 'Meilleur hôpital de Tunis — consultations externes 08h-16h. Urgences 24h/24.', ar: 'أفضل مستشفى في تونس — العيادات الخارجية من 08:00 إلى 16:00. الطوارئ على مدار الساعة.', en: 'Best hospital in Tunis — outpatient consultations 08:00-16:00. Emergency 24/7.' }
  },
  {
    id: 'hopital-la-rabta', name: { derja: 'Hôpital La Rabta Tunis', fr: 'Hôpital La Rabta — CHU Tunis', ar: 'مستشفى الرابطة — تونس', en: 'La Rabta University Hospital — Tunis' }, category: 'hopital', governorate: 'Tunis', delegation: 'Bab Saadoun', address: 'Jabbari, 1007 Tunis', phone: '+216 71 578 200', coordinates: { lat: 36.8308, lng: 10.1644 }, googleMapsUrl: 'https://maps.google.com/?q=36.8308,10.1644', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'hopital-sahloul', name: { derja: 'Hôpital Sahloul Sousse', fr: 'Hôpital Sahloul — CHU Sousse', ar: 'مستشفى سهلول — سوسة' }, category: 'hopital', governorate: 'Sousse', delegation: 'Hammam Sousse', address: 'Route de la Ceinture, Sahloul, 4054 Sousse', phone: '+216 73 362 244', coordinates: { lat: 35.8612, lng: 10.5929 }, googleMapsUrl: 'https://maps.google.com/?q=35.8612,10.5929', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }, tips: { derja: 'Meilleur hôpital fil jneb. SAMU: 73 362 244.', fr: 'Principal CHU du centre. Urgences excellentes.', ar: 'أكبر مستشفى في وسط البلاد.' }
  },
  {
    id: 'hopital-hedi-chaker', name: { derja: 'Hôpital Hédi Chaker Sfax', fr: 'Hôpital Hédi Chaker — CHU Sfax', ar: 'مستشفى الهادي شاكر — صفاقس' }, category: 'hopital', governorate: 'Sfax', delegation: 'Sfax Ville', address: 'Avenue de la Cité Olympique, 3029 Sfax', phone: '+216 74 241 833', coordinates: { lat: 34.7280, lng: 10.7610 }, googleMapsUrl: 'https://maps.google.com/?q=34.7280,10.7610', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'hopital-fattouma-bourguiba', name: { derja: 'Hôpital Fattouma Bourguiba Monastir', fr: 'Hôpital Universitaire Fattouma Bourguiba — Monastir', ar: 'مستشفى فاطمة بورقيبة الجامعي — المنستير' }, category: 'hopital', governorate: 'Monastir', delegation: 'Monastir', address: 'Avenue Farhat Hached, 5000 Monastir', phone: '+216 73 460 000', coordinates: { lat: 35.7720, lng: 10.7930 }, googleMapsUrl: 'https://maps.google.com/?q=35.7720,10.7930', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'chr-gabes', name: { derja: 'CHR Gabès', fr: 'Centre Hospitalier Régional de Gabès', ar: 'المستشفى الجهوي — قابس' }, category: 'hopital', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Avenue Habib Thameur, 6000 Gabès', phone: '+216 75 270 130', coordinates: { lat: 33.9010, lng: 10.1080 }, googleMapsUrl: 'https://maps.google.com/?q=33.9010,10.1080', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'chr-medenine', name: { derja: 'CHR Médenine', fr: 'Centre Hospitalier Régional de Médenine', ar: 'المستشفى الجهوي — مدنين' }, category: 'hopital', governorate: 'Médenine', delegation: 'Médenine Nord', address: 'Médenine Centre', phone: '+216 75 640 100', coordinates: { lat: 33.3520, lng: 10.5010 }, googleMapsUrl: 'https://maps.google.com/?q=33.3520,10.5010', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'chr-kairouan', name: { derja: 'CHR Kairouan', fr: 'Centre Hospitalier Régional de Kairouan', ar: 'المستشفى الجهوي — القيروان' }, category: 'hopital', governorate: 'Kairouan', delegation: 'Kairouan Nord', address: 'Route de Tunis, 3100 Kairouan', phone: '+216 77 231 400', coordinates: { lat: 35.6870, lng: 10.1060 }, googleMapsUrl: 'https://maps.google.com/?q=35.6870,10.1060', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },
  {
    id: 'chr-gafsa', name: { derja: 'CHR Gafsa', fr: 'Centre Hospitalier Régional de Gafsa', ar: 'المستشفى الجهوي — قفصة' }, category: 'hopital', governorate: 'Gafsa', delegation: 'Gafsa Nord', address: 'Route de Sfax, 2100 Gafsa', phone: '+216 76 221 400', coordinates: { lat: 34.4190, lng: 8.7760 }, googleMapsUrl: 'https://maps.google.com/?q=34.4190,8.7760', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Dimanche', hours: '24h/24' }, ramadan: { days: 'Lundi - Dimanche', hours: '24h/24' }, summer: { days: 'Lundi - Dimanche', hours: '24h/24' } }
  },

  // ================= MISSING BALADIYAS =================
  {
    id: 'baladiya-ben-arous', name: { derja: 'Baladiyat Ben Arous', fr: 'Municipalité de Ben Arous', ar: 'بلدية بن عروس' }, category: 'baladiya', governorate: 'Ben Arous', delegation: 'Ben Arous', address: 'Avenue Habib Bourguiba, Ben Arous', phone: '+216 71 382 222', coordinates: { lat: 36.7533, lng: 10.2277 }, googleMapsUrl: 'https://maps.google.com/?q=36.7533,10.2277', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-manouba', name: { derja: 'Baladiyat Manouba', fr: 'Municipalité de Manouba', ar: 'بلدية منوبة' }, category: 'baladiya', governorate: 'Manouba', delegation: 'Manouba', address: 'Manouba Centre', phone: '+216 71 601 222', coordinates: { lat: 36.8081, lng: 10.0986 }, googleMapsUrl: 'https://maps.google.com/?q=36.8081,10.0986', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-beja', name: { derja: 'Baladiyat Béja', fr: 'Municipalité de Béja', ar: 'بلدية باجة' }, category: 'baladiya', governorate: 'Béja', delegation: 'Béja Nord', address: 'Avenue Habib Bourguiba, 9000 Béja', phone: '+216 78 456 222', coordinates: { lat: 36.7256, lng: 9.1817 }, googleMapsUrl: 'https://maps.google.com/?q=36.7256,9.1817', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-jendouba', name: { derja: 'Baladiyat Jendouba', fr: 'Municipalité de Jendouba', ar: 'بلدية جندوبة' }, category: 'baladiya', governorate: 'Jendouba', delegation: 'Jendouba Nord', address: 'Avenue Habib Bourguiba, 8100 Jendouba', phone: '+216 78 630 222', coordinates: { lat: 36.5011, lng: 8.7803 }, googleMapsUrl: 'https://maps.google.com/?q=36.5011,8.7803', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-kef', name: { derja: 'Baladiyat Le Kef', fr: 'Municipalité du Kef', ar: 'بلدية الكاف' }, category: 'baladiya', governorate: 'Le Kef', delegation: 'Le Kef Ouest', address: 'Le Kef Centre', phone: '+216 78 221 222', coordinates: { lat: 36.1824, lng: 8.7148 }, googleMapsUrl: 'https://maps.google.com/?q=36.1824,8.7148', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-siliana', name: { derja: 'Baladiyat Siliana', fr: 'Municipalité de Siliana', ar: 'بلدية سليانة' }, category: 'baladiya', governorate: 'Siliana', delegation: 'Siliana Nord', address: 'Siliana Centre', phone: '+216 78 870 222', coordinates: { lat: 36.0843, lng: 9.3708 }, googleMapsUrl: 'https://maps.google.com/?q=36.0843,9.3708', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-mahdia', name: { derja: 'Baladiyat Mahdia', fr: 'Municipalité de Mahdia', ar: 'بلدية المهدية' }, category: 'baladiya', governorate: 'Mahdia', delegation: 'Mahdia', address: 'Avenue Habib Bourguiba, 5100 Mahdia', phone: '+216 73 681 222', coordinates: { lat: 35.5047, lng: 11.0622 }, googleMapsUrl: 'https://maps.google.com/?q=35.5047,11.0622', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-kasserine', name: { derja: 'Baladiyat Kasserine', fr: 'Municipalité de Kasserine', ar: 'بلدية القصرين' }, category: 'baladiya', governorate: 'Kasserine', delegation: 'Kasserine Nord', address: 'Avenue Habib Bourguiba, 1200 Kasserine', phone: '+216 77 471 222', coordinates: { lat: 35.1676, lng: 8.8365 }, googleMapsUrl: 'https://maps.google.com/?q=35.1676,8.8365', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-sidi-bouzid', name: { derja: 'Baladiyat Sidi Bouzid', fr: 'Municipalité de Sidi Bouzid', ar: 'بلدية سيدي بوزيد' }, category: 'baladiya', governorate: 'Sidi Bouzid', delegation: 'Sidi Bouzid Ouest', address: 'Sidi Bouzid Centre', phone: '+216 76 630 222', coordinates: { lat: 35.0382, lng: 9.4849 }, googleMapsUrl: 'https://maps.google.com/?q=35.0382,9.4849', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-tataouine', name: { derja: 'Baladiyat Tataouine', fr: 'Municipalité de Tataouine', ar: 'بلدية تطاوين' }, category: 'baladiya', governorate: 'Tataouine', delegation: 'Tataouine Nord', address: 'Tataouine Centre', phone: '+216 75 860 222', coordinates: { lat: 32.9211, lng: 10.4510 }, googleMapsUrl: 'https://maps.google.com/?q=32.9211,10.4510', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-gafsa', name: { derja: 'Baladiyat Gafsa', fr: 'Municipalité de Gafsa', ar: 'بلدية قفصة' }, category: 'baladiya', governorate: 'Gafsa', delegation: 'Gafsa Nord', address: 'Avenue Habib Bourguiba, 2100 Gafsa', phone: '+216 76 221 222', coordinates: { lat: 34.4250, lng: 8.7842 }, googleMapsUrl: 'https://maps.google.com/?q=34.4250,8.7842', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-tozeur', name: { derja: 'Baladiyat Tozeur', fr: 'Municipalité de Tozeur', ar: 'بلدية توزر' }, category: 'baladiya', governorate: 'Tozeur', delegation: 'Tozeur', address: 'Tozeur Centre', phone: '+216 76 452 222', coordinates: { lat: 33.9197, lng: 8.1335 }, googleMapsUrl: 'https://maps.google.com/?q=33.9197,8.1335', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-kebili', name: { derja: 'Baladiyat Kébili', fr: 'Municipalité de Kébili', ar: 'بلدية قبلي' }, category: 'baladiya', governorate: 'Kébili', delegation: 'Kébili Sud', address: 'Kébili Centre', phone: '+216 75 491 222', coordinates: { lat: 33.7042, lng: 8.9688 }, googleMapsUrl: 'https://maps.google.com/?q=33.7042,8.9688', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },
  {
    id: 'baladiya-zaghouan', name: { derja: 'Baladiyat Zaghouan', fr: 'Municipalité de Zaghouan', ar: 'بلدية زغوان' }, category: 'baladiya', governorate: 'Zaghouan', delegation: 'Zaghouan', address: 'Zaghouan Centre', phone: '+216 72 681 222', coordinates: { lat: 36.4028, lng: 10.1433 }, googleMapsUrl: 'https://maps.google.com/?q=36.4028,10.1433', hasConformeService: true, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 13:00 / 14:00 - 17:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:30' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 14:00' } }
  },

  // ================= STEG =================
  {
    id: 'steg-direction-generale', name: { derja: 'STEG Direction Générale (Bab Saadoun)', fr: 'STEG — Direction Générale, Bab Saadoun', ar: 'الشركة التونسية للكهرباء والغاز — المديرية العامة' }, category: 'steg', governorate: 'Tunis', delegation: 'Bab Saadoun', address: 'Rue Taïeb Mhiri, Bab Saadoun, 1002 Tunis', phone: '+216 71 341 311', coordinates: { lat: 36.8200, lng: 10.1650 }, googleMapsUrl: 'https://maps.google.com/?q=36.8200,10.1650', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.steg.com.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: 'Panne? Appelle: 71 341 000. Facture en ligne 3al site STEG.', fr: 'Signalement pannes: 71 341 000. Paiement factures en ligne sur steg.com.tn', ar: 'للإبلاغ عن أعطال: 71 341 000. دفع الفواتير عبر الإنترنت.' }
  },
  {
    id: 'steg-sfax', name: { derja: 'STEG Sfax Régional', fr: 'STEG — Direction Régionale de Sfax', ar: 'STEG — المديرية الجهوية صفاقس' }, category: 'steg', governorate: 'Sfax', delegation: 'Sfax Ville', address: 'Route de Tunis, 3000 Sfax', phone: '+216 74 242 000', coordinates: { lat: 34.7380, lng: 10.7610 }, googleMapsUrl: 'https://maps.google.com/?q=34.7380,10.7610', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'steg-sousse', name: { derja: 'STEG Sousse', fr: 'STEG — Direction Régionale de Sousse', ar: 'STEG — المديرية الجهوية سوسة' }, category: 'steg', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Habib Bourguiba, 4000 Sousse', phone: '+216 73 226 000', coordinates: { lat: 35.8230, lng: 10.6370 }, googleMapsUrl: 'https://maps.google.com/?q=35.8230,10.6370', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'steg-bizerte', name: { derja: 'STEG Bizerte', fr: 'STEG — Direction Régionale de Bizerte', ar: 'STEG — المديرية الجهوية بنزرت' }, category: 'steg', governorate: 'Bizerte', delegation: 'Bizerte Nord', address: 'Avenue Habib Bourguiba, 7000 Bizerte', phone: '+216 72 432 000', coordinates: { lat: 37.2720, lng: 9.8720 }, googleMapsUrl: 'https://maps.google.com/?q=37.2720,9.8720', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'steg-gabes', name: { derja: 'STEG Gabès', fr: 'STEG — Direction Régionale de Gabès', ar: 'STEG — المديرية الجهوية قابس' }, category: 'steg', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Avenue Farhat Hached, 6000 Gabès', phone: '+216 75 272 000', coordinates: { lat: 33.8870, lng: 10.0970 }, googleMapsUrl: 'https://maps.google.com/?q=33.8870,10.0970', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },

  // ================= SONEDE =================
  {
    id: 'sonede-direction-centrale', name: { derja: 'SONEDE Direction Centrale (Montplaisir)', fr: 'SONEDE — Direction Centrale, Cité Montplaisir', ar: 'الشركة الوطنية لاستغلال وتوزيع المياه — المديرية المركزية' }, category: 'sonede', governorate: 'Tunis', delegation: 'El Menzah', address: 'Rue des Entrepreneurs, Cité Montplaisir, 1002 Tunis', phone: '+216 71 847 000', coordinates: { lat: 36.8157, lng: 10.1895 }, googleMapsUrl: 'https://maps.google.com/?q=36.8157,10.1895', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.sonede.com.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: 'Fuite d\'eau? Appelle: 71 847 000 (urgences 24h/24). Facture 3la internet.', fr: 'Fuite urgence: 71 847 000 (24h/24). Paiement factures sur sonede.com.tn', ar: 'تسرب عاجل: 71 847 000 (على مدار الساعة). دفع الفواتير عبر الإنترنت.' }
  },
  {
    id: 'sonede-sfax', name: { derja: 'SONEDE Sfax', fr: 'SONEDE — Direction Régionale de Sfax', ar: 'SONEDE — المديرية الجهوية صفاقس' }, category: 'sonede', governorate: 'Sfax', delegation: 'Sfax Ville', address: 'Route de Tunis, 3000 Sfax', phone: '+216 74 241 000', coordinates: { lat: 34.7400, lng: 10.7600 }, googleMapsUrl: 'https://maps.google.com/?q=34.7400,10.7600', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'sonede-sousse', name: { derja: 'SONEDE Sousse', fr: 'SONEDE — Direction Régionale de Sousse', ar: 'SONEDE — المديرية الجهوية سوسة' }, category: 'sonede', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Léopold Senghor, 4000 Sousse', phone: '+216 73 226 500', coordinates: { lat: 35.8240, lng: 10.6360 }, googleMapsUrl: 'https://maps.google.com/?q=35.8240,10.6360', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },

  // ================= TRIBUNAUX =================
  {
    id: 'tribunal-tunis', name: { derja: 'Tribunal de Première Instance Tunis', fr: 'Tribunal de Première Instance de Tunis', ar: 'المحكمة الابتدائية — تونس' }, category: 'tribunal', governorate: 'Tunis', delegation: 'Bab Bhar', address: 'Boulevard du 9 Avril 1938, 1002 Tunis', phone: '+216 71 334 000', coordinates: { lat: 36.8103, lng: 10.1700 }, googleMapsUrl: 'https://maps.google.com/?q=36.8103,10.1700', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: 'Pour légalisation signature w casier judiciaire. 7adher CIN + timbre fiscal.', fr: 'Pour légalisation de signature et casier. CIN + timbre fiscal obligatoires.', ar: 'للتوثيق والسوابق العدلية. أحضر بطاقة التعريف والتنبر الجبائي.' }
  },
  {
    id: 'tribunal-sfax', name: { derja: 'Tribunal de Première Instance Sfax', fr: 'Tribunal de Première Instance de Sfax', ar: 'المحكمة الابتدائية — صفاقس' }, category: 'tribunal', governorate: 'Sfax', delegation: 'Sfax Médina', address: 'Rue Mongi Slim, 3000 Sfax', phone: '+216 74 296 000', coordinates: { lat: 34.7390, lng: 10.7600 }, googleMapsUrl: 'https://maps.google.com/?q=34.7390,10.7600', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'tribunal-sousse', name: { derja: 'Tribunal de Première Instance Sousse', fr: 'Tribunal de Première Instance de Sousse', ar: 'المحكمة الابتدائية — سوسة' }, category: 'tribunal', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Mohamed V, 4000 Sousse', phone: '+216 73 226 100', coordinates: { lat: 35.8260, lng: 10.6350 }, googleMapsUrl: 'https://maps.google.com/?q=35.8260,10.6350', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'tribunal-nabeul', name: { derja: 'Tribunal de Première Instance Nabeul', fr: 'Tribunal de Première Instance de Nabeul', ar: 'المحكمة الابتدائية — نابل' }, category: 'tribunal', governorate: 'Nabeul', delegation: 'Nabeul', address: 'Avenue Habib Bourguiba, 8000 Nabeul', phone: '+216 72 285 100', coordinates: { lat: 36.4560, lng: 10.7370 }, googleMapsUrl: 'https://maps.google.com/?q=36.4560,10.7370', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'tribunal-bizerte', name: { derja: 'Tribunal de Première Instance Bizerte', fr: 'Tribunal de Première Instance de Bizerte', ar: 'المحكمة الابتدائية — بنزرت' }, category: 'tribunal', governorate: 'Bizerte', delegation: 'Bizerte Nord', address: 'Avenue Habib Bourguiba, 7000 Bizerte', phone: '+216 72 431 100', coordinates: { lat: 37.2740, lng: 9.8730 }, googleMapsUrl: 'https://maps.google.com/?q=37.2740,9.8730', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'tribunal-gabes', name: { derja: 'Tribunal de Première Instance Gabès', fr: 'Tribunal de Première Instance de Gabès', ar: 'المحكمة الابتدائية — قابس' }, category: 'tribunal', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Avenue Farhat Hached, 6000 Gabès', phone: '+216 75 272 100', coordinates: { lat: 33.8870, lng: 10.0970 }, googleMapsUrl: 'https://maps.google.com/?q=33.8870,10.0970', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'tribunal-kairouan', name: { derja: 'Tribunal de Première Instance Kairouan', fr: 'Tribunal de Première Instance de Kairouan', ar: 'المحكمة الابتدائية — القيروان' }, category: 'tribunal', governorate: 'Kairouan', delegation: 'Kairouan Nord', address: 'Avenue de la République, 3100 Kairouan', phone: '+216 77 231 100', coordinates: { lat: 35.6780, lng: 10.0960 }, googleMapsUrl: 'https://maps.google.com/?q=35.6780,10.0960', hasConformeService: false, hasTimbreVendor: true, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },

  // ================= ANETI =================
  {
    id: 'aneti-tunis-siege', name: { derja: 'ANETI Siège National (Tunis)', fr: 'ANETI — Siège National, Tunis', ar: 'الوكالة الوطنية للتشغيل والعمل المستقل — المقر المركزي' }, category: 'aneti', governorate: 'Tunis', delegation: 'El Omrane', address: 'Avenue Louis Braille, Cité El Khadra, 1003 Tunis', phone: '+216 71 840 900', coordinates: { lat: 36.8191, lng: 10.1724 }, googleMapsUrl: 'https://maps.google.com/?q=36.8191,10.1724', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.aneti.nat.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }, tips: { derja: 'Hna tasjel pal 5edma, SIVP, w AIDA. 7adher CIN w diplôme.', fr: 'Inscription chômage, SIVP et AIDA. Apportez CIN et diplôme.', ar: 'للتسجيل كطالب شغل والبرامج (SIVP, AIDA). أحضر بطاقة التعريف والشهادة.' }
  },
  {
    id: 'aneti-sfax', name: { derja: 'ANETI Sfax', fr: 'ANETI — Agence de Sfax', ar: 'وكالة التشغيل والعمل المستقل — صفاقس' }, category: 'aneti', governorate: 'Sfax', delegation: 'Sfax Ville', address: 'Route de Tunis, Sfax', phone: '+216 74 240 900', coordinates: { lat: 34.7410, lng: 10.7590 }, googleMapsUrl: 'https://maps.google.com/?q=34.7410,10.7590', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'aneti-sousse', name: { derja: 'ANETI Sousse', fr: 'ANETI — Agence de Sousse', ar: 'وكالة التشغيل والعمل المستقل — سوسة' }, category: 'aneti', governorate: 'Sousse', delegation: 'Sousse Ville', address: 'Avenue Habib Bourguiba, 4000 Sousse', phone: '+216 73 224 900', coordinates: { lat: 35.8250, lng: 10.6360 }, googleMapsUrl: 'https://maps.google.com/?q=35.8250,10.6360', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'aneti-gabes', name: { derja: 'ANETI Gabès', fr: 'ANETI — Agence de Gabès', ar: 'وكالة التشغيل والعمل المستقل — قابس' }, category: 'aneti', governorate: 'Gabès', delegation: 'Gabès Médina', address: 'Avenue Habib Bourguiba, 6000 Gabès', phone: '+216 75 272 900', coordinates: { lat: 33.8880, lng: 10.0980 }, googleMapsUrl: 'https://maps.google.com/?q=33.8880,10.0980', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'aneti-kasserine', name: { derja: 'ANETI Kasserine', fr: 'ANETI — Agence de Kasserine', ar: 'وكالة التشغيل والعمل المستقل — القصرين' }, category: 'aneti', governorate: 'Kasserine', delegation: 'Kasserine Nord', address: 'Kasserine Centre', phone: '+216 77 470 900', coordinates: { lat: 35.1680, lng: 8.8360 }, googleMapsUrl: 'https://maps.google.com/?q=35.1680,8.8360', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'aneti-gafsa', name: { derja: 'ANETI Gafsa', fr: 'ANETI — Agence de Gafsa', ar: 'وكالة التشغيل والعمل المستقل — قفصة' }, category: 'aneti', governorate: 'Gafsa', delegation: 'Gafsa Nord', address: 'Gafsa Centre', phone: '+216 76 221 900', coordinates: { lat: 34.4250, lng: 8.7840 }, googleMapsUrl: 'https://maps.google.com/?q=34.4250,8.7840', hasConformeService: false, hasTimbreVendor: false, schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:00 - 16:00' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },

  // ================= MINISTÈRES (TUNIS) =================
  {
    id: 'ministere-interieur', name: { derja: "Ministère de l'Intérieur (El Kasbah)", fr: "Ministère de l'Intérieur — La Kasbah", ar: 'وزارة الداخلية — القصبة' }, category: 'ministere', governorate: 'Tunis', delegation: 'Médina', address: 'Place de la Kasbah, 1008 Tunis', phone: '+216 71 333 000', coordinates: { lat: 36.7985, lng: 10.1667 }, googleMapsUrl: 'https://maps.google.com/?q=36.7985,10.1667', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.interieur.gov.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'ministere-finances', name: { derja: "Ministère des Finances (El Kasbah)", fr: "Ministère des Finances — La Kasbah", ar: 'وزارة المالية — القصبة' }, category: 'ministere', governorate: 'Tunis', delegation: 'Médina', address: 'Place de la Kasbah, 1008 Tunis', phone: '+216 71 571 888', coordinates: { lat: 36.7990, lng: 10.1660 }, googleMapsUrl: 'https://maps.google.com/?q=36.7990,10.1660', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.finances.gov.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'ministere-education', name: { derja: "Ministère de l'Éducation (Bab Bnet)", fr: "Ministère de l'Éducation Nationale — Bab Bnet", ar: 'وزارة التربية الوطنية — باب بنات' }, category: 'ministere', governorate: 'Tunis', delegation: 'Médina', address: 'Rue Bab Bnet, 1030 Tunis', phone: '+216 71 786 300', coordinates: { lat: 36.8083, lng: 10.1711 }, googleMapsUrl: 'https://maps.google.com/?q=36.8083,10.1711', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.education.gov.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'ministere-sante', name: { derja: "Ministère de la Santé (Bab Saadoun)", fr: "Ministère de la Santé — Bab Saadoun", ar: 'وزارة الصحة — باب سعدون' }, category: 'ministere', governorate: 'Tunis', delegation: 'Bab Saadoun', address: 'Bab Saadoun, 1006 Tunis', phone: '+216 71 578 000', coordinates: { lat: 36.8210, lng: 10.1680 }, googleMapsUrl: 'https://maps.google.com/?q=36.8210,10.1680', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.santetunisie.rns.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
  {
    id: 'ministere-justice', name: { derja: "Ministère de la Justice (Cité El Khadra)", fr: "Ministère de la Justice — Cité El Khadra", ar: 'وزارة العدل — المدينة الخضراء' }, category: 'ministere', governorate: 'Tunis', delegation: 'El Omrane Supérieur', address: 'Cité El Khadra, 1003 Tunis', phone: '+216 71 232 000', coordinates: { lat: 36.8330, lng: 10.1950 }, googleMapsUrl: 'https://maps.google.com/?q=36.8330,10.1950', hasConformeService: false, hasTimbreVendor: false, website: 'https://www.justice.gov.tn', schedule: { regular: { days: 'Lundi - Vendredi', hours: '08:30 - 16:30' }, ramadan: { days: 'Lundi - Vendredi', hours: '08:00 - 14:00' }, summer: { days: 'Lundi - Vendredi', hours: '07:30 - 13:30' } }
  },
];

export const GOVERNORATES_LIST: Governorate[] = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
  'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse',
  'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
  'Gabès', 'Médenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kébili'
];
