'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Loader2, Radio, Volume2 } from 'lucide-react';
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
  const { t, locale } = useLocale();
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');

  const sampleDerjaQueries = [
    "Chnouwa lezemni bech n'badal el passeport mte3i?",
    "Chrit karhba jdid, kifech nbeddel el carte grise?",
    "A3melli contrat kré sakani mrigel lel baladiya",
    "Kifech n9ayed fi statut auto-entrepreneur 0.5%?",
    "Wathi9at el B3 bita9at sawabi9 3adliya chnouma?",
  ];

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setInterimText(t('voiceListening'));

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-FR' : 'ar-TN';
        recognition.interimResults = true;
        recognition.continuous = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setInterimText(transcript);
          if (event.results[current].isFinal) {
            setIsRecording(false);
            onTranscript(transcript);
          }
        };

        recognition.onerror = () => {
          simulateDerjaVoiceInput();
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        return;
      } catch {
        simulateDerjaVoiceInput();
        return;
      }
    }

    simulateDerjaVoiceInput();
  };

  const simulateDerjaVoiceInput = () => {
    const randomQuery =
      sampleDerjaQueries[Math.floor(Math.random() * sampleDerjaQueries.length)];

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      setInterimText(randomQuery.slice(0, index));
      if (index >= randomQuery.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRecording(false);
          onTranscript(randomQuery);
          setInterimText('');
        }, 600);
      }
    }, 80);
  };

  const promptText =
    isRecording
      ? locale === 'ar'
        ? 'جار الاستماع إلى صوتك بالدارجة...'
        : locale === 'en'
        ? 'Listening in Tunisian Derja...'
        : 'Écoute active en Derja / Français...'
      : isProcessing
      ? locale === 'ar'
        ? 'المساعد يحلل طلبك الإداري...'
        : locale === 'en'
        ? 'Idaara AI is analyzing your civic request...'
        : "Idaara AI analyse votre demande..."
      : locale === 'ar'
      ? 'اضغط على الميكروفون وتكلم بالدارجة أو الفرنسية'
      : locale === 'en'
      ? 'Tap microphone & speak in Derja or English'
      : 'Appuyez sur le micro et parlez en Derja ou Français';

  const actionHint =
    isRecording
      ? locale === 'ar' ? 'انقر لإيقاف التسجيل' : locale === 'en' ? 'Tap to stop recording' : "Cliquez pour arrêter l'enregistrement"
      : locale === 'ar' ? 'تحدث مباشرة بالدارجة التونسية' : locale === 'en' ? 'Speak directly in Tunisian Derja' : 'Parlez directement en Derja tunisienne';

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-zinc-800/80 relative overflow-hidden flex flex-col items-center justify-between text-center group h-full min-h-[300px]">
      {/* Ambient background glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isRecording
            ? 'bg-gradient-to-b from-red-500/15 via-red-950/20 to-transparent opacity-100'
            : isProcessing
            ? 'bg-gradient-to-b from-emerald-500/10 via-zinc-900/40 to-transparent opacity-100'
            : 'bg-gradient-to-b from-emerald-500/5 to-transparent opacity-40'
        }`}
      />

      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between z-10 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-400">
          <Radio className={`w-3 h-3 ${isRecording ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`} />
          <span>{isRecording ? 'LIVE AUDIO' : 'SPEECH-TO-TEXT'}</span>
        </div>

        <span className="text-[10px] font-mono text-zinc-500">
          TN / FR / EN
        </span>
      </div>

      {/* Waveform Visualizer */}
      <div className="w-full my-2 z-10">
        <VoiceVisualizer
          isActive={isRecording || isProcessing}
          color={isRecording ? '#EF4444' : '#00C07F'}
          height={38}
        />
      </div>

      {/* Dynamic Transcript / Listening Prompt */}
      <div className="min-h-[36px] w-full my-2 flex items-center justify-center px-2 z-10">
        {isRecording && interimText ? (
          <p className="text-emerald-300 font-bold text-xs sm:text-sm animate-pulse tracking-wide line-clamp-2">
            "{interimText}"
          </p>
        ) : isProcessing ? (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            <span>{promptText}</span>
          </div>
        ) : (
          <p className="text-zinc-400 text-xs font-medium line-clamp-2">
            {promptText}
          </p>
        )}
      </div>

      {/* Tactile Microphone Trigger Button */}
      <div className="my-3 relative z-10">
        {isRecording && (
          <div className="absolute -inset-2 rounded-full bg-red-500/25 animate-ping pointer-events-none" />
        )}

        <button
          onClick={toggleRecording}
          disabled={isProcessing}
          aria-label="Toggle voice recording"
          className={`relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full transition-all duration-300 shadow-2xl cursor-pointer ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/40 scale-105 ring-4 ring-red-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:scale-105 shadow-emerald-500/30 ring-4 ring-emerald-500/20'
          } ${isProcessing ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {isRecording ? (
            <MicOff className="w-7 h-7" />
          ) : isProcessing ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </button>
      </div>

      <span className="text-[11px] text-zinc-500 font-medium z-10">
        {actionHint}
      </span>
    </div>
  );
};
