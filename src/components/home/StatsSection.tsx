'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import {
  Sliders,
  Sparkles,
  Building2,
  Stamp,
  Car,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Compass,
} from 'lucide-react';

const SpotlightCard = dynamic(
  () => import('../motion/SpotlightCard').then((m) => m.SpotlightCard),
  { ssr: false }
);

const AnimatedCounter = dynamic(
  () => import('../motion/AnimatedCounter').then((m) => m.AnimatedCounter),
  { ssr: false }
);

interface GovernorateDesk {
  type: 'baladiya' | 'recette' | 'attt' | 'poste';
  title: { fr: string; ar: string; derja: string; en: string };
  location: { fr: string; ar: string; derja: string; en: string };
  hours: string;
  services: { fr: string; ar: string; derja: string; en: string };
  badge: { fr: string; ar: string; derja: string; en: string };
}

export function StatsSection() {
  const { locale } = useLocale();

  const [interactiveBudget, setInteractiveBudget] = useState<number>(35000);
  const [selectedWilaya, setSelectedWilaya] = useState('Tunis');

  // Dynamic calculations for the 1% tax simulator
  const simulatedTax = interactiveBudget * 0.01;
  const simulatedCnss = 200; // ~50 DT / quarter
  const simulatedNet = interactiveBudget - simulatedTax - simulatedCnss;

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
    <>
      {/* ── 5. AUTO-ENTREPRENEUR 1% TAX & REVENUE STUDIO ── */}
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
                  <span className="text-zinc-300 font-bold">
                    {locale === 'ar' ? 'رقم المعاملات السنوي (د.ت) :' : 'Chiffre d’Affaires Annuel (TND) :'}
                  </span>
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

      {/* ── 6. TERRITORIAL RADAR: 24 WILAYAS PUBLIC DESKS ── */}
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
    </>
  );
}
