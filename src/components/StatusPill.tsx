import React from "react"
import { createStyles } from "antd-style"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  pill: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
  `,
  ok: css`
    background: ${designSystem.palette.tintSuccess};
    color: ${designSystem.palette.success};
  `,
  warn: css`
    background: ${designSystem.palette.tintWarning};
    color: ${designSystem.palette.secondary};
  `,
  bad: css`
    background: ${designSystem.palette.tintError};
    color: ${designSystem.palette.error};
  `,
}))

export interface StatusPillProps {
  label: string
  tone: "ok" | "warn" | "bad"
}

export const StatusPill: React.FC<StatusPillProps> = ({ label, tone }) => {
  const { styles } = useStyles()
  const toneClass = tone === "ok" ? styles.ok : tone === "warn" ? styles.warn : styles.bad
  return <span className={`${styles.pill} ${toneClass}`}>{label}</span>
}

export default StatusPill
