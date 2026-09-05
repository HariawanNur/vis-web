"use client"

import React from "react"
import Image from "next/image"
import classNames from "classnames"
import { createStyles } from "antd-style"
import { marketingTokens } from "@/theme"
import { designSystem } from "@/theme/antd-theme"
import { Button } from "./Button"
import { Flex } from "./Flex"
import { Icon, type IconName } from "./Icon"
import { Typography } from "./Typography"

const { Text, Title } = Typography

export interface MarketingHeroAction {
  label: React.ReactNode
  href: string
  icon?: React.ReactNode
  type?: "primary" | "default" | "link" | "text"
}

export interface MarketingHeroHighlight {
  title: React.ReactNode
  description: React.ReactNode
}

export interface MarketingHeroProps {
  className?: string
  containerClassName?: string
  backgroundSrc: string
  backgroundAlt: string
  eyebrow: React.ReactNode
  titlePrefix: React.ReactNode
  titleAccent: React.ReactNode
  titleSuffix: React.ReactNode
  description: React.ReactNode
  primaryAction?: MarketingHeroAction
  secondaryAction?: MarketingHeroAction
  pagerItems?: React.ReactNode[]
  pagerLabel?: string
  highlights?: MarketingHeroHighlight[]
  sloganLines?: [React.ReactNode, React.ReactNode]
  visual?: React.ReactNode
  highlightIcon?: IconName
}

