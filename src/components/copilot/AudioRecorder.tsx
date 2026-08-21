'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, Radio, Square, Volume2 } from 'lucide-react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef<string>('');

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
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const startRecording = async () => {
    cleanup();
    setErrorMessage(null);
    setInterimText('');
    finalTranscriptRef.current = '';
    setRecordingSeconds(0);

    // Request actual microphone stream
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }
    } catch {
      setErrorMessage(
        locale === 'ar'
          ? 'يرجى السماح بالوصول إلى الميكروفون في المتصفح.'
          : locale === 'en'
          ? 'Please allow microphone access in your browser settings.'
          : 'Veuillez autoriser l’accès au microphone dans votre navigateur.'
      );
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;

    setIsRecording(true);

    // Start live timer
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 20) {
          // Auto-stop at 20 seconds
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    if (SpeechRecognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognitionRef.current = recognition;

        // Configure continuous listening so it never dies prematurely
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        // Multi-language recognition (Tunisian Arabic / Derja, French, English)
        recognition.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-FR' : 'en-US';

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (event: any) => {
          // If no-speech or network, do NOT abort the UI timer — allow user to continue speaking or finish manually
          if (event.error === 'not-allowed') {
            setErrorMessage(
              locale === 'ar'
                ? 'تم رفض إذن الميكروفون.'
                : locale === 'en'
                ? 'Microphone permission was denied.'
                : 'Accès au micro refusé.'
            );
            stopRecording();
          }
        };

        recognition.onend = () => {
          // Only stop if user explicitly stopped
          if (isRecording && recognitionRef.current) {
            try {
              recognition.start();
            } catch {}
          }
        };

        recognition.start();
      } catch {
        // SpeechRecognition initial failed, but audio recording timer is live
      }
    } else {
      setInterimText(
        locale === 'ar'
          ? 'المتصفح يسجل الصوت (تكلم بوضوح ثم اضغط إرسال)...'
          : locale === 'en'
          ? 'Recording voice (Speak clearly, then tap Stop to send)...'
          : 'Enregistrement audio actif (Parlez clairement puis appuyez sur Stop)...'
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

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    const captured = finalTranscriptRef.current.trim() || interimText.trim();
    if (captured) {
      onTranscript(captured);
      setInterimText('');
    } else {
      setErrorMessage(
        locale === 'ar'
          ? 'لم يتم التعرف على الصوت. اضغط مجدداً وتكلم بوضوح أو اكتب سؤالك.'
          : locale === 'en'
          ? 'No speech recognized. Tap to try again or type in the box.'
          : 'Aucune voix reconnue. Réessayez en parlant distinctement ou tapez votre question.'
      );
    }
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
        ? 'جار الاستماع بالدارجة... اضغط على المربع الأحمر للإرسال'
        : locale === 'en'
        ? 'Listening in Tunisian Derja... Tap red square to send'
        : 'Écoute active en Derja / Français... Appuyez sur le carré rouge pour envoyer'
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
          <span>{isRecording ? `LIVE · ${formatTimer(recordingSeconds)}` : 'SPEECH-TO-TEXT'}</span>
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
        {errorMessage ? (
          <p className="text-amber-400 text-xs font-semibold max-w-xs leading-snug">
            {errorMessage}
          </p>
        ) : isRecording && interimText ? (
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
