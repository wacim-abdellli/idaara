import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas Baladiyas & Guichets',
  description:
    'Annuaire géolocalisé de plus de 130 baladiyas, recettes des finances, commissariats et agences CNSS/ATTT dans les 24 gouvernorats avec horaires saisonniers réels.',
  openGraph: {
    title: 'Atlas Baladiyas & Guichets | Idaara.tn',
    description: 'Adresses, téléphones et horaires des guichets administratifs dans les 24 gouvernorats.',
    url: '/locator',
  },
  alternates: {
    canonical: '/locator',
  },
};

export default function LocatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
