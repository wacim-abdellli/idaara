import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'فسّرلي الورقة (OCR)',
  description:
    'ارفع وثيقتك الإدارية (تنبيه قباضة، إعلام عدل منفذ، خطية CNSS) وسنفسّرها لك بالدارجة التونسية مع خطة عمل واضحة — بدون حفظ أي ملف (Zero-Storage).',
  openGraph: {
    title: 'فسّرلي الورقة (OCR) | إدارة.تونس',
    description: 'فسّرلي الورقة الرسمية مع خطة عمل بالدارجة التونسية — بدون حفظ ملفات.',
    url: '/fasserli',
  },
  alternates: {
    canonical: '/fasserli',
  },
};

export default function FasserliLayout({ children }: { children: React.ReactNode }) {
  return children;
}
