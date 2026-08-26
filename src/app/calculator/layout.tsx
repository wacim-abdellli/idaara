import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حاسبة التنابر والرسوم',
  description:
    'احسب التنابر الجبائية بالمليم حسب قانون المالية 2025/2026: تنبير جواز السفر (80 د.ت)، بطاقة التعريف (3 د.ت)، البطاقة الرمادية، عقد الكراء، الإشهار العقاري، والمعاليم البلدية.',
  openGraph: {
    title: 'حاسبة التنابر والرسوم | إدارة.تونس',
    description: 'احسب التنابر الجبائية بالمليم وفق قانون المالية الأخير.',
    url: '/calculator',
  },
  alternates: {
    canonical: '/calculator',
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
