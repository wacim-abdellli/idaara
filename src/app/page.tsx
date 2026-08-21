'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/motion/FadeInStagger';
import { AmbientOrbs } from '../components/motion/AmbientOrbs';
import {
  Mic,
  FileSearch,
  FileText,
  Calculator,
  MapPin,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Search,
  Lock,
  CheckCircle2,
  Clock,
  Stamp,
  Building2,
  ChevronRight,
  Sliders,
  Activity,
  Scale,
  FileCheck2,
} from 'lucide-react';
import { formatTND } from '../lib/utils';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();

  // Interactive State
  const [searchVal, setSearchVal] = useState('');
  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'tax' | 'lease'>('passport');
  const [interactiveBudget, setInteractiveBudget] = useState<number>(35000);
  const [selectedWilaya, setSelectedWilaya] = useState('Tunis');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/copilot?q=${encodeURIComponent(searchVal)}`);
    } else {
      router.push('/copilot');
    }
  };

  // Localized Inspector Documents Data
  const inspectorDocs = {
    passport: {
      type:
        locale === 'ar'
          ? 'تجديد جواز السفر التونسي'
          : locale === 'derja'
          ? 'Passeport Tounsi (Renouvellement)'
          : locale === 'en'
          ? 'Tunisian Passport Renewal'
          : 'Renouvellement Passeport Tunisien',
      authority:
        locale === 'ar'
          ? 'وزارة الداخلية (مركز الشرطة أو الحرس الوطني)'
          : locale === 'derja'
          ? 'Wizarat el Dakhiliya (Markez el Chorta / Garde)'
          : locale === 'en'
          ? 'Ministry of Interior (Police / National Guard Desk)'
          : 'Ministère de l’Intérieur (Poste de Police / Garde)',
      fee: '86.000 DT',
      time:
        locale === 'ar'
          ? '7 - 15 يوماً'
          : locale === 'derja'
          ? '7 - 15 Youm'
          : locale === 'en'
          ? '7 - 15 days'
          : '7 - 15 jours',
      stamp:
        locale === 'ar'
          ? 'طابع جبائي 80 د.ت (تعريفة عادية)'
          : locale === 'derja'
          ? 'Timbre 80 DT (Tarif 3adi)'
          : locale === 'en'
          ? '80 DT Fiscal Stamp'
          : '80.000 DT (Tarif Ordinaire)',
      points: [
        locale === 'ar'
          ? 'شراء طابع جبائي بقيمة 80 د.ت من القباضة المالية'
          : locale === 'derja'
          ? 'Timbre fiscal 80 DT men el 9badha el Maliya'
          : locale === 'en'
          ? 'Mandatory 80 DT fiscal stamp from Recette des Finances'
          : 'Timbre fiscal 80 DT obligatoire de la Recette',
        locale === 'ar'
          ? '4 صور شمسية حديثة بخلفية بيضاء'
          : locale === 'derja'
          ? '4 tsawer shamsiya jdod b’fond abyedh'
          : locale === 'en'
          ? '4 recent passport photos on white background'
          : '4 photos d’identité récentes sur fond blanc',
        locale === 'ar'
          ? 'تسليم جواز السفر القديم المنتهي الصلاحية'
          : locale === 'derja'
          ? 'Rajja3 el passeport el 9dim el moufa'
          : locale === 'en'
          ? 'Surrender of expiring / old passport'
          : 'Restitution de l’ancien passeport',
      ],
    },
    tax: {
      type:
        locale === 'ar'
          ? 'إعلام بالضريبة على العقارات المبنية (زبلة وخروبة)'
          : locale === 'derja'
          ? 'Avis d’Imposition (Zebla w Khrouba)'
          : locale === 'en'
          ? 'Municipal Property Tax Notice (Zebla w Khrouba)'
          : 'Avis d’Imposition Fiscale (Zebla w Khrouba)',
      authority:
        locale === 'ar'
          ? 'الإدارة العامة للأداءات والبلدية'
          : locale === 'derja'
          ? 'Idarat el Jibaya & Baladiya'
          : locale === 'en'
          ? 'General Directorate of Taxes & Municipality'
          : 'Direction Générale des Impôts & Baladiya',
      fee: '85.000 DT',
      time:
        locale === 'ar'
          ? 'قبل 31 ديسمبر'
          : locale === 'derja'
          ? '9bel 31 Décembre'
          : locale === 'en'
          ? 'Before Dec 31st'
          : 'Avant le 31 Décembre',
      stamp:
        locale === 'ar'
          ? 'معلوم موظف على العقار'
          : locale === 'derja'
          ? 'Ma3loum el Dar'
          : locale === 'en'
          ? 'Statutory Municipal Assessment'
          : 'Taxe Forfaitaire Bâtie',
      points: [
        locale === 'ar'
          ? 'معلوم بلدي سنوي إجباري على العقارات والمحلات المبنية'
          : locale === 'derja'
          ? 'Ma3loum baladi sanawi ejbari 3al dyar wel 3a9arat'
          : locale === 'en'
          ? 'Statutory annual municipal tax on built residential properties'
          : 'Taxe municipale annuelle sur les immeubles bâtis',
        locale === 'ar'
          ? 'الخلاص بالقباضة البلدية أو عن بعد'
          : locale === 'derja'
          ? 'Khalas fel 9badha el baladiya walla en ligne'
          : locale === 'en'
          ? 'Payable at municipal tax collector or via online portal'
          : 'Paiement à la Recette Municipale ou par carte',
        locale === 'ar'
          ? 'خطية تأخير بنسبة 0.75% شهرياً في صورة عدم الدفع'
          : locale === 'derja'
          ? 'Khatya 0.75% kol chhar ba3d el wa9t'
          : locale === 'en'
          ? '0.75% monthly late interest penalty applies after deadline'
          : 'Pénalité de 0.75% par mois en cas de retard',
      ],
    },
    lease: {
      type:
        locale === 'ar'
          ? 'عقد كراء سكني مصادق (التعريف بالإمضاء)'
          : locale === 'derja'
          ? 'Contrat de Bail Mrigel (3a9d Kré)'
          : locale === 'en'
          ? 'Certified Residential Lease Agreement'
          : 'Contrat de Location Résidentiel (3a9d Kré)',
      authority:
        locale === 'ar'
          ? 'البلدية (مصلحة التعريف بالإمضاء)'
          : locale === 'derja'
          ? 'Baladiya (Ta3rif bel Imdha2)'
          : locale === 'en'
          ? 'Municipality (Signature Legalization Desk)'
          : 'Municipalité (Baladiya Ta3rif bel Imdha2)',
      fee: '35.000 DT',
      time:
        locale === 'ar'
          ? 'فوري بالبلدية'
          : locale === 'derja'
          ? 'Direct fel Baladiya'
          : locale === 'en'
          ? 'Immediate at counter'
          : 'Immédiat au guichet',
      stamp:
        locale === 'ar'
          ? '30 د.ت تسجيل + 5 د.ت طابع بلدي'
          : locale === 'derja'
          ? '30 DT Tasjil + 5 DT Timbre Baladi'
          : locale === 'en'
          ? '30 DT Registration + 5 DT Municipal'
          : '30 DT Enregistrement + 5 DT Baladiya',
      points: [
        locale === 'ar'
          ? 'مطابق للفصل 1104 من مجلة الالتزامات والعقود (م.ا.ع)'
          : locale === 'derja'
          ? 'Mrigel 7asb Majallat el Iltizamat wel 3o9oud (COC)'
          : locale === 'en'
          ? 'Code of Obligations & Contracts (COC) compliant'
          : 'Conforme aux articles 1104 du Code des Contrats',
        locale === 'ar'
          ? 'حضور المؤجر والمكتري شخصياً مع بطاقة التعريف'
          : locale === 'derja'
          ? '7dhour el keri wel mekré b’bita9at ta3rif (CIN)'
          : locale === 'en'
          ? 'Physical in-person presence of lessor and lessee required'
          : 'Légalisation des signatures en présence physique',
        locale === 'ar'
          ? 'تسجيل العقد وجوباً بالقباضة المالية خلال 60 يوماً'
          : locale === 'derja'
          ? 'Tasjil ejbari fel 9badha el Maliya fi 60 youm'
          : locale === 'en'
          ? 'Mandatory formal registration at tax office within 60 days'
          : 'Enregistrement obligatoire à la Recette dans les 60 jours',
      ],
    },
  };

  const currentDoc = inspectorDocs[activeInspectorDoc];

  // Dynamic calculations for the 1% tax simulator
  const simulatedTax = interactiveBudget * 0.01;
  const simulatedCnss = 200; // ~50 DT / quarter
  const simulatedNet = interactiveBudget - simulatedTax - simulatedCnss;

  const wilayaData: Record<string, { baladiya: string; recette: string }> = {
    Tunis: {
      baladiya: locale === 'ar' ? 'القصبة / باب بحر (08:30 - 16:30)' : 'Kasbah / Bab Bhar (08:30 - 16:30)',
      recette: locale === 'ar' ? 'باب سويقة والقصبة (08:00 - 15:30)' : 'Beb Souika & Kasbah (08:00 - 15:30)',
    },
    Ariana: {
      baladiya: locale === 'ar' ? 'أريانة المدينة / المنزه 6 (08:30 - 16:30)' : 'Ariana Ville / Menzah 6 (08:30 - 16:30)',
      recette: locale === 'ar' ? 'أريانة المركز (08:00 - 15:30)' : 'Ariana Centre (08:00 - 15:30)',
    },
    Sousse: {
      baladiya: locale === 'ar' ? 'بوحسينة / خزامة (08:30 - 16:30)' : 'Bouhsina / Khezama (08:30 - 16:30)',
      recette: locale === 'ar' ? 'سوسة المدينة (08:00 - 15:30)' : 'Sousse Médina (08:00 - 15:30)',
    },
    Sfax: {
      baladiya: locale === 'ar' ? 'صفاقس المدينة / ساقية الزيت (08:30 - 16:30)' : 'Sfax Ville / Sakiet Ezzit (08:30 - 16:30)',
      recette: locale === 'ar' ? 'صفاقس الميناء والمركز (08:00 - 15:30)' : 'Sfax Port & Centre (08:00 - 15:30)',
    },
    Nabeul: {
      baladiya: locale === 'ar' ? 'نابل / الحمامات (08:30 - 16:30)' : 'Nabeul / Hammamet (08:30 - 16:30)',
      recette: locale === 'ar' ? 'نابل المركز (08:00 - 15:30)' : 'Nabeul Centre (08:00 - 15:30)',
    },
    Bizerte: {
      baladiya: locale === 'ar' ? 'بنزرت المدينة / منزل بورقيبة (08:30 - 16:30)' : 'Bizerte Ville / Menzel B. (08:30 - 16:30)',
      recette: locale === 'ar' ? 'بنزرت الميناء (08:00 - 15:30)' : 'Bizerte Port (08:00 - 15:30)',
    },
  };

  // Localized UI Labels
  const ui = {
    nationalPlatform:
      locale === 'ar'
        ? 'إدارة.تونس · المنظومة الإدارية الذكية'
        : locale === 'derja'
        ? 'Idaara.tn · El Menassa el Idariya el Thakiya'
        : locale === 'en'
        ? 'IDAARA AI · NATIONAL CIVIC PLATFORM'
        : 'IDAARA AI · RÉSEAU CITOYEN NATIONAL',
    jort2026: 'JORT 2026',
    directAccess:
      locale === 'ar'
        ? 'روابط مباشرة :'
        : locale === 'derja'
        ? 'Rawabit Moubechra :'
        : locale === 'en'
        ? 'Direct Access:'
        : 'Accès Direct :',
    officialDoc:
      locale === 'ar'
        ? 'وثيقة رسمية'
        : locale === 'derja'
        ? 'Wathi9a Rasmiya'
        : locale === 'en'
        ? 'OFFICIAL DOCUMENT'
        : 'DOCUMENT OFFICIEL',
    repTun:
      locale === 'ar'
        ? 'الجمهورية التونسية'
        : locale === 'derja'
        ? 'El Joumhouriya el Tounsiya'
        : locale === 'en'
        ? 'REP. OF TUNISIA'
        : 'RÉP. TUNISIENNE',
    totalEst:
      locale === 'ar'
        ? 'المجموع التقديري'
        : locale === 'derja'
        ? 'El Majmou3 el Te9ribi'
        : locale === 'en'
        ? 'Estimated Total'
        : 'Total Estimé',
    legalSummary:
      locale === 'ar'
        ? 'الملخص القانوني والشروط :'
        : locale === 'derja'
        ? 'El Chourout wel Awra9 :'
        : locale === 'en'
        ? 'LEGAL SUMMARY & REQUIREMENTS:'
        : 'SYNTHÈSE JURIDIQUE & EXIGENCES :',
    fullDossier:
      locale === 'ar'
        ? 'الملف الكامل'
        : locale === 'derja'
        ? 'El Dossier Kemel'
        : locale === 'en'
        ? 'Full Dossier'
        : 'Dossier Complet',
    openStatus:
      locale === 'ar'
        ? 'مفتوح'
        : locale === 'derja'
        ? 'Ma7loul'
        : locale === 'en'
        ? 'Open'
        : 'Ouvert',
    simulatorEyebrow:
      locale === 'ar'
        ? 'حاسبة المحاكاة الجبائية المباشرة'
        : locale === 'derja'
        ? '7asbet el Driba wel Masrouf en Direct'
        : locale === 'en'
        ? 'REALTIME TAX & STAMP SIMULATOR'
        : 'SIMULATEUR INTERACTIF EN DIRECT',
    simulatorTitle:
      locale === 'ar'
        ? 'حاسبة الضرائب وصافي الدخل للمبادر الذاتي'
        : locale === 'derja'
        ? '7asebet el Driba 1% w el CNSS lel Auto-Entrepreneur'
        : locale === 'en'
        ? 'Live Auto-Entrepreneur Tax & Net Calculator'
        : 'Calculateur Budgétaire & Fiscal en Direct',
    simulatorDesc:
      locale === 'ar'
        ? 'حرّك المؤشر حسب رقم معاملاتك التقديري لمعرفة الضريبة 1% ومساهمة الضمان الاجتماعي وصافي دخلك السنوي.'
        : locale === 'derja'
        ? 'Baddel el curseur 7asb el Chiffre d’Affaires mte3ek bech tchouf el 1% driba, el CNSS, w 9adech yo93odlek net fi jeybek.'
        : locale === 'en'
        ? 'Adjust the revenue slider to simulate in real-time your 1% flat income tax, CNSS coverage, and net earnings.'
        : 'Ajustez le curseur de chiffre d’affaires pour simuler en temps réel vos impôts au forfait de 1% et vos cotisations CNSS.',
    revSliderLabel:
      locale === 'ar'
        ? 'رقم المعاملات السنوي التقديري (د.ت) :'
        : locale === 'derja'
        ? 'El Chiffre d’Affaires el Sanawi (DT) :'
        : locale === 'en'
        ? 'Estimated Annual Turnover (TND):'
        : 'Chiffre d’Affaires Annuel Estimé (TND) :',
    legalCeiling:
      locale === 'ar'
        ? 'السقف القانوني : 75 ألف د.ت / سنوياً'
        : locale === 'derja'
        ? 'Plafond 9anouni : 75 alf DT / 3am'
        : locale === 'en'
        ? 'Statutory Ceiling: 75,000 DT / yr'
        : 'Plafond Légal : 75 000 DT / an',
    decreeBadge:
      locale === 'ar'
        ? 'امتياز قانون المبادر الذاتي (مرسوم 2020-33) :'
        : locale === 'derja'
        ? 'Imtiyaz el Auto-Entrepreneur (Décret 2020-33) :'
        : locale === 'en'
        ? 'Auto-Entrepreneur Statutory Advantage (Decree 2020-33):'
        : 'Avantage Loi Auto-Entrepreneur (Décret 2020-33) :',
    decreeText:
      locale === 'ar'
        ? 'نسبة ضريبية وحيدة 1% لمهن الخدمات والمطورين والمصممين. إعفاء كامل من الأداء على القيمة المضافة (TVA) عند التصدير مع ترخيص بالعملة الصعبة من البنك المركزي.'
        : locale === 'derja'
        ? 'Taux wa7id 1% lel services wel devs. Mo3fa kemel men el TVA fel export m3a dkhoul el devises homologué men el Banque Centrale (BCT).'
        : locale === 'en'
        ? 'Single 1% flat tax rate for service providers, developers, and freelancers. 0% VAT on export services with BCT foreign currency repatriation compliance.'
        : 'Taux unique libératoire de 1% pour les prestations de services et développeurs. Exonération totale de TVA à l’exportation avec rapatriement de devises (EUR / USD) homologué Banque Centrale.',
    taxCardTitle:
      locale === 'ar'
        ? '1. الضريبة 1% (الخدمات)'
        : locale === 'derja'
        ? '1. Driba 1% (Services)'
        : locale === 'en'
        ? '1. 1% Tax (Services)'
        : '1. Impôt 1% (Services)',
    taxCardSub:
      locale === 'ar'
        ? 'سنوي جزافي'
        : locale === 'derja'
        ? 'Sanawi Forfaitaire'
        : locale === 'en'
        ? 'Annual Flat Tax'
        : 'Annuel forfaitaire',
    cnssCardTitle:
      locale === 'ar'
        ? '2. التغطية الاجتماعية CNSS'
        : locale === 'derja'
        ? '2. CNSS Daman Ijtima3i'
        : locale === 'en'
        ? '2. CNSS Health Coverage'
        : '2. CNSS Santé',
    cnssCardSub:
      locale === 'ar'
        ? 'حوالي 50 د.ت / ثلاثية'
        : locale === 'derja'
        ? '~50 DT / Thlethya'
        : locale === 'en'
        ? '~50 DT / quarter'
        : '~50 DT / trimestre',
    netCardTitle:
      locale === 'ar'
        ? '3. صافي الدخل'
        : locale === 'derja'
        ? '3. El Net mte3ek'
        : locale === 'en'
        ? '3. Net Income'
        : '3. Revenu Net',
    netCardSub:
      locale === 'ar'
        ? 'في جيبك'
        : locale === 'derja'
        ? 'Fi Jeybek'
        : locale === 'en'
        ? 'Take-home amount'
        : 'Dans votre poche',
    radarEyebrow:
      locale === 'ar'
        ? 'الشبكة الإدارية المباشرة'
        : locale === 'derja'
        ? 'Chabaket el Baladiyas wel 9badhat'
        : locale === 'en'
        ? 'TERRITORIAL PUBLIC DESK RADAR'
        : 'RÉSEAU TERRITORIAL EN DIRECT',
    radarTitle:
      locale === 'ar'
        ? 'مواعيد العمل الرسمية حسب الولاية'
        : locale === 'derja'
        ? 'Aw9at el Khedma 7asb el Wilaya'
        : locale === 'en'
        ? 'Open Desks & Working Hours by Governorate'
        : 'Horaires et Guichets Ouverts par Wilaya',
    baladiyaCardTitle: (w: string) =>
      locale === 'ar'
        ? `البلديات والدوائر (${w})`
        : locale === 'derja'
        ? `Baladiyas & Dawayir (${w})`
        : locale === 'en'
        ? `Municipalities & Baladiyas (${w})`
        : `Municipalités & Baladiyas (${w})`,
    baladiyaCardSub:
      locale === 'ar'
        ? 'التعريف بالإمضاء (Ta3rif bel Imdha2) واستخراج مضامين الحالة المدنية.'
        : locale === 'derja'
        ? 'Ta3rif bel Imdha2 w Madhmoun Wilada.'
        : locale === 'en'
        ? 'Signature legalization & civil status certificates.'
        : 'Légalisation de signature (Ta3rif bel Imdha2) & Extraits d’état civil.',
    recetteCardTitle: (w: string) =>
      locale === 'ar'
        ? `القباضات المالية (${w})`
        : locale === 'derja'
        ? `9badhat Maliya (${w})`
        : locale === 'en'
        ? `Tax Collection Desks (${w})`
        : `Recettes des Finances (${w})`,
    recetteCardSub:
      locale === 'ar'
        ? 'شراء التنابر الجبائية (80 د.ت، 15 د.ت، 5 د.ت) وتسجيل العقود.'
        : locale === 'derja'
        ? 'Chrayen el Timbres (80 DT, 15 DT, 5 DT) w tasjil el 3o9oud.'
        : locale === 'en'
        ? 'Fiscal stamp purchase (80 DT, 15 DT, 5 DT, 3 DT) & contract registration.'
        : 'Vente des timbres fiscaux (80 DT, 15 DT, 5 DT, 3 DT) et enregistrement des contrats.',
  };

  return (
    <div className="space-y-24 sm:space-y-36 pb-28 relative overflow-hidden">

      {/* ── 1. MONUMENTAL HERO STAGE ── */}
      <section className="relative pt-6 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Cinematic Organic Floating Ambient Orbs */}
        <AmbientOrbs variant="emerald" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Typographic Narrative & Voice Launcher */}
          <FadeIn direction="up" className="lg:col-span-6 space-y-6 text-left rtl:text-right relative z-10">
            
            {/* Minimalist Civic Header Index */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 text-xs font-mono text-zinc-500 uppercase tracking-widest"
            >
              <span className="text-emerald-400 font-bold">/</span>
              <span>{ui.nationalPlatform}</span>
              <span className="text-zinc-700">|</span>
              <span className="text-zinc-400">{ui.jort2026}</span>
            </motion.div>

            {/* Monumental Robotic Headline */}
            <h1 className="leading-[1.1] tracking-tight">
              <span className="display-heading block text-3xl sm:text-5xl lg:text-6xl text-[#F5F4F0] font-bold">
                {t('heroHeadline')}
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="display-heading block text-3xl sm:text-5xl lg:text-6xl mt-1 font-extrabold"
                style={{ color: 'var(--stamp-green)' }}
              >
                {t('heroHeadlineHighlight')}
              </motion.span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              {t('heroSubheadline')}
            </p>

            {/* Integrated Fast Action Search Deck */}
            <div className="space-y-3 pt-2">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-emerald-500/70 focus-within:shadow-[0_0_25px_rgba(16,185,129,0.15)] rounded-2xl p-2 shadow-2xl transition-all max-w-xl group"
              >
                <Search className="w-4 h-4 text-zinc-500 mx-3 shrink-0 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder={t('voiceSearchBarPlaceholder')}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-2 min-w-0"
                />
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/copilot"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{locale === 'ar' ? 'المساعد الصوتي' : locale === 'en' ? 'Voice AI' : 'Voice Copilot'}</span>
                  </Link>
                </motion.div>
              </form>

              {/* Direct Procedure Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {ui.directAccess}
                </span>
                {[
                  { name: locale === 'ar' ? 'جواز السفر' : locale === 'derja' ? 'Passeport' : 'Passeport', cost: '86 DT', href: '/procedures/passeport-renouvellement' },
                  { name: locale === 'ar' ? 'البطاقة الرمادية' : locale === 'derja' ? 'Carte Grise' : 'Carte Grise', cost: '145 DT', href: '/procedures/mutation-carte-grise' },
                  { name: locale === 'ar' ? 'عقد الكراء' : locale === 'derja' ? 'Contrat Bail' : 'Contrat Bail', cost: '35 DT', href: '/documents/contrat-location' },
                  { name: locale === 'ar' ? 'المبادر الذاتي' : locale === 'derja' ? 'Auto-Entrepreneur' : 'Auto-Entrepreneur', cost: '1% Tax', href: '/launchpad' },
                ].map((item, idx) => (
                  <motion.div key={idx} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-xs text-zinc-300 transition-all group shadow-sm"
                    >
                      <span className="group-hover:text-emerald-300 transition-colors">{item.name}</span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">{item.cost}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </FadeIn>

          {/* Right Column: Physical Laser Document Scanner & Legal Telemetry (Tactile Inspector) */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-6 relative">
            
            {/* Interactive Document Switcher Tabs */}
            <div className="flex items-center gap-2 mb-3">
              {[
                {
                  id: 'passport' as const,
                  label: locale === 'ar' ? 'جواز السفر' : locale === 'derja' ? 'Passeport' : locale === 'en' ? 'Passport' : 'Passeport',
                  icon: FileCheck2,
                },
                {
                  id: 'tax' as const,
                  label: locale === 'ar' ? 'الضريبة البلدية' : locale === 'derja' ? 'Zebla w Khrouba' : locale === 'en' ? 'Tax Notice' : 'Avis Fiscal',
                  icon: FileText,
                },
                {
                  id: 'lease' as const,
                  label: locale === 'ar' ? 'عقد الكراء' : locale === 'derja' ? '3a9d Kré' : locale === 'en' ? 'Lease Contract' : 'Contrat Bail',
                  icon: Scale,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeInspectorDoc === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveInspectorDoc(tab.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-zinc-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-500'}`} />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* The Document Visual Card with Sweeping Laser Scan Line & Spotlight Hover */}
            <SpotlightCard className="p-6 sm:p-7 border-zinc-800/90 shadow-2xl relative animate-border-glow">
              
              {/* Sweeping Laser Beam Animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser pointer-events-none z-20" />

              {/* Document Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50">
                      {ui.officialDoc}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{ui.repTun}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {currentDoc.type}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{currentDoc.authority}</span>
                  </p>
                </div>

                <div className="text-right rtl:text-left shrink-0">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">{ui.totalEst}</span>
                  <span className="text-base sm:text-lg font-mono font-extrabold text-amber-400">{currentDoc.fee}</span>
                </div>
              </div>

              {/* Key Verification Points */}
              <div className="py-4 space-y-2.5 relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ui.legalSummary}</span>
                </div>

                <div className="space-y-2">
                  {currentDoc.points.map((pt, pIdx) => (
                    <motion.div
                      key={pIdx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pIdx * 0.1 }}
                      className="flex items-start gap-2 text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Document Footer Bar */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between relative z-10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{currentDoc.time}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 text-[11px]">
                    {currentDoc.stamp}
                  </span>
                </div>

                <Link
                  href="/procedures"
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold group"
                >
                  <span>{ui.fullDossier}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </SpotlightCard>

          </FadeIn>

        </div>

      </section>

      {/* ── 2. INTERACTIVE FISCAL STAMP & 1% TAX STUDIO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-6 sm:p-10 border-zinc-800/90 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>{ui.simulatorEyebrow}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {ui.simulatorTitle}
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              {ui.simulatorDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider Control */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-semibold">{ui.revSliderLabel}</span>
                  <span className="text-lg font-mono font-extrabold text-emerald-400">
                    <AnimatedCounter value={interactiveBudget} suffix=" DT" />
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={75000}
                  step={1000}
                  value={interactiveBudget}
                  onChange={(e) => setInteractiveBudget(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg transition-all"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>5 000 DT</span>
                  <span>{ui.legalCeiling}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{ui.decreeBadge}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {ui.decreeText}
                </p>
              </div>
            </div>

            {/* Calculated Breakdown Display with Live Animated Counters */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2 shadow-lg"
              >
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">{ui.taxCardTitle}</span>
                <span className="text-xl font-mono font-extrabold text-amber-400">
                  <AnimatedCounter value={simulatedTax} decimals={3} suffix=" DT" />
                </span>
                <span className="text-[10px] text-zinc-500">{ui.taxCardSub}</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2 shadow-lg"
              >
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">{ui.cnssCardTitle}</span>
                <span className="text-xl font-mono font-extrabold text-zinc-200">
                  <AnimatedCounter value={simulatedCnss} decimals={3} suffix=" DT" />
                </span>
                <span className="text-[10px] text-zinc-500">{ui.cnssCardSub}</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between space-y-2 shadow-lg shadow-emerald-950/50"
              >
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-300">{ui.netCardTitle}</span>
                <span className="text-xl font-mono font-extrabold text-emerald-400">
                  <AnimatedCounter value={simulatedNet} decimals={3} suffix=" DT" />
                </span>
                <span className="text-[10px] text-emerald-300/80">{ui.netCardSub}</span>
              </motion.div>

            </div>

          </div>

        </SpotlightCard>
      </section>

      {/* ── 3. TERRITORIAL RADAR: 24 WILAYAS PUBLIC DESKS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-zinc-800/80">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              {ui.radarEyebrow}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {ui.radarTitle}
            </h2>
          </div>

          {/* Wilaya Selector Bar with spring pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.keys(wilayaData).map((w) => (
              <motion.button
                key={w}
                onClick={() => setSelectedWilaya(w)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedWilaya === w
                    ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {w}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpotlightCard className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{ui.baladiyaCardTitle(selectedWilaya)}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-bold">
                {ui.openStatus}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-300">
              {wilayaData[selectedWilaya].baladiya}
            </p>
            <p className="text-[11px] text-zinc-400 pt-1">
              {ui.baladiyaCardSub}
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>{ui.recetteCardTitle(selectedWilaya)}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-bold">
                {ui.openStatus}
              </span>
            </div>
            <p className="text-xs font-mono text-amber-300">
              {wilayaData[selectedWilaya].recette}
            </p>
            <p className="text-[11px] text-zinc-400 pt-1">
              {ui.recetteCardSub}
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* ── 4. ZERO-STORAGE PRIVACY PROTOCOL ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-6 sm:p-7 border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-[#0d0e12] to-[#0d0e12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xl">
          <div className="flex items-start sm:items-center gap-4 text-left rtl:text-right">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950/80 mt-0.5 sm:mt-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {t('zeroStorageBanner')}
                </h4>
                <span className="text-[10px] font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50">
                  100% Client-Side
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                {t('zeroStorageSub')}
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="shrink-0 w-full sm:w-auto">
            <Link
              href="/fasserli"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>
                {locale === 'ar'
                  ? 'تجربة الفحص الآمن'
                  : locale === 'derja'
                  ? 'Jarreb el Scanner el Sécurisé'
                  : locale === 'en'
                  ? 'Test Secure OCR'
                  : 'Tester le Scanner Sécurisé'}
              </span>
            </Link>
          </motion.div>
        </SpotlightCard>
      </section>

    </div>
  );
}
