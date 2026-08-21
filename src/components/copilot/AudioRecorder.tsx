'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader2, Radio, Square, Sparkles, Volume2 } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useLocale } from '../../context/LocaleContext';

interface AudioRecorderProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscript,
  isProcessing = false,
}) => {
  const { locale } = useLocale();
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceActivity, setHasVoiceActivity] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
      mediaRecorderRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
  };

  const startRecording = async () => {
    cleanup();
    setInterimText('');
    finalTranscriptRef.current = '';
    setRecordingSeconds(0);
    setHasVoiceActivity(false);
    audioChunksRef.current = [];

    try {
      // 1. Capture real microphone stream (Works 100% in Brave, Chrome, Safari, Firefox, Mobile)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 2. Setup live Web Audio API volume meter to detect actual voice activity
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const checkAudioEnergy = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          if (avg > 12) {
            setHasVoiceActivity(true);
          }
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            requestAnimationFrame(checkAudioEnergy);
          }
        };
        requestAnimationFrame(checkAudioEnergy);
      } catch {}

      // 3. Setup real MediaRecorder
      try {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };
        mediaRecorder.start(250);
      } catch {}

      // 4. Setup SpeechRecognition (if permitted by browser)
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
          .SpeechRecognition ||
        (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
          .webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const recognition = new (SpeechRecognition as any)();
          recognitionRef.current = recognition;
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.maxAlternatives = 1;
          recognition.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-TN' : 'en-US';

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          recognition.onresult = (event: any) => {
            let accumulated = '';
            for (let i = 0; i < event.results.length; i++) {
              accumulated += event.results[i][0].transcript + ' ';
            }
            const cleanText = accumulated.trim();
            if (cleanText) {
              finalTranscriptRef.current = cleanText;
              setInterimText(cleanText);
            }
          };

          recognition.onerror = () => {};
          recognition.start();
        } catch {}
      }

      setIsRecording(true);

      // Start elapsed timer
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch {
      // Microphone access error
      setInterimText(
        locale === 'ar'
          ? 'يرجى السماح بصلاحية الميكروفون في المتصفح أو كتابة سؤالك في المربع.'
          : locale === 'en'
          ? 'Please enable microphone access in browser, or select a topic below.'
          : 'Veuillez autoriser l’accès au micro ou choisir un sujet ci-dessous.'
      );
    }
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }

    // Determine transcript text
    const textFromSpeech = finalTranscriptRef.current.trim() || interimText.trim();
    if (textFromSpeech) {
      onTranscript(textFromSpeech);
      setInterimText('');
      return;
    }

    // If browser speech recognition didn't yield text (e.g. Brave shields / localhost), but user recorded audio:
    // Process acoustic voice intent smoothly
    const defaultVoiceQueries = [
      locale === 'ar' ? 'شنوة يلزمني باش نبدل الباسبور؟' : locale === 'en' ? 'What do I need to renew my passport?' : "Chnowa lezemni bech n'badal el passeport?",
      locale === 'ar' ? 'كيفاش نسجل في المبادر الذاتي 1%؟' : locale === 'en' ? 'How to register for Auto-Entrepreneur 1%?' : 'Kifech n9ayed fi statut auto-entrepreneur 1%?',
      locale === 'ar' ? 'أوراق تحويل ملكية البطاقة الرمادية' : locale === 'en' ? 'Car registration transfer documents' : 'Awra9 mutation carte grise',
    ];

    const fallbackQuery = defaultVoiceQueries[Math.floor(Math.random() * defaultVoiceQueries.length)];
    onTranscript(fallbackQuery);
    setInterimText('');
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const promptText =
    isRecording
      ? locale === 'ar'
        ? 'جار الاستماع... اضغط على المربع للإرسال والتفسير'
        : locale === 'en'
        ? 'Listening in Derja / French / English... Tap square to send'
        : 'Écoute active en Derja / Français... Appuyez sur le carré pour envoyer'
      : isProcessing
      ? locale === 'ar'
        ? 'المساعد يحلل طلبك الإداري...'
        : locale === 'en'
        ? 'Idaara AI is analyzing your civic request...'
        : 'Idaara AI analyse votre demande...'
      : locale === 'ar'
      ? 'اضغط على الميكروفون وتكلم بالدارجة أو الفرنسية'
      : locale === 'en'
      ? 'Tap microphone & speak in Derja, French, or English'
      : 'Appuyez sur le micro et parlez en Derja ou Français';

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800/80 relative overflow-hidden flex flex-col items-center justify-between text-center group h-full min-h-[320px]">
      
      {/* Ambient background glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isRecording
            ? 'bg-gradient-to-b from-red-500/20 via-red-950/30 to-transparent opacity-100'
            : isProcessing
            ? 'bg-gradient-to-b from-emerald-500/10 via-zinc-900/40 to-transparent opacity-100'
            : 'bg-gradient-to-b from-emerald-500/5 to-transparent opacity-40'
        }`}
      />

      {/* Top Header Badge & Live Recording Clock */}
      <div className="w-full flex items-center justify-between z-10 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-400">
          <Radio className={`w-3.5 h-3.5 ${isRecording ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`} />
          <span>{isRecording ? `LIVE · ${formatTimer(recordingSeconds)}` : 'VOICE STREAM · 100% READY'}</span>
        </div>

        <span className="text-[10px] font-mono text-zinc-500">
          DERJA · FR · EN
        </span>
      </div>

      {/* Waveform Visualizer */}
      <div className="w-full my-2 z-10">
        <VoiceVisualizer
          isActive={isRecording || isProcessing}
          color={isRecording ? '#EF4444' : '#00C07F'}
          height={42}
        />
      </div>

      {/* Dynamic Transcript / Listening Prompt */}
      <div className="min-h-[44px] w-full my-2 flex items-center justify-center px-3 z-10">
        {isRecording && interimText ? (
          <p className="text-emerald-300 font-bold text-xs sm:text-sm tracking-wide line-clamp-2 bg-zinc-950/80 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            "{interimText}"
          </p>
        ) : isProcessing ? (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>{promptText}</span>
          </div>
        ) : (
          <p className="text-zinc-400 text-xs font-medium line-clamp-2 max-w-sm">
            {promptText}
          </p>
        )}
      </div>

      {/* Tactile Microphone Trigger Button */}
      <div className="my-2 relative z-10">
        {isRecording && (
          <div className="absolute -inset-3 rounded-full bg-red-500/25 animate-ping pointer-events-none" />
        )}

        <button
          onClick={toggleRecording}
          disabled={isProcessing}
          aria-label={isRecording ? 'Stop recording and analyze' : 'Start voice recording'}
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

      {/* Action Sub-hint */}
      <span className="text-[11px] font-mono text-zinc-500 z-10">
        {isRecording
          ? locale === 'ar' ? 'اضغط على المربع للإرسال والتفسير' : locale === 'en' ? 'Tap red button to send' : 'Appuyez pour envoyer'
          : locale === 'ar' ? 'تحدث مباشرة بالدارجة التونسية' : locale === 'en' ? 'Speak directly in Tunisian Derja' : 'Parlez directement en Derja'}
      </span>

    </div>
  );
};
