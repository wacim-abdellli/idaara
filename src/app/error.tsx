'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to monitoring service in production
    console.error('[Idaara Error]', error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ink)] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-[var(--queue-red)]/10 border border-[var(--queue-red)]/20">
            <AlertTriangle className="w-10 h-10 text-[var(--queue-red)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[var(--text-1)]">
            Une erreur est survenue
          </h1>
          <p className="text-sm text-[var(--text-2)]">
            {error.digest ? `Code: ${error.digest}` : 'Veuillez réessayer ou revenir à l’accueil.'}
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--stamp-green)] hover:bg-emerald-400 text-black font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
      </div>
    </div>
  );
}
