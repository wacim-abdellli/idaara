'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import {
  Volume2,
  VolumeX,
  FileText,
  ExternalLink,
  Calculator,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Stamp,
  User,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { BrandIcon } from '../layout/BrandLogo';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectPrompt?: (prompt: string) => void;
}

/** Rich formatting for markdown blocks (bold, bullet points, headers, inline code) */
function renderFormattedContent(text: string): React.ReactNode {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-sm sm:text-[15px] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line spacer
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Section Headers (### or ## or #)
        if (trimmed.startsWith('#')) {
          const headerText = trimmed.replace(/^#+\s*/, '');
          return (
            <h4 key={idx} className="text-base sm:text-lg font-bold text-white tracking-tight pt-2 pb-0.5 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-emerald-400 inline-block shrink-0" />
              <span>{renderInlineStyles(headerText)}</span>
            </h4>
          );
        }

        // Numbered List (1. 2. 3.)
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 my-1">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                {numberedMatch[1]}
              </span>
              <span className="text-zinc-200 flex-1">
                {renderInlineStyles(numberedMatch[2])}
              </span>
            </div>
          );
        }

        // Bullet Point (- or * or •)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
          const bulletText = trimmed.replace(/^[-*•]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 my-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
              <span className="text-zinc-200 flex-1">
                {renderInlineStyles(bulletText)}
              </span>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="leading-relaxed text-zinc-200">
            {renderInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
}

/** Inline bold and code styling */
function renderInlineStyles(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-emerald-300 font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { locale } = useLocale();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const isAssistant = message.sender === 'assistant';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

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

  // ── USER MESSAGE BUBBLE (Modern ChatGPT / Claude style) ──
  if (!isAssistant) {
    return (
      <div className="w-full py-2.5 flex justify-end">
        <div className="max-w-[85%] sm:max-w-[75%] flex items-end gap-2.5 flex-row-reverse">
          <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shadow-md shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>

          <div className="space-y-1 text-right rtl:text-left">
            <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-zinc-900 border border-zinc-700/80 text-white text-sm sm:text-[15px] leading-relaxed shadow-lg shadow-black/40 inline-block text-left rtl:text-right">
              {message.content}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 px-1">
              {message.timestamp}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ASSISTANT MESSAGE (Full clean layout) ──
  return (
    <div className="w-full py-3.5 animate-fade-in">
      <div className="flex items-start gap-3 sm:gap-4">
        
        {/* Assistant Avatar */}
        <div className="shrink-0 pt-1">
          <BrandIcon size={30} />
        </div>

        {/* Message Content & Toolbars */}
        <div className="flex-1 min-w-0 space-y-3">
          
          {/* Header Metadata */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>Idaara AI</span>
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500 font-mono text-[11px]">
              {message.timestamp}
            </span>
          </div>

          {/* Formatted Text Body */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl rounded-tl-sm border border-zinc-800/90 bg-zinc-950/70 shadow-xl">
            {renderFormattedContent(message.content)}

            {/* Timbre Breakdown Docket */}
            {message.timbreBreakdown && (
              <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-zinc-900/90 border border-amber-500/30 shadow-md space-y-2">
                <div className="flex items-center justify-between font-bold text-amber-400 pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <Stamp className="w-4 h-4 text-amber-400" />
                    <span className="text-xs uppercase tracking-wider">
                      {locale === 'ar' ? 'المعاليم الجبائية والتنابر' : locale === 'en' ? 'Estimated Statutory Fees' : locale === 'fr' ? 'Frais et Timbres Légaux' : 'Majmou3 el Timbres'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold text-xs sm:text-sm tabular-nums border border-amber-500/30">
                    {message.timbreBreakdown.totalTND.toFixed(3)} DT
                  </span>
                </div>

                <ul className="space-y-1 text-xs text-zinc-300">
                  {message.timbreBreakdown.items.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between text-zinc-400">
                      <span className="text-zinc-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        <span>{item.label}</span>
                      </span>
                      <span className="font-mono text-zinc-200 tabular-nums">
                        {item.amount.toFixed(3)} DT
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Chips */}
            {message.actions && message.actions.length > 0 && (
              <div className="mt-3.5 pt-2 flex flex-wrap gap-2">
                {message.actions.map((action, idx) => {
                  const label = getLocalized(action.label, locale) || 'Voir';
                  return (
                    <Link
                      key={idx}
                      href={action.payload}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-emerald-500/10 border border-zinc-800 hover:border-emerald-500/40 text-zinc-200 hover:text-emerald-300 text-xs font-semibold transition-all shadow-sm group"
                    >
                      {action.type === 'pdf_form' && <FileText className="w-3.5 h-3.5 text-emerald-400" />}
                      {action.type === 'calculator_link' && <Calculator className="w-3.5 h-3.5 text-amber-400" />}
                      {action.type === 'office_link' && <MapPin className="w-3.5 h-3.5 text-blue-400" />}
                      {action.type === 'procedure_link' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{label}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Toolbar (Copy, TTS) */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Copy response"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">{locale === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{locale === 'ar' ? 'نسخ' : 'Copy'}</span>
                </>
              )}
            </button>

            <button
              onClick={speakMessage}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                  : 'text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800'
              }`}
              title="Read out loud"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{locale === 'ar' ? 'إيقاف' : 'Stop'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{locale === 'ar' ? 'استمع' : locale === 'fr' ? 'Écouter' : 'Listen'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
