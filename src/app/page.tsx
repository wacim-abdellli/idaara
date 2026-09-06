'use client';

import dynamic from 'next/dynamic';
import { HeroSection } from '../components/home/HeroSection';

const FeaturesSection = dynamic(
  () => import('../components/home/FeaturesSection').then((m) => m.FeaturesSection),
  { ssr: false }
);

const StatsSection = dynamic(
  () => import('../components/home/StatsSection').then((m) => m.StatsSection),
  { ssr: false }
);

const CTASection = dynamic(
  () => import('../components/home/CTASection').then((m) => m.CTASection),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16 relative overflow-hidden bg-[#07080a] text-[#F5F4F0]">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
