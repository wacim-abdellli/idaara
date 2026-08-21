'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group shrink-0 select-none ${className}`}>
      {/* Exact Monogram Tile matching media_1787292079120 */}
      <div className="w-8 h-8 rounded-[10px] bg-[#0c0d0f] border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-950/80 group-hover:scale-105 group-hover:shadow-emerald-500/30 transition-all shrink-0 relative overflow-hidden">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bold seriffed white I */}
          <path
            d="M10 8.5h10M15 8.5v15M10 23.5h10"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Vibrant emerald dot next to base of I */}
          <circle cx="23" cy="22" r="2.8" fill="#10b981" />
        </svg>
      </div>

      {/* Typography */}
      <span className="font-extrabold text-base sm:text-lg text-white tracking-tight group-hover:opacity-90 transition-opacity">
        Idaara<span className="text-emerald-400">.tn</span>
      </span>
    </Link>
  );
};
