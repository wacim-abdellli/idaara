import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'البوابات الإلكترونية الحكومية التونسية — e-Houwiya، B3، CNSS، ATTT | إدارة.تونس',
  description:
    'دليل موحد لـ 18 بوابة حكومية تونسية رسمية: e-Houwiya (الهوية الرقمية)، بطاقة عدد 3 الإلكترونية، e-CNSS، CNAM، ATTT، السجل التجاري RNE، الرائد الرسمي JORT، e-Finance. روابط مباشرة ودليل الاستخدام.',
  keywords: [
    'e-Houwiya تونس', 'بطاقة عدد 3 إلكترونية', 'e-CNSS تونس', 'portails gouvernementaux tunisie',
    'portail administratif tunisie', 'b3.interieur.gov.tn', 'ATTT تونس', 'RNE تونس',
  ],
  openGraph: {
    title: 'البوابات الحكومية التونسية الرسمية — دليل موحد | Idaara.tn',
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
