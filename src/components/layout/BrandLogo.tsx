'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BrandIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  const iconSize = Math.max(16, size);
  const svgSize = Math.round(iconSize * 0.625);

  return (
    <div
      style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      className={`rounded-[10px] bg-[#0c0d0f] border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-950/80 shrink-0 relative overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        style={{ width: `${svgSize}px`, height: `${svgSize}px` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 8.5h10M15 8.5v15M10 23.5h10"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="22" r="2.8" fill="#10b981" />
      </svg>
    </div>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 32,
  showText = true,
}) => {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group shrink-0 select-none ${className}`}>
      <BrandIcon size={size} className="group-hover:scale-105 group-hover:shadow-emerald-500/30 transition-all" />
      {showText && (
        <span className="font-extrabold text-base sm:text-lg text-white tracking-tight group-hover:opacity-90 transition-opacity">
          Idaara<span className="text-emerald-400">.tn</span>
        </span>
      )}
    </Link>
  );
};
