"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  MarketingHero,
  Typography,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

interface OnboardingStep {
  number: string;
  icon: IconName;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  {
    number: "01",
    icon: "UserAddOutlined",
    title: "Daftar Akun",
    description: "Buat akun baru dengan mengisi formulir registrasi. Pilih paket yang sesuai dengan kebutuhan bisnis Anda dan lengkapi informasi dasar.",
  },
  {
    number: "02",
    icon: "MailOutlined",
    title: "Verifikasi Email",
    description: "Periksa kotak masuk email Anda untuk tautan verifikasi. Klik tautan tersebut untuk mengaktifkan akun dan mulai mengakses dashboard.",
  },
  {
    number: "03",
    icon: "SettingOutlined",
    title: "Pengaturan Profil",
    description: "Lengkapi profil perusahaan Anda, unggah logo, dan konfigurasi pengaturan dasar seperti zona waktu, bahasa, dan mata uang.",
  },
  {
    number: "04",
    icon: "DashboardOutlined",
    title: "Jelajahi Dashboard",
    description: "Kenali antarmuka dashboard, navigasi menu, dan fitur-fitur utama yang tersedia untuk mengelola bisnis Anda secara efisien.",
  },
  {
    number: "05",
    icon: "ProjectOutlined",
    title: "Konfigurasi Proyek",
    description: "Buat proyek baru, undang anggota tim, atur hak akses, dan konfigurasi alur kerja sesuai kebutuhan departemen Anda.",
  },
  {
    number: "06",
    icon: "RocketOutlined",
    title: "Mulai Bekerja",
    description: "Manfaatkan seluruh fitur platform untuk meningkatkan produktivitas, kolaborasi tim, dan pertumbuhan bisnis Anda.",
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
    background-image: url(/images/sample/04_portal_layanan_publik.jpg);
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
  sectionLabel: css`
    display: block;
    color: #1677ff;
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
  stepsGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  stepCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
      box-shadow: 0 12px 32px rgba(12, 24, 48, 0.08);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 28px !important;
      height: 100%;
    }
  `,
  stepNumber: css`
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 14px;
    border-radius: 8px;
    background: #edf5ff;
    color: #1677ff;
    font-size: 13px;
    font-weight: 800;
  `,
  stepIcon: css`
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border-radius: 16px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 24px;
    margin-bottom: 14px;
  `,
  stepTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 17px !important;
    font-weight: 800 !important;
  `,
  stepDescription: css`
    margin: 0 !important;
    color: #5d6c86 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
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

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Coding_Workspace.png"
        backgroundAlt="Panduan Pengguna"
        eyebrow="PANDUAN PENGGUNA"
        titlePrefix={<span>Panduan</span>}
        titleAccent={<strong>Pengguna</strong>}
        titleSuffix={null}
        description={<>Ikuti panduan langkah demi langkah untuk memulai penggunaan platform Vistara dan manfaatkan seluruh fitur yang tersedia.</>}
      />

      <MarketingSection>
        <Text className={styles.sectionLabel}>Langkah Awal</Text>
        <Title level={2} className={styles.sectionTitle}>
          Memulai Perjalanan Anda
        </Title>
        <Text className={styles.sectionDescription}>
          enam langkah sederhana untuk mengatur akun Anda dan mulai bekerja dengan Vistara.
        </Text>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <Card key={step.number} className={styles.stepCard}>
              <Flex vertical gap={12}>
                <span className={styles.stepNumber}>Langkah {step.number}</span>
                <span className={styles.stepIcon}>
                  <Icon type={step.icon} />
                </span>
                <Title level={3} className={styles.stepTitle}>
                  {step.title}
                </Title>
                <Text className={styles.stepDescription}>
                  {step.description}
                </Text>
              </Flex>
            </Card>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Title level={2} className={styles.ctaTitle}>
              Siap Memulai?
            </Title>
            <Text className={styles.ctaDescription}>
              Daftar akun Vistara sekarang dan mulai transformasi digital bisnis Anda. Tim dukungan kami siap membantu Anda di setiap langkah.
            </Text>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button
                type="primary"
                size="large"
                href="/kontak"
                icon={<Icon type="ArrowRightOutlined" />}
              >
                Mulai Sekarang
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
