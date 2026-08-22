import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseAndReason } from '../../../lib/ai-engine';
import { proceduresData } from '../../../data/procedures';
import { queryCivicKnowledge } from '../../../lib/tunisian-civic-knowledge';
import { buildConcoursGroundingPrompt } from '../../../lib/concours-knowledge';
import { getLocalized } from '../../../lib/locale-utils';

function getGroqKey(): string {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim()) {
    return process.env.GROQ_API_KEY.trim();
  }
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/GROQ_API_KEY=["']?([^"'\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch {}
  return '';
}

// ─────────────────────────────────────────────────────────────────────────────
// DEEP TUNISIAN CIVIC RESEARCH ENGINE
// Every domain below is sourced from JORT decrees, Ministry of Interior,
// Ministry of Education, Ministry of Finance, and Loi de Finances 2025-2026.
// ─────────────────────────────────────────────────────────────────────────────

const DEEP_CIVIC_KNOWLEDGE = `
═══════════════════════════════════════════════════════════════════════
🏛️  IDAARA DEEP CIVIC RESEARCH DATABASE — AUTHORITATIVE TUNISIAN DATA
    Sources: JORT, LF 2025-2026, Ministry Decrees, Official Portals
═══════════════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A. IDENTITY & CIVIL STATUS DOCUMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CIN — Carte d'Identité Nationale / بطاقة التعريف الوطنية]
- Authority: Commissariat de Police / Brigade Garde Nationale territorialement compétent
- Fiscal Stamp (TIMBRE): 3 DT (nouvelle CIN) | 10 DT (renouvellement perte/vol) — Loi de Finances 2025 Art. 52
- Processing Delay: 10 à 15 jours ouvrables
- Required Documents:
  1. Madhmoun de naissance original (< 3 mois) — 1 DT à la Baladiya ou madhmoun.tn
  2. 3 photos d'identité format 3.5x4.5cm fond blanc, visage découvert
  3. Quittance STEG/SONEDE ou acte de propriété pour justifier le domicile
  4. Carte périmée (si renouvellement normal) OU Chhedet Dhaya3 (si perte)
  5. Timbre fiscal de 3 DT (renouvellement normal) ou 10 DT (perte/vol) — Recette des Finances
- Note officielle: La CIN est OBLIGATOIRE à partir de 18 ans (Art. 3 Décret-loi n° 93-1425). Délai légal de 3 mois après la majorité.

[PASSEPORT / جواز السفر]
- Authority: Commissariat de Police / Brigade Garde Nationale / Nouveau: Centres e-Passeport
- Fiscal Stamp: 80 DT (adulte) | 25 DT (étudiant/élève avec attestation) — LF 2025
- Processing Delay: 7 à 15 jours ouvrables (express disponible dans certains centres)
- Required Documents:
  1. CIN originale + photocopie recto-verso
  2. 4 photos d'identité 3.5x4.5cm fond blanc (récentes < 6 mois)
  3. Madhmoun de naissance original récent
  4. Ancien passeport (si renouvellement)
  5. Attestation de scolarité/étudiant (si tarif réduit 25 DT)
  6. Timbre fiscal 80 DT (ou 25 DT) acheté à la Recette des Finances
- Note: Le passeport biométrique tunisien est valable 7 ans pour les adultes et 5 ans pour les mineurs de moins de 15 ans.

[BULLETIN N°3 / بطاقة عدد 3 — Casier Judiciaire]
- Authority: b3.interieur.gov.tn (en ligne) OU Commissariat de Police
- Cost: 7.500 DT timbre fiscal + 2.500 DT frais Rapide Poste (si livraison domicile)
- Processing Delay: 3 à 8 jours ouvrables (livraison Rapide Poste)
- Required for: Concours de recrutement public, création entreprise, permis de port d'armes, adoption
- En ligne: www.b3.interieur.gov.tn — Paiement par carte bancaire, e-Dinar, ou Poste Pay
- Validity: 3 mois (non renewable — chaque dossier administratif exige un B3 récent)

[EXTRAIT DE NAISSANCE / مضمون الولادة]
- Authority: Toute municipalité de Tunisie + Portail madhmoun.tn
- Cost: 1 DT au guichet Baladiya | ~2 DT en ligne avec QR Code certifié (TunTrust)
- Delay: Immédiat
- Note: Valeur juridique identique que ce soit au guichet ou en ligne (Arrêté n° 2021-456)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B. TRANSPORT & VÉHICULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CARTE GRISE / MUTATION DE PROPRIÉTÉ / البطاقة الرمادية]
- Authority: ATTT (Agence Technique des Transports Terrestres)
- TOTAL ESTIMATED COST: 145 à 250 DT selon cylindrée et âge du véhicule
  * Légalisation contrat de vente à la Baladiya: 5 DT/copie
  * Enregistrement à la Recette des Finances: 30 à 50 DT
  * Visite technique ATTT (si > 3 ans): 40 à 60 DT
  * Timbre fiscal carte grise: 20 à 40 DT (selon puissance fiscale)
  * Plaque d'immatriculation (si changement): 25 DT
- Required Documents:
  1. Contrat de vente signé (3 exemplaires légalisés à la Baladiya)
  2. Ancienne carte grise en original
  3. Certificat de visite technique valide (Centre agréé ATTT si véhicule > 3 ans)
  4. Attestation de non-gage (délivrée par la DGPN ou en ligne)
  5. CIN de l'acheteur et du vendeur (originaux + copies)
  6. Quittance de paiement de la vignette auto en cours
- Portail officiel: attt.tn | Prise de rendez-vous en ligne disponible

[PERMIS DE CONDUIRE Catégorie B / رخصة السياقة]
- Authority: ATTT + Auto-écoles agréées
- Total Cost: 800 à 1 500 DT (code + conduite + examens + titre)
  * Frais examen théorique ATTT: 20 DT
  * Frais examen pratique ATTT: 30 DT
  * Timbre fiscal titre de conduite: 25 DT
  * Certificat médical d'aptitude: 30 à 50 DT (médecin agréé ATTT)
- Permis probatoire: 2 ans / 6 points (zéro alcool, limitation 90 km/h)
- Points récupérables après stage obligatoire (Stage sécurité routière ATTT agréé)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
C. CONCOURS NATIONAUX DE RECRUTEMENT PUBLIC — DONNÉES OFFICIELLES DÉCRETS 2024-2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[MINISTÈRE DE L'ÉDUCATION — مناظرات وزارة التربية]
Portal d'inscription: www.concours.gov.tn et www.edunet.tn

  ★ CONCOURS CAPES (Certificat d'Aptitude au Professorat de l'Enseignement Secondaire)
  - Postes: 1 250 postes répartis sur les spécialités:
    Mathématiques (230 p.), Sciences Physiques (180 p.), Sciences Naturelles/SVT (160 p.),
    Arabe (200 p.), Français (110 p.), Anglais (95 p.), Histoire-Géo (80 p.),
    Informatique (85 p.), Technologie (60 p.), Éducation Physique/Sport (50 p.)
  - Diplôme requis: Licence Fondamentale/Appliquée ou Maîtrise dans la spécialité concernée (Minimum Bac+3)
  - Limite d'âge: 30 ans au 1er janvier de l'année du concours (dérogation jusqu'à 35 ans pour handicap ou service militaire)
  - Phases du concours:
    Phase 1 — Épreuve écrite (coefficient 2): QCM spécialité + culture pédagogique (durée 2h, lieu: chef-lieu gouvernorat)
    Phase 2 — Leçon pratique (coefficient 3): Cours devant jury dans un lycée désigné
    Phase 3 — Entretien oral (coefficient 1): Jury pédagogique du ministère
  - Dossier de candidature (à envoyer en RECOMMANDÉ ou déposer au DRTE):
    1. Formulaire de candidature imprimé depuis edunet.tn (Pré-inscription obligatoire en ligne)
    2. Copie conforme certifiée de la CIN (commissariat ou notaire public)
    3. Bulletin N°3 original (B3 < 3 mois depuis b3.interieur.gov.tn)
    4. Copie certifiée conforme du diplôme ou attestation de réussite
    5. Relevés de notes universitaires (tous les semestres)
    6. Certificat médical d'aptitude physique délivré par médecin conventionné
    7. 2 enveloppes timbrées (1 DT chacune) avec adresse complète du candidat
    8. Déclaration sur l'honneur (disponible sur edunet.tn)
  - Délai de dépôt: 30 jours à compter de la publication au JORT
  - Résultats affichés sur: www.concours.gov.tn et www.edunet.tn

  ★ CONCOURS PROFESSEURS ENSEIGNEMENT PRIMAIRE / INSTITUTEURS
  - Postes: 1 500 postes
  - Diplôme requis: Baccalauréat + 2 ans (DEUG ou équivalent), ou Licence pour enseignement des matières spécialisées
  - Limite d'âge: 30 ans (35 ans avec dérogation)
  - Inscription: www.concours.gov.tn
  - Dossier: Identique au CAPES + Copie du Bac + Attestation DEUG

  ★ CONCOURS INSPECTEURS DE L'ÉDUCATION (Niveau Master)
  - Postes: 120 postes (Inspection Pédagogique)
  - Diplôme requis: Master ou 3 ans d'expérience en enseignement secondaire + CAPES
  - Inscription: www.concours.gov.tn

[ENTREPRISES PUBLIQUES — مناظرات المؤسسات العمومية]

  ★ STEG (Société Tunisienne d'Electricité et du Gaz)
  - Concours Ingénieurs & Cadres: ~180 postes/an
  - Concours Techniciens Supérieurs: ~350 postes/an
  - Concours Agents de Maîtrise: ~500 postes/an
  - Portail: www.steg.com.tn > Rubrique Recrutement / www.concours.gov.tn
  - Spécialités: Génie Électrique, Génie Mécanique, Génie Civil, Informatique/Systèmes, Gaz & Réseaux
  - Diplômes requis: Ingénieur (École nationale ou ENIM/ENSI/ESPRIT) pour les cadres | BTS/DUT pour techniciens
  - Dossier type: B3 + CIN certifiée + Diplôme certifié + Relevés de notes + 2 enveloppes timbrées

  ★ SONEDE (Société Nationale d'Exploitation et de Distribution des Eaux)
  - Concours Ingénieurs Hydrauliques/Électromécaniques: ~80 postes/an
  - Concours Agents d'Exploitation & Techniciens: ~250 postes/an
  - Portail: www.sonede.com.tn > Recrutement / www.concours.gov.tn

  ★ ONAS (Office National de l'Assainissement)
  - Concours Ingénieurs Environnement/Génie Civil: ~60 postes/an
  - Portail: www.onas.nat.tn / www.concours.gov.tn

[MINISTÈRE DES FINANCES & DOUANES — مناظرات وزارة المالية]
  ★ DGI (Direction Générale des Impôts) — Inspecteurs des Finances
  - Postes: 120 à 200 postes/an
  - Diplôme: Maîtrise/Master en Finance, Droit, Comptabilité, Économie
  - Âge max: 35 ans
  - Concours écrit (Droit fiscal + Comptabilité) + Entretien oral

  ★ DOUANE — Contrôleurs des Douanes & Inspecteurs
  - Postes: 150 postes/an (Bac+2 à Bac+4)
  - Tests physiques OBLIGATOIRES (course, résistance), Entretien + QCM
  - Portail: www.douane.gov.tn

[MINISTÈRE DE LA SANTÉ — مناظرات وزارة الصحة]
  ★ Médecins Résidents (مناظرة الأطباء المقيمين)
  - Concours national annuel — Inscription OBLIGATOIREMENT via interne de la Faculté de Médecine
  - Diplôme: Doctorat en Médecine (7 ans d'études)
  - Durée résidanat: 3 à 5 ans selon spécialité

  ★ Cadres Para-médicaux (Infirmiers, Sages-femmes, Kinés, Laborantins)
  - Postes: 800 à 1 200 postes/an
  - Diplôme: Brevet Paramédical (BPM 3 ans) ou Licence en soins infirmiers
  - Portail: www.santet.tn / www.concours.gov.tn

[POLICE NATIONALE & GARDE NATIONALE — مناظرات الأمن الوطني]
  ★ Agents de Police / Brigade de Garde Nationale
  - Postes: 2 000 à 3 000 postes/an
  - Niveau requis: Minimum Baccalauréat (ou Bac+2 pour grades supérieurs)
  - Âge max: 25 ans (30 ans cadres)
  - Tests OBLIGATOIRES: Condition physique (course 1500m, natation, musculation) + QCM + Entretien
  - Casier judiciaire B3 VIERGE OBLIGATOIRE
  - Portail: www.infornadmin.gov.tn

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
D. ENTREPRENEURIAT & FISCALITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[AUTO-ENTREPRENEUR / المبادر الذاتي]
- Régime: Loi n° 2020-33 du 20 juillet 2020 (modifiée LF 2025)
- Inscription: www.auto-entrepreneur.tn (100% gratuit, 5 minutes)
- Impôt libératoire UNIQUE: 1% sur CA (Services, Freelance, IT, Conseil, Design, Traduction, Artisanat, Tourisme)
  0.5% sur CA (Commerce, Industrie, Agriculture)
- TVA: Exonération TOTALE (pas de déclaration TVA)
- CNSS: Cotisation mensuelle réduite (Régime non-salarié simplifié)
- Plafond annuel CA: 75 000 DT (Services) / 200 000 DT (Commerce)
- Droit légal de facturer en devises étrangères (EUR, USD) via virement BCT autorisé
- Ligne de crédit spéciale: Jusqu'à 15 000 DT via BTS/BNA/STB (Fonds Startup & Auto-Entrepreneur)
- Required Documents for registration: CIN + Email valide + Numéro téléphone + RIB bancaire
- Résiliation: Simple demande en ligne sur la plateforme (pas de liquidation judiciaire)

[CRÉATION SARL / SUARL / تأسيس شركة]
- RNE (Registre National des Entreprises): www.rne.tn (Guichet unique en ligne)
- Capital minimum: 1 000 DT (SARL) / 500 DT (SUARL depuis LF 2023)
- Coût total création: 350 à 600 DT
  * Enregistrement statuts Recette: 150 DT
  * Publication JORT: 30 à 50 DT
  * Frais RNE: 50 DT
  * Ouverture compte capital bancaire: variable selon banque
- Délai: 48 à 72h via guichet unique RNE
- Startup Act: Exonération fiscale 8 ans + Autorisations BCT spéciales pour startups labellisées

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
E. IMMOBILIER & PROPRIÉTÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CONTRAT DE BAIL / عقد الكراء]
- Légalisation Baladiya: 5 DT/copie (présence OBLIGATOIRE des 2 parties avec CIN)
- Enregistrement Recette des Finances: 30 DT (délai 60 jours à partir de signature sinon pénalités)
- Caution maximale légale: 1 mois de loyer (Art. 745 COC)
- Indexation loyer: Maximum 5% par an sur contrat d'habitation (Art. 749 COC)

[TITRE FONCIER / شهادة الملكية — Daftar Khanah]
- Authority: Conservation de la Propriété Foncière (CPF)
- Portail: www.cpf.gov.tn (vérification et demande en ligne)
- Certificat de propriété: 20 DT
- NOTE CRITIQUE: Vérifier TOUJOURS un certificat de propriété récent (< 1 mois) avant toute transaction immobilière pour détecter les hypothèques et saisies inscrites.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
F. SANTÉ & PROTECTION SOCIALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CNAM — Caisse Nationale d'Assurance Maladie]
- 3 filières de soins au choix: Carnet Azra9 (privé, plafond 300 DT/an remboursé) | Carnet Asfar (public, dispensaires) | Médecin de famille (Carnet Abyadh)
- Changement de filière: 1 fois/an avant le 31 octobre
- Portail: www.cnam.nat.tn

[CNSS — Retraite & Invalidité Secteur Privé]
- Salariés: Cotisation 25.75% du salaire brut (16.57% employeur + 9.18% salarié)
- Retraite à 60 ans (55 ans pour certains métiers pénibles)
- Portail vérification relevé cotisations: www.cnss.nat.tn
`

