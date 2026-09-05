"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type FaqCategory = "semua" | "layanan" | "harga" | "teknis" | "dukungan";

interface FaqItem {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
}

const categories: { key: FaqCategory; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "layanan", label: "Layanan" },
  { key: "harga", label: "Harga" },
  { key: "teknis", label: "Teknis" },
  { key: "dukungan", label: "Dukungan" },
];

const faqItems: FaqItem[] = [
  {
    id: 1,
    category: "layanan",
    question: "Apa saja layanan yang disediakan oleh Vistara?",
    answer:
      "Vistara menyediakan berbagai layanan teknologi informasi termasuk pengembangan aplikasi web dan mobile, konsultasi IT, transformasi digital, pengembangan platform e-commerce, serta solusi bisnis berbasis cloud. Kami melayani berbagai skala proyek dari startup hingga perusahaan enterprise.",
  },
  {
    id: 2,
    category: "layanan",
    question: "Bagaimana cara memulai kerja sama dengan Vistara?",
    answer:
      "Anda dapat memulai dengan menghubungi tim kami melalui halaman kontak atau email ke info@vistara.co.id. Tim kami akan menjadwalkan konsultasi awal gratis untuk memahami kebutuhan bisnis Anda, kemudian menyusun proposal yang sesuai dengan tujuan dan anggaran proyek Anda.",
  },
  {
    id: 3,
    category: "layanan",
    question: "Apakah Vistara menerima proyek skala kecil?",
    answer:
      "Tentu, kami menerima proyek dari berbagai skala. Kami memahami bahwa setiap bisnis memiliki kebutuhan yang berbeda. Tim kami akan menyesuaikan solusi dan pendekatan sesuai dengan skala dan kompleksitas proyek Anda, termasuk proyek-proyek berskala kecil dan menengah.",
  },
  {
    id: 4,
    category: "harga",
    question: "Bagaimana model penetapan harga di Vistara?",
    answer:
      "Kami menawarkan beberapa model harga yang fleksibel: project-based (harga tetap per proyek), time-based (per jam atau per bulan), dan retainer (langganan bulanan untuk dukungan berkelanjutan). Harga disesuaikan dengan kompleksitas, durasi, dan lingkup proyek. Hubungi kami untuk mendapatkan penawaran yang tepat.",
  },
  {
    id: 5,
    category: "harga",
    question: "Apakah tersedia konsultasi gratis sebelum memulai proyek?",
    answer:
      "Ya, kami menyediakan konsultasi awal gratis selama 30-60 menit. Dalam sesi ini, tim kami akan mendengarkan kebutuhan Anda, memberikan gambaran solusi yang tepat, dan memberikan estimasi biaya awal. Tidak ada kewajiban untuk melanjutkan setelah konsultasi.",
  },
  {
    id: 6,
    category: "harga",
    question: "Apakah ada opsi pembayaran bertahap?",
    answer:
      "Ya, untuk proyek berskala besar, kami menyediakan opsi pembayaran bertahap yang disesuaikan dengan milestone proyek. Biasanya pembayaran dibagi menjadi 3-4 tahap sesuai dengan progres pekerjaan. Detail pembayaran akan tertuang dalam perjanjian kontrak.",
  },
  {
    id: 7,
    category: "teknis",
    question: "Teknologi apa saja yang digunakan oleh Vistara?",
    answer:
      "Vistara menggunakan teknologi modern dan terkini termasuk React, Next.js, TypeScript, Node.js, Python, React Native, Flutter, serta infrastruktur cloud dari AWS, GCP, dan Azure. Kami memilih teknologi yang paling sesuai dengan kebutuhan proyek Anda untuk hasil optimal.",
  },
  {
    id: 8,
    category: "teknis",
    question: "Bagaimana Vistara menjamin keamanan data klien?",
    answer:
      "Keamanan data adalah prioritas utama kami. Kami menerapkan standar keamanan tinggi termasuk enkripsi data end-to-end, autentikasi multi-faktor, audit keamanan berkala, penetration testing, serta kepatuhan terhadap standar ISO 27001 dan peraturan perlindungan data yang berlaku.",
  },
  {
    id: 9,
    category: "teknis",
    question: "Apakah Vistara menyediakan layanan migrasi sistem?",
    answer:
      "Ya, kami menyediakan layanan migrasi sistem dari platform lama ke platform baru. Tim kami akan melakukan analisis menyeluruh terhadap sistem yang ada, merencanakan strategi migrasi yang minim risiko, dan memastikan transisi yang mulus tanpa gangguan operasional yang signifikan.",
  },
  {
    id: 10,
    category: "dukungan",
    question: "Bagaimana cara menghubungi dukungan teknis Vistara?",
    answer:
      "Anda dapat menghubungi dukungan teknis kami melalui email ke support@vistara.co.id, telepon ke +62 21 5555 0123, atau melalui portal ticketing yang tersedia untuk klien. Tim dukungan kami beroperasi pada hari kerja, Senin hingga Jumat, pukul 09.00 hingga 18.00 WIB.",
  },
  {
    id: 11,
    category: "dukungan",
    question: "Apakah Vistara menyediakan layanan pemeliharaan pasca-peluncuran?",
    answer:
      "Ya, kami menyediakan layanan pemeliharaan dan dukungan pasca-peluncuran yang mencakup pemantauan performa, perbaikan bug, pembaruan keamanan, serta pengembangan fitur baru. Kami menawarkan paket SLA (Service Level Agreement) dengan tingkat respons yang disesuaikan.",
  },
  {
    id: 12,
    category: "dukungan",
    question: "Berapa lama waktu respons untuk tiket dukungan?",
    answer:
      "Waktu respons kami bervariasi berdasarkan tingkat prioritas: Critical (1 jam), High (4 jam), Medium (1 hari kerja), dan Low (3 hari kerja). Klien dengan paket SLA premium mendapat prioritas respons yang lebih cepat dan akses langsung ke tim teknis senior.",
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
  searchContainer: css`
    margin-bottom: 40px;
  `,
  searchInput: css`
    .ant-input {
      height: 52px;
      border-radius: 14px;
      border-color: #e8edf5;
      font-size: 15px;

      &:focus {
        border-color: ${designSystem.palette.primary};
        box-shadow: 0 0 0 2px rgba(22, 102, 212, 0.1);
      }
    }
  `,
  categoryTabs: css`
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    overflow-x: auto;
    padding-bottom: 4px;

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      gap: 6px;
    }
  `,
  categoryTab: css`
    padding: 10px 20px;
    border: 1px solid #e8edf5;
    border-radius: 10px;
    background: #fff;
    color: #4d5b78;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      border-color: #1e66d4;
      color: #1e66d4;
    }
  `,
  categoryTabActive: css`
    background: ${designSystem.palette.primary} !important;
    border-color: ${designSystem.palette.primary} !important;
    color: #fff !important;
  `,
  faqList: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 48px;
  `,
  faqItem: css`
    border: 1px solid #e8edf5;
    border-radius: 14px;
    background: #fff;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(7, 17, 31, 0.04);
    }
  `,
  faqItemOpen: css`
    border-color: #d0dbed;
    box-shadow: 0 4px 16px rgba(7, 17, 31, 0.06);
  `,
  faqQuestion: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding: 20px 24px;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: #0b1532;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #1e66d4;
    }
  `,
  faqIcon: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #edf5ff;
    color: #1e66d4;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  `,
  faqIconOpen: css`
    transform: rotate(180deg);
  `,
  faqAnswer: css`
    padding: 0 24px 20px;
    color: #3f5373;
    font-size: 15px;
    line-height: 1.8;
  `,
  faqCategoryTag: css`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    background: #edf5ff;
    color: #1e66d4;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 8px;
  `,
  noResults: css`
    text-align: center;
    padding: 60px 20px;
    color: #597091;
  `,
  noResultsIcon: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: #f7f9fc;
    color: #a0aec0;
    font-size: 28px;
    margin-bottom: 16px;
  `,
  noResultsText: css`
    margin: 0 !important;
    color: #4d5b78 !important;
    font-size: 16px !important;
  `,
  ctaSection: css`
    padding-block: 56px;
    background: #f7f9fc;
  `,
  ctaCard: css`
    text-align: center;
    padding: 48px 24px;
    border: 1px solid #e8edf5;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 4px 16px rgba(7, 17, 31, 0.04);
  `,
  ctaLabel: css`
    display: block;
    margin-bottom: 8px;
    color: #1e66d4;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  ctaTitle: css`
    margin: 0 0 12px !important;
    color: #0b1532 !important;
    font-size: clamp(24px, 3vw, 36px) !important;
    font-weight: 850 !important;
    letter-spacing: -0.03em;
  `,
  ctaDescription: css`
    max-width: 520px;
    margin: 0 auto 28px !important;
    color: #4d5b78 !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
}));

