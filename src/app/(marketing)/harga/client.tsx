"use client";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Row,
  Table,
  Typography,
  type IconName,
} from "@/components";
import { useI18n, type TranslationKey } from "@/i18n";
import { useMarketingData } from "@/lib/use-marketing-data";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;

const useStyles = createStyles(({ css }) => ({
  page: css`
    min-height: calc(100vh - 80px);
    overflow: hidden;
    color: #111936;
    background: #fff;
  `,
  hero: css`
    position: relative;
    padding-block: 88px 72px !important;
    background:
      radial-gradient(
        circle at 82% 18%,
        rgba(109, 52, 190, 0.17),
        transparent 25%
      ),
      radial-gradient(
        circle at 70% 76%,
        rgba(109, 52, 190, 0.08),
        transparent 32%
      ),
      linear-gradient(135deg, #fbfaff, #f5f1fb);

    &::before,
    &::after {
      content: "";
      position: absolute;
      border: 1px solid rgba(105, 49, 184, 0.12);
      border-radius: 50%;
      pointer-events: none;
    }

    &::before {
      width: 330px;
      height: 330px;
      top: -190px;
      right: 8%;
    }
    &::after {
      width: 190px;
      height: 190px;
      right: 23%;
      bottom: -130px;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 64px 54px !important;
    }
  `,
  heroCopy: css`
    position: relative;
    z-index: 1;
    max-width: 780px;
    margin-inline: auto;
    text-align: center;
  `,
  eyebrow: css`
    color: #6931b8 !important;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  `,
  heroTitle: css`
    margin: 12px 0 16px !important;
    color: #111936 !important;
    font-size: clamp(36px, 5vw, 62px) !important;
    font-weight: 850 !important;
    letter-spacing: -0.045em;
    line-height: 1.05 !important;
  `,
  heroDescription: css`
    max-width: 620px;
    margin: 0 auto !important;
    color: #59627d !important;
    font-size: 16px !important;
    line-height: 1.75 !important;
  `,
  content: css`
    padding-block: 48px 38px !important;
  `,
  highlights: css`
    margin-bottom: 42px;
  `,
  highlight: css`
    min-width: 0;
    padding: 14px 18px;
    border: 1px solid #e9e3f2;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 12px 35px rgba(33, 25, 64, 0.05);
  `,
  highlightIcon: css`
    display: grid;
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 12px;
    color: #6931b8;
    background: #f2ebfb;
    font-size: 19px;
  `,
  highlightTitle: css`
    display: block;
    color: #111936 !important;
    font-size: 13px;
  `,
  highlightDescription: css`
    display: block;
    margin-top: 2px;
    color: #69718a !important;
    font-size: 11px;
    line-height: 1.45;
  `,
  plans: css`
    align-items: stretch;
  `,
  planColumn: css`
    display: flex;
  `,
  planCard: css`
    width: 100%;
    overflow: hidden;
    border: 1px solid #e6e2eb !important;
    border-radius: 22px !important;
    box-shadow: 0 16px 42px rgba(22, 28, 62, 0.06) !important;

    :global(.ant-card-body) {
      height: 100%;
      padding: 28px !important;
    }
  `,
  featuredCard: css`
    border-color: #8b55cf !important;
    background: linear-gradient(155deg, #fff 35%, #f8f3fe) !important;
    box-shadow: 0 20px 55px rgba(105, 49, 184, 0.14) !important;
    transform: translateY(-8px);

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      transform: none;
    }
  `,
  planIcon: css`
    display: grid;
    width: 48px;
    height: 48px;
    margin-bottom: 22px;
    place-items: center;
    border-radius: 15px;
    color: #6931b8;
    background: #f1eafb;
    font-size: 22px;
  `,
  planName: css`
    margin: 0 0 8px !important;
    color: #111936 !important;
    font-size: 21px !important;
    font-weight: 800 !important;
  `,
  planDescription: css`
    display: block;
    min-height: 48px;
    color: #69718a !important;
    font-size: 12px;
    line-height: 1.6;
  `,
  priceLine: css`
    min-height: 58px;
    margin-block: 20px 17px;
  `,
  price: css`
    color: #5f27ad !important;
    font-size: clamp(27px, 2.4vw, 37px);
    font-weight: 850;
    letter-spacing: -0.04em;
  `,
  period: css`
    color: #69718a !important;
    font-size: 11px;
  `,
  contactPrice: css`
    color: #5f27ad !important;
    font-size: 24px;
    font-weight: 800;
  `,
  planButton: css`
    width: 100%;
    height: 42px !important;
    margin-bottom: 23px;
    border-color: #6931b8 !important;
    color: #6931b8 !important;
    font-weight: 700;

    &.ant-btn-primary {
      color: #fff !important;
      background: #6931b8 !important;
    }
  `,
  featureList: css`
    display: grid;
    gap: 12px;
  `,
  feature: css`
    color: #313a58;
    font-size: 12px;
    line-height: 1.45;
  `,
  featureIcon: css`
    flex: 0 0 auto;
    color: #40a864;
    font-size: 14px;
  `,
  comparisonSection: css`
    padding-top: 30px !important;
    background: linear-gradient(180deg, #fff, #faf9fc);
  `,
  comparisonHeading: css`
    margin-bottom: 22px !important;
    color: #111936 !important;
    font-size: clamp(24px, 3vw, 34px) !important;
    text-align: center;
  `,
  comparison: css`
    overflow: hidden;
    border: 1px solid #e6e2eb;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 14px 40px rgba(22, 28, 62, 0.05);

    :global(.ant-table) {
      min-width: 690px;
    }
    :global(.ant-table-thead > tr > th) {
      padding: 18px 20px;
      color: #111936;
      background: #f6f2fb;
      font-size: 12px;
    }
    :global(.ant-table-tbody > tr > td) {
      padding: 15px 20px;
      color: #424b67;
      font-size: 12px;
    }
    :global(.ant-table-cell:not(:first-child)) {
      text-align: center;
    }
    :global(.ant-table-wrapper),
    :global(.ant-spin-nested-loading),
    :global(.ant-spin-container) {
      overflow-x: auto;
    }
  `,
  tableCheck: css`
    color: #40a864;
    font-size: 16px;
  `,
  tableMinus: css`
    color: #a3a8b7;
    font-size: 14px;
  `,
  state: css`
    min-height: 420px;
    padding-block: 80px;
    text-align: center;
  `,
  stateIcon: css`
    color: #6931b8;
    font-size: 30px;
  `,
  stateText: css`
    color: #59627d !important;
    font-size: 14px;
  `,
}));

