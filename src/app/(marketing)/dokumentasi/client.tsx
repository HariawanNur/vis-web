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
  MarketingHero,
  Row,
  Typography,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

interface DocArticle {
  icon: IconName;
  title: string;
  description: string;
  href: string;
  category: string;
}

const categories = [
  { key: "getting-started", label: "Getting Started", icon: "RocketOutlined" as IconName },
  { key: "api-reference", label: "API Reference", icon: "CodeOutlined" as IconName },
  { key: "integrasi", label: "Integrasi", icon: "ApiOutlined" as IconName },
  { key: "faq", label: "FAQ", icon: "QuestionCircleOutlined" as IconName },
] as const;

const articles: DocArticle[] = [
  {
    icon: "RocketOutlined",
    title: "Memulai dengan Vistara API",
    description: "Panduan lengkap untuk mengatur API key, melakukan autentikasi request pertama Anda, dan memahami struktur response yang dikembalikan oleh server.",
    href: "#",
    category: "getting-started",
  },
  {
    icon: "CodeOutlined",
    title: "REST API Reference",
    description: "Referensi lengkap seluruh endpoint REST API Vistara, termasuk method, parameter, header, dan contoh respons untuk setiap endpoint.",
    href: "#",
    category: "api-reference",
  },
  {
    icon: "ApiOutlined",
    title: "Integrasi dengan Webhook",
    description: "Cara mengkonfigurasi dan menggunakan webhook untuk menerima notifikasi real-time dari sistem Vistara ke aplikasi Anda.",
    href: "#",
    category: "integrasi",
  },
  {
    icon: "SafetyCertificateOutlined",
    title: "Autentikasi & Otorisasi",
    description: "Penjelasan mekanisme autentikasi OAuth 2.0, JWT token, dan pengelolaan API key untuk keamanan akses data Anda.",
    href: "#",
    category: "api-reference",
  },
  {
    icon: "CloudOutlined",
    title: "Mengelola Resource di Cloud",
    description: "Panduan membuat, memperbarui, dan menghapus resource seperti user, proyek, dan file melalui API management Vistara.",
    href: "#",
    category: "getting-started",
  },
  {
    icon: "SyncOutlined",
    title: "Integrasi Sistem ERP",
    description: "Langkah demi langkah menghubungkan Vistara dengan sistem ERP yang sudah ada untuk sinkronisasi data otomatis dan alur kerja yang lebih efisien.",
    href: "#",
    category: "integrasi",
  },
  {
    icon: "BarChartOutlined",
    title: "Rate Limiting & Quota",
    description: "Pemahaman tentang batasan rate limit per endpoint, cara memantau penggunaan kuota, dan strategi penanganan error 429.",
    href: "#",
    category: "api-reference",
  },
  {
    icon: "QuestionCircleOutlined",
    title: "FAQ Teknis Umum",
    description: "Jawaban atas pertanyaan teknis yang paling sering diajukan terkait penggunaan API, konfigurasi, dan troubleshooting umum.",
    href: "#",
    category: "faq",
  },
];

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: linear-gradient(135deg, #07111f 0%, #0a2f6e 50%, #1677ff 100%);
  `,
  heroBg: css`
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: url(/images/sample/07_pembelajaran_digital.jpg);
    background-size: cover;
    background-position: center;
    opacity: 0.12;
  `,
  heroShade: css`
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(135deg, rgba(7, 17, 31, 0.96) 0%, rgba(10, 47, 110, 0.88) 50%, rgba(22, 119, 255, 0.72) 100%);
  `,
  heroInner: css`
    position: relative;
    z-index: 2;
    min-height: 360px;
    padding-bottom: 22px;
  `,
  breadcrumb: css`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
  `,
  breadcrumbSeparator: css`
    color: rgba(255, 255, 255, 0.4);
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

    span {
      display: block;
    }

    strong {
      color: #67b0ff;
      font-weight: inherit;
    }
  `,
  heroDescription: css`
    max-width: 600px;
    margin: 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  searchSection: css`
    padding-block: 56px 0;
    background: #f7f9fc;
  `,
  searchInputWrapper: css`
    display: flex;
    width: 100%;
    max-width: 560px;

    .ant-input {
      height: 48px;
      border-radius: 12px 0 0 12px !important;
      font-size: 14px;
    }
  `,
  searchButton: css`
    height: 48px !important;
    padding-inline: 24px !important;
    border-radius: 0 12px 12px 0 !important;
    font-weight: 700 !important;
  `,
  layout: css`
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 40px;
    align-items: start;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  sidebar: css`
    position: sticky;
    top: 100px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: static;
    }
  `,
  sidebarTitle: css`
    margin: 0 0 16px !important;
    color: #0b1532 !important;
    font-size: 14px !important;
    font-weight: 800 !important;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  `,
  sidebarItem: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    color: #5d6c86;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.15s ease;
    cursor: pointer;

    &:hover {
      background: #edf5ff;
      color: #1677ff;
    }
  `,
  sidebarItemActive: css`
    background: #edf5ff;
    color: #1677ff;
  `,
  sidebarItemIcon: css`
    font-size: 16px;
  `,
  docGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  docCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
      box-shadow: 0 12px 32px rgba(12, 24, 48, 0.08);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 24px !important;
      height: 100%;
    }
  `,
  docCardIcon: css`
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 14px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 22px;
  `,
  docCardTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  docCardDescription: css`
    margin: 0 !important;
    color: #5d6c86 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  `,
  docCardLink: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    color: #1677ff !important;
    font-size: 13px !important;
    font-weight: 700;
    text-decoration: none;
    transition: gap 0.15s ease;

    &:hover {
      gap: 10px;
    }
  `,
  docCardCategory: css`
    display: inline-block;
    padding: 3px 10px;
    margin-bottom: 12px;
    border-radius: 8px;
    background: #f0f5ff;
    color: #1677ff;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  `,
  ctaSection: css`
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
    padding: 36px 42px;
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
    margin: 0 !important;
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
}));

export default function Page() {
  const { styles } = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Coding_Workspace.png"
        backgroundAlt="Dokumentasi"
        eyebrow="DOKUMENTASI"
        titlePrefix={<span>Dokumentasi</span>}
        titleAccent={null}
        titleSuffix={null}
        description={<>Akses dokumentasi teknis, referensi API, dan panduan integrasi untuk memaksimalkan penggunaan layanan Vistara.</>}
      />

      <section className={styles.searchSection}>
        <MarketingContainer>
          <Flex vertical align="center" gap={8}>
            <div className={styles.searchInputWrapper}>
              <Input
                placeholder="Cari dokumentasi, API, atau panduan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="primary"
                className={styles.searchButton}
                icon={<Icon type="SearchOutlined" />}
              >
                Cari
              </Button>
            </div>
          </Flex>
        </MarketingContainer>
      </section>

      <MarketingSection>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <Title level={4} className={styles.sidebarTitle}>Kategori</Title>
            <Flex vertical gap={4}>
              <div
                className={`${styles.sidebarItem} ${!activeCategory ? styles.sidebarItemActive : ""}`}
                onClick={() => setActiveCategory(null)}
              >
                <Icon type="UnorderedListOutlined" className={styles.sidebarItemIcon} />
                Semua Dokumentasi
              </div>
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className={`${styles.sidebarItem} ${activeCategory === cat.key ? styles.sidebarItemActive : ""}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  <Icon type={cat.icon} className={styles.sidebarItemIcon} />
                  {cat.label}
                </div>
              ))}
            </Flex>
          </aside>

          <div className={styles.docGrid}>
            {filteredArticles.map((article) => (
              <Card key={article.title} className={styles.docCard}>
                <Flex vertical gap={12}>
                  <span className={styles.docCardCategory}>{article.category.replace("-", " ")}</span>
                  <span className={styles.docCardIcon}>
                    <Icon type={article.icon} />
                  </span>
                  <Title level={3} className={styles.docCardTitle}>
                    {article.title}
                  </Title>
                  <Text className={styles.docCardDescription}>
                    {article.description}
                  </Text>
                  <Link href={article.href} className={styles.docCardLink}>
                    Baca <Icon type="ArrowRightOutlined" />
                  </Link>
                </Flex>
              </Card>
            ))}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Title level={2} className={styles.ctaTitle}>
              Butuh Bantuan Lebih Lanjut?
            </Title>
            <Text className={styles.ctaDescription}>
              Tim teknis kami siap membantu Anda mengatasi tantangan integrasi dan pengembangan. Jangan ragu untuk menghubungi kami.
            </Text>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button
                type="primary"
                size="large"
                href="/kontak"
                icon={<Icon type="ArrowRightOutlined" />}
              >
                Hubungi Tim Teknis
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
