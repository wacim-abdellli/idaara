'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { proceduresData, getProcedureById } from '../../data/procedures';
import { TimbreCostBreakdown } from '../../components/calculator/TimbreCostBreakdown';
import { ChecklistTracker } from '../../components/calculator/ChecklistTracker';
import { DossierKitExport } from '../../components/calculator/DossierKitExport';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { getVerticalLabel } from '../../lib/vertical-labels';
import { formatTND } from '../../lib/utils';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn } from '../../components/motion/FadeInStagger';
import { AmbientOrbs } from '../../components/motion/AmbientOrbs';
import { ArrowRight, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const { locale } = useLocale();
  const [selectedProcId, setSelectedProcId] = useState<string>('passeport-renouvellement');

  const ui = {
    officialScale: {
      ar: 'الجدول الرسمي · قباضة المالية والبلدية',
      fr: 'Barème Officiel · Recette des Finances & Baladiya',
      en: 'Official Scale · Finance Office & Municipality',
      derja: 'Jadwal rasmi · Qabadat el maliya',
    },
    procedures: {
      ar: 'إجراءات',
      fr: 'démarches',
      en: 'procedures',
      derja: 'ijra2at',
    },
  };

  const selectedProcedure = getProcedureById(selectedProcId) || proceduresData[0];

  const headlineMain =
    locale === 'ar'
      ? 'حاسبة التنابر الجبائية'
      : locale === 'derja'
      ? 'Calculateur el Timbres'
      : locale === 'en'
      ? 'Fiscal Stamp & Budget'
      : 'Calculateur des Timbres';

  const headlineAccent =
    locale === 'ar'
      ? 'وميزانية الأوراق.'
      : locale === 'derja'
      ? 'w Masrouf el Awra9.'
      : locale === 'en'
      ? 'Counter & Dossier.'
      : 'Fiscaux & Pièces.';

  const subtitle =
    locale === 'ar'
      ? 'احتساب المصاريف القانونية الدقيقة (تنابر 3 د.ت، 5 د.ت، 15 د.ت، 80 د.ت، صور شمسية، نسخ مطابقة) حتى لا تُفاجأ عند الشباك.'
      : locale === 'derja'
      ? 'A7seb el masrouf el s7i7 lel timbres (3 DT, 5 DT, 15 DT, 80 DT), el tsawer, wel copies conformes bech ma yetfadja3ch fel guichet.'
      : locale === 'en'
      ? 'Calculate the exact statutory fiscal stamps, photo fees, and copy costs for any Tunisian administrative procedure before heading to the counter.'
      : "Calculez le montant exact des timbres fiscaux (3 DT, 5 DT, 15 DT, 80 DT), photos d'identité et copies conformes pour éviter tout imprévu au guichet.";

  const officialTariffs = [
    {
      amount: '3.000 DT',
      label:
        locale === 'ar'
          ? 'التعريف بالإمضاء بالبلدية'
          : locale === 'derja'
          ? 'Ta3rif bel Imdha2 Baladiya'
          : locale === 'en'
          ? 'Municipal Signature (Légalisation)'
          : 'Légalisation de Signature',
      desc:
        locale === 'ar'
          ? 'تعريفة موحدة'
          : locale === 'derja'
          ? 'Tarif unitaire'
          : locale === 'en'
          ? 'Unit rate'
          : 'Tarif unitaire',
    },
    {
      amount: '5.000 DT',
      label:
        locale === 'ar'
          ? 'الحالة المدنية والتواكيل'
          : locale === 'derja'
          ? 'Tawkîl & 7alet Madaniya'
          : locale === 'en'
          ? 'Civil Status & Mandates'
          : 'État Civil & Procuration',
      desc:
        locale === 'ar'
          ? 'قباضة المالية'
          : locale === 'derja'
          ? 'Recette des Finances'
          : locale === 'en'
          ? 'Treasury'
          : 'Recette des Finances',
    },
    {
      amount: '15.000 DT',
      label:
        locale === 'ar'
          ? 'تسجيل العقود والبطاقة عدد 3'
          : locale === 'derja'
          ? '3a9d Kré & Bita9a B3'
          : locale === 'en'
          ? 'Commercial Deeds & B3 Record'
          : 'Bail & Bulletin N°3',
      desc:
        locale === 'ar'
          ? 'قباضة / تحبير'
          : locale === 'derja'
          ? 'Recette / Enregistrement'
          : locale === 'en'
          ? 'Registry'
          : 'Recette / Enregistrement',
    },
    {
      amount: '80.000 DT',
      label:
        locale === 'ar'
          ? 'طابع جواز السفر التونسي'
          : locale === 'derja'
          ? 'Timbre Passeport Tounsi'
          : locale === 'en'
          ? 'Ordinary Passport Stamp'
          : 'Passeport Ordinaire',
      desc:
        locale === 'ar'
          ? 'التعرفة الرسمية'
          : locale === 'derja'
          ? 'Tarif officiel'
          : locale === 'en'
          ? 'Official rate'
          : 'Tarif officiel',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 relative overflow-hidden">

      {/* Ambient Orbs */}
      <AmbientOrbs variant="amber" />

      {/* ── 2-Column Hero Header (Balances Left & Right space perfectly) ── */}
      <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-4 border-b border-zinc-800/80 relative">
        {/* Left: Titles & Context */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="text-amber-400 font-bold">/</span>
            <span>{getLocalized(ui.officialScale, locale)}</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </motion.span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Live Official Fiscal Tariff Hub */}
        <div className="lg:col-span-5 relative z-10">
          <SpotlightCard className="p-4 sm:p-5 border-zinc-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'ar' ? 'التنابر الجبائية الرسمية' : locale === 'derja' ? 'Timbres Fiscaux oficyel' : locale === 'en' ? 'Statutory Stamp Tariffs' : 'Timbres Fiscaux en Vigueur'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                JORT {new Date().getFullYear()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {officialTariffs.map((tariff, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-amber-400">
                      {tariff.amount}
                    </span>
                    <span className="text-[9px] text-zinc-500">
                      {tariff.desc}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-300 font-medium line-clamp-1">
                    {tariff.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>

      {/* ── Procedure Picker Grid with visual badges ── */}
      <FadeIn direction="up" delay={0.1} className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="font-bold uppercase tracking-wider text-[11px] text-zinc-400">
            {locale === 'ar' ? 'اختر الإجراء المعني :' : locale === 'derja' ? 'Ekhtar el procédure :' : locale === 'en' ? 'Select procedure to calculate:' : 'Sélectionner la démarche :'}
          </span>
          <span className="font-mono text-[11px]">
            {proceduresData.length} {getLocalized(ui.procedures, locale)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {proceduresData.map((p) => {
            const isSelected = p.id === selectedProcId;
            const title = getLocalized(p.title, locale);

            return (
              <motion.button
                key={p.id}
                onClick={() => setSelectedProcId(p.id)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-2xl text-left rtl:text-right transition-all duration-150 border cursor-pointer flex flex-col justify-between shadow-sm ${
                  isSelected
                    ? 'bg-emerald-950/50 text-white border-emerald-400 shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-500/40'
                    : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider block mb-1 text-emerald-400/80">
                    {getVerticalLabel(p.vertical, locale)}
                  </span>
                  <h4 className="text-xs font-semibold leading-snug line-clamp-2">
                    {title}
                  </h4>
                </div>
                <div className="pt-2 mt-2 border-t border-zinc-800/60 text-[10px] font-mono font-bold text-amber-400">
                  {formatTND(p.estimatedTotalCostTND ?? 0, locale)}
                </div>
              </motion.button>
            );
          })}
        </div>
      </FadeIn>

      {/* ── Main Grid: Cost Breakdown & Checklist ── */}
      <FadeIn direction="up" delay={0.2} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cost Breakdown + Guide Link */}
        <div className="lg:col-span-5 space-y-4">
          <TimbreCostBreakdown procedure={selectedProcedure} />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/procedures/${selectedProcedure.id}`}
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-900 group transition-all shadow-md"
            >
              <div>
                <p className="text-xs font-bold text-zinc-200 group-hover:text-emerald-300 transition-colors">
                  {locale === 'ar' ? 'هل تريد الدليل خطوة بخطوة؟' : locale === 'derja' ? 'T7eb dalil khatwa b khatwa ?' : locale === 'en' ? 'Need the step-by-step guide?' : 'Besoin du guide étape par étape ?'}
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {locale === 'ar' ? 'اطلع على الأجل والمكاتب المعنية' : locale === 'derja' ? 'Ajyal, bureaux w awra9 lezma betafsil' : locale === 'en' ? 'Detailed deadlines, offices, and required documents' : 'Délais, bureaux et documents requis en détail'}
                </p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold shrink-0">
                <span>{locale === 'ar' ? 'الدليل' : locale === 'derja' ? 'Chouf ed-dalil' : locale === 'en' ? 'View guide' : 'Voir guide'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Right: Checklist & Printable Kit */}
        <div className="lg:col-span-7 space-y-4">
          <ChecklistTracker procedure={selectedProcedure} />
          <DossierKitExport procedure={selectedProcedure} />
        </div>
      </FadeIn>
    </div>
  );
}
