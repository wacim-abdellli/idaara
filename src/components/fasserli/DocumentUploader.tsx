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
  RefreshCw,
  Eye,
  Check,
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
      ? 'حجب أرقام بطاقة التعريف والحساب البنكي'
      : locale === 'fr'
      ? 'Masquer les numéros sensibles (CIN & RIB)'
      : 'Imser les numéros CIN & RIB';

  const analyzeBtnText =
    locale === 'en'
      ? 'Scan & Decode Notice'
      : locale === 'ar'
      ? 'تحليل وفك رموز الوثيقة'
      : locale === 'fr'
      ? 'Lancer le Décryptage IA'
      : 'Fasserli Hal War9a';

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
           MINIMALIST, SLEEK DOCUMENT INSPECTION CARD
        ══════════════════════════════════════════════════════════════════ */
        <div className="rounded-3xl bg-[#14161d] border border-white/[0.08] p-5 sm:p-7 shadow-2xl space-y-5 relative">
          
          {/* Main Horizontal Preview & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5">
            
            <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
              {/* Document Thumbnail Preview */}
              <div className="relative shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-md">
                {previewUrl && !isPdf ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Document preview"
                      className={`w-full h-full object-cover ${redactSensitiveData ? 'blur-[1px]' : ''}`}
                    />
                    {redactSensitiveData && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-emerald-400" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-white/[0.02]">
                    <FileText className="w-7 h-7 text-rose-400" />
                    <span className="text-[9px] font-mono font-bold text-zinc-400">PDF</span>
                  </div>
                )}

                {/* Laser Scanning Line */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-1 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)] animate-bounce" />
                  </div>
                )}
              </div>

              {/* Document Info */}
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                    {locale === 'ar' ? 'جاهز للتحليل' : 'Prêt pour l’analyse'}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[260px] sm:max-w-xs">
                  {selectedFile.name}
                </h3>

                <p className="text-xs text-zinc-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(0)} KB · {selectedFile.type.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                </p>
              </div>
            </div>

            {/* Change / Replace Button */}
            <button
              onClick={clearFile}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 self-end sm:self-center"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'تغيير الوثيقة' : 'Remplacer'}</span>
            </button>
          </div>

          {/* Privacy Redaction Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={redactSensitiveData}
                onChange={(e) => setRedactSensitiveData(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-zinc-900 shrink-0 cursor-pointer"
              />
              <span className="text-xs text-zinc-300 font-medium">
                {redactLabel}
              </span>
            </label>

            <span className="text-[11px] font-mono text-emerald-400/90 hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Local</span>
            </span>
          </div>

          {/* Full-Width Vibrant Scan Action */}
          <button
            onClick={() => onAnalyze(selectedFile, redactSensitiveData)}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
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
      ) : (
        /* ═════════════════════════════════════════════════════════════════
           CLEAN MINIMALIST DROPZONE
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
