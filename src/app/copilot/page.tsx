'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { PanelLeft, RotateCcw, Sparkles } from 'lucide-react';

import { useCopilotSessions, ChatSession } from '../../hooks/useCopilotSessions';
import { useCopilotVoice } from '../../hooks/useCopilotVoice';
import { SessionSidebar } from '../../components/copilot/SessionSidebar';
import { QuickTopics } from '../../components/copilot/QuickTopics';
import { ChatInput } from '../../components/copilot/ChatInput';
import { DeleteSessionModal } from '../../components/copilot/DeleteSessionModal';

export default function CopilotPage() {
  const { locale, isRtl } = useLocale();

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [thinkMode, setThinkMode] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

      // Rapid progressive streaming (ChatGPT-like pacing)
      const lines = fullText.split('\n');
      let currentText = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (i > 0) currentText += '\n';

        if (!line.trim()) {
          const snapshot = currentText;
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsgId ? { ...m, content: snapshot, isStreaming: true } : m))
          );
          await new Promise((r) => setTimeout(r, 6));
          continue;
        }

        const words = line.split(' ');
        for (let j = 0; j < words.length; j += 2) {
          const chunk = words.slice(j, j + 2).join(' ');
          currentText += (j === 0 ? '' : ' ') + chunk;
          const snapshot = currentText;
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsgId ? { ...m, content: snapshot, isStreaming: true } : m))
          );
          await new Promise((r) => setTimeout(r, 6));
        }

        await new Promise((r) => setTimeout(r, 10));
      }

      // Complete streaming
      setMessages((prev) =>
        prev.map((m) => (m.id === aiMsgId ? { ...m, isStreaming: false } : m))
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
  }, [inputVal, isProcessing, locale, thinkMode]);

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
  } = useCopilotSessions(handleSendMessage);

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

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
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

  const centerHeadline =
    locale === 'ar'
      ? 'شنوة تحب تقضي ولا تستفسر اليوم في تونس؟'
      : locale === 'derja'
      ? 'Chnowa thabb ta3ref lyoum fi Tounes?'
      : locale === 'fr'
      ? 'Comment puis-je vous aider dans vos démarches ?'
      : 'What Tunisian procedure do you need help with?';

  const centerSubtitle =
    locale === 'ar'
      ? 'دليلك الرسمي للإجراءات، التنابر والمناظرات الوطنية في تونس.'
      : locale === 'derja'
      ? 'Dalilek el rasmi lel awra9, el timbres wel concourat fi Tounes.'
      : locale === 'fr'
      ? 'Votre guide officiel pour les démarches, timbres et concours en Tunisie.'
      : 'Your official guide for procedures, fiscal stamps, and public exams in Tunisia.';

  const placeholder = isRecording
    ? locale === 'ar'
      ? 'جارٍ الاستماع... تفضل بالتحدث'
      : locale === 'derja'
      ? '9a3ed nesma3 fik... Tkellem tawa'
      : 'Listening... Speak now'
    : isTranscribing
    ? locale === 'ar'
      ? 'جارٍ معالجة الصوت...'
      : locale === 'derja'
      ? '9a3ed ntarjem...'
      : 'Transcribing voice...'
    : locale === 'ar'
    ? 'اسأل عن أي إجراء، وثيقة، أو معلوم جبائي...'
    : locale === 'derja'
    ? 'Es\'el 3la ay war9a, procédure, walla timbre...'
    : locale === 'fr'
    ? 'Posez votre question sur une démarche, un timbre...'
    : 'Ask about any Tunisian procedure, document, or stamp fee...';

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-30 flex bg-[#09090b] text-white overflow-hidden font-sans">
      {/* ─── Modular Session Sidebar ─── */}
      <SessionSidebar
        isOpen={sidebarOpen}
        locale={locale}
        sessions={sessions}
        currentSessionId={currentSessionId}
        editingSessionId={editingSessionId}
        editingTitle={editingTitle}
        onClose={closeSidebarOnMobile}
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
      />

      {/* ─── Main Canvas Area ─── */}
      <div className="flex-1 flex flex-col bg-[#090a0d] relative overflow-hidden w-full min-w-0">
        {/* Minimalist Top Header */}
        <header className="shrink-0 h-13 px-3 sm:px-6 flex items-center justify-between border-b border-white/[0.06] bg-[#090a0d]/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none flex items-center justify-center"
              title={locale === 'ar' ? 'القائمة' : locale === 'derja' ? 'El Menu' : locale === 'en' ? 'Menu' : 'Menu'}
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              <span>Idaara AI</span>
              <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                · JORT {new Date().getFullYear()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-colors cursor-pointer border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar' ? 'جديد' : locale === 'en' ? 'New' : locale === 'derja' ? 'Jdid' : 'Nouveau'}
                </span>
              </button>
            )}
          </div>
        </header>

        {/* Empty State: Pure Minimalist Canvas */}
        {messages.length === 0 && !isProcessing && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-2xl mx-auto w-full -mt-6">
            <div className="text-center space-y-2 mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar'
                    ? 'المساعد الإداري الذكي'
                    : locale === 'derja'
                    ? 'El Mosa3ed El Idari Edhki'
                    : locale === 'en'
                    ? 'Civic AI Copilot'
                    : 'Assistant Administratif IA'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {centerHeadline}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                {centerSubtitle}
              </p>
            </div>

            {/* Centered Chat Input Box */}
            <ChatInput
              locale={locale}
              inputVal={inputVal}
              isProcessing={isProcessing}
              isRecording={isRecording}
              isTranscribing={isTranscribing}
              thinkMode={thinkMode}
              showPlusMenu={showPlusMenu}
              placeholder={placeholder}
              textareaRef={textareaRef}
              variant="centered"
              onInputChange={onTextareaChange}
              onKeyDown={onKeyDown}
              onSendMessage={handleSendMessage}
              onToggleVoice={toggleVoice}
              onToggleThinkMode={() => setThinkMode((p) => !p)}
              onTogglePlusMenu={() => setShowPlusMenu((p) => !p)}
            />

            {/* Quick Topic Suggestion Pills */}
            <QuickTopics locale={locale} isRtl={isRtl} onSelectPrompt={handleSendMessage} />
          </div>
        )}

        {/* Active Chat Messages Stream */}
        {(messages.length > 0 || isProcessing) && (
          <>
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 pb-28 sm:pb-8 scroll-smooth"
            >
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} onSelectPrompt={(p) => handleSendMessage(p)} />
                ))}

                {/* Modern Ultra-Sleek AI Processing Indicator */}
                {isProcessing && (
                  <div className="w-full py-3 space-y-2.5 animate-fade-in">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                      </div>

                      <span className="text-xs text-zinc-400 font-medium tracking-wide">
                        {thinkMode
                          ? locale === 'ar'
                            ? 'جارِ التفكير والتحليل القانوني المعمق...'
                            : locale === 'derja'
                            ? 'N5ammem w n7allel fel 9anoun...'
                            : locale === 'en'
                            ? 'Deep legal analysis...'
                            : 'Analyse juridique approfondie...'
                          : locale === 'ar'
                          ? 'جارِ البحث والتحضير من المصادر الرسمية...'
                          : locale === 'derja'
                          ? 'Nlawwej w n7adher fel ijaba...'
                          : locale === 'en'
                          ? 'Official search & processing...'
                          : 'Recherche et traitement officiel...'}
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" style={{ animationDelay: '200ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" style={{ animationDelay: '400ms' }} />
                      </div>
                    </div>

                    <div className="space-y-1.5 pl-6 rtl:pl-0 rtl:pr-6 opacity-60">
                      <div className="h-2 rounded-full bg-gradient-to-r from-white/[0.08] via-emerald-500/20 to-white/[0.04] w-3/5 animate-pulse" />
                      <div className="h-2 rounded-full bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent w-2/5 animate-pulse" style={{ animationDelay: '150ms' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Bottom Dock Input (When chatting) */}
            <ChatInput
              locale={locale}
              inputVal={inputVal}
              isProcessing={isProcessing}
              isRecording={isRecording}
              isTranscribing={isTranscribing}
              thinkMode={thinkMode}
              showPlusMenu={showPlusMenu}
              placeholder={placeholder}
              textareaRef={textareaRef}
              variant="dock"
              onInputChange={onTextareaChange}
              onKeyDown={onKeyDown}
              onSendMessage={handleSendMessage}
              onToggleVoice={toggleVoice}
              onToggleThinkMode={() => setThinkMode((p) => !p)}
              onTogglePlusMenu={() => setShowPlusMenu((p) => !p)}
            />
          </>
        )}
      </div>

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
