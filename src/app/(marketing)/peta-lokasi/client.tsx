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
  Typography,
  type LocationItem,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";
import { MapLocation } from "@/components";

const { Text, Title } = Typography;

const contactCards = [
  {
    icon: "HomeOutlined",
    title: "Alamat",
    lines: ["Jl. Contoh Raya No. 123", "Jakarta, Indonesia 12345"],
  },
  {
    icon: "PhoneOutlined",
    title: "Telepon",
    lines: ["+62 21 1234 5678", "Senin - Jumat, 09.00 - 18.00 WIB"],
  },
  {
    icon: "ClockCircleOutlined",
    title: "Jam Operasional",
    lines: ["Senin - Jumat: 09.00 - 18.00", "Sabtu: 09.00 - 14.00"],
  },
] as const;

const landmarks = [
  "Mall Central Park (500m)",
  "Stasiun Kereta Api (800m)",
  "RS Umum Jakarta (1.2km)",
  "Gedung Perkantoran Plaza (300m)",
] as const;

const officeLocation = [
  {
    id: "vistara-office",
    title: "Vistara Teknologi Indonesia",
    description: "Jl. Contoh Raya No. 123, Jakarta, Indonesia 12345",
    info: "Jl. Contoh Raya No. 123, Jakarta, Indonesia 12345",
    category: "office",
    latitude: -6.175392,
    longitude: 106.827153,
    status: "on_track",
    statusLabel: "Kantor Utama",
    progress: 100,
    targetDate: "Siap dikunjungi",
  },
] satisfies LocationItem[];

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
  contactCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    padding: 28px;
    text-align: center;

    &:hover {
      border-color: #c0cfe0;
      box-shadow: 0 8px 24px rgba(12, 24, 48, 0.06);
    }

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  contactIcon: css`
    display: grid;
    width: 56px;
    height: 56px;
    margin: 0 auto 16px;
    place-items: center;
    border-radius: 14px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 24px;
  `,
  contactTitle: css`
    margin: 0 0 10px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  contactLine: css`
    display: block;
    color: #5d6c86;
    font-size: 13px;
    line-height: 1.7;
  `,
  landmarksList: css`
    margin-top: 24px;
  `,
  landmarkItem: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #edf1f7;

    &:last-child {
      border-bottom: none;
    }
  `,
  landmarkIcon: css`
    color: #1677ff;
    font-size: 14px;
  `,
  landmarkText: css`
    color: #4d5b78;
    font-size: 14px;
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
        backgroundAlt="Peta Lokasi Vistara"
        eyebrow="PETA LOKASI"
        titlePrefix={<>Peta </>}
        titleAccent="Lokasi"
        titleSuffix={null}
        description="Kunjungi kantor kami untuk diskusi langsung mengenai proyek Anda."
      />

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Informasi Kantor</Text>
        <Title level={2} className={styles.sectionTitle}>
          Temukan Lokasi Kami
        </Title>
        <Text className={styles.sectionDescription}>
          Kami terbuka untuk kunjungan langsung. Silakan hubungi kami terlebih dahulu untuk membuat janji.
        </Text>

        <div style={{ marginTop: 24 }}>
          <Row gutter={[20, 20]}>
            {contactCards.map((card) => (
              <Col xs={24} sm={8} key={card.title}>
                <Card className={styles.contactCard}>
                  <span className={styles.contactIcon}>
                    <Icon type={card.icon as IconName} />
                  </span>
                  <Title level={4} className={styles.contactTitle}>
                    {card.title}
                  </Title>
                  {card.lines.map((line) => (
                    <Text key={line} className={styles.contactLine}>
                      {line}
                    </Text>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Peta</Text>
        <Title level={2} className={styles.sectionTitle}>
          Lokasi Kami
        </Title>

        <div style={{ marginTop: 24 }}>
          <MapLocation
            height={360}
            compact
            preview
            locations={officeLocation}
            center={{ latitude: -6.175392, longitude: 106.827153, zoom: 15 }}
          />
        </div>

        <div className={styles.landmarksList}>
          <Title level={4} style={{ marginBottom: 12 }}>
            Landmark Terdekat
          </Title>
          {landmarks.map((landmark) => (
            <div key={landmark} className={styles.landmarkItem}>
              <Icon type="EnvironmentOutlined" className={styles.landmarkIcon} />
              <Text className={styles.landmarkText}>{landmark}</Text>
            </div>
          ))}
        </div>
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
