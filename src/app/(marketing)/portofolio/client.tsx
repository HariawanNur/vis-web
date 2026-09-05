"use client";

import Image from "next/image";
import { useState } from "react";

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

const projects = [
  {
    title: "Marketplace Pertanian Digital",
    tag: "E-Commerce",
    description:
      "Platform perdagangan hasil pertanian lokal yang menghubungkan petani dengan pasar lebih luas.",
    image: "/images/sample/09_tanihub_marketplace.jpg",
  },
  {
    title: "Sistem Manajemen Rumah Sakit",
    tag: "Sistem Informasi",
    description:
      "Solusi digital untuk manajemen pasien, rekam medis, dan operasional rumah sakit.",
    image: "/images/sample/02_sistem_informasi.jpg",
  },
  {
    title: "Migrasi Infrastruktur ke Cloud",
    tag: "Cloud & Infrastruktur",
    description:
      "Modernisasi infrastruktur TI dengan arsitektur cloud yang scalable, aman, dan efisien.",
    image: "/images/sample/03_cloud_infrastruktur.jpg",
  },
  {
    title: "Portal Layanan Publik",
    tag: "Pemerintahan",
    description:
      "Platform layanan publik terpadu untuk meningkatkan transparansi dan efisiensi pelayanan.",
    image: "/images/sample/04_portal_layanan_publik.jpg",
  },
  {
    title: "Monitoring Produksi Berbasis IoT",
    tag: "IoT",
    description:
      "Solusi IoT untuk pemantauan mesin dan optimasi proses produksi secara real-time.",
    image: "/images/sample/05_monitoring_produksi.jpg",
  },
  {
    title: "Audit & Penguatan Keamanan",
    tag: "Keamanan Siber",
    description:
      "Assessment keamanan, implementasi security best practice, dan monitoring berkelanjutan.",
    image: "/images/sample/06_audit_keamanan.jpg",
  },
  {
    title: "Platform Pembelajaran Digital",
    tag: "Pendidikan",
    description:
      "Ekosistem pembelajaran online untuk sekolah dan institusi pendidikan.",
    image: "/images/sample/07_pembelajaran_digital.jpg",
  },
  {
    title: "Sistem Analitik Keuangan",
    tag: "Keuangan",
    description:
      "Platform analitik dan pelaporan keuangan untuk pengambilan keputusan yang lebih cepat.",
    image: "/images/sample/08_analitik_keuangan.jpg",
  },
] as const;

const filterTabs = [
  "Semua",
  "E-Commerce",
  "Sistem Informasi",
  "Cloud & Infrastruktur",
  "IoT",
  "Keamanan Siber",
  "Pemerintahan",
  "Pendidikan",
  "Kesehatan",
] as const;

const stats = [
  { value: "50+", label: "Proyek Selesai" },
  { value: "30+", label: "Klien Puas" },
  { value: "10+", label: "Industri" },
] as const;

const caseStudyStats = [
  { value: "300% dalam 1 tahun", label: "Peningkatan transaksi" },
  { value: "10.000+ petani bergabung", label: "" },
  { value: "Cover area 34 provinsi", label: "" },
] as const;

