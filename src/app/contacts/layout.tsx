import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أرقام الطوارئ والمصالح',
  description:
    'دليل شامل لأرقام الطوارئ التونسية: الشرطة 197، SAMU 190، الحماية المدنية 198، الحرس الوطني 193 — ومئات أرقام الوزارات والمصالح الحكومية الأخرى. اتصل مباشرة أو انسخ الرقم.',
  openGraph: {
    title: 'أرقام الطوارئ والمصالح | إدارة.تونس',
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
