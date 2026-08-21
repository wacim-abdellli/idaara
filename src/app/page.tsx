'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
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
          : locale === 'en'
          ? 'Tunisian Passport Renewal'
          : 'Renouvellement Passeport Tunisien',
      authority:
        locale === 'ar'
          ? 'وزارة الداخلية (مركز الشرطة أو الحرس الوطني)'
          : locale === 'en'
          ? 'Ministry of Interior (Police / National Guard Desk)'
          : 'Ministère de l’Intérieur (Poste de Police / Garde)',
      fee: '86.000 DT',
      time: locale === 'ar' ? '7 - 15 يوماً' : locale === 'en' ? '7 - 15 days' : '7 - 15 jours',
      stamp:
        locale === 'ar'
          ? 'طابع جبائي 80 د.ت (تعريفة عادية)'
          : locale === 'en'
          ? '80 DT Fiscal Stamp'
          : '80.000 DT (Tarif Ordinaire)',
      points: [
        locale === 'ar'
          ? 'شراء طابع جبائي بقيمة 80 د.ت من القباضة المالية'
          : locale === 'en'
          ? 'Mandatory 80 DT fiscal stamp from Recette des Finances'
          : 'Timbre fiscal 80 DT obligatoire de la Recette',
        locale === 'ar'
          ? '4 صور شمسية حديثة بخلفية بيضاء'
          : locale === 'en'
          ? '4 recent passport photos on white background'
          : '4 photos d’identité récentes sur fond blanc',
        locale === 'ar'
          ? 'تسليم جواز السفر القديم المنتهي الصلاحية'
          : locale === 'en'
          ? 'Surrender of expiring / old passport'
          : 'Restitution de l’ancien passeport',
      ],
    },
    tax: {
      type:
        locale === 'ar'
          ? 'إعلام بالضريبة على العقارات المبنية (زبلة وخروبة)'
          : locale === 'en'
          ? 'Municipal Property Tax Notice (Zebla w Khrouba)'
          : 'Avis d’Imposition Fiscale (Zebla w Khrouba)',
      authority:
        locale === 'ar'
          ? 'الإدارة العامة للأداءات والبلدية'
          : locale === 'en'
          ? 'General Directorate of Taxes & Municipality'
          : 'Direction Générale des Impôts & Baladiya',
      fee: '85.000 DT',
      time: locale === 'ar' ? 'قبل 31 ديسمبر' : locale === 'en' ? 'Before Dec 31st' : 'Avant le 31 Décembre',
      stamp:
        locale === 'ar'
          ? 'معلوم موظف على العقار'
          : locale === 'en'
          ? 'Statutory Municipal Assessment'
          : 'Taxe Forfaitaire Bâtie',
      points: [
        locale === 'ar'
          ? 'معلوم بلدي سنوي إجباري على العقارات والمحلات المبنية'
          : locale === 'en'
          ? 'Statutory annual municipal tax on built residential properties'
          : 'Taxe municipale annuelle sur les immeubles bâtis',
        locale === 'ar'
          ? 'الخلاص بالقباضة البلدية أو عن بعد'
          : locale === 'en'
          ? 'Payable at municipal tax collector or via online portal'
          : 'Paiement à la Recette Municipale ou par carte',
        locale === 'ar'
          ? 'خطية تأخير بنسبة 0.75% شهرياً في صورة عدم الدفع'
          : locale === 'en'
          ? '0.75% monthly late interest penalty applies after deadline'
          : 'Pénalité de 0.75% par mois en cas de retard',
      ],
    },
    lease: {
      type:
        locale === 'ar'
          ? 'عقد كراء سكني مصادق (التعريف بالإمضاء)'
          : locale === 'en'
          ? 'Certified Residential Lease Agreement'
          : 'Contrat de Location Résidentiel (3a9d Kré)',
      authority:
        locale === 'ar'
          ? 'البلدية (مصلحة التعريف بالإمضاء)'
          : locale === 'en'
          ? 'Municipality (Signature Legalization Desk)'
          : 'Municipalité (Baladiya Ta3rif bel Imdha2)',
      fee: '35.000 DT',
      time: locale === 'ar' ? 'فوري بالبلدية' : locale === 'en' ? 'Immediate at counter' : 'Immédiat au guichet',
      stamp:
        locale === 'ar'
          ? '30 د.ت تسجيل + 5 د.ت طابع بلدي'
          : locale === 'en'
          ? '30 DT Registration + 5 DT Municipal'
          : '30 DT Enregistrement + 5 DT Baladiya',
      points: [
        locale === 'ar'
          ? 'مطابق للفصل 1104 من مجلة الالتزامات والعقود (م.ا.ع)'
          : locale === 'en'
          ? 'Code of Obligations & Contracts (COC) compliant'
          : 'Conforme aux articles 1104 du Code des Contrats',
        locale === 'ar'
          ? 'حضور المؤجر والمكتري شخصياً مع بطاقة التعريف'
          : locale === 'en'
          ? 'Physical in-person presence of lessor and lessee required'
          : 'Légalisation des signatures en présence physique',
        locale === 'ar'
          ? 'تسجيل العقد وجوباً بالقباضة المالية خلال 60 يوماً'
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
    nationalPlatform: locale === 'ar' ? 'إدارة.تونس · المنظومة الإدارية الذكية' : locale === 'en' ? 'IDAARA AI · NATIONAL CIVIC PLATFORM' : 'IDAARA AI · RÉSEAU CITOYEN NATIONAL',
    jort2026: 'JORT 2026',
    directAccess: locale === 'ar' ? 'روابط مباشرة :' : locale === 'en' ? 'Direct Access:' : 'Accès Direct :',
    officialDoc: locale === 'ar' ? 'وثيقة رسمية' : locale === 'en' ? 'OFFICIAL DOCUMENT' : 'DOCUMENT OFFICIEL',
    repTun: locale === 'ar' ? 'الجمهورية التونسية' : locale === 'en' ? 'REP. OF TUNISIA' : 'RÉP. TUNISIENNE',
    totalEst: locale === 'ar' ? 'المجموع التقديري' : locale === 'en' ? 'Estimated Total' : 'Total Estimé',
    legalSummary: locale === 'ar' ? 'الملخص القانوني والشروط :' : locale === 'en' ? 'LEGAL SUMMARY & REQUIREMENTS:' : 'SYNTHÈSE JURIDIQUE & EXIGENCES :',
    fullDossier: locale === 'ar' ? 'الملف الكامل' : locale === 'en' ? 'Full Dossier' : 'Dossier Complet',
    openStatus: locale === 'ar' ? 'مفتوح' : locale === 'en' ? 'Open' : 'Ouvert',
    simulatorEyebrow: locale === 'ar' ? 'حاسبة المحاكاة الجبائية المباشرة' : locale === 'en' ? 'REALTIME TAX & STAMP SIMULATOR' : 'SIMULATEUR INTERACTIF EN DIRECT',
    simulatorTitle: locale === 'ar' ? 'حاسبة الضرائب وصافي الدخل للمبادر الذاتي' : locale === 'en' ? 'Live Auto-Entrepreneur Tax & Net Calculator' : 'Calculateur Budgétaire & Fiscal en Direct',
    simulatorDesc:
      locale === 'ar'
        ? 'حرّك المؤشر حسب رقم معاملاتك التقديري لمعرفة الضريبة 1% ومساهمة الضمان الاجتماعي وصافي دخلك السنوي.'
        : locale === 'en'
        ? 'Adjust the revenue slider to simulate in real-time your 1% flat income tax, CNSS coverage, and net earnings.'
        : 'Ajustez le curseur de chiffre d’affaires pour simuler en temps réel vos impôts au forfait de 1% et vos cotisations CNSS.',
    revSliderLabel: locale === 'ar' ? 'رقم المعاملات السنوي التقديري (د.ت) :' : locale === 'en' ? 'Estimated Annual Turnover (TND):' : 'Chiffre d’Affaires Annuel Estimé (TND) :',
    legalCeiling: locale === 'ar' ? 'السقف القانوني : 75 ألف د.ت / سنوياً' : locale === 'en' ? 'Statutory Ceiling: 75,000 DT / yr' : 'Plafond Légal : 75 000 DT / an',
    decreeBadge: locale === 'ar' ? 'امتياز قانون المبادر الذاتي (مرسوم 2020-33) :' : locale === 'en' ? 'Auto-Entrepreneur Statutory Advantage (Decree 2020-33):' : 'Avantage Loi Auto-Entrepreneur (Décret 2020-33) :',
    decreeText:
      locale === 'ar'
        ? 'نسبة ضريبية وحيدة 1% لمهن الخدمات والمطورين والمصممين. إعفاء كامل من الأداء على القيمة المضافة (TVA) عند التصدير مع ترخيص بالعملة الصعبة من البنك المركزي.'
        : locale === 'en'
        ? 'Single 1% flat tax rate for service providers, developers, and freelancers. 0% VAT on export services with BCT foreign currency repatriation compliance.'
        : 'Taux unique libératoire de 1% pour les prestations de services et développeurs. Exonération totale de TVA à l’exportation avec rapatriement de devises (EUR / USD) homologué Banque Centrale.',
    taxCardTitle: locale === 'ar' ? '1. الضريبة 1% (الخدمات)' : locale === 'en' ? '1. 1% Tax (Services)' : '1. Impôt 1% (Services)',
    taxCardSub: locale === 'ar' ? 'سنوي جزافي' : locale === 'en' ? 'Annual Flat Tax' : 'Annuel forfaitaire',
    cnssCardTitle: locale === 'ar' ? '2. التغطية الاجتماعية CNSS' : locale === 'en' ? '2. CNSS Health Coverage' : '2. CNSS Santé',
    cnssCardSub: locale === 'ar' ? 'حوالي 50 د.ت / ثلاثية' : locale === 'en' ? '~50 DT / quarter' : '~50 DT / trimestre',
    netCardTitle: locale === 'ar' ? '3. صافي الدخل' : locale === 'en' ? '3. Net Income' : '3. Revenu Net',
    netCardSub: locale === 'ar' ? 'في جيبك' : locale === 'en' ? 'Take-home amount' : 'Dans votre poche',
    radarEyebrow: locale === 'ar' ? 'الشبكة الإدارية المباشرة' : locale === 'en' ? 'TERRITORIAL PUBLIC DESK RADAR' : 'RÉSEAU TERRITORIAL EN DIRECT',
    radarTitle: locale === 'ar' ? 'مواعيد العمل الرسمية حسب الولاية' : locale === 'en' ? 'Open Desks & Working Hours by Governorate' : 'Horaires et Guichets Ouverts par Wilaya',
    baladiyaCardTitle: (w: string) => locale === 'ar' ? `البلديات والدوائر (${w})` : locale === 'en' ? `Municipalities & Baladiyas (${w})` : `Municipalités & Baladiyas (${w})`,
    baladiyaCardSub: locale === 'ar' ? 'التعريف بالإمضاء (Ta3rif bel Imdha2) واستخراج مضامين الحالة المدنية.' : locale === 'en' ? 'Signature legalization & civil status certificates.' : 'Légalisation de signature (Ta3rif bel Imdha2) & Extraits d’état civil.',
    recetteCardTitle: (w: string) => locale === 'ar' ? `القباضات المالية (${w})` : locale === 'en' ? `Tax Collection Desks (${w})` : `Recettes des Finances (${w})`,
    recetteCardSub: locale === 'ar' ? 'شراء التنابر الجبائية (80 د.ت، 15 د.ت، 5 د.ت) وتسجيل العقود.' : locale === 'en' ? 'Fiscal stamp purchase (80 DT, 15 DT, 5 DT, 3 DT) & contract registration.' : 'Vente des timbres fiscaux (80 DT, 15 DT, 5 DT, 3 DT) et enregistrement des contrats.',
  };

  return (
    <div className="space-y-24 sm:space-y-36 pb-28 relative overflow-hidden">

      {/* ── 1. MONUMENTAL HERO STAGE ── */}
      <section className="relative pt-6 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Ambient Glows */}
        <div className="absolute -top-12 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Typographic Narrative & Voice Launcher */}
          <div className="lg:col-span-6 space-y-6 text-left rtl:text-right relative z-10">
            
            {/* Minimalist Civic Header Index */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span className="text-emerald-400 font-bold">/</span>
              <span>{ui.nationalPlatform}</span>
              <span className="text-zinc-700">|</span>
              <span className="text-zinc-400">{ui.jort2026}</span>
            </div>

            {/* Monumental Robotic Headline */}
            <h1 className="leading-[1.1] tracking-tight">
              <span className="display-heading block text-3xl sm:text-5xl lg:text-6xl text-[#F5F4F0] font-bold">
                {t('heroHeadline')}
              </span>
              <span
                className="display-heading block text-3xl sm:text-5xl lg:text-6xl mt-1 font-extrabold"
                style={{ color: 'var(--stamp-green)' }}
              >
                {t('heroHeadlineHighlight')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              {t('heroSubheadline')}
            </p>

            {/* Integrated Fast Action Search Deck */}
            <div className="space-y-3 pt-2">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-emerald-500/70 rounded-2xl p-2 shadow-2xl transition-all max-w-xl group"
              >
                <Search className="w-4 h-4 text-zinc-500 mx-3 shrink-0 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder={t('voiceSearchBarPlaceholder')}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-2 min-w-0"
                />
                <Link
                  href="/copilot"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'المساعد الصوتي' : locale === 'en' ? 'Voice AI' : 'Voice Copilot'}</span>
                </Link>
              </form>

              {/* Direct Procedure Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {ui.directAccess}
                </span>
                {[
                  { name: locale === 'ar' ? 'جواز السفر' : 'Passeport', cost: '86 DT', href: '/procedures/passeport-renouvellement' },
                  { name: locale === 'ar' ? 'البطاقة الرمادية' : 'Carte Grise', cost: '145 DT', href: '/procedures/mutation-carte-grise' },
                  { name: locale === 'ar' ? 'عقد الكراء' : 'Contrat Bail', cost: '35 DT', href: '/documents/contrat-location' },
                  { name: locale === 'ar' ? 'المبادر الذاتي' : 'Auto-Entrepreneur', cost: '1% Tax', href: '/launchpad' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-xs text-zinc-300 transition-all group"
                  >
                    <span className="group-hover:text-emerald-300 transition-colors">{item.name}</span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{item.cost}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Physical Laser Document Scanner & Legal Telemetry (Tactile Inspector) */}
          <div className="lg:col-span-6 relative">
            
            {/* Interactive Document Switcher Tabs */}
            <div className="flex items-center gap-2 mb-3">
              {[
                {
                  id: 'passport' as const,
                  label: locale === 'ar' ? 'جواز السفر' : locale === 'en' ? 'Passport' : 'Passeport',
                  icon: FileCheck2,
                },
                {
                  id: 'tax' as const,
                  label: locale === 'ar' ? 'الضريبة البلدية' : locale === 'en' ? 'Tax Notice' : 'Avis Fiscal',
                  icon: FileText,
                },
                {
                  id: 'lease' as const,
                  label: locale === 'ar' ? 'عقد الكراء' : locale === 'en' ? 'Lease Contract' : 'Contrat Bail',
                  icon: Scale,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeInspectorDoc === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveInspectorDoc(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-zinc-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* The Document Visual Card with Sweeping Laser Scan Line */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-zinc-800/90 bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 shadow-2xl relative overflow-hidden animate-border-glow">
              
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
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
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

            </div>

          </div>

        </div>

      </section>

      {/* ── 2. INTERACTIVE FISCAL STAMP & 1% TAX STUDIO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-zinc-800/90 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-zinc-950 shadow-2xl space-y-8">
          
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
                    {interactiveBudget.toLocaleString()} DT
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={75000}
                  step={1000}
                  value={interactiveBudget}
                  onChange={(e) => setInteractiveBudget(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
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

            {/* Calculated Breakdown Display */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">{ui.taxCardTitle}</span>
                <span className="text-xl font-mono font-extrabold text-amber-400">
                  {formatTND(simulatedTax, locale)}
                </span>
                <span className="text-[10px] text-zinc-500">{ui.taxCardSub}</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">{ui.cnssCardTitle}</span>
                <span className="text-xl font-mono font-extrabold text-zinc-200">
                  {formatTND(simulatedCnss, locale)}
                </span>
                <span className="text-[10px] text-zinc-500">{ui.cnssCardSub}</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-300">{ui.netCardTitle}</span>
                <span className="text-xl font-mono font-extrabold text-emerald-400">
                  {formatTND(simulatedNet, locale)}
                </span>
                <span className="text-[10px] text-emerald-300/80">{ui.netCardSub}</span>
              </div>

            </div>

          </div>

        </div>
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

          {/* Wilaya Selector Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.keys(wilayaData).map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWilaya(w)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedWilaya === w
                    ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{ui.baladiyaCardTitle(selectedWilaya)}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                {ui.openStatus}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-300">
              {wilayaData[selectedWilaya].baladiya}
            </p>
            <p className="text-[11px] text-zinc-500 pt-1">
              {ui.baladiyaCardSub}
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>{ui.recetteCardTitle(selectedWilaya)}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                {ui.openStatus}
              </span>
            </div>
            <p className="text-xs font-mono text-amber-300">
              {wilayaData[selectedWilaya].recette}
            </p>
            <p className="text-[11px] text-zinc-500 pt-1">
              {ui.recetteCardSub}
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. ZERO-STORAGE PRIVACY PROTOCOL ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-zinc-900/90 to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left rtl:text-right">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{t('zeroStorageBanner')}</span>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800/50">
                  100% Client-Side
                </span>
              </h4>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                {t('zeroStorageSub')}
              </p>
            </div>
          </div>

          <Link
            href="/fasserli"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs transition-all hover:scale-105 shrink-0 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{locale === 'en' ? 'Test Secure OCR' : 'Tester le Scanner Sécurisé'}</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
