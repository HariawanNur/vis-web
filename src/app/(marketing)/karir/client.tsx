"use client";

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
import { MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0c1533;
    background: #fff;
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    padding-block: 58px !important;
    background:
      linear-gradient(
        90deg,
        #f8f8fc 0%,
        rgba(248, 248, 252, 0.96) 48%,
        rgba(248, 248, 252, 0.35) 100%
      ),
      url("/images/ilustrations/Salon_Interior.png") center 54% / cover;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 48px !important;
      background:
        linear-gradient(rgba(248, 248, 252, 0.88), rgba(248, 248, 252, 0.88)),
        url("/images/ilustrations/Salon_Interior.png") center / cover;
    }
  `,
  heroCopy: css`
    position: relative;
    z-index: 1;
    max-width: 650px;
  `,
  eyebrow: css`
    display: block;
    margin-bottom: 10px;
    color: #6931b8 !important;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  heroTitle: css`
    margin: 0 0 12px !important;
    color: #0c1533 !important;
    font-size: clamp(30px, 3vw, 44px) !important;
    line-height: 1.12 !important;
    letter-spacing: -1px;
    font-weight: 800 !important;
  `,
  heroDescription: css`
    max-width: 610px;
    margin: 0 !important;
    color: #35405e !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  content: css`
    padding-block: 32px 72px !important;
  `,
  sidebar: css`
    position: sticky;
    top: 24px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: static;
    }
  `,
  menuCard: css`
    overflow: hidden;
    border: 1px solid #e0e3eb !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 16px rgba(18, 28, 57, 0.05);

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  menu: css`
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      flex-direction: row;
      overflow-x: auto;
    }
  `,
  menuItem: css`
    min-height: 50px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #18213d;
    border-bottom: 1px solid #e6e8ee;
    background: #fff;
    text-decoration: none;
    transition:
      color 160ms ease,
      background 160ms ease;

    &:first-child {
      color: #fff;
      background: linear-gradient(105deg, #5f27b2, #8242cc);
    }

    &:last-child {
      border-bottom: 0;
    }

    &:hover {
      color: #6931b8;
      background: #f7f2ff;
    }

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      flex: 0 0 auto;
      border-right: 1px solid #e6e8ee;
      border-bottom: 0;
    }
  `,
  menuIcon: css`
    width: 26px;
    color: inherit;
    font-size: 17px;
  `,
  menuLabel: css`
    color: inherit !important;
    font-size: 12px !important;
    line-height: 1.3 !important;
  `,
  menuArrow: css`
    color: inherit;
    font-size: 10px;
    opacity: 0.65;
  `,
  ctaCard: css`
    position: relative;
    min-height: 250px;
    overflow: hidden;
    padding: 22px 20px;
    border: 1px solid #e7e2f1;
    border-radius: 12px;
    background: linear-gradient(145deg, #f8f6ff 0%, #fff 47%, #f1ebfb 100%);
  `,
  ctaCopy: css`
    position: relative;
    z-index: 1;
    max-width: 230px;
  `,
  ctaTitle: css`
    margin: 0 0 8px !important;
    color: #101a37 !important;
    font-size: 17px !important;
    line-height: 1.38 !important;
    font-weight: 800 !important;
  `,
  ctaDescription: css`
    color: #3e4862 !important;
    font-size: 12px !important;
    line-height: 1.7 !important;
  `,
  ctaButton: css`
    margin-top: 16px;
    border: 0 !important;
    background: linear-gradient(100deg, #6930bc, #6130aa) !important;
    box-shadow: none !important;
    font-size: 12px !important;
  `,
  supportArt: css`
    position: absolute;
    right: 20px;
    bottom: 18px;
    color: rgba(105, 49, 184, 0.18);
    font-size: 76px;
    line-height: 1;
  `,
  groups: css`
    min-width: 0;
  `,
  group: css`
    scroll-margin-top: 24px;

    & + & {
      margin-top: 42px;
      padding-top: 42px;
      border-top: 1px solid #e7e9ef;
    }
  `,
  groupHeader: css`
    margin-bottom: 20px;
  `,
  groupIcon: css`
    flex: 0 0 auto;
    width: 46px;
    height: 46px;
    border-radius: 12px;
    color: #7130ba;
    background: #f0eafb;
    font-size: 23px;
  `,
  sectionTitle: css`
    margin: 0 0 4px !important;
    color: #101832 !important;
    font-size: 22px !important;
    line-height: 1.25 !important;
    font-weight: 800 !important;
  `,
  sectionDescription: css`
    margin: 0 !important;
    color: #5a6379 !important;
    font-size: 13px !important;
    line-height: 1.6 !important;
  `,
  featureCard: css`
    height: 100%;
    min-height: 230px;
    border: 1px solid #e1e4eb !important;
    border-radius: 12px !important;
    box-shadow: 0 3px 12px rgba(17, 28, 58, 0.035);
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;

    &:hover {
      transform: translateY(-3px);
      border-color: #d5c5ed !important;
      box-shadow: 0 12px 28px rgba(65, 36, 111, 0.1);
    }

    :global(.ant-card-body) {
      height: 100%;
      padding: 20px !important;
    }
  `,
  featureContent: css`
    height: 100%;
  `,
  featureIcon: css`
    flex: 0 0 auto;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    color: #7130ba;
    background: #f0eafb;
    font-size: 25px;
  `,
  featureTitle: css`
    margin: 0 !important;
    color: #0d1633 !important;
    font-size: 16px !important;
    line-height: 1.3 !important;
    font-weight: 800 !important;
  `,
  featureDescription: css`
    margin: 0 !important;
    color: #46506a !important;
    font-size: 12.5px !important;
    line-height: 1.7 !important;
  `,
  moreButton: css`
    width: fit-content;
    height: auto !important;
    margin-top: auto;
    padding: 0 !important;
    color: #6927b7 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
  `,
  state: css`
    min-height: 320px;
    text-align: center;
  `,
  stateIcon: css`
    color: #7541c3;
    font-size: 34px;
  `,
  stateText: css`
    color: #46506a !important;
    font-size: 14px !important;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { locale, t } = useI18n();
  const { data, error, loading, refetch } = useMarketingData(locale);
  const groups = data?.features.groups ?? [];

  return (
    <main className={styles.page}>
      <MarketingSection className={styles.hero}>
        <div className={styles.heroCopy}>
          <Text className={styles.eyebrow}>
            {t("marketing.features.eyebrow")}
          </Text>
          <Title level={1} className={styles.heroTitle}>
            {t("marketing.features.title")}
          </Title>
          <Paragraph className={styles.heroDescription}>
            {t("marketing.features.description")}
          </Paragraph>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.content}>
        {loading ? (
          <Flex
            className={styles.state}
            vertical
            align="center"
            justify="center"
            gap={12}
            role="status"
          >
            <Icon type="LoadingOutlined" spin className={styles.stateIcon} />
            <Text className={styles.stateText}>{t("status.loading")}</Text>
          </Flex>
        ) : error ? (
          <Flex
            className={styles.state}
            vertical
            align="center"
            justify="center"
            gap={16}
            role="alert"
          >
            <Icon
              type="ExclamationCircleOutlined"
              className={styles.stateIcon}
            />
            <Text className={styles.stateText}>{t("status.error")}</Text>
            <Button type="primary" onClick={refetch}>
              {t("status.retry")}
            </Button>
          </Flex>
        ) : groups.length === 0 ? (
          <Flex
            className={styles.state}
            vertical
            align="center"
            justify="center"
            gap={12}
            role="status"
          >
            <Icon type="InboxOutlined" className={styles.stateIcon} />
            <Text className={styles.stateText}>{t("status.empty")}</Text>
          </Flex>
        ) : (
          <Row gutter={[32, 32]} align="top">
            <Col xs={24} lg={6}>
              <Flex
                component="aside"
                className={styles.sidebar}
                vertical
                gap={18}
              >
                <Card className={styles.menuCard}>
                  <Flex component="nav" className={styles.menu} vertical>
                    {groups.map((group) => (
                      <a
                        key={group.id}
                        href={`#${group.id}`}
                        className={styles.menuItem}
                      >
                        <Flex align="center" gap={10}>
                          <Flex
                            className={styles.menuIcon}
                            align="center"
                            justify="center"
                          >
                            <Icon type={group.cards[0]?.icon as IconName} />
                          </Flex>
                          <Text strong className={styles.menuLabel}>
                            {t(group.titleKey)}
                          </Text>
                        </Flex>
                        <Icon
                          type="RightOutlined"
                          className={styles.menuArrow}
                        />
                      </a>
                    ))}
                  </Flex>
                </Card>

                <div className={styles.ctaCard}>
                  <div className={styles.ctaCopy}>
                    <Title level={3} className={styles.ctaTitle}>
                      {t("marketing.contact.title")}
                    </Title>
                    <Text className={styles.ctaDescription}>
                      {t("marketing.contact.description")}
                    </Text>
                    <Button
                      href="/kontak"
                      type="primary"
                      className={styles.ctaButton}
                    >
                      {t("common.bookDemo")} <Icon type="ArrowRightOutlined" />
                    </Button>
                  </div>
                  <Icon
                    type="CustomerServiceFilled"
                    className={styles.supportArt}
                    aria-hidden="true"
                  />
                </div>
              </Flex>
            </Col>

            <Col xs={24} lg={18} className={styles.groups}>
              {groups.map((group) => (
                <section key={group.id} id={group.id} className={styles.group}>
                  <Flex className={styles.groupHeader} align="center" gap={14}>
                    <Flex
                      className={styles.groupIcon}
                      align="center"
                      justify="center"
                      aria-hidden="true"
                    >
                      <Icon type={group.cards[0]?.icon as IconName} />
                    </Flex>
                    <div>
                      <Title level={2} className={styles.sectionTitle}>
                        {t(group.titleKey)}
                      </Title>
                      <Paragraph className={styles.sectionDescription}>
                        {t(group.descriptionKey)}
                      </Paragraph>
                    </div>
                  </Flex>

                  <Row gutter={[16, 16]}>
                    {group.cards.map((feature) => (
                      <Col key={feature.id} xs={24} sm={12} xl={8}>
                        <Card className={styles.featureCard}>
                          <Flex
                            className={styles.featureContent}
                            vertical
                            gap={14}
                          >
                            <Flex
                              className={styles.featureIcon}
                              align="center"
                              justify="center"
                              aria-hidden="true"
                            >
                              <Icon type={feature.icon as IconName} />
                            </Flex>
                            <Title level={3} className={styles.featureTitle}>
                              {t(feature.titleKey)}
                            </Title>
                            <Paragraph className={styles.featureDescription}>
                              {t(feature.descriptionKey)}
                            </Paragraph>
                            <Button
                              type="link"
                              href="/kontak"
                              className={styles.moreButton}
                            >
                              {t("common.learnMore")}{" "}
                              <Icon type="ArrowRightOutlined" />
                            </Button>
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </section>
              ))}
            </Col>
          </Row>
        )}
      </MarketingSection>
    </main>
  );
}
