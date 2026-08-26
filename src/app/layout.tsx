import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LocaleProvider } from '../context/LocaleContext';
import { ChecklistProvider } from '../context/ChecklistContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CommandPalette } from '../components/common/CommandPalette';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { ScrollToTop } from '../components/common/ScrollToTop';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://idaara-flame.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'إدارة.تونس — دليلك الإداري الذكي',
    template: '%s | إدارة.تونس',
  },
  description:
    'المساعد الإداري الذكي الأول في تونس — احسب التنابر، فسّر الوثائق، استخرج العقود الرسمية، وتابع مناظرات الوظيفة العمومية. Idaara.tn — Fasserli, timbres, concours, passeport & démarches administratives tunisiennes.',
  keywords: [
    'إدارة تونس', 'جواز السفر التونسي', 'بطاقة التعريف', 'تنابر جبائية', 'مناظرات تونس',
    'بطاقة عدد 3', 'مبادر ذاتي', 'Idaara', 'Baladiya', 'Tunisie', 'Passeport Tunisien',
    'Timbres Fiscaux', 'Concours Publics', 'Auto-Entrepreneur', 'Carte Grise', 'Derja AI',
    'passeport tunisie', 'renouveler passeport', 'bulletin n3 tunisie', 'timbre fiscal tunisie',
  ],
  authors: [{ name: 'Idaara.tn', url: BASE_URL }],
  creator: 'Idaara.tn',
  publisher: 'Idaara.tn',
  openGraph: {
    type: 'website',
    locale: 'ar_TN',
    alternateLocale: ['fr_TN', 'en_US'],
    url: BASE_URL,
    siteName: 'إدارة.تونس | Idaara.tn',
    title: 'إدارة.تونس — المساعد الإداري الذكي الأول في تونس',
    description:
      'احسب التنابر الجبائية، فسّر وثائقك الرسمية، وتابع مناظرات الوظيفة العمومية بالدارجة التونسية.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'إدارة.تونس — المساعد الإداري الذكي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إدارة.تونس — المساعد الإداري الذكي الأول في تونس',
    description: 'احسب التنابر، فسّر الوثائق، تابع المناظرات — بالدارجة التونسية.',
    images: ['/og-image.png'],
    creator: '@idaaratn',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    { media: '(prefers-color-scheme: light)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] lg:pb-0" suppressHydrationWarning>
        <LocaleProvider>
          <ChecklistProvider>
            <ScrollToTop />
            <Navbar />
            <CommandPalette />
            <main className="flex-1 w-full relative">{children}</main>
            <MobileBottomNav />
            <Footer />
          </ChecklistProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
