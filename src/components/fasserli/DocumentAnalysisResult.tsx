'use client';

import React from 'react';
import { OCRAnalysisResult } from '../../types/chat';
import { useLocale } from '../../context/LocaleContext';
import {
  AlertTriangle,
  Clock,
  Building2,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

import { getLocalized, getLocalizedArray } from '../../lib/locale-utils';

interface DocumentAnalysisResultProps {
  result: OCRAnalysisResult;
}

export const DocumentAnalysisResult: React.FC<DocumentAnalysisResultProps> = ({
  result,
}) => {
  const { locale } = useLocale();

  const docType = getLocalized(result.documentType, locale);
  const authority = getLocalized(result.issuingAuthority, locale);
  const penalty = getLocalized(result.penaltyRisk, locale);
  const summaryBullets = getLocalizedArray(result.summary, locale);
  const legalContext = getLocalized(result.legalContext, locale);

  const urgencyColors = {
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    critical: 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse',
  };

  return (
    <div className="space-y-6 glass-panel rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-2xl">
      {/* Header with Title & Urgency Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center space-x-2 text-xs text-zinc-400 font-medium mb-1">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{authority}</span>
            {result.referenceNumber && (
              <span className="font-mono text-zinc-500">· Réf: {result.referenceNumber}</span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {docType}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${
              urgencyColors[result.urgency]
            }`}
          >
            {result.urgency === 'critical'
              ? '🚨 Urgentissime'
              : result.urgency === 'high'
              ? '⚠️ Priorité Haute'
              : 'ℹ️ Information'}
          </span>
        </div>
      </div>

      {/* 1. Plain-Language Summary (3 Simple Points) */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-bold text-emerald-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
            1
          </span>
          <span>Chnowa ma3naha hal war9a? (Explication en 3 points clairs)</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          {summaryBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-sm text-zinc-200">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Deadlines & Penalties Card */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-bold text-amber-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs">
            2
          </span>
          <span>El Âjel wel Khnayet (Délais légaux & Risques de pénalités)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/30">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>Délai de réponse :</span>
            </div>
            <p className="text-sm font-semibold text-zinc-100">
              {result.deadlineDate || '30 jours à compter de la notification'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-red-500/30">
            <div className="flex items-center space-x-2 text-red-400 text-xs font-bold mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Risque en cas de retard :</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">{penalty}</p>
          </div>
        </div>
      </div>

      {/* 3. Action Checklist & Target Office */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-bold text-indigo-400">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
            3
          </span>
          <span>Chnowa lezmek ta3mel tawa? (Plan d'action & Démarches)</span>
        </div>

        <div className="space-y-3">
          {result.actionItems.map((item, idx) => {
            const task = getLocalized(item.task, locale);
            const office = getLocalized(item.office, locale);

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-zinc-100">
                    <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{task}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-400">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Guichet : {office}</span>
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <span className="font-medium text-zinc-300">Awra9 lezmin m3ak : </span>
                  <span>{item.requiredPapers.join(' · ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal reference note */}
      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center space-x-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Cadre juridique : {legalContext}</span>
        </div>
        <Link
          href="/copilot"
          className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-medium"
        >
          <span>Poser une question au Copilot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
