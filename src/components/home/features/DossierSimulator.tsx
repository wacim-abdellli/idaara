'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale } from '../../../context/LocaleContext';
import {
  FileText,
  FileCheck2,
  ShieldCheck,
  Scale,
  Building2,
  CheckCircle2,
} from 'lucide-react';

const SpotlightCard = dynamic(
  () => import('../../motion/SpotlightCard').then((m) => m.SpotlightCard),
  { ssr: false }
);

export function DossierSimulator() {
  const { locale } = useLocale();

  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'cin' | 'lease' | 'tax'>('passport');
  const [checkedInspectorItems, setCheckedInspectorItems] = useState<Record<string, boolean>>({
    'passport-0': true,
    'cin-0': true,
    'lease-0': true,
    'tax-0': true,
  });

  const toggleInspectorItem = (key: string) => {
    setCheckedInspectorItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const inspectorDocs = {
    passport: {
      type:
        locale === 'ar'
          ? 'تجديد جواز السفر التونسي'
          : locale === 'derja'
          ? 'Passeport Tounsi (Renouvellement)'
          : locale === 'en'
          ? 'Tunisian Passport Renewal'
          : 'Renouvellement Passeport Tunisien',
      authority:
        locale === 'ar'
          ? 'وزارة الداخلية (مركز الشرطة أو الحرس الوطني)'
          : locale === 'derja'
          ? 'Wizarat el Dakhiliya (Markez el Chorta / Garde)'
          : locale === 'en'
          ? 'Ministry of Interior (Police / National Guard Desk)'
          : 'Ministère de l’Intérieur (Poste de Police / Garde)',
      fee: '86.000 DT',
      time:
        locale === 'ar'
          ? '7 - 15 يوماً'
          : locale === 'derja'
          ? '7 - 15 Youm'
          : locale === 'en'
          ? '7 - 15 days'
          : '7 - 15 jours',
      stamp:
        locale === 'ar'
          ? 'طابع جبائي 80 د.ت (تعريفة عادية)'
          : locale === 'derja'
          ? 'Timbre 80 DT (Tarif 3adi)'
          : locale === 'en'
          ? '80 DT Fiscal Stamp'
          : '80.000 DT (Tarif Ordinaire)',
      url: '/procedures/passeport-renouvellement',
      points: [
        locale === 'ar'
          ? 'شراء طابع جبائي بقيمة 80 د.ت من القباضة المالية'
          : locale === 'derja'
          ? 'Timbre fiscal 80 DT men el 9badha el Maliya'
          : locale === 'en'
          ? 'Mandatory 80 DT fiscal stamp from Recette des Finances'
          : 'Timbre fiscal 80 DT obligatoire de la Recette',
        locale === 'ar'
          ? '4 صور شمسية حديثة بخلفية بيضاء'
          : locale === 'derja'
          ? '4 tsawer shamsiya jdod b’fond abyedh'
          : locale === 'en'
          ? '4 recent passport photos on white background'
          : '4 photos d’identité récentes sur fond blanc',
        locale === 'ar'
          ? 'تسليم جواز السفر القديم المنتهي الصلاحية'
          : locale === 'derja'
          ? 'Rajja3 el passeport el 9dim el moufa'
          : locale === 'en'
          ? 'Return the expired physical passport'
          : 'Restitution de l’ancien passeport expiré',
        locale === 'ar'
          ? 'بطاقة التعريف الوطنية الأصلية سارية المفعول'
          : locale === 'derja'
          ? 'CIN tounsiya d’origine mrigla'
          : locale === 'en'
          ? 'Valid original National ID Card (CIN)'
          : 'Carte d’identité nationale (CIN) originale en cours de validité',
      ],
    },
    cin: {
      type:
        locale === 'ar'
          ? 'استخراج بطاقة التعريف الوطنية'
          : locale === 'derja'
          ? 'Bita9at el Ta3rif (CIN Jdida)'
          : locale === 'en'
          ? 'National ID Card (First issuance)'
          : 'Première Carte d’Identité Nationale (CIN)',
      authority:
        locale === 'ar'
          ? 'مركز الشرطة أو الحرس الوطني مرجع النظر'
          : locale === 'derja'
          ? 'Markez el Chorta walla 7ars el watani mte3 7oumetkom'
          : locale === 'en'
          ? 'Local Police Station or National Guard District'
          : 'Commissariat de Police ou Brigade de Garde Nationale',
      fee: '3.000 DT',
      time:
        locale === 'ar'
          ? '15 يوماً'
          : locale === 'derja'
          ? '15 Youm'
          : locale === 'en'
          ? '15 days'
          : '15 jours',
      stamp:
        locale === 'ar'
          ? 'طابع جبائي 3 د.ت (أول مرة)'
          : locale === 'derja'
          ? 'Timbre 3 DT'
          : locale === 'en'
          ? '3 DT Fiscal Stamp'
          : '3.000 DT (Première délivrance)',
      url: '/procedures/cin-premiere-delivrance',
      points: [
        locale === 'ar'
          ? 'مضمون ولادة أصلي لا يتجاوز 3 أشهر'
          : locale === 'derja'
          ? 'Madhmoun wiledha a9al men 3 chhour'
          : locale === 'en'
          ? 'Birth certificate extract issued within 3 months'
          : 'Extrait de naissance de moins de 3 mois',
        locale === 'ar'
          ? '3 صور شمسية بالمقاييس القانونية'
          : locale === 'derja'
          ? '3 tsawer CIN conforme lel 9anoun'
          : locale === 'en'
          ? '3 standard biometric ID photos'
          : '3 photos d’identité aux normes officielles',
        locale === 'ar'
          ? 'شهادة إقامة مسلمة من مركز الأمن'
          : locale === 'derja'
          ? 'Chahadet i9ama men markez el amen'
          : locale === 'en'
          ? 'Certificate of residence from police district'
          : 'Certificat de résidence délivré par la police',
        locale === 'ar'
          ? 'شهادة مدرسية أو شهادة عمل لإثبات المهنة'
          : locale === 'derja'
          ? 'Chahada madrasiya walla khedma lel mihn'
          : locale === 'en'
          ? 'Enrollment certificate or work contract for occupation line'
          : 'Certificat de scolarité ou attestation de travail',
      ],
    },
    lease: {
      type:
        locale === 'ar'
          ? 'عقد كراء سكني قانوني ومسجل'
          : locale === 'derja'
          ? 'Contrat Kré Sakani Mrigel'
          : locale === 'en'
          ? 'Standard Legal Residential Lease'
          : 'Contrat de Bail d’Habitation Conforme',
      authority:
        locale === 'ar'
          ? 'البلدية (للتعريف بالإمضاء) + القباضة المالية'
          : locale === 'derja'
          ? 'El Baladiya (Ta3rif bel Imdha2) + El 9badha'
          : locale === 'en'
          ? 'Municipality (Signature Legalization) + Tax Office'
          : 'Municipalité (Légalisation) + Recette des Finances',
      fee: '35.000 DT',
      time:
        locale === 'ar'
          ? 'فوري بالبلدية'
          : locale === 'derja'
          ? 'Fi wa9tou fel Baladiya'
          : locale === 'en'
          ? 'Same-day at Baladiya'
          : 'Immédiat en Mairie',
      stamp:
        locale === 'ar'
          ? '3 د.ت للإمضاء + 1% تسجيل بالقباضة'
          : locale === 'derja'
          ? '3 DT Ta3rif + 1% 9badha'
          : locale === 'en'
          ? '3 DT per signature + 1% duty'
          : '3 DT / signature + 1% loyer annuel',
      url: '/documents/contrat-location-habitation',
      points: [
        locale === 'ar'
          ? '3 نظائر أصلية من العقد ممضاة من الطرفين'
          : locale === 'derja'
          ? '3 nsakh d’origine msa77a7in mel zouz'
          : locale === 'en'
          ? '3 original counterpart contracts signed by both parties'
          : '3 exemplaires originaux paraphés et signés',
        locale === 'ar'
          ? 'التعريف بإمضاء المكتري والمكري في البلدية (3 د.ت لكل إمضاء)'
          : locale === 'derja'
          ? 'Ta3rif bel imdha2 fel Baladiya (3 DT el ts7i7a)'
          : locale === 'en'
          ? 'Legalization of signatures at municipality (3 DT each)'
          : 'Légalisation des signatures à la mairie (3 DT chacune)',
        locale === 'ar'
          ? 'التسجيل الوجوبي بالقباضة المالية في أجل 60 يوماً'
          : locale === 'derja'
          ? 'Tsajjel fel 9badha el Maliya 9bel 60 youm'
          : locale === 'en'
          ? 'Mandatory registration at tax office within 60 days'
          : 'Enregistrement obligatoire à la Recette sous 60 jours',
        locale === 'ar'
          ? 'وصل خلاص معلوم الزبلة والخروبة للسنة الجارية'
          : locale === 'derja'
          ? 'Reçu zebla w khrouba mta3 el 3am'
          : locale === 'en'
          ? 'Proof of municipal property tax payment for current year'
          : 'Quittance de taxe municipale (TCL/TIB) de l’année',
      ],
    },
    tax: {
      type:
        locale === 'ar'
          ? 'الأداء البلدي على العقارات (الزبلة والخروبة)'
          : locale === 'derja'
          ? 'El Ma3loum el Baladi (Zebla w Khrouba)'
          : locale === 'en'
          ? 'Municipal Built Property Tax'
          : 'Taxe sur les Immeubles Bâtis (TIB / Zebla)',
      authority:
        locale === 'ar'
          ? 'الإدارة العامة للأداءات والبلدية'
          : locale === 'derja'
          ? 'El 9badha el Baladiya wel DGI'
          : locale === 'en'
          ? 'General Directorate of Taxes & Municipality'
          : 'Direction Générale des Impôts & Baladiya',
      fee: '85.000 DT',
      time:
        locale === 'ar'
          ? 'قبل 31 ديسمبر'
          : locale === 'derja'
          ? '9bel 31 Décembre'
          : locale === 'en'
          ? 'Before Dec 31st'
          : 'Avant le 31 Décembre',
      stamp:
        locale === 'ar'
          ? 'معلوم موظف على العقار'
          : locale === 'derja'
          ? 'Ma3loum el Dar'
          : locale === 'en'
          ? 'Statutory Municipal Assessment'
          : 'Taxe Forfaitaire Bâtie',
      url: '/fasserli',
      points: [
        locale === 'ar'
          ? 'معلوم بلدي سنوي إجباري على العقارات والمحلات المبنية'
          : locale === 'derja'
          ? 'Ma3loum baladi sanawi ejbari 3al dyar wel 3a9arat'
          : locale === 'en'
          ? 'Statutory annual municipal tax on built residential properties'
          : 'Taxe municipale annuelle sur les immeubles bâtis',
        locale === 'ar'
          ? 'الخلاص بالقباضة البلدية أو عن بعد'
          : locale === 'derja'
          ? 'Khalas fel 9badha el baladiya walla en ligne'
          : locale === 'en'
          ? 'Payable at municipal tax collector or via online portal'
          : 'Paiement à la Recette Municipale ou par carte',
        locale === 'ar'
          ? 'خطية تأخير بنسبة 0.75% شهرياً في صورة عدم الدفع'
          : locale === 'derja'
          ? 'Khatya 0.75% kol chhar ba3d el wa9t'
          : locale === 'en'
          ? '0.75% monthly late interest penalty applies after deadline'
          : 'Pénalité de 0.75% par mois en cas de retard',
      ],
    },
  };

  const currentDoc = inspectorDocs[activeInspectorDoc];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SpotlightCard className="p-6 sm:p-9 border-white/[0.1] bg-[#0c0d12] shadow-2xl space-y-6 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-emerald-400 px-2.5 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800/40">
                {locale === 'ar' ? 'المعاينة التفاعلية' : 'Inspecteur de Dossier'}
              </span>
              <span className="text-xs text-zinc-400">
                {locale === 'ar' ? 'جرب تحديد الوثائق ومعرفة التكلفة الفعلية' : 'Testez la préparation de vos démarches'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {locale === 'ar' ? 'محاكي الملف الإداري والتنابر' : 'Simulateur de Dossier & Timbres Fiscaux'}
            </h2>
          </div>

          {/* Document Switcher Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'passport' as const, label: locale === 'ar' ? 'جواز السفر' : 'Passeport', tag: '80 DT', icon: FileCheck2 },
              { id: 'cin' as const, label: locale === 'ar' ? 'بطاقة التعريف' : 'CIN', tag: '3 DT', icon: ShieldCheck },
              { id: 'lease' as const, label: locale === 'ar' ? 'عقد الكراء' : 'Contrat Bail', tag: '35 DT', icon: Scale },
              { id: 'tax' as const, label: locale === 'ar' ? 'الأداء البلدي' : 'Taxe Municipale', tag: 'Recette', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeInspectorDoc === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveInspectorDoc(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                    isActive
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/25'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white border-white/[0.08]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
                    {tab.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Document Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Metadata & Checklist */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-950 border border-white/[0.08]">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">{currentDoc.type}</h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{currentDoc.authority}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right rtl:text-left">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">{locale === 'ar' ? 'المجموع' : 'Total'}</span>
                  <span className="text-lg font-mono font-extrabold text-amber-400">{currentDoc.fee}</span>
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2">
              {currentDoc.points.map((pt, pIdx) => {
                const itemKey = `${activeInspectorDoc}-${pIdx}`;
                const isChecked = !!checkedInspectorItems[itemKey];

                return (
                  <div
                    key={itemKey}
                    onClick={() => toggleInspectorItem(itemKey)}
                    className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 text-xs ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-700/50 text-white'
                        : 'bg-zinc-900/60 border-white/[0.06] hover:border-white/[0.12] text-zinc-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-500" />
                      )}
                    </div>
                    <span className={`leading-relaxed flex-1 ${isChecked ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}>
                      {pt}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Readiness Gauge & Action */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4 text-center">
            {(() => {
              const docKeys = currentDoc.points.map((_, idx) => `${activeInspectorDoc}-${idx}`);
              const readyCount = docKeys.filter((k) => checkedInspectorItems[k]).length;
              const totalCount = docKeys.length;
              const pct = Math.round((readyCount / totalCount) * 100);
              const isComplete = readyCount === totalCount;

              return (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    {locale === 'ar' ? 'جاهزية الملف' : 'État de Préparation'}
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400">
                    {readyCount}/{totalCount}
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-300"
                    />
                  </div>
                  <p className="text-xs text-zinc-400">
                    {isComplete
                      ? (locale === 'ar' ? '🎉 ملفك مكتمل وجاهز للإيداع!' : '🎉 Dossier 100% complet et prêt !')
                      : (locale === 'ar' ? 'حدد الوثائق للتأكد من اكتمال ملفك' : 'Cochez les pièces pour valider votre dossier')}
                  </p>
                  <Link
                    href={currentDoc.url}
                    className="block w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all text-center"
                  >
                    {locale === 'ar' ? 'فتح الدليل الكامل' : 'Voir la Démarche Complète'}
                  </Link>
                </div>
              );
            })()}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
