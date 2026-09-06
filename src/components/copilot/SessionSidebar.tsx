'use client';

import React from 'react';
import Link from 'next/link';
import {
  Plus,
  PanelLeftClose,
  ScanText,
  FileText,
  Calculator,
  Briefcase,
  Building2,
  Landmark,
  Check,
  X,
  Pencil,
  Trash2,
  FolderLock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { ChatSession } from '../../hooks/useCopilotSessions';
import { IdaaraCrest } from './IdaaraCrest';

export interface SessionSidebarProps {
  isOpen: boolean;
  locale: SupportedLanguage;
  sessions: ChatSession[];
  currentSessionId: string;
  editingSessionId: string | null;
  editingTitle: string;
  userName?: string;
  onClose: () => void;
  onNewChat: () => void;
  onSelectSession: (session: ChatSession) => void;
  onStartRenaming: (e: React.MouseEvent, session: ChatSession) => void;
  onSaveRenamedTitle: (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent, id?: string) => void;
  onCancelRenaming: (e?: React.SyntheticEvent) => void;
  onEditingTitleChange: (value: string) => void;
  onPromptDeleteSession: (e: React.MouseEvent, session: ChatSession) => void;
  onOpenAuthModal?: () => void;
}

export function SessionSidebar({
  isOpen,
  locale,
  sessions,
  currentSessionId,
  editingSessionId,
  editingTitle,
  userName = 'Citizen',
  onClose,
  onNewChat,
  onSelectSession,
  onStartRenaming,
  onSaveRenamedTitle,
  onCancelRenaming,
  onEditingTitleChange,
  onPromptDeleteSession,
  onOpenAuthModal,
}: SessionSidebarProps) {
  const citizenInitial = (userName.trim()[0] || 'C').toUpperCase();

  const tNewChat =
    locale === 'ar'
      ? 'استشارة إدارية جديدة'
      : locale === 'derja'
      ? 'Dossier / M7adtha Jdida'
      : locale === 'fr'
      ? 'Nouvelle Démarche'
      : 'New Consultation';

  const tCivicHub =
    locale === 'ar'
      ? 'الخدمات الإدارية المباشرة'
      : locale === 'derja'
      ? 'Khedmet el Idara'
      : locale === 'fr'
      ? 'Services & Outils Citoyens'
      : 'Official Civic Tools';

  const tRecents =
    locale === 'ar'
      ? 'الملفات والاستشارات'
      : locale === 'derja'
      ? 'Dossierét w M7adhathat'
      : locale === 'fr'
      ? 'Dossiers & Consultations'
      : 'Recent Consultations';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ─── BESPOKE IDAARA CIVIC SIDEBAR ─── */}
      <aside
        className={`fixed lg:static inset-y-0 start-0 z-50 lg:z-20 w-72 lg:w-68 shrink-0 bg-[#090b0e] border-e border-white/[0.08] flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Brand Seal Header */}
          <div className="h-14 px-3.5 flex items-center justify-between border-b border-white/[0.06] shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer"
              title={locale === 'ar' ? 'الرجوع إلى بوابة إدارة' : 'Idaara.tn'}
            >
              <IdaaraCrest size={28} glow />
              <div className="leading-tight">
                <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-100 group-hover:text-white tracking-tight">
                  <span>Idaara</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                    .TN
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wide block">
                  JORT {new Date().getFullYear()} · الذكاء الإداري
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none"
              title={locale === 'ar' ? 'إغلاق القائمة' : 'Close sidebar'}
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Button: + Nouvelle Démarche */}
          <div className="p-3 pb-2 shrink-0">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent hover:from-emerald-500/25 hover:to-emerald-500/10 text-emerald-300 hover:text-white text-xs font-semibold transition-all cursor-pointer border border-emerald-500/30 hover:border-emerald-500/50 shadow-sm shadow-emerald-950/50 group"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform duration-200" />
                <span className="truncate">{tNewChat}</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400/80 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/20">
                ⌘N
              </span>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="px-3 py-1 flex-1 overflow-y-auto space-y-4">
            {/* Civic Tools Hub */}
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                {tCivicHub}
              </div>
              <nav className="space-y-0.5">
                <Link
                  href="/fasserli"
                  onClick={onClose}
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ScanText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      {locale === 'ar' ? 'فسّرلي الوثائق (OCR)' : 'Scanner Document OCR'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
                    AI
                  </span>
                </Link>

                <Link
                  href="/documents"
                  onClick={onClose}
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">
                      {locale === 'ar' ? 'نماذج العقود والاستمارات' : 'Modèles & Contrats PDF'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">PDF</span>
                </Link>

                <Link
                  href="/calculator"
                  onClick={onClose}
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">
                      {locale === 'ar' ? 'حاسبة التنابر والرسوم' : 'Calculateur de Timbres'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-amber-400/80">DT</span>
                </Link>

                <Link
                  href="/concours"
                  onClick={onClose}
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Briefcase className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="truncate">
                      {locale === 'ar' ? 'رادار المناظرات الوطنية' : 'Concours Nationaux'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-teal-400/80">2026</span>
                </Link>

                <Link
                  href="/locator"
                  onClick={onClose}
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">
                      {locale === 'ar' ? 'دليل القباضات والبلديات' : 'Atlas des Guichets'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">24 Gouv</span>
                </Link>

                <Link
                  href="/procedures"
                  onClick={onClose}
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Landmark className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate">
                      {locale === 'ar' ? 'دليل الإجراءات الشامل' : 'Guide des Démarches'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">50+</span>
                </Link>
              </nav>
            </div>

            {/* Dossiers & Consultations */}
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center justify-between">
                <span>{tRecents}</span>
                {sessions.length > 0 && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-400">
                    {sessions.length}
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                {sessions.length === 0 ? (
                  <div className="px-2.5 py-4 text-xs text-zinc-400 italic flex items-center gap-2">
                    <FolderLock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>
                      {locale === 'ar' ? 'لا توجد استشارات مسجلة' : 'Aucune démarche enregistrée'}
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
                        className={`group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-zinc-900/90 text-white font-medium border-s-2 border-emerald-400 shadow-sm'
                            : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]'
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
                              className="flex-1 bg-black/80 border border-emerald-500/80 rounded-lg px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-400"
                            />
                            <button
                              onClick={(e) => onSaveRenamedTitle(e, sess.id)}
                              className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={onCancelRenaming}
                              className="p-1 rounded text-zinc-400 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 truncate flex-1 pe-1">
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  isActive ? 'bg-emerald-400 ring-2 ring-emerald-400/30' : 'bg-zinc-600 group-hover:bg-zinc-400'
                                }`}
                              />
                              <span className="truncate">{sess.title}</span>
                            </div>

                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                onClick={(e) => onStartRenaming(e, sess)}
                                className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                title={locale === 'ar' ? 'تعديل العنوان' : 'Renommer'}
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => onPromptDeleteSession(e, sess)}
                                className="p-1.5 rounded-md hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                                title={locale === 'ar' ? 'حذف' : 'Supprimer'}
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

        {/* Bottom Tunisian Citizen ID Badge */}
        <div className="p-3 border-t border-white/[0.08] bg-[#0c0e12]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="flex items-center gap-2.5 text-start hover:opacity-90 transition-opacity cursor-pointer border-0 outline-none min-w-0"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs shadow-inner shrink-0">
                {citizenInitial}
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-xs font-semibold text-zinc-100 truncate">
                  {userName}
                </div>
                <div className="text-[10px] text-emerald-400/90 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>JORT Connecté</span>
                </div>
              </div>
            </button>

            <Link
              href="/launchpad"
              onClick={onClose}
              className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 transition-colors shrink-0"
            >
              1% Freelance
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
