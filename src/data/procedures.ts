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
    templateSlug: 'demande-passeport',
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
    templateSlug: 'statuts-societe',
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
  }
];

export function getProcedureById(id: string): Procedure | undefined {
  return proceduresData.find((p) => p.id === id || p.slug === id);
}

export function getProceduresByVertical(vertical: string): Procedure[] {
  return proceduresData.filter((p) => p.vertical === vertical);
}
