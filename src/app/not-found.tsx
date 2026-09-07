import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page introuvable | Idaara.tn',
  description: 'La page que vous recherchez n’existe pas ou a été déplacée.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ink)] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-5 rounded-2xl bg-[var(--stamp-glow)] border border-[var(--border-em)]">
            <FileQuestion className="w-12 h-12 text-[var(--stamp-green)]" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-6xl font-black text-[var(--stamp-green)] font-[var(--font-display)]">404</p>
          <h1 className="text-xl font-bold text-[var(--text-1)]">Page introuvable / الصفحة غير موجودة</h1>
          <p className="text-sm text-[var(--text-2)] leading-relaxed">
            Cette page n’existe pas ou a été déplacée.
            Utilisez la recherche ou retournez à l’accueil.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--stamp-green)] hover:bg-emerald-400 text-black font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            <Home className="w-4 h-4" />
            Accueil / الرئيسية
          </Link>
          <Link
            href="/copilot"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--text-1)] font-semibold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            <Search className="w-4 h-4" />
            Poser une question / استشارة
          </Link>
        </div>
      </div>
    </div>
  );
}
