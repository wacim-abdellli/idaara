import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'فضاء المستقل (1%)',
  description:
    'محاكي نظام المبادر الذاتي بتونس: ضريبة 1% على رقم المعاملات، TVA 0%، تسقيف 75,000 د.ت سنوياً. مولّد فواتير تصدير الخدمات بالعملة الصعبة (EUR/USD) المعتمد من البنك المركزي التونسي.',
  openGraph: {
    title: 'فضاء المستقل (1%) | إدارة.تونس',
    description: 'ضريبة 1%، TVA 0%، وفواتير تصدير بالعملة الصعبة — للمستقلين التونسيين.',
    url: '/launchpad',
  },
  alternates: {
    canonical: '/launchpad',
  },
};

export default function LaunchpadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
