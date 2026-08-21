'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { ChatMessage } from '../../components/copilot/ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { BrandIcon } from '../../components/layout/BrandLogo';
import {
  Send,
  RefreshCw,
  Mic,
  MicOff,
  Sparkles,
  Key,
  Settings,
  X,
  FileCheck2,
  Car,
  FileText,
  Briefcase,
  ShieldCheck,
  Plane,
  ArrowUp,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';

export default function CopilotPage() {
  const { locale } = useLocale();

  const getInitialGreeting = () => {
    if (locale === 'ar') {
      return "مرحباً بك في المساعد الذكي لإدارة.تونس 🇹🇳. يمكنك سؤالي بالدارجة التونسية، العربية، الفرنسية أو الإنجليزية عن أي إجراء إداري، وثيقة، أو معلوم جبائي.";
    }
    if (locale === 'en') {
      return "Welcome to Idaara.tn Copilot 🇹🇳. Ask me in English, French, or Tunisian Derja about any administrative procedure, required paperwork, or statutory fiscal stamp fees.";
    }
    if (locale === 'fr') {
      return "Bienvenue sur le Copilot Idaara.tn 🇹🇳. Posez toutes vos questions en Français ou en Derja concernant vos démarches administratives, dossiers et timbres fiscaux.";
    }
    return "3aslema! Mar7ba bik fi Idaara Copilot 🇹🇳. Es'elni bel Derja 3la ay war9a, procédure, walla timbre mte3 l'Idara — n9ollek chnowa lezmek bedhabbt.";
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string>('auto');
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [providerBadge, setProviderBadge] = useState<string>('Gemini 1.5 Flash · Free');

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  // Load custom key and provider preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('idaara_custom_api_key') || '';
      const savedProvider = localStorage.getItem('idaara_ai_provider') || 'auto';
      setCustomApiKey(savedKey);
      setActiveProvider(savedProvider);

      // Check URL query parameters (e.g. /copilot?q=...)
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q && q.trim()) {
        handleSendMessage(q.trim());
      }
    }
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Suggested topic cards for empty state
  const topicCards = [
    {
      title: locale === 'ar' ? 'تجديد جواز السفر' : locale === 'en' ? 'Passport Renewal' : 'Renouvellement Passeport',
      desc: locale === 'ar' ? 'الأوراق، تنبر 80د، ومركز الشرطة' : locale === 'en' ? 'Papers, 80 DT timbre, Police station' : 'Dossier, timbre 80 DT, poste de police',
      query: locale === 'ar' ? 'شنوة يلزمني باش نجدد جواز السفر التونسي؟' : locale === 'en' ? 'What documents and fees are needed to renew a Tunisian passport?' : 'Quels sont les documents et frais pour renouveler un passeport tunisien ?',
      icon: FileCheck2,
      accent: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    },
    {
      title: locale === 'ar' ? 'البطاقة الرمادية للسيارة' : locale === 'en' ? 'Car Registration Transfer' : 'Mutation Carte Grise',
      desc: locale === 'ar' ? 'عقد بيع، فحص فني ATTT، والمعاليم' : locale === 'en' ? 'Bill of sale, ATTT inspection, taxes' : 'Acte de vente, visite ATTT, quittances',
      query: locale === 'ar' ? 'شريت كرهبة مستعملة، كيفاش نبدل البطاقة الرمادية؟' : locale === 'en' ? 'How to transfer car registration (carte grise) after buying a used vehicle?' : 'Comment faire la mutation de carte grise après achat d’un véhicule ?',
      icon: Car,
      accent: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    },
    {
      title: locale === 'ar' ? 'المبادر الذاتي 1% و الفريلانس' : locale === 'en' ? 'Auto-Entrepreneur 1% Tax' : 'Statut Auto-Entrepreneur',
      desc: locale === 'ar' ? 'ضريبة 1%، فواتير بالعملة الصعبة BCT' : locale === 'en' ? '1% flat tax rate, legal USD/EUR export' : 'Impôt 1%, facturation devises et BCT',
      query: locale === 'ar' ? 'كيفاش نسجل في المبادر الذاتي وشنوة الامتيازات الجبائية 1%؟' : locale === 'en' ? 'How to register for the 1% Auto-Entrepreneur regime in Tunisia?' : 'Comment fonctionne le régime Auto-Entrepreneur 1% pour les freelances ?',
      icon: Briefcase,
      accent: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    },
    {
      title: locale === 'ar' ? 'عقد الكراء السكني (COC)' : locale === 'en' ? 'Residential Lease Contract' : 'Contrat de Bail Résidentiel',
      desc: locale === 'ar' ? 'تعريف بالإمضاء بالبلدية وتسجيل بالقباضة' : locale === 'en' ? 'Baladiya legalization & Recette registration' : 'Légalisation Baladiya et Recette des finances',
      query: locale === 'ar' ? 'كيفاش نعمل عقد كراء سكني قانوني مطابق لمجلة الالتزامات والعقود؟' : locale === 'en' ? 'How to create a legal residential lease contract in Tunisia?' : 'Quelles sont les démarches pour un contrat de bail conforme en Tunisie ?',
      icon: FileText,
      accent: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
    },
    {
      title: locale === 'ar' ? 'بطاقة السوابق العدلية (B3)' : locale === 'en' ? 'Criminal Record (B3)' : 'Bulletin N°3 (B3)',
      desc: locale === 'ar' ? 'تنبر 7.500د والتسجيل عبر الإنترنت' : locale === 'en' ? '7.5 DT stamp, online or in-person' : 'Timbre 7.500 DT, demande en ligne',
      query: locale === 'ar' ? 'كيفاش نتحصل على بطاقة السوابق العدلية ب3 عبر الإنترنت؟' : locale === 'en' ? 'How to get the Criminal Record B3 certificate online in Tunisia?' : 'Comment obtenir le Bulletin N°3 (casier judiciaire) en ligne ?',
      icon: ShieldCheck,
      accent: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
    },
    {
      title: locale === 'ar' ? 'امتياز التوريد ن.ت.د (FCR)' : locale === 'en' ? 'FCR Customs Privilege' : 'Régime Douanier FCR',
      desc: locale === 'ar' ? 'للتونسيين بالخارج وتوريد السيارات' : locale === 'en' ? 'Diaspora duty-free car import' : 'Avantages retour définitif et véhicules',
      query: locale === 'ar' ? 'شنوة شروط امتياز FCR لتوريد سيارة للتونسيين المقيمين بالخارج؟' : locale === 'en' ? 'What are the criteria and steps for the FCR customs privilege in Tunisia?' : 'Quelles sont les conditions pour bénéficier du régime FCR en Tunisie ?',
      icon: Plane,
      accent: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
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

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.content,
      }));

      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          locale,
          history,
          userApiKey: customApiKey,
          provider: activeProvider,
        }),
      });

      const data = await res.json();
      const response = data.result || {};

      if (response.providerName) {
        setProviderBadge(response.providerName);
      }

      const aiMsg: ChatMessageType = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: response.content || getInitialGreeting(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
        timbreBreakdown: response.timbreBreakdown,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const aiMsg: ChatMessageType = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content:
          locale === 'ar'
            ? 'حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى أو التأكد من إعدادات الاتصال.'
            : locale === 'fr'
            ? 'Une erreur est survenue. Veuillez réessayer votre requête.'
            : 'An error occurred while processing your request. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setInputVal('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(locale === 'ar' ? 'المتصفح لا يدعم التعرف الصوتي.' : 'Voice recognition is not supported in this browser.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      speechRecognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-FR' : 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputVal(transcript);
        if (event.results[event.results.length - 1].isFinal && transcript.trim()) {
          setIsRecording(false);
          handleSendMessage(transcript.trim());
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const saveSettings = () => {
    localStorage.setItem('idaara_custom_api_key', customApiKey.trim());
    localStorage.setItem('idaara_ai_provider', activeProvider);
    setShowSettingsModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto px-3 sm:px-6 relative">
      
      {/* ── Top Floating Header Bar (Claude / ChatGPT style) ── */}
      <header className="flex items-center justify-between py-3 border-b border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <BrandIcon size={32} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Idaara Copilot
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{providerBadge}</span>
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 hidden sm:block">
              {locale === 'ar'
                ? 'مساعد إداري بالذكاء الاصطناعي · عربي، دارجة، فرنسية، إنجليزية'
                : 'Tunisian Civic AI · Derja, Arabic, French & English'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
            title="AI Model & Key Settings"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{locale === 'ar' ? 'الإعدادات' : 'Model'}</span>
          </button>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
            title="New Conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{locale === 'ar' ? 'محادثة جديدة' : 'New Chat'}</span>
          </button>
        </div>
      </header>

      {/* ── Main Chat Stream Container ── */}
      <main className="flex-1 overflow-y-auto py-6 space-y-4">
        
        {/* Empty / Welcome State (Inspiring Claude/ChatGPT style) */}
        {messages.length === 0 && (
          <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8 text-center animate-fade-in-up">
            
            {/* Monumental Greeting */}
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-950 border border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/10">
                <Sparkles className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {locale === 'ar'
                  ? 'فاش نجم نعاونك اليوم في أوراقك وإجراءاتك؟'
                  : locale === 'en'
                  ? 'What administrative paperwork can I help you with?'
                  : 'Comment puis-je vous aider dans vos démarches administratives ?'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
                {locale === 'ar'
                  ? 'اسأل بالدارجة التونسية أو الفرنسية حول أي وثيقة (جواز سفر، بطاقة رمادية، عقد كراء، مبادر ذاتي، أو تنابر).'
                  : locale === 'en'
                  ? 'Ask anything about official Tunisian paperwork, required documents, statutory stamp fees, and public offices.'
                  : 'Posez vos questions sur les passeports, cartes grises, baux, statut auto-entrepreneur ou barèmes des timbres.'}
              </p>
            </div>

            {/* Quick Topic Starter Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left rtl:text-right pt-2">
              {topicCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(card.query)}
                    className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-200 text-left rtl:text-right group cursor-pointer flex flex-col justify-between space-y-3 shadow-md hover:shadow-xl hover:shadow-emerald-950/30 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${card.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 group-hover:text-emerald-400 transition-colors">
                        →
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* Active Conversation Messages */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onSelectPrompt={(p) => handleSendMessage(p)} />
        ))}

        {/* AI Typing / Thinking State Indicator */}
        {isProcessing && (
          <div className="w-full py-4 animate-fade-in">
            <div className="max-w-3xl mx-auto flex items-center gap-3 px-4 text-xs text-emerald-400">
              <BrandIcon size={32} />
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-zinc-400 font-mono text-[11px]">
                  {locale === 'ar' ? 'إدارة.تونس AI يحلل الإجراء...' : 'Idaara AI synthesizing civic answer...'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </main>

      {/* ── Bottom Pinned Input Console (ChatGPT / Claude Floating Pill) ── */}
      <footer className="sticky bottom-0 pb-4 pt-2 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent z-20">
        <div className="max-w-3xl mx-auto space-y-2">
          
          {/* Main Input Box */}
          <div className="relative glass-panel rounded-3xl p-2 sm:p-2.5 border border-zinc-800 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-2xl transition-all bg-zinc-950/90">
            <div className="flex items-end gap-2 px-2">
              
              {/* Auto-growing Textarea */}
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputVal}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder={
                  isRecording
                    ? (locale === 'ar' ? 'تحدث الآن... جار الاستماع...' : 'Listening to your voice...')
                    : (locale === 'ar'
                    ? 'اكتب سؤالك بالدارجة، الفرنسية، أو العربية... (Enter للإرسال)'
                    : 'Ask anything in Derja, French, or English... (Press Enter to send)')
                }
                className="flex-1 bg-transparent py-2 px-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none max-h-40 overflow-y-auto leading-relaxed"
              />

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-1.5 pb-1 shrink-0">
                
                {/* Voice Dictation Button */}
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  disabled={isProcessing}
                  title="Voice Dictation"
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40 ring-2 ring-red-500/30'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputVal.trim() || isProcessing}
                  title="Send Message"
                  className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-emerald-500/30 hover:scale-105 cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>
          </div>

          {/* Micro Legal & AI Disclaimer */}
          <p className="text-center text-[10px] font-mono text-zinc-600">
            {locale === 'ar'
              ? 'إدارة.تونس AI يقدم معلومات إرشادية. يرجى التثبت من النصوص القانونية بالرائد الرسمي (JORT).'
              : 'Idaara AI provides official guidance. Always verify certified documents with local authorities.'}
          </p>

        </div>
      </footer>

      {/* ── AI Model & API Key Settings Modal ── */}
      {showSettingsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5 glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">AI Engine & Model Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Provider Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300">Choose AI Provider</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveProvider('auto')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    activeProvider === 'auto'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="block">⚡ Auto-Smart</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Gemini / Groq / Local</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveProvider('gemini')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    activeProvider === 'gemini'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="block">✨ Gemini 1.5 Flash</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Google Free Tier</span>
                </button>
              </div>
            </div>

            {/* Custom API Key Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>Free API Key (Optional)</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-400 hover:underline"
                >
                  Get free key ↗
                </a>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  placeholder="AIzaSy... (Gemini) or gsk_... (Groq)"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60"
                />
              </div>
              <p className="text-[10px] text-zinc-500">
                You can get a 100% free Gemini key with no credit card at Google AI Studio. It will be stored securely in your local browser storage.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20"
              >
                Save & Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
