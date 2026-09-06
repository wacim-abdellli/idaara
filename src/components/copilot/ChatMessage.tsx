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
  Sparkles,
  ArrowRight,
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
        <span key={i} className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs shadow-inner align-baseline" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    // 6. Parenthetical Latin text
    if (/^\([a-zA-Z0-9\s/&'.,_-]+\)$/.test(part)) {
      return (
        <span key={i} className="inline-block mx-1 font-semibold text-emerald-300/90" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {part}
        </span>
      );
    }

    // 7. Latin Acronyms
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

/** Modern, Clean Markdown & Civic Element Parser (Pro Web Grade) */
function renderFormattedContent(text: string, locale: string = 'derja', isRTLOverride?: boolean): React.ReactNode {
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
        const headerRow = tableLines[0].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((row) =>
          row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim())
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
          className={`my-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent border border-emerald-500/25 shadow-sm max-w-2xl ${lineAlign}`}
        >
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-white/[0.06] text-xs font-bold text-emerald-400">
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
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between gap-1"
                    >
                      <span className="text-[11px] font-medium text-zinc-400">{label}</span>
                      <span className="text-xs sm:text-[13px] font-semibold text-zinc-100 leading-snug">{renderInlineStyles(val)}</span>
                    </div>
                  );
                }
                return (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-1"
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
            className={`my-3 p-3.5 sm:p-4 rounded-xl border-s-2 border-amber-400/80 bg-amber-500/[0.04] text-zinc-200 text-sm leading-relaxed ${lineAlign}`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1.5 select-none">
              <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>
                {isMessageRTL
                  ? 'نصيحة قانونية عملية'
                  : locale === 'fr'
                  ? 'Conseil pratique'
                  : locale === 'derja'
                  ? 'Nsi7a 3amaliya'
                  : 'Statutory Pro Tip'}
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
        <div key={`h-${i}`} dir={lineDir} className={`pt-3.5 pb-1.5 mb-1 flex items-center gap-2 border-b border-white/[0.06] ${lineAlign}`}>
          <div className="w-1 h-3.5 rounded-full bg-emerald-400 shrink-0" />
          <h4 className="text-sm sm:text-[15px] font-bold text-white tracking-tight">
            {renderInlineStyles(headerText)}
          </h4>
        </div>
      );
      i++;
      continue;
    }

    // 5. Numbered Steps (1. 2. 3.)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      const isHeaderLike = numberedMatch[2].endsWith(':') || numberedMatch[2].length <= 50;
      blocks.push(
        <div key={`num-${i}`} dir={lineDir} className={`flex items-start gap-3 ${isHeaderLike ? 'pt-2.5 pb-1 my-1' : 'my-2'} ${lineAlign}`}>
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className={`inline-flex items-center justify-center text-center rounded-lg font-bold leading-none shrink-0 select-none shadow-sm ${
              isHeaderLike
                ? 'w-6 h-6 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs mt-0.5'
                : 'w-5 h-5 bg-zinc-800 border border-white/10 text-zinc-300 text-[11px] mt-1'
            }`}
          >
            {numberedMatch[1]}
          </span>
          <span className={`flex-1 leading-relaxed ${isHeaderLike ? 'text-white font-bold text-sm sm:text-[15px]' : 'text-zinc-200 text-sm sm:text-[14.5px]'}`}>
            {renderInlineStyles(numberedMatch[2])}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 6. Styled Bullet Items (- or * or •)
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ') || line.startsWith('✔ ') || line.startsWith('✓ ')) {
      const isCheck = line.startsWith('✔ ') || line.startsWith('✓ ') || line.includes('✅');
      const bulletText = line.replace(/^[-*•✔✓✅]\s+/, '');
      blocks.push(
        <div key={`bullet-${i}`} dir={lineDir} className={`flex items-start gap-2.5 my-2 ps-1 ${lineAlign}`}>
          {isCheck ? (
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="inline-flex items-center justify-center text-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-1 text-[10px] font-bold leading-none select-none"
            >
              ✓
            </span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2 ring-2 ring-emerald-500/20" />
          )}
          <span className="text-zinc-200 flex-1 leading-relaxed text-sm sm:text-[14.5px]">
            {renderInlineStyles(bulletText)}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 7. Standard Paragraph
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

  // ── Contextual Smart Follow-up Chips ──
  const followUpSuggestions = useMemo(() => {
    if (!isAssistant || message.isStreaming || !message.content || message.content.length < 50) return [];

    const text = message.content.toLowerCase();
    const suggestions: string[] = [];

    if (text.includes('passeport') || text.includes('باسبور') || text.includes('جواز')) {
      if (locale === 'ar') {
        suggestions.push('قداش ياخذ وقت باش يحضر الباسبور؟', 'كيفاش نشري التمبر الإلكتروني؟');
      } else if (locale === 'fr') {
        suggestions.push('Quel est le délai de délivrance du passeport ?', 'Comment acheter le timbre fiscal en ligne ?');
      } else if (locale === 'en') {
        suggestions.push('How long does the passport take to be issued?', 'How do I purchase the fiscal e-stamp online?');
      } else {
        suggestions.push('9adeh yo93ed el passeport bech ya7dher?', 'Kifech nechri timbre en ligne?');
      }
    } else if (text.includes('carte grise') || text.includes('رمادية') || text.includes('karhba')) {
      if (locale === 'ar') {
        suggestions.push('شنوة الوثائق المطلوبة في المعاينة الفنية؟', 'قداش معلوم خلاص القباضة بالضبط؟');
      } else if (locale === 'fr') {
        suggestions.push('Quels sont les documents pour la visite technique ?', 'Quel est le montant exact de la recette des finances ?');
      } else if (locale === 'en') {
        suggestions.push('What documents are needed for technical inspection?', 'What is the exact tax office fee?');
      } else {
        suggestions.push('Awra9 el visite technique chnowa?', '9adeh masrouf el 9badha bedhabt?');
      }
    } else if (text.includes('cin') || text.includes('تعريف')) {
      if (locale === 'ar') {
        suggestions.push('شنوة نعمل في حالة ضياع بطاقة التعريف؟', 'قداش صلوحية المضمون المطلوب؟');
      } else if (locale === 'fr') {
        suggestions.push('Que faire en cas de perte de la CIN ?', 'Quelle est la validité de l’extrait de naissance ?');
      } else if (locale === 'en') {
        suggestions.push('What to do if my national ID (CIN) is lost?', 'How recent must the birth certificate be?');
      } else {
        suggestions.push('Chnowa na3mel ken dha3et el CIN?', 'Madhmoun 9adeh 3omrou lezem?');
      }
    } else if (text.includes('auto-entrepreneur') || text.includes('مبادر') || text.includes('freelance')) {
      if (locale === 'ar') {
        suggestions.push('كيفاش نفوتر بالعملة الصعبة (EUR/USD)؟', 'شنوة وضعية الضمان الاجتماعي CNSS؟');
      } else if (locale === 'fr') {
        suggestions.push('Comment facturer en devises (EUR/USD) ?', 'Quel est le régime de cotisation CNSS ?');
      } else if (locale === 'en') {
        suggestions.push('How to invoice foreign clients in EUR/USD?', 'How does CNSS social security contribution work?');
      } else {
        suggestions.push('Kifech nfacturi fel devises l barra?', 'CNSS kifech n5allas fiha?');
      }
    } else if (text.includes('b3') || text.includes('سوابق')) {
      if (locale === 'ar') {
        suggestions.push('قداش مدة صلوحية البطاقة عدد 3؟', 'كيفاش نتبع إرسالية Rapide Poste؟');
      } else if (locale === 'fr') {
        suggestions.push('Quelle est la durée de validité du bulletin N°3 ?', 'Comment suivre l’envoi Rapide Poste ?');
      } else if (locale === 'en') {
        suggestions.push('What is the validity period of the B3 certificate?', 'How to track Rapide Poste parcel delivery?');
      } else {
        suggestions.push('9adeh to93ed sal7a el B3?', 'Kifech ntaba3 envoi rapide poste?');
      }
    }

    return suggestions.slice(0, 2);
  }, [isAssistant, message.isStreaming, message.content, locale]);

  // ── USER MESSAGE BUBBLE (Elevated Obsidian Glass) ──
  if (!isAssistant) {
    return (
      <div className="w-full py-2 flex flex-col items-end group animate-fade-in">
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl bg-[#161922] hover:bg-[#1a1e28] border border-white/[0.08] hover:border-emerald-500/20 text-zinc-100 text-sm sm:text-[15px] leading-relaxed shadow-sm transition-all ${
            isArabicScript ? 'text-right font-["Cairo",sans-serif]' : 'text-left'
          }`}
        >
          {message.content}
        </div>

        <div className="flex items-center gap-2 pt-1 px-1 text-[11px] text-zinc-400 font-mono select-none opacity-0 group-hover:opacity-100 transition-opacity">
          {message.timestamp && <span>{message.timestamp}</span>}
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer border-0 outline-none flex items-center gap-1 text-[11px]"
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

  // ── ASSISTANT MESSAGE (Pro Civic AI Layout) ──
  return (
    <div
      dir={isArabicScript ? 'rtl' : 'ltr'}
      aria-live="polite"
      className={`w-full py-3.5 space-y-3 group animate-fade-in ${isArabicScript ? 'text-right' : 'text-left'}`}
    >
      {/* Elevated Assistant Identity Header */}
      <div className="flex items-center gap-2.5 pb-1 select-none">
        <BrandIcon size={22} />
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-white tracking-tight">Idaara AI</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono font-medium">
            JORT {new Date().getFullYear()}
          </span>
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
        <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-amber-500/[0.08] via-amber-500/[0.03] to-transparent border border-amber-500/30 space-y-2.5 max-w-lg shadow-sm animate-fade-in">
          <div className="flex items-center justify-between font-bold text-amber-400 pb-2 border-b border-white/10 text-xs">
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
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold tabular-nums">
              {message.timbreBreakdown.totalTND.toFixed(3)} DT
            </span>
          </div>

          <ul className="space-y-1.5 text-xs text-zinc-300">
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

      {/* Pro Action Toolbar */}
      {!message.isStreaming && message.content && (
        <div
          dir={isArabicScript ? 'rtl' : 'ltr'}
          className="flex items-center gap-1.5 pt-1 text-zinc-400 opacity-80 hover:opacity-100 transition-opacity animate-fade-in select-none"
        >
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] hover:text-zinc-200 text-zinc-400 transition-colors cursor-pointer border-0 outline-none flex items-center gap-1 text-xs"
            title={copyTitleLabels[locale] ?? 'Copy'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">{copyLabels[locale] ?? 'Copied ✓'}</span>
              </>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer border-0 outline-none ${
              feedback === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
            title="Good response"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer border-0 outline-none ${
              feedback === 'down' ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
            title="Poor response"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          {message.timestamp && (
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[10px] text-zinc-400 font-mono ms-2 select-none"
            >
              {message.timestamp}
            </span>
          )}
        </div>
      )}

      {/* Contextual Smart Follow-up Chips */}
      {!message.isStreaming && followUpSuggestions.length > 0 && onSelectPrompt && (
        <div className="pt-2.5 flex flex-wrap gap-2 animate-fade-in" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {followUpSuggestions.map((promptText, idx) => {
            const isTextArabic = /[\u0600-\u06FF]/.test(promptText);
            return (
              <button
                key={idx}
                type="button"
                dir={isTextArabic ? 'rtl' : 'ltr'}
                style={{ unicodeBidi: 'isolate' }}
                onClick={() => onSelectPrompt(promptText)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 hover:border-emerald-500/40 text-xs text-emerald-300 hover:text-white transition-all cursor-pointer shadow-xs group"
              >
                <Sparkles className="w-3 h-3 text-emerald-400 group-hover:rotate-12 transition-transform shrink-0" />
                <span className="font-medium">{promptText}</span>
                <ArrowRight className="w-3 h-3 text-emerald-400/80 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
