import type { Metadata } from 'next';
import { getProcedureById } from '../../../data/procedures';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://idaara-flame.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const procedure = getProcedureById(id);

  if (!procedure) {
    return {
      title: 'Démarche introuvable',
    };
  }

  const titleFr = procedure.title.fr;
  const titleAr = procedure.title.ar || procedure.title.fr;
  const descFr = procedure.fullDescription?.fr || procedure.shortDescription?.fr || procedure.title.fr || '';
  const descAr = procedure.fullDescription?.ar || procedure.shortDescription?.ar || procedure.title.ar || '';
  const costLabel = procedure.estimatedTotalCostTND > 0
    ? ` (${procedure.estimatedTotalCostTND} DT)`
    : ' (Gratuit)';

  return {
    title: `${titleFr}${costLabel}`,
    description: `${descFr} Pièces requises, timbres fiscaux et délais officiels en Tunisie.`.slice(0, 160),
    keywords: [
      titleAr, titleFr,
      `${titleFr} tunisie`,
      `أوراق ${titleAr}`,
      `timbres ${titleFr}`,
      'إجراءات إدارية تونس',
    ].filter(Boolean) as string[],
    openGraph: {
      title: `${titleFr}${costLabel} | Idaara.tn`,
      description: (descFr || descAr || '').slice(0, 160),
      url: `${BASE_URL}/procedures/${id}`,
    },
    alternates: {
      canonical: `/procedures/${id}`,
    },
  };
}

export default function ProcedureDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
