"use client";

import Image from "next/image";

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

const openings = [
  {
    title: "Frontend Developer",
    team: "Product & Engineering",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    mode: "Hybrid",
    icon: "CodeOutlined",
  },
  {
    title: "Backend Developer",
    team: "Product & Engineering",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    mode: "Hybrid",
    icon: "DatabaseOutlined",
  },
  {
    title: "UI/UX Designer",
    team: "Product & Design",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    mode: "Hybrid",
    icon: "EditOutlined",
  },
  {
    title: "DevOps Engineer",
    team: "Infrastructure",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    mode: "On-site",
    icon: "CloudServerOutlined",
  },
  {
    title: "IT Consultant",
    team: "Consulting & Solutions",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    mode: "On-site",
    icon: "TeamOutlined",
  },
] as const;

const values = [
  {
    title: "Pengembangan Karier",
    description: "Pelatihan, sertifikasi, dan mentoring berkelanjutan.",
    icon: "BranchesOutlined",
  },
  {
    title: "Kerja Fleksibel",
    description: "Hybrid work dan jam kerja yang adaptif.",
    icon: "CalendarOutlined",
  },
  {
    title: "Proyek Bermakna",
    description: "Teknologi untuk dampak nyata di berbagai industri.",
    icon: "AppstoreAddOutlined",
  },
  {
    title: "Tim yang Solid",
    description: "Kolaborasi dengan talenta lintas disiplin.",
    icon: "TeamOutlined",
  },
  {
    title: "Kesejahteraan Karyawan",
    description: "Asuransi, benefit kesehatan, dan program wellbeing.",
    icon: "HeartOutlined",
  },
  {
    title: "Lingkungan Inklusif",
    description: "Kesetaraan kesempatan untuk semua.",
    icon: "SmileOutlined",
  },
] as const;

const culture = [
  "Kolaborasi Tanpa Batas",
  "Ruang untuk Berinovasi",
  "Bersama Menciptakan Dampak",
  "Lingkungan Kerja yang Nyaman",
] as const;

const testimonials = [
  {
    quote:
      "Vistara memberi saya ruang belajar yang besar untuk berkembang dan berkontribusi pada proyek nyata yang berdampak.",
    name: "Aisyah Rahma",
    role: "UI/UX Designer",
  },
  {
    quote:
      "Lingkungan kerja di Vistara sangat kolaboratif. Setiap ide dihargai dan kami selalu didorong untuk terus belajar.",
    name: "Dimas Pratama",
    role: "Backend Developer",
  },
] as const;

