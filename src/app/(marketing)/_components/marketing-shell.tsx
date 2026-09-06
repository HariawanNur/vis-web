"use client"

import type { ReactNode } from "react"
import { MarketingDataStatusProvider } from "@/context/marketing-data-context"
import { useVistaraStyles } from "@/theme"

export function MarketingShell({ children }: { children: ReactNode }) {
  const { styles, cx } = useVistaraStyles()

  return (
    <MarketingDataStatusProvider>
      <div className={cx(styles.page)}>
        {children}
      </div>
    </MarketingDataStatusProvider>
  )
}