import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الوثائق والعقود الرسمية',
  description:
    'استخرج عقد كراء سكني، توكيل رسمي، تصريح بضياع، إقرار بدين، أو شهادة إيواء بصيغة PDF رسمية جاهزة للتعريف بالإمضاء في البلدية. مجاني وفوري.',
  openGraph: {
    title: 'الوثائق والعقود الرسمية | إدارة.تونس',
    description: 'استخرج عقودك الرسمية PDF جاهزة للتعريف بالإمضاء في البلدية.',
    url: '/documents',
  },
  alternates: {
    canonical: '/documents',
  },
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
