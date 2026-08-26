import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portails e-Gov',
  description:
    'Annuaire unifié des 18 portails officiels de l\'administration numérique tunisienne : e-Houwiya, B3 en ligne, e-CNSS, ATTT, RNE, JORT et services e-Finance.',
  openGraph: {
    title: 'Portails e-Gov | Idaara.tn',
    description: 'Accès direct aux services publics numériques officiels de la République Tunisienne.',
    url: '/portails',
  },
  alternates: {
    canonical: '/portails',
  },
};

export default function PortailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