const clientNames = [
  "TaniHub",
  "RS Sejahtera",
  "EduSmart",
  "Bank Nusantara",
  "Pemda Digital",
  "Industri Maju",
] as const;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,

  /* ── Hero ── */
  hero: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: linear-gradient(135deg, #0a1e3d 0%, #0d2b5e 50%, #0e3470 100%);
  `,
  introInner: css`
    position: relative;
    min-height: 400px;
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
  introVisual: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(48vw, 620px);
    height: 100%;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      width: 100%;
      min-height: 280px;
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

  introStatCard: css`
    position: absolute;
    right: 22px;
    top: 22px;
    width: 170px;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 18px;
    background: rgba(12, 23, 44, 0.72);
    backdrop-filter: blur(12px);
    color: #fff;
    box-shadow: 0 18px 42px rgba(3, 14, 32, 0.22);
  `,
  introStatItem: css`
    display: flex;
    align-items: flex-start;
    gap: 10px;

    &:not(:last-child) {
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  `,
  introStatValue: css`
    display: block;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.1;
  `,
  introStatLabel: css`
    display: block;
    color: rgba(255, 255, 255, 0.76);
    font-size: 11px;
    line-height: 1.35;
  `,
  introStatIcon: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex: 0 0 auto;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    color: #7db4ff;
  `,

  /* ── Stats bar ── */
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

  /* ── Section ── */
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

  /* ── Filter tabs ── */
  filterRow: css`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  filterTab: css`
    flex: 0 0 auto;
    min-height: 38px;
    padding: 0 18px;
    border: 1px solid #dfe6f1;
    border-radius: 999px;
    background: #fff;
    color: #4d5b78;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;

    &:hover {
      border-color: #1677ff;
      color: #1677ff;
    }
  `,
  filterTabActive: css`
    border-color: #1677ff;
    background: #1677ff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  `,

  /* ── Search bar ── */
  searchBar: css`
    display: grid;
    grid-template-columns: 1.4fr repeat(3, minmax(0, 1fr));
    gap: 10px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  searchInput: css`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    padding: 0 14px;
    border: 1px solid #dfe6f1;
    border-radius: 12px;
    background: #fff;
    color: #94a3b8;
    font-size: 13px;
  `,
  searchSelect: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 46px;
    padding: 0 14px;
    border: 1px solid #dfe6f1;
    border-radius: 12px;
    background: #fff;
    color: #4d5b78;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  `,

  /* ── Project grid ── */
  projectGrid: css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: ${designSystem.breakpoints.xl - 1}px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  projectCard: css`
    overflow: hidden;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);
    transition: box-shadow 0.25s ease, transform 0.25s ease;

    &:hover {
      box-shadow: 0 14px 36px rgba(12, 24, 48, 0.1);
      transform: translateY(-3px);
    }

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  projectImage: css`
    position: relative;
    width: 100%;
    height: 180px;
    overflow: hidden;
  `,
  projectImageImg: css`
    object-fit: cover;
    object-position: center;
  `,
  projectTag: css`
    position: absolute;
    top: 12px;
    left: 12px;
    display: inline-flex;
    align-items: center;
    min-height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(22, 119, 255, 0.9);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    backdrop-filter: blur(4px);
  `,
  projectBody: css`
    padding: 16px 18px 18px;
  `,
  projectTitle: css`
    margin: 0 0 6px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
    line-height: 1.3 !important;
  `,
  projectDescription: css`
    margin: 0 0 12px !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.65 !important;
  `,
  projectLink: css`
    color: #1e66d4 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    padding: 0 !important;
  `,

  /* ── Case study ── */
  caseStudySection: css`
    padding-block: 72px;
    background: #f7f9fc;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  caseStudyCard: css`
    overflow: hidden;
    border: 1px solid #dfe6f1;
    border-radius: 22px;
    background: #fff;
    box-shadow: 0 14px 40px rgba(12, 24, 48, 0.06);
  `,
  caseStudyImage: css`
    position: relative;
    width: 100%;
    min-height: 380px;
    overflow: hidden;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      min-height: 260px;
    }
  `,
  caseStudyImageImg: css`
    object-fit: cover;
    object-position: center;
  `,
  caseStudyPlay: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border-radius: 50%;
    background: rgba(22, 119, 255, 0.92);
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: translate(-50%, -50%) scale(1.08);
    }
  `,
  caseStudyBody: css`
    padding: 28px 32px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 22px 20px;
    }
  `,
  caseStudyTag: css`
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 12px;
    font-weight: 700;
  `,
  caseStudyTitle: css`
    margin: 12px 0 8px !important;
    color: #0b1532 !important;
    font-size: clamp(22px, 2.6vw, 30px) !important;
    line-height: 1.15 !important;
    letter-spacing: -0.03em;
    font-weight: 850 !important;
  `,
  caseStudyDescription: css`
    margin: 0 0 20px !important;
    color: #4d5b78 !important;
    font-size: 14px !important;
    line-height: 1.75 !important;
  `,
  caseStudyStats: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 24px;
    padding: 16px 0;
    border-top: 1px solid #edf1f7;
    border-bottom: 1px solid #edf1f7;
  `,
  caseStudyStatValue: css`
    display: block;
    color: #1e66d4;
    font-size: 16px;
    line-height: 1.2;
    font-weight: 850;
  `,
  caseStudyStatLabel: css`
    display: block;
    margin-top: 2px;
    color: #597091;
    font-size: 12px;
  `,
  caseStudyActions: css`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  `,
  caseStudyVideoLink: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #4d5b78 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    padding: 0 !important;

    &:hover {
      color: #1e66d4 !important;
    }
  `,

  /* ── Clients ── */
  clientsSection: css`
    padding-block: 72px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  clientsTrack: css`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 10px 0 20px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  clientCard: css`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 180px;
    min-height: 120px;
    padding: 20px;
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(12, 24, 48, 0.04);
    cursor: default;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 10px 28px rgba(12, 24, 48, 0.08);
    }
  `,
  clientIcon: css`
    display: grid;
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
    place-items: center;
    border-radius: 14px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 22px;
  `,
  clientName: css`
    color: #0b1532;
    font-size: 14px;
    font-weight: 800;
    text-align: center;
  `,

  /* ── CTA ── */
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
    padding: 36px 40px;
    color: #fff;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 28px 24px;
    }
  `,
  ctaLabel: css`
    display: block;
    color: #9fc5ff !important;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  ctaTitle: css`
    margin: 8px 0 8px !important;
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
  linkButton: css`
    color: #1e66d4 !important;
    font-size: 12px !important;
    font-weight: 800 !important;
  `,
}));

