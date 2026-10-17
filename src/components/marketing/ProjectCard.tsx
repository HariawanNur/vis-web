"use client"

import React from "react"
import Image from "next/image"
import { createStyles } from "antd-style"
import { Card, Progress, Tag, Typography, Space, Icon } from "@/components"
import { designSystem } from "@/theme/antd-theme"
import { useI18n, type TranslationKey } from "@/i18n"

const { Text, Title } = Typography

const useStyles = createStyles(({ css }) => ({
  card: css`
    border-radius: 16px !important;
    border: 1px solid ${designSystem.palette.borderSoft} !important;
    box-shadow: ${designSystem.elevation.card};
    background: ${designSystem.palette.white};
  `,
  row: css`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 16px;
    flex-wrap: nowrap;

    @media (max-width: 767px) {
      flex-direction: column;
      flex-wrap: wrap;
    }
  `,
  media: css`
    width: 148px;
    min-width: 148px;
    height: 108px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    background: ${designSystem.palette.surface};

    @media (max-width: 767px) {
      width: 100%;
      min-width: 0;
      height: 180px;
    }
  `,
  content: css`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  `,
  headRow: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  `,
  progressRow: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  footerRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  `,
}))

export interface ProjectCardProps {
  id?: string
  title: string
  code?: string
  status: "on_track" | "attention" | "delayed" | string
  progress: number
  startDate?: string
  targetDate: string
  budget: string
  imageUri: string
  location?: string
  daysLeft?: string
  onClick?: () => void
}

const statusConfig: Record<string, { labelKey: TranslationKey; color: string; bg: string; icon: string }> = {
  on_track: { labelKey: "project.status.onTrack", color: designSystem.palette.success, bg: designSystem.palette.tintSuccess, icon: "CheckCircleFilled" },
  attention: { labelKey: "project.status.attention", color: designSystem.palette.warning, bg: designSystem.palette.tintWarning, icon: "ExclamationCircleOutlined" },
  delayed: { labelKey: "project.status.delayed", color: designSystem.palette.error, bg: designSystem.palette.tintError, icon: "ClockCircleOutlined" },
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  code,
  status,
  progress,
  startDate,
  targetDate,
  budget,
  imageUri,
  location,
  daysLeft,
  onClick,
}) => {
  const { t } = useI18n()
  const { styles } = useStyles()
  const config = statusConfig[status] || statusConfig.on_track
  const statusLabel = t(config.labelKey)

  return (
    <Card
      variant="borderless"
      onClick={onClick}
      className={styles.card}
      style={{
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      styles={{ body: { padding: 16 } }}
    >
      <div className={styles.row}>
        <div className={styles.media}>
          <Image
            src={imageUri || "/images/bg_building.png"}
            alt={title}
            fill
            sizes="(max-width: 767px) 100vw, 148px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.content}>
          <div>
            <div className={styles.headRow}>
              <Tag
                color={config.color}
                style={{
                  background: config.bg,
                  color: config.color,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 11,
                  borderRadius: 999,
                  padding: "4px 10px",
                  margin: 0,
                }}
              >
                {statusLabel}
              </Tag>
              {location && (
                <Text style={{ fontSize: 12, color: designSystem.palette.textSecondary, fontWeight: 600 }}>
                  <Icon type="EnvironmentOutlined" style={{ color: designSystem.palette.primary, marginRight: 4 }} />
                  {location}
                </Text>
              )}
            </div>

            <Title level={5} style={{ margin: 0, color: designSystem.palette.text, fontWeight: 800, fontSize: 16, lineHeight: 1.25 }}>
              {title}
            </Title>

            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
              {code && (
                <Text style={{ fontSize: 12, color: designSystem.palette.textSecondary, fontWeight: 600 }}>
                  {t("project.labels.projectId")}: <span style={{ color: designSystem.palette.primary }}>{code}</span>
                </Text>
              )}
              {startDate && (
                <Text style={{ fontSize: 12, color: designSystem.palette.textSecondary, fontWeight: 600 }}>
                  {t("project.labels.startDate")}: <span style={{ color: designSystem.palette.primary }}>{startDate}</span>
                </Text>
              )}
            </div>
          </div>

          <div>
            <div className={styles.progressRow}>
              <Progress
                percent={progress}
                size="small"
                strokeColor={designSystem.palette.primary}
                railColor={designSystem.palette.tintPrimary}
                style={{ flex: 1, margin: 0 }}
              />
              <Text strong style={{ fontSize: 13, color: designSystem.palette.primary, minWidth: 40, textAlign: "right" }}>
                {progress}%
              </Text>
            </div>

            <div className={styles.footerRow}>
              <Space size={10} wrap>
                <Text style={{ fontSize: 12, color: designSystem.palette.textSecondary, fontWeight: 600 }}>
                  {t("project.labels.target")}: <span style={{ color: designSystem.palette.primary }}>{targetDate}</span>
                </Text>
                {daysLeft && (
                    <Text style={{ fontSize: 12, color: designSystem.palette.textSecondary, fontWeight: 600 }}>
                      <Icon type="ClockCircleOutlined" style={{ color: designSystem.palette.secondary, marginRight: 4 }} />
                    {daysLeft} {t("common.daysLeft")}
                  </Text>
                )}
              </Space>

              <div>
                <Text style={{ fontSize: 12, color: designSystem.palette.textSecondary, fontWeight: 600, marginRight: 6 }}>{t("project.labels.budget")}</Text>
                <Text strong style={{ color: designSystem.palette.primary, fontSize: 14 }}>
                  {budget}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
