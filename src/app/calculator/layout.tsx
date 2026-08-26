import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculateur de Timbres',
  description:
    'Calculateur exact de timbres fiscaux et droits d\'enregistrement en Tunisie selon la Loi de Finances 2025/2026 : passeport, CIN, mutation carte grise, contrats et baladiya.',
  openGraph: {
    title: 'Calculateur de Timbres | Idaara.tn',
    description: 'Calculez le coût exact des timbres fiscaux et taxes pour vos démarches en Tunisie.',
    url: '/calculator',
  },
  alternates: {
    canonical: '/calculator',
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
