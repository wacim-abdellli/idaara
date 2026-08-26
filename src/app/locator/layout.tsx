import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دليل البلديات والمصالح الإدارية بتونس — أوقات العمل والعنوان | إدارة.تونس',
  description:
    'دليل جغرافي شامل لأكثر من 130 بلدية وقباضة مالية ومركز شرطة وحرس وطني عبر 24 ولاية تونسية — أوقات عمل توقيت رمضان والصيف والشتاء، العناوين، وروابط Waze و Google Maps.',
  keywords: [
    'بلديات تونس', 'Baladiyas Tunisie', 'مواعيد البلدية', 'horaires baladiya tunisie',
    'قباضة مالية تونس', 'adresse baladiya', 'توقيت رمضان الإدارات التونسية',
  ],
  openGraph: {
    title: 'أطلس البلديات والمصالح الإدارية — 24 ولاية تونسية | Idaara.tn',
    description: 'العنوان وأوقات العمل لأكثر من 130 مصلحة إدارية عبر ولايات تونس.',
    url: '/locator',
  },
  alternates: {
    canonical: '/locator',
  },
};

export default function LocatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
