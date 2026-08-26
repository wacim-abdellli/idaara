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
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-zinc-400" dir={isRtl ? 'rtl' : 'ltr'}>
      <button
        dir="auto"
        onClick={() =>
          onSelectPrompt(
            locale === 'ar'
              ? 'كيفاش نخرج أوراق جواز السفر التونسي؟'
              : locale === 'fr'
              ? 'Comment renouveler un passeport tunisien ?'
              : locale === 'en'
              ? 'How do I renew a Tunisian passport?'
              : 'Kifech n5arej awra9 el passeport tounsi?'
          )
        }
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
      >
        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>
          {locale === 'ar'
            ? 'جواز السفر (86 د.ت)'
            : locale === 'derja'
            ? 'Passeport (86 DT)'
            : locale === 'en'
            ? 'Passport (86 DT)'
            : 'Passeport (86 DT)'}
        </span>
      </button>

      <button
        dir="auto"
        onClick={() =>
          onSelectPrompt(
            locale === 'ar'
              ? 'كيفاش نعمل بطاقة رمادية في تونس؟'
              : locale === 'fr'
              ? 'Comment faire une mutation de carte grise en Tunisie ?'
              : locale === 'en'
              ? 'How do I transfer vehicle registration (carte grise)?'
              : 'Kifech na3mel mutation carte grise fi Tounes?'
          )
        }
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
      >
        <Car className="w-3.5 h-3.5 text-amber-400" />
        <span>
          {locale === 'ar'
            ? 'البطاقة الرمادية (145 د.ت)'
            : locale === 'derja'
            ? 'Carte Grise (145 DT)'
            : locale === 'en'
            ? 'Vehicle Reg. (145 DT)'
            : 'Carte Grise (145 DT)'}
        </span>
      </button>

      <button
        dir="auto"
        onClick={() =>
          onSelectPrompt(
            locale === 'ar'
              ? 'اعمل لي عقد كراء سكني قانوني'
              : locale === 'fr'
              ? 'Rédige-moi un contrat de bail résidentiel légal'
              : locale === 'en'
              ? 'Draft a legal residential lease agreement'
              : 'A3melli contrat de bail kré sakani mrigel'
          )
        }
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5 text-blue-400" />
        <span>
          {locale === 'ar'
            ? 'عقد كراء سكني'
            : locale === 'derja'
            ? 'Contrat de bail'
            : locale === 'en'
            ? 'Lease Agreement'
            : 'Contrat de bail'}
        </span>
      </button>

      <button
        dir="auto"
        onClick={() =>
          onSelectPrompt(
            locale === 'ar'
              ? 'شنوة المناظرات المفتوحة توا في تونس؟'
              : locale === 'fr'
              ? 'Quels sont les concours ouverts actuellement en Tunisie ?'
              : locale === 'en'
              ? 'What civil service exams are currently open in Tunisia?'
              : 'Chnowa les concours el maftou7in tawa fi Tounes?'
          )
        }
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
      >
        <Briefcase className="w-3.5 h-3.5 text-teal-400" />
        <span>
          {locale === 'ar'
            ? `المناظرات ${currentYear}`
            : locale === 'derja'
            ? `Concourat ${currentYear}`
            : locale === 'en'
            ? `Competitions ${currentYear}`
            : `Concours ${currentYear}`}
        </span>
      </button>
    </div>
  );
}
