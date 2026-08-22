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

/** Clean speech string removing markdown symbols and tables for natural TTS reading */
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/[#*`_~]/g, '')
    .replace(/\|[^|\n]+\|/g, '') // remove markdown table lines
    .replace(/^[-•*]\s+/gm, '')
    .replace(/\n+/g, '. ')
    .trim();
}

/** Full Markdown & Table Parser for Chat Messages with High-End Civic Card Styling */
function renderFormattedContent(text: string): React.ReactNode {
  // 1. Sanitize any thinking or chain-of-thought blocks
  let cleanText = text.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
  cleanText = cleanText.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();

  // 2. Accurate script direction detection: only RTL if Arabic letters significantly exceed Latin letters
  const arabicCount = (cleanText.match(/[\u0600-\u06FF]/g) || []).length;
  const latinCount = (cleanText.match(/[a-zA-Z]/g) || []).length;
  const isMessageRTL = arabicCount > latinCount && arabicCount > 10;

  const rawLines = cleanText.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i].trim();

    // 1. Skip empty lines with a clean spacer
    if (!line) {
      blocks.push(<div key={`spacer-${i}`} className="h-2" />);
      i++;
      continue;
    }

    // 2. Horizontal divider (--- or ***)
    if (line === '---' || line === '***' || line === '___') {
      blocks.push(<hr key={`hr-${i}`} className="border-t border-white/10 my-3" />);
      i++;
      continue;
    }

    const lineArabicCount = (line.match(/[\u0600-\u06FF]/g) || []).length;
    const lineLatinCount = (line.match(/[a-zA-Z]/g) || []).length;
    const isLineRTL = lineArabicCount > lineLatinCount && lineArabicCount > 3;

    const lineDir = isLineRTL ? 'rtl' : isMessageRTL ? 'rtl' : 'ltr';
    const lineAlign = isLineRTL ? 'text-right' : isMessageRTL ? 'text-right' : 'text-left';

    // 3. Markdown Table Detection (| Header 1 | Header 2 |)
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('|') && rawLines[i].trim().endsWith('|')) {
        tableLines.push(rawLines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim());
        // line 1 is separator (|---|---|)
        const bodyRows = tableLines.slice(2).map((row) =>
          row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim())
        );

        blocks.push(
          <div key={`table-${i}`} dir={lineDir} className="my-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#161618] shadow-md">
            <table className={`w-full text-xs sm:text-sm ${lineAlign}`}>
              <thead className="bg-white/5 border-b border-white/10 font-bold text-white">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-3.5 py-2.5 font-semibold">
                      {renderInlineStyles(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2">
                        {renderInlineStyles(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 4. Section Headers (### or ## or #)
    if (line.startsWith('#')) {
      const headerText = line.replace(/^#+\s*/, '');
      blocks.push(
        <h4 key={`h-${i}`} dir={lineDir} className={`text-base sm:text-lg font-bold text-white tracking-tight pt-3 pb-1 flex items-center gap-2 ${lineAlign}`}>
          <span className="w-1.5 h-4 rounded-full bg-emerald-400 inline-block shrink-0" />
          <span>{renderInlineStyles(headerText)}</span>
        </h4>
      );
      i++;
      continue;
    }

    // 5. Bold Title / Category Lines (e.g. **Awra9 el Matlouba:** or **1. Direct Answer:**)
    const boldHeaderMatch = line.match(/^\*\*([^*]+)\*\*:?(.*)$/);
    if (boldHeaderMatch) {
      const title = boldHeaderMatch[1];
      const rest = boldHeaderMatch[2]?.trim();

      blocks.push(
        <div key={`bh-${i}`} dir={lineDir} className={`pt-2.5 pb-1 ${lineAlign}`}>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-bold text-xs sm:text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <span>{title}</span>
          </div>
          {rest && (
            <p className="mt-1.5 text-zinc-200 leading-relaxed pl-1">
              {renderInlineStyles(rest)}
            </p>
          )}
        </div>
      );
      i++;
      continue;
    }

    // 6. Numbered List (1. 2. 3.)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      blocks.push(
        <div key={`num-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-1.5 ${lineAlign}`}>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold shrink-0 mt-0.5">
            {numberedMatch[1]}
          </span>
          <span className="text-zinc-200 flex-1 leading-relaxed">
            {renderInlineStyles(numberedMatch[2])}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 7. Bullet Points (- or * or •)
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      const bulletText = line.replace(/^[-*•]\s+/, '');
      blocks.push(
        <div key={`bullet-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-1.5 ${lineAlign}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2.5" />
          <span className="text-zinc-200 flex-1 leading-relaxed">
            {renderInlineStyles(bulletText)}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 8. Normal paragraph
    blocks.push(
      <p key={`p-${i}`} dir={lineDir} className={`leading-relaxed text-zinc-200 ${lineAlign} font-normal`}>
        {renderInlineStyles(line)}
      </p>
    );
    i++;
  }

  return (
    <div
      dir={isMessageRTL ? 'rtl' : 'ltr'}
      className={`space-y-2 text-[15px] sm:text-base leading-relaxed text-zinc-100 font-normal ${
        isMessageRTL ? 'text-right' : 'text-left'
      }`}
    >
      {blocks}
    </div>
  );
}

/** Inline bold, code, DT currency tokens, and keyword styling */
function renderInlineStyles(text: string): React.ReactNode {
  // Matches bold **text**, code `text`, and DT amounts (e.g. 80 DT, 145 DT, 7.500 DT)
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت)\b)/gi);
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
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-white/10 text-emerald-300 font-mono text-xs" dir="ltr">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (/\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت)\b/i.test(part)) {
      return (
        <span key={i} className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs" dir="ltr">
          {part}
        </span>
      );
    }
    return part;
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { locale } = useLocale();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const isAssistant = message.sender === 'assistant';
  const arabicChars = (message.content.match(/[\u0600-\u06FF]/g) || []).length;
  const latinChars = (message.content.match(/[a-zA-Z]/g) || []).length;
  const isArabicScript = arabicChars > latinChars && arabicChars > 5;

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

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const cleanSpeech = cleanTextForSpeech(message.content);
    if (!cleanSpeech) return;

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    const voices = window.speechSynthesis.getVoices();

    // Select the best voice
    let selectedVoice: SpeechSynthesisVoice | null = null;
    if (isArabicScript || locale === 'ar') {
      selectedVoice =
        voices.find((v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic')) || null;
      utterance.lang = 'ar-SA';
    } else if (locale === 'fr') {
      selectedVoice =
        voices.find((v) => v.lang.startsWith('fr') || v.name.toLowerCase().includes('french')) || null;
      utterance.lang = 'fr-FR';
    } else {
      // For Derja Arabizi or English, French / English voices read Arabizi and administrative terms clearly
      selectedVoice =
        voices.find((v) => v.lang.startsWith('fr')) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0] ||
        null;
      utterance.lang = selectedVoice ? selectedVoice.lang : 'fr-FR';
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // ── USER MESSAGE BUBBLE (Clean right-aligned ChatGPT pill) ──
  if (!isAssistant) {
    return (
      <div className="w-full py-2 flex justify-end">
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-3xl bg-[#2f2f2f] text-white text-sm sm:text-[15px] leading-relaxed shadow-sm ${
            isArabicScript ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
          }`}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // ── ASSISTANT MESSAGE (Clean spacious canvas layout) ──
  return (
    <div
      dir={isArabicScript ? 'rtl' : 'ltr'}
      className={`w-full py-3 space-y-3 ${isArabicScript ? 'text-right' : 'text-left'}`}
    >
      {/* Content directly on canvas with rich markdown & table rendering */}
      <div className={`prose-chat text-zinc-100 ${isArabicScript ? 'font-["Cairo",sans-serif]' : ''}`}>
        {renderFormattedContent(message.content)}
      </div>

      {/* Timbre Breakdown Docket (if any) */}
      {message.timbreBreakdown && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#1a1a1d] border border-amber-500/25 space-y-2 max-w-lg shadow-lg">
          <div className="flex items-center justify-between font-bold text-amber-400 pb-1.5 border-b border-white/10 text-xs">
            <div className="flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {locale === 'ar'
                  ? 'المعاليم الجبائية والتنابر'
                  : locale === 'derja'
                  ? 'El Masrouf wel Timbres'
                  : locale === 'fr'
                  ? 'Frais et Timbres Fiscaux'
                  : 'Statutory Stamp Fees'}
              </span>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#212121] hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-emerald-300 text-xs font-semibold transition-all shadow-sm group"
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
          className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer border-0 outline-none"
          title={locale === 'ar' ? 'نسخ النص' : locale === 'fr' ? 'Copier' : 'Copy'}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>

        <button
          onClick={speakMessage}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer border-0 outline-none ${
            isPlayingAudio
              ? 'text-red-400 bg-red-500/10'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
          }`}
          title={locale === 'ar' ? 'استماع بالصوت' : locale === 'fr' ? 'Écouter' : 'Read out loud'}
        >
          {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
