"use client";

import { useState } from "react";
import Link from "next/link";
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
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

const newsItems = [
  {
    day: "03",
    month: "Sep",
    category: "Pencapaian",
    title: "Vistara Raih Penghargaan Top Digital Innovation 2026",
    excerpt:
      "Vistara dinobatkan sebagai salah satu perusahaan teknologi paling inovatif di ajang Top Digital Innovation Award 2026 atas kontribusinya dalam transformasi digital UMKM.",
    slug: "/berita/vistara-top-digital-innovation-2026",
  },
  {
    day: "28",
    month: "Agu",
    category: "Kemitraan",
    title: "Vistara X AWS: Program Cloud Adoption untuk Startup",
    excerpt:
      "Kerja sama strategis dengan Amazon Web Services untuk mempercepat adopsi cloud bagi startup Indonesia melalui program inkubasi dan subsidi infrastruktur.",
    slug: "/berita/vistara-x-aws-cloud-adoption",
  },
  {
    day: "20",
    month: "Agu",
    category: "Acara",
    title: "Sukses Gelar Vistara Tech Summit 2026 dengan 500+ Peserta",
    excerpt:
      "Konferensi tahunan Vistara Tech Summit menghadirkan 20+ pembicara internasional dan dihadiri lebih dari 500 profesional teknologi dari seluruh Indonesia.",
    slug: "/berita/vistara-tech-summit-2026",
  },
  {
    day: "15",
    month: "Agu",
    category: "Produk",
    title: "Peluncuran Vistara Cloud Console v3.0 dengan AI-Powered Monitoring",
    excerpt:
      "Platform manajemen cloud terbaru dari Vistara kini dilengkapi dengan pemantauan berbasis AI yang mampu mendeteksi anomali dan mengoptimalkan biaya secara otomatis.",
    slug: "/berita/vistara-cloud-console-v3",
  },
  {
    day: "08",
    month: "Agu",
    category: "Sosial",
    title: "Vistara Peduli: Program Beasiswa Teknologi untuk Pelajar",
    excerpt:
      "Inisiatif CSR Vistara menyediakan 100 beasiswa pelatihan pemrograman dan cloud computing bagi pelajar SMA/SMK di daerah terpencil.",
    slug: "/berita/vistara-peduli-beasiswa-teknologi",
  },
  {
    day: "01",
    month: "Agu",
    category: "Milestone",
    title: "Vistara Mencapai 50 Proyek Selesai di Semester I 2026",
    excerpt:
      "Capaian gemilang di semester pertama tahun 2026 dengan menyelesaikan 50 proyek dari berbagai sektor industri termasuk kesehatan, pendidikan, dan e-commerce.",
    slug: "/berita/vistara-50-proyek-semester-1",
  },
] as const;

const categoryColors: Record<string, { bg: string; color: string }> = {
  Pencapaian: { bg: "#fef3c7", color: "#b45309" },
  Kemitraan: { bg: "#edf5ff", color: "#1e66d4" },
  Acara: { bg: "#f0fdf4", color: "#15803d" },
  Produk: { bg: "#fce7f3", color: "#be185d" },
  Sosial: { bg: "#ede9fe", color: "#7c3aed" },
  Milestone: { bg: "#fff7ed", color: "#c2410c" },
};

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: linear-gradient(135deg, #0a1e3d 0%, #0d2b5e 50%, #0e3470 100%);
  `,
  heroInner: css`
    position: relative;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 32px;
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
  heroTitle: css`
    margin: 8px 0 12px !important;
    color: #fff !important;
    font-size: clamp(34px, 4.8vw, 58px) !important;
    line-height: 1.04 !important;
    letter-spacing: -0.05em;
    font-weight: 850 !important;

    strong {
      color: #67b0ff;
      font-weight: inherit;
    }
  `,
  heroDescription: css`
    max-width: 560px;
    margin: 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 16px !important;
    line-height: 1.75 !important;
  `,
  heroGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 82% 20%, rgba(255, 255, 255, 0.08), transparent 20%),
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05), transparent 24%);
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
  newsCard: css`
    display: flex;
    gap: 20px;
    padding: 24px;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover {
      box-shadow: 0 14px 36px rgba(12, 24, 48, 0.1);
      transform: translateY(-2px);
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      flex-direction: column;
      gap: 16px;
    }
  `,
  dateBadge: css`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 14px;
    background: linear-gradient(135deg, #1e66d4 0%, #0d47a1 100%);
    color: #fff;
  `,
  dateDay: css`
    display: block;
    font-size: 22px;
    font-weight: 850;
    line-height: 1.1;
  `,
  dateMonth: css`
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  `,
  newsContent: css`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  newsCategory: css`
    display: inline-block;
    width: fit-content;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    margin-bottom: 8px;
  `,
  newsTitle: css`
    margin: 0 0 8px !important;
    color: #0b1532 !important;
    font-size: 17px !important;
    font-weight: 800 !important;
    line-height: 1.3 !important;
  `,
  newsExcerpt: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 14px !important;
    line-height: 1.7 !important;
    flex: 1;
  `,
  newsLink: css`
    margin-top: 12px !important;
    color: #1e66d4 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    width: fit-content !important;
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
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
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
}));

export default function BeritaPage() {
  const { styles } = useStyles();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <MarketingContainer>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/beranda" style={{ color: "inherit", textDecoration: "none" }}>
                Beranda
              </Link>
              <span>›</span>
              <span>Berita</span>
            </div>
            <Text className={styles.eyebrow}>BERITA & PENGUMUMAN</Text>
            <Title level={1} className={styles.heroTitle}>
              Berita & <strong>Pengumuman</strong>
            </Title>
            <Text className={styles.heroDescription}>
              Informasi terkini mengenai pencapaian, kemitraan, dan perkembangan terbaru dari Vistara.
            </Text>
          </div>
          <div className={styles.heroGlow} />
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.section}>
        <MarketingContainer>
          <Row gutter={[20, 20]}>
            {newsItems.map((item) => {
              const colors = categoryColors[item.category] ?? { bg: "#edf5ff", color: "#1e66d4" };
              return (
                <Col xs={24} lg={12} key={item.slug}>
                  <div className={styles.newsCard}>
                    <div className={styles.dateBadge}>
                      <span className={styles.dateDay}>{item.day}</span>
                      <span className={styles.dateMonth}>{item.month}</span>
                    </div>
                    <div className={styles.newsContent}>
                      <span
                        className={styles.newsCategory}
                        style={{ background: colors.bg, color: colors.color }}
                      >
                        {item.category}
                      </span>
                      <Title level={4} className={styles.newsTitle}>
                        {item.title}
                      </Title>
                      <Text className={styles.newsExcerpt}>{item.excerpt}</Text>
                      <Button type="link" className={styles.newsLink} href={item.slug}>
                        Selengkapnya <Icon type="ArrowRightOutlined" />
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </MarketingContainer>
      </MarketingSection>

      <MarketingSection className={styles.ctaBanner}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionLabel} style={{ color: "#9fc5ff" }}>
              INGIN TAHU LEBIH LANJUT?
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              Ikuti Perkembangan Vistara
            </Title>
            <Text className={styles.ctaDescription}>
              Dapatkan berita dan pengumuman terbaru langsung dari kami. Hubungi tim kami untuk informasi lebih lanjut.
            </Text>
            <Flex className={styles.ctaActions} gap={12} wrap="wrap">
              <Button type="primary" href="/kontak">
                Hubungi Kami <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/beranda" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                Kembali ke Beranda
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
