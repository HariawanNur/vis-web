import React from "react"
import { createStyles } from "antd-style"
import { Card, Icon, Typography } from "@/components"
import { designSystem } from "@/theme/antd-theme"

const { Text, Title } = Typography

const useStyles = createStyles(({ css }) => ({
  card: css`
    border-radius: ${designSystem.radius.xl}px !important;
    border: 1px solid ${designSystem.palette.track} !important;
    box-shadow: ${designSystem.elevation.card} !important;
    background: ${designSystem.palette.white} !important;

    .ant-card-body {
      padding: 16px !important;
    }
  `,
  body: css`
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 100px;
    min-width: 0;
  `,
  icon: css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  `,
  title: css`
    color: ${designSystem.palette.textSecondary} !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    margin-bottom: 4px !important;
  `,
  value: css`
    color: ${designSystem.palette.text} !important;
    font-size: clamp(20px, 1.7vw, 30px) !important;
    font-weight: 800 !important;
    line-height: 1.1 !important;
    margin: 0 !important;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  delta: css`
    color: ${designSystem.palette.success} !important;
    font-size: 12px !important;
    font-weight: 700 !important;
  `,
}))

export interface MetricCardProps {
  title: string
  value: string
  displayValue?: string
  fullValue?: string
  delta: string
  icon: string
  tint: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  displayValue,
  fullValue,
  delta,
  icon,
  tint,
}) => {
  const { styles } = useStyles()
  const renderedValue = displayValue || value

  return (
    <Card className={styles.card}>
      <div className={styles.body}>
        <div className={styles.icon} style={{ background: tint }}>
          <Icon type={icon as any} size={22} color={designSystem.palette.primary} />
        </div>
        <div style={{ minWidth: 0 }}>
          <Text className={styles.title}>{title}</Text>
          <Title level={4} className={styles.value} title={fullValue || value}>
            {renderedValue}
          </Title>
          <Text className={styles.delta}>{delta}</Text>
        </div>
      </div>
    </Card>
  )
}

export default MetricCard
