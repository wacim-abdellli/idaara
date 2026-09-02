'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/LocaleContext';
import { concoursData } from '../../data/concours';
import { filterConcours } from '../../lib/concours-knowledge';
import { getLocalized } from '../../lib/locale-utils';
import { ConcoursCategory, EducationLevel } from '../../types/concours';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { FadeIn, FadeInStagger, FadeInItem } from '../../components/motion/FadeInStagger';
import {
  Briefcase,
  Search,
  Building2,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  AlertCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function ConcoursPage() {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ConcoursCategory>('all');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>('all');
  const [expandedConcoursId, setExpandedConcoursId] = useState<string | null>(null);

  const ui = {
    openPositions: { ar: 'مناصب مفتوحة', fr: 'Postes Ouverts', en: 'Open Positions', derja: 'Manasseb maftouha' },
    sectors: { ar: 'القطاعات', fr: 'Secteurs', en: 'Sectors', derja: 'El qita3at' },
    portal: { ar: 'البوابة', fr: 'Portail', en: 'Portal', derja: 'El bawwaba' },
    reset: { ar: 'إعادة تعيين', fr: 'Réinitialiser', en: 'Reset', derja: 'Ebda men el bidaya' },
    level: { ar: 'المستوى:', fr: 'Niveau:', en: 'Level:', derja: 'El niveau:' },
    sector: { ar: 'القطاع:', fr: 'Secteur:', en: 'Sector:', derja: 'El qita3:' },
  };

  const filteredItems = filterConcours(concoursData, {
    category: selectedCategory,
    educationLevel: selectedLevel,
    searchQuery,
    locale,
  });

  const totalPosts = concoursData.reduce((acc, curr) => acc + curr.positionsCount, 0);

  const categories: { id: ConcoursCategory; label: Record<string, string> }[] = [
    {
      id: 'all',
      label: { fr: 'Tous les Secteurs', ar: 'جميع القطاعات', derja: 'El Qita3at el Kol', en: 'All Sectors' },
    },
    {
      id: 'energy_industry',
      label: { fr: 'Énergie & Industrie (STEG/SONEDE)', ar: 'الطاقة والصناعة', derja: 'Énergie (STEG & SONEDE)', en: 'Energy & Industry' },
    },
    {
      id: 'education',
      label: { fr: 'Éducation & Enseignement (CAPES)', ar: 'التربية والتعليم', derja: 'Ta3lim (CAPES)', en: 'Education & Teaching' },
    },
    {
      id: 'finance',
      label: { fr: 'Finances & Fiscalité', ar: 'المالية والجباية', derja: 'Maliya w Jibaya', en: 'Finance & Tax' },
    },
    {
      id: 'tech_telecom',
      label: { fr: 'Tech, Cyber & Télécom (ANSI)', ar: 'التكنولوجيا والسلامة السيبرنية', derja: 'Tech & Cybersécurité', en: 'Tech & Telecom' },
    },
    {
      id: 'health',
      label: { fr: 'Santé Publique', ar: 'الصحة العمومية', derja: 'Sa7a 3oumoumiya', en: 'Public Health' },
    },
    {
      id: 'interior_security',
      label: { fr: 'Intérieur & Protection Civile', ar: 'الداخلية والحماية المدنية', derja: 'Dakhiliya w 7imaya', en: 'Interior & Security' },
    },
    {
      id: 'transport_postal',
      label: { fr: 'Poste & Transport', ar: 'البريد والنقل', derja: 'El Bosta w Na9l', en: 'Postal & Transport' },
    },
  ];

  const educationLevels: { id: EducationLevel; label: Record<string, string> }[] = [
    {
      id: 'all',
      label: { fr: 'Tous Niveaux', ar: 'جميع المستويات', derja: 'El Niveawat el Kol', en: 'All Levels' },
    },
    {
      id: 'ingenieur',
      label: { fr: 'Ingénieurs (Bac+5)', ar: 'مهندسون (باك+5)', derja: 'Ingénieurs (Bac+5)', en: 'Engineers' },
    },
    {
      id: 'master',
      label: { fr: 'Master / Maîtrise', ar: 'ماجستير / أستاذية', derja: 'Master / Maîtrise', en: 'Master' },
    },
    {
      id: 'licence',
      label: { fr: 'Licence LMD', ar: 'إجازة وطنية', derja: 'Licence LMD', en: 'Bachelor (Licence)' },
    },
    {
      id: 'technicien',
      label: { fr: 'Technicien Supérieur (BTS)', ar: 'تقني سام (BTS)', derja: 'BTS / Technicien', en: 'Technician (BTS)' },
    },
    {
      id: 'bac',
      label: { fr: 'Niveau Bac / Secondaire', ar: 'مستوى بكالوريا', derja: 'Niveau Bac', en: 'High School / Bac' },
    },
  ];

  const pageTitle =
    locale === 'ar'
      ? 'رادار المناظرات الوطنية وانتدابات الوظيفة العمومية'
      : locale === 'derja'
      ? 'Radar el Concourat wel Intidhabat fi Tounes'
      : locale === 'en'
      ? 'National Public Civil Service Recruitment Radar'
      : 'Radar des Concours Nationaux & Recrutements Publics';

  const pageSubtitle =
    locale === 'ar'
      ? 'متابعة حينية لكافة مناظرات الوزارات، الشركات الوطنية (STEG, SONEDE, البوستة...) مع الوثائق المطلوبة ورابط التسجيل المباشر.'
      : locale === 'derja'
      ? 'Tabb3 kol el concourat maftou7in tawa fi Tounes (STEG, SONEDE, CAPES, Maliya...) m3a l’awra9 el matlouba w lien el inscription direct.'
      : locale === 'en'
      ? 'Real-time verified tracker for Tunisian public sector job exams and ministry competitions with direct registration links and dossier checklists.'
      : 'Suivi en temps réel de tous les concours de la fonction publique tunisienne (STEG, SONEDE, CAPES, DGI...) avec constitution du dossier et liens officiels.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      
      {/* ── Top Hero Banner & Live Telemetry ── */}
      <FadeIn direction="down" className="relative">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden bg-gradient-to-br from-[#0e1014] via-[#0d0e12] to-[#08090b] shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center gap-1.5 shadow-sm">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>concours.gov.tn · JORT {new Date().getFullYear()}</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>
                    {concoursData.length}{' '}
                    {locale === 'ar'
                      ? 'مناظرة مفتوحة حالياً'
                      : locale === 'derja'
                      ? 'concourat maftou7in tawa'
                      : locale === 'en'
                      ? 'open competitions'
                      : 'concours ouverts'}
                  </span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {pageTitle}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                {pageSubtitle}
              </p>
            </div>

            {/* Quick Live Stats Pill Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 p-4 rounded-2xl bg-zinc-950/80 border border-white/[0.06] shadow-xl">
              <div className="text-center sm:text-left px-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">{getLocalized(ui.openPositions, locale)}</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400">{totalPosts}</span>
              </div>
              <div className="text-center sm:text-left px-2 border-l border-white/[0.08]">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">{getLocalized(ui.sectors, locale)}</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400">8</span>
              </div>
              <div className="text-center sm:text-left px-2 border-l border-white/[0.08] col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">{getLocalized(ui.portal, locale)}</span>
                <span className="text-xs font-mono font-bold text-teal-300">
                  {locale === 'ar'
                    ? '100% رسمي'
                    : locale === 'derja'
                    ? '100% Rasmi'
                    : locale === 'en'
                    ? '100% Official'
                    : '100% Officiel'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </FadeIn>

      {/* ── Search & Multi-Level Filters ── */}
      <div className="space-y-4">
        {/* Search Bar Input */}
        <div className="glass-panel p-2 rounded-2xl border border-white/[0.08] bg-[#0c0d10] shadow-lg flex items-center gap-3">
          <Search className="w-4 h-4 text-zinc-400 ml-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === 'ar'
                ? 'ابحث عن مناظرة (STEG, التربية, الصوناد, مهندسين, محاسبة...)'
                : locale === 'derja'
                ? 'Lawwej 3la concours (STEG, CAPES, SONEDE, ingénieurs, finance...)'
                : locale === 'en'
                ? 'Search competitions (STEG, CAPES, SONEDE, engineering, finance...)'
                : 'Rechercher un concours (STEG, CAPES, SONEDE, ingénieurs, finances...)'
            }
            className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none py-1.5 min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-zinc-500 hover:text-zinc-300 mr-3 px-2 py-1 rounded bg-zinc-800"
            >
              {getLocalized(ui.reset, locale)}
            </button>
          )}
        </div>

        {/* Education Level Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-zinc-500 uppercase px-2 shrink-0 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{getLocalized(ui.level, locale)}</span>
          </span>
          {educationLevels.map((lvl) => {
            const isSelected = selectedLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-md shadow-emerald-500/20 font-bold'
                    : 'bg-zinc-900/60 text-zinc-400 border-white/[0.06] hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {getLocalized(lvl.label, locale)}
              </button>
            );
          })}
        </div>

        {/* Sector Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-zinc-500 uppercase px-2 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{getLocalized(ui.sector, locale)}</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 border-white shadow-md font-bold'
                    : 'bg-zinc-900/60 text-zinc-400 border-white/[0.06] hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {getLocalized(cat.label, locale)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Concours List Grid ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span>
            {filteredItems.length}{' '}
            {locale === 'ar'
              ? 'مناظرة مطابقة للبحث'
              : locale === 'derja'
              ? 'concourat mawjouda'
              : locale === 'en'
              ? 'competitions found'
              : 'concours trouvés'}
          </span>
        </div>

        <FadeInStagger faster className="space-y-4">
          {filteredItems.map((item) => {
            const title = getLocalized(item.title, locale);
            const ministry = getLocalized(item.ministry, locale);
            const deadline = getLocalized(item.deadlineDisplay, locale);
            const isExpanded = expandedConcoursId === item.id;

            return (
              <FadeInItem key={item.id}>
                <SpotlightCard className="p-5 sm:p-6 border-white/[0.08] bg-[#0c0d11] shadow-xl relative overflow-hidden transition-all">
                  
                  {/* Top Status & Ministry Tag Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase tracking-wider font-mono">
                        {getLocalized(item.institution, locale)}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">· {item.referenceNumber}</span>
                      <span className="text-zinc-600 text-xs">·</span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{ministry}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {locale === 'ar' ? 'آخر أجل :' : locale === 'derja' ? 'Ekher ajel :' : locale === 'en' ? 'Deadline:' : 'Délai :'} {deadline}
                        </span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08] text-emerald-400 text-xs font-mono font-bold">
                        {item.positionsCount}{' '}
                        {locale === 'ar' ? 'خطة' : locale === 'derja' ? 'poste' : locale === 'en' ? 'positions' : 'postes'}
                      </span>
                    </div>
                  </div>

                  {/* Main Title & Salary Preview */}
                  <div className="pt-3.5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {title}
                        </h3>
                        {item.estimatedSalaryRangeTND && (
                          <p className="text-xs text-zinc-400 mt-1">
                            <span className="text-zinc-500">
                              {locale === 'ar'
                                ? 'الراتب التقديري :'
                                : locale === 'derja'
                                ? 'Salaire te9ribi :'
                                : locale === 'en'
                                ? 'Estimated salary:'
                                : 'Rémunération indicative :'}
                            </span>{' '}
                            <strong className="text-zinc-200 font-mono">{item.estimatedSalaryRangeTND}</strong>
                          </p>
                        )}
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                        <a
                          href={item.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                        >
                          <span>
                            {locale === 'ar'
                              ? 'التسجيل الرسمي'
                              : locale === 'derja'
                              ? 'Inscription Rasmiya'
                              : locale === 'en'
                              ? 'Official Application'
                              : 'Inscription Officielle'}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => setExpandedConcoursId(isExpanded ? null : item.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-colors cursor-pointer border border-zinc-700"
                        >
                          <span>
                            {locale === 'ar'
                              ? 'الملف والشروط'
                              : locale === 'derja'
                              ? 'Dossier w Chourout'
                              : locale === 'en'
                              ? 'Requirements & Dossier'
                              : 'Détails & Dossier'}
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Dossier Checklist & Exam Stages */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-4 mt-4 border-t border-white/[0.06] space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          
                          {/* Required Documents */}
                          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] space-y-2.5">
                            <div className="font-bold text-white flex items-center gap-1.5 text-xs pb-1 border-b border-white/[0.06]">
                              <FileCheck2 className="w-4 h-4 text-emerald-400" />
                              <span>
                                {locale === 'ar'
                                  ? 'الوثائق المطلوبة للملف'
                                  : locale === 'derja'
                                  ? 'L\'awra9 el matlouba fel dossier'
                                  : locale === 'en'
                                  ? 'Required dossier documents'
                                  : 'Pièces requises pour le dossier'}
                              </span>
                            </div>
                            <ul className="space-y-1.5 text-zinc-300">
                              {item.requiredDocuments.map((doc, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{getLocalized(doc, locale)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Conditions & Exam Stages */}
                          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] space-y-2.5">
                            <div className="font-bold text-white flex items-center gap-1.5 text-xs pb-1 border-b border-white/[0.06]">
                              <AlertCircle className="w-4 h-4 text-amber-400" />
                              <span>
                                {locale === 'ar'
                                  ? 'الشروط ومراحل الاختبار'
                                  : locale === 'derja'
                                  ? 'Chourout w Ekhwet el Concours'
                                  : locale === 'en'
                                  ? 'Conditions & Exam Stages'
                                  : 'Conditions & Épreuves du concours'}
                              </span>
                            </div>
                            <div className="space-y-2 text-zinc-300">
                              {item.conditions.map((cond, cIdx) => (
                                <p key={cIdx} className="text-zinc-400">
                                  • {getLocalized(cond, locale)}
                                </p>
                              ))}
                              <div className="pt-2 border-t border-zinc-800 space-y-1">
                                <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                                  {locale === 'ar'
                                    ? 'مراحل المناظرة :'
                                    : locale === 'derja'
                                    ? 'Marahil el concours :'
                                    : locale === 'en'
                                    ? 'Exam stages:'
                                    : 'Étapes du concours :'}
                                </span>
                                {item.examStages.map((stg, sIdx) => (
                                  <p key={sIdx} className="text-[11px] text-zinc-300">
                                    {getLocalized(stg, locale)}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Direct Ask AI Footer CTA */}
                        <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs text-zinc-300">
                            <span className="font-bold text-emerald-300 block">
                              {locale === 'ar'
                                ? 'هل لديك استفسار حول هذه المناظرة؟'
                                : locale === 'derja'
                                ? '3andek sou2el 3la hal concours?'
                                : locale === 'en'
                                ? 'Questions about this competition?'
                                : 'Question sur ce concours ?'}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {locale === 'ar'
                                ? 'اسأل مساعد Idaara AI عن كيفية احتساب السكور وطريقة استخراج الوثائق.'
                                : locale === 'derja'
                                ? 'As\'el Idaara AI kifeh ta7seb score-ek w t7adher l\'awra9 mte3ek.'
                                : locale === 'en'
                                ? 'Ask Idaara AI how to calculate your eligibility score and prepare certified copies.'
                                : 'Demandez à Idaara AI comment calculer votre score et préparer vos photocopies conformes.'}
                            </span>
                          </div>

                          <Link
                            href={`/copilot?q=${encodeURIComponent(
                              locale === 'ar'
                                ? `كيفاش نقدر نقدم للمناظرة ${getLocalized(item.institution, locale)} ${title} ؟`
                                : locale === 'derja'
                                ? `Kifech n9adem rou7i lel concours ${getLocalized(item.institution, locale)} ${title} ?`
                                : locale === 'en'
                                ? `How do I apply for the ${getLocalized(item.institution, locale)} ${title} competition?`
                                : `Comment postuler au concours ${getLocalized(item.institution, locale)} ${title} ?`
                            )}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow transition-all shrink-0"
                          >
                            <span>
                              {locale === 'ar'
                                ? 'اسأل المساعد الذكي'
                                : locale === 'derja'
                                ? 'As\'el Idaara AI'
                                : locale === 'en'
                                ? 'Ask Idaara AI'
                                : 'Consulter Idaara AI'}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </SpotlightCard>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>

    </div>
  );
}
