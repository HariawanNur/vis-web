"use client"

import React, { createContext, useContext, useMemo, useState } from "react"
import type { BreadcrumbProps } from "antd"

type BreadcrumbItems = NonNullable<BreadcrumbProps["items"]>

interface BreadcrumbContextValue {
  breadcrumbs: BreadcrumbItems | null
  setBreadcrumbs: (items: BreadcrumbItems | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(undefined)

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItems | null>(null)

  const value = useMemo(
    () => ({ breadcrumbs, setBreadcrumbs }),
    [breadcrumbs],
  )

  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext)

  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider")
  }

  return context
}

export type { BreadcrumbItems }
