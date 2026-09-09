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
import { BrandIcon } from '../layout/BrandLogo';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectPrompt?: (prompt: string) => void;
}

/** Parses markdown links, bold text, acronyms, and civic tags */
function renderInlineStyles(text: string): React.ReactNode {
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

    // 4. Raw URLs
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
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-white/10 hover:bg-white/15 text-zinc-200 font-mono text-xs hover:underline transition-colors align-baseline"
        >
          <span className="truncate max-w-[200px]">{part.replace(/^https?:\/\//, '')}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }

    // 5. Currency amounts (e.g. 80 DT, 25 د.ت, 145 DT, 3 د.ت)
    if (/\b\d+(?:[.,]\d+)?\s*(?:DT|TND|د\.ت|دينار)\b/i.test(part)) {
      return (
        <span key={i} className="font-semibold text-white px-0.5" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    // 6. Parenthetical Latin text
    if (/^\([a-zA-Z0-9\s/&'.,_-]+\)$/.test(part)) {
      return (
        <span key={i} className="text-zinc-400 mx-0.5" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    // 7. Latin Acronyms & Civic Entities
    if (/^(?:CIN|B3|CAPES|ATTT|STEG|SONEDE|CNSS|CNAM|RNE|JORT|PDF|COC|FCR|RIB|TND|DT|Transtu|SNCFT|SRT)$/i.test(part)) {
      return (
        <span key={i} className="font-semibold text-white px-0.5" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

/** Modern, Clean Markdown & Civic Element Parser (Pro Web Grade) */
function renderFormattedContent(text: string, locale: string = 'derja', isRTLOverride?: boolean): React.ReactNode {
  // i18n-ignore: regex pattern in code
  let cleanText = text.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim();
  cleanText = cleanText.replace(/^(?:Here's a thinking process|Analyze User Input|Check Constraints)[\s\S]*?\n\n/i, '').trim();

  cleanText = cleanText.replace(/([a-zA-Z0-9)])\s*:\s*$/gm, '$1\u200F:');
  cleanText = cleanText.replace(/([a-zA-Z0-9)])\s*:\s+/g, '$1\u200F: ');

  const isMessageRTL = isRTLOverride !== undefined
    ? isRTLOverride
    : ((cleanText.match(/[\u0600-\u06FF]/g) || []).length > (cleanText.match(/[a-zA-Z]/g) || []).length);

  const rawLines = cleanText.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i].trim();

    if (!line) {
      i++;
      continue;
    }

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
        const headerRow = tableLines[0].split('|').filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1).map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((row) =>
          row.split('|').filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1).map((c) => c.trim())
        );

        blocks.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-xs text-start border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="p-2.5 font-bold text-zinc-200">
                      {renderInlineStyles(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-zinc-300">
                        {renderInlineStyles(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 2. Executive Summary Card (📌 الخلاصة)
    if (/^(?:###|##|#)?\s*📌/.test(line)) {
      const summaryHeader = line.replace(/^(?:###|##|#)?\s*📌\s*/, '').trim();
      const summaryItems: string[] = [];
      i++;

      while (i < rawLines.length) {
        const nextLine = rawLines[i].trim();
        if (!nextLine) {
          i++;
          continue;
        }
        if (
          nextLine.startsWith('#') ||
          /^(\*{2})?(📑|🎯|💰|🏛️|📍|📋|✅|🔑|💡)/.test(nextLine) ||
          nextLine.startsWith('---')
        ) {
          break;
        }
        if (nextLine.startsWith('- ') || nextLine.startsWith('* ') || nextLine.startsWith('• ')) {
          summaryItems.push(nextLine.replace(/^[-*•]\s+/, ''));
        } else {
          summaryItems.push(nextLine);
        }
        i++;
      }

      const summaryLabel = isMessageRTL
        ? 'الخلاصة الإدارية'
        : (locale === 'fr' ? 'Résumé administratif' : 'Administrative Summary');

      blocks.push(
        <div
          key={`summary-${i}`}
          dir={lineDir}
          className={`my-3 p-4 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] shadow-sm max-w-2xl ${lineAlign}`}
        >
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-white/[0.08] text-xs font-semibold text-zinc-200">
            <span>📌</span>
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
                      className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.08] flex flex-col justify-between gap-1"
                    >
                      <span className="text-[11px] font-medium text-zinc-400">{label}</span>
                      <span className="text-xs sm:text-[13px] font-semibold text-zinc-100 leading-snug">{renderInlineStyles(val)}</span>
                    </div>
                  );
                }
                return (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.08] flex flex-col gap-1"
                  >
                    <div className="text-xs text-zinc-200 leading-relaxed">
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

    // 3. Modern Pro Callout / Practical Civic Note (💡 نصيحة عملية)
    if (/^(?:>|###|##|#)?\s*💡/.test(line) || /^>+\s*\*{0,2}💡/.test(line) || line.startsWith('💡')) {
      let tipBody = line
        .replace(/^(?:>|###|##|#)?\s*💡\s*:?\s*/, '')
        .replace(/^>+\s*/, '')
        .replace(/^\*{0,2}(?:نصيحة|ملاحظة|إرشاد|تنبيه|معلومة|Conseil|Astuce|Remarque|Tip|Note|Pro-?Tip)(?:\s+[^*:]+)?\*{0,2}\s*:?\s*/i, '')
        .replace(/^(?:نصيحة|ملاحظة|إرشاد|تنبيه|Conseil|Astuce|Tip|Note)\s*[^:]*:\s*/i, '')
        .trim();

      i++;

      while (i < rawLines.length) {
        const nextLine = rawLines[i].trim();
        if (!nextLine) {
          i++;
          continue;
        }
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

      tipBody = tipBody.replace(/^\*{1,2}/, '').replace(/\*{1,2}$/, '').trim();

      if (tipBody) {
        blocks.push(
          <div
            key={`tip-${i}`}
            dir={lineDir}
            className={`my-3 p-3.5 sm:p-4 rounded-xl border border-white/[0.08] border-s-2 border-s-amber-400/80 bg-[#0c0c0c] text-zinc-200 text-sm leading-relaxed ${lineAlign}`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1.5 select-none">
              <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>
                {isMessageRTL || locale === 'ar'
                  ? 'نصيحة قانونية عملية'
                  : locale === 'derja'
                  ? 'Nsi7a 3amaliya'
                  : locale === 'en'
                  ? 'Statutory Pro Tip'
                  : 'Conseil pratique'}
              </span>
            </div>
            <div className="text-[13.5px] sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {renderInlineStyles(tipBody)}
            </div>
          </div>
        );
      }
      continue;
    }

    // 4. Section Headers (### 📑, ### 💰, ### 🏛️)
    if (line.startsWith('#') || /^(\*{2})?(📑|🎯|💰|🏛️|📍|📋|✅|🔑)/.test(line)) {
      const headerText = line.replace(/^#+\s*/, '');
      blocks.push(
        <h3 key={`h-${i}`} dir={lineDir} className={`pt-3 pb-1 font-semibold text-[15px] sm:text-base text-white ${lineAlign}`}>
          {renderInlineStyles(headerText)}
        </h3>
      );
      i++;
      continue;
    }

    // 5. Numbered Steps (1. 2. 3.)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      blocks.push(
        <div key={`num-${i}`} dir={lineDir} className={`flex items-start gap-2 my-1.5 ${lineAlign}`}>
          <span className="text-zinc-400 font-medium shrink-0 select-none min-w-[18px]">{numberedMatch[1]}.</span>
          <span className="text-[#ececec] flex-1 leading-relaxed text-[15px]">
            {renderInlineStyles(numberedMatch[2])}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 6. Styled Bullet Items (- or * or •)
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ') || line.startsWith('✔ ') || line.startsWith('✓ ')) {
      const bulletText = line.replace(/^[-*•✔✓✅]\s+/, '');
      blocks.push(
        <div key={`bullet-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-1.5 ${lineAlign}`}>
          <span className="text-zinc-400 shrink-0 select-none mt-0.5">•</span>
          <span className="text-[#ececec] flex-1 leading-relaxed text-[15px]">
            {renderInlineStyles(bulletText)}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 7. Standard Paragraph
    blocks.push(
      <p key={`p-${i}`} dir={lineDir} className={`leading-relaxed text-[#ececec] ${lineAlign} font-normal my-2 text-[15px]`}>
        {renderInlineStyles(line)}
      </p>
    );
    i++;
  }

  return (
    <div
      dir={isMessageRTL ? 'rtl' : 'ltr'}
      className={`space-y-1 text-[15px] leading-relaxed text-[#ececec] font-normal ${
        isMessageRTL ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
      }`}
    >
      {blocks}
    </div>
  );
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSelectPrompt }) => {
  const { locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

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

  // ── USER MESSAGE BUBBLE (Elevated Obsidian Glass) ──
  if (!isAssistant) {
    return (
      <div className="w-full flex justify-end py-2 select-none group animate-fade-in">
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className={`max-w-[85%] sm:max-w-[70%] px-5 py-2.5 rounded-[24px] bg-[#121212] border border-white/[0.08] text-[#ededed] text-[15px] leading-relaxed select-text shadow-sm ${
            isArabicScript ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
          }`}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // ── ASSISTANT MESSAGE (ChatGPT Clean Direct Layout) ──
  return (
    <div
      dir={isArabicScript ? 'rtl' : 'ltr'}
      aria-live="polite"
      className={`w-full py-2 space-y-2 group ${isArabicScript ? 'text-right' : 'text-left'}`}
    >
      <div
        style={{ unicodeBidi: 'plaintext' }}
        className={`prose-chat text-[#ededed] leading-relaxed ${isArabicScript ? 'font-["Cairo",sans-serif]' : ''}`}
      >
        {renderFormattedContent(message.content, locale, isArabicScript)}
        {message.isStreaming && (
          <span className="inline-block w-2 h-4 bg-white/90 ms-1 rounded-xs animate-pulse align-middle" />
        )}
      </div>

      {/* Timbre Breakdown Docket (if any) */}
      {!message.isStreaming && message.timbreBreakdown && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] space-y-2 max-w-md">
          <div className="flex items-center justify-between font-semibold text-zinc-200 pb-2 border-b border-white/[0.08] text-xs">
            <div className="flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {locale === 'ar'
                  ? 'المعاليم الجبائية والتنابر'
                  : locale === 'derja'
                  ? 'El Masrouf wel Timbres'
                  : locale === 'en'
                  ? 'Statutory Stamp Fees'
                  : 'Frais et Timbres Fiscaux'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-emerald-400 font-mono font-semibold tabular-nums">
              {message.timbreBreakdown.totalTND.toFixed(3)} DT
            </span>
          </div>

          <ul className="space-y-1 text-xs text-zinc-400">
            {message.timbreBreakdown.items.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span>• {item.label}</span>
                <span className="font-mono text-zinc-300 tabular-nums">
                  {item.amount.toFixed(3)} DT
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Chips */}
      {!message.isStreaming && message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {message.actions.map((action, idx) => {
            const label = getLocalized(action.label, locale) || 'Voir';
            return (
              <Link
                key={idx}
                href={action.payload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c0c0c] hover:bg-zinc-900 border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium transition-all"
              >
                {action.type === 'pdf_form' && <FileText className="w-3.5 h-3.5 text-zinc-400" />}
                {action.type === 'calculator_link' && <Calculator className="w-3.5 h-3.5 text-zinc-400" />}
                {action.type === 'office_link' && <MapPin className="w-3.5 h-3.5 text-zinc-400" />}
                {action.type === 'procedure_link' && <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{label}</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </Link>
            );
          })}
        </div>
      )}

      {/* ChatGPT Subtle Action Toolbar */}
      {!message.isStreaming && message.content && (
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className="flex items-center gap-1 pt-1 text-zinc-500 select-none"
        >
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer border-0 outline-none flex items-center justify-center min-h-[32px] min-w-[32px]"
            title={copyTitleLabels[locale] ?? 'Copy'}
            aria-label={copyTitleLabels[locale] ?? 'Copy'}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer border-0 min-h-[32px] min-w-[32px] flex items-center justify-center ${
              feedback === 'up' ? 'text-white' : 'hover:bg-white/5 text-zinc-500 hover:text-zinc-300'
            }`}
            title={locale === 'ar' ? 'إجابة جيدة' : locale === 'derja' ? 'Jaweb mli7' : locale === 'en' ? 'Good response' : 'Bonne réponse'}
            aria-label={locale === 'ar' ? 'إجابة جيدة' : locale === 'derja' ? 'Jaweb mli7' : locale === 'en' ? 'Good response' : 'Bonne réponse'}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer border-0 min-h-[32px] min-w-[32px] flex items-center justify-center ${
              feedback === 'down' ? 'text-white' : 'hover:bg-white/5 text-zinc-500 hover:text-zinc-300'
            }`}
            title={locale === 'ar' ? 'إجابة ضعيفة' : locale === 'derja' ? 'Jaweb m3awej' : locale === 'en' ? 'Poor response' : 'Mauvaise réponse'}
            aria-label={locale === 'ar' ? 'إجابة ضعيفة' : locale === 'derja' ? 'Jaweb m3awej' : locale === 'en' ? 'Poor response' : 'Mauvaise réponse'}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          {message.timestamp && (
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] text-zinc-500 font-mono ms-2 select-none"
            >
              {message.timestamp}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
