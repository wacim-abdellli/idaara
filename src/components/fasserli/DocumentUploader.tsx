'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Lock,
  ShieldCheck,
  Loader2,
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
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
  const [isDragOver, setIsDragOver] = useState(false);
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
    setIsDragOver(false);
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
      ? 'Scan & Decode Document'
      : locale === 'ar'
      ? 'تحليل وفك رموز الوثيقة'
      : locale === 'fr'
      ? 'Analyser & Décoder le Document'
      : 'Fasserli Hal War9a bel AI';

  return (
    <div className="w-full space-y-4">
      {/* ── Hidden File Input ── */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
      />

      {/* ── Main Drop Canvas ── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
          selectedFile
            ? 'border-emerald-500/40 bg-[#12141a]/95 shadow-2xl ring-1 ring-emerald-500/20'
            : isDragOver
            ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01] shadow-2xl shadow-emerald-500/20'
            : 'border-dashed border-white/10 hover:border-emerald-500/40 bg-[#12141a]/60 hover:bg-[#12141a]/90 cursor-pointer shadow-xl'
        }`}
      >
        {selectedFile ? (
          /* ── Active File Deck ── */
          <div className="p-5 sm:p-6 space-y-4">
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  {locale === 'ar' ? 'جاهز للتحليل الذكي' : 'DOCUMENT CHARGÉ'}
                </span>
              </div>
              <button
                onClick={clearFile}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Remove file"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">{locale === 'ar' ? 'إلغاء' : 'Changer'}</span>
              </button>
            </div>

            {/* Document Details & Visual Laser Preview */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="relative shrink-0 w-28 h-36 rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center shadow-xl group">
                {previewUrl && !isPdf ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Document preview"
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        redactSensitiveData ? 'blur-[1.5px]' : ''
                      }`}
                    />
                    {redactSensitiveData && (
                      <div className="absolute inset-0 flex items-end justify-center p-1.5 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
                          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{t('uploadPrivacy')}</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center p-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-400">PDF FORMAT</span>
                  </div>
                )}

                {/* Futuristic Laser Scanner Beam */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-emerald-500/15 pointer-events-none flex flex-col justify-between overflow-hidden z-20">
                    <div className="w-full h-1 bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,1)] animate-bounce" />
                    <div className="w-full text-[8px] font-mono font-bold text-emerald-300 text-center bg-black/80 py-0.5 tracking-widest">
                      AI DECODING...
                    </div>
                  </div>
                )}
              </div>

              {/* Metadata Info */}
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right space-y-2 min-w-0">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-sm">
                    {selectedFile.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {(selectedFile.size / 1024).toFixed(0)} KB · {selectedFile.type.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-end gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Confidentialité locale</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Zero-Storage</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Empty Prompt Dropzone ── */
          <div className="py-12 sm:py-16 px-6 flex flex-col items-center text-center space-y-4 group">
            <div className="relative">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-950/50">
                <UploadCloud className="w-8 h-8" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 rounded-full bg-emerald-400/20 border border-emerald-400 items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-emerald-300" />
              </span>
            </div>

            <div className="space-y-1 max-w-sm">
              <p className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                {t('uploadDropzone')}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t('uploadFormats')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer shadow-sm"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('uploadCamera')}</span>
              </button>
              <span className="text-xs text-zinc-500">ou glissez-déposez ici</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Studio Bottom Action Deck ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#12141a] border border-white/[0.08] shadow-xl">
        {/* Privacy Redaction Switch */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none min-w-0">
          <input
            type="checkbox"
            checked={redactSensitiveData}
            onChange={(e) => setRedactSensitiveData(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-zinc-900 shrink-0 cursor-pointer"
          />
          <div className="flex items-center gap-1.5 min-w-0 text-zinc-300 text-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{redactLabel}</span>
          </div>
        </label>

        {/* Action Trigger Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAnalyze(selectedFile, redactSensitiveData);
          }}
          disabled={!selectedFile || isAnalyzing}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
              <span>{t('uploadAnalyzing')}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-zinc-950 shrink-0" />
              <span>{analyzeBtnText}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