const useStyles = createStyles(({ css, token }) => ({
  hero: css`
    position: relative;
    overflow: hidden;
    min-height: ${marketingTokens.hero.minHeight}px;
    background: #07111f;

    @media (max-width: ${token.screenLG}px) {
      min-height: 860px;
    }

    @media (max-width: ${token.screenSM}px) {
      min-height: 960px;
    }
  `,
  heroBackground: css`
    object-fit: cover;
    object-position: center;
    filter: saturate(0.92) contrast(1.02);
  `,
  heroShade: css`
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7, 17, 31, 0.96) 0%, rgba(7, 17, 31, 0.78) 42%, rgba(7, 17, 31, 0.24) 100%),
      radial-gradient(circle at 78% 20%, rgba(22, 119, 255, 0.22), transparent 28%),
      radial-gradient(circle at 18% 88%, rgba(14, 165, 233, 0.12), transparent 32%);
  `,
  container: css`
    width: min(
      ${marketingTokens.section.maxWidth}px,
      calc(100% - ${marketingTokens.section.desktopPadding * 2}px)
    );
    margin-inline: auto;

    @media (max-width: ${token.screenLG}px) {
      width: calc(100% - ${marketingTokens.section.tabletPadding * 2}px);
    }

    @media (max-width: ${token.screenSM}px) {
      width: calc(100% - ${marketingTokens.section.mobilePadding * 2}px);
    }
  `,
  inner: css`
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
    gap: 40px;
    align-items: center;
    min-height: ${marketingTokens.hero.minHeight}px;
    padding-block: 56px;

    @media (max-width: ${token.screenLG}px) {
      grid-template-columns: 1fr;
      align-items: start;
      min-height: 860px;
      padding-top: 44px;
    }

    @media (max-width: ${token.screenSM}px) {
      min-height: 960px;
      padding-top: 28px;
      padding-bottom: 36px;
    }
  `,
  copy: css`
    max-width: 700px;
    color: #fff;
  `,
  eyebrow: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.88);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
  `,
  title: css`
    margin: 16px 0 18px !important;
    color: #f8fbff !important;
    font-size: ${marketingTokens.hero.titleSize.desktop}px !important;
    line-height: 1.05 !important;
    letter-spacing: -0.04em;
    font-weight: 800 !important;

    @media (max-width: ${token.screenLG}px) {
      font-size: ${marketingTokens.hero.titleSize.tablet}px !important;
      line-height: 1.08 !important;
    }

    @media (max-width: ${token.screenSM}px) {
      font-size: ${marketingTokens.hero.titleSize.mobile}px !important;
      line-height: 1.1 !important;
    }
  `,
  titleAccent: css`
    color: ${designSystem.palette.primary};
  `,
  description: css`
    max-width: 560px;
    color: rgba(226, 232, 240, 0.9);
    font-size: 18px;
    line-height: 1.7;
  `,
  actions: css`
    margin-top: 30px;

    .ant-btn {
      height: 48px;
      padding-inline: 20px;
      font-weight: 700;
    }
  `,
  pager: css`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 34px;
    color: rgba(226, 232, 240, 0.74);
    font-size: 13px;
    letter-spacing: 0.18em;
  `,
  pagerLine: css`
    width: 56px;
    height: 1px;
    background: rgba(255, 255, 255, 0.22);
  `,
  visual: css`
    position: relative;
    width: 100%;
    min-height: 560px;

    @media (max-width: ${token.screenSM}px) {
      display: none;
    }
  `,
  floatingCard: css`
    position: absolute;
    top: 70px;
    right: 22px;
    width: 248px;
    padding: 16px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 18px;
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(14px);
  `,
  floatingItem: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 8px;
    color: #f8fbff;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
  `,
  floatingIcon: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: 0 0 auto;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.16);
    color: #7ef0a8;
  `,
  floatingText: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,
  floatingTitle: css`
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.35;
  `,
  floatingDesc: css`
    display: block;
    color: rgba(226, 232, 240, 0.76);
    font-size: 12px;
    line-height: 1.45;
  `,
  slogan: css`
    position: absolute;
    right: 0;
    bottom: 56px;
    color: #fff;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.08;
    font-weight: 800;
    letter-spacing: -0.04em;
    text-align: right;

    @media (max-width: ${token.screenLG}px) {
      position: relative;
      right: auto;
      bottom: auto;
      margin-top: 24px;
    }
  `,
}))

export const MarketingHero: React.FC<MarketingHeroProps> = ({
  className,
  containerClassName,
  backgroundSrc,
  backgroundAlt,
  eyebrow,
  titlePrefix,
  titleAccent,
  titleSuffix,
  description,
  primaryAction,
  secondaryAction,
  pagerItems,
  pagerLabel,
  highlights,
  sloganLines,
  visual,
  highlightIcon = "CheckCircleOutlined",
}) => {
  const { styles } = useStyles()
  const hasActions = Boolean(primaryAction || secondaryAction)
  const hasPager = Boolean(pagerItems?.length && pagerLabel)
  const hasDefaultVisual = Boolean(visual || highlights?.length || sloganLines)

  return (
    <section className={classNames(styles.hero, className)}>
      <Image src={backgroundSrc} fill priority alt={backgroundAlt} className={styles.heroBackground} />
      <div className={styles.heroShade} />

      <div className={classNames(styles.container, containerClassName)}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <Text className={styles.eyebrow}>{eyebrow}</Text>
            <Title className={styles.title}>
              {titlePrefix}
              <span className={styles.titleAccent}>{titleAccent}</span>
              {titleSuffix}
            </Title>
            <Text className={styles.description}>{description}</Text>
            {hasActions && (
              <Flex className={styles.actions} gap={12} wrap="wrap">
                {primaryAction && (
                  <Button type={primaryAction.type ?? "primary"} size="large" href={primaryAction.href} icon={primaryAction.icon}>
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button type={secondaryAction.type ?? "default"} size="large" href={secondaryAction.href} icon={secondaryAction.icon}>
                    {secondaryAction.label}
                  </Button>
                )}
              </Flex>
            )}
            {hasPager && pagerItems && pagerLabel && (
              <div className={styles.pager} aria-label={pagerLabel}>
                {pagerItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className={styles.pagerLine} />}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {hasDefaultVisual && (
            <div className={styles.visual}>
              {visual ?? (
                <>
                  {highlights && highlights.length > 0 && (
                    <div className={styles.floatingCard}>
                      {highlights.map((item, index) => (
                        <div key={index} className={styles.floatingItem}>
                          <span className={styles.floatingIcon}>
                            <Icon type={highlightIcon} />
                          </span>
                          <span className={styles.floatingText}>
                            <span className={styles.floatingTitle}>{item.title}</span>
                            <span className={styles.floatingDesc}>{item.description}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sloganLines && (
                    <div className={styles.slogan}>
                      {sloganLines[0]}
                      <br />
                      {sloganLines[1]}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MarketingHero