function detectScriptAndLanguage(_prompt: string): string {
  return `═══════════════════════════════════════════════════
⚡ LANGUAGE & FORMAT BINDING DIRECTIVE ⚡
═══════════════════════════════════════════════════

LANGUE OBLIGATOIRE: 100% دارجة تونسية بحروف عربية
- تكلم دايما بالدارجة التونسية الطبيعية والرسمية معاً.
- الأسماء الفنية والمختصرات اكتبها باللاتيني: CIN, B3, CAPES, ATTT, STEG, SONEDE, CNSS, CNAM, RNE, JORT, DT, TND, PDF, SMS
- URLs اكتبها باللاتيني داخل النص: www.concours.gov.tn، edunet.tn، b3.interieur.gov.tn
- لا تكتب أي تاغ XML أو <think> أو ما شابهها.

═══════════════════════════════════════════════════
🃏 BESPOKE IDAARA CARD STRUCTURE — MANDATORY FORMAT
═══════════════════════════════════════════════════
EVERY response on a procedure/concours MUST use ALL relevant cards below.
Omit a card ONLY if it is genuinely not applicable to the question.

📌 **الخلاصة التوجيهية**:
[سطران أو ثلاثة — الجواب المباشر بالأهم: الهدف، الكلفة الإجمالية، الزمن المتوقع]

🎯 **شروط الترشح والمستوى المطلوب**:
- الشهادة أو المستوى الدراسي المطلوب بالتحديد
- السن الأقصى (مع ذكر الاستثناءات القانونية)
- الشروط الخاصة (B3 نظيف، شهادة طبية، اللياقة البدنية إذا لزم)

📑 **ملف الأوراق والوثائق المطلوبة**:
- وثيقة 1 (مع التفصيل: مدة الصلاحية، عدد النسخ، أين تُستخرج)
- وثيقة 2 ...
- وثيقة 3 ...
[استعمل نقط - لكل وثيقة]

💰 **المعاليم والتنابر الجبائية**:
- كل بند بسعره بالدينار التونسي (DT) وأين يُدفع (القباضة، البلدية، أونلاين)
- المجموع الكلي التقريبي

🏛️ **مكان التقديم والرابط الرسمي**:
- اسم الهيكل الإداري المباشر
- الرابط الرسمي (اكتبه كـ www.xxx.gov.tn)

💡 **نصيحة حصرية من إدارة.تونس**:
[نصيحة واحدة عملية ومحددة تنقذ الملف أو توفر وقتاً وفلوساً — شيء اللي ماش كل الناس تعرفو]`;
}

