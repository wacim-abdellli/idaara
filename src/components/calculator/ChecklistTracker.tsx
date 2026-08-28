'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Procedure } from '../../types/procedure';
import { useChecklist } from '../../context/ChecklistContext';
import { useLocale } from '../../context/LocaleContext';
import { CheckCircle2, Circle, RotateCcw, Sparkles, ListChecks, Copy } from 'lucide-react';
import { triggerConfetti } from '../../lib/utils';
import { getLocalized } from '../../lib/locale-utils';
import { RubberStampFX } from '../motion/RubberStampFX';
import { SpotlightCard } from '../motion/SpotlightCard';

interface ChecklistTrackerProps {
  procedure: Procedure;
}

export const ChecklistTracker: React.FC<ChecklistTrackerProps> = ({ procedure }) => {
  const { locale } = useLocale();
  const { isItemChecked, toggleItem, getProgressForProcedure, resetProcedureChecklist } =
    useChecklist();

  const docIds = procedure.requiredDocuments.map((d) => d.id);
  const progress = getProgressForProcedure(docIds);

  const handleToggle = (id: string) => {
    toggleItem(id);
    if (progress.completed + 1 === progress.total) {
      triggerConfetti();
    }
  };

  const isDone = progress.percentage === 100;

  const headerTitle =
    locale === 'ar'
      ? 'قائمة الوثائق المطلوبة (تفاعلية)'
      : locale === 'en'
      ? 'Required Documents Checklist'
      : locale === 'fr'
      ? 'Checklist des Documents Requis'
      : 'Awra9 el Dossier (Checklist)';

  const headerSubtitle =
    locale === 'ar'
      ? 'حدّد كل وثيقة قمت بتجهيزها'
      : locale === 'en'
      ? 'Check off each document as you prepare it'
      : locale === 'fr'
      ? 'Cochez les pièces au fur et à mesure'
      : 'Markez papier papier kif et3ammarha';

  const resetBtnText =
    locale === 'ar' ? 'إعادة' : locale === 'en' ? 'Reset' : locale === 'fr' ? 'Réinit.' : '3awed';

  const progressLabel =
    locale === 'ar'
      ? `${progress.completed} من أصل ${progress.total} وثائق جاهزة`
      : locale === 'en'
      ? `${progress.completed} of ${progress.total} documents ready`
      : locale === 'fr'
      ? `${progress.completed} / ${progress.total} documents prêts`
      : `${progress.completed} / ${progress.total} awra9 7adhra`;

  const doneBannerText =
    locale === 'ar'
      ? '🎉 مبروك! ملفك مكتمل وجاهز للإيداع.'
      : locale === 'en'
      ? '🎉 Congrats! Your dossier is 100% complete and ready to file.'
      : locale === 'fr'
      ? '🎉 Mabrouk! Votre dossier est 100% complet pour le dépôt.'
      : '🎉 Mabrouk! Dossier mte3ek 7adher 100% lel dépôt.';

  return (
    <SpotlightCard className="p-5 sm:p-6 border-zinc-800/80 shadow-xl relative">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-9 h-9 rounded-xl bg-zinc-800/90 flex items-center justify-center border border-zinc-700/50 shrink-0 shadow-inner">
              <ListChecks className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                {headerTitle}
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {headerSubtitle}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: -180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => resetProcedureChecklist(docIds)}
            className="flex items-center space-x-1 rtl:space-x-reverse text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 pt-0.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{resetBtnText}</span>
          </motion.button>
        </div>

        {/* Progress Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-zinc-300">
              {progressLabel}
            </span>
            <span
              className={`font-mono font-bold text-xs tabular-nums ${
                isDone ? 'text-emerald-400' : progress.percentage > 50 ? 'text-amber-400' : 'text-zinc-400'
              }`}
            >
              {progress.percentage}%
            </span>
          </div>

          {/* Animated Progress bar */}
          <div className="w-full h-2.5 bg-zinc-800/80 rounded-full overflow-hidden my-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(progress.percentage, progress.percentage > 0 ? 4 : 0)}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className={`h-full rounded-full ${
                isDone
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : progress.percentage > 50
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                  : 'bg-zinc-600'
              }`}
            />
          </div>

          {/* Done banner with RubberStampFX */}
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="pt-2"
              >
                <RubberStampFX label="DOSSIER CONFORME" sublabel="RÉPUBLIQUE TUNISIENNE">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 cursor-pointer shadow-lg">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-emerald-300">
                      {doneBannerText}
                    </span>
                  </div>
                </RubberStampFX>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Document List with interactive item springs */}
        <div className="space-y-2.5">
          {procedure.requiredDocuments.map((doc) => {
            const isChecked = isItemChecked(doc.id);
            const name = getLocalized(doc.name, locale);
            const desc = doc.description ? getLocalized(doc.description, locale) : undefined;

            return (
              <motion.div
                key={doc.id}
                onClick={() => handleToggle(doc.id)}
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`group p-3.5 rounded-2xl border cursor-pointer select-none transition-all duration-200 flex items-start gap-3 shadow-sm ${
                  isChecked
                    ? 'bg-emerald-950/25 border-emerald-800/50'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                {/* Checkbox icon */}
                <motion.div
                  className="mt-0.5 shrink-0"
                  animate={{ scale: isChecked ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-xs font-semibold leading-snug transition-colors ${
                        isChecked ? 'line-through text-zinc-600' : 'text-zinc-200'
                      }`}
                    >
                      {name}
                    </p>
                    {doc.copiesConformes && (
                      <span className="flex items-center space-x-1 rtl:space-x-reverse text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700 font-bold shrink-0 whitespace-nowrap">
                        <Copy className="w-2.5 h-2.5" />
                        <span>{doc.copiesConformes}</span>
                      </span>
                    )}
                  </div>
                  {desc && (
                    <p className={`text-[10px] mt-1 leading-relaxed ${isChecked ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      {desc}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SpotlightCard>
  );
};
