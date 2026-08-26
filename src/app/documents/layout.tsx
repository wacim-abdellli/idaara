import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documents & Contrats',
  description:
    'Modèles officiels de contrats de bail, procurations, déclarations de perte et reconnaissances de dette prêts pour légalisation de signature à la Baladiya.',
  openGraph: {
    title: 'Documents & Contrats | Idaara.tn',
    description: 'Modèles officiels de contrats et déclarations conformes en Tunisie.',
    url: '/documents',
  },
  alternates: {
    canonical: '/documents',
  },
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
