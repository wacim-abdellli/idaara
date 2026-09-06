'use client';

import React from 'react';
import { BrandIcon } from '../layout/BrandLogo';

export interface CrestProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Official Idaara Brand Icon component wrapper
 */
export const IdaaraCrest: React.FC<CrestProps> = ({
  className = '',
  size = 32,
}) => {
  return <BrandIcon size={size} className={className} />;
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
