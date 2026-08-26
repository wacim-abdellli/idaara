import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دليل الإجراءات الإدارية',
  description:
    'دليل شامل لأكثر من 60 إجراء إداري تونسي: جواز السفر، بطاقة التعريف، البطاقة الرمادية، بطاقة عدد 3، رخصة البناء، حجة الوفاة، المبادر الذاتي — الأوراق المطلوبة والتنابر الجبائية والآجال الرسمية.',
  openGraph: {
    title: 'دليل الإجراءات الإدارية | إدارة.تونس',
    description: 'الأوراق والتنابر والآجال لأكثر من 60 إجراء إداري تونسي.',
    url: '/procedures',
  },
  alternates: {
    canonical: '/procedures',
  },
};

export default function ProceduresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
