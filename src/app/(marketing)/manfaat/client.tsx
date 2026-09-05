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

const { Paragraph, Text, Title } = Typography;

const useStyles = createStyles(({ css }) => ({
  page: css`
    overflow: hidden;
    color: #0b1230;
    background: #fff;
  `,
  hero: css`
    position: relative;
    min-height: 430px;
    background: #f8f7fb;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 660px;
    }
  `,
  heroImage: css`
    object-fit: cover;
    object-position: center 53%;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      object-position: 65% center;
    }
  `,
  heroShade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #fff 0%,
      rgba(255, 255, 255, 0.97) 28%,
      rgba(255, 255, 255, 0.48) 51%,
      rgba(255, 255, 255, 0) 72%
    );

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.98),
        rgba(255, 255, 255, 0.82)
      );
    }
  `,
  heroInner: css`
    position: relative;
    z-index: 1;
    min-height: 430px;
    padding-top: 62px;
    padding-bottom: 112px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 660px;
      padding-top: 52px;
      padding-bottom: 250px;
    }
  `,
  heroCopy: css`
    width: min(560px, 100%);
  `,
  eyebrow: css`
    && {
      display: block;
      margin-bottom: 14px;
      color: #6d2db8;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  `,
  heroTitle: css`
    && {
      max-width: 550px;
      margin: 0 0 14px;
      color: #0b1230;
      font-size: clamp(34px, 4vw, 52px);
      line-height: 1.1;
      letter-spacing: -1.2px;
      font-weight: 800;
    }
  `,
  heroDescription: css`
    && {
      max-width: 530px;
      margin: 0;
      color: #34405f;
      font-size: 16px;
      line-height: 1.7;
    }
  `,
  statsCard: css`
    position: absolute;
    right: 0;
    bottom: -48px;
    left: 0;
    z-index: 2;
    border: 1px solid #e7e8ef;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 8px 24px rgba(22, 27, 54, 0.09);

    :global(.ant-card-body) {
      padding: 27px 30px;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      bottom: -96px;

      :global(.ant-card-body) {
        padding: 12px 22px;
      }
    }
  `,
  stat: css`
    min-height: 66px;
    padding: 0 28px;
    text-align: center;
    border-right: 1px solid #e3e5ec;

    &:last-child {
      border-right: 0;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 0;
      padding: 16px 0;
      text-align: left;
      border-right: 0;
      border-bottom: 1px solid #e3e5ec;

      &:last-child {
        border-bottom: 0;
      }
    }
  `,
  statValue: css`
    && {
      display: block;
      color: #6d2db8;
      font-size: 25px;
      line-height: 1.2;
      font-weight: 800;
    }
  `,
  statLabel: css`
    && {
      display: block;
      margin-top: 7px;
      color: #34405f;
      font-size: 13px;
      line-height: 1.45;
    }
  `,
  benefits: css`
    padding-top: 108px;
    padding-bottom: 38px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-top: 150px;
    }
  `,
  sectionHeading: css`
    max-width: 680px;
    margin: 0 auto 32px;
    text-align: center;
  `,
  sectionTitle: css`
    && {
      margin: 0;
      color: #0b1230;
      font-size: clamp(25px, 3vw, 36px);
      line-height: 1.25;
      font-weight: 800;
    }
  `,
  titleRule: css`
    width: 42px;
    height: 3px;
    margin: 14px auto 0;
    border-radius: 999px;
    background: #7030b9;
  `,
  cardsRow: css`
    align-items: stretch;

    > div {
      display: flex;
    }
  `,
  benefitCard: css`
    width: 100%;
    min-height: 230px;
    border: 1px solid #e3e5ed;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(24, 29, 57, 0.05);

    :global(.ant-card-body) {
      height: 100%;
      padding: 24px;
    }
  `,
  cardIcon: css`
    display: grid;
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    place-items: center;
    border-radius: 15px;
    color: #6527ad;
    background: linear-gradient(145deg, #f8f5ff, #eee7fa);
    font-size: 27px;
  `,
  cardTitle: css`
    && {
      margin: 0;
      color: #0b1230;
      font-size: 17px;
      line-height: 1.4;
      font-weight: 750;
    }
  `,
  cardDescription: css`
    && {
      margin: 20px 0 0;
      color: #34405f;
      font-size: 14px;
      line-height: 1.75;
    }
  `,
  cta: css`
    position: relative;
    min-height: 210px;
    margin-top: 42px;
    overflow: hidden;
    border: 1px solid #e8e1f4;
    border-radius: 14px;
    background: linear-gradient(108deg, #f8f5fd 0%, #fff 65%, #ddd0f8 100%);

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 430px;
      margin-top: 28px;
    }
  `,
  ctaInner: css`
    position: relative;
    z-index: 1;
    min-height: 210px;
    padding: 32px 380px 32px 42px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      padding-right: 300px;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 430px;
      padding: 30px 24px 220px;
    }
  `,
  ctaCopy: css`
    max-width: 610px;
  `,
  ctaTitle: css`
    && {
      margin: 0;
      color: #0b1230;
      font-size: clamp(22px, 2.4vw, 30px);
      line-height: 1.35;
      font-weight: 750;
    }
  `,
  ctaActions: css`
    margin-top: 22px;
  `,
  primaryButton: css`
    && {
      height: 42px;
      border-color: #6c2ab5;
      background: #6c2ab5;
      box-shadow: none;
    }
  `,
  secondaryButton: css`
    && {
      height: 42px;
      color: #6527ad;
      border-color: #7130b9;
      background: #fff;
    }
  `,
  device: css`
    position: absolute;
    right: 28px;
    bottom: 4px;
    width: 330px;
    height: auto;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      right: 12px;
      width: 285px;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      right: 50%;
      bottom: 8px;
      width: 290px;
      transform: translateX(50%);
    }
  `,
  statusSection: css`
    min-height: 420px;
  `,
  statusText: css`
    && {
      color: #34405f;
      font-size: 16px;
    }
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { locale, t } = useI18n();
  const { data, error, loading, refetch } = useMarketingData(locale);

  if (loading || !data) {
    if (error) {
      return (
        <main className={styles.page}>
          <MarketingSection className={styles.statusSection}>
            <Flex
              vertical
              align="center"
              justify="center"
              gap={18}
              role="alert"
            >
              <Text className={styles.statusText}>{t("status.error")}</Text>
              <Button type="primary" onClick={refetch}>
                {t("status.retry")}
              </Button>
            </Flex>
          </MarketingSection>
        </main>
      );
    }

    return (
      <main className={styles.page}>
        <MarketingSection className={styles.statusSection}>
          <Flex align="center" justify="center" role="status">
            <Text className={styles.statusText}>{t("status.loading")}</Text>
          </Flex>
        </MarketingSection>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/ilustrations/Salon_Interior.png"
          alt={t("marketing.benefits.title")}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <MarketingContainer className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Text className={styles.eyebrow}>
              {t("marketing.benefits.eyebrow")}
            </Text>
            <Title level={1} className={styles.heroTitle}>
              {t("marketing.benefits.title")}
            </Title>
            <Paragraph className={styles.heroDescription}>
              {t("marketing.benefits.description")}
            </Paragraph>
          </div>

          <Card className={styles.statsCard}>
            <Row>
              {data.benefits.stats.map((stat) => (
                <Col xs={24} md={8} key={stat.id} className={styles.stat}>
                  <Text className={styles.statValue}>{stat.value}</Text>
                  <Text className={styles.statLabel}>{t(stat.labelKey)}</Text>
                </Col>
              ))}
            </Row>
          </Card>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.benefits}>
        <div className={styles.sectionHeading}>
          <Title level={2} className={styles.sectionTitle}>
            {t("marketing.benefits.eyebrow")}
          </Title>
          <div className={styles.titleRule} />
        </div>

        <Row gutter={[16, 16]} className={styles.cardsRow}>
          {data.benefits.cards.map((benefit) => (
            <Col xs={24} sm={12} lg={6} key={benefit.id}>
              <Card className={styles.benefitCard}>
                <Flex align="center" gap={15}>
                  <span className={styles.cardIcon}>
                    <Icon type={benefit.icon as IconName} />
                  </span>
                  <Title level={3} className={styles.cardTitle}>
                    {t(benefit.titleKey)}
                  </Title>
                </Flex>
                <Paragraph className={styles.cardDescription}>
                  {t(benefit.descriptionKey)}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <div className={styles.cta}>
          <Flex vertical justify="center" className={styles.ctaInner}>
            <div className={styles.ctaCopy}>
              <Text className={styles.eyebrow}>
                {t("marketing.benefits.eyebrow")}
              </Text>
              <Title level={2} className={styles.ctaTitle}>
                {t("marketing.benefits.title")}
              </Title>
              <Flex className={styles.ctaActions} gap={14} wrap="wrap">
                <Button
                  type="primary"
                  href="/kontak"
                  icon={<Icon type="MailOutlined" />}
                  className={styles.primaryButton}
                >
                  {t("common.contactSales")}
                </Button>
                <Button
                  href="/kontak"
                  icon={<Icon type="PlayCircleFilled" />}
                  className={styles.secondaryButton}
                >
                  {t("common.bookDemo")}
                </Button>
              </Flex>
            </div>
          </Flex>
          <Image
            src="/images/ilustrations/Device_Mockup_1.png"
            alt={t("app.description")}
            width={600}
            height={400}
            className={styles.device}
          />
        </div>
      </MarketingSection>
    </main>
  );
}
