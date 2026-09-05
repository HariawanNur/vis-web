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
import { MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;

const sections = [
  { id: "pendahuluan", title: "Pendahuluan" },
  { id: "definisi", title: "Definisi" },
  { id: "penggunaan-layanan", title: "Penggunaan Layanan" },
  { id: "akun-pengguna", title: "Akun Pengguna" },
  { id: "hak-dan-kewajiban", title: "Hak dan Kewajiban" },
  { id: "pembayaran-dan-biaya", title: "Pembayaran dan Biaya" },
  { id: "konten-pengguna", title: "Konten Pengguna" },
  { id: "pembatasan-penggunaan", title: "Pembatasan Penggunaan" },
  { id: "kekayaan-intelektual", title: "Kekayaan Intelektual" },
  { id: "penafian", title: "Penafian (Disclaimer)" },
  { id: "pembatasan-tanggung-jawab", title: "Pembatasan Tanggung Jawab" },
  { id: "perubahan-ketentuan", title: "Perubahan Ketentuan" },
  { id: "pengakhiran-layanan", title: "Pengakhiran Layanan" },
  { id: "hukum-yang-berlaku", title: "Hukum yang Berlaku" },
  { id: "kontak-kami", title: "Kontak Kami" },
] as const;

const definitionCards = [
  {
    icon: "UserOutlined",
    title: "Pengguna",
    description: "Setiap individu atau perusahaan yang mengakses atau menggunakan layanan Vistara.",
  },
  {
    icon: "AppstoreOutlined",
    title: "Layanan",
    description: "Seluruh produk, platform, situs web, dan aplikasi yang disediakan oleh Vistara.",
  },
  {
    icon: "FileTextOutlined",
    title: "Konten",
    description: "Semua informasi, data, teks, gambar, video, dan materi lain yang tersedia melalui layanan.",
  },
  {
    icon: "BankOutlined",
    title: "Perusahaan",
    description: "PT. Vistara Teknologi Indonesia, entitas hukum yang menyediakan layanan.",
  },
] as const;

const contactCards = [
  {
    icon: "MailOutlined",
    title: "Email",
    value: "vistarateknologiindonesia@gmail.com",
    subtitle: "Kami akan membalas dalam 1×24 jam",
  },
  {
    icon: "PhoneOutlined",
    title: "Telepon",
    value: "+62 851 1715 8205",
    subtitle: "Senin - Jumat, 09.00 - 18.00 WIB",
  },
  {
    icon: "EnvironmentOutlined",
    title: "Alamat",
    value: "Jl. Bhakti Abri No. 146, Depok, Indonesia 16455",
    subtitle: "Kantor Pusat Vistara",
  },
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
    background: linear-gradient(135deg, #07111f 0%, #0a2f6e 50%, #1677ff 100%);
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
    font-size: 16px !important;
    line-height: 1.75 !important;
  `,
  introPanel: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(420px, 40vw);
    min-height: 340px;
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
      min-height: 280px;
      margin-top: 26px;
      border-radius: 18px;
      border-right: 1px solid rgba(103, 176, 255, 0.18);
      border-bottom: 1px solid rgba(103, 176, 255, 0.18);
    }
  `,
  panelGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 80% 20%, rgba(22, 119, 255, 0.14), transparent 40%),
      radial-gradient(circle at 20% 80%, rgba(103, 176, 255, 0.08), transparent 36%);
  `,
  panelContent: css`
    position: relative;
    z-index: 1;
  `,
  panelBadge: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 999px;
    background: rgba(22, 119, 255, 0.2);
    border: 1px solid rgba(22, 119, 255, 0.3);
    color: #6fb2ff;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.5;
  `,
  contentSection: css`
    padding-block: 72px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  contentLayout: css`
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
    align-items: start;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  sidebar: css`
    position: sticky;
    top: 96px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      position: static;
      max-height: none;
    }
  `,
  sidebarCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(12, 24, 48, 0.04);

    :global(.ant-card-body) {
      padding: 16px !important;
    }
  `,
  sidebarItem: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    color: #4d5b78;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
      background: #f0f5ff;
      color: #1e66d4;
    }
  `,
  sidebarItemActive: css`
    background: #1e66d4 !important;
    color: #fff !important;
  `,
  sidebarNumber: css`
    display: grid;
    width: 26px;
    height: 26px;
    place-items: center;
    border-radius: 8px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
  `,
  sidebarNumberActive: css`
    background: rgba(255, 255, 255, 0.2) !important;
    color: #fff !important;
  `,
  helpCard: css`
    margin-top: 16px;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #f7f9fc;
    padding: 20px !important;
  `,
  helpTitle: css`
    margin: 0 0 6px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  helpText: css`
    margin: 0 0 14px !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.6 !important;
  `,
  mainContent: css`
    min-width: 0;
  `,
  metaBar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #edf1f7;
    flex-wrap: wrap;
  `,
  lastUpdated: css`
    color: #597091;
    font-size: 14px;
  `,
  printButton: css`
    color: #1e66d4 !important;
    font-weight: 700 !important;
  `,
  sectionBlock: css`
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  `,
  sectionHeading: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px !important;
  `,
  sectionNumber: css`
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 10px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 14px;
    font-weight: 800;
    flex-shrink: 0;
  `,
  sectionTitle: css`
    margin: 0 !important;
    color: #1e66d4 !important;
    font-size: 22px !important;
    line-height: 1.3 !important;
    font-weight: 800 !important;
  `,
  sectionBody: css`
    color: #37506f;
    font-size: 15px;
    line-height: 1.8;

    p {
      margin-bottom: 12px;
    }

    ul {
      margin: 12px 0;
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        line-height: 1.7;
      }
    }
  `,
  definitionGrid: css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 16px;

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  definitionCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(12, 24, 48, 0.04);

    :global(.ant-card-body) {
      padding: 20px !important;
    }
  `,
  definitionIcon: css`
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 12px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 22px;
  `,
  definitionTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  definitionDescription: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
  `,
  rightsGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 16px;

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  rightsCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(12, 24, 48, 0.04);

    :global(.ant-card-body) {
      padding: 20px !important;
    }
  `,
  rightsTitle: css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  rightsList: css`
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px 0;
      color: #37506f;
      font-size: 14px;
      line-height: 1.6;

      &:not(:last-child) {
        border-bottom: 1px solid #f0f3f8;
      }
    }
  `,
  contactGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 20px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
  `,
  contactCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(12, 24, 48, 0.04);

    :global(.ant-card-body) {
      padding: 20px !important;
    }
  `,
  contactIcon: css`
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 12px;
    color: #1e66d4;
    background: #edf5ff;
    font-size: 22px;
  `,
  contactTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  contactValue: css`
    margin: 0 !important;
    color: #1e66d4 !important;
    font-size: 14px !important;
    font-weight: 700 !important;
  `,
  contactSubtitle: css`
    margin: 4px 0 0 !important;
    color: #597091 !important;
    font-size: 12px !important;
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
  sectionLabel: css`
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr,
          );
          setActiveSection(top.target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current.set(id, el);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current.get(id) ?? document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="Syarat dan Ketentuan"
        eyebrow="Syarat & Ketentuan"
        titlePrefix={<><span>Syarat &</span><br /></>}
        titleAccent={<strong>Ketentuan</strong>}
        titleSuffix={null}
        description={<>Ketentuan penggunaan layanan yang mengatur hubungan antara Anda dan PT. Vistara Teknologi Indonesia. Harap membaca seluruh ketentuan ini dengan saksama sebelum menggunakan layanan kami.</>}
        visual={<div className={styles.introPanel}><div className={styles.panelGlow} /><div className={styles.panelContent}><span className={styles.panelBadge}>Transparansi · Kepercayaan · Kolaborasi · Masa Depan Bersama</span></div></div>}
      />

      <MarketingSection className={styles.contentSection}>
        <div className={styles.contentLayout}>
          <aside className={styles.sidebar}>
            <Card className={styles.sidebarCard}>
              <nav>
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  return (
                    <div
                      key={section.id}
                      className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ""}`}
                      onClick={() => scrollToSection(section.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") scrollToSection(section.id);
                      }}
                    >
                      <span className={`${styles.sidebarNumber} ${isActive ? styles.sidebarNumberActive : ""}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </div>
                  );
                })}
              </nav>
            </Card>

            <Card className={styles.helpCard}>
              <Title level={4} className={styles.helpTitle}>
                Pertanyaan?
              </Title>
              <Text className={styles.helpText}>
                Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini,
                jangan ragu untuk menghubungi kami.
              </Text>
              <Button type="primary" href="/kontak" block>
                Hubungi Kami
              </Button>
            </Card>
          </aside>

          <div className={styles.mainContent}>
            <div className={styles.metaBar}>
              <Text className={styles.lastUpdated}>Terakhir diperbarui: 1 September 2026</Text>
              <Button
                type="link"
                className={styles.printButton}
                icon={<Icon type="PrinterOutlined" />}
                onClick={() => window.print()}
              >
                Cetak
              </Button>
            </div>

            {/* Section 1 - Pendahuluan */}
            <div className={styles.sectionBlock} id="pendahuluan">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>01</span>
                <Title level={2} className={styles.sectionTitle}>
                  Pendahuluan
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Syarat dan ketentuan berikut berlaku untuk penggunaan seluruh produk,
                  platform, situs web, dan aplikasi yang disediakan oleh PT. Vistara
                  Teknologi Indonesia (&quot;Perusahaan&quot;). Dengan mengakses atau menggunakan
                  layanan kami, Anda (&quot;Pengguna&quot;) menyatakan telah membaca, memahami,
                  dan setuju untuk terikat oleh ketentuan ini.
                </p>
                <p>
                  Jika Anda tidak setuju dengan sebagian atau seluruh ketentuan ini,
                  Anda tidak diperkenankan untuk menggunakan layanan kami. Perusahaan
                  berhak untuk mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan
                  sebelumnya, dan penggunaan layanan secara berkelanjutan setelah
                  perubahan merupakan persetujuan Anda terhadap ketentuan yang telah
                  diperbarui.
                </p>
              </div>
            </div>

            {/* Section 2 - Definisi */}
            <div className={styles.sectionBlock} id="definisi">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>02</span>
                <Title level={2} className={styles.sectionTitle}>
                  Definisi
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Dalam ketentuan ini, istilah-istilah berikut memiliki arti sebagai
                  berikut:
                </p>
              </div>
              <div className={styles.definitionGrid}>
                {definitionCards.map((item) => (
                  <Card key={item.title} className={styles.definitionCard}>
                    <Flex vertical gap={12}>
                      <span className={styles.definitionIcon}>
                        <Icon type={item.icon as IconName} />
                      </span>
                      <Title level={3} className={styles.definitionTitle}>
                        {item.title}
                      </Title>
                      <Text className={styles.definitionDescription}>
                        {item.description}
                      </Text>
                    </Flex>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section 3 - Penggunaan Layanan */}
            <div className={styles.sectionBlock} id="penggunaan-layanan">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>03</span>
                <Title level={2} className={styles.sectionTitle}>
                  Penggunaan Layanan
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Pengguna berhak menggunakan layanan sesuai dengan ketentuan yang
                  berlaku. Dalam menggunakan layanan, Pengguna wajib mematuhi ketentuan
                  sebagai berikut:
                </p>
                <ul>
                  <li>
                    Penggunaan layanan harus sesuai dengan hukum dan peraturan
                    perundang-undangan yang berlaku di Republik Indonesia.
                  </li>
                  <li>
                    Pengguna dilarang menggunakan layanan untuk tujuan yang melanggar
                    hukum, merugikan pihak lain, atau bertentangan dengan ketentuan ini.
                  </li>
                  <li>
                    Pengguna bertanggung jawab atas semua aktivitas yang dilakukan
                    melalui akunnya.
                  </li>
                  <li>
                    Pengguna wajib memberikan informasi yang akurat dan terkini saat
                    mendaftar dan menggunakan layanan.
                  </li>
                  <li>
                    Pengguna tidak diperkenankan mengganggu atau mencoba mengganggu
                    keamanan atau kinerja layanan.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 - Akun Pengguna */}
            <div className={styles.sectionBlock} id="akun-pengguna">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>04</span>
                <Title level={2} className={styles.sectionTitle}>
                  Akun Pengguna
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Untuk mengakses fitur tertentu dari layanan, Pengguna mungkin perlu
                  membuat akun. Ketentuan terkait akun Pengguna adalah sebagai berikut:
                </p>
                <ul>
                  <li>
                    Pengguna wajib menjaga kerahasiaan kredensial akun (username dan
                    password) dan tidak mengungkapkannya kepada pihak ketiga mana pun.
                  </li>
                  <li>
                    Pengguna bertanggung jawab penuh atas semua aktivitas yang terjadi
                    di bawah akunnya.
                  </li>
                  <li>
                    Pengguna wajib segera memberitahukan Perusahaan jika terjadi
                    penyalahgunaan atau keamanan akun yang dikompromikan.
                  </li>
                  <li>
                    Perusahaan berhak menangguhkan atau menghapus akun yang melanggar
                    ketentuan ini tanpa pemberitahuan sebelumnya.
                  </li>
                  <li>
                    Satu akun hanya boleh digunakan oleh satu individu atau entitas.
                    Pengguna tidak diperkenankan memindahkan atau menjual akunnya.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5 - Hak dan Kewajiban */}
            <div className={styles.sectionBlock} id="hak-dan-kewajiban">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>05</span>
                <Title level={2} className={styles.sectionTitle}>
                  Hak dan Kewajiban
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Berikut adalah hak dan kewajiban yang melekat pada Pengguna dalam
                  menggunakan layanan Perusahaan:
                </p>
              </div>
              <div className={styles.rightsGrid}>
                <Card className={styles.rightsCard}>
                  <Title level={3} className={styles.rightsTitle}>
                    <Icon type="SafetyOutlined" /> Hak Pengguna
                  </Title>
                  <ul className={styles.rightsList}>
                    <li>
                      <Icon type="CheckOutlined" /> Mengakses layanan kapan saja dan
                      di mana saja selama terhubung dengan internet.
                    </li>
                    <li>
                      <Icon type="CheckOutlined" /> Mendapatkan dukungan teknis dari
                      tim profesional Perusahaan.
                    </li>
                    <li>
                      <Icon type="CheckOutlined" /> Memberikan masukan dan saran untuk
                      peningkatan kualitas layanan.
                    </li>
                    <li>
                      <Icon type="CheckOutlined" /> Mendapatkan perlindungan data dan
                      privasi sesuai dengan kebijakan yang berlaku.
                    </li>
                  </ul>
                </Card>
                <Card className={styles.rightsCard}>
                  <Title level={3} className={styles.rightsTitle}>
                    <Icon type="ExclamationCircleOutlined" /> Kewajiban Pengguna
                  </Title>
                  <ul className={styles.rightsList}>
                    <li>
                      <Icon type="RightOutlined" /> Menggunakan layanan secara bertanggung
                      jawab dan sesuai ketentuan.
                    </li>
                    <li>
                      <Icon type="RightOutlined" /> Mematuhi peraturan perundang-undangan
                      yang berlaku.
                    </li>
                    <li>
                      <Icon type="RightOutlined" /> Tidak menyalahgunakan layanan untuk
                      kegiatan yang merugikan pihak lain.
                    </li>
                    <li>
                      <Icon type="RightOutlined" /> Menjaga kerahasiaan akun dan data
                      pribadi yang dimiliki.
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Section 6 - Pembayaran dan Biaya */}
            <div className={styles.sectionBlock} id="pembayaran-dan-biaya">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>06</span>
                <Title level={2} className={styles.sectionTitle}>
                  Pembayaran dan Biaya
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Beberapa layanan Perusahaan mungkin memerlukan pembayaran biaya tertentu.
                  Ketentuan pembayaran dan biaya adalah sebagai berikut:
                </p>
                <ul>
                  <li>
                    Informasi mengenai biaya layanan akan ditampilkan secara transparan
                    pada platform atau situs web Perusahaan.
                  </li>
                  <li>
                    Perusahaan berhak mengubah harga layanan sewaktu-waktu dengan
                    pemberitahuan yang wajar kepada Pengguna.
                  </li>
                  <li>
                    Pembayaran harus dilakukan sesuai dengan metode dan jangka waktu yang
                    telah ditentukan.
                  </li>
                  <li>
                    Keterlambatan pembayaran dapat mengakibatkan penangguhan atau
                    penghentian sementara akses layanan.
                  </li>
                  <li>
                    Semua biaya yang telah dibayarkan tidak dapat dikembalikan kecuali
                    diatur lain dalam ketentuan khusus atau perjanjian tertulis.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 - Konten Pengguna */}
            <div className={styles.sectionBlock} id="konten-pengguna">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>07</span>
                <Title level={2} className={styles.sectionTitle}>
                  Konten Pengguna
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Pengguna dapat mengunggah, menyimpan, atau membagikan konten melalui
                  layanan Perusahaan. Ketentuan terkait konten Pengguna adalah sebagai
                  berikut:
                </p>
                <ul>
                  <li>
                    Pengguna mempertahankan kepemilikan atas konten yang diunggahnya,
                    namun memberikan hak lisensi kepada Perusahaan untuk menggunakan,
                    menampilkan, dan mendistribusikan konten tersebut dalam rangka
                    penyediaan layanan.
                  </li>
                  <li>
                    Pengguna bertanggung jawab penuh atas konten yang diunggah dan
                    menjamin bahwa konten tersebut tidak melanggar hak kekayaan
                    intelektual pihak ketiga.
                  </li>
                  <li>
                    Perusahaan berhak menghapus konten yang melanggar ketentuan ini
                    tanpa pemberitahuan sebelumnya.
                  </li>
                  <li>
                    Pengguna tidak diperkenankan mengunggah konten yang mengandung
                    unsur SARA, kekerasan, pornografi, atau materi ilegal lainnya.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 8 - Pembatasan Penggunaan */}
            <div className={styles.sectionBlock} id="pembatasan-penggunaan">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>08</span>
                <Title level={2} className={styles.sectionTitle}>
                  Pembatasan Penggunaan
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Pengguna dilarang melakukan hal-hal berikut dalam menggunakan layanan
                  Perusahaan:
                </p>
                <ul>
                  <li>
                    Melakukan reverse engineering, decompile, atau decompile terhadap
                    perangkat lunak atau sistem layanan.
                  </li>
                  <li>
                    Menggunakan bot, scraper, atau metode otomatis lainnya untuk mengakses
                    layanan tanpa izin tertulis dari Perusahaan.
                  </li>
                  <li>
                    Mengganggu atau mencoba mengganggu keamanan, integritas, atau
                    kinerja layanan.
                  </li>
                  <li>
                    Meneruskan virus, malware, atau kode berbahaya lainnya melalui
                    layanan.
                  </li>
                  <li>
                    Menggunakan layanan untuk mengumpulkan data pribadi pengguna lain
                    tanpa izin.
                  </li>
                  <li>
                    Menjual, meminjamkan, atau mentransfer akun atau akses layanan
                    kepada pihak ketiga.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 9 - Kekayaan Intelektual */}
            <div className={styles.sectionBlock} id="kekayaan-intelektual">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>09</span>
                <Title level={2} className={styles.sectionTitle}>
                  Kekayaan Intelektual
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Seluruh konten, merek dagang, logo, desain, dan materi lain yang
                  tersedia dalam layanan merupakan kekayaan intelektual Perusahaan atau
                  pihak ketiga yang memberikan lisensinya kepada Perusahaan.
                </p>
                <ul>
                  <li>
                    Pengguna tidak diperkenankan menyalin, memodifikasi, mendistribusikan,
                    atau menggunakan kekayaan intelektual Perusahaan tanpa izin tertulis.
                  </li>
                  <li>
                    Penggunaan merek dagang, logo, atau materi branded dari Perusahaan
                    hanya diperkenankan untuk tujuan yang telah disetujui secara tertulis.
                  </li>
                  <li>
                    Pelanggaran terhadap ketentuan kekayaan intelektual dapat mengakibatkan
                    tindakan hukum sesuai dengan peraturan yang berlaku.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 10 - Penafian (Disclaimer) */}
            <div className={styles.sectionBlock} id="penafian">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>10</span>
                <Title level={2} className={styles.sectionTitle}>
                  Penafian (Disclaimer)
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Layanan disediakan dalam kondisi &quot;sebagaimana adanya&quot; dan &quot;sebagaimana
                  tersedia&quot; tanpa jaminan apa pun, baik tersurat maupun tersirat.
                  Perusahaan tidak menjamin bahwa layanan akan selalu tersedia, bebas
                  dari kesalahan, atau sesuai dengan kebutuhan Pengguna.
                </p>
                <ul>
                  <li>
                    Perusahaan tidak bertanggung jawab atas kerugian yang timbul akibat
                    penggunaan atau ketidakmampuan menggunakan layanan.
                  </li>
                  <li>
                    Perusahaan tidak menjamin keakuratan, kelengkapan, atau ketepatan
                    waktu dari informasi yang tersedia dalam layanan.
                  </li>
                  <li>
                    Pengguna memahami dan setuju bahwa penggunaan layanan adalah atas
                    risiko Pengguna sendiri.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 11 - Pembatasan Tanggung Jawab */}
            <div className={styles.sectionBlock} id="pembatasan-tanggung-jawab">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>11</span>
                <Title level={2} className={styles.sectionTitle}>
                  Pembatasan Tanggung Jawab
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Dalam batasan yang diizinkan oleh hukum yang berlaku, Perusahaan tidak
                  bertanggung jawab atas:
                </p>
                <ul>
                  <li>
                    Kerugian tidak langsung, insidental, khusus, konsekuensial, atau
                    hukuman yang timbul dari penggunaan layanan.
                  </li>
                  <li>
                    Kehilangan keuntungan, data, atau peluang bisnis yang mungkin terjadi
                    akibat penggunaan atau ketidakmampuan menggunakan layanan.
                  </li>
                  <li>
                    Tindakan atau kelalaian pihak ketiga yang terkait dengan layanan.
                  </li>
                  <li>
                    Kerusakan pada perangkat atau sistem Pengguna yang timbul akibat
                    penggunaan layanan.
                  </li>
                </ul>
                <p>
                  Total tanggung jawab Perusahaan dalam hal apa pun tidak akan melebihi
                  jumlah yang telah dibayarkan oleh Pengguna kepada Perusahaan dalam
                  12 (dua belas) bulan sebelum kejadian yang menjadi dasar tanggung
                  jawab tersebut.
                </p>
              </div>
            </div>

            {/* Section 12 - Perubahan Ketentuan */}
            <div className={styles.sectionBlock} id="perubahan-ketentuan">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>12</span>
                <Title level={2} className={styles.sectionTitle}>
                  Perubahan Ketentuan
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Perusahaan berhak untuk mengubah, memodifikasi, atau memperbarui
                  ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera setelah
                  dipublikasikan melalui platform atau situs web Perusahaan.
                </p>
                <ul>
                  <li>
                    Pengguna akan diberitahu mengenai perubahan material melalui email
                    atau pemberitahuan pada platform.
                  </li>
                  <li>
                    Penggunaan layanan secara berkelanjutan setelah perubahan ketentuan
                    merupakan persetujuan Pengguna terhadap ketentuan yang telah diperbarui.
                  </li>
                  <li>
                    Jika Pengguna tidak setuju dengan perubahan ketentuan, Pengguna
                    dapat menghentikan penggunaan layanan dan menghubungi Perusahaan
                    untuk penutupan akun.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 13 - Pengakhiran Layanan */}
            <div className={styles.sectionBlock} id="pengakhiran-layanan">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>13</span>
                <Title level={2} className={styles.sectionTitle}>
                  Pengakhiran Layanan
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Perusahaan berhak untuk menangguhkan atau mengakhiri akses Pengguna
                  terhadap layanan sewaktu-waktu, dengan atau tanpa alasan, dengan atau
                  tanpa pemberitahuan sebelumnya.
                </p>
                <ul>
                  <li>
                    Pengguna dapat mengakhiri penggunaan layanan dengan menghubungi
                    Perusahaan dan meminta penutupan akun.
                  </li>
                  <li>
                    Setelah pengakhiran, hak Pengguna untuk menggunakan layanan akan
                    segera dihentikan.
                  </li>
                  <li>
                    Perusahaan dapat menyimpan data Pengguna selama yang diperlukan
                    untuk memenuhi kewajiban hukum atau kepentingan bisnis yang sah.
                  </li>
                  <li>
                    Ketentuan yang secara inheren harus tetap berlaku setelah pengakhiran
                    akan tetap berlaku, termasuk tetapi tidak terbatas pada ketentuan
                    kepemilikan, penafian, dan pembatasan tanggung jawab.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 14 - Hukum yang Berlaku */}
            <div className={styles.sectionBlock} id="hukum-yang-berlaku">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>14</span>
                <Title level={2} className={styles.sectionTitle}>
                  Hukum yang Berlaku
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum
                  Republik Indonesia. Setiap perselisihan yang timbul dari atau terkait
                  dengan ketentuan ini akan diselesaikan secara musyawarah untuk mufakat.
                </p>
                <p>
                  Jika musyawarah tidak mencapai kesepakatan, maka perselisihan tersebut
                  akan diselesaikan melalui pengadilan yang berwenang di wilayah DKI
                  Jakarta, Indonesia, dengan tidak mengurangi hak Perusahaan untuk
                  mengajukan gugatan di yurisdiksi lain yang dianggap sesuai.
                </p>
              </div>
            </div>

            {/* Section 15 - Kontak Kami */}
            <div className={styles.sectionBlock} id="kontak-kami">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>15</span>
                <Title level={2} className={styles.sectionTitle}>
                  Kontak Kami
                </Title>
              </div>
              <div className={styles.sectionBody}>
                <p>
                  Jika Anda memiliki pertanyaan, saran, atau keluhan terkait syarat dan
                  ketentuan ini, silakan hubungi kami melalui saluran berikut:
                </p>
              </div>
              <div className={styles.contactGrid}>
                {contactCards.map((item) => (
                  <Card key={item.title} className={styles.contactCard}>
                    <Flex vertical gap={10}>
                      <span className={styles.contactIcon}>
                        <Icon type={item.icon as IconName} />
                      </span>
                      <Title level={3} className={styles.contactTitle}>
                        {item.title}
                      </Title>
                      <Text className={styles.contactValue}>{item.value}</Text>
                      <Text className={styles.contactSubtitle}>{item.subtitle}</Text>
                    </Flex>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.sectionLabel} style={{ color: "#9fc5ff" }}>
              Butuh Bantuan?
            </Text>
            <Title level={2} className={styles.ctaTitle}>
              Hubungi Tim Kami
            </Title>
            <Paragraph className={styles.ctaDescription}>
              Jika Anda memiliki pertanyaan lebih lanjut mengenai syarat dan ketentuan
              ini, jangan ragu untuk menghubungi tim kami yang siap membantu Anda.
            </Paragraph>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" href="/kontak">
                Hubungi Kami <Icon type="ArrowRightOutlined" />
              </Button>
              <Button href="/beranda">Kembali ke Beranda</Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
