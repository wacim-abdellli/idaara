'use client';

import React from 'react';

export interface StarburstProps {
  className?: string;
  size?: number;
  spinning?: boolean;
  color?: string; // default terracotta #da7756
}

/**
 * Pixel-accurate Claude 8-spoke asterism / starburst icon
 * As seen in Claude.ai dark mode (#da7756 terracotta)
 */
export const ClaudeStarburst: React.FC<StarburstProps> = ({
  className = '',
  size = 28,
  spinning = false,
  color = '#da7756',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${spinning ? 'animate-spin' : ''} ${className}`}
      style={{
        animationDuration: spinning ? '4s' : undefined,
        animationTimingFunction: 'linear',
      }}
      aria-hidden="true"
    >
      <g transform="translate(12, 12)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x="-1.4"
            y="-10"
            width="2.8"
            height="7.2"
            rx="1.4"
            fill={color}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="2.4" fill={color} />
      </g>
    </svg>
  );
};
