import type { Locale } from '../config';
import { en, type Dictionary } from './en';
import { si } from './si';
import { ta } from './ta';

const dictionaries: Record<Locale, Dictionary> = { en, si, ta };

/**
 * Every dictionary is a plain object bundled with the app, so this is
 * synchronous. If the copy ever moves to a CMS, this is the seam to change.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
