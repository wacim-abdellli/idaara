'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { Volume2, VolumeX, FileText, ExternalLink, Calculator, MapPin, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

interface ChatMessageProps {
  message: ChatMessageType;
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
    utterance.lang = locale === 'ar' ? 'ar-SA' : locale === 'fr' ? 'fr-FR' : 'ar-TN';
    utterance.rate = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`flex flex-col ${
        isAssistant ? 'items-start' : 'items-end'
      } w-full my-3`}
    >
      <div className="flex items-center space-x-2 mb-1 px-1">
        <span className="text-[11px] font-semibold text-zinc-400">
          {isAssistant ? '🏛️ Idaara AI Copilot' : 'Mowaten 🇹🇳'}
        </span>
        <span className="text-[10px] text-zinc-600">{message.timestamp}</span>
      </div>

      <div
        className={`relative max-w-2xl p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
          isAssistant
            ? 'glass-panel text-zinc-100 border-zinc-800 rounded-tl-sm'
            : 'bg-emerald-600 text-white rounded-tr-sm shadow-emerald-950/40'
        }`}
      >
        {/* Content with linebreaks */}
        <div className="whitespace-pre-line">{message.content}</div>

        {/* Timbre breakdown badge if available */}
        {message.timbreBreakdown && (
          <div className="mt-4 p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-xs">
            <div className="flex items-center justify-between font-bold text-amber-400 mb-2">
              <span className="flex items-center space-x-1.5">
                <span>🏷️</span>
                <span>Majmou3 el Timbres wel Masarif:</span>
              </span>
              <span className="text-sm px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                {message.timbreBreakdown.totalTND.toFixed(3)} TND
              </span>
            </div>
            <ul className="space-y-1 text-zinc-300">
              {message.timbreBreakdown.items.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between text-[11px]">
                  <span>• {item.label}</span>
                  <span className="font-mono text-zinc-400">{item.amount.toFixed(3)} DT</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactive Action Buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2">
            {message.actions.map((action, idx) => {
              const label =
                action.label[locale] || action.label['derja'] || 'Voir détails';
              return (
                <Link
                  key={idx}
                  href={action.payload}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors duration-150"
                >
                  {action.type === 'pdf_form' && <FileText className="w-3.5 h-3.5" />}
                  {action.type === 'calculator_link' && <Calculator className="w-3.5 h-3.5" />}
                  {action.type === 'office_link' && <MapPin className="w-3.5 h-3.5" />}
                  {action.type === 'procedure_link' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{label}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </Link>
              );
            })}
          </div>
        )}

        {/* Audio TTS button for assistant */}
        {isAssistant && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={speakMessage}
              className="flex items-center space-x-1 text-[11px] text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-red-400">9oss el sout</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Isma3 bel Derja</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
