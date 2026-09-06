'use client';

import React from 'react';
import { Plus, Mic, MicOff, ArrowUp, Loader2, Scale, Sparkles, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
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

  const tThinkLabel =
    locale === 'ar'
      ? 'تدقيق قانوني (JORT)'
      : locale === 'derja'
      ? 'Ta7lil JORT'
      : locale === 'fr'
      ? 'Vérification JORT'
      : 'Legal Reasoning';

  return (
    <div className={isDock ? 'w-full max-w-3xl mx-auto' : 'w-full'}>
      <div className="rounded-2xl sm:rounded-3xl bg-[#0c0e13]/95 border border-white/[0.1] hover:border-emerald-500/30 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 shadow-2xl p-3 sm:p-3.5 transition-all space-y-2.5 backdrop-blur-xl">
        {/* Auto-growing Textarea */}
        <textarea
          ref={textareaRef}
          rows={isDock ? 1 : 2}
          value={inputVal}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={isTranscribing}
          className="w-full bg-transparent px-1.5 py-1 text-base sm:text-[15px] text-zinc-100 placeholder-zinc-400 border-0 outline-none ring-0 resize-none max-h-36 leading-relaxed"
        />

        {/* Bottom Civic Actions Toolbar */}
        <div className="flex items-center justify-between pt-1">
          {/* Left: Quick civic topics menu + Deep Legal Verification toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={onTogglePlusMenu}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/[0.08] outline-none flex items-center justify-center min-h-[36px] min-w-[36px]"
                title={locale === 'ar' ? 'إجراءات ونماذج سريعة' : 'Procédures & Modèles'}
              >
                <Plus className="w-4 h-4" />
              </button>

              {showPlusMenu && (
                <div className="absolute bottom-full left-0 mb-3 w-80 rounded-2xl bg-[#11141b] border border-white/[0.12] shadow-2xl p-2.5 z-50 animate-fade-in space-y-1 backdrop-blur-2xl">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-white/[0.06] mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>
                      {locale === 'ar' ? 'استشارات وإجراءات رسمية' : 'Démarches & Modèles Clés'}
                    </span>
                  </div>
                  {quickTopicsList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(item.q)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-start hover:bg-emerald-500/10 hover:text-emerald-300 text-xs text-zinc-300 transition-colors cursor-pointer border-0 outline-none group"
                      >
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Deep JORT Verification Mode Toggle */}
            <button
              type="button"
              onClick={onToggleThinkMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border min-h-[36px] ${
                thinkMode
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-xs shadow-emerald-950/40'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 border-white/[0.06]'
              }`}
            >
              <Scale className={`w-3.5 h-3.5 ${thinkMode ? 'text-emerald-400 animate-pulse' : 'text-zinc-400'}`} />
              <span>{tThinkLabel}</span>
            </button>
          </div>

          {/* Right: JORT Decree badge, Mic, High-contrast Send button */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>JORT 2026</span>
            </div>

            {/* Voice Mic Button */}
            <button
              type="button"
              onClick={onToggleVoice}
              disabled={isTranscribing}
              className={`p-2 rounded-xl transition-colors cursor-pointer border min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse border-red-400'
                  : isTranscribing
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-100 border-white/[0.06]'
              }`}
              title={locale === 'ar' ? 'إملاء صوتي بالدارجة أو العربية' : 'Dictée vocale'}
            >
              {isTranscribing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* High-Contrast Send Action Button */}
            <button
              type="button"
              onClick={() => onSendMessage()}
              disabled={!hasText || isProcessing || isTranscribing}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                hasText && !isProcessing && !isTranscribing
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer shadow-lg shadow-emerald-500/25 active:scale-95'
                  : 'bg-white/[0.06] text-zinc-600 cursor-not-allowed border border-white/[0.04]'
              }`}
              aria-label="Send query"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Official Civic Advisory Disclaimer */}
      {isDock && (
        <p className="text-center text-[11px] text-zinc-400 pt-2 font-mono">
          {locale === 'ar'
            ? '🏛️ Idaara AI يقدم معلومات إرشادية رسمية · يرجى دائماً مراجعة النصوص الأصلية بالرائد الرسمي للجمهورية التونسية.'
            : locale === 'derja'
            ? '🏛️ Idaara AI ya3tik ma3loumet rasmiya te9ribiya · Thabbet dima fel JORT.'
            : locale === 'fr'
            ? '🏛️ Idaara AI fournit une orientation civique officielle · Vérifiez toujours les textes au Journal Officiel (JORT).'
            : '🏛️ Idaara AI provides official civic guidance · Always verify legal decrees in the Official Gazette (JORT).'}
        </p>
      )}
    </div>
  );
}
