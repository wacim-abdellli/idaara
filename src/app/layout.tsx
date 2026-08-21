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
    <html lang="fr" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Orbitron: futuristic robotic display typeface */}
        {/* Space Grotesk: techno-geometric modernist UI typeface */}
        {/* Cairo: Arabic script */}
        {/* JetBrains Mono: data, numbers, amounts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 pb-16 lg:pb-0">
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
