import { PublicOffice, Governorate, OfficeCategory } from '../types/office';

export const publicOfficesData: PublicOffice[] = [
  // ================= TUNIS =================
  {
    id: 'baladiya-tunis-centrale',
    name: {
      derja: "Baladiyat Tunis el Markaziya (Hôtel de Ville)",
      fr: "Municipalité de Tunis - Hôtel de Ville (La Kasbah)",
      ar: "بلدية تونس - القصر البلدي (القصبة)",
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
    }
  },
  {
    id: 'recette-finances-bebedzira',
    name: {
      derja: "Recette des Finances Bab El Dzirah",
      fr: "Recette des Finances - Bab El Jazira",
      ar: "القباضة المالية باب الجزيرة - تونس",
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
    }
  },
  {
    id: 'poste-centrale-tunis',
    name: {
      derja: "Poste Centrale Tunis (Rue Charles de Gaulle)",
      fr: "Poste Centrale de Tunis - Charles de Gaulle",
      ar: "مكتب البريد المركزي - شارع شارل ديغول تونس",
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
  }
];

export const GOVERNORATES_LIST: Governorate[] = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
  'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse',
  'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
  'Gabès', 'Médenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kébili'
];
