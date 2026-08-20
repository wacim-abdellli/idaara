'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { AudioRecorder } from '../../components/copilot/AudioRecorder';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { parseAndReason } from '../../lib/ai-engine';
import { Send, Sparkles, RefreshCw, MessageSquareQuote, Mic } from 'lucide-react';

export default function CopilotPage() {
  const { t, locale } = useLocale();

  const getWelcomeContent = () => {
    if (locale === 'ar') {
      return "مرحباً بك في المساعد الصوتي لإدارة.تونس 🇹🇳. يمكنك التحدث أو الكتابة بالدارجة التونسية حول أي إجراء، وثيقة، أو استفسار إداري.";
    }
    if (locale === 'en') {
      return "Welcome to Idaara.tn Voice Copilot 🇹🇳. Speak or type in Tunisian Derja, French, or English to ask about any administrative procedure, legal form, or stamp fees.";
    }
    if (locale === 'fr') {
      return "Bienvenue sur le Voice Copilot Idaara.tn 🇹🇳. Posez toutes vos questions administratives en Derja ou Français (Passeport, Carte Grise, Contrat de bail, Patente...).";
    }
    return "3aslema! Mar7ba bik fi Idaara.tn Voice Copilot 🇹🇳. Es'elni bel Derja 3la ay war9a, procédure, walla timbre mte3 l'Idara.";
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: getWelcomeContent(),
      timestamp: 'Idaara AI',
      actions: [
        {
          label: { derja: '🪪 Renouvellement Passeport', fr: 'Renouvellement Passeport', ar: 'تجديد جواز السفر', en: 'Passport Renewal' },
          type: 'procedure_link',
          payload: '/procedures/passeport-renouvellement',
        },
        {
          label: { derja: '🚗 Mutation Carte Grise', fr: 'Mutation Carte Grise', ar: 'تحويل ملكية سيارة', en: 'Car Registration Transfer' },
          type: 'procedure_link',
          payload: '/procedures/mutation-carte-grise',
        },
        {
          label: { derja: '📝 Contrat de Bail PDF', fr: 'Contrat de Bail PDF', ar: 'عقد كراء PDF', en: 'Rental Contract PDF' },
          type: 'pdf_form',
          payload: '/documents/contrat-location',
        },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    { text: "Chnouwa lezemni bech n'badal el passeport mte3i?", label: "Passeport Tounsi" },
    { text: "Chrit karhba jdid, kifech nbeddel el carte grise?", label: "Carte Grise" },
    { text: "A3melli contrat kré sakani mrigel lel baladiya", label: "Contrat de Kré" },
    { text: "Kifech n9ayed fi statut auto-entrepreneur 0.5%?", label: "Auto-Entrepreneur" },
    { text: "Awra9 el B3 bita9at sawabi9 3adliya chnowa?", label: "Bulletin N°3 (B3)" },
    { text: "Awra9 el FCR lel tounsiya fel kharej?", label: "Régime FCR" },
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-3">
            <Mic className="w-3 h-3" />
            <span>
              {locale === 'ar' ? 'المساعد الصوتي الإداري بالدارجة' : 'Voice AI · Derja-Native Administrative Copilot'}
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {locale === 'ar' ? '🎙️ المساعد الصوتي لإدارة.تونس' : '🎙️ Derja-Native Voice Copilot'}
          </h1>
          <p className="text-xs text-zinc-400 mt-1.5 max-w-xl">
            {locale === 'ar'
              ? 'فسّر، عمّر وخرّج أوراقك القانونية — مساعد إداري وقانوني فوري'
              : locale === 'en'
              ? 'Explain, fill and generate your legal papers — Instant civic & administrative AI assistant'
              : locale === 'fr'
              ? "Fasserli, 3abbi w a3tini l'awra9 — Assistant juridique et administratif instantané"
              : "Fasserli, 3abbi w a3tini l'awra9 — Assistant juridique et administratif instantané"}
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-all self-start sm:self-auto shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{locale === 'ar' ? 'محادثة جديدة' : locale === 'en' ? 'Reset Chat' : 'Réinitialiser'}</span>
        </button>
      </div>

      {/* Voice Recorder */}
      <div className="mb-6">
        <AudioRecorder
          onTranscript={(text) => handleSendMessage(text)}
          isProcessing={isProcessing}
        />
      </div>

      {/* Suggested Quick Questions */}
      <div className="mb-5">
        <div className="flex items-center space-x-1.5 text-[10px] text-zinc-500 mb-2 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{locale === 'ar' ? 'أسئلة شائعة :' : locale === 'en' ? 'Frequent questions:' : 'Questions fréquentes :'}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              className="text-[11px] px-2.5 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/30 transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <MessageSquareQuote className="w-3 h-3 text-zinc-600 shrink-0" />
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="glass-panel rounded-2xl border border-zinc-800/80 p-4 min-h-[380px] max-h-[520px] overflow-y-auto mb-4 space-y-1">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isProcessing && (
          <div className="flex items-center space-x-2.5 text-xs text-emerald-400 my-3 px-2">
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
        <div ref={chatBottomRef} />
      </div>

      {/* Text Input */}
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
            className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!inputVal.trim() || isProcessing}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
