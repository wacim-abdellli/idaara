'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Lock, ShieldCheck, Loader2, FileText, X, Sparkles } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

interface DocumentUploaderProps {
  onAnalyze: (file: File | null, redactSensitiveData: boolean) => void;
  isAnalyzing: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onAnalyze, isAnalyzing }) => {
  const { t, locale } = useLocale();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [redactSensitiveData, setRedactSensitiveData] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setIsPdf(file.type === 'application/pdf');
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsPdf(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const redactLabel =
    locale === 'en'
      ? 'Mask sensitive CIN & bank account numbers'
      : locale === 'ar'
      ? 'حجب أرقام بطاقة التعريف ورقم الحساب البنكي'
      : locale === 'fr'
      ? 'Masquer les numéros CIN & RIB'
      : 'Imser les numéros CIN & RIB';

  const analyzeBtnText =
    locale === 'en'
      ? 'Analyze Document'
      : locale === 'ar'
      ? 'تحليل الوثيقة فورياً'
      : locale === 'fr'
      ? 'Analyser le Courrier'
      : 'Fasserli Hal War9a';

  return (
    <div className="space-y-3">
      {/* ── Drop Zone ── */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-200 overflow-hidden ${
          selectedFile
            ? 'border-emerald-500/40 bg-emerald-950/10 cursor-default'
            : 'border-zinc-800 hover:border-emerald-500/50 bg-zinc-900/30 hover:bg-zinc-900/60 cursor-pointer'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden"
        />

        {selectedFile ? (
          /* ── File selected state ── */
          <div className="p-5">
            {/* Clear button */}
            <button
              onClick={clearFile}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors z-10 cursor-pointer"
              title="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-4">
              {/* Preview / PDF icon */}
              <div className="relative shrink-0 w-20 h-24 rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                {previewUrl && !isPdf ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Document preview"
                      className={`w-full h-full object-cover ${redactSensitiveData ? 'blur-[2px]' : ''}`}
                    />
                    {redactSensitiveData && (
                      <div className="absolute inset-0 flex items-end justify-center p-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>{t('uploadPrivacy')}</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center p-2">
                    <FileText className="w-8 h-8 text-rose-400" />
                    <span className="text-[9px] font-bold text-zinc-400">PDF</span>
                  </div>
                )}
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-xs font-semibold text-white truncate">{selectedFile.name}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {(selectedFile.size / 1024).toFixed(0)} KB · {selectedFile.type.split('/')[1]?.toUpperCase() || 'FILE'}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="mt-2 text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {t('uploadChange')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Empty / prompt state ── */
          <div className="py-10 px-6 flex flex-col items-center text-center space-y-3 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-950">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-200">{t('uploadDropzone')}</p>
              <p className="text-xs text-zinc-500 mt-1">{t('uploadFormats')}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-400 text-xs border border-zinc-700/60">
              <Camera className="w-3.5 h-3.5" />
              <span>{t('uploadCamera')}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Action bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800">
        {/* Redact toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none min-w-0">
          <input
            type="checkbox"
            checked={redactSensitiveData}
            onChange={(e) => setRedactSensitiveData(e.target.checked)}
            className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-zinc-800 shrink-0 cursor-pointer"
          />
          <div className="flex items-center gap-1.5 min-w-0 text-zinc-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] truncate">{redactLabel}</span>
          </div>
        </label>

        {/* Analyze button — vector icon only, 0 emojis */}
        <button
          onClick={(e) => { e.stopPropagation(); onAnalyze(selectedFile, redactSensitiveData); }}
          disabled={!selectedFile || isAnalyzing}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 whitespace-nowrap cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{t('uploadAnalyzing')}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{analyzeBtnText}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
