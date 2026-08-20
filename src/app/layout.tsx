import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '../context/LocaleContext';
import { ChecklistProvider } from '../context/ChecklistContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: "Idaara.tn · إدارة.تونس — Tunisia's First Voice AI Bureaucracy Copilot",
  description: "Fasserli, 3abbi w a3tini l'awra9 — Conquer Tunisian administrative red tape in seconds with Derja voice AI, document OCR, and auto-filled official PDF forms.",
  keywords: ['Idaara', 'Baladiya', 'Tunisie', 'Derja AI', 'Passeport Tunisien', 'Carte Grise', 'Timbres Fiscaux', 'Auto-Entrepreneur'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DM Serif Display: characterful display face for hero headlines */}
        {/* Inter: neutral body/UI face */}
        {/* Cairo: Arabic script */}
        {/* JetBrains Mono: data, numbers, amounts */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
        <LocaleProvider>
          <ChecklistProvider>
            <Navbar />
            <main className="flex-1 w-full relative">{children}</main>
            <Footer />
          </ChecklistProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
