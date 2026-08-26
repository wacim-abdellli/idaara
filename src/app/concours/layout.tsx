import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'رادار المناظرات الوطنية',
  description:
    'تابع مناظرات STEG، SONEDE، الكاباس، وزارة التربية والصحة والداخلية — الشروط، الوثائق المطلوبة، تواريخ التسجيل، والرواتب. رادار المناظرات المحدث لسنة 2025/2026.',
  openGraph: {
    title: 'رادار المناظرات الوطنية | إدارة.تونس',
    description: 'مناظرات STEG، SONEDE، الكاباس، وزارة التربية — الشروط والوثائق والمواعيد.',
    url: '/concours',
  },
  alternates: {
    canonical: '/concours',
  },
};

export default function ConcoursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
