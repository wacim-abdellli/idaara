'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { AudioRecorder } from '../../components/copilot/AudioRecorder';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { parseAndReason } from '../../lib/ai-engine';
import { Send, RefreshCw, Mic, Sparkles, MessageSquare } from 'lucide-react';

export default function CopilotPage() {
  const { t, locale } = useLocale();

  const getWelcomeContent = () => {
    if (locale === 'ar') {
      return "مرحباً بك في المساعد الصوتي لإدارة.تونس 🇹🇳. يمكنك التحدث أو الكتابة بالدارجة التونسية حول أي إجراء، وثيقة، أو استفسار إداري.";
    }
    if (locale === 'en') {
      return "Welcome to Idaara.tn Voice Copilot. Speak or type in Tunisian Derja, French, or English to ask about any administrative procedure, legal form, or stamp fees.";
    }
    if (locale === 'fr') {
      return "Bienvenue sur le Voice Copilot Idaara.tn. Posez toutes vos questions administratives en Derja ou Français (Passeport, Carte Grise, Contrat de bail, Patente...).";
    }
    return "3aslema! Mar7ba bik fi Idaara.tn Voice Copilot. Es'elni bel Derja 3la ay war9a, procédure, walla timbre mte3 l'Idara.";
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: getWelcomeContent(),
      timestamp: 'Idaara AI',
      actions: [
        {
          label: { derja: 'Renouvellement Passeport', fr: 'Renouvellement Passeport', ar: 'تجديد جواز السفر', en: 'Passport Renewal' },
          type: 'procedure_link',
          payload: '/procedures/passeport-renouvellement',
        },
        {
          label: { derja: 'Mutation Carte Grise', fr: 'Mutation Carte Grise', ar: 'تحويل ملكية سيارة', en: 'Car Registration Transfer' },
          type: 'procedure_link',
          payload: '/procedures/mutation-carte-grise',
        },
        {
          label: { derja: 'Contrat de Bail PDF', fr: 'Contrat de Bail PDF', ar: 'عقد كراء PDF', en: 'Rental Contract PDF' },
          type: 'pdf_form',
          payload: '/documents/contrat-location',
        },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const suggestedQuestions = [
    { text: "Chnouwa lezemni bech n'badal el passeport mte3i?", label: locale === 'ar' ? 'جواز السفر' : locale === 'en' ? 'Passport Renewal' : 'Passeport Tunisien' },
    { text: "Chrit karhba jdid, kifech nbeddel el carte grise?", label: locale === 'ar' ? 'البطاقة الرمادية' : locale === 'en' ? 'Carte Grise' : 'Carte Grise' },
    { text: "A3melli contrat kré sakani mrigel lel baladiya", label: locale === 'ar' ? 'عقد كراء' : locale === 'en' ? 'Rental Contract' : 'Contrat de Location' },
    { text: "Kifech n9ayed fi statut auto-entrepreneur 0.5%?", label: locale === 'ar' ? 'المبادر الذاتي' : locale === 'en' ? 'Auto-Entrepreneur' : 'Auto-Entrepreneur' },
    { text: "Awra9 el B3 bita9at sawabi9 3adliya chnowa?", label: locale === 'ar' ? 'بطاقة السوابق (B3)' : locale === 'en' ? 'Criminal Record (B3)' : 'Bulletin N°3 (B3)' },
    { text: "Awra9 el FCR lel tounsiya fel kharej?", label: locale === 'ar' ? 'امتياز FCR' : locale === 'en' ? 'FCR Regime' : 'Régime FCR' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isProcessing]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsProcessing(true);

    setTimeout(() => {
      const response = parseAndReason(text, locale);
      const aiMsg: ChatMessageType = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
        timbreBreakdown: response.timbreBreakdown,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        content: getWelcomeContent(),
        timestamp: 'Idaara AI',
      },
    ]);
  };

  const headlineMain =
    locale === 'ar'
      ? 'المساعد الصوتي الإداري'
      : locale === 'en'
      ? 'Derja Voice AI'
      : 'Assistant Vocal Administratif';

  const headlineAccent =
    locale === 'ar'
      ? 'بالدارجة التونسية.'
      : locale === 'en'
      ? 'Civic Copilot.'
      : 'en Derja Tunisienne.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* ── Compact Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 shadow-md shadow-emerald-950">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>{headlineMain}</span>
              <span className="text-emerald-400 italic font-serif">{headlineAccent}</span>
            </h1>
            <p className="text-xs text-zinc-400">
              {locale === 'en'
                ? 'Tunisian civic AI · Ask anything about paperwork, stamps, or procedures'
                : locale === 'ar'
                ? 'مساعد إداري بالذكاء الاصطناعي · اسأل عن أي وثيقة أو معلوم جبائي'
                : "Assistant civique IA · Posez vos questions en Derja ou Français"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">Inference Active</span>
          </div>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'محادثة جديدة' : locale === 'en' ? 'Reset' : 'Réinitialiser'}</span>
          </button>
        </div>
      </div>

      {/* ── 2-Column Split Workspace (Desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column (5 Cols): Voice Station & Quick Questions */}
        <div className="lg:col-span-5 space-y-4">
          <AudioRecorder
            onTranscript={(text) => handleSendMessage(text)}
            isProcessing={isProcessing}
          />

          {/* Quick Prompts Panel */}
          <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{locale === 'ar' ? 'أسئلة شائعة' : locale === 'en' ? 'Quick Topics' : 'Questions Fréquentes'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.text)}
                  className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 text-left rtl:text-right border border-zinc-800 hover:border-emerald-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {q.label}
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate mt-1">
                    {q.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Active Conversation & Input Bar */}
        <div className="lg:col-span-7 flex flex-col h-full space-y-3">

          {/* Chat Stream Box */}
          <div
            ref={chatContainerRef}
            className="glass-panel rounded-3xl border border-zinc-800/80 p-4 sm:p-5 h-[480px] sm:h-[520px] overflow-y-auto space-y-1 shadow-inner"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 my-3 px-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-zinc-500 text-[11px]">
                  {locale === 'ar' ? 'إدارة.تونس AI يحلل طلبك...' : locale === 'en' ? 'Idaara AI analyzing your request...' : "Idaara AI en cours d'analyse..."}
                </span>
              </div>
            )}
          </div>

          {/* Sticky Bottom Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputVal); }}
            className="flex items-center gap-2 glass-panel p-2 rounded-2xl border border-zinc-800"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('voiceSearchBarPlaceholder')}
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!inputVal.trim() || isProcessing}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 hover:scale-105 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
