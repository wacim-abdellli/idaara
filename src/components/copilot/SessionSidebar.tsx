'use client';

import React from 'react';
import Link from 'next/link';
import {
  PenSquare,
  PanelLeftClose,
  ScanText,
  FileCode2,
  Stamp,
  Briefcase,
  Building2,
  Landmark,
  Check,
  X,
  Pencil,
  Trash2,
} from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { ChatSession } from '../../hooks/useCopilotSessions';

export interface SessionSidebarProps {
  isOpen: boolean;
  locale: SupportedLanguage;
  sessions: ChatSession[];
  currentSessionId: string;
  editingSessionId: string | null;
  editingTitle: string;
  onClose: () => void;
  onNewChat: () => void;
  onSelectSession: (session: ChatSession) => void;
  onStartRenaming: (e: React.MouseEvent, session: ChatSession) => void;
  onSaveRenamedTitle: (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent, id?: string) => void;
  onCancelRenaming: (e?: React.SyntheticEvent) => void;
  onEditingTitleChange: (value: string) => void;
  onPromptDeleteSession: (e: React.MouseEvent, session: ChatSession) => void;
}

export function SessionSidebar({
  isOpen,
  locale,
  sessions,
  currentSessionId,
  editingSessionId,
  editingTitle,
  onClose,
  onNewChat,
  onSelectSession,
  onStartRenaming,
  onSaveRenamedTitle,
  onCancelRenaming,
  onEditingTitleChange,
  onPromptDeleteSession,
}: SessionSidebarProps) {
  return (
    <>
      {/* ── Mobile Backdrop Overlay ── */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 top-14 bg-black/75 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ── BESPOKE CIVIC SIDEBAR (#121214) ── */}
      <aside
        className={`fixed lg:static inset-y-0 top-14 lg:top-0 start-0 z-50 lg:z-20 w-72 max-w-[85vw] lg:w-64 shrink-0 bg-[#121214] border-e border-white/5 flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Sidebar Top Action Header (h-14 aligned) */}
          <div className="h-14 px-3 flex items-center justify-between border-b border-white/5 shrink-0">
            <button
              onClick={onNewChat}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-100 text-xs font-semibold transition-all cursor-pointer border border-white/10 shadow-sm"
            >
              <PenSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {locale === 'ar'
                  ? 'محادثة جديدة'
                  : locale === 'en'
                  ? 'New Chat'
                  : locale === 'derja'
                  ? 'M7adtha Jdida'
                  : 'Nouveau chat'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
              title={locale === 'ar' ? 'إغلاق القائمة' : locale === 'derja' ? 'A9el el menu' : locale === 'en' ? 'Close sidebar' : 'Fermer le menu'}
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Scrollable Body */}
          <div className="p-3 space-y-3 overflow-y-auto flex-1">
            {/* Civic Navigation Tools */}
            <nav className="space-y-0.5">
              <Link
                href="/fasserli"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <ScanText className="w-4 h-4 text-emerald-400" />
                <span>
                  {locale === 'ar'
                    ? 'فسّرلي هالورقة (OCR)'
                    : locale === 'en'
                    ? 'Scanner OCR'
                    : locale === 'derja'
                    ? 'Fasserli OCR'
                    : 'Scanner OCR'}
                </span>
              </Link>
              <Link
                href="/documents"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <FileCode2 className="w-4 h-4 text-blue-400" />
                <span>
                  {locale === 'ar'
                    ? 'نماذج العقود والاستمارات'
                    : locale === 'en'
                    ? 'Templates & Forms'
                    : locale === 'derja'
                    ? 'Modélet & 39oud'
                    : 'Modèles & Contrats'}
                </span>
              </Link>
              <Link
                href="/calculator"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>
                  {locale === 'ar'
                    ? 'حاسبة التنابر والرسوم'
                    : locale === 'en'
                    ? 'Stamp Calculator'
                    : locale === 'derja'
                    ? 'Calculateur Timbres'
                    : 'Calculateur de Timbres'}
                </span>
              </Link>
              <Link
                href="/concours"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Briefcase className="w-4 h-4 text-teal-400" />
                <span>
                  {locale === 'ar'
                    ? 'المناظرات الوطنية'
                    : locale === 'en'
                    ? 'Public Concours'
                    : locale === 'derja'
                    ? 'Radar el Concourat'
                    : 'Concours Nationaux'}
                </span>
              </Link>
              <Link
                href="/locator"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>
                  {locale === 'ar'
                    ? 'دليل البلديات والقباضات'
                    : locale === 'en'
                    ? 'Offices & Baladiyas'
                    : locale === 'derja'
                    ? 'Baladiyas & 9badhat'
                    : 'Baladiyas & Recettes'}
                </span>
              </Link>
              <Link
                href="/procedures"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Landmark className="w-4 h-4 text-purple-400" />
                <span>
                  {locale === 'ar'
                    ? 'دليل الإجراءات الرسمية'
                    : locale === 'en'
                    ? 'Procedures Guide'
                    : locale === 'derja'
                    ? 'Dalil el Démarches'
                    : 'Guide des Démarches'}
                </span>
              </Link>
            </nav>

            {/* Recents Section */}
            <div className="pt-2">
              <div className="px-3 pb-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                {locale === 'ar'
                  ? 'المحادثات السابقة'
                  : locale === 'en'
                  ? 'Recent History'
                  : locale === 'derja'
                  ? 'M7adhathat 9dima'
                  : 'Historique Récent'}
              </div>
              <div className="space-y-0.5">
                {sessions.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-zinc-500 italic">
                    {locale === 'ar'
                      ? 'لا توجد محادثات سابقة'
                      : locale === 'en'
                      ? 'No recent discussions'
                      : locale === 'derja'
                      ? '7atta m7adtha 9dima'
                      : 'Aucune discussion récente'}
                  </div>
                ) : (
                  sessions.map((sess) => {
                    const isEditing = editingSessionId === sess.id;
                    return (
                      <div
                        key={sess.id}
                        onClick={() => !isEditing && onSelectSession(sess)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                          currentSessionId === sess.id
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1.5 w-full" onClick={(e) => e.stopPropagation()}>
                            <input
                              autoFocus
                              type="text"
                              value={editingTitle}
                              onChange={(e) => onEditingTitleChange(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') onSaveRenamedTitle(e, sess.id);
                                if (e.key === 'Escape') onCancelRenaming(e);
                              }}
                              className="flex-1 bg-black/60 border border-emerald-500 rounded-lg px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-400"
                            />
                            <button
                              onClick={(e) => onSaveRenamedTitle(e, sess.id)}
                              className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer border-0"
                              title={locale === 'ar' ? 'حفظ' : locale === 'derja' ? 'Sauvegarder' : locale === 'en' ? 'Save' : 'Enregistrer'}
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={onCancelRenaming}
                              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0"
                              title={locale === 'ar' ? 'إلغاء' : locale === 'derja' ? 'Annuler' : locale === 'en' ? 'Cancel' : 'Annuler'}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="truncate flex-1 text-xs">{sess.title}</span>
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => onStartRenaming(e, sess)}
                                className="p-2 hover:text-emerald-400 text-zinc-400 transition-colors cursor-pointer border-0 outline-none"
                                title={locale === 'ar' ? 'تغيير الاسم' : locale === 'derja' ? 'Baddel el ism' : locale === 'en' ? 'Rename' : 'Renommer'}
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => onPromptDeleteSession(e, sess)}
                                className="p-2 hover:text-red-400 text-zinc-400 transition-colors cursor-pointer border-0 outline-none"
                                title={locale === 'ar' ? 'حذف المحادثة' : locale === 'derja' ? 'Fasa5 el chat' : locale === 'en' ? 'Delete chat' : 'Supprimer la discussion'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Profile / Platform Info */}
        <div className="p-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-700/80 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              TN
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-zinc-200">
                {locale === 'ar' ? 'مواطن' : locale === 'en' ? 'Citizen' : locale === 'derja' ? 'Mowaten' : 'Citoyen'}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                Idaara {locale === 'ar' ? 'مجاني' : locale === 'derja' ? 'Fabor' : locale === 'fr' ? 'Gratuit' : 'Free'}
              </div>
            </div>
          </div>

          <Link
            href="/launchpad"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300 transition-colors"
          >
            {locale === 'ar' ? 'المستقل' : locale === 'derja' ? 'Mustaqel' : locale === 'fr' ? 'Indépendant' : 'Freelance'}
          </Link>
        </div>
      </aside>
    </>
  );
}
