'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
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
  ScanText,
  FileCode2,
  Calculator,
  Building2,
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
  Pencil,
  Check,
  Globe,
  Landmark,
  Stamp,
} from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessageType[];
}

const STORAGE_SESSIONS_KEY = 'idaara_copilot_saved_sessions';
const STORAGE_ACTIVE_ID_KEY = 'idaara_copilot_active_session_id';

export default function CopilotPage() {
  const { locale, isRtl } = useLocale();

  const tooltips = {
    thinkMode: {
      ar: 'تفعيل وضع التحليل القانوني العميق',
      fr: 'Activer le mode raisonnement juridique approfondi',
      en: 'Toggle Deep Legal & Statutory Reasoning Mode',
      derja: 'Chargi wad3 el tahlil el 9anuni',
    },
    dictate: { ar: 'إملاء', fr: 'Dicter', en: 'Dictate', derja: 'Hki bel mic' },
    send: { ar: 'إرسال', fr: 'Envoyer', en: 'Send', derja: 'Eb3ath' },
    quickTopics: { ar: 'أسئلة سريعة', fr: 'Sujets rapides', en: 'Quick Topics', derja: 'Mawadhi3 sari3a' },
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => `session-${Date.now()}`);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);
  const [showVoiceBanner, setShowVoiceBanner] = useState<boolean>(true);
  const [sessionToDelete, setSessionToDelete] = useState<ChatSession | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [thinkMode, setThinkMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const closeSidebarOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // ── 1. Load Chat Sessions & Active Thread with Auto-Deduplication & Resize Listener ──
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

      try {
        const savedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
        let loadedSessions: ChatSession[] = [];
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          if (Array.isArray(parsed)) {
            // Deduplicate sessions strictly by unique ID
            const seenIds = new Set<string>();
            for (const s of parsed) {
              if (s && s.id && !seenIds.has(s.id)) {
                seenIds.add(s.id);
                loadedSessions.push(s);
              }
            }
            setSessions(loadedSessions);
            localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(loadedSessions));
          }
        }

        const savedActiveId = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
        if (savedActiveId && loadedSessions.length > 0) {
          const activeSession = loadedSessions.find((s) => s.id === savedActiveId);
          if (activeSession) {
            setCurrentSessionId(activeSession.id);
            setMessages(activeSession.messages || []);
          }
        }
      } catch (err) {
        console.warn('Failed to load chat history:', err);
      }
      setIsInitialized(true);

      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q && q.trim()) {
        // Sanitize: max 500 chars, strip control characters
        const sanitized = q.trim().slice(0, 500).replace(/[\x00-\x1F\x7F]/g, '');
        if (sanitized.length > 0) handleSendMessage(sanitized);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 2. Persist Active Messages & Sessions (No Duplicate Clones) ──
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_ACTIVE_ID_KEY, currentSessionId);

        const firstUserMsg = messages.find((m) => m.sender === 'user')?.content || 'Discussion';
        const defaultTitle = firstUserMsg.slice(0, 32) + (firstUserMsg.length > 32 ? '...' : '');

        setSessions((prev) => {
          const exists = prev.find((s) => s.id === currentSessionId);
          let updated: ChatSession[];
          if (exists) {
            const preservedTitle = exists.title && exists.title !== 'Discussion' ? exists.title : defaultTitle;
            updated = prev.map((s) => (s.id === currentSessionId ? { ...s, title: preservedTitle, messages } : s));
          } else {
            updated = [
              {
                id: currentSessionId,
                title: defaultTitle,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                messages,
              },
              ...prev.slice(0, 20),
            ];
          }
          localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
          return updated;
        });
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
      label: locale === 'ar' ? 'تجديد جواز السفر (80 د.ت)' : locale === 'derja' ? 'Passeport tounsi (80 DT)' : locale === 'en' ? 'Renew Passport (80 DT)' : 'Renouveler Passeport (80 DT)',
      q: locale === 'ar' ? 'شنوة يلزمني باش نجدد جواز السفر التونسي؟' : locale === 'derja' ? "Chnouwa lezemni bech n'badal el passeport mte3i?" : locale === 'en' ? 'What documents and fees do I need to renew my Tunisian passport?' : 'Quels sont les documents et timbres fiscaux pour renouveler mon passeport tunisien ?',
      icon: FileCheck2,
    },
    {
      label: locale === 'ar' ? 'البطاقة الرمادية للسيارة (145 د.ت)' : locale === 'derja' ? 'Carte Grise karhba (145 DT)' : locale === 'en' ? 'Car Registration Transfer' : 'Mutation Carte Grise (145 DT)',
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

      // Rapid, silky smooth ChatGPT-speed progressive streaming
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

        // Stream in rapid chunks of 2 words (matches 60 tokens/sec ChatGPT speed)
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

      // Mark streaming as complete so toolbar & badges reveal smoothly
      setMessages((prev) =>
        prev.map((m) => (m.id === aiMsgId ? { ...m, isStreaming: false } : m))
      );
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
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([]);
    localStorage.setItem(STORAGE_ACTIVE_ID_KEY, newId);
    closeSidebarOnMobile();
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages || []);
    localStorage.setItem(STORAGE_ACTIVE_ID_KEY, session.id);
    closeSidebarOnMobile();
  };

  const promptDeleteSession = (e: React.MouseEvent, sess: ChatSession) => {
    e.stopPropagation();
    setSessionToDelete(sess);
  };

  const confirmDeleteSession = () => {
    if (!sessionToDelete) return;
    const id = sessionToDelete.id;
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
      return updated;
    });
    if (currentSessionId === id) {
      handleNewChat();
    }
    setSessionToDelete(null);
  };

  const startRenaming = (e: React.MouseEvent, sess: ChatSession) => {
    e.stopPropagation();
    setEditingSessionId(sess.id);
    setEditingTitle(sess.title);
  };

  const saveRenamedTitle = (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent, id?: string) => {
    if (e) e.stopPropagation();
    const targetId = id || editingSessionId;
    if (!targetId) return;

    const trimmed = editingTitle.trim();
    if (trimmed) {
      setSessions((prev) => {
        const updated = prev.map((s) => (s.id === targetId ? { ...s, title: trimmed } : s));
        localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
        return updated;
      });
    }
    setEditingSessionId(null);
  };

  const cancelRenaming = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  // ── Voice Dictation via MediaRecorder + Groq Whisper ──
  const toggleVoice = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.requestData();
        } catch {}
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
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
        if (audioChunksRef.current.length === 0) {
          setIsTranscribing(false);
          return;
        }

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

      recorder.start(100);
      setIsRecording(true);
    } catch (err) {
      console.warn('Mic permission error:', err);
      const micAlerts: Record<string, string> = {
        ar: 'يرجى السماح بالوصول إلى الميكروفون في إعدادات المتصفح.',
        fr: 'Veuillez autoriser l\'accès au microphone dans les paramètres du navigateur.',
        en: 'Please allow microphone access in your browser settings.',
        derja: 'Samah lel mic fil paramètres mta3 el browser.',
      };
      alert(micAlerts[locale] ?? micAlerts['fr']);
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
      ? "شنوة تحب تعرف اليوم في إدارة.تونس؟"
      : locale === 'derja'
      ? "Chnowa thabb ta3ref lyoum fi Tounes?"
      : locale === 'fr'
      ? "Comment puis-je vous aider dans vos démarches ?"
      : "What Tunisian procedure do you need help with?";

  const centerSubtitle =
    locale === 'ar'
      ? 'دليلك الرسمي للإجراءات، التنابر والمناظرات الوطنية في تونس.'
      : locale === 'derja'
      ? 'Dalilek el rasmi lel awra9, el timbres wel concourat fi Tounes.'
      : locale === 'fr'
      ? 'Votre guide officiel pour les démarches, timbres et concours en Tunisie.'
      : 'Your official guide for procedures, fiscal stamps, and public exams in Tunisia.';

  const placeholder = isRecording
    ? (locale === 'ar' ? 'جارٍ الاستماع... تفضل بالتحدث' : locale === 'derja' ? '9a3ed nesma3 fik... Tkellem tawa' : 'Listening... Speak now')
    : isTranscribing
    ? (locale === 'ar' ? 'جارٍ معالجة الصوت...' : locale === 'derja' ? '9a3ed ntarjem...' : 'Transcribing voice...')
    : (locale === 'ar'
      ? 'اسأل عن أي إجراء، وثيقة، أو معلوم جبائي...'
      : locale === 'derja'
      ? 'Es\'el 3la ay war9a, procédure, walla timbre...'
      : locale === 'fr'
      ? 'Posez votre question sur une démarche, un timbre...'
      : 'Ask about any Tunisian procedure, document, or stamp fee...');

  const officialBadgeText =
    locale === 'ar'
      ? 'المساعد الإداري الرسمي'
      : locale === 'derja'
      ? 'Assistant Idari Tounsi'
      : locale === 'fr'
      ? 'IA Civique Officielle'
      : 'Official Civic AI';

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-30 flex bg-[#09090b] text-white overflow-hidden font-sans">

      {/* ── Mobile Backdrop Overlay ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 top-14 bg-black/75 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      {/* ═════════════════════════════════════════════════════════════════
          BESPOKE CIVIC SIDEBAR (#121214)
      ══════════════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed lg:static inset-y-0 top-14 lg:top-0 start-0 z-50 lg:z-20 w-72 max-w-[85vw] lg:w-64 shrink-0 bg-[#121214] border-e border-white/5 flex flex-col justify-between select-none shadow-2xl lg:shadow-none transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          
          {/* Sidebar Top Action Header (h-14 aligned) */}
          <div className="h-14 px-3 flex items-center justify-between border-b border-white/5 shrink-0">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-100 text-xs font-semibold transition-all cursor-pointer border border-white/10 shadow-sm"
            >
              <PenSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {locale === 'ar'
                  ? 'محادثة جديدة'
                  : locale === 'en'
                  ? 'New Chat'
                  : locale === 'derja'
                  ? 'M7adtha Jdida'
                  : 'Nouveau chat'}
              </span>
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
              title={locale === 'ar' ? 'إغلاق القائمة' : locale === 'en' ? 'Close sidebar' : 'Fermer le menu'}
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Scrollable Body */}
          <div className="p-3 space-y-3 overflow-y-auto flex-1">
            {/* Civic Navigation Tools */}
            <nav className="space-y-0.5">
              <Link
                href="/fasserli"
                onClick={closeSidebarOnMobile}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <ScanText className="w-4 h-4 text-emerald-400" />
                <span>
                  {locale === 'ar'
                    ? 'فسّرلي هالورقة (OCR)'
                    : locale === 'en'
                    ? 'Scanner OCR'
                    : locale === 'derja'
                    ? 'Fasserli OCR'
                    : 'Scanner OCR'}
                </span>
              </Link>
              <Link
                href="/documents"
                onClick={closeSidebarOnMobile}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <FileCode2 className="w-4 h-4 text-blue-400" />
                <span>
                  {locale === 'ar'
                    ? 'نماذج العقود والاستمارات'
                    : locale === 'en'
                    ? 'Templates & Forms'
                    : locale === 'derja'
                    ? 'Modélet & 39oud'
                    : 'Modèles & Contrats'}
                </span>
              </Link>
              <Link
                href="/calculator"
                onClick={closeSidebarOnMobile}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>
                  {locale === 'ar'
                    ? 'حاسبة التنابر والرسوم'
                    : locale === 'en'
                    ? 'Stamp Calculator'
                    : locale === 'derja'
                    ? 'Calculateur Timbres'
                    : 'Calculateur de Timbres'}
                </span>
              </Link>
              <Link
                href="/concours"
                onClick={closeSidebarOnMobile}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Briefcase className="w-4 h-4 text-teal-400" />
                <span>
                  {locale === 'ar'
                    ? 'المناظرات الوطنية'
                    : locale === 'en'
                    ? 'Public Concours'
                    : locale === 'derja'
                    ? 'Radar el Concourat'
                    : 'Concours Nationaux'}
                </span>
              </Link>
              <Link
                href="/locator"
                onClick={closeSidebarOnMobile}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>
                  {locale === 'ar'
                    ? 'دليل البلديات والقباضات'
                    : locale === 'en'
                    ? 'Offices & Baladiyas'
                    : locale === 'derja'
                    ? 'Baladiyas & 9badhat'
                    : 'Baladiyas & Recettes'}
                </span>
              </Link>
              <Link
                href="/procedures"
                onClick={closeSidebarOnMobile}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
              >
                <Landmark className="w-4 h-4 text-purple-400" />
                <span>
                  {locale === 'ar'
                    ? 'دليل الإجراءات الرسمية'
                    : locale === 'en'
                    ? 'Procedures Guide'
                    : locale === 'derja'
                    ? 'Dalil el Démarches'
                    : 'Guide des Démarches'}
                </span>
              </Link>
            </nav>

            {/* Recents Section */}
            <div className="pt-2">
              <div className="px-3 pb-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                {locale === 'ar'
                  ? 'المحادثات السابقة'
                  : locale === 'en'
                  ? 'Recent History'
                  : locale === 'derja'
                  ? 'M7adhathat 9dima'
                  : 'Historique Récent'}
              </div>
              <div className="space-y-0.5">
                {sessions.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-zinc-500 italic">
                    {locale === 'ar'
                      ? 'لا توجد محادثات سابقة'
                      : locale === 'en'
                      ? 'No recent discussions'
                      : locale === 'derja'
                      ? '7atta m7adtha 9dima'
                      : 'Aucune discussion récente'}
                  </div>
                ) : (
                  sessions.map((sess) => {
                    const isEditing = editingSessionId === sess.id;
                    return (
                      <div
                        key={sess.id}
                        onClick={() => !isEditing && loadSession(sess)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                          currentSessionId === sess.id
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1.5 w-full" onClick={(e) => e.stopPropagation()}>
                            <input
                              autoFocus
                              type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveRenamedTitle(e, sess.id);
                                if (e.key === 'Escape') setEditingSessionId(null);
                              }}
                              className="flex-1 bg-black/60 border border-emerald-500 rounded-lg px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-400"
                            />
                            <button
                              onClick={(e) => saveRenamedTitle(e, sess.id)}
                              className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer border-0"
                              title="Save"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={cancelRenaming}
                              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0"
                              title="Cancel"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="truncate flex-1 text-xs">{sess.title}</span>
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => startRenaming(e, sess)}
                                className="p-2 hover:text-emerald-400 text-zinc-400 transition-colors cursor-pointer border-0 outline-none"
                                title={locale === 'ar' ? 'تغيير الاسم' : locale === 'fr' ? 'Renommer' : 'Rename'}
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => promptDeleteSession(e, sess)}
                                className="p-2 hover:text-red-400 text-zinc-400 transition-colors cursor-pointer border-0 outline-none"
                                title={locale === 'ar' ? 'حذف المحادثة' : locale === 'en' ? 'Delete chat' : 'Supprimer la discussion'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Profile / Platform Info */}
        <div className="p-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-700/80 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              TN
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-zinc-200">
                {locale === 'ar' ? 'مواطن' : locale === 'en' ? 'Citizen' : locale === 'derja' ? 'Mowaten' : 'Citoyen'}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                Idaara {locale === 'ar' || locale === 'derja' ? 'مجاني' : locale === 'fr' ? 'Gratuit' : 'Free'}
              </div>
            </div>
          </div>

          <Link
            href="/launchpad"
            onClick={closeSidebarOnMobile}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300 transition-colors"
          >
            {locale === 'ar' ? 'المستقل' : locale === 'derja' ? 'Mustaqel' : locale === 'fr' ? 'Indépendant' : 'Freelance'}
          </Link>
        </div>
      </aside>

      {/* ═════════════════════════════════════════════════════════════════
          MAIN CANVAS AREA: MINIMALIST CIVIC ASSISTANT
      ══════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col bg-[#090a0d] relative overflow-hidden w-full min-w-0">
        
        {/* ─── Minimalist Top Bar ─── */}
        <header className="shrink-0 h-13 px-3 sm:px-6 flex items-center justify-between border-b border-white/[0.06] bg-[#090a0d]/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none flex items-center justify-center"
              title={locale === 'ar' ? 'القائمة' : 'Menu'}
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              <span>Idaara AI</span>
              <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">· JORT {new Date().getFullYear()}</span>
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

        {/* ─── Empty State: Pure Minimalist Canvas ─── */}
        {messages.length === 0 && !isProcessing && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-2xl mx-auto w-full -mt-6">
            
            {/* Minimalist Heading */}
            <div className="text-center space-y-2 mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'المساعد الإداري الذكي' : locale === 'en' ? 'Civic AI Copilot' : 'Assistant Administratif IA'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {centerHeadline}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                {centerSubtitle}
              </p>
            </div>

            {/* Centered Minimalist Input Box */}
            <div className="w-full bg-[#12141a] border border-white/10 focus-within:border-emerald-500/50 rounded-2xl p-3 shadow-2xl transition-all space-y-3">
              <textarea
                ref={textareaRef}
                rows={2}
                value={inputVal}
                onChange={onTextareaChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                disabled={isTranscribing}
                className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:outline-none focus:ring-0 resize-none max-h-36 leading-relaxed"
              />

              {/* Minimalist Bottom Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setThinkMode((p) => !p)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                      thinkMode
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                        : 'text-zinc-400 hover:text-white border-transparent hover:bg-white/5'
                    }`}
                    title={getLocalized(tooltips.thinkMode, locale)}
                  >
                    <Brain className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{locale === 'ar' ? 'تفكير معمق' : 'Think'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={toggleVoice}
                    disabled={isTranscribing}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : isTranscribing
                        ? 'text-emerald-400'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={getLocalized(tooltips.dictate, locale)}
                  >
                    {isTranscribing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isRecording ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Send Button */}
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputVal.trim() || isProcessing || isTranscribing}
                    className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                  >
                    <span className="hidden sm:inline">{locale === 'ar' ? 'إرسال' : 'Envoyer'}</span>
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>

            {/* Sleek Minimalist Quick Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-zinc-400" dir={isRtl ? 'rtl' : 'ltr'}>
              <button
                dir="auto"
                onClick={() =>
                  handleSendMessage(
                    locale === 'ar'
                      ? 'كيفاش نخرج أوراق جواز السفر التونسي؟'
                      : locale === 'fr'
                      ? 'Comment renouveler un passeport tunisien ?'
                      : locale === 'en'
                      ? 'How do I renew a Tunisian passport?'
                      : 'Kifech n5arej awra9 el passeport tounsi?'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === 'ar' ? 'جواز السفر 80د' : 'Passeport (80 DT)'}</span>
              </button>

              <button
                dir="auto"
                onClick={() =>
                  handleSendMessage(
                    locale === 'ar'
                      ? 'كيفاش نعمل بطاقة رمادية في تونس؟'
                      : locale === 'fr'
                      ? 'Comment faire une mutation de carte grise en Tunisie ?'
                      : locale === 'en'
                      ? 'How do I transfer vehicle registration (carte grise)?'
                      : 'Kifech na3mel mutation carte grise fi Tounes?'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
              >
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>{locale === 'ar' ? 'البطاقة الرمادية 145د' : 'Carte Grise (145 DT)'}</span>
              </button>

              <button
                dir="auto"
                onClick={() =>
                  handleSendMessage(
                    locale === 'ar'
                      ? 'اعمل لي عقد كراء سكني قانوني'
                      : locale === 'fr'
                      ? 'Rédige-moi un contrat de bail résidentiel légal'
                      : locale === 'en'
                      ? 'Draft a legal residential lease agreement'
                      : 'A3melli contrat de bail kré sakani mrigel'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>{locale === 'ar' ? 'عقد كراء سكني' : 'Contrat de bail'}</span>
              </button>

              <button
                dir="auto"
                onClick={() =>
                  handleSendMessage(
                    locale === 'ar'
                      ? 'شنوة المناظرات المفتوحة توا في تونس؟'
                      : locale === 'fr'
                      ? 'Quels sont les concours ouverts actuellement en Tunisie ?'
                      : locale === 'en'
                      ? 'What civil service exams are currently open in Tunisia?'
                      : 'Chnowa les concours el maftou7in tawa fi Tounes?'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-zinc-200 border border-white/5 transition-all cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                <span>{locale === 'ar' ? `المناظرات ${new Date().getFullYear()}` : `Concours ${new Date().getFullYear()}`}</span>
              </button>
            </div>

          </div>
        )}

        {/* ─── Active Chat Messages Stream ─── */}
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
                      {/* Pulsing Glowing Aura Orb */}
                      <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                      </div>

                      <span className="text-xs text-zinc-400 font-medium tracking-wide">
                        {thinkMode
                          ? (locale === 'ar' ? 'جارِ التفكير والتحليل القانوني المعمق...' : locale === 'derja' ? 'N5ammem w n7allel fel 9anoun...' : 'Analyse juridique approfondie...')
                          : (locale === 'ar' ? 'جارِ البحث والتحضير من المصادر الرسمية...' : locale === 'derja' ? 'Nlawwej w n7adher fel ijaba...' : 'Recherche et traitement officiel...')}
                      </span>

                      {/* Smooth Glowing Shimmer Dots */}
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" style={{ animationDelay: '200ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" style={{ animationDelay: '400ms' }} />
                      </div>
                    </div>

                    {/* Subtle Shimmer Skeleton Wave */}
                    <div className="space-y-1.5 pl-6 rtl:pl-0 rtl:pr-6 opacity-60">
                      <div className="h-2 rounded-full bg-gradient-to-r from-white/[0.08] via-emerald-500/20 to-white/[0.04] w-3/5 animate-pulse" />
                      <div className="h-2 rounded-full bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent w-2/5 animate-pulse" style={{ animationDelay: '150ms' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Bottom Dock Input (When chatting) */}
            <footer className="p-3 sm:p-4 bg-[#090b0e]/95 backdrop-blur-xl border-t border-white/[0.08] shrink-0 z-20 pb-safe">
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="flex items-center gap-2.5 bg-[#12141a] border border-white/[0.08] focus-within:border-emerald-500/50 rounded-2xl p-2 px-3 shadow-2xl transition-all">
                  
                  {/* Plus Quick Topics */}
                  <div className="relative shrink-0 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPlusMenu((p) => !p)}
                      className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                      title={getLocalized(tooltips.quickTopics, locale)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {showPlusMenu && (
                      <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#161820] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
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
                  <div className="flex items-center gap-1.5 pb-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={toggleVoice}
                      disabled={isTranscribing}
                      className={`p-2 rounded-xl transition-colors cursor-pointer border border-white/5 ${
                        isRecording
                          ? 'bg-red-600 text-white animate-pulse'
                          : isTranscribing
                          ? 'text-emerald-400 bg-emerald-950'
                          : 'text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]'
                      }`}
                      title={getLocalized(tooltips.dictate, locale)}
                    >
                      {isTranscribing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isRecording ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!inputVal.trim() || isProcessing || isTranscribing}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer shadow-md font-bold text-xs"
                      title={getLocalized(tooltips.send, locale)}
                    >
                      <ArrowUp className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>

                </div>

                {/* Micro disclaimer */}
                <p className="text-center text-[11px] text-zinc-600">
                  {locale === 'ar'
                    ? 'إدارة.تونس AI يقدم معلومات إرشادية. يرجى التثبت من النصوص بالرائد الرسمي.'
                    : locale === 'derja'
                    ? 'Idaara AI ya3tik ma3loumet te9ribiya. Thabbet dima fel JORT.'
                    : locale === 'fr'
                    ? 'Idaara AI fournit des indications citoyennes. Vérifiez les textes officiels au JORT.'
                    : 'Idaara AI can make mistakes. Verify official texts with JORT.'}
                </p>

              </div>
            </footer>
          </>
        )}

      </div>

      {/* ─── Delete Confirmation Modal (ChatGPT Style) ─── */}
      {sessionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#1c1c1f] border border-white/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {locale === 'ar'
                  ? 'حذف المحادثة؟'
                  : locale === 'en'
                  ? 'Delete conversation?'
                  : locale === 'derja'
                  ? 'T7eb tfasa5 el m7adtha?'
                  : 'Supprimer la discussion ?'}
              </h3>
              <button
                onClick={() => setSessionToDelete(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {locale === 'ar'
                ? `سيتم حذف "${sessionToDelete.title}". لا يمكن التراجع عن هذا الإجراء.`
                : locale === 'en'
                ? `This will permanently delete "${sessionToDelete.title}". This action cannot be undone.`
                : locale === 'derja'
                ? `El m7adtha "${sessionToDelete.title}" bech tetfasa5 dima. Ma3adech tnejjem trajja3ha.`
                : `Cette action supprimera définitivement "${sessionToDelete.title}". Vous ne pourrez pas annuler cette action.`}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSessionToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none"
              >
                {locale === 'ar'
                  ? 'إلغاء'
                  : locale === 'en'
                  ? 'Cancel'
                  : locale === 'derja'
                  ? 'Battalt'
                  : 'Annuler'}
              </button>
              <button
                onClick={confirmDeleteSession}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer border-0 outline-none shadow-md shadow-red-900/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar'
                    ? 'حذف نهائياً'
                    : locale === 'en'
                    ? 'Delete permanently'
                    : locale === 'derja'
                    ? 'Fasa5 tawa'
                    : 'Supprimer'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
