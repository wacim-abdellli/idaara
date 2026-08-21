'use client';

import React from 'react';
import { Check, X, Sparkles, Shield, Rocket, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

export const StatusComparator: React.FC = () => {
  const { locale } = useLocale();

  const statuses = [
    {
      id: 'auto-entrepreneur',
      name: locale === 'ar' ? 'المبادر الذاتي' : locale === 'en' ? 'Auto-Entrepreneur Status' : "Statut Auto-Entrepreneur",
      badge: locale === 'ar' ? 'موصى به للمستقلين والمبرمجين' : locale === 'en' ? 'Recommended for Freelancers & Tech' : "Recommandé Freelances & Devs",
      taxRate: "1% (Services) / 0.5% (Commerce)",
      cnss: locale === 'ar' ? 'مبلغ رمزي جزافي (~50 د.ت / 3 أشهر)' : locale === 'en' ? 'Symbolic flat fee (~50 DT / quarter)' : "Forfaitaire symbolique (~50 DT / trimestre)",
      comptable: locale === 'ar' ? 'غير مطلوب (منصة رقمية)' : locale === 'en' ? 'Not required (100% digital portal)' : "Non requis (Plateforme en ligne)",
      capital: "0 DT",
      facturation: locale === 'ar' ? 'فواتير بمعرف وطني QR' : locale === 'en' ? 'QR Code Invoicing with National ID' : "Factures avec Matricule National QR",
      maxChiffreAffaire: locale === 'ar' ? 'حتى 75,000 د.ت / سنة' : locale === 'en' ? 'Up to 75,000 TND / year' : "Jusqu'à 75 000 DT / an",
      color: "border-emerald-500 bg-emerald-950/20",
    },
    {
      id: 'patente-personne-physique',
      name: locale === 'ar' ? 'براءة شخص طبيعي (Patente)' : locale === 'en' ? 'Sole Proprietorship (Patente)' : "Patente Personne Physique",
      badge: locale === 'ar' ? 'المهن الحرة والحرفيون' : locale === 'en' ? 'Craftsmen & Liberal Professions' : "Professions libérales & Artisans",
      taxRate: locale === 'ar' ? 'جدول تصاعدي IRPP (حتى 35%)' : locale === 'en' ? 'Progressive IRPP scale (Up to 35%)' : "Barème progressif IRPP (Jusqu'à 35%)",
      cnss: locale === 'ar' ? 'نظام المستقلين حسب الشريحة' : locale === 'en' ? 'Self-employed scale by declared bracket' : "Régime des Indépendants (Palier déclaré)",
      comptable: locale === 'ar' ? 'موصى به / موازنة سنوية' : locale === 'en' ? 'Recommended / Simplified balance sheet' : "Recommandé / Bilan annuel simplifié",
      capital: "0 DT",
      facturation: locale === 'ar' ? 'فواتير بمعرف جبائي قباضة' : locale === 'en' ? 'Invoices with Recette Tax ID' : "Factures avec Matricule Fiscal Recette",
      maxChiffreAffaire: locale === 'ar' ? 'غير محدود' : locale === 'en' ? 'Unlimited' : "Illimité",
      color: "border-zinc-800 bg-zinc-900/60",
    },
    {
      id: 'suarl',
      name: locale === 'ar' ? 'شركة الشخص الواحد (SUARL)' : locale === 'en' ? 'Single-Member LLC (SUARL)' : "Société SUARL (Personne Morale)",
      badge: locale === 'ar' ? 'الشركات الناشئة والتصدير' : locale === 'en' ? 'Startups & Export Companies' : "Startups & Sociétés d'Export",
      taxRate: "15% IS (Impôt sur les Sociétés)",
      cnss: locale === 'ar' ? 'وكيل مسير غير أجير' : locale === 'en' ? 'Non-salaried majority manager' : "Gérant majoritaire non salarié",
      comptable: locale === 'ar' ? 'إجباري (خبير محاسب)' : locale === 'en' ? 'Mandatory (Certified Accountant)' : "Obligatoire (Comptable agréé)",
      capital: "1 000 DT (Bloqué en banque)",
      facturation: locale === 'ar' ? 'شركة تجارية بالسجل الوطني RNE' : locale === 'en' ? 'Commercial entity registered at RNE' : "Société commerciale RNE",
      maxChiffreAffaire: locale === 'ar' ? 'غير محدود' : locale === 'en' ? 'Unlimited' : "Illimité",
      color: "border-zinc-800 bg-zinc-900/60",
    },
  ];

  const heading =
    locale === 'ar'
      ? 'مقارنة الأنظمة القانونية والجبائية في تونس'
      : locale === 'en'
      ? 'Comparative Matrix of Tunisian Legal & Tax Statuses'
      : 'Comparateur des Statuts Juridiques en Tunisie';

  const sub =
    locale === 'ar'
      ? 'اختر الهيكل القانوني الأنسب لنشاطك المستقل أو مشروعك التجاري.'
      : locale === 'en'
      ? 'Find the ideal legal and tax structure for your freelance or company venture.'
      : "Trouvez la structure fiscale et juridique idéale pour votre activité de freelance ou d'entreprise.";

  const taxRateLbl = locale === 'ar' ? 'نسبة الضريبة :' : locale === 'en' ? 'Tax Rate:' : 'Régime Fiscal :';
  const cnssLbl = locale === 'ar' ? 'تغطية الـ CNSS :' : locale === 'en' ? 'CNSS Healthcare:' : 'Sécurité Sociale (CNSS) :';
  const comptableLbl = locale === 'ar' ? 'المحاسب :' : locale === 'en' ? 'Accountant:' : 'Comptable :';
  const capLbl = locale === 'ar' ? 'رأس المال :' : locale === 'en' ? 'Min. Capital:' : 'Capital Initial :';
  const maxLbl = locale === 'ar' ? 'السقف السنوي :' : locale === 'en' ? 'Annual Cap:' : 'Plafond Annuel :';

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h3 className="text-lg font-bold text-white">
          {heading}
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          {sub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((s) => (
          <div
            key={s.id}
            className={`glass-panel rounded-3xl p-6 border ${s.color} flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden`}
          >
            {s.id === 'auto-entrepreneur' && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-zinc-950 font-bold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                1% Flat Tax
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-white mb-1.5">{s.name}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{s.badge}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs pt-3 border-t border-zinc-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">{taxRateLbl}</span>
                  <span className="font-semibold text-zinc-200">{s.taxRate}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">{cnssLbl}</span>
                  <span className="text-zinc-300">{s.cnss}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">{comptableLbl}</span>
                  <span className="text-zinc-300">{s.comptable}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">{capLbl}</span>
                  <span className="text-zinc-300">{s.capital}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">{maxLbl}</span>
                  <span className="text-emerald-400 font-bold font-mono">{s.maxChiffreAffaire}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
