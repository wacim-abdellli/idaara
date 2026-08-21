'use client';

import React, { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 120,
    damping: 18,
  });

  const display = useTransform(springVal, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  return <motion.span className={className}>{display}</motion.span>;
};
