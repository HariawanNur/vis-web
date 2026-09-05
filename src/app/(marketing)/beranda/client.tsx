"use client";

import Image from "next/image";
import { Button, Col, createStyles, Icon, MarketingHero, Row, Typography } from "@/components";
import { useI18n } from "@/i18n";
import { MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

const serviceCards = [
  {
    code: "KBL 62191",
    icon: "ShoppingCartOutlined",
    titleKey: "marketing.home.services.items.ecommerce.title",
    descriptionKey: "marketing.home.services.items.ecommerce.description",
  },
  {
    code: "KBL 62199",
    icon: "CodeOutlined",
    titleKey: "marketing.home.services.items.custom.title",
    descriptionKey: "marketing.home.services.items.custom.description",
  },
  {
    code: "KBL 62209",
    icon: "TeamOutlined",
    titleKey: "marketing.home.services.items.consulting.title",
    descriptionKey: "marketing.home.services.items.consulting.description",
  },
] as const;

const industries = [
  { titleKey: "marketing.home.industries.items.commerce", image: "/images/sample/01_ecommerce_marketplace.jpg" },
  { titleKey: "marketing.home.industries.items.manufacturing", image: "/images/sample/05_monitoring_produksi.jpg" },
  { titleKey: "marketing.home.industries.items.agri", image: "/images/sample/13_agritech_inovasi.jpg" },
  { titleKey: "marketing.home.industries.items.education", image: "/images/sample/07_pembelajaran_digital.jpg" },
  { titleKey: "marketing.home.industries.items.health", image: "/images/sample/06_audit_keamanan.jpg" },
  { titleKey: "marketing.home.industries.items.finance", image: "/images/sample/08_analitik_keuangan.jpg" },
] as const;

const projectCards = [
  {
    image: "/images/sample/17_digital_agriculture_marketplace.jpg",
    titleKey: "marketing.home.projects.items.agri.title",
    descriptionKey: "marketing.home.projects.items.agri.description",
    tagKeys: ["marketing.home.projects.tags.ecommerce", "marketing.home.projects.tags.webMobile"],
  },
  {
    image: "/images/sample/03_cloud_infrastruktur.jpg",
    titleKey: "marketing.home.projects.items.ops.title",
    descriptionKey: "marketing.home.projects.items.ops.description",
    tagKeys: ["marketing.home.projects.tags.custom", "marketing.home.projects.tags.iot"],
  },
  {
    image: "/images/sample/07_pembelajaran_digital.jpg",
    titleKey: "marketing.home.projects.items.education.title",
    descriptionKey: "marketing.home.projects.items.education.description",
    tagKeys: ["marketing.home.projects.tags.webApp", "marketing.home.projects.tags.cloud"],
  },
] as const;

const clientLogos = [
  "TANI MAJU",
  "SENTRA DISTRIBUSI",
  "EduSmart",
  "KLINIK SEHAT",
  "FINTRUST",
  "AgroLink",
] as const;

const useStyles = createStyles(({ css, token }) => ({
  page: css`
    background: ${token.colorBgLayout};
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    min-height: 700px;
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
  heroInner: css`
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
    gap: 40px;
    align-items: center;
    min-height: 700px;
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
  heroCopy: css`
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
  heroTitle: css`
    margin: 16px 0 18px !important;
    color: #f8fbff !important;
    font-size: 60px !important;
    line-height: 1.05 !important;
    letter-spacing: -0.04em;
    font-weight: 800 !important;

    @media (max-width: ${token.screenLG}px) {
      font-size: 48px !important;
      line-height: 1.08 !important;
    }

    @media (max-width: ${token.screenSM}px) {
      font-size: 38px !important;
      line-height: 1.1 !important;
    }
  `,
  heroTitleAccent: css`
    color: ${token.colorPrimary};
    display: block;
  `,
  heroDesc: css`
    max-width: 560px;
    color: rgba(226, 232, 240, 0.9);
    font-size: 18px;
    line-height: 1.7;
  `,
  heroActions: css`
    margin-top: 30px;
    .ant-btn {
      height: 48px;
      padding-inline: 20px;
      font-weight: 700;
    }
  `,
  heroPager: css`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 34px;
    color: rgba(226, 232, 240, 0.74);
    font-size: 13px;
    letter-spacing: 0.18em;
  `,
  heroPagerLine: css`
    width: 56px;
    height: 1px;
    background: rgba(255, 255, 255, 0.22);
  `,
  heroVisual: css`
    position: relative;
    width: 100%;
    min-height: 560px;

    @media (max-width: ${token.screenSM}px) {
      display: none;
    }
  `,
  heroFloatingCard: css`
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
  heroFloatingItem: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 8px;
    color: #f8fbff;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
  `,
  heroFloatingIcon: css`
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(22, 119, 255, 0.18);
    color: #7cc1ff;
    flex: 0 0 auto;
  `,
  heroFloatingTitle: css`
    display: block;
    font-size: 14px;
    font-weight: 700;
  `,
  heroFloatingDesc: css`
    display: block;
    margin-top: 2px;
    color: rgba(226, 232, 240, 0.72);
    font-size: 12px;
  `,
  heroSlogan: css`
    position: absolute;
    right: 42px;
    bottom: 54px;
    color: rgba(255, 255, 255, 0.96);
    font-size: 34px;
    font-style: italic;
    font-weight: 500;
    line-height: 0.94;
    text-align: right;
    transform: rotate(-10deg);
    text-shadow: 0 12px 32px rgba(7, 17, 31, 0.45);
  `,
  sectionHead: css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 28px;

    @media (max-width: ${token.screenSM}px) {
      align-items: start;
      flex-direction: column;
    }
  `,
  sectionKicker: css`
    color: ${token.colorPrimary};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  sectionTitle: css`
    margin: 6px 0 0 !important;
    color: ${token.colorText} !important;
    font-size: 34px !important;
    line-height: 1.14 !important;
    letter-spacing: -0.03em;

    @media (max-width: ${token.screenSM}px) {
      font-size: 28px !important;
    }
  `,
  sectionLink: css`
    color: ${token.colorPrimary};
    font-size: 14px;
    font-weight: 700;
  `,
  servicesGrid: css`
    .ant-card-body {
      padding: 0;
    }
  `,
  serviceCard: css`
    position: relative;
    height: 100%;
    padding: 28px 24px 26px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 18px;
    background: ${token.colorBgContainer};
    box-shadow: 0 1px 2px rgba(7, 17, 31, 0.04);
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;

    &:hover {
      transform: translateY(-3px);
      border-color: ${token.colorPrimaryBorder};
      box-shadow: 0 2px 4px rgba(7, 17, 31, 0.04), 0 16px 40px rgba(7, 17, 31, 0.1);
    }
  `,
  serviceBadge: css`
    position: absolute;
    top: 18px;
    right: 18px;
    padding: 6px 10px;
    border-radius: 999px;
    background: ${token.colorFillQuaternary};
    color: ${token.colorPrimary};
    font-size: 11px;
    font-weight: 700;
  `,
  serviceIcon: css`
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: ${token.colorPrimaryBg};
    color: ${token.colorPrimary};
    font-size: 28px;
  `,
  serviceTitle: css`
    margin: 18px 0 8px !important;
    color: ${token.colorText} !important;
    font-size: 20px !important;
    line-height: 1.25 !important;
    font-weight: 700 !important;
  `,
  serviceDesc: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
    line-height: 1.75;
  `,
  serviceAction: css`
    margin-top: 18px;
    color: ${token.colorPrimary};
    font-size: 14px;
    font-weight: 700;
  `,
  aboutWrap: css`
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 28px;
    align-items: center;

    @media (max-width: ${token.screenLG}px) {
      grid-template-columns: 1fr;
    }
  `,
  aboutMedia: css`
    position: relative;
    min-height: 420px;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    box-shadow: 0 18px 48px rgba(7, 17, 31, 0.12);
  `,
  aboutImage: css`
    object-fit: cover;
    object-position: center;
  `,
  aboutPanel: css`
    position: absolute;
    inset: auto 18px 18px auto;
    width: 180px;
    padding: 14px;
    border-radius: 16px;
    background: rgba(7, 17, 31, 0.72);
    color: #fff;
    backdrop-filter: blur(8px);
  `,
  aboutTitle: css`
    margin: 10px 0 16px !important;
    color: ${token.colorText} !important;
    font-size: 32px !important;
    line-height: 1.12 !important;
    letter-spacing: -0.03em;
  `,
  aboutDesc: css`
    color: ${token.colorTextSecondary};
    font-size: 16px;
    line-height: 1.85;
    margin-bottom: 22px;
  `,
  statsGrid: css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;

    @media (max-width: ${token.screenMD}px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
  statCard: css`
    padding: 16px 14px;
    border-radius: 16px;
    border: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgContainer};
  `,
  statValue: css`
    display: block;
    color: ${token.colorPrimary};
    font-size: 28px;
    line-height: 1;
    font-weight: 800;
  `,
  statLabel: css`
    display: block;
    margin-top: 6px;
    color: ${token.colorTextSecondary};
    font-size: 13px;
  `,
  industryGrid: css`
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: ${token.screenLG}px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: ${token.screenSM}px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
  industryCard: css`
    position: relative;
    overflow: hidden;
    min-height: 150px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #0b1831;
    box-shadow: 0 10px 24px rgba(7, 17, 31, 0.08);
  `,
  industryImage: css`
    object-fit: cover;
    object-position: center;
    opacity: 0.38;
    filter: grayscale(0.15) saturate(0.9);
  `,
  industryShade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 17, 31, 0.1) 0%, rgba(7, 17, 31, 0.82) 100%);
  `,
  industryText: css`
    position: absolute;
    inset: auto 12px 12px 12px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.3;
  `,
  projectGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: ${token.screenLG}px) {
      grid-template-columns: 1fr;
    }
  `,
  projectCard: css`
    overflow: hidden;
    height: 100%;
    border-radius: 18px;
    border: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgContainer};
    box-shadow: 0 1px 2px rgba(7, 17, 31, 0.04);
  `,
  projectImageWrap: css`
    position: relative;
    min-height: 180px;
  `,
  projectImage: css`
    object-fit: cover;
    object-position: center;
  `,
  projectBody: css`
    padding: 20px;
  `,
  tagRow: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  `,
  tag: css`
    padding: 6px 10px;
    border-radius: 999px;
    background: ${token.colorFillQuaternary};
    color: ${token.colorTextSecondary};
    font-size: 12px;
    font-weight: 700;
  `,
  clientsGrid: css`
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: ${token.screenLG}px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: ${token.screenSM}px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
  clientCard: css`
    display: grid;
    place-items: center;
    min-height: 82px;
    border-radius: 14px;
    border: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgContainer};
    color: ${token.colorTextSecondary};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.02em;
  `,
  cta: css`
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    background: linear-gradient(135deg, #07111f 0%, #0a2f6e 52%, #1677ff 100%);
    color: #fff;
    box-shadow: 0 24px 64px rgba(7, 17, 31, 0.18);
  `,
  ctaInner: css`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 34px 32px;

    @media (max-width: ${token.screenMD}px) {
      flex-direction: column;
      align-items: start;
    }
  `,
  ctaTitle: css`
    margin: 0 0 8px !important;
    color: #fff !important;
    font-size: 32px !important;
    line-height: 1.12 !important;
  `,
  ctaDesc: css`
    color: rgba(226, 232, 240, 0.84);
    font-size: 16px;
  `,
  ctaGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 8% 25%, rgba(255, 255, 255, 0.12), transparent 22%),
      radial-gradient(circle at 82% 75%, rgba(255, 255, 255, 0.08), transparent 26%);
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { t } = useI18n();

  const heroStats = [
    { id: "projects", value: "50+", label: t("marketing.home.about.stats.projects") },
    { id: "clients", value: "30+", label: t("marketing.home.about.stats.clients") },
    { id: "industries", value: "5+", label: t("marketing.home.about.stats.industries") },
    { id: "satisfaction", value: "99%", label: t("marketing.home.about.stats.satisfaction") },
  ] as const;

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Late_Night_Coding.png"
        backgroundAlt={t("app.description")}
        eyebrow={t("marketing.home.eyebrow")}
        titlePrefix={t("marketing.home.titlePrefix")}
        titleAccent={(
          <span style={{ display: "flex" }}>
            {t("marketing.home.titleAccent")}
          </span>
        )}
        titleSuffix={t("marketing.home.titleSuffix")}
        description={t("marketing.home.description")}
        primaryAction={{
          label: t("marketing.home.primaryAction"),
          href: "/kontak",
          icon: <Icon type="ArrowRightOutlined" />,
          type: "primary",
        }}
        secondaryAction={{
          label: t("marketing.home.secondaryAction"),
          href: "/tentang-kami",
          icon: <Icon type="EyeOutlined" />,
        }}
        pagerItems={["01", "02", "03"]}
        pagerLabel={t("marketing.home.pagerLabel")}
        highlights={[
          {
            title: t("marketing.home.highlights.innovative.title"),
            description: t("marketing.home.highlights.innovative.description"),
          },
          {
            title: t("marketing.home.highlights.trusted.title"),
            description: t("marketing.home.highlights.trusted.description"),
          },
          {
            title: t("marketing.home.highlights.sustainable.title"),
            description: t("marketing.home.highlights.sustainable.description"),
          },
        ]}
        sloganLines={[
          t("marketing.home.sloganLine1"),
          t("marketing.home.sloganLine2"),
        ]}
      />

      <MarketingSection>
        <div className={styles.sectionHead}>
          <div>
            <Text className={styles.sectionKicker}>{t("marketing.home.services.kicker")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.home.services.title")}
            </Title>
          </div>
          <Button type="link" className={styles.sectionLink} href="/layanan" icon={<Icon type="ArrowRightOutlined" />}>
            {t("marketing.home.services.link")}
          </Button>
        </div>

        <Row gutter={[16, 16]} className={styles.servicesGrid}>
          {serviceCards.map((card) => (
            <Col xs={24} lg={8} key={card.code}>
              <article className={styles.serviceCard}>
                <span className={styles.serviceBadge}>{card.code}</span>
                <div className={styles.serviceIcon}>
                  <Icon type={card.icon} />
                </div>
                <Title level={3} className={styles.serviceTitle}>
                  {t(card.titleKey)}
                </Title>
                <Text className={styles.serviceDesc}>{t(card.descriptionKey)}</Text>
                <div className={styles.serviceAction}>
                  {t("marketing.home.services.learnMore")} <Icon type="ArrowRightOutlined" />
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection>
        <div className={styles.aboutWrap}>
          <div className={styles.aboutMedia}>
            <Image
              src="/images/sample/05_monitoring_produksi.jpg"
              fill
              alt={t("marketing.home.about.imageAlt")}
              className={styles.aboutImage}
            />
            <div className={styles.aboutPanel}>
              <Text style={{ display: "block", color: "rgba(255,255,255,.72)", fontSize: 12 }}>{t("marketing.home.about.panelLabel")}</Text>
              <Title level={4} style={{ margin: "6px 0 0", color: "#fff" }}>
                {t("marketing.home.about.panelTitle")}
              </Title>
            </div>
          </div>

          <div>
            <Text className={styles.sectionKicker}>{t("marketing.home.about.kicker")}</Text>
            <Title level={2} className={styles.aboutTitle}>
              {t("marketing.home.about.title")}
            </Title>
            <Text className={styles.aboutDesc}>
              {t("marketing.home.about.description")}
            </Text>
            <Button type="primary" href="/tentang-kami" icon={<Icon type="ArrowRightOutlined" />}>
              {t("marketing.home.about.action")}
            </Button>

            <div style={{ height: 24 }} />

            <div className={styles.statsGrid}>
              {heroStats.map(({ id, value, label }) => (
                <div key={id} className={styles.statCard}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className={styles.sectionHead}>
          <div>
            <Text className={styles.sectionKicker}>{t("marketing.home.industries.kicker")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.home.industries.title")}
            </Title>
          </div>
          <Button type="link" className={styles.sectionLink} href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
            {t("marketing.home.industries.link")}
          </Button>
        </div>

        <div className={styles.industryGrid}>
          {industries.map((item) => (
            <div className={styles.industryCard} key={item.titleKey}>
              <Image
                src={item.image}
                fill
                alt={t(item.titleKey)}
                className={styles.industryImage}
              />
              <div className={styles.industryShade} />
              <div className={styles.industryText}>{t(item.titleKey)}</div>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className={styles.sectionHead}>
          <div>
            <Text className={styles.sectionKicker}>{t("marketing.home.projects.kicker")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.home.projects.title")}
            </Title>
          </div>
          <Button type="link" className={styles.sectionLink} href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
            {t("marketing.home.projects.link")}
          </Button>
        </div>

        <div className={styles.projectGrid}>
          {projectCards.map((project) => (
            <article key={project.titleKey} className={styles.projectCard}>
              <div className={styles.projectImageWrap}>
                <Image src={project.image} fill alt={t(project.titleKey)} className={styles.projectImage} />
              </div>
              <div className={styles.projectBody}>
                <Title level={4} style={{ margin: 0 }}>
                  {t(project.titleKey)}
                </Title>
                <Text style={{ display: "block", marginTop: 8, color: "#4b5563", lineHeight: 1.7 }}>
                  {t(project.descriptionKey)}
                </Text>
                <div className={styles.tagRow}>
                  {project.tagKeys.map((tagKey) => (
                    <span key={tagKey} className={styles.tag}>
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className={styles.sectionHead}>
          <div>
            <Text className={styles.sectionKicker}>{t("marketing.home.clients.kicker")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.home.clients.title")}
            </Title>
          </div>
          <Button type="link" className={styles.sectionLink} href="/tentang-kami" icon={<Icon type="ArrowRightOutlined" />}>
            {t("marketing.home.clients.link")}
          </Button>
        </div>

        <div className={styles.clientsGrid}>
          {clientLogos.map((client) => (
            <div key={client} className={styles.clientCard}>
              {client}
            </div>
          ))}
        </div>
      </MarketingSection>
    </main>
  );
}
