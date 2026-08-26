import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radar Concours',
  description:
    'Radar des concours de la fonction publique et entreprises nationales en Tunisie (STEG, SONEDE, CAPES, Ministères) : conditions, dossiers et dates limites.',
  openGraph: {
    title: 'Radar Concours | Idaara.tn',
    description: 'Suivi en temps réel des concours publics et recrutements nationaux en Tunisie.',
    url: '/concours',
  },
  alternates: {
    canonical: '/concours',
  },
};

export default function ConcoursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
