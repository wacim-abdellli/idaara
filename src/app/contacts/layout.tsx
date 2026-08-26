import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Numéros d'Urgence",
  description:
    'Annuaire complet des numéros d\'urgence (197, 190, 198, 193) et contacts officiels des ministères et services publics en Tunisie.',
  openGraph: {
    title: 'Numéros d\'Urgence | Idaara.tn',
    description: 'Numéros d\'urgence et contacts directs des services publics en Tunisie.',
    url: '/contacts',
  },
  alternates: {
    canonical: '/contacts',
  },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
