"use client";

import Image from "next/image";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Row,
  Typography,
  type IconName,
} from "@/components";
import { useI18n } from "@/i18n";
import { useMarketingData } from "@/lib/use-marketing-data";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

const missionItems = [
  "marketing.home.about.missionItems.quality",
  "marketing.home.about.missionItems.people",
  "marketing.home.about.missionItems.growth",
  "marketing.home.about.missionItems.trust",
] as const;

const journeyItems = [
  {
    year: "2022",
    titleKey: "marketing.home.about.journey.items.2022.title",
    descriptionKey: "marketing.home.about.journey.items.2022.description",
  },
  {
    year: "2023",
    titleKey: "marketing.home.about.journey.items.2023.title",
    descriptionKey: "marketing.home.about.journey.items.2023.description",
  },
  {
    year: "2024",
    titleKey: "marketing.home.about.journey.items.2024.title",
    descriptionKey: "marketing.home.about.journey.items.2024.description",
  },
  {
    year: "2025",
    titleKey: "marketing.home.about.journey.items.2025.title",
    descriptionKey: "marketing.home.about.journey.items.2025.description",
  },
] as const;

const useStyles = createStyles(({ css, token }) => ({
  page: css`
    min-height: 100vh;
    background:
      radial-gradient(circle at top right, rgba(22, 119, 255, 0.08), transparent 28%),
      linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
    color: ${token.colorText};
  `,
  state: css`
    min-height: 52vh;
  `,
  stateText: css`
    color: ${token.colorTextSecondary};
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    min-height: 640px;
    background: #07111f;

    @media (max-width: ${token.screenMD}px) {
      min-height: 760px;
    }
  `,
  heroImage: css`
    object-fit: cover;
    object-position: center;
    filter: saturate(0.92) contrast(1.02);
  `,
  heroShade: css`
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7, 17, 31, 0.94) 0%, rgba(7, 17, 31, 0.78) 44%, rgba(7, 17, 31, 0.2) 100%),
      radial-gradient(circle at 78% 20%, rgba(22, 119, 255, 0.2), transparent 28%);
  `,
  heroInner: css`
    position: relative;
    z-index: 1;
    min-height: 640px;
    padding-block: 56px;

    @media (max-width: ${token.screenMD}px) {
      min-height: 760px;
      padding-top: 42px;
      align-items: flex-start !important;
    }
  `,
  heroCopy: css`
    width: min(640px, 58%);

    @media (max-width: ${token.screenLG}px) {
      width: min(580px, 74%);
    }

    @media (max-width: ${token.screenMD}px) {
      width: 100%;
    }
  `,
  breadcrumb: css`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(226, 232, 240, 0.78);
    font-size: 13px;
  `,
  breadcrumbActive: css`
    color: #fff;
    font-weight: 700;
  `,
  eyebrow: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;
    padding: 7px 14px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.92);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  heroTitle: css`
    margin: 14px 0 12px !important;
    color: #f8fbff !important;
    font-size: clamp(40px, 5vw, 62px) !important;
    line-height: 1.05 !important;
    letter-spacing: -0.05em;
    font-weight: 800 !important;
  `,
  heroTitleAccent: css`
    display: block;
    color: #67a8ff;
  `,
  heroDescription: css`
    max-width: 560px;
    color: rgba(226, 232, 240, 0.92);
    font-size: 18px;
    line-height: 1.72;
  `,
  heroActions: css`
    margin-top: 28px;

    .ant-btn {
      height: 48px;
      padding-inline: 20px;
      font-weight: 700;
    }
  `,
  heroMeta: css`
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  `,
  metaChip: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.92);
    font-size: 12px;
  `,
  heroVisual: css`
    position: relative;
    width: min(390px, 34%);
    min-height: 460px;

    @media (max-width: ${token.screenLG}px) {
      display: none;
    }
  `,
  heroVisualCard: css`
    position: absolute;
    inset: 0;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 24px 54px rgba(4, 12, 24, 0.26);
  `,
  heroVisualImage: css`
    object-fit: cover;
    object-position: center;
  `,
  heroVisualOverlay: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 20%, rgba(7, 17, 31, 0.82) 100%);
  `,
  heroVisualBadge: css`
    position: absolute;
    right: 18px;
    bottom: 20px;
    max-width: 170px;
    padding: 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    background: rgba(15, 23, 42, 0.58);
    color: #fff;
    backdrop-filter: blur(14px);
  `,
  heroVisualBadgeTitle: css`
    display: block;
    font-size: 14px;
    font-weight: 700;
  `,
  heroVisualBadgeText: css`
    display: block;
    margin-top: 2px;
    color: rgba(226, 232, 240, 0.84);
    font-size: 12px;
    line-height: 1.5;
  `,
  sectionPad: css`
    padding-block: 84px;

    @media (max-width: ${token.screenMD}px) {
      padding-block: 64px;
    }
  `,
  sectionHeader: css`
    max-width: 760px;
    margin-bottom: 30px;
  `,
  sectionKicker: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${token.colorPrimary};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  sectionTitle: css`
    margin: 8px 0 10px !important;
    color: ${token.colorText} !important;
    font-size: clamp(28px, 3vw, 42px) !important;
    line-height: 1.1 !important;
    font-weight: 800 !important;
    letter-spacing: -0.04em;
  `,
  sectionDescription: css`
    color: ${token.colorTextSecondary};
    font-size: 16px;
    line-height: 1.76;
  `,
  storyGrid: css`
    align-items: stretch;
  `,
  storyCard: css`
    height: 100%;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 28px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadowSecondary};
  `,
  storyCopy: css`
    padding: 32px;

    @media (max-width: ${token.screenSM}px) {
      padding: 24px;
    }
  `,
  quoteCard: css`
    margin-top: 20px;
    padding: 18px 20px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(22, 119, 255, 0.08), rgba(96, 165, 250, 0.05));
  `,
  quoteMark: css`
    color: ${token.colorPrimary};
    font-size: 30px;
    line-height: 1;
  `,
  quoteText: css`
    color: ${token.colorText};
    font-size: 14px;
    line-height: 1.75;
    font-weight: 700;
  `,
  quoteAuthor: css`
    display: block;
    margin-top: 6px;
    color: ${token.colorTextSecondary};
    font-size: 12px;
  `,
  storyImageWrap: css`
    position: relative;
    min-height: 420px;

    @media (max-width: ${token.screenMD}px) {
      min-height: 320px;
    }
  `,
  storyImage: css`
    object-fit: cover;
    object-position: center;
  `,
  storyImageOverlay: css`
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, transparent 42%, rgba(7, 17, 31, 0.76) 100%),
      radial-gradient(circle at 82% 20%, rgba(255, 255, 255, 0.14), transparent 24%);
  `,
  storyBadge: css`
    position: absolute;
    right: 18px;
    bottom: 18px;
    max-width: 220px;
    padding: 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    background: rgba(15, 23, 42, 0.54);
    color: #fff;
    backdrop-filter: blur(14px);
  `,
  storyBadgeTitle: css`
    display: block;
    font-size: 14px;
    font-weight: 700;
  `,
  storyBadgeText: css`
    display: block;
    margin-top: 2px;
    color: rgba(226, 232, 240, 0.84);
    font-size: 12px;
    line-height: 1.5;
  `,
  statsStrip: css`
    margin-top: 20px;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 22px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadow};
  `,
  statItem: css`
    position: relative;
    padding: 24px 18px;
    text-align: center;

    &::after {
      content: "";
      position: absolute;
      top: 22px;
      bottom: 22px;
      right: 0;
      width: 1px;
      background: ${token.colorBorderSecondary};
    }

    &:last-child::after {
      display: none;
    }

    @media (max-width: ${token.screenMD}px) {
      &::after {
        top: auto;
        left: 20px;
        right: 20px;
        bottom: 0;
        width: auto;
        height: 1px;
      }
    }
  `,
  statValue: css`
    display: block;
    color: ${token.colorPrimary};
    font-size: 28px;
    line-height: 1.1;
    font-weight: 800;
  `,
  statLabel: css`
    display: block;
    margin-top: 8px;
    color: ${token.colorTextSecondary};
    font-size: 13px;
  `,
  panelCard: css`
    height: 100%;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 26px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadowSecondary};
  `,
  panelCopy: css`
    padding: 30px;

    @media (max-width: ${token.screenSM}px) {
      padding: 24px;
    }
  `,
  panelTitle: css`
    margin: 0 0 10px !important;
    color: ${token.colorText} !important;
    font-size: 28px !important;
    line-height: 1.1 !important;
    font-weight: 800 !important;
    letter-spacing: -0.03em;
  `,
  panelDescription: css`
    color: ${token.colorTextSecondary};
    font-size: 15px;
    line-height: 1.75;
  `,
  missionList: css`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  missionItem: css`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 0;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,
  missionIcon: css`
    flex: 0 0 auto;
    margin-top: 2px;
    color: ${token.colorPrimary};
    font-size: 18px;
  `,
  valueCard: css`
    height: 100%;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 22px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadow};

    :global(.ant-card-body) {
      padding: 24px !important;
    }
  `,
  valueIcon: css`
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    margin-bottom: 14px;
    border-radius: 16px;
    background: rgba(22, 119, 255, 0.08);
    color: ${token.colorPrimary};
    font-size: 24px;
  `,
  valueName: css`
    display: block;
    margin-bottom: 8px;
    color: ${token.colorText};
    font-size: 16px;
    font-weight: 800;
  `,
  valueDescription: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
    line-height: 1.72;
  `,
  timelineWrap: css`
    position: relative;
    margin-top: 8px;
  `,
  timelineTrack: css`
    position: absolute;
    top: 28px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: ${token.colorBorderSecondary};

    @media (max-width: ${token.screenMD}px) {
      display: none;
    }
  `,
  timelineGrid: css`
    position: relative;
    z-index: 1;
  `,
  timelineCard: css`
    height: 100%;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 22px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadow};
  `,
  timelineInner: css`
    padding: 22px 20px;
  `,
  timelineDot: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-bottom: 14px;
    border-radius: 999px;
    background: rgba(22, 119, 255, 0.1);
    color: ${token.colorPrimary};
    font-size: 11px;
    font-weight: 800;
  `,
  timelineYear: css`
    display: block;
    color: ${token.colorPrimary};
    font-size: 15px;
    font-weight: 800;
  `,
  timelineTitle: css`
    display: block;
    margin-top: 8px;
    color: ${token.colorText};
    font-size: 15px;
    font-weight: 800;
  `,
  timelineDescription: css`
    display: block;
    margin-top: 8px;
    color: ${token.colorTextSecondary};
    font-size: 13px;
    line-height: 1.7;
  `,
  cta: css`
    padding-block: 40px;
  `,
  ctaCard: css`
    overflow: hidden;
    border: 0;
    border-radius: 28px;
    background: linear-gradient(135deg, #08172b 0%, #0a2f6e 48%, #1677ff 100%);
    box-shadow: 0 24px 60px rgba(7, 17, 31, 0.18);
  `,
  ctaInner: css`
    position: relative;
    padding: 34px 38px;
    color: #fff;

    @media (max-width: ${token.screenSM}px) {
      padding: 28px 22px;
    }
  `,
  ctaTitle: css`
    margin: 0 0 10px !important;
    color: #fff !important;
    font-size: clamp(26px, 3vw, 40px) !important;
    line-height: 1.12 !important;
    font-weight: 800 !important;
  `,
  ctaDescription: css`
    max-width: 760px;
    color: rgba(226, 232, 240, 0.9);
    font-size: 15px;
    line-height: 1.75;
  `,
  ctaActions: css`
    margin-top: 22px;

    .ant-btn {
      height: 44px;
      font-weight: 700;
    }
  `,
  ctaGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 86% 18%, rgba(255, 255, 255, 0.16), transparent 18%),
      radial-gradient(circle at 16% 84%, rgba(255, 255, 255, 0.1), transparent 24%);
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { locale, t } = useI18n();
  const { data, error, loading, refetch } = useMarketingData(locale);

  if (loading) {
    return (
      <main className={styles.page}>
        <MarketingSection>
          <Flex className={styles.state} vertical align="center" justify="center" gap={16} role="status">
            <Icon type="LoadingOutlined" spin />
            <Text className={styles.stateText}>{t("status.loading")}</Text>
          </Flex>
        </MarketingSection>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className={styles.page}>
        <MarketingSection>
          <Flex className={styles.state} vertical align="center" justify="center" gap={18} role="alert">
            <Icon type="ExclamationCircleOutlined" />
            <Text className={styles.stateText}>{t("status.error")}</Text>
            <Button type="primary" onClick={refetch}>
              {t("status.retry")}
            </Button>
          </Flex>
        </MarketingSection>
      </main>
    );
  }

  const { about } = data;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/ilustrations/Vistara_Office_Reception_2.png"
          alt={t("marketing.home.about.imageAlt")}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <MarketingContainer>
          <Flex className={styles.heroInner} align="center" justify="space-between" gap={40}>
            <div className={styles.heroCopy}>
              <div className={styles.breadcrumb}>
                <span>{t("nav.home")}</span>
                <span>•</span>
                <span className={styles.breadcrumbActive}>{t("nav.about")}</span>
              </div>
              <Text className={styles.eyebrow}>{t("marketing.home.about.kicker")}</Text>
              <Title level={1} className={styles.heroTitle}>
                <span>{t("marketing.home.about.title")}</span>
                <span className={styles.heroTitleAccent}>{t("marketing.home.about.subtitle")}</span>
              </Title>
              <Text className={styles.heroDescription}>{t("marketing.home.about.description")}</Text>
              <Flex className={styles.heroActions} gap={12} wrap="wrap">
                <Button type="primary" href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
                  {t("marketing.home.about.action")}
                </Button>
                <Button href="/fitur" icon={<Icon type="EyeOutlined" />}>
                  {t("marketing.home.services.link")}
                </Button>
              </Flex>
              <div className={styles.heroMeta}>
                <span className={styles.metaChip}><Icon type="SafetyCertificateOutlined" /> {t("marketing.home.about.panelLabel")}</span>
                <span className={styles.metaChip}><Icon type="TeamOutlined" /> {t("marketing.home.about.panelTitle")}</span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualCard}>
                <Image
                  src="/images/ilustrations/Vistara_Office_Reception_1.png"
                  alt={t("marketing.home.about.imageAlt")}
                  fill
                  priority
                  className={styles.heroVisualImage}
                />
                <div className={styles.heroVisualOverlay} />
                <div className={styles.heroVisualBadge}>
                  <Text className={styles.heroVisualBadgeTitle}>{t("marketing.home.about.panelTitle")}</Text>
                  <Text className={styles.heroVisualBadgeText}>{t("marketing.home.about.panelLabel")}</Text>
                </div>
              </div>
            </div>
          </Flex>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.sectionPad}>
        <Row className={styles.storyGrid} gutter={[24, 24]} align="stretch">
          <Col xs={24} lg={12}>
            <Card className={styles.storyCard}>
              <div className={styles.storyCopy}>
                <Text className={styles.sectionKicker}>{t("marketing.home.about.storyLabel")}</Text>
                <Title level={2} className={styles.sectionTitle}>{t("marketing.home.about.storyTitle")}</Title>
                <Text className={styles.sectionDescription}>{t("marketing.home.about.storyDescription")}</Text>
                <div className={styles.quoteCard}>
                  <Flex align="flex-start" gap={12}>
                    <Icon className={styles.quoteMark} type="MessageOutlined" />
                    <span>
                      <Text className={styles.quoteText}>{t("marketing.home.about.storyQuote")}</Text>
                      <Text className={styles.quoteAuthor}>{t("marketing.home.about.storyQuoteAuthor")}</Text>
                    </span>
                  </Flex>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className={styles.storyCard}>
              <div className={styles.storyImageWrap}>
                <Image
                  src="/images/ilustrations/Coding_Workspace.png"
                  alt={t("marketing.home.about.storyImageAlt")}
                  fill
                  className={styles.storyImage}
                />
                <div className={styles.storyImageOverlay} />
                <div className={styles.storyBadge}>
                  <Text className={styles.storyBadgeTitle}>{t("marketing.home.about.storyBadgeTitle")}</Text>
                  <Text className={styles.storyBadgeText}>{t("marketing.home.about.storyBadgeText")}</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Card className={styles.statsStrip}>
          <Row gutter={[0, 0]}>
            {about.stats.map((stat) => (
              <Col xs={24} sm={12} md={6} key={stat.id}>
                <div className={styles.statItem}>
                  <Text className={styles.statValue}>{stat.value}</Text>
                <Text className={styles.statLabel}>{t(stat.labelKey)}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </MarketingSection>

      <MarketingSection className={styles.sectionPad}>
        <Row gutter={[24, 24]} align="stretch">
          <Col xs={24} lg={10}>
            <Card className={styles.panelCard}>
              <div className={styles.panelCopy}>
                <Text className={styles.sectionKicker}>{t("marketing.home.about.visionLabel")}</Text>
                <Title level={2} className={styles.sectionTitle}>{t("marketing.home.about.visionTitle")}</Title>
                <Text className={styles.panelDescription}>{t("marketing.home.about.visionDescription")}</Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={14}>
            <Card className={styles.panelCard}>
              <div className={styles.panelCopy}>
                <Text className={styles.sectionKicker}>{t("marketing.home.about.missionLabel")}</Text>
                <Title level={2} className={styles.panelTitle}>{t("marketing.home.about.missionTitle")}</Title>
                <div className={styles.missionList}>
                  {missionItems.map((item) => (
                    <div className={styles.missionItem} key={item}>
                      <Icon className={styles.missionIcon} type="CheckCircleFilled" />
                      <Text className={styles.panelDescription}>{t(item)}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.sectionPad}>
        <Flex className={styles.sectionHeader} vertical>
          <Text className={styles.sectionKicker}>{t("marketing.home.about.principlesLabel")}</Text>
          <Title level={2} className={styles.sectionTitle}>{t("marketing.home.about.principlesTitle")}</Title>
          <Text className={styles.sectionDescription}>{t("marketing.home.about.principlesDescription")}</Text>
        </Flex>

        <Row gutter={[18, 18]}>
          {about.values.map((value) => (
            <Col xs={24} sm={12} lg={6} key={value.id}>
              <Card className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Icon type={value.icon as IconName} />
                </div>
                <Text className={styles.valueName}>{t(value.titleKey)}</Text>
                <Text className={styles.valueDescription}>{t(value.descriptionKey)}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.sectionPad}>
        <Flex className={styles.sectionHeader} vertical>
          <Text className={styles.sectionKicker}>{t("marketing.home.about.journeyLabel")}</Text>
          <Title level={2} className={styles.sectionTitle}>{t("marketing.home.about.journeyTitle")}</Title>
          <Text className={styles.sectionDescription}>{t("marketing.home.about.journeyDescription")}</Text>
        </Flex>

        <div className={styles.timelineWrap}>
          <div className={styles.timelineTrack} />
          <Row className={styles.timelineGrid} gutter={[18, 18]}>
            {journeyItems.map((item) => (
              <Col xs={24} sm={12} lg={6} key={item.year}>
                <Card className={styles.timelineCard}>
                  <div className={styles.timelineInner}>
                    <span className={styles.timelineDot}>{item.year}</span>
                    <Text className={styles.timelineYear}>{item.year}</Text>
                    <Text className={styles.timelineTitle}>{t(item.titleKey)}</Text>
                    <Text className={styles.timelineDescription}>{t(item.descriptionKey)}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.cta}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionKicker}>{t("marketing.home.about.ctaLabel")}</Text>
            <Title level={2} className={styles.ctaTitle}>{t("marketing.home.about.ctaTitle")}</Title>
            <Text className={styles.ctaDescription}>{t("marketing.home.about.ctaDescription")}</Text>
            <Flex className={styles.ctaActions} gap={12} wrap="wrap">
              <Button type="primary" href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
                {t("marketing.home.about.ctaAction")}
              </Button>
              <Button href="/fitur" icon={<Icon type="ArrowRightOutlined" />}>
                {t("marketing.home.about.ctaSecondaryAction")}
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
