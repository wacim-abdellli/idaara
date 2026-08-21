import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '../context/LocaleContext';
import { ChecklistProvider } from '../context/ChecklistContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CommandPalette } from '../components/common/CommandPalette';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';

export const metadata: Metadata = {
  title: {
    default: "Idaara.tn — Voice AI & Smart Administrative Services",
    template: "%s | Idaara.tn",
  },
  description: "Fasserli, 3abbi w a3tini l'awra9 — Conquer Tunisian administrative red tape with Derja voice AI, document OCR, and certified PDF forms.",
  keywords: ['Idaara', 'Baladiya', 'Tunisie', 'Derja AI', 'Passeport Tunisien', 'Carte Grise', 'Timbres Fiscaux', 'Auto-Entrepreneur'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 pb-16 lg:pb-0" suppressHydrationWarning>
        <LocaleProvider>
          <ChecklistProvider>
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
