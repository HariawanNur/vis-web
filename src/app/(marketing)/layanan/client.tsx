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
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;

const mainServices = [
  {
    title: "Pengembangan Aplikasi E-Commerce",
    kbl: "KBLI 62191",
    description:
      "Membangun platform perdagangan digital yang aman, scalable, dan berorientasi pada pertumbuhan bisnis Anda.",
    icon: "ShoppingCartOutlined",
  },
  {
    title: "Pengembangan Aplikasi & Sistem Khusus",
    kbl: "KBLI 62199",
    description:
      "Solusi perangkat lunak untuk kebutuhan bisnis spesifik, integrasi sistem, IoT, cybersecurity, dan aplikasi khusus lainnya.",
    icon: "CodeOutlined",
  },
  {
    title: "Konsultansi Komputer & Manajemen TI",
    kbl: "KBLI 62209",
    description:
      "Konsultansi teknologi, perencanaan sistem, manajemen infrastruktur, keamanan, dan pengelolaan fasilitas komputer.",
    icon: "TeamOutlined",
  },
] as const;

const supportingServices = [
  { title: "Pengembangan Web & Mobile", icon: "MobileOutlined" },
  { title: "Integrasi Sistem", icon: "ApiOutlined" },
  { title: "Internet of Things (IoT)", icon: "WifiOutlined" },
  { title: "Keamanan Siber (Cybersecurity)", icon: "SafetyOutlined" },
  { title: "Data & Cloud Solution", icon: "CloudOutlined" },
  { title: "Pemeliharaan & Dukungan Teknis", icon: "ToolOutlined" },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Analisis Kebutuhan",
    description: "Memahami tujuan, tantangan, dan kebutuhan bisnis Anda.",
  },
  {
    number: "02",
    title: "Perancangan Solusi",
    description: "Menyusun arsitektur dan roadmap yang tepat.",
  },
  {
    number: "03",
    title: "Pengembangan & Implementasi",
    description: "Membangun solusi dengan standar kualitas tinggi.",
  },
  {
    number: "04",
    title: "Pengujian & Evaluasi",
    description: "Memastikan solusi berjalan optimal dan aman.",
  },
  {
    number: "05",
    title: "Dukungan Berkelanjutan",
    description: "Mendampingi pertumbuhan bisnis Anda.",
  },
] as const;

const industries = [
  { title: "E-Commerce & Retail", image: "/images/ilustrations/Salon_Interior.png" },
  { title: "Pendidikan", image: "/images/ilustrations/Coding_Workspace.png" },
  { title: "Kesehatan", image: "/images/ilustrations/Office_Call.png" },
  {
    title: "Manufaktur & Distribusi",
    image: "/images/ilustrations/Vistara_Office_Reception_1.png",
  },
  {
    title: "Keuangan",
    image: "/images/ilustrations/Vistara_Office_Reception_2.png",
  },
  { title: "Pemerintahan", image: "/images/ilustrations/Salon_Interior.png" },
] as const;