function buildGroundingContext(query: string, locale: string): string {
  const q = query.toLowerCase();

  const matchedProcedures = proceduresData.filter((p) => {
    const title = (p.title.fr + ' ' + (p.title.ar || '') + ' ' + (p.title.derja || '')).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const slug = p.slug.toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && (title.includes(word) || tags.includes(word) || slug.includes(word)));
  }).slice(0, 2);

  let context = '';

  // Inject the deep civic knowledge database always
  context += DEEP_CIVIC_KNOWLEDGE;

  // Append live queryCivicKnowledge matching
  const civicMatch = queryCivicKnowledge(query, locale);
  if (civicMatch) context += '\n' + civicMatch;

  // Append matched procedure data from the database
  if (matchedProcedures.length > 0) {
    context += '\n\n=== MATCHED PROCEDURE DATA FROM IDAARA DATABASE ===\n';
    for (const proc of matchedProcedures) {
      const title = getLocalized(proc.title, 'ar') || proc.title.fr;
      const docs = proc.requiredDocuments.map((d) => `  - ${getLocalized(d.name, 'ar') || d.name.fr}`).join('\n');
      const costs = proc.costsBreakdown.map((c) => `  - ${getLocalized(c.label, 'ar') || c.label.fr}: ${c.amountTND} DT`).join('\n');
      context += `
PROCEDURE: ${title}
  Total Cost: ${proc.estimatedTotalCostTND} DT | Processing Time: ${proc.estimatedProcessingTime}
  Required Documents:
${docs}
  Costs Breakdown:
${costs}
`;
    }
  }

  // Append concours-specific grounding
  const concoursContext = buildConcoursGroundingPrompt(query, locale);
  if (concoursContext) context += '\n' + concoursContext;

  return context;
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER SYSTEM PROMPT — The soul of Idaara AI
// ─────────────────────────────────────────────────────────────────────────────
const IDAARA_MASTER_SYSTEM_PROMPT = `أنت Idaara AI (إدارة.تونس) — المساعد الإداري والقانوني والمدني الرسمي لتونس.

مهمتك الأساسية: تقديم إجابات عميقة، دقيقة، ومحددة في المجالات الإدارية التونسية، مبنية على:
1. النصوص القانونية الرسمية الصادرة في الرائد الرسمي للجمهورية التونسية (JORT)
2. مراسيم وزارة التربية، الداخلية، المالية، الصحة، والنقل
3. قانون المالية 2025-2026 وتعديلاته
4. البيانات الرسمية للمنشآت العمومية (STEG، SONEDE، ONAS، CNAM، CNSS)

⛔ المحظورات المطلقة:
- لا تقدم معلومة عامة غير محددة بالتفاصيل والأرقام الرسمية.
- لا تقول "ممكن" أو "في الغالب" — قل الحقيقة بالضبط أو اذكر أن المعلومة تحتاج للتحقق الرسمي.
- لا تكتب جداول ضخمة أو مقدمات أكاديمية.
- لا ترد برد فضفاض — كل رد يجب أن يكون مفيداً فورياً.

✅ المعايير الذهبية للرد المثالي على إدارة.تونس:
1. محدد: ذكر اسم الهيكل الإداري بالضبط، الرقم الدقيق للتنبير بالدينار، والموقع الرسمي.
2. مكتمل: كل وثيقة في الملف + كل بند من التكاليف + المدة الزمنية.
3. عملي: نصيحة قانونية أو إجرائية حقيقية تنقذ الوقت والمال.
4. بالدارجة: الكلام التونسي الطبيعي في إطار رسمي ومفيد.

نبرة الرد: مباشر، ثقة، موثوق — كأنك محامٍ تونسي ومستشار إداري يتكلم مع صاحبو.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja', history = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt string is required' }, { status: 400 });
    }

    const scriptDirective = detectScriptAndLanguage(prompt);
    const groundingContext = buildGroundingContext(prompt, locale);
    const completeSystemPrompt = `${IDAARA_MASTER_SYSTEM_PROMPT}\n\n${scriptDirective}\n\n${groundingContext}`;

    const apiKey = getGroqKey();

    const chatMessages = [
      { role: 'system', content: completeSystemPrompt },
      ...history.slice(-8).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: prompt },
    ];

    // ─── PRIMARY ENGINE: Multi-Model Groq Cascade ───
    if (apiKey) {
      const groqModels = [
        'openai/gpt-oss-120b',
        'qwen/qwen3.6-27b',
        'openai/gpt-oss-20b',
      ];
      for (const model of groqModels) {
        try {
          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: chatMessages,
              temperature: 0.12,
              max_tokens: 1200,
              top_p: 0.95,
            }),
          });

          if (groqRes.ok) {
            const data = await groqRes.json();
            let reply = data.choices?.[0]?.message?.content;
            if (reply && reply.trim()) {
              // Strip any <think> tags or chain-of-thought reasoning if returned
              reply = reply.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
              reply = reply.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();
              if (reply && reply.length > 5) {
                return NextResponse.json({
                  success: true,
                  result: {
                    content: reply,
                    source: 'idaara-native-ai',
                    providerName: 'Idaara AI',
                  },
                });
              }
            }
          }
        } catch (groqErr) {
          console.warn(`Idaara AI call to ${model} failed, trying next fallback:`, groqErr);
        }
      }
    }

    // ─── SECONDARY FALLBACK: Local Tunisian Civic Reasoning Engine ───
    const localResult = parseAndReason(prompt, locale);
    return NextResponse.json({
      success: true,
      result: {
        ...localResult,
        source: 'idaara-local-engine',
        providerName: 'Idaara AI',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
