import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SupportedLanguage } from '../data/translations';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTND(amount: number, locale: SupportedLanguage | string = 'fr'): string {
  if (amount <= 0) {
    if (locale === 'ar') return 'مجاني';
    if (locale === 'derja') return 'Bel Mèjjen';
    if (locale === 'en') return 'Free';
    return 'Gratuit';
  }
  const formatted = amount.toFixed(3);
  if (locale === 'ar') {
    return `${formatted} د.ت`;
  }
  if (locale === 'derja') {
    return `${formatted} DT`;
  }
  return `${formatted} TND`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function isRTL(locale: string): boolean {
  return locale === 'ar';
}

export function triggerConfetti() {
  if (typeof window !== 'undefined') {
    import('canvas-confetti').then((confettiModule) => {
      const confetti = confettiModule.default;
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#F59E0B', '#6366F1', '#3B82F6'],
      });
    }).catch(() => {
      // ignore
    });
  }
}
