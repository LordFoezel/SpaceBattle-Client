import { AuthTokenHelper } from "./authToken.js";
import de from "../../locales/de.json";
import en from "../../locales/en.json";

type Dict = Record<string, string>;
type Lang = "de" | "en";
export type TranslationParams = Record<string, string | number | boolean>;

const LOCALES: Record<Lang, Dict> = {
  de: de as Dict,
  en: en as Dict,
};

function normalizeLang(raw?: unknown): Lang {
  const s = String(raw || "").toLowerCase();
  if (s.startsWith("de")) return "de";
  if (s.startsWith("en")) return "en";
  return "en";
}

export function getCurrentLanguage(): Lang {
  try {
    const ident = AuthTokenHelper.getUserIdentity();
    if (ident?.language) return normalizeLang(ident.language);
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined") {
    const nav = (navigator as any);
    const candidate = nav.language || (Array.isArray(nav.languages) && nav.languages[0]);
    return normalizeLang(candidate);
  }
  return "en";
}

function format(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ""));
}

export function t(key: string, params?: TranslationParams, lang?: Lang): string {
  const lng = lang ?? getCurrentLanguage();
  const dict = LOCALES[lng] ?? LOCALES.en;
  const fallback = LOCALES.en[key] ?? key;
  const template = dict[key] ?? fallback;
  return format(template, params);
}
