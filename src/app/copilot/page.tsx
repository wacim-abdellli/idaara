'use client';

import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import Loading from '../loading';
import Link from 'next/link';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import {
  PanelLeft,
  RotateCcw,
  Share2,
  ChevronDown,
  User as UserIcon,
  SquarePen,
} from 'lucide-react';

import { useCopilotSessions, ChatSession } from '../../hooks/useCopilotSessions';
import { useCopilotVoice } from '../../hooks/useCopilotVoice';
import { SessionSidebar } from '../../components/copilot/SessionSidebar';
import { ChatInput } from '../../components/copilot/ChatInput';
import { QuickTopics } from '../../components/copilot/QuickTopics';
import { DeleteSessionModal } from '../../components/copilot/DeleteSessionModal';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';
import { AuthModal } from '../../components/auth/AuthModal';
import { IdaaraCrest, JortPulseOrb } from '../../components/copilot/IdaaraCrest';

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

    // Smoothly focus/frame user message at the top of the viewing area
    setTimeout(() => {
      const el = document.getElementById(`msg-${userMsg.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);

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

      // Silky Smooth Natural Typewriter (Cadence with natural punctuation pause)
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
            const container = messagesContainerRef.current;
            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 180;
            if (isNearBottom) {
              container.scrollTop = container.scrollHeight;
            }
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

  // Global desktop keyboard shortcuts (⌘K search, Alt+N / ⌘N new chat)
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

  // Initial session view: start from top so user sees context
  const hasScrolledInitialRef = useRef(false);
  useEffect(() => {
    if (!messagesContainerRef.current) return;
    if (!hasScrolledInitialRef.current && messages.length > 0) {
      messagesContainerRef.current.scrollTop = 0;
      hasScrolledInitialRef.current = true;
    }
  }, [messages.length]);

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

  // User display name from metadata or email
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  // Bespoke Tunisian Civic Greeting
  const greetingHeadline =
    locale === 'ar'
      ? 'شنوة الإجراء اللي تحب تقضيه اليوم؟'
      : locale === 'derja'
      ? 'Chnowa l\'procédure elli thabb ta9dhiha lyoum?'
      : locale === 'fr'
      ? 'Quelle démarche administrative réalisons-nous aujourd\'hui ?'
      : 'What civic procedure can Idaara assist you with today?';

  const greetingSubtitle =
    locale === 'ar'
      ? 'دليلك الرسمي المباشر للإجراءات الإدارية، التنابر الجبائية، ومناظرات الوظيفة العمومية.'
      : locale === 'derja'
      ? 'Mosa3dek el idari el rasmi lel awra9, el timbres wel concourat fi Tounes.'
      : locale === 'fr'
      ? 'Votre copilote officiel pour les démarches citoyennes, timbres fiscaux et textes du JORT.'
      : 'Your official statutory copilot for administrative workflows, fiscal stamps, and JORT decrees.';

  const activeSession = sessions.find((s) => s.id === currentSessionId);
  const activeChatTitle =
    activeSession?.title ||
    (messages[0]?.content ? messages[0].content.slice(0, 36) : 'Consultation');

  return (
    <div className="fixed inset-0 z-30 flex bg-[#090b0e] text-zinc-100 overflow-hidden font-sans">
      {/* ─── Bespoke Idaara Civic Sidebar ─── */}
      <SessionSidebar
        isOpen={sidebarOpen}
        locale={locale}
        sessions={sessions}
        currentSessionId={currentSessionId}
        editingSessionId={editingSessionId}
        editingTitle={editingTitle}
        userName={displayName || (locale === 'ar' ? 'مواطن' : 'Citoyen')}
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

      {/* ─── Main Canvas Area ─── */}
      <div className="flex-1 flex flex-col bg-[#090b0e] relative overflow-hidden w-full min-w-0">
        {/* Integrated Top Navigation Header */}
        <header className="shrink-0 h-14 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#090b0e]/95 backdrop-blur-xl z-20">
          <div className="flex items-center gap-3 min-w-0">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none flex items-center justify-center shrink-0 min-h-[40px] min-w-[40px]"
                title={locale === 'ar' ? 'فتح القائمة' : 'Ouvrir le menu'}
                aria-label={locale === 'ar' ? 'فتح/إغلاق الشريط الجانبي' : locale === 'derja' ? 'Ferma/7el el sidebar' : locale === 'en' ? 'Toggle sidebar' : 'Ouvrir/fermer le panneau'}
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            )}

            {/* Brand Logo or Active Session Title */}
            {messages.length === 0 ? (
              <div className="flex items-center gap-2">
                <IdaaraCrest size={22} />
                <span className="font-bold text-sm text-zinc-200 tracking-tight hidden sm:inline">
                  Idaara AI · <span className="text-emerald-400 font-mono text-xs">الذكاء الإداري</span>
                </span>
              </div>
            ) : (
              <div
                onClick={(e) => activeSession && startRenaming(e, activeSession)}
                className="flex items-center gap-2 min-w-0 cursor-pointer group hover:bg-white/[0.04] px-2.5 py-1.5 rounded-xl transition-colors"
                title={locale === 'ar' ? 'تعديل العنوان' : 'Renommer'}
              >
                <IdaaraCrest size={18} />
                <span className="font-semibold text-xs sm:text-sm text-zinc-100 truncate max-w-[200px] sm:max-w-xs">
                  {activeChatTitle}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
              </div>
            )}
          </div>

          {/* Right Top Header Actions */}
          <div className="flex items-center gap-1.5">
            {messages.length > 0 && (
              <>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none flex items-center justify-center min-h-[38px] min-w-[38px]"
                  title={shareCopied ? 'Copié ✓' : 'Partager'}
                  aria-label={locale === 'ar' ? 'مشاركة المحادثة' : locale === 'derja' ? 'Partagi el conversacion' : locale === 'en' ? 'Share conversation' : 'Partager la conversation'}
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none flex items-center justify-center min-h-[38px] min-w-[38px]"
                  title={locale === 'ar' ? 'محادثة جديدة' : 'New chat'}
                  aria-label={locale === 'ar' ? 'محادثة جديدة' : locale === 'derja' ? 'Conversacion jedida' : locale === 'en' ? 'New chat' : 'Nouvelle conversation'}
                >
                  <SquarePen className="w-4 h-4" />
                </button>
              </>
            )}

            <LanguageSwitcher />

            <button
              onClick={() => setAuthModalOpen(true)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none flex items-center justify-center min-h-[38px] min-w-[38px]"
              title={user ? user.email || 'Citizen' : 'Connexion'}
              aria-label={locale === 'ar' ? 'حساب المستخدم' : locale === 'derja' ? 'Compte mte3i' : locale === 'en' ? 'My account' : 'Mon compte'}
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ─── Main Chat Area (Suspense Wrapped) ─── */}
        <Suspense fallback={<Loading />}>
          {/* ─── Empty State: Minimalist Landing Experience ─── */}
          {messages.length === 0 && !isProcessing && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-3xl mx-auto w-full py-8 overflow-y-auto">
              {/* Minimalist Brand Header */}
              <div className="relative flex flex-col items-center text-center mb-6 select-none animate-fade-in w-full">
                <div className="mb-3">
                  <IdaaraCrest size={44} />
                </div>

                {/* Dignified Hero Title */}
                <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
                  {greetingHeadline}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  {greetingSubtitle}
                </p>
              </div>

              {/* Centered Obsidian Civic Input Card */}
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
                    ? 'اسأل عن أي إجراء، وثيقة، معلوم تمبر جبائي، أو مناظرة عمومية...'
                    : locale === 'derja'
                    ? 'Es\'el 3la ay war9a, procédure, timbre, walla concour...'
                    : locale === 'fr'
                    ? 'Posez votre question sur une démarche, un timbre ou un texte du JORT...'
                    : 'Ask about any Tunisian procedure, fiscal stamp, or public exam...'
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

              {/* 4 Bespoke Tunisian Civic Portals */}
              <QuickTopics locale={locale} isRtl={isRtl} onSelectPrompt={handleSendMessage} />
            </div>
          )}

          {/* ─── Active Chat Messages Stream ─── */}
          {(messages.length > 0 || isProcessing) && (
            <>
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-8 scroll-smooth"
              >
                <div className="max-w-3xl mx-auto space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id} id={`msg-${msg.id}`}>
                      <ChatMessage message={msg} onSelectPrompt={(p) => handleSendMessage(p)} />
                    </div>
                  ))}

                  {/* 🏛️ Bespoke JORT Verification Scanner Orb */}
                  {isProcessing && (
                    <div className="w-full py-3 flex items-center gap-3 animate-fade-in select-none" dir={isRtl ? 'rtl' : 'ltr'}>
                      <JortPulseOrb size={22} />
                      <span className="text-xs text-emerald-300/90 font-medium animate-pulse">
                        {thinkMode
                          ? (locale === 'ar'
                              ? 'جارٍ التحليل والتدقيق في الرائد الرسمي ومجلة الالتزامات والعقود...'
                              : locale === 'derja'
                              ? 'Ta7lil 9anouni mezyen fel JORT w nouthous el 9anoun...'
                              : locale === 'fr'
                              ? 'Vérification en cours dans les textes officiels du JORT et les codes de loi...'
                              : 'Deep statutory reasoning in official JORT gazettes and legal codes...')
                          : (locale === 'ar'
                              ? 'جارٍ إعداد الإجابة الإدارية الرسمية والتحقق من التنابر...'
                              : locale === 'derja'
                              ? 'N7adherlek fel ijaba el rasmiya w nthabbet fel timbre...'
                              : locale === 'fr'
                              ? 'Recherche et formulation de la réponse administrative officielle...'
                              : 'Formulating official statutory response and checking stamp fees...')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Bottom Dock Input (Active Chat Mode) */}
              <footer className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/95 to-transparent shrink-0 z-20 pb-safe">
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
                      ? 'اكتب سؤالك الإداري هنا...'
                      : locale === 'derja'
                      ? 'Ikteb el sou2al mte3ek houni...'
                      : locale === 'fr'
                      ? 'Posez une question sur votre démarche administrative...'
                      : 'Ask about any Tunisian procedure or legal step...'
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
        </Suspense>
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
