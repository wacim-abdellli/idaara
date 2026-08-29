'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { AmbientOrbs } from '../components/motion/AmbientOrbs';
import {
  FileText,
  Calculator,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Search,
  Lock,
  CheckCircle2,
  Clock,
  Stamp,
  Building2,
  Sliders,
  Scale,
  FileCheck2,
  Car,
  Mail,
  Compass,
  Layers,
  EyeOff,
  Zap,
  X,
  Bot,
} from 'lucide-react';
import { formatTND } from '../lib/utils';
import { getLocalized } from '../lib/locale-utils';
import { proceduresData } from '../data/procedures';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();

  // Search & Omni-Command State
  const [searchVal, setSearchVal] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Inspector & Interactive State
  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'cin' | 'lease' | 'tax'>('passport');
  const [checkedInspectorItems, setCheckedInspectorItems] = useState<Record<string, boolean>>({
    'passport-0': true,
    'cin-0': true,
    'lease-0': true,
    'tax-0': true,
  });
  const [interactiveBudget, setInteractiveBudget] = useState<number>(35000);
  const [selectedWilaya, setSelectedWilaya] = useState('Tunis');

  // Keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleInspectorItem = (key: string) => {
    setCheckedInspectorItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/copilot?q=${encodeURIComponent(searchVal)}`);
    } else {
      router.push('/copilot');
    }
  };

  // Filtered procedures for live autocomplete
  const filteredProcedures = searchVal.trim()
    ? proceduresData.filter((p) => {
        const query = searchVal.toLowerCase();
        const titleMatch =
          p.title.fr.toLowerCase().includes(query) ||
          p.title.ar.includes(query) ||
          p.title.derja.toLowerCase().includes(query) ||
          (p.title.en ? p.title.en.toLowerCase().includes(query) : false);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(query));
        return titleMatch || tagMatch;
      }).slice(0, 5)
    : [];

  // Top 6 Quick Procedures
  const quickChips = [
    {
      id: 'passeport-renouvellement',
      icon: '🪪',
      name: locale === 'ar' ? 'جواز السفر' : locale === 'derja' ? 'Passeport' : locale === 'en' ? 'Passport' : 'Passeport',
      cost: '86.000 DT',
      badge: locale === 'ar' ? 'شرطة / حرس' : 'Police',
      href: '/procedures/passeport-renouvellement',
    },
    {
      id: 'bulletin-numero-3',
      icon: '📋',
      name: locale === 'ar' ? 'بطاقة السوابق (B3)' : locale === 'derja' ? 'Bulletin N°3' : locale === 'en' ? 'Criminal Record (B3)' : 'Bulletin N°3',
      cost: '7.500 DT',
      badge: locale === 'ar' ? 'عبر الإنترنت' : 'En ligne',
      href: '/procedures/bulletin-numero-3',
    },
    {
      id: 'contrat-location',
      icon: '✍️',
      name: locale === 'ar' ? 'عقد الكراء السكني' : locale === 'derja' ? '3a9d Kré' : locale === 'en' ? 'Lease Agreement' : 'Contrat de Location',
      cost: '35.000 DT',
      badge: locale === 'ar' ? 'بلدية' : 'Baladiya',
      href: '/documents/contrat-location',
    },
    {
      id: 'mutation-carte-grise',
      icon: '🚗',
      name: locale === 'ar' ? 'البطاقة الرمادية' : locale === 'derja' ? 'Carte Grise' : locale === 'en' ? 'Vehicle Title' : 'Carte Grise (ATTT)',
      cost: '145.000 DT',
      badge: 'ATTT',
      href: '/procedures/mutation-carte-grise',
    },
    {
      id: 'auto-entrepreneur',
      icon: '💼',
      name: locale === 'ar' ? 'المبادر الذاتي' : locale === 'derja' ? 'Auto-Entrepreneur' : locale === 'en' ? 'Self-Entrepreneur' : 'Auto-Entrepreneur',
      cost: locale === 'ar' ? 'ضريبة 1%' : '1% Impôt',
      badge: 'BCT / RNE',
      href: '/launchpad',
    },
    {
      id: 'cin-premiere-demande',
      icon: '🛡️',
      name: locale === 'ar' ? 'بطاقة التعريف (CIN)' : locale === 'derja' ? 'Bita9at Ta3rif' : locale === 'en' ? 'National ID (CIN)' : 'Carte CIN',
      cost: '3.000 DT',
      badge: locale === 'ar' ? 'مركز الشرطة' : 'Poste Police',
      href: '/procedures/cin-premiere-demande',
    },
  ];

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

  // Dynamic calculations for the 1% tax simulator
  const simulatedTax = interactiveBudget * 0.01;
  const simulatedCnss = 200; // ~50 DT / quarter
  const simulatedNet = interactiveBudget - simulatedTax - simulatedCnss;

  interface GovernorateDesk {
    type: 'baladiya' | 'recette' | 'attt' | 'poste';
    title: { fr: string; ar: string; derja: string; en: string };
    location: { fr: string; ar: string; derja: string; en: string };
    hours: string;
    services: { fr: string; ar: string; derja: string; en: string };
    badge: { fr: string; ar: string; derja: string; en: string };
  }

  const wilayaDesks: Record<string, GovernorateDesk[]> = {
    Tunis: [
      {
        type: 'baladiya',
        title: { fr: 'Hôtel de Ville & Baladiya', ar: 'بلدية تونس - القصر البلدي', derja: 'Baladiyat Tunis el Markaziya', en: 'Tunis Central Municipality' },
        location: { fr: 'La Kasbah / Bab Bhar', ar: 'القصبة / باب بحر', derja: 'El Kasbah / Bab Bhar', en: 'La Kasbah / Bab Bhar' },
        hours: '08:30 - 16:30',
        services: { fr: 'Légalisation signature & Extraits d’état civil express', ar: 'التعريف بالإمضاء ومطابقة الأصل ومضامين ولادة فورية', derja: 'Ta3rif bel Imdha2 w Madhmoun Wilada express', en: 'Signature legalization & instant birth certificates' },
        badge: { fr: 'Guichet Express', ar: 'شباك سريع', derja: 'Guichet Express', en: 'Express Desk' },
      },
      {
        type: 'recette',
        title: { fr: 'Recette des Finances Principale', ar: 'القباضة المالية المركزية', derja: '9badha Maliya Markaziya', en: 'Central Tax Collection Office' },
        location: { fr: 'Beb Souika & Avenue de Paris', ar: 'باب سويقة وشارع باريس', derja: 'Beb Souika & Chare3 Paris', en: 'Beb Souika & Paris Ave' },
        hours: locale === 'ar' ? '08:15 - 16:30 (القباضة 16:00)' : locale === 'derja' ? '08:15 - 16:30 (Caisse 16:00)' : locale === 'en' ? '08:15 - 16:30 (Cash desk 16:00)' : '08:15 - 16:30 (Caisse 16:00)',
        services: { fr: 'Timbres fiscaux (80DT, 15DT, 5DT, 3DT) & Enregistrement baux', ar: 'بيع جميع التنابر الجبائية وتسجيل عقود الكراء والسيارات', derja: 'Chrayen el Timbres wel 3o9oud', en: 'Fiscal stamps (80DT, 15DT, 5DT, 3DT) & lease registration' },
        badge: { fr: 'Stock Timbres Dispo', ar: 'تنابر متوفرة', derja: 'Timbres Mawjoudin', en: 'Stamps in Stock' },
      },
      {
        type: 'attt',
        title: { fr: 'Agence ATTT (Mines & Transport)', ar: 'الوكالة الفنية للنقل البري', derja: 'Wakalat el ATTT (El Mines)', en: 'ATTT Vehicle & Driver Licensing' },
        location: { fr: 'Sidi Hassine / Charguia', ar: 'سيدي حسين / الشرقية', derja: 'Sidi Hassine / Charguia', en: 'Sidi Hassine / Charguia' },
        hours: '08:00 - 15:00',
        services: { fr: 'Mutation Carte Grise, Visite technique & Permis de conduire', ar: 'تحويل ملكية البطاقة الرمادية والفحص الفني ورخص السياقة', derja: 'Carte Grise, Visite technique w Permis', en: 'Vehicle registration transfer (Carte Grise) & licenses' },
        badge: { fr: 'Visite & Mutation', ar: 'فحص وبطاقة رمادية', derja: 'Visite & Grise', en: 'Tech Inspection' },
      },
      {
        type: 'poste',
        title: { fr: 'Bureau de Poste Central', ar: 'مكتب البريد المركزي', derja: 'El Bosta el Markaziya', en: 'Central Post Office' },
        location: { fr: 'Rue Charles de Gaulle / Thameur', ar: 'شارع الحبيب ثامر / شارل ديغول', derja: 'Chare3 Thameur / Charles de Gaulle', en: 'Habib Thameur / Charles de Gaulle' },
        hours: locale === 'ar' ? '08:00 - 17:00 (حصة واحدة)' : locale === 'derja' ? '08:00 - 17:00 (Séance continue)' : locale === 'en' ? '08:00 - 17:00 (Single session)' : '08:00 - 17:00 (Séance continue)',
        services: { fr: 'Services D17, Mandats express & Recommandés avec accusé', ar: 'خدمات D17، الحوالات السريعة، والرسائل المضمونة مع الإشعار بالبلوغ', derja: 'D17, Mandat express w Jwabet Recommandés', en: 'D17 wallet, money orders & registered postal mail' },
        badge: { fr: 'D17 & Mandats', ar: 'حوالات و D17', derja: 'D17 w Mandat', en: 'D17 & Money Orders' },
      },
    ],
    Ariana: [
      {
        type: 'baladiya',
        title: { fr: 'Municipalité Ariana Ville', ar: 'بلدية أريانة المدينة', derja: 'Baladiyat Ariana el Medina', en: 'Ariana City Municipality' },
        location: { fr: 'Avenue Habib Bourguiba / Menzah 6', ar: 'شارع الحبيب بورقيبة / المنزه 6', derja: 'Chare3 Bourguiba / Menzah 6', en: 'Habib Bourguiba Ave / Menzah 6' },
        hours: '08:30 - 16:30',
        services: { fr: 'Ta3rif bel Imdha2, extraits naissance et autorisations de bâtir', ar: 'التعريف بالإمضاء ورخص البناء ومضامين ولادة', derja: 'Ta3rif bel Imdha2 w Rokhsat Bné', en: 'Signature legalization & civil status certificates' },
        badge: { fr: 'Guichet Unique', ar: 'شباك موحد', derja: 'Guichet Unique', en: 'One-Stop Desk' },
      },
      {
        type: 'recette',
        title: { fr: 'Recette des Finances Ariana Centre', ar: 'القباضة المالية أريانة المركز', derja: '9badha Maliya Ariana Centre', en: 'Ariana Tax Office' },
        location: { fr: 'Rue Ali Belhouane, Ariana', ar: 'نهج علي البلهوان، أريانة', derja: 'Nahj Ali Belhouane, Ariana', en: 'Ali Belhouane St, Ariana' },
        hours: '08:15 - 16:30',
        services: { fr: 'Vente timbres passeport, taxe de circulation (vignette) & déclarations', ar: 'تنابر جواز السفر ومعلوم الجولان والتصاريح الجبائية', derja: 'Timbres Passeport w Vignette', en: 'Passport stamps, vehicle road tax & tax filings' },
        badge: { fr: 'Vignettes & Timbres', ar: 'تنابر ومعلوم جولان', derja: 'Timbres w Vignette', en: 'Road Tax & Stamps' },
      },
      {
        type: 'attt',
        title: { fr: 'Centre Visite Technique Ariana', ar: 'مركز الفحص الفني بأريانة', derja: 'Centre Visite Technique Ariana', en: 'Ariana ATTT Vehicle Inspection' },
        location: { fr: 'Zone Industrielle Ariana / Chotrana', ar: 'المنطقة الصناعية أريانة / شطرانة', derja: 'Zone Industrielle Chotrana', en: 'Industrial Zone / Chotrana' },
        hours: '07:45 - 15:15',
        services: { fr: 'Visite technique périodique & homologation véhicules', ar: 'الفحص الفني الدوري ومطابقة العربات', derja: 'Visite technique w Homologation', en: 'Periodic technical inspection & vehicle approval' },
        badge: { fr: 'Visite Auto', ar: 'فحص فني', derja: 'Visite', en: 'Car Inspection' },
      },
      {
        type: 'poste',
        title: { fr: 'Bureau de Poste Ariana Centre', ar: 'مكتب بريد أريانة المركز', derja: 'Bosta Ariana Centre', en: 'Ariana Central Post Office' },
        location: { fr: 'Avenue de la République, Ariana', ar: 'شارع الجمهورية، أريانة', derja: 'Chare3 el Joumhouriya', en: 'Republic Ave, Ariana' },
        hours: '08:00 - 17:00',
        services: { fr: 'Comptes épargne, virements postaux et retraits Western Union', ar: 'حسابات الادخار والتحويلات البريدية وويسترن يونيون', derja: 'Carnet d’épargne w Western Union', en: 'Savings accounts, postal transfers & Western Union' },
        badge: { fr: 'Retraits & Épargne', ar: 'سحب وادخار', derja: 'Retrait w Epargne', en: 'Transfers & Cash' },
      },
    ],
    Sousse: [
      {
        type: 'baladiya',
        title: { fr: 'Municipalité de Sousse', ar: 'بلدية سوسة - القصر البلدي', derja: 'Baladiyat Sousse', en: 'Sousse Central Municipality' },
        location: { fr: 'Bouhsina / Khezama / Médina', ar: 'بوحسينة / خزامة / المدينة العتيقة', derja: 'Bouhsina / Khezama / Médina', en: 'Bouhsina / Khezama / Medina' },
        hours: '08:30 - 16:30',
        services: { fr: 'Légalisation de documents, contrats de mariage & état civil', ar: 'التعريف بالإمضاء وعقود الزواج والحالة المدنية', derja: 'Ta3rif bel Imdha2 w 39oud Zwaj', en: 'Signature legalization & marriage certificates' },
        badge: { fr: 'Permanence Samedi', ar: 'استمرار السبت', derja: 'Khadem el Sebt', en: 'Saturday Open' },
      },
      {
        type: 'recette',
        title: { fr: 'Recette des Finances Sousse Médina', ar: 'القباضة المالية سوسة المدينة', derja: '9badha Maliya Sousse Médina', en: 'Sousse Medina Tax Office' },
        location: { fr: 'Avenue Habib Bourguiba, Sousse', ar: 'شارع الحبيب بورقيبة، سوسة', derja: 'Chare3 Bourguiba, Sousse', en: 'Habib Bourguiba Ave, Sousse' },
        hours: '08:15 - 16:30',
        services: { fr: 'Vente des timbres fiscaux & Enregistrement des actes notariés', ar: 'بيع التنابر وتسجيل العقود والفرائض', derja: 'Timbres w Tasjil 3o9oud', en: 'Stamp sales & deed registration' },
        badge: { fr: 'Timbres & Contrats', ar: 'تنابر وعقود', derja: 'Timbres', en: 'Stamps & Contracts' },
      },
      {
        type: 'attt',
        title: { fr: 'Agence ATTT Sousse', ar: 'الوكالة الفنية للنقل البري بسوسة', derja: 'Agence ATTT Sousse (Akouda)', en: 'ATTT Sousse Vehicle Center' },
        location: { fr: 'Route de Tunis / Akouda', ar: 'طريق تونس / أكودة', derja: 'Thnyet Tounes / Akouda', en: 'Tunis Rd / Akouda' },
        hours: '08:00 - 15:00',
        services: { fr: 'Mutation Carte Grise, examen de permis & plaques d’immatriculation', ar: 'تحويل البطاقة الرمادية وامتحانات السياقة ولوحات التسجيل', derja: 'Carte Grise w Permis', en: 'Vehicle registration, driving tests & plate issuance' },
        badge: { fr: 'Permis & Grise', ar: 'رخص وبطاقات', derja: 'Permis w Grise', en: 'Licenses & Cards' },
      },
      {
        type: 'poste',
        title: { fr: 'Poste Centrale de Sousse', ar: 'البريد المركزي بسوسة', derja: 'Bosta Sousse el Markaziya', en: 'Sousse Central Post' },
        location: { fr: 'Place des Martyrs, Sousse', ar: 'ساحة الشهداء، سوسة', derja: 'Sa7et el Chouhada', en: 'Martyrs Square, Sousse' },
        hours: '08:00 - 17:00',
        services: { fr: 'Guichet D17, timbres postaux et paiement factures STEG/SONEDE', ar: 'خدمات D17، خلاص فواتير الستاغ والصوناد', derja: 'Khalas STEG/SONEDE w D17', en: 'D17 wallet & utility bill payments (STEG/SONEDE)' },
        badge: { fr: 'Factures & D17', ar: 'فواتير و D17', derja: 'Factures STEG', en: 'Bill Pay & D17' },
      },
    ],
    Sfax: [
      {
        type: 'baladiya',
        title: { fr: 'Municipalité de Sfax Ville', ar: 'بلدية صفاقس - القصر البلدي', derja: 'Baladiyat Sfax el Medina', en: 'Sfax City Municipality' },
        location: { fr: 'Avenue Habib Bourguiba / Sakiet Ezzit', ar: 'شارع الحبيب بورقيبة / ساقية الزيت', derja: 'Chare3 Bourguiba / Sakiet Ezzit', en: 'Habib Bourguiba Ave / Sakiet Ezzit' },
        hours: '08:30 - 16:30',
        services: { fr: 'Ta3rif bel Imdha2 express, certificats de résidence et état civil', ar: 'التعريف بالإمضاء، شهادات الإقامة، ومضامين ولادة', derja: 'Ta3rif bel Imdha2 w Chhadet Soukna', en: 'Signature legalization & residence certificates' },
        badge: { fr: 'Guichet Express', ar: 'شباك سريع', derja: 'Guichet Express', en: 'Express Desk' },
      },
      {
        type: 'recette',
        title: { fr: 'Recette des Finances Sfax Port & Centre', ar: 'القباضة المالية صفاقس الميناء والمركز', derja: '9badha Sfax el Mina', en: 'Sfax Port Tax Office' },
        location: { fr: 'Avenue Hédi Chaker, Sfax', ar: 'شارع الهادي شاكر، صفاقس', derja: 'Chare3 Hedi Chaker', en: 'Hedi Chaker Ave, Sfax' },
        hours: '08:15 - 16:30',
        services: { fr: 'Timbres fiscaux (80DT, 15DT, 5DT), enregistrement & vignettes', ar: 'بيع جميع التنابر الجبائية وتسجيل العقود وخلاص معلوم الجولان', derja: 'Timbres 80DT/15DT w Vignette', en: 'Fiscal stamps (80DT, 15DT), contract registration & road tax' },
        badge: { fr: 'Stock Timbres Dispo', ar: 'تنابر متوفرة', derja: 'Timbres Mawjoudin', en: 'Stamps in Stock' },
      },
      {
        type: 'poste',
        title: { fr: 'Bureau de Poste Sfax El Jadida', ar: 'مكتب بريد صفاقس الجديدة', derja: 'Bosta Sfax el Jadida', en: 'Sfax Central Post' },
        location: { fr: 'Sfax El Jadida, Boulevard Majida Boulila', ar: 'صفاقس الجديدة، شارع مجيدة بوليلة', derja: 'Chare3 Majida Boulila', en: 'Majida Boulila Blvd, Sfax' },
        hours: '08:00 - 17:00',
        services: { fr: 'D17, recharges e-Dinar, mandats minute et colis postaux', ar: 'شحن بطاقات الدينار الإلكتروني والحوالات الدقيقة والطرود', derja: 'e-Dinar, D17 w Colis', en: 'e-Dinar top-up, D17 & postal parcels' },
        badge: { fr: 'e-Dinar & D17', ar: 'دينار إلكتروني', derja: 'e-Dinar', en: 'e-Dinar & D17' },
      },
    ],
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 relative overflow-hidden bg-[#07080a] text-[#F5F4F0]">

      {/* ── 1. MONUMENTAL SOVEREIGN COMMAND CENTER HERO ── */}
      <section className="relative pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-7">
        
        {/* Subtle Ambient Radial Lighting */}
        <AmbientOrbs variant="emerald" />

        {/* Regal Sovereign Civic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.12] shadow-xl backdrop-blur-md text-xs font-semibold text-zinc-200"
        >
          <span className="text-emerald-400 font-bold">🇹🇳</span>
          <span>
            {locale === 'ar'
              ? 'الجمهورية التونسية · البوابة المدنية والجبائية الذكية'
              : locale === 'derja'
              ? 'El Joumhouriya el Tounsiya · L\'Idara el Thakiya'
              : locale === 'en'
              ? 'Republic of Tunisia · Smart Civic Portal'
              : 'République Tunisienne · Portail Civique & Fiscal'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/40">
            JORT 2026
          </span>
        </motion.div>

        {/* Monumental Sovereign Display Headline */}
        <div className="space-y-2 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            <span>{t('heroHeadline')}</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              {t('heroHeadlineHighlight')}
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed pt-1">
            {t('heroSubheadline')}
          </p>
        </div>

        {/* ── OMNI-COMMAND SEARCH BAR (CENTERPIECE) ── */}
        <div className="max-w-2xl mx-auto relative z-30 pt-1">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-[#0e1015] border-2 border-white/[0.12] focus-within:border-emerald-400 focus-within:shadow-[0_0_35px_rgba(16,185,129,0.25)] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-2xl transition-all"
          >
            <Search className="w-5 h-5 text-emerald-400 ml-3 mr-2 rtl:ml-2 rtl:mr-3 shrink-0" />
            
            <input
              ref={searchInputRef}
              type="text"
              value={searchVal}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder={
                locale === 'ar'
                  ? 'ابحث عن أي إجراء... (مثال: جواز السفر، بطاقة التعريف، عقد الكراء)'
                  : locale === 'derja'
                  ? 'Chnowa t7eb ta3mel el youm? (Passeport, B3, 3a9d Kré...)'
                  : locale === 'en'
                  ? 'What procedure do you need today? (Passport, B3, Lease...)'
                  : 'Quelle démarche souhaitez-vous accomplir ? (Passeport, B3...)'
              }
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none py-2 px-1 min-w-0"
            />

            {searchVal && (
              <button
                type="button"
                onClick={() => setSearchVal('')}
                className="p-1 rounded-lg text-zinc-400 hover:text-white mr-1 rtl:ml-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Keyboard Shortcut Indicator */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800/80 border border-white/[0.08] text-[10px] font-mono text-zinc-400 mr-2 rtl:ml-2">
              <span>⌘K</span>
            </div>

            {/* Submit / Copilot Action Button */}
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl font-extrabold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/25 transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{locale === 'ar' ? 'بحث ذكي' : 'Idaara AI'}</span>
            </button>
          </form>

          {/* Floating Autocomplete Dropdown */}
          <AnimatePresence>
            {isSearchFocused && filteredProcedures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-0 right-0 top-full mt-2 bg-[#0e1015] border border-white/[0.15] rounded-2xl shadow-2xl overflow-hidden text-left rtl:text-right z-50 divide-y divide-white/[0.06]"
              >
                {filteredProcedures.map((proc) => (
                  <Link
                    key={proc.id}
                    href={`/procedures/${proc.slug}`}
                    className="p-3 sm:p-3.5 hover:bg-zinc-900 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {getLocalized(proc.title, locale)}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {getLocalized(proc.shortDescription, locale)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs font-extrabold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/40">
                        {formatTND(proc.estimatedTotalCostTND, locale)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors rtl:rotate-180" />
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── TOP 6 CIVIC QUICK CHIPS ── */}
        <div className="space-y-2 pt-1 max-w-4xl mx-auto">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            {locale === 'ar'
              ? 'الإجراءات الأكثر طلباً في تونس (معاليم رسمية ومباشرة) :'
              : locale === 'derja'
              ? 'El Démarchet el Akther Talab fi Tounes :'
              : locale === 'en'
              ? 'Most Requested Procedures in Tunisia:'
              : 'Démarches les Plus Fréquentes en Tunisie :'}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {quickChips.map((chip) => (
              <motion.div key={chip.id} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={chip.href}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.08] hover:border-emerald-500/50 text-xs font-semibold text-zinc-200 transition-all shadow-sm group"
                >
                  <span>{chip.icon}</span>
                  <span className="group-hover:text-emerald-300 transition-colors">{chip.name}</span>
                  <span className="text-[10px] font-mono font-extrabold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/30">
                    {chip.cost}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* ── 2. THE 3 GATEWAY POWER PILLARS (ZERO CONFUSION NAVIGATION) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto pb-6">
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40">
            {locale === 'ar' ? 'الخدمات الأساسية' : 'Piliers Principaux'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {locale === 'ar'
              ? 'كل ما تحتاجه لإتمام أوراقك في 3 مسارات واضحة'
              : locale === 'derja'
              ? 'Kol chay t7eb ta3mlou fi 3 bibén wad7in'
              : locale === 'en'
              ? 'Everything You Need in 3 Crystal-Clear Gateways'
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
                  {locale === 'ar' ? '1. دليل الإجراءات والتنابر' : '1. Guides & Timbres Fiscaux'}
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
                    ? 'قائمة الأوراق المطلوبة لـ 38 إجراء مدني، حساب الميزانية بالمليم، واستخراج ورقة الملف (Dossier Kit A4) للطباعة.'
                    : locale === 'derja'
                    ? 'Koll war9a lezmetek l’38 procédure, 7asbet el masrouf bel mlim, w telechargi el fiche A4 l’officielle.'
                    : locale === 'en'
                    ? 'Required document checklists for 38 civic procedures, millime-accurate fee calculators, and printable A4 official sheets.'
                    : 'Checklists des pièces pour 38 démarches, calcul au millime près des timbres fiscaux et export de la fiche A4 officielle.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/procedures"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{locale === 'ar' ? 'تصفح الإجراءات' : 'Voir les Démarches'}</span>
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
                  {locale === 'ar' ? '2. المستشار الإداري الذكي' : '2. Assistant Idari en Derja'}
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
                  {locale === 'ar' ? '3. الوثائق ومفسرلي OCR' : '3. Contrats Légaux & OCR'}
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

      {/* ── 3. INTERACTIVE CIVIC DOSSIER SIMULATOR (LIVE CHECKLIST PREVIEW) ── */}
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

      {/* ── 4. AUTO-ENTREPRENEUR 1% TAX & REVENUE STUDIO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-6 sm:p-9 border-white/[0.1] bg-[#0c0d12] shadow-2xl space-y-7 rounded-3xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'محاكي المبادر الذاتي 1%' : 'Simulateur Auto-Entrepreneur 1%'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {locale === 'ar' ? 'حاسبة الضرائب وصافي الدخل للمستقلين' : 'Calculateur Fiscal & Revenu Net'}
              </h2>
            </div>
            <p className="text-xs text-zinc-300 max-w-md">
              {locale === 'ar'
                ? 'حرّك المؤشر حسب رقم معاملاتك التقديري لمعرفة الضريبة 1% ومساهمة الضمان الاجتماعي وصافي دخلك.'
                : 'Ajustez le curseur pour simuler votre impôt libératoire de 1% et vos cotisations CNSS.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider Control */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-bold">{locale === 'ar' ? 'رقم المعاملات السنوي (د.ت) :' : 'Chiffre d’Affaires Annuel (TND) :'}</span>
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
                  className="w-full accent-emerald-500 cursor-pointer h-2.5 bg-zinc-800 rounded-lg transition-all"
                />

                <div className="flex justify-between text-[10px] text-zinc-400 font-bold">
                  <span>5 000 DT</span>
                  <span>{locale === 'ar' ? 'السقف القانوني: 75 000 د.ت' : 'Plafond Légal : 75 000 DT'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] text-xs text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{locale === 'ar' ? 'مرسوم المبادر الذاتي (2020-33)' : 'Décret Auto-Entrepreneur 2020-33'}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-300">
                  {locale === 'ar'
                    ? 'نسبة ضريبية 1% لمهن الخدمات والمطورين والمصممين، مع إعفاء كامل من TVA عند التصدير بالعملة الصعبة.'
                    : 'Taux unique libératoire de 1% pour les prestataires de services et développeurs. 0% TVA à l’export avec rapatriement BCT.'}
                </p>
              </div>
            </div>

            {/* Calculated Breakdown Display */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.08] flex flex-col justify-between space-y-2 shadow-lg">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">{locale === 'ar' ? '1. الضريبة 1%' : '1. Impôt 1%'}</span>
                <span className="text-xl font-mono font-extrabold text-amber-400">
                  <AnimatedCounter value={simulatedTax} decimals={3} suffix=" DT" />
                </span>
                <span className="text-[10px] text-zinc-400">{locale === 'ar' ? 'سنوي جزافي' : 'Annuel Forfait'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.08] flex flex-col justify-between space-y-2 shadow-lg">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">{locale === 'ar' ? '2. الضمان الاجتماعي' : '2. CNSS'}</span>
                <span className="text-xl font-mono font-extrabold text-zinc-100">
                  <AnimatedCounter value={simulatedCnss} decimals={3} suffix=" DT" />
                </span>
                <span className="text-[10px] text-zinc-400">{locale === 'ar' ? '~50 د.ت / ثلاثية' : '~50 DT / trimestre'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col justify-between space-y-2 shadow-lg shadow-emerald-950/50">
                <span className="text-[10px] font-bold text-emerald-300 uppercase">{locale === 'ar' ? '3. صافي الدخل' : '3. Revenu Net'}</span>
                <span className="text-xl font-mono font-extrabold text-emerald-400">
                  <AnimatedCounter value={simulatedNet} decimals={3} suffix=" DT" />
                </span>
                <span className="text-[10px] text-emerald-300/80">{locale === 'ar' ? 'في جيبك' : 'Dans votre poche'}</span>
              </div>

            </div>

          </div>

        </SpotlightCard>
      </section>

      {/* ── 5. TERRITORIAL RADAR: 24 WILAYAS PUBLIC DESKS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-cyan-400 px-2.5 py-0.5 rounded-md bg-cyan-950/70 border border-cyan-800/40">
                {locale === 'ar' ? 'الشبكة الإدارية المباشرة' : 'Réseau Territorial En Direct'}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {locale === 'ar' ? '24 ولاية · تحديث فوري' : '24 Gouvernorats · Temps Réel'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {locale === 'ar' ? 'مواعيد العمل الرسمية والشبابيك المفتوحة' : 'Horaires et Guichets Ouverts par Wilaya'}
            </h2>
          </div>

          {/* Wilaya Selector Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.keys(wilayaDesks).map((w) => {
              const isSelected = selectedWilaya === w;
              return (
                <button
                  key={w}
                  onClick={() => setSelectedWilaya(w)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                    isSelected
                      ? 'bg-cyan-500 text-zinc-950 border-cyan-400 shadow-lg shadow-cyan-500/25 font-extrabold'
                      : 'bg-zinc-900 border-white/[0.08] text-zinc-300 hover:text-white'
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Rich Service Desk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(wilayaDesks[selectedWilaya] || wilayaDesks['Tunis']).map((desk, idx) => {
            const isBaladiya = desk.type === 'baladiya';
            const isRecette = desk.type === 'recette';
            const isAttt = desk.type === 'attt';

            const Icon = isBaladiya ? Building2 : isRecette ? Stamp : isAttt ? Car : Mail;
            const accentColor = isBaladiya
              ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
              : isRecette
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              : isAttt
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              : 'text-blue-400 bg-blue-500/10 border-blue-500/20';

            const title = getLocalized(desk.title, locale);
            const location = getLocalized(desk.location, locale);
            const services = getLocalized(desk.services, locale);
            const badge = getLocalized(desk.badge, locale);

            return (
              <SpotlightCard
                key={idx}
                className="p-5 border-white/[0.08] bg-[#0c0d12] shadow-xl flex flex-col justify-between space-y-4 hover:border-white/[0.18] transition-all rounded-3xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`p-2 rounded-xl border ${accentColor} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                      {locale === 'ar' ? 'مفتوح' : 'Ouvert'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
                    <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span className="truncate">{location}</span>
                    </p>
                  </div>

                  <div className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] font-mono text-zinc-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{desk.hours}</span>
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-2">
                    {services}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${accentColor}`}>
                    {badge}
                  </span>
                  <Link
                    href={`/locator?gov=${encodeURIComponent(selectedWilaya)}`}
                    className="text-[11px] font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>{locale === 'ar' ? 'الخريطة' : 'Localiser'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Global Directory Link Banner */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-200">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {locale === 'ar'
                ? 'دليل البلديات والقباضات ومراكز الفحص الفني لجميع ولايات الجمهورية (130+ مصلحة عمومية).'
                : 'Annuaire officiel et géolocalisation de plus de 130 bureaux publics à travers les 24 gouvernorats.'}
            </span>
          </div>

          <Link
            href="/locator"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
          >
            <span>{locale === 'ar' ? 'فتح الدليل الكامل' : 'Consulter le Répertoire'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

      </section>

      {/* ── 6. ZERO-STORAGE PRIVACY PROTOCOL ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-6 sm:p-9 border-emerald-500/30 bg-gradient-to-br from-[#0c1410] via-[#090b0d] to-[#07080a] shadow-2xl space-y-6 rounded-3xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-white/[0.08]">
            <div className="flex items-start sm:items-center gap-4 text-left rtl:text-right">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950/80">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                    {t('zeroStorageBanner')}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-600/40">
                    {locale === 'ar' ? 'معالجة كاملة داخل متصفحك' : '100% Client-Side In-Memory'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  {t('zeroStorageSub')}
                </p>
              </div>
            </div>

            <Link
              href="/fasserli"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all shrink-0 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{locale === 'ar' ? 'فحص وثيقة بأمان' : 'Scanner un Document'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'معالجة في الذاكرة الحية فقط' : 'Traitement RAM Éphémère'}</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {locale === 'ar'
                  ? 'لا يتم حفظ أي صورة أو وثيقة على خوادم أو قواعد بيانات. الحذف فوري بمجرد إغلاق الجلسة.'
                  : 'Aucun stockage sur disque ou base de données. Analyse en mémoire vive volatile puis suppression immédiate.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                <EyeOff className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'حجب أرقام CIN و RIB تلقائياً' : 'Masquage Automatique CIN & RIB'}</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {locale === 'ar'
                  ? 'اكتشاف تلقائي وحجب فوري لأرقام بطاقة التعريف الوطنية والحسابات البنكية قبل التحليل.'
                  : 'Détection automatique et masquage des numéros de carte d’identité (CIN) et coordonnées bancaires (RIB).'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Layers className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'مطابقة لمعايير حماية المعطيات' : 'Conformité Totale INPDP'}</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {locale === 'ar'
                  ? 'احترام تام للتشريع التونسي لحماية المعطيات الشخصية وقانون الرقمنة الإدارية.'
                  : 'Respect scrupuleux du cadre juridique tunisien de protection des données personnelles.'}
              </p>
            </div>
          </div>

        </SpotlightCard>
      </section>

    </div>
  );
}
