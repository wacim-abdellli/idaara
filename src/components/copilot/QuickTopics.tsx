'use client';

import React from 'react';
import { FileCheck2, Car, Briefcase, FileText, ShieldCheck, Plane } from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';

export interface QuickTopicsProps {
  locale: SupportedLanguage;
  isRtl: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export function getQuickTopicsList(locale: SupportedLanguage) {
  return [
    {
      label: locale === 'ar' ? 'تجديد جواز السفر (80 د.ت)' : locale === 'derja' ? 'Passeport tounsi (80 DT)' : locale === 'en' ? 'Renew Passport (80 DT)' : 'Renouveler Passeport (80 DT)',
      q: locale === 'ar' ? 'شنوة يلزمني باش نجدد جواز السفر التونسي؟' : locale === 'derja' ? "Chnouwa lezemni bech n'badal el passeport mte3i?" : locale === 'en' ? 'What documents and fees do I need to renew my Tunisian passport?' : 'Quels sont les documents et timbres fiscaux pour renouveler mon passeport tunisien ?',
      icon: FileCheck2,
    },
    {
      label: locale === 'ar' ? 'البطاقة الرمادية للسيارة (145 د.ت)' : locale === 'derja' ? 'Carte Grise karhba (145 DT)' : locale === 'en' ? 'Car Registration Transfer' : 'Mutation Carte Grise (145 DT)',
      q: locale === 'ar' ? 'شريت كرهبة مستعملة، كيفاش نبدل البطاقة الرمادية؟' : locale === 'derja' ? "Chrit karhba jdid, kifech nbeddel el carte grise?" : locale === 'en' ? 'How do I transfer a car registration after buying a used vehicle?' : "Comment faire la mutation de carte grise après achat d'un véhicule d'occasion en Tunisie ?",
      icon: Car,
    },
    {
      label: locale === 'ar' ? 'المبادر الذاتي 1% فريلانس' : locale === 'derja' ? 'Auto-Entrepreneur 1%' : locale === 'en' ? 'Auto-Entrepreneur 1% Tax' : 'Statut Auto-Entrepreneur 1%',
      q: locale === 'ar' ? 'كيفاش نسجل في المبادر الذاتي وشنوة الامتيازات الجبائية 1%؟' : locale === 'derja' ? "Kifech n9ayed fi statut auto-entrepreneur 1%?" : locale === 'en' ? 'How to register as an Auto-Entrepreneur with 1% tax in Tunisia?' : 'Comment fonctionne le régime Auto-Entrepreneur 1% et la facturation en devises en Tunisie ?',
      icon: Briefcase,
    },
    {
      label: locale === 'ar' ? 'عقد كراء سكني قانوني' : locale === 'derja' ? 'Contrat de bail Baladiya' : locale === 'en' ? 'Legal Lease Contract (COC)' : 'Contrat de Bail Conforme',
      q: locale === 'ar' ? 'كيفاش نعمل عقد كراء سكني قانوني؟' : locale === 'derja' ? "A3melli contrat kré sakani mrigel lel baladiya" : locale === 'en' ? 'How to create a legal residential lease contract in Tunisia?' : 'Quelles sont les démarches pour un contrat de bail résidentiel légalisé en Tunisie ?',
      icon: FileText,
    },
    {
      label: locale === 'ar' ? 'بطاقة السوابق ب3 عبر الإنترنت' : locale === 'derja' ? 'Bita9at B3 (7.5 DT)' : locale === 'en' ? 'Criminal Record (B3) 7.5 DT' : 'Bulletin N°3 (B3) en ligne',
      q: locale === 'ar' ? 'كيفاش نتحصل على بطاقة السوابق العدلية ب3؟' : locale === 'derja' ? "Awra9 el B3 bita9at sawabi9 3adliya chnowa?" : locale === 'en' ? 'How to get the B3 criminal record certificate in Tunisia?' : 'Comment obtenir le bulletin N°3 (casier judiciaire) en ligne en Tunisie ?',
      icon: ShieldCheck,
    },
    {
      label: locale === 'ar' ? 'امتياز التوريد ن.ت.د (FCR)' : locale === 'derja' ? 'Avantage FCR tounsi' : locale === 'en' ? 'FCR Customs Privilege' : 'Régime Douanier FCR',
      q: locale === 'ar' ? 'شنوة شروط امتياز FCR لتوريد سيارة للتونسيين بالخارج؟' : locale === 'derja' ? "Awra9 el FCR lel tounsiya fel kharej chnowa?" : locale === 'en' ? 'What are the FCR customs privilege conditions for Tunisian diaspora?' : 'Quelles sont les conditions pour bénéficier du régime FCR pour les Tunisiens à l’étranger ?',
      icon: Plane,
    },
  ];
}

export function QuickTopics({ locale, isRtl, onSelectPrompt }: QuickTopicsProps) {
  const cards = [
    {
      icon: FileCheck2,
      badge: '80 DT',
      title:
        locale === 'ar'
          ? 'تجديد جواز السفر'
          : locale === 'derja'
          ? 'Renouveler Passeport'
          : locale === 'en'
          ? 'Passport Renewal'
          : 'Renouvellement Passeport',
      desc:
        locale === 'ar'
          ? 'الوثائق المطلوبة، معلوم التمبر 80 د.ت والتتبع بالداخل والخارج'
          : locale === 'derja'
          ? 'Awra9 lezma, timbre 80 DT w kifech t5arej el passeport fisa3'
          : locale === 'en'
          ? 'Required documents, 80 DT fiscal stamp & processing times'
          : 'Documents requis, timbres fiscaux (80 DT / 25 DT) & délais',
      prompt:
        locale === 'ar'
          ? 'شنوة يلزمني باش نجدد جواز السفر التونسي ومعلوم التنابر الجبائية؟'
          : locale === 'derja'
          ? "Chnouwa lezemni bech n'badal el passeport mte3i w 9adeh el timbre?"
          : locale === 'en'
          ? 'What documents and fees do I need to renew my Tunisian passport?'
          : 'Quels sont les documents et timbres fiscaux pour renouveler mon passeport tunisien ?',
    },
    {
      icon: Car,
      badge: '145 DT',
      title:
        locale === 'ar'
          ? 'البطاقة الرمادية للسيارة'
          : locale === 'derja'
          ? 'Carte Grise Karhba'
          : locale === 'en'
          ? 'Vehicle Registration'
          : 'Mutation Carte Grise',
      desc:
        locale === 'ar'
          ? 'عقد البيع، الفحص الفني، خلاص القباضة وملف وكالة ATTT'
          : locale === 'derja'
          ? 'Contrat bi3, visite technique, 5las 9badha w dosiyel ATTT'
          : locale === 'en'
          ? 'Bill of sale, technical inspection, tax office & ATTT transfer'
          : 'Contrat de vente, visite technique, recette des finances & ATTT',
      prompt:
        locale === 'ar'
          ? 'شريت كرهبة مستعملة في تونس، كيفاش نعمل البطاقة الرمادية ومعاليم التسجيل؟'
          : locale === 'derja'
          ? 'Chrit karhba jdid, kifech nbeddel el carte grise w 9adeh el ma3loum?'
          : locale === 'en'
          ? 'How do I transfer a car registration after buying a used vehicle?'
          : "Comment faire la mutation de carte grise après achat d'un véhicule d'occasion en Tunisie ?",
    },
    {
      icon: Briefcase,
      badge: '1% Impôt',
      title:
        locale === 'ar'
          ? 'المبادر الذاتي فريلانس'
          : locale === 'derja'
          ? 'Auto-Entrepreneur 1%'
          : locale === 'en'
          ? 'Auto-Entrepreneur 1%'
          : 'Statut Auto-Entrepreneur',
      desc:
        locale === 'ar'
          ? 'التسجيل المجاني، الضريبة المخفضة 1%، وفواتير التصدير بالعملة'
          : locale === 'derja'
          ? 'Tasjel fabor, impôt 1%, faktouret export w CNSS'
          : locale === 'en'
          ? 'Free registration, 1% flat tax rate, FX invoicing & social security'
          : 'Inscription gratuite, impôt unique 1%, devises & facturation',
      prompt:
        locale === 'ar'
          ? 'كيفاش نسجل في نظام المبادر الذاتي في تونس وشنوة الامتيازات الجبائية 1%؟'
          : locale === 'derja'
          ? 'Kifech n9ayed fi statut auto-entrepreneur 1% w n5allas l\'impôt?'
          : locale === 'en'
          ? 'How to register as an Auto-Entrepreneur with 1% tax in Tunisia?'
          : 'Comment fonctionne le régime Auto-Entrepreneur 1% et la facturation en devises en Tunisie ?',
    },
    {
      icon: FileText,
      badge: '3 DT Baladiya',
      title:
        locale === 'ar'
          ? 'عقد كراء سكني قانوني'
          : locale === 'derja'
          ? 'Contrat Kré Baladiya'
          : locale === 'en'
          ? 'Legal Lease Agreement'
          : 'Contrat de Bail Conforme',
      desc:
        locale === 'ar'
          ? 'التعريف بالإمضاء بالبلدية (3 د.ت)، الضمان، وحقوق المكتري'
          : locale === 'derja'
          ? 'Ta3rif bel imdha2 fel baladiya (3 DT), el 3arbon w 7ou9ou9ek'
          : locale === 'en'
          ? 'Legalization in Baladiya (3 DT), security deposit & tenant rights'
          : 'Légalisation en mairie (3 DT), caution & clauses protectrices',
      prompt:
        locale === 'ar'
          ? 'شنوة الشروط القانونية لعقد كراء سكني في تونس وكيفاش نصححه في البلدية؟'
          : locale === 'derja'
          ? 'A3melli contrat kré sakani mrigel lel baladiya'
          : locale === 'en'
          ? 'How to create a legal residential lease contract in Tunisia?'
          : 'Quelles sont les démarches pour un contrat de bail résidentiel légalisé en Tunisie ?',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPrompt(card.prompt)}
            className="group p-4 rounded-2xl bg-[#0c0f15]/90 hover:bg-[#121620] border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-200 cursor-pointer flex flex-col justify-between text-start outline-none shadow-sm hover:shadow-emerald-950/20"
          >
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {card.badge}
              </span>
            </div>

            <div className="space-y-1 w-full">
              <div className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                {card.title}
              </div>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
