import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fasserli OCR — فسّرلي الورقة | تحليل الوثائق الإدارية بالذكاء الاصطناعي',
  description:
    'ارفع وثيقتك الإدارية (تنبيه قباضة، إعلام عدل منفذ، خطية CNSS) وسنفسّرها لك بالدارجة التونسية مع خطة عمل واضحة — بدون حفظ أي ملف (Zero-Storage).',
  openGraph: {
    title: 'Fasserli — فسّرلي الورقة | Idaara.tn',
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
