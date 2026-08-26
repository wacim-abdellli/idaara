import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المناظرات الوطنية والوظيفة العمومية بتونس | إدارة.تونس',
  description:
    'تابع مناظرات STEG، SONEDE، الكاباس، وزارة التربية والصحة والداخلية — الشروط، الوثائق المطلوبة، تواريخ التسجيل، والرواتب. رادار المناظرات المحدث لسنة 2025/2026.',
  keywords: [
    'مناظرات تونس 2025 2026', 'concours publics tunisie', 'concours STEG', 'concours SONEDE',
    'concours CAPES', 'concours ministère éducation tunisie', 'المناظرات الوطنية',
    'وظيفة عمومية تونس',
  ],
  openGraph: {
    title: 'رادار المناظرات الوطنية التونسية 2025/2026 | Idaara.tn',
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
