'use client';

import React from 'react';
import { DocumentTemplate } from '../../types/document';
import { useLocale } from '../../context/LocaleContext';
import { Sparkles } from 'lucide-react';
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
    <div className="bg-zinc-900/40 rounded-2xl p-5 border border-zinc-800/80 space-y-5">
      {/* Header & Auto-fill */}
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/60">
        <div>
          <h3 className="text-sm font-bold text-white">
            {locale === 'ar' ? 'بيانات الوثيقة' : locale === 'derja' ? 'Formulaire ta3bi les données' : locale === 'en' ? 'Document Information' : 'Informations du Document'}
          </h3>
          <p className="text-[11px] text-zinc-400">
            {locale === 'ar'
              ? 'تحديث فوري للمعاينة'
              : locale === 'derja'
              ? '3abbi les données mte3ek lena, el PDF yetbaddel en direct'
              : locale === 'en'
              ? 'Fill in your details...'
              : 'Remplissez vos données, le PDF se met à jour en direct'}
          </p>
        </div>

        {template.sampleData && (
          <button
            type="button"
            onClick={onAutoFillSample}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>{locale === 'ar' ? 'ملء تجريبي' : locale === 'derja' ? 'Exemple réel (auto-fill)' : 'Exemple'}</span>
          </button>
        )}
      </div>

      {/* Dynamic Fields */}
      <div className="space-y-5">
        {template.sections.map((section) => {
          const sectionTitle = getLocalized(section.title, locale);
          const fields = template.fields.filter((f) => f.section === section.id);

          return (
            <div key={section.id} className="space-y-3">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{sectionTitle}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map((field) => {
                  const label = getLocalized(field.label, locale);
                  const placeholder = field.placeholder ? getLocalized(field.placeholder, locale) : '';
                  const value = formData[field.name] ?? '';

                  return (
                    <div
                      key={field.id}
                      className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                    >
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        {label}
                        {field.required && (
                          <span className="text-red-400 ml-0.5">*</span>
                        )}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          placeholder={placeholder}
                          className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2 text-xs text-zinc-100 focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="">{locale === 'ar' ? 'اختر...' : locale === 'derja' ? 'Ekhtar...' : locale === 'en' ? 'Select...' : 'Sélectionner...'}</option>
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
                          className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
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


