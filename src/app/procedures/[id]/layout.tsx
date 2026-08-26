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
      title: 'إجراء غير موجود | إدارة.تونس',
    };
  }

  const titleAr = procedure.title.ar || procedure.title.fr;
  const titleFr = procedure.title.fr;
  const descAr = procedure.fullDescription?.ar || procedure.shortDescription?.ar || procedure.title.ar || '';
  const descFr = procedure.fullDescription?.fr || procedure.shortDescription?.fr || procedure.title.fr || '';
  const costStr = procedure.estimatedTotalCostTND > 0
    ? ` — ${procedure.estimatedTotalCostTND} د.ت`
    : ' — مجاني';

  return {
    title: `${titleAr || titleFr}${costStr} | إدارة.تونس`,
    description: `${descAr || descFr} الأوراق المطلوبة، التنابر الجبائية، والآجال الرسمية لإجراء ${titleFr} في تونس.`.slice(0, 160),
    keywords: [
      titleAr, titleFr,
      `${titleFr} tunisie`,
      `أوراق ${titleAr}`,
      `timbres ${titleFr}`,
      'إجراءات إدارية تونس',
    ].filter(Boolean) as string[],
    openGraph: {
      title: `${titleAr || titleFr}${costStr} | Idaara.tn`,
      description: (descAr || descFr || '').slice(0, 160),
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
