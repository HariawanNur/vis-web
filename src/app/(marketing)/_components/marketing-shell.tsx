"use client"

import type { ReactNode } from "react"
import { createStyles } from "antd-style"
import { Icon } from "@/components"
import { useI18n } from "@/i18n"
import { MarketingDataStatusProvider, useMarketingDataStatus } from "@/context/marketing-data-context"
import { useVistaraStyles } from "@/theme"

const useStyles = createStyles(({ css, token }) => ({
  fallbackBadge: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid rgba(250, 173, 20, 0.25);
    border-radius: 999px;
    background: rgba(17, 24, 39, 0.92);
    color: #ffd666;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 12px 30px rgba(7, 17, 31, 0.18);
    pointer-events: auto;
  `,
  fallbackWrap: css`
    position: fixed;
    top: 96px;
    right: 24px;
    z-index: 70;
    pointer-events: none;
    display: flex;
    justify-content: center;

    @media (max-width: ${token.screenSM}px) {
      top: 78px;
      right: 12px;
      left: 12px;
      justify-content: flex-end;
    }
  `,
}))

function MarketingFallbackBadge() {
  const { styles } = useStyles()
  const { t } = useI18n()
  const { source } = useMarketingDataStatus()

  if (source !== "fallback") return null

  return (
    <div className={styles.fallbackWrap}>
      <div className={styles.fallbackBadge}>
        <Icon type="WarningOutlined" />
        {t("marketing.fallbackBadge")}
      </div>
    </div>
  )
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const { styles, cx } = useVistaraStyles()

  return (
    <MarketingDataStatusProvider>
      <div className={cx(styles.page)}>
        <MarketingFallbackBadge />
        {children}
      </div>
    </MarketingDataStatusProvider>
  )
}
