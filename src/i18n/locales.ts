import pkg from "../../package.json"
import en from "./locales/en.json"
import id from "./locales/id.json"
import ms from "./locales/ms.json"

export const locales = ["en", "id", "ms"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "id"

export const localeStorageKey = `${pkg.name}-locale`

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
}

export type Translations = typeof en

type JoinPath<P extends string, K extends string> = P extends "" ? K : `${P}.${K}`

type TranslationLeafKeys<T, P extends string = ""> = {
  [K in Extract<keyof T, string>]: T[K] extends object
    ? T[K] extends readonly unknown[]
      ? JoinPath<P, K>
      : TranslationLeafKeys<T[K], JoinPath<P, K>>
    : JoinPath<P, K>
}[Extract<keyof T, string>]

export type TranslationKey = TranslationLeafKeys<Translations>

export const translations = {
  en,
  id,
  ms,
} satisfies Record<Locale, Translations>

export function flattenMessages(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenMessages(value as Record<string, unknown>, path)
      )
    } else {
      result[path] = String(value)
    }
  }

  return result
}

export interface TFunction {
  (key: TranslationKey): string
}
