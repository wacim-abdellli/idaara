import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guide des Démarches',
  description:
    'Guide complet des démarches administratives en Tunisie : passeport, carte d\'identité CIN, carte grise, bulletin N°3, permis de bâtir, retraite et tarifs officiels.',
  openGraph: {
    title: 'Guide des Démarches | Idaara.tn',
    description: 'Papiers, timbres et délais de traitement pour toutes vos démarches administratives en Tunisie.',
    url: '/procedures',
  },
  alternates: {
    canonical: '/procedures',
  },
};

export default function ProceduresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
