export interface LocalizedString {
  derja: string;
  fr: string;
  ar: string;
  en?: string;
  [key: string]: string | undefined;
}

export interface LocalizedStringArray {
  derja: string[];
  fr: string[];
  ar: string[];
  en?: string[];
  [key: string]: string[] | undefined;
}

/**
 * Pick the best string for the current locale.
 * Falls back to 'fr', then 'derja', then any available string.
 */
export function getLocalized(
  obj: LocalizedString | Record<string, string | undefined> | undefined | null,
  locale: string
): string {
  if (!obj) return '';
  if (obj[locale]) return obj[locale] as string;
  if (locale === 'en' && obj.fr) return obj.fr;
  return obj.fr || obj.derja || obj.ar || Object.values(obj)[0] || '';
}

/**
 * Pick the best string array for the current locale.
 */
export function getLocalizedArray(
  obj: LocalizedStringArray | Record<string, string[] | undefined> | undefined | null,
  locale: string
): string[] {
  if (!obj) return [];
  if (obj[locale]) return obj[locale] as string[];
  if (locale === 'en' && obj.fr) return obj.fr;
  return obj.fr || obj.derja || obj.ar || Object.values(obj)[0] || [];
}
