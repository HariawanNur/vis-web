"use client";

import Image from "next/image";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  MarketingHero,
  Row,
  Typography,
  type IconName,
} from "@/components";
import { useI18n } from "@/i18n";
import { useMarketingData } from "@/lib/use-marketing-data";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;

const missionItems = [
  "marketing.home.about.missionItems.quality",
  "marketing.home.about.missionItems.people",
  "marketing.home.about.missionItems.growth",
  "marketing.home.about.missionItems.trust",
] as const;

const journeyItems = [
  { year: "2023", titleKey: "marketing.home.about.journey.items.2023.title", descriptionKey: "marketing.home.about.journey.items.2023.description" },
  { year: "2024", titleKey: "marketing.home.about.journey.items.2024.title", descriptionKey: "marketing.home.about.journey.items.2024.description" },
  { year: "2025", titleKey: "marketing.home.about.journey.items.2025.title", descriptionKey: "marketing.home.about.journey.items.2025.description" },
  { year: "2026", titleKey: "marketing.home.about.journey.items.2026.title", descriptionKey: "marketing.home.about.journey.items.2026.description" },
  { year: "Masa Depan", titleKey: "marketing.home.about.journey.items.future.title", descriptionKey: "marketing.home.about.journey.items.future.description" },
] as const;

const statIcons: IconName[] = [
  "CalendarOutlined",
  "TeamOutlined",
  "GlobalOutlined",
  "ShopOutlined",
];

