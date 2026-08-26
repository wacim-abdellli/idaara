import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espace Freelance 1%',
  description:
    'Simulateur du régime Auto-Entrepreneur en Tunisie : impôt libératoire 1%, exonération de TVA (0%) et générateur de factures d\'exportation en devises conformes BCT.',
  openGraph: {
    title: 'Espace Freelance 1% | Idaara.tn',
    description: 'Régime Auto-Entrepreneur 1% et facturation export en devises pour indépendants tunisiens.',
    url: '/launchpad',
  },
  alternates: {
    canonical: '/launchpad',
  },
};

export default function LaunchpadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
