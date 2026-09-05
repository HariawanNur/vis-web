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
  Input,
  Row,
  Typography,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

const articles = [
  {
    title: "Mengenal Microservices: Arsitektur Modern untuk Skalabilitas Aplikasi",
    excerpt:
      "Pelajari bagaimana arsitektur microservices membantu bisnis membangun sistem yang scalable, fleksibel, dan mudah dipelihara di era cloud computing.",
    category: "Teknologi",
    date: "28 Agustus 2026",
    slug: "/blog/microservices-arsitektur-modern",
  },
  {
    title: "Panduan Lengkap UI/UX Design untuk Aplikasi Enterprise",
    excerpt:
      "Desain antarmuka yang baik bukan sekadar tampilan menarik. Simak best practices UI/UX yang terbukti meningkatkan produktivitas pengguna korporat.",
    category: "Desain",
    date: "22 Agustus 2026",
    slug: "/blog/panduan-uiux-enterprise",
  },
  {
    title: "Strategi Digital Transformation untuk UMKM Indonesia",
    excerpt:
      "Transformasi digital bukan lagi pilihan, melainkan kebutuhan. Temukan langkah-langkah praktis yang bisa diterapkan UMKM untuk go digital.",
    category: "Bisnis",
    date: "15 Agustus 2026",
    slug: "/blog/digital-transformation-umkm",
  },
  {
    title: "Studi Kasus: Migrasi Cloud RS Sejahtera — Dari On-Premise ke AWS",
    excerpt:
      "Bagaimana RS Sejahtera berhasil bermigrasi ke infrastruktur cloud dan mengurangi biaya operasional TI sebesar 40% dalam 6 bulan.",
    category: "Studi Kasus",
    date: "10 Agustus 2026",
    slug: "/blog/studi-kasus-migrasi-cloud-rs-sejahtera",
  },
  {
    title: "Keamanan Aplikasi Web: OWASP Top 10 dan Cara Mitigasinya",
    excerpt:
      "Vulnerability umum pada aplikasi web masih menjadi ancaman serius. Kenali OWASP Top 10 dan strategi perlindungan yang efektif.",
    category: "Teknologi",
    date: "5 Agustus 2026",
    slug: "/blog/keamanan-web-owasp-top-10",
  },
  {
    title: "Pemanfaatan AI dalam Proses Pengembangan Perangkat Lunak",
    excerpt:
      "AI tidak menggantikan developer, tetapi mempercepat workflow. Eksplorasi tools dan teknik AI-assisted coding yang produktif.",
    category: "Teknologi",
    date: "30 Juli 2026",
    slug: "/blog/ai-dalam-pengembangan-perangkat-lunak",
  },
] as const;

const categories = ["Semua", "Teknologi", "Bisnis", "Desain", "Studi Kasus"] as const;

const categoryColors: Record<string, { bg: string; color: string }> = {
  Teknologi: { bg: "#edf5ff", color: "#1e66d4" },
  Bisnis: { bg: "#f0fdf4", color: "#15803d" },
  Desain: { bg: "#fef3c7", color: "#b45309" },
  "Studi Kasus": { bg: "#fce7f3", color: "#be185d" },
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
  searchBar: css`
    margin-bottom: 28px;

    .ant-input-affix-wrapper {
      height: 48px;
      border-radius: 14px;
      border-color: #dfe6f1;
      font-size: 14px;
      padding-inline: 18px;
    }
  `,
  filterTabs: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  `,
  filterTab: css`
    padding: 8px 18px;
    border: 1px solid #dfe6f1;
    border-radius: 999px;
    background: #fff;
    color: #4d5b78;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #1e66d4;
      color: #1e66d4;
    }
  `,
  filterTabActive: css`
    background: #1e66d4;
    border-color: #1e66d4;
    color: #fff;

    &:hover {
      color: #fff;
    }
  `,
  card: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover {
      box-shadow: 0 14px 36px rgba(12, 24, 48, 0.1);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 22px !important;
    }
  `,
  cardImage: css`
    width: 100%;
    height: 180px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e8f0fe 0%, #d0e2ff 100%);
  `,
  cardCategory: css`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
  `,
  cardTitle: css`
    margin: 12px 0 8px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
    line-height: 1.35 !important;
  `,
  cardExcerpt: css`
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
    margin-bottom: 12px !important;
  `,
  cardFooter: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  `,
  cardDate: css`
    color: #8c9bb5 !important;
    font-size: 12px !important;
  `,
  cardLink: css`
    color: #1e66d4 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
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

export default function BlogPage() {
  const { styles } = useStyles();
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "Semua" || article.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <span>Blog</span>
            </div>
            <Text className={styles.eyebrow}>BLOG & ARTIKEL</Text>
            <Title level={1} className={styles.heroTitle}>
              Blog & <strong>Artikel</strong>
            </Title>
            <Text className={styles.heroDescription}>
              Wawasan, tips, dan tren terbaru di dunia teknologi serta transformasi digital dari para ahli Vistara.
            </Text>
          </div>
          <div className={styles.heroGlow} />
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.section}>
        <MarketingContainer>
          <div className={styles.searchBar}>
            <Input
              prefix={<Icon type="SearchOutlined" />}
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </div>

          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <Row gutter={[24, 24]}>
            {filteredArticles.map((article) => {
              const colors = categoryColors[article.category] ?? { bg: "#edf5ff", color: "#1e66d4" };
              return (
                <Col xs={24} sm={12} lg={8} key={article.slug}>
                  <Card className={styles.card}>
                    <div className={styles.cardImage} />
                    <span
                      className={styles.cardCategory}
                      style={{ background: colors.bg, color: colors.color }}
                    >
                      {article.category}
                    </span>
                    <Title level={4} className={styles.cardTitle}>
                      {article.title}
                    </Title>
                    <Text className={styles.cardExcerpt}>{article.excerpt}</Text>
                    <div className={styles.cardFooter}>
                      <Text className={styles.cardDate}>{article.date}</Text>
                      <Link href={article.slug} className={styles.cardLink}>
                        Baca Selengkapnya <Icon type="ArrowRightOutlined" />
                      </Link>
                    </div>
                  </Card>
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
              TETAP TERHUBUNG
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              Dapatkan Insight Teknologi Terbaru
            </Title>
            <Text className={styles.ctaDescription}>
              Berlangganan newsletter kami untuk mendapatkan artikel, tips, dan tren digital terkini langsung di inbox Anda.
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
