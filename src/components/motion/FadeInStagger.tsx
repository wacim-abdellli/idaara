'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

const getDirectionOffset = (direction: 'up' | 'down' | 'left' | 'right' | 'none') => {
  switch (direction) {
    case 'up': return { y: 24, x: 0 };
    case 'down': return { y: -24, x: 0 };
    case 'left': return { x: 24, y: 0 };
    case 'right': return { x: -24, y: 0 };
    case 'none': return { x: 0, y: 0 };
  }
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.45,
}) => {
  const offset = getDirectionOffset(direction);

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  faster?: boolean;
}

const containerVariants = (faster: boolean): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: faster ? 0.04 : 0.08,
      delayChildren: 0.05,
    },
  },
});

export const FadeInStagger: React.FC<FadeInStaggerProps> = ({
  children,
  className = '',
  faster = false,
}) => {
  return (
    <motion.div
      variants={containerVariants(faster)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
    },
  },
};

export const FadeInItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
