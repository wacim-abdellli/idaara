'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale } from '../../../context/LocaleContext';
import { proceduresData } from '../../../data/procedures';
import {
  Calculator,
  ArrowRight,
  Bot,
  Sparkles,
  FileText,
} from 'lucide-react';

const SpotlightCard = dynamic(
  () => import('../../motion/SpotlightCard').then((m) => m.SpotlightCard),
  { ssr: false }
);

export function GatewayPillars() {
  const { locale } = useLocale();

  return (
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
                  ? 'الدليل الإداري وحساب التمبر'
                  : locale === 'derja'
                  ? '7seb el Timbres w Masrouf'
                  : locale === 'en'
                  ? 'Civic Guides & Exact Stamp Math'
                  : 'Guides & Calculateur de Timbres'}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                {locale === 'ar'
                  ? 'أكثر من 20 دليلاً رسمياً مفصلاً (جواز، بطاقة تعريف، بطاقة رمادية...) مع حساب المعاليم الجبائية الرسمية دون مفاجآت.'
                  : locale === 'derja'
                  ? 'Akther men 20 guide officiel mrigel (Passeport, CIN, Carte grise...) b’7seb el timbres bedhabt men ghir mofaj2at.'
                  : locale === 'en'
                  ? '20+ statutory step-by-step guides with exact fiscal stamp calculations matching official Tunisian revenue rates.'
                  : 'Plus de 20 guides administratifs complets avec calcul exact des timbres fiscaux selon les tarifs officiels en vigueur.'}
              </p>
            </div>

            {/* Quick badges preview */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {proceduresData.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/procedures/${p.id}`}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center gap-1"
                >
                  <span>{p.title[locale]}</span>
                  <span className="text-emerald-400 font-bold">{p.estimatedTotalCostTND.toFixed(3)} DT</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href="/calculator"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>{locale === 'ar' ? 'حساب التكلفة' : 'Calculer les Timbres'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
            <Link
              href="/procedures"
              className="text-[11px] font-semibold text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08]"
            >
              {locale === 'ar' ? 'جميع الأدلة' : 'Tous les Guides'}
            </Link>
          </div>
        </SpotlightCard>

        {/* Pillar 2: AI Civic Copilot */}
        <SpotlightCard className="p-6 sm:p-7 border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-[#0c0d12] to-[#0c0d12] shadow-2xl flex flex-col justify-between space-y-5 hover:border-emerald-400/70 transition-all group relative overflow-hidden rounded-3xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-950/50">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                <span>{locale === 'ar' ? 'محادثة ذكية' : 'IA Intelligente'}</span>
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                {locale === 'ar'
                  ? '2. المساعد الإداري التونسي'
                  : locale === 'derja'
                  ? '2. El Copilot el Idari'
                  : locale === 'en'
                  ? '2. AI Civic Copilot'
                  : '2. Le Copilote Citoyen'}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {locale === 'ar'
                  ? 'ذكاء اصطناعي يفهم الدارجة والرائد الرسمي'
                  : locale === 'derja'
                  ? 'AI yefhem el Derja wel 9anoun'
                  : locale === 'en'
                  ? 'Legal Reasoning in Tunisian Derja'
                  : 'Comprend la Derja & le Droit Tunisien'}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                {locale === 'ar'
                  ? 'اسأل بأي لهجة عن وثائقك أو مواعيد العمل بالقباضة والبلدية، ليجيبك بدقة معتمداً على نصوص الرائد الرسمي للجمهورية التونسية.'
                  : locale === 'derja'
                  ? 'Es\'el bel Derja 3la ay war9a walla démarche, yjawbek bel d9i9a w ywariwek el timbres w wa9tech tmechi.'
                  : locale === 'en'
                  ? 'Ask naturally in Tunisian Derja, Arabic, French, or English. Instant, verifiable guidance grounded strictly in official JORT decrees.'
                  : 'Posez vos questions en dialecte tunisien, arabe ou français. Réponses instantanées et sourcées selon les lois du JORT.'}
              </p>
            </div>

            {/* Micro conversational pill preview */}
            <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/[0.08] space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="italic">« {locale === 'ar' ? 'شنوة يلزمني باش نجدد باسبور؟' : 'Chnouwa lezemni bech nbadal el passeport?'} »</span>
              </div>
              <p className="text-emerald-300 text-[11px] font-medium leading-relaxed">
                → {locale === 'ar' ? 'طابع جبائي 80 د.ت + 4 صور + بطاقة التعريف + المطلب القديم.' : 'Timbre 80 DT + 4 photos + CIN + ancien passeport.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href="/copilot"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>{locale === 'ar' ? 'بدء الاستشارة الفورية' : 'Lancer le Copilote'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
            <span className="text-[10px] font-mono text-zinc-500">
              {locale === 'ar' ? 'مجاني ومتاح 24/7' : 'Gratuit & 24/7'}
            </span>
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
  );
}