const principleIcons: IconName[] = [
  "SafetyCertificateOutlined",
  "BulbOutlined",
  "RocketOutlined",
  "ShakeOutlined",
];

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: #07111f;
  `,
  introBg: css`
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: url(/images/sample/03_cloud_infrastruktur.jpg);
    background-size: cover;
    background-position: center;
    opacity: 0.18;
  `,
  introInner: css`
    position: relative;
    z-index: 2;
    min-height: 380px;
    padding-bottom: 22px;
  `,
  breadcrumb: css`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
  `,
  eyebrow: css`
    display: block;
    margin-top: 16px;
    color: #6fb2ff !important;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  introTitle: css`
    margin: 8px 0 12px !important;
    color: #fff !important;
    font-size: clamp(34px, 4.8vw, 58px) !important;
    line-height: 1.04 !important;
    letter-spacing: -0.05em;
    font-weight: 850 !important;

    span {
      display: block;
    }

    strong {
      color: #67b0ff;
      font-weight: inherit;
    }
  `,
  introSubtitle: css`
    max-width: 600px;
    margin: 0 !important;
    color: #67b0ff !important;
    font-size: 16px !important;
    line-height: 1.6 !important;
    font-weight: 600 !important;
  `,
  introDescription: css`
    max-width: 600px;
    margin: 10px 0 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  introActions: css`
    margin-top: 24px;

    .ant-btn {
      height: 46px;
      padding-inline: 22px;
      font-weight: 700;
    }
  `,
  introPanel: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(420px, 40vw);
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 22px 0 0 0;
    background: linear-gradient(180deg, rgba(22, 119, 255, 0.12) 0%, rgba(22, 119, 255, 0.04) 100%);
    border: 1px solid rgba(103, 176, 255, 0.18);
    border-right: none;
    border-bottom: none;
    padding: 28px;
    overflow: hidden;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      width: 100%;
      min-height: 280px;
      margin-top: 26px;
      border-radius: 18px;
      border-right: 1px solid rgba(103, 176, 255, 0.18);
      border-bottom: 1px solid rgba(103, 176, 255, 0.18);
    }
  `,
  panelGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 80% 20%, rgba(22, 119, 255, 0.14), transparent 40%),
      radial-gradient(circle at 20% 80%, rgba(103, 176, 255, 0.08), transparent 36%);
  `,
  panelContent: css`
    position: relative;
    z-index: 1;
  `,
  panelText: css`
    display: block;
    color: rgba(255, 255, 255, 0.92);
    font-size: clamp(28px, 3.2vw, 40px);
    font-weight: 850;
    line-height: 1.15;
    letter-spacing: -0.04em;
  `,
  panelTitle: css`
    display: block;
    margin-top: 16px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    line-height: 1.5;
  `,
  panelBadge: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(22, 119, 255, 0.2);
    border: 1px solid rgba(22, 119, 255, 0.3);
    color: #6fb2ff;
    font-size: 12px;
    font-weight: 700;
  `,
  statsBar: css`
    margin-top: 20px;
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    background: #fff;
    box-shadow: 0 12px 30px rgba(6, 23, 45, 0.08);
  `,
  statItem: css`
    position: relative;
    min-height: 86px;
    padding: 20px 18px;
    text-align: center;

    &::after {
      content: "";
      position: absolute;
      top: 18px;
      bottom: 18px;
      right: 0;
      width: 1px;
      background: #e8edf5;
    }

    &:last-child::after {
      display: none;
    }
  `,
  statIcon: css`
    display: grid;
    width: 42px;
    height: 42px;
    margin: 0 auto 8px;
    place-items: center;
    border-radius: 13px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 20px;
  `,
  statValue: css`
    display: block;
    color: #1e66d4;
    font-size: 26px;
    line-height: 1.1;
    font-weight: 850;
  `,
  statLabel: css`
    display: block;
    margin-top: 3px;
    color: #3f5373;
    font-size: 13px;
  `,
  section: css`
    padding-block: 72px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  sectionLabel: css`
    display: block;
    color: #1e66d4;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  sectionTitle: css`
    margin: 8px 0 8px !important;
    color: #0b1532 !important;
    font-size: clamp(28px, 3.2vw, 42px) !important;
    line-height: 1.08 !important;
    letter-spacing: -0.045em;
    font-weight: 850 !important;
  `,
  sectionDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  visionGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  visionCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);

    :global(.ant-card-body) {
      padding: 28px !important;
      height: 100%;
    }
  `,
  visionCardIcon: css`
    display: grid;
    width: 56px;
    height: 56px;
    place-items: center;
    border-radius: 16px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 28px;
  `,
  visionCardTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 18px !important;
    font-weight: 800 !important;
  `,
  visionCardDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 14px !important;
    line-height: 1.75 !important;
  `,
  missionLabel: css`
    display: block;
    margin-bottom: 8px;
    color: #1e66d4;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  `,
  missionItem: css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #f0f3f8;
    }
  `,
  missionCheck: css`
    flex-shrink: 0;
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    border-radius: 50%;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 12px;
    margin-top: 2px;
  `,
  missionText: css`
    color: #37506f;
    font-size: 14px;
    line-height: 1.6;
  `,
  principleCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
      box-shadow: 0 12px 32px rgba(12, 24, 48, 0.08);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 24px !important;
      height: 100%;
    }
  `,
  principleIcon: css`
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border-radius: 16px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 26px;
  `,
  principleTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  principleDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  `,
  timelineSection: css`
    background: #f7f9fc;
  `,
  timelineTrack: css`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 48px;

    &::before {
      content: "";
      position: absolute;
      top: 18px;
      left: 40px;
      right: 40px;
      height: 3px;
      background: linear-gradient(90deg, #d0dbed, #1e66d4, #d0dbed);
      border-radius: 999px;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      flex-direction: column;
      gap: 24px;
      padding: 0;

      &::before {
        display: none;
      }
    }
  `,
  timelineItem: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    min-width: 0;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      flex-direction: row;
      text-align: left;
      gap: 16px;
    }
  `,
  timelineDot: css`
    position: relative;
    z-index: 2;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid #1e66d4;
    display: grid;
    place-items: center;
    box-shadow: 0 4px 12px rgba(30, 102, 212, 0.2);
    flex-shrink: 0;
  `,
  timelineDotInner: css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #1e66d4;
  `,
  timelineDotFuture: css`
    border-color: #b0c8f0;
    background: #f0f5ff;

    .timelineDotInner {
      background: #b0c8f0;
    }
  `,
  timelineYear: css`
    display: block;
    margin-top: 14px;
    color: #1e66d4;
    font-size: 16px;
    font-weight: 800;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      margin-top: 0;
    }
  `,
  timelineTitle: css`
    display: block;
    margin-top: 4px;
    color: #0b1532;
    font-size: 13px;
    font-weight: 700;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      margin-top: 2px;
    }
  `,
  timelineDescription: css`
    display: block;
    margin-top: 4px;
    color: #597091;
    font-size: 12px;
    line-height: 1.5;
    max-width: 180px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      margin-top: 2px;
    }
  `,
  cta: css`
    padding-block: 0 70px;
  `,
  ctaCard: css`
    overflow: hidden;
    border: 0;
    border-radius: 22px;
    background: linear-gradient(135deg, #0b2f68 0%, #113f89 56%, #0a234d 100%);
    box-shadow: 0 26px 60px rgba(7, 20, 44, 0.18);
  `,
  ctaInner: css`
    position: relative;
    min-height: 170px;
    padding: 36px 42px;
    color: #fff;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 28px 24px;
    }
  `,
  ctaTitle: css`
    margin: 0 0 8px !important;
    color: #fff !important;
    font-size: clamp(24px, 3vw, 38px) !important;
    line-height: 1.12 !important;
    font-weight: 850 !important;
  `,
  ctaDescription: css`
    max-width: 650px;
    color: rgba(232, 240, 255, 0.88);
    font-size: 15px;
    line-height: 1.75;
  `,
  ctaActions: css`
    margin-top: 22px;
  `,
  ctaGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 82% 20%, rgba(255, 255, 255, 0.16), transparent 18%),
      radial-gradient(circle at 20% 90%, rgba(255, 255, 255, 0.08), transparent 22%);
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { t, locale } = useI18n();
  const { data } = useMarketingData(locale);

  const aboutStats = data?.about?.stats ?? [];
  const aboutValues = data?.about?.values ?? [];

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt={t("app.description")}
        eyebrow={t("marketing.home.about.kicker")}
        titlePrefix={<span>{t("marketing.home.about.title")}</span>}
        titleAccent={null}
        titleSuffix={null}
        description={<>{t("marketing.home.about.subtitle")}<br />{t("marketing.home.about.description")}</>}
        primaryAction={{ label: t("marketing.home.about.action"), href: "/kontak", icon: <Icon type="ArrowRightOutlined" /> }}
        visual={<div className={styles.introPanel}><div className={styles.panelGlow} /><div className={styles.panelContent}><span className={styles.panelText}>{t("marketing.home.sloganLine1")}<br />{t("marketing.home.sloganLine2")}</span><span className={styles.panelTitle}>{t("marketing.home.about.panelTitle")}</span><span className={styles.panelBadge}><Icon type="StarOutlined" />{t("marketing.home.about.storyBadgeTitle")}</span></div></div>}
      />

      <div className={styles.statsBar}>
        <MarketingContainer>
          <Row gutter={[0, 0]}>
            {aboutStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={stat.id} className={styles.statItem}>
                <span className={styles.statIcon}>
                  <Icon type={statIcons[index] ?? "NumberOutlined"} />
                </span>
                <Text className={styles.statValue}>{stat.value}</Text>
                <Text className={styles.statLabel}>{t(stat.labelKey)}</Text>
              </Col>
            ))}
          </Row>
        </MarketingContainer>
      </div>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>{t("marketing.home.about.visionLabel")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.home.about.visionTitle")}
        </Title>
        <Paragraph className={styles.sectionDescription}>
          {t("marketing.home.about.visionDescription")}
        </Paragraph>

        <div className={styles.visionGrid} style={{ marginTop: 32 }}>
          <Card className={styles.visionCard}>
            <Flex vertical gap={16}>
              <Text className={styles.visionCardDescription} style={{ color: "#0b1532", fontWeight: 600 }}>
                {t("marketing.home.about.visionCardDescription")}
              </Text>
            </Flex>
          </Card>

          <Card className={styles.visionCard}>
            <Flex vertical gap={16}>
              <span className={styles.visionCardIcon}>
                <Icon type="EyeOutlined" />
              </span>
              <Title level={3} className={styles.visionCardTitle}>
                {t("marketing.home.about.visionCardTitle")}
              </Title>
              <Paragraph className={styles.visionCardDescription}>
                {t("marketing.home.about.visionCardDescription")}
              </Paragraph>
            </Flex>
          </Card>

          <Card className={styles.visionCard}>
            <Flex vertical gap={16}>
              <Title level={3} className={styles.visionCardTitle}>
                {t("marketing.home.about.missionTitle")}
              </Title>
              <Text className={styles.missionLabel}>{t("marketing.home.about.missionLabel")}</Text>
              {missionItems.map((key) => (
                <div className={styles.missionItem} key={key}>
                  <span className={styles.missionCheck}>
                    <Icon type="CheckOutlined" />
                  </span>
                  <Text className={styles.missionText}>{t(key)}</Text>
                </div>
              ))}
            </Flex>
          </Card>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>{t("marketing.home.about.principlesLabel")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.home.about.principlesTitle")}
        </Title>
        <Paragraph className={styles.sectionDescription}>
          {t("marketing.home.about.principlesDescription")}
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          {aboutValues.map((value, index) => (
            <Col xs={24} sm={12} lg={6} key={value.id}>
              <Card className={styles.principleCard}>
                <Flex vertical gap={14}>
                  <span className={styles.principleIcon}>
                    <Icon type={(value.icon ?? principleIcons[index]) as IconName} />
                  </span>
                  <Title level={3} className={styles.principleTitle}>
                    {t(value.titleKey)}
                  </Title>
                  <Paragraph className={styles.principleDescription}>
                    {t(value.descriptionKey)}
                  </Paragraph>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={`${styles.section} ${styles.timelineSection}`}>
        <Text className={styles.sectionLabel}>{t("marketing.home.about.journeyLabel")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.home.about.journeyTitle")}
        </Title>
        <Paragraph className={styles.sectionDescription}>
          {t("marketing.home.about.journeyDescription")}
        </Paragraph>

        <div className={styles.timelineTrack}>
          {journeyItems.map((item) => {
            const isFuture = item.year === "Masa Depan";
            return (
              <div className={styles.timelineItem} key={item.year}>
                <div className={`${styles.timelineDot} ${isFuture ? styles.timelineDotFuture : ""}`}>
                  <div className={styles.timelineDotInner} />
                </div>
                <div>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <span className={styles.timelineTitle}>{t(item.titleKey)}</span>
                  <span className={styles.timelineDescription}>{t(item.descriptionKey)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </MarketingSection>

      <MarketingSection className={styles.cta}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionLabel} style={{ color: "#9fc5ff" }}>
              {t("marketing.home.about.ctaLabel")}
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              {t("marketing.home.about.ctaTitle")}
            </Title>
            <Paragraph className={styles.ctaDescription}>
              {t("marketing.home.about.ctaDescription")}
            </Paragraph>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" href="/kontak">
                {t("marketing.home.about.ctaAction")} <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/layanan">{t("marketing.home.about.ctaSecondaryAction")}</Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
