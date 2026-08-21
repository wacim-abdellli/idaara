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
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectPrompt?: (prompt: string) => void;
}

/** Rich formatting for markdown blocks (bold, bullet points, headers, inline code) */
function renderFormattedContent(text: string): React.ReactNode {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-[15px] sm:text-base leading-relaxed text-zinc-100 font-normal">
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
            <h4 key={idx} className="text-base sm:text-lg font-bold text-white tracking-tight pt-2.5 pb-0.5 flex items-center gap-2">
              <span className="w-1 h-3.5 rounded-full bg-emerald-400 inline-block shrink-0" />
              <span>{renderInlineStyles(headerText)}</span>
            </h4>
          );
        }

        // Numbered List (1. 2. 3.)
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 my-1">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-emerald-400 text-xs font-mono font-bold shrink-0 mt-0.5">
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2.5" />
              <span className="text-zinc-200 flex-1">
                {renderInlineStyles(bulletText)}
              </span>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="leading-relaxed">
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
        <code key={i} className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-300 font-mono text-xs">
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

  // ── USER MESSAGE BUBBLE (Exact ChatGPT style: right-aligned clean pill) ──
  if (!isAssistant) {
    return (
      <div className="w-full py-2 flex justify-end">
        <div className="max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-3xl bg-[#2f2f2f] text-white text-sm sm:text-[15px] leading-relaxed shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  // ── ASSISTANT MESSAGE (Exact ChatGPT style: direct clean canvas layout) ──
  return (
    <div className="w-full py-3 space-y-3">
      {/* Content directly on canvas */}
      <div className="prose-chat text-zinc-100">
        {renderFormattedContent(message.content)}
      </div>

      {/* Timbre Breakdown Docket (if any) */}
      {message.timbreBreakdown && (
        <div className="mt-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-amber-500/25 space-y-2 max-w-lg">
          <div className="flex items-center justify-between font-bold text-amber-400 pb-1.5 border-b border-zinc-800 text-xs">
            <div className="flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-amber-400" />
              <span>{locale === 'ar' ? 'المعاليم الجبائية والتنابر' : 'Statutory Stamp Fees'}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold tabular-nums">
              {message.timbreBreakdown.totalTND.toFixed(3)} DT
            </span>
          </div>

          <ul className="space-y-1 text-xs text-zinc-300">
            {message.timbreBreakdown.items.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between text-zinc-400">
                <span className="text-zinc-300">• {item.label}</span>
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
        <div className="flex flex-wrap gap-2 pt-1">
          {message.actions.map((action, idx) => {
            const label = getLocalized(action.label, locale) || 'Voir';
            return (
              <Link
                key={idx}
                href={action.payload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-emerald-300 text-xs font-semibold transition-all shadow-sm group"
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

      {/* ChatGPT-style Icon Toolbar (Copy, Listen) */}
      <div className="flex items-center gap-2 pt-1 text-zinc-500">
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-lg hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          title="Copy"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>

        <button
          onClick={speakMessage}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            isPlayingAudio
              ? 'text-red-400 bg-red-500/10'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
          }`}
          title="Read out loud"
        >
          {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