const clientIcons: IconName[] = [
  "ShoppingOutlined",
  "SafetyOutlined",
  "ReadOutlined",
  "BankOutlined",
  "GlobalOutlined",
  "ForkOutlined",
];

export default function Page() {
  const { styles, cx } = useStyles();
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="Portofolio Vistara"
        eyebrow={t("marketing.portfolio.eyebrow")}
        titlePrefix={<span>{t("marketing.portfolio.title")}</span>}
        titleAccent={<strong>Dampak Nyata</strong>}
        titleSuffix={null}
        description={t("marketing.portfolio.description")}
        visual={<div className={styles.introVisual}><div className={styles.introStatCard}><div className={styles.introStatItem}><span className={styles.introStatIcon}><Icon type="CheckCircleOutlined" /></span><span><span className={styles.introStatValue}>50+</span><span className={styles.introStatLabel}>Proyek Selesai</span></span></div><div className={styles.introStatItem}><span className={styles.introStatIcon}><Icon type="TeamOutlined" /></span><span><span className={styles.introStatValue}>30+</span><span className={styles.introStatLabel}>Klien Puas</span></span></div><div className={styles.introStatItem}><span className={styles.introStatIcon}><Icon type="AppstoreOutlined" /></span><span><span className={styles.introStatValue}>10+</span><span className={styles.introStatLabel}>Industri</span></span></div></div></div>}
      />

      <div className={styles.statsBar}>
          <MarketingContainer>
            <Row gutter={[0, 0]}>
              {stats.map((stat, index) => (
                <Col xs={24} sm={8} key={stat.label} className={styles.statItem}>
                  <span className={styles.statIcon}>
                    <Icon
                      type={
                        ["CheckCircleOutlined", "TeamOutlined", "AppstoreOutlined"][
                          index
                        ] as IconName
                      }
                    />
                  </span>
                  <Text className={styles.statValue}>{stat.value}</Text>
                  <Text className={styles.statLabel}>{stat.label}</Text>
                </Col>
              ))}
            </Row>
          </MarketingContainer>
        </div>
      {/* ─── Projects ─── */}
      <MarketingSection className={styles.section}>
        <Flex
          align="center"
          justify="space-between"
          gap={16}
          wrap="wrap"
          style={{ marginBottom: 24 }}
        >
          <div>
            <Text className={styles.sectionLabel}>Proyek Kami</Text>
            <Title level={2} className={styles.sectionTitle}>
              {t("marketing.portfolio.title")}
            </Title>
          </div>
          <Button type="link" href="#" className={styles.linkButton}>
            {t("marketing.portfolio.viewAllProjects")}{" "}
            <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>

        {/* Filter tabs */}
        <div className={styles.filterRow} style={{ marginBottom: 18 }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={cx(
                styles.filterTab,
                activeFilter === tab && styles.filterTabActive,
              )}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className={styles.searchBar} style={{ marginBottom: 24 }}>
          <div className={styles.searchInput}>
            <Icon type="SearchOutlined" />
            <span>{t("marketing.portfolio.searchPlaceholder")}</span>
          </div>
          <div className={styles.searchSelect}>
            <span>{t("marketing.portfolio.industryFilter")}</span>
            <Icon type="DownOutlined" />
          </div>
          <div className={styles.searchSelect}>
            <span>{t("marketing.portfolio.techFilter")}</span>
            <Icon type="DownOutlined" />
          </div>
          <div className={styles.searchSelect}>
            <span>
              {t("marketing.portfolio.sortLabel")}:{" "}
              {t("marketing.portfolio.sortNewest")}
            </span>
            <Icon type="DownOutlined" />
          </div>
        </div>

        {/* Project grid */}
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <Card className={styles.projectCard} key={project.title} variant="borderless">
              <div className={styles.projectImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1200px) 25vw, (max-width: 991px) 50vw, (max-width: 575px) 100vw, 25vw"
                  className={styles.projectImageImg}
                />
                <span className={styles.projectTag}>{project.tag}</span>
              </div>
              <div className={styles.projectBody}>
                <Title level={3} className={styles.projectTitle}>
                  {project.title}
                </Title>
                <Paragraph className={styles.projectDescription}>
                  {project.description}
                </Paragraph>
                <Button type="link" className={styles.projectLink}>
                  Lihat Detail <Icon type="ArrowRightOutlined" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </MarketingSection>

      {/* ─── Case Study ─── */}
      <section className={styles.caseStudySection}>
        <MarketingContainer>
          <Text className={styles.sectionLabel}>Studi Kasus Unggulan</Text>
          <Title level={2} className={styles.sectionTitle} style={{ marginBottom: 28 }}>
            {t("marketing.portfolio.caseStudy.title")}
          </Title>

          <Card className={styles.caseStudyCard} variant="borderless">
            <Row gutter={[0, 0]} wrap={false}>
              <Col xs={24} lg={14}>
                <div className={styles.caseStudyImage}>
                  <Image
                    src="/images/sample/09_tanihub_marketplace.jpg"
                    alt="Transformasi Digital di Sektor Pertanian"
                    fill
                    sizes="(max-width: 991px) 100vw, 58vw"
                    className={styles.caseStudyImageImg}
                  />
                  <div className={styles.caseStudyPlay}>
                    <Icon type="PlayCircleOutlined" />
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={10}>
                <div className={styles.caseStudyBody}>
                  <span className={styles.caseStudyTag}>
                    {t("marketing.portfolio.caseStudy.tag")}
                  </span>
                  <Title level={2} className={styles.caseStudyTitle}>
                    {t("marketing.portfolio.caseStudy.projectTitle")}
                  </Title>
                  <Paragraph className={styles.caseStudyDescription}>
                    {t("marketing.portfolio.caseStudy.description")}
                  </Paragraph>

                  <div className={styles.caseStudyStats}>
                    {caseStudyStats.map((stat) => (
                      <div key={stat.value}>
                        <Text className={styles.caseStudyStatValue}>
                          {stat.value}
                        </Text>
                        {stat.label && (
                          <Text className={styles.caseStudyStatLabel}>
                            {stat.label}
                          </Text>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className={styles.caseStudyActions}>
                    <Button type="primary" icon={<Icon type="ArrowRightOutlined" />}>
                      {t("marketing.portfolio.caseStudy.viewFull")}
                    </Button>
                    <Button
                      type="link"
                      className={styles.caseStudyVideoLink}
                      icon={<Icon type="PlayCircleOutlined" />}
                    >
                      {t("marketing.portfolio.caseStudy.video")}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </MarketingContainer>
      </section>

      {/* ─── Clients ─── */}
      <section className={styles.clientsSection}>
        <MarketingContainer>
          <Text className={styles.sectionLabel}>
            {t("marketing.portfolio.clients.label")}
          </Text>
          <Title level={2} className={styles.sectionTitle}>
            {t("marketing.portfolio.clients.title")}
          </Title>
          <Paragraph
            className={styles.sectionDescription}
            style={{ marginBottom: 28, maxWidth: 520 }}
          >
            {t("marketing.portfolio.clients.description")}
          </Paragraph>

          <div className={styles.clientsTrack}>
            {clientNames.map((name, index) => (
              <div className={styles.clientCard} key={name}>
                <span className={styles.clientIcon}>
                  <Icon type={clientIcons[index]} />
                </span>
                <Text className={styles.clientName}>{name}</Text>
              </div>
            ))}
          </div>
        </MarketingContainer>
      </section>

      {/* ─── CTA ─── */}
      <MarketingSection className={styles.cta}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.ctaLabel}>
              {t("marketing.portfolio.cta.label")}
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              {t("marketing.portfolio.cta.title")}
            </Title>
            <Paragraph className={styles.ctaDescription}>
              {t("marketing.portfolio.cta.description")}
            </Paragraph>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" href="/kontak">
                {t("marketing.portfolio.cta.action")}{" "}
                <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/layanan">Lihat Layanan</Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
