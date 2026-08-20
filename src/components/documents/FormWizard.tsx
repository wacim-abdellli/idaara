'use client';

import React from 'react';
import { DocumentTemplate, FormFieldSchema } from '../../types/document';
import { useLocale } from '../../context/LocaleContext';
import { Sparkles, CheckCircle } from 'lucide-react';

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
    <div className="glass-panel rounded-2xl p-6 border border-zinc-800 space-y-6">
      {/* Wizard Header & Sample Auto-fill */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-white">
            Formulaire de Remplissage
          </h3>
          <p className="text-xs text-zinc-400">
            3abbi les données mte3ek lena, el PDF yetbaddel en direct
          </p>
        </div>

        {template.sampleData && (
          <button
            type="button"
            onClick={onAutoFillSample}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exemple Réel (Auto-fill)</span>
          </button>
        )}
      </div>

      {/* Dynamic Fields by Section */}
      <div className="space-y-6">
        {template.sections.map((section) => {
          const sectionTitle = section.title[locale] || section.title['derja'];
          const fields = template.fields.filter((f) => f.section === section.id);

          return (
            <div key={section.id} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{sectionTitle}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                  const label = field.label[locale] || field.label['derja'];
                  const placeholder =
                    field.placeholder?.[locale] || field.placeholder?.['derja'] || '';
                  const value = formData[field.name] ?? '';

                  return (
                    <div
                      key={field.id}
                      className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                    >
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
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
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="">Sélectionner...</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label[locale] || opt.label['derja']}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={value}
                          onChange={(e) => onChangeField(field.name, e.target.value)}
                          placeholder={placeholder}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
