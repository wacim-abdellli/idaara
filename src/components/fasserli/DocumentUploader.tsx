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
  RefreshCw,
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
      ? 'تحليل وفك رموز الوثيقة فورياً'
      : locale === 'fr'
      ? 'Analyser & Décoder la Notice'
      : 'Fasserli Hal War9a bel AI';

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
      />

      {selectedFile ? (
        /* ═════════════════════════════════════════════════════════════════
           UNIFIED SELECTED DOCUMENT INSPECTOR (CLEAN & COMPACT)
        ══════════════════════════════════════════════════════════════════ */
        <div className="rounded-3xl bg-[#12141a] border border-emerald-500/30 p-5 sm:p-6 shadow-2xl space-y-5 relative overflow-hidden ring-1 ring-emerald-500/20">
          
          {/* Top Status Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {locale === 'ar' ? 'تم تحميل الوثيقة · جاهزة للتحليل' : 'DOCUMENT CHARGÉ · PRÊT POUR LE DÉCODAGE'}
              </span>
            </div>

            <button
              onClick={clearFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{locale === 'ar' ? 'تغيير الوثيقة' : 'Changer'}</span>
            </button>
          </div>

          {/* Main Visual Row: Image Preview + Metadata & Privacy */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5">
            {/* Visual Preview Container */}
            <div className="relative shrink-0 w-32 h-36 sm:w-36 sm:h-40 rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center shadow-xl">
              {previewUrl && !isPdf ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Document preview"
                    className={`w-full h-full object-cover ${redactSensitiveData ? 'blur-[1.2px]' : ''}`}
                  />
                  {redactSensitiveData && (
                    <div className="absolute inset-0 flex items-end justify-center p-2 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold shadow-sm">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{t('uploadPrivacy')}</span>
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center p-3">
                  <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <FileText className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400">PDF FORMAT</span>
                </div>
              )}

              {/* Laser Scanner Beam */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-emerald-500/15 pointer-events-none flex flex-col justify-between overflow-hidden z-20">
                  <div className="w-full h-1 bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,1)] animate-bounce" />
                  <div className="w-full text-[8px] font-mono font-bold text-emerald-300 text-center bg-black/85 py-0.5 tracking-widest">
                    ANALYSE EN COURS...
                  </div>
                </div>
              )}
            </div>

            {/* Document Details & Privacy Controls */}
            <div className="flex-1 flex flex-col justify-between space-y-3 text-center sm:text-left rtl:sm:text-right min-w-0">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                  NOM DU FICHIER :
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {selectedFile.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(0)} KB · {selectedFile.type.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                </p>
              </div>

              {/* Privacy Redaction Toggle Box */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={redactSensitiveData}
                  onChange={(e) => setRedactSensitiveData(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-zinc-900 shrink-0 cursor-pointer"
                />
                <div className="flex items-center gap-1.5 min-w-0 text-zinc-300 text-xs font-medium">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{redactLabel}</span>
                </div>
              </label>
            </div>
          </div>

          {/* Integrated High-Impact Scan Action Button */}
          <button
            onClick={() => onAnalyze(selectedFile, redactSensitiveData)}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                <span>{t('uploadAnalyzing')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-zinc-950" />
                <span>{analyzeBtnText}</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* ═════════════════════════════════════════════════════════════════
           EMPTY STATE DROPZONE CANVAS
        ══════════════════════════════════════════════════════════════════ */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden p-8 sm:p-12 flex flex-col items-center text-center space-y-4 cursor-pointer group ${
            isDragOver
              ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01] shadow-2xl shadow-emerald-500/20'
              : 'border-white/10 hover:border-emerald-500/40 bg-[#12141a]/60 hover:bg-[#12141a]/90 shadow-xl'
          }`}
        >
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
  );
};
