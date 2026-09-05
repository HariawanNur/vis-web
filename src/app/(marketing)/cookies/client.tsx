"use client";

import { useEffect, useRef, useState } from "react";
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

const { Text, Title, Paragraph } = Typography;

const sections = [
  { id: "apa-itu-cookies", title: "Apa itu Cookies" },
  { id: "cookie-yang-kami-gunakan", title: "Cookie yang Kami Gunakan" },
  { id: "mengapa-menggunakan-cookies", title: "Mengapa Kami Menggunakan Cookies" },
  { id: "mengelola-preferensi", title: "Mengelola Preferensi Cookies" },
  { id: "cookie-pihak-ketiga", title: "Cookie Pihak Ketiga" },
  { id: "hubungi-kami", title: "Hubungi Kami" },
] as const;

const cookieTypes: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "LockOutlined",
    title: "Essensial",
    description:
      "Cookie yang diperlukan agar situs web dapat berfungsi dengan baik. Cookie ini tidak dapat dinonaktifkan karena merupakan bagian dari cara kerja layanan kami.",
  },
  {
    icon: "SettingOutlined",
    title: "Fungsional",
    description:
      "Cookie yang memungkinkan situs web mengingat pilihan yang Anda buat, seperti bahasa, wilayah, atau pengaturan tampilan, untuk memberikan pengalaman yang lebih personal.",
  },
  {
    icon: "BarChartOutlined",
    title: "Analitik",
    description:
      "Cookie yang mengumpulkan informasi tentang cara pengunjung menggunakan situs web, seperti halaman yang paling sering dikunjungi dan waktu respons server, untuk membantu kami meningkatkan kinerja situs.",
  },
  {
    icon: "BulbOutlined",
    title: "Pemasaran",
    description:
      "Cookie yang digunakan untuk melacak aktivitas pengunjung di berbagai situs web. Tujuannya adalah menampilkan iklan yang relevan dan menarik bagi pengguna individu.",
  },
];

const reasons = [
  "Memastikan situs web berfungsi dengan baik dan sesuai ekspektasi pengguna.",
  "Mengingat preferensi dan pengaturan yang telah Anda pilih.",
  "Menganalisis lalu lintas dan pola penggunaan untuk meningkatkan kualitas layanan.",
  "Menyediakan konten dan iklan yang relevan dengan minat Anda.",
  "Melindungi keamanan akun dan mencegah penyalahgunaan.",
];

