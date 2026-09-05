"use client";

import { useEffect, useRef, useState } from "react";
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

const { Text, Title, Paragraph } = Typography;

const sections = [
  { id: "informasi-umum", title: "Informasi Umum" },
  { id: "tautan-eksternal", title: "Tautan Eksternal" },
  { id: "profesionalisme", title: "Profesionalisme" },
  { id: "penafian-garansi", title: "Penafian Garansi" },
  { id: "perubahan", title: "Perubahan" },
] as const;

const contactCards: { icon: IconName; label: string; value: string; href?: string }[] = [
  {
    icon: "MailOutlined",
    label: "Email",
    value: "info@vistara.co.id",
    href: "mailto:info@vistara.co.id",
  },
  {
    icon: "PhoneOutlined",
    label: "Telepon",
    value: "+62 21 1234 5678",
    href: "tel:+622112345678",
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
        backgroundAlt="Disclaimers"
        eyebrow="DISCLAIMERS"
        titlePrefix={null}
        titleAccent="Disclaimers"
        titleSuffix={null}
        description={
          <>
            Penafian dan ketentuan penggunaan informasi pada situs web PT. Vistara
            Teknologi Indonesia. Harap membaca seluruh penafian ini dengan saksama
            sebelum mengandalkan informasi yang tersedia.
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
                Transparansi ·<br />Kepercayaan · Integritas
              </span>
              <span className={styles.heroBadgeLabel}>
                Komitmen kami dalam menyampaikan informasi secara jujur dan terbuka
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
                Ada Pertanyaan?
              </Title>
              <Text className={styles.sidebarQuestionText}>
                Jika Anda memiliki pertanyaan mengenai penafian ini, jangan ragu
                untuk menghubungi kami.
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
              id="informasi-umum"
              ref={(el) => {
                sectionRefs.current["informasi-umum"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>1</span>
                Informasi Umum
              </Title>
              <Paragraph className={styles.sectionText}>
                Seluruh informasi, materi, dan konten yang tersedia pada situs web
                ini disediakan oleh PT. Vistara Teknologi Indonesia ("Vistara")
                hanya untuk tujuan informasi umum. Informasi yang ditampilkan
                bersifat umum dan tidak dimaksudkan sebagai saran profesional,
                teknis, atau keuangan yang spesifik bagi situasi individu atau
                organisasi tertentu.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Vistara berusaha keras untuk memastikan bahwa informasi yang
                dipublikasikan adalah akurat, terkini, dan lengkap pada saat
                penayangannya. Namun, Vistara tidak memberikan jaminan atau
                pernyataan apa pun mengenai keakuratan, kelengkapan, keandalan,
                atau kesesuaian informasi tersebut untuk tujuan tertentu. Setiap
                kebergantungan pada informasi yang tersedia di situs ini merupakan
                risiko pengguna sendiri.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="tautan-eksternal"
              ref={(el) => {
                sectionRefs.current["tautan-eksternal"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>2</span>
                Tautan Eksternal
              </Title>
              <Paragraph className={styles.sectionText}>
                Situs web ini mungkin memuat tautan ke situs web atau sumber daya
                eksternal yang tidak dikendalikan atau dikelola oleh Vistara.
                Penyediaan tautan tersebut tidak menyiratkan dukungan, rekomendasi,
                atau persetujuan Vistara terhadap konten, produk, layanan, atau
                pandangan yang disampaikan di dalam situs-situs eksternal tersebut.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Vistara tidak bertanggung jawab atas konten, kebijakan privasi,
                atau praktik situs web pihak ketiga mana pun. Pengguna disarankan
                untuk meninjau syarat dan ketentuan serta kebijakan privasi dari
                setiap situs web pihak ketiga yang mereka kunjungi melalui tautan
                yang tersedia di situs ini.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="profesionalisme"
              ref={(el) => {
                sectionRefs.current["profesionalisme"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>3</span>
                Profesionalisme
              </Title>
              <Paragraph className={styles.sectionText}>
                Informasi yang tersedia di situs web ini tidak boleh dianggap
                sebagai pengganti konsultasi dengan profesional yang kompeten di
                bidang masing-masing. Vistara menyarankan agar pengguna selalu
                berkonsultasi dengan ahli yang berkualifikasi sebelum mengambil
                keputusan bisnis, teknis, hukum, atau keuangan yang signifikan.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Vistara, beserta direksi, karyawan, dan afiliasinya, tidak akan
                bertanggung jawab atas kerugian atau kerusakan apa pun yang timbul
                dari kebergantungan pada informasi yang tersedia di situs ini atau
                yang diperoleh melalui komunikasi dengan tim Vistara.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="penafian-garansi"
              ref={(el) => {
                sectionRefs.current["penafian-garansi"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>4</span>
                Penafian Garansi
              </Title>
              <Paragraph className={styles.sectionText}>
                Layanan dan informasi yang disediakan melalui situs web ini
                disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa
                jaminan apa pun, baik tersurat maupun tersirat, termasuk namun
                tidak terbatas pada jaminan kelaikan untuk tujuan tertentu,
                non-pelanggaran, atau kelangsungan ketersediaan layanan.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Vistara tidak menjamin bahwa situs web ini akan selalu tersedia,
                bebas dari kesalahan atau virus, atau bahwa situs web dan server
                yang menghostingnya selalu aman dan bebas dari gangguan pihak
                luar. Pengguna bertanggung jawab untuk melakukan pencadangan data
                dan perlindungan perangkat mereka sendiri saat mengakses situs ini.
              </Paragraph>
            </div>

            <div
              className={styles.sectionBlock}
              id="perubahan"
              ref={(el) => {
                sectionRefs.current["perubahan"] = el;
              }}
            >
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>5</span>
                Perubahan
              </Title>
              <Paragraph className={styles.sectionText}>
                Vistara berhak untuk mengubah, memodifikasi, atau memperbarui
                penafian ini kapan saja tanpa pemberitahuan sebelumnya. Perubahan
                akan berlaku segera setelah dipublikasikan pada halaman ini.
                Penggunaan situs web ini secara berkelanjutan setelah perubahan
                tersebut merupakan persetujuan pengguna terhadap versi penafian
                yang telah diperbarui.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Kami menyarankan pengguna untuk memeriksa halaman ini secara
                berkala untuk mengetahui adanya perubahan yang mungkin terjadi.
                Ketentuan penafian ini berlaku sejak tanggal terakhir pembaruan
                yang tercantum di bagian atas halaman ini.
              </Paragraph>
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
            Tim kami siap membantu Anda mengenai penafian dan ketentuan
            penggunaan informasi pada situs kami.
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
