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
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { ChatSession } from '../../hooks/useCopilotSessions';
import { ClaudeStarburst } from './ClaudeStarburst';

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
  const initial = (userName.trim()[0] || 'C').toUpperCase();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* Claude-Grade Dark Sidebar (#161618) */}
      <aside
        className={`fixed lg:static inset-y-0 start-0 z-50 lg:z-20 w-64 shrink-0 bg-[#161618] border-e border-[#26262a] flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Branding Row */}
          <div className="h-12 px-4 flex items-center justify-between shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
              title={locale === 'ar' ? 'الرئيسية' : 'Idaara.tn'}
            >
              <ClaudeStarburst size={20} color="#da7756" />
              <span className="font-semibold text-[17px] text-[#f4f4f5] tracking-tight group-hover:text-white transition-colors">
                Idaara
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-0 outline-none"
              title={locale === 'ar' ? 'إغلاق القائمة' : 'Close sidebar'}
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* + New Button (Pill style matching Claude) */}
          <div className="px-3 pt-1 pb-2">
            <button
              onClick={onNewChat}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#242428] hover:bg-[#2a2a30] text-zinc-100 hover:text-white text-xs font-medium transition-all cursor-pointer border border-[#36363e] shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>
                {locale === 'ar'
                  ? 'محادثة جديدة'
                  : locale === 'derja'
                  ? 'Jdid'
                  : locale === 'en'
                  ? 'New'
                  : 'Nouveau'}
              </span>
            </button>
          </div>

          {/* Civic Hub Tools (Matching Claude's Projects / Artifacts / Code links) */}
          <div className="px-2 py-1 space-y-0.5 border-b border-[#26262a]/80">
            <Link
              href="/fasserli"
              onClick={onClose}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024] transition-colors"
            >
              <ScanText className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">
                {locale === 'ar' ? 'فسّرلي الورقة (OCR)' : 'Fasserli OCR'}
              </span>
            </Link>

            <Link
              href="/documents"
              onClick={onClose}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">
                {locale === 'ar' ? 'نماذج العقود' : 'Documents & Forms'}
              </span>
            </Link>

            <Link
              href="/calculator"
              onClick={onClose}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024] transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">
                {locale === 'ar' ? 'حاسبة التنابر' : 'Calculateur Timbres'}
              </span>
            </Link>

            <Link
              href="/concours"
              onClick={onClose}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024] transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">
                {locale === 'ar' ? 'المناظرات الوطنية' : 'Concours Nationaux'}
              </span>
            </Link>

            <Link
              href="/locator"
              onClick={onClose}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024] transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">
                {locale === 'ar' ? 'دليل القباضات والبلديات' : 'Guichets & Baladiyas'}
              </span>
            </Link>

            <Link
              href="/procedures"
              onClick={onClose}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024] transition-colors"
            >
              <Landmark className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">
                {locale === 'ar' ? 'دليل الإجراءات' : 'Guide des Démarches'}
              </span>
            </Link>
          </div>

          {/* Chats and tasks Section (Claude.ai exact list format) */}
          <div className="px-2 pt-3 pb-2 flex-1 overflow-y-auto space-y-0.5">
            <div className="px-2.5 pb-1 text-[11px] font-medium text-zinc-400 flex items-center justify-between">
              <span>
                {locale === 'ar'
                  ? 'المحادثات السابقة'
                  : locale === 'en'
                  ? 'Chats and tasks'
                  : locale === 'derja'
                  ? 'M7adhathat'
                  : 'Chats et démarches'}
              </span>
              {sessions.length > 0 && (
                <span className="text-[10px] font-mono text-zinc-400">{sessions.length}</span>
              )}
            </div>

            {sessions.length === 0 ? (
              <div className="px-2.5 py-4 text-xs text-zinc-400 italic">
                {locale === 'ar' ? 'لا توجد محادثات سابقة' : 'No recent chats'}
              </div>
            ) : (
              sessions.map((sess) => {
                const isEditing = editingSessionId === sess.id;
                const isActive = currentSessionId === sess.id;

                return (
                  <div
                    key={sess.id}
                    onClick={() => !isEditing && onSelectSession(sess)}
                    className={`group relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#27272b] text-[#f4f4f5] font-medium'
                        : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202024]'
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
                          className="flex-1 bg-[#1e1e21] border border-[#da7756] rounded px-2 py-0.5 text-xs text-white outline-none"
                        />
                        <button
                          onClick={(e) => onSaveRenamedTitle(e, sess.id)}
                          className="p-1 rounded text-[#da7756] hover:bg-white/10"
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
                          {/* Claude-style hollow bullet */}
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isActive ? 'bg-[#da7756]' : 'bg-zinc-600 group-hover:bg-zinc-400'
                            }`}
                          />
                          <span className="truncate">{sess.title}</span>
                        </div>

                        {/* Hover actions */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={(e) => onStartRenaming(e, sess)}
                            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            title={locale === 'ar' ? 'تعديل' : 'Rename'}
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
        </div>

        {/* Bottom User Card (Matching `wacim · Free v` in Claude Image 2 & 3) */}
        <div className="p-2.5 border-t border-[#26262a]">
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#202024] text-xs text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer border-0 outline-none"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#27272b] border border-[#383840] text-white flex items-center justify-center font-medium text-[11px] shrink-0">
                {initial}
              </div>
              <div className="truncate text-start leading-tight">
                <span className="font-medium text-zinc-200 truncate block">
                  {userName} <span className="text-zinc-400">· Free</span>
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
}
