import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أطلس البلديات والمصالح',
  description:
    'دليل جغرافي شامل لأكثر من 130 بلدية وقباضة مالية ومركز شرطة وحرس وطني عبر 24 ولاية تونسية — أوقات عمل توقيت رمضان والصيف والشتاء، العناوين، وروابط Waze و Google Maps.',
  openGraph: {
    title: 'أطلس البلديات والمصالح | إدارة.تونس',
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
