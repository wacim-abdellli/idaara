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
    <html lang="fr" className="dark">
      <body className="bg-[#09090B] text-[#F8FAFC] antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
        <LocaleProvider>
          <ChecklistProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ChecklistProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
