'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader2, Radio, Square, Keyboard, AlertTriangle } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useLocale } from '../../context/LocaleContext';

interface AudioRecorderProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
}

interface SpeechRecognitionEvent {
  results: {
    length: number;
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscript,
  isProcessing = false,
}) => {
  const { locale } = useLocale();
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [status, setStatus] = useState<'idle' | 'recording' | 'mic_blocked' | 'no_speech'>('idle');
  const [typeMode, setTypeMode] = useState(false);
  const [typeInput, setTypeInput] = useState('');

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const isRecordingRef = useRef(false);

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
      recognitionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    isRecordingRef.current = false;
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  const startRecording = async () => {
    cleanup();
    setInterimText('');
    finalTranscriptRef.current = '';
    setRecordingSeconds(0);
    setStatus('recording');

    // Request microphone stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
    } catch {
      setStatus('mic_blocked');
      setTypeMode(true);
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;

    setIsRecording(true);
    isRecordingRef.current = true;

    // Start elapsed timer
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 20) { stopRecording(); return prev; }
        return prev + 1;
      });
    }, 1000);

    if (SpeechRecognition) {
      try {
        const SpeechRec = SpeechRecognition as unknown as SpeechRecognitionConstructor;
        const recognition = new SpeechRec();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-FR' : 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let accumulated = '';
          for (let i = 0; i < event.results.length; i++) {
            accumulated += event.results[i][0].transcript + ' ';
          }
          const clean = accumulated.trim();
          if (clean) {
            finalTranscriptRef.current = clean;
            setInterimText(clean);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setStatus('mic_blocked');
            setTypeMode(true);
            stopRecording();
          }
          // other errors (no-speech, network) — just keep recording silently
        };

        recognition.start();
      } catch {
        // Recognition not available — mic stream still open, user can stop and we'll note it
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    const captured = finalTranscriptRef.current.trim() || interimText.trim();
    if (captured) {
      onTranscript(captured);
      setInterimText('');
      setStatus('idle');
    } else {
      // No speech recognized — never inject fake text, just show type mode
      setStatus('no_speech');
      setTypeMode(true);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeInput.trim()) {
      onTranscript(typeInput.trim());
      setTypeInput('');
      setTypeMode(false);
      setStatus('idle');
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const label = {
    prompt: {
      ar: 'اضغط على الميكروفون وتكلم بالعربية أو الدارجة',
      en: 'Tap mic & speak in Derja, French, or English',
      fr: 'Appuyez sur le micro et parlez en Derja ou Français',
      derja: 'Edreb 3el micro w heder bel Derja wella Français',
    },
    listening: {
      ar: 'جار الاستماع... اضغط المربع للإرسال',
      en: 'Listening... tap square when done to send',
      fr: 'Écoute active... appuyez sur le carré pour envoyer',
      derja: 'Yer9ed elsout... edreb el mrabba3 bech tba3eth',
    },
    processing: {
      ar: 'Idaara AI يحلل طلبك...',
      en: 'Idaara AI is analyzing your request...',
      fr: 'Idaara AI analyse votre demande...',
      derja: 'Idaara AI yfahem soalek...',
    },
    micBlocked: {
      ar: 'الميكروفون محجوب — اكتب سؤالك أدناه',
      en: 'Microphone blocked — type your question below',
      fr: 'Micro bloqué — tapez votre question ci-dessous',
      derja: 'El micro msakkar — ekteb so2alek lemet',
    },
    noSpeech: {
      ar: 'لم يُلتقط صوت — اكتب سؤالك أدناه',
      en: 'No speech captured — type your question below',
      fr: 'Aucune voix capturée — tapez votre question ci-dessous',
      derja: 'Masme3tch sout — ekteb so2alek lemet',
    },
    typePlaceholder: {
      ar: 'اكتب سؤالك هنا...',
      en: 'Type your question here...',
      fr: 'Tapez votre question ici...',
      derja: "Ekteb so2alek houni...",
    },
    sendBtn: {
      ar: 'إرسال',
      en: 'Send',
      fr: 'Envoyer',
      derja: 'Iba3th',
    },
    stopHint: {
      ar: 'اضغط للإيقاف والإرسال',
      en: 'Tap to stop & send',
      fr: 'Appuyez pour arrêter & envoyer',
      derja: 'Edreb bech twa9ef w tba3eth',
    },
    tapHint: {
      ar: 'تحدث بالعربية أو الدارجة التونسية',
      en: 'Speak directly in Tunisian Derja',
      fr: 'Parlez directement en Derja tunisienne',
      derja: 'Heder bel Derja Tounsia',
    },
    switchToVoice: {
      ar: 'العودة للتسجيل الصوتي',
      en: 'Try voice again',
      fr: 'Réessayer avec le micro',
      derja: '7awal el micro marra okhra',
    },
  };

  const L = (key: keyof typeof label) => {
    const map = label[key] as Record<string, string>;
    return map[locale] ?? map['derja'];
  };

  const promptText = isRecording
    ? L('listening')
    : isProcessing
    ? L('processing')
    : status === 'mic_blocked'
    ? L('micBlocked')
    : status === 'no_speech'
    ? L('noSpeech')
    : L('prompt');

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800/80 relative overflow-hidden flex flex-col items-center justify-between text-center group h-full min-h-[320px]">
      
      {/* Ambient glow */}
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
        isRecording
          ? 'bg-gradient-to-b from-red-500/20 via-red-950/30 to-transparent opacity-100'
          : isProcessing
          ? 'bg-gradient-to-b from-emerald-500/10 via-zinc-900/40 to-transparent opacity-100'
          : typeMode
          ? 'bg-gradient-to-b from-indigo-500/8 to-transparent opacity-100'
          : 'bg-gradient-to-b from-emerald-500/5 to-transparent opacity-40'
      }`} />

      {/* Header badge */}
      <div className="w-full flex items-center justify-between z-10 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-400">
          {typeMode ? (
            <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
          ) : (
            <Radio className={`w-3.5 h-3.5 ${isRecording ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`} />
          )}
          <span>{isRecording ? `LIVE · ${formatTimer(recordingSeconds)}` : typeMode ? 'TEXT INPUT' : 'VOICE STREAM'}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">DERJA · AR · FR · EN</span>
      </div>

      {/* Waveform or Type Mode */}
      {typeMode ? (
        <div className="w-full flex-1 z-10 flex flex-col justify-center gap-3 my-2">
          {status === 'mic_blocked' && (
            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-semibold justify-center">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{L('micBlocked')}</span>
            </div>
          )}
          {status === 'no_speech' && (
            <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-semibold justify-center">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
              <span>{L('noSpeech')}</span>
            </div>
          )}
          <form onSubmit={handleTypeSubmit} className="flex gap-2 w-full">
            <input
              autoFocus
              type="text"
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
              placeholder={L('typePlaceholder')}
              className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-emerald-500/60 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!typeInput.trim() || isProcessing}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl disabled:opacity-30 transition-all cursor-pointer"
            >
              {L('sendBtn')}
            </button>
          </form>
          <button
            onClick={() => { setTypeMode(false); setStatus('idle'); }}
            className="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono underline underline-offset-2 transition-colors cursor-pointer"
          >
            {L('switchToVoice')}
          </button>
        </div>
      ) : (
        <>
          {/* Waveform Visualizer */}
          <div className="w-full my-2 z-10">
            <VoiceVisualizer
              isActive={isRecording || isProcessing}
              color={isRecording ? '#EF4444' : '#00C07F'}
              height={42}
            />
          </div>

          {/* Live transcript / prompt text */}
          <div className="min-h-[44px] w-full my-2 flex items-center justify-center px-3 z-10">
            {isRecording && interimText ? (
              <p className="text-emerald-300 font-bold text-xs sm:text-sm tracking-wide line-clamp-2 bg-zinc-950/80 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                “{interimText}”
              </p>
            ) : isProcessing ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>{promptText}</span>
              </div>
            ) : (
              <p className="text-zinc-400 text-xs font-medium line-clamp-2 max-w-sm">{promptText}</p>
            )}
          </div>

          {/* Mic button */}
          <div className="my-2 relative z-10">
            {isRecording && (
              <div className="absolute -inset-3 rounded-full bg-red-500/25 animate-ping pointer-events-none" />
            )}
            <button
              onClick={toggleRecording}
              disabled={isProcessing}
              aria-label={
                isRecording
                  ? locale === 'ar'
                    ? 'إيقاف التسجيل والإرسال'
                    : locale === 'derja'
                    ? 'Arresti el recording w ab3ath'
                    : locale === 'en'
                    ? 'Stop recording and send'
                    : "Arrêter l'enregistrement et envoyer"
                  : locale === 'ar'
                  ? 'بدء التسجيل الصوتي'
                  : locale === 'derja'
                  ? 'Bda el recording'
                  : locale === 'en'
                  ? 'Start voice recording'
                  : "Démarrer l'enregistrement vocal"
              }
              className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 shadow-2xl cursor-pointer ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50 scale-105 ring-4 ring-red-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:scale-105 shadow-emerald-500/30 ring-4 ring-emerald-500/20'
              } ${isProcessing ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {isRecording ? (
                <Square className="w-6 h-6 fill-current" />
              ) : isProcessing ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 z-10">
            <span className="text-[11px] font-mono text-zinc-500">
              {isRecording ? L('stopHint') : L('tapHint')}
            </span>
            {!isRecording && !isProcessing && (
              <button
                onClick={() => setTypeMode(true)}
                className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 underline underline-offset-2 cursor-pointer transition-colors"
              >
                {locale === 'ar' ? 'أو اكتب' : locale === 'en' ? 'or type' : locale === 'fr' ? 'ou tapez' : 'wella ekteb'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
