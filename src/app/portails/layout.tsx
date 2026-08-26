import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'البوابات الحكومية',
  description:
    'دليل موحد لـ 18 بوابة حكومية تونسية رسمية: e-Houwiya (الهوية الرقمية)، بطاقة عدد 3 الإلكترونية، e-CNSS، CNAM، ATTT، السجل التجاري RNE، الرائد الرسمي JORT، e-Finance. روابط مباشرة ودليل الاستخدام.',
  openGraph: {
    title: 'البوابات الحكومية | إدارة.تونس',
    description: 'دليل 18 بوابة حكومية تونسية رسمية مع روابط مباشرة ودليل الاستخدام.',
    url: '/portails',
  },
  alternates: {
    canonical: '/portails',
  },
};

export default function PortailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
