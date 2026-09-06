'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  ExternalLink,
  Lightbulb,
  FileText,
  Calculator,
  MapPin,
  CheckCircle2,
  Stamp,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { useLocale } from '../../context/LocaleContext';
import { getLocalized } from '../../lib/locale-utils';
import { IdaaraCrest } from './IdaaraCrest';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectPrompt?: (prompt: string) => void;
}

/** Parses markdown links, bold text, acronyms, and civic tags */
function renderInlineStyles(text: string): React.ReactNode {
  // Regex to split by markdown links, bold markers, backticks, raw URLs, currency amounts, Latin parentheticals, and acronyms
  const tokenRegex = /(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`|(?:https?:\/\/|www\.)[^\s)]+|\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت|دينار)\b|\([a-zA-Z0-9\s/&'.,_-]+\)|\b(?:CIN|B3|CAPES|ATTT|STEG|SONEDE|CNSS|CNAM|RNE|JORT|PDF|COC|FCR|RIB|TND|DT|Transtu|SNCFT|SRT)\b)/g;

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
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-medium break-all"
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
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-white/10 text-emerald-300 font-mono text-xs inline-block" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
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
          style={{ unicodeBidi: 'isolate' }}
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold hover:underline transition-colors align-baseline"
        >
          <span className="truncate max-w-[200px]">{part.replace(/^https?:\/\//, '')}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }

    // 5. Currency amounts (e.g. 80 DT, 25 د.ت, 145 DT, 3 د.ت)
    if (/\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت|دينار)\b/i.test(part)) {
      return (
        <span key={i} className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs shadow-inner align-baseline" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    // 6. Parenthetical Latin text: (Abonnement Scolaire / Universitaire) or (Transtu) - Prevents RTL BiDi colon inversion
    if (/^\([a-zA-Z0-9\s/&'.,_-]+\)$/.test(part)) {
      return (
        <span key={i} className="inline-block mx-1 font-semibold text-emerald-300/95" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    // 7. Latin Acronyms & Official Transports (e.g. CIN, B3, Transtu, SNCFT)
    if (/^(?:CIN|B3|CAPES|ATTT|STEG|SONEDE|CNSS|CNAM|RNE|JORT|PDF|COC|FCR|RIB|TND|DT|Transtu|SNCFT|SRT)$/i.test(part)) {
      return (
        <span key={i} className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-zinc-800/90 border border-white/10 text-emerald-300 font-mono font-bold text-xs shadow-sm align-baseline" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

/** Modern, Clean Markdown & Civic Element Parser (Bespoke Idaara Civic Grade) */
function renderFormattedContent(text: string, locale: string = 'derja', isRTLOverride?: boolean): React.ReactNode {
  // 1. Sanitize any thinking or chain-of-thought blocks
  let cleanText = text.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
  cleanText = cleanText.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();

  // 1b. Fix trailing colons after Latin or parentheses in RTL so they don't flip backwards
  cleanText = cleanText.replace(/([a-zA-Z0-9)])\s*:\s*$/gm, '$1\u200F:');
  cleanText = cleanText.replace(/([a-zA-Z0-9)])\s*:\s+/g, '$1\u200F: ');

  // 2. Accurate script direction detection
  const isMessageRTL = isRTLOverride !== undefined
    ? isRTLOverride
    : ((cleanText.match(/[\u0600-\u06FF]/g) || []).length > (cleanText.match(/[a-zA-Z]/g) || []).length);

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
      const summaryHeader = line
        .replace(/^(?:###|##|#)?\s*📌\s*:?\s*/, '')
        .replace(/^\*{1,2}[^*:]*(?:الخلاصة|Résumé|Summary)[^*:]*\*{1,2}\s*:?\s*/i, '')
        .replace(/\*{2}/g, '')
        .trim();
      i++;
      
      const summaryItems: string[] = [];
      // Capture bullet items right after 📌:
      while (i < rawLines.length) {
        const nextLine = rawLines[i].trim();
        if (!nextLine) {
          i++;
          continue;
        }
        if (nextLine.startsWith('#') || /^(\*{2})?(📑|🎯|💰|🏛️|📍|📋|✅|🔑|>|💡)/.test(nextLine) || nextLine.match(/^\d+\.\s+/)) {
          break;
        }
        if (nextLine.startsWith('- ') || nextLine.startsWith('* ') || nextLine.startsWith('• ') || nextLine.startsWith('✔ ') || nextLine.startsWith('✓ ')) {
          summaryItems.push(nextLine.replace(/^[-*•✔✓]\s+/, ''));
          i++;
        } else if (summaryItems.length === 0 && (!summaryHeader || summaryHeader === 'الخلاصة')) {
          summaryItems.push(nextLine);
          i++;
        } else {
          break;
        }
      }

      const summaryLabel = isMessageRTL
        ? 'الخلاصة الإدارية'
        : (locale === 'fr' ? 'Résumé administratif' : 'Administrative Summary');

      blocks.push(
        <div
          key={`summary-${i}`}
          dir={lineDir}
          className={`my-3 p-3.5 sm:p-4 rounded-2xl bg-[#141619] border border-white/[0.08] shadow-sm max-w-2xl ${lineAlign}`}
        >
          <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-white/[0.06] text-xs font-semibold text-emerald-400">
            <span className="text-sm">📌</span>
            <span>{summaryLabel}</span>
          </div>

          {summaryItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {summaryItems.map((item, sIdx) => {
                const kvMatch = item.match(/^(\*{0,2}[^*:]+\*{0,2})\s*:\s*(.+)$/);
                if (kvMatch) {
                  const label = kvMatch[1].replace(/\*{2}/g, '').trim();
                  const val = kvMatch[2].trim();
                  return (
                    <div
                      key={sIdx}
                      className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors flex flex-col justify-between gap-1"
                    >
                      <span className="text-[11px] font-medium text-zinc-400">{label}</span>
                      <span className="text-xs sm:text-[13px] font-semibold text-zinc-100 leading-snug">{renderInlineStyles(val)}</span>
                    </div>
                  );
                }
                return (
                  <div
                    key={sIdx}
                    className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-1"
                  >
                    <div className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed">
                      {renderInlineStyles(item)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {renderInlineStyles(summaryHeader)}
            </div>
          )}
        </div>
      );
      continue;
    }

    // 3. Tip / Pro-Advice Callout: > 💡 or 💡 **نصيحة...
    if (/^(?:>|###|##|#)?\s*💡/.test(line) || /^>+\s*\*{0,2}💡/.test(line) || line.startsWith('💡')) {
      let tipBody = line
        .replace(/^(?:>|###|##|#)?\s*💡\s*:?\s*/, '')
        .replace(/^>+\s*/, '')
        .replace(/^\*{0,2}(?:نصيحة|ملاحظة|إرشاد|تنبيه|معلومة|Conseil|Astuce|Remarque|Tip|Note|Pro-?Tip)(?:\s+[^*:]+)?\*{0,2}\s*:?\s*/i, '')
        .replace(/^(?:نصيحة|ملاحظة|إرشاد|تنبيه|Conseil|Astuce|Tip|Note)\s*[^:]*:\s*/i, '')
        .trim();

      i++;

      // If tipBody is on following lines:
      while (i < rawLines.length) {
        const nextLine = rawLines[i].trim();
        if (!nextLine) {
          i++;
          continue;
        }
        // Stop if next line is a new section or header
        if (
          nextLine.startsWith('#') ||
          /^(\*{2})?(📑|🎯|💰|🏛️|📍|📋|✅|🔑|📌|💡)/.test(nextLine) ||
          nextLine.match(/^\d+\.\s+/) ||
          nextLine.startsWith('---')
        ) {
          break;
        }
        const cleaned = nextLine
          .replace(/^>\s*/, '')
          .replace(/^\*{0,2}(?:نصيحة|ملاحظة|إرشاد|تنبيه|معلومة|Conseil|Astuce|Remarque|Tip|Note|Pro-?Tip)(?:\s+[^*:]+)?\*{0,2}\s*:?\s*/i, '')
          .trim();
        tipBody += (tipBody ? ' ' : '') + cleaned;
        i++;
      }

      // Strip dangling ** markers from tipBody
      tipBody = tipBody.replace(/^\*{1,2}/, '').replace(/\*{1,2}$/, '').trim();

      if (tipBody) {
        blocks.push(
          <div
            key={`tip-${i}`}
            dir={lineDir}
            className={`my-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-amber-500/20 flex items-start gap-3 max-w-2xl ${lineAlign}`}
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-xs font-semibold text-amber-300/90">
                {isMessageRTL ? 'نصيحة عملية' : (locale === 'fr' ? 'Conseil pratique' : 'Pro Tip')}
              </div>
              <div className="text-xs sm:text-[14px] leading-relaxed text-zinc-300">
                {renderInlineStyles(tipBody)}
              </div>
            </div>
          </div>
        );
      }
      continue;
    }

    // 4. Section Headers (### or ## or # or bold category line like 📑 **الأوراق المطلوبة**)
    if (line.startsWith('#') || /^(\*{2})?(📑|🎯|💰|🏛️|📍|📋|✅|🔑)/.test(line)) {
      const headerText = line.replace(/^#+\s*/, '');
      blocks.push(
        <div key={`h-${i}`} dir={lineDir} className={`pt-4 pb-2 mb-2 flex items-center gap-2 border-b border-white/[0.08] ${lineAlign}`}>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
            {renderInlineStyles(headerText)}
          </h4>
        </div>
      );
      i++;
      continue;
    }

    // 5. Numbered List (1. 2. 3.) -> Main Step Items
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      const isHeaderLike = numberedMatch[2].endsWith(':') || numberedMatch[2].length <= 50;
      blocks.push(
        <div key={`num-${i}`} dir={lineDir} className={`flex items-start gap-3 ${isHeaderLike ? 'pt-3 pb-1 my-1.5' : 'my-2'} ${lineAlign}`}>
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className={`inline-flex items-center justify-center text-center rounded-lg font-bold leading-none shrink-0 select-none shadow-sm ${
              isHeaderLike
                ? 'w-6 h-6 bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-xs mt-0.5'
                : 'w-5 h-5 bg-zinc-800 border border-white/10 text-zinc-300 text-[11px] mt-1'
            }`}
          >
            {numberedMatch[1]}
          </span>
          <span className={`flex-1 leading-relaxed ${isHeaderLike ? 'text-white font-bold text-sm sm:text-[15.5px]' : 'text-zinc-100 text-sm sm:text-[14.5px]'}`}>
            {renderInlineStyles(numberedMatch[2])}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 6. Sub-Bullet Points (- or * or •) -> Indented under steps
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ') || line.startsWith('✔ ') || line.startsWith('✓ ')) {
      const isCheck = line.startsWith('✔ ') || line.startsWith('✓ ') || line.includes('✅');
      const bulletText = line.replace(/^[-*•✔✓✅]\s+/, '');
      blocks.push(
        <div key={`bullet-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-1.5 ms-6 sm:ms-8 ${lineAlign}`}>
          {isCheck ? (
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="inline-flex items-center justify-center text-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-1 text-[10px] font-bold leading-none select-none"
            >
              ✓
            </span>
          ) : (
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0 mt-2.5"
            />
          )}
          <span className="text-zinc-200 flex-1 leading-relaxed text-xs sm:text-[14px]">
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
  const [copied, setCopied] = useState(false);

  const copyLabels: Record<string, string> = {
    ar: 'تم النسخ ✓',
    derja: 'Tnsaḥ ✓',
    fr: 'Copié ✓',
    en: 'Copied ✓',
  };

  const copyTitleLabels: Record<string, string> = {
    ar: 'نسخ',
    derja: 'Kopi',
    fr: 'Copier',
    en: 'Copy',
  };

  const isAssistant = message.sender === 'assistant';
  const isArabicScript = useMemo(() => {
    const arabicChars = (message.content.match(/[\u0600-\u06FF]/g) || []).length;
    const latinChars = (message.content.match(/[a-zA-Z]/g) || []).length;
    return arabicChars > latinChars && arabicChars > 3;
  }, [message.content]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  // ── USER MESSAGE BUBBLE (Obsidian Glass) ──
  if (!isAssistant) {
    return (
      <div className="w-full py-2 flex flex-col items-end group">
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl bg-[#222429] hover:bg-[#272930] border border-white/[0.06] text-zinc-100 text-sm sm:text-[15px] leading-relaxed shadow-xs transition-colors ${
            isArabicScript ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
          }`}
        >
          {message.content}
        </div>

        <div className="flex items-center gap-1.5 pt-1 px-1 text-[11px] text-zinc-500 font-mono select-none opacity-0 group-hover:opacity-100 transition-opacity">
          {message.timestamp && <span>{message.timestamp}</span>}
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-md hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer border-0 outline-none flex items-center gap-1 text-[11px]"
            title={copyTitleLabels[locale] ?? 'Copy'}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">{copyLabels[locale] ?? 'Copied ✓'}</span>
              </>
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── ASSISTANT MESSAGE (Bespoke Idaara Civic) ──
  return (
    <div
      dir={isArabicScript ? 'rtl' : 'ltr'}
      className={`w-full py-3 space-y-2.5 group ${isArabicScript ? 'text-right' : 'text-left'}`}
    >
      {/* Bespoke Idaara Civic Assistant Header */}
      <div className="flex items-center gap-2 pb-0.5 select-none">
        <IdaaraCrest size={20} />
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-[#f4f4f5] tracking-tight">Idaara</span>
          <span className="text-[10px] text-emerald-400/80 font-mono bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">JORT {new Date().getFullYear()}</span>
        </div>
      </div>

      <div
        style={{ unicodeBidi: 'plaintext' }}
        className={`prose-chat text-zinc-200 ${isArabicScript ? 'font-["Cairo",sans-serif]' : ''}`}
      >
        {renderFormattedContent(message.content, locale, isArabicScript)}
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-emerald-400/90 ms-1 rounded-[1px] animate-pulse align-middle" />
        )}
      </div>

      {/* Timbre Breakdown Docket (if any) */}
      {!message.isStreaming && message.timbreBreakdown && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#141619] border border-amber-500/20 space-y-2 max-w-lg shadow-sm animate-fade-in">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-emerald-300 text-xs font-semibold transition-all shadow-xs group"
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

      {/* Bespoke Idaara Clean Action Toolbar */}
      {!message.isStreaming && message.content && (
        <div className="flex items-center gap-1.5 pt-1 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in select-none">
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-white/5 hover:text-zinc-200 text-zinc-400 transition-colors cursor-pointer border-0 outline-none flex items-center gap-1"
            title={copyTitleLabels[locale] ?? 'Copy'}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-white/5 hover:text-zinc-200 text-zinc-400 transition-colors cursor-pointer border-0 outline-none"
            title="Good response"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-white/5 hover:text-zinc-200 text-zinc-400 transition-colors cursor-pointer border-0 outline-none"
            title="Poor response"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          {message.timestamp && (
            <span className="text-[11px] text-zinc-400 font-sans ms-1.5">
              {message.timestamp}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
