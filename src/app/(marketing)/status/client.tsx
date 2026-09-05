"use client";

import Link from "next/link";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  MarketingHero,
  Row,
  Tag,
  Typography,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

const services = [
  { name: "Website", status: "Operasional", responseTime: "120ms" },
  { name: "API", status: "Operasional", responseTime: "85ms" },
  { name: "Dashboard", status: "Operasional", responseTime: "95ms" },
  { name: "Email Service", status: "Maintenance", responseTime: "-" },
  { name: "Database", status: "Operasional", responseTime: "45ms" },
  { name: "CDN", status: "Operasional", responseTime: "32ms" },
] as const;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
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
  section: css`
    padding-block: 72px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
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
  overallStatus: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 24px;
    border-radius: 14px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    margin-top: 24px;
    margin-bottom: 32px;
  `,
  overallStatusDot: css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 2s infinite;
  `,
  overallStatusText: css`
    color: #166534 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  servicesGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  serviceCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    padding: 24px;
    transition: border-color 0.2s;

    &:hover {
      border-color: #c0cfe0;
    }

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  serviceHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  `,
  serviceName: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  statusBadge: css`
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
  `,
  statusOperational: css`
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  `,
  statusMaintenance: css`
    background: #fef9c3;
    color: #854d0e;
    border: 1px solid #fde68a;
  `,
  serviceResponse: css`
    color: #5d6c86;
    font-size: 13px;
  `,
  serviceResponseLabel: css`
    color: #8c99af;
    font-size: 12px;
  `,
  lastUpdated: css`
    margin-top: 24px;
    color: #8c99af;
    font-size: 13px;
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
    padding: 28px 36px;
    color: #fff;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 24px;
    }
  `,
  ctaLabel: css`
    display: block;
    color: #9fc5ff !important;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
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
        backgroundSrc="/images/ilustrations/Office_Call.png"
        backgroundAlt="Status Layanan Vistara"
        eyebrow="STATUS LAYANAN"
        titlePrefix={<>Status </>}
        titleAccent="Layanan"
        titleSuffix={null}
        description="Pantau status operasional seluruh layanan Vistara secara real-time."
      />

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Status Terkini</Text>
        <Title level={2} className={styles.sectionTitle}>
          Status Sistem
        </Title>
        <Text className={styles.sectionDescription}>
          Berikut adalah status operasional seluruh layanan kami.
        </Text>

        <div className={styles.overallStatus}>
          <div className={styles.overallStatusDot} />
          <Text className={styles.overallStatusText}>Semua Sistem Operasional</Text>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <Card key={service.name} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <Title level={5} className={styles.serviceName}>
                  {service.name}
                </Title>
                <span
                  className={`${styles.statusBadge} ${
                    service.status === "Operasional"
                      ? styles.statusOperational
                      : styles.statusMaintenance
                  }`}
                >
                  {service.status}
                </span>
              </div>
              <Text className={styles.serviceResponseLabel}>Response Time</Text>
              <Text className={styles.serviceResponse}>{service.responseTime}</Text>
            </Card>
          ))}
        </div>

        <Text className={styles.lastUpdated}>
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </MarketingSection>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.ctaLabel}>Siap Memulai?</Text>
            <Title level={2} className={styles.ctaTitle}>
              Diskusikan Ide Anda dengan Tim Vistara
            </Title>
            <Text className={styles.ctaDescription}>
              Tidak ada ide yang terlalu kecil. Mari wujudkan bersama.
            </Text>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" size="large" href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
                Konsultasi Gratis
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
