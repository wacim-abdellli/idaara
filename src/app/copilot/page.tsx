'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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
  Loader2,
  Image as ImageIcon,
  Library,
  Puzzle,
  FolderKanban,
  MoreHorizontal,
  Search,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  ChevronDown,
  Brain,
  AudioLines,
  X,
  Trash2,
  PenSquare,
  Globe,
  Compass,
} from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessageType[];
}

const STORAGE_SESSIONS_KEY = 'idaara_copilot_saved_sessions';
const STORAGE_CURRENT_KEY = 'idaara_copilot_chat_history';

export default function CopilotPage() {
  const { locale } = useLocale();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('current');
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);
  const [showVoiceBanner, setShowVoiceBanner] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [thinkMode, setThinkMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // ── 1. Load Chat Sessions & Current Thread ──
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Load sessions list
        const savedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          if (Array.isArray(parsed)) setSessions(parsed);
        }

        // Load active current messages
        const savedCurrent = localStorage.getItem(STORAGE_CURRENT_KEY);
        if (savedCurrent) {
          const parsed = JSON.parse(savedCurrent);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch (err) {
        console.warn('Failed to load chat history:', err);
      }
      setIsInitialized(true);

      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q && q.trim()) handleSendMessage(q.trim());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 2. Persist Active Messages & Sessions ──
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify(messages));

        // Auto-update or create title for the session in recents
        const firstUserMsg = messages.find((m) => m.sender === 'user')?.content || 'Discussion';
        const title = firstUserMsg.slice(0, 32) + (firstUserMsg.length > 32 ? '...' : '');

        setSessions((prev) => {
          const exists = prev.find((s) => s.id === currentSessionId);
          let updated: ChatSession[];
          if (exists) {
            updated = prev.map((s) => (s.id === currentSessionId ? { ...s, title, messages } : s));
          } else {
            updated = [
              {
                id: currentSessionId,
                title,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                messages,
              },
              ...prev.slice(0, 15),
            ];
          }
          localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
          return updated;
        });
      } else {
        localStorage.removeItem(STORAGE_CURRENT_KEY);
      }
    } catch (err) {
      console.warn('Failed to persist messages:', err);
    }
  }, [messages, isInitialized, currentSessionId]);

  // ── 3. Smooth Scroll to Bottom ──
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

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(`session-${Date.now()}`);
    localStorage.removeItem(STORAGE_CURRENT_KEY);
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
      return updated;
    });
    if (currentSessionId === id) {
      handleNewChat();
    }
  };

  // ── Voice Dictation via MediaRecorder + Groq Whisper ──
  const toggleVoice = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : '';

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (audioChunksRef.current.length === 0) return;

        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setIsTranscribing(true);

        try {
          const formData = new FormData();
          formData.append('file', audioBlob, 'voice.webm');

          const res = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();
          if (data.success && data.text && data.text.trim()) {
            const transcribed = data.text.trim();
            setInputVal(transcribed);
            handleSendMessage(transcribed);
          }
        } catch (err) {
          console.error('Transcription error:', err);
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Mic permission error:', err);
      alert(
        locale === 'ar'
          ? 'يرجى السماح بالوصول إلى الميكروفون.'
          : locale === 'fr'
          ? 'Veuillez autoriser l’accès au micro.'
          : 'Please allow microphone access.'
      );
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
      ? "جاهز وقت ما تحب."
      : locale === 'derja'
      ? "7adher wa9t ma t7eb."
      : locale === 'fr'
      ? "Prêt quand vous l'êtes."
      : "Ready when you are.";

  const placeholder = isRecording
    ? (locale === 'ar' ? 'جارٍ الاستماع...' : locale === 'derja' ? '9a3ed nesma3 fik...' : 'Listening...')
    : isTranscribing
    ? (locale === 'ar' ? 'جارٍ المعالجة...' : 'Transcribing...')
    : (locale === 'ar'
      ? 'اسأل عن أي شيء...'
      : locale === 'derja'
      ? 'Es\'el 3la ay 7aja...'
      : locale === 'fr'
      ? 'Posez n\'importe quelle question...'
      : 'Ask anything');

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-30 flex bg-[#0d0d0d] text-white overflow-hidden font-sans">

      {/* ═════════════════════════════════════════════════════════════════
          LEFT SIDEBAR (Exact ChatGPT Collapsible Dark Sidebar #171717)
      ══════════════════════════════════════════════════════════════════ */}
      {sidebarOpen && (
        <aside className="w-64 shrink-0 bg-[#171717] border-r border-white/5 flex flex-col justify-between p-3 select-none z-20 animate-fade-in">
          
          {/* Top Section */}
          <div className="space-y-3 overflow-y-auto">
            {/* Header: Brand + Icons */}
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="font-semibold text-base text-zinc-100 tracking-tight">ChatGPT</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNewChat()}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                  title="Search chats"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                  title="Close sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-zinc-100 text-sm font-medium transition-colors cursor-pointer border-0 outline-none"
            >
              <PenSquare className="w-4 h-4 text-zinc-300" />
              <span>New chat</span>
            </button>

            {/* Navigation Shortcuts */}
            <nav className="space-y-0.5 pt-1">
              <Link
                href="/fasserli"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-zinc-400" />
                <span>Images</span>
              </Link>
              <Link
                href="/documents"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                <Library className="w-4 h-4 text-zinc-400" />
                <span>Library</span>
              </Link>
              <Link
                href="/calculator"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                <Puzzle className="w-4 h-4 text-zinc-400" />
                <span>Plugins</span>
              </Link>
              <Link
                href="/procedures"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                <FolderKanban className="w-4 h-4 text-zinc-400" />
                <span>Projects</span>
              </Link>
              <button
                onClick={() => setShowPlusMenu((p) => !p)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 text-sm transition-colors cursor-pointer border-0 outline-none"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
              </button>
            </nav>

            {/* Recents Section */}
            <div className="pt-3">
              <div className="px-3 pb-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Recents
              </div>
              <div className="space-y-0.5">
                {sessions.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-zinc-500 italic">No recent chats</div>
                ) : (
                  sessions.map((sess) => (
                    <div
                      key={sess.id}
                      onClick={() => loadSession(sess)}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                        currentSessionId === sess.id
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="truncate flex-1 text-xs">{sess.title}</span>
                      <button
                        onClick={(e) => deleteSession(e, sess.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-zinc-400 transition-opacity cursor-pointer border-0 outline-none"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Bottom Profile Pill (User / Free Plan) */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700/80 text-white flex items-center justify-center font-bold text-xs">
                W
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-zinc-200">Wacim</div>
                <div className="text-[10px] text-zinc-500 font-medium">Free</div>
              </div>
            </div>

            <Link
              href="/launchpad"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-semibold text-zinc-200 transition-colors"
            >
              Upgrade
            </Link>
          </div>
        </aside>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          MAIN CANVAS AREA
      ══════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col bg-[#000000] relative overflow-hidden">
        
        {/* ─── Top Header Bar ─── */}
        <header className="shrink-0 h-13 px-4 flex items-center justify-between border-b border-white/5 bg-[#000000]/80 backdrop-blur-xl z-20">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                title="Open sidebar"
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            )}

            {/* Model Badge */}
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-xl hover:bg-white/10 text-zinc-200 font-semibold text-sm transition-colors cursor-pointer border-0 outline-none">
              <span>ChatGPT</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/launchpad"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Upgrade</span>
            </Link>
          </div>
        </header>

        {/* ─── Empty State: Exact ChatGPT Center View ─── */}
        {messages.length === 0 && !isProcessing && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-2xl mx-auto w-full -mt-6">
            
            {/* Center Headline */}
            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-7 text-center">
              {centerHeadline}
            </h1>

            {/* Prompt Input Bar (ChatGPT pill bar) */}
            <div className="w-full relative">
              <div className="flex items-center gap-2 bg-[#212121] hover:bg-[#262626] border border-white/10 rounded-full px-4 py-2.5 shadow-2xl transition-all">
                
                {/* Plus Attach Button */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowPlusMenu((p) => !p)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                    title="Add attachment"
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

                {/* Main Text Input */}
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
                  disabled={isTranscribing}
                  className="flex-1 bg-transparent py-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 shadow-none"
                />

                {/* Right Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  
                  {/* Think Button */}
                  <button
                    type="button"
                    onClick={() => setThinkMode((p) => !p)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border-0 outline-none ${
                      thinkMode
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Deep Think mode"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Think</span>
                  </button>

                  {/* Mic Button */}
                  <button
                    type="button"
                    onClick={toggleVoice}
                    disabled={isTranscribing}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer border-0 outline-none ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : isTranscribing
                        ? 'text-emerald-400'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Dictate"
                  >
                    {isTranscribing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isRecording ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Send or Voice Circle Button */}
                  {inputVal.trim() ? (
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all hover:opacity-90 cursor-pointer shadow-md border-0 outline-none"
                      title="Send"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[3]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={toggleVoice}
                      className="w-8 h-8 rounded-full bg-[#1e66f5] hover:bg-[#1b5bdc] text-white flex items-center justify-center transition-all cursor-pointer shadow-md border-0 outline-none"
                      title="Voice AI"
                    >
                      <AudioLines className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

              {/* ── Suggestions Row below input (Create image, Write, Search) ── */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-zinc-300">
                <button
                  onClick={() => handleSendMessage('Kifech n5arej awra9 el passeport tounsi?')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors cursor-pointer border-0 outline-none"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{locale === 'ar' ? 'استخراج أوراق الجواز' : 'Passeport & Timbres'}</span>
                </button>

                <button
                  onClick={() => handleSendMessage('A3melli contrat de bail kré sakani mrigel')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors cursor-pointer border-0 outline-none"
                >
                  <PenSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{locale === 'ar' ? 'تحرير عقد كراء' : 'Write a lease contract'}</span>
                </button>

                <button
                  onClick={() => handleSendMessage('Kifech na3mel mutation carte grise fi Tounes?')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors cursor-pointer border-0 outline-none"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{locale === 'ar' ? 'إجراءات البطاقة الرمادية' : 'Search procedures'}</span>
                </button>
              </div>
            </div>

            {/* ── Bottom Floating Voice Banner (Exact ChatGPT "Meet the new Voice" card) ── */}
            {showVoiceBanner && (
              <div className="absolute bottom-6 inset-x-4 max-w-xl mx-auto rounded-3xl bg-[#1c1c1e] border border-white/10 p-3.5 px-4 flex items-center justify-between shadow-2xl animate-fade-in z-30">
                <div className="flex items-center gap-3.5">
                  {/* Glowing Animated Orb */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-300 animate-pulse shrink-0 shadow-lg shadow-indigo-500/20" />
                  
                  <div>
                    <div className="text-xs font-bold text-white tracking-tight">Meet the new Voice</div>
                    <div className="text-[11px] text-zinc-400 leading-tight">
                      More natural conversations, powered by our next-generation voice model
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleVoice}
                    className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer border-0 outline-none shadow-sm"
                  >
                    Start Voice
                  </button>
                  <button
                    onClick={() => setShowVoiceBanner(false)}
                    className="p-1 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

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

                {/* Typing / Thinking Indicator */}
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
            <footer className="shrink-0 pb-4 pt-2 bg-gradient-to-t from-[#000000] via-[#000000]/95 to-transparent z-20 px-4 sm:px-6">
              <div className="max-w-3xl mx-auto space-y-2">
                
                {/* Bottom Pill Input */}
                <div className="flex items-end gap-2 bg-[#212121] border border-white/10 rounded-3xl px-3 py-2 transition-all shadow-2xl">
                  
                  {/* Plus Topic Button */}
                  <div className="relative pb-1">
                    <button
                      type="button"
                      onClick={() => setShowPlusMenu((p) => !p)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                      title="Add attachment"
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

                  {/* Auto-growing Textarea */}
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputVal}
                    onChange={onTextareaChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    disabled={isTranscribing}
                    className="flex-1 bg-transparent py-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none max-h-36 leading-relaxed"
                  />

                  {/* Mic & Send Buttons */}
                  <div className="flex items-center gap-1 pb-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={toggleVoice}
                      disabled={isTranscribing}
                      className={`p-2 rounded-full transition-colors cursor-pointer border-0 outline-none ${
                        isRecording
                          ? 'bg-red-500 text-white animate-pulse'
                          : isTranscribing
                          ? 'text-emerald-400'
                          : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                      title="Voice Dictate"
                    >
                      {isTranscribing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isRecording ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!inputVal.trim() || isProcessing || isTranscribing}
                      className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer shadow-md border-0 outline-none"
                      title="Send"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>

                </div>

                {/* Micro disclaimer */}
                <p className="text-center text-[11px] text-zinc-600">
                  {locale === 'ar'
                    ? 'إدارة.تونس AI يقدم معلومات إرشادية. يرجى التثبت من النصوص بالرائد الرسمي.'
                    : 'Idaara AI can make mistakes. Verify official texts with JORT.'}
                </p>

              </div>
            </footer>
          </>
        )}

      </div>

    </div>
  );
}
