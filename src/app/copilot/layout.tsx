import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Copilot',
  description:
    'Idaara AI Copilot : posez toutes vos questions sur les démarches administratives, passeports, carte grise, B3, timbres fiscaux et concours publics en Tunisie.',
  openGraph: {
    title: 'AI Copilot | Idaara.tn',
    description: 'Le copilote administratif et juridique intelligent en Tunisie.',
    url: '/copilot',
  },
  alternates: {
    canonical: '/copilot',
  },
};

export default function CopilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
