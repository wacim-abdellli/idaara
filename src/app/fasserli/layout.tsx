import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fasserli OCR',
  description:
    'Fasserli : décodeur OCR de documents et courriers administratifs tunisiens avec plan d\'action instantané et confidentialité garantie sans conservation de fichiers.',
  openGraph: {
    title: 'Fasserli OCR | Idaara.tn',
    description: 'Analyse et explication de documents administratifs tunisiens en clair.',
    url: '/fasserli',
  },
  alternates: {
    canonical: '/fasserli',
  },
};

export default function FasserliLayout({ children }: { children: React.ReactNode }) {
  return children;
}
