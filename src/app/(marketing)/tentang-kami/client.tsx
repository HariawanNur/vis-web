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

const useStyles = createStyles(({ css }) => ({
  page: css`
    min-height: calc(100vh - 80px);
    overflow: hidden;
    color: #11152f;
    background: #fff;
  `,
  hero: css`
    position: relative;
    min-height: 430px;
    overflow: hidden;
    background: #faf9fe;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 560px;
    }
  `,
  heroImage: css`
    object-fit: cover;
    object-position: 74% center;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      object-position: 62% center;
    }
  `,
  heroShade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #fff 0%,
      rgba(255, 255, 255, 0.98) 38%,
      rgba(255, 255, 255, 0.68) 55%,
      rgba(255, 255, 255, 0.04) 76%
    );

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      background: linear-gradient(
        180deg,
        #fff 0%,
        rgba(255, 255, 255, 0.96) 56%,
        rgba(255, 255, 255, 0.2) 82%
      );
    }
  `,
  heroInner: css`
    position: relative;
    z-index: 1;
    min-height: 430px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 560px;
      align-items: flex-start !important;
      padding-top: 52px;
    }
  `,
  heroCopy: css`
    width: min(620px, 62%);

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      width: min(560px, 72%);
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      width: 100%;
    }
  `,
  eyebrow: css`
    display: inline-block;
    padding: 5px 12px;
    border-radius: 999px;
    color: #6e2db8;
    background: #f1e9fc;
    font-size: 12px;
    font-weight: 800;
  `,
  headline: css`
    max-width: 610px;
    margin: 18px 0 14px !important;
    color: #11152f !important;
    font-size: clamp(36px, 4vw, 54px) !important;
    font-weight: 850 !important;
    line-height: 1.1 !important;
    letter-spacing: -1.6px;
  `,
  heroDescription: css`
    display: block;
    max-width: 570px;
    color: #35405e;
    font-size: 15px;
    line-height: 1.75;
  `,
  heroButton: css`
    height: 43px !important;
    margin-top: 24px;
    padding-inline: 20px !important;
    border: 0 !important;
    background: linear-gradient(135deg, #7735c7, #5d20ad) !important;
    box-shadow: 0 8px 18px rgba(102, 39, 177, 0.2) !important;
  `,
  brandPanel: css`
    min-width: 270px;
    padding: 22px 24px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 12px;
    color: #fff;
    background: linear-gradient(
      135deg,
      rgba(70, 20, 102, 0.94),
      rgba(83, 29, 112, 0.82)
    );
    box-shadow: 0 16px 35px rgba(39, 18, 55, 0.2);

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      display: none !important;
    }
  `,
  brandName: css`
    display: block;
    color: #fff;
    font-size: 19px;
    font-weight: 800;
  `,
  brandTagline: css`
    display: block;
    margin-top: 4px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 12px;
  `,
  content: css`
    position: relative;
    padding-top: 78px !important;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-top: 40px !important;
    }
  `,
  statsCard: css`
    position: absolute !important;
    z-index: 2;
    top: -50px;
    right: 0;
    left: 0;
    border: 1px solid #ecebf3 !important;
    border-radius: 14px !important;
    box-shadow: 0 8px 25px rgba(38, 31, 62, 0.08) !important;

    :global(.ant-card-body) {
      padding: 0 !important;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      position: static !important;
      margin-bottom: 44px;
    }
  `,
  stat: css`
    position: relative;
    min-height: 98px;
    padding: 20px;
    text-align: center;

    &::after {
      position: absolute;
      top: 22px;
      right: 0;
      bottom: 22px;
      width: 1px;
      background: #e8e6ef;
      content: "";
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      &::after {
        top: auto;
        right: 20px;
        bottom: 0;
        left: 20px;
        width: auto;
        height: 1px;
      }
    }
  `,
  statValue: css`
    display: block;
    color: #6d2ebb;
    font-size: 24px;
    font-weight: 850;
    line-height: 1.1;
  `,
  statLabel: css`
    display: block;
    margin-top: 8px;
    color: #34405d;
    font-size: 12px;
  `,
  sectionHeading: css`
    max-width: 680px;
    margin: 0 auto 28px;
    text-align: center;
  `,
  sectionTitle: css`
    margin: 0 0 9px !important;
    color: #11152f !important;
    font-size: clamp(24px, 2.7vw, 34px) !important;
    font-weight: 850 !important;
  `,
  sectionDescription: css`
    color: #59617b;
    font-size: 14px;
    line-height: 1.7;
  `,
  valueCard: css`
    height: 100%;
    min-height: 210px;
    border: 1px solid #e8e7ef !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    text-align: center;

    :global(.ant-card-body) {
      height: 100%;
      padding: 25px 20px !important;
    }
  `,
  valueIcon: css`
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    margin: 0 auto 14px;
    border-radius: 50%;
    color: #7732c2;
    background: linear-gradient(145deg, #f6f1ff, #eee4ff);
    font-size: 26px;
  `,
  valueName: css`
    display: block;
    margin-bottom: 8px;
    color: #11152f;
    font-size: 15px;
    font-weight: 800;
  `,
  valueDescription: css`
    display: block;
    color: #3f4965;
    font-size: 12px;
    line-height: 1.7;
  `,
  lowerSection: css`
    padding-top: 12px !important;
  `,
  teamCard: css`
    height: 100%;
    min-height: 280px;
    overflow: hidden;
    border: 1px solid #e9e7ef !important;
    border-radius: 12px !important;
    box-shadow: none !important;

    :global(.ant-card-body) {
      height: 100%;
      padding: 0 !important;
    }
  `,
  teamCopy: css`
    padding: 32px;

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      padding: 26px 22px;
    }
  `,
  teamTitle: css`
    margin: 0 0 12px !important;
    color: #6d2db7 !important;
    font-size: 23px !important;
    font-weight: 800 !important;
  `,
  teamDescription: css`
    color: #3d4864;
    font-size: 13px;
    line-height: 1.75;
  `,
  teamPhoto: css`
    position: relative;
    min-height: 280px;
    overflow: hidden;
  `,
  teamImage: css`
    object-fit: cover;
    object-position: center 36%;
  `,
  purposeCard: css`
    height: 100%;
    min-height: 280px;
    border: 0 !important;
    border-radius: 12px !important;
    background: linear-gradient(135deg, #fbf9ff, #f6f1ff) !important;
    box-shadow: none !important;

    :global(.ant-card-body) {
      height: 100%;
      padding: 28px !important;
    }
  `,
  purposeItem: css`
    padding-block: 18px;

    & + & {
      border-top: 1px solid #ddd8e8;
    }
  `,
  purposeIcon: css`
    display: grid;
    flex: 0 0 46px;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    color: #7834c4;
    background: #fff;
    box-shadow: 0 6px 15px rgba(101, 43, 164, 0.08);
    font-size: 23px;
  `,
  state: css`
    min-height: 420px;
    padding: 48px 20px;
    text-align: center;
  `,
  stateText: css`
    color: #59617b;
    font-size: 15px;
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
          <Flex
            className={styles.state}
            vertical
            align="center"
            justify="center"
            gap={16}
            role="status"
          >
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
          <Flex
            className={styles.state}
            vertical
            align="center"
            justify="center"
            gap={18}
            role="alert"
          >
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
          src="/images/ilustrations/Salon_Interior.png"
          alt={t("marketing.about.title")}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <MarketingContainer>
          <Flex
            className={styles.heroInner}
            align="center"
            justify="space-between"
            gap={48}
          >
            <div className={styles.heroCopy}>
              <Text className={styles.eyebrow}>
                {t("marketing.about.eyebrow")}
              </Text>
              <Title level={1} className={styles.headline}>
                {t("marketing.about.title")}
              </Title>
              <Text className={styles.heroDescription}>
                {t("marketing.about.description")}
              </Text>
              <Button
                type="primary"
                href="/kontak"
                icon={<Icon type="CalendarOutlined" />}
                className={styles.heroButton}
              >
                {t("common.bookDemo")}
              </Button>
            </div>
            <Flex className={styles.brandPanel} align="center" gap={14}>
              <Image
                src="/images/logo.webp"
                alt={t("app.logoAlt")}
                width={58}
                height={58}
              />
              <div>
                <Text className={styles.brandName}>{t("app.brand")}</Text>
                <Text className={styles.brandTagline}>{t("app.tagline")}</Text>
              </div>
            </Flex>
          </Flex>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.content}>
        <Card className={styles.statsCard}>
          <Row>
            {about.stats.map((stat) => (
              <Col xs={24} sm={12} md={6} key={stat.id}>
                <Flex
                  className={styles.stat}
                  vertical
                  align="center"
                  justify="center"
                >
                  <Text className={styles.statValue}>{stat.value}</Text>
                  <Text className={styles.statLabel}>{t(stat.labelKey)}</Text>
                </Flex>
              </Col>
            ))}
          </Row>
        </Card>

        <Flex className={styles.sectionHeading} vertical align="center">
          <Title level={2} className={styles.sectionTitle}>
            {t("marketing.about.eyebrow")}
          </Title>
          <Text className={styles.sectionDescription}>
            {t("marketing.about.description")}
          </Text>
        </Flex>
        <Row gutter={[18, 18]}>
          {about.values.map((value) => (
            <Col xs={24} sm={12} lg={6} key={value.id}>
              <Card className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Icon type={value.icon as IconName} />
                </div>
                <Text className={styles.valueName}>{t(value.titleKey)}</Text>
                <Text className={styles.valueDescription}>
                  {t(value.descriptionKey)}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.lowerSection}>
        <Row gutter={[20, 20]} align="stretch">
          <Col xs={24} lg={15}>
            <Card className={styles.teamCard}>
              <Row align="stretch">
                <Col xs={24} sm={11}>
                  <Flex
                    className={styles.teamCopy}
                    vertical
                    align="flex-start"
                    justify="center"
                  >
                    <Title level={3} className={styles.teamTitle}>
                      {t("marketing.about.title")}
                    </Title>
                    <Text className={styles.teamDescription}>
                      {t("marketing.about.description")}
                    </Text>
                    <Button
                      href="/kontak"
                      icon={<Icon type="TeamOutlined" />}
                      className={styles.heroButton}
                    >
                      {t("common.contactSales")}
                    </Button>
                  </Flex>
                </Col>
                <Col xs={24} sm={13}>
                  <div className={styles.teamPhoto}>
                    <Image
                      src="/images/ilustrations/Office_Call.png"
                      alt={t("marketing.about.title")}
                      fill
                      className={styles.teamImage}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} lg={9}>
            <Card className={styles.purposeCard}>
              {about.values.slice(0, 2).map((value) => (
                <Flex
                  className={styles.purposeItem}
                  align="flex-start"
                  gap={16}
                  key={value.id}
                >
                  <div className={styles.purposeIcon}>
                    <Icon type={value.icon as IconName} />
                  </div>
                  <div>
                    <Text className={styles.valueName}>
                      {t(value.titleKey)}
                    </Text>
                    <Text className={styles.valueDescription}>
                      {t(value.descriptionKey)}
                    </Text>
                  </div>
                </Flex>
              ))}
            </Card>
          </Col>
        </Row>
      </MarketingSection>
    </main>
  );
}
