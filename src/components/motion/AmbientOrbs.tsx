'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AmbientOrbsProps {
  variant?: 'emerald' | 'amber' | 'cyan' | 'mixed';
  className?: string;
}

export const AmbientOrbs: React.FC<AmbientOrbsProps> = ({
  variant = 'emerald',
  className = '',
}) => {
  const getOrbColors = () => {
    switch (variant) {
      case 'amber':
        return {
          orb1: 'bg-amber-500/[0.03]',
          orb2: 'bg-orange-500/[0.02]',
        };
      case 'cyan':
        return {
          orb1: 'bg-cyan-500/[0.03]',
          orb2: 'bg-teal-500/[0.02]',
        };
      case 'mixed':
        return {
          orb1: 'bg-emerald-500/[0.03]',
          orb2: 'bg-indigo-500/[0.02]',
        };
      case 'emerald':
      default:
        return {
          orb1: 'bg-emerald-500/[0.035]',
          orb2: 'bg-teal-500/[0.02]',
        };
    }
  };

  const colors = getOrbColors();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary Floating Glowing Orb */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full ${colors.orb1} blur-[160px]`}
      />

      {/* Secondary Counter-Drifting Orb */}
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full ${colors.orb2} blur-[160px]`}
      />
    </div>
  );
};
