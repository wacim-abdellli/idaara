'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { AudioRecorder } from '../../components/copilot/AudioRecorder';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { parseAndReason } from '../../lib/ai-engine';
import { Send, RefreshCw, Mic, Sparkles } from 'lucide-react';

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

  const subtitle =
    locale === 'ar'
      ? 'تحدث أو اكتب بالدارجة أو الفرنسية للاستفسار عن أي إجراء أو وثيقة أو مصاريف التنابر الجبائية في ثوانٍ.'
      : locale === 'en'
      ? 'Speak or write in Tunisian Derja, French, or English to get instant civic procedures, required documents, and exact stamp fees.'
      : "Posez vos questions administratives à la voix ou à l'écrit en Derja ou Français pour obtenir démarches, pièces et timbres fiscaux.";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">

      {/* ── Editorial Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-emerald-400">
            <Mic className="w-3.5 h-3.5" />
            <span>Derja-Native Voice Engine · Fast Inference</span>
          </div>

          <h1 className="leading-tight">
            <span className="display-heading block text-3xl sm:text-5xl text-[#F5F4F0]">
              {headlineMain}
            </span>
            <span
              className="display-heading block text-3xl sm:text-5xl italic"
              style={{ color: 'var(--stamp-green)' }}
            >
              {headlineAccent}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl pt-1">
            {subtitle}
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-all self-start sm:self-auto shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{locale === 'ar' ? 'محادثة جديدة' : locale === 'en' ? 'Reset Chat' : 'Réinitialiser'}</span>
        </button>
      </div>

      {/* ── Acoustic Studio Recording Station ── */}
      <div>
        <AudioRecorder
          onTranscript={(text) => handleSendMessage(text)}
          isProcessing={isProcessing}
        />
      </div>

      {/* ── Question Prompts Bar (No emoji clutter) ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            {locale === 'ar' ? 'استفسارات شائعة :' : locale === 'en' ? 'Frequent Questions:' : 'Questions fréquentes :'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              className="text-xs px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat Messages Console ── */}
      <div
        ref={chatContainerRef}
        className="glass-panel rounded-3xl border border-zinc-800/80 p-5 min-h-[380px] max-h-[520px] overflow-y-auto space-y-1"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isProcessing && (
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse text-xs text-emerald-400 my-3 px-2">
            <div className="flex space-x-1">
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

      {/* ── Text Input Bar ── */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputVal); }}
        className="flex items-center gap-2"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={t('voiceSearchBarPlaceholder')}
            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-emerald-500/60 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!inputVal.trim() || isProcessing}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 hover:scale-105 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
