'use client';

import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { ChatSession } from '../../hooks/useCopilotSessions';

export interface DeleteSessionModalProps {
  session: ChatSession | null;
  locale: SupportedLanguage;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteSessionModal({
  session,
  locale,
  onClose,
  onConfirm,
}: DeleteSessionModalProps) {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#1c1c1f] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            {locale === 'ar'
              ? 'حذف المحادثة؟'
              : locale === 'en'
              ? 'Delete conversation?'
              : locale === 'derja'
              ? 'T7eb tfasa5 el m7adtha?'
              : 'Supprimer la discussion ?'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          {locale === 'ar'
            ? `سيتم حذف "${session.title}". لا يمكن التراجع عن هذا الإجراء.`
            : locale === 'en'
            ? `This will permanently delete "${session.title}". This action cannot be undone.`
            : locale === 'derja'
            ? `El m7adtha "${session.title}" bech tetfasa5 dima. Ma3adech tnejjem trajja3ha.`
            : `Cette action supprimera définitivement "${session.title}". Vous ne pourrez pas annuler cette action.`}
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none"
          >
            {locale === 'ar'
              ? 'إلغاء'
              : locale === 'en'
              ? 'Cancel'
              : locale === 'derja'
              ? 'Battalt'
              : 'Annuler'}
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer border-0 outline-none shadow-md shadow-red-900/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>
              {locale === 'ar'
                ? 'حذف نهائياً'
                : locale === 'en'
                ? 'Delete permanently'
                : locale === 'derja'
                ? 'Fasa5 tawa'
                : 'Supprimer'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
