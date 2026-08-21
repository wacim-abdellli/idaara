'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group shrink-0 select-none ${className}`}>
      {/* Visual Monogram Icon matching browser tab favicon */}
      <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/60 group-hover:scale-105 group-hover:border-emerald-400 transition-all shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 9h10M15 9v14M10 23h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23.5" cy="21.5" r="2.5" fill="#10b981" />
        </svg>
      </div>

      {/* Typography */}
      <span className="font-extrabold text-base sm:text-lg text-white tracking-tight group-hover:opacity-90 transition-opacity">
        Idaara<span className="text-emerald-400">.tn</span>
      </span>
    </Link>
  );
};
