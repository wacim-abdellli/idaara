'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale } from '../../context/LocaleContext';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Zap,
  EyeOff,
  Layers,
} from 'lucide-react';

const SpotlightCard = dynamic(
  () => import('../motion/SpotlightCard').then((m) => m.SpotlightCard),
  { ssr: false }
);

export function CTASection() {
  const { t, locale } = useLocale();

  return (
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
  );
}
