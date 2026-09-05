"use client"

import { useCallback, useEffect, useState } from "react"

import type { Locale } from "@/i18n"
import { fetchMarketingSiteData, type MarketingSiteData } from "./marketing-api"

export function useMarketingData(locale: Locale) {
  const [data, setData] = useState<MarketingSiteData | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [requestVersion, setRequestVersion] = useState(0)

  const refetch = useCallback(() => setRequestVersion((version) => version + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchMarketingSiteData(locale, controller.signal)
      .then((siteData) => {
        if (controller.signal.aborted) return
        setData(siteData)
        setLoading(false)
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return
        setError(reason instanceof Error ? reason : new Error("Unable to load marketing data"))
        setLoading(false)
      })

    return () => controller.abort()
  }, [locale, requestVersion])

  return { data, error, loading, refetch }
}
