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

const solutionAreas = [
  {
    title: "Solusi E-Commerce",
    description: "Platform perdagangan digital yang aman, scalable, dan mudah dikelola.",
    icon: "ShoppingCartOutlined",
  },
  {
    title: "Sistem Informasi Kustom",
    description: "Aplikasi web & mobile sesuai proses bisnis unik Anda.",
    icon: "CodeOutlined",
  },
  {
    title: "Solusi Cloud & Infrastruktur",
    description: "Arsitektur cloud, migrasi, dan pengelolaan infrastruktur modern.",
    icon: "CloudOutlined",
  },
  {
    title: "Internet of Things (IoT)",
    description: "Solusi IoT untuk monitoring, otomasi, dan efisiensi operasional.",
    icon: "WifiOutlined",
  },
  {
    title: "Keamanan Siber",
    description: "Perlindungan sistem, data, dan infrastruktur dari ancaman digital.",
    icon: "SafetyOutlined",
  },
  {
    title: "Data & Kecerdasan Buatan",
    description: "Pemanfaatan data untuk insight bisnis yang lebih cerdas.",
    icon: "BarChartOutlined",
  },
  {
    title: "Integrasi Sistem",
    description: "Menghubungkan berbagai sistem untuk alur kerja yang efisien.",
    icon: "ApiOutlined",
  },
  {
    title: "Konsultasi & Manajemen TI",
    description: "Perencanaan, audit, dan pengelolaan fasilitas TI Anda.",
    icon: "TeamOutlined",
  },
] as const;

const industries = [
  { title: "E-Commerce & Retail", description: "Platform digital untuk pertumbuhan penjualan.", image: "/images/ilustrations/Salon_Interior.png" },
  { title: "Pendidikan", description: "Solusi teknologi untuk ekosistem belajar modern.", image: "/images/ilustrations/Coding_Workspace.png" },
  { title: "Kesehatan", description: "Sistem informasi untuk layanan kesehatan yang lebih baik.", image: "/images/ilustrations/Office_Call.png" },
  { title: "Manufaktur & Distribusi", description: "Otomasi dan integrasi untuk rantai pasok yang efisien.", image: "/images/ilustrations/Vistara_Office_Reception_1.png" },
  { title: "Keuangan", description: "Sistem digital untuk layanan keuangan yang aman dan andal.", image: "/images/ilustrations/Vistara_Office_Reception_2.png" },
  { title: "Pemerintahan", description: "Transformasi digital untuk layanan publik yang lebih transparan.", image: "/images/ilustrations/Salon_Interior.png" },
] as const;

const caseStudies = [
  { tag: "E-Commerce", title: "Marketplace Pertanian Digital", description: "Menghubungkan petani lokal dengan jaringan pasok yang lebih luas melalui platform digital.", image: "/images/ilustrations/Salon_Interior.png" },
  { tag: "Manufaktur", title: "Sistem Monitoring Produksi", description: "Solusi IoT untuk pemantauan mesin dan peningkatan efisiensi produksi.", image: "/images/ilustrations/Coding_Workspace.png" },
  { tag: "Pemerintahan", title: "Portal Layanan Publik", description: "Platform layanan publik terpadu untuk meningkatkan akses dan transparansi.", image: "/images/ilustrations/Office_Call.png" },
] as const;

const processSteps = [
  { number: "01", title: "Diskusi Awal", description: "Memahami kebutuhan dan tantangan Anda." },
  { number: "02", title: "Analisis & Perancangan", description: "Menyusun solusi dan arsitektur terbaik." },
  { number: "03", title: "Pengembangan", description: "Membangun solusi dengan standar kualitas tinggi." },
  { number: "04", title: "Implementasi", description: "Deploy dan integrasi ke lingkungan Anda." },
  { number: "05", title: "Dukungan Berkelanjutan", description: "Monitoring, pemeliharaan, dan pengembangan lebih lanjut." },
] as const;

