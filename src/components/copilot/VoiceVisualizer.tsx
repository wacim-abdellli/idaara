'use client';

import React, { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
  color?: string;
  barCount?: number;
  height?: number;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isActive,
  color = '#10B981',
  barCount = 32,
  height = 48,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const barWidth = Math.floor(width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 4;
        if (isActive) {
          // Dynamic procedural animated waveform
          const sinValue = Math.sin(phase + i * 0.35);
          const cosValue = Math.cos(phase * 1.5 + i * 0.2);
          const combined = Math.abs(sinValue * 0.6 + cosValue * 0.4);
          barHeight = Math.max(4, combined * (canvas.height - 6));
        }

        const x = i * (barWidth + 2);
        const y = (canvas.height - barHeight) / 2;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, '#6366F1');

        ctx.fillStyle = isActive ? gradient : 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      phase += 0.08;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, color, barCount]);

  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        width={320}
        height={height}
        className="w-full max-w-sm h-12"
      />
    </div>
  );
};
