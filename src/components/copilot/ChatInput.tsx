'use client';

import React from 'react';
import { Plus, ArrowUp, Loader2, Scale, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';
import { getQuickTopicsList } from './QuickTopics';

export interface ChatInputProps {
  locale: SupportedLanguage;
  inputVal: string;
  isProcessing: boolean;
  isRecording?: boolean;
  isTranscribing?: boolean;
  thinkMode: boolean;
  showPlusMenu: boolean;
  placeholder: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  variant?: 'centered' | 'dock';
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendMessage: (text?: string) => void;
  onToggleVoice?: () => void;
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
      <div className="rounded-[28px] bg-[#0c0c0c] border border-white/[0.12] focus-within:border-white/[0.24] shadow-2xl px-4 py-3 transition-colors">
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
          className="w-full bg-transparent text-[15px] sm:text-base text-[#ededed] placeholder:text-zinc-500 border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 resize-none max-h-40 leading-relaxed no-focus-ring px-0.5"
        />

        {/* Bottom Actions Toolbar */}
        <div className="flex items-center justify-between pt-1.5">
          {/* Left: Quick civic topics menu + Deep Legal Verification toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                aria-label={locale === 'ar' ? 'إضافة ملف أو موضوع' : locale === 'derja' ? 'Zid fichier wala sujet' : locale === 'en' ? 'Attach file or topic' : 'Ajouter un fichier ou sujet'}
                onClick={onTogglePlusMenu}
                className="w-8 h-8 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border-0 outline-none flex items-center justify-center"
                title={locale === 'ar' ? 'إجراءات سريعة' : 'Procédures'}
              >
                <Plus className={`w-4 h-4 transition-transform duration-200 ${showPlusMenu ? 'rotate-45 text-white' : ''}`} />
              </button>

              {showPlusMenu && (
                <div className="absolute bottom-full left-0 mb-2.5 w-76 rounded-2xl bg-[#0c0c0c] border border-white/[0.12] shadow-2xl p-1.5 z-50 animate-fade-in space-y-0.5">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 border-b border-white/5 mb-1">
                    {locale === 'ar' ? 'استشارات وإجراءات شائعة' : locale === 'derja' ? 'Khedmet el Idara' : locale === 'en' ? 'Common procedures' : 'Démarches fréquentes'}
                  </div>
                  {quickTopicsList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(item.q)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-start hover:bg-white/5 text-xs text-zinc-200 hover:text-white transition-colors cursor-pointer border-0"
                      >
                        <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Deep JORT Verification Mode Toggle (ChatGPT-style subtle pill) */}
            <button
              type="button"
              aria-label={tThinkLabel}
              aria-pressed={thinkMode}
              onClick={onToggleThinkMode}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                thinkMode
                  ? 'bg-white/10 text-white border-white/25 shadow-xs'
                  : 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border-white/10'
              }`}
            >
              <Scale className="w-3 h-3 text-zinc-400" />
              <span>{tThinkLabel}</span>
              {thinkMode && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ms-0.5" />}
            </button>
          </div>

          {/* Right: ChatGPT Circle Send button */}
          <button
            type="button"
            aria-label={isProcessing ? "Traitement en cours..." : "Envoyer le message"}
            aria-busy={isProcessing}
            aria-disabled={!hasText || isProcessing}
            onClick={() => onSendMessage()}
            disabled={!hasText || isProcessing || isTranscribing}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              hasText && !isProcessing && !isTranscribing
                ? 'bg-white text-black hover:bg-zinc-200 cursor-pointer shadow-sm active:scale-95'
                : 'bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Subtle, Minimalist Disclaimer */}
      {isDock && (
        <p className="text-center text-xs text-zinc-500 pt-2 select-none">
          {locale === 'ar'
            ? 'قد يرتكب Idaara AI أخطاء. يُنصح دائماً بالرجوع للمصادر الرسمية.'
            : locale === 'derja'
            ? 'Idaara AI ynajem yaghlet. Thabbet dima fel masader el rasmiya.'
            : locale === 'en'
            ? 'Idaara can make mistakes. Verify important procedures with official sources.'
            : 'Idaara peut faire des erreurs. Vérifiez les démarches auprès des sources officielles.'}
        </p>
      )}
    </div>
  );
}
