import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'فضاء المستقل — المبادر الذاتي 1% وفواتير التصدير | إدارة.تونس',
  description:
    'محاكي نظام المبادر الذاتي بتونس: ضريبة 1% على رقم المعاملات، TVA 0%، تسقيف 75,000 د.ت سنوياً. مولّد فواتير تصدير الخدمات بالعملة الصعبة (EUR/USD) المعتمد من البنك المركزي التونسي.',
  keywords: [
    'مبادر ذاتي تونس', 'auto entrepreneur tunisie', 'impôt 1% auto entrepreneur tunisie',
    'freelance tunisie', 'facture export devises tunisie', 'BCT devises freelance',
    'ضريبة المبادر الذاتي', 'تسجيل مبادر ذاتي',
  ],
  openGraph: {
    title: 'المبادر الذاتي 1% — محاكي ومولد فواتير التصدير | Idaara.tn',
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
