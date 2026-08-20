'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, EyeOff, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

interface DocumentUploaderProps {
  onAnalyze: (file: File | null, redactSensitiveData: boolean) => void;
  isAnalyzing: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onAnalyze,
  isAnalyzing,
}) => {
  const { t } = useLocale();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [redactSensitiveData, setRedactSensitiveData] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-zinc-700 hover:border-emerald-500/60 bg-zinc-900/40 hover:bg-zinc-900/70 transition-all rounded-2xl p-8 text-center relative overflow-hidden group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden"
        />

        {previewUrl ? (
          <div className="space-y-3">
            <div className="relative max-h-48 max-w-xs mx-auto overflow-hidden rounded-lg border border-zinc-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Document preview"
                className={`w-full h-auto object-cover ${
                  redactSensitiveData ? 'filter blur-[1px]' : ''
                }`}
              />
              {redactSensitiveData && (
                <div className="absolute top-2 right-2 bg-zinc-950/80 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Données Masquées</span>
                </div>
              )}
            </div>
            <p className="text-xs text-zinc-300 font-medium">{selectedFile?.name}</p>
            <span className="text-[11px] text-emerald-400">An9or bech tbaddel el war9a</span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-200">
                7ott el war9a lena (Dropzone) walla an9or bech t'telechargi
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Formats acceptés: PNG, JPG, PDF (Avis de redressement, convocation, mise en demeure...)
              </p>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs">
              <Camera className="w-3.5 h-3.5" />
              <span>Prendre une photo avec caméra</span>
            </div>
          </div>
        )}
      </div>

      {/* Privacy & Redaction Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs">
        <label className="flex items-center space-x-2 cursor-pointer text-zinc-300">
          <input
            type="checkbox"
            checked={redactSensitiveData}
            onChange={(e) => setRedactSensitiveData(e.target.checked)}
            className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-zinc-800"
          />
          <div className="flex items-center space-x-1.5">
            <EyeOff className="w-3.5 h-3.5 text-amber-400" />
            <span>Masquage automatique des numéros CIN & RIB avant l'analyse</span>
          </div>
        </label>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAnalyze(selectedFile, redactSensitiveData);
          }}
          disabled={!selectedFile || isAnalyzing}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyse OCR en cours...</span>
            </>
          ) : (
            <>
              <span>🔍 Fasserli Hal War9a</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
