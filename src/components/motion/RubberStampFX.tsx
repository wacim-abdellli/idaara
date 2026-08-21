'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Stamp, CheckCircle2 } from 'lucide-react';

interface RubberStampFXProps {
  label?: string;
  sublabel?: string;
  type?: 'approved' | 'legalized' | 'registered';
  onTrigger?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const RubberStampFX: React.FC<RubberStampFXProps> = ({
  label = 'CONFORME / مصادق',
  sublabel = 'RÉPUBLIQUE TUNISIENNE',
  type = 'approved',
  onTrigger,
  className = '',
  children,
}) => {
  const [stamped, setStamped] = useState(false);

  const handleStamp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStamped(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00C07F', '#10B981', '#F59E0B', '#3B82F6'],
      });
    } catch {}

    if (onTrigger) onTrigger();
  };

  const isApproved = type === 'approved';
  const stampColor = isApproved ? 'text-emerald-400 border-emerald-400' : 'text-amber-400 border-amber-400';
  const shadowColor = isApproved ? 'rgba(0, 192, 127, 0.3)' : 'rgba(245, 158, 11, 0.3)';

  return (
    <div className={`relative ${className}`} onClick={handleStamp}>
      {children}

      <AnimatePresence>
        {stamped && (
          <motion.div
            initial={{ scale: 2.4, rotate: -22, opacity: 0, filter: 'blur(8px)' }}
            animate={{ scale: 1, rotate: -8, opacity: 0.92, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 20,
              mass: 0.8,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 select-none"
          >
            {/* Stamp border and ink design */}
            <div
              className={`px-4 py-2 rounded-xl border-4 ${stampColor} bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center`}
              style={{
                boxShadow: `0 0 30px ${shadowColor}, inset 0 0 15px ${shadowColor}`,
              }}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-zinc-400">
                {sublabel}
              </span>
              <span className="text-sm sm:text-base font-extrabold tracking-wider font-mono uppercase">
                {label}
              </span>
            </div>

            {/* Shockwave expanding ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`absolute inset-0 rounded-2xl border-2 ${stampColor} pointer-events-none`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
