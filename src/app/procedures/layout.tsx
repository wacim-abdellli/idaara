import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دليل الإجراءات الإدارية التونسية — الأوراق والتنابر والآجال | إدارة.تونس',
  description:
    'دليل شامل لأكثر من 60 إجراء إداري تونسي: جواز السفر، بطاقة التعريف، البطاقة الرمادية، بطاقة عدد 3، رخصة البناء، حجة الوفاة، المبادر الذاتي — الأوراق المطلوبة والتنابر الجبائية والآجال الرسمية.',
  keywords: [
    'إجراءات إدارية تونسية', 'أوراق جواز السفر', 'تجديد بطاقة التعريف',
    'بطاقة عدد 3 تونس', 'رخصة البناء تونس', 'حجة الوفاة تونس',
    'démarches administratives tunisiennes', 'renouveler passeport tunisie',
  ],
  openGraph: {
    title: 'دليل الإجراءات الإدارية التونسية | Idaara.tn',
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
