import type { Metadata } from 'next';
import { getTemplateBySlug } from '../../../data/documentTemplates';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://idaara-flame.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: 'Document introuvable',
    };
  }

  const titleFr = template.title?.fr || slug;
  const titleAr = template.title?.ar || template.title?.fr || slug;

  return {
    title: `${titleFr} (PDF)`,
    description: `Modèle certifié ${titleFr} prêt pour légalisation de signature à la Baladiya en Tunisie.`.slice(0, 160),
    keywords: [
      titleAr, titleFr,
      `${titleFr} PDF tunisie`,
      `modèle ${titleFr} tunisie`,
      `نموذج ${titleAr}`,
      'عقود بلدية تونس', 'documents officiels tunisie',
    ].filter(Boolean) as string[],
    openGraph: {
      title: `${titleAr} — PDF جاهز | Idaara.tn`,
      description: `استخرج ${titleAr} PDF مجاناً وفورياً.`,
      url: `${BASE_URL}/documents/${slug}`,
    },
    alternates: {
      canonical: `/documents/${slug}`,
    },
  };
}

export default function DocumentDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
