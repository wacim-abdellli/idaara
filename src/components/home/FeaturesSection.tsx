'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale } from '../../context/LocaleContext';
import { proceduresData } from '../../data/procedures';
import {
  Calculator,
  ArrowRight,
  Bot,
  Sparkles,
  FileText,
  FileCheck2,
  ShieldCheck,
  Scale,
  Building2,
  CheckCircle2,
} from 'lucide-react';

const SpotlightCard = dynamic(
  () => import('../motion/SpotlightCard').then((m) => m.SpotlightCard),
  { ssr: false }
);

export function FeaturesSection() {
  const { locale } = useLocale();

  // Inspector & Interactive State
  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'cin' | 'lease' | 'tax'>('passport');
  const [checkedInspectorItems, setCheckedInspectorItems] = useState<Record<string, boolean>>({
    'passport-0': true,
    'cin-0': true,
    'lease-0': true,
    'tax-0': true,
  });

  const toggleInspectorItem = (key: string) => {
    setCheckedInspectorItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
      url: '/procedures/passeport-renouvellement',
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
    cin: {
      type:
        locale === 'ar'
          ? 'بطاقة التعريف الوطنية (طلب أول مرة / تجديد)'
          : locale === 'derja'
          ? 'Bita9at Ta3rif CIN (Awel marra / Tajdid)'
          : locale === 'en'
          ? 'National Identity Card (CIN)'
          : "Carte d'Identité Nationale (CIN)",
      authority:
        locale === 'ar'
          ? 'وزارة الداخلية (مركز الشرطة أو الحرس الوطني مرجع السكنى)'
          : locale === 'derja'
          ? 'Markez el Chorta walla el 7aras el Marje3 el Tourabi'
          : locale === 'en'
          ? 'Police Station / National Guard Territorial Desk'
          : 'Poste de Police / Garde Nationale Territorial',
      fee: '3.000 DT',
      time:
        locale === 'ar'
          ? '15 - 21 يوماً'
          : locale === 'derja'
          ? '15 - 21 Youm'
          : locale === 'en'
          ? '15 - 21 days'
          : '15 - 21 jours',
      stamp:
        locale === 'ar'
          ? 'طابع جبائي 3 د.ت (طلب أول مرة)'
          : locale === 'derja'
          ? 'Timbre 3 DT'
          : locale === 'en'
          ? '3 DT Fiscal Stamp'
          : 'Timbre Fiscal 3.000 DT',
      url: '/procedures/cin-premiere-demande',
      points: [
        locale === 'ar'
          ? 'مضمون ولادة أصلي لا يتجاوز تاريخ استخراجه 3 أشهر'
          : locale === 'derja'
          ? 'Madhmoun wilada asly a9al men 3 chhour'
          : locale === 'en'
          ? 'Original birth certificate issued within last 3 months'
          : 'Extrait d’acte de naissance original de moins de 3 mois',
        locale === 'ar'
          ? '3 صور شمسية مطابقة للمواصفات الرسمية'
          : locale === 'derja'
          ? '3 tsawer chamsiya motab9a lel mwasafat'
          : locale === 'en'
          ? '3 standard biometric identity photos'
          : '3 photos d’identité officielles conformes',
        locale === 'ar'
          ? 'شهادة إقامة مسلمة من مركز الشرطة أو الحرس'
          : locale === 'derja'
          ? 'Chhadet soukna men markez el chorta'
          : locale === 'en'
          ? 'Certificate of residence from police desk'
          : 'Certificat de résidence délivré par le poste de police',
      ],
    },
    lease: {
      type:
        locale === 'ar'
          ? 'عقد كراء سكني قانوني مطابق (COC)'
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
      url: '/documents/contrat-location',
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
      url: '/fasserli',
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
  };

  const currentDoc = inspectorDocs[activeInspectorDoc];

  return (
    <>
      {/* ── 3. THE 3 GATEWAY POWER PILLARS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto pb-6">
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40">
            {locale === 'ar'
              ? 'الخدمات الأساسية للمواطن'
              : locale === 'derja'
              ? 'Khadamet Asasiya'
              : locale === 'en'
              ? 'Essential Services'
              : 'Services Essentiels'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {locale === 'ar'
              ? 'كل ما تحتاجه لإتمام أوراقك في 3 مسارات واضحة'
              : locale === 'derja'
              ? 'Kol chay t7eb ta3mlou fi 3 bibén wad7in'
              : locale === 'en'
              ? 'Everything You Need in 3 Clear Gateways'
              : 'Tout ce dont vous avez besoin en 3 portes claires'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1: Guides & Timbre Calculator */}
          <SpotlightCard className="p-6 sm:p-7 border-white/[0.1] bg-[#0c0d12] shadow-2xl flex flex-col justify-between space-y-5 hover:border-emerald-500/50 transition-all group relative overflow-hidden rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  {locale === 'ar'
                    ? '1. دليل الإجراءات والتنابر'
                    : locale === 'derja'
                    ? '1. Dalil el Idarat wel Tnaaber'
                    : locale === 'en'
                    ? '1. Guides & Fiscal Stamps'
                    : '1. Guides & Timbres Fiscaux'}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {locale === 'ar'
                    ? 'حساب المعاليم والوثائق الرسمية'
                    : locale === 'derja'
                    ? 'Awra9ek w Tnaabrek bel Mليم'
                    : locale === 'en'
                    ? 'Exact Stamps & Dossier Kits'
                    : 'Calcul des Timbres & Dossier Kit'}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                  {locale === 'ar'
                    ? `قائمة الأوراق المطلوبة لـ ${proceduresData.length} إجراء مدني، حساب الميزانية بالمليم، واستخراج ورقة الملف (Dossier Kit A4) للطباعة.`
                    : locale === 'derja'
                    ? `Koll war9a lezmetek l’${proceduresData.length} procédure, 7asbet el masrouf bel mlim, w telechargi el fiche A4 l’officielle.`
                    : locale === 'en'
                    ? `Required document checklists for ${proceduresData.length} civic procedures, millime-accurate fee calculators, and printable A4 official sheets.`
                    : `Checklists des pièces pour ${proceduresData.length} démarches, calcul au millime près des timbres fiscaux et export de la fiche A4 officielle.`}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/procedures"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <span>
                  {locale === 'ar'
                    ? `تصفح الإجراءات (${proceduresData.length})`
                    : `Voir les ${proceduresData.length} Démarches`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
              <Link
                href="/calculator"
                className="text-[11px] font-semibold text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08]"
              >
                {locale === 'ar' ? 'الحاسبة' : 'Calculateur'}
              </Link>
            </div>
          </SpotlightCard>

          {/* Pillar 2: Derja AI Copilot */}
          <SpotlightCard className="p-6 sm:p-7 border-emerald-500/30 bg-gradient-to-b from-[#0c1410] to-[#0c0d12] shadow-2xl flex flex-col justify-between space-y-5 hover:border-emerald-400 transition-all group relative overflow-hidden rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider block">
                  {locale === 'ar'
                    ? '2. المستشار الإداري الذكي'
                    : locale === 'derja'
                    ? '2. El Moustachar el Idari'
                    : locale === 'en'
                    ? '2. Smart Civic Copilot'
                    : '2. Assistant Idari en Derja'}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {locale === 'ar'
                    ? 'إجابات قانونية بالدارجة التونسية'
                    : locale === 'derja'
                    ? 'Es2el bel Derja 24h/24'
                    : locale === 'en'
                    ? '100% Native Tunisian Derja AI'
                    : 'IA Civique 100% en Derja'}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                  {locale === 'ar'
                    ? 'اسأل عن أي وضعية إدارية معقدة بالدارجة أو العربية، مدعوماً بـ 38 مجال قانوني ونصوص الرائد الرسمي (JORT).'
                    : locale === 'derja'
                    ? 'As’el 3la ay 7aja s3iba fel Idara bel Derja. Yjewbek b’9awanin el JORT w ywerrik mnin tebda.'
                    : locale === 'en'
                    ? 'Ask complex legal questions in authentic Tunisian Arabic. Grounded in official JORT decrees with step-by-step guidance.'
                    : 'Posez vos questions administratives en Derja. Réponses juridiques précises ancrées dans les décrets du JORT.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/copilot"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs shadow-md shadow-emerald-500/25 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{locale === 'ar' ? 'تحدث مع المساعد' : 'Lancer Idaara AI'}</span>
              </Link>
            </div>
          </SpotlightCard>

          {/* Pillar 3: Smart Documents & OCR Scanner */}
          <SpotlightCard className="p-6 sm:p-7 border-white/[0.1] bg-[#0c0d12] shadow-2xl flex flex-col justify-between space-y-5 hover:border-amber-500/50 transition-all group relative overflow-hidden rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {locale === 'ar'
                    ? '3. الوثائق ومفسرلي OCR'
                    : locale === 'derja'
                    ? '3. Watha2e9 w Fasserli OCR'
                    : locale === 'en'
                    ? '3. Legal Documents & OCR'
                    : '3. Contrats Légaux & OCR'}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {locale === 'ar'
                    ? 'توليد العقود وفحص الوثائق'
                    : locale === 'derja'
                    ? '3o9oud 7adhra w Scanner'
                    : locale === 'en'
                    ? 'Smart Contracts & OCR Scanner'
                    : 'Contrats Prêts & Décodeur OCR'}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                  {locale === 'ar'
                    ? 'عقود كراء وتوكيل جاهزة للتعريف بالإمضاء بالبلدية، مع ماسح ضوئي لفك شفرة تنبيهات القباضة دون تخزين الملفات.'
                    : locale === 'derja'
                    ? 'Contrats mriglin lel Baladiya (Ta3rif bel Imdha2) w scanner yfasserlek les avis d\'imposition b\'zero stockage.'
                    : locale === 'en'
                    ? 'Ready-to-legalize lease contracts and powers of attorney, plus zero-storage OCR scanner for deciphering tax notices.'
                    : 'Génération de contrats conformes prêts à la légalisation et scanner OCR sécurisé pour décrypter vos avis fiscaux.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/documents"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{locale === 'ar' ? 'توليد العقود' : 'Générer un Contrat'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
              <Link
                href="/fasserli"
                className="text-[11px] font-semibold text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08]"
              >
                {locale === 'ar' ? 'فسرلي OCR' : 'Fasserli OCR'}
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ── 4. INTERACTIVE CIVIC DOSSIER SIMULATOR (LIVE CHECKLIST PREVIEW) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-6 sm:p-9 border-white/[0.1] bg-[#0c0d12] shadow-2xl space-y-6 rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-emerald-400 px-2.5 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800/40">
                  {locale === 'ar' ? 'المعاينة التفاعلية' : 'Inspecteur de Dossier'}
                </span>
                <span className="text-xs text-zinc-400">
                  {locale === 'ar' ? 'جرب تحديد الوثائق ومعرفة التكلفة الفعلية' : 'Testez la préparation de vos démarches'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {locale === 'ar' ? 'محاكي الملف الإداري والتنابر' : 'Simulateur de Dossier & Timbres Fiscaux'}
              </h2>
            </div>

            {/* Document Switcher Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'passport' as const, label: locale === 'ar' ? 'جواز السفر' : 'Passeport', tag: '80 DT', icon: FileCheck2 },
                { id: 'cin' as const, label: locale === 'ar' ? 'بطاقة التعريف' : 'CIN', tag: '3 DT', icon: ShieldCheck },
                { id: 'lease' as const, label: locale === 'ar' ? 'عقد الكراء' : 'Contrat Bail', tag: '35 DT', icon: Scale },
                { id: 'tax' as const, label: locale === 'ar' ? 'الأداء البلدي' : 'Taxe Municipale', tag: 'Recette', icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeInspectorDoc === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveInspectorDoc(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/25'
                        : 'bg-zinc-900/90 text-zinc-400 hover:text-white border-white/[0.08]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                    <span>{tab.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
                      {tab.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Document Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Metadata & Checklist */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-950 border border-white/[0.08]">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{currentDoc.type}</h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{currentDoc.authority}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">{locale === 'ar' ? 'المجموع' : 'Total'}</span>
                    <span className="text-lg font-mono font-extrabold text-amber-400">{currentDoc.fee}</span>
                  </div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2">
                {currentDoc.points.map((pt, pIdx) => {
                  const itemKey = `${activeInspectorDoc}-${pIdx}`;
                  const isChecked = !!checkedInspectorItems[itemKey];

                  return (
                    <div
                      key={itemKey}
                      onClick={() => toggleInspectorItem(itemKey)}
                      className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 text-xs ${
                        isChecked
                          ? 'bg-emerald-950/30 border-emerald-700/50 text-white'
                          : 'bg-zinc-900/60 border-white/[0.06] hover:border-white/[0.12] text-zinc-300'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-zinc-500" />
                        )}
                      </div>
                      <span className={`leading-relaxed flex-1 ${isChecked ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}>
                        {pt}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Readiness Gauge & Action */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4 text-center">
              {(() => {
                const docKeys = currentDoc.points.map((_, idx) => `${activeInspectorDoc}-${idx}`);
                const readyCount = docKeys.filter((k) => checkedInspectorItems[k]).length;
                const totalCount = docKeys.length;
                const pct = Math.round((readyCount / totalCount) * 100);
                const isComplete = readyCount === totalCount;

                return (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      {locale === 'ar' ? 'جاهزية الملف' : 'État de Préparation'}
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400">
                      {readyCount}/{totalCount}
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-300"
                      />
                    </div>
                    <p className="text-xs text-zinc-400">
                      {isComplete
                        ? (locale === 'ar' ? '🎉 ملفك مكتمل وجاهز للإيداع!' : '🎉 Dossier 100% complet et prêt !')
                        : (locale === 'ar' ? 'حدد الوثائق للتأكد من اكتمال ملفك' : 'Cochez les pièces pour valider votre dossier')}
                    </p>
                    <Link
                      href={currentDoc.url}
                      className="block w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all text-center"
                    >
                      {locale === 'ar' ? 'فتح الدليل الكامل' : 'Voir la Démarche Complète'}
                    </Link>
                  </div>
                );
              })()}
            </div>
          </div>
        </SpotlightCard>
      </section>
    </>
  );
}
