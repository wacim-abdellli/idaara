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
  MessageSquare,
} from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { ChatSession } from '../../hooks/useCopilotSessions';
import { BrandIcon } from '../layout/BrandLogo';

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
      {/* ── Mobile Backdrop Overlay (Full height) ── */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ── BESPOKE CLAUDE-GRADE CIVIC SIDEBAR ── */}
      <aside
        className={`fixed lg:static inset-y-0 start-0 z-50 lg:z-20 w-72 lg:w-64 shrink-0 bg-[#0f1013] border-e border-white/[0.06] flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header with Brand & Close toggle */}
          <div className="h-14 px-3.5 flex items-center justify-between border-b border-white/[0.06] shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
              title={locale === 'ar' ? 'الرجوع إلى الرئيسية' : 'Return to Idaara.tn home'}
            >
              <BrandIcon size={24} className="group-hover:scale-105 transition-transform" />
              <span className="font-bold text-sm text-zinc-100 group-hover:text-white tracking-tight transition-colors">
                Idaara <span className="text-emerald-400 font-semibold">AI</span>
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
              title={locale === 'ar' ? 'إغلاق القائمة' : locale === 'derja' ? 'A9el el menu' : locale === 'en' ? 'Close sidebar' : 'Fermer le menu'}
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action: + New Chat Button */}
          <div className="p-3 pb-1 shrink-0">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-100 text-xs font-semibold transition-all cursor-pointer border border-white/[0.08] shadow-xs group"
            >
              <div className="flex items-center gap-2.5">
                <PenSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>
                  {locale === 'ar'
                    ? 'محادثة جديدة'
                    : locale === 'en'
                    ? 'New chat'
                    : locale === 'derja'
                    ? 'M7adtha Jdida'
                    : 'Nouveau chat'}
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 px-1 py-0.5 rounded bg-white/[0.04]">
                Ctrl+N
              </span>
            </button>
          </div>

          {/* Sidebar Scrollable Body */}
          <div className="p-3 space-y-3 overflow-y-auto flex-1">
            {/* Civic Navigation Hub (Clean Slate Monochrome Palette) */}
            <div>
              <div className="px-3 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                {locale === 'ar'
                  ? 'الأدوات الإدارية'
                  : locale === 'en'
                  ? 'Civic Tools'
                  : locale === 'derja'
                  ? 'Khedmet el Idara'
                  : 'Services Citoyens'}
              </div>
              <nav className="space-y-0.5">
                <Link
                  href="/fasserli"
                  onClick={onClose}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] text-xs font-medium transition-colors"
                >
                  <ScanText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  <span>
                    {locale === 'ar'
                      ? 'فسّرلي هالورقة (OCR)'
                      : locale === 'en'
                      ? 'Fasserli OCR Scanner'
                      : locale === 'derja'
                      ? 'Fasserli OCR'
                      : 'Scanner OCR'}
                  </span>
                </Link>
                <Link
                  href="/documents"
                  onClick={onClose}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] text-xs font-medium transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  <span>
                    {locale === 'ar'
                      ? 'نماذج العقود والاستمارات'
                      : locale === 'en'
                      ? 'Legal Forms & Contracts'
                      : locale === 'derja'
                      ? 'Modélet & 39oud'
                      : 'Modèles & Contrats'}
                  </span>
                </Link>
                <Link
                  href="/calculator"
                  onClick={onClose}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] text-xs font-medium transition-colors"
                >
                  <Stamp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
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
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] text-xs font-medium transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
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
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] text-xs font-medium transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
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
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] text-xs font-medium transition-colors"
                >
                  <Landmark className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
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
            </div>

            {/* Recents Section */}
            <div>
              <div className="px-3 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-500 flex items-center justify-between">
                <span>
                  {locale === 'ar'
                    ? 'المحادثات السابقة'
                    : locale === 'en'
                    ? 'Recent History'
                    : locale === 'derja'
                    ? 'M7adhathat 9dima'
                    : 'Historique Récent'}
                </span>
                {sessions.length > 0 && (
                  <span className="text-[9px] font-mono text-zinc-600 bg-white/[0.04] px-1.5 py-0.2 rounded-full">
                    {sessions.length}
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                {sessions.length === 0 ? (
                  <div className="px-3 py-3 text-xs text-zinc-500 italic flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 text-zinc-600" />
                    <span>
                      {locale === 'ar'
                        ? 'لا توجد محادثات سابقة'
                        : locale === 'en'
                        ? 'No recent chats'
                        : locale === 'derja'
                        ? '7atta m7adtha 9dima'
                        : 'Aucune discussion récente'}
                    </span>
                  </div>
                ) : (
                  sessions.map((sess) => {
                    const isEditing = editingSessionId === sess.id;
                    const isActive = currentSessionId === sess.id;
                    return (
                      <div
                        key={sess.id}
                        onClick={() => !isEditing && onSelectSession(sess)}
                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white/[0.08] text-white font-medium shadow-xs'
                            : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute start-0 top-1.5 bottom-1.5 w-0.5 bg-emerald-400 rounded-full" />
                        )}

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
                              className="flex-1 bg-black/70 border border-emerald-500/80 rounded-lg px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-400"
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
                            <div className="flex items-center gap-2 truncate flex-1 pe-2">
                              <MessageSquare className={`w-3 h-3 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                              <span className="truncate">{sess.title}</span>
                            </div>
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                onClick={(e) => onStartRenaming(e, sess)}
                                className="p-1.5 rounded-md hover:bg-white/10 hover:text-zinc-100 text-zinc-500 transition-colors cursor-pointer border-0 outline-none"
                                title={locale === 'ar' ? 'تغيير الاسم' : locale === 'derja' ? 'Baddel el ism' : locale === 'en' ? 'Rename' : 'Renommer'}
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => onPromptDeleteSession(e, sess)}
                                className="p-1.5 rounded-md hover:bg-red-500/20 hover:text-red-400 text-zinc-500 transition-colors cursor-pointer border-0 outline-none"
                                title={locale === 'ar' ? 'حذف المحادثة' : locale === 'derja' ? 'Fasa5 el chat' : locale === 'en' ? 'Delete chat' : 'Supprimer la discussion'}
                              >
                                <Trash2 className="w-3 h-3" />
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
        <div className="p-3 border-t border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-[11px]">
              TN
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-zinc-200">
                {locale === 'ar' ? 'المواطن' : locale === 'en' ? 'Citizen' : locale === 'derja' ? 'Mowaten' : 'Citoyen'}
              </div>
              <div className="text-[10px] text-zinc-400 font-medium">
                {locale === 'ar' ? 'حساب مجاني' : locale === 'derja' ? 'Compte Fabor' : locale === 'fr' ? 'Accès Gratuit' : 'Free Tier'}
              </div>
            </div>
          </div>

          <Link
            href="/launchpad"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            {locale === 'ar' ? 'المستقل 1%' : locale === 'derja' ? 'Freelance 1%' : locale === 'fr' ? 'Indépendant' : 'Freelance'}
          </Link>
        </div>
      </aside>
    </>
  );
}
