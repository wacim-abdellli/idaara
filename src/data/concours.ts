import { ConcoursItem } from '../types/concours';

export const concoursData: ConcoursItem[] = [
  {
    id: 'steg-recrutement-ingenieurs-2026',
    institution: 'STEG',
    referenceNumber: 'STEG/RH/2026/01',
    category: 'energy_industry',
    educationLevel: 'ingenieur',
    positionsCount: 180,
    deadlineDate: '2026-03-25',
    status: 'open',
    officialPortalUrl: 'https://www.concours.gov.tn',
    estimatedSalaryRangeTND: '1 650 - 2 100 DT',
    title: {
      fr: "Recrutement d'Ingénieurs & Cadres Techniques STEG",
      ar: "مناظرة انتداب مهندسين وإطارات فنية بالشركة التونسية للكهرباء والغاز",
      derja: "Concours Ingénieurs w Cadres STEG",
      en: "STEG National Recruitment: Power & Systems Engineers",
    },
    ministry: {
      fr: "Ministère de l'Industrie, des Mines et de l'Énergie",
      ar: "وزارة الصناعة والمناجم والطاقة",
      derja: "Wizarat el Sina3a wel Ta9a (STEG)",
      en: "Ministry of Industry, Mines and Energy",
    },
    deadlineDisplay: {
      fr: "25 Mars 2026",
      ar: "25 مارس 2026",
      derja: "25 Mars 2026",
      en: "March 25, 2026",
    },
    conditions: [
      {
        fr: "Être de nationalité tunisienne et âgé de 40 ans au maximum à la date de clôture.",
        ar: "أن يكون المترشح تونسي الجنسية ولا يتجاوز سنه 40 سنة بتاريخ ختم الترشحات.",
        derja: "Tounsi(a) w 3omrek ma yfoutech 40 sne fel delai mte3 el concours.",
      },
      {
        fr: "Titulaire d'un Diplôme National d'Ingénieur (Électrique, Mécanique, Énergétique, Informatique).",
        ar: "متحصل على الشهادة الوطنية لمهندس في الاختصاصات المطلوبة (كهرباء، ميكانيك، إعلامية).",
        derja: "3andek diplôme National d'Ingénieur fi génie électrique, mécanique, walla informatique.",
      },
      {
        fr: "Inscription obligatoire préalable sur le portail www.concours.gov.tn.",
        ar: "التسجيل الإجباري الأولي عبر البوابة الوطنية للانتداب بالقطاع العمومي.",
        derja: "Lezem tsejel 9bal 3al site officiel concours.gov.tn.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Fiche d'inscription imprimée du portail concours.gov.tn dûment signée.",
        ar: "استمارة الترشح الإلكترونية مستخرجة من الموقع وممضاة من المترشح.",
        derja: "Wassl el inscription men concours.gov.tn matbou3 w msa7a7.",
      },
      {
        fr: "Copie conforme de la Carte d'Identité Nationale (CIN).",
        ar: "نسخة مطابقة للأصل من بطاقة التعريف الوطنية.",
        derja: "Copie conforme lel CIN.",
      },
      {
        fr: "Copie conforme du Diplôme National d'Ingénieur ou équivalence homologuée.",
        ar: "نسخة مطابقة للأصل من الشهادة الوطنية لمهندس أو شهادة المعادلة.",
        derja: "Copie conforme lel diplôme d'ingénieur.",
      },
      {
        fr: "Extrait du casier judiciaire (Bulletin N°3) récent (< 3 mois).",
        ar: "بطاقة السوابق العدلية (بطاقة عدد 3) حديثة العهد (أقل من 3 أشهر).",
        derja: "Bita9a 3adad 3 (B3) jdida a9al men 3 chhour.",
      },
      {
        fr: "Certificat médical d'aptitude physique délivré par un médecin de la santé publique.",
        ar: "شهادة طبية تثبت القدرة البدنية لممارسة الوظيفة مسلمة من الصحة العمومية.",
        derja: "Chhadet tbib men santé publique.",
      },
    ],
    examStages: [
      {
        fr: "1. Présélection sur dossier (Calcul du score automatique basé sur la moyenne du bac et des années d'études).",
        ar: "1. الفرز الأولي التلقائي بالملفات واحتساب المجموع حسب معدل البكالوريا وسنوات الدراسة.",
        derja: "1. Tri automatique 3al dossier 7asb el score mte3 el bac wel fac.",
      },
      {
        fr: "2. Épreuve écrite technique (QCM & Étude de cas métier).",
        ar: "2. الاختبار الكتابي في مادة الاختصاص (أسئلة متعددة الاختيارات وتحليل حالة).",
        derja: "2. Test ketbi QCM fi domaine el speacialité.",
      },
      {
        fr: "3. Entretien oral d'évaluation psychotechnique et d'aptitude.",
        ar: "3. المقابلة الشفاهية والاختبار النفسي التقني.",
        derja: "3. Entretien oral w test psychotechnique.",
      },
    ],
  },
  {
    id: 'education-capes-professeurs-2026',
    institution: "Ministère de l'Éducation",
    referenceNumber: 'ED-CAPES-2026',
    category: 'education',
    educationLevel: 'master',
    positionsCount: 1250,
    deadlineDate: '2026-04-10',
    status: 'open',
    officialPortalUrl: 'https://www.concours.gov.tn',
    estimatedSalaryRangeTND: '1 400 - 1 800 DT',
    title: {
      fr: "Concours Externe CAPES: Professeurs d'Enseignement Secondaire",
      ar: "المناظرة الخارجية بالاختبارات لانتداب أساتذة التعليم الثانوي (الكاباس)",
      derja: "Concours el CAPES Asatidhat Ta3lim Thanawi",
      en: "CAPES National Exam: Secondary School Teachers",
    },
    ministry: {
      fr: "Ministère de l'Éducation",
      ar: "وزارة التربية",
      derja: "Wizarat el Tarbiya (CAPES)",
      en: "Ministry of Education",
    },
    deadlineDisplay: {
      fr: "10 Avril 2026",
      ar: "10 أفريل 2026",
      derja: "10 Avril 2026",
      en: "April 10, 2026",
    },
    conditions: [
      {
        fr: "Titulaire d'une Maîtrise, Licence LMD ou Master dans la discipline demandée (Maths, Physique, Lettres, Histoire, etc.).",
        ar: "متحصل على شهادة الأستاذية أو الإجازة أو الماجستير في الاختصاص المطلوب.",
        derja: "3andek Licence walla Master fel matière matlouba.",
      },
      {
        fr: "Âge maximal 45 ans au 1er janvier de l'année du concours.",
        ar: "أن لا يتجاوز سن المترشح 45 سنة في غرة جانفي من سنة المناظرة.",
        derja: "3omrek ma yfoutech 45 sne.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Formulaire de candidature imprimé du site edunet.tn / concours.gov.tn.",
        ar: "استمارة الترشح مستخرجة من موقع الوزارة وممضاة.",
        derja: "Formulaire d'inscription matbou3 men edunet.tn.",
      },
      {
        fr: "Copie conforme de la CIN.",
        ar: "نسخة مطابقة للأصل من بطاقة التعريف الوطنية.",
        derja: "Copie conforme CIN.",
      },
      {
        fr: "Copie conforme du diplôme et relevé de notes du Baccalauréat.",
        ar: "نسخة مطابقة للأصل من الشهادة العلمية وكشف أعداد البكالوريا.",
        derja: "Copie conforme diplôme + relevé de notes du Bac.",
      },
      {
        fr: "Extrait de naissance récent (< 3 mois).",
        ar: "مضمون ولادة حديث العهد.",
        derja: "Madhmoun wilada jdida.",
      },
    ],
    examStages: [
      {
        fr: "1. Épreuve écrite d'admissibilité (Épreuve de spécialité et culture générale éducative).",
        ar: "1. الاختبار الكتابي للقبول الأولي (مادة الاختصاص والثقافة العامة).",
        derja: "1. Epreuve écrite fel matière mte3ek.",
      },
      {
        fr: "2. Épreuve orale d'admission définitive (Leçon pédagogique devant jury).",
        ar: "2. الاختبار الشفاهي للقبول النهائي (درس تطبيقي أمام اللجنة).",
        derja: "2. Oral w cours d'application 9odem el jury.",
      },
    ],
  },
  {
    id: 'sonede-techniciens-superieurs-2026',
    institution: 'SONEDE',
    referenceNumber: 'SONEDE/REC/2026/02',
    category: 'energy_industry',
    educationLevel: 'technicien',
    positionsCount: 95,
    deadlineDate: '2026-03-30',
    status: 'closing_soon',
    officialPortalUrl: 'https://www.sonede.com.tn',
    estimatedSalaryRangeTND: '1 200 - 1 450 DT',
    title: {
      fr: "Recrutement de Techniciens Supérieurs en Hydraulique & Électromécanique",
      ar: "مناظرة انتداب تقنيين سامين في الهيدروليك والكهروميكانيك بالشركة الوطنية لاستغلال وتوزيع المياه",
      derja: "Concours Techniciens Supérieurs SONEDE",
      en: "SONEDE Technical Recruitment: Hydraulic & Electro-mechanical Techs",
    },
    ministry: {
      fr: "Ministère de l'Agriculture, des Ressources Hydrauliques et de la Pêche",
      ar: "وزارة الفلاحة والموارد المائية والصيد البحري",
      derja: "Wizarat el Fle7a (SONEDE)",
      en: "Ministry of Agriculture and Water Resources",
    },
    deadlineDisplay: {
      fr: "30 Mars 2026",
      ar: "30 مارس 2026",
      derja: "30 Mars 2026",
      en: "March 30, 2026",
    },
    conditions: [
      {
        fr: "Diplôme de Technicien Supérieur (BTS/DUT) ou Licence Appliquée homologuée.",
        ar: "شهادة تقني سام (BTS) أو إجازة تطبيقية في الاختصاص المطلوب.",
        derja: "Diplôme BTS walla Licence appliquée fel hydraulique walla électromécanique.",
      },
      {
        fr: "Nationalité tunisienne, âge ne dépassant pas 35 ans.",
        ar: "الجنسية التونسية وألا يتجاوز السن 35 سنة.",
        derja: "Tounsi(a) 3omrek a9al men 35 sne.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Récépissé de candidature en ligne SONEDE.",
        ar: "وصل الترشح عبر موقع الصوناد.",
        derja: "Wassl el candidature men site sonede.com.tn.",
      },
      {
        fr: "Copie conforme CIN et diplôme BTS/Licence.",
        ar: "نسخة مطابقة للأصل من بطاقة التعريف والشهادة العلمية.",
        derja: "Copie conforme CIN w diplôme.",
      },
      {
        fr: "Bulletin N°3 (< 3 mois).",
        ar: "بطاقة عدد 3 حديثة.",
        derja: "B3 jdida.",
      },
    ],
    examStages: [
      {
        fr: "Sélection sur dossier par score barème.",
        ar: "الانتقاء الأولي بالملفات واحتساب نقاط المجموع.",
        derja: "Tri 3al dossier w score.",
      },
      {
        fr: "Test écrit professionnel et visite médicale d'aptitude physique.",
        ar: "اختبار كتابي مهني وفحص طبي شامل.",
        derja: "Test kitabi w visite médicale.",
      },
    ],
  },
  {
    id: 'finances-inspecteurs-impots-2026',
    institution: 'Direction Générale des Impôts (DGI)',
    referenceNumber: 'MF-DGI-2026-01',
    category: 'finance',
    educationLevel: 'master',
    positionsCount: 110,
    deadlineDate: '2026-04-18',
    status: 'open',
    officialPortalUrl: 'https://www.concours.gov.tn',
    estimatedSalaryRangeTND: '1 500 - 1 950 DT',
    title: {
      fr: "Recrutement d'Inspecteurs des Finances & Contrôleurs des Impôts",
      ar: "مناظرة انتداب متفقدين ومراقبي أداءات بوزارة المالية (القباضات المالية والجباية)",
      derja: "Concours Motafaqdin Jibaya w 9badhat Maliya",
      en: "Ministry of Finance: Tax Inspectors & Audit Officers",
    },
    ministry: {
      fr: "Ministère des Finances",
      ar: "وزارة المالية",
      derja: "Wizarat el Maliya (Jibaya w 9badhat)",
      en: "Ministry of Finance",
    },
    deadlineDisplay: {
      fr: "18 Avril 2026",
      ar: "18 أفريل 2026",
      derja: "18 Avril 2026",
      en: "April 18, 2026",
    },
    conditions: [
      {
        fr: "Titulaire d'un Master ou Maîtrise en Droit, Sciences Économiques, Fiscalité ou Comptabilité.",
        ar: "متحصل على ماجستير أو أستاذية في الحقوق، العلوم الاقتصادية، الجباية، أو المحاسبة.",
        derja: "Master walla Maîtrise fi Droit, Economie, Jibaya, walla Comptabilité.",
      },
      {
        fr: "Âge n'excédant pas 40 ans au 1er janvier 2026.",
        ar: "ألا يتجاوز السن 40 سنة في أول جانفي 2026.",
        derja: "A9al men 40 sne.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Formulaire d'inscription électronique concours.gov.tn.",
        ar: "استمارة التسجيل الإلكترونية الممضاة.",
        derja: "Fiche d'inscription matbou3a men concours.gov.tn.",
      },
      {
        fr: "Copie conforme de la CIN.",
        ar: "نسخة مطابقة للأصل من بطاقة التعريف الوطنية.",
        derja: "Copie conforme CIN.",
      },
      {
        fr: "Copie conforme du diplôme supérieur.",
        ar: "نسخة مطابقة للأصل من الشهادة العلمية.",
        derja: "Copie conforme diplôme.",
      },
      {
        fr: "B3 récent (< 3 mois).",
        ar: "بطاقة عدد 3 حديثة.",
        derja: "B3 jdida.",
      },
    ],
    examStages: [
      {
        fr: "1. Épreuve écrite sur les finances publiques et le droit fiscal tunisien.",
        ar: "1. اختبار كتابي في المالية العمومية والقانون الجبائي التونسي.",
        derja: "1. Examen kitabi fel finances publiques w droit fiscal.",
      },
      {
        fr: "2. Épreuve orale d'aptitude devant commission d'experts.",
        ar: "2. اختبار شفاهي أمام لجنة تقييم عليا.",
        derja: "2. Entretien oral 9odem el commission.",
      },
    ],
  },
  {
    id: 'sante-medecins-infirmiers-2026',
    institution: 'Ministère de la Santé Publique',
    referenceNumber: 'MSP-REC-2026',
    category: 'health',
    educationLevel: 'licence',
    positionsCount: 350,
    deadlineDate: '2026-04-05',
    status: 'open',
    officialPortalUrl: 'https://www.santetunisie.rns.tn',
    estimatedSalaryRangeTND: '1 350 - 2 400 DT',
    title: {
      fr: "Recrutement de Médecins de Santé Publique & Infirmiers Principaux",
      ar: "مناظرة انتداب أطباء صحة عمومية وممرضين رئيسيين بالمستشفيات العمومية",
      derja: "Concours Toba w Fermalya fel Sbi6arat el 3oumoumiya",
      en: "Ministry of Health: Public Health Doctors & Senior Nurses",
    },
    ministry: {
      fr: "Ministère de la Santé",
      ar: "وزارة الصحة",
      derja: "Wizarat el Sa7a el 3oumoumiya",
      en: "Ministry of Health",
    },
    deadlineDisplay: {
      fr: "05 Avril 2026",
      ar: "05 أفريل 2026",
      derja: "05 Avril 2026",
      en: "April 05, 2026",
    },
    conditions: [
      {
        fr: "Diplôme de Doctorat en Médecine (pour les médecins) ou Licence Nationale en Sciences Infirmières (pour les infirmiers).",
        ar: "شهادة الدكتوراه في الطب أو الإجازة الوطنية في علوم التمريض المسلمة من مؤسسات التعليم العالي.",
        derja: "Diplôme Doctorat fel médecine walla Licence Sciences Infirmières.",
      },
      {
        fr: "Inscription au Conseil National de l'Ordre des Médecins (pour les médecins).",
        ar: "الترسيم بجدول عمادة الأطباء التونسيين.",
        derja: "Inscrit fel 3imada mte3 el toba.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Dossier médical complet et carnet vaccinal à jour.",
        ar: "ملف طبي شامل ودفتر التلاقيح محين.",
        derja: "Dossier médical kemel w carnet de vaccins.",
      },
      {
        fr: "Copie conforme CIN & Diplômes d'État.",
        ar: "نسخة مطابقة للأصل من بطاقة التعريف والشهادات العلمية.",
        derja: "Copie conforme CIN w Diplôme.",
      },
      {
        fr: "Bulletin N°3 (< 3 mois).",
        ar: "بطاقة عدد 3 حديثة.",
        derja: "B3 jdida.",
      },
    ],
    examStages: [
      {
        fr: "Évaluation sur titre et dossier universitaire.",
        ar: "الانتداب بالملفات والألقاب والمسار الدراسي.",
        derja: "Evaluation 3al dossier wel cursus universitaire.",
      },
      {
        fr: "Visite médicale d'aptitude hospitalière.",
        ar: "الفحص الطبي لممارسة المهنة بالمستشفيات.",
        derja: "Visite médicale de titularisation.",
      },
    ],
  },
  {
    id: 'mtc-cybersecurite-cloud-2026',
    institution: 'ANSI / Ministère des Technologies de la Communication',
    referenceNumber: 'MTC-ANSI-2026/04',
    category: 'tech_telecom',
    educationLevel: 'ingenieur',
    positionsCount: 45,
    deadlineDate: '2026-04-22',
    status: 'open',
    officialPortalUrl: 'https://www.concours.gov.tn',
    estimatedSalaryRangeTND: '1 800 - 2 500 DT',
    title: {
      fr: "Recrutement d'Ingénieurs en Cybersécurité, IA & Cloud (ANSI)",
      ar: "مناظرة انتداب مهندسين أول في السلامة المعلوماتية والذكاء الاصطناعي (الوكالة الوطنية للسلامة السيبرنية)",
      derja: "Concours Ingénieurs Cybersécurité & Cloud (ANSI)",
      en: "ANSI National Agency: Cybersecurity, AI & Cloud Engineers",
    },
    ministry: {
      fr: "Ministère des Technologies de la Communication",
      ar: "وزارة تكنولوجيات الاتصال",
      derja: "Wizarat el Technologies wel Cyber (ANSI)",
      en: "Ministry of Communication Technologies",
    },
    deadlineDisplay: {
      fr: "22 Avril 2026",
      ar: "22 أفريل 2026",
      derja: "22 Avril 2026",
      en: "April 22, 2026",
    },
    conditions: [
      {
        fr: "Diplôme National d'Ingénieur en Sécurité Informatique, Réseaux, Systèmes ou Intelligence Artificielle.",
        ar: "الشهادة الوطنية لمهندس في السلامة المعلوماتية، الشبكات، الأنظمة، أو الذكاء الاصطناعي.",
        derja: "Diplôme d'Ingénieur fi Cybersécurité, Réseaux, Informatique walla AI.",
      },
      {
        fr: "Certifications techniques valorisées (CEH, OSCP, AWS, CISM).",
        ar: "شهادات التخصص المهنية المعترف بها.",
        derja: "Les certifications CEH, AWS, OSCP yzidoufel score.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Fiche d'inscription signée de concours.gov.tn.",
        ar: "استمارة الترشح الإلكترونية.",
        derja: "Fiche d'inscription matbou3a men concours.gov.tn.",
      },
      {
        fr: "Copies conformes CIN, Diplôme d'Ingénieur et Attestations de Stages / Certifications.",
        ar: "نسخ مطابقة للأصل من بطاقة التعريف، شهادة الهندسة، والشهادات المهنية.",
        derja: "Copie conforme CIN, Diplôme d'Ingénieur w les certifs.",
      },
      {
        fr: "B3 récent (< 3 mois).",
        ar: "بطاقة عدد 3 حديثة.",
        derja: "B3 jdida.",
      },
    ],
    examStages: [
      {
        fr: "Test technique écrit et CTF (Capture The Flag) pratique.",
        ar: "اختبار كتابي تقني وتطبيقي في حماية الأنظمة السيبرنية.",
        derja: "Test technique w CTF pratique.",
      },
      {
        fr: "Entretien oral technique avec jury spécialisé.",
        ar: "مقابلة شفاهية تقنية مع لجنة خبراء.",
        derja: "Oral technique m3a les experts mte3 el ANSI.",
      },
    ],
  },
  {
    id: 'interieur-protection-civile-officiers-2026',
    institution: 'Office National de la Protection Civile (ONPC)',
    referenceNumber: 'ONPC-REC-2026-03',
    category: 'interior_security',
    educationLevel: 'bac',
    positionsCount: 220,
    deadlineDate: '2026-03-28',
    status: 'closing_soon',
    officialPortalUrl: 'https://www.concours.gov.tn',
    estimatedSalaryRangeTND: '1 100 - 1 400 DT',
    title: {
      fr: "Concours de Recrutement d'Agents & Sous-Lieutenants de la Protection Civile",
      ar: "مناظرة انتداب عرفاء وملازمين بسلك الحماية المدنية التونسية",
      derja: "Concours 3orafa2 w Dhabat fel 7imaya el Madaniya",
      en: "National Civil Protection: Officers & Rescue Agents",
    },
    ministry: {
      fr: "Ministère de l'Intérieur",
      ar: "وزارة الداخلية",
      derja: "Wizarat el Dakhiliya (7imaya Madaniya)",
      en: "Ministry of Interior",
    },
    deadlineDisplay: {
      fr: "28 Mars 2026",
      ar: "28 مارس 2026",
      derja: "28 Mars 2026",
      en: "March 28, 2026",
    },
    conditions: [
      {
        fr: "Niveau Baccalauréat accompli (pour agents) ou Licence/Master (pour sous-lieutenants).",
        ar: "المستوى التعليمي: الرابعة ثانوي كاملة بنجاح (للعرفاء) أو إجازة/ماجستير (للملازمين).",
        derja: "Niveau 4ème secondaire mrigel walla Licence.",
      },
      {
        fr: "Taille minimale: 1.70m pour les hommes, 1.65m pour les femmes. Acuité visuelle 15/20.",
        ar: "القامة الدنيا: 1.70م للذكور، 1.65م للإناث. حدة البصر لا تقل عن 15/20.",
        derja: "Toul a9al chay 1.70m lel rjel w 1.65m lel nsa.",
      },
      {
        fr: "Célibataire, âge entre 20 et 24 ans (agents).",
        ar: "أن يكون المترشح أعزب وسنه بين 20 و 24 سنة.",
        derja: "A3zeb w 3omrek bin 20 w 24 sne.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Demande manuscrite timbrée au nom du Ministre de l'Intérieur.",
        ar: "مطلب ترشح محرر على ورق عادي باسم السيد وزير الداخلية.",
        derja: "Matlab khat yedd b'essem Wazir el Dakhiliya.",
      },
      {
        fr: "Copie de la CIN et 4 photos d'identité.",
        ar: "نسخة من بطاقة التعريف و 4 صور شمسية.",
        derja: "Copie CIN w 4 tsawer fond abyedh.",
      },
      {
        fr: "Certificat de scolarité ou copie conforme du diplôme.",
        ar: "شهادة مدرسية أصلية أو نسخة مطابقة للأصل من الشهادة العلمية.",
        derja: "Chhadet moustawa dirasi walla diplôme.",
      },
      {
        fr: "Bulletin N°3 récent.",
        ar: "بطاقة عدد 3 حديثة.",
        derja: "B3 jdida.",
      },
    ],
    examStages: [
      {
        fr: "1. Tests physiques et épreuves d'endurance athlétique.",
        ar: "1. اختبارات اللياقة البدنية والعدو.",
        derja: "1. Tests sport w endurance.",
      },
      {
        fr: "2. Visite médicale approfondie.",
        ar: "2. الفحص الطبي المعمق بالمستشفى العسكري.",
        derja: "2. Visite médicale kemla.",
      },
      {
        fr: "3. Épreuves écrites et psychotechniques.",
        ar: "3. الاختبارات الكتابية والنفسية التقنية.",
        derja: "3. Test psychotechnique w kitabi.",
      },
    ],
  },
  {
    id: 'poste-tunisienne-guichetiers-2026',
    institution: 'La Poste Tunisienne (البريد التونسي)',
    referenceNumber: 'POSTE/RH/2026/02',
    category: 'transport_postal',
    educationLevel: 'bac',
    positionsCount: 85,
    deadlineDate: '2026-04-15',
    status: 'open',
    officialPortalUrl: 'https://www.poste.tn',
    estimatedSalaryRangeTND: '1 150 - 1 450 DT',
    title: {
      fr: "Recrutement d'Agents Commerciaux & Guichetiers de la Poste Tunisienne",
      ar: "مناظرة انتداب أعوان نوافذ وموزعي بريد بالديوان الوطني للبريد التونسي",
      derja: "Concours A3wen Nawafez fel Bosta (Poste Tunisienne)",
      en: "Tunisian Post: Commercial Agents & Counter Clerks",
    },
    ministry: {
      fr: "Ministère des Technologies de la Communication",
      ar: "وزارة تكنولوجيات الاتصال",
      derja: "El Diwan el Watani lel Barid (El Bosta)",
      en: "Ministry of Communication Technologies",
    },
    deadlineDisplay: {
      fr: "15 Avril 2026",
      ar: "15 أفريل 2026",
      derja: "15 Avril 2026",
      en: "April 15, 2026",
    },
    conditions: [
      {
        fr: "Titulaire du Baccalauréat (Économie & Gestion, Lettres, Sciences ou Informatique).",
        ar: "متحصل على شهادة البكالوريا في الشعب المطلوبة.",
        derja: "3andek el Bac fel branches matlouba.",
      },
      {
        fr: "Âge maximal 35 ans à la date limite d'inscription.",
        ar: "ألا يتجاوز السن 35 سنة بتاريخ ختم الترشحات.",
        derja: "A9al men 35 sne.",
      },
    ],
    requiredDocuments: [
      {
        fr: "Reçu d'inscription en ligne poste.tn / concours.gov.tn.",
        ar: "وصل التسجيل عبر موقع البريد التونسي.",
        derja: "Wassl el inscription men site el bosta.",
      },
      {
        fr: "Copie conforme CIN & Diplôme du Baccalauréat.",
        ar: "نسخة مطابقة للأصل من بطاقة التعريف وشهادة البكالوريا.",
        derja: "Copie conforme CIN w diplôme el Bac.",
      },
      {
        fr: "Bulletin N°3 (< 3 mois).",
        ar: "بطاقة عدد 3 حديثة.",
        derja: "B3 jdida.",
      },
    ],
    examStages: [
      {
        fr: "Sélection sur dossier basée sur la moyenne du Baccalauréat.",
        ar: "الفرز الأولي بالملفات حسب معدل البكالوريا.",
        derja: "Tri 3al dossier 7asb moyenne el Bac.",
      },
      {
        fr: "Épreuve écrite d'aptitude commerciale et bureautique.",
        ar: "اختبار كتابي في المعاملات البريدية والمالية.",
        derja: "Test kitabi w bureautique.",
      },
    ],
  },
];
