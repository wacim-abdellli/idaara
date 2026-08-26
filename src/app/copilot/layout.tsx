import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المساعد الذكي (AI)',
  description:
    'اسأل Idaara AI بالدارجة التونسية عن أي إجراء إداري: جواز السفر (80 د.ت)، بطاقة التعريف (3 د.ت)، بطاقة عدد 3 (7.5 د.ت)، المناظرات الوطنية، عقود الكراء. مساعد ذكي مجاني 24/7.',
  openGraph: {
    title: 'المساعد الذكي | إدارة.تونس',
    description: 'اسأله بالدارجة التونسية، يجاوبك بالقانون. جواز السفر، بطاقة التعريف، التنابر، المناظرات.',
    url: '/copilot',
  },
  alternates: {
    canonical: '/copilot',
  },
};

export default function CopilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
