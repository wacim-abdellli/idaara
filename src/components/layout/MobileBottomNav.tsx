'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import { Mic, FileSearch, FileText, Calculator, MapPin } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { t, locale } = useLocale();
  const pathname = usePathname();

  const items = [
    { href: '/copilot', label: locale === 'ar' ? 'صوتي' : locale === 'en' ? 'Voice' : 'Voice AI', icon: Mic },
    { href: '/fasserli', label: locale === 'ar' ? 'فسّرلي' : locale === 'en' ? 'OCR' : 'Fasserli', icon: FileSearch },
    { href: '/documents', label: locale === 'ar' ? 'عقود' : locale === 'en' ? 'Forms' : 'PDFs', icon: FileText },
    { href: '/calculator', label: locale === 'ar' ? 'تنابر' : locale === 'en' ? 'Stamps' : 'Timbres', icon: Calculator },
    { href: '/locator', label: locale === 'ar' ? 'بلديات' : locale === 'en' ? 'Offices' : 'Guichets', icon: MapPin },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-800/80 px-2 py-1.5 shadow-2xl safe-bottom">
      <nav className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 min-w-[56px] ${
                isActive
                  ? 'text-emerald-400 font-bold'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 shadow-sm border border-emerald-500/25'
                    : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
