import type { Locale, TranslationKey } from "@/i18n"
import { getApiUrl } from "@/lib/runtime-env"

export interface MarketingHomeStat {
  id: string
  value: string
  labelKey: TranslationKey
}

export interface MarketingContentCard {
  id: string
  icon: string
  titleKey: TranslationKey
  descriptionKey: TranslationKey
}

export interface MarketingFeatureGroup {
  id: string
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  cards: MarketingContentCard[]
}

export interface MarketingPricingPlan {
  id: string
  icon: string
  name: TranslationKey
  nameKey: TranslationKey
  descriptionKey: TranslationKey
  price: string
  currency: "IDR"
  periodKey: TranslationKey
  featureKeys: TranslationKey[]
  ctaKey: TranslationKey
  featured: boolean
}

export interface MarketingComparisonRow {
  id: string
  labelKey: TranslationKey
  values: Record<string, boolean | TranslationKey>
}

export interface MarketingContactOption {
  id: string
  labelKey: TranslationKey
}

export interface MarketingContactInfo {
  id: string
  icon: string
  labelKey: TranslationKey
  value: string
  href?: string
}

export interface MarketingSiteData {
  home: {
    stats: MarketingHomeStat[]
    features: MarketingContentCard[]
  }
  features: {
    groups: MarketingFeatureGroup[]
  }
  benefits: {
    cards: MarketingContentCard[]
    stats: MarketingHomeStat[]
  }
  pricing: {
    highlights: MarketingContentCard[]
    plans: MarketingPricingPlan[]
    comparison: MarketingComparisonRow[]
  }
  about: {
    stats: MarketingHomeStat[]
    values: MarketingContentCard[]
  }
  contact: {
    promises: MarketingContentCard[]
    info: MarketingContactInfo[]
    businessTypeOptions: MarketingContactOption[]
    teamSizeOptions: MarketingContactOption[]
    visitBullets: MarketingContentCard[]
  }
}

export interface MarketingContactInput {
  name: string
  email: string
  phone?: string
  businessType?: string
  teamSize?: string
  message: string
}

export interface MarketingContactSubmission {
  id: string
  submittedAt: string
}

interface ApiEnvelope<T> {
  success?: boolean
  data?: T
  message?: string
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null
  if (!response.ok || !payload?.success || payload.data === undefined) {
    throw new Error(payload?.message || "Unable to complete the request")
  }
  return payload.data
}

const localeRequest = (locale: Locale, signal?: AbortSignal) => ({
  signal,
  headers: { "Accept-Language": locale },
})

export const fetchMarketingSiteData = async (
  locale: Locale,
  signal?: AbortSignal
): Promise<MarketingSiteData> => {
  const url = new URL(`${getApiUrl()}/marketing/site-data`)
  url.searchParams.set("locale", locale)
  const response = await fetch(url, localeRequest(locale, signal))
  return parseResponse<MarketingSiteData>(response)
}

export const submitMarketingContact = async (
  input: MarketingContactInput,
  locale: Locale,
  signal?: AbortSignal
): Promise<MarketingContactSubmission> => {
  const url = new URL(`${getApiUrl()}/marketing/contact`)
  url.searchParams.set("locale", locale)
  const response = await fetch(url, {
    ...localeRequest(locale, signal),
    method: "POST",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
  return parseResponse<MarketingContactSubmission>(response)
}
