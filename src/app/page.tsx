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
  Car,
  Mail,
  Compass,
  Layers,
  EyeOff,
  Zap,
} from 'lucide-react';
import { formatTND } from '../lib/utils';
import { getLocalized } from '../lib/locale-utils';

export default function HomePage() {
  const { t, locale } = useLocale();
  const router = useRouter();

  // Interactive State
  const [searchVal, setSearchVal] = useState('');
  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'cin' | 'lease' | 'tax'>('passport');
  const [checkedInspectorItems, setCheckedInspectorItems] = useState<Record<string, boolean>>({
    'passport-0': true,
    'cin-0': true,
    'lease-0': true,
    'tax-0': true,
  });
  const [interactiveBudget, setInteractiveBudget] = useState<number>(35000);
  const [selectedWilaya, setSelectedWilaya] = useState('Tunis');

  const toggleInspectorItem = (key: string) => {
    setCheckedInspectorItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
          ? '10 - 15 يوماً'
          : locale === 'derja'
          ? '10 - 15 Youm'
          : locale === 'en'
          ? '10 - 15 days'
          : '10 - 15 jours',
      stamp:
        locale === 'ar'
          ? 'طابع جبائي 3 د.ت (10 د.ت ضياع)'
          : locale === 'derja'
          ? 'Timbre 3 DT (10 DT Dhyaya3)'
          : locale === 'en'
          ? '3 DT Fiscal Stamp (10 DT if lost)'
          : '3.000 DT (10 DT en cas de perte)',
      url: '/procedures/cin-carte-identite',
      points: [
        locale === 'ar'
          ? 'مضمون ولادة أصلي باللغة العربية والفرنسية (< 3 أشهر)'
          : locale === 'derja'
          ? 'Madhmoun wilada asli b’arabi w français (< 3 chhour)'
          : locale === 'en'
          ? 'Original bilingual birth certificate (< 3 months)'
          : 'Extrait de naissance bilingue récent (< 3 mois)',
        locale === 'ar'
          ? '3 صور شمسية مخصصة لبطاقة التعريف بخلفية بيضاء'
          : locale === 'derja'
          ? '3 tsawer CIN jdod b’fond abyedh'
          : locale === 'en'
          ? '3 official ID photos on white background'
          : '3 photos d’identité réglementaires',
        locale === 'ar'
          ? 'شهادة إقامة أو وصل ماء/كهرباء يثبت العنوان'
          : locale === 'derja'
          ? 'Chhadet i9ama walla wasl STEG/SONEDE ythabbet l’adresse'
          : locale === 'en'
          ? 'Proof of residence or utility bill under applicant name'
          : 'Certificat de résidence ou quittance STEG/SONEDE',
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
        type: 'attt',
        title: { fr: 'Agence ATTT Sfax Sud & Nord', ar: 'الوكالة الفنية للنقل البري بصفاقس', derja: 'Agence ATTT Sfax (Thyna)', en: 'ATTT Sfax Vehicle Center' },
        location: { fr: 'Route de Gabès Km 3 / Thyna', ar: 'طريق قابس كلم 3 / طينة', derja: 'Thnyet Gabes / Thyna', en: 'Gabes Rd Km 3 / Thyna' },
        hours: '08:00 - 15:00',
        services: { fr: 'Visite technique poids lourds & légers, mutation carte grise', ar: 'الفحص الفني للعربات وتحويل ملكية البطاقة الرمادية', derja: 'Visite technique w Carte Grise', en: 'Vehicle inspection & title transfer' },
        badge: { fr: 'Visite & Grise', ar: 'فحص وبطاقة رمادية', derja: 'Visite & Grise', en: 'Tech Inspection' },
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
    Nabeul: [
      {
        type: 'baladiya',
        title: { fr: 'Municipalité de Nabeul & Hammamet', ar: 'بلدية نابل والحمامات', derja: 'Baladiyat Nabeul w Hammamet', en: 'Nabeul & Hammamet Municipality' },
        location: { fr: 'Avenue Habib Thameur, Nabeul', ar: 'شارع الحبيب ثامر، نابل', derja: 'Chare3 Habib Thameur', en: 'Habib Thameur Ave, Nabeul' },
        hours: '08:30 - 16:30',
        services: { fr: 'Légalisation de signature & Extraits d’état civil express', ar: 'التعريف بالإمضاء ومطابقة الأصل ومضامين ولادة فورية', derja: 'Ta3rif bel Imdha2 w Madhmoun Wilada', en: 'Signature legalization & birth certificates' },
        badge: { fr: 'Guichet Express', ar: 'شباك سريع', derja: 'Guichet Express', en: 'Express Desk' },
      },
      {
        type: 'recette',
        title: { fr: 'Recette des Finances Nabeul Centre', ar: 'القباضة المالية نابل المركز', derja: '9badha Nabeul Centre', en: 'Nabeul Tax Office' },
        location: { fr: 'Avenue Ali Belhouane, Nabeul', ar: 'شارع علي البلهوان، نابل', derja: 'Chare3 Ali Belhouane', en: 'Ali Belhouane Ave, Nabeul' },
        hours: '08:15 - 16:30',
        services: { fr: 'Timbres fiscaux (80DT, 15DT, 5DT) & Enregistrement contrats', ar: 'بيع التنابر الجبائية وتسجيل العقود والفرائض', derja: 'Timbres w 3o9oud', en: 'Stamp sales & deed registration' },
        badge: { fr: 'Stock Timbres Dispo', ar: 'تنابر متوفرة', derja: 'Timbres Mawjoudin', en: 'Stamps in Stock' },
      },
      {
        type: 'attt',
        title: { fr: 'Agence ATTT Nabeul (Grombalia)', ar: 'الوكالة الفنية للنقل البري بنابل', derja: 'Agence ATTT Nabeul (Grombalia)', en: 'ATTT Nabeul Center' },
        location: { fr: 'Route de Tunis, Grombalia', ar: 'طريق تونس، قرمبالية', derja: 'Thnyet Tounes, Grombalia', en: 'Tunis Rd, Grombalia' },
        hours: '08:00 - 15:00',
        services: { fr: 'Mutation Carte Grise, examen de permis & visite technique', ar: 'تحويل ملكية البطاقة الرمادية وامتحانات السياقة والفحص الفني', derja: 'Carte Grise w Permis', en: 'Vehicle title transfer & inspection' },
        badge: { fr: 'Permis & Grise', ar: 'رخص وبطاقات', derja: 'Permis w Grise', en: 'Licenses & Cards' },
      },
      {
        type: 'poste',
        title: { fr: 'Bureau de Poste Nabeul Jarzouna', ar: 'مكتب بريد نابل المركز', derja: 'Bosta Nabeul Centre', en: 'Nabeul Central Post' },
        location: { fr: 'Rue Farhat Hached, Nabeul', ar: 'نهج فرحات حشاد، نابل', derja: 'Nahj Farhat Hached', en: 'Farhat Hached St, Nabeul' },
        hours: '08:00 - 17:00',
        services: { fr: 'D17, mandats minute et paiement factures STEG/SONEDE', ar: 'خدمات D17 وخلاص الفواتير والحوالات البريدية', derja: 'D17 w Factures', en: 'D17 wallet, money orders & bill pay' },
        badge: { fr: 'D17 & Factures', ar: 'فواتير و D17', derja: 'D17', en: 'D17 & Utility' },
      },
    ],
    Bizerte: [
      {
        type: 'baladiya',
        title: { fr: 'Municipalité de Bizerte Ville', ar: 'بلدية بنزرت المدينة', derja: 'Baladiyat Bizerte el Medina', en: 'Bizerte City Municipality' },
        location: { fr: 'Place de la Municipalité / Menzel Bourguiba', ar: 'ساحة البلدية / منزل بورقيبة', derja: 'Sa7et el Baladiya', en: 'Municipality Square / Menzel B.' },
        hours: '08:30 - 16:30',
        services: { fr: 'Légalisation de signature & Extraits d’état civil express', ar: 'التعريف بالإمضاء ومطابقة الأصل ومضامين ولادة فورية', derja: 'Ta3rif bel Imdha2 w Madhmoun', en: 'Signature legalization & civil status certificates' },
        badge: { fr: 'Guichet Express', ar: 'شباك سريع', derja: 'Guichet Express', en: 'Express Desk' },
      },
      {
        type: 'recette',
        title: { fr: 'Recette des Finances Bizerte Port', ar: 'القباضة المالية بنزرت الميناء', derja: '9badha Bizerte el Mina', en: 'Bizerte Port Tax Office' },
        location: { fr: 'Quai Tarak Ibn Ziad, Bizerte', ar: 'رصيف طارق بن زياد، بنزرت', derja: 'Tariq Ibn Ziad, Bizerte', en: 'Tarak Ibn Ziad Quay, Bizerte' },
        hours: '08:15 - 16:30',
        services: { fr: 'Timbres fiscaux (80DT, 15DT, 5DT), enregistrement contrats & taxes', ar: 'بيع التنابر الجبائية وتسجيل العقود وخلاص معلوم الجولان', derja: 'Timbres w 3o9oud', en: 'Fiscal stamps (80DT, 15DT), lease registration & taxes' },
        badge: { fr: 'Stock Timbres Dispo', ar: 'تنابر متوفرة', derja: 'Timbres Mawjoudin', en: 'Stamps in Stock' },
      },
      {
        type: 'attt',
        title: { fr: 'Agence ATTT Bizerte (Menzel Jmil)', ar: 'الوكالة الفنية للنقل البري ببنزرت', derja: 'Agence ATTT Bizerte (Menzel Jmil)', en: 'ATTT Bizerte Center' },
        location: { fr: 'Route de Menzel Jmil, Bizerte', ar: 'طريق منزل جميل، بنزرت', derja: 'Thnyet Menzel Jmil', en: 'Menzel Jmil Rd, Bizerte' },
        hours: '08:00 - 15:00',
        services: { fr: 'Mutation Carte Grise, examen de permis & visite technique', ar: 'تحويل ملكية البطاقة الرمادية والفحص الفني ورخص السياقة', derja: 'Carte Grise w Permis', en: 'Title transfer, driving licenses & inspection' },
        badge: { fr: 'Permis & Grise', ar: 'رخص وبطاقات', derja: 'Permis w Grise', en: 'Licenses & Cards' },
      },
      {
        type: 'poste',
        title: { fr: 'Bureau de Poste Bizerte Principal', ar: 'مكتب بريد بنزرت الرئيسي', derja: 'Bosta Bizerte el Markaziya', en: 'Bizerte Central Post' },
        location: { fr: 'Avenue Habib Bourguiba, Bizerte', ar: 'شارع الحبيب بورقيبة، بنزرت', derja: 'Chare3 Bourguiba, Bizerte', en: 'Habib Bourguiba Ave, Bizerte' },
        hours: '08:00 - 17:00',
        services: { fr: 'D17, mandats minute, épargne postale et colis express', ar: 'خدمات D17، الحوالات الدقيقة، والادخار البريدي', derja: 'D17 w Mandat', en: 'D17 wallet, money orders & postal savings' },
        badge: { fr: 'D17 & Mandats', ar: 'حوالات و D17', derja: 'D17', en: 'D17 & Money Orders' },
      },
    ],
  };

  // Localized UI Labels
  const ui = {
    nationalPlatform:
      locale === 'ar'
        ? 'Idaara.tn · المنظومة الإدارية الذكية'
        : locale === 'derja'
        ? 'Idaara.tn · El Menassa el Idariya el Thakiya'
        : locale === 'en'
        ? 'IDAARA AI · SMART ADMINISTRATIVE PLATFORM'
        : 'IDAARA AI · PLATEFORME ADMINISTRATIVE',
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
    <div className="space-y-10 sm:space-y-14 pb-10 relative overflow-hidden">

      {/* ── 1. MONUMENTAL HERO STAGE ── */}
      <section className="relative pt-3 sm:pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
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
                  className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-2 min-w-0 pr-3 rtl:pl-3 rtl:pr-0"
                />
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/copilot"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {locale === 'ar'
                        ? 'المساعد الذكي'
                        : 'Idaara AI'}
                    </span>
                  </Link>
                </motion.div>
              </form>

              {/* Direct Procedure Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {ui.directAccess}
                </span>
                {[
                  {
                    name:
                      locale === 'ar'
                        ? 'جواز السفر'
                        : locale === 'derja'
                        ? 'Passeport'
                        : locale === 'en'
                        ? 'Passport'
                        : 'Passeport',
                    cost: '86 DT',
                    href: '/procedures/passeport-renouvellement',
                  },
                  {
                    name:
                      locale === 'ar'
                        ? 'البطاقة الرمادية'
                        : locale === 'derja'
                        ? 'Carte Grise'
                        : locale === 'en'
                        ? 'Vehicle Registration'
                        : 'Carte Grise',
                    cost: '145 DT',
                    href: '/procedures/mutation-carte-grise',
                  },
                  {
                    name:
                      locale === 'ar'
                        ? 'عقد الكراء'
                        : locale === 'derja'
                        ? 'Contrat Kré'
                        : locale === 'en'
                        ? 'Lease Agreement'
                        : 'Contrat Bail',
                    cost: '35 DT',
                    href: '/documents/contrat-location',
                  },
                  {
                    name:
                      locale === 'ar'
                        ? 'المبادر الذاتي'
                        : locale === 'derja'
                        ? 'Auto-Entrepreneur'
                        : locale === 'en'
                        ? 'Self-Entrepreneur'
                        : 'Auto-Entrepreneur',
                    cost:
                      locale === 'ar'
                        ? 'ضريبة 1%'
                        : locale === 'derja'
                        ? '1% Taxe'
                        : locale === 'en'
                        ? '1% Tax'
                        : '1% Impôt',
                    href: '/launchpad',
                  },
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

          {/* Right Column: Holographic Civic Dossier Simulator & Interactive Inspector */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-6 relative">
            
            {/* Interactive Document Switcher Tabs with Spring Motion */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {[
                {
                  id: 'passport' as const,
                  label: locale === 'ar' ? 'جواز السفر' : locale === 'derja' ? 'Passeport' : locale === 'en' ? 'Passport' : 'Passeport',
                  tag: '80 DT',
                  icon: FileCheck2,
                },
                {
                  id: 'cin' as const,
                  label: locale === 'ar' ? 'بطاقة التعريف' : locale === 'derja' ? 'CIN' : locale === 'en' ? 'ID Card' : 'Carte CIN',
                  tag: '3 DT',
                  icon: ShieldCheck,
                },
                {
                  id: 'lease' as const,
                  label: locale === 'ar' ? 'عقد الكراء' : locale === 'derja' ? '3a9d Kré' : locale === 'en' ? 'Lease' : 'Contrat Bail',
                  tag: '35 DT',
                  icon: Scale,
                },
                {
                  id: 'tax' as const,
                  label: locale === 'ar' ? 'زبلة وخروبة' : locale === 'derja' ? 'Zebla & Khrouba' : locale === 'en' ? 'Tax' : 'Taxe Municipale',
                  tag: locale === 'ar' ? 'قباضة' : locale === 'derja' ? 'Recette' : locale === 'en' ? 'Tax Office' : 'Recette',
                  icon: FileText,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeInspectorDoc === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveInspectorDoc(tab.id)}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/25'
                        : 'bg-[#0d0e12] text-zinc-400 hover:text-white border-white/[0.08] hover:border-white/[0.15]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-500'}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-zinc-950/20 text-zinc-950 font-extrabold'
                          : 'bg-zinc-800/80 text-zinc-400'
                      }`}
                    >
                      {tab.tag}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* The Holographic Civic Dossier Simulator Card */}
            <SpotlightCard className="p-5 sm:p-7 border-white/[0.1] shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0e1014] via-[#0d0e12] to-[#090a0d]">
              
              {/* Subtle Guilloche Security Hologram Badge in Corner */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none rounded-full blur-2xl -mr-10 -mt-10" />

              {/* Document Header with Official Credentials */}
              <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] relative z-10 gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800/50 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{ui.officialDoc}</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-block">
                      JORT 2026 · {ui.repTun}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    {currentDoc.type}
                  </h3>

                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{currentDoc.authority}</span>
                  </p>
                </div>

                {/* Total Cost Badge */}
                <div className="text-right rtl:text-left shrink-0 pl-3 rtl:pl-0 rtl:pr-3 border-l rtl:border-l-0 rtl:border-r border-white/[0.08]">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    {ui.totalEst}
                  </span>
                  <span className="text-base sm:text-xl font-mono font-extrabold text-amber-400">
                    {currentDoc.fee}
                  </span>
                </div>
              </div>

              {/* Interactive Checklist & Live Readiness Gauge */}
              <div className="py-4 space-y-3 relative z-10">
                
                {/* Live Gauge Header */}
                {(() => {
                  const docKeys = currentDoc.points.map((_, idx) => `${activeInspectorDoc}-${idx}`);
                  const readyCount = docKeys.filter((k) => checkedInspectorItems[k]).length;
                  const totalCount = docKeys.length;
                  const pct = Math.round((readyCount / totalCount) * 100);
                  const isComplete = readyCount === totalCount;

                  return (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-zinc-300 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-emerald-400" />
                          <span>
                            {locale === 'ar'
                              ? 'جاهزية الملف (انقر لتحديد الوثائق) :'
                              : locale === 'derja'
                              ? '7dhour el dossier (Click bech tmarki) :'
                              : locale === 'en'
                              ? 'Dossier Readiness (Click to check items):'
                              : 'Préparation du dossier (Cliquez pour cocher) :'}
                          </span>
                        </span>
                        <span
                          className={`font-mono text-[11px] font-bold ${
                            isComplete ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {readyCount}/{totalCount} {isComplete ? '🎉 100%' : `${pct}%`}
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${pct}%` }}
                          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                          className={`h-full rounded-full ${
                            isComplete
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-300 shadow-[0_0_10px_#10b981]'
                              : 'bg-gradient-to-r from-amber-500 to-emerald-400'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Interactive Checkable Requirements */}
                <div className="space-y-2 pt-1">
                  {currentDoc.points.map((pt, pIdx) => {
                    const itemKey = `${activeInspectorDoc}-${pIdx}`;
                    const isChecked = !!checkedInspectorItems[itemKey];

                    return (
                      <motion.div
                        key={itemKey}
                        onClick={() => toggleInspectorItem(itemKey)}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2.5 text-xs ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-zinc-200'
                            : 'bg-zinc-900/60 border-white/[0.05] hover:border-white/[0.12] text-zinc-400'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-zinc-600 hover:border-zinc-400 transition-colors" />
                          )}
                        </div>
                        <span className={`leading-relaxed flex-1 ${isChecked ? 'text-zinc-100 font-medium' : 'text-zinc-400'}`}>
                          {pt}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Document Footer Bar Telemetry & Direct Guide Button */}
              <div className="pt-3.5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/[0.08] text-zinc-300 text-[11px] flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{currentDoc.time}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/[0.08] text-emerald-400 text-[11px]">
                    {currentDoc.stamp}
                  </span>
                </div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href={currentDoc.url || '/procedures'}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>{ui.fullDossier}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </motion.div>
              </div>

            </SpotlightCard>

          </FadeIn>

        </div>

      </section>

      {/* ── 2. UNRIVALED CIVIC SUPERPOWERS (WHAT MAKES IDAARA UNIQUE) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40">
                  {locale === 'ar'
                    ? 'ابتكارات حصرية'
                    : locale === 'derja'
                    ? 'Superpowers 7asriya'
                    : locale === 'en'
                    ? 'Unrivaled Capabilities'
                    : 'Innovations Exclusives'}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {locale === 'ar'
                    ? 'ما يميز المنصة عن أي مصدر آخر'
                    : locale === 'derja'
                    ? 'Chnowa tzidék Idaara.tn'
                    : locale === 'en'
                    ? 'Why citizens rely on Idaara'
                    : 'Pourquoi choisir Idaara.tn'}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {locale === 'ar'
                  ? 'خدمات ومزايا لا تجدها في أي مكان آخر'
                  : locale === 'derja'
                  ? '7ajet ma tal9ahom fi 7atta blasa okhra fi Tounes'
                  : locale === 'en'
                  ? 'Idaara AI Superpowers You Won’t Find Anywhere Else'
                  : 'Des Outils Conçus pour la Réalité Tunisienne'}
              </h2>
            </div>
            <Link
              href="/copilot"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
            >
              <span>{locale === 'ar' ? 'استكشف المساعد الذكي' : locale === 'derja' ? 'Jarreb Idaara AI' : locale === 'en' ? 'Explore Idaara AI' : 'Essayer Idaara AI'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Superpower 1: Fasserli OCR */}
            <SpotlightCard className="p-6 border-white/[0.08] bg-[#0c0d11] shadow-xl space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {locale === 'ar'
                      ? 'فسرلي هالورقة (OCR)'
                      : locale === 'derja'
                      ? 'Fasserli hal War9a'
                      : locale === 'en'
                      ? 'Fasserli OCR Decoder'
                      : 'Fasserli (Décodeur OCR)'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {locale === 'ar'
                      ? 'تفكيك فوري للوثائق المعقدة (تنابيه القباضة، إعلامات عدل المنفذ) وشرحها بالدارجة التونسية في ثوانٍ مع خطة عمل ودون حفظ الملفات.'
                      : locale === 'derja'
                      ? 'Tfassarlek ay war9a s3iba (tanbih 9badha, 3adel monfedh) bel Derja fi thweni w ta3tik chnowa lezmek ta3mel b\'zero stockage.'
                      : locale === 'en'
                      ? 'Instant plain-Derja translation and actionable checklist for complex legal notices (tax audits, court summons) with zero cloud storage.'
                      : 'Décryptage instantané en Derja claire de vos documents officiels complexes (redressement fiscal, huissiers) avec zéro stockage.'}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  href="/fasserli"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center justify-between"
                >
                  <span>{locale === 'ar' ? 'فحص وثيقة الآن' : locale === 'derja' ? 'Scanni war9a' : locale === 'en' ? 'Scan Document' : 'Scanner un document'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </SpotlightCard>

            {/* Superpower 2: Exact Timbre Calculator */}
            <SpotlightCard className="p-6 border-white/[0.08] bg-[#0c0d11] shadow-xl space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {locale === 'ar'
                      ? 'حاسبة التنابر بالمليم'
                      : locale === 'derja'
                      ? 'Calculateur Timbres'
                      : locale === 'en'
                      ? 'Exact Stamp Calculator'
                      : 'Calculateur au Millime'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {locale === 'ar'
                      ? 'حساب دقيق لجميع التنابر والمعاليم الرسمية حسب قوانين المالية المحدثة، لتضمن عدم إرجاعك من شباك البلدية أو القباضة.'
                      : locale === 'derja'
                      ? 'Te7seblek 9ad-9ad el masrouf wel timbres mte3 el loi de finances bech ma yraj3oukch mel guichet.'
                      : locale === 'en'
                      ? 'Down-to-the-millime statutory calculation of all fiscal and municipal stamps so you never get turned away at the counter.'
                      : 'Calcul exact au millime près des droits et timbres selon la Loi de Finances pour éviter tout refus au guichet.'}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  href="/calculator"
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-between"
                >
                  <span>{locale === 'ar' ? 'حساب المعاليم' : locale === 'derja' ? '7seb el timbres' : locale === 'en' ? 'Calculate Stamps' : 'Calculer les timbres'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </SpotlightCard>

            {/* Superpower 3: 1% Auto-Entrepreneur & BCT Invoicing */}
            <SpotlightCard className="p-6 border-white/[0.08] bg-[#0c0d11] shadow-xl space-y-4 hover:border-teal-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                    {locale === 'ar'
                      ? 'فضاء المستقل وفواتير BCT'
                      : locale === 'derja'
                      ? 'Freelance 1% & BCT'
                      : locale === 'en'
                      ? 'Freelance 1% & BCT Hub'
                      : 'Freelance 1% & BCT'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {locale === 'ar'
                      ? 'محاكي ضريبة المبادر الذاتي 1%، مع مولد فواتير تصدير الخدمات بالعملة الصعبة (EUR/USD) معفاة من الأداء ومطابقة للبنك المركزي.'
                      : locale === 'derja'
                      ? 'Simulateur Auto-Entrepreneur 1% w factures export devises 0% TVA mrigla m3a el Banque Centrale.'
                      : locale === 'en'
                      ? '1% Flat tax simulator and BCT-compliant foreign currency export invoice generator (0% VAT under Article 11 Code TVA).'
                      : 'Simulateur auto-entrepreneur 1% et génération de factures d’export devises (0% TVA conforme BCT).'}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  href="/launchpad"
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center justify-between"
                >
                  <span>{locale === 'ar' ? 'فضاء المستقل' : locale === 'derja' ? 'Espace Freelance' : locale === 'en' ? 'Open Launchpad' : 'Espace Freelance'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </SpotlightCard>

            {/* Superpower 4: 24-Wilaya GPS & Seasonal Hours */}
            <SpotlightCard className="p-6 border-white/[0.08] bg-[#0c0d11] shadow-xl space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {locale === 'ar'
                      ? 'دليل 24 ولاية والتوقيت الفعلي'
                      : locale === 'derja'
                      ? 'Atlas 24 Wilaya'
                      : locale === 'en'
                      ? '24-Wilaya Live Atlas'
                      : 'Atlas des 24 Wilayas'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {locale === 'ar'
                      ? 'أكثر من 110 مصلحة عمومية محددة جغرافياً (بلديات، قباضات، مناجم، محاكم) مع التوقيت الفعلي (رمضان / صيف / شتاء) وروابط Waze.'
                      : locale === 'derja'
                      ? 'Akther men 110 masla7a b\'GPS, noumrouwat w aw9at el 5edma el sa7i7a fi Romdhan w sayf.'
                      : locale === 'en'
                      ? '110+ geocoded public desks across all 24 governorates with real seasonal shifts (Ramadan / Summer) and instant GPS navigation.'
                      : 'Plus de 110 guichets géolocalisés à travers les 24 gouvernorats avec horaires saisonniers réels et guidage GPS.'}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  href="/locator"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between"
                >
                  <span>{locale === 'ar' ? 'تصفح الخريطة' : locale === 'derja' ? 'Chouf el Khrita' : locale === 'en' ? 'Browse Atlas' : 'Consulter l’Atlas'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE FISCAL STAMP & 1% TAX STUDIO ── */}
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
        
        {/* Header & Governorate Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40">
                {ui.radarEyebrow}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {locale === 'ar'
                  ? '24 ولاية · تحديث فوري'
                  : locale === 'derja'
                  ? '24 Wilaya · Mise à jour 7iniya'
                  : locale === 'en'
                  ? '24 Governorates · Real-Time'
                  : '24 Gouvernorats · Temps Réel'}
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {ui.radarTitle}
            </h2>
          </div>

          {/* Wilaya Selector Bar with spring pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.keys(wilayaDesks).map((w) => {
              const isSelected = selectedWilaya === w;
              return (
                <motion.button
                  key={w}
                  onClick={() => setSelectedWilaya(w)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                    isSelected
                      ? 'bg-cyan-500 text-zinc-950 border-cyan-400 shadow-lg shadow-cyan-500/25 font-extrabold'
                      : 'bg-[#0d0e12] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.15]'
                  }`}
                >
                  {w}
                </motion.button>
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
            const isPoste = desk.type === 'poste';

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
                className="p-5 border-white/[0.08] bg-[#0c0d11] shadow-xl flex flex-col justify-between space-y-4 hover:border-white/[0.18] transition-all relative overflow-hidden group"
              >
                <div className="space-y-3">
                  {/* Top Icon & Real-Time Open Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className={`p-2 rounded-xl border ${accentColor} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                        {ui.openStatus}
                      </span>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate">{location}</span>
                    </p>
                  </div>

                  {/* Working Hours */}
                  <div className="px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-white/[0.06] text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{desk.hours}</span>
                  </div>

                  {/* Services Summary */}
                  <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                    {services}
                  </p>
                </div>

                {/* Bottom Card Footer Tag & Locator CTA */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${accentColor}`}>
                    {badge}
                  </span>

                  <Link
                    href={`/locator?gov=${encodeURIComponent(selectedWilaya)}`}
                    className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>
                      {locale === 'ar'
                        ? 'الخريطة'
                        : locale === 'derja'
                        ? 'Waze / GPS'
                        : locale === 'en'
                        ? 'Locate'
                        : 'Localiser'}
                    </span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Global Directory Link Banner */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {locale === 'ar'
                ? 'دليل البلديات والقباضات ومراكز الفحص الفني لجميع ولايات الجمهورية (350+ مصلحة عمومية).'
                : locale === 'derja'
                ? 'Dalil el Baladiyas, el 9badhat, wel Mines lkol el wilayat fi Tounes (350+ blasa).'
                : locale === 'en'
                ? 'Official directory and GPS locator for 350+ public desks across all 24 governorates.'
                : 'Annuaire officiel et géolocalisation de plus de 350 bureaux publics à travers les 24 gouvernorats.'}
            </span>
          </div>

          <Link
            href="/locator"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
          >
            <span>
              {locale === 'ar'
                ? 'فتح الدليل الجغرافي الكامل'
                : locale === 'derja'
                ? '7el el Répertoire el Kemel'
                : locale === 'en'
                ? 'Open Full Directory'
                : 'Consulter le Répertoire Complet'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

      </section>

      {/* ── 4. ZERO-STORAGE PRIVACY PROTOCOL ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-6 sm:p-9 border-emerald-500/30 bg-gradient-to-br from-[#0c1410] via-[#090b0d] to-[#07080a] shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top Banner Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-white/[0.08] relative z-10">
            <div className="flex items-start sm:items-center gap-4 text-left rtl:text-right">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950/80 mt-0.5 sm:mt-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                    {t('zeroStorageBanner')}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-600/40 shadow-sm">
                    {locale === 'ar' ? 'معالجة كاملة داخل متصفحك' : locale === 'derja' ? '100% fel navigateur mte3ek' : locale === 'en' ? '100% Client-Side In-Memory' : '100% Côté Client En Mémoire'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  {t('zeroStorageSub')}
                </p>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="shrink-0">
              <Link
                href="/fasserli"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {locale === 'ar'
                    ? 'تجربة الفحص الآمن (OCR)'
                    : locale === 'derja'
                    ? 'Jarreb el Scanner el Sécurisé'
                    : locale === 'en'
                    ? 'Test Secure OCR Scanner'
                    : 'Tester le Scanner Sécurisé'}
                </span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </motion.div>
          </div>

          {/* 3 Cryptographic Security Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 relative z-10">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar'
                    ? 'معالجة في الذاكرة الحية فقط'
                    : locale === 'derja'
                    ? 'Traitement fel RAM kahaw'
                    : locale === 'en'
                    ? 'Ephemeral In-Memory Processing'
                    : 'Traitement RAM Éphémère'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'لا يتم حفظ أي صورة أو وثيقة على خوادم أو قواعد بيانات. الحذف فوري بمجرد إغلاق الجلسة.'
                  : locale === 'derja'
                  ? 'Les documents yet3aljou fel RAM w yetfas5ou direct. 0 stockage fi ay base de données.'
                  : locale === 'en'
                  ? 'No documents or images are stored on servers or databases. Instant memory purge.'
                  : 'Aucun stockage sur disque ou base de données. Analyse en mémoire vive volatile puis suppression immédiate.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                <EyeOff className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar'
                    ? 'إخفاء المعطيات الحساسة (CIN & RIB)'
                    : locale === 'derja'
                    ? 'Masquage Automatique CIN & RIB'
                    : locale === 'en'
                    ? 'Automated PII Redaction'
                    : 'Masquage Automatique PII'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'اكتشاف تلقائي وحجب فوري لأرقام بطاقة التعريف الوطنية والحسابات البنكية قبل التحليل.'
                  : locale === 'derja'
                  ? 'Redaction automatique lel noumrouwat CIN w RIB 9bel ma ysir el traitement OCR.'
                  : locale === 'en'
                  ? 'Automatic detection and masking of national identity numbers (CIN) and bank accounts (RIB).'
                  : 'Détection automatique et masquage des numéros de carte d’identité (CIN) et coordonnées bancaires (RIB).'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar'
                    ? 'مطابقة لمعايير حماية المعطيات (INPDP)'
                    : locale === 'derja'
                    ? 'Conformité 100% INPDP'
                    : locale === 'en'
                    ? 'Full INPDP Compliance'
                    : 'Conformité Totale INPDP'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'احترام تام للتشريع التونسي لحماية المعطيات الشخصية وقانون الرقمنة الإدارية.'
                  : locale === 'derja'
                  ? 'Conforme 100% m3a el 9anoun el tounsi mte3 7imayet el ma3loumet el chakhsiya.'
                  : locale === 'en'
                  ? 'Strict compliance with Tunisian statutory personal data regulations (Organic Law N°2004-63).'
                  : 'Respect scrupuleux du cadre juridique tunisien de protection des données personnelles (Loi Organique N°2004-63).'}
              </p>
            </div>
          </div>

        </SpotlightCard>
      </section>

    </div>
  );
}
