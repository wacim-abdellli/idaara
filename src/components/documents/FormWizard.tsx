'use client';

import React from 'react';
import { DocumentTemplate } from '../../types/document';
import { useLocale } from '../../context/LocaleContext';
import { Sparkles, Edit3 } from 'lucide-react';
import { getLocalized } from '../../lib/locale-utils';

interface FormWizardProps {
  template: DocumentTemplate;
  formData: Record<string, string | number>;
  onChangeField: (fieldName: string, value: string | number) => void;
  onAutoFillSample: () => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  template,
  formData,
  onChangeField,
  onAutoFillSample,
}) => {
  const { locale } = useLocale();

  return (
    <div className="bg-[#0d0f14] rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-2xl space-y-7">
      {/* Wizard Header & Sample Auto-fill */}
      <div className="flex items-center justify-between pb-5 border-b border-zinc-800/80 gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Edit3 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-extrabold text-white">
              {locale === 'ar' ? 'استمارة ملء البيانات' : locale === 'en' ? 'Data Entry Form' : 'Formulaire de Remplissage'}
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            {locale === 'ar'
              ? 'املأ البيانات لتحديث الوثيقة مباشرة على اليمين'
              : locale === 'en'
              ? 'Fill in your details, PDF updates instantly on the right'
              : '3abbi les données mte3ek, el PDF yetbaddel en direct'}
          </p>
        </div>

        {template.sampleData && (
          <button
            type="button"
            onClick={onAutoFillSample}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all hover:scale-105 cursor-pointer shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{locale === 'ar' ? 'ملء تجريبي' : locale === 'en' ? 'Sample Auto-Fill' : 'Exemple Réel'}</span>
          </button>
        )}
      </div>

      {/* Dynamic Fields by Section */}
      <div className="space-y-7">
        {template.sections.map((section, sIdx) => {
          const sectionTitle = getLocalized(section.title, locale);
          const fields = template.fields.filter((f) => f.section === section.id);

          return (
            <div key={section.id} className="space-y-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center justify-center">
                  0{sIdx + 1}
                </span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {sectionTitle}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                  const label = getLocalized(field.label, locale);
                  const placeholder = field.placeholder ? getLocalized(field.placeholder, locale) : '';
                  const value = formData[field.name] ?? '';

                  return (
                    <div
                      key={field.id}
                      className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                    >
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        {label}
                        {field.required && (
                          <span className="text-red-400 ml-1 font-bold">*</span>
                        )}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          placeholder={placeholder}
                          className="w-full bg-[#07080b] border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          className="w-full bg-[#07080b] border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl p-2.5 text-xs text-zinc-100 focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="">{locale === 'ar' ? 'اختر...' : locale === 'en' ? 'Select...' : 'Sélectionner...'}</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {getLocalized(opt.label, locale)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          placeholder={placeholder}
                          className="w-full bg-[#07080b] border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl p-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

