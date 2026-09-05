"use client"

import { useCallback, useEffect, useState } from "react"

import type { Locale } from "@/i18n"
import { fetchMarketingSiteData, type MarketingSiteData } from "./marketing-api"
import { marketingSiteData } from "./marketing-data"
import { useMarketingDataStatus } from "@/context/marketing-data-context"

const RETRY_DELAY_MS = 5000

export function useMarketingData(locale: Locale) {
  const [data, setData] = useState<MarketingSiteData | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [requestVersion, setRequestVersion] = useState(0)
  const { source, setSource } = useMarketingDataStatus()

  const refetch = useCallback(() => setRequestVersion((version) => version + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let retryTimer: number | undefined
    setLoading(true)
    setError(null)

    fetchMarketingSiteData(locale, controller.signal)
      .then((siteData) => {
        if (controller.signal.aborted) return
        setData(siteData)
        setSource("api")
        setLoading(false)
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return
        console.warn("Marketing API unavailable, using local fallback data.", reason)
        setData(marketingSiteData)
        setSource("fallback")
        setError(null)
        setLoading(false)
        retryTimer = window.setTimeout(() => {
          if (!controller.signal.aborted) {
            setRequestVersion((version) => version + 1)
          }
        }, RETRY_DELAY_MS)
      })

    return () => {
      controller.abort()
      if (retryTimer) window.clearTimeout(retryTimer)
    }
  }, [locale, requestVersion, setSource])

  return { data, error, loading, refetch, source, isFallback: source === "fallback" }
}
