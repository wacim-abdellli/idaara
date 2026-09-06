'use client';

import React from 'react';

export interface CrestProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * 🏛️ Idaara Civic Crest (Iconic Tunisian Khatam & Administrative Seal)
 * Bespoke geometric emblem intertwining the Tunisian national crescent & star
 * with the octagonal seal of official administrative justice.
 */
export const IdaaraCrest: React.FC<CrestProps> = ({
  className = '',
  size = 32,
  glow = false,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-md animate-pulse"
          style={{ transform: 'scale(1.3)' }}
        />
      )}
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-sm"
      >
        {/* Outer Octagonal Civic Frame (Tunisian Khatam Geometric Seal) */}
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10"
          className="fill-[#0e1117] stroke-emerald-500/40"
          strokeWidth="1.5"
        />
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10"
          transform="rotate(45 24 24)"
          className="stroke-emerald-400/25"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Golden Inner Seal Ring */}
        <circle
          cx="24"
          cy="24"
          r="14.5"
          className="stroke-[#C8960C]/40"
          strokeWidth="1"
        />

        {/* Stylized Tunisian Crescent */}
        <path
          d="M24 13.5C18.2 13.5 13.5 18.2 13.5 24C13.5 29.8 18.2 34.5 24 34.5C27.2 34.5 30 33.1 32 30.8C29.6 31.8 26.9 32.1 24.3 31.5C19.2 30.2 16.1 25.1 17.4 20C18.4 16.1 21.8 13.5 25.8 13.5C25.2 13.5 24.6 13.5 24 13.5Z"
          className="fill-emerald-400"
        />

        {/* Central Five-Point Star */}
        <path
          d="M27.5 18.8L28.6 21.6L31.5 22.2L29.3 24.1L30 27L27.5 25.4L25 27L25.7 24.1L23.5 22.2L26.4 21.6L27.5 18.8Z"
          className="fill-[#C8960C]"
        />

        {/* Modern Intelligence Node */}
        <circle cx="36" cy="12" r="2" className="fill-emerald-400" />
        <circle cx="36" cy="12" r="3.5" className="stroke-emerald-400/50" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

/**
 * ⚡ JORT Verification Scanner Orb
 * Displayed while Idaara AI is actively scanning Tunisian legal gazettes and formulating responses.
 */
export const JortPulseOrb: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      {/* Outer concentric pulsing ring */}
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
      {/* Middle rotating orbit */}
      <span className="animate-spin absolute inline-flex h-full w-full rounded-full border border-emerald-500/40 border-t-transparent border-r-transparent" />
      {/* Core glowing emerald seal */}
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-sm shadow-emerald-400" />
    </div>
  );
};
