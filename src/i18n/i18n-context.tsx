"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  defaultLocale,
  flattenMessages,
  localeNames,
  localeStorageKey,
  translations,
  type Locale,
  type TFunction,
} from "./locales"

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TFunction
  localeNames: Record<Locale, string>
}

const I18nContext = createContext<I18nContextValue | null>(null)

function resolveLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale

  const stored = localStorage.getItem(localeStorageKey)
  if (stored === "en" || stored === "id" || stored === "ms") return stored

  return defaultLocale
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const resolvedLocale = resolveLocale()
    setLocaleState(resolvedLocale)
    document.documentElement.lang = resolvedLocale
  }, [])

  const flatMessages = useMemo(
    () => flattenMessages(translations[locale] as Record<string, unknown>),
    [locale]
  )
  const fallbackMessages = useMemo(
    () => flattenMessages(translations[defaultLocale] as Record<string, unknown>),
    []
  )

  const t: TFunction = useCallback(
    (key: string) => flatMessages[key] ?? fallbackMessages[key] ?? key,
    [fallbackMessages, flatMessages]
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(localeStorageKey, next)
    document.documentElement.lang = next
  }, [])

  const value: I18nContextValue = {
    locale,
    setLocale,
    t,
    localeNames,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return ctx
}
