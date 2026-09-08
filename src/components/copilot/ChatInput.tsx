'use client';

import React from 'react';
import { Plus, Mic, MicOff, ArrowUp, Loader2, Scale, Sparkles } from 'lucide-react';
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
      ? 'تدقيق قانوني'
      : locale === 'derja'
      ? 'Ta7lil 9anouni'
      : locale === 'en'
      ? 'Legal reasoning'
      : 'Analyse juridique';

  return (
    <div className={isDock ? 'w-full max-w-3xl mx-auto' : 'w-full'}>
      <div className="relative rounded-2xl sm:rounded-3xl bg-zinc-950/85 border border-white/[0.09] hover:border-white/[0.16] focus-within:border-emerald-500/35 focus-within:ring-1 focus-within:ring-emerald-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.06)_inset] p-3 sm:p-3.5 transition-all duration-200 space-y-2 backdrop-blur-2xl">
        {/* Auto-growing Textarea */}
        <textarea
          ref={textareaRef}
          rows={isDock ? 1 : 2}
          value={inputVal}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={isTranscribing}
          data-no-focus="true"
          className="w-full bg-transparent px-2 py-1 text-base text-zinc-100 placeholder-zinc-500 border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 !outline-none !shadow-none resize-none max-h-36 leading-[1.6] no-focus-ring"
        />

        {/* Bottom Actions Toolbar */}
        <div className="flex items-center justify-between pt-1">
          {/* Left: Quick civic topics menu + Deep Legal Verification toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                aria-label={locale === 'ar' ? 'إضافة ملف أو موضوع' : locale === 'derja' ? 'Zid fichier wala sujet' : locale === 'en' ? 'Attach file or topic' : 'Ajouter un fichier ou sujet'}
                onClick={onTogglePlusMenu}
                className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer border border-white/[0.06] hover:border-white/[0.12] focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center justify-center min-h-[36px] min-w-[36px]"
                title={locale === 'ar' ? 'إجراءات سريعة' : 'Procédures'}
              >
                <Plus className={`w-4 h-4 transition-transform duration-200 ${showPlusMenu ? 'rotate-45 text-white' : ''}`} />
              </button>

              {showPlusMenu && (
                <div className="absolute bottom-full left-0 mb-3 w-80 rounded-2xl bg-[#0f1219]/95 border border-white/[0.12] shadow-2xl p-2 z-50 animate-fade-in space-y-1 backdrop-blur-2xl">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-white/[0.06] mb-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>
                      {locale === 'ar' ? 'استشارات وإجراءات شائعة' : 'Démarches fréquentes'}
                    </span>
                  </div>
                  {quickTopicsList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(item.q)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-start hover:bg-white/[0.06] text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer border-0 focus-visible:ring-2 focus-visible:ring-emerald-500 group"
                      >
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform" />
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
              aria-label={tThinkLabel}
              aria-pressed={thinkMode}
              onClick={onToggleThinkMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border min-h-[36px] ${
                thinkMode
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35 ring-1 ring-emerald-500/25 shadow-xs shadow-emerald-500/10'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 hover:text-zinc-200 border-white/[0.06] hover:border-white/[0.1]'
              }`}
            >
              <Scale className={`w-3.5 h-3.5 ${thinkMode ? 'text-emerald-400' : 'text-zinc-400'}`} />
              <span>{tThinkLabel}</span>
              {thinkMode && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ms-0.5" />}
            </button>
          </div>

          {/* Right: Mic & High-contrast Send button */}
          <div className="flex items-center gap-1.5">
            {/* Voice Mic Button */}
            <button
              type="button"
              aria-label={isRecording ? "Arrêter l'enregistrement vocal" : "Démarrer la saisie vocale"}
              aria-pressed={isRecording}
              onClick={onToggleVoice}
              disabled={isTranscribing}
              className={`p-2 rounded-xl transition-all cursor-pointer border min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse border-red-400 shadow-md shadow-red-500/30'
                  : isTranscribing
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-100 border-white/[0.06] hover:border-white/[0.1]'
              }`}
              title={locale === 'ar' ? 'إملاء صوتي' : 'Dictée vocale'}
            >
              {isTranscribing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Clean Send Action Button */}
            <button
              type="button"
              aria-label={isProcessing ? "Traitement en cours..." : "Envoyer le message"}
              aria-busy={isProcessing}
              aria-disabled={!hasText || isProcessing}
              onClick={() => onSendMessage()}
              disabled={!hasText || isProcessing || isTranscribing}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                hasText && !isProcessing && !isTranscribing
                  ? 'bg-gradient-to-tr from-emerald-500 to-emerald-400 text-zinc-950 hover:from-emerald-400 hover:to-emerald-300 cursor-pointer shadow-md shadow-emerald-500/30 active:scale-95'
                  : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed border border-white/[0.04]'
              }`}
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle, Minimalist Disclaimer */}
      {isDock && (
        <div className="flex items-center justify-center gap-1.5 pt-2 select-none">
          <p className="text-center text-[11px] text-zinc-500/90 leading-tight">
            {locale === 'ar'
              ? 'قد يرتكب Idaara AI أخطاء. يُنصح دائماً بالرجوع للمصادر الرسمية.'
              : locale === 'derja'
              ? 'Idaara AI ynajem yaghlet. Thabbet dima fel masader el rasmiya.'
              : locale === 'en'
              ? 'Idaara AI can make mistakes. Verify important procedures with official sources.'
              : 'Idaara AI peut faire des erreurs. Vérifiez les démarches auprès des sources officielles.'}
          </p>
        </div>
      )}
    </div>
  );
}
