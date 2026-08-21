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
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        body: JSON.stringify({ prompt: query, locale, history }),
      });

      const data = await res.json();
      const response = data.result || {};

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = typeof window !== 'undefined' ? (window as any) : null;
    if (!windowObj) return;

    const SpeechRec = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert(
        locale === 'ar'
          ? 'المتصفح لا يدعم التسجيل الصوتي المباشر. يرجى استخدام متصفح Chrome أو Edge.'
          : locale === 'fr'
          ? 'La reconnaissance vocale n’est pas supportée sur ce navigateur. Veuillez utiliser Chrome ou Edge.'
          : locale === 'derja'
          ? 'El micro ma yemchich 3al browser hedha. Jarreb Chrome walla Edge.'
          : 'Voice recognition is not supported on this browser. Please use Chrome or Edge.'
      );
      return;
    }

    try {
      const rec = new SpeechRec();
      speechRecognitionRef.current = rec;
      rec.continuous = false;
      rec.interimResults = true;

      // Set speech recognition dialect: ar-TN for Tunisian Derja/Arabic, fr-FR for French, en-US for English
      if (locale === 'ar' || locale === 'derja') {
        rec.lang = 'ar-TN';
      } else if (locale === 'fr') {
        rec.lang = 'fr-FR';
      } else {
        rec.lang = 'en-US';
      }

      rec.onstart = () => setIsRecording(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (e: any) => {
        let interim = '';
        for (let i = 0; i < e.results.length; i++) {
          interim += e.results[i][0].transcript;
        }
        setInputVal(interim);
        if (e.results[e.results.length - 1].isFinal && interim.trim()) {
          setIsRecording(false);
          handleSendMessage(interim.trim());
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onerror = (e: any) => {
        console.warn('Speech recognition status/error:', e);
        setIsRecording(false);
        // Fallback to standard Arabic if ar-TN locale voice pack is missing on the client OS
        if (rec.lang === 'ar-TN') {
          rec.lang = 'ar-SA';
        }
      };

      rec.onend = () => setIsRecording(false);
      rec.start();
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      setIsRecording(false);
    }
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

  const centerHeadline =
    locale === 'ar'
      ? "فاش نجم نعاونك اليوم؟"
      : locale === 'derja'
      ? "Chnowa thabb ta3ref lyoum?"
      : locale === 'en'
      ? "What's on the agenda today?"
      : "Comment puis-je vous aider aujourd'hui ?";

  const placeholder = isRecording
    ? (locale === 'ar'
        ? 'جارٍ الاستماع... تفضل بالتحدث'
        : locale === 'derja'
        ? '9a3ed nesma3 fik... Tkellem tawa'
        : locale === 'fr'
        ? 'Écoute en cours... Parlez maintenant'
        : 'Listening... Speak now')
    : (locale === 'ar'
      ? 'اسأل عن أي إجراء، وثيقة، أو معلوم جبائي...'
      : locale === 'derja'
      ? 'Es\'el 3la ay war9a, procédure, walla timbre...'
      : locale === 'fr'
      ? 'Posez votre question sur une démarche, un timbre...'
      : 'Ask about any procedure, document, or stamp fee...');

  const disclaimerText =
    locale === 'ar'
      ? 'إدارة.تونس AI يقدم معلومات إرشادية. يرجى التثبت من النصوص بالرائد الرسمي.'
      : locale === 'derja'
      ? 'Idaara AI ynajjem ya3mel a8lat. Thabbet fel nosous el rasmiya fel JORT.'
      : locale === 'fr'
      ? 'Idaara AI peut faire des erreurs. Vérifiez les textes officiels au JORT.'
      : 'Idaara AI can make mistakes. Verify official texts with JORT.';

  const officialBadgeText =
    locale === 'ar'
      ? 'المساعد الإداري الرسمي'
      : locale === 'derja'
      ? 'Copilot Idari Tounsi'
      : locale === 'fr'
      ? 'IA Civique Officielle'
      : 'Official Civic AI';

  const newChatText =
    locale === 'ar'
      ? 'محادثة جديدة'
      : locale === 'derja'
      ? 'M7adtha Jdida'
      : locale === 'fr'
      ? 'Nouvelle discussion'
      : 'New Chat';

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-30 flex flex-col bg-[#09090b] text-white overflow-hidden">

      {/* ─── Top Bar: Single Dedicated Idaara Copilot Branding ─── */}
      <header className="shrink-0 h-13 px-4 sm:px-6 flex items-center justify-between border-b border-white/5 bg-[#09090b]/90 backdrop-blur-xl z-20">
        
        {/* Left: Official Brand Label */}
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-bold text-white tracking-tight">Idaara Copilot</span>
          <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            {officialBadgeText}
          </span>
        </div>

        {/* Right: New Chat Action */}
        <div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer border-0 outline-none"
              title={newChatText}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{newChatText}</span>
            </button>
          )}
        </div>
      </header>

      {/* ─── Empty State: Clean Native ChatGPT style ─── */}
      {messages.length === 0 && !isProcessing && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-2xl mx-auto w-full -mt-8">
          
          {/* Centered Headline */}
          <h1 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-8 text-center">
            {centerHeadline}
          </h1>

          {/* Centered Floating Prompt Input Bar */}
          <div className="w-full relative">
            <div className="flex items-center gap-2 bg-[#212121] hover:bg-[#262626] border border-white/10 rounded-full px-4 py-2.5 shadow-2xl transition-all">
              
              {/* Plus Button with Quick Topics Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPlusMenu((p) => !p)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                  title={locale === 'ar' ? 'مواضيع شائعة' : 'Quick Topics'}
                >
                  <Plus className="w-4 h-4" />
                </button>

                {showPlusMenu && (
                  <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      {locale === 'ar' ? 'أسئلة شائعة' : locale === 'derja' ? 'As2ela ma3roufa' : locale === 'fr' ? 'Questions Fréquentes' : 'Popular Inquiries'}
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

              {/* Text Input */}
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
                  title={locale === 'ar' ? 'تسجيل صوتي' : locale === 'fr' ? 'Dicter' : 'Voice Dictate'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputVal.trim()}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer shadow-md border-0 outline-none"
                  title={locale === 'ar' ? 'إرسال' : locale === 'fr' ? 'Envoyer' : 'Send'}
                >
                  <ArrowUp className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>

            {/* Micro disclaimer */}
            <p className="text-center text-[11px] text-zinc-600 mt-3 font-normal">
              {disclaimerText}
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
              
              {/* Bottom Pill Input */}
              <div className="flex items-end gap-2 bg-[#212121] border border-white/10 rounded-3xl px-3 py-2 transition-all shadow-2xl">
                
                {/* Plus Topic Button */}
                <div className="relative pb-1">
                  <button
                    type="button"
                    onClick={() => setShowPlusMenu((p) => !p)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                    title={locale === 'ar' ? 'مواضيع شائعة' : 'Quick Topics'}
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {showPlusMenu && (
                    <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                        {locale === 'ar' ? 'أسئلة شائعة' : locale === 'derja' ? 'As2ela ma3roufa' : locale === 'fr' ? 'Questions Fréquentes' : 'Popular Inquiries'}
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

                {/* Auto-growing Textarea */}
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
                    title={locale === 'ar' ? 'تسجيل صوتي' : locale === 'fr' ? 'Dicter' : 'Voice Dictate'}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputVal.trim() || isProcessing}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer shadow-md border-0 outline-none"
                    title={locale === 'ar' ? 'إرسال' : locale === 'fr' ? 'Envoyer' : 'Send'}
                  >
                    <ArrowUp className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

              </div>

              {/* Disclaimer */}
              <p className="text-center text-[11px] text-zinc-600">
                {disclaimerText}
              </p>

            </div>
          </footer>
        </>
      )}

    </div>
  );
}
