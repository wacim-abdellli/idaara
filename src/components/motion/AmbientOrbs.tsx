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
          orb1: 'bg-amber-500/10',
          orb2: 'bg-orange-500/5',
        };
      case 'cyan':
        return {
          orb1: 'bg-cyan-500/10',
          orb2: 'bg-teal-500/5',
        };
      case 'mixed':
        return {
          orb1: 'bg-emerald-500/10',
          orb2: 'bg-indigo-500/8',
        };
      case 'emerald':
      default:
        return {
          orb1: 'bg-emerald-500/10',
          orb2: 'bg-teal-500/5',
        };
    }
  };

  const colors = getOrbColors();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary Floating Glowing Orb */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-20 left-1/4 w-[550px] h-[550px] rounded-full ${colors.orb1} blur-[140px]`}
      />

      {/* Secondary Counter-Drifting Orb */}
      <motion.div
        animate={{
          x: [0, -50, 35, 0],
          y: [0, 40, -25, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full ${colors.orb2} blur-[130px]`}
      />
    </div>
  );
};
