'use client';

import React from 'react';
import { Plus, Mic, MicOff, ArrowUp, Loader2, Brain } from 'lucide-react';
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
  const tooltips = {
    thinkMode: {
      ar: 'تفعيل وضع التحليل القانوني العميق',
      fr: 'Activer le mode raisonnement juridique approfondi',
      en: 'Toggle Deep Legal & Statutory Reasoning Mode',
      derja: 'Chargi wad3 el tahlil el 9anuni',
    },
    dictate: { ar: 'إملاء', fr: 'Dicter', en: 'Dictate', derja: 'Hki bel mic' },
    send: { ar: 'إرسال', fr: 'Envoyer', en: 'Send', derja: 'Eb3ath' },
    quickTopics: { ar: 'أسئلة سريعة', fr: 'Sujets rapides', en: 'Quick Topics', derja: 'Mawadhi3 sari3a' },
  };

  const quickTopicsList = getQuickTopicsList(locale);

  if (variant === 'dock') {
    return (
      <footer className="p-3 sm:p-4 bg-[#090b0e]/95 backdrop-blur-xl border-t border-white/[0.08] shrink-0 z-20 pb-safe">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center gap-2.5 bg-[#12141a] border border-white/[0.08] focus-within:border-emerald-500/50 rounded-2xl p-2 px-3 shadow-2xl transition-all">
            {/* Plus Quick Topics */}
            <div className="relative shrink-0 flex items-center gap-1">
              <button
                type="button"
                onClick={onTogglePlusMenu}
                className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                title={getLocalized(tooltips.quickTopics, locale)}
              >
                <Plus className="w-4 h-4" />
              </button>

              {showPlusMenu && (
                <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#161820] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    {locale === 'ar' ? 'أسئلة شائعة' : locale === 'derja' ? 'As2ela ma3roufa' : locale === 'en' ? 'Popular Inquiries' : 'Questions populaires'}
                  </div>
                  {quickTopicsList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(item.q)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-white/10 text-xs text-zinc-200 transition-colors cursor-pointer border-0 outline-none"
                      >
                        <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auto-growing Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputVal}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              disabled={isTranscribing}
              className="flex-1 bg-transparent py-1 text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none max-h-36 leading-relaxed"
            />

            {/* Mic & Send Buttons */}
            <div className="flex items-center gap-1.5 pb-0.5 shrink-0">
              <button
                type="button"
                onClick={onToggleVoice}
                disabled={isTranscribing}
                className={`p-2 rounded-xl transition-colors cursor-pointer border border-white/5 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : isTranscribing
                    ? 'text-emerald-400 bg-emerald-950'
                    : 'text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]'
                }`}
                title={getLocalized(tooltips.dictate, locale)}
              >
                {isTranscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4 text-emerald-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => onSendMessage()}
                disabled={!inputVal.trim() || isProcessing || isTranscribing}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer shadow-md font-bold text-xs"
                title={getLocalized(tooltips.send, locale)}
              >
                <ArrowUp className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Micro disclaimer */}
          <p className="text-center text-[11px] text-zinc-600">
            {locale === 'ar'
              ? 'Idaara AI يقدم معلومات إرشادية. يرجى التثبت من النصوص بالرائد الرسمي.'
              : locale === 'derja'
              ? 'Idaara AI ya3tik ma3loumet te9ribiya. Thabbet dima fel JORT.'
              : locale === 'fr'
              ? 'Idaara AI fournit des indications citoyennes. Vérifiez les textes officiels au JORT.'
              : 'Idaara AI can make mistakes. Verify official texts with JORT.'}
          </p>
        </div>
      </footer>
    );
  }

  // Centered variant for empty canvas
  return (
    <div className="w-full bg-[#12141a] border border-white/10 focus-within:border-emerald-500/50 rounded-2xl p-3 shadow-2xl transition-all space-y-3">
      <textarea
        ref={textareaRef}
        rows={2}
        value={inputVal}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={isTranscribing}
        className="w-full bg-transparent text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:outline-none focus:ring-0 resize-none max-h-36 leading-relaxed"
      />

      <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleThinkMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              thinkMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white border-transparent hover:bg-white/5'
            }`}
            title={getLocalized(tooltips.thinkMode, locale)}
          >
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {locale === 'ar'
                ? 'تفكير معمق'
                : locale === 'derja'
                ? 'Fakker mezyen'
                : locale === 'fr'
                ? 'Analyse poussée'
                : 'Think'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleVoice}
            disabled={isTranscribing}
            className={`p-2 sm:p-2.5 rounded-xl transition-colors cursor-pointer ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : isTranscribing
                ? 'text-emerald-400'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title={getLocalized(tooltips.dictate, locale)}
          >
            {isTranscribing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onSendMessage()}
            disabled={!inputVal.trim() || isProcessing || isTranscribing}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            <span className="hidden sm:inline">
              {locale === 'ar'
                ? 'إرسال'
                : locale === 'derja'
                ? 'Eb3eth'
                : locale === 'en'
                ? 'Send'
                : 'Envoyer'}
            </span>
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
