"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Form,
  Icon,
  MarketingHero,
  Input,
  message,
  Row,
  Select,
  Typography,
  type LocationItem,
  type IconName,
} from "@/components";
import { MapLocation } from "@/components";
import { useI18n } from "@/i18n";
import { submitMarketingContact, type MarketingContactInput } from "@/lib/marketing-api";
import { useMarketingData } from "@/lib/use-marketing-data";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;
const { TextArea } = Input;

const officeLocation = [
  {
    id: "vistara-office",
    title: "Vistara Teknologi Indonesia",
    description: "Jl. Bhakti Abri No. 146, Depok, Indonesia 16455",
    info: "Jl. Bhakti Abri No. 146, Depok, Indonesia 16455",
    category: "office" as const,
    latitude: -6.406202,
    longitude: 106.878060,
    status: "on_track" as const,
    statusLabel: "Kantor Utama",
    progress: 100,
    targetDate: "Siap dikunjungi",
  },
] satisfies LocationItem[];

const contactInfoItems = [
  {
    icon: "HomeOutlined",
    label: "Alamat Kantor",
    value: "Jl. Bhakti Abri No. 146\nDepok, Indonesia 16455",
    href: undefined,
    hrefLabel: "Lihat di Google Maps",
  },
  {
    icon: "PhoneOutlined",
    label: "Telepon",
    value: "+62 851 1715 8205",
    href: "tel:+6285117158205",
    subtext: "Senin - Jumat, 09.00 - 18.00 WIB",
  },
  {
    icon: "MailOutlined",
    label: "Email",
    value: "info@vistaratech.co.id",
    href: "mailto:info@vistaratech.co.id",
    subtext: "Kami akan membalas dalam 1×24 jam",
  },
  {
    icon: "LinkedinOutlined",
    label: "LinkedIn",
    value: "PT. Vistara Teknologi Indonesia",
    href: "#",
    hrefLabel: "Ikuti kami",
  },
] as const;

const socialLinks = [
  { icon: "LinkedinOutlined", label: "LinkedIn", href: "#" },
  { icon: "InstagramOutlined", label: "Instagram", href: "#" },
  { icon: "YoutubeOutlined", label: "YouTube", href: "#" },
  { icon: "TwitterOutlined", label: "X", href: "#" },
] as const;

