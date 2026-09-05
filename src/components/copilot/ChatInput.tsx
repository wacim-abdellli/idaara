'use client';

import React from 'react';
import { Plus, Mic, MicOff, ArrowUp, Loader2, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { getLocalized } from '../../lib/locale-utils';
import { getQuickTopicsList } from './QuickTopics';

export interface ChatInputProps {
  locale: SupportedLanguage;
  inputVal: string;
  isProcessing: boolean;
  isRecording: boolean;
  isTranscribing: boolean;
  thinkMode: boolean;
  showPlusMenu: boolean;
  placeholder: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  variant?: 'centered' | 'dock';
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendMessage: (text?: string) => void;
  onToggleVoice: () => void;
  onToggleThinkMode: () => void;
  onTogglePlusMenu: () => void;
}

export function ChatInput({
  locale,
  inputVal,
  isProcessing,
  isRecording,
  isTranscribing,
  thinkMode,
  showPlusMenu,
  placeholder,
  textareaRef,
  variant = 'centered',
  onInputChange,
  onKeyDown,
  onSendMessage,
  onToggleVoice,
  onToggleThinkMode,
  onTogglePlusMenu,
}: ChatInputProps) {
  const quickTopicsList = getQuickTopicsList(locale);

  const isDock = variant === 'dock';
  const hasText = Boolean(inputVal.trim());

  return (
    <div className={isDock ? 'w-full max-w-3xl mx-auto' : 'w-full'}>
      <div className="rounded-2xl sm:rounded-3xl bg-[#242429] border border-[#383840] hover:border-[#464650] focus-within:border-[#5a5a66] shadow-xl p-3 sm:p-3.5 transition-all space-y-2.5">
        {/* Auto-growing Textarea */}
        <textarea
          ref={textareaRef}
          rows={isDock ? 1 : 2}
          value={inputVal}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={isTranscribing}
          className="w-full bg-transparent px-1.5 py-1 text-[15px] text-[#f4f4f5] placeholder-[#71717a] border-0 outline-none ring-0 resize-none max-h-36 leading-relaxed"
        />

        {/* Bottom Toolbar matching Claude.ai Image 2 & 3 */}
        <div className="flex items-center justify-between pt-1">
          {/* Left: Plus attachment button + Segmented mode pill */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={onTogglePlusMenu}
                className="p-1.5 rounded-lg hover:bg-[#303036] text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                title={locale === 'ar' ? 'مواضيع سريعة' : 'Quick topics'}
              >
                <Plus className="w-4 h-4" />
              </button>

              {showPlusMenu && (
                <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#202024] border border-[#383840] shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    {locale === 'ar' ? 'مواضيع رسمية شائعة' : 'Popular Civic Queries'}
                  </div>
                  {quickTopicsList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(item.q)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-[#2a2a30] text-xs text-zinc-200 transition-colors cursor-pointer border-0 outline-none"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#da7756] shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Segmented Mode Pill: [ Chat | Deep Legal ] */}
            <div className="flex items-center rounded-lg bg-[#1a1a1d] p-0.5 border border-[#34343c]">
              <button
                type="button"
                onClick={() => thinkMode && onToggleThinkMode()}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  !thinkMode
                    ? 'bg-[#2a2a30] text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {locale === 'ar'
                  ? 'محادثة'
                  : locale === 'derja'
                  ? 'Chat'
                  : locale === 'fr'
                  ? 'Discussion'
                  : 'Chat'}
              </button>
              <button
                type="button"
                onClick={() => !thinkMode && onToggleThinkMode()}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  thinkMode
                    ? 'bg-[#da7756]/20 text-[#da7756] border border-[#da7756]/30 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>
                  {locale === 'ar'
                    ? 'تحليل قانوني'
                    : locale === 'derja'
                    ? 'Ta7lil'
                    : locale === 'fr'
                    ? 'Raisonnement'
                    : 'Think'}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Model badge, Voice mic, Send button */}
          <div className="flex items-center gap-2">
            {/* Claude-style model badge */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:bg-[#2c2c32] cursor-default transition-colors">
              <span>Idaara 2.4 · JORT</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </div>

            {/* Mic button */}
            <button
              type="button"
              onClick={onToggleVoice}
              disabled={isTranscribing}
              className={`p-1.5 rounded-full transition-colors cursor-pointer border-0 outline-none ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : isTranscribing
                  ? 'text-[#da7756]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#303036]'
              }`}
              title={locale === 'ar' ? 'إملاء صوتي' : 'Voice dictation'}
            >
              {isTranscribing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Circular Send Arrow */}
            <button
              type="button"
              onClick={() => onSendMessage()}
              disabled={!hasText || isProcessing || isTranscribing}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                hasText && !isProcessing && !isTranscribing
                  ? 'bg-white hover:bg-zinc-200 text-black cursor-pointer shadow-md'
                  : 'bg-[#303036] text-zinc-500 cursor-not-allowed opacity-50'
              }`}
              aria-label="Send message"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Claude-style Micro Disclaimer */}
      {isDock && (
        <p className="text-center text-[11px] text-zinc-400 pt-2">
          {locale === 'ar'
            ? 'Idaara AI يقدم استشارات إرشادية. يرجى التثبت دائماً من النصوص الرسمية بالرائد الرسمي.'
            : locale === 'derja'
            ? 'Idaara AI ya3tik ma3loumet te9ribiya. Thabbet dima fel JORT.'
            : locale === 'fr'
            ? 'Idaara AI est un copilote civique. Vérifiez les textes officiels au JORT.'
            : 'Idaara AI is AI and can make mistakes. Please double-check official texts with JORT.'}
        </p>
      )}
    </div>
  );
}
