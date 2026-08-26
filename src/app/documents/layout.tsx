import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الوثائق الرسمية — عقود PDF جاهزة للتعريف بالإمضاء | إدارة.تونس',
  description:
    'استخرج عقد كراء سكني، توكيل رسمي، تصريح بضياع، إقرار بدين، أو شهادة إيواء بصيغة PDF رسمية جاهزة للتعريف بالإمضاء في البلدية. مجاني وفوري.',
  openGraph: {
    title: 'عقود PDF رسمية — عقد كراء، توكيل، تصريح بضياع | Idaara.tn',
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
