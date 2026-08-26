import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أرقام الطوارئ والمصالح الحكومية التونسية — 197، 190، 198، 193 | إدارة.تونس',
  description:
    'دليل شامل لأرقام الطوارئ التونسية: الشرطة 197، SAMU 190، الحماية المدنية 198، الحرس الوطني 193 — ومئات أرقام الوزارات والمصالح الحكومية الأخرى. اتصل مباشرة أو انسخ الرقم.',
  keywords: [
    'أرقام طوارئ تونس', 'numéros urgence tunisie', '197 tunisie', '190 tunisie SAMU',
    'رقم الشرطة تونس', 'رقم الإسعاف تونس', 'contacter ministère tunisie',
    'وزارات تونس أرقام هاتف',
  ],
  openGraph: {
    title: 'أرقام الطوارئ والوزارات التونسية — 197، 190، 198 | Idaara.tn',
    description: 'دليل أرقام الطوارئ والوزارات والمصالح الحكومية التونسية.',
    url: '/contacts',
  },
  alternates: {
    canonical: '/contacts',
  },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
