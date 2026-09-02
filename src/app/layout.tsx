import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cookies } from 'next/headers';
import { LocaleProvider } from '../context/LocaleContext';
import { AuthProvider } from '../context/AuthContext';
import { ChecklistProvider } from '../context/ChecklistContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CommandPalette } from '../components/common/CommandPalette';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { DynamicTitle } from '../components/layout/DynamicTitle';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

const VALID_LOCALES = ['derja', 'fr', 'ar', 'en'] as const;
type SupportedLanguage = (typeof VALID_LOCALES)[number];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://idaara-flame.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Idaara.tn',
    template: '%s | Idaara.tn',
  },
  description:
    'Idaara.tn — Le copilote citoyen intelligent pour vos démarches administratives en Tunisie : calcul des timbres fiscaux, analyse de documents Fasserli, modèles de contrats PDF et suivi des concours.',
  keywords: [
    'Idaara', 'Idaara.tn', 'Baladiya', 'Tunisie', 'Passeport Tunisien',
    'Timbres Fiscaux', 'Concours Publics', 'Auto-Entrepreneur', 'Carte Grise', 'Derja AI',
    'passeport tunisie', 'renouveler passeport', 'bulletin n3 tunisie', 'timbre fiscal tunisie',
    'إدارة تونس', 'جواز السفر التونسي', 'بطاقة التعريف', 'تنابر جبائية', 'مناظرات تونس',
  ],
  authors: [{ name: 'Idaara.tn', url: BASE_URL }],
  creator: 'Idaara.tn',
  publisher: 'Idaara.tn',
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    alternateLocale: ['ar_TN', 'en_US'],
    url: BASE_URL,
    siteName: 'Idaara.tn',
    title: 'Idaara.tn — AI Copilot & Démarches Administratives',
    description:
      'Calcul des timbres fiscaux, analyse de documents, modèles de contrats et démarches administratives tunisiennes en toute simplicité.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Idaara.tn — AI Copilot & Smart Administration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idaara.tn — AI Copilot & Démarches Administratives',
    description: 'Calcul des timbres fiscaux, analyse de documents et démarches tunisiennes.',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the locale cookie server-side so first SSR paint matches user's saved locale → zero flash
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('idaara_locale')?.value as SupportedLanguage | undefined;
  const initialLocale: SupportedLanguage =
    savedLocale && VALID_LOCALES.includes(savedLocale) ? savedLocale : 'fr';

  const langAttr = initialLocale === 'ar' ? 'ar' : initialLocale === 'en' ? 'en' : 'fr';
  const dirAttr = initialLocale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={langAttr} dir={dirAttr} className="dark scroll-smooth" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] lg:pb-0" suppressHydrationWarning>
        <AuthProvider>
          <LocaleProvider initialLocale={initialLocale}>
            <DynamicTitle />
            <ChecklistProvider>
              <ScrollToTop />
              <Navbar />
              <CommandPalette />
              <ErrorBoundary>
                <main className="flex-1 w-full relative">{children}</main>
              </ErrorBoundary>
              <MobileBottomNav />
              <Footer />
            </ChecklistProvider>
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
