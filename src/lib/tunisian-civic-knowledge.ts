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
      "Acheter le timbre fiscal à la Recette des Finances (القباضة المالية) ou en ligne sur e-timbres.finances.gov.tn",
      "Prendre 4 photos d'identité chez un photographe agréé (fond blanc obligatoire)",
      "Déposer le dossier complet au commissariat de police ou poste de garde nationale de votre zone",
      "Récupérer le reçu de dépôt et retirer le passeport sous 10 à 15 jours"
    ],
    proTips: [
      "Les étudiants doivent impérativement ramener un Certificat de scolarité original récent pour bénéficier du tarif de 25 DT au lieu de 80 DT.",
      "Vous pouvez désormais acheter le timbre fiscal électronique sur e-timbres.finances.gov.tn et présenter le code SMS au guichet."
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