const faqs = [
  "Bagaimana proses rekrutmennya?",
  "Apakah ada program magang?",
  "Apakah bisa kerja remote?",
  "Apa saja benefit yang diberikan?",
] as const;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,
  hero: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: linear-gradient(180deg, #06203f 0%, #0a2446 100%);
  `,
  introInner: css`
    position: relative;
    min-height: 380px;
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
  introActions: css`
    margin-top: 24px;

    .ant-btn {
      height: 46px;
      padding-inline: 22px;
      font-weight: 700;
    }
  `,
  introVisual: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(52vw, 690px);
    height: 100%;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      width: 100%;
      min-height: 340px;
      margin-top: 26px;
    }
  `,
  introImage: css`
    object-fit: cover;
    object-position: center;
  `,
  introShade: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(6, 32, 63, 0.96) 0%, rgba(6, 32, 63, 0.58) 52%, rgba(6, 32, 63, 0.08) 100%);
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
  valueCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);

    :global(.ant-card-body) {
      padding: 20px !important;
      height: 100%;
    }
  `,
  valueIcon: css`
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 14px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 24px;
  `,
  valueTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  valueDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  `,
  listCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 10px 28px rgba(12, 24, 48, 0.05);

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  listHeader: css`
    padding: 20px 20px 14px;
    border-bottom: 1px solid #edf1f7;
  `,
  searchBar: css`
    display: grid;
    grid-template-columns: 1.2fr repeat(3, minmax(0, 1fr));
    gap: 10px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  searchItem: css`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    padding: 0 14px;
    border: 1px solid #dfe6f1;
    border-radius: 12px;
    background: #fff;
    color: #597091;
    font-size: 13px;
  `,
  jobRow: css`
    display: grid;
    grid-template-columns: 52px 1.5fr auto auto auto auto;
    gap: 14px;
    align-items: center;
    padding: 16px 20px;
    border-top: 1px solid #edf1f7;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 52px 1fr auto;
      row-gap: 10px;
    }
  `,
  jobIcon: css`
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 12px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 20px;
  `,
  jobTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  jobMeta: css`
    color: #4d5b78;
    font-size: 12px;
  `,
  pill: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 12px;
    font-weight: 700;
  `,
  linkButton: css`
    justify-self: end;
    color: #1e66d4 !important;
    font-size: 12px !important;
    font-weight: 800 !important;
  `,
  cultureRow: css`
    margin-top: 26px;
  `,
  cultureCard: css`
    position: relative;
    min-height: 190px;
    overflow: hidden;
    border: 0;
    border-radius: 18px;
    background: linear-gradient(180deg, #092348 0%, #071a32 100%);
    box-shadow: 0 16px 38px rgba(7, 18, 36, 0.12);

    :global(.ant-card-body) {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: end;
      padding: 16px !important;
      color: #fff;
    }
  `,
  cultureImage: css`
    object-fit: cover;
    object-position: center;
    opacity: 0.62;
    filter: saturate(0.85) contrast(1.04);
  `,
  cultureLabel: css`
    position: relative;
    z-index: 1;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
  `,
  testimonialCard: css`
    height: 100%;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 10px 26px rgba(12, 24, 48, 0.05);

    :global(.ant-card-body) {
      padding: 18px !important;
    }
  `,
  quote: css`
    color: #37506f;
    font-size: 14px;
    line-height: 1.75;
  `,
  quoteMark: css`
    color: #1e66d4;
    font-size: 26px;
  `,
  quoteName: css`
    display: block;
    color: #0b1532;
    font-size: 13px;
    font-weight: 800;
  `,
  quoteRole: css`
    display: block;
    color: #5d6c86;
    font-size: 12px;
  `,
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
    padding: 28px 36px;
    color: #fff;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 24px;
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
  faqGrid: css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  faqItem: css`
    padding: 14px 16px;
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    color: #0b1532;
    font-size: 13px;
    font-weight: 700;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Office_Call.png"
        backgroundAlt="Tim Vistara"
        eyebrow="Karier di Vistara"
        titlePrefix={<><span>Bersama Talenta Hebat,</span><br /></>}
        titleAccent={<strong>Wujudkan Masa Depan Digital</strong>}
        titleSuffix={null}
        description={<>Di Vistara, kami percaya teknologi yang berdampak lahir dari manusia yang luar biasa. Bergabunglah bersama kami dan jadi bagian dari solusi nyata untuk Indonesia yang lebih maju.</>}
        primaryAction={{ label: "Lihat Lowongan", href: "#lowongan", icon: <Icon type="ArrowRightOutlined" /> }}
        secondaryAction={{ label: "Kenali Budaya Kami", href: "#budaya", icon: <Icon type="ArrowRightOutlined" /> }}
        visual={<div className={styles.introVisual}><Image src="/images/ilustrations/Office_Call.png" alt="Tim Vistara" fill priority sizes="(max-width: 991px) 100vw, 52vw" className={styles.introImage} /><div className={styles.introShade} /><div className={styles.introBadge}><span className={styles.introBadgeTitle}>Great People</span><span className={styles.introBadgeTitle}>Build Greater</span><span className={styles.introBadgeTitle}>Solutions</span><span className={styles.introBadgeText}>Budaya kerja yang kolaboratif dan saling tumbuh.</span></div></div>}
      />
      
      <div className={styles.statsBar}>
          <MarketingContainer>
            <Row gutter={[0, 0]}>
              {[
                ["50+", "Talenta Profesional"],
                ["30+", "Proyek Inovatif"],
                ["6+", "Tahun Pertumbuhan"],
                ["", "Lingkungan Kerja Kolaboratif"],
              ].map(([value, label], index) => (
                <Col xs={24} sm={12} lg={6} key={label} className={styles.statItem}>
                  <span className={styles.statIcon}>
                    <Icon type={["ShieldOutlined", "TeamOutlined", "CalendarOutlined", "HeartOutlined"][index] as IconName} />
                  </span>
                  <Text className={styles.statValue}>{value}</Text>
                  <Text className={styles.statLabel}>{label}</Text>
                </Col>
              ))}
            </Row>
          </MarketingContainer>
        </div>
      <MarketingSection className={styles.section}>
        <Row gutter={[28, 28]} align="top">
          <Col xs={24} lg={8}>
            <Text className={styles.sectionLabel}>Mengapa Bergabung</Text>
            <Title level={2} className={styles.sectionTitle}>
              Lebih dari Sekadar Pekerjaan
            </Title>
            <Paragraph className={styles.sectionDescription}>
              Kami menyediakan lingkungan kerja yang mendukung perkembangan karier,
              memberi ruang untuk berinovasi, dan menciptakan dampak nyata bagi
              masyarakat.
            </Paragraph>
          </Col>
          <Col xs={24} lg={16}>
            <Row gutter={[14, 14]}>
              {values.map((item) => (
                <Col xs={24} sm={12} key={item.title}>
                  <Card className={styles.valueCard}>
                    <Flex vertical gap={12}>
                      <span className={styles.valueIcon}>
                        <Icon type={item.icon as IconName} />
                      </span>
                      <Title level={3} className={styles.valueTitle}>
                        {item.title}
                      </Title>
                      <Paragraph className={styles.valueDescription}>
                        {item.description}
                      </Paragraph>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Flex align="center" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text className={styles.sectionLabel}>Lowongan Terbaru</Text>
            <Title level={2} className={styles.sectionTitle}>
              Temukan Peran yang Sesuai dengan Passion Anda
            </Title>
          </div>
          <Button type="link" href="#" className={styles.linkButton}>
            Lihat Semua Lowongan <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>

        <Card className={styles.listCard} id="lowongan">
          <div className={styles.listHeader}>
            <div className={styles.searchBar}>
              <div className={styles.searchItem}>Cari posisi, keahlian, atau kata kunci...</div>
              <div className={styles.searchItem}>Semua Departemen</div>
              <div className={styles.searchItem}>Semua Tipe Kerja</div>
              <div className={styles.searchItem}>Semua Lokasi</div>
            </div>
          </div>
          {openings.map((job) => (
            <div className={styles.jobRow} key={job.title}>
              <span className={styles.jobIcon}>
                <Icon type={job.icon as IconName} />
              </span>
              <div>
                <Title level={3} className={styles.jobTitle}>
                  {job.title}
                </Title>
                <Text className={styles.jobMeta}>{job.team}</Text>
              </div>
              <span className={styles.pill}>{job.type}</span>
              <span className={styles.pill}>{job.mode}</span>
              <span className={styles.jobMeta}>{job.location}</span>
              <Button type="link" className={styles.linkButton}>
                Lihat Detail <Icon type="ArrowRightOutlined" />
              </Button>
            </div>
          ))}
        </Card>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Flex align="center" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text className={styles.sectionLabel}>Kehidupan di Vistara</Text>
            <Title level={2} className={styles.sectionTitle}>
              Budaya Kerja yang Menginspirasi
            </Title>
          </div>
          <Button type="link" href="#" className={styles.linkButton}>
            Lihat Galeri <Icon type="ArrowRightOutlined" />
          </Button>
        </Flex>

        <Row gutter={[14, 14]} className={styles.cultureRow}>
          {culture.map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={item}>
              <Card className={styles.cultureCard}>
                <Image
                  src={[
                    "/images/ilustrations/Office_Call.png",
                    "/images/ilustrations/Coding_Workspace.png",
                    "/images/ilustrations/Vistara_Office_Reception_1.png",
                    "/images/ilustrations/Vistara_Office_Reception_2.png",
                  ][index]}
                  alt={item}
                  fill
                  sizes="(max-width: 991px) 50vw, 25vw"
                  className={styles.cultureImage}
                />
                <div className={styles.cultureLabel}>{item}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Apa Kata Tim Kami</Text>
        <Title level={2} className={styles.sectionTitle}>
          Cerita Mereka di Vistara
        </Title>
        <Row gutter={[16, 16]}>
          {testimonials.map((item) => (
            <Col xs={24} lg={12} key={item.name}>
              <Card className={styles.testimonialCard}>
                <Flex align="start" gap={12}>
                  <Icon type="MessageOutlined" className={styles.quoteMark} />
                  <div>
                    <Text className={styles.quote}>{item.quote}</Text>
                    <Text className={styles.quoteName}>{item.name}</Text>
                    <Text className={styles.quoteRole}>{item.role}</Text>
                  </div>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.cta}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionLabel} style={{ color: "#9fc5ff" }}>
              Mari berkarier bersama
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              Jadilah Bagian dari Perubahan
            </Title>
            <Paragraph className={styles.ctaDescription}>
              Bersama dengan hebat, kita wujudkan solusi teknologi untuk Indonesia yang
              lebih baik.
            </Paragraph>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" href="#lowongan">
                Lihat Semua Lowongan <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/kontak">Hubungi Kami</Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Pertanyaan Umum</Text>
        <Title level={2} className={styles.sectionTitle}>
          Pertanyaan Seputar Karier di Vistara
        </Title>
        <div className={styles.faqGrid}>
          {faqs.map((item) => (
            <div className={styles.faqItem} key={item}>
              <Flex justify="space-between" align="center" gap={12}>
                <span>{item}</span>
                <Icon type="PlusOutlined" />
              </Flex>
            </div>
          ))}
        </div>
      </MarketingSection>
    </main>
  );
}
