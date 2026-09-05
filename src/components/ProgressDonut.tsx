import React from "react"
import { createStyles } from "antd-style"
import { Typography } from "@/components"
import { designSystem } from "@/theme/antd-theme"

const { Text } = Typography

export interface ProgressDonutSegment {
  value: number
  color: string
}

export interface ProgressDonutProps {
  variant?: "single" | "segments"
  value?: number
  total?: number
  label?: string
  size?: number
  thickness?: number
  segments?: ProgressDonutSegment[]
  trackColor?: string
  centerValue?: React.ReactNode
  centerLabel?: React.ReactNode
  legendItems?: ProgressDonutLegendItem[]
  className?: string
}

export interface ProgressDonutLegendItem {
  label: React.ReactNode
  value: React.ReactNode
  color: string
}

const useStyles = createStyles(({ css }) => ({
  root: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 100%;
  `,
  ring: css`
    border-radius: 50%;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 1px ${designSystem.palette.track};
  `,
  inner: css`
    border-radius: 50%;
    background: ${designSystem.palette.white};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  `,
  value: css`
    color: ${designSystem.palette.text} !important;
    font-weight: 800 !important;
    line-height: 1 !important;
  `,
  label: css`
    color: ${designSystem.palette.textSecondary} !important;
    font-size: 12px !important;
    font-weight: 700 !important;
  `,
  legendList: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid ${designSystem.palette.borderSoft};
  `,
  legendItem: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: ${designSystem.palette.text};
    font-size: 12px;
    font-weight: 600;
    padding: 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid ${designSystem.palette.borderSoft};
    }
  `,
  legendLeft: css`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  `,
  legendMarker: css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex: 0 0 auto;
  `,
}))

export const ProgressDonut: React.FC<ProgressDonutProps> = ({
  variant = "single",
  value,
  total = 100,
  label,
  size = 162,
  thickness = 18,
  segments,
  trackColor = designSystem.palette.track,
  centerValue,
  centerLabel,
  legendItems,
  className,
}) => {
  const { styles } = useStyles()
  const parts = variant === "segments" && segments && segments.length > 0
    ? segments
    : typeof value === "number"
      ? [{ value, color: designSystem.palette.primary }]
      : []
  const sum = parts.reduce((acc, item) => acc + item.value, 0) || total
  const normalizedTotal = sum > 0 ? sum : total

  let cursor = 0
  const stops = parts
    .map((item) => {
      const start = cursor
      const end = cursor + (item.value / normalizedTotal) * 100
      cursor = end
      return `${item.color} ${start}% ${end}%`
    })
    .join(", ")

  const ringStyle: React.CSSProperties = {
    width: size,
    height: size,
    padding: thickness,
    background: parts.length > 0 ? `conic-gradient(${stops})` : trackColor,
  }

  const innerSize = size - thickness * 2

  return (
    <div className={className} style={{ width: "100%" }}>
      <div className={styles.root} style={{ width: "100%" }}>
        <div className={styles.ring} style={ringStyle}>
          <div className={styles.inner} style={{ width: innerSize, height: innerSize }}>
            {centerValue ? (
              centerValue
            ) : (
              <Text className={styles.value} style={{ fontSize: `clamp(20px, ${size / 7}px, 32px)` }}>
                {value ?? 0}%
              </Text>
            )}
            {centerLabel ? (
              centerLabel
            ) : label ? (
              <Text className={styles.label}>{label}</Text>
            ) : null}
          </div>
        </div>
      </div>
      {legendItems && legendItems.length > 0 ? (
        <div style={{ marginTop: 12, width: "100%", alignSelf: "stretch" }}>
          <ProgressDonutLegend items={legendItems} />
        </div>
      ) : null}
    </div>
  )
}

export const ProgressDonutLegend: React.FC<{ items: ProgressDonutLegendItem[]; className?: string }> = ({ items, className }) => {
  const { styles } = useStyles()
  return (
    <div className={`${styles.legendList} ${className || ""}`}>
      {items.map((item, index) => (
        <div key={`${String(item.label)}-${index}`} className={styles.legendItem}>
          <div className={styles.legendLeft}>
            <span className={styles.legendMarker} style={{ background: item.color }} />
            <span>{item.label}</span>
          </div>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default ProgressDonut
