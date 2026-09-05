import React from "react"
import {
  Area,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceDot,
} from "recharts"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

export interface ChartLineConfig {
  dataKey: string
  stroke: string
  name?: string
  strokeWidth?: number
}

export interface CustomChartProps {
  data: any[]
  lines: ChartLineConfig[]
  xAxisKey: string
  height?: number | string
  className?: string
  gridStroke?: string
  variant?: "default" | "sparkline"
  gridDashArray?: number[]
  axisStroke?: string
  xAxisInterval?: number | "preserveStartEnd" | "preserveEnd"
  xAxisTickCount?: number
  yAxisTickCount?: number
  tickMargin?: number
  dotRadius?: number
  showLegend?: boolean
  showTooltip?: boolean
  showAreaFill?: boolean
  areaDataKey?: string
  areaFill?: string
  areaFillOpacity?: number
  annotationLabel?: string
  annotationValue?: string
  annotationColor?: string
  annotationFill?: string
}

const useStyles = createStyles(({ css }) => ({
  container: css`
    width: 100%;
    height: 100%;
  `,
  tooltip: css`
    border: 1px solid ${designSystem.palette.borderSoft};
    border-radius: 12px;
    background: ${designSystem.palette.white};
    box-shadow: 0 10px 24px rgba(13, 43, 104, 0.08);
    padding: 10px 12px;
  `,
  tooltipTitle: css`
    color: ${designSystem.palette.textSecondary};
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 6px;
  `,
  tooltipRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    color: ${designSystem.palette.text};
    font-size: 12px;
    font-weight: 700;
    min-width: 160px;
  `,
  tooltipLeft: css`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  `,
  tooltipDot: css`
    width: 8px;
    height: 8px;
    border-radius: 999px;
    flex: 0 0 auto;
  `,
}))

export const Chart: React.FC<CustomChartProps> = ({
  data,
  lines,
  xAxisKey,
  height = 220,
  className,
  gridStroke = designSystem.palette.borderSoft,
  variant = "default",
  gridDashArray = [2, 2],
  axisStroke = designSystem.palette.textTertiary,
  xAxisInterval,
  xAxisTickCount = 6,
  yAxisTickCount = 6,
  tickMargin = 12,
  dotRadius = 3,
  showLegend = true,
  showTooltip = true,
  showAreaFill = false,
  areaDataKey,
  areaFill = designSystem.palette.tintPrimary,
  areaFillOpacity = 0.14,
  annotationLabel,
  annotationValue,
  annotationColor = designSystem.palette.primary,
  annotationFill = designSystem.palette.white,
}) => {
  const { styles } = useStyles()
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 })
  const isSparkline = variant === "sparkline"
  const chartMargin = isSparkline
    ? { top: 5, right: 5, bottom: 5, left: 5 }
    : showAreaFill || annotationLabel
      ? { top: 12, right: 44, bottom: 8, left: -20 }
      : { top: 5, right: 20, bottom: 5, left: -20 }
  const areaKey = areaDataKey || lines[0]?.dataKey
  const lastPoint = !isSparkline && annotationLabel && data.length > 0 ? data[data.length - 1] : null

  React.useEffect(() => {
    const node = containerRef.current
    if (!node || typeof ResizeObserver === "undefined") return undefined

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setContainerSize({ width, height })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const connector = React.useMemo(() => {
    if (isSparkline || !annotationLabel || !annotationValue || !lastPoint || !areaKey) return null
    const width = containerSize.width
    const height = containerSize.height
    if (!width || !height) return null

    const left = 8
    const right = 44
    const top = 18
    const bottom = 18
    const plotWidth = Math.max(1, width - left - right)
    const plotHeight = Math.max(1, height - top - bottom)
    const index = Math.max(0, data.length - 1)
    const x = left + (data.length > 1 ? (index / (data.length - 1)) * plotWidth : plotWidth)

    const values = data.map((item) => Number(item[areaKey])).filter((value) => Number.isFinite(value))
    const min = values.length ? Math.min(...values) : 0
    const max = values.length ? Math.max(...values) : 1
    const range = Math.max(1, max - min)
    const value = Number(lastPoint[areaKey])
    const normalized = Number.isFinite(value) ? (value - min) / range : 0
    const y = top + plotHeight - normalized * plotHeight

    const endX = Math.max(x + 56, width - 132)
    const endY = Math.max(26, y - 24)
    const controlX = x + 28
    const controlY = Math.min(y, endY) - 12

    return { x, y, endX, endY, controlX, controlY }
  }, [annotationLabel, annotationValue, areaKey, containerSize.height, containerSize.width, data, isSparkline, lastPoint])

  const renderTooltip = React.useCallback(
    ({ active, label, payload }: any) => {
      if (!active || !payload?.length) return null

      const uniquePayload = payload.filter(
        (entry: any, index: number, arr: any[]) =>
          arr.findIndex((item) => item.dataKey === entry.dataKey) === index,
      )

      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>{label}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {uniquePayload.map((entry: any, index: number) => (
              <div key={`${String(entry.dataKey)}-${index}`} className={styles.tooltipRow}>
                <span className={styles.tooltipLeft}>
                  <span className={styles.tooltipDot} style={{ background: entry.color || entry.stroke }} />
                  <span>{entry.name || entry.dataKey}</span>
                </span>
                <span>{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    [styles],
  )

  return (
    <div ref={containerRef} className={classNames(styles.container, className)} style={{ height, position: "relative" }}>
      {annotationLabel && annotationValue && !isSparkline && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 18,
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
            borderRadius: 999,
            border: `1px solid ${designSystem.palette.borderSoft}`,
            background: designSystem.palette.white,
            boxShadow: designSystem.elevation.card,
            transform: "translateY(-4px)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: annotationColor,
              boxShadow: `0 0 0 4px ${designSystem.palette.track}`,
              flex: "0 0 auto",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
            <span style={{ color: designSystem.palette.textSecondary, fontSize: 10, fontWeight: 700, lineHeight: 1 }}>
              {annotationLabel}
            </span>
            <span style={{ color: designSystem.palette.text, fontSize: 13, fontWeight: 800, lineHeight: 1.1 }}>
              {annotationValue}
            </span>
          </div>
          <span
            style={{
              position: "absolute",
              right: 18,
              bottom: -4,
              width: 12,
              height: 12,
              background: designSystem.palette.white,
              borderRight: `1px solid ${designSystem.palette.borderSoft}`,
              borderBottom: `1px solid ${designSystem.palette.borderSoft}`,
              transform: "rotate(45deg)",
              borderBottomRightRadius: 2,
            }}
          />
        </div>
      )}
      {connector && (
        <svg
          width={containerSize.width}
          height={containerSize.height}
          viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
          style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
        >
          <path
            d={`M ${connector.x + 8} ${connector.y - 8} C ${connector.controlX} ${connector.controlY}, ${connector.endX - 24} ${connector.endY + 8}, ${connector.endX} ${connector.endY}`}
            fill="none"
            stroke={annotationColor}
            strokeWidth={1.6}
            strokeDasharray="4 4"
            opacity={0.72}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={connector.x + 8} cy={connector.y - 8} r={3} fill={annotationColor} opacity={0.95} />
        </svg>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={chartMargin}
        >
          {!isSparkline && (
            <CartesianGrid strokeDasharray={gridDashArray.join(" ")} stroke={gridStroke} />
          )}
          {!isSparkline && (
            <XAxis
              dataKey={xAxisKey}
              stroke={axisStroke}
              fontSize={11}
              tickMargin={tickMargin}
              tickCount={xAxisTickCount}
              interval={xAxisInterval ?? "preserveStartEnd"}
              tickLine={false}
              axisLine={{ stroke: gridStroke }}
              tick={{ fill: axisStroke }}
              minTickGap={8}
            />
          )}
          {!isSparkline && (
            <YAxis
              stroke={axisStroke}
              fontSize={11}
              tickMargin={tickMargin}
              tickLine={false}
              axisLine={{ stroke: gridStroke }}
              tick={{ fill: axisStroke }}
              tickCount={yAxisTickCount}
            />
          )}
          {!isSparkline && showTooltip && (
            <Tooltip content={renderTooltip} cursor={{ stroke: annotationColor, strokeDasharray: "4 4" }} />
          )}
          {!isSparkline && showLegend && (
            <Legend wrapperStyle={{ fontSize: 12 }} />
          )}
          {showAreaFill && areaKey && (
            <Area
              type="monotone"
              dataKey={areaKey}
              stroke="none"
              fill={areaFill}
              fillOpacity={areaFillOpacity}
              isAnimationActive={false}
            />
          )}
          {lines.map((l) => (
            <Line
              key={l.dataKey}
              type="monotone"
              dataKey={l.dataKey}
              stroke={l.stroke}
              strokeWidth={l.strokeWidth || 2}
              name={l.name || l.dataKey}
              dot={isSparkline ? { r: 2.5 } : { r: dotRadius, strokeWidth: 2 }}
              activeDot={isSparkline ? { r: 3.5 } : { r: dotRadius + 2, strokeWidth: 0 }}
            />
          ))}
          {lastPoint && areaKey && (
            <ReferenceDot
              x={lastPoint[xAxisKey]}
              y={lastPoint[areaKey]}
              r={4}
              fill={annotationFill}
              stroke={annotationColor}
              strokeWidth={2}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