const faqItems = [
  {
    question: "Bagaimana cara memulai kerja sama dengan Vistara?",
    answer:
      "Hubungi kami melalui formulir kontak atau langsung via email/telepon. Tim kami akan menjadwalkan sesi konsultasi awal untuk memahami kebutuhan Anda dan merancang langkah selanjutnya yang paling tepat.",
  },
  {
    question: "Berapa lama waktu pengerjaan proyek?",
    answer:
      "Durasi proyek bergantung pada kompleksitas dan ruang lingkup. Proyek sederhana dapat selesai dalam 2-4 minggu, sementara proyek enterprise bisa memakan waktu 2-6 bulan. Kami akan memberikan estimasi yang jelas sebelum kontrak dimulai.",
  },
  {
    question: "Berapa estimasi biaya pengembangan aplikasi?",
    answer:
      "Biaya pengembangan bervariasi tergantung fitur, platform, dan skala proyek. Setelah sesi konsultasi awal, kami akan menyusun proposal detail dengan rincian biaya yang transparan.",
  },
  {
    question: "Apakah tersedia layanan konsultasi gratis?",
    answer:
      "Ya, kami menyediakan konsultasi awal secara gratis selama 30 menit. Sesi ini dirancang untuk memahami kebutuhan bisnis Anda dan menentukan apakah solusi kami cocok untuk tantangan yang dihadapi.",
  },
  {
    question: "Apakah Vistara melayani klien dari luar kota atau luar negeri?",
    answer:
      "Tentu. Kami bekerja sama dengan klien dari berbagai kota di Indonesia maupun mancanegaga. Kolaborasi jarak jauh dilakukan melalui tools komunikasi modern dan proses kerja yang terstruktur.",
  },
  {
    question: "Bagaimana proses setelah mengirim formulir kontak?",
    answer:
      "Setelah formulir diterima, tim kami akan menghubungi Anda dalam 1×24 jam untuk menjadwalkan sesi konsultasi. Dalam sesi tersebut, kami akan membahas kebutuhan Anda secara lebih mendalam.",
  },
] as const;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #0b1532;
    background: #fff;
  `,
  intro: css`
    position: relative;
    overflow: hidden;
    padding-block: 48px 0 !important;
    background: linear-gradient(135deg, #0a1e3d 0%, #0d2b5e 50%, #0e3470 100%);
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
    max-width: 520px;
    margin: 0 !important;
    color: rgba(232, 240, 255, 0.88) !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
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
  introQuote: css`
    position: absolute;
    right: 22px;
    bottom: 24px;
    width: 220px;
    padding: 18px 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    background: rgba(245, 251, 255, 0.96);
    box-shadow: 0 18px 42px rgba(3, 14, 32, 0.22);
  `,
  introQuoteText: css`
    display: block;
    color: #0b1532;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
  `,
  introQuoteAuthor: css`
    display: block;
    margin-top: 8px;
    color: #5d6c86;
    font-size: 12px;
  `,
  introLogo: css`
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  `,
  introLogoText: css`
    color: #fff;
    font-size: 28px;
    font-weight: 850;
    letter-spacing: -0.02em;
  `,
  introLogoSub: css`
    color: rgba(255, 255, 255, 0.72);
    font-size: 11px;
    letter-spacing: 0.04em;
  `,
  pillsBar: css`
    margin-top: 20px;
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    background: #fff;
    box-shadow: 0 12px 30px rgba(6, 23, 45, 0.08);
  `,
  pillItem: css`
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
  pillIcon: css`
    display: grid;
    width: 42px;
    height: 42px;
    margin: 0 auto 8px;
    place-items: center;
    border-radius: 13px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 20px;
  `,
  pillText: css`
    display: block;
    color: #0b1532;
    font-size: 13px;
    font-weight: 700;
  `,
  pillSub: css`
    display: block;
    margin-top: 2px;
    color: #5d6c86;
    font-size: 11px;
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
  formCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 10px 28px rgba(12, 24, 48, 0.05);

    :global(.ant-card-body) {
      padding: 28px !important;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      :global(.ant-card-body) {
        padding: 20px !important;
      }
    }
  `,
  formRow: css`
    margin-bottom: 0 !important;
  `,
  formField: css`
    margin-bottom: 16px !important;

    .ant-form-item-label > label {
      color: #0b1532;
      font-size: 13px;
      font-weight: 700;
    }
  `,
  formInput: css`
    height: 44px;
    border-radius: 10px !important;

    &:hover,
    &:focus {
      border-color: #1677ff;
    }
  `,
  formSelect: css`
    height: 44px;
    border-radius: 10px !important;
  `,
  formTextarea: css`
    border-radius: 10px !important;
    min-height: 120px;
    resize: vertical;
  `,
  formFooter: css`
    margin-top: 8px;
  `,
  formPrivacy: css`
    display: flex;
    margin-top: 12px;
    color: #8c99af;
    font-size: 12px;
    line-height: 1.6;

    a {
      color: #1677ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `,
  formSubmit: css`
    height: 46px !important;
    padding-inline: 24px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
  `,
  contactInfoCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 10px 28px rgba(12, 24, 48, 0.05);

    :global(.ant-card-body) {
      padding: 28px !important;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      :global(.ant-card-body) {
        padding: 20px !important;
      }
    }
  `,
  contactInfoItem: css`
    display: flex;
    gap: 14px;
    padding: 16px 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    border-bottom: 1px solid #edf1f7;
  `,
  contactInfoIcon: css`
    display: grid;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 12px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 20px;
  `,
  contactInfoLabel: css`
    display: block;
    color: #5d6c86;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 2px;
  `,
  contactInfoValue: css`
    display: block;
    color: #0b1532;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    white-space: pre-line;
  `,
  contactInfoLink: css`
    display: inline-block;
    margin-top: 2px;
    color: #1677ff;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  contactInfoSubtext: css`
    display: block;
    margin-top: 2px;
    color: #8c99af;
    font-size: 11px;
  `,
  socialSection: css`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #edf1f7;
  `,
  socialLabel: css`
    display: block;
    margin-bottom: 4px;
    color: #0b1532;
    font-size: 14px;
    font-weight: 800;
  `,
  socialDescription: css`
    display: block;
    margin-bottom: 12px;
    color: #8c99af;
    font-size: 12px;
  `,
  socialIcons: css`
    display: flex;
    gap: 10px;
  `,
  socialIcon: css`
    width: 38px !important;
    height: 38px !important;
    border-radius: 10px !important;
    border-color: #dfe6f1 !important;
    color: #5d6c86 !important;
    font-size: 16px !important;

    &:hover {
      border-color: #1677ff !important;
      color: #1677ff !important;
    }
  `,
  mapSection: css`
    padding-block: 72px;
    background: #f7f9fc;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding-block: 56px;
    }
  `,
  mapContent: css`
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    background: #e8edf5;
    min-height: 360px;
  `,
  mapText: css`
    margin-bottom: 16px !important;
    color: #4d5b78 !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
  `,
  mapButton: css`
    height: 44px !important;
    padding-inline: 20px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
    margin-bottom: 20px !important;
  `,
  faqHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  `,
  faqLink: css`
    color: #1677ff !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  faqDescription: css`
    margin: 0 0 24px !important;
    color: #4d5b78 !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
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
    border: 1px solid #dfe6f1;
    border-radius: 14px;
    background: #fff;
    transition: border-color 0.2s;

    &:hover {
      border-color: #c0cfe0;
    }
  `,
  faqItemExpanded: css`
    border-color: #9dc2f5;
  `,
  faqQuestion: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 18px;
    cursor: pointer;
    user-select: none;
  `,
  faqQuestionText: css`
    color: #0b1532;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.5;
  `,
  faqIcon: css`
    flex-shrink: 0;
    color: #5d6c86;
    font-size: 14px;
    transition: transform 0.2s;
  `,
  faqIconExpanded: css`
    color: #1677ff;
  `,
  faqAnswer: css`
    padding: 0 18px 16px;
    color: #4d5b78;
    font-size: 13px;
    line-height: 1.75;
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
  const { t, locale } = useI18n();
  const { data: marketingData } = useMarketingData(locale);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactOptions = marketingData?.contact?.businessTypeOptions ?? [];

  const onFinish = async (values: Record<string, string>) => {
    setSubmitting(true);
    try {
      const input: MarketingContactInput = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        businessType: values.businessType,
        teamSize: values.company,
        message: values.message,
      };
      await submitMarketingContact(input, locale);
      message.success(t("status.contactSent"));
      form.resetFields();
    } catch {
      message.error(t("status.contactFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq((prev) => (prev === index ? null : index));
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Vistara_Office_Reception_2.png"
        backgroundAlt="Tim Vistara"
        eyebrow={t("marketing.contact.eyebrow")}
        titlePrefix={<><span>Mari Berdiskusi,</span><br /></>}
        titleAccent={<strong>Wujudkan Ide Anda</strong>}
        titleSuffix={null}
        description={<>Kami siap mendengarkan kebutuhan Anda dan membantu membangun solusi teknologi yang tepat untuk bisnis, organisasi, maupun proyek Anda.</>}
        visual={<div className={styles.introVisual}><div className={styles.introQuote}><Text className={styles.introQuoteText}>&ldquo;Setiap percakapan adalah awal dari solusi yang lebih baik.&rdquo;</Text><Text className={styles.introQuoteAuthor}>&mdash; Tim Vistara</Text></div></div>}
      />

      <div className={styles.pillsBar}>
          <MarketingContainer>
            <Row gutter={[0, 0]}>
              {[
                { icon: "ThunderboltOutlined", label: "Respons Cepat", sub: "(< 24 jam)" },
                { icon: "TeamOutlined", label: "Tim Profesional", sub: "& Berpengalaman" },
                { icon: "AimOutlined", label: "Solusi yang", sub: "Terarah" },
              ].map((item) => (
                <Col xs={24} sm={8} key={item.label} className={styles.pillItem}>
                  <span className={styles.pillIcon}>
                    <Icon type={item.icon as IconName} />
                  </span>
                  <Text className={styles.pillText}>{item.label}</Text>
                  <Text className={styles.pillSub}>{item.sub}</Text>
                </Col>
              ))}
            </Row>
          </MarketingContainer>
        </div>
      <MarketingSection className={styles.section}>
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} lg={14}>
            <Text className={styles.sectionLabel}>Kirim Pesan</Text>
            <Title level={2} className={styles.sectionTitle}>
              Sampaikan Kebutuhan Anda
            </Title>
            <Paragraph className={styles.sectionDescription}>
              Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.
            </Paragraph>

            <Card className={styles.formCard} style={{ marginTop: 24 }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                validateTrigger="onBlur"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Nama Lengkap"
                      rules={[{ required: true, message: t("form.required") }]}
                      className={styles.formField}
                    >
                      <Input
                        placeholder="Masukkan nama lengkap Anda"
                        className={styles.formInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: t("form.required") },
                        { type: "email", message: t("form.invalidEmail") },
                      ]}
                      className={styles.formField}
                    >
                      <Input
                        placeholder="nama@perusahaan.com"
                        className={styles.formInput}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Nomor Telepon"
                      rules={[{ required: true, message: t("form.required") }]}
                      className={styles.formField}
                    >
                      <Input
                        placeholder="+62 812 3456 7890"
                        className={styles.formInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="company"
                      label="Perusahaan / Instansi"
                      className={styles.formField}
                    >
                      <Input
                        placeholder="Nama perusahaan Anda"
                        className={styles.formInput}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="businessType"
                  label="Jenis Kebutuhan"
                  rules={[{ required: true, message: t("form.required") }]}
                  className={styles.formField}
                >
                  <Select
                    placeholder="Pilih jenis kebutuhan"
                    className={styles.formSelect}
                    options={contactOptions.map((opt) => ({
                      value: opt.id,
                      label: t(opt.labelKey),
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Pesan Anda"
                  rules={[{ required: true, message: t("form.required") }]}
                  className={styles.formField}
                >
                  <TextArea
                    placeholder="Ceritakan lebih detail tentang kebutuhan atau pertanyaan Anda..."
                    rows={5}
                    maxLength={500}
                    showCount
                    className={styles.formTextarea}
                  />
                </Form.Item>

                <div className={styles.formFooter}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    icon={<Icon type="SendOutlined" />}
                    className={styles.formSubmit}
                  >
                    Kirim Pesan
                  </Button>
                  <Text className={styles.formPrivacy}>
                    Dengan mengirim formulir ini, Anda menyetujui <a href="/kebijakan-privasi" style={{ padding: "0 3px" }}>Kebijakan Privasi</a> kami.
                  </Text>
                </div>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            <Text className={styles.sectionLabel}>Informasi Kontak</Text>
            <Title level={2} className={styles.sectionTitle}>
              Hubungi Kami Langsung
            </Title>
            <Paragraph className={styles.sectionDescription}>
              Anda juga dapat menghubungi kami melalui kanal berikut ini.
            </Paragraph>

            <Card className={styles.contactInfoCard} style={{ marginTop: 24 }}>
              {contactInfoItems.map((item) => (
                <div className={styles.contactInfoItem} key={item.label}>
                  <span className={styles.contactInfoIcon}>
                    <Icon type={item.icon as IconName} />
                  </span>
                  <div>
                    <Text className={styles.contactInfoLabel}>{item.label}</Text>
                    <Text className={styles.contactInfoValue}>{item.value}</Text>
                    {"href" in item && item.href && (
                      <a
                        className={styles.contactInfoLink}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {item.value}{" "}
                        <Icon type="ArrowRightOutlined" size={10} />
                      </a>
                    )}
                    {"subtext" in item && item.subtext && (
                      <Text className={styles.contactInfoSubtext}>{item.subtext}</Text>
                    )}
                  </div>
                </div>
              ))}

              <div className={styles.socialSection}>
                <Text className={styles.socialLabel}>Ikuti Kami</Text>
                <Text className={styles.socialDescription}>
                  Dapatkan update terbaru seputar teknologi, insight, dan kegiatan
                  Vistara.
                </Text>
                <div className={styles.socialIcons}>
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      className={styles.socialIcon}
                      type="text"
                      shape="circle"
                      aria-label={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      icon={<Icon type={social.icon as IconName} />}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </MarketingSection>

      <section className={styles.mapSection}>
        <MarketingContainer>
          <Text className={styles.sectionLabel}>Lokasi Kami</Text>
          <Title level={2} className={styles.sectionTitle}>
            Kunjungi Kantor Kami
          </Title>
          <Paragraph className={styles.mapText}>
            Kami terbuka untuk diskusi langsung di kantor kami. Silakan hubungi kami
            terlebih dahulu untuk membuat janji temu.
          </Paragraph>
          <Button
            type="primary"
            icon={<Icon type="ArrowRightOutlined" />}
            className={styles.mapButton}
            href="https://www.google.com/maps?q=-6.423123,106.812345"
            target="_blank"
            rel="noreferrer"
          >
            Buka di Google Maps
          </Button>

          <div className={styles.mapContent}>
            <MapLocation
              height={360}
              compact
              preview
              locations={officeLocation}
              center={{ latitude: -6.175392, longitude: 106.827153, zoom: 15 }}
            />
          </div>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.section}>
        <div className={styles.faqHeader}>
          <div>
            <Text className={styles.sectionLabel}>Pertanyaan Umum</Text>
            <Title level={2} className={styles.sectionTitle}>
              Pertanyaan yang Sering Diajukan
            </Title>
          </div>
          <a href="#" className={styles.faqLink}>
            Lihat Semua FAQ <Icon type="ArrowRightOutlined" />
          </a>
        </div>
        <Paragraph className={styles.faqDescription}>
          Temukan jawaban cepat untuk pertanyaan umum seputar kerja sama, layanan,
          dan proses bisnis kami.
        </Paragraph>

        <div className={styles.faqGrid}>
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className={`${styles.faqItem} ${
                expandedFaq === index ? styles.faqItemExpanded : ""
              }`}
            >
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFaq(index);
                  }
                }}
              >
                <span className={styles.faqQuestionText}>{item.question}</span>
                <Icon
                  type={expandedFaq === index ? "MinusOutlined" : "PlusOutlined"}
                  className={`${styles.faqIcon} ${
                    expandedFaq === index ? styles.faqIconExpanded : ""
                  }`}
                />
              </div>
              {expandedFaq === index && (
                <div className={styles.faqAnswer}>{item.answer}</div>
              )}
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
            <Paragraph className={styles.ctaDescription}>
              Tidak ada ide yang terlalu kecil. Mari wujudkan bersama.
            </Paragraph>
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
