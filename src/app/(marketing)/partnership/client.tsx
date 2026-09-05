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
  Input,
  MarketingHero,
  Row,
  Select,
  Typography,
  type IconName,
} from "@/components";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;
const { TextArea } = Input;

const partnerBenefits = [
  {
    icon: "RocketOutlined",
    title: "Akses Teknologi",
    description: "Dapatkan akses ke solusi teknologi mutakhir dan inovasi terbaru dari Vistara.",
  },
  {
    icon: "GlobalOutlined",
    title: "Jangkauan Pasar",
    description: "Perluas jangkauan pasar Anda melalui jaringan klien Vistara yang luas.",
  },
  {
    icon: "TrophyOutlined",
    title: "Pertumbuhan Bersama",
    description: "Berkembang bersama melalui proyek kolaboratif yang menguntungkan kedua belah pihak.",
  },
] as const;

const partnerTypes = [
  {
    icon: "CodeOutlined",
    title: "Teknologi",
    description: "Kolaborasi dalam pengembangan solusi teknologi dan integrasi sistem.",
  },
  {
    icon: "ShopOutlined",
    title: "Bisnis",
    description: "Kemitraan strategis untuk pengembangan pasar dan ekspansi bisnis.",
  },
  {
    icon: "ReadOutlined",
    title: "Akademik",
    description: "Kerja sama penelitian, magang, dan pengembangan SDM di bidang teknologi.",
  },
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
  benefitCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    padding: 28px;
    text-align: center;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
      border-color: #c0cfe0;
      box-shadow: 0 8px 24px rgba(12, 24, 48, 0.06);
    }

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  benefitIcon: css`
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
  benefitTitle: css`
    margin: 0 0 8px !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  benefitDescription: css`
    color: #5d6c86;
    font-size: 13px;
    line-height: 1.7;
  `,
  typeCard: css`
    border: 1px solid #dfe6f1;
    border-radius: 16px;
    background: #fff;
    padding: 28px;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
      border-color: #c0cfe0;
      box-shadow: 0 8px 24px rgba(12, 24, 48, 0.06);
    }

    :global(.ant-card-body) {
      padding: 0 !important;
    }
  `,
  typeHeader: css`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  `,
  typeIcon: css`
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 12px;
    color: #1677ff;
    background: #edf5ff;
    font-size: 20px;
    flex-shrink: 0;
  `,
  typeTitle: css`
    margin: 0 !important;
    color: #0b1532 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
  `,
  typeDescription: css`
    color: #5d6c86;
    font-size: 13px;
    line-height: 1.7;
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
  submitBtn: css`
    height: 46px !important;
    padding-inline: 24px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
  `,
  partnersLogos: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding: 32px 0;
  `,
  partnerLogoPlaceholder: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 60px;
    border: 1px solid #e8edf5;
    border-radius: 10px;
    background: #f7f9fc;
    color: #8c99af;
    font-size: 12px;
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
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [partnerType, setPartnerType] = useState<string>("");
  const [message, setMessageText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!companyName || !contact || !partnerType || !message) return;
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCompanyName("");
      setContact("");
      setPartnerType("");
      setMessageText("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Office_Call.png"
        backgroundAlt="Partnership Vistara"
        eyebrow="PARTNERSHIP"
        titlePrefix={<><span>Partnership</span></>}
        titleAccent={null}
        titleSuffix={null}
        description="Jalin kemitraan strategis bersama Vistara untuk pertumbuhan bisnis yang berkelanjutan."
      />

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Mengapa Bermitra?</Text>
        <Title level={2} className={styles.sectionTitle}>
          Manfaat Kemitraan
        </Title>
        <Text className={styles.sectionDescription}>
          Bergabunglah dengan jaringan mitra kami dan rasakan manfaat kolaborasi strategis.
        </Text>

        <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
          {partnerBenefits.map((benefit) => (
            <Col xs={24} sm={8} key={benefit.title}>
              <Card className={styles.benefitCard}>
                <span className={styles.benefitIcon}>
                  <Icon type={benefit.icon as IconName} />
                </span>
                <Title level={4} className={styles.benefitTitle}>
                  {benefit.title}
                </Title>
                <Text className={styles.benefitDescription}>{benefit.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Jenis Kemitraan</Text>
        <Title level={2} className={styles.sectionTitle}>
          Pilih Format Kemitraan
        </Title>
        <Text className={styles.sectionDescription}>
          Kami menyediakan berbagai format kemitraan yang disesuaikan dengan kebutuhan Anda.
        </Text>

        <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
          {partnerTypes.map((type) => (
            <Col xs={24} sm={8} key={type.title}>
              <Card className={styles.typeCard}>
                <div className={styles.typeHeader}>
                  <span className={styles.typeIcon}>
                    <Icon type={type.icon as IconName} />
                  </span>
                  <Title level={4} className={styles.typeTitle}>
                    {type.title}
                  </Title>
                </div>
                <Text className={styles.typeDescription}>{type.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Ajukan Kemitraan</Text>
        <Title level={2} className={styles.sectionTitle}>
          Formulir Partnership
        </Title>
        <Text className={styles.sectionDescription}>
          Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.
        </Text>

        <Card className={styles.formCard} style={{ marginTop: 24 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <div className={styles.formField}>
                <Text style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 }}>
                  Nama Perusahaan
                </Text>
                <Input
                  placeholder="Masukkan nama perusahaan"
                  className={styles.formInput}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className={styles.formField}>
                <Text style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 }}>
                  Kontak Person
                </Text>
                <Input
                  placeholder="Nama dan email"
                  className={styles.formInput}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </Col>
          </Row>

          <div className={styles.formField}>
            <Text style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 }}>
              Jenis Kemitraan
            </Text>
            <Select
              placeholder="Pilih jenis kemitraan"
              className={styles.formSelect}
              style={{ width: "100%" }}
              value={partnerType || undefined}
              onChange={(value) => setPartnerType(value)}
              options={[
                { value: "teknologi", label: "Teknologi" },
                { value: "bisnis", label: "Bisnis" },
                { value: "akademik", label: "Akademik" },
              ]}
            />
          </div>

          <div className={styles.formField}>
            <Text style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 }}>
              Pesan
            </Text>
            <TextArea
              placeholder="Ceritakan tentang proposal kemitraan Anda..."
              rows={5}
              className={styles.formTextarea}
              value={message}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            className={styles.submitBtn}
            loading={submitting}
            onClick={handleSubmit}
            icon={<Icon type="SendOutlined" />}
          >
            Kirim Proposal
          </Button>
        </Card>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>Mitra Kami</Text>
        <Title level={2} className={styles.sectionTitle}>
          Partner Saat Ini
        </Title>
        <Text className={styles.sectionDescription}>
          Kami bangga telah bermitra dengan berbagai organisasi terkemuka.
        </Text>

        <div className={styles.partnersLogos}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.partnerLogoPlaceholder}>
              Logo {i}
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
