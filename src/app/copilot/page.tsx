'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { PanelLeft, RotateCcw, Share2, ChevronDown, User as UserIcon } from 'lucide-react';

import { useCopilotSessions, ChatSession } from '../../hooks/useCopilotSessions';
import { useCopilotVoice } from '../../hooks/useCopilotVoice';
import { SessionSidebar } from '../../components/copilot/SessionSidebar';
import { ChatInput } from '../../components/copilot/ChatInput';
import { DeleteSessionModal } from '../../components/copilot/DeleteSessionModal';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';
import { AuthModal } from '../../components/auth/AuthModal';
import { ClaudeStarburst } from '../../components/copilot/ClaudeStarburst';

export default function CopilotPage() {
  const { locale, isRtl } = useLocale();
  const { user } = useAuth();

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [thinkMode, setThinkMode] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const autoQueryRef = useRef<((q: string) => void) | null>(null);

  const {
    messages,
    setMessages,
    sessions,
    currentSessionId,
    isInitialized,
    sessionToDelete,
    setSessionToDelete,
    editingSessionId,
    editingTitle,
    setEditingTitle,
    handleNewChat,
    loadSession,
    promptDeleteSession,
    confirmDeleteSession,
    startRenaming,
    saveRenamedTitle,
    cancelRenaming,
  } = useCopilotSessions((query) => {
    if (autoQueryRef.current) {
      autoQueryRef.current(query);
    }
  });

  const handleSendMessage = useCallback(async (textToSend?: string) => {
    const rawQuery = (textToSend ?? inputVal).trim();
    if (!rawQuery || isProcessing) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: rawQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setShowPlusMenu(false);
    setIsProcessing(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.content,
      }));

      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: rawQuery, locale, history, think: thinkMode }),
      });

      const data = await res.json();
      const response = data.result || {};
      const fullText = (response.content || '').trim();

      if (!fullText) {
        setIsProcessing(false);
        return;
      }

      const aiMsgId = `ai-${Date.now()}`;

      // Insert initial assistant message shell with isStreaming: true
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'assistant',
          content: '',
          isStreaming: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: response.actions,
          timbreBreakdown: response.timbreBreakdown,
        },
      ]);
      setIsProcessing(false);

      // Silky Smooth Natural Typewriter (Claude-Grade Cadence)
      const tokens = fullText.split(/(\s+)/);
      let currentText = '';
      const baseDelay = tokens.length > 300 ? 10 : tokens.length > 150 ? 14 : 18;

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        currentText += token;

        if (token.trim().length > 0 || token.includes('\n')) {
          const snapshot = currentText;
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsgId ? { ...m, content: snapshot, isStreaming: true } : m))
          );

          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }

          const isPunctuation = /[.!?:;\n،؟]/.test(token);
          const delay = isPunctuation ? baseDelay + 14 : baseDelay;
          await new Promise((r) => setTimeout(r, delay));
        }
      }

      // Complete streaming cleanly
      setMessages((prev) =>
        prev.map((m) => (m.id === aiMsgId ? { ...m, content: fullText, isStreaming: false } : m))
      );

      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          content:
            locale === 'fr'
              ? 'Erreur de connexion. Réessayez.'
              : locale === 'ar'
              ? 'خطأ في الاتصال. أعد المحاولة.'
              : locale === 'derja'
              ? 'Kayen mochkel fel connexion. 3awed jarreb.'
              : 'Connection error. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal, isProcessing, locale, thinkMode, messages]);

  useEffect(() => {
    autoQueryRef.current = handleSendMessage;
  }, [handleSendMessage]);

  const onTranscribed = useCallback((text: string) => {
    setInputVal(text);
    handleSendMessage(text);
  }, [handleSendMessage]);

  const { isRecording, isTranscribing, toggleVoice } = useCopilotVoice(locale, onTranscribed);

  const closeSidebarOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Responsive sidebar resize listener
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 1024) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
      }
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Global desktop keyboard shortcuts (⌘K search, Alt+N new chat)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if ((e.altKey && e.key.toLowerCase() === 'n') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        handleNewChat();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleNewChat]);

  // Adaptive scroll to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      const isStreaming = messages.some((m) => m.isStreaming);
      if (isStreaming) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      } else {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages, isProcessing]);

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    } catch {
      // noop
    }
  };

  // User display name from metadata or email (e.g. "wacim" in Image 3)
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  // Claude-style Warm Serif Greeting (Image 3)
  const greetingHeadline = displayName
    ? locale === 'ar'
      ? `شنوة تحب تقضي اليوم، ${displayName}؟`
      : locale === 'derja'
      ? `Chnowa 7achtek lyoum, ${displayName}?`
      : locale === 'fr'
      ? `Que préparons-nous aujourd'hui, ${displayName} ?`
      : `What's cooking, ${displayName}?`
    : locale === 'ar'
    ? 'كيف يمكنني مساعدتك اليوم في تونس؟'
    : locale === 'derja'
    ? 'Chnowa thabb ta3ref lyoum fi Tounes?'
    : locale === 'fr'
    ? "Comment puis-je vous aider aujourd'hui ?"
    : 'How can I help you today?';

  const activeSession = sessions.find((s) => s.id === currentSessionId);
  const activeChatTitle =
    activeSession?.title ||
    (messages[0]?.content ? messages[0].content.slice(0, 34) : 'Discussion');

  return (
    <div className="fixed inset-0 z-30 flex bg-[#1b1b1e] text-[#f4f4f5] overflow-hidden font-sans">
      {/* ─── Modular Claude-Grade Sidebar ─── */}
      <SessionSidebar
        isOpen={sidebarOpen}
        locale={locale}
        sessions={sessions}
        currentSessionId={currentSessionId}
        editingSessionId={editingSessionId}
        editingTitle={editingTitle}
        userName={displayName || (locale === 'ar' ? 'مواطن' : 'Citizen')}
        onClose={() => setSidebarOpen(false)}
        onNewChat={() => {
          handleNewChat();
          closeSidebarOnMobile();
        }}
        onSelectSession={(sess: ChatSession) => {
          loadSession(sess);
          closeSidebarOnMobile();
        }}
        onStartRenaming={startRenaming}
        onSaveRenamedTitle={saveRenamedTitle}
        onCancelRenaming={cancelRenaming}
        onEditingTitleChange={setEditingTitle}
        onPromptDeleteSession={promptDeleteSession}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* ─── Main Canvas Area (#1b1b1e) ─── */}
      <div className="flex-1 flex flex-col bg-[#1b1b1e] relative overflow-hidden w-full min-w-0">
        {/* Top Header (Matching Image 2 & 3) */}
        <header className="shrink-0 h-12 px-4 flex items-center justify-between border-b border-[#26262a] bg-[#1b1b1e]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3 min-w-0">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-[#26262a] transition-colors cursor-pointer border-0 outline-none flex items-center justify-center shrink-0"
                title={locale === 'ar' ? 'فتح القائمة' : 'Open sidebar'}
                aria-label="Open sidebar"
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            )}

            {/* Active chat title with chevron (Image 2) */}
            {messages.length > 0 && (
              <div
                onClick={() => activeSession && startRenaming({} as any, activeSession)}
                className="flex items-center gap-1.5 min-w-0 cursor-pointer group hover:bg-[#26262a]/50 px-2 py-1 rounded-lg transition-colors"
                title={locale === 'ar' ? 'إعادة تسمية' : 'Rename chat'}
              >
                <span className="font-medium text-xs sm:text-sm text-[#f4f4f5] truncate">
                  {activeChatTitle}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
              </div>
            )}
          </div>

          {/* Right Top Header Actions */}
          <div className="flex items-center gap-2">
            {messages.length === 0 ? (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 me-2">
                <span>Free plan ·</span>
                <Link
                  href="/launchpad"
                  className="text-zinc-300 hover:text-white underline transition-colors"
                >
                  Upgrade
                </Link>
              </div>
            ) : (
              <>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#242428] hover:bg-[#2c2c32] text-zinc-300 hover:text-white text-xs font-medium border border-[#36363e] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{shareCopied ? 'Copied ✓' : 'Share'}</span>
                </button>

                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#242428] hover:bg-[#2c2c32] text-zinc-300 hover:text-white text-xs font-medium border border-[#36363e] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#da7756]" />
                  <span className="hidden sm:inline">{locale === 'ar' ? 'جديد' : 'New'}</span>
                </button>
              </>
            )}

            <LanguageSwitcher />

            <button
              onClick={() => setAuthModalOpen(true)}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-[#26262a] transition-colors cursor-pointer border-0 outline-none flex items-center justify-center"
              title={user ? user.email || 'Citizen' : 'Sign in'}
              aria-label="User Account"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Empty State: Exact Claude.ai Landing Page (Image 3) */}
        {isInitialized && messages.length === 0 && !isProcessing && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-2xl sm:max-w-3xl mx-auto w-full -mt-10 animate-fade-in">
            {/* Terracotta Sunburst + Warm Serif Heading */}
            <div className="flex items-center justify-center gap-3 mb-7 select-none text-center">
              <ClaudeStarburst size={34} color="#da7756" />
              <h1 className="font-serif italic text-3xl sm:text-4xl text-[#f4f4f5] tracking-tight font-normal">
                {greetingHeadline}
              </h1>
            </div>

            {/* Floating Claude Chat Input Card */}
            <ChatInput
              locale={locale}
              inputVal={inputVal}
              isProcessing={isProcessing}
              isRecording={isRecording}
              isTranscribing={isTranscribing}
              thinkMode={thinkMode}
              showPlusMenu={showPlusMenu}
              placeholder={
                locale === 'ar'
                  ? 'كيف يمكنني مساعدتك اليوم؟'
                  : locale === 'derja'
                  ? 'Kifech n3awnek lyoum?'
                  : locale === 'fr'
                  ? "Comment puis-je vous aider aujourd'hui ?"
                  : 'How can I help you today?'
              }
              textareaRef={textareaRef}
              variant="centered"
              onInputChange={onTextareaChange}
              onKeyDown={onKeyDown}
              onSendMessage={handleSendMessage}
              onToggleVoice={toggleVoice}
              onToggleThinkMode={() => setThinkMode((p) => !p)}
              onTogglePlusMenu={() => setShowPlusMenu((p) => !p)}
            />

            {/* Clean Understated Prompt Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-zinc-400" dir={isRtl ? 'rtl' : 'ltr'}>
              {[
                {
                  label: locale === 'ar' ? 'جواز السفر (80 د.ت)' : 'Passeport (80 DT)',
                  q: 'Comment renouveler mon passeport tunisien (80 DT) ?',
                },
                {
                  label: locale === 'ar' ? 'البطاقة الرمادية (145 د.ت)' : 'Carte Grise (145 DT)',
                  q: 'Comment faire la mutation de carte grise en Tunisie (145 DT) ?',
                },
                {
                  label: locale === 'ar' ? 'المبادر الذاتي 1%' : 'Auto-Entrepreneur 1%',
                  q: 'Comment fonctionne le régime fiscal Auto-Entrepreneur 1% en Tunisie ?',
                },
                {
                  label: locale === 'ar' ? 'عقد كراء سكني (3 د.ت)' : 'Contrat de Bail (3 DT)',
                  q: 'Quelles sont les démarches pour un contrat de bail résidentiel conforme en Tunisie ?',
                },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.q)}
                  className="px-3 py-1 rounded-full bg-[#242428] hover:bg-[#2c2c32] hover:text-white border border-[#36363e] text-[11px] text-zinc-400 transition-colors cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quiet Loading Placeholder while restoring session state */}
        {!isInitialized && !isProcessing && messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 text-zinc-400 text-xs select-none animate-fade-in">
              <ClaudeStarburst size={16} spinning={true} color="#da7756" />
              <span>Idaara</span>
            </div>
          </div>
        )}

        {/* Active Chat Messages Stream (Image 2) */}
        {(messages.length > 0 || isProcessing) && (
          <>
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28 scroll-smooth"
            >
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} onSelectPrompt={(p) => handleSendMessage(p)} />
                ))}

                {/* Claude-style Rotating Starburst during thinking/generation (Image 2) */}
                {isProcessing && (
                  <div className="w-full py-2 flex items-center gap-3 animate-fade-in select-none">
                    <ClaudeStarburst size={22} spinning={true} color="#da7756" />
                    <span className="text-xs font-sans text-zinc-400 animate-pulse">
                      {thinkMode
                        ? (locale === 'ar' ? 'تفكير قانوني معمق في نصوص الرائد الرسمي...' : 'Deep statutory reasoning...')
                        : (locale === 'ar' ? 'جارٍ إعداد الإجابة...' : 'Thinking...')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Bottom Input Dock (Image 2) */}
            <footer className="p-3 sm:p-4 bg-gradient-to-t from-[#1b1b1e] via-[#1b1b1e]/95 to-transparent shrink-0 z-20 pb-safe">
              <ChatInput
                locale={locale}
                inputVal={inputVal}
                isProcessing={isProcessing}
                isRecording={isRecording}
                isTranscribing={isTranscribing}
                thinkMode={thinkMode}
                showPlusMenu={showPlusMenu}
                placeholder={
                  locale === 'ar'
                    ? 'اكتب رسالة...'
                    : locale === 'derja'
                    ? 'Ikteb msg...'
                    : locale === 'fr'
                    ? 'Écrivez un message...'
                    : 'Write a message...'
                }
                textareaRef={textareaRef}
                variant="dock"
                onInputChange={onTextareaChange}
                onKeyDown={onKeyDown}
                onSendMessage={handleSendMessage}
                onToggleVoice={toggleVoice}
                onToggleThinkMode={() => setThinkMode((p) => !p)}
                onTogglePlusMenu={() => setShowPlusMenu((p) => !p)}
              />
            </footer>
          </>
        )}
      </div>

      {/* Citizen / Account Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteSessionModal
        session={sessionToDelete}
        locale={locale}
        onClose={() => setSessionToDelete(null)}
        onConfirm={confirmDeleteSession}
      />
    </div>
  );
}