const contactCards: { icon: IconName; label: string; value: string; href?: string }[] = [
  {
    icon: "MailOutlined",
    label: "Email",
    value: "privacy@vistara.co.id",
    href: "mailto:privacy@vistara.co.id",
  },
  {
    icon: "PhoneOutlined",
    label: "Telepon",
    value: "+62 21 5555 0123",
    href: "tel:+622155550123",
  },
  {
    icon: "EnvironmentOutlined",
    label: "Alamat",
    value: "Jl. Teknologi No. 88, Jakarta Selatan, DKI Jakarta 12345, Indonesia",
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
  heroInner: css`
    position: relative;
    z-index: 2;
    min-height: 320px;
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
    max-width: 600px;
    margin: 10px 0 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  heroBadge: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(340px, 36vw);
    min-height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 22px 0 0 0;
    background: linear-gradient(180deg, rgba(22, 119, 255, 0.12) 0%, rgba(22, 119, 255, 0.04) 100%);
    border: 1px solid rgba(103, 176, 255, 0.18);
    border-right: none;
    border-bottom: none;
    padding: 28px;
    overflow: hidden;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      width: 100%;
      min-height: auto;
      margin-top: 26px;
      border-radius: 18px;
      border-right: 1px solid rgba(103, 176, 255, 0.18);
      border-bottom: 1px solid rgba(103, 176, 255, 0.18);
    }
  `,
  heroBadgeGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 80% 20%, rgba(22, 119, 255, 0.14), transparent 40%),
      radial-gradient(circle at 20% 80%, rgba(103, 176, 255, 0.08), transparent 36%);
  `,
  heroBadgeContent: css`
    position: relative;
    z-index: 1;
  `,
  heroBadgeText: css`
    display: block;
    color: rgba(255, 255, 255, 0.92);
    font-size: clamp(22px, 2.8vw, 32px);
    font-weight: 850;
    line-height: 1.2;
    letter-spacing: -0.03em;
  `,
  heroBadgeLabel: css`
    display: block;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
    line-height: 1.5;
  `,
  heroShieldIcon: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    border-radius: 14px;
    background: rgba(22, 119, 255, 0.2);
    border: 1px solid rgba(22, 119, 255, 0.3);
    color: #6fb2ff;
    font-size: 22px;
  `,
  layoutGrid: css`
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 32px;
    align-items: start;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  sidebar: css`
    position: sticky;
    top: 96px;
    background: #fff;
    border: 1px solid #e8edf5;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(7, 17, 31, 0.04);

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: relative;
      top: auto;
    }
  `,
  sidebarTitle: css`
    margin: 0 0 16px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  sidebarItem: css`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 14px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: #4d5b78;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f0f5ff;
      color: #1e66d4;
    }
  `,
  sidebarItemActive: css`
    background: ${designSystem.palette.primary} !important;
    color: #fff !important;
  `,
  sidebarItemNumber: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
  `,
  sidebarItemActiveNumber: css`
    background: rgba(255, 255, 255, 0.25) !important;
    color: #fff !important;
  `,
  sidebarQuestionCard: css`
    margin-top: 20px;
    padding: 18px;
    border-radius: 14px;
    background: #f7f9fc;
    border: 1px solid #e8edf5;
    text-align: center;
  `,
  sidebarQuestionTitle: css`
    margin: 0 0 6px !important;
    color: #0b1532 !important;
    font-size: 14px !important;
    font-weight: 800 !important;
  `,
  sidebarQuestionText: css`
    margin: 0 0 14px !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.6 !important;
  `,
  contentArea: css`
    min-width: 0;
  `,
  contentHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8edf5;
    flex-wrap: wrap;
  `,
  lastUpdated: css`
    color: #597091;
    font-size: 14px;
  `,
  printButton: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border: 1px solid #dfe6f1;
    border-radius: 10px;
    background: #fff;
    color: #4d5b78;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #1e66d4;
      color: #1e66d4;
    }

    @media print {
      display: none !important;
    }
  `,
  sectionBlock: css`
    scroll-margin-top: 110px;
    padding-bottom: 32px;

    &:not(:last-child) {
      border-bottom: 1px solid #f0f3f8;
    }
  `,
  sectionHeading: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 16px !important;
    color: #1e66d4 !important;
    font-size: 20px !important;
    font-weight: 800 !important;
  `,
  sectionNumber: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 14px;
    font-weight: 800;
    flex-shrink: 0;
  `,
  sectionText: css`
    margin: 0 0 12px !important;
    color: #3f5373 !important;
    font-size: 15px !important;
    line-height: 1.8 !important;
  `,
  bulletList: css`
    margin: 12px 0 0;
    padding-left: 20px;

    li {
      color: #3f5373;
      font-size: 14px;
      line-height: 1.8;
      padding: 4px 0;

      &::marker {
        color: #1e66d4;
      }
    }
  `,
  cookieGrid: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 16px;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  cookieCard: css`
    border: 1px solid #e8edf5;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(7, 17, 31, 0.03);
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 8px 20px rgba(7, 17, 31, 0.06);
      transform: translateY(-2px);
    }

    :global(.ant-card-body) {
      padding: 22px !important;
    }
  `,
  cookieCardIcon: css`
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 12px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 20px;
    margin-bottom: 14px;
  `,
  cookieCardTitle: css`
    margin: 0 0 8px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  cookieCardDescription: css`
    margin: 0 !important;
    color: #597091 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  `,
  contactGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 20px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  contactCard: css`
    border: 1px solid #e8edf5;
    border-radius: 14px;
    background: #f7f9fc;
    transition: all 0.2s ease;

    &:hover {
      border-color: #d0dbed;
      box-shadow: 0 4px 12px rgba(7, 17, 31, 0.04);
    }

    :global(.ant-card-body) {
      padding: 22px !important;
    }
  `,
  contactCardIcon: css`
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 12px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 20px;
    margin-bottom: 14px;
  `,
  contactCardLabel: css`
    margin: 0 0 4px !important;
    color: #597091 !important;
    font-size: 13px !important;
    font-weight: 600 !important;
  `,
  contactCardValue: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 1.6 !important;
    word-break: break-word;
  `,
  bottomContact: css`
    padding-block: 56px;
    background: #f7f9fc;
  `,
  bottomContactLabel: css`
    display: block;
    margin-bottom: 8px;
    color: #1e66d4;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  bottomContactTitle: css`
    margin: 0 0 8px !important;
    color: #0b1532 !important;
    font-size: clamp(24px, 3vw, 36px) !important;
    font-weight: 850 !important;
    letter-spacing: -0.03em;
  `,
  bottomContactDescription: css`
    margin: 0 0 32px !important;
    color: #4d5b78 !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="Kebijakan Cookies"
        eyebrow="KEBIJAKAN COOKIES"
        titlePrefix={<span>Kebijakan </span>}
        titleAccent={<strong>Cookies</strong>}
        titleSuffix={null}
        description={
          <>
            Kebijakan ini menjelaskan bagaimana PT. Vistara Teknologi Indonesia
            menggunakan cookies dan teknologi serupa saat Anda mengunjungi dan
            menggunakan situs web kami.
          </>
        }
        visual={
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeGlow} />
            <div className={styles.heroBadgeContent}>
              <div className={styles.heroShieldIcon}>
                <Icon type="SafetyCertificateOutlined" />
              </div>
              <span className={styles.heroBadgeText}>
                Privasi Anda,<br />Komitmen Kami
              </span>
              <span className={styles.heroBadgeLabel}>
                Pengelolaan cookies yang transparan dan bertanggung jawab
              </span>
            </div>
          </div>
        }
      />

      <MarketingSection>
        <div className={styles.layoutGrid}>
          <aside className={styles.sidebar}>
            <Title level={5} className={styles.sidebarTitle}>
              Daftar Isi
            </Title>
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`${styles.sidebarItem} ${
                  activeSection === section.id ? styles.sidebarItemActive : ""
                }`}
                onClick={() => scrollToSection(section.id)}
              >
                <span
                  className={`${styles.sidebarItemNumber} ${
                    activeSection === section.id ? styles.sidebarItemActiveNumber : ""
                  }`}
                >
                  {index + 1}
                </span>
                {section.title}
              </button>
            ))}
            <div className={styles.sidebarQuestionCard}>
              <Title level={5} className={styles.sidebarQuestionTitle}>
                Pertanyaan?
              </Title>
              <Text className={styles.sidebarQuestionText}>
                Jika Anda memiliki pertanyaan tentang kebijakan cookies kami,
                jangan ragu untuk menghubungi kami.
              </Text>
              <Button type="primary" href="/kontak" block>
                Hubungi Kami
              </Button>
            </div>
          </aside>

          <div className={styles.contentArea}>
            <div className={styles.contentHeader}>
              <Text className={styles.lastUpdated}>
                Terakhir diperbarui: 1 September 2026
              </Text>
              <button
                className={styles.printButton}
                onClick={() => window.print()}
              >
                <Icon type="PrinterOutlined" />
                Cetak
              </button>
            </div>

            <div
              className={styles.sectionBlock}
              id="apa-itu-cookies"
              ref={(el) => {
                sectionRefs.current["apa-itu-cookies"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>1</span>
                Apa itu Cookies
              </Title>
              <Paragraph className={styles.sectionText}>
                Cookies adalah file teks kecil yang disimpan di perangkat Anda
                (komputer, tablet, atau ponsel) saat Anda mengunjungi situs web.
                Cookies umumnya digunakan agar situs web dapat mengenali perangkat
                pengguna dan mengingat informasi tertentu tentang kunjungan
                sebelumnya.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Cookies membantu kami menyediakan pengalaman browsing yang lebih
                baik, memahami cara pengunjung berinteraksi dengan situs kami, dan
                meningkatkan kualitas layanan kami. Cookies yang kami gunakan tidak
                menyimpan informasi yang dapat diidentifikasi secara langsung.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="cookie-yang-kami-gunakan"
              ref={(el) => {
                sectionRefs.current["cookie-yang-kami-gunakan"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>2</span>
                Cookie yang Kami Gunakan
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami menggunakan berbagai jenis cookies untuk berbagai tujuan.
                Berikut adalah kategori cookies yang kami gunakan:
              </Paragraph>
              <div className={styles.cookieGrid}>
                {cookieTypes.map((cookie) => (
                  <Card key={cookie.title} className={styles.cookieCard}>
                    <span className={styles.cookieCardIcon}>
                      <Icon type={cookie.icon} />
                    </span>
                    <Title level={4} className={styles.cookieCardTitle}>
                      {cookie.title}
                    </Title>
                    <Paragraph className={styles.cookieCardDescription}>
                      {cookie.description}
                    </Paragraph>
                  </Card>
                ))}
              </div>
            </div>

            <div
              className={styles.sectionBlock}
              id="mengapa-menggunakan-cookies"
              ref={(el) => {
                sectionRefs.current["mengapa-menggunakan-cookies"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>3</span>
                Mengapa Kami Menggunakan Cookies
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami menggunakan cookies untuk berbagai tujuan, antara lain:
              </Paragraph>
              <ul className={styles.bulletList}>
                {reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>

            <div
              className={styles.sectionBlock}
              id="mengelola-preferensi"
              ref={(el) => {
                sectionRefs.current["mengelola-preferensi"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>4</span>
                Mengelola Preferensi Cookies
              </Title>
              <Paragraph className={styles.sectionText}>
                Anda memiliki hak untuk mengontrol penggunaan cookies. Anda dapat
                mengatur preferensi cookies melalui pengaturan browser yang Anda
                gunakan. Sebagian besar browser memungkinkan Anda untuk memblokir
                atau menghapus cookies dari situs web tertentu atau semua situs web.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Namun, perlu diingat bahwa menonaktifkan atau memblokir cookies
                tertentu dapat mempengaruhi fungsionalitas dan pengalaman Anda
                saat menggunakan situs web kami. Fitur-fitur tertentu mungkin tidak
                berfungsi dengan baik jika cookies dinonaktifkan.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="cookie-pihak-ketiga"
              ref={(el) => {
                sectionRefs.current["cookie-pihak-ketiga"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>5</span>
                Cookie Pihak Ketiga
              </Title>
              <Paragraph className={styles.sectionText}>
                Situs web kami mungkin menggunakan cookie pihak ketiga yang
                disediakan oleh layanan analitik seperti Google Analytics. Cookie
                pihak ketiga ini membantu kami menganalisis lalu lintas web dan
                memahami cara pengunjung menggunakan situs kami.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Informasi yang dikumpulkan oleh cookie pihak ketiga dikirim dan
                disimpan oleh penyedia layanan masing-masing sesuai dengan
                kebijakan privasi mereka. Kami menyarankan Anda untuk membaca
                kebijakan privasi dari penyedia layanan pihak ketiga tersebut untuk
                memahami bagaimana mereka mengelola data.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="hubungi-kami"
              ref={(el) => {
                sectionRefs.current["hubungi-kami"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>6</span>
                Hubungi Kami
              </Title>
              <Paragraph className={styles.sectionText}>
                Jika Anda memiliki pertanyaan, keluhan, atau permintaan terkait
                Kebijakan Cookies ini, silakan hubungi kami melalui saluran
                berikut:
              </Paragraph>
              <div className={styles.contactGrid}>
                {contactCards.map((card) => (
                  <Card key={card.label} className={styles.contactCard}>
                    <span className={styles.contactCardIcon}>
                      <Icon type={card.icon} />
                    </span>
                    <Text className={styles.contactCardLabel}>{card.label}</Text>
                    {card.href ? (
                      <a href={card.href} style={{ textDecoration: "none" }}>
                        <Paragraph className={styles.contactCardValue}>
                          {card.value}
                        </Paragraph>
                      </a>
                    ) : (
                      <Paragraph className={styles.contactCardValue}>
                        {card.value}
                      </Paragraph>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MarketingSection>

      <section className={styles.bottomContact}>
        <MarketingContainer>
          <Text className={styles.bottomContactLabel}>Hubungi Kami</Text>
          <Title level={2} className={styles.bottomContactTitle}>
            Ada Pertanyaan?
          </Title>
          <Paragraph className={styles.bottomContactDescription}>
            Tim kami siap membantu Anda mengenai kebijakan cookies dan privasi
            data.
          </Paragraph>
          <div className={styles.contactGrid}>
            {contactCards.map((card) => (
              <Card key={card.label} className={styles.contactCard}>
                <span className={styles.contactCardIcon}>
                  <Icon type={card.icon} />
                </span>
                <Text className={styles.contactCardLabel}>{card.label}</Text>
                {card.href ? (
                  <a href={card.href} style={{ textDecoration: "none" }}>
                    <Paragraph className={styles.contactCardValue}>
                      {card.value}
                    </Paragraph>
                  </a>
                ) : (
                  <Paragraph className={styles.contactCardValue}>
                    {card.value}
                  </Paragraph>
                )}
              </Card>
            ))}
          </div>
        </MarketingContainer>
      </section>
    </main>
  );
}
