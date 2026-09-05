"use client";

import { useEffect, useRef, useState } from "react";
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

const { Text, Title, Paragraph } = Typography;

const sections = [
  { id: "pendahuluan", number: 1, title: "Pendahuluan" },
  { id: "data-yang-kami-kumpulkan", number: 2, title: "Data yang Kami Kumpulkan" },
  { id: "tujuan-penggunaan-data", number: 3, title: "Tujuan Penggunaan Data" },
  { id: "dasar-hukum", number: 4, title: "Dasar Hukum" },
  { id: "penyimpanan-data", number: 5, title: "Penyimpanan Data" },
  { id: "berbagi-data", number: 6, title: "Berbagi Data" },
  { id: "keamanan-data", number: 7, title: "Keamanan Data" },
  { id: "hak-anda", number: 8, title: "Hak Anda" },
  { id: "cookies-dan-teknologi-serupa", number: 9, title: "Cookies dan Teknologi Serupa" },
  { id: "anak-anak", number: 10, title: "Anak-anak" },
  { id: "perubahan-kebijakan", number: 11, title: "Perubahan Kebijakan" },
  { id: "hubungi-kami", number: 12, title: "Hubungi Kami" },
] as const;

const dataCollectionCards: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "UserOutlined",
    title: "Data Identitas",
    description:
      "Nama lengkap, alamat email, nomor telepon, dan informasi kontak lainnya yang Anda berikan saat mendaftar atau menggunakan layanan kami.",
  },
  {
    icon: "LaptopOutlined",
    title: "Data Teknis",
    description:
      "Alamat IP, jenis perangkat, sistem operasi, browser, dan informasi teknis lainnya yang dikumpulkan secara otomatis saat Anda mengakses layanan kami.",
  },
  {
    icon: "BarChartOutlined",
    title: "Data Penggunaan",
    description:
      "Informasi tentang cara Anda menggunakan layanan kami, termasuk halaman yang dikunjungi, fitur yang digunakan, dan pola interaksi lainnya.",
  },
  {
    icon: "FileTextOutlined",
    title: "Data Lainnya",
    description:
      "Informasi tambahan yang Anda berikan secara sukarela melalui formulir, survei, atau komunikasi lainnya dengan tim kami.",
  },
];

const purposeItems = [
  "Menyediakan dan mengelola layanan yang Anda minta.",
  "Meningkatkan kualitas dan pengalaman pengguna layanan kami.",
  "Mengirimkan informasi, pembaruan, dan promosi yang relevan dengan izin Anda.",
  "Mematuhi kewajiban hukum dan peraturan yang berlaku.",
  "Melindungi keamanan dan integritas sistem serta data kami.",
  "Menganalisis penggunaan layanan untuk pengembangan produk dan fitur baru.",
];

const legalBasisItems = [
  "Pelaksanaan kontrak atau perjanjian dengan Anda.",
  "Persetujuan eksplisit yang Anda berikan untuk tujuan tertentu.",
  "Kepatuhan terhadap kewajiban hukum yang berlaku.",
  "Kepentingan sah kami dalam menjalankan bisnis dan meningkatkan layanan.",
  "Perlindungan kepentingan vital Anda atau pihak lain.",
];

