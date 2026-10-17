import React from "react"
import { createStyles } from "antd-style"
import { Button } from "@/components"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  chip: css`
    height: 36px !important;
    border-radius: 999px !important;
    border: 1px solid ${designSystem.palette.borderSoft} !important;
    background: ${designSystem.palette.white} !important;
    color: ${designSystem.palette.textSecondary} !important;
    font-weight: 700 !important;
    padding: 0 14px !important;
    box-shadow: 0 1px 2px rgba(13, 43, 104, 0.04);
  `,
  active: css`
    background: ${designSystem.palette.primary} !important;
    color: ${designSystem.palette.white} !important;
    border-color: ${designSystem.palette.primary} !important;
  `,
}))

export interface FilterChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, active, onClick }) => {
  const { styles } = useStyles()

  return (
    <Button type="text" onClick={onClick} className={`${styles.chip} ${active ? styles.active : ""}`}>
      {label}
    </Button>
  )
}

export default FilterChip
