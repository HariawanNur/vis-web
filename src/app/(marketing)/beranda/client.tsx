"use client";

import Image from "next/image";
import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  type IconName,
  Row,
  Skeleton,
  Typography,
} from "@/components";
import { useI18n } from "@/i18n";
import { useMarketingData } from "@/lib/use-marketing-data";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;
const statIcons: IconName[] = [
  "ShopOutlined",
  "CalendarOutlined",
  "ClockCircleOutlined",
  "CustomerServiceOutlined",
];

const useStyles = createStyles(({ css }) => ({
  page: css`
    background: #fff;
    min-height: calc(100vh - 80px);
  `,
  hero: css`
    height: 508px;
    position: relative;
    overflow: hidden;
    background: #fbfaff;
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      height: 720px;
    }
  `,
  background: css`
    object-fit: cover;
    object-position: 72% center;
  `,
  fade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #fff 0%,
      rgba(255, 255, 255, 0.98) 34%,
      rgba(255, 255, 255, 0.6) 49%,
      rgba(255, 255, 255, 0) 69%
    );
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      background: linear-gradient(
        180deg,
        #fff 0%,
        rgba(255, 255, 255, 0.96) 56%,
        rgba(255, 255, 255, 0.35)
      );
    }
  `,
  heroInner: css`
    height: 100%;
    position: relative;
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      align-items: flex-start !important;
      padding-top: 48px;
    }
  `,
  copy: css`
    position: relative;
    z-index: 2;
    width: 610px;
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      width: 100%;
    }
  `,
  eyebrow: css`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 16px;
    background: #f2eaff;
    color: #6727af;
    font-size: 11px;
    font-weight: 800;
  `,
  headline: css`
    margin: 28px 0 14px !important;
    color: #11152f !important;
    font-size: 52px !important;
    line-height: 1.08 !important;
    letter-spacing: -2px;
    font-weight: 900 !important;
    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      font-size: 40px !important;
    }
  `,
  description: css`
    max-width: 570px;
    color: #38415f;
    font-size: 16px;
    line-height: 1.72;
  `,
  actions: css`
    margin-top: 30px;
    .ant-btn {
      height: 49px;
      min-width: 154px;
    }
    .ant-btn-default {
      border-color: #7132bb;
      color: #6328ae;
    }
  `,
  devices: css`
    position: absolute;
    z-index: 2;
    width: 700px;
    height: auto;
    right: 40px;
    bottom: 48px;
    filter: drop-shadow(0 15px 13px rgba(28, 19, 39, 0.16));
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      width: min(650px, 92%);
      right: 4%;
      bottom: 8px;
    }
  `,
  content: css`
    position: relative;
  `,
  stats: css`
    margin-top: -120px;
    margin-bottom: 38px;
    overflow: hidden;
    .ant-card-body {
      padding: 0;
    }
    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      margin-top: -96px;
    }
  `,
  statCol: css`
    position: relative;
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 20px;
      right: 0;
      bottom: 20px;
      border-right: 1px solid #e4e3ec;
    }
    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      &:nth-child(2)::after {
        display: none;
      }
      &:nth-child(-n + 2) {
        border-bottom: 1px solid #e4e3ec;
      }
    }
  `,
  stat: css`
    min-height: 94px;
    padding: 18px;
    color: #141a36;
    > span:first-child {
      color: #7132bb;
      font-size: 26px;
    }
    b,
    small {
      display: block;
    }
    b {
      font-size: 21px;
    }
    small {
      margin-top: 5px;
      color: #59617b;
      font-size: 13px;
    }
  `,
  sectionTitle: css`
    margin: 0 !important;
    text-align: center;
    color: #11152f !important;
    font-size: 30px !important;
  `,
  subtitle: css`
    display: block;
    margin: 10px 0 30px;
    text-align: center;
    color: #59617b;
  `,
  feature: css`
    height: 100%;
    min-height: 150px;
    .ant-card-body {
      height: 100%;
      padding: 22px;
    }
    h3 {
      margin: 0 0 8px !important;
      font-size: 15px !important;
    }
    p {
      margin: 0;
      color: #3e4763;
      font-size: 12px;
      line-height: 1.65;
    }
  `,
  featureIcon: css`
    flex: 0 0 auto;
    color: #7132bb;
    font-size: 36px;
  `,
  state: css`
    min-height: 300px;
    text-align: center;
    color: #59617b;
  `,
  skeleton: css`
    margin-top: 24px;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { locale, t } = useI18n();
  const { data, error, loading, refetch } = useMarketingData(locale);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/ilustrations/Salon_Interior.png"
          fill
          priority
          alt={t("app.description")}
          className={styles.background}
        />
        <div className={styles.fade} />
        <MarketingContainer className={styles.heroInner}>
          <div className={styles.copy}>
            <Text className={styles.eyebrow}>
              {t("marketing.home.eyebrow")}
            </Text>
            <Title className={styles.headline}>
              {t("marketing.home.title")}
            </Title>
            <Text className={styles.description}>
              {t("marketing.home.description")}
            </Text>
            <Flex className={styles.actions} gap={12} wrap="wrap">
              <Button
                type="primary"
                size="large"
                href="/kontak"
                icon={<Icon type="PlayCircleFilled" />}
              >
                {t("common.bookDemo")}
              </Button>
              <Button
                size="large"
                href="/kontak"
                icon={<Icon type="MailOutlined" />}
              >
                {t("common.contactSales")}
              </Button>
            </Flex>
          </div>
          <Image
            className={styles.devices}
            src="/images/ilustrations/Device_Mockup_1.png"
            width={612}
            height={408}
            priority
            alt={t("app.fullTitle")}
          />
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.content}>
        {loading && (
          <>
            <Card className={styles.stats}>
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
            <Text>{t("status.loading")}</Text>
            <Skeleton
              className={styles.skeleton}
              active
              paragraph={{ rows: 8 }}
              title={{ width: "45%" }}
            />
          </>
        )}

        {!loading && error && (
          <Flex
            className={styles.state}
            vertical
            align="center"
            justify="center"
            gap={16}
            role="alert"
          >
            <Title level={3}>{t("status.error")}</Title>
            <Button
              type="primary"
              onClick={refetch}
              icon={<Icon type="ReloadOutlined" />}
            >
              {t("status.retry")}
            </Button>
          </Flex>
        )}

        {!loading && data && (
          <>
            <Card className={styles.stats}>
              <Row>
                {data.home.stats.map((stat, index) => (
                  <Col className={styles.statCol} xs={12} md={6} key={stat.id}>
                    <Flex
                      className={styles.stat}
                      align="center"
                      justify="center"
                      gap={16}
                    >
                      <Icon type={statIcons[index % statIcons.length]} />
                      <span>
                        <b>{stat.value}</b>
                        <small>{t(stat.labelKey)}</small>
                      </span>
                    </Flex>
                  </Col>
                ))}
              </Row>
            </Card>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.features.title")}
            </Title>
            <Text className={styles.subtitle}>
              {t("marketing.features.description")}
            </Text>
            <Row gutter={[18, 18]} justify="center">
              {data.home.features.map((feature) => (
                <Col xs={24} sm={12} lg={6} key={feature.id}>
                  <Card className={styles.feature}>
                    <Flex align="flex-start" gap={16}>
                      <Icon
                        className={styles.featureIcon}
                        type={feature.icon as IconName}
                      />
                      <div>
                        <Title level={3}>{t(feature.titleKey)}</Title>
                        <p>{t(feature.descriptionKey)}</p>
                      </div>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </MarketingSection>
    </main>
  );
}
