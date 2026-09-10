'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  PanelLeftClose,
  Search,
  ScanText,
  FileText,
  Calculator,
  Briefcase,
  MapPin,
  Check,
  X,
  Pencil,
  Trash2,
  Settings,
  SquarePen,
  ChevronRight,
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
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent || '')) {
      setIsMac(true);
    }
  }, []);

  const citizenInitial = (userName.trim()[0] || 'C').toUpperCase();

  const labels = {
    newChat:
      locale === 'ar'
        ? 'محادثة إدارية جديدة'
        : locale === 'derja'
        ? 'Dossier Jdid'
        : locale === 'en'
        ? 'New consultation'
        : 'Nouvelle démarche',
    search:
      locale === 'ar'
        ? 'بحث في المحادثات...'
        : locale === 'derja'
        ? 'Lawwej fel dossiers...'
        : locale === 'en'
        ? 'Search chats...'
        : 'Rechercher...',
    today:
      locale === 'ar'
        ? 'اليوم'
        : locale === 'derja'
        ? 'Lyoum'
        : locale === 'en'
        ? 'Today'
        : "Aujourd'hui",
    yesterday:
      locale === 'ar'
        ? 'أمس'
        : locale === 'derja'
        ? 'El bare7'
        : locale === 'en'
        ? 'Yesterday'
        : 'Hier',
    lastWeek:
      locale === 'ar'
        ? 'الأيام الـ 7 الفارطة'
        : locale === 'derja'
        ? 'Hal jem3a'
        : locale === 'en'
        ? 'Previous 7 days'
        : '7 derniers jours',
    older:
      locale === 'ar'
        ? 'سابقاً'
        : locale === 'derja'
        ? '9bal'
        : locale === 'en'
        ? 'Older'
        : 'Plus ancien',
    tools:
      locale === 'ar'
        ? 'الخدمات الإدارية المباشرة'
        : locale === 'derja'
        ? 'Khedmet el Idara'
        : locale === 'en'
        ? 'Civic Services'
        : 'Services Citoyens',
    account:
      userName !== 'Citizen' && userName !== 'مواطن'
        ? userName
        : locale === 'ar'
        ? 'تسجيل الدخول'
        : locale === 'derja'
        ? 'Dkhol lel compte'
        : locale === 'en'
        ? 'Sign in'
        : 'Connexion',
    status:
      locale === 'ar'
        ? 'متصل'
        : locale === 'derja'
        ? 'Connecté'
        : locale === 'en'
        ? 'Connected'
        : 'En ligne',
    empty:
      locale === 'ar'
        ? 'لا توجد محادثات سابقة'
        : locale === 'derja'
        ? 'Ma fama 7ata dossier'
        : locale === 'en'
        ? 'No consultations yet'
        : 'Aucune démarche',
    noResults:
      locale === 'ar'
        ? 'لا توجد نتائج مطابقة'
        : locale === 'derja'
        ? 'Ma l9ina chay'
        : locale === 'en'
        ? 'No matching consultations'
        : 'Aucune démarche trouvée',
    docs:
      locale === 'ar'
        ? 'نماذج وعقود إدارية'
        : locale === 'derja'
        ? 'Modèles PDF'
        : locale === 'en'
        ? 'Legal Templates'
        : 'Modèles & Actes',
    ocr:
      locale === 'ar'
        ? 'ماسح الوثائق (OCR)'
        : locale === 'derja'
        ? 'Scanner OCR'
        : locale === 'en'
        ? 'Document Scanner'
        : 'Scanner OCR',
    calc:
      locale === 'ar'
        ? 'حاسبة الطوابع الجبائية'
        : locale === 'derja'
        ? 'Timbres DT & JORT'
        : locale === 'en'
        ? 'Fiscal Calculator'
        : 'Calculateur Timbres',
    concours:
      locale === 'ar'
        ? 'مناظرات الوظيفة العمومية'
        : locale === 'derja'
        ? 'Concours 2026'
        : locale === 'en'
        ? 'Public Exams'
        : 'Concours Publics',
    locator:
      locale === 'ar'
        ? 'دليل الإدارات التونسية'
        : locale === 'derja'
        ? 'Dalil el Idarat'
        : locale === 'en'
        ? 'Office Locator'
        : 'Annuaire des Idaras',
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
        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
          isActive
            ? 'bg-white/[0.08] text-white font-medium border border-white/[0.06]'
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
              className="flex-1 bg-[#0c0c0c] border border-white/[0.14] rounded-lg px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-white/40"
            />
            <button
              onClick={(e) => onSaveRenamedTitle(e, sess.id)}
              className="p-1 rounded bg-white/10 text-zinc-200 hover:bg-white/20"
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
            <div className="flex items-center truncate flex-1 pe-2">
              <span className="truncate text-[13px] leading-relaxed">{sess.title}</span>
            </div>

            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={(e) => onStartRenaming(e, sess)}
                className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title={locale === 'ar' ? 'تعديل العنوان' : 'Rename'}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => onPromptDeleteSession(e, sess)}
                className="p-1.5 rounded-md hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
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
        className={`fixed lg:static inset-y-0 start-0 z-50 lg:z-20 w-68 shrink-0 bg-[#000000] border-e border-white/[0.08] flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Brand Header (Links back to homepage) */}
          <div className="h-14 px-3.5 flex items-center justify-between border-b border-white/[0.08] shrink-0 bg-[#000000]">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer bg-transparent border-0 p-1 text-start outline-none rounded-lg hover:bg-white/[0.06] transition-colors"
              title={locale === 'ar' ? 'الرجوع إلى الصفحة الرئيسية' : locale === 'derja' ? 'Erja3 lel accueil' : locale === 'en' ? 'Back to homepage' : 'Retour à l\'accueil'}
              aria-label={locale === 'ar' ? 'الصفحة الرئيسية' : locale === 'derja' ? 'Accueil' : locale === 'en' ? 'Home' : 'Accueil'}
            >
              <BrandIcon size={22} />
              <div className="flex items-center gap-1.5 font-medium text-sm text-zinc-200 group-hover:text-white">
                <span>Idaara</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono">
                  AI
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              {/* Quick 1-click New Chat Icon */}
              <button
                onClick={onNewChat}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer border-0 outline-none"
                title={labels.newChat}
                aria-label={labels.newChat}
              >
                <SquarePen className="w-4 h-4" />
              </button>

              {/* Collapse Sidebar Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer border-0 outline-none"
                title={locale === 'ar' ? 'إغلاق القائمة' : locale === 'derja' ? 'Sker el قائمة' : locale === 'en' ? 'Close sidebar' : 'Fermer le panneau'}
                aria-label={locale === 'ar' ? 'إغلاق اللائحة' : locale === 'derja' ? 'Sker el sidebar' : locale === 'en' ? 'Close sidebar' : 'Fermer le panneau'}
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Primary Action Button: + New Chat (Sleek pill) */}
          <div className="p-3 pb-2 shrink-0 space-y-2">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-zinc-200 hover:text-white text-xs font-medium transition-all cursor-pointer border border-white/[0.08] hover:border-white/[0.14] group shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="truncate">{labels.newChat}</span>
              </div>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                {isMac ? '⌘N' : 'Ctrl+N'}
              </kbd>
            </button>

            {/* Quick Live Search Filter with Instant Clear Button */}
            {hasAnySessions && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={labels.search}
                  className="w-full bg-[#0c0c0c] border border-white/[0.08] focus:border-white/20 rounded-xl ps-8 pe-7 py-2 text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Scrollable Main Area (Grouped Sessions + Civic Hub) */}
          <div className="px-2 py-1.5 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
            {!isInitialized ? null : !hasAnySessions ? (
              <div className="px-3 py-6 text-center space-y-2">
                <p className="text-xs text-zinc-400">{labels.empty}</p>
              </div>
            ) : !hasFilteredResults ? (
              <div className="px-3 py-6 text-center text-xs text-zinc-400">
                {labels.noResults}
              </div>
            ) : (
              <>
                {/* Today */}
                {groupedSessions.today.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-3 pt-1 pb-1 text-[11px] font-medium text-zinc-400 tracking-normal">
                      {labels.today}
                    </div>
                    {groupedSessions.today.map(renderSessionItem)}
                  </div>
                )}

                {/* Yesterday */}
                {groupedSessions.yesterday.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-3 pt-2 pb-1 text-[11px] font-medium text-zinc-400 tracking-normal">
                      {labels.yesterday}
                    </div>
                    {groupedSessions.yesterday.map(renderSessionItem)}
                  </div>
                )}

                {/* Previous 7 Days */}
                {groupedSessions.lastWeek.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-3 pt-2 pb-1 text-[11px] font-medium text-zinc-400 tracking-normal">
                      {labels.lastWeek}
                    </div>
                    {groupedSessions.lastWeek.map(renderSessionItem)}
                  </div>
                )}

                {/* Older */}
                {groupedSessions.older.length > 0 && (
                  <div className="space-y-0.5">
                    <div className="px-3 pt-2 pb-1 text-[11px] font-medium text-zinc-400 tracking-normal">
                      {labels.older}
                    </div>
                    {groupedSessions.older.map(renderSessionItem)}
                  </div>
                )}
              </>
            )}

            {/* ─── Integrated Civic Quick Access (Eliminates the empty void) ─── */}
            <div className="pt-2 px-1 border-t border-white/[0.06] space-y-1">
              <div className="px-2.5 pb-1.5 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{labels.tools}</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <Link
                  href="/documents"
                  onClick={onClose}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                    <span className="truncate">{labels.docs}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/fasserli"
                  onClick={onClose}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <ScanText className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                    <span className="truncate">{labels.ocr}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/calculator"
                  onClick={onClose}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Calculator className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                    <span className="truncate">{labels.calc}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/concours"
                  onClick={onClose}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                    <span className="truncate">{labels.concours}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/locator"
                  onClick={onClose}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                    <span className="truncate">{labels.locator}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Dignified Citizen Account Footer ─── */}
        <div className="p-3 border-t border-white/[0.08] bg-[#000000]">
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06] transition-all cursor-pointer outline-none text-start group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 text-zinc-100 flex items-center justify-center font-medium text-xs shrink-0 border border-white/10 shadow-xs">
                {citizenInitial}
                {/* Active Presence Dot */}
                <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                  {userName}
                </div>
                <div className="text-[10px] text-zinc-400 font-normal pt-0.5 flex items-center gap-1">
                  <span>{labels.status}</span>
                </div>
              </div>
            </div>

            <Settings className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 shrink-0 transition-colors" />
          </button>
        </div>
      </aside>
    </>
  );
}
