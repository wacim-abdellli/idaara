/**
 * IDAARA.TN — MASTER TUNISIAN CIVIC & LEGAL KNOWLEDGE BASE
 * Grounded in the official Journal Officiel de la République Tunisienne (JORT),
 * Ministerial decrees, Baladiya codes, and statutory fiscal scales.
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
  // 1. PASSPORT (PASSEPORT TUNISIEN)
  {
    keywords: ['passeport', 'passport', 'safra', 'voyage', 'جواز', 'سفر', 'باسبور'],
    title: 'Renouvellement ou Obtention de Passeport Tunisien',
    authority: 'Poste de Police ou Brigade de la Garde Nationale (مرجع النظر لمقر الإقامة)',
    statutoryCost: '80 DT (Tarif normal adulte) / 25 DT (Élèves, étudiants, enfants < 7 ans) / 150 DT (Remplacement en cas de perte/vol)',
    delay: '7 à 15 jours ouvrables (En Tunisie) / 15 à 30 jours (Consulats à l’étranger)',
    derjaSummary: "Bech t'talla3 walla t'jadded el Passeport tounsi, lezmek t7adher dossier fih timbre fiscal, copie CIN, tsawer fond blanc w passeport el 9dim ken mawjoud, w tsobbou fel markez mte3 seknek.",
    requiredDocuments: [
      "Formulaire officiel de demande de passeport (yemla fel markez walla men Idaara.tn)",
      "Copie de la Carte d'Identité Nationale (CIN) + Présentation de l'originale",
      "4 Photos d'identité récentes fond blanc (3.5 x 4.5 cm)",
      "Timbre fiscal de 80 DT (ou 25 DT pour élèves/étudiants sur présentation de certificat de scolarité)",
      "Ancien passeport à restituer (si renouvellement)",
      "Autorisation parentale légalisée (Tarkhis abawi) pour les mineurs (< 18 ans)",
      "Déclaration de perte de la police (en cas de passeport perdu/volé + timbre de 150 DT)"
    ],
    steps: [
      "Acheter le timbre fiscal à la Recette des Finances (القباضة المالية) la plus proche",
      "Prendre 4 photos d'identité chez un photographe agréé (fond blanc obligatoire)",
      "Légaliser la copie CIN si nécessaire à la Baladiya",
      "Déposer le dossier complet au commissariat de police ou poste de garde nationale de votre zone",
      "Récupérer le reçu de dépôt et retirer le passeport sous 10 à 15 jours"
    ],
    proTips: [
      "Les étudiants doivent impérativement ramener un Certificat de scolarité original récent pour payer 25 DT au lieu de 80 DT.",
      "Vérifiez que votre CIN est à jour au niveau de la profession et de l'adresse avant de déposer."
    ]
  },

  // 2. NATIONAL ID CARD (CIN / CARTE D'IDENTITÉ NATIONALE)
  {
    keywords: ['cin', 'carte d\'identite', 'bita9at ta3rif', 'ta3rif', 'بطاقة', 'تعريف'],
    title: "Carte d'Identité Nationale (CIN)",
    authority: "Poste de Police ou Brigade de la Garde Nationale",
    statutoryCost: "3 DT (Première délivrance ou renouvellement normal) / 10 DT (Remplacement pour perte ou détérioration)",
    delay: "10 à 20 jours ouvrables",
    derjaSummary: "Bita9at el Ta3rif el Wataniya lezmek t7adher madhmoun wilada asly, 3 tsawer, timbre fiscal 3 DT, w chhedet i9ama/khedma ken tbaddlet el 7ala.",
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
    keywords: ['carte grise', 'karhba', 'sayara', 'mutation', 'chrit', 'vente voiture', 'remadiya', 'رمادية', 'سيارة'],
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

  // 4. AUTO-ENTREPRENEUR (STATUT مبادر ذاتي)
  {
    keywords: ['auto-entrepreneur', 'auto entrepreneur', 'freelance', 'patente', 'moubeder', '1%', 'مبادر', 'ذاتي', 'فريلانس'],
    title: "Régime de l'Auto-Entrepreneur en Tunisie (Décret-loi n° 2020-33)",
    authority: "Plateforme Nationale de l'Auto-Entrepreneur (auto-entrepreneur.tn) + CNSS + Ministère des Finances",
    statutoryCost: "100% Gratuit à l'inscription. Impôt libératoire unique de 1% sur le CA (Services) ou 0.5% (Commerce/Industrie)",
    delay: "Inscription en ligne en 5 minutes / Validation de la carte sous 15 jours",
    derjaSummary: "Statut Auto-Entrepreneur fi Tounes ya3tik impôt 1% barka 3al chiffre d'affaires lel freelance wel services, zéro TVA, CNSS mrigla, w droit bech tda5al devises (EUR/USD) men bara b'tor9 9anouniya.",
    requiredDocuments: [
      "Copie de la CIN",
      "Justificatif d'activité ou diplôme/portfolio (pour les métiers techniques)",
      "Numéro de téléphone et adresse email valide",
      "Compte bancaire ou postal en Tunisie (RIB)"
    ],
    steps: [
      "Créer un compte sur la plateforme officielle auto-entrepreneur.tn",
      "Choisir l'activité professionnelle (Développement, Design, Conseil, Artisanat, etc.)",
      "Valider l'inscription pour obtenir l'identifiant fiscal unique et la carte d'auto-entrepreneur",
      "Déclarer trimestriellement son chiffre d'affaires et payer 1% d'impôt en ligne"
    ],
    proTips: [
      "L'auto-entrepreneur bénéficie de l'exonération totale de TVA et peut facturer légalement des clients à l'international.",
      "Le plafond annuel de chiffre d'affaires est de 75 000 DT pour les services."
    ]
  },

  // 5. CRIMINAL RECORD (BULLETIN N°3 / B3 / السوابق العدلية)
  {
    keywords: ['b3', 'bulletin 3', 'sawabi9', 'casier', 'عدلية', 'سوابق'],
    title: "Bulletin N°3 (Casier Judiciaire / B3)",
    authority: "Ministère de l'Intérieur (En ligne: b3.interieur.gov.tn) ou Commissariat de Police",
    statutoryCost: "7.500 DT (Timbre fiscal)",
    delay: "3 à 8 jours ouvrables (En ligne livré par Rapide Poste ou retrait au commissariat)",
    derjaSummary: "Bech tekhou bita9at el sawabi9 el 3adliya B3, tnejjem tsebha direct en ligne 3al site b3.interieur.gov.tn b'7.5 DT w tjik bel Rapide Poste, walla temchi lel markez.",
    requiredDocuments: [
      "Copie de la CIN",
      "Extrait de naissance original (si première demande)",
      "Timbre fiscal de 7.500 DT (ou paiement en ligne par carte bancaire/e-Dinar)"
    ],
    steps: [
      "Accéder au portail officiel b3.interieur.gov.tn",
      "Remplir les informations personnelles et l'adresse de livraison postale",
      "Payer 7.500 DT + frais de livraison Rapide Poste en ligne",
      "Recevoir le pli sécurisé à domicile sous 5 jours"
    ],
    proTips: [
      "La commande en ligne sur le site officiel du Ministère de l'Intérieur est le moyen le plus rapide et évite les files d'attente au commissariat."
    ]
  },

  // 6. RESIDENTIAL LEASE CONTRACT (CONTRAT DE BAIL / عقد كراء سكني)
  {
    keywords: ['contrat de bail', 'bail', 'kré', 'kra', '3a9d kré', 'loyé', 'location', 'كراء', 'عقد', 'إيجار'],
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

  // 7. FCR REGIME (DOUANE TUNISIENNE / امتياز ن.ت.د)
  {
    keywords: ['fcr', 'douane', 'diaspora', 'importation voiture', 'tre', 'diwanah', 'ديوانة', 'ن.ت.د', 'سيارة ن.ت.د'],
    title: "Régime Douanier FCR (Franchise Changement de Résidence pour Tunisiens à l'Étranger)",
    authority: "Direction Générale des Douanes (Bureau des Douanes / Guichet Unique TRE)",
    statutoryCost: "Exonération totale ou partielle selon l'option choisie (Régime suspensif RS avec interdiction de vente pendant 1 an ou paiement de 25-30% des droits pour immatriculation normale)",
    delay: "1 à 3 jours au bureau des douanes du port/frontière",
    derjaSummary: "Imtiyaz FCR ya3tik el 7a9 bech tdakhel karhba w 9ach dar men ghir ma tkhallas diwana kemla kenik 3echt 3 snin fel kharej w ma fotch 120 jours fi tounes koll 3am.",
    requiredDocuments: [
      "Passeport avec cachets d'entrée/sortie justifiant un séjour continu à l'étranger d'au moins 2 ans (sans dépasser 120 jours par an en Tunisie)",
      "Copie de la carte de séjour à l'étranger",
      "Carte grise étrangère du véhicule au nom du demandeur ou certificat de conformité",
      "Facture d'achat du véhicule",
      "Formulaire de demande de régime FCR (Douane tunisienne)"
    ],
    steps: [
      "Vérifier son éligibilité sur le portail de la Douane tunisienne (douane.gov.tn)",
      "Faire la déclaration douanière au port d'arrivée (La Goulette, Zarzis, etc.)",
      "Déposer le dossier au bureau régional des douanes pour l'obtention de la carte grise tunisienne (Série RS ou normale)"
    ],
    proTips: [
      "La nouvelle législation permet de céder le véhicule sous régime FCR après régularisation ou expiration du délai légal."
    ]
  },

  // 8. BIRTH CERTIFICATE & CIVIL STATUS (EXTRAIT DE NAISSANCE / مضمون ولادة)
  {
    keywords: ['madhmoun', 'naissance', 'hala madaniya', 'wilada', 'مضمون', 'ولادة'],
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
