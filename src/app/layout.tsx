import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '../context/LocaleContext';
import { ChecklistProvider } from '../context/ChecklistContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: "Idaara.tn · إدارة.تونس | Tunisia's First Voice AI Bureaucracy Copilot",
  description: "Fasserli, 3abbi w a3tini l'awra9 — Conquer Tunisian administrative red tape in seconds with voice Derja AI, OCR explanations, and auto-filled official PDF forms.",
  keywords: [
    'Idaara',
    'Baladiya',
    'Tunisie',
    'Derja AI',
    'Passeport Tunisien',
    'Carte Grise',
    'Contrat de Location',
    'Auto-Entrepreneur Tunisie',
    'Timbres Fiscaux',
    'Recette des Finances',
  ],
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
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#09090B] text-[#F8FAFC] antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
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
