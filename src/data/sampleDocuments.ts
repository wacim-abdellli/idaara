import { OCRAnalysisResult } from '../types/chat';
import { LocalizedString } from '../lib/locale-utils';

export interface SampleDocItem {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  thumbnailUrl: string;
  simulatedOCRResult: OCRAnalysisResult;
}

export const sampleDocumentsList: SampleDocItem[] = [
  {
    id: 'sample-redressement-fiscal',
    category: {
      derja: 'Fiscalité / Recette',
      fr: 'Fiscalité / Recette',
      en: 'Tax & Revenue',
      ar: 'الجباية والقباضة المالية',
    },
    title: {
      derja: "Avis de Redressement Fiscal (Tanbih dhariba)",
      fr: "Notification de Redressement Fiscal Préliminaire",
      en: "Preliminary Tax Adjustment Notice",
      ar: "إعلام بنتائج المراجعة الجبائية الأولية (قباضة مالية)",
    },
    thumbnailUrl: '/sample-docs/tax-notice.png',
    simulatedOCRResult: {
      id: 'ocr-tax-01',
      documentType: {
        derja: "Tanbih dhariba / Moraje3a jebaiya préliminaire",
        fr: "Notification de Redressement Fiscal Préliminaire",
        en: "Preliminary Tax Adjustment Notice",
        ar: "إعلام بنتائج المراجعة الجبائية الأولية وتعديل الأساس الضريبي",
      },
      issuingAuthority: {
        derja: "Markez Moraje3at el Adha2at (Direction des Impôts)",
        fr: "Direction Générale des Impôts - Centre de Contrôle Fiscal",
        en: "General Directorate of Taxes - Tax Audit Center",
        ar: "وزارة المالية - الإدارة العامة للضرائب والمراقبة الجبائية",
      },
      referenceNumber: "DGI/CF-2026/04918-B",
      dateDetected: "12 Août 2026",
      urgency: "critical",
      deadlineDate: "30 jours à compter de la réception (11 Septembre 2026)",
      penaltyRisk: {
        derja: "Khnayet w pénalités de retard 1.25% par mois ken ma tjewebch fi 30 jours.",
        fr: "Majoration automatique et pénalités de retard de 1.25% par mois en l'absence de réponse écrite dans les 30 jours.",
        en: "Automatic surcharge and monthly late penalties of 1.25% if no written response is provided within 30 days.",
        ar: "توظيف خطايا تأخير بنسبة 1.25% شهرياً وتثقيل المبالغ آلياً في صورة عدم الرد الكتابي خلال 30 يوماً.",
      },
      summary: {
        derja: [
          "El 9badha la7dhet fari9 bin el déclaration mte3ek w les chiffres elli 3andhom.",
          "Talbin mennek tasrih moukemmel walla i9rar b'khalas el far9 mte3 1,840 DT.",
          "3andek 30 jours exact bech t9addem el watha2eq el mofassra walla ta3mel recours."
        ],
        fr: [
          "L'administration fiscale a constaté des écarts entre vos déclarations annuelles et les recoupements de facturation.",
          "Un montant complémentaire d'impôt sur le revenu de 1 840 TND vous est réclamé.",
          "Vous disposez d'un délai strict de 30 jours ouvrables pour formuler vos observations écrites ou contester."
        ],
        en: [
          "The tax administration identified discrepancies between your annual declarations and cross-referenced invoicing data.",
          "An additional income tax adjustment of 1,840 TND is claimed.",
          "You have a strict deadline of 30 business days to submit written observations or appeal the adjustment."
        ],
        ar: [
          "سجلت مصالح المراقبة الجبائية فوارق بين التصاريح المودعة ومبالغ المعاملات المحققة.",
          "تطالبك الإدارة بدفع فارق ضريبي مستوجب قدره 1840 دينار تونسي.",
          "يمنحك القانون أجلاً بـ 30 يوماً لتقديم مؤيداتك الكتابية أو الاعتراض على التعديل المقترح."
        ]
      },
      actionItems: [
        {
          task: {
            derja: "7adher les factures wel relevés bancaires mte3 el 3am el ma3ni.",
            fr: "Rassembler les factures justificatives et relevés bancaires de l'exercice concerné.",
            en: "Gather supporting invoices and bank statements for the relevant fiscal year.",
            ar: "تجميع فواتير النشاط وكشوفات الحسابات البنكية للسنة المعنية."
          },
          office: {
            derja: "Markez el moraje3a el jebaiya (Bureau de Contrôle des Impôts)",
            fr: "Bureau de Contrôle Fiscal indiqué sur l'entête",
            en: "Tax Audit Office indicated on the letterhead",
            ar: "مركز المراقبة الجبائية المبين بالوثيقة"
          },
          requiredPapers: ["Copie Notification", "Factures originales", "Relevés de compte bancaire", "Mémoire de réponse"],
          feeTND: 0
        },
        {
          task: {
            derja: "Sobb khedmet el reponse écrite b'arriver fel bureau d'ordre.",
            fr: "Déposer le mémoire en réponse avec décharge au bureau d'ordre.",
            en: "File the formal written reply and obtain a receipt stamp at the reception desk.",
            ar: "إيداع مذكرة الرد الكتابية مع أخذ وصل استلام من مكتب الضبط."
          },
          office: {
            derja: "Bureau d'ordre mte3 el Recette / Centre Fiscal",
            fr: "Bureau d'ordre du centre de contrôle",
            en: "Reception desk of the tax audit center",
            ar: "مكتب الضبط بمركز المراقبة الجبائية"
          },
          requiredPapers: ["Mémoire en réponse signé (x2 exemplaires)"],
          feeTND: 0
        }
      ],
      legalContext: {
        derja: "Selon Code des Droits et Procédures Fiscaux (Articles 37 w ma ba3dha).",
        fr: "Conformément aux dispositions des articles 37 et suivants du Code des Droits et Procédures Fiscaux (CDPF).",
        en: "Pursuant to Articles 37 et seq. of the Tunisian Code of Tax Rights and Procedures (CDPF).",
        ar: "طبقاً لأحكام الفصل 37 وما بعده من مجلة الحقوق والإجراءات الجبائية التونسية."
      }
    }
  },
  {
    id: 'sample-mise-demeure-cnss',
    category: {
      derja: 'Sécurité Sociale / CNSS',
      fr: 'Sécurité Sociale / CNSS',
      en: 'Social Security / CNSS',
      ar: 'الضمان الاجتماعي',
    },
    title: {
      derja: "Mise en Demeure CNSS (Tanbih khalas cotisations)",
      fr: "Mise en Demeure de Paiement CNSS",
      en: "CNSS Social Contribution Formal Demand Notice",
      ar: "تنبيه بالدفع واستخلاص اشتراكات الضمان الاجتماعي (CNSS)",
    },
    thumbnailUrl: '/sample-docs/cnss-notice.png',
    simulatedOCRResult: {
      id: 'ocr-cnss-02',
      documentType: {
        derja: "Mise en demeure / Tanbih sobben CNSS",
        fr: "Mise en Demeure de Paiement de Cotisations Sociales",
        en: "Formal Demand for Social Security Contributions",
        ar: "تنبيه واستعجال دفع اشتراكات الصندوق الوطني للضمان الاجتماعي",
      },
      issuingAuthority: {
        derja: "Sandou9 el Watani lel Daman el Ijtima3i (CNSS)",
        fr: "Caisse Nationale de Sécurité Sociale (CNSS)",
        en: "National Social Security Fund (CNSS)",
        ar: "الصندوق الوطني للضمان الاجتماعي - الإدارة الجهوية",
      },
      referenceNumber: "CNSS/REC-67890/2026",
      dateDetected: "05 Août 2026",
      urgency: "high",
      deadlineDate: "15 jours (20 Août 2026)",
      penaltyRisk: {
        derja: "Twa9if el carnet de soins w 3a9let 3la el compte bancaire ken ma t5allesch.",
        fr: "Blocage des droits aux prestations maladie et engagement de poursuites par voie d'avis à tiers détenteur (ATD).",
        en: "Suspension of healthcare coverage and administrative garnishment order on bank accounts if unpaid.",
        ar: "تعليق التغطية الصحية وتنفيذ إجراءات العقلة الإدارية على الحسابات البنكية في صورة عدم التسوية.",
      },
      summary: {
        derja: [
          "El CNSS talba khalas el cotisations mte3 el trimestre el feyet (T1-2026).",
          "El mablagh el matloub houwa 620 DT m3ahoum 35 DT pénalités de retard.",
          "3andek 15 jours bech t5allas walla ta3mel rééchelonnement (Jadwala)."
        ],
        fr: [
          "La CNSS réclame le règlement des cotisations sociales impayées pour le 1er trimestre 2026.",
          "Le montant total s'élève à 655 TND, dont 35 TND de pénalités de retard.",
          "Vous disposez de 15 jours pour procéder au paiement ou souscrire un échéancier d'apurement."
        ],
        en: [
          "The CNSS is claiming payment of unpaid social security contributions for Q1 2026.",
          "The total outstanding balance is 655 TND, including 35 TND in statutory late fees.",
          "You have 15 days to settle the full balance or sign a debt rescheduling agreement."
        ],
        ar: [
          "يطالب الصندوق الوطني للضمان الاجتماعي بتسوية متخلدات الاشتراكات للثلاثية الأولى 2026.",
          "المبلغ الجملي المستوجب هو 655 ديناراً متضمناً خطايا التأخير القانونية.",
          "يمنحك الصندوق أجلاً بـ 15 يوماً للدفع الفوري أو إبرام اتفاقية جدولة ديون."
        ]
      },
      actionItems: [
        {
          task: {
            derja: "Imchi l'a9reb bureau CNSS bech t5allas walla t'jadwel.",
            fr: "Se présenter au bureau CNSS de rattachement pour paiement ou calendrier d'échelonnement.",
            en: "Visit your local CNSS office to pay or establish an installment repayment plan.",
            ar: "التوجه للمكتب المحلي للضمان الاجتماعي للدفع أو طلب جدولة الديون."
          },
          office: {
            derja: "Bureau CNSS le plus proche",
            fr: "Bureau Régional / Local CNSS",
            en: "Nearest Regional / Local CNSS Branch",
            ar: "المكتب الجهوي أو المحلي للضمان الاجتماعي"
          },
          requiredPapers: ["Copie de la Mise en Demeure", "Carte d'assuré social (Matricule CNSS)", "Moyen de paiement"],
          feeTND: 655
        }
      ],
      legalContext: {
        derja: "Selon la Loi 60-30 mte3 la Sécurité Sociale fi Tounes.",
        fr: "En application de la loi n° 60-30 du 14 décembre 1960 relative aux régimes de sécurité sociale.",
        en: "In accordance with Tunisian Law No. 60-30 of December 14, 1960 on social security systems.",
        ar: "تطبيقاً للقانون عدد 30 لسنة 1960 المنظم لأنظمة الضمان الاجتماعي بالبلاد التونسية."
      }
    }
  },
  {
    id: 'sample-convocation-police',
    category: {
      derja: 'Sécurité & Citoyenneté',
      fr: 'Sécurité & Citoyenneté',
      en: 'Public Safety & Police',
      ar: 'الأمن والمواطنة',
    },
    title: {
      derja: "Convocation Markez Chorta (Iste3da2)",
      fr: "Convocation / Invitation au Poste de Police",
      en: "Police Department Formal Summons Notice",
      ar: "استدعاء رسمي للمثول بمركز الأمن الوطني",
    },
    thumbnailUrl: '/sample-docs/police-notice.png',
    simulatedOCRResult: {
      id: 'ocr-pol-03',
      documentType: {
        derja: "Iste3da2 officiel lel Markez (Convocation)",
        fr: "Convocation de Police Judiciaire / Administrative",
        en: "Administrative & Judicial Police Summons",
        ar: "استدعاء رسمي للمثول بمركز الأمن / الحرس الوطني",
      },
      issuingAuthority: {
        derja: "Markez el Amn el Watani (Police Nationale)",
        fr: "Ministère de l'Intérieur - Direction Générale de la Sûreté Nationale",
        en: "Ministry of Interior - National Police Station",
        ar: "وزارة الداخلية - الإدارة العامة للأمن الوطني",
      },
      referenceNumber: "PV-2026/894-INV",
      dateDetected: "14 Août 2026",
      urgency: "high",
      deadlineDate: "Date indiquée : 22 Août 2026 à 09h00",
      penaltyRisk: {
        derja: "Ijleb bi 9ouwa el 3oummoumiya fi 7alet 3adam el 7oudhour.",
        fr: "Risque de mandat d'amener ou délivrance d'un mandat de recherche en cas d'absence injustifiée.",
        en: "Issuance of a bench warrant or compulsory appearance order in case of unjustified failure to appear.",
        ar: "إمكانية إصدار برقية تفتيش أو إحضار بالقوة العامة في صورة التخلف دون عذر قانوني.",
      },
      summary: {
        derja: [
          "Markez el chorta talbek bech te7dhar lel istima3 fi mawdhou3 yhimmek.",
          "Maktoub fel convocation: Lezem t'jbed CIN mte3ek m3ak.",
          "Mouch bel dharoura 7aja 5ayba; ynajem ykoun recherche d'adresse, plainte, walla témoin."
        ],
        fr: [
          "Le commissariat vous invite à vous présenter pour une audition administrative ou judiciaire vous concernant.",
          "La présentation de la Carte d'Identité Nationale originale est strictement obligatoire.",
          "Il peut s'agir d'une simple enquête administrative, audition de témoin ou notification d'acte."
        ],
        en: [
          "The police station requests your appearance for an administrative or judicial hearing regarding a matter concerning you.",
          "Presenting your original National Identity Card (CIN) is strictly required upon arrival.",
          "This does not necessarily imply wrongdoing; it may involve a routine inquiry, witness statement, or official delivery."
        ],
        ar: [
          "يطلب منك مركز الأمن الوطني الحضور لسماع أقوالك في موضوع يهمك أو بصفتك شاهداً.",
          "الاستظهار ببطاقة التعريف الوطنية الأصلية إجباري عند الحضور.",
          "لا يعني الاستدعاء بالضرورة إدانة، وقد يتعلق بإفادة، بلاغ ضياع، أو تسليم وثيقة رسمية."
        ]
      },
      actionItems: [
        {
          task: {
            derja: "I7dhar fel wa9t el mo7addad bel CIN mte3ek.",
            fr: "Se présenter à l'heure exacte muni de la convocation et de la CIN originale.",
            en: "Arrive at the exact scheduled time with the summons and original National ID Card.",
            ar: "الحضور بالموعد المحدد مصحوباً بالاستدعاء وبطاقة التعريف الأصلية."
          },
          office: {
            derja: "Markez el Amn el mathkour fel war9a",
            fr: "Poste de Police / Brigade mentionné sur la convocation",
            en: "Police Station / National Guard Station named on the notice",
            ar: "مركز الأمن الوطني أو الحرس الوطني المذكور بالاستدعاء"
          },
          requiredPapers: ["Convocation originale", "Carte d'Identité Nationale (CIN)"],
          feeTND: 0
        }
      ],
      legalContext: {
        derja: "Code de Procédure Pénale Tounsi.",
        fr: "Code de Procédure Pénale tunisien (Articles relatifs aux convocations de police judiciaire).",
        en: "Tunisian Code of Criminal Procedure regarding judicial police summonses.",
        ar: "مجلة الإجراءات الجزائية التونسية."
      }
    }
  }
];
