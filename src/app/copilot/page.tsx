'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { AudioRecorder } from '../../components/copilot/AudioRecorder';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { parseAndReason } from '../../lib/ai-engine';
import { Send, Sparkles, RefreshCw, MessageSquareQuote } from 'lucide-react';

export default function CopilotPage() {
  const { t, locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content:
        locale === 'ar'
          ? "مرحباً بك في المساعد الصوتي لإدارة.تونس 🇹🇳. يمكنك التحدث أو الكتابة بالدارجة التونسية حول أي إجراء، وثيقة، أو استفسار إداري."
          : locale === 'fr'
          ? "Bienvenue sur le Voice Copilot Idaara.tn 🇹🇳. Posez toutes vos questions administratives en Derja ou Français (Passeport, Carte Grise, Contrat de bail, Patente...)."
          : "3aslema! Mar7ba bik fi Idaara.tn Voice Copilot 🇹🇳. Es'elni bel Derja 3la ay war9a, procédure, walla timbre mte3 l'Idara.",
      timestamp: 'Idaara AI',
      actions: [
        {
          label: { derja: '🪪 Passeport Renouvellement', fr: 'Renouvellement Passeport', ar: 'تجديد جواز السفر' },
          type: 'procedure_link',
          payload: '/procedures/passeport-renouvellement',
        },
        {
          label: { derja: '🚗 Carte Grise Mutation', fr: 'Mutation Carte Grise', ar: 'تحويل ملكية سيارة' },
          type: 'procedure_link',
          payload: '/procedures/mutation-carte-grise',
        },
        {
          label: { derja: '📝 Contrat Kré PDF', fr: 'Contrat de Bail PDF', ar: 'عقد كراء PDF' },
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
        content: "Bienvenue à nouveau! Posez votre question en Derja 🇹🇳.",
        timestamp: 'Idaara AI',
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Title & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎙️</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Derja-Native Voice Copilot
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Fasserli, 3abbi w a3tini l'awra9 — Assistant juridique et administratif instantané
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Nouvelle conversation</span>
        </button>
      </div>

      {/* Voice Recorder Block */}
      <div className="mb-8">
        <AudioRecorder
          onTranscript={(text) => handleSendMessage(text)}
          isProcessing={isProcessing}
        />
      </div>

      {/* Suggested Quick Questions */}
      <div className="mb-6">
        <div className="flex items-center space-x-1.5 text-xs text-zinc-400 mb-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>As2ila chaye3a (Questions fréquentes) :</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              className="text-xs px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 transition-all flex items-center space-x-1.5"
            >
              <MessageSquareQuote className="w-3 h-3 text-emerald-400" />
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="glass-panel rounded-2xl border border-zinc-800 p-4 sm:p-6 min-h-[360px] max-h-[550px] overflow-y-auto mb-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isProcessing && (
          <div className="flex items-center space-x-2 text-xs text-emerald-400 animate-pulse my-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Idaara AI en cours d'analyse juridique...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Text Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputVal);
        }}
        className="flex items-center space-x-2 relative"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={t('voiceSearchBarPlaceholder')}
          className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isProcessing}
          aria-label="Send message"
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
