"use client"

import type { ReactNode } from "react"
import { useVistaraStyles } from "@/theme"

export function MarketingShell({ children }: { children: ReactNode }) {
  const { styles, cx } = useVistaraStyles()

  return <div className={cx(styles.page)}>{children}</div>
}
