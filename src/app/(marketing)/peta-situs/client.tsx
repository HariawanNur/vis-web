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

interface SiteLink {
  label: string;
  href: string;
  highlighted?: boolean;
}

interface SiteCategory {
  title: string;
  icon: IconName;
  links: SiteLink[];
}

const categories: SiteCategory[] = [
  {
    title: "Beranda",
    icon: "HomeOutlined",
    links: [
      { label: "Beranda", href: "/beranda" },
      { label: "Highlight Layanan", href: "/beranda#layanan" },
    ],
  },
  {
    title: "Tentang Kami",
    icon: "TeamOutlined",
    links: [
      { label: "Profil Perusahaan", href: "/tentang-kami" },
      { label: "Visi & Misi", href: "/tentang-kami#visi-misi" },
      { label: "Nilai Kami", href: "/tentang-kami#nilai" },
      { label: "Tim Kami", href: "/tentang-kami#tim" },
      { label: "Sejarah", href: "/tentang-kami#sejarah" },
      { label: "Sertifikasi & Penghargaan", href: "/tentang-kami#sertifikasi" },
    ],
  },
  {
    title: "Layanan",
    icon: "AppstoreOutlined",
    links: [
      { label: "E-Commerce", href: "/layanan#ecommerce" },
      { label: "Sistem Informasi", href: "/layanan#sistem-informasi" },
      { label: "Cloud & Infrastruktur", href: "/layanan#cloud" },
      { label: "Solusi IoT", href: "/layanan#iot" },
      { label: "Keamanan Siber", href: "/layanan#siber" },
      { label: "Konsultasi TI", href: "/layanan#konsultasi" },
    ],
  },
  {
    title: "Solusi",
    icon: "BulbOutlined",
    links: [
      { label: "Solusi Industri", href: "/solusi#industri" },
      { label: "Solusi Pemerintahan", href: "/solusi#pemerintahan" },
      { label: "Solusi Bisnis", href: "/solusi#bisnis" },
      { label: "Solusi Pendidikan", href: "/solusi#pendidikan" },
      { label: "Solusi Kesehatan", href: "/solusi#kesehatan" },
      { label: "Solusi Pertanian", href: "/solusi#pertanian" },
    ],
  },
  {
    title: "Portofolio",
    icon: "ReadOutlined",
    links: [
      { label: "Studi Kasus", href: "/portofolio#studi-kasus" },
      { label: "Klien Kami", href: "/portofolio#klien" },
      { label: "Testimoni", href: "/portofolio#testimoni" },
      { label: "Galeri Proyek", href: "/portofolio#galeri" },
      { label: "Video", href: "/portofolio#video" },
    ],
  },
  {
    title: "Karier",
    icon: "HeartOutlined",
    links: [
      { label: "Life at Vistara", href: "/karir#life" },
      { label: "Lowongan Pekerjaan", href: "/karir#lowongan" },
      { label: "Proses Rekrutmen", href: "/karir#rekrutmen" },
      { label: "Budaya Kerja", href: "/karir#budaya" },
      { label: "Pengembangan Karier", href: "/karir#pengembangan" },
      { label: "FAQ Karier", href: "/karir#faq" },
    ],
  },
  {
    title: "Kontak",
    icon: "PhoneOutlined",
    links: [
      { label: "Informasi Kontak", href: "/kontak#info" },
      { label: "Lokasi Kantor", href: "/kontak#lokasi" },
      { label: "Formulir Hubungi Kami", href: "/kontak#formulir" },
      { label: "Layanan Dukungan", href: "/kontak#dukungan" },
      { label: "Media Sosial", href: "/kontak#sosial" },
    ],
  },
  {
    title: "Informasi Legal",
    icon: "SafetyCertificateOutlined",
    links: [
      { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
      { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { label: "Peta Situs", href: "/peta-situs", highlighted: true },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Penggunaan Cookies", href: "/cookies" },
    ],
  },
  {
    title: "Sumber Daya",
    icon: "GlobalOutlined",
    links: [
      { label: "Blog & Artikel", href: "/blog" },
      { label: "Berita & Pengumuman", href: "/berita" },
      { label: "Event", href: "/event" },
      { label: "Dokumentasi", href: "/dokumentasi" },
      { label: "Panduan Pengguna", href: "/panduan" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Lainnya",
    icon: "MoreOutlined",
    links: [
      { label: "Pencarian", href: "/search" },
      { label: "Konsultasi Gratis", href: "/kontak" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Peta Lokasi", href: "/peta-lokasi" },
      { label: "Status Layanan", href: "/status" },
      { label: "Partnership", href: "/partnership" },
    ],
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
  introBg: css`
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: url(/images/ilustrations/network-tree.png);
    background-size: cover;
    background-position: center;
    opacity: 0.12;
  `,
  introInner: css`
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
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  introBadge: css`
    position: absolute;
    right: 0;
    bottom: 24px;
    width: min(340px, 32vw);
    padding: 24px;
    border-radius: 18px;
    background: rgba(245, 251, 255, 0.96);
    box-shadow: 0 18px 42px rgba(3, 14, 32, 0.22);

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      right: auto;
      bottom: auto;
      width: 100%;
      margin-top: 26px;
    }
  `,
  badgeText: css`
    display: block;
    color: #0b1532;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.5;
  `,
  badgeSubtext: css`
    display: block;
    margin-top: 8px;
    color: #5d6c86;
    font-size: 13px;
    line-height: 1.6;
  `,
  categoryGrid: css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;

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
  categoryCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    padding: 24px;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
      box-shadow: 0 12px 32px rgba(12, 24, 48, 0.08);
      transform: translateY(-2px);
    }
  `,
  categoryIcon: css`
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 14px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 22px;
    margin-bottom: 14px;
  `,
  categoryTitle: css`
    margin: 0 0 12px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  categoryLink: css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 0;
    color: #5d6c86 !important;
    font-size: 13px !important;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #1677ff !important;
    }
  `,
  categoryLinkArrow: css`
    color: #b0c0d8;
    font-size: 10px;
    flex-shrink: 0;
  `,
  categoryLinkHighlighted: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    margin-top: 4px;
    border-radius: 8px;
    background: #1677ff;
    color: #fff !important;
    font-size: 13px !important;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.15s ease;

    &:hover {
      background: #0958d9 !important;
      color: #fff !important;
    }
  `,
  searchSection: css`
    padding-block: 72px;
    background: #f7f9fc;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  searchSectionLabel: css`
    display: block;
    color: #1677ff;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  searchSectionTitle: css`
    margin: 8px 0 8px !important;
    color: #0b1532 !important;
    font-size: clamp(24px, 3vw, 36px) !important;
    line-height: 1.12 !important;
    font-weight: 850 !important;
  `,
  searchSectionDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  searchInputWrapper: css`
    display: flex;
    width: 100%;
    max-width: 560px;
    margin-top: 24px;

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
  searchDivider: css`
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 560px;
    margin-top: 20px;

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #dfe6f1;
    }
  `,
  searchDividerText: css`
    color: #8c99af;
    font-size: 13px;
    font-weight: 600;
  `,
  contactButton: css`
    height: 48px !important;
    padding-inline: 24px !important;
    font-weight: 700 !important;
    border-radius: 12px !important;
    margin-top: 20px !important;
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="Peta Situs"
        eyebrow="PETA SITUS"
        titlePrefix={<span>Peta</span>}
        titleAccent={<strong>Situs</strong>}
        titleSuffix={null}
        description={<>Jelajahi seluruh halaman dan fitur yang tersedia di website PT. Vistara Teknologi Indonesia. Temukan informasi, layanan, dan solusi yang Anda butuhkan dengan mudah.</>}
        visual={<div className={styles.introBadge}><Text className={styles.badgeText}>Akses Informasi Lebih Mudah, Temukan yang Anda Butuhkan.</Text><Text className={styles.badgeSubtext}>Semua halaman terorganisir dalam satu peta situs untuk navigasi yang lebih cepat.</Text></div>}
      />

      <MarketingSection>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div className={styles.categoryCard} key={category.title}>
              <span className={styles.categoryIcon}>
                <Icon type={category.icon} />
              </span>
              <Title level={3} className={styles.categoryTitle}>
                {category.title}
              </Title>
              <Flex vertical gap={0}>
                {category.links.map((link) =>
                  link.highlighted ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={styles.categoryLinkHighlighted}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link key={link.label} href={link.href} className={styles.categoryLink}>
                      <Icon type="RightOutlined" className={styles.categoryLinkArrow} />
                      {link.label}
                    </Link>
                  )
                )}
              </Flex>
            </div>
          ))}
        </div>
      </MarketingSection>

      <section className={styles.searchSection}>
        <MarketingContainer>
          <Flex vertical align="center" style={{ textAlign: "center" }}>
            <Text className={styles.searchSectionLabel}>Pencarian</Text>
            <Title level={2} className={styles.searchSectionTitle}>
              Masih Mencari Sesuatu?
            </Title>
            <Text className={styles.searchSectionDescription}>
              Gunakan kolom pencarian di bawah ini untuk menemukan informasi yang Anda
              butuhkan secara lebih cepat dan praktis.
            </Text>

            <div className={styles.searchInputWrapper}>
              <Input
                placeholder="Cari halaman, layanan, atau informasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={handleSearch}
              />
              <Button
                type="primary"
                className={styles.searchButton}
                icon={<Icon type="SearchOutlined" />}
                onClick={handleSearch}
              >
                Cari
              </Button>
            </div>

            <div className={styles.searchDivider}>
              <Text className={styles.searchDividerText}>atau</Text>
            </div>

            <Button
              className={styles.contactButton}
              icon={<Icon type="PhoneOutlined" />}
              href="/kontak"
            >
              Hubungi Kami
            </Button>
          </Flex>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Title level={2} className={styles.ctaTitle}>
              Siap Memulai Proyek Bersama Kami?
            </Title>
            <Text className={styles.ctaDescription}>
              Konsultasikan kebutuhan teknologi Anda dengan tim ahli Vistara. Kami
              siap membantu mewujudkan solusi terbaik untuk bisnis Anda.
            </Text>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button
                type="primary"
                size="large"
                href="/kontak"
                icon={<Icon type="ArrowRightOutlined" />}
              >
                Konsultasi Gratis
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