const faqs = [
  "Layanan apa saja yang ditawarkan oleh Vistara?",
  "Berapa lama waktu pengembangan aplikasi?",
  "Apakah Vistara menyediakan dukungan setelah implementasi?",
] as const;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,
  intro: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: linear-gradient(135deg, #0a1e3d 0%, #0d2b5e 50%, #0e3470 100%);
  `,
  introInner: css`
    position: relative;
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
  introDescription: css`
    max-width: 600px;
    margin: 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 16px !important;
    line-height: 1.75 !important;
  `,
  introFeatures: css`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `,
  featurePill: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 32px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(232, 240, 255, 0.92);
    font-size: 12px;
    font-weight: 700;
  `,
  featurePillIcon: css`
    color: #67b0ff;
    font-size: 12px;
  `,
  introActions: css`
    margin-top: 24px;

    .ant-btn {
      height: 46px;
      padding-inline: 22px;
      font-weight: 700;
    }
  `,
  introVisual: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(52vw, 690px);
    height: 100%;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      width: 100%;
      min-height: 340px;
      margin-top: 26px;
    }
  `,
  introImage: css`
    object-fit: cover;
    object-position: center;
  `,
  introShade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(6, 32, 63, 0.96) 0%,
      rgba(6, 32, 63, 0.58) 52%,
      rgba(6, 32, 63, 0.08) 100%
    );
  `,
  introBadge: css`
    position: absolute;
    right: 22px;
    bottom: 24px;
    width: 180px;
    padding: 16px 18px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    background: rgba(245, 251, 255, 0.96);
    color: #0b1532;
    box-shadow: 0 18px 42px rgba(3, 14, 32, 0.22);
  `,
  introBadgeTitle: css`
    display: block;
    color: #1e66d4;
    font-size: 17px;
    font-weight: 800;
    line-height: 1.15;
  `,
  introBadgeText: css`
    display: block;
    margin-top: 4px;
    color: #37506f;
    font-size: 12px;
    line-height: 1.45;
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
  mainServiceCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);
    transition: box-shadow 0.2s, transform 0.2s;

    :global(.ant-card-body) {
      padding: 28px !important;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    &:hover {
      box-shadow: 0 14px 36px rgba(12, 24, 48, 0.1);
      transform: translateY(-2px);
    }
  `,
  mainServiceIcon: css`
    display: grid;
    width: 56px;
    height: 56px;
    place-items: center;
    border-radius: 16px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 28px;
    margin-bottom: 16px;
  `,
  mainServiceKbl: css`
    display: inline-block;
    margin-bottom: 8px;
    padding: 3px 10px;
    border-radius: 999px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.02em;
  `,
  mainServiceTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 18px !important;
    font-weight: 800 !important;
  `,
  mainServiceDesc: css`
    flex: 1;
    margin-top: 8px !important;
    color: #4d5b78 !important;
    font-size: 14px !important;
    line-height: 1.7 !important;
  `,
  mainServiceLink: css`
    margin-top: 16px !important;
    color: #1e66d4 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    width: fit-content !important;
  `,
  supportingGrid: css`
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 16px;
    margin-top: 32px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
  supportingCard: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 22px 12px;
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(12, 24, 48, 0.03);
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover {
      box-shadow: 0 8px 20px rgba(12, 24, 48, 0.08);
      transform: translateY(-2px);
    }
  `,
  supportingIcon: css`
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 13px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 22px;
    margin-bottom: 10px;
  `,
  supportingTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    line-height: 1.35 !important;
  `,
  processWrapper: css`
    margin-top: 40px;
  `,
  processRow: css`
    display: flex;
    align-items: flex-start;
    gap: 0;
    justify-content: center;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }
  `,
  processStep: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 0 0 auto;
    width: 180px;
    position: relative;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      width: calc(50% - 8px);
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      width: 100%;
    }
  `,
  processArrow: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 40px;
    height: 120px;
    color: #b0c4de;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      display: none;
    }
  `,
  processNumber: css`
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e66d4 0%, #0d47a1 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 850;
    margin-bottom: 14px;
  `,
  processTitle: css`
    margin: 0 0 6px !important;
    color: #0b1532 !important;
    font-size: 14px !important;
    font-weight: 800 !important;
  `,
  processDesc: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 12px !important;
    line-height: 1.6 !important;
    max-width: 160px;
  `,
  processCta: css`
    margin-top: 32px;
  `,
  industryCard: css`
    position: relative;
    min-height: 220px;
    overflow: hidden;
    border: 0;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(7, 18, 36, 0.1);

    :global(.ant-card-body) {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      padding: 18px !important;
      color: #fff;
    }
  `,
  industryImage: css`
    object-fit: cover;
    object-position: center;
    opacity: 0.65;
    filter: saturate(0.85) contrast(1.04);
  `,
  industryShade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.05) 60%);
  `,
  industryTitle: css`
    position: relative;
    z-index: 1;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
  `,
  caseStudyCard: css`
    overflow: hidden;
    border: 1px solid #dfe6f1;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 10px 28px rgba(12, 24, 48, 0.06);
  `,
  caseStudyBody: css`
    display: flex;
    gap: 0;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      flex-direction: column;
    }
  `,
  caseStudyImage: css`
    flex: 0 0 420px;
    position: relative;
    overflow: hidden;
    background: #e8f0fe;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      flex: none;
      height: 260px;
    }
  `,
  caseStudyImg: css`
    object-fit: cover;
    object-position: center;
  `,
  caseStudyTag: css`
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 1;
    padding: 4px 12px;
    border-radius: 999px;
    background: #1e66d4;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
  `,
  caseStudyContent: css`
    flex: 1;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 24px;
    }
  `,
  caseStudyTitle: css`
    margin: 0 0 10px !important;
    color: #0b1532 !important;
    font-size: clamp(22px, 2.4vw, 30px) !important;
    font-weight: 850 !important;
    line-height: 1.12 !important;
    letter-spacing: -0.03em;
  `,
  caseStudyDesc: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 14px !important;
    line-height: 1.75 !important;
  `,
  caseStudyAction: css`
    margin-top: 20px !important;
  `,
  ctaBanner: css`
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
    padding: 36px;
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
  faqGrid: css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  faqItem: css`
    padding: 16px 18px;
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    color: #0b1532;
    font-size: 13px;
    font-weight: 700;
  `,
  viewAllLink: css`
    color: #1e66d4 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Coding_Workspace.png"
        backgroundAlt="Solusi Teknologi Vistara"
        eyebrow={t("marketing.services.eyebrow")}
        titlePrefix={<span>Solusi Teknologi </span>}
        titleAccent={<strong>untuk Pertumbuhan Anda</strong>}
        titleSuffix={null}
        description={t("marketing.services.description")}
        primaryAction={{ label: t("marketing.services.ctaPrimary"), href: "#konsultasi", icon: <Icon type="ArrowRightOutlined" /> }}
        secondaryAction={{ label: t("marketing.services.ctaSecondary"), href: "#kontak", icon: <Icon type="ArrowRightOutlined" /> }}
        visual={
          <div className={styles.introVisual}>
            <Image
              src="/images/ilustrations/Coding_Workspace.png"
              alt="Solusi Teknologi Vistara"
              fill
              priority
              sizes="(max-width: 991px) 100vw, 52vw"
              className={styles.introImage}
            />
            <div className={styles.introShade} />
            <div className={styles.introBadge}>
              <span className={styles.introBadgeTitle}>Ideas</span>
              <span className={styles.introBadgeTitle}>Into Impact</span>
              <span className={styles.introBadgeText}>
                Mengubah gagasan menjadi dampak nyata bagi bisnis Anda.
              </span>
            </div>
          </div>
        }
      />

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>
          {t("marketing.services.main.label")}
        </Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.services.main.title")}
        </Title>
        <Paragraph className={styles.sectionDescription} style={{ maxWidth: 720 }}>
          {t("marketing.services.main.description")}
        </Paragraph>
        <Row gutter={[20, 20]} style={{ marginTop: 32 }}>
          {mainServices.map((service) => (
            <Col xs={24} lg={8} key={service.kbl}>
              <Card className={styles.mainServiceCard}>
                <span className={styles.mainServiceIcon}>
                  <Icon type={service.icon as IconName} />
                </span>
                <span className={styles.mainServiceKbl}>{service.kbl}</span>
                <Title level={3} className={styles.mainServiceTitle}>
                  {service.title}
                </Title>
                <Paragraph className={styles.mainServiceDesc}>
                  {service.description}
                </Paragraph>
                <Button type="link" className={styles.mainServiceLink}>
                  {t("common.learnMore")} <Icon type="ArrowRightOutlined" />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>
          {t("marketing.services.supporting.label")}
        </Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.services.supporting.title")}
        </Title>
        <div className={styles.supportingGrid}>
          {supportingServices.map((item) => (
            <div className={styles.supportingCard} key={item.title}>
              <span className={styles.supportingIcon}>
                <Icon type={item.icon as IconName} />
              </span>
              <Title level={4} className={styles.supportingTitle}>
                {item.title}
              </Title>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>
          {t("marketing.services.process.label")}
        </Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.services.process.title")}
        </Title>
        <Paragraph className={styles.sectionDescription} style={{ maxWidth: 720 }}>
          {t("marketing.services.process.description")}
        </Paragraph>
        <div className={styles.processWrapper}>
          <div className={styles.processRow}>
            {processSteps.map((step, index) => (
              <div key={step.number} style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.processStep}>
                  <span className={styles.processNumber}>{step.number}</span>
                  <Title level={4} className={styles.processTitle}>
                    {step.title}
                  </Title>
                  <Paragraph className={styles.processDesc}>
                    {step.description}
                  </Paragraph>
                </div>
                {index < processSteps.length - 1 && (
                  <div className={styles.processArrow}>
                    <Icon type="RightOutlined" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Flex className={styles.processCta} justify="center">
          <Button type="primary" href="#kontak" icon={<Icon type="ArrowRightOutlined" />}>
            {t("marketing.services.process.cta")}
          </Button>
        </Flex>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>
          {t("marketing.services.industries.label")}
        </Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.services.industries.title")}
        </Title>
        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          {industries.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.title}>
              <Card className={styles.industryCard}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 991px) 50vw, 33vw"
                  className={styles.industryImage}
                />
                <div className={styles.industryShade} />
                <span className={styles.industryTitle}>{item.title}</span>
              </Card>
            </Col>
          ))}
        </Row>
        <Flex justify="center" style={{ marginTop: 24 }}>
          <Button type="link" className={styles.viewAllLink}>
            {t("marketing.services.industries.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>
          {t("marketing.services.caseStudy.label")}
        </Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.services.caseStudy.title")}
        </Title>
        <Paragraph className={styles.sectionDescription}>
          {t("marketing.services.caseStudy.description")}
        </Paragraph>
        <Card className={styles.caseStudyCard} style={{ marginTop: 32 }}>
          <div className={styles.caseStudyBody}>
            <div className={styles.caseStudyImage}>
              <Image
                src="/images/ilustrations/Salon_Interior.png"
                alt={t("marketing.services.caseStudy.featured.title")}
                fill
                sizes="(max-width: 991px) 100vw, 420px"
                className={styles.caseStudyImg}
              />
              <span className={styles.caseStudyTag}>
                {t("marketing.services.caseStudy.featured.tag")}
              </span>
            </div>
            <div className={styles.caseStudyContent}>
              <Title level={3} className={styles.caseStudyTitle}>
                {t("marketing.services.caseStudy.featured.title")}
              </Title>
              <Paragraph className={styles.caseStudyDesc}>
                {t("marketing.services.caseStudy.featured.description")}
              </Paragraph>
              <Button
                type="primary"
                className={styles.caseStudyAction}
                icon={<Icon type="ArrowRightOutlined" />}
              >
                {t("marketing.services.caseStudy.featured.viewDetail")}
              </Button>
            </div>
          </div>
        </Card>
        <Flex justify="center" style={{ marginTop: 24 }}>
          <Button type="link" className={styles.viewAllLink}>
            {t("marketing.services.caseStudy.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>
      </MarketingSection>

      <MarketingSection className={styles.ctaBanner}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionLabel} style={{ color: "#9fc5ff" }}>
              {t("marketing.services.cta.label")}
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              {t("marketing.services.cta.title")}
            </Title>
            <Paragraph className={styles.ctaDescription}>
              {t("marketing.services.cta.description")}
            </Paragraph>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" href="#kontak">
                {t("marketing.services.cta.action")} <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/kontak">{t("marketing.services.ctaSecondary")}</Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>
          {t("marketing.services.faq.label")}
        </Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.services.faq.title")}
        </Title>
        <div className={styles.faqGrid} style={{ marginTop: 24 }}>
          {faqs.map((item) => (
            <div className={styles.faqItem} key={item}>
              <Flex justify="space-between" align="center" gap={12}>
                <span>{item}</span>
                <Icon type="PlusOutlined" />
              </Flex>
            </div>
          ))}
        </div>
        <Flex justify="center" style={{ marginTop: 24 }}>
          <Button type="link" className={styles.viewAllLink}>
            {t("marketing.services.faq.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>
      </MarketingSection>
    </main>
  );
}
