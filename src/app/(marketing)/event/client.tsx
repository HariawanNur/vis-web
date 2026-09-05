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

const events = [
  {
    day: "15",
    month: "Sep",
    year: "2026",
    status: "Mendatang" as const,
    title: "Tech Talk: Building Scalable Systems with Kubernetes",
    description:
      "Sesi sharing tentang best practices membangun sistem terdistribusi yang scalable menggunakan Kubernetes dan container orchestration.",
    location: "Online via Zoom",
    time: "14:00 — 16:00 WIB",
  },
  {
    day: "22",
    month: "Sep",
    year: "2026",
    status: "Mendatang" as const,
    title: "Workshop: UI/UX Design Thinking untuk Developer",
    description:
      "Workshop intensif 1 hari tentang pendekatan design thinking yang dapat diterapkan oleh developer untuk membangun produk yang user-centric.",
    location: "Vistara Office, Jakarta Selatan",
    time: "09:00 — 16:00 WIB",
  },
  {
    day: "05",
    month: "Agu",
    year: "2026",
    status: "Selesai" as const,
    title: "Webinar: Digital Transformation Strategy 2026",
    description:
      "Webinar yang membahas tren dan strategi transformasi digital untuk tahun 2026, termasuk adopsi AI dan automasi bisnis.",
    location: "Online via Google Meet",
    time: "10:00 — 12:00 WIB",
  },
  {
    day: "20",
    month: "Juli",
    year: "2026",
    status: "Selesai" as const,
    title: "Vistara Tech Summit 2026",
    description:
      "Konferensi tahunan terbesar Vistara dengan 20+ pembicara, workshop hands-on, dan networking session bersama profesional teknologi nasional.",
    location: "The Ritz-Carlton, Jakarta",
    time: "08:00 — 17:00 WIB",
  },
] as const;

const filterTabs = ["Semua", "Mendatang", "Selesai"] as const;

const statusColors: Record<string, { bg: string; color: string }> = {
  Mendatang: { bg: "#f0fdf4", color: "#15803d" },
  Selesai: { bg: "#f1f5f9", color: "#64748b" },
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
  eventCard: css`
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
      padding: 24px !important;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,
  eventHeader: css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  `,
  dateBadge: css`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, #1e66d4 0%, #0d47a1 100%);
    color: #fff;
  `,
  dateDay: css`
    display: block;
    font-size: 20px;
    font-weight: 850;
    line-height: 1.1;
  `,
  dateMonth: css`
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  `,
  statusBadge: css`
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
  `,
  eventTitle: css`
    margin: 0 0 10px !important;
    color: #0b1532 !important;
    font-size: 17px !important;
    font-weight: 800 !important;
    line-height: 1.3 !important;
  `,
  eventDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 14px !important;
    line-height: 1.7 !important;
    flex: 1;
  `,
  eventMeta: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #eef2f7;
  `,
  metaItem: css`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7a90;
    font-size: 13px;
  `,
  metaIcon: css`
    color: #1e66d4;
    font-size: 14px;
  `,
  eventAction: css`
    margin-top: 16px !important;
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

export default function EventPage() {
  const { styles } = useStyles();
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "Semua") return true;
    return event.status === activeFilter;
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
              <span>Event</span>
            </div>
            <Text className={styles.eyebrow}>EVENT</Text>
            <Title level={1} className={styles.heroTitle}>
              Event & <strong>Kegiatan</strong>
            </Title>
            <Text className={styles.heroDescription}>
              Temukan tech talk, workshop, webinar, dan konferensi yang diselenggarakan oleh Vistara.
            </Text>
          </div>
          <div className={styles.heroGlow} />
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.section}>
        <MarketingContainer>
          <div className={styles.filterTabs}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.filterTab} ${activeFilter === tab ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <Row gutter={[24, 24]}>
            {filteredEvents.map((event, index) => {
              const colors = statusColors[event.status];
              return (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card className={styles.eventCard}>
                    <div className={styles.eventHeader}>
                      <div className={styles.dateBadge}>
                        <span className={styles.dateDay}>{event.day}</span>
                        <span className={styles.dateMonth}>{event.month}</span>
                      </div>
                      <span
                        className={styles.statusBadge}
                        style={{ background: colors.bg, color: colors.color }}
                      >
                        {event.status}
                      </span>
                    </div>
                    <Title level={4} className={styles.eventTitle}>
                      {event.title}
                    </Title>
                    <Text className={styles.eventDescription}>{event.description}</Text>
                    <div className={styles.eventMeta}>
                      <div className={styles.metaItem}>
                        <Icon type="EnvironmentOutlined" className={styles.metaIcon} />
                        <span>{event.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Icon type="ClockCircleOutlined" className={styles.metaIcon} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <Button
                      type={event.status === "Mendatang" ? "primary" : "default"}
                      className={styles.eventAction}
                      block
                      icon={
                        <Icon
                          type={
                            event.status === "Mendatang"
                              ? "CheckCircleOutlined"
                              : "PlayCircleOutlined"
                          }
                        />
                      }
                    >
                      {event.status === "Mendatang" ? "Daftar" : "Lihat Rekaman"}
                    </Button>
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
              JANGAN LEWATKAN
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              Ikuti Event Vistara Selanjutnya
            </Title>
            <Text className={styles.ctaDescription}>
              Daftar sekarang untuk mendapatkan akses eksklusif ke event, workshop, dan webinar kami berikutnya.
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
