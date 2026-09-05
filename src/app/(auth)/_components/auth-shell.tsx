"use client"

import type { ReactNode } from "react"
import { createStyles } from "@/components"

const useStyles = createStyles(({ css }) => ({
  shell: css`
    min-height: 100dvh;
    background: #f8fafc;
  `,
}))

export function AuthShell({ children }: { children: ReactNode }) {
  const { styles } = useStyles()

  return <div className={styles.shell}>{children}</div>
}