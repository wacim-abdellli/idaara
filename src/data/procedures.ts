import { Procedure } from '../types/procedure';

export const proceduresData: Procedure[] = [
  // ================= IDENTITY & CITIZENSHIP =================
  {
    id: 'passeport-renouvellement',
    slug: 'passeport-renouvellement',
    vertical: 'identity',
    iconName: 'Passports',
    tags: ['passeport', 'safra', 'voyage', 'consulat', 'poste de police'],
    title: {
      derja: "Renouvellement mte3 Passeport Tounsi",
      fr: "Renouvellement de Passeport Tunisien",
      ar: "تجديد جواز السفر التونسي",
      en: "Tunisian Passport Renewal"
    },
    shortDescription: {
      derja: "Koll el awra9 wel timbres elli lezmin bech t'baddel el passeport el 9dim walla el wfe.",
      fr: "Dossier complet, timbres fiscaux et démarches au poste de police pour renouveler votre passeport.",
      ar: "الملف الكامل، معاليم التنابر والإجراءات بمركز الشرطة لتجديد جواز السفر العادي.",
    },
    fullDescription: {
      derja: "Renouvellement el passeport yet3ada fi markez el chorta walla el 7aras el marje3 el tourabi mte3 seknek. Lezem t'7adher el timbre fiscal mte3 80 DT (walla 25 DT lel tledha/etudiants), el tsawer b'format officiel, wel passeport el 9dim.",
      fr: "La demande de renouvellement de passeport est déposée auprès du poste de police ou de la brigade de la garde nationale territorialement compétent selon votre lieu de résidence légale.",
      ar: "يُودع ملف تجديد جواز السفر العادي لدى مركز الشرطة أو مركز الحرس الوطني مرجع النظر الترابي لمقر الإقامة، مصحوباً بالتنبر الجبائي والصور المطابقة للمواصفات.",
    },
    estimatedTotalCostTND: 86.0,
    estimatedProcessingTime: "7 - 15 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['police_garde', 'recette_finances', 'baladiya'],
    costsBreakdown: [
      {
        id: 't-pass-1',
        label: { derja: "Timbre fiscal passeport (Adulte)", fr: "Timbre fiscal passeport (Tarif ordinaire)", ar: "تنبر جبائي لجواز السفر (التعريفة العادية)" },
        amountTND: 80.0,
        quantity: 1,
        category: 'timbre_fiscal',
      },
      {
        id: 't-pass-2',
        label: { derja: "4 Tsawer chamsiya (Fond blanc)", fr: "4 Photos d'identité officielles fond blanc", ar: "4 صور شمسية خلفية بيضاء" },
        amountTND: 6.0,
        quantity: 1,
        category: 'photo',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-pass-1',
        name: { derja: "Matloub ta3mir formulaire passeport", fr: "Formulaire officiel de demande de passeport", ar: "مطبوعة طلب الحصول على جواز سفر" },
        originalRequired: true,
        description: { derja: "Ta5ouha men markez el chorta walla t'impriméha men Idaara.tn", fr: "Disponible au poste de police ou générée via Idaara.tn", ar: "تُسحب من المركز أو تُحمّل من المنصة" }
      },
      {
        id: 'doc-pass-2',
        name: { derja: "Copie conforme CIN + Original", fr: "Copie de la CIN + Originale", ar: "نسخة من بطاقة التعريف الوطنية مع الاستظهار بالأصل" },
        originalRequired: true,
        copiesConformes: 1,
      },
      {
        id: 'doc-pass-3',
        name: { derja: "El Passeport el 9dim", fr: "Ancien passeport à renouveler", ar: "جواز السفر القديم المُراد تجديده" },
        originalRequired: true,
      },
      {
        id: 'doc-pass-4',
        name: { derja: "4 Tsawer chamsiya jdod", fr: "4 Photos d'identité récentes", ar: "4 صور شمسية حديثة العهد" },
        originalRequired: true,
      },
      {
        id: 'doc-pass-5',
        name: { derja: "Ch'hadet 7odhwr (Lel tlemtha wel etudiants)", fr: "Certificat de scolarité / Inscription", ar: "شهادة مدرسية أو جامعية للمتمتعين بالتعريفة المخفضة" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Achri el Timbre Fiscal", fr: "Acheter le timbre fiscal", ar: "اقتناء التنبر الجبائي" },
        description: { derja: "Imchi lel Recette des Finances (80 DT tarif 3adi walla 25 DT etudiant)", fr: "Rendez-vous à la Recette des Finances la plus proche", ar: "التوجه للقباضة المالية لاقتناء التنبر الجبائي المناسب" },
        targetOffice: "Recette des Finances",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 2,
        title: { derja: "A3mel copie conforme lel CIN", fr: "Légalisation copie CIN", ar: "استخراج نسخة مطابقة للأصل لبطاقة التعريف" },
        description: { derja: "Fi a9reb Baladiya walla Da2ira Baladiya", fr: "À la municipalité la plus proche", ar: "لدى أقرب دائرة بلدية" },
        targetOffice: "Baladiya",
        estimatedDuration: "10 min",
      },
      {
        stepNumber: 3,
        title: { derja: "Sobb el dossier fel Markez", fr: "Dépôt du dossier au poste", ar: "إيداع الملف بمركز الأمن" },
        description: { derja: "Hazz el dossier el kemel lel markez el marje3 el tourabi mte3 CIN mte3ek", fr: "Déposer l'ensemble des pièces au poste territorialement compétent", ar: "إيداع الملف بالمركز المختص ترابياً وأخذ وصل الاستلام" },
        targetOffice: "Poste de Police / Garde Nationale",
        estimatedDuration: "20 min",
      }
    ]
  },
  {
    id: 'cin-carte-identite',
    slug: 'cin-carte-identite',
    vertical: 'identity',
    iconName: 'CreditCard',
    tags: ['cin', 'bita9a', 'ta3rif', 'identite', 'chorta'],
    title: {
      derja: "Istikhraj walla Tajdid Bita9at Ta3rif (CIN)",
      fr: "Obtention / Renouvellement Carte d'Identité (CIN)",
      ar: "استخراج أو تجديد بطاقة التعريف الوطنية",
      en: "National Identity Card (CIN) Issuance & Renewal"
    },
    shortDescription: {
      derja: "Awra9 el CIN awwel marra walla tabdil el 5edma, el 3onwan, walla fi 7alet el dheya3.",
      fr: "Procédure d'obtention de la première CIN ou renouvellement suite à changement d'adresse/profession ou perte.",
      ar: "إجراءات استخراج بطاقة التعريف الوطنية لأول مرة أو تجديدها إثر تغيير المهنة أو العنوان أو الضياع.",
    },
    fullDescription: {
      derja: "Bita9at el Ta3rif el Wataniya ijbariya men 3omr 18 sna (w momkna men 15 sna). Lezem madhmoun ma yetfoutech 3 chhour, ch'hadet i9ama, ch'hadet 5edma, w timbre fiscal 3 DT.",
      fr: "La Carte d'Identité Nationale est obligatoire dès 18 ans. Le dossier requiert un extrait de naissance de moins de 3 mois, un certificat de résidence, une attestation de travail et un timbre fiscal de 3 DT.",
      ar: "بطاقة التعريف الوطنية وثيقة إلزامية لكل تونسي بلغ 18 سنة. تتطلب مضمونا حديثا، شهادة إقامة، شهادة عمل وتنبرا جبائيا بـ 3 دنانير.",
    },
    estimatedTotalCostTND: 12.0,
    estimatedProcessingTime: "10 - 20 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['police_garde', 'recette_finances', 'baladiya'],
    costsBreakdown: [
      {
        id: 'c-cin-1',
        label: { derja: "Timbre fiscal CIN (3 DT)", fr: "Timbre fiscal CIN (3 DT)", ar: "تنبر جبائي لبطاقة التعريف (3 د.ت)" },
        amountTND: 3.0,
        quantity: 1,
        category: 'timbre_fiscal',
      },
      {
        id: 'c-cin-2',
        label: { derja: "3 Tsawer format officiel CIN", fr: "3 Photos d'identité officielles", ar: "3 صور شمسية مطابقة للمواصفات" },
        amountTND: 5.0,
        quantity: 1,
        category: 'photo',
      },
      {
        id: 'c-cin-3',
        label: { derja: "Madhmoun welada (Extrait)", fr: "Extrait de naissance récent", ar: "مضمون ولادة حديث العهد" },
        amountTND: 2.0,
        quantity: 1,
        category: 'autre',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cin-1',
        name: { derja: "Madhmoun welada ma yetfoutech 3 chhour", fr: "Extrait de naissance de moins de 3 mois", ar: "مضمون ولادة لا تتجاوز مدة استخراجه 3 أشهر" },
        originalRequired: true,
      },
      {
        id: 'doc-cin-2',
        name: { derja: "Ch'hadet I9ama (Certificat de résidence)", fr: "Certificat de résidence", ar: "شهادة إقامة مُسلّمة من مركز الأمن المختص" },
        originalRequired: true,
      },
      {
        id: 'doc-cin-3',
        name: { derja: "Ch'hadet 3amal (Attestation de travail)", fr: "Attestation de travail ou diplôme", ar: "شهادة عمل أو شهادة ترسيم جامعي لإثبات المهنة" },
        originalRequired: true,
      },
      {
        id: 'doc-cin-4',
        name: { derja: "3 Tsawer chamsiya khalfiya baydha2", fr: "3 Photos d'identité récentes", ar: "3 صور شمسية حديثة بخلفية بيضاء" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Talla3 el Madhmoun mel Baladiya", fr: "Extraire l'acte de naissance", ar: "استخراج مضمون الولادة من البلدية أو عبر الإنترنت" },
        description: { derja: "Baladiya walla en ligne 3la madhmoun.tn", fr: "En mairie ou en ligne sur le portail madhmoun.tn", ar: "لدى البلدية أو عبر المنصة الوطنية" },
        targetOffice: "Baladiya",
        estimatedDuration: "10 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Khou Ch'hadet I9ama mel Markez", fr: "Obtenir le certificat de résidence", ar: "الحصول على شهادة الإقامة من مركز الأمن" },
        description: { derja: "Hazz wathi9at el kré walla faktouret STEG/SONEDE lel markez", fr: "Fournir quittance STEG/SONEDE ou contrat de bail", ar: "الاستظهار بفاتورة الكهرباء أو عقد الكراء" },
        targetOffice: "Poste de Police / Garde Nationale",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 3,
        title: { derja: "Dépôt dossier CIN fel Markez", fr: "Dépôt de la demande", ar: "إيداع ملف بطاقة التعريف وأخذ البصمات" },
        description: { derja: "Ta3mel el basmat fel markez w te5ou el wasl", fr: "Prise d'empreintes digitales et remise du récépissé", ar: "إتمام إجراءات البصمات وتسلم وصل السحب" },
        targetOffice: "Poste de Police / Garde Nationale",
        estimatedDuration: "25 min",
      }
    ]
  },
  {
    id: 'bulletin-3-b3',
    slug: 'bulletin-3-b3',
    vertical: 'identity',
    iconName: 'ShieldCheck',
    tags: ['b3', 'bulletin 3', 'casier judiciaire', 'bita9a 3adliya', 'chorta'],
    title: {
      derja: "Bita9at el Sawabi9 el 3adliya (Bulletin N°3 / B3)",
      fr: "Casier Judiciaire (Bulletin N°3 - B3)",
      ar: "بطاقة السوابق العدلية (بطاقة عدد 3)",
      en: "Criminal Record Certificate (Bulletin N°3 / B3)"
    },
    shortDescription: {
      derja: "Istikhraj el B3 en ligne walla fel markez lel concours, 5edma jdid, walla visa.",
      fr: "Obtention de l'extrait de casier judiciaire (B3) en ligne via b3.interieur.gov.tn ou au poste de police.",
      ar: "إجراءات الحصول على بطاقة السوابق العدلية عدد 3 إلكترونياً أو عبر مركز الأمن للانتداب أو السفر.",
    },
    fullDescription: {
      derja: "El B3 yetlebha kol we7ed y7eb y9adem fi concours walla khedma. Tnajjem tsobha en ligne w touslek lel dar bel Rapide Poste, walla fel Markez b'timbre fiscal 3 DT.",
      fr: "Le Bulletin n°3 est le document officiel attestant du casier judiciaire. Il peut être commandé en ligne avec livraison sécurisée à domicile via Rapide-Poste ou déposé au poste de police.",
      ar: "تُطلب البطاقة عدد 3 في مناظرات الانتداب وملفات السفر، ويمكن استخراجها إلكترونياً وتسلّمها عبر البريد السريع أو مباشرة بالمركز.",
    },
    estimatedTotalCostTND: 7.5,
    estimatedProcessingTime: "3 - 8 jours",
    urgencyLevel: 'low',
    relatedOfficeTypes: ['police_garde', 'poste', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'c-b3-1',
        label: { derja: "Timbre fiscal B3", fr: "Timbre fiscal B3 (3 DT)", ar: "تنبر جبائي للبطاقة عدد 3 (3 د.ت)" },
        amountTND: 3.0,
        quantity: 1,
        category: 'timbre_fiscal',
      },
      {
        id: 'c-b3-2',
        label: { derja: "Frais d'envoi Rapide Poste (en ligne)", fr: "Frais de livraison postale sécurisée", ar: "معلوم الإرسال عبر البريد السريع" },
        amountTND: 4.5,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-b3-1',
        name: { derja: "Copie CIN", fr: "Copie de la CIN", ar: "نسخة من بطاقة التعريف الوطنية" },
        originalRequired: true,
      },
      {
        id: 'doc-b3-2',
        name: { derja: "Madhmoun welada", fr: "Extrait de naissance", ar: "مضمون ولادة حديث" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Talab en ligne 3la portail ministère", fr: "Commande en ligne sécurisée", ar: "التقديم عبر البوابة الإلكترونية لوزارة الداخلية" },
        description: { derja: "3abbi el ma3loumet 3la b3.interieur.gov.tn w 5alles bel carte bancaire walla e-Dinar", fr: "Remplir le formulaire et payer en ligne", ar: "ملء الاستمارة والدفع الإلكتروني" },
        targetOffice: "Portail en ligne / Poste de Police",
        estimatedDuration: "5 min",
      }
    ]
  },

  // ================= TRANSPORT & VEHICLES =================
  {
    id: 'mutation-carte-grise',
    slug: 'mutation-carte-grise',
    vertical: 'transport',
    iconName: 'Car',
    tags: ['carte grise', 'karhba', 'mutation', 'attt', 'recette', 'vignette'],
    title: {
      derja: "Tabdil Carte Grise ba3d ma chrit Karhba",
      fr: "Mutation de Carte Grise (Changement de Propriétaire)",
      ar: "تحويل ملكية سيارة وتغيير البطاقة الرمادية",
      en: "Vehicle Ownership Transfer & Registration (Carte Grise)"
    },
    shortDescription: {
      derja: "Koll el étapes bech tbeddel el carte grise fi esmek ba3d ma tba3et el karhba m3a l'ATTT.",
      fr: "Guide complet pour transférer la carte grise à votre nom auprès de l'Agence Technique des Transports Terrestres (ATTT).",
      ar: "الإجراءات الكاملة لتحويل ملكية عربة وتسجيل البطاقة الرمادية باسم المشتري لدى الوكالة الفنية للنقل البري.",
    },
    fullDescription: {
      derja: "3andek délai 15 jours ba3d el chira bech t9ayed el contrat fel Recette w tsob el dossier fel ATTT. Lezem Contrat de vente mou3arref bel imdha2, Carte grise l'9dima, Visite technique sal7a, w wathi9at khalass el vignette.",
      fr: "L'acheteur dispose d'un délai légal de 15 jours après signature pour enregistrer le contrat à la Recette des Finances et déposer la demande de nouvelle carte grise auprès de l'ATTT.",
      ar: "يمنح القانون أجلاً بـ 15 يوماً من تاريخ إبرام عقد البيع لتسجيله بالقباضة المالية وإيداع ملف تغيير البطاقة الرمادية بفرع الوكالة الفنية للنقل البري.",
    },
    estimatedTotalCostTND: 145.0,
    estimatedProcessingTime: "1 - 3 jours",
    urgencyLevel: 'high',
    templateSlug: 'contrat-vente-vehicule',
    relatedOfficeTypes: ['recette_finances', 'attt', 'baladiya'],
    costsBreakdown: [
      {
        id: 'cg-1',
        label: { derja: "Enregistrement Contrat fel Recette", fr: "Droits d'enregistrement du contrat de vente", ar: "معاليم تسجيل عقد البيع بالقباضة المالية" },
        amountTND: 100.0,
        quantity: 1,
        category: 'timbre_fiscal',
      },
      {
        id: 'cg-2',
        label: { derja: "Frais Nouvelle Carte Grise ATTT", fr: "Frais d'émission de la nouvelle carte grise", ar: "معاليم إصدار البطاقة الرمادية الجديدة بالوكالة" },
        amountTND: 40.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'cg-3',
        label: { derja: "Légalisation Contrat fel Baladiya", fr: "Légalisation de signatures (x2)", ar: "معلوم التعريف بالإمضاء للطرفين بالبلدية" },
        amountTND: 5.0,
        quantity: 1,
        category: 'legalisation',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cg-1',
        name: { derja: "Contrat de vente m'sajjel fel Recette", fr: "Contrat de vente enregistré à la Recette", ar: "عقد بيع مسجل بالقباضة المالية (أصل + نسخة)" },
        originalRequired: true,
      },
      {
        id: 'doc-cg-2',
        name: { derja: "El Carte Grise el 9dima m'sa77a7 fiha el beye3", fr: "Ancienne carte grise barrée et signée", ar: "البطاقة الرمادية السابقة وموقع عليها البائع" },
        originalRequired: true,
      },
      {
        id: 'doc-cg-3',
        name: { derja: "Ch'hadet el Visite Technique sal7a", fr: "Certificat de visite technique en cours de validité", ar: "شهادة فحص فني سارية المفعول" },
        originalRequired: true,
      },
      {
        id: 'doc-cg-4',
        name: { derja: "Copie CIN mte3 el Chari", fr: "Copie de la CIN de l'acquéreur", ar: "نسخة من بطاقة التعريف الوطنية للمشتري" },
        originalRequired: true,
        copiesConformes: 1,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Sa77e7 el Contrat fel Baladiya", fr: "Légalisation du contrat en mairie", ar: "التعريف بإمضاء الطرفين في البلدية" },
        description: { derja: "Beye3 w chari ysa777ou fel Baladiya", fr: "Signature conjointe devant l'officier d'état civil", ar: "إمضاء البائع والمشتري لدى ضابط الحالة المدنية" },
        targetOffice: "Baladiya",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Sajjel el Contrat fel Recette des Finances", fr: "Enregistrement à la Recette des Finances", ar: "تسجيل العقد بالقباضة المالية ودفع المعاليم" },
        description: { derja: "5alles droits d'enregistrement fel Recette", fr: "Payer les taxes proportionnelles d'enregistrement", ar: "دفع معاليم التسجيل القانونية" },
        targetOffice: "Recette des Finances",
        estimatedDuration: "30 min",
      },
      {
        stepNumber: 3,
        title: { derja: "Sobb el Dossier fel ATTT", fr: "Dépôt du dossier à l'agence ATTT", ar: "إيداع الملف بمركز الفحص الفني والنقل البري (ATTT)" },
        description: { derja: "Te5ou el récépissé w t'capti el carte grise jidida", fr: "Obtenir la nouvelle carte grise définitive", ar: "تسليم الملف وتسلم البطاقة الرمادية الجديدة" },
        targetOffice: "ATTT (Agence Technique des Transports Terrestres)",
        estimatedDuration: "45 min",
      }
    ]
  },
  {
    id: 'permis-conduire-renouvellement',
    slug: 'permis-conduire-renouvellement',
    vertical: 'transport',
    iconName: 'IdCard',
    tags: ['permis', 'syega', 'conduire', 'attt', "ch'hadet teb"],
    title: {
      derja: "Tajdid Rokhsat el Siyéga (Permis de Conduire)",
      fr: "Renouvellement du Permis de Conduire",
      ar: "تجديد رخصة السياقة التونسية",
      en: "Driver's License Renewal & Replacement"
    },
    shortDescription: {
      derja: "Tajdid el permis ba3d ma youfa (kol 10 snin) walla fi 7alet el dheya3.",
      fr: "Renouvellement décennal du permis de conduire ou duplicata après perte ou détérioration.",
      ar: "إجراءات التجديد الدوري لرخصة السياقة (كل 10 سنوات) أو استخراج نظير إثر الضياع.",
    },
    fullDescription: {
      derja: "Lezem ch'hadet tebba (Certificat médical) ma yetfoutech 3 chhour, 2 tsawer, permis el 9dim, w timbre 25 DT fel ATTT.",
      fr: "Le renouvellement nécessite un certificat médical d'aptitude physique et visuelle, 2 photos d'identité et le règlement des frais de confection de la carte auprès de l'ATTT.",
      ar: "يتطلب تجديد رخصة السياقة شهادة طبية تثبت السلامة البصرية والبدنية، صورتين شمسيتين ودفع معلوم الخدمة بالوكالة الفنية للنقل البري.",
    },
    estimatedTotalCostTND: 45.0,
    estimatedProcessingTime: "5 - 10 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['attt', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'p-1',
        label: { derja: "Frais renouvellement permis ATTT", fr: "Frais de fabrication du permis biométrique", ar: "معاليم إصدار رخصة السياقة بالوكالة" },
        amountTND: 25.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'p-2',
        label: { derja: "Ch'hadet tebba (Médecin conventionné)", fr: "Certificat médical d'aptitude", ar: "كشف طبي وشهادة سلامة القدرات البصرية" },
        amountTND: 15.0,
        quantity: 1,
        category: 'autre',
      },
      {
        id: 'p-3',
        label: { derja: "2 Tsawer format permis", fr: "2 Photos d'identité", ar: "2 صور شمسية" },
        amountTND: 5.0,
        quantity: 1,
        category: 'photo',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-p-1',
        name: { derja: "Ch'hadet tebba (Certificat médical modèle officiel)", fr: "Certificat médical officiel d'aptitude à la conduite", ar: "شهادة طبية مطابقة للنموذج القانوني" },
        originalRequired: true,
      },
      {
        id: 'doc-p-2',
        name: { derja: "El Permis el 9dim", fr: "Ancien permis de conduire", ar: "رخصة السياقة المنتهية الصلوحية" },
        originalRequired: true,
      },
      {
        id: 'doc-p-3',
        name: { derja: "Copie CIN", fr: "Copie de la CIN", ar: "نسخة من بطاقة التعريف الوطنية" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Visite tebbeya 3and tbib", fr: "Visite médicale d'aptitude", ar: "إجراء الفحص الطبي لدى طبيب عام أو معتمد" },
        description: { derja: "Ta3mel kachf tebbi 3al 3inin w se7a", fr: "Obtenir le certificat médical visuel et physique", ar: "الحصول على الشهادة الطبية" },
        targetOffice: "Cabinet Médical",
        estimatedDuration: "20 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Sobb el dossier fel ATTT", fr: "Dépôt du dossier à l'ATTT", ar: "إيداع الملف بالوكالة الفنية للنقل البري" },
        description: { derja: "T5alles el frais w te5ou permis provisoire", fr: "Paiement et délivrance d'un permis provisoire", ar: "تسليم الملف وتسلم رخصة وقتية إلى حين جهوزية البطاقة" },
        targetOffice: "ATTT",
        estimatedDuration: "30 min",
      }
    ]
  },

  // ================= BUSINESS & FREELANCE =================
  {
    id: 'statut-auto-entrepreneur',
    slug: 'statut-auto-entrepreneur',
    vertical: 'business',
    iconName: 'Briefcase',
    tags: ['auto-entrepreneur', 'freelance', 'patente', 'impot', 'startups', 'plateforme'],
    title: {
      derja: "Nidham el Baresth el Fardi (Auto-Entrepreneur Tounsi)",
      fr: "Statut de l'Auto-Entrepreneur en Tunisie",
      ar: "نظام المبادر الذاتي في تونس (Auto-Entrepreneur)",
      en: "Auto-Entrepreneur & Freelancer Registration"
    },
    shortDescription: {
      derja: "Koll chay 3al plateforme auto-entrepreneur.tn, dhariba 0.5% - 1%, w cnss m5afadh.",
      fr: "Régime fiscal et social simplifié pour indépendants : taxe forfaitaire de 0.5% à 1%, inscription en ligne.",
      ar: "النظام الجبائي والاجتماعي المبسط للمستقلين: ضريبة موحدة 0.5% إلى 1%، تسجيل رقمي وتغطية اجتماعية.",
    },
    fullDescription: {
      derja: "Nidham el Auto-Entrepreneur fi tounes y5allik te5dem freelance mrigel 9anouniyan b'dhariba sghira barcha (1% fel services, 0.5% fel tijara), CNSS sghir, w men ghir comptable. Kol chay yet3adda en ligne.",
      fr: "Le statut de l'Auto-Entrepreneur tunisien permet aux freelances et prestataires de services d'exercer en toute légalité avec un taux d'imposition réduit (1% services, 0.5% commerce/artisanat) et une cotisation CNSS unique forfaitaire.",
      ar: "يمكّن نظام المبادر الذاتي الشباب والمستقلين من ممارسة نشاطهم المهني بصورة قانونية مبسطة مع إعفاءات جبائية هامة ومساهمة اجتماعية مخفضة دون اشتراط محاسب.",
    },
    estimatedTotalCostTND: 10.0,
    estimatedProcessingTime: "24 - 48 heures",
    urgencyLevel: 'low',
    relatedOfficeTypes: ['rne', 'recette_finances', 'cnss'],
    costsBreakdown: [
      {
        id: 'ae-1',
        label: { derja: "Inscripition 3la plateforme (Majjenan)", fr: "Frais d'adhésion au registre national", ar: "معلوم التسجيل بالمنصة الوطنية للمبادر الذاتي" },
        amountTND: 0.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'ae-2',
        label: { derja: "Cotisation CNSS trimestrielle symbolique", fr: "Cotisation sociale trimestrielle forfaitaire", ar: "المساهمة الاجتماعية الثلاثية الجزافية" },
        amountTND: 50.0,
        quantity: 1,
        category: 'autre',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-ae-1',
        name: { derja: "Copie CIN", fr: "Copie de la CIN valide", ar: "نسخة من بطاقة التعريف الوطنية سارية المفعول" },
        originalRequired: true,
      },
      {
        id: 'doc-ae-2',
        name: { derja: "Ch'hadet i9ama walla justificatif domicile", fr: "Justificatif de domicile / Facture STEG", ar: "مؤيد لمقر النشاط أو الإقامة (فاتورة كهرباء/عقد)" },
        originalRequired: true,
      },
      {
        id: 'doc-ae-3',
        name: { derja: "Diplôme walla attestation compétence (si métier qualifié)", fr: "Diplôme professionnel ou certificat de formation", ar: "شهادة كفاءة مهنية أو جامعية للأنشطة المنظمة" },
        originalRequired: false,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Inscris-toi 3la portail autoentrepreneur.tn", fr: "Créer un compte sur la plateforme nationale", ar: "إنشاء حساب على البوابة الوطنية للمبادر الذاتي" },
        description: { derja: "Dakhil les coordonnées mte3ek w ekhtar l'activité", fr: "Renseigner les informations et choisir l'activité", ar: "تسجيل البيانات واختيار قطاع النشاط المهني" },
        targetOffice: "Portail Auto-Entrepreneur",
        estimatedDuration: "10 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Telechargi el Carte d'Auto-Entrepreneur", fr: "Téléchargement de la carte officielle avec QR", ar: "تحميل بطاقة المبادر الذاتي الرسمية المشفرة" },
        description: { derja: "Touslek validation fi 48h w tabda tfaktour", fr: "Validation sous 48h et début de facturation", ar: "المصادقة الفورية والبدء في إصدار الفواتير القانونية" },
        targetOffice: "Plateforme Numérique",
        estimatedDuration: "24h",
      }
    ]
  },
  {
    id: 'creation-societe-rne',
    slug: 'creation-societe-rne',
    vertical: 'business',
    iconName: 'Building2',
    tags: ['societe', 'rne', 'suarl', 'sarl', 'registre commerce', 'statuts'],
    title: {
      derja: "Ta2sis Charika fi Tounes (RNE / SUARL / SARL)",
      fr: "Création de Société (RNE / SUARL / SARL)",
      ar: "تأسيس شركة في تونس (السجل الوطني للمؤسسات / ش.ف.م.م)",
      en: "Company Incorporation & Commercial Registry (RNE / SUARL / SARL)"
    },
    shortDescription: {
      derja: "Koll el étapes men rédation el statuts, 7alan el compte bancaire indisponible, 7atta el RNE.",
      fr: "Parcours complet de création d'entreprise : statuts, dépôt du capital, patente et immatriculation RNE.",
      ar: "المسار الكامل لبعث المؤسسات: تحرير العقود التأسيسية، إيداع رأس المال، المعرف الجبائي والتسجيل بالسجل الوطني للمؤسسات.",
    },
    fullDescription: {
      derja: "Ta2sis charika fi tounes yet3ada b'4 étapes ra2issiya: T7adher el statuts types, tsob leflous fel banque fi compte indisponible, t9ayed fel Recette des Finances bech te5ou el Patente (Matricule Fiscal), w mba3d t9ayed fel RNE.",
      fr: "La constitution d'une société commerciale requiert la rédaction des statuts, le blocage du capital bancaire, l'enregistrement des actes à la Recette pour l'obtention de la Patente, puis l'immatriculation finale au RNE.",
      ar: "تتطلب إجراءات تأسيس الشركات التجارية تحرير القوانين الأساسية، فتح حساب بنكي مجمد، تسجيل العقود بالقباضة لاستخراج المعرف الجبائي ثم التسجيل النهائي بـ RNE.",
    },
    estimatedTotalCostTND: 220.0,
    estimatedProcessingTime: "3 - 7 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['rne', 'recette_finances', 'baladiya'],
    costsBreakdown: [
      {
        id: 'rne-1',
        label: { derja: "Frais d'immatriculation RNE", fr: "Frais d'immatriculation au RNE", ar: "معاليم الترسيم بالسجل الوطني للمؤسسات" },
        amountTND: 100.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'rne-2',
        label: { derja: "Enregistrement Statuts fel Recette", fr: "Enregistrement fiscal des statuts (Recette)", ar: "معاليم تسجيل العقد التأسيسي بالقباضة المالية" },
        amountTND: 100.0,
        quantity: 1,
        category: 'timbre_fiscal',
      },
      {
        id: 'rne-3',
        label: { derja: "Légalisation Statuts fel Baladiya", fr: "Légalisation de 5 exemplaires des statuts", ar: "التعريف بإمضاء نسخ العقد التأسيسي بالبلدية" },
        amountTND: 20.0,
        quantity: 1,
        category: 'legalisation',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-rne-1',
        name: { derja: "Statuts mte3 el charika (5 exemplaires mou3arfin)", fr: "5 exemplaires originaux des Statuts légalisés", ar: "5 نظائر أصلية من القانون الأساسي معرف بإمضائها" },
        originalRequired: true,
      },
      {
        id: 'doc-rne-2',
        name: { derja: "Ch'hadet blocage capital mel banque", fr: "Attestation de blocage du capital bancaire", ar: "شهادة بنكية في تجميد رأس المال التأسيسي" },
        originalRequired: true,
      },
      {
        id: 'doc-rne-3',
        name: { derja: "Contrat de domiciliation walla contrat kré siège", fr: "Contrat de bail ou convention de domiciliation enregistré", ar: "عقد تسويغ مقر الشركة أو اتفاقية توطين مسجلة" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Sa77e7 el Statuts fel Baladiya", fr: "Signature et légalisation des statuts", ar: "إمضاء القانون الأساسي والتعريف به في البلدية" },
        description: { derja: "5 nsa5 men el statuts", fr: "Légaliser 5 exemplaires des statuts", ar: "التعريف بإمضاء المؤسسين" },
        targetOffice: "Baladiya",
        estimatedDuration: "20 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Talla3 el Patente mel Recette des Finances", fr: "Obtention de la Patente (Déclaration d'existence)", ar: "إيداع تصريح بالوجود واستخراج المعرف الجبائي (Patente)" },
        description: { derja: "Te5ou el matricule fiscal w déclaration d'existence", fr: "Obtenir l'immatriculation fiscale et code TVA", ar: "استخراج البطاقة الجبائية ورمز الأداء على القيمة المضافة" },
        targetOffice: "Recette des Finances",
        estimatedDuration: "45 min",
      },
      {
        stepNumber: 3,
        title: { derja: "Immatriculation RNE", fr: "Immatriculation au Registre National des Entreprises", ar: "الترسيم بالسجل الوطني للمؤسسات (RNE)" },
        description: { derja: "Te5ou l'Extrait RNE el rasmi", fr: "Délivrance de l'Extrait RNE officiel", ar: "الحصول على المضمون الرسمي للسجل التجاري" },
        targetOffice: "RNE (Registre National des Entreprises)",
        estimatedDuration: "30 min",
      }
    ]
  },

  // ================= HOUSING & UTILITIES =================
  {
    id: 'contrat-location-habitation',
    slug: 'contrat-location-habitation',
    vertical: 'housing',
    iconName: 'Home',
    tags: ['location', 'kre', 'contrat', 'dar', 'baladiya', 'recette'],
    title: {
      derja: "Contrat de Location Dyar w Ma7allat (3a9d Kré)",
      fr: "Contrat de Bail & Location à Usage d'Habitation",
      ar: "عقد كراء محل سكني أو تجاري (معرّف به ومسجّل)",
      en: "Residential Lease Agreement & Tax Registration"
    },
    shortDescription: {
      derja: "Générer contrat de bail standardisé mrigel 9anouniyan lel Baladiya wel Recette.",
      fr: "Générateur de contrat de bail bilingue conforme aux dispositions du code des obligations et des contrats.",
      ar: "استخراج عقد تسويغ سكني مطابق للتشريع التونسي جاهز للتعريف بالإمضاء والتسجيل الجبائي.",
    },
    fullDescription: {
      derja: "Contrat el Kré yelzmou ykoun fih el ma3loumet el kol: les coordonnées mte3 el kéri wel mektéri, el soum bel chhar, la caution (dhamen), w chkoun ykhalas steg/sonede. Ba3d ma tsa77ou fel Baladiya, yetsajjel fel Recette.",
      fr: "Le contrat de bail régit les droits et devoirs du bailleur et du preneur. Il doit impérativement préciser le montant du loyer, le dépôt de garantie, l'état des lieux et faire l'objet d'une légalisation de signature puis d'un enregistrement fiscal.",
      ar: "يضبط عقد الكراء العلاقة القانونية بين المسوّغ والمكتري، ويشمل تحديد معلوم الكراء، مبلغ الضمان، وشروط التحيين مع وجوب التعريف بإمضاء الطرفين بالبلدية وتسجيله بالقباضة.",
    },
    estimatedTotalCostTND: 35.0,
    estimatedProcessingTime: "1 jour",
    urgencyLevel: 'low',
    templateSlug: 'contrat-location',
    relatedOfficeTypes: ['baladiya', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'loc-1',
        label: { derja: "Légalisation de signature fel Baladiya (x2)", fr: "Légalisation des signatures à la mairie", ar: "معلوم التعريف بالإمضاء للطرفين بالبلدية" },
        amountTND: 5.0,
        quantity: 1,
        category: 'legalisation',
      },
      {
        id: 'loc-2',
        label: { derja: "Enregistrement fel Recette des Finances (1% loyer annuel + timbres)", fr: "Enregistrement fiscal (Droit proportionnel 1%)", ar: "معلوم التسجيل الجبائي بالقباضة (1% من المعين السنوي)" },
        amountTND: 30.0,
        quantity: 1,
        category: 'timbre_fiscal',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-loc-1',
        name: { derja: "Contrat de bail fi 3 nsa5", fr: "3 exemplaires du contrat de bail signés", ar: "3 نظائر من عقد الكراء ممضاة من الطرفين" },
        originalRequired: true,
      },
      {
        id: 'doc-loc-2',
        name: { derja: "Copie CIN el Kéri wel Mektéri", fr: "Copies des CIN du bailleur et du locataire", ar: "نسخ من بطاقات التعريف للمسوغ والمكتري" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Imprimer w sa77e7 fel Baladiya", fr: "Légalisation des signatures en mairie", ar: "التعريف بإمضاء الطرفين لدى البلدية" },
        description: { derja: "Hazz el 3 nsa5 lel Baladiya m3a el CIN", fr: "Présentation des 3 exemplaires originaux", ar: "الاستظهار ببطاقات التعريف وإمضاء العقود" },
        targetOffice: "Baladiya",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Enregistrement fel Recette des Finances", fr: "Enregistrement du bail à la Recette", ar: "تسجيل العقد بالقباضة المالية" },
        description: { derja: "T5alles droits d'enregistrement bech yabda el contrat opposable aux tiers", fr: "Payer le droit d'enregistrement pour lui conférer date certaine", ar: "إكساء العقد التاريخ الثابت وإبراء الذمة الجبائية" },
        targetOffice: "Recette des Finances",
        estimatedDuration: "20 min",
      }
    ]
  },
  {
    id: 'raccordement-steg',
    slug: 'raccordement-steg',
    vertical: 'housing',
    iconName: 'Zap',
    tags: ['steg', 'kahraba', 'gaz', 'raccordement', 'compteur'],
    title: {
      derja: "Tarkib Compteur Dhaw w Gaz (STEG)",
      fr: "Demande de Raccordement Électricité & Gaz (STEG)",
      ar: "مطلب ربط بالكهرباء والغاز وتركيب عداد (الشركة التونسية للكهرباء والغاز)",
      en: "STEG Electricity & Gas Meter Connection"
    },
    shortDescription: {
      derja: "Awra9 w étapes tarkib compteur STEG jdid lel dar walla ma7al khedma.",
      fr: "Procédure d'installation et de branchement d'un nouveau compteur électrique monophasé / triphasé ou gaz naturel.",
      ar: "ملف وإجراءات التزود بالطاقة الكهربائية والغاز الطبيعي وتركيب العداد السكني أو المهني.",
    },
    fullDescription: {
      derja: "Tarkib compteur steg yelzmou rorkhset bina2 walla ch'hadet rabt mel Baladiya, ch'hadet mel instalatour agréé, copie CIN, w wathi9at el melkiya walla el kré.",
      fr: "La demande d'abonnement et de branchement requiert l'autorisation municipale de bâtir ou certificat de raccordement, l'attestation de conformité de l'installation intérieure, une copie de la CIN et le titre de propriété.",
      ar: "يتطلب مطلب الربط بشبكة الكهرباء رخصة البناء أو شهادة الربط المسلمة من البلدية، شهادة مطابقة للتجهيزات الداخلية، ونسخة من سند الملكية.",
    },
    estimatedTotalCostTND: 180.0,
    estimatedProcessingTime: "7 - 20 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['steg', 'baladiya'],
    costsBreakdown: [
      {
        id: 'steg-1',
        label: { derja: "Devis de branchement & Frais de pose compteur", fr: "Frais d'étude et de pose du compteur standard", ar: "معاليم دراسة وتركيب العداد الفردي" },
        amountTND: 180.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-st-1',
        name: { derja: "Ch'hadet rabt mel Baladiya walla Rokhsat bina2", fr: "Certificat de raccordement municipal ou permis de bâtir", ar: "شهادة في الربط مسلمة من البلدية أو رخصة بناء" },
        originalRequired: true,
      },
      {
        id: 'doc-st-2',
        name: { derja: "Ch'hadet melkiya walla 3a9d kré", fr: "Titre de propriété ou contrat de bail enregistré", ar: "شهادة ملكية أو عقد كراء مسجل" },
        originalRequired: true,
      },
      {
        id: 'doc-st-3',
        name: { derja: "Ch'hadet salou7iya mel instalatour (Attestation d'installation)", fr: "Attestation de conformité de l'installateur électricien", ar: "شهادة في سلامة الشبكة الداخلية من فني معتمد" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Sobb el dossier fel Agence STEG", fr: "Dépôt de la demande en agence STEG", ar: "إيداع المطلب بإقليم الشركة التونسية للكهرباء والغاز" },
        description: { derja: "Dépôt des pièces w te5ou numéro dossier", fr: "Enregistrement et planification de la visite technique", ar: "تسجيل المطلب وتحديد موعد المعاينة الفنية" },
        targetOffice: "District STEG",
        estimatedDuration: "30 min",
      }
    ]
  },

  // ================= HEALTHCARE & SOCIAL =================
  {
    id: 'remboursement-cnam',
    slug: 'remboursement-cnam',
    vertical: 'healthcare',
    iconName: 'HeartPulse',
    tags: ['cnam', 'sante', 'dwe', 'remboursement', 'filiere privee', 'boc'],
    title: {
      derja: "Istirja3 Masarif el Dwe wel Tebba (CNAM)",
      fr: "Remboursement des Soins & Médicaments (CNAM)",
      ar: "استرجاع مصاريف العلاج والأدوية (الصندوق الوطني للتأمين على المرض - الكنام)",
      en: "CNAM Healthcare Reimbursement (Filière Privée / Carnet)"
    },
    shortDescription: {
      derja: "Tarikhat el sobben mte3 el bulletins de soins, plafond annuel, w suivi remboursement.",
      fr: "Dépôt des bulletins de soins (filière privée / médecin de famille), suivi du plafond annuel et délais de virement.",
      ar: "إجراءات إيداع بطاقات استرجاع المصاريف، متابعة السقف السنوي ومواعيد صرف المنح.",
    },
    fullDescription: {
      derja: "Lel 3bed elli 3andhom filière privée (Remboursement), lezem tsob el bulletin de soins fi أجل ma yfoutech 60 jours men date el 3yada. Lezem fih wignettes el dwe, cachet tbib, cachet el pharmacien, w ordonnance originale.",
      fr: "Les assurés sociaux affiliés à la filière de remboursement doivent déposer leurs bulletins de soins dans un délai maximal de 60 jours à compter de la date de prescription, munis des vignettes originales et cachets.",
      ar: "يتعين على المنخرطين في المنظومة العلاجية الخاصة (استرجاع مصاريف) إيداع البطاقات العلاجية في أجل أقصاه 60 يوماً مصحوبة بالأصل من الوصفة الطبية وطوابع الأدوية.",
    },
    estimatedTotalCostTND: 0.0,
    estimatedProcessingTime: "15 - 30 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['cnam'],
    costsBreakdown: [],
    requiredDocuments: [
      {
        id: 'doc-cnam-1',
        name: { derja: "Bulletin de soins m3abbi w mcacheti", fr: "Bulletin de soins dûment rempli et cacheté", ar: "بطاقة استرجاع مصاريف علاج معمرة ومختومة من الطبيب والصيدلي" },
        originalRequired: true,
      },
      {
        id: 'doc-cnam-2',
        name: { derja: "Ordonnance originale m3aha les vignettes", fr: "Ordonnance médicale originale avec vignettes", ar: "الوصفة الطبية الأصلية ملصق عليها طوابع الأدوية" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Sobb fel Bureau CNAM walla Boîte aux lettres", fr: "Dépôt au centre régional CNAM", ar: "إيداع الملف بالمركز الجهوي أو المحلي للكنام" },
        description: { derja: "Fel guichet walla fel boîte réservée aux bulletins", fr: "Au guichet ou dans la boîte de collecte rapide", ar: "بالشباك أو عبر الصندوق المخصص للإيداع السريع" },
        targetOffice: "Centre CNAM",
        estimatedDuration: "10 min",
      }
    ]
  },

  // ================= CUSTOMS & DIASPORA =================
  {
    id: 'regime-fcr-douane',
    slug: 'regime-fcr-douane',
    vertical: 'customs',
    iconName: 'Plane',
    tags: ['fcr', 'douane', 'diaspora', 'tounsia fel 5arej', 'karhba', 'diwana'],
    title: {
      derja: "Imtiaz el FCR lel Tounsiya fel Kharej (TRE / Douane)",
      fr: "Régime Privilégié FCR (Franchise Changement de Résidence)",
      ar: "الامتياز الجبائي التقديري FCR للتونسيين بالخارج (الديوانة)",
      en: "FCR Duty-Free Vehicle Import (Tunisian Expats / TRE)"
    },
    shortDescription: {
      derja: "Koll el chourout bech tdakhel karhba walla a9achek men ghir ma t5allas diwana kemla.",
      fr: "Conditions d'éligibilité, calcul des droits et démarches pour importer un véhicule sous le régime FCR.",
      ar: "شروط الانتفاع، احتساب المعاليم الديوانية والإجراءات لتوريد سيارة أو أثاث تحت نظام FCR.",
    },
    fullDescription: {
      derja: "El FCR yentafe3 bih kol mowaten tounsi 3andou a9al chay 2 ans i9ama fel kharej men ghir ma 93ad fi tounes akther men 120 jours fi kol 3am. Ynajjem ydakhil karhba (RS walla immatriculation tounsia b'taxe reduite 25%-30%).",
      fr: "Le régime FCR est accordé aux Tunisiens résidant à l'étranger justifiant d'un séjour effectif d'au moins 2 ans hors du territoire avec des séjours en Tunisie n'excédant pas 120 jours par période de 365 jours.",
      ar: "يُمنح امتياز العودة النهائية والتوريد FCR للمواطنين المقيمين بالخارج لأكثر من سنتين بشرط عدم تجاوز مدة الإقامة بتونس 120 يوماً سنوياً.",
    },
    estimatedTotalCostTND: 50.0,
    estimatedProcessingTime: "2 - 5 jours",
    urgencyLevel: 'high',
    relatedOfficeTypes: ['douane'],
    costsBreakdown: [
      {
        id: 'fcr-1',
        label: { derja: "Frais de dossier douane", fr: "Frais de timbre et déclaration douanière", ar: "معاليم التصريح الديواني" },
        amountTND: 50.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-fcr-1',
        name: { derja: "Passeport fiha les cachets d'entrée/sortie kol", fr: "Passeport avec l'ensemble des cachets douaniers", ar: "جواز السفر يتضمن كافة أختام الدخول والخروج" },
        originalRequired: true,
      },
      {
        id: 'doc-fcr-2',
        name: { derja: "Carte de séjour fel kharej", fr: "Titre de séjour étranger valide", ar: "بطاقة الإقامة الأجنبية سارية المفعول" },
        originalRequired: true,
      },
      {
        id: 'doc-fcr-3',
        name: { derja: "Carte grise mte3 el karhba fi esmek", fr: "Carte grise du véhicule au nom du demandeur", ar: "البطاقة الرمادية للسيارة باسم صاحب المطلب" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Dépôt dossier au Bureau des Douanes", fr: "Dépôt de la déclaration douanière", ar: "إيداع التصريح الديواني بفرع الإدارة العامة للديوانة" },
        description: { derja: "Verifcation des conditions de séjour w calculate droits", fr: "Vérification des conditions de séjour et délivrance du certificat d'apurement", ar: "التثبت في شروط الإقامة وتسوية الوضعية الديوانية" },
        targetOffice: "Bureau Régional des Douanes / Port",
        estimatedDuration: "1 jour",
      }
    ]
  },

  // ================= HEALTHCARE & SOCIAL SECURITY =================
  {
    id: 'cnss-retraite-pension',
    slug: 'cnss-retraite-pension',
    vertical: 'healthcare',
    iconName: 'HeartPulse',
    tags: ['retraite', 'pension', 'cnss', 'vieillesse', 'ta9a3od', 'تقاعد', 'شيخوخة', 'جراية'],
    title: {
      derja: "Dossier el Retraite w Jarrayet el Cheykhoukha (CNSS)",
      fr: "Pension de Retraite et Vieillesse (CNSS)",
      ar: "جراية التقاعد والشيخوخة (الصندوق الوطني للضمان الاجتماعي)",
      en: "CNSS Retirement & Old-Age Pension"
    },
    shortDescription: {
      derja: "Koll el awra9 wel chourout bech tsob dossier el retraite fel CNSS w te5ou jarraytek.",
      fr: "Conditions d'âge, trimestres requis (120 trimestres) et démarches pour liquider votre pension de retraite CNSS.",
      ar: "شروط السن، الثلاثيات المستوجبة (120 ثلاثية) والوثائق اللازمة لتصفية جراية التقاعد لدى CNSS.",
    },
    fullDescription: {
      derja: "Bech tsob dossier el retraite fel CNSS lezem tkoun wassalt el 3mor el 9anouni (60 sne lel 9ita3 el 5ass walla 50 sne retraite anticipée b'180 trimestres). T7adher relevé de carrière, chhadet in9ita3 3an el 3amal men 3and el batron, w tsobhoum fel bureau régional mte3 CNSS.",
      fr: "La demande de pension de retraite est déposée auprès du bureau régional de la CNSS dont relève votre dernier employeur. Elle nécessite d'avoir atteint l'âge légal de 60 ans avec au moins 120 trimestres de cotisations effectives (ou 50 ans avec 180 trimestres en cas de travail pénible ou usure prématurée).",
      ar: "يُودع مطلب تصفية جراية الشيخوخة لدى المكتب الجهوي أو المحلي للصندوق الوطني للضمان الاجتماعي مرجع النظر، إثر بلوغ السن القانونية (60 سنة عموماً أو 50 سنة للتقاعد النسبي المشروط بـ 180 ثلاثية) وتوفر شرط 120 ثلاثية من الاشتراكات الفعلية على الأقل.",
    },
    estimatedTotalCostTND: 0.0,
    estimatedProcessingTime: "30 - 60 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['cnss', 'poste'],
    costsBreakdown: [
      {
        id: 'c-retraite-1',
        label: { derja: "Dépôt dossier CNSS (Gratuit)", fr: "Dépôt et liquidation dossier CNSS (Gratuit)", ar: "إيداع وتصفية الملف بالصندوق (مجاني)" },
        amountTND: 0.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-retraite-1',
        name: { derja: "Matloub jarrayet cheykhoukha matbou3 men CNSS", fr: "Formulaire officiel de demande de pension de vieillesse", ar: "مطبوعة مطلب جراية الشيخوخة معمّرة وممضاة" },
        originalRequired: true,
      },
      {
        id: 'doc-retraite-2',
        name: { derja: "Copie conforme CIN mte3 el madhmoun", fr: "Copie conforme de la CIN de l'assuré", ar: "نسخة مطابقة للأصل من بطاقة التعريف الوطنية للمضمون الاجتماعي" },
        originalRequired: true,
        copiesConformes: 1,
      },
      {
        id: 'doc-retraite-3',
        name: { derja: "Chhadet in9ita3 3an el 3amal msa77a men el mo2ajjer", fr: "Certificat de cessation d'activité signé par le dernier employeur", ar: "شهادة في التوقف عن العمل مسلّمة من آخر مؤجّر" },
        originalRequired: true,
      },
      {
        id: 'doc-retraite-4',
        name: { derja: "Madhmoun wilada asly (< 3 chhour)", fr: "Extrait de naissance récent (< 3 mois)", ar: "مضمون ولادة أصلي حديث العهد (أقل من 3 أشهر)" },
        originalRequired: true,
      },
      {
        id: 'doc-retraite-5',
        name: { derja: "Chèque barré walla relevé RIB bancaire/postal", fr: "Relevé d'identité bancaire ou postal (RIB)", ar: "كشف هوية بنكية أو بريدية أصلي (RIB)" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Etba3 relevé de carrière men CNSS", fr: "Retirer le relevé de carrière", ar: "استخراج كشف الحياة المهنية وتصفية الفترات" },
        description: { derja: "A3mel kachf 3la el trimestres mte3ek fel bureau CNSS walla 3la el portail e-cnss.tn bech tet2akkad men 120 trimestres", fr: "Vérifier le nombre de trimestres validés au guichet CNSS ou sur le portail e-cnss.tn", ar: "التثبت من استيفاء 120 ثلاثية مصرح بها عبر المنصة الرقمية أو الشباك" },
        targetOffice: "CNSS",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 2,
        title: { derja: "5outh chhadet in9ita3 men el mo2ajjer", fr: "Obtenir l'attestation de cessation de travail", ar: "الحصول على شهادة توقف عن العمل من المؤجر" },
        description: { derja: "El mo2ajjer lezem ysakker e5er trimestre w ya3tik l'attestation officielle", fr: "L'employeur clôture la dernière déclaration trimestrielle et délivre l'attestation", ar: "قيام المؤجر بالتصريح الأخير وتسليم شهادة التوقف القانونية" },
        targetOffice: "Employeur",
        estimatedDuration: "3 jours",
      },
      {
        stepNumber: 3,
        title: { derja: "Sobb el dossier kemel fel CNSS", fr: "Dépôt du dossier au bureau régional CNSS", ar: "إيداع الملف بالصندوق الوطني للضمان الاجتماعي" },
        description: { derja: "Hazz el awra9 l'el bureau CNSS marje3 el nadhar w 5outh récépissé de dépôt", fr: "Déposer l'ensemble des pièces et récupérer le récépissé de liquidation", ar: "تسليم الوثائق وأخذ وصل الإيداع الرسمي لمتابعة صرف الجراية" },
        targetOffice: "CNSS",
        estimatedDuration: "30 min",
      }
    ]
  },

  {
    id: 'cnam-carnet-soins',
    slug: 'cnam-carnet-soins',
    vertical: 'healthcare',
    iconName: 'HeartPulse',
    tags: ['cnam', 'carnet', 'soins', 'maladie', 'assurance', 'santé', 'كنام', 'تأمين', 'صحة', 'علاج'],
    title: {
      derja: "Istikhraj Carnet CNAM w Ikhtiyar Mandhoumet el 3ilej",
      fr: "Carnet de Soins CNAM & Choix de Filière",
      ar: "استخراج بطاقة علاج الكنام واختيار منظومة العلاج (CNAM)",
      en: "CNAM Health Insurance Card & Care System Choice"
    },
    shortDescription: {
      derja: "Kifech t5arraj carnet CNAM, ta5tar bin filière publique, privée walla remboursement, w t7adher wra9ek.",
      fr: "Procédure d'obtention du carnet de soins CNAM, comparaison des 3 filières (publique, privée, remboursement) et pièces requises.",
      ar: "إجراءات الحصول على بطاقة علاج كنام، المقارنة بين منظومات العلاج الثلاث (العمومية، الخاصة، واسترجاع المصاريف).",
    },
    fullDescription: {
      derja: "Kol 5addam fi tounes 3andou el 7a9 fi carnet CNAM. Tnejjem ta5tar bin 3 mandhoumet: El Filière Publique (sbitarat w mostawsefat), El Filière Privée (Tbib el 3ayla w pharmacien conventionné), walla Mandhoumet Istirja3 el Masarif (Remboursement). El carnet yetbaddel kol 3am ken t7eb tghayer el filière.",
      fr: "Tout travailleur salarié ou indépendant affilié à la sécurité sociale a droit au carnet de soins CNAM. Trois régimes sont disponibles : La filière publique (soins dans les structures publiques), la filière privée (médecin de famille référent et tiers-payant pharmacie), et le système de remboursement des frais.",
      ar: "يخول لكل مضمون اجتماعي منخرط بالصندوق الوطني للضمان الاجتماعي الحصول على بطاقة علاج كنام واختيار إحدى المنظومات العلاجية الثلاث: المنظومة العلاجية العمومية، المنظومة الخاصة (طبيب العائلة)، أو نظام استرجاع المصاريف، مع إمكانية تغيير المنظومة سنوياً خلال الآجال القانونية.",
    },
    estimatedTotalCostTND: 0.0,
    estimatedProcessingTime: "15 - 30 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['cnam', 'cnss'],
    costsBreakdown: [
      {
        id: 'c-cnam-1',
        label: { derja: "Extrait carnet CNAM (Gratuit)", fr: "Délivrance carnet de soins CNAM (Gratuit)", ar: "استخراج بطاقة العلاج (مجاني)" },
        amountTND: 0.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cnam-1',
        name: { derja: "Matloub in5irat w ikhtiyar filière CNAM", fr: "Formulaire officiel d'affiliation et choix de filière de soins", ar: "استمارة انخراط واختيار المنظومة العلاجية" },
        originalRequired: true,
      },
      {
        id: 'doc-cnam-2',
        name: { derja: "Attestation d'affiliation CNSS jdida", fr: "Attestation d'affiliation CNSS récente", ar: "شهادة انخراط حديثة بالصندوق الوطني للضمان الاجتماعي" },
        originalRequired: true,
      },
      {
        id: 'doc-cnam-3',
        name: { derja: "Copie conforme CIN mte3 el madhmoun", fr: "Copie conforme de la CIN de l'assuré", ar: "نسخة مطابقة للأصل من بطاقة التعريف الوطنية" },
        originalRequired: true,
        copiesConformes: 1,
      },
      {
        id: 'doc-cnam-4',
        name: { derja: "Madhmoun wilada asly lel 3ayla (ken femma 9osser)", fr: "Extraits de naissance des ayants droit (conjoint et enfants)", ar: "مضامين ولادة أصلية للقرين والأبناء في الكفالة" },
        originalRequired: false,
      },
      {
        id: 'doc-cnam-5',
        name: { derja: "Relevé RIB bancaire/postal", fr: "Relevé d'identité bancaire ou postal (RIB)", ar: "كشف حساب بنكي أو بريدي أصلي (RIB)" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Ekhtar el mandhouma el mounasba", fr: "Choisir la filière de soins", ar: "تحديد المنظومة العلاجية المناسبة" },
        description: { derja: "Ekhtar bin filière privée (tbib famille), publique (sbitar), walla remboursement", fr: "Sélectionner la filière privée conventionnée, publique ou remboursement", ar: "المقارنة والاختيار بين المنظومة الخاصة أو العمومية أو استرجاع المصاريف" },
        targetOffice: "En ligne / CNAM",
        estimatedDuration: "10 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Sobb el dossier fel Centre CNAM", fr: "Dépôt au centre régional CNAM", ar: "إيداع الملف بالمركز الجهوي للكنام" },
        description: { derja: "Hazz el dossier l'el centre CNAM marje3 el nadhar w 5outh récépissé", fr: "Déposer le formulaire d'adhésion et pièces justificatives", ar: "تقديم الاستمارة والوثائق وأخذ وصل الإيداع" },
        targetOffice: "CNAM",
        estimatedDuration: "30 min",
      },
      {
        stepNumber: 3,
        title: { derja: "Istlem el Carnet", fr: "Retrait du carnet de soins", ar: "استلام بطاقة العلاج" },
        description: { derja: "Isti3mel el carnet 3and el tbib walla el pharmacien ba3d ma ye7dher", fr: "Récupérer le carnet valide pour l'année en cours", ar: "تسلم بطاقة العلاج صالحة للاستعمال لدى مسدي الخدمات الصحية" },
        targetOffice: "CNAM",
        estimatedDuration: "15 jours",
      }
    ]
  },

  // ================= HOUSING & MUNICIPAL REAL ESTATE =================
  {
    id: 'permis-de-batir',
    slug: 'permis-de-batir',
    vertical: 'housing',
    iconName: 'Building2',
    tags: ['batir', 'construire', 'bnina', 'maison', 'villa', 'permis', 'rokhsa', 'بناء', 'رخصة', 'عمارة', 'دار'],
    title: {
      derja: "Rokhset el Bné fel Baladiya (Permis de Bâtir)",
      fr: "Permis de Bâtir Municipal",
      ar: "رخصة البناء البلدية ومطابقة الأشغال",
      en: "Municipal Building Permit"
    },
    shortDescription: {
      derja: "Koll el chourout, plans d'architecte, wra9 el Baladiya wel ma3loum bech te5ou rokhset bné mrigla.",
      fr: "Dossier technique d'architecte, conformité d'urbanisme, taxes municipales et délai légal d'octroi de 45 jours.",
      ar: "الملف الفني للهندسة المعمارية، مطابقة أمثلة التهيئة العمرانية، المعاليم البلدية والآجال القانونية (45 يوماً).",
    },
    fullDescription: {
      derja: "Bech tebni dar walla tzid étage fi tounes lezem te5ou Rokhset Bné mel Baladiya marje3 el tourabi. El dossier lezem fih plan msa7a7 men architecte agréé fel Ordre des Architectes, titre foncier (chhadet melkiya), w certif d'alignement. El 9anoun ya3ti el Baladiya delai de 45 jours bech tjeweb.",
      fr: "Toute construction, extension ou modification de bâtiment en Tunisie exige l'obtention préalable d'un permis de bâtir délivré par le président de la commune territorialement compétente (Loi n° 94-122 relative au Code de l'Aménagement du Territoire et de l'Urbanisme). Le délai légal d'instruction est fixé à 45 jours.",
      ar: "تخضع كل عملية إقامة بناء جديد أو توسيع أو تغيير صبغة عقار إلى ترخيص مسبق في البناء يُسلّم من طرف رئيس البلدية مرجع النظر الترابي طبقاً لمجلة التهيئة الترابية والتعمير. حُدد الأجل القانوني للبت في المطلب بـ 45 يوماً من تاريخ إيداع الملف مستوفياً لجميع الوثائق.",
    },
    estimatedTotalCostTND: 120.0,
    estimatedProcessingTime: "30 - 45 jours",
    urgencyLevel: 'high',
    relatedOfficeTypes: ['baladiya', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'c-batir-1',
        label: { derja: "Taxe municipale permis de bâtir", fr: "Droit municipal sur permis de bâtir", ar: "معلوم بلدي على رخصة البناء" },
        amountTND: 80.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-batir-2',
        label: { derja: "Timbres fiscaux et alignement", fr: "Timbres et certificat d'alignement de voirie", ar: "تنابر جبائية وشهادة تصفيف الطريق" },
        amountTND: 40.0,
        quantity: 1,
        category: 'timbre_fiscal',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-batir-1',
        name: { derja: "Matloub rokhset bné matbou3 mel Baladiya", fr: "Demande officielle de permis de bâtir sur formulaire municipal", ar: "مطلب الحصول على رخصة بناء حسب أنموذج البلدية" },
        originalRequired: true,
      },
      {
        id: 'doc-batir-2',
        name: { derja: "Chhadet Melkiya (Titre foncier) asly men CPF", fr: "Certificat de propriété récent délivré par la CPF", ar: "شهادة ملكية أصلية حديثة من إدارة الملكية العقارية" },
        originalRequired: true,
      },
      {
        id: 'doc-batir-3',
        name: { derja: "Plans d'architecte msa77in (5 copies)", fr: "Plans d'architecture complets visés par architecte agréé (5 ex.)", ar: "أمثلة هندسية معمارية كاملة مصادق عليها من مهندس معماري مرسم (5 نسخ)" },
        originalRequired: true,
        copiesConformes: 5,
      },
      {
        id: 'doc-batir-4',
        name: { derja: "Plan de situation w plan de masse (1/500)", fr: "Plan de situation et plan de masse côté", ar: "مثال موقعي ومثال إجمالي للقطعة" },
        originalRequired: true,
      },
      {
        id: 'doc-batir-5',
        name: { derja: "Quittance khlas el ma3alim el baladiya (Zebla w Kharrouba)", fr: "Quittance de paiement de la taxe sur les immeubles bâtis (TIB)", ar: "وصل خلاص الأداء البلدي على العقارات المبنية (الزبلة والخروبة)" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Ekhtar architecte agréé w a3mel les plans", fr: "Élaboration du dossier architectural", ar: "إعداد الملف الفني لدى مهندس معماري مرخص" },
        description: { derja: "L'architecte ya3mel les plans conformes lel plan d'aménagement mte3 el Baladiya", fr: "L'architecte conçoit le projet selon le plan d'aménagement urbain (PAU)", ar: "إعداد التصاميم ومطابقتها لمثال التهيئة العمرانية للبلدية" },
        targetOffice: "Architecte agréé",
        estimatedDuration: "10 jours",
      },
      {
        stepNumber: 2,
        title: { derja: "5allas el ma3alim el baladiya w jaded titre foncier", fr: "Paiement taxes locales et certificat CPF", ar: "تسوية المعاليم البلدية واستخراج شهادة الملكية" },
        description: { derja: "5allas zebla w kharrouba fel 9badha w 5arraj chhadet melkiya men CPF", fr: "Régler la taxe des immeubles et retirer l'extrait foncier à la CPF", ar: "خلاص الأداء البلدي واستخراج رسم الملكية المحين" },
        targetOffice: "Recette des Finances & CPF",
        estimatedDuration: "2 jours",
      },
      {
        stepNumber: 3,
        title: { derja: "Sobb el dossier fel Bureau d'Ordre mte3 el Baladiya", fr: "Dépôt du dossier au Bureau d'Ordre municipal", ar: "إيداع الملف بمكتب الضبط بالبلدية" },
        description: { derja: "5outh récépissé fih date exacte. El Baladiya 3andha 45 jours delai legal", fr: "Récupérer le récépissé daté pour le calcul du délai légal de 45 jours", ar: "تسلم وصل إيداع مرقم ومؤرخ لاحتساب الأجل القانوني (45 يوماً)" },
        targetOffice: "Baladiya",
        estimatedDuration: "45 jours",
      }
    ]
  },

  {
    id: 'sonede-raccordement-eau',
    slug: 'sonede-raccordement-eau',
    vertical: 'housing',
    iconName: 'Droplets',
    tags: ['sonede', 'eau', 'ma', 'mé', 'branchement', 'compteur', 'ماء', 'سوناد', 'عداد'],
    title: {
      derja: "Raccordement w Abonnement Jadid SONEDE (Compteur Mé)",
      fr: "Branchement & Nouvel Abonnement SONEDE",
      ar: "اشتراك جديد وربط بعداد الماء الصالح للشرب (SONEDE)",
      en: "SONEDE Water Meter Connection & New Subscription"
    },
    shortDescription: {
      derja: "Koll el wra9, devis technique, w etapes bech tda55al compteur mé SONEDE l'darek walla ma7allek.",
      fr: "Dossier technique, autorisation de voirie municipale, visite d'expertise et frais de pose d'un compteur d'eau potable.",
      ar: "الملف الفني، ترخيص الحفر بالملك العمومي البلدي، المعاينة الفنية ومعاليم تركيب عداد الماء الصالح للشرب.",
    },
    fullDescription: {
      derja: "Bech tda55al el mé mel SONEDE lezem tsob dossier fih rokhset bné walla chhadet melkiya, plan de situation, w tarkhis 7afr mel baladiya ken el tuyau yet3adda fel kayes. Ba3d el dépôt, techicien SONEDE yji ya3mel visite w ya3tik devis khlas.",
      fr: "La demande de branchement au réseau public d'eau potable est déposée au district de la SONEDE. Elle comprend la justification de la propriété, le permis de bâtir ou certificat de conformité, et l'autorisation municipale de tranchée sur voirie si nécessaire. Un devis technique est établi après visite des lieux.",
      ar: "يُودع مطلب الربط بشبكة الماء الصالح للشرب لدى إقليم الشركة الوطنية لاستغلال وتوزيع المياه (SONEDE) مرجع النظر. يتضمن الملف إثبات الملكية أو رخصة البناء، مثال الموقع، وترخيص البلدية في الحفر إذا اقتضت الأشغال شق الطريق العام.",
    },
    estimatedTotalCostTND: 350.0,
    estimatedProcessingTime: "15 - 30 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['sonede', 'baladiya'],
    costsBreakdown: [
      {
        id: 'c-sonede-1',
        label: { derja: "Devis moyen de raccordement et compteur", fr: "Frais de branchement et pose compteur (Devis moyen)", ar: "معاليم الربط وتركيب العداد (تقديري حسب المقايسة)" },
        amountTND: 320.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-sonede-2',
        label: { derja: "Autorisation de tranchée municipale", fr: "Droit municipal de tranchée sur voirie", ar: "معلوم ترخيص حفر بلدي على الطريق" },
        amountTND: 30.0,
        quantity: 1,
        category: 'autre',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-sonede-1',
        name: { derja: "Matloub raccordement matbou3 men SONEDE", fr: "Formulaire de demande de branchement SONEDE", ar: "مطبوعة مطلب ربط بشبكة المياه" },
        originalRequired: true,
      },
      {
        id: 'doc-sonede-2',
        name: { derja: "Copie CIN mte3 el malek", fr: "Copie de la CIN du propriétaire", ar: "نسخة من بطاقة التعريف الوطنية للمالك" },
        originalRequired: true,
      },
      {
        id: 'doc-sonede-3',
        name: { derja: "Chhadet Melkiya walla 3a9d kré msajjal", fr: "Titre de propriété ou contrat de bail enregistré", ar: "شهادة ملكية أو عقد كراء مسجل بالقباضة المالية" },
        originalRequired: true,
      },
      {
        id: 'doc-sonede-4',
        name: { derja: "Copie rokhset el bné walla chhadet rojou3", fr: "Copie du permis de bâtir ou attestation de conformité", ar: "نسخة من رخصة البناء أو شهادة مطابقة الأشغال" },
        originalRequired: true,
      },
      {
        id: 'doc-sonede-5',
        name: { derja: "Plan de situation mte3 el dar", fr: "Plan de situation côté", ar: "مثال موقعي يوضح مكان العقار" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Sobb el dossier fel District SONEDE", fr: "Dépôt de la demande au district SONEDE", ar: "إيداع المطلب بإقليم الشركة الوطنية للماء" },
        description: { derja: "Hazz el dossier l'el district SONEDE marje3 el nadhar", fr: "Déposer le dossier complet auprès du bureau d'accueil du district", ar: "تقديم الملف الكامل بمكتب العلاقات مع المواطن بالإقليم" },
        targetOffice: "SONEDE",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 2,
        title: { derja: "Visite technique w calcul devis", fr: "Visite sur site et établissement du devis", ar: "المعاينة الميدانية وإعداد المقايسة الفنية" },
        description: { derja: "Technicien SONEDE yji y9iss el distance mel canalisation principale", fr: "L'agent SONEDE évalue la distance et le matériel nécessaire", ar: "معاينة العقار وتحديد مسافة الربط بالأنبوب الرئيسي" },
        targetOffice: "SONEDE",
        estimatedDuration: "5 - 7 jours",
      },
      {
        stepNumber: 3,
        title: { derja: "5allas el devis w tarkib el compteur", fr: "Paiement du devis et exécution des travaux", ar: "خلاص المقايسة وتركيب العداد وفتح الماء" },
        description: { derja: "5allas el montant fel caisse SONEDE w l'équipe tji terkeb el compteur", fr: "Régler le montant du devis pour déclencher la pose du compteur", ar: "دفع المعاليم وتدخل الفريق الفني لتركيب العداد والتزويد" },
        targetOffice: "SONEDE",
        estimatedDuration: "7 - 10 jours",
      }
    ]
  },

  {
    id: 'extrait-titre-foncier-cpf',
    slug: 'extrait-titre-foncier-cpf',
    vertical: 'housing',
    iconName: 'Landmark',
    tags: ['titre', 'foncier', 'cpf', 'propriete', 'immeuble', 'terrain', 'ملكية', 'عقار', 'رسم', 'عقاري'],
    title: {
      derja: "Istikhraj Chhadet Melkiya (Extrait Titre Foncier CPF)",
      fr: "Extrait du Titre Foncier (Conservation Foncière)",
      ar: "استخراج شهادة ملكية عقارية (إدارة الملكية العقارية)",
      en: "Land Registry Ownership Certificate (CPF)"
    },
    shortDescription: {
      derja: "Kifech t5arraj chhadet melkiya m7ayna men idaret el melkiya el 3a9ariya (CPF) en ligne walla fel guichet.",
      fr: "Demande d'extrait de titre foncier mis à jour auprès de la Conservation de la Propriété Foncière (CPF) en ligne ou au guichet.",
      ar: "إجراءات استخراج شهادة ملكية محينة أو شهادة استقصاء من الإدارة العامة للملكية العقارية عبر الإنترنت أو بالشباك.",
    },
    fullDescription: {
      derja: "Chhadet el Melkiya (Extrait de titre foncier) hiya el war9a el rasmiya elli tethbet chkoun malek el 3a9ar w ken fih rahina (hypothèque) walla o9la. Tnejjem t5arrajha b'nomrou el rasm el 3a9ari (titre bleu) soit mel idara el jihaouiya mte3 CPF soit direct men site cpf.tn b'carte bancaire.",
      fr: "Le certificat de propriété (شهادة ملكية) délivré par la Conservation de la Propriété Foncière (CPF) constitue la preuve juridique absolue de la propriété immobilière immatriculée (Titre Bleu). Il mentionne les propriétaires actuels, leurs quotes-parts, ainsi que les charges grevant l'immeuble (hypothèques, servitudes, prénotations).",
      ar: "تعد شهادة الملكية المسلمة من الإدارة العامة للملكية العقارية الحجة القاطعة لإثبات ملكية العقارات المسجلة (الرسم العقاري / Titre Bleu). تتضمن بيانات المالكين، المنابات المشاعة، والتحملات العقارية كالرهون والارتفاقات والقيود الاحتياطية. يمكن استخراجها مباشرة أو عبر المنصة الإلكترونية cpf.tn.",
    },
    estimatedTotalCostTND: 15.0,
    estimatedProcessingTime: "24 - 48 heures",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['baladiya', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'c-cpf-1',
        label: { derja: "Droits de délivrance extrait CPF", fr: "Droits de quittance d'extrait foncier", ar: "معلوم تسليم شهادة ملكية (إدارة الملكية العقارية)" },
        amountTND: 15.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cpf-1',
        name: { derja: "Matloub chhadet melkiya fih nomrou el rasm el 3a9ari", fr: "Formulaire de demande mentionnant le numéro du titre foncier", ar: "مطبوعة استخراج شهادة ملكية تتضمن رقم الرسم العقاري واسم العقار" },
        originalRequired: true,
      },
      {
        id: 'doc-cpf-2',
        name: { derja: "Copie CIN mte3 el talib", fr: "Copie de la CIN du demandeur", ar: "نسخة من بطاقة التعريف الوطنية لطالب الشهادة" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Hadher nomrou el rasm el 3a9ari", fr: "Identifier le numéro du titre foncier", ar: "تحديد رقم الرسم العقاري والمنطقة العقارية" },
        description: { derja: "Nomrou el rasm mawjoud fel 3a9d el 9dim walla el rasm el azra9", fr: "Le numéro est mentionné sur les actes antérieurs ou contrats notariés", ar: "الاطلاع على رقم الرسم المسجل بعقد الملكية السابق" },
        targetOffice: "CPF",
        estimatedDuration: "5 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Ed5ol 3al site cpf.tn walla emchi l'el bureau", fr: "Demande en ligne ou au guichet CPF", ar: "تقديم المطلب إلكترونياً أو بشباك الإدارة الجهوية" },
        description: { derja: "5allas 15 DT b'carte bancaire en ligne walla fel guichet", fr: "Payer les droits de 15 DT par carte bancaire ou en espèces", ar: "دفع المعاليم القانونية واستخراج الشهادة فورا أو إلكترونيا" },
        targetOffice: "Conservation de la Propriété Foncière",
        estimatedDuration: "15 min",
      }
    ]
  },

  // ================= BUSINESS & COMMERCIAL =================
  {
    id: 'autorisation-commerce-baladiya',
    slug: 'autorisation-commerce-baladiya',
    vertical: 'business',
    iconName: 'Briefcase',
    tags: ['commerce', 'local', 'magasin', 'patente', '7anout', 'محل', 'تجاري', 'رخصة', 'باتيندة'],
    title: {
      derja: "Rokhset Fat7 Ma7al Tejari fel Baladiya (Patente Commerce)",
      fr: "Autorisation d'Exercice Commercial & Ouverture de Local",
      ar: "رخصة فتح محل تجاري أو مهني بالبلدية",
      en: "Municipal Commercial Activity Authorization"
    },
    shortDescription: {
      derja: "Koll el wra9, chourout el hifdh el se77i, wel ma3loum bech t7ell 7anout walla local commercial.",
      fr: "Démarches auprès de la Baladiya, conformité sanitaire, sécurité incendie et autorisation d'exercice pour local commercial.",
      ar: "إجراءات الترخيص البلدي، شروط حفظ الصحة، السلامة والوقاية من الحرائق لفتح محل تجاري أو حرفي.",
    },
    fullDescription: {
      derja: "Bech t7ell 7anout, restaurant, café, walla ay local commercial fi tounes lezem te5ou tarkhis mel Baladiya marje3 el tourabi. El dossier lezem fih 3a9d kré msajjal walla chhadet melkiya, copie patente men el 9badha, w chhadet we9aya men el 7imaya el madaniya (protection civile) ken el nachat fih public.",
      fr: "L'ouverture et l'exploitation de tout local commercial, artisanal ou de services recevant du public sont soumises à déclaration ou autorisation préalable de la municipalité compétente (Décret n° 2018-417). Le dossier implique le respect du cahier des charges d'hygiène et de sécurité contre l'incendie.",
      ar: "يخضع فتح واستغلال المحلات التجارية والمهنية المفتوحة للعموم إلى ترخيص بلدي مسبق أو كراس شروط مصادق عليه. يشترط الملف إثبات الملكية أو الكراء المسجل، شهادة الوقاية من الحماية المدنية للمحلات المصنفة، ومطابقة شروط حفظ الصحة والسلامة المهنية.",
    },
    estimatedTotalCostTND: 60.0,
    estimatedProcessingTime: "15 - 30 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['baladiya', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'c-commerce-1',
        label: { derja: "Taxe municipale d'exercice commercial", fr: "Taxe municipale d'autorisation commerciale", ar: "معلوم بلدي على التراخيص التجارية والمهنية" },
        amountTND: 50.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-commerce-2',
        label: { derja: "Timbres fiscaux et légalisation", fr: "Timbres municipaux et légalisations", ar: "تنابر بلدية ومطابقة الأصل" },
        amountTND: 10.0,
        quantity: 1,
        category: 'timbre_fiscal',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-comm-1',
        name: { derja: "Matloub fat7 ma7al matbou3 mel Baladiya", fr: "Demande officielle d'autorisation d'exercice commercial", ar: "مطبوعة مطلب فتح محل تجاري أو مهني" },
        originalRequired: true,
      },
      {
        id: 'doc-comm-2',
        name: { derja: "3a9d kré msajjal fel 9badha walla chhadet melkiya", fr: "Contrat de bail commercial enregistré ou titre de propriété", ar: "عقد كراء مسجل بالقباضة المالية أو شهادة ملكية للمحل" },
        originalRequired: true,
      },
      {
        id: 'doc-comm-3',
        name: { derja: "Copie Patente (Declaration d'existence men 9badha)", fr: "Copie de la carte d'identification fiscale (Patente)", ar: "نسخة من بطاقة التعريف الجبائية (الباتيندة)" },
        originalRequired: true,
      },
      {
        id: 'doc-comm-4',
        name: { derja: "Chhadet we9aya men el 7imaya el madaniya (ken matloub)", fr: "Certificat de sécurité et conformité Protection Civile", ar: "شهادة وقاية مسلّمة من مصالح الحماية المدنية (للأنشطة المصنفة)" },
        originalRequired: false,
      },
      {
        id: 'doc-comm-5',
        name: { derja: "Copie CIN mte3 el moustaghall", fr: "Copie de la CIN de l'exploitant", ar: "نسخة من بطاقة التعريف الوطنية للمستغل" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "5arraj el Patente men el 9badha", fr: "Déclaration d'existence à la Recette", ar: "التصريح بالوجود واستخراج الباتيندة من القباضة" },
        description: { derja: "A3mel matricule fiscal fel 9badha el maliya marje3 el local", fr: "Obtenir l'identifiant fiscal auprès de la Recette des Finances compétente", ar: "الحصول على المعرف الجبائي وتحديد النظام الجبائي للنشاط" },
        targetOffice: "Recette des Finances",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 2,
        title: { derja: "Sobb dossier el Baladiya", fr: "Dépôt du dossier au service économique municipal", ar: "إيداع الملف بالمصلحة الاقتصادية بالبلدية" },
        description: { derja: "Hazz el dossier l'el Baladiya w 5outh récépissé de dépôt", fr: "Déposer l'ensemble des pièces requises et cahiers des charges", ar: "تقديم الملف وتوقيع الالتزام بكراس الشروط الخاص بالنشاط" },
        targetOffice: "Baladiya",
        estimatedDuration: "15 jours",
      },
      {
        stepNumber: 3,
        title: { derja: "Visite commission w istlem el rokhsa", fr: "Visite de contrôle et remise de l'arrêté", ar: "المعاينة الميدانية واستلام قرار الترخيص" },
        description: { derja: "Commission el hifdh el se77i tji tchouf el local w ta5ou el rokhsa", fr: "La commission municipale effectue la visite d'hygiène et délivre l'autorisation", ar: "قيام اللجنة الفنية بمعاينة المحل وتسليم قرار الترخيص البلدي" },
        targetOffice: "Baladiya",
        estimatedDuration: "10 jours",
      }
    ]
  },

  // ================= TRANSPORT & MOBILITY =================
  {
    id: 'permis-conduire-international',
    slug: 'permis-conduire-international',
    vertical: 'transport',
    iconName: 'Car',
    tags: ['permis', 'international', 'conduire', 'voyage', 'etranger', 'سياقة', 'دولية', 'رخصة'],
    title: {
      derja: "Permis de Conduire International (Touring Club de Tunisie)",
      fr: "Permis de Conduire International",
      ar: "رخصة السياقة الدولية (الديوان الوطني التونسي للسياحة والسيارات)",
      en: "International Driving Permit (IDP)"
    },
    shortDescription: {
      derja: "Koll el awra9 wel ma3loum bech t5arraj permis international tssou9 bih fel kharej fi akther men 150 bled.",
      fr: "Pièces requises, tarifs et procédure auprès du Touring Club de Tunisie pour conduire légalement à l'étranger.",
      ar: "الوثائق والرسوم وإجراءات استخراج رخصة السياقة الدولية لدى النادي التونسي للسياحة والسيارات للسياقة خارج حدود الوطن.",
    },
    fullDescription: {
      derja: "El Permis International y5allik tsou9 karhba fel kharej fi kol el boldan elli msa77a 3la convention de Vienne & Genève. Yetsallam mel Touring Club de Tunisie (TCT) fi Tunis walla les agences régionales. Salou7iyyetou 3am kemel (1 an) w yetjadded b'nafs el tari9a.",
      fr: "Le permis de conduire international est délivré conformément aux conventions internationales de Genève (1949) et de Vienne (1968). En Tunisie, il est exclusivement émis par le Touring Club de Tunisie (TCT). Il est valable un an et permet de conduire dans plus de 150 pays en accompagnement du permis national original.",
      ar: "تُسلّم رخصة السياقة الدولية طبقاً للاتفاقيات الدولية المنظمة للجولان الطرقي (اتفاقيتا جنيف وفيينا) حصرياً من طرف النادي التونسي للسياحة والسيارات (TCT). تمكن حاملها من سياقة العربات بالخارج لأكثر من 150 دولة، ومدة صلوحيتها سنة واحدة قابلة للتجديد مصحوبة وجوباً بالرخصة الوطنية الأصلية.",
    },
    estimatedTotalCostTND: 35.0,
    estimatedProcessingTime: "24 - 72 heures",
    urgencyLevel: 'low',
    relatedOfficeTypes: ['attt', 'poste'],
    costsBreakdown: [
      {
        id: 'c-tct-1',
        label: { derja: "Droits d'adhésion et permis international TCT", fr: "Frais de délivrance et adhésion TCT", ar: "معلوم تسليم رخصة السياقة الدولية واشتراك النادي" },
        amountTND: 30.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-tct-2',
        label: { derja: "2 Photos d'identité fond blanc", fr: "2 Photos d'identité fond blanc", ar: "صورتان شمسيتان خلفية بيضاء" },
        amountTND: 5.0,
        quantity: 1,
        category: 'photo',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-idp-1',
        name: { derja: "Permis de conduire tounsi asly + copie", fr: "Permis de conduire tunisien original en cours de validité + Copie", ar: "رخصة السياقة التونسية الأصلية سارية المفعول مع نسخة منها" },
        originalRequired: true,
      },
      {
        id: 'doc-idp-2',
        name: { derja: "Copie CIN tounsia", fr: "Copie de la CIN", ar: "نسخة من بطاقة التعريف الوطنية" },
        originalRequired: true,
      },
      {
        id: 'doc-idp-3',
        name: { derja: "2 Tsawer chamsiya jdod fond blanc", fr: "2 Photos d'identité récentes identiques fond blanc", ar: "صورتان شمسيتان حديثتان متطابقتان" },
        originalRequired: true,
      },
      {
        id: 'doc-idp-4',
        name: { derja: "Matloub ta3mir formulaire TCT", fr: "Formulaire officiel de demande Touring Club", ar: "استمارة مطلب الحصول على رخصة دولية" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "7adher les copies wel tsawer", fr: "Constituer les pièces du dossier", ar: "إعداد الوثائق والصور الشمسية" },
        description: { derja: "Copie permis, copie CIN, w 2 tsawer fond blanc", fr: "Vérifier la validité du permis tunisien original", ar: "التثبت من صلوحية رخصة السياقة التونسية وإعداد النسخ" },
        targetOffice: "Domicile",
        estimatedDuration: "10 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Emchi l'el Touring Club de Tunisie", fr: "Dépôt au siège du Touring Club de Tunisie", ar: "إيداع الملف بمقر النادي التونسي للسيارات" },
        description: { derja: "Hazz el dossier l'el siège fel Rue de Hollande Tunis walla bureau régional", fr: "Se présenter au siège (Rue de Hollande, Tunis) ou délégation régionale", ar: "التوجه لمقر النادي (نهج هولندا تونس) أو الفروع الجهوية" },
        targetOffice: "Touring Club de Tunisie",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 3,
        title: { derja: "Istlem el Permis International", fr: "Retrait du livret international", ar: "استلام دفتر رخصة السياقة الدولية" },
        description: { derja: "El permis ye7dher fi 24h walla sur place", fr: "Délivrance immédiate ou sous 24 à 48 heures", ar: "استلام الدفتر فوراً أو خلال 24 إلى 48 ساعة" },
        targetOffice: "Touring Club de Tunisie",
        estimatedDuration: "24h",
      }
    ]
  },

  // ================= CUSTOMS & DIASPORA =================
  {
    id: 'regularisation-douaniere-rs',
    slug: 'regularisation-douaniere-rs',
    vertical: 'customs',
    iconName: 'ShieldAlert',
    tags: ['douane', 'rs', 'regularisation', 'importation', 'karhba', 'voiture', 'ديوانة', 'سيارة', 'استيراد', 'ن.ت'],
    title: {
      derja: "Taswiyet Wadhe3iyet Karhba N.T (Régularisation Série RS)",
      fr: "Régularisation Douanière Véhicule Importé (Série RS)",
      ar: "تسوية الوضعية الديوانية للسيارات الموردة تحت نظام ن.ت (Série RS)",
      en: "Customs Regularization for RS Foreign Vehicle"
    },
    shortDescription: {
      derja: "Kifech tbadal série RS l'série TU 3adiya, t5allas el ma3loum el diwani m5affadh, w tbi3 el karhba b'safet 9anouniya.",
      fr: "Procédure de paiement des droits de douane pour transformer une immatriculation RS (régime suspensif) en série normale tunisienne (TU).",
      ar: "إجراءات خلاص المعاليم الديوانية وتحويل تسجيل السيارة من النظام التوقيفي ن.ت (RS) إلى السلسلة التونسية العادية (ن.ت).",
    },
    fullDescription: {
      derja: "El karhba elli tda5alha b'regime RS (Tounsi fel kharej) ma tnejjemch tbi3ha l'wahed e5er ken ma t5allas el diwana mte3ha. Kol fatra el dawla t5arrej 9anoun taswiya b'tarif m5affadh (35% walla 40% men montant el diwana). Ba3d ma t5allas fel bureau des douanes, te5ou chhadet ifraj w tbadal carte grise fi ATTT l'série TU.",
      fr: "Les véhicules importés sous le régime suspensif RS (Retour Définitif / TRE) sont incessibles à titre onéreux sans dédouanement préalable. La régularisation douanière permet d'acquitter les droits et taxes (ou de bénéficier des amnisties fiscales périodiques) afin d'obtenir le certificat de dédouanement et d'immatriculer le véhicule en série normale TU auprès de l'ATTT.",
      ar: "تخضع السيارات الموردة تحت النظام التوقيفي ن.ت (RS) إلى حجر التفويت بالبيع ما لم يتم تسوية وضعيتها الجبائية والديوانية. تمكن التسوية من خلاص المعاليم المستوجبة (أو الانتفاع بامتيازات قوانين المالية التخفيضية) والحصول على شهادة إبراء ديواني لتحويل التسجيل بالسلسلة التونسية العادية لدى الوكالة الفنية للنقل البري (ATTT).",
    },
    estimatedTotalCostTND: 850.0,
    estimatedProcessingTime: "15 - 30 jours",
    urgencyLevel: 'high',
    relatedOfficeTypes: ['douane', 'attt', 'recette_finances'],
    costsBreakdown: [
      {
        id: 'c-rs-1',
        label: { derja: "Droits de douane de régularisation (Variable selon cylindrée)", fr: "Droits et taxes de régularisation douanière", ar: "المعاليم والأداءات الديوانية للتسوية (حسب سعة الاسطوانة والقيمة)" },
        amountTND: 800.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-rs-2',
        label: { derja: "Frais nouvelle carte grise série TU à l'ATTT", fr: "Frais de mutation de carte grise en série TU (ATTT)", ar: "معاليم إصدار بطاقة رمادية بالسلسلة العادية لدى ATTT" },
        amountTND: 50.0,
        quantity: 1,
        category: 'autre',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-rs-1',
        name: { derja: "Carte grise aslye série RS", fr: "Carte grise originale série RS", ar: "البطاقة الرمادية الأصلية بالسلسلة ن.ت" },
        originalRequired: true,
      },
      {
        id: 'doc-rs-2',
        name: { derja: "Passeport mte3 el malek fih cachets el d5oul", fr: "Passeport du propriétaire avec cachets de séjour", ar: "جواز سفر مالك السيارة يتضمن أختام الدخول والخروج" },
        originalRequired: true,
      },
      {
        id: 'doc-rs-3',
        name: { derja: "Matloub taswiya diwaniya matbou3", fr: "Formulaire de demande de régularisation douanière", ar: "مطلب تسوية وضعية ديوانية ممضى من صاحب المطلب" },
        originalRequired: true,
      },
      {
        id: 'doc-rs-4',
        name: { derja: "Copie CIN mte3 el malek", fr: "Copie de la CIN du propriétaire", ar: "نسخة من بطاقة التعريف الوطنية" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Dépôt dossier fel Bureau Régional des Douanes", fr: "Dépôt au bureau régional des douanes", ar: "إيداع الملف بالإدارة الجهوية للديوانة" },
        description: { derja: "Hazz el dossier l'el bureau des douanes marje3 el tourabi", fr: "Déposer le dossier pour calcul de la liquidation des droits", ar: "إيداع الملف واحتساب قيمة المعاليم الديوانية المستوجبة" },
        targetOffice: "Bureau Régional des Douanes",
        estimatedDuration: "3 - 5 jours",
      },
      {
        stepNumber: 2,
        title: { derja: "5allas el diwana fel 9badha", fr: "Paiement de la quittance douanière", ar: "خلاص المعاليم بالقباضة الديوانية" },
        description: { derja: "5allas el montant w 5outh شهادة إبراء ديواني (Certificat d'apurement)", fr: "Régler les droits et retirer le certificat d'apurement douanier", ar: "دفع المعاليم واستلام شهادة الإبراء وخلاص الأداءات" },
        targetOffice: "Recette des Douanes",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 3,
        title: { derja: "Baddel carte grise fi ATTT l'série TU", fr: "Immatriculation définitive à l'ATTT", ar: "استخراج البطاقة الرمادية بالسلسلة العادية لدى ATTT" },
        description: { derja: "Hazz chhadet el ifraj l'el centre ATTT bech te5ou carte grise jdida", fr: "Présenter le certificat d'apurement au centre ATTT pour l'immatriculation TU", ar: "تقديم شهادة الإبراء لدى مصالح النقل البري واستلام البطاقة الرمادية الجديدة" },
        targetOffice: "ATTT",
        estimatedDuration: "3 jours",
      }
    ]
  },

  // ================= IDENTITY & CITIZENSHIP =================
  {
    id: 'legalisation-signature',
    slug: 'legalisation-signature',
    vertical: 'identity',
    iconName: 'FileCheck2',
    tags: ['legalisation', 'signature', 'imdha', 'conforme', 'copie', 'baladiya', 'تعريف', 'إمضاء', 'مطابقة', 'بلدية'],
    title: {
      derja: "El Ta3rif bel Imdha2 wel Moudhab9a lel Asl (Baladiya)",
      fr: "Légalisation de Signature & Copie Conforme",
      ar: "التعريف بالإمضاء والمطابقة للأصل (البلدية والعمادة)",
      en: "Signature Legalization & Certified True Copy"
    },
    shortDescription: {
      derja: "Koll el 9awa3ed, chourout el 7odhwr, el wathaye9 el mamnou3a, wel ma3loum el baladi lel ta3rif bel imdha2.",
      fr: "Règles de compétence territoriale, présence physique obligatoire, documents interdits de certification et tarifs légaux.",
      ar: "قواعد الاختصاص الترابي، الوجوبية الشخصية، الوثائق الممنوعة من التعريف بالإمضاء، والمعاليم البلدية المضبوطة.",
    },
    fullDescription: {
      derja: "El Ta3rif bel Imdha2 (Légalisation) ysir fi ay Baladiya walla Da2ira Baladiya fi tounes. Lezem t7adher el wathaye9 originale, CIN mte3ek aslye, w tsa7a7 9oddém 3awn el baladiya. Mamnou3 el ta3rif bel imdha2 3la awra9 baydha2, 3ou9oud m5alfa lel adab el 3amma, walla wathaye9 bla esm.",
      fr: "La légalisation de signature (التعريف بالإمضاء) et la certification de conformité des copies aux originaux (المطابقة للأصل) sont des compétences dévolues aux officiers de l'état civil dans toutes les municipalités et arrondissements de Tunisie (Loi n° 94-103). La présence physique du signataire muni de sa CIN originale est strictement obligatoire.",
      ar: "يُعد التعريف بالإمضاء ومطابقة النسخ للأصل اختصاصاً مخولاً لضباط الحالة المدنية بكافة بلديات ودوائر الجمهورية التونسية والمعتمدين والعمداء (القانون عدد 103 لسنة 1994). يشترط الحضور المادي للشخص المعني والاستظهار ببطاقة التعريف الوطنية الأصلية، ويحجر التعريف بالإمضاء على الوثائق المحررة على بياض أو المخالفة للنظام العام والأخلاق الحميدة.",
    },
    estimatedTotalCostTND: 3.0,
    estimatedProcessingTime: "10 - 15 minutes",
    urgencyLevel: 'low',
    relatedOfficeTypes: ['baladiya'],
    costsBreakdown: [
      {
        id: 'c-leg-1',
        label: { derja: "Timbre baladi par signature / copie", fr: "Droit de timbre municipal par signature ou certification", ar: "معلوم الطابع البلدي عن كل إمضاء أو مطابقة للأصل" },
        amountTND: 3.0,
        quantity: 1,
        category: 'legalisation',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-leg-1',
        name: { derja: "El wathi9a el matloub el ta3rif biha (Non signée)", fr: "Document à légaliser (non signé à l'avance)", ar: "الوثيقة المراد التعريف بإمضائها (غير ممضاة مسبقاً)" },
        originalRequired: true,
      },
      {
        id: 'doc-leg-2',
        name: { derja: "CIN aslye mte3 el mouwa99e3", fr: "CIN originale du signataire", ar: "بطاقة التعريف الوطنية الأصلية للموقع" },
        originalRequired: true,
      },
      {
        id: 'doc-leg-3',
        name: { derja: "El wathi9a el asliya (ken matloub copie conforme)", fr: "Document original (pour les copies conformes)", ar: "الوثيقة الأصلية (في حالة طلب المطابقة للأصل)" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "Emchi l'el Baladiya walla Da2ira Baladiya", fr: "Présentation au guichet municipal", ar: "التوجه لشباك التعريف بالإمضاء بالبلدية أو الدائرة" },
        description: { derja: "Emchi l'a9reb baladiya m3ak el CIN wel wathaye9", fr: "Se présenter physiquement au guichet d'état civil avec sa CIN originale", ar: "الحضور الشخصي بالشباك مصحوباً بالوثائق وبطاقة التعريف" },
        targetOffice: "Baladiya",
        estimatedDuration: "5 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Sa77a7 9oddem el 3awn w 5allas el timbre", fr: "Signature devant l'officier et paiement du timbre", ar: "الإمضاء بحضور الضابط ودفع معلوم الطابع البلدي" },
        description: { derja: "Sa77a7 fel registre el baladi w 5allas 3 DT", fr: "Apposer la signature sur le document et sur le registre officiel", ar: "توقيع الوثيقة بدفتر الحالة المدنية ودفع معلوم 3 دنانير" },
        targetOffice: "Baladiya",
        estimatedDuration: "5 min",
      }
    ]
  },

  // ================= JUSTICE & CIVIL STATUS =================
  {
    id: 'hojjet-wafet-heritage',
    slug: 'hojjet-wafet-heritage',
    vertical: 'justice',
    iconName: 'Scale',
    tags: ['wafet', 'heritage', 'irth', 'deces', 'adoul', 'succession', 'وفاة', 'إرث', 'حجة', 'تركة', 'عدول'],
    title: {
      derja: "Istikhraj Hojjet Wafet w 9esmet el Terka (Succession)",
      fr: "Certificat de Décès (Hojjet Wafet) & Partage Successoral",
      ar: "استخراج حجة وفاة وحصر الإرث وقسمة التركة",
      en: "Certificate of Inheritance (Hojjet Wafet) & Succession"
    },
    shortDescription: {
      derja: "Koll el wra9, chhoud, 3doul el ichhed, wel etapes bech t5arraj hojjet wafet w te9sem el terka b'safet 9anouniya.",
      fr: "Établissement de la Hojjet Wafet chez l'Adoul, témoins instrumentaires, détermination des quotes-parts et partage successoral.",
      ar: "إجراءات إقامة حجة الوفاة لدى عدول الإشهاد، الشهود، حصر الورثة، وتحديد المنابات الشرعية وقسمة التركة رضائياً أو قضائياً.",
    },
    fullDescription: {
      derja: "Hojjet el Wafet hiya el war9a el 9anouniya el wa7ida elli tethbet chkoun homa el ouratha el char3iyin mte3 el mayyet w 9adeh fardh kol wa7ed. Tet7arer 3and 2 3doul ichhed (notaires) b'7odhwr 2 chhoud ya3rfou el 3ayla mrigel. Ba3d ma tetkattab, lezem tsajjalha fel 9badha w tsadde9ha fel Ma7kama el Ibtida2iya.",
      fr: "L'acte de notoriété après décès (Hojjet Wafet / حجة وفاة) est l'acte authentique dressé par deux notaires (Adoul Ichhad) constatant le décès, l'identité de tous les héritiers légitimes et leurs quotes-parts successorales selon le Code du Statut Personnel. Il est homologué par le juge cantonal et enregistré à la Recette des Finances pour permettre le déblocage des comptes bancaires et le transfert des titres fonciers.",
      ar: "تعد حجة الوفاة وحصر الإرث وثيقة رسمية وحيدة لإثبات صفة الورثة الشرعيين وتحديد أنصبتهم طبقاً لأحكام مجلة الأحوال الشخصية. يتولى تحريرها عدلا إشهاد بحضور شاهدين عارفين بالهالك وورثته، ثم تخضع للتسجيل بالقباضة المالية ومصادقة قاضي الناحية لتمكين الورثة من التصرف في التركة والحسابات البنكية والعقارات.",
    },
    estimatedTotalCostTND: 45.0,
    estimatedProcessingTime: "7 - 15 jours",
    urgencyLevel: 'high',
    relatedOfficeTypes: ['tribunal', 'recette_finances', 'baladiya'],
    costsBreakdown: [
      {
        id: 'c-hojja-1',
        label: { derja: "Honoraires عدول إشهاد (Tarif réglementé)", fr: "Honoraires des deux notaires (Adoul Ichhad)", ar: "أجرة عدلي الإشهاد (طبقاً للتعريفة الرسمية)" },
        amountTND: 35.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-hojja-2',
        label: { derja: "Enregistrement Recette des Finances", fr: "Droits d'enregistrement à la Recette des Finances", ar: "معاليم التسجيل بالقباضة المالية" },
        amountTND: 10.0,
        quantity: 1,
        category: 'timbre_fiscal',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-hojja-1',
        name: { derja: "Madhmoun wafet asly mte3 el mayyet", fr: "Extrait de décès original du défunt", ar: "مضمون وفاة أصلي للهالك مسلّم من البلدية" },
        originalRequired: true,
      },
      {
        id: 'doc-hojja-2',
        name: { derja: "Madhmoun wilada mte3 kol ouratha", fr: "Extraits de naissance de l'ensemble des héritiers", ar: "مضامين ولادة أصلية لكافة الورثة (الأبناء، الزوج/الزوجة، الوالدين)" },
        originalRequired: true,
      },
      {
        id: 'doc-hojja-3',
        name: { derja: "3a9d zawaj walla livret de famille", fr: "Acte de mariage ou livret de famille", ar: "عقد زواج الهالك أو الدفتر العائلي" },
        originalRequired: true,
      },
      {
        id: 'doc-hojja-4',
        name: { derja: "2 Chhoud b'CIN mte3hom", fr: "2 Témoins majeurs munis de leurs CIN originales", ar: "شاهدان رشيدان مستظهران ببطاقتي التعريف الوطنية" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "7adher madhmoun el wafet wel ouratha", fr: "Collecter les extraits d'état civil", ar: "استخراج مضامين الوفاة والولادة لكافة الورثة" },
        description: { derja: "5arraj madhmoun wafet mel Baladiya w madhamin el 3ayla kol", fr: "Retirer l'extrait de décès et les extraits de tous les descendants/conjoint", ar: "استخراج مضمون وفاة الهالك ومضامين ولادة الورثة من البلدية" },
        targetOffice: "Baladiya",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 2,
        title: { derja: "Emchi l'2 3doul ichhed m3a 2 chhoud", fr: "Rédaction de l'acte chez l'Adoul", ar: "تحرير الحجة لدى عدلي إشهاد بحضور الشهود" },
        description: { derja: "El 3doul yektbou el hojja w y7addou les parts char3iya", fr: "Les notaires dressent l'acte et établissent la dévolution successorale", ar: "تلقي تصريحات الشهود وضبط الفريضة الشرعية وتوقيع العقد" },
        targetOffice: "Cabinet Adoul",
        estimatedDuration: "2 jours",
      },
      {
        stepNumber: 3,
        title: { derja: "Sajjel fel 9badha w sadeda9 fel Ma7kama", fr: "Enregistrement et homologation au tribunal", ar: "التسجيل بالقباضة المالية ومصادقة قاضي الناحية" },
        description: { derja: "Sajjal fel 9badha el maliya w 5outh ta2shira mel Ma7kama el Ibtida2iya", fr: "Enregistrer l'acte à la Recette et faire apposer le visa du juge cantonal", ar: "تسجيل الحجة بالقباضة واستكمال الإمضاء القضائي لتصبح نافذة المفعول" },
        targetOffice: "Recette des Finances & Tribunal",
        estimatedDuration: "5 jours",
      }
    ]
  },

  {
    id: 'declaration-naissance',
    slug: 'declaration-naissance',
    vertical: 'justice',
    iconName: 'Baby',
    tags: ['naissance', 'wilada', 'bébé', 'etat civil', 'madhmoun', 'ولادة', 'تصريح', 'مضمون', 'طفل'],
    title: {
      derja: "El Tasri7 bel Wilada w Istikhraj Madhmoun el Mawloud (Baladiya)",
      fr: "Déclaration de Naissance & Inscription à l'État Civil",
      ar: "التصريح بالولادة وتسجيل المولود الجديد بالحالة المدنية",
      en: "Birth Registration & Civil Status Certificate"
    },
    shortDescription: {
      derja: "Koll el wra9, el ajel el 9anouni (10 ayem), wel etapes bech tsajjel mawloud jdid fel Baladiya.",
      fr: "Délai légal impératif de 10 jours, pièces requises et démarches d'enregistrement du nouveau-né à la mairie.",
      ar: "الأجل القانوني الإلزامي (10 أيام)، الوثائق المطلوبة وإجراءات تسجيل المولود الجديد بدفاتر الحالة المدنية بالبلدية.",
    },
    fullDescription: {
      derja: "Kol mawloud jdid fi tounes lezem ytsajjal fel Baladiya mte3 blaset el wilada fi ajel ma yfoutech 10 ayem (Art. 22 Loi État Civil). El bou walla el omm yhezzo chhadet el wilada mel clinique/sbitar, livret de famille walla 3a9d zawaj, w CIN. Ken tfout 10 ayem, ma 3adech tnejjem tsajjel ken b'7okm 9adha2i mel Ma7kama.",
      fr: "Toute naissance survenue en Tunisie doit être obligatoirement déclarée dans un délai strict de 10 jours auprès de l'officier de l'état civil de la commune où a eu lieu l'accouchement (Loi n° 57-3 relative à l'état civil). Passé ce délai légal de 10 jours, l'inscription ne peut plus s'effectuer que par jugement rendu par le Tribunal de Première Instance.",
      ar: "يجب التصريح بكل ولادة في الجمهورية التونسية لدى ضابط الحالة المدنية للبلدية التي وقعت فيها الولادة في أجل أقصاه 10 أيام من تاريخ الوضع (القانون عدد 3 لسنة 1957 المنظم للحالة المدنية). في صورة انقضاء هذا الأجل القانوني، لا يمكن ترسيم الولادة إلا بمقتضى إذن قضائي صادر عن رئيس المحكمة الابتدائية المختصة.",
    },
    estimatedTotalCostTND: 0.0,
    estimatedProcessingTime: "15 minutes",
    urgencyLevel: 'high',
    relatedOfficeTypes: ['baladiya', 'hopital'],
    costsBreakdown: [
      {
        id: 'c-birth-1',
        label: { derja: "Enregistrement de naissance (Gratuit)", fr: "Déclaration et inscription à l'état civil (Gratuit)", ar: "التصريح والترسيم بدفاتر الحالة المدنية (مجاني)" },
        amountTND: 0.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-birth-1',
        name: { derja: "Chhadet wilada asliya mel sbitar/clinique", fr: "Certificat médical d'accouchement délivré par l'hôpital ou la clinique", ar: "شهادة ولادة أصلية مسلّمة من مصالح المستشفى أو المصحة" },
        originalRequired: true,
      },
      {
        id: 'doc-birth-2',
        name: { derja: "Livret de famille walla 3a9d zawaj", fr: "Livret de famille ou copie de l'acte de mariage des parents", ar: "الدفتر العائلي أو نسخة من عقد زواج الوالدين" },
        originalRequired: true,
      },
      {
        id: 'doc-birth-3',
        name: { derja: "CIN mte3 el walid (el mosarra7)", fr: "CIN du déclarant (père, mère ou personne habilitée)", ar: "بطاقة التعريف الوطنية للمصرح" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "5outh chhadet el wilada mel sbitar", fr: "Récupérer le certificat d'accouchement", ar: "استلام شهادة الولادة من المستشفى أو المصحة" },
        description: { derja: "El clinique walla sbitar ya3tiwk chhadet el wilada msa77a mel tbib", fr: "L'établissement de santé délivre l'attestation avec date et heure exactes", ar: "تسلم الشهادة الطبية متضمنة تاريخ وساعة الولادة وجنس المولود" },
        targetOffice: "Hôpital / Clinique",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 2,
        title: { derja: "Emchi l'el Baladiya fi a9al men 10 ayem", fr: "Déclaration à la Baladiya (Délai : 10 jours)", ar: "التصريح بالبلدية خلال أجل أقصاه 10 أيام" },
        description: { derja: "Emchi l'service état civil fel Baladiya mte3 blaset el wilada", fr: "Présenter le certificat et le livret de famille à l'officier d'état civil", ar: "تقديم الوثائق لضابط الحالة المدنية وترسيم اسم المولود بدفاتر الولادات" },
        targetOffice: "Baladiya",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 3,
        title: { derja: "5arraj el madhamin (Extraits de naissance)", fr: "Retrait immédiat des extraits de naissance", ar: "استلام مضامين الولادة الأصلية للمولود" },
        description: { derja: "5arraj des extraits de naissance jdod (Madhmoun) b'500 millimes", fr: "L'officier remet sur-le-champ les extraits de naissance officiels", ar: "تسلم مضامين الولادة فوراً بعد الترسيم لاستعمالها في ملفات CNAM والتغطية" },
        targetOffice: "Baladiya",
        estimatedDuration: "5 min",
      }
    ]
  },

  // ================= EDUCATION & HIGHER LEARNING =================
  {
    id: 'equivalence-diplome-etranger',
    slug: 'equivalence-diplome-etranger',
    vertical: 'education',
    iconName: 'GraduationCap',
    tags: ['equivalence', 'diplome', 'etranger', 'universite', 'mesrs', 'معادلة', 'شهادة', 'أجنبية', 'جامعة'],
    title: {
      derja: "Mo3adalet el Chahadet el Jam3iya el Ajnabiya (MESRS)",
      fr: "Équivalence des Diplômes Universitaires Étrangers",
      ar: "معادلة الشهائد العلمية والجامعية الأجنبية (وزارة التعليم العالي)",
      en: "Equivalence of Foreign Academic Degrees (MESRS)"
    },
    shortDescription: {
      derja: "Koll el wra9, tarjamat mou7allefa, dossier el MESRS, wel etapes bech t3adel diplôme 9rit bih fel kharej.",
      fr: "Procédure d'homologation et équivalence des diplômes étrangers auprès de la Commission Nationale d'Équivalence du MESRS.",
      ar: "الملف الكامل، الترجمة المحلفة، والمسار الإداري لمعادلة الشهادات الجامعية الأجنبية لدى اللجنة الوطنية بوزارة التعليم العالي.",
    },
    fullDescription: {
      derja: "Bech t5addem diplôme 5dhitou men jame3a fel kharej (Licence, Master, Ingéniorat, Doctorat) fel wadhifa el 3oumoumiya walla les concours fi tounes lezem ta3mallou Mo3adala (Équivalence) fi Wizarat el Ta3lim el 3ali. El dossier lezem fih diplôme original msa77a apostille walla consulaire, relevés de notes complets mte3 kol el a3wem, w tarjama bel 3arbi walla français ken el lougha okhra.",
      fr: "L'équivalence des diplômes et titres universitaires étrangers délivrés par des établissements hors de Tunisie est instruite par la Commission sectorielle d'équivalence du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique (Décret n° 2007-912). Elle est indispensable pour accéder aux concours nationaux, aux ordres professionnels et à la fonction publique.",
      ar: "تخضع الشهادات والمؤهلات الجامعية المسلمة من مؤسسات التعليم العالي الأجنبية إلى وجوبية المعادلة من طرف الإدارة العامة للتعليم العالي بوزارة التعليم العالي والبحث العلمي (الأمر عدد 912 لسنة 2007). تعتبر المعادلة شرطاً جوهرياً للترشح للمناظرات الوطنية بالوظيفة العمومية والترسيم بالعمادات والمهن المنظمة.",
    },
    estimatedTotalCostTND: 40.0,
    estimatedProcessingTime: "60 - 90 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['ministere', 'poste'],
    costsBreakdown: [
      {
        id: 'c-eq-1',
        label: { derja: "Droits de dossier d'équivalence MESRS", fr: "Frais de dossier et timbres d'équivalence", ar: "معاليم دراسة ملف المعادلة بوزارة التعليم العالي" },
        amountTND: 20.0,
        quantity: 1,
        category: 'frais_dossier',
      },
      {
        id: 'c-eq-2',
        label: { derja: "Traductions assermentées / légalisations", fr: "Frais moyens de traduction assermentée et apostille", ar: "معاليم الترجمة المحلفة ومطابقة النسخ" },
        amountTND: 20.0,
        quantity: 1,
        category: 'autre',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-eq-1',
        name: { derja: "Matloub mo3adala matbou3 men site mesrs.tn", fr: "Formulaire officiel de demande d'équivalence dûment rempli", ar: "مطبوعة مطلب المعادلة محملة ومعمرة من موقع الوزارة" },
        originalRequired: true,
      },
      {
        id: 'doc-eq-2',
        name: { derja: "Copie conforme diplôme etranger + Apostille / Légalisation", fr: "Copie certifiée conforme du diplôme étranger avec apostille ou visa consulaire", ar: "نسخة مطابقة للأصل من الشهادة الأجنبية مع التصديق القنصلي أو الأبوستيل" },
        originalRequired: true,
        copiesConformes: 1,
      },
      {
        id: 'doc-eq-3',
        name: { derja: "Relevés de notes complets mte3 koll el a3wem", fr: "Relevés de notes originaux certifiés pour toutes les années d'études", ar: "كشوف الأعداد الأصلية والمفصلة لكافة سنوات الدراسة الجامعية" },
        originalRequired: true,
      },
      {
        id: 'doc-eq-4',
        name: { derja: "Copie Bac tounsi walla équivalence Bac", fr: "Copie conforme du Baccalauréat tunisien ou équivalence", ar: "نسخة مطابقة للأصل من شهادة الباكالوريا أو ما يعادلها" },
        originalRequired: true,
        copiesConformes: 1,
      },
      {
        id: 'doc-eq-5',
        name: { derja: "Tarjama mou7allefa (Traduction assermentée) ken mouch bel 3arbi/français", fr: "Traduction assermentée en arabe ou français si le diplôme est en langue tierce", ar: "ترجمة محلفة للغة العربية أو الفرنسية إذا كانت الشهادة بلغة أجنبية أخرى" },
        originalRequired: false,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "3ammer el مطلب en ligne 3al site mesrs.tn", fr: "Saisie de la demande sur le portail MESRS", ar: "تعمير مطلب المعادلة عبر المنصة الرقمية للوزارة" },
        description: { derja: "Ed5ol 3al site mte3 wizarat el ta3lim el 3ali w 3ammer el formulaire", fr: "Créer un compte sur mesrs.tn et saisir le cursus d'études", ar: "تسجيل المطلب بالمنظومة الإلكترونية وإدراج البيانات الأكاديمية" },
        targetOffice: "En ligne (mesrs.tn)",
        estimatedDuration: "20 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Sobb el dossier fel Bureau d'Ordre mte3 el Wihara", fr: "Dépôt physique ou postal au Ministère", ar: "إيداع الملف الورقي بمكتب الضبط بوزارة التعليم العالي" },
        description: { derja: "Hazz el dossier l'el bureau d'ordre central (Avenue Ouled Haffouz, Tunis) walla b'Rapide Poste", fr: "Déposer le dossier physique complet ou l'envoyer par lettre recommandée", ar: "تسليم الملف بمكتب الضبط المركزي (شارع أولاد حفوز تونس) أو عبر البريد السريع" },
        targetOffice: "Ministère de l'Enseignement Supérieur",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 3,
        title: { derja: "Moutaba3et el commission w istlem el 9arar", fr: "Instruction en commission et notification", ar: "متابعة مداولات اللجنة واستلام قرار المعادلة" },
        description: { derja: "Taba3 dossierk en ligne 7atta to5rej l'attestation d'équivalence officielle", fr: "Suivre l'état du dossier jusqu'à la publication de l'attestation d'équivalence", ar: "متابعة القرار وسحب شهادة المعادلة الرسمية للاستظهار بها لدى الإدارات" },
        targetOffice: "Ministère de l'Enseignement Supérieur",
        estimatedDuration: "60 jours",
      }
    ]
  },

  {
    id: 'bourse-pret-universitaire',
    slug: 'bourse-pret-universitaire',
    vertical: 'education',
    iconName: 'GraduationCap',
    tags: ['bourse', 'pret', 'universitaire', 'etudiant', 'oous', 'منحة', 'قرض', 'جامعي', 'طالب'],
    title: {
      derja: "Matloub Men7a w 9ardh Jam3i lel Talaba (OOUS)",
      fr: "Demande de Bourse & Prêt Universitaire (Offices des Œuvres Universitaires)",
      ar: "مطلب منحة وقرض جامعي للطلبة (دواوين الخدمات الجامعية)",
      en: "University Student Scholarship & Loan (OOUS)"
    },
    shortDescription: {
      derja: "Koll el chourout mte3 da5l el 3ayla, calendrier de dépôt, wel wra9 bech te5ou men7a jam3iya men OOUS.",
      fr: "Critères de revenus parentaux, barème de points, calendrier officiel et pièces requises auprès des Offices Universitaires (Nord, Centre, Sud).",
      ar: "معايير الدخل العائلي السنوي، جدول النقاط، الرزنامة الرسمية والوثائق المطلوبة لدى دواوين الخدمات الجامعية (الشمال، الوسط، والجنوب).",
    },
    fullDescription: {
      derja: "El talaba el jdod wel 9dom 3andhom el 7a9 ysobbo matloub men7a jam3iya (bourse) walla 9ardh (prêt universitaire) fel Office mte3houm (OOUN fel Chmel, OOUC fel Wosset, walla OOUS fel Jnoub). El candidature tsir 100% en ligne 3al site mte3 l'office fel sif ba3d el tawjih el jam3i. El critère el asassi houwa da5l el walidin el sanawi w 3addad el ekhwa fel 3ayla.",
      fr: "L'octroi des bourses et prêts universitaires nationaux est géré par les trois Offices des Œuvres Universitaires (OOUN pour le Nord, OOUC pour le Centre, OOUS pour le Sud). La candidature s'effectue obligatoirement en ligne dès la proclamation des résultats d'orientation universitaire. Le barème repose sur le revenu annuel brut imposable des parents et la charge de famille.",
      ar: "تسند المنح والقروض الجامعية الوطنية من طرف دواوين الخدمات الجامعية الثلاثة (ديوان الشمال، ديوان الوسط، وديوان الجنوب) للطلبة التونسيين المسجلين بمؤسسات التعليم العالي العمومي. يتم إيداع المطالب وجوباً عبر المنصات الرقمية للدواوين إثر التوجيه الجامعي، ويخضع الإسناد لمقاييس الدخل السنوي الإجمالي للأولياء والعبء العائلي.",
    },
    estimatedTotalCostTND: 0.0,
    estimatedProcessingTime: "30 - 45 jours",
    urgencyLevel: 'medium',
    relatedOfficeTypes: ['ministere', 'poste'],
    costsBreakdown: [
      {
        id: 'c-bourse-1',
        label: { derja: "Candidature en ligne (Gratuit)", fr: "Dépôt et instruction dossier de bourse (Gratuit)", ar: "إيداع ودراسة مطلب المنحة (مجاني)" },
        amountTND: 0.0,
        quantity: 1,
        category: 'frais_dossier',
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-bourse-1',
        name: { derja: "Formulaire matbou3 men site mte3 l'Office", fr: "Fiche de candidature imprimée depuis le portail de l'Office", ar: "استمارة الترشح محملة وممضاة من المنصة الرقمية للديوان" },
        originalRequired: true,
      },
      {
        id: 'doc-bourse-2',
        name: { derja: "Copie conforme men chhadet el tawjih walla el inscription", fr: "Copie conforme de l'attestation d'orientation ou d'inscription universitaire", ar: "نسخة مطابقة للأصل من شهادة التوجيه أو الترسيم الجامعي" },
        originalRequired: true,
        copiesConformes: 1,
      },
      {
        id: 'doc-bourse-3',
        name: { derja: "Tasri7 da5l el walidin (Declaration IRPP men 9badha)", fr: "Déclaration de revenus des parents délivrée par la Recette des Finances", ar: "شهادة في التصريح بالضريبة على دخل الوالدين مسلّمة من القباضة المالية" },
        originalRequired: true,
      },
      {
        id: 'doc-bourse-4',
        name: { derja: "Chhadet in5irat CNSS walla CNRPS mte3 el walidin", fr: "Attestation de non-affiliation ou affiliation CNSS/CNRPS des parents", ar: "شهادة انخراط أو عدم انخراط بالصناديق الاجتماعية للأولياء" },
        originalRequired: true,
      },
      {
        id: 'doc-bourse-5',
        name: { derja: "Relevé RIB mte3 compte bancaire walla postal fel esm mte3 el taleb", fr: "Relevé d'identité bancaire ou postal (RIB) au nom de l'étudiant", ar: "كشف هوية بنكية أو بريدية أصلي (RIB) باسم الطالب" },
        originalRequired: true,
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { derja: "3ammer el candidature en ligne 3al site OOUS", fr: "Candidature sur le portail de l'Office", ar: "التسجيل بالمنظومة الإلكترونية لديوان الخدمات الجامعية" },
        description: { derja: "Ed5ol 3al site mte3 l'Office marje3 el tourabi (ooun.rnu.tn / oouc.rnu.tn / oous.rnu.tn)", fr: "Remplir le formulaire en ligne avec les données de revenus familiaux", ar: "إدراج معطيات الدخل العائلي ومقر السكنى والترسيم الجامعي" },
        targetOffice: "En ligne",
        estimatedDuration: "15 min",
      },
      {
        stepNumber: 2,
        title: { derja: "Eb3ath el dossier el war9i b'Rapide Poste", fr: "Envoi du dossier physique par Rapide Poste", ar: "إرسال الملف الورقي المدعم عبر البريد السريع" },
        description: { derja: "Ijm3 el wra9 el koll w eb3athhoum fel delai l'adresse mte3 l'Office", fr: "Envoyer le dossier complet avec la fiche imprimée avant la date limite", ar: "توجيه الوثائق المؤيدة مع الاستمارة قبل انقضاء الأجل الرسمي للترشح" },
        targetOffice: "Poste Tunisienne",
        estimatedDuration: "1 jour",
      },
      {
        stepNumber: 3,
        title: { derja: "Taba3 el nate2ej w versements el men7a", fr: "Publication des résultats et versement des tranches", ar: "الإعلان عن النتائج وصرف أقساط المنحة بالحساب" },
        description: { derja: "Taba3 el résultat en ligne w el men7a tetsabb kol trimestre 3al compte", fr: "Consulter la décision d'octroi et versement trimestriel sur le compte", ar: "الاطلاع على قائمة المقبولين وصرف المنحة دورياً بالحساب البنكي أو البريدي" },
        targetOffice: "En ligne / OOUS",
        estimatedDuration: "30 jours",
      }
    ]
  }
];

export function getProcedureById(id: string): Procedure | undefined {
  return proceduresData.find((p) => p.id === id || p.slug === id);
}

export function getProceduresByVertical(vertical: string): Procedure[] {
  return proceduresData.filter((p) => p.vertical === vertical);
}
