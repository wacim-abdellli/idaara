'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { Volume2, VolumeX, FileText, ExternalLink, Calculator, MapPin, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

/** Renders **bold** markdown into JSX without any markdown library */
function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-zinc-100">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { locale } = useLocale();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isAssistant = message.sender === 'assistant';

  const speakMessage = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = locale === 'ar' ? 'ar-SA' : locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'ar-TN';
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} w-full my-3 animate-fade-in-up`}>
      <div className={`flex items-end gap-2 max-w-[88%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Avatar */}
        {isAssistant && (
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 mb-1 shadow-md shadow-emerald-500/20">
            <span className="text-xs">🏛️</span>
          </div>
        )}

        <div className="flex flex-col">
          {/* Sender label */}
          <span className={`text-[10px] font-semibold mb-1 px-1 ${isAssistant ? 'text-zinc-500' : 'text-right text-zinc-500'}`}>
            {isAssistant
              ? `Idaara AI · ${message.timestamp}`
              : `Mowaten 🇹🇳 · ${message.timestamp}`}
          </span>

          {/* Bubble */}
          <div
            className={`relative px-4 py-3 rounded-2xl text-[12px] sm:text-sm leading-relaxed ${
              isAssistant
                ? 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-tl-sm shadow-lg'
                : 'bg-emerald-600 text-white rounded-tr-sm shadow-lg shadow-emerald-900/40'
            }`}
          >
            {/* Content with markdown */}
            <div className="whitespace-pre-line space-y-0.5">
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'h-2' : undefined}>
                  {renderMarkdown(line)}
                </p>
              ))}
            </div>

            {/* Timbre breakdown */}
            {message.timbreBreakdown && (
              <div className="mt-4 p-3 rounded-xl bg-zinc-950/80 border border-amber-500/25 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-400 mb-2">
                  <span className="flex items-center space-x-1.5">
                    <span>🏷️</span>
                    <span>Majmou3 el Timbres :</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono tabular-nums">
                    {message.timbreBreakdown.totalTND.toFixed(3)} DT
                  </span>
                </div>
                <ul className="space-y-1 text-zinc-400">
                  {message.timbreBreakdown.items.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-300">• {item.label}</span>
                      <span className="font-mono tabular-nums">{item.amount.toFixed(3)} DT</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            {message.actions && message.actions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2">
                {message.actions.map((action, idx) => {
                  const label = getLocalized(action.label, locale) || 'Voir';
                  return (
                    <Link
                      key={idx}
                      href={action.payload}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500/40 text-zinc-200 hover:text-emerald-300 text-[11px] font-semibold transition-all"
                    >
                      {action.type === 'pdf_form' && <FileText className="w-3 h-3" />}
                      {action.type === 'calculator_link' && <Calculator className="w-3 h-3" />}
                      {action.type === 'office_link' && <MapPin className="w-3 h-3" />}
                      {action.type === 'procedure_link' && <CheckCircle2 className="w-3 h-3" />}
                      <span>{label}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* TTS Button */}
            {isAssistant && (
              <button
                onClick={speakMessage}
                className={`mt-3 flex items-center space-x-1.5 text-[11px] font-medium transition-colors px-2 py-1 rounded-lg ${
                  isPlayingAudio
                    ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                    : 'text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/8 border border-transparent hover:border-emerald-500/20'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3 h-3" />
                    <span>{locale === 'en' ? 'Stop audio' : '9oss el sout'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" />
                    <span>{locale === 'en' ? 'Listen' : 'Isma3 bel Derja'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