export default function Page() {
  const { styles } = useStyles();
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const filteredFaqs = useMemo(() => {
    let items = faqItems;

    if (activeCategory !== "semua") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="FAQ"
        eyebrow="FAQ"
        titlePrefix={<span>Pertanyaan </span>}
        titleAccent={<strong>Umum</strong>}
        titleSuffix={null}
        description={
          <>
            Temukan jawaban atas pertanyaan yang paling sering ditanyakan
            mengenai layanan, harga, aspek teknis, dan dukungan dari PT. Vistara
            Teknologi Indonesia.
          </>
        }
        visual={
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeGlow} />
            <div className={styles.heroBadgeContent}>
              <div className={styles.heroShieldIcon}>
                <Icon type="QuestionCircleOutlined" />
              </div>
              <span className={styles.heroBadgeText}>
                Kami Siap<br />Membantu Anda
              </span>
              <span className={styles.heroBadgeLabel}>
                Jawaban atas pertanyaan Anda ada di sini
              </span>
            </div>
          </div>
        }
      />

      <MarketingSection>
        <div className={styles.searchContainer}>
          <Input
            className={styles.searchInput}
            prefix={<Icon type="SearchOutlined" />}
            placeholder="Cari pertanyaan Anda di sini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </div>

        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.categoryTab} ${
                activeCategory === cat.key ? styles.categoryTabActive : ""
              }`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filteredFaqs.length > 0 ? (
          <div className={styles.faqList}>
            {filteredFaqs.map((item) => {
              const isOpen = openItems.has(item.id);
              const categoryLabel = categories.find(
                (c) => c.key === item.category
              )?.label;

              return (
                <div
                  key={item.id}
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                  >
                    <span>
                      <span className={styles.faqCategoryTag}>
                        {categoryLabel}
                      </span>
                      <br />
                      {item.question}
                    </span>
                    <span
                      className={`${styles.faqIcon} ${
                        isOpen ? styles.faqIconOpen : ""
                      }`}
                    >
                      <Icon type="DownOutlined" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.faqAnswer}>{item.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <Icon type="SearchOutlined" />
            </div>
            <Paragraph className={styles.noResultsText}>
              Tidak ditemukan pertanyaan yang sesuai dengan pencarian Anda.
              Coba kata kunci lain atau lihat semua kategori.
            </Paragraph>
          </div>
        )}
      </MarketingSection>

      <section className={styles.ctaSection}>
        <MarketingContainer>
          <div className={styles.ctaCard}>
            <Text className={styles.ctaLabel}>Masih Ada Pertanyaan?</Text>
            <Title level={2} className={styles.ctaTitle}>
              Kami Siap Membantu
            </Title>
            <Paragraph className={styles.ctaDescription}>
              Jika Anda tidak menemukan jawaban atas pertanyaan Anda di atas,
              jangan ragu untuk menghubungi tim kami. Kami dengan senang hati akan
              menjawab setiap pertanyaan Anda.
            </Paragraph>
            <Flex justify="center" gap={12}>
              <Button type="primary" size="large" href="/kontak">
                Hubungi Kami <Icon type="ArrowRightOutlined" />
              </Button>
              <Button size="large" href="/beranda">
                Kembali ke Beranda
              </Button>
            </Flex>
          </div>
        </MarketingContainer>
      </section>
    </main>
  );
}
