"use client"

"use client"

import { useEffect, useState } from "react"
import { createStyles } from "antd-style"
import { Button, Card, Flex, Icon, MapLocation, Typography } from "@/components"
import { designSystem } from "@/theme/antd-theme"
import { useI18n, type TranslationKey } from "@/i18n"
import type { ProjectMapLocationItem } from "@/lib/project-api"

const { Text } = Typography

export type MapDetailsLegendItem = {
  label: string
  description?: string
  color: string
}

export type MapDetailsProps = {
  locations: ProjectMapLocationItem[]
  title?: string
  mapHeight?: number
  legendItems?: MapDetailsLegendItem[]
  onViewAll?: () => void
  viewAllLabel?: string
  onLocationClick?: (location: ProjectMapLocationItem) => void
  summaryItems?: Array<{
    label: string
    value: string
    note?: string
  }>
  className?: string
}

const statusFallbackLabelKey: Record<ProjectMapLocationItem["status"], TranslationKey> = {
  on_track: "project.status.onTrack",
  attention: "project.status.attention",
  delayed: "project.status.delayed",
  completed: "project.status.completed",
  inactive: "project.status.inactive",
}

export function MapDetails({
  locations,
  title,
  mapHeight = 220,
  legendItems,
  onViewAll,
  viewAllLabel,
  onLocationClick,
  summaryItems,
  className,
}: MapDetailsProps) {
  const { styles, cx } = useStyles()
  const { t } = useI18n()
  const [activeLocationId, setActiveLocationId] = useState<string | number | null>(null)
  const resolvedTitle = title ?? t("mapDetails.title")
  const resolvedViewAllLabel = viewAllLabel ?? t("mapDetails.viewAll")

  useEffect(() => {
    if (activeLocationId === null) return
    if (!locations.some((item) => item.id === activeLocationId)) {
      setActiveLocationId(null)
    }
  }, [activeLocationId, locations])

  return (
    <Card
      variant="borderless"
      className={cx(styles.card, className)}
      styles={{ body: { padding: 16 } }}
      style={{ borderRadius: 16, boxShadow: designSystem.elevation.card, width: "100%" }}
    >
      <div className={styles.root}>
        <div className={styles.mapPane}>
          <MapLocation
            height={mapHeight}
            compact
            locations={locations}
            preview
            legendItems={legendItems}
            activeLocationId={activeLocationId}
            onActiveLocationIdChange={setActiveLocationId}
          />
        </div>

        <div className={styles.sidePane}>
          <Flex justify="space-between" align="center" gap={12} wrap>
            <Text className={styles.title}>{resolvedTitle}</Text>

            {onViewAll && (
              <Button
                type="default"
                icon={<Icon type="EnvironmentOutlined" />}
                onClick={onViewAll}
                className={styles.viewAllButton}
              >
                {resolvedViewAllLabel}
              </Button>
            )}
          </Flex>

          <div className={styles.list}>
            <Flex vertical gap={10}>
              {locations.map((item) => {
                const statusLabel = item.statusLabel || t(statusFallbackLabelKey[item.status])
                const isActive = activeLocationId === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    className={cx(
                      styles.locationRow,
                      onLocationClick && styles.locationRowClickable,
                      isActive && styles.locationRowActive,
                    )}
                    onClick={() => {
                      setActiveLocationId(item.id)
                      onLocationClick?.(item)
                    }}
                  >
                    <div className={styles.locationMain}>
                      <span
                        className={styles.statusDot}
                        style={{ background: item.markerColor || statusColor(item.status) }}
                      />

                      <div className={styles.locationText}>
                        <Text className={styles.locationTitle}>{item.title}</Text>
                        <Text className={styles.locationDescription}>{item.info ?? item.description}</Text>
                        <Text className={styles.locationStatus} style={{ color: statusColor(item.status) }}>
                          {statusLabel}
                        </Text>
                      </div>
                    </div>

                    <div className={styles.locationMeta}>
                      <Text className={styles.progressValue}>{item.progress}%</Text>
                      <Text className={styles.targetDate}>{item.targetDate}</Text>
                    </div>
                  </button>
                )
              })}
            </Flex>
          </div>

          {summaryItems && summaryItems.length > 0 && (
            <div className={styles.summaryGrid}>
              {summaryItems.map((item) => (
                <div key={`${item.label}-${item.value}`} className={styles.footerSummary}>
                  <div>
                    <Text className={styles.footerLabel}>{item.label}</Text>
                    {item.note && <Text className={styles.footerNote}>{item.note}</Text>}
                  </div>
                  <Text className={styles.footerValue}>{item.value}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

const statusColor = (status: ProjectMapLocationItem["status"]) => {
  switch (status) {
    case "attention":
      return designSystem.palette.warning
    case "delayed":
      return designSystem.palette.error
    case "completed":
      return designSystem.palette.textSecondary
    case "inactive":
      return designSystem.palette.textSecondary
    case "on_track":
    default:
      return designSystem.palette.success
  }
}

const useStyles = createStyles(({ css }) => ({
  card: css`
    width: 100%;
  `,
  root: css`
    display: flex;
    align-items: stretch;
    gap: 16px;
    width: 100%;

    @media (max-width: 991px) {
      flex-direction: column;
    }
  `,
  mapPane: css`
    flex: 1;
    min-width: 0;
  `,
  sidePane: css`
    width: 340px;
    min-width: 340px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 991px) {
      width: 100%;
      min-width: 0;
    }
  `,
  title: css`
    font-size: 13px;
    color: ${designSystem.palette.text};
    font-weight: 800;
  `,
  viewAllButton: css`
    border-radius: 10px !important;
    border-color: ${designSystem.palette.border} !important;
    color: ${designSystem.palette.primary} !important;
    font-weight: 700 !important;
  `,
  list: css`
    max-height: 324px;
    overflow-y: auto;
    padding-right: 4px;
    scrollbar-gutter: stable;

    @media (max-width: 991px) {
      max-height: 280px;
    }
  `,
  locationRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding: 10px 0;
    border: 0;
    border-bottom: 1px solid #EBF1FF;
    background: transparent;
    text-align: left;
  `,
  locationRowClickable: css`
    cursor: pointer;
  `,
  locationRowActive: css`
    background: #EBF1FF;
    border-radius: 12px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  locationMain: css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-width: 0;
    flex: 1;
  `,
  statusDot: css`
    width: 8px;
    height: 8px;
    border-radius: 999px;
    display: inline-block;
    margin-top: 5px;
    flex-shrink: 0;
  `,
  locationText: css`
    min-width: 0;
  `,
  locationTitle: css`
    font-size: 12px;
    color: ${designSystem.palette.text};
    font-weight: 800;
    display: block;
  `,
  locationDescription: css`
    font-size: 11px;
    color: ${designSystem.palette.textSecondary};
    font-weight: 600;
    display: block;
  `,
  locationStatus: css`
    font-size: 10px;
    font-weight: 800;
    display: block;
    margin-top: 4px;
    text-transform: uppercase;
  `,
  locationMeta: css`
    text-align: right;
    min-width: 84px;
  `,
  progressValue: css`
    font-size: 18px;
    color: ${designSystem.palette.text};
    font-weight: 800;
    display: block;
    line-height: 1;
  `,
  targetDate: css`
    font-size: 11px;
    color: ${designSystem.palette.textSecondary};
    font-weight: 700;
    display: block;
    margin-top: 4px;
  `,
  summaryGrid: css`
    display: grid;
    gap: 8px;
  `,
  footerSummary: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid ${designSystem.palette.borderSoft};
  `,
  footerLabel: css`
    font-size: 11px;
    color: ${designSystem.palette.textSecondary};
    font-weight: 700;
    display: block;
  `,
  footerNote: css`
    font-size: 10px;
    color: ${designSystem.palette.textSecondary};
    font-weight: 600;
    display: block;
    margin-top: 2px;
  `,
  footerValue: css`
    font-size: 16px;
    color: ${designSystem.palette.primary};
    font-weight: 800;
    text-align: right;
    white-space: nowrap;
  `,
}))

export default MapDetails
