/**
 * IDAARA.TN — MASTER TUNISIAN CIVIC & LEGAL KNOWLEDGE BASE
 * Deep, comprehensive knowledge engine covering all Tunisian public services,
 * JORT legal decrees, statutory fiscal stamp costs (Loi de Finances), and authentic Derja dialect.
 */

export interface CivicProcedureKnowledge {
  keywords: string[];
  title: string;
  authority: string;
  statutoryCost: string;
  delay: string;
  derjaSummary: string;
  requiredDocuments: string[];
  steps: string[];
  proTips: string[];
}

export const TUNISIAN_CIVIC_KNOWLEDGE: CivicProcedureKnowledge[] = [
  // 1. PASSPORT (PASSEPORT TUNISIEN & E-TIMBRES)
  {
    keywords: ['passeport', 'passport', 'safra', 'voyage', 'جواز', 'سفر', 'باسبور', 'e-timbre'],
    title: 'Passeport Tunisien (Renouvellement ou Première Délivrance)',
    authority: 'Poste de Police ou Brigade de la Garde Nationale (ou Consulat à l’étranger)',
    statutoryCost: '80 DT (Tarif adulte) / 25 DT (Élèves, étudiants, enfants < 7 ans) / 150 DT (Remplacement en cas de perte/vol)',
    delay: '7 à 15 jours ouvrables (En Tunisie) / 15 à 30 jours (Consulats)',
    derjaSummary: "Bech t'talla3 walla t'jadded el Passeport tounsi, lezmek t7adher dossier fih timbre fiscal (80 DT walla 25 DT kenek etudiant), 4 tsawer fond blanc, copie CIN m3a l'original, wel passeport el 9dim, w tsobbou fel markez mte3 seknek.",
    requiredDocuments: [
      "Formulaire officiel de demande de passeport (yemla fel markez walla men Idaara.tn)",
      "Copie de la Carte d'Identité Nationale (CIN) + Présentation de l'originale",
      "4 Photos d'identité récentes fond blanc (3.5 x 4.5 cm)",
      "Timbre fiscal de 80 DT (ou 25 DT pour élèves/étudiants sur présentation de certificat de scolarité original)",
      "Ancien passeport à restituer (si renouvellement)",
      "Autorisation parentale légalisée (Tarkhis abawi) pour les mineurs (< 18 ans)",
      "Déclaration de perte de la police (en cas de passeport perdu/volé + timbre de 150 DT)"
    ],
    steps: [
      "Acheter le timbre fiscal à la Recette des Finances (القباضة المالية) ou en ligne sur e-timbre.finances.gov.tn",
      "Prendre 4 photos d'identité chez un photographe agréé (fond blanc obligatoire)",
      "Déposer le dossier complet au commissariat de police ou poste de garde nationale de votre zone",
      "Récupérer le reçu de dépôt et retirer le passeport sous 10 à 15 jours"
    ],
    proTips: [
      "Les étudiants doivent impérativement ramener un Certificat de scolarité original récent pour bénéficier du tarif de 25 DT au lieu de 80 DT.",
      "Vous pouvez désormais acheter le timbre fiscal électronique sur e-timbre.finances.gov.tn et présenter le code SMS au guichet."
    ]
  },

  // 2. NATIONAL ID (CIN / CARTE D'IDENTITÉ NATIONALE)
  {
    keywords: ['cin', 'carte d\'identite', 'bita9at ta3rif', 'ta3rif', 'بطاقة', 'تعريف', 'بطاقة تعريف'],
    title: "Carte d'Identité Nationale (CIN)",
    authority: "Poste de Police ou Brigade de la Garde Nationale",
    statutoryCost: "3 DT (Délivrance ou renouvellement) / 10 DT (Remplacement pour perte ou détérioration)",
    delay: "10 à 20 jours ouvrables",
    derjaSummary: "Bita9at el Ta3rif el Wataniya lezmek t7adher madhmoun wilada asly (< 3 mois), 3 tsawer fond blanc, timbre fiscal 3 DT, w chhedet i9ama/khedma ken tbaddlet el 7ala.",
    requiredDocuments: [
      "Extrait de naissance original récent (Madhmoun wilada < 3 mois)",
      "3 Photos d'identité officielles fond blanc",
      "Timbre fiscal de 3 DT (ou 10 DT en cas de perte)",
      "Ancienne CIN (en cas de renouvellement)",
      "Certificat de résidence (Chhedet i9ama) si changement d'adresse",
      "Attestation de travail ou certificat d'inscription étudiante si changement de profession",
      "Déclaration de perte (Chhedet dhaya3) délivrée par le poste de police si perdue"
    ],
    steps: [
      "Extraire un extrait de naissance de la Baladiya ou en ligne (madhmoun.tn)",
      "Acheter le timbre fiscal de 3 DT à la Recette des Finances",
      "Déposer le dossier au poste de police du lieu de résidence"
    ],
    proTips: [
      "La CIN est obligatoire dès l'âge de 18 ans en Tunisie (et possible dès 15 ans pour les élèves)."
    ]
  },

  // 3. CAR REGISTRATION TRANSFER (MUTATION CARTE GRISE)
  {
    keywords: ['carte grise', 'karhba', 'sayara', 'mutation', 'chrit', 'vente voiture', 'remadiya', 'رمادية', 'سيارة', 'شراء سيارة'],
    title: "Mutation de Carte Grise (Changement de Propriétaire Véhicule)",
    authority: "ATTT (Agence Technique des Transports Terrestres) + Recette des Finances + Baladiya",
    statutoryCost: "~145 DT au total (Droits d'enregistrement contrat ~30-50 DT selon CV + Frais ATTT 40 DT + Timbres Baladiya 10 DT)",
    delay: "Immédiat au guichet ATTT (après obtention du reçu et contrôle technique)",
    derjaSummary: "Bech tbeddel el Carte Grise ba3d ma chrit karhba: 3a9d bay3 fel baladiya, tsajjlou fel 9badha, ta3mel visite technique ATTT, w tsobb fel ATTT bech tekhou el carte grise jdida.",
    requiredDocuments: [
      "Contrat de vente (3a9d bay3) original légalisé à la Baladiya et enregistré à la Recette des Finances",
      "Carte grise originale barrée et signée par le vendeur avec mention 'Vendu le [Date]'",
      "Certificat d'identification technique (Fahs fanni / Visite ATTT) en cours de validité",
      "Quittance de paiement de la taxe de circulation (Vignette) de l'année en cours",
      "Copie de la CIN de l'acheteur",
      "Formulaire de demande de mutation rempli (disponible à l'ATTT)"
    ],
    steps: [
      "Rédiger et signer le contrat de vente à la Baladiya (Légalisation des signatures)",
      "Enregistrer le contrat à la Recette des Finances (Paiement des droits d'enregistrement)",
      "Passer la visite technique à l'ATTT pour obtenir le certificat de conformité",
      "Déposer le dossier complet au guichet de l'ATTT de votre gouvernorat pour retirer la nouvelle carte grise"
    ],
    proTips: [
      "Le délai légal pour faire la mutation est de 15 jours après la date de signature du contrat de vente pour éviter les pénalités de retard à la Recette."
    ]
  },

  // 4. DRIVING LICENSE (PERMIS DE CONDUIRE / رخصة السياقة)
  {
    keywords: ['permis', 'ro5sa', 'siya9a', 'conduire', 'رخصة', 'سياقة', 'بيرمي', 'auto ecole'],
    title: "Permis de Conduire Tunisien (Catégorie B)",
    authority: "ATTT (Agence Technique des Transports Terrestres) & Auto-écoles agréées",
    statutoryCost: "~800 à 1200 DT au total (Heures de code + conduite + frais d'examen ATTT 50 DT + timbre permis 25 DT + certificat médical 30 DT)",
    delay: "Selon la réussite aux épreuves (Immédiat pour le retrait du titre après réussite)",
    derjaSummary: "Bech t'3addi el Permis B: t9ayed fi auto-école, t3addi examen code (20 DT ATTT), t3addi conduite (30 DT ATTT), w ki tenja7 tekhou chhedet nejah w tkhallas 25 DT timbre fel ATTT bech tekhou el permis.",
    requiredDocuments: [
      "Copie de la CIN",
      "Certificat médical d'aptitude visuelle et physique délivré par un médecin agréé",
      "4 Photos d'identité fond blanc",
      "Reçu de paiement des droits d'examen ATTT",
      "Timbre fiscal de 25 DT pour la délivrance du titre de conduite"
    ],
    steps: [
      "S'inscrire dans une auto-école agréée pour la préparation du code de la route",
      "Passer et réussir l'examen théorique du code (Salle informatisée ATTT)",
      "Effectuer les séances pratiques de conduite et réussir l'examen pratique sur circuit et route",
      "Retirer le permis de conduire provisoire (ou carte biométrique) auprès du centre ATTT"
    ],
    proTips: [
      "Le permis probatoire est valable 2 ans avec une limite de vitesse et un capital de points avant de devenir définitif."
    ]
  },

  // 5. AUTO-ENTREPRENEUR (STATUT مبادر ذاتي 1%)
  {
    keywords: ['auto-entrepreneur', 'auto entrepreneur', 'freelance', 'patente', 'moubeder', '1%', 'مبادر', 'ذاتي', 'فريلانس', 'باتيندة'],
    title: "Régime de l'Auto-Entrepreneur en Tunisie (Loi n° 2020-33 / LF 2025-2026)",
    authority: "Plateforme Nationale de l'Auto-Entrepreneur (auto-entrepreneur.tn) + CNSS + Ministère des Finances",
    statutoryCost: "100% Gratuit à l'inscription. Impôt libératoire unique de 1% sur le CA (Services/Freelance) ou 0.5% (Commerce/Industrie)",
    delay: "Inscription en ligne en 5 minutes / Validation de la carte sous 15 jours",
    derjaSummary: "Statut Auto-Entrepreneur fi Tounes ya3tik impôt 1% barka 3al chiffre d'affaires lel freelance wel services, zéro TVA, CNSS mrigla, w droit bech tda5al devises (EUR/USD) men bara b'tor9 9anouniya.",
    requiredDocuments: [
      "Copie de la CIN",
      "Justificatif d'activité ou diplôme/portfolio (pour les métiers numériques/techniques)",
      "Numéro de téléphone et adresse email valide",
      "Compte bancaire ou postal en Tunisie (RIB)"
    ],
    steps: [
      "Créer un compte sur la plateforme officielle auto-entrepreneur.tn",
      "Choisir l'activité professionnelle (Développement web, Design, Traduction, Conseil, Artisanat...)",
      "Valider l'inscription pour obtenir l'identifiant fiscal unique et la carte d'auto-entrepreneur",
      "Déclarer trimestriellement son chiffre d'affaires et payer 1% d'impôt en ligne"
    ],
    proTips: [
      "L'auto-entrepreneur bénéficie de l'exonération totale de TVA et peut facturer légalement des clients à l'international (BCT).",
      "La Loi de Finances a mis en place une ligne de crédit de soutien jusqu'à 15 000 DT pour les auto-entrepreneurs.",
      "Le plafond annuel de chiffre d'affaires est de 75 000 DT pour les services."
    ]
  },

  // 6. CRIMINAL RECORD (BULLETIN N°3 / B3 / السوابق العدلية)
  {
    keywords: ['b3', 'bulletin 3', 'sawabi9', 'casier', 'عدلية', 'سوابق', 'بطاقة عدد 3'],
    title: "Bulletin N°3 (Casier Judiciaire / B3)",
    authority: "Ministère de l'Intérieur (En ligne: b3.interieur.gov.tn) ou Commissariat de Police",
    statutoryCost: "7.500 DT (Timbre fiscal)",
    delay: "3 à 8 jours ouvrables (En ligne livré par Rapide Poste ou retrait au commissariat)",
    derjaSummary: "Bech tekhou bita9at el sawabi9 el 3adliya B3, tnejjem tsebha direct en ligne 3al site b3.interieur.gov.tn b'7.5 DT w tjik bel Rapide Poste l'dar, walla temchi lel markez.",
    requiredDocuments: [
      "Copie de la CIN",
      "Extrait de naissance original (si première demande)",
      "Timbre fiscal de 7.500 DT (ou paiement en ligne par carte bancaire/e-Dinar)"
    ],
    steps: [
      "Accéder au portail officiel b3.interieur.gov.tn",
      "Remplir les informations personnelles et l'adresse de livraison postale",
      "Payer 7.500 DT + frais de livraison Rapide Poste en ligne",
      "Recevoir le pli sécurisé à domicile sous 3 à 5 jours"
    ],
    proTips: [
      "La commande en ligne sur le site officiel du Ministère de l'Intérieur est le moyen le plus rapide et évite les files d'attente au commissariat."
    ]
  },

  // 7. RESIDENTIAL LEASE CONTRACT (CONTRAT DE BAIL / عقد كراء سكني)
  {
    keywords: ['contrat de bail', 'bail', 'kré', 'kra', '3a9d kré', 'loyé', 'location', 'كراء', 'عقد', 'إيجار', 'عقد كراء'],
    title: "Contrat de Bail Résidentiel Conforme (Code des Obligations et des Contrats - COC)",
    authority: "Baladiya (Légalisation) + Recette des Finances (Enregistrement fiscal)",
    statutoryCost: "5 DT de timbre municipal par copie à la Baladiya + 30 DT d'enregistrement fiscal à la Recette des Finances",
    delay: "Immédiat le jour même",
    derjaSummary: "3a9d el kré el 9anouni lezmou ykoun fih assemi el keri wel mekré, el montant, el caution, w ytsa7a7 fel baladiya (5 DT) w ytsajjel fel 9badha (30 DT) bech ykoun 7ami el zouz.",
    requiredDocuments: [
      "3 Exemplaires originaux du contrat de bail signés par le bailleur et le locataire",
      "Copies des CIN du bailleur et du locataire",
      "Titre de propriété (Chhedet melkiya) ou copie de la dernière quittance STEG/SONEDE"
    ],
    steps: [
      "Rédiger le contrat de bail (ou utiliser le modèle certifié Idaara.tn)",
      "Signer et légaliser les 3 copies à la Baladiya (Présence obligatoire des 2 parties avec CIN)",
      "Enregistrer le contrat dans un délai de 60 jours à la Recette des Finances territorialement compétente"
    ],
    proTips: [
      "L'enregistrement à la Recette des Finances donne date certaine au contrat et protège le locataire contre toute expulsion arbitraire et le propriétaire pour le recouvrement."
    ]
  },

  // 8. MARRIAGE CONTRACT (MARIAGE CIVIL & SDAQ / عقد الزواج)
  {
    keywords: ['mariage', '3ers', 'sda9', 'zawaj', '3a9d zawaj', 'زواج', 'عقد زواج', 'صداق', 'عرس'],
    title: "Contrat de Mariage Civil (Acte de Mariage)",
    authority: "Municipalité (Baladiya) ou par 2 Notaires (3odoul Ichhed)",
    statutoryCost: "~50 à 200 DT selon la municipalité et la salle réservée (ou honoraires notariés fixés par barème)",
    delay: "Fixation de la date selon disponibilité du calendrier municipal",
    derjaSummary: "Bech ta3mlou 3a9d el 3ers fel baladiya: chhedet tebbya 9bel el 3ers lel zouz, madhamin wilada jdod (< 20 jours), copies CIN lel 3rouset wel chhoud (2 chhoud), w te5tarou nitham el amlak (ishtirak walla fasl).",
    requiredDocuments: [
      "Certificat médical prémédical prénuptial récent pour les deux futurs époux",
      "Extrait de naissance original récent (< 20 jours) pour chacun des futurs époux",
      "Copies des CIN des deux futurs époux",
      "Copies des CIN des deux témoins majeurs (2 chhoud)",
      "Déclaration conjointe de choix du régime patrimonial (Régime de la séparation des biens ou communauté des biens / الاشتراك في الأملاك)"
    ],
    steps: [
      "Effectuer les analyses et retirer les certificats prémédicaux auprès d'un médecin",
      "Retirer les extraits de naissance récents à la Baladiya",
      "Déposer le dossier complet au bureau de l'état civil de la Baladiya pour fixer la date de la cérémonie",
      "Célébrer le mariage et signer le registre officiel en présence des témoins"
    ],
    proTips: [
      "Le choix du régime de la communauté des biens (Ishtirak fel amlak) ne concerne que les biens immobiliers à usage d'habitation acquis après le mariage."
    ]
  },

  // 9. HEALTH INSURANCE & CARNETS (CNAM & CNSS / الكنام وبطاقات العلاج)
  {
    keywords: ['cnam', 'cnss', 'dwe', 'carnet', 'soins', 'tabib', 'كنام', 'دفتر علاج', 'ضمان اجتماعي', 'طبيب العائلة'],
    title: "Assurance Maladie CNAM & Choix de Filière de Soins",
    authority: "Centre Régional CNAM (Caisse Nationale d'Assurance Maladie)",
    statutoryCost: "Gratuit pour les affiliés cotisants CNSS/CNRPS",
    delay: "Immédiat pour le dépôt / 15 jours pour l'édition de la carte Labes ou carnet",
    derjaSummary: "Fel CNAM 3andek 3 choix: Carnet Azra9 (Filière privée - tarja3lek el flous b'plafond 300 DT/an), Carnet Asfar (Filière publique - sbitarat w dispensaires), walla Carnet Abyadh (Tabib el 3ayla).",
    requiredDocuments: [
      "Formulaire de choix de filière de soins (disponible à la CNAM ou Idaara.tn)",
      "Copie de la CIN de l'affilié",
      "Attestation d'affiliation CNSS ou CNRPS",
      "Extrait de naissance des ayants droit (conjoint, enfants à charge)"
    ],
    steps: [
      "Choisir le système de soins le plus adapté à sa famille (Filière privée, publique ou médecin de famille)",
      "Déposer le formulaire au centre CNAM de rattachement",
      "Recevoir le carnet de soins ou activer la carte électronique Labes"
    ],
    proTips: [
      "Le changement de filière de soins n'est possible qu'une fois par an, généralement avant le 31 octobre pour prise d'effet au 1er janvier suivant."
    ]
  },

  // 10. LAND REGISTRY & PROPERTY TITLE (TITRE FONCIER & DAFTAR KHANAH / دفتر خانة)
  {
    keywords: ['daftar khana', 'titre foncier', 'chhedet melkiya', 'conservation fonciere', 'bleu', 'شهادة ملكية', 'دفتر خانة', 'رسم عقاري'],
    title: "Certificat de Propriété Immobilière (Chhedet Melkiya / Conservation Foncière)",
    authority: "Conservation de la Propriété Foncière (CPF / دفتر خانة)",
    statutoryCost: "20 DT (Frais de délivrance du certificat)",
    delay: "1 à 3 jours ouvrables (ou en ligne via cpf.gov.tn)",
    derjaSummary: "Bech tkharej Chhedet Melkiya (Certificat de propriété) mte3 dar walla ardh men Daftar Khanah, lezmek numéro mte3 el Titre Bleu (Rasm el 3a9ari), w t5allas 20 DT.",
    requiredDocuments: [
      "Numéro du titre foncier (Rasm el 3a9ari / Titre bleu)",
      "Nom du propriétaire ou de la parcelle",
      "Formulaire de demande rempli",
      "Quittance de paiement de 20 DT"
    ],
    steps: [
      "Se rendre au bureau de la Conservation Foncière de la région du bien immobilier (ou portail en ligne cpf.gov.tn)",
      "Indiquer le numéro exact du titre foncier",
      "Payer les frais et retirer le certificat officiel attestant de la situation juridique du bien (hypothèques, servitudes, propriétaires)"
    ],
    proTips: [
      "Ne signez jamais une promesse de vente ou un contrat d'achat immobilier sans avoir vérifié un certificat de propriété récent (< 1 mois) pour s'assurer que le bien n'est pas grevé d'une hypothèque."
    ]
  },

  // 11. COMPANY CREATION (SUARL / SARL / RNE / تأسيس شركة)
  {
    keywords: ['societe', 'sarl', 'suarl', 'rne', 'patente', 'creation entreprise', 'charika', 'شركة', 'سجل مؤسسات', 'تأسيس شركة'],
    title: "Création d'Entreprise en Tunisie (Société SARL / SUARL)",
    authority: "RNE (Registre National des Entreprises) + Recette des Finances + Banque",
    statutoryCost: "~350 à 500 DT de frais légaux (Enregistrement statuts 150 DT + RNE 50 DT + JORT 30 DT + Dépôt capital min 1000 DT SARL)",
    delay: "48 à 72 heures via le guichet unique du RNE",
    derjaSummary: "Bech t'7ell charika SUARL/SARL: t'7adher les statuts, t'blocki el capital fel banque, t'sajjel les statuts fel 9badha, t'5arej el patente (matricule fiscal), w t'9ayed fel RNE bech tekhou l'extrait RNE officiel.",
    requiredDocuments: [
      "Statuts de la société signés et légalisés (3 exemplaires)",
      "Attestation de blocage du capital social délivrée par la banque",
      "Contrat de bail du siège social légalisé et enregistré à la Recette",
      "Copies des CIN des associés et du gérant",
      "Formulaire unique de déclaration d'existence et d'immatriculation au RNE"
    ],
    steps: [
      "Rédiger les statuts et ouvrir un compte bancaire indisponible pour le dépôt du capital",
      "Enregistrer les statuts et le bail à la Recette des Finances",
      "Déposer la déclaration d'existence au bureau de contrôle fiscal pour obtenir le Matricule Fiscal (Patente)",
      "Déposer le dossier complet sur la plateforme du RNE (rne.tn) pour obtenir l'identifiant unique et la publication au JORT"
    ],
    proTips: [
      "Grâce au Startup Act, les entreprises labellisées 'Startup' bénéficient d'exonérations fiscales complètes pendant 8 ans et d'autorisations spéciales de change BCT."
    ]
  },

  // 12. FCR REGIME (DOUANE TUNISIENNE / امتياز ن.ت.د)
  {
    keywords: ['fcr', 'douane', 'diaspora', 'importation voiture', 'tre', 'diwanah', 'ديوانة', 'ن.ت.د', 'سيارة ن.ت.د'],
    title: "Régime Douanier FCR (Franchise Changement de Résidence pour Tunisiens à l'Étranger)",
    authority: "Direction Générale des Douanes (Bureau des Douanes / Guichet Unique TRE)",
    statutoryCost: "Exonération totale ou partielle selon l'option choisie (Régime suspensif RS avec interdiction de vente pendant 1 an ou paiement de 25-30% des droits pour immatriculation normale)",
    delay: "1 à 3 jours au bureau des douanes du port/frontière",
    derjaSummary: "Imtiyaz FCR ya3tik el 7a9 bech tdakhel karhba w 9ach dar men ghir ma tkhallas diwana kemla kenik 3echt 2 ans fel kharej w ma fotch 120 jours fi tounes koll 3am.",
    requiredDocuments: [
      "Passeport avec cachets d'entrée/sortie justifiant un séjour continu à l'étranger d'au moins 2 ans (sans dépasser 120 jours par an en Tunisie)",
      "Copie de la carte de séjour à l'étranger",
      "Carte grise étrangère du véhicule au nom du demandeur",
      "Facture d'achat du véhicule",
      "Formulaire de demande de régime FCR (Douane tunisienne)"
    ],
    steps: [
      "Vérifier son éligibilité sur le portail de la Douane tunisienne (douane.gov.tn)",
      "Faire la déclaration douanière au port d'arrivée (La Goulette, Zarzis, etc.)",
      "Déposer le dossier au bureau régional des douanes pour l'obtention de la carte grise tunisienne (Série RS ou normale)"
    ],
    proTips: [
      "La nouvelle réglementation permet désormais de céder le véhicule immatriculé sous régime FCR après paiement partiel des taxes ou expiration des délais légaux."
    ]
  },

  // 13. DECLARATION OF LOSS (شهادة ضياع / DÉCLARATION DE PERTE)
  {
    keywords: ['perte', 'dhaya3', 'chhedet dhaya3', 'dha3etli', 'ضاع', 'شهادة ضياع', 'سرقة'],
    title: "Déclaration de Perte de Document Officiel (Chhedet Dhaya3)",
    authority: "Poste de Police ou Brigade de la Garde Nationale du lieu de la perte",
    statutoryCost: "5 DT (Timbre fiscal)",
    delay: "Immédiat au commissariat",
    derjaSummary: "Ki tdhi3lek CIN, passeport, permis, walla carte grise, lezmek direct temchi l'a9reb markez police t3awed t'declarer dhaya3, t5allas timbre 5 DT, w tekhou Chhedet Dhaya3 bech tnajjem t'talla3 wathi9a jdida.",
    requiredDocuments: [
      "Justificatif d'identité (ou extrait de naissance si la CIN a été perdue)",
      "Numéro du document perdu (si connu)",
      "Timbre fiscal de 5 DT"
    ],
    steps: [
      "Se présenter au poste de police ou brigade de garde nationale compétent",
      "Déclarer les circonstances et la date approximative de la perte ou du vol",
      "Faire viser la déclaration et obtenir l'attestation originale portant le cachet du commissariat"
    ],
    proTips: [
      "L'attestation de perte originale est obligatoire pour déposer un dossier de renouvellement de document perdu."
    ]
  },

  // 14. BIRTH CERTIFICATE ONLINE (MADHMOUN WILADA / مضمون ولادة)
  {
    keywords: ['madhmoun', 'naissance', 'hala madaniya', 'wilada', 'مضمون', 'ولادة', 'مضمون ولادة'],
    title: "Extrait de Naissance (Madhmoun Wilada)",
    authority: "Toutes les municipalités de Tunisie (Baladiya) ou Plateforme Nationale madhmoun.tn",
    statutoryCost: "1 DT (Au guichet de la Baladiya) / ~2 DT (En ligne avec signature électronique certifiée)",
    delay: "Immédiat au guichet / Téléchargement instantané en ligne",
    derjaSummary: "Madhmoun el wilada tnejjem tkharrjou men ay baladiya fi tounes kemla (mouch lezem blaset el wilada) b'1 DT, walla online men site madhmoun.tn b'signature électronique.",
    requiredDocuments: [
      "Numéro de CIN ou nom complet, date et lieu de naissance, noms des parents"
    ],
    steps: [
      "Se présenter au guichet d'état civil de n'importe quelle Baladiya",
      "Ou se connecter à madhmoun.tn, payer par e-Dinar/carte bancaire et télécharger le PDF sécurisé avec QR code"
    ],
    proTips: [
      "Le madhmoun extrait en ligne avec cachet électronique visible (QR Code certifié par TunTrust) a la même valeur juridique que l'extrait papier délivré au guichet."
    ]
  },

  // 15. CNSS RETRAITE & PENSION DE VIEILLESSE
  {
    keywords: ['retraite', 'pension', 'cnss', 'vieillesse', 'ta9a3od', 'تقاعد', 'شيخوخة', 'جراية', 'trimestres'],
    title: 'Pension de Retraite et Vieillesse (CNSS)',
    authority: 'Caisse Nationale de Sécurité Sociale (Bureau Régional CNSS)',
    statutoryCost: '0 DT (Service public gratuit)',
    delay: '30 à 60 jours',
    derjaSummary: "Bech te5ou jarrayet el retraite fel CNSS, lezem tkoun wassalt 60 sne (walla 50 sne retraite anticipée b'180 trimestres) w 3andek au moins 120 trimestres déclarés. Tsob dossier fih formulaire CNSS, relevé de carrière, chhadet in9ita3 men 3and el batron, w RIB.",
    requiredDocuments: [
      "Formulaire officiel de demande de pension de vieillesse CNSS",
      "Relevé de carrière CNSS certifié justifiant d'au moins 120 trimestres de cotisation",
      "Certificat de cessation de travail délivré par le dernier employeur",
      "Copie certifiée conforme de la CIN",
      "Extrait de naissance original récent (< 3 mois)",
      "Relevé d'identité bancaire ou postal (RIB) original pour le virement mensuel"
    ],
    steps: [
      "Vérifier le relevé des trimestres cotisés sur le portail e-cnss.tn ou au guichet",
      "Obtenir l'attestation de cessation de travail auprès de son employeur",
      "Déposer le dossier complet au bureau régional de la CNSS et retirer le récépissé",
      "Percevoir le premier virement de liquidation sous 30 à 60 jours"
    ],
    proTips: [
      "Si vous n'avez pas atteint 120 trimestres à 60 ans, vous pouvez continuer à cotiser jusqu'à 65 ans ou demander un rachat de trimestres (Tadawol).",
      "Le montant de la pension correspond à 40% du salaire moyen des 10 meilleures années pour les premiers 120 trimestres, majoré de 0.5% par trimestre supplémentaire (plafonné à 80%)."
    ]
  },

  // 16. CNAM CARNET DE SOINS & AFFILIATION
  {
    keywords: ['cnam', 'carnet', 'soins', 'filière', 'maladie', 'assurance', 'كنام', 'تأمين', 'صحة', 'علاج', 'طبيب العائلة'],
    title: 'Carnet de Soins CNAM & Choix de Filière',
    authority: 'Caisse Nationale d’Assurance Maladie (Centre Régional CNAM)',
    statutoryCost: '0 DT (Couverture sociale obligatoire)',
    delay: '15 à 30 jours',
    derjaSummary: "Kol 5addam 3andou el 7a9 fi carnet CNAM. Tnejjem ta5tar bin 3 filières: Publique (sbitarat), Privée (Tbib el 3ayla w tiers-payant pharmacie), walla Remboursement (t5allas w CNAM traja3lek 70%). Tsob dossier fih attestation CNSS, formulaire filière, copie CIN, w RIB.",
    requiredDocuments: [
      "Formulaire d'adhésion et choix de filière de soins CNAM",
      "Attestation d'affiliation récente délivrée par la CNSS ou CNRPS",
      "Copie conforme de la CIN de l'assuré",
      "Extraits de naissance des ayants droit (conjoint non travailleur et enfants < 20 ans)",
      "Relevé d'identité bancaire ou postal (RIB)"
    ],
    steps: [
      "Choisir sa filière de soins (Filière publique, privée avec médecin de famille référent, ou remboursement)",
      "Déposer le formulaire d'adhésion au centre CNAM le plus proche",
      "Retirer le carnet de soins validé pour l'année en cours"
    ],
    proTips: [
      "Le changement de filière de soins n'est autorisé qu'une fois par an, durant la période légale du 1er septembre au 31 octobre.",
      "En cas d'Affection Prise en Charge Intégralement (APCI - maladies chroniques), le taux de couverture passe à 100% sans plafond annuel."
    ]
  },

  // 17. PERMIS DE BÂTIR MUNICIPAL (BALADIYA)
  {
    keywords: ['batir', 'construire', 'bnina', 'maison', 'villa', 'permis', 'rokhsa', 'بناء', 'رخصة', 'عمارة', 'دار'],
    title: 'Permis de Bâtir Municipal (Baladiya)',
    authority: 'Municipalité (Baladiya) — Service Urbanisme et Bâtiment',
    statutoryCost: '50 à 200 DT (Droits municipaux et taxes d’urbanisme)',
    delay: '45 jours (Délai légal d’instruction)',
    derjaSummary: "Bech tebni dar walla tzid étage, lezem te5ou rokhset bné mel Baladiya. Lezem dossier fih plans d'architecte agréé (5 copies), chhadet melkiya (titre foncier CPF), plan de situation, w quittance khlas zebla w kharrouba. El Baladiya 3andha 45 jours delai legal bech tjeweb.",
    requiredDocuments: [
      "Demande de permis de bâtir sur formulaire municipal",
      "Certificat de propriété récent (شهادة ملكية) délivré par la CPF",
      "Plans d'architecture complets visés par un architecte agréé à l'Ordre (5 exemplaires)",
      "Plan de situation (1/2000) et plan de masse côté (1/500)",
      "Quittance de paiement de la taxe sur les immeubles bâtis (TIB - الزبلة والخروبة)",
      "Attestation d'alignement délivrée par les services techniques municipaux"
    ],
    steps: [
      "Faire élaborer les plans par un architecte agréé conformément au Plan d'Aménagement Urbain (PAU)",
      "Régler la taxe des immeubles à la Recette des Finances et obtenir le titre foncier à la CPF",
      "Déposer le dossier complet au Bureau d'Ordre de la Baladiya et exiger le reçu daté",
      "Suivi de la commission technique municipale et retrait de l'arrêté de permis de bâtir sous 45 jours"
    ],
    proTips: [
      "Selon l'Article 70 du Code de l'Urbanisme, le silence de la municipalité pendant 45 jours à compter du dépôt complet vaut approbation tacite du permis de bâtir.",
      "Le permis de bâtir est valable pour une durée de 3 ans, renouvelable une seule fois sur demande motivée."
    ]
  },

  // 18. SONEDE BRANCHEMENT EAU POTABLE
  {
    keywords: ['sonede', 'eau', 'ma', 'mé', 'branchement', 'compteur', 'ماء', 'سوناد', 'عداد'],
    title: 'Branchement & Nouvel Abonnement SONEDE (Eau Potable)',
    authority: 'Société Nationale d’Exploitation et de Distribution des Eaux (District SONEDE)',
    statutoryCost: '200 à 500 DT (Selon métrage et devis technique)',
    delay: '15 à 30 jours',
    derjaSummary: "Bech tda55al compteur mé SONEDE, tsob dossier fel district fih rokhset bné walla chhadet melkiya, copie CIN, plan de situation, w tarkhis 7afr mel baladiya ken el kayes yetmass. Technicien SONEDE yji ya3mel visite w ya3tik devis khlas.",
    requiredDocuments: [
      "Formulaire de demande de branchement SONEDE",
      "Copie de la CIN du propriétaire",
      "Titre de propriété enregistré ou contrat de bail",
      "Copie du permis de bâtir ou certificat de conformité des travaux",
      "Plan de situation côté indiquant l'emplacement exact de la construction",
      "Autorisation municipale de tranchée sur voirie publique si nécessaire"
    ],
    steps: [
      "Déposer le dossier complet au district SONEDE territorialement compétent",
      "Visite technique sur site de l'agent SONEDE et établissement du devis de raccordement",
      "Paiement du montant du devis à la caisse du district SONEDE",
      "Intervention de l'équipe technique pour pose du compteur et raccordement au réseau public"
    ],
    proTips: [
      "Si la canalisation principale se trouve de l'autre côté de la chaussée, anticipez l'autorisation municipale de voirie pour éviter des retards de plusieurs semaines."
    ]
  },

  // 19. TITRE FONCIER & CONSERVATION FONCIÈRE (CPF)
  {
    keywords: ['titre', 'foncier', 'cpf', 'propriete', 'immeuble', 'terrain', 'ملكية', 'عقار', 'رسم', 'عقاري', 'titre bleu'],
    title: 'Extrait de Titre Foncier (Conservation de la Propriété Foncière - CPF)',
    authority: 'Conservation de la Propriété Foncière (CPF — إدارة الملكية العقارية)',
    statutoryCost: '15 DT (Par extrait de titre)',
    delay: '24 à 48 heures (ou instantané sur cpf.tn)',
    derjaSummary: "Chhadet el Melkiya (Extrait de titre foncier) t5arrajha b'nomrou el rasm el 3a9ari (titre bleu) soit mel guichet CPF soit direct men site cpf.tn b'carte bancaire b'15 DT. Tethbet chkoun el malek w ken fih rahina walla o9la.",
    requiredDocuments: [
      "Formulaire de demande d'extrait mentionnant le numéro et nom du titre foncier",
      "Copie de la CIN du demandeur"
    ],
    steps: [
      "Identifier le numéro exact du titre foncier sur l'acte notarié ou contrat précédent",
      "Commander l'extrait en ligne sur cpf.tn ou se présenter au guichet régional de la CPF",
      "Payer les droits de quittance de 15 DT et télécharger ou retirer le document signé électroniquement"
    ],
    proTips: [
      "L'extrait délivré en ligne sur cpf.tn comporte un QR Code sécurisé de vérification TunTrust et a la même valeur juridique que l'extrait délivré au guichet."
    ]
  },

  // 20. AUTORISATION D'EXERCICE COMMERCIAL (BALADIYA)
  {
    keywords: ['commerce', 'local', 'magasin', 'patente', '7anout', 'محل', 'تجاري', 'رخصة', 'باتيندة'],
    title: 'Autorisation d’Exercice Commercial & Ouverture de Local (Baladiya)',
    authority: 'Municipalité (Baladiya) — Service des Affaires Économiques',
    statutoryCost: '30 à 80 DT (Taxe municipale d’autorisation)',
    delay: '15 à 30 jours',
    derjaSummary: "Bech t7ell 7anout walla local commercial, lezem te5ou tarkhis mel Baladiya. Tsob dossier fih 3a9d kré msajjal walla chhadet melkiya, copie patente men el 9badha, w certif protection civile ken el nachat fih public. Commission el hifdh el se77i tji tchouf el local 9bal el rokhsa.",
    requiredDocuments: [
      "Demande d'autorisation d'ouverture sur formulaire municipal",
      "Contrat de bail commercial enregistré à la Recette ou titre de propriété",
      "Copie de la carte d'identification fiscale (Patente)",
      "Certificat de conformité et sécurité de la Protection Civile (pour ERP)",
      "Copie de la CIN de l'exploitant"
    ],
    steps: [
      "Effectuer la déclaration d'existence et obtenir la patente à la Recette des Finances",
      "Déposer le dossier complet au service économique de la Baladiya",
      "Visite d'inspection de la commission municipale d'hygiène et de sécurité",
      "Retrait de l'arrêté municipal d'autorisation d'ouverture"
    ],
    proTips: [
      "Depuis le Décret n° 2018-417, de nombreuses activités commerciales et de services ne nécessitent plus d'autorisation préalable mais un simple dépôt de cahier des charges signé."
    ]
  },

  // 21. PERMIS DE CONDUIRE INTERNATIONAL (TOURING CLUB)
  {
    keywords: ['permis international', 'conduire international', 'touring club', 'tct', 'voyage permis', 'سياقة دولية', 'رخصة دولية'],
    title: 'Permis de Conduire International (Touring Club de Tunisie)',
    authority: 'Touring Club de Tunisie (TCT)',
    statutoryCost: '30 DT (Droits de délivrance et adhésion TCT) + 5 DT photos',
    delay: '24 à 48 heures (ou sur place au siège)',
    derjaSummary: "El Permis International y5allik tsou9 karhba fel kharej fi akther men 150 bled. Yetsallam mel Touring Club de Tunisie (Rue de Hollande Tunis walla agences). Lezem permis tounsi asly, copie CIN, 2 tsawer fond blanc, w 35 DT. Salou7iyyetou 1 an.",
    requiredDocuments: [
      "Permis de conduire tunisien original en cours de validité + Copie",
      "Copie de la CIN du demandeur",
      "2 Photos d'identité récentes identiques sur fond blanc",
      "Formulaire officiel de demande du Touring Club de Tunisie"
    ],
    steps: [
      "Rassembler les pièces justificatives et photos conformes",
      "Se présenter au siège du Touring Club (Rue de Hollande, Tunis) ou bureau régional",
      "Payer les frais de 30 DT et retirer le livret international sous 24 à 48 heures"
    ],
    proTips: [
      "Le permis international n'est valable à l'étranger qu'accompagné obligatoirement de votre permis national tunisien original."
    ]
  },

  // 22. RÉGULARISATION DOUANIÈRE VÉHICULE RS
  {
    keywords: ['douane rs', 'regularisation', 'serie rs', 'importation voiture', 'fcr rs', 'ديوانة', 'سيارة', 'استيراد', 'ن.ت'],
    title: 'Régularisation Douanière Véhicule Importé (Série RS vers TU)',
    authority: 'Direction Générale des Douanes & ATTT',
    statutoryCost: 'Variable (Droits de douane calculés selon valeur argus et cylindrée) + 50 DT carte grise TU',
    delay: '15 à 30 jours',
    derjaSummary: "El karhba série RS ma tnejjemch tbi3ha ken ma t5allas diwanetha. Fel amnisties fiscales, el dawla t5afadh el diwana l'35% walla 40%. Tsob dossier fel bureau des douanes, t5allas, te5ou chhadet ifraj diwani, w tbadal carte grise fi ATTT l'série TU.",
    requiredDocuments: [
      "Carte grise originale du véhicule série RS",
      "Passeport du propriétaire avec l'ensemble des cachets douaniers d'entrée/sortie",
      "Demande de régularisation douanière sur formulaire officiel",
      "Copie de la CIN du propriétaire"
    ],
    steps: [
      "Déposer la demande au bureau régional des douanes pour liquidation des droits",
      "Régler le montant des droits et taxes à la Recette des Douanes et retirer le certificat d'apurement",
      "Présenter le certificat d'apurement au centre ATTT pour immatriculation en série normale TU"
    ],
    proTips: [
      "Surveillez les lois de finances annuelles qui accordent régulièrement des régimes dérogatoires avec réduction de 60% à 70% des droits de douane pour la régularisation des véhicules RS."
    ]
  },

  // 23. LÉGALISATION DE SIGNATURE & COPIE CONFORME (BALADIYA)
  {
    keywords: ['legalisation', 'signature', 'imdha', 'conforme', 'copie', 'baladiya', 'ta3rif', 'تعريف بالإمضاء', 'مطابقة للأصل', 'بلدية'],
    title: 'Légalisation de Signature & Copie Conforme (Baladiya)',
    authority: 'Municipalité (Baladiya) ou Délégation / Imadat',
    statutoryCost: '3 DT (Par signature ou certification de copie conforme)',
    delay: '10 à 15 minutes au guichet',
    derjaSummary: "El Ta3rif bel Imdha2 ysir fi ay Baladiya fi tounes. Lezem t7adher el wathi9a non signée, CIN aslye, w tsa7a7 9oddém el 3awn. Mamnou3 el ta3rif 3la awra9 baydha2 walla 3ou9oud m5alfa lel 9anoun. El ma3loum 3 DT.",
    requiredDocuments: [
      "Document à légaliser (non signé à l'avance, signature devant l'officier)",
      "Carte d'Identité Nationale (CIN) originale en cours de validité du signataire",
      "Document original (en cas de demande de copie certifiée conforme)"
    ],
    steps: [
      "Se présenter physiquement au guichet de légalisation de la Baladiya avec sa CIN",
      "Signer le document et le registre d'état civil en présence de l'officier",
      "Payer le timbre municipal de 3 DT et récupérer le document cacheté et visé"
    ],
    proTips: [
      "La légalisation de signature sur des documents rédigés en langue étrangère exige que l'officier comprenne la langue ou qu'une traduction assermentée soit fournie.",
      "Pour les concours publics de la fonction publique, la certification de conformité des copies de diplômes n'est plus exigée au premier tour (Décret n° 2014-4030)."
    ]
  },

  // 24. HOJJET WAFET & PARTAGE SUCCESSORAL (HÉRITAGE)
  {
    keywords: ['wafet', 'heritage', 'irth', 'deces', 'adoul', 'succession', 'terka', 'hojja', 'وفاة', 'إرث', 'حجة', 'تركة', 'عدول'],
    title: 'Certificat de Décès (Hojjet Wafet) & Partage Successoral',
    authority: 'Adoul Ichhad (Notaires) & Tribunal de Première Instance (Juge Cantonal)',
    statutoryCost: '35 DT (Honoraires réglementés des notaires) + 10 DT enregistrement',
    delay: '7 à 15 jours',
    derjaSummary: "Hojjet el Wafet hiya el war9a el wa7ida elli tethbet chkoun el ouratha mte3 el mayyet w fardh kol wa7ed. Tetkattab 3and 2 3doul ichhed b'7odhwr 2 chhoud ya3rfou el 3ayla, ba3d tsajjalha fel 9badha w tsadde9ha fel Ma7kama bech te9sem el terka walla t7ell el compte bancaire.",
    requiredDocuments: [
      "Extrait de décès original du défunt délivré par la Baladiya",
      "Extraits de naissance de l'ensemble des héritiers légitimes",
      "Acte de mariage du défunt ou livret de famille",
      "2 Témoins majeurs munis de leurs CIN originales, connaissant parfaitement la filiation de la famille"
    ],
    steps: [
      "Collecter l'extrait de décès et les actes d'état civil de tous les héritiers",
      "Se rendre chez deux notaires (Adoul Ichhad) accompagnés de deux témoins pour dresser l'acte",
      "Enregistrer la Hojja à la Recette des Finances et la soumettre à l'homologation du juge cantonal"
    ],
    proTips: [
      "La Hojjet Wafet est strictement obligatoire pour débloquer les comptes bancaires ou postaux du défunt et pour transférer la propriété des biens immobiliers auprès de la CPF."
    ]
  },

  // 25. DÉCLARATION DE NAISSANCE (BALADIYA)
  {
    keywords: ['naissance', 'wilada', 'bébé', 'etat civil', 'madhmoun', 'mouloud', 'ولادة', 'تصريح', 'مضمون', 'مولود', 'تسجيل'],
    title: 'Déclaration de Naissance & Inscription à l’État Civil (Baladiya)',
    authority: 'Municipalité (Baladiya) — Bureau de l’État Civil',
    statutoryCost: '0 DT (Inscription gratuite) + 0.500 DT par extrait',
    delay: '15 minutes (Délai légal impératif : 10 jours)',
    derjaSummary: "Kol mawloud lezem ytsajjal fel Baladiya fi ajel 10 ayem mel wilada. El bou walla el omm yhezzo chhadet el wilada mel sbitar/clinique, livret de famille walla 3a9d zawaj, w CIN. Ken tfout 10 ayem lezem 7okm 9adha2i mel Ma7kama.",
    requiredDocuments: [
      "Certificat médical d'accouchement original délivré par l'hôpital ou la clinique",
      "Livret de famille ou extrait de l'acte de mariage des parents",
      "CIN originale du déclarant (père, mère ou personne habilitée)"
    ],
    steps: [
      "Récupérer l'attestation de naissance à la maternité",
      "Se présenter au service d'état civil de la Baladiya du lieu de naissance dans les 10 jours",
      "Enregistrer le prénom du nouveau-né et retirer immédiatement les premiers extraits de naissance"
    ],
    proTips: [
      "Le prénom choisi ne doit pas porter atteinte aux bonnes mœurs ni créer de confusion sur la nationalité ou la religion de l'enfant (Loi n° 57-3)."
    ]
  },

  // 26. ÉQUIVALENCE DES DIPLÔMES ÉTRANGERS (MESRS)
  {
    keywords: ['equivalence', 'diplome etranger', 'universite etrangere', 'mesrs', 'homologation', 'معادلة', 'شهادة أجنبية', 'جامعة بالخارج'],
    title: 'Équivalence des Diplômes Universitaires Étrangers (MESRS)',
    authority: 'Ministère de l’Enseignement Supérieur et de la Recherche Scientifique',
    statutoryCost: '20 DT (Frais de dossier) + traductions assermentées',
    delay: '60 à 90 jours',
    derjaSummary: "Bech t5addem diplôme 5dhitou men jame3a fel kharej fel wadhifa el 3oumoumiya walla les concours, lezem ta3mallou Mo3adala fi Wizarat el Ta3lim el 3ali. El candidature tebda en ligne 3al site mesrs.tn, ba3d thot dossier fih diplôme légalisé/apostille, relevés de notes kemlin, w tarjama mou7allefa.",
    requiredDocuments: [
      "Formulaire officiel de demande d'équivalence saisi sur mesrs.tn",
      "Copie certifiée conforme du diplôme étranger avec apostille ou visa consulaire",
      "Relevés de notes originaux certifiés pour toutes les années d'études supérieures",
      "Copie conforme du Baccalauréat tunisien ou titre admis en équivalence",
      "Traduction assermentée en arabe ou français si le diplôme est rédigé dans une autre langue"
    ],
    steps: [
      "Créer un compte et saisir le cursus d'études sur la plateforme en ligne mesrs.tn",
      "Déposer ou envoyer par lettre recommandée le dossier physique complet au Bureau d'Ordre du MESRS",
      "Suivre l'instruction de la commission sectorielle et retirer l'attestation d'équivalence officielle"
    ],
    proTips: [
      "Les diplômes délivrés par des institutions étrangères non reconnues par l'État d'origine ou obtenus via des formations 100% en ligne non accréditées sont systématiquement rejetés par la Commission."
    ]
  },

  // 27. BOURSES & PRÊTS UNIVERSITAIRES (OOUS)
  {
    keywords: ['bourse', 'pret universitaire', 'oous', 'ooun', 'oouc', 'etudiant', 'menha', 'منحة', 'قرض جامعي', 'طالب', 'ديوان الخدمات الجامعية'],
    title: 'Bourses et Prêts Universitaires Nationaux (Offices des Œuvres Universitaires)',
    authority: 'Office des Œuvres Universitaires (OOUN / OOUC / OOUS)',
    statutoryCost: '0 DT (Candidature et octroi 100% gratuits)',
    delay: '30 à 45 jours',
    derjaSummary: "El talaba 3andhom el 7a9 ysobbo matloub men7a jam3iya (bourse) walla 9ardh fel Office mte3houm (Nord, Centre, Sud). El candidature tsir 100% en ligne ba3d el tawjih. El critère houwa da5l el walidin (IRPP) w 3addad el ekhwa fel 3ayla. El men7a tetsabb kol trimestre 3al compte.",
    requiredDocuments: [
      "Fiche de candidature imprimée et signée depuis le portail de l'Office universitaire",
      "Copie certifiée conforme de l'attestation d'orientation ou d'inscription universitaire",
      "Déclaration de revenus des parents délivrée par la Recette des Finances (IRPP)",
      "Attestation d'affiliation ou de non-affiliation CNSS/CNRPS des deux parents",
      "Relevé d'identité bancaire ou postal (RIB) au nom de l'étudiant demandeur"
    ],
    steps: [
      "Remplir la candidature en ligne sur le portail de l'Office de votre circonscription (ooun.rnu.tn / oouc.rnu.tn / oous.rnu.tn)",
      "Constituer le dossier physique avec toutes les justifications de revenus",
      "Envoyer le dossier par lettre recommandée (Rapide Poste) avant la date limite officielle",
      "Consulter les résultats d'attribution en ligne et percevoir les versements trimestriels"
    ],
    proTips: [
      "Les étudiants orphelins, handicapés ou dont les deux parents sont sans emploi bénéficient d'une bonification de points prioritaire dans le barème national d'attribution."
    ]
  },

  // 28. PRIVILÈGE FISCAL FCR POUR LES TUNISIENS À L'ÉTRANGER (DOUANE)
  {
    keywords: ['fcr', 'tre', 'douane voiture', 'importation voiture', 'rs', 'تغيير إقامة', 'ديوانة', 'سيارة ن.ت', 'امتياز جبائي'],
    title: 'Privilège Fiscal FCR (Franchise Changement de Résidence) — Véhicules TRE',
    authority: 'Direction Générale des Douanes Tunisiennes (douane.gov.tn)',
    statutoryCost: '0 DT (Régime RS) ou 25% à 30% des droits de douane pour immatriculation TU normale',
    delay: '3 à 7 jours au port de débarquement ou bureau régional',
    derjaSummary: "El FCR houwa el imtiyez el jibé2i elli ya3tih el 9anoun lel twensa el 9atnin fel kharej (TRE) bech ydakhlou karhba l tounes. El chourout: 2 ans d'i9ama fel kharej bla ma t3addi akther men 120 jours fi tounes par an, w 3mor el karhba ma yfoutsh 5 ans (tourisme) walla 7 ans (utilitaire). 3andek 2 choix: Régime Suspensif (RS / ن.ت) ma t5allash diwana ama ma tbi3hash, walla t5allas 25% diwana w tekhou plaque TU 3adiya tbi3ha wa9t ma t7ebb.",
    requiredDocuments: [
      "Passeport tunisien original avec l'ensemble des cachets de voyage d'entrée et sortie",
      "Copie de la carte de séjour étrangère valide ou titre d'identité étranger",
      "Carte grise originale du véhicule au nom de l'expatrié ou certificat d'immatriculation étranger",
      "Facture d'achat d'origine pour les véhicules neufs ou certificat d'expertise argus pour véhicules d'occasion",
      "Formulaire officiel de demande de privilège FCR (rempli auprès des services douaniers)",
      "Certificat d'identification technique délivré par l'ATTT au port d'entrée"
    ],
    steps: [
      "Vérifier le respect strict des 2 ans de séjour à l'étranger et du quota max de 120 jours/an en Tunisie",
      "Débarquer le véhicule au port (La Goulette, Zarzis...) avec le permis de circulation temporaire (Diptyque)",
      "Déposer le dossier de dédouanement FCR au bureau des douanes compétent",
      "Choisir l'option de liquidation : RS (franchise totale) ou paiement de 25%/30% des taxes pour série normale TU",
      "Retirer le certificat de dédouanement et procéder à l'immatriculation définitive auprès de l'ATTT"
    ],
    proTips: [
      "Depuis la loi de finances 2024-2025, les véhicules immatriculés sous le régime RS (ن.ت) peuvent être régularisés après un an par le paiement de 25% des droits de douane pour devenir librement cessibles en série TU normale."
    ]
  },

  // 29. DIVORCE, PENSION ALIMENTAIRE & GARDE DES ENFANTS
  {
    keywords: ['divorce', 'tala9', 'nafa9a', 'hadhana', 'famille', 'طلاق', 'نفقة', 'حضانة', 'محكمة', 'قاضي الأسرة'],
    title: 'Procédures de Divorce, Pension Alimentaire & Garde des Enfants',
    authority: 'Tribunal de Première Instance — Juge de la Famille (قاضي الأسرة)',
    statutoryCost: 'Frais d’avocat (selon convention) + 30 DT timbres de plaidoirie + 15 DT enregistrement jugement',
    delay: '2 à 6 mois (Divorce par consentement) / 6 à 18 mois (Divorce pour préjudice / Caprice)',
    derjaSummary: "El Tala9 fi tounes 3andou 3 anwé3 7asb Majallat el A7wal el Chakhsiya (Art. 31): Tala9 bel taradhi (consentement), Tala9 incha2 (be talab men a7ad el zawjayn), w Tala9 lel dharar (faute/préjudice). Avocat obligatoire. El 9adhi ya3mel 3 jalasat sol7iya obligatoires ken famma sghar. El omm 3andha el awlawiya fel 7adhana, wel bou yalzem yedfa3 el nafa9a w sakan el 7adhana. Ken el bou ma y5allash, el omm tekhou floussha men Sandou9 Dhamen el Nafa9a fel CNSS.",
    requiredDocuments: [
      "Extrait de l'acte de mariage original récent (< 3 mois)",
      "Extraits de naissance de l'ensemble des enfants mineurs (< 3 mois)",
      "Requête introductive d'instance rédigée et signée par un avocat inscrit au Barreau",
      "Justificatifs de revenus des conjoints (fiches de paie, relevés bancaires, déclarations fiscales IRPP)",
      "Preuves documentées en cas de divorce pour faute/préjudice (constats d'huissier, certificats médicaux, PV police)"
    ],
    steps: [
      "Désigner un avocat pour déposer la requête en divorce auprès du greffe du Tribunal de Première Instance",
      "Assister obligatoirement aux séances de conciliation (Jalasat Sol7iya) devant le Juge de la Famille",
      "Ordonnance de référé fixant les mesures provisoires (garde, pension alimentaire d'urgence, droit de visite)",
      "Plaidoirie sur le fond et prononcé du jugement de divorce fixant la pension et les rentes compensatoires",
      "Transcription officielle du divorce sur les registres d'état civil de la Baladiya par le greffier"
    ],
    proTips: [
      "Le non-paiement de la pension alimentaire fixée par jugement exécutoire constitue un délit pénal d'abandon de famille passible de prison ferme (Art. 53 bis CSP)."
    ]
  },

  // 30. DROIT DU TRAVAIL, CONTRATS & LICENCIEMENT ABUSIF
  {
    keywords: ['travail', 'licenciement', 'tard', 'khedma', 'inspection travail', 'smig', 'شغل', 'طرد', 'عقد عمل', 'تفقدية الشغل', 'قانون الشغل'],
    title: 'Droit du Travail : Contrats (CDI/CDD/SIVP), Licenciement Abusif & Indemnités',
    authority: 'Inspection du Travail (تفقدية الشغل) & Conseil des Prud’hommes (الدائرة الشغلية بالمحكمة)',
    statutoryCost: '0 DT (Procédure gratuite à l’Inspection et devant le tribunal de travail sans timbre fiscal)',
    delay: '15 jours à l’Inspection / 6 à 12 mois devant la chambre prud’homale',
    derjaSummary: "Majallat el Choghl el Tounsiya ta7mi el 5addem men el tard el ta3assoufi. Ken tarrdouk bla faute grave: 3andek el 7a9 fi Préavis (chhar walla chharin m5alsin), Indemnité de fin de service (nhar 3la kol chhar khedma fel 7oudoud mte3 3 chhour salaire), w Ghrémet el Tard el Ta3assoufi (men chhar l'2 chhour salaire 3la kol 3am khedma, max 36 chhour). Lezem temshi direct l'Tafaqoudiyat el Choghl fi dharf 15 jours bech ta3mel chkwaya w ma yti7esh 7a9ek.",
    requiredDocuments: [
      "Contrat de travail original (CDI, CDD, CIVP/SIVP) ou attestation de travail",
      "Lettre de notification de licenciement écrite remise par l'employeur",
      "Bulletins de paie des 12 derniers mois de travail",
      "Historique des cotisations CNSS (Relevé de carrière CNSS)",
      "Lettre de réclamation déposée auprès de l'Inspection Régionale du Travail"
    ],
    steps: [
      "Déposer une plainte auprès de l'Inspection du Travail territorialement compétente",
      "Séance de conciliation contradictoire entre l'employeur et l'employé convoquée par l'inspecteur",
      "En cas d'échec de la conciliation, rédaction du Procès-Verbal de non-conciliation officiel",
      "Saisine de la Chambre des Prud'hommes du Tribunal de Première Instance pour réclamer l'ensemble des indemnités légales"
    ],
    proTips: [
      "Tout licenciement verbal sans lettre recommandée motivée avec accusé de réception est automatiquement qualifié d'abusif par la jurisprudence tunisienne."
    ]
  },

  // 31. RETRAITE CNRPS — SECTEUR PUBLIC
  {
    keywords: ['cnrps', 'retraite fonctionnaire', 'wadhifa', 'te9a3od', 'تقاعد عمومي', 'وظيفة عمومية', 'جراية تقاعد'],
    title: 'Pension de Retraite du Secteur Public (CNRPS)',
    authority: 'Caisse Nationale de Retraite et de Prévoyance Sociale (CNRPS)',
    statutoryCost: '0 DT (Gratuit)',
    delay: '30 à 60 jours',
    derjaSummary: "El Retraite mte3 el fonctionnaires fel wadhifa el 3oumoumiya tetsabb mel CNRPS. El 3mor el 9anouni houwa 62 ans (Loi 2019-37), w ynejjem yousel l'65 ans sur demande lel asatdha el jame3iyin wel 9odhat. El chort: 15 ans de service validé minimum. El jréya tet7seb: 2% 3la kol 3am fel 10 snin lowlin + 3% 3la kol 3am ba3d, plafonné l'90% men e5er salaire brut khdhitou.",
    requiredDocuments: [
      "Formulaire officiel de liquidation de pension de retraite CNRPS",
      "Arrêté de mise à la retraite ou de cessation de fonction signé par le ministère de tutelle",
      "Relevé de carrière récapitulatif délivré par l'administration d'origine",
      "Copie de la Carte d'Identité Nationale (CIN) certifiée",
      "Extrait de naissance original du retraité (< 3 mois)",
      "Relevé d'Identité Bancaire ou Postal (RIB) original"
    ],
    steps: [
      "L'administration employeuse transmet le dossier administratif complet à la CNRPS 6 mois avant la date de départ",
      "Contrôle de validation des années de cotisations et calcul des droits à pension par la commission CNRPS",
      "Notification du montant mensuel de la pension et versement direct sur le compte bancaire/postal"
    ],
    proTips: [
      "Les agents de police, protection civile et douane bénéficient d'un départ anticipé à la retraite dès l'âge de 57 ans avec jouissance immédiate de la pension."
    ]
  },

  // 32. CARTE DE RÉSIDENCE POUR ÉTRANGERS EN TUNISIE
  {
    keywords: ['etranger', 'sejour', 'residence tunisie', 'ajnabi', 'i9ama', 'إقامة', 'أجانب', 'بطاقة إقامة', 'شرطة الأجانب'],
    title: 'Carte de Séjour & Titre de Résidence pour Étrangers en Tunisie',
    authority: 'Direction des Frontières et des Étrangers — Commissariat de Police de secteur',
    statutoryCost: '15 DT (Étudiants / stagiaires) / 150 DT (Travailleurs salariés, investisseurs et conjoints de Tunisiens)',
    delay: '15 à 45 jours (Délivrance d’un récépissé provisoire immédiat)',
    derjaSummary: "Ay ajnabi y7eb yosken fi tounes akther men 90 jours lezem ya3mel Carte de Séjour fel markez mte3 el police (bureau des étrangers). Famma plusieurs motifs: 9raya (inscription jame3a), 5edma (contrat msa7a7 men Wizarat el Tachghil), investissement (patente w RNE), walla zawaj b mouwaten tounsi. El visa d'entrée lezem tkoun en règle 9bal ma ykammel el 90 jours.",
    requiredDocuments: [
      "Passeport en cours de validité avec cachet d'entrée régulier sur le territoire tunisien (< 90 jours)",
      "Contrat de bail enregistré à la Recette des Finances ou titre de propriété du logement",
      "Justificatif de motif : Contrat de travail visé par le Ministère de l'Emploi, certificat d'inscription universitaire, ou acte de mariage avec un conjoint tunisien",
      "Justificatifs de ressources financières (attestation bancaire en devises, virements ou fiches de paie)",
      "4 Photos d'identité récentes fond blanc",
      "Timbre fiscal de 15 DT ou 150 DT selon le statut"
    ],
    steps: [
      "Rassembler les justificatifs avant l'expiration des 3 mois de séjour touristique sans visa",
      "Déposer le dossier complet au bureau des étrangers du commissariat de police de votre résidence",
      "Recevoir le récépissé de dépôt provisoire (valable 3 mois avec droit de circulation)",
      "Retirer la carte de séjour plastifiée biométrique dès notification SMS/téléphonique"
    ],
    proTips: [
      "Dépasser la durée légale de séjour de 90 jours sans carte de séjour entraîne une pénalité financière de 20 DT par semaine de retard payable à la frontière lors du départ."
    ]
  },

  // 33. CNAM — PRISE EN CHARGE APET (MALADIES CHRONIQUES ALD 100%)
  {
    keywords: ['cnam apet', 'maladie chronique', 'ald', 'diabete', 'cancer', 'sokker', 'dhem', 'أمراض مزمنة', 'كنام', 'تكفل 100%'],
    title: 'Prise en Charge Intégrale CNAM — APET (Affections de Longue Durée / ALD 100%)',
    authority: 'Caisse Nationale d’Assurance Maladie (CNAM)',
    statutoryCost: '0 DT (Procédure 100% gratuite)',
    delay: '15 à 30 jours',
    derjaSummary: "El CNAM tetkaffel 100% b'masrouf el dwa wel tbib wel 3amaliyat mte3 el Amradh el Mozmena (ALD - Affections de Longue Durée) kima el Sokker, el Dhem el 3ali, el Cancer, Qsour el Kléwi, el Qalb... Tsob dossier fih Formulaire APET y3ammrou el tbib el spécialiste mte3ek m3a bilan complet. Ba3d ma twafe9 el commission médicale fel CNAM, yzidoulek code el maladie 3al Carnet de soins mte3ek w ywalli el dwa gratuit bla plafond.",
    requiredDocuments: [
      "Formulaire officiel de demande de prise en charge APET rempli et signé par le médecin spécialiste traitant",
      "Rapport médical détaillé et résultats complets des examens biologiques et radiologiques récents",
      "Copie de la carte de soins CNAM (Carnet de soins) en cours de validité",
      "Copie de la CIN de l'assuré social principal"
    ],
    steps: [
      "Faire remplir le protocole de soins APET par le médecin spécialiste conventionné avec la CNAM",
      "Déposer le dossier au centre CNAM de rattachement au bureau du contrôle médical",
      "Examen par le médecin-conseil de la CNAM pour validation de l'affection dans la liste des 25 ALD",
      "Réception de la décision d'accord et mise à jour de la puce du carnet de soins pour gratuité intégrale"
    ],
    proTips: [
      "Les médicaments et actes médicaux liés directement à une ALD reconnue ne sont pas décomptés du plafond annuel ordinaire de remboursement CNAM."
    ]
  },

  // 34. TITRE FONCIER & REGISTRE FONCIER (CONSERVATION DE LA PROPRIÉTÉ FONCIÈRE - CPF)
  {
    keywords: ['titre foncier', 'cpf', 'dafter khana', 'chhadet melkiya', 'rasm 3aqari', 'ملكية عقارية', 'رسم عقاري', 'شهادة ملكية', 'دفتر خانة'],
    title: 'Certificat de Propriété Immobilière & Titre Foncier (CPF — Daftat Khana)',
    authority: 'Conservation de la Propriété Foncière (CPF — cpf.gov.tn)',
    statutoryCost: '20 DT (Certificat de propriété) / 1% de la valeur vénale (Inscription contrat d’achat)',
    delay: '24 à 48 heures (En ligne sur cpf.gov.tn) / 7 jours au guichet régional',
    derjaSummary: "Chhadet el Melkiya mel Daftat Khana (CPF) hiya el wathi9a el rasmiya elli tethbet chkoun moula el dar walla el ardh w tbayyen ken famma rhen (hypothèque) walla 3o9la 3al 3aqar. Tnejjem t5arrejha en ligne fi 24h men موقع cpf.gov.tn b'20 DT. Ken chrit 3aqar fih rasm 3aqari, lezem tressmou direct fel CPF bech ywalli mte3ek 9anounan 9oddém el ness el kol.",
    requiredDocuments: [
      "Numéro exact du Titre Foncier (Rasm 3aqari) et nom de la circonscription régionale",
      "Copie de la CIN du demandeur (propriétaire, ayant droit ou mandataire)",
      "Pour inscription d'un achat : Contrat d'achat rédigé par avocat/notaire enregistré à la Recette des Finances + Quittance de paiement des droits CPF (1%)"
    ],
    steps: [
      "Accéder au portail officiel en ligne cpf.gov.tn ou se rendre à la direction régionale de la CPF",
      "Saisir le numéro du titre foncier et effectuer le paiement électronique de 20 DT par carte bancaire ou e-Dinar",
      "Télécharger instantanément le certificat de propriété numérique muni du cachet électronique QR-Code sécurisé"
    ],
    proTips: [
      "N'achetez jamais un bien immobilier sans vérifier au préalable son certificat de propriété récent auprès de la CPF pour vous assurer de l'absence de saisies conservatoires ou d'hypothèques bancaires."
    ]
  },

  // 35. CRÉATION D'ENTREPRISE SARL / SUARL (RNE & GUICHET UNIQUE APII)
  {
    keywords: ['creation societe', 'sarl', 'suarl', 'rne', 'registre commerce', 'apii', 'تأسيس شركة', 'سجل تجاري', 'سجل المؤسسات'],
    title: 'Création d’Entreprise (SARL, SUARL & SAS) — Registre National des Entreprises (RNE)',
    authority: 'Registre National des Entreprises (RNE — rne.tn) & APII / Recette des Finances',
    statutoryCost: '150 DT (Enregistrement statuts Recette) + 50 à 100 DT (Frais RNE et publication JORT)',
    delay: '48 à 72 heures au Guichet Unique ou 100% en ligne sur rne.tn',
    derjaSummary: "Bech t2asses Charka SARL walla SUARL fi tounes: Tekteb el Statuts (3a9d ta2sis) 3and mo7ami walla expert-comptable, tsajjelhoum fel 9badha (150 DT droit fixe), tsob el dossier fel RNE (en ligne 3la rne.tn walla fel Guichet Unique APII), tekhou el Identifiant Unique (Matricule Fiscal / Patente) wel Mostakhraj el Rasmi fel JORT électronique fi 48h.",
    requiredDocuments: [
      "Statuts de la société signés et paraphés en 3 exemplaires originaux",
      "Contrat de bail du siège social enregistré à la Recette ou titre de propriété",
      "Certificat de blocage du capital bancaire (si capital supérieur aux seuils statutaires)",
      "Copie des pièces d'identité (CIN ou Passeport) des associés et du gérant légal",
      "Déclaration de non-condamnation et déclaration des bénéficiaires effectifs du RNE"
    ],
    steps: [
      "Rédiger les statuts et procéder à la légalisation des signatures à la Baladiya",
      "Enregistrer les statuts auprès de la Recette des Finances compétente",
      "Déposer la demande d'immatriculation sur le portail numérique du RNE (rne.tn)",
      "Payer les frais d'insertion et télécharger l'extrait officiel du Registre de Commerce et la Patente fiscale"
    ],
    proTips: [
      "La législation tunisienne n'impose plus de capital social minimum pour les SARL/SUARL (1 DT symbolique permis par le Code des Sociétés Commerciales)."
    ]
  },

  // 36. CONTRAT DE MARIAGE & ACTE D'ÉTAT CIVIL (BALADIYA / ADOUL)
  {
    keywords: ['mariage', 'zawaj', '3a9d zawaj', 'adoul zawaj', 'ischtirak amlak', 'زواج', 'عقد زواج', 'عدول إشهاد', 'اشتراك في الأملاك'],
    title: 'Contrat de Mariage & Acte Notarié d’État Civil (Baladiya / Adoul Ichhad)',
    authority: 'Municipalité (Baladiya) ou 2 Notaires (Adoul Ichhad)',
    statutoryCost: '30 à 100 DT (Frais de célébration municipale ou honoraires des notaires) + 15 DT timbres',
    delay: 'Immédiat le jour de la signature et remise du livret de famille sous 48h',
    derjaSummary: "3a9d el Zawaj fi tounes yetsallam soit fel Baladiya 9oddém 3awn el 7ala el madaniya, soit 3and 2 3doul ichhed. El wathaye9: Chhadet tebiyya sébi9a lel zawaj (< 2 mois), madhmoun wilada (< 20 jours) lel 3roussat el zouz, CIN, w 2 chhoud kbar. Lezem t5atrou bin Nizam Fasl el Amlék (Séparation) walla Nizam el Ishtirak fel Amlék el Mabniya (Loi 98-91).",
    requiredDocuments: [
      "Extraits de naissance originaux récents portant la mention 'Célibataire' (< 20 jours)",
      "Certificats médicaux prénuptiaux officiels délivrés par un médecin assermenté (< 2 mois)",
      "Copies des Cartes d'Identité Nationale (CIN) des deux futurs époux et des 2 témoins majeurs",
      "Autorisation judiciaire délivrée par le juge de la famille si l'un des conjoints est mineur (< 18 ans)",
      "Déclaration d'option de régime matrimonial : Séparation des biens ou Communauté des biens acquêts"
    ],
    steps: [
      "Passer la visite médicale prénuptiale auprès d'un centre de santé ou médecin conventionné",
      "Déposer le dossier complet d'état civil à la Baladiya au moins 7 jours avant la date de la cérémonie",
      "Célébration officielle du mariage en présence des conjoints, de l'officier et des deux témoins",
      "Retrait de l'acte de mariage original et du Livret de Famille tunisien officiel"
    ],
    proTips: [
      "Le régime légal par défaut en droit tunisien est la séparation des biens. L'option pour le régime de l'engagement communautaire (Ishtirak) doit être expressément déclarée et consignée dans l'acte."
    ]
  },

  // 37. BRANCHEMENT ÉLECTRICITÉ & GAZ (STEG)
  {
    keywords: ['steg', 'compteur steg', 'electricite', 'gaz', 'courant', 'dhaw', 'gaz de ville', 'كهرباء', 'غاز', 'عداد', 'ربط الكهرباء'],
    title: 'Branchement et Abonnement Compteur Électricité & Gaz (STEG)',
    authority: 'Société Tunisienne de l’Électricité et du Gaz (STEG — steg.com.tn)',
    statutoryCost: 'Devis technique sur mesure (~350 à 900 DT selon puissance et distance réseau)',
    delay: '15 à 30 jours après paiement du devis',
    derjaSummary: "Bech trakkeb compteur Dhaw walla Gaz steg fel dar: Tsob dossier fih 3a9d melkiya walla 3a9d kré, rokhset bna walla chhadet motaba9a mel Baladiya, CIN, w Chhadet selémet el tarkibat el dakhiliya men 3and électricien agréé. STEG teb3ath agent ya3mel visite w ya3tik Devis t5allsou fel agence, ba3d yjiw yrakkbou el compteur.",
    requiredDocuments: [
      "Formulaire officiel de demande de raccordement rempli auprès du district STEG",
      "Titre de propriété enregistré, contrat d'achat ou contrat de location légalisé",
      "Copie conforme du Permis de bâtir ou certificat de conformité de construction délivré par la Baladiya",
      "Attestation de conformité des installations intérieures certifiée par un électricien agréé",
      "Copie de la CIN du demandeur"
    ],
    steps: [
      "Déposer le dossier au district STEG de votre circonscription",
      "Visite technique sur site par un agent métreur STEG pour évaluer le tracé et la puissance nécessaire",
      "Réception et règlement du devis de raccordement à la caisse du district",
      "Pose du compteur électrique/gaz et mise sous tension du local"
    ],
    proTips: [
      "La STEG refuse systématiquement le raccordement définitif des habitations construites sans permis de bâtir légal, sauf dérogation administrative exceptionnelle accordée par le Gouvernorat."
    ]
  },

  // 38. BRANCHEMENT EN EAU POTABLE (SONEDE)
  {
    keywords: ['sonede', 'compteur eau', 'eau potable', 'me2', 'branchement sonede', 'ماء', 'صوناد', 'عداد ماء', 'ربط الماء الصالح للشرب'],
    title: 'Branchement et Abonnement Compteur Eau Potable (SONEDE)',
    authority: 'Société Nationale d’Exploitation et de Distribution des Eaux (SONEDE — sonede.com.tn)',
    statutoryCost: 'Devis sur métrage (~250 à 650 DT selon proximité de la canalisation principale)',
    delay: '15 à 25 jours après paiement du devis',
    derjaSummary: "Bech tda5al el Me2 el صالح للشرب mel SONEDE: Tsob dossier fel district fih wathi9at melkiyet el 3aqar, rokhset el bna mel baladiya, tarkhis hafr el kayyas (autorisation de voirie) ken lezem, w CIN. SONEDE t5arraj métreur ya3mel devis, t5allas, w yjiw yrakkbou el compteur fel niche mte3ek.",
    requiredDocuments: [
      "Demande d'abonnement sur formulaire fourni par le district SONEDE",
      "Justificatif de propriété du local (Titre foncier, contrat de vente enregistré, contrat de bail)",
      "Copie du permis de bâtir ou autorisation municipale de raccordement",
      "Autorisation municipale de fouille de voirie (Tarkhis 7afr) si la canalisation traverse la voie publique",
      "Copie de la CIN de l'abonné"
    ],
    steps: [
      "Déposer le dossier au bureau d'accueil du district SONEDE territorialement compétent",
      "Visite de métrage sur place pour calculer le linéaire de tuyauterie et les accessoires nécessaires",
      "Paiement du devis d'installation et signature du contrat d'abonnement",
      "Exécution des travaux de raccordement et pose du compteur par l'équipe technique SONEDE"
    ],
    proTips: [
      "Préparez à l'avance la niche du compteur aux normes exigées par la SONEDE (coffret maçonné en bordure de propriété) pour éviter le report de la pose par les techniciens."
    ]
  }
];

export function queryCivicKnowledge(prompt: string, locale: string): string {
  const q = prompt.toLowerCase();
  
  const matched = TUNISIAN_CIVIC_KNOWLEDGE.filter((item) => {
    return item.keywords.some((k) => q.includes(k));
  });

  if (matched.length === 0) return '';

  let knowledgeBlock = '\n\n=== TUNISIAN OFFICIAL CIVIC KNOWLEDGE INJECTION ===\n';
  for (const item of matched) {
    knowledgeBlock += `
--- DOMAIN: ${item.title} ---
- Authority: ${item.authority}
- Statutory Fees / Timbres: ${item.statutoryCost}
- Processing Time: ${item.delay}
- Derja Context: ${item.derjaSummary}
- Required Papers:
${item.requiredDocuments.map((d) => `  * ${d}`).join('\n')}
- Exact Steps:
${item.steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}
- Pro Tips:
${item.proTips.map((t) => `  ! ${t}`).join('\n')}
`;
  }

  return knowledgeBlock;
}
