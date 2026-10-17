"use client"

import { createStyles } from "antd-style"
import { Button, Card, Flex, Icon, Tag, Typography } from "@/components"
import { designSystem } from "@/theme/antd-theme"
import type { AdminPlan } from "@/lib/admin-api"
import type { MarketingPricingPlan } from "@/lib/marketing-api"

const { Text } = Typography
const palette = designSystem.palette

export type CardPlanSummaryItem = {
  icon: string;
  text: string;
}

type CardPlanProps = {
  plan: AdminPlan | MarketingPricingPlan;
  accent: {
    color: string;
    background: string;
  }
  summaryItems: CardPlanSummaryItem[];
  highlightedLabel?: string;
  subscribersLabel?: string;
  editLabel?: string;
  onEdit?: (plan: AdminPlan) => void;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CardPlan({
  plan,
  accent,
  summaryItems,
  highlightedLabel,
  subscribersLabel,
  editLabel,
  onEdit,
  ctaLabel,
  ctaHref,
}: CardPlanProps) {
  const { styles, cx } = useStyles()
  const isAdminPlan = "highlighted" in plan
  const isMarketingPlan = "featured" in plan

  return (
    <Card
      variant="borderless"
      className={cx(
        styles.card,
        (isAdminPlan ? plan.highlighted : isMarketingPlan ? plan.featured : false) && styles.highlighted,
      )}
    >
      <Flex vertical gap={14} style={{ height: "100%" }}>
        <Flex justify="space-between" align="center">
          <Text strong className={styles.title}>
            {plan.name}
          </Text>
          {highlightedLabel && (
            <Tag className={styles.tag}>{highlightedLabel}</Tag>
          )}
        </Flex>

        <Flex align="baseline" gap={4}>
          <Text className={styles.price} style={{ color: accent.color }}>
            {plan.price}
          </Text>
          {isAdminPlan && plan.period ? (
            <Text type="secondary" className={styles.subscriberMeta}>
              {plan.period}
            </Text>
          ) : null}
        </Flex>

        {isAdminPlan && plan.description && (
          <Text type="secondary" className={styles.description}>
            {plan.description}
          </Text>
        )}

        {isAdminPlan && (plan.subscribers || subscribersLabel) && (
          <Flex align="center" gap={6}>
            <Icon type="TeamOutlined" size={14} color={palette.textSecondary} />
            {plan.subscribers && (
              <Text strong className={styles.subscriberLabel}>
                {plan.subscribers}
              </Text>
            )}
            {subscribersLabel && (
              <Text type="secondary" className={styles.subscriberMeta}>
                {subscribersLabel}
              </Text>
            )}
          </Flex>
        )}

        <Flex vertical gap={8} style={{ flex: 1 }}>
          {summaryItems.map((item) => (
            <Flex key={item.text} align="center" gap={8}>
              <Icon type={item.icon as any} size={14} color={palette.success} />
              <Text className={styles.summaryItem}>
                {item.text}
              </Text>
            </Flex>
          ))}
        </Flex>

        {isMarketingPlan && ctaLabel && ctaHref && (
          <Button
            block
            type={plan.featured ? "primary" : "default"}
            className={styles.editButton}
            href={ctaHref}
            style={plan.featured
              ? { background: palette.primary }
              : { borderColor: palette.track, color: palette.text }
            }
          >
            {ctaLabel}
          </Button>
        )}

        {isAdminPlan && editLabel && onEdit && (
          <Button
            type={plan.highlighted ? "primary" : "default"}
            block
            icon={<Icon type="EditOutlined" />}
            onClick={() => onEdit(plan)}
            className={styles.editButton}
            style={plan.highlighted
              ? { background: palette.primary }
              : { borderColor: palette.track, color: palette.text }
            }
          >
            {editLabel}
          </Button>
        )}
      </Flex>
    </Card>
  )
}

const useStyles = createStyles(({ css }) => ({
  card: css`
    height: 100%;
    border-radius: 16px !important;
    box-shadow: ${designSystem.elevation.card} !important;
    transition: box-shadow 0.2s ease;
  `,
  highlighted: css`
    border: 2px solid ${palette.primary} !important;
  `,
  title: css`
    font-size: 16px !important;
    font-weight: 800 !important;
    color: ${palette.text};
  `,
  price: css`
    font-size: 26px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
  `,
  tag: css`
    margin: 0;
    border: none;
    border-radius: 999px;
    background: ${palette.secondary};
    color: ${palette.primary};
    font-weight: 700;
    font-size: 10px;
    padding: 3px 8px;
  `,
  description: css`
    font-size: 12px;
    line-height: 1.5;
  `,
  subscriberLabel: css`
    font-size: 13px;
    color: ${palette.text};
  `,
  subscriberMeta: css`
    font-size: 12px;
  `,
  summaryItem: css`
    font-size: 12px;
    color: ${palette.textSecondary};
    font-weight: 500;
  `,
  editButton: css`
    height: 36px;
    border-radius: 8px;
    font-weight: 700;
  `,
}))