const rightsItems = [
  "Mengakses dan menyalin data pribadi Anda yang kami simpan.",
  "Memperbaiki atau memperbarui data pribadi Anda jika tidak akurat.",
  "Menghapus data pribadi Anda dari sistem kami (hak untuk dilupakan).",
  "Membatasi pemrosesan data pribadi Anda dalam kondisi tertentu.",
  "Membawa data pribadi Anda ke layanan lain (portabilitas data).",
  "Menarik persetujuan kapan saja tanpa mempengaruhi pemrosesan sebelumnya.",
  "Mengajukan keluhan kepada otoritas perlindungan data yang berwenang.",
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
  introInner: css`
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
  introTitle: css`
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
  introDescription: css`
    max-width: 600px;
    margin: 10px 0 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  introBadge: css`
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
  introBadgeGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 80% 20%, rgba(22, 119, 255, 0.14), transparent 40%),
      radial-gradient(circle at 20% 80%, rgba(103, 176, 255, 0.08), transparent 36%);
  `,
  introBadgeContent: css`
    position: relative;
    z-index: 1;
  `,
  introBadgeText: css`
    display: block;
    color: rgba(255, 255, 255, 0.92);
    font-size: clamp(22px, 2.8vw, 32px);
    font-weight: 850;
    line-height: 1.2;
    letter-spacing: -0.03em;
  `,
  introBadgeLabel: css`
    display: block;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
    line-height: 1.5;
  `,
  introShieldIcon: css`
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
  dataGrid: css`
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
  dataCard: css`
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
  dataCardIcon: css`
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
  dataCardTitle: css`
    margin: 0 0 8px !important;
    color: #0b1532 !important;
    font-size: 15px !important;
    font-weight: 800 !important;
  `,
  dataCardDescription: css`
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
  const { t } = useI18n();
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="Kebijakan Privasi"
        eyebrow="KEBIJAKAN PRIVASI"
        titlePrefix={<span>Kebijakan </span>}
        titleAccent={<strong>Privasi</strong>}
        titleSuffix={null}
        description={<>PT. Vistara Teknologi Indonesia berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi yang Anda berikan kepada kami.</>}
        visual={<div className={styles.introBadge}><div className={styles.introBadgeGlow} /><div className={styles.introBadgeContent}><div className={styles.introShieldIcon}><Icon type="SafetyCertificateOutlined" /></div><span className={styles.introBadgeText}>Data Anda,<br />Kepercayaan Kami,<br />Masa Depan Bersama.</span><span className={styles.introBadgeLabel}>Komitmen kami dalam menjaga privasi data Anda</span></div></div>}
      />

      <MarketingSection>
        <div className={styles.layoutGrid}>
          <aside className={styles.sidebar}>
            <Title level={5} className={styles.sidebarTitle}>
              Daftar Isi
            </Title>
            {sections.map((section) => (
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
                  {section.number}
                </span>
                {section.title}
              </button>
            ))}
            <div className={styles.sidebarQuestionCard}>
              <Title level={5} className={styles.sidebarQuestionTitle}>
                Pertanyaan?
              </Title>
              <Paragraph className={styles.sidebarQuestionText}>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, jangan
                ragu untuk menghubungi kami.
              </Paragraph>
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
              <button className={styles.printButton} onClick={handlePrint}>
                <Icon type="PrinterOutlined" />
                Cetak
              </button>
            </div>

            <div className={styles.sectionBlock} id={sections[0].id} ref={(el) => { sectionRefs.current[sections[0].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>1</span>
                Pendahuluan
              </Title>
              <Paragraph className={styles.sectionText}>
                PT. Vistara Teknologi Indonesia (&quot;Vistara&quot;, &quot;kami&quot;, atau
                &quot;perusahaan&quot;) menghargai privasi Anda. Kebijakan Privasi ini
                menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan
                melindungi data pribadi Anda saat Anda menggunakan layanan kami,
                termasuk situs web, aplikasi, dan produk digital lainnya.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Dengan mengakses atau menggunakan layanan kami, Anda menyetujui
                pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
                Kami menyarankan Anda untuk membaca kebijakan ini secara seksama
                untuk memahami praktik kami terkait data pribadi Anda.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[1].id} ref={(el) => { sectionRefs.current[sections[1].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>2</span>
                Data yang Kami Kumpulkan
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami dapat mengumpulkan berbagai jenis data pribadi tergantung pada
                cara Anda berinteraksi dengan layanan kami. Berikut adalah kategori
                data yang kami kumpulkan:
              </Paragraph>
              <div className={styles.dataGrid}>
                {dataCollectionCards.map((card) => (
                  <Card key={card.title} className={styles.dataCard}>
                    <span className={styles.dataCardIcon}>
                      <Icon type={card.icon} />
                    </span>
                    <Title level={4} className={styles.dataCardTitle}>
                      {card.title}
                    </Title>
                    <Paragraph className={styles.dataCardDescription}>
                      {card.description}
                    </Paragraph>
                  </Card>
                ))}
              </div>
            </div>

            <div className={styles.sectionBlock} id={sections[2].id} ref={(el) => { sectionRefs.current[sections[2].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>3</span>
                Tujuan Penggunaan Data
              </Title>
              <Paragraph className={styles.sectionText}>
                Data pribadi yang kami kumpulkan digunakan untuk berbagai tujuan
                yang sah, antara lain:
              </Paragraph>
              <ul className={styles.bulletList}>
                {purposeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sectionBlock} id={sections[3].id} ref={(el) => { sectionRefs.current[sections[3].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>4</span>
                Dasar Hukum
              </Title>
              <Paragraph className={styles.sectionText}>
                Pemrosesan data pribadi Anda didasarkan pada beberapa dasar hukum
                sesuai dengan peraturan perundang-undangan yang berlaku, termasuk
                namun tidak terbatas pada:
              </Paragraph>
              <ul className={styles.bulletList}>
                {legalBasisItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sectionBlock} id={sections[4].id} ref={(el) => { sectionRefs.current[sections[4].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>5</span>
                Penyimpanan Data
              </Title>
              <Paragraph className={styles.sectionText}>
                Data pribadi Anda disimpan di server yang aman dengan perlindungan
                fisik dan elektronik yang memadai. Kami mempertahankan data pribadi
                Anda hanya selama diperlukan untuk tujuan yang dijelaskan dalam
                kebijakan ini, atau sebagaimana diwajibkan oleh hukum.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Ketika data pribadi Anda tidak lagi diperlukan, kami akan menghapus
                atau menganonimkan data tersebut dengan cara yang aman dan sesuai
                dengan prosedur internal kami.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[5].id} ref={(el) => { sectionRefs.current[sections[5].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>6</span>
                Berbagi Data
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami tidak menjual data pribadi Anda kepada pihak ketiga. Namun,
                dalam beberapa keadaan, kami mungkin perlu berbagi data pribadi
                Anda dengan pihak-pihak berikut:
              </Paragraph>
              <ul className={styles.bulletList}>
                <li>Mitra dan penyedia layanan yang membantu operasional bisnis kami.</li>
                <li>Pihak berwenang sesuai dengan kewajiban hukum yang berlaku.</li>
                <li>Afiliasi dan entitas terkait dalam grup perusahaan kami.</li>
                <li>Pihak ketiga dengan persetujuan eksplisit dari Anda.</li>
              </ul>
              <Paragraph className={styles.sectionText}>
                Semua pihak ketiga yang menerima data pribadi Anda wajib menjaga
                kerahasiaan dan keamanan data sesuai dengan kebijakan ini dan
                peraturan perundang-undangan yang berlaku.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[6].id} ref={(el) => { sectionRefs.current[sections[6].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>7</span>
                Keamanan Data
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang
                komprehensif untuk melindungi data pribadi Anda dari akses yang tidak
                sah, penggunaan yang salah, pengungkapan, perubahan, atau
                perusakan. Langkah-langkah keamanan kami meliputi:
              </Paragraph>
              <ul className={styles.bulletList}>
                <li>Enkripsi data saat transit dan saat disimpan (encryption at rest and in transit).</li>
                <li>Kontrol akses berbasis peran dengan autentikasi multi-faktor.</li>
                <li>Pemantauan keamanan secara real-time dan deteksi anomali.</li>
                <li>Audit keamanan berkala dan pengujian penetrasi.</li>
                <li>Pelatihan kesadaran keamanan bagi seluruh karyawan.</li>
              </ul>
            </div>

            <div className={styles.sectionBlock} id={sections[7].id} ref={(el) => { sectionRefs.current[sections[7].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>8</span>
                Hak Anda
              </Title>
              <Paragraph className={styles.sectionText}>
                Sebagai subjek data, Anda memiliki hak-hak tertentu terkait data
                pribadi Anda. Hak-hak tersebut meliputi:
              </Paragraph>
              <ul className={styles.bulletList}>
                {rightsItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Paragraph className={styles.sectionText}>
                Untuk menjalankan hak-hak Anda, silakan hubungi kami melalui
                informasi kontak yang tersedia di bagian &quot;Hubungi Kami&quot; di bawah ini.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[8].id} ref={(el) => { sectionRefs.current[sections[8].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>9</span>
                Cookies dan Teknologi Serupa
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami menggunakan cookies dan teknologi serupa untuk meningkatkan
                pengalaman Anda saat menggunakan layanan kami. Cookies adalah file
                kecil yang disimpan di perangkat Anda yang membantu kami mengenali
                preferensi Anda dan menyediakan fitur yang lebih baik.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Anda dapat mengontrol penggunaan cookies melalui pengaturan browser
                Anda. Namun, menonaktifkan cookies tertentu mungkin mempengaruhi
                fungsionalitas layanan kami.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[9].id} ref={(el) => { sectionRefs.current[sections[9].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>10</span>
                Anak-anak
              </Title>
              <Paragraph className={styles.sectionText}>
                Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun
                (atau usia minimum yang berlaku di yurisdiksi Anda). Kami tidak
                secara sengaja mengumpulkan data pribadi dari anak-anak. Jika kami
                mengetahui bahwa kami telah mengumpulkan data pribadi dari anak-anak
                tanpa persetujuan orang tua yang diperlukan, kami akan mengambil
                langkah-langkah untuk menghapus informasi tersebut.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[10].id} ref={(el) => { sectionRefs.current[sections[10].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>11</span>
                Perubahan Kebijakan
              </Title>
              <Paragraph className={styles.sectionText}>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu
                untuk mencerminkan perubahan dalam praktik kami atau untuk alasan
                operasional, hukum, atau peraturan lainnya. Perubahan material akan
                dikomunikasikan melalui situs web kami atau melalui saluran
                komunikasi lainnya yang sesuai.
              </Paragraph>
              <Paragraph className={styles.sectionText}>
                Kami menyarankan Anda untuk memeriksa halaman ini secara berkala
                untuk tetap mendapatkan informasi terbaru tentang bagaimana kami
                melindungi data pribadi Anda.
              </Paragraph>
            </div>

            <div className={styles.sectionBlock} id={sections[11].id} ref={(el) => { sectionRefs.current[sections[11].id] = el; }}>
              <Title level={3} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>12</span>
                Hubungi Kami
              </Title>
              <Paragraph className={styles.sectionText}>
                Jika Anda memiliki pertanyaan, keluhan, atau permintaan terkait
                Kebijakan Privasi ini atau pemrosesan data pribadi Anda, silakan
                hubungi kami melalui saluran berikut:
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
            Tim kami siap membantu Anda mengenai kebijakan privasi dan perlindungan data.
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
