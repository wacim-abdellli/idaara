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
  Lightbulb,
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
    .replace(/\|[^|\n]+\|/g, '')
    .replace(/^[-•*]\s+/gm, '')
    .replace(/\n+/g, '. ')
    .trim();
}

/** Inline bold, links, code, DT currency tokens, and isolated Latin/URL tokens */
function renderInlineStyles(text: string): React.ReactNode {
  // Regex matches:
  // 1. Markdown links: [Title](url)
  // 2. Bold text: **text**
  // 3. Code: `code`
  // 4. Raw URLs: https://... or www.... or *.tn / *.gov.tn / *.edu.tn / *.com / *.org
  // 5. Currency amounts: 80 DT, 25 د.ت, 145 TND
  // 6. Latin Acronyms: CIN, B3, CAPES, ATTT, JORT, PDF, STEG, SONEDE, CNSS, CNAM, SMS, RNE
  const tokenRegex = /(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s<]+|www\.[a-zA-Z0-9.\-_/]+|[a-zA-Z0-9.-]+\.(?:tn|gov\.tn|edu\.tn|com|org|net)(?:\/[^\s<]*)?|\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت|دينار)\b|\b[A-Z0-9]{2,}\b)/gi;

  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // 1. Markdown link [Title](URL)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+|www\.[^\s)]+|[^\s)]+)\)$/);
    if (mdLinkMatch) {
      const url = mdLinkMatch[2].startsWith('http') ? mdLinkMatch[2] : `https://${mdLinkMatch[2]}`;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold hover:underline transition-colors align-baseline"
        >
          <span>{mdLinkMatch[1]}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }

    // 2. Bold **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white tracking-wide">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // 3. Code `text`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-white/10 text-emerald-300 font-mono text-xs" dir="ltr">
          {part.slice(1, -1)}
        </code>
      );
    }

    // 4. Raw URLs (e.g. www.concours.gov.tn, edunet.tn, b3.interieur.gov.tn)
    if (/^(?:https?:\/\/|www\.|[a-zA-Z0-9.-]+\.(?:tn|gov\.tn|edu\.tn|com|org|net))/i.test(part)) {
      const url = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold hover:underline transition-colors align-baseline"
        >
          <span className="truncate max-w-[200px]">{part.replace(/^https?:\/\//, '')}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }

    // 5. Currency amounts (e.g. 80 DT, 25 د.ت, 145 DT)
    if (/\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت|دينار)\b/i.test(part)) {
      return (
        <span key={i} className="inline-block px-2 py-0.5 mx-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs shadow-inner align-baseline" dir="ltr">
          {part}
        </span>
      );
    }

    // 6. Latin Acronyms (e.g. CIN, B3, CAPES, ATTT, JORT, PDF)
    if (/^[A-Z0-9]{2,}$/.test(part)) {
      return (
        <span key={i} className="inline-block px-1.5 py-0.5 mx-1 rounded-md bg-zinc-800/90 border border-white/10 text-emerald-300 font-mono font-bold text-xs shadow-sm align-baseline" dir="ltr">
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

/** Modern, Clean Markdown & Civic Element Parser (ChatGPT/Claude Grade) */
function renderFormattedContent(text: string): React.ReactNode {
  // 1. Sanitize any thinking or chain-of-thought blocks
  let cleanText = text.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
  cleanText = cleanText.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();

  // 2. Accurate script direction detection
  const arabicCount = (cleanText.match(/[\u0600-\u06FF]/g) || []).length;
  const latinCount = (cleanText.match(/[a-zA-Z]/g) || []).length;
  const isMessageRTL = arabicCount > latinCount && arabicCount > 5;

  const rawLines = cleanText.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i].trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Horizontal divider
    if (line === '---' || line === '***' || line === '___') {
      blocks.push(<hr key={`hr-${i}`} className="border-t border-white/10 my-4" />);
      i++;
      continue;
    }

    const lineArabicCount = (line.match(/[\u0600-\u06FF]/g) || []).length;
    const lineLatinCount = (line.match(/[a-zA-Z]/g) || []).length;
    const isLineRTL = lineArabicCount > lineLatinCount && lineArabicCount > 2;

    const lineDir = isLineRTL ? 'rtl' : isMessageRTL ? 'rtl' : 'ltr';
    const lineAlign = isLineRTL ? 'text-right' : isMessageRTL ? 'text-right' : 'text-left';

    // 1. Markdown Table Detection
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('|') && rawLines[i].trim().endsWith('|')) {
        tableLines.push(rawLines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((row) =>
          row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim())
        );

        blocks.push(
          <div key={`table-${i}`} dir={lineDir} className="my-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#161618] shadow-lg">
            <table className={`w-full text-xs sm:text-sm ${lineAlign}`}>
              <thead className="bg-white/5 border-b border-white/10 font-bold text-white">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-semibold">
                      {renderInlineStyles(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5">
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

    // 2. Summary Card: 📌 **الخلاصة**...
    if (/^(?:###|##|#)?\s*📌/.test(line)) {
      const summaryText = line.replace(/^(?:###|##|#)?\s*📌\s*:?\s*/, '');
      blocks.push(
        <div
          key={`summary-${i}`}
          dir={lineDir}
          className={`p-3.5 my-2.5 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-100 flex items-start gap-3 shadow-sm ${lineAlign}`}
        >
          <span className="text-lg shrink-0 mt-0.5">📌</span>
          <div className="flex-1 leading-relaxed text-zinc-100 font-medium text-sm sm:text-[15px]">
            {renderInlineStyles(summaryText)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 3. Tip / Pro-Advice Callout: > 💡 or 💡 **نصيحة...
    if (/^(?:>|###|##|#)?\s*💡/.test(line)) {
      const tipText = line.replace(/^(?:>|###|##|#)?\s*💡\s*:?\s*/, '');
      blocks.push(
        <div
          key={`tip-${i}`}
          dir={lineDir}
          className={`p-3.5 my-3 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20 border-s-4 border-s-amber-400 flex items-start gap-3 shadow-sm ${lineAlign}`}
        >
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm sm:text-[14.5px] leading-relaxed text-amber-100/90 font-medium">
            {renderInlineStyles(tipText)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 4. Section Headers (### or ## or # or bold category line like 📑 **الأوراق المطلوبة**)
    if (line.startsWith('#') || /^(\*{2})?(📑|🎯|💰|🏛️|📍|📋|✅|🔑)/.test(line)) {
      const headerText = line.replace(/^#+\s*/, '');
      blocks.push(
        <div key={`h-${i}`} dir={lineDir} className={`pt-4 pb-1.5 mb-1.5 flex items-center gap-2 border-b border-white/[0.06] ${lineAlign}`}>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
            <span>{renderInlineStyles(headerText)}</span>
          </h4>
        </div>
      );
      i++;
      continue;
    }

    // 5. Numbered List (1. 2. 3.)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      blocks.push(
        <div key={`num-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-1.5 ${lineAlign}`}>
          <span className="flex items-center justify-center min-w-[22px] h-[22px] rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold shrink-0 mt-0.5">
            {numberedMatch[1]}
          </span>
          <span className="text-zinc-200 flex-1 leading-relaxed text-sm sm:text-[15px]">
            {renderInlineStyles(numberedMatch[2])}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 6. Bullet Points (- or * or •)
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      const bulletText = line.replace(/^[-*•]\s+/, '');
      blocks.push(
        <div key={`bullet-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-1.5 ${lineAlign}`}>
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-1 text-[10px] font-bold">
            ✓
          </span>
          <span className="text-zinc-200 flex-1 leading-relaxed text-sm sm:text-[15px]">
            {renderInlineStyles(bulletText)}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 7. Normal paragraph
    blocks.push(
      <p key={`p-${i}`} dir={lineDir} className={`leading-relaxed text-zinc-200 ${lineAlign} font-normal my-1.5 text-sm sm:text-[15px]`}>
        {renderInlineStyles(line)}
      </p>
    );
    i++;
  }

  return (
    <div
      dir={isMessageRTL ? 'rtl' : 'ltr'}
      className={`space-y-1 text-sm sm:text-[15px] leading-relaxed text-zinc-100 font-normal ${
        isMessageRTL ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
      }`}
    >
      {blocks}
    </div>
  );
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

    window.speechSynthesis.cancel();

    const cleanSpeech = cleanTextForSpeech(message.content);
    if (!cleanSpeech) return;

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    const voices = window.speechSynthesis.getVoices();

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

  // ── USER MESSAGE BUBBLE ──
  if (!isAssistant) {
    return (
      <div className="w-full py-2 flex flex-col items-end group">
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-3xl bg-[#26282e] hover:bg-[#2c2f36] border border-white/[0.04] text-white text-sm sm:text-[15px] leading-relaxed shadow-sm transition-colors ${
            isArabicScript ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
          }`}
        >
          {message.content}
        </div>

        <div className="flex items-center gap-1.5 pt-1 pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer border-0 outline-none flex items-center gap-1 text-[11px]"
            title={locale === 'ar' ? 'نسخ الرسالة' : locale === 'fr' ? 'Copier' : 'Copy'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">{locale === 'ar' ? 'تم النسخ' : 'Copié'}</span>
              </>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── ASSISTANT MESSAGE ──
  return (
    <div
      dir={isArabicScript ? 'rtl' : 'ltr'}
      className={`w-full py-3 space-y-3 ${isArabicScript ? 'text-right' : 'text-left'}`}
    >
      <div
        style={{ unicodeBidi: 'plaintext' }}
        className={`prose-chat text-zinc-100 ${isArabicScript ? 'font-["Cairo",sans-serif]' : ''}`}
      >
        {renderFormattedContent(message.content)}
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-emerald-400/90 ml-1.5 rounded-xs animate-pulse align-middle" />
        )}
      </div>

      {/* Timbre Breakdown Docket (if any) */}
      {!message.isStreaming && message.timbreBreakdown && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#1a1a1d] border border-amber-500/25 space-y-2 max-w-lg shadow-lg animate-fade-in">
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
      {!message.isStreaming && message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 animate-fade-in">
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
      {!message.isStreaming && message.content && (
        <div className="flex items-center gap-2 pt-1 text-zinc-500 animate-fade-in">
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
      )}
    </div>
  );
};
