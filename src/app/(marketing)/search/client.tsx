"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Input,
  MarketingHero,
  Typography,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

interface QuickLink {
  label: string;
  href: string;
  icon: IconName;
}

const quickLinks: QuickLink[] = [
  { label: "Beranda", href: "/beranda", icon: "HomeOutlined" },
  { label: "Tentang Kami", href: "/tentang-kami", icon: "TeamOutlined" },
  { label: "Layanan", href: "/layanan", icon: "AppstoreOutlined" },
  { label: "Solusi", href: "/solusi", icon: "BulbOutlined" },
  { label: "Portofolio", href: "/portofolio", icon: "ReadOutlined" },
  { label: "Karier", href: "/karir", icon: "HeartOutlined" },
  { label: "Kontak", href: "/kontak", icon: "PhoneOutlined" },
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
    background-image: url(/images/sample/02_sistem_informasi.jpg);
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
    padding-block: 64px 40px;
    background: #f7f9fc;
  `,
  searchInputWrapper: css`
    display: flex;
    width: 100%;
    max-width: 640px;

    .ant-input {
      height: 52px;
      border-radius: 14px 0 0 14px !important;
      font-size: 15px;
    }
  `,
  searchButton: css`
    height: 52px !important;
    padding-inline: 28px !important;
    border-radius: 0 14px 14px 0 !important;
    font-weight: 700 !important;
  `,
  searchHint: css`
    margin-top: 12px;
    color: #8c99af;
    font-size: 14px;
    text-align: center;
  `,
  resultsSection: css`
    padding-block: 40px 0;
  `,
  resultsTitle: css`
    margin: 0 0 24px !important;
    color: #0b1532 !important;
    font-size: 20px !important;
    font-weight: 800 !important;
  `,
  resultsHighlight: css`
    color: #1677ff;
  `,
  resultCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    margin-bottom: 12px;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 8px 24px rgba(12, 24, 48, 0.06);
    }

    :global(.ant-card-body) {
      padding: 20px 24px !important;
    }
  `,
  resultTitle: css`
    margin: 0 0 4px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 700 !important;
  `,
  resultDescription: css`
    margin: 0 !important;
    color: #5d6c86 !important;
    font-size: 13px !important;
    line-height: 1.6 !important;
  `,
  resultLink: css`
    color: #1677ff !important;
    font-size: 12px !important;
    font-weight: 700;
    text-decoration: none;
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `,
  quickLinksSection: css`
    padding-block: 40px 60px;
  `,
  quickLinksTitle: css`
    margin: 0 0 20px !important;
    color: #8c99af !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  `,
  quickLinksGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  `,
  quickLinkCard: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border: 1px solid #dfe6f1;
    border-radius: 12px;
    background: #fff;
    color: #0b1532;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.15s ease;

    &:hover {
      border-color: #1677ff;
      background: #f0f5ff;
      color: #1677ff;
    }
  `,
  quickLinkIcon: css`
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 10px;
    background: #edf5ff;
    color: #1677ff;
    font-size: 16px;
    flex-shrink: 0;
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

const placeholderResults = [
  { title: "Layanan E-Commerce", description: "Platform perdagangan digital yang aman dan scalable untuk bisnis Anda.", href: "/layanan#ecommerce" },
  { title: "Solusi Cloud & Infrastruktur", description: "Arsitektur cloud modern untuk efisiensi dan skalabilitas operasional.", href: "/layanan#cloud" },
  { title: "Konsultasi Teknologi Informasi", description: "Perencanaan strategis dan audit TI untuk transformasi digital.", href: "/layanan#konsultasi" },
  { title: "Tentang Vistara", description: "Profil perusahaan, visi, misi, dan tim di balik PT. Vistara Teknologi Indonesia.", href: "/tentang-kami" },
  { title: "Portofolio Proyek", description: "Studi kasus dan proyek yang telah berhasil kami kerjakan.", href: "/portofolio" },
];

export default function Page() {
  const { styles } = useStyles();
  const [searchQuery, setSearchQuery] = useState("");

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/network-tree.png"
        backgroundAlt="Pencarian"
        eyebrow="PENCARIAN"
        titlePrefix={<span>Pencarian</span>}
        titleAccent={null}
        titleSuffix={null}
        description={<>Temukan halaman, layanan, dan informasi yang Anda butuhkan di seluruh website Vistara.</>}
      />

      <section className={styles.searchSection}>
        <MarketingContainer>
          <Flex vertical align="center" gap={4}>
            <div className={styles.searchInputWrapper}>
              <Input
                placeholder="Masukkan kata kunci untuk menemukan halaman, layanan, atau informasi yang Anda butuhkan."
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
            <Text className={styles.searchHint}>
              Contoh: e-commerce, cloud, konsultasi, portofolio
            </Text>
          </Flex>
        </MarketingContainer>
      </section>

      {hasQuery && (
        <section className={styles.resultsSection}>
          <MarketingContainer>
            <Title level={3} className={styles.resultsTitle}>
              Hasil pencarian untuk: <span className={styles.resultsHighlight}>&ldquo;{searchQuery}&rdquo;</span>
            </Title>
            {placeholderResults.map((result) => (
              <Card key={result.title} className={styles.resultCard}>
                <Flex vertical gap={4}>
                  <Title level={4} className={styles.resultTitle}>{result.title}</Title>
                  <Text className={styles.resultDescription}>{result.description}</Text>
                  <Link href={result.href} className={styles.resultLink}>
                    Lihat selengkapnya <Icon type="ArrowRightOutlined" />
                  </Link>
                </Flex>
              </Card>
            ))}
          </MarketingContainer>
        </section>
      )}

      <section className={styles.quickLinksSection}>
        <MarketingContainer>
          <Title level={4} className={styles.quickLinksTitle}>Akses Cepat</Title>
          <div className={styles.quickLinksGrid}>
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className={styles.quickLinkCard}>
                <span className={styles.quickLinkIcon}>
                  <Icon type={link.icon} />
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Title level={2} className={styles.ctaTitle}>
              Tidak Menemukan Yang Anda Cari?
            </Title>
            <Text className={styles.ctaDescription}>
              Hubungi tim kami untuk bantuan langsung. Kami siap menjawab pertanyaan Anda dan membantu menemukan solusi yang tepat.
            </Text>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button
                type="primary"
                size="large"
                href="/kontak"
                icon={<Icon type="ArrowRightOutlined" />}
              >
                Hubungi Kami
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