export default function Page() {
  const { styles, cx } = useStyles();
  const { locale, t } = useI18n();
  const { data, error, loading, refetch } = useMarketingData(locale);

  if (loading) {
    return (
      <main className={styles.page}>
        <MarketingContainer className={styles.state}>
          <Flex vertical align="center" gap={14} role="status">
            <Icon type="LoadingOutlined" spin className={styles.stateIcon} />
            <Text className={styles.stateText}>{t("status.loading")}</Text>
          </Flex>
        </MarketingContainer>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className={styles.page}>
        <MarketingContainer className={styles.state}>
          <Flex vertical align="center" gap={16} role="alert">
            <Icon type="WarningOutlined" className={styles.stateIcon} />
            <Text className={styles.stateText}>{t("status.error")}</Text>
            <Button type="primary" onClick={refetch}>
              {t("status.retry")}
            </Button>
          </Flex>
        </MarketingContainer>
      </main>
    );
  }

  const { pricing } = data;
  const comparisonColumns = [
    {
      title: t("marketing.pricing.eyebrow"),
      dataIndex: "labelKey",
      key: "feature",
      render: (key: TranslationKey) => t(key),
    },
    ...pricing.plans.map((plan) => ({
      title: t(plan.nameKey),
      key: plan.id,
      render: (_: unknown, row: (typeof pricing.comparison)[number]) => {
        const value = row.values[plan.id];
        if (value === true)
          return (
            <Icon
              type="CheckCircleFilled"
              className={styles.tableCheck}
              aria-label={t("common.yes")}
            />
          );
        if (value === false)
          return (
            <Icon
              type="MinusOutlined"
              className={styles.tableMinus}
              aria-label={t("common.no")}
            />
          );
        return value ? t(value) : null;
      },
    })),
  ];

  return (
    <main className={styles.page}>
      <MarketingSection className={styles.hero}>
        <div className={styles.heroCopy}>
          <Text className={styles.eyebrow}>
            {t("marketing.pricing.eyebrow")}
          </Text>
          <Title level={1} className={styles.heroTitle}>
            {t("marketing.pricing.title")}
          </Title>
          <Paragraph className={styles.heroDescription}>
            {t("marketing.pricing.description")}
          </Paragraph>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.content}>
        <Flex
          className={styles.highlights}
          gap={14}
          justify="center"
          wrap="wrap"
        >
          {pricing.highlights.map((highlight) => (
            <Flex
              className={styles.highlight}
              key={highlight.id}
              align="center"
              gap={13}
              flex="1 1 250px"
            >
              <span className={styles.highlightIcon}>
                <Icon type={highlight.icon as IconName} />
              </span>
              <span>
                <Text strong className={styles.highlightTitle}>
                  {t(highlight.titleKey)}
                </Text>
                <Text className={styles.highlightDescription}>
                  {t(highlight.descriptionKey)}
                </Text>
              </span>
            </Flex>
          ))}
        </Flex>

        <Row className={styles.plans} gutter={[18, 26]} justify="center">
          {pricing.plans.map((plan) => (
            <Col
              className={styles.planColumn}
              key={plan.id}
              xs={24}
              md={12}
              lg={8}
            >
              <Card
                className={cx(
                  styles.planCard,
                  plan.featured && styles.featuredCard,
                )}
              >
                <Flex vertical>
                  <span className={styles.planIcon}>
                    <Icon type={plan.icon as IconName} />
                  </span>
                  <Title level={3} className={styles.planName}>
                    {t(plan.nameKey)}
                  </Title>
                  <Text className={styles.planDescription}>
                    {t(plan.descriptionKey)}
                  </Text>
                  <Flex className={styles.priceLine} vertical justify="center">
                    {plan.price ? (
                      <>
                        <Text className={styles.price}>
                          {new Intl.NumberFormat(locale, {
                            style: "currency",
                            currency: plan.currency,
                            maximumFractionDigits: 0,
                          }).format(Number(plan.price))}
                        </Text>
                        <Text className={styles.period}>
                          {t(plan.periodKey)}
                        </Text>
                      </>
                    ) : (
                      <Text className={styles.contactPrice}>
                        {t(plan.periodKey)}
                      </Text>
                    )}
                  </Flex>
                  <Button
                    type={plan.featured ? "primary" : "default"}
                    href="/kontak"
                    className={styles.planButton}
                  >
                    {t(plan.ctaKey)}
                  </Button>
                  <div className={styles.featureList}>
                    {plan.featureKeys.map((featureKey) => (
                      <Flex
                        className={styles.feature}
                        key={featureKey}
                        align="flex-start"
                        gap={9}
                      >
                        <Icon
                          type="CheckCircleFilled"
                          className={styles.featureIcon}
                        />
                        <span>{t(featureKey)}</span>
                      </Flex>
                    ))}
                  </div>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.comparisonSection}>
        <Title level={2} className={styles.comparisonHeading}>
          {t("marketing.pricing.eyebrow")}
        </Title>
        <div className={styles.comparison}>
          <Table
            columns={comparisonColumns}
            dataSource={pricing.comparison}
            pagination={false}
            rowKey="id"
            tableLayout="fixed"
          />
        </div>
      </MarketingSection>
    </main>
  );
}
