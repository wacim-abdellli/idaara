'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import {
  Plus,
  Mic,
  MicOff,
  ArrowUp,
  RotateCcw,
  Settings,
  X,
  Check,
  ChevronDown,
  SlidersHorizontal,
  FileCheck2,
  Car,
  Briefcase,
  FileText,
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
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);
  const [showModelDropdown, setShowModelDropdown] = useState<boolean>(false);
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

  const quickTopics = [
    {
      label: locale === 'ar' ? 'تجديد جواز السفر 80د' : locale === 'derja' ? 'Passeport tounsi (80 DT)' : locale === 'en' ? 'Renew Passport (80 DT)' : 'Renouveler Passeport (80 DT)',
      q: locale === 'ar' ? 'شنوة يلزمني باش نجدد جواز السفر التونسي؟' : locale === 'derja' ? "Chnouwa lezemni bech n'badal el passeport mte3i?" : locale === 'en' ? 'What documents and fees do I need to renew my Tunisian passport?' : 'Quels sont les documents et timbres fiscaux pour renouveler mon passeport tunisien ?',
      icon: FileCheck2,
    },
    {
      label: locale === 'ar' ? 'البطاقة الرمادية للسيارة 145د' : locale === 'derja' ? 'Carte Grise karhba (145 DT)' : locale === 'en' ? 'Car Registration Transfer' : 'Mutation Carte Grise (145 DT)',
      q: locale === 'ar' ? 'شريت كرهبة مستعملة، كيفاش نبدل البطاقة الرمادية؟' : locale === 'derja' ? "Chrit karhba jdid, kifech nbeddel el carte grise?" : locale === 'en' ? 'How do I transfer a car registration after buying a used vehicle?' : "Comment faire la mutation de carte grise après achat d'un véhicule d'occasion en Tunisie ?",
      icon: Car,
    },
    {
      label: locale === 'ar' ? 'المبادر الذاتي 1% فريلانس' : locale === 'derja' ? 'Auto-Entrepreneur 1%' : locale === 'en' ? 'Auto-Entrepreneur 1% Tax' : 'Statut Auto-Entrepreneur 1%',
      q: locale === 'ar' ? 'كيفاش نسجل في المبادر الذاتي وشنوة الامتيازات الجبائية 1%؟' : locale === 'derja' ? "Kifech n9ayed fi statut auto-entrepreneur 1%?" : locale === 'en' ? 'How to register as an Auto-Entrepreneur with 1% tax in Tunisia?' : 'Comment fonctionne le régime Auto-Entrepreneur 1% et la facturation en devises en Tunisie ?',
      icon: Briefcase,
    },
    {
      label: locale === 'ar' ? 'عقد كراء سكني قانوني' : locale === 'derja' ? 'Contrat de bail Baladiya' : locale === 'en' ? 'Legal Lease Contract (COC)' : 'Contrat de Bail Conforme',
      q: locale === 'ar' ? 'كيفاش نعمل عقد كراء سكني قانوني؟' : locale === 'derja' ? "A3melli contrat kré sakani mrigel lel baladiya" : locale === 'en' ? 'How to create a legal residential lease contract in Tunisia?' : 'Quelles sont les démarches pour un contrat de bail résidentiel légalisé en Tunisie ?',
      icon: FileText,
    },
    {
      label: locale === 'ar' ? 'بطاقة السوابق ب3 عبر الإنترنت' : locale === 'derja' ? 'Bita9at B3 (7.5 DT)' : locale === 'en' ? 'Criminal Record (B3) 7.5 DT' : 'Bulletin N°3 (B3) en ligne',
      q: locale === 'ar' ? 'كيفاش نتحصل على بطاقة السوابق العدلية ب3؟' : locale === 'derja' ? "Awra9 el B3 bita9at sawabi9 3adliya chnowa?" : locale === 'en' ? 'How to get the B3 criminal record certificate in Tunisia?' : 'Comment obtenir le bulletin N°3 (casier judiciaire) en ligne en Tunisie ?',
      icon: ShieldCheck,
    },
    {
      label: locale === 'ar' ? 'امتياز التوريد ن.ت.د (FCR)' : locale === 'derja' ? 'Avantage FCR tounsi' : locale === 'en' ? 'FCR Customs Privilege' : 'Régime Douanier FCR',
      q: locale === 'ar' ? 'شنوة شروط امتياز FCR لتوريد سيارة للتونسيين بالخارج؟' : locale === 'derja' ? "Awra9 el FCR lel tounsiya fel kharej chnowa?" : locale === 'en' ? 'What are the FCR customs privilege conditions for Tunisian diaspora?' : 'Quelles sont les conditions pour bénéficier du régime FCR pour les Tunisiens à l’étranger ?',
      icon: Plane,
    },
  ];

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
          content: locale === 'fr' ? 'Erreur de connexion. Réessayez.' : locale === 'ar' ? 'خطأ في الاتصال. أعد المحاولة.' : locale === 'derja' ? 'Kayen mochkel fel connexion. 3awed jarreb.' : 'Connection error. Please try again.',
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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveSettings = () => {
    localStorage.setItem('idaara_custom_api_key', customApiKey.trim());
    localStorage.setItem('idaara_ai_provider', activeProvider);
    const map: Record<string, string> = { auto: 'Auto-Smart', gemini: 'Gemini 1.5 Flash', groq: 'Groq Llama 3.3', local: 'Civic Engine' };
    setProviderBadge(map[activeProvider] || 'Auto-Smart');
    setShowSettingsModal(false);
    setShowModelDropdown(false);
  };

  const centerHeadline =
    locale === 'ar'
      ? "فاش نجم نعاونك اليوم؟"
      : locale === 'derja'
      ? "Chnowa thabb ta3ref lyoum?"
      : locale === 'en'
      ? "What's on the agenda today?"
      : "Comment puis-je vous aider aujourd'hui ?";

  const placeholder = isRecording
    ? (locale === 'ar' ? 'جار الاستماع...' : locale === 'derja' ? '9a3ed nesma3 fik...' : 'Listening...')
    : (locale === 'ar'
      ? 'اسأل عن أي إجراء أو وثيقة...'
      : locale === 'derja'
      ? 'Es\'el 3la ay war9a, procédure, walla timbre...'
      : locale === 'fr'
      ? 'Posez votre question...'
      : 'Ask anything');

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-30 flex flex-col bg-[#09090b] text-white overflow-hidden">

      {/* ─── Top Bar (Exact ChatGPT style) ─── */}
      <header className="shrink-0 h-13 px-4 sm:px-6 flex items-center justify-between border-b border-white/5 bg-[#09090b]/90 backdrop-blur-xl z-20">
        
        {/* Model Selector Dropdown on Left */}
        <div className="relative">
          <button
            onClick={() => setShowModelDropdown((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/10 text-zinc-200 font-semibold text-sm transition-colors cursor-pointer border-0 outline-none"
          >
            <span>Idaara Copilot</span>
            <span className="text-[11px] font-mono text-zinc-400 font-normal">({providerBadge})</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Model Dropdown Menu */}
          {showModelDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-64 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
              {[
                { id: 'auto', name: 'Auto-Smart', desc: 'Best available model' },
                { id: 'gemini', name: 'Gemini 1.5 Flash', desc: 'Google Free Tier' },
                { id: 'groq', name: 'Groq Llama 3.3', desc: 'Ultra-fast 70B' },
                { id: 'local', name: 'Civic Engine', desc: 'Built-in JORT data' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveProvider(m.id);
                    localStorage.setItem('idaara_ai_provider', m.id);
                    setProviderBadge(m.name);
                    setShowModelDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer border-0 outline-none ${
                    activeProvider === m.id ? 'bg-white/10 text-white font-semibold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div>
                    <div className="text-sm">{m.name}</div>
                    <div className="text-[10px] text-zinc-400">{m.desc}</div>
                  </div>
                  {activeProvider === m.id && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}

              <div className="pt-1.5 mt-1 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowModelDropdown(false);
                    setShowSettingsModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-0 outline-none"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configure API Key...</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer border-0 outline-none"
              title="New Chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}

          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ─── Empty State (Exact ChatGPT style centered headline & bar) ─── */}
      {messages.length === 0 && !isProcessing && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-2xl mx-auto w-full -mt-8">
          
          {/* Centered Headline */}
          <h1 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-8 text-center">
            {centerHeadline}
          </h1>

          {/* Centered Floating Prompt Input Bar (NO green border, clean ChatGPT style) */}
          <div className="w-full relative">
            <div className="flex items-center gap-2 bg-[#212121] hover:bg-[#262626] border border-white/10 rounded-full px-4 py-2.5 shadow-2xl transition-all">
              
              {/* Plus Button with Quick Topics Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPlusMenu((p) => !p)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                  title="Quick Topics"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {showPlusMenu && (
                  <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      {locale === 'ar' ? 'أسئلة شائعة' : locale === 'derja' ? 'As2ela ma3roufa' : 'Popular Inquiries'}
                    </div>
                    {quickTopics.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(item.q)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-white/10 text-xs text-zinc-200 transition-colors cursor-pointer border-0 outline-none"
                        >
                          <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Text Input (Zero green outline or border) */}
              <input
                autoFocus
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={placeholder}
                className="flex-1 bg-transparent py-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 shadow-none"
              />

              {/* Right Action Icons (Mic + Send) */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={`p-2 rounded-full transition-colors cursor-pointer border-0 outline-none ${
                    isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="Dictate"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputVal.trim()}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer shadow-md border-0 outline-none"
                  title="Send"
                >
                  <ArrowUp className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>

            {/* Micro disclaimer */}
            <p className="text-center text-[11px] text-zinc-600 mt-3 font-normal">
              {locale === 'ar'
                ? 'إدارة.تونس AI يقدم معلومات إرشادية. يرجى التثبت من النصوص بالرائد الرسمي.'
                : 'Idaara AI is AI and can make mistakes. Verify official texts with JORT.'}
            </p>
          </div>

        </div>
      )}

      {/* ─── Active Chat Messages Stream ─── */}
      {(messages.length > 0 || isProcessing) && (
        <>
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} onSelectPrompt={(p) => handleSendMessage(p)} />
              ))}

              {/* Typing / Thinking Animation */}
              {isProcessing && (
                <div className="w-full py-2 animate-fade-in flex items-center gap-2 text-zinc-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>

          {/* ─── Pinned Bottom Prompt Bar (Active Chat) ─── */}
          <footer className="shrink-0 pb-4 pt-2 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent z-20 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-2">
              
              {/* Bottom Pill Input (NO green border) */}
              <div className="flex items-end gap-2 bg-[#212121] border border-white/10 rounded-3xl px-3 py-2 transition-all shadow-2xl">
                
                {/* Plus Topic Button */}
                <div className="relative pb-1">
                  <button
                    type="button"
                    onClick={() => setShowPlusMenu((p) => !p)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                    title="Quick Topics"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {showPlusMenu && (
                    <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                        {locale === 'ar' ? 'أسئلة شائعة' : locale === 'derja' ? 'As2ela ma3roufa' : 'Popular Inquiries'}
                      </div>
                      {quickTopics.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(item.q)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-white/10 text-xs text-zinc-200 transition-colors cursor-pointer border-0 outline-none"
                          >
                            <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Auto-growing Textarea (Zero green border) */}
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputVal}
                  onChange={onTextareaChange}
                  onKeyDown={onKeyDown}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent py-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none max-h-36 leading-relaxed"
                />

                {/* Mic & Send Buttons */}
                <div className="flex items-center gap-1 pb-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`p-2 rounded-full transition-colors cursor-pointer border-0 outline-none ${
                      isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Dictate"
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputVal.trim() || isProcessing}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer shadow-md border-0 outline-none"
                    title="Send"
                  >
                    <ArrowUp className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

              </div>

              {/* Disclaimer */}
              <p className="text-center text-[11px] text-zinc-600">
                {locale === 'ar'
                  ? 'إدارة.تونس AI يقدم معلومات إرشادية. يرجى التثبت من النصوص بالرائد الرسمي.'
                  : 'Idaara AI is AI and can make mistakes. Verify official texts with JORT.'}
              </p>

            </div>
          </footer>
        </>
      )}

      {/* ─── Model & API Key Settings Modal ─── */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold">AI Engine Settings</h3>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer border-0 outline-none">
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
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer border-0 outline-none ${
                      activeProvider === id
                        ? 'bg-white/10 border-white/30 text-white font-semibold'
                        : 'bg-black/20 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{label}</span>
                      {activeProvider === id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{sub}</div>
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
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white placeholder-zinc-600 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
              />
              <p className="text-[10px] text-zinc-400">Stored locally in your browser storage.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowSettingsModal(false)} className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white cursor-pointer border-0 outline-none">
                Cancel
              </button>
              <button onClick={saveSettings} className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs cursor-pointer shadow-md border-0 outline-none">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
