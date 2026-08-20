'use client';

import React from 'react';
import { Procedure } from '../../types/procedure';
import { useChecklist } from '../../context/ChecklistContext';
import { useLocale } from '../../context/LocaleContext';
import { CheckCircle2, Circle, RotateCcw, Sparkles, FileText } from 'lucide-react';
import { triggerConfetti } from '../../lib/utils';

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

  return (
    <div className="glass-panel rounded-2xl p-6 border border-zinc-800 space-y-6">
      {/* Header & Progress Bar */}
      <div className="space-y-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Awra9 el Dossier (Checklist Interactive)</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Cochez les papiers au fur et à mesure de leur préparation
            </p>
          </div>

          <button
            onClick={() => resetProcedureChecklist(docIds)}
            className="flex items-center space-x-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Réinitialiser</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-400">
              Avancement : {progress.completed} / {progress.total} documents
            </span>
            <span
              className={
                progress.percentage === 100 ? 'text-emerald-400 font-bold' : 'text-zinc-300'
              }
            >
              {progress.percentage}%
            </span>
          </div>

          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {progress.percentage === 100 && (
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 font-semibold flex items-center space-x-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Mabrouk! Dossier mte3ek 7adher 100% lel dépôt.</span>
          </div>
        )}
      </div>

      {/* Required Documents List */}
      <div className="space-y-3">
        {procedure.requiredDocuments.map((doc) => {
          const isChecked = isItemChecked(doc.id);
          const name = doc.name[locale] || doc.name['derja'];
          const desc = doc.description?.[locale] || doc.description?.['derja'];

          return (
            <div
              key={doc.id}
              onClick={() => handleToggle(doc.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start space-x-3 select-none ${
                isChecked
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-zinc-300'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 text-zinc-100'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-emerald-400 shrink-0 focus:outline-none"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-500/20 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-600" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs font-semibold ${
                      isChecked ? 'line-through text-zinc-500' : 'text-zinc-200'
                    }`}
                  >
                    {name}
                  </h4>
                  {doc.copiesConformes && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                      {doc.copiesConformes} Copie(s) Conforme(s)
                    </span>
                  )}
                </div>

                {desc && (
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{desc}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
