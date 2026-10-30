import en from "./languages/en.json";
import ptBR from "./languages/pt-BR.json";
import type { HassObject } from "../types";

const TRANSLATIONS: Record<string, unknown> = { en, "pt-BR": ptBR, pt: ptBR };

function lookup(dict: unknown, path: string[]): string | undefined {
  let cur: unknown = dict;
  for (const key of path) {
    if (cur && typeof cur === "object" && key in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

export function resolveLanguage(hass?: HassObject, override?: string): string {
  return override ?? hass?.locale?.language ?? hass?.language ?? "en";
}

export function localize(key: string, lang = "en", vars: Record<string, string | number> = {}): string {
  const path = key.split(".");
  const found =
    lookup(TRANSLATIONS[lang], path) ??
    lookup(TRANSLATIONS[lang.split("-")[0]], path) ??
    lookup(TRANSLATIONS.en, path) ??
    key;
  return found.replace(/\{(\w+)\}/g, (_, name: string) => (name in vars ? String(vars[name]) : `{${name}}`));
}
