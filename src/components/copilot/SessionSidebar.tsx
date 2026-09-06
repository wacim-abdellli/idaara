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
  MapPin,
  Check,
  X,
  Pencil,
  Trash2,
  User,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { ChatSession } from '../../hooks/useCopilotSessions';
import { BrandIcon } from '../layout/BrandLogo';

export interface SessionSidebarProps {
  isOpen: boolean;
  locale: SupportedLanguage;
  sessions: ChatSession[];
  isInitialized?: boolean;
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

interface GroupedSessions {
  today: ChatSession[];
  yesterday: ChatSession[];
  lastWeek: ChatSession[];
  older: ChatSession[];
}

export function SessionSidebar({
  isOpen,
  locale,
  sessions,
  isInitialized = true,
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
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const citizenInitial = (userName.trim()[0] || 'C').toUpperCase();

  const labels = {
    newChat:
      locale === 'ar'
        ? 'محادثة إدارية جديدة'
        : locale === 'derja'
        ? 'Dossier Jdid'
        : locale === 'fr'
        ? 'Nouvelle démarche'
        : 'New consultation',
    search:
      locale === 'ar'
        ? 'بحث في المحادثات...'
        : locale === 'derja'
        ? 'Lawwej fel dossiers...'
        : locale === 'fr'
        ? 'Rechercher...'
        : 'Search chats...',
    today:
      locale === 'ar' ? 'اليوم' : locale === 'derja' ? 'Lyoum' : locale === 'fr' ? "Aujourd'hui" : 'Today',
    yesterday:
      locale === 'ar' ? 'أمس' : locale === 'derja' ? 'El bare7' : locale === 'fr' ? 'Hier' : 'Yesterday',
    lastWeek:
      locale === 'ar'
        ? 'الأيام الـ 7 الفارطة'
        : locale === 'derja'
        ? 'Hal jem3a'
        : locale === 'fr'
        ? '7 derniers jours'
        : 'Previous 7 days',
    older:
      locale === 'ar' ? 'سابقاً' : locale === 'derja' ? '9bal' : locale === 'fr' ? 'Plus ancien' : 'Older',
    tools:
      locale === 'ar'
        ? 'الخدمات الإدارية المباشرة'
        : locale === 'derja'
        ? 'Khedmet el Idara'
        : locale === 'fr'
        ? 'Services Citoyens'
        : 'Civic Services',
    account:
      userName !== 'Citizen' && userName !== 'مواطن'
        ? userName
        : locale === 'ar'
        ? 'تسجيل الدخول'
        : locale === 'derja'
        ? 'Dkhol lel compte'
        : locale === 'fr'
        ? 'Connexion'
        : 'Sign in',
    status:
      locale === 'ar'
        ? 'المنظومة متصلة'
        : locale === 'derja'
        ? 'Connecté'
        : locale === 'fr'
        ? 'JORT Connecté'
        : 'JORT Verified',
    empty:
      locale === 'ar'
        ? 'لا توجد محادثات سابقة'
        : locale === 'derja'
        ? 'Ma fama 7ata dossier'
        : locale === 'fr'
        ? 'Aucune démarche'
        : 'No consultations yet',
    noResults:
      locale === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching consultations',
  };

  // Group filtered sessions chronologically
  const groupedSessions = useMemo<GroupedSessions>(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = q
      ? sessions.filter((s) => s.title.toLowerCase().includes(q))
      : sessions;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const startOfLastWeek = startOfToday - 7 * 24 * 60 * 60 * 1000;

    const groups: GroupedSessions = {
      today: [],
      yesterday: [],
      lastWeek: [],
      older: [],
    };

    filtered.forEach((sess) => {
      const time = sess.updatedAt || sess.createdAt || 0;
      if (time >= startOfToday) {
        groups.today.push(sess);
      } else if (time >= startOfYesterday) {
        groups.yesterday.push(sess);
      } else if (time >= startOfLastWeek) {
        groups.lastWeek.push(sess);
      } else {
        groups.older.push(sess);
      }
    });

    return groups;
  }, [sessions, searchQuery]);

  const renderSessionItem = (sess: ChatSession) => {
    const isEditing = editingSessionId === sess.id;
    const isActive = currentSessionId === sess.id;

    return (
      <div
        key={sess.id}
        onClick={() => !isEditing && onSelectSession(sess)}
        className={`group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer ${
          isActive
            ? 'bg-white/[0.07] text-white font-medium border-s-2 border-emerald-400 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
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
              className="flex-1 bg-black/90 border border-emerald-500/80 rounded-lg px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-400"
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
            <div className="flex items-center gap-2 truncate flex-1 pe-1.5">
              <MessageSquare
                className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                  isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-300'
                }`}
              />
              <span className="truncate">{sess.title}</span>
            </div>

            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={(e) => onStartRenaming(e, sess)}
                className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title={locale === 'ar' ? 'تعديل العنوان' : 'Rename'}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => onPromptDeleteSession(e, sess)}
                className="p-1 rounded-md hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                title={locale === 'ar' ? 'حذف' : 'Delete'}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const hasAnySessions = sessions.length > 0;
  const hasFilteredResults =
    groupedSessions.today.length > 0 ||
    groupedSessions.yesterday.length > 0 ||
    groupedSessions.lastWeek.length > 0 ||
    groupedSessions.older.length > 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ─── PRO WEB IDAARA CIVIC SIDEBAR ─── */}
      <aside
        className={`fixed lg:static inset-y-0 start-0 z-50 lg:z-20 w-72 lg:w-68 shrink-0 bg-[#090b0e] border-e border-white/[0.08] flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Brand Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.06] shrink-0 bg-[#090b0e]/90">
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Idaara.tn"
            >
              <BrandIcon size={26} />
              <div className="leading-tight">
                <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-100 group-hover:text-white tracking-tight">
                  <span>Idaara</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  الذكاء الإداري التونسي
                </span>
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

          {/* Primary Action Button: + Nouvelle Démarche */}
          <div className="p-3 pb-2 shrink-0 space-y-2">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white text-xs font-semibold transition-all cursor-pointer border border-white/[0.08] hover:border-emerald-500/40 shadow-xs group"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform duration-200" />
                <span className="truncate">{labels.newChat}</span>
              </div>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.08]">
                ⌘N
              </kbd>
            </button>

            {/* Quick Live Search Filter */}
            {hasAnySessions && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute start-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={labels.search}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl ps-8 pe-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-400 outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            )}
          </div>

          {/* Scrollable Main Area (Grouped Sessions) */}
          <div className="px-2 py-1.5 flex-1 overflow-y-auto space-y-4">
            {!isInitialized ? null : !hasAnySessions ? (
              <div className="px-3 py-8 text-center space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="text-xs text-zinc-400">{labels.empty}</p>
              </div>
            ) : !hasFilteredResults ? (
              <div className="px-3 py-8 text-center text-xs text-zinc-400">
                {labels.noResults}
              </div>
            ) : (
              <>
                {/* Today */}
                {groupedSessions.today.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-2.5 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      {labels.today}
                    </div>
                    {groupedSessions.today.map(renderSessionItem)}
                  </div>
                )}

                {/* Yesterday */}
                {groupedSessions.yesterday.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-2.5 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      {labels.yesterday}
                    </div>
                    {groupedSessions.yesterday.map(renderSessionItem)}
                  </div>
                )}

                {/* Previous 7 Days */}
                {groupedSessions.lastWeek.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-2.5 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      {labels.lastWeek}
                    </div>
                    {groupedSessions.lastWeek.map(renderSessionItem)}
                  </div>
                )}

                {/* Older */}
                {groupedSessions.older.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-2.5 pb-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      {labels.older}
                    </div>
                    {groupedSessions.older.map(renderSessionItem)}
                  </div>
                )}
              </>
            )}
          </div>

          {/* ─── Refined Civic Tools Hub Drawer ─── */}
          <div className="p-3 border-t border-white/[0.06] shrink-0 bg-[#090b0e]/95 space-y-2">
            <button
              onClick={() => setIsToolsOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-1 text-[11px] font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer border-0 outline-none"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{labels.tools}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                  isToolsOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {isToolsOpen && (
              <div className="grid grid-cols-2 gap-1.5 animate-fade-in pt-0.5">
                <Link
                  href="/fasserli"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] text-[11px] text-zinc-300 hover:text-white transition-all group"
                >
                  <ScanText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:scale-105 transition-all shrink-0" />
                  <span className="truncate">Scanner OCR</span>
                </Link>

                <Link
                  href="/documents"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] text-[11px] text-zinc-300 hover:text-white transition-all group"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:scale-105 transition-all shrink-0" />
                  <span className="truncate">Modèles PDF</span>
                </Link>

                <Link
                  href="/calculator"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] text-[11px] text-zinc-300 hover:text-white transition-all group"
                >
                  <Calculator className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:scale-105 transition-all shrink-0" />
                  <span className="truncate">Timbres DT</span>
                </Link>

                <Link
                  href="/concours"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] text-[11px] text-zinc-300 hover:text-white transition-all group"
                >
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:scale-105 transition-all shrink-0" />
                  <span className="truncate">Concours 2026</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ─── Dignified Citizen Account Footer ─── */}
        <div className="p-3 border-t border-white/[0.08] bg-[#0c0e14]">
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] transition-all cursor-pointer outline-none text-start group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                {citizenInitial}
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                  {userName}
                </div>
                <div className="text-[10px] text-emerald-400/90 font-medium flex items-center gap-1 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{labels.status}</span>
                </div>
              </div>
            </div>

            <User className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
}
