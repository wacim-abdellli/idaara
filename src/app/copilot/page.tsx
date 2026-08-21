'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import {
  Mic,
  MicOff,
  ArrowUp,
  RotateCcw,
  Settings,
  X,
  Check,
  ChevronDown,
  SlidersHorizontal,
  FileSearch,
  Car,
  TrendingUp,
  Home,
  ShieldCheck,
  Plane,
} from 'lucide-react';

export default function CopilotPage() {
  const { locale } = useLocale();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string>('auto');
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [providerBadge, setProviderBadge] = useState<string>('Gemini 1.5 Flash');

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('idaara_custom_api_key') || '';
      const savedProvider = localStorage.getItem('idaara_ai_provider') || 'auto';
      setCustomApiKey(savedKey);
      setActiveProvider(savedProvider);
      if (savedProvider === 'gemini') setProviderBadge('Gemini 1.5 Flash');
      else if (savedProvider === 'groq') setProviderBadge('Groq Llama 3.3');
      else if (savedProvider === 'local') setProviderBadge('Civic Engine');

      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q && q.trim()) handleSendMessage(q.trim());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isProcessing]);

  const topicCards = [
    {
      icon: FileSearch,
      label: locale === 'ar' ? 'جواز السفر' : locale === 'en' ? 'Passport' : 'Passeport',
      desc: locale === 'ar' ? 'تجديد جواز السفر — وثائق ومعاليم 80 دت' : locale === 'en' ? 'Renewal — papers & 80 DT timbre' : 'Renouvellement — dossier & timbre 80 DT',
      q: locale === 'ar' ? 'شنوة يلزمني باش نجدد جواز السفر التونسي؟' : locale === 'en' ? 'What documents and fees do I need to renew my Tunisian passport?' : 'Quels sont les documents et frais pour renouveler un passeport tunisien ?',
      color: 'emerald',
    },
    {
      icon: Car,
      label: locale === 'ar' ? 'البطاقة الرمادية' : locale === 'en' ? 'Carte Grise' : 'Carte Grise',
      desc: locale === 'ar' ? 'نقل ملكية السيارة — عقد بيع + ATTT' : locale === 'en' ? 'Car transfer — bill of sale & ATTT' : 'Mutation — acte de vente & visite ATTT',
      q: locale === 'ar' ? 'شريت كرهبة مستعملة، كيفاش نبدل البطاقة الرمادية؟' : locale === 'en' ? 'How do I transfer a car registration after buying a used vehicle?' : "Comment faire la mutation de carte grise après achat d'un véhicule ?",
      color: 'blue',
    },
    {
      icon: TrendingUp,
      label: locale === 'ar' ? 'مبادر ذاتي' : locale === 'en' ? 'Auto-Entrepreneur' : 'Auto-Entrepreneur',
      desc: locale === 'ar' ? 'ضريبة 1% وفواتير بالعملة الصعبة' : locale === 'en' ? '1% flat rate & legal foreign invoicing' : 'Impôt 1% & facturation devises BCT',
      q: locale === 'ar' ? 'كيفاش نسجل في المبادر الذاتي وشنوة الامتيازات الجبائية 1%؟' : locale === 'en' ? 'How to register as an Auto-Entrepreneur with 1% tax in Tunisia?' : 'Comment fonctionne le régime auto-entrepreneur 1% pour freelances ?',
      color: 'amber',
    },
    {
      icon: Home,
      label: locale === 'ar' ? 'عقد كراء' : locale === 'en' ? 'Lease Contract' : 'Contrat de Bail',
      desc: locale === 'ar' ? 'عقد كراء سكني قانوني وفق مجلة الالتزامات' : locale === 'en' ? 'Legal lease — Baladiya & Recette' : 'Bail légal — Baladiya & Recette des finances',
      q: locale === 'ar' ? 'كيفاش نعمل عقد كراء سكني قانوني؟' : locale === 'en' ? 'How to create a legal residential lease contract in Tunisia?' : 'Comment rédiger un contrat de bail résidentiel conforme en Tunisie ?',
      color: 'violet',
    },
    {
      icon: ShieldCheck,
      label: locale === 'ar' ? 'بطاقة ب3' : locale === 'en' ? 'Bulletin B3' : 'Bulletin B3',
      desc: locale === 'ar' ? 'السوابق العدلية — عبر الإنترنت أو مركز الشرطة' : locale === 'en' ? 'Criminal record — online or police' : 'Casier judiciaire — en ligne ou commissariat',
      q: locale === 'ar' ? 'كيفاش نتحصل على بطاقة السوابق العدلية ب3؟' : locale === 'en' ? 'How to get the B3 criminal record certificate in Tunisia?' : 'Comment obtenir le bulletin N°3 (casier judiciaire) en Tunisie ?',
      color: 'rose',
    },
    {
      icon: Plane,
      label: locale === 'ar' ? 'امتياز FCR' : locale === 'en' ? 'FCR Regime' : 'Régime FCR',
      desc: locale === 'ar' ? 'توريد سيارات — للتونسيين بالخارج' : locale === 'en' ? 'Diaspora car import privilege' : 'Import véhicule — avantages diaspora',
      q: locale === 'ar' ? 'شنوة شروط امتياز FCR لتوريد سيارة للتونسيين بالخارج؟' : locale === 'en' ? 'What are the FCR customs privilege conditions for Tunisian diaspora?' : 'Quelles sont les conditions pour bénéficier du régime FCR en Tunisie ?',
      color: 'sky',
    },
  ];

  const colorMap: Record<string, { icon: string; border: string; bg: string }> = {
    emerald: { icon: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
    blue:    { icon: 'text-blue-400',    border: 'border-blue-500/30',    bg: 'bg-blue-500/10'    },
    amber:   { icon: 'text-amber-400',   border: 'border-amber-500/30',   bg: 'bg-amber-500/10'   },
    violet:  { icon: 'text-violet-400',  border: 'border-violet-500/30',  bg: 'bg-violet-500/10'  },
    rose:    { icon: 'text-rose-400',    border: 'border-rose-500/30',    bg: 'bg-rose-500/10'    },
    sky:     { icon: 'text-sky-400',     border: 'border-sky-500/30',     bg: 'bg-sky-500/10'     },
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputVal).trim();
    if (!query || isProcessing) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
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
        body: JSON.stringify({ prompt: query, locale, history, userApiKey: customApiKey, provider: activeProvider }),
      });

      const data = await res.json();
      const response = data.result || {};
      if (response.providerName) setProviderBadge(response.providerName);

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          content: response.content || '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: response.actions,
          timbreBreakdown: response.timbreBreakdown,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          content: locale === 'fr' ? 'Erreur de connexion. Réessayez.' : locale === 'ar' ? 'خطأ في الاتصال. أعد المحاولة.' : 'Connection error. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleVoice = () => {
    if (isRecording) {
      try { speechRecognitionRef.current?.stop(); } catch {}
      setIsRecording(false);
      return;
    }

    const SR = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition
            || (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SR) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec = new (SR as any)();
    speechRecognitionRef.current = rec;
    rec.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-FR' : 'en-US';
    rec.interimResults = true;
    rec.onstart = () => setIsRecording(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setInputVal(t);
      if (e.results[e.results.length - 1].isFinal && t.trim()) { setIsRecording(false); handleSendMessage(t.trim()); }
    };
    rec.onerror = () => setIsRecording(false);
    rec.onend = () => setIsRecording(false);
    rec.start();
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 130)}px`;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };

  const saveSettings = () => {
    localStorage.setItem('idaara_custom_api_key', customApiKey.trim());
    localStorage.setItem('idaara_ai_provider', activeProvider);
    const map: Record<string, string> = { auto: 'Auto-Smart', gemini: 'Gemini 1.5 Flash', groq: 'Groq Llama 3.3', local: 'Civic Engine' };
    setProviderBadge(map[activeProvider] || 'Auto-Smart');
    setShowSettingsModal(false);
  };

  const greetLine = locale === 'ar'
    ? 'فاش نجم نعاونك اليوم؟'
    : locale === 'en'
    ? 'How can I help with your paperwork today?'
    : 'Comment puis-je vous aider dans vos démarches ?';

  const subLine = locale === 'ar'
    ? 'اسأل بالدارجة أو الفرنسية أو العربية — جواز سفر، بطاقة رمادية، عقد، تنابر...'
    : locale === 'en'
    ? 'Ask in Derja, French, or English — passport, car registration, stamp fees, and more'
    : 'Posez vos questions en Derja ou Français — passeport, carte grise, timbres fiscaux...';

  const placeholder = isRecording
    ? (locale === 'ar' ? 'جار الاستماع...' : 'Listening...')
    : (locale === 'ar'
      ? 'اكتب سؤالك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)'
      : locale === 'fr'
      ? 'Tapez votre question... (Entrée pour envoyer)'
      : 'Ask anything... (Enter to send, Shift+Enter for new line)');

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col overflow-hidden bg-zinc-950">

      {/* ─── Sticky Header ─── */}
      <div className="shrink-0 border-b border-zinc-800/60 px-4 sm:px-8 py-2.5 flex items-center justify-between bg-zinc-950/90 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0c0d0f] border border-emerald-500 flex items-center justify-center shadow-md shadow-emerald-950/80">
            <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none">
              <path d="M10 8.5h10M15 8.5v15M10 23.5h10" stroke="#FFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="23" cy="22" r="2.8" fill="#10b981"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-white">Idaara Copilot</span>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-emerald-500/40 hover:text-emerald-400 transition-all cursor-pointer"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span>{providerBadge}</span>
            <ChevronDown className="w-2.5 h-2.5 opacity-50" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
              title="New chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ─── Messages Stream (own scroll zone) ─── */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {/* ─── Welcome / Empty State ─── */}
        {messages.length === 0 && !isProcessing && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-4">

            {/* Greeting */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight leading-tight">
                {greetLine}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                {subLine}
              </p>
            </div>

            {/* Topic Cards 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {topicCards.map((card, idx) => {
                const Icon = card.icon;
                const c = colorMap[card.color];
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(card.q)}
                    className="flex items-start gap-3 text-left p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all group cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${c.icon}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-zinc-100 group-hover:text-white mb-0.5">
                        {card.label}
                      </div>
                      <div className="text-xs text-zinc-500 leading-snug">
                        {card.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* ─── Active Messages ─── */}
        {messages.length > 0 && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Typing Indicator */}
            {isProcessing && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-7 h-7 rounded-lg bg-[#0c0d0f] border border-emerald-500/60 flex items-center justify-center shrink-0 shadow-md">
                  <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none">
                    <path d="M10 8.5h10M15 8.5v15M10 23.5h10" stroke="#FFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="23" cy="22" r="2.8" fill="#10b981"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-zinc-900 border border-zinc-800 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Pinned Footer / Input ─── */}
      <div className="shrink-0 border-t border-zinc-800/50 px-4 sm:px-8 py-3 bg-zinc-950">
        <div className="max-w-2xl mx-auto">

          {/* Input box */}
          <div className="flex items-end gap-2 bg-zinc-900/80 border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-emerald-500/20 rounded-2xl px-3 py-2 transition-all shadow-lg">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputVal}
              onChange={onTextareaChange}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none max-h-32 leading-relaxed"
            />
            <div className="flex items-center gap-1.5 pb-0.5 shrink-0">
              <button
                onClick={toggleVoice}
                disabled={isProcessing}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-red-500 text-white ring-2 ring-red-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isProcessing}
                className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[10px] text-zinc-600 mt-2">
            {locale === 'ar'
              ? 'إدارة.تونس AI للإرشاد فقط — تحقق دائماً من النصوص الرسمية في الرائد الرسمي.'
              : 'Idaara AI is for guidance only — always verify with official sources (JORT).'}
          </p>

        </div>
      </div>

      {/* ─── Settings Modal ─── */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">AI Engine Settings</h3>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-zinc-400 font-semibold">Choose AI Model</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'auto',   label: '⚡ Auto-Smart',        sub: 'Best available'      },
                  { id: 'gemini', label: '✨ Gemini 1.5 Flash',  sub: 'Google free tier'    },
                  { id: 'groq',   label: '🚀 Groq Llama 3.3',   sub: 'Ultra-fast 70B'      },
                  { id: 'local',  label: '🏛️ Civic Engine',     sub: 'No key needed'       },
                ].map(({ id, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => setActiveProvider(id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      activeProvider === id
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{label}</span>
                      {activeProvider === id && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-400 font-semibold">API Key (Optional)</p>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[11px] text-emerald-400 hover:underline">
                  Get free key →
                </a>
              </div>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="AIzaSy... (Gemini)  or  gsk_... (Groq)"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
              />
              <p className="text-[10px] text-zinc-600">Stored only in your browser. Never sent to our servers.</p>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => setShowSettingsModal(false)} className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white cursor-pointer">
                Cancel
              </button>
              <button onClick={saveSettings} className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs cursor-pointer shadow-md shadow-emerald-500/20">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