const faqItems = [
  "Apakah solusi dapat disesuaikan dengan kebutuhan bisnis kami?",
  "Berapa lama waktu implementasi solusi?",
  "Apakah Vistara menyediakan pelatihan untuk tim kami?",
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
    min-height: 420px;
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
    width: min(50vw, 620px);
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
  featurePills: css`
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `,
  featurePill: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.92);
    font-size: 13px;
    font-weight: 700;
  `,
  featurePillIcon: css`
    color: #67b0ff;
    font-size: 14px;
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
  linkButton: css`
    justify-self: end;
    color: #1e66d4 !important;
    font-size: 12px !important;
    font-weight: 800 !important;
  `,
  solutionCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);
    transition: box-shadow 0.25s ease, transform 0.25s ease;

    &:hover {
      box-shadow: 0 14px 36px rgba(12, 24, 48, 0.1);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 22px !important;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `,
  solutionIcon: css`
    display: grid;
    width: 50px;
    height: 50px;
    place-items: center;
    border-radius: 14px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 24px;
  `,
  solutionTitle: css`
    margin: 14px 0 6px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  solutionDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
    flex: 1;
  `,
  solutionLink: css`
    margin-top: 14px !important;
    color: #1e66d4 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  `,
  industryCard: css`
    position: relative;
    min-height: 240px;
    overflow: hidden;
    border: 0;
    border-radius: 18px;
    background: #0b1532;
    box-shadow: 0 12px 32px rgba(7, 18, 36, 0.12);

    :global(.ant-card-body) {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 !important;
    }
  `,
  industryImage: css`
    object-fit: cover;
    object-position: center;
    opacity: 0.55;
    filter: saturate(0.85) contrast(1.04);
    transition: opacity 0.3s ease;
  `,
  industryOverlay: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(11, 21, 50, 0) 40%, rgba(11, 21, 50, 0.88) 100%);
  `,
  industryContent: css`
    position: relative;
    z-index: 1;
    padding: 18px 20px;
    color: #fff;
  `,
  industryTitle: css`
    margin: 0 !important;
    color: #fff !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  industryDescription: css`
    margin: 4px 0 0 !important;
    color: rgba(255, 255, 255, 0.75) !important;
    font-size: 12px !important;
    line-height: 1.55 !important;
  `,
  caseStudyCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 10px 28px rgba(12, 24, 48, 0.05);
    transition: box-shadow 0.25s ease, transform 0.25s ease;

    &:hover {
      box-shadow: 0 16px 40px rgba(12, 24, 48, 0.1);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  caseStudyImage: css`
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  `,
  caseStudyImg: css`
    object-fit: cover;
    object-position: center;
  `,
  caseStudyTag: css`
    position: absolute;
    top: 14px;
    left: 14px;
    display: inline-flex;
    min-height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94);
    color: #1e66d4;
    font-size: 11px;
    font-weight: 800;
    z-index: 1;
  `,
  caseStudyBody: css`
    padding: 18px 20px;
  `,
  caseStudyTitle: css`
    margin: 0 0 6px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  caseStudyDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  `,
  processSection: css`
    padding-block: 72px;
    background: #f6f8fc;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  processTrack: css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0;
    margin-top: 40px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
  `,
  processStep: css`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 10px;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 28px;
      right: -10%;
      width: 20%;
      height: 2px;
      background: #d0dbed;
      z-index: 0;

      @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
        display: none;
      }
    }
  `,
  processArrow: css`
    position: absolute;
    top: 20px;
    right: -8%;
    color: #b0c0d8;
    font-size: 18px;
    z-index: 1;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      display: none;
    }
  `,
  processCircle: css`
    position: relative;
    z-index: 1;
    display: grid;
    width: 56px;
    height: 56px;
    place-items: center;
    border-radius: 50%;
    background: linear-gradient(135deg, #1677ff 0%, #0958d9 100%);
    color: #fff;
    font-size: 18px;
    font-weight: 850;
    box-shadow: 0 8px 20px rgba(22, 119, 255, 0.28);
  `,
  processTitle: css`
    margin: 14px 0 4px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  processDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.65 !important;
    max-width: 180px;
  `,
  cta: css`
    padding-block: 0 70px;
  `,
  ctaCard: css`
    overflow: hidden;
    border: 0;
    border-radius: 22px;
    background: linear-gradient(135deg, #0a1e3d 0%, #0d2b5e 48%, #1677ff 100%);
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    font-size: 14px;
    font-weight: 700;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Corporate_Cloud_Network.png"
        backgroundAlt="Solusi Vistara"
        eyebrow={t("marketing.solutions.eyebrow")}
        titlePrefix={<><span>Teknologi untuk</span><br /></>}
        titleAccent={<strong>Tantangan Nyata</strong>}
        titleSuffix={null}
        description={t("marketing.solutions.description")}
        primaryAction={{ label: t("marketing.solutions.ctaPrimary"), href: "#solusi", icon: <Icon type="ArrowRightOutlined" /> }}
        secondaryAction={{ label: t("marketing.solutions.ctaSecondary"), href: "#studi-kasus", icon: <Icon type="ArrowRightOutlined" /> }}
        afterActions={
          <div className={styles.featurePills}>
            {[
              t("marketing.solutions.features.endToEnd"),
              t("marketing.solutions.features.industry"),
              t("marketing.solutions.features.trusted"),
              t("marketing.solutions.features.support"),
            ].map((label) => (
              <span key={label} className={styles.featurePill}>
                <Icon type="CheckCircleOutlined" className={styles.featurePillIcon} />
                {label}
              </span>
            ))}
          </div>
        }
        visual={
          <div className={styles.introVisual}>
            <div className={styles.introBadge}>
              <span className={styles.introBadgeTitle}>Ideas</span>
              <span className={styles.introBadgeTitle}>Into Impact</span>
              <span className={styles.introBadgeText}>Menghubungkan Teknologi, Manusia, dan Peluang Baru.</span>
            </div>
          </div>
        }
      />

      {/* ── Solution Areas ── */}
      <MarketingSection>
        <Flex align="center" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text className={styles.sectionLabel}>{t("marketing.solutions.areas.label")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.solutions.areas.title")}
            </Title>
            <Paragraph className={styles.sectionDescription}>
              {t("marketing.solutions.areas.description")}
            </Paragraph>
          </div>
          <Button type="link" href="#" className={styles.linkButton}>
            {t("marketing.solutions.areas.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>

        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          {solutionAreas.map((item) => (
            <Col xs={24} sm={12} lg={6} key={item.title}>
              <Card className={styles.solutionCard}>
                <Flex vertical>
                  <span className={styles.solutionIcon}>
                    <Icon type={item.icon as IconName} />
                  </span>
                  <Title level={3} className={styles.solutionTitle}>
                    {item.title}
                  </Title>
                  <Paragraph className={styles.solutionDescription}>
                    {item.description}
                  </Paragraph>
                  <Button type="link" className={styles.solutionLink}>
                    Pelajari Solusi <Icon type="ArrowRightOutlined" />
                  </Button>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      {/* ── Industries ── */}
      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>{t("marketing.solutions.industries.label")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.solutions.industries.title")}
        </Title>
        <Flex justify="flex-end" style={{ marginTop: -24 }}>
          <Button type="link" href="#" className={styles.linkButton}>
            {t("marketing.solutions.industries.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>

        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          {industries.map((item) => (
            <Col xs={24} sm={12} lg={4} key={item.title}>
              <Card className={styles.industryCard}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 991px) 50vw, 16vw"
                  className={styles.industryImage}
                />
                <div className={styles.industryOverlay} />
                <div className={styles.industryContent}>
                  <Title level={4} className={styles.industryTitle}>
                    {item.title}
                  </Title>
                  <Paragraph className={styles.industryDescription}>
                    {item.description}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      {/* ── Case Studies ── */}
      <MarketingSection className={styles.section}>
        <Flex align="center" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text className={styles.sectionLabel}>{t("marketing.solutions.caseStudy.label")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.solutions.caseStudy.title")}
            </Title>
          </div>
          <Button type="link" href="#" className={styles.linkButton}>
            {t("marketing.solutions.caseStudy.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>

        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          {caseStudies.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.title}>
              <Card className={styles.caseStudyCard}>
                <div className={styles.caseStudyImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 991px) 50vw, 33vw"
                    className={styles.caseStudyImg}
                  />
                  <span className={styles.caseStudyTag}>{item.tag}</span>
                </div>
                <div className={styles.caseStudyBody}>
                  <Title level={3} className={styles.caseStudyTitle}>
                    {item.title}
                  </Title>
                  <Paragraph className={styles.caseStudyDescription}>
                    {item.description}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      {/* ── Process ── */}
      <section className={styles.processSection}>
        <MarketingContainer>
          <div style={{ textAlign: "center" }}>
            <Text className={styles.sectionLabel}>{t("marketing.solutions.process.label")}</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.solutions.process.title")}
            </Title>
            <Paragraph
              className={styles.sectionDescription}
              style={{ maxWidth: 640, marginInline: "auto" }}
            >
              {t("marketing.solutions.process.description")}
            </Paragraph>
          </div>

          <div className={styles.processTrack}>
            {processSteps.map((step, index) => (
              <div className={styles.processStep} key={step.number}>
                <span className={styles.processCircle}>{step.number}</span>
                {index < processSteps.length - 1 && (
                  <Icon type="ArrowRightOutlined" className={styles.processArrow} />
                )}
                <Title level={4} className={styles.processTitle}>
                  {step.title}
                </Title>
                <Paragraph className={styles.processDescription}>
                  {step.description}
                </Paragraph>
              </div>
            ))}
          </div>
        </MarketingContainer>
      </section>

      {/* ── CTA Banner ── */}
      <MarketingSection className={styles.cta}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionLabel} style={{ color: "#9fc5ff" }}>
              {t("marketing.solutions.cta.label")}
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              {t("marketing.solutions.cta.title")}
            </Title>
            <Paragraph className={styles.ctaDescription}>
              {t("marketing.solutions.cta.description")}
            </Paragraph>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" href="/kontak">
                {t("marketing.solutions.cta.primaryAction")} <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/kontak">{t("marketing.solutions.cta.secondaryAction")}</Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>

      {/* ── FAQ ── */}
      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>{t("marketing.solutions.faq.label")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("marketing.solutions.faq.title")}
        </Title>
        <Flex justify="flex-end" style={{ marginTop: -24 }}>
          <Button type="link" href="#" className={styles.linkButton}>
            {t("marketing.solutions.faq.viewAll")} <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>
        <div className={styles.faqGrid} style={{ marginTop: 32 }}>
          {faqItems.map((item) => (
            <div className={styles.faqItem} key={item}>
              <Flex justify="space-between" align="center" gap={12}>
                <span>{item}</span>
                <Icon type="PlusOutlined" />
              </Flex>
            </div>
          ))}
        </div>
      </MarketingSection>
    </main>
  );
}
