'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  PanelLeftClose,
  Search,
  MessageSquare,
  ScanText,
  FileText,
  Calculator,
  Briefcase,
  Building2,
  Check,
  X,
  Pencil,
  Trash2,
  User,
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
  const [searchQuery, setSearchQuery] = useState('');
  const citizenInitial = (userName.trim()[0] || 'C').toUpperCase();

  const tNewChat =
    locale === 'ar'
      ? 'محادثة جديدة'
      : locale === 'derja'
      ? 'M7adtha Jdida'
      : locale === 'fr'
      ? 'Nouvelle conversation'
      : 'New chat';

  const tSearchPlaceholder =
    locale === 'ar'
      ? 'بحث في المحادثات...'
      : locale === 'derja'
      ? 'Lawwej fel m7adthat...'
      : locale === 'fr'
      ? 'Rechercher...'
      : 'Search chats...';

  const tToolsTitle =
    locale === 'ar'
      ? 'أدوات سريعة'
      : locale === 'derja'
      ? 'Outils sreyye3'
      : locale === 'fr'
      ? 'Outils civiques'
      : 'Civic tools';

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return sessions;
    const q = searchQuery.toLowerCase();
    return sessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [sessions, searchQuery]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ─── MINIMALIST IDAARA CIVIC SIDEBAR ─── */}
      <aside
        className={`fixed lg:static inset-y-0 start-0 z-50 lg:z-20 w-72 lg:w-64 shrink-0 bg-[#0a0c10] border-e border-white/[0.08] flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Brand Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.06] shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Idaara.tn"
            >
              <IdaaraCrest size={24} />
              <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-100 group-hover:text-white tracking-tight">
                <span>Idaara</span>
                <span className="text-[10px] text-emerald-400 font-mono font-medium">AI</span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none"
              title={locale === 'ar' ? 'إغلاق القائمة' : 'Close'}
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Button: + New chat */}
          <div className="p-3 pb-2 shrink-0 space-y-2">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-100 hover:text-white text-xs font-semibold transition-all cursor-pointer border border-white/[0.08] hover:border-white/[0.15] shadow-xs group"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform duration-200" />
                <span className="truncate">{tNewChat}</span>
              </div>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.06]">
                ⌘N
              </kbd>
            </button>

            {/* Quick Search across sessions (if more than 3 sessions) */}
            {sessions.length > 3 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute start-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tSearchPlaceholder}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl ps-8 pe-2.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            )}
          </div>

          {/* Scrollable Sessions List (Main Canvas) */}
          <div className="px-2 py-1 flex-1 overflow-y-auto space-y-0.5">
            {filteredSessions.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-zinc-500">
                {sessions.length === 0 ? (
                  locale === 'ar' ? 'لا توجد محادثات سابقة' : 'No recent chats'
                ) : (
                  locale === 'ar' ? 'لا توجد نتائج' : 'No matching chats'
                )}
              </div>
            ) : (
              filteredSessions.map((sess) => {
                const isEditing = editingSessionId === sess.id;
                const isActive = currentSessionId === sess.id;

                return (
                  <div
                    key={sess.id}
                    onClick={() => !isEditing && onSelectSession(sess)}
                    className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.08] text-white font-medium'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
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
                        <div className="flex items-center gap-2.5 truncate flex-1 pe-1">
                          <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                          <span className="truncate">{sess.title}</span>
                        </div>

                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={(e) => onStartRenaming(e, sess)}
                            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            title={locale === 'ar' ? 'تعديل العنوان' : 'Rename'}
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => onPromptDeleteSession(e, sess)}
                            className="p-1 rounded hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                            title={locale === 'ar' ? 'حذف' : 'Delete'}
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

          {/* Minimalist Civic Shortcuts (Clean, No Fake Badges) */}
          <div className="p-3 border-t border-white/[0.06] shrink-0">
            <div className="px-1 pb-1.5 text-[10px] uppercase font-bold tracking-wider text-zinc-500">
              {tToolsTitle}
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Link
                href="/fasserli"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <ScanText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">OCR</span>
              </Link>
              <Link
                href="/documents"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">PDF</span>
              </Link>
              <Link
                href="/calculator"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">Timbres</span>
              </Link>
              <Link
                href="/concours"
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                <span className="truncate">Concours</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Minimalist Citizen Account Footer */}
        <div className="p-3 border-t border-white/[0.06] bg-[#0c0e12]">
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer border-0 outline-none text-start"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                {citizenInitial}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-zinc-200 truncate">
                  {userName}
                </div>
                <div className="text-[10px] text-zinc-500 truncate">
                  {userName !== 'Citizen' && userName !== 'مواطن' ? 'Account' : (locale === 'ar' ? 'تسجيل الدخول' : 'Sign in')}
                </div>
              </div>
            </div>

            <User className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
}
