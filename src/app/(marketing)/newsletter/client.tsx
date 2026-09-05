"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Button,
  Card,
  Checkbox,
  Col,
  createStyles,
  Flex,
  Icon,
  Input,
  MarketingHero,
  Row,
  Typography,
  type IconName,
} from "@/components";
import { useI18n } from "@/i18n";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Text, Title } = Typography;

const benefits = [
  {
    icon: "BulbOutlined",
    titleKey: "newsletterPage.benefits.freeInsight.title",
    descriptionKey: "newsletterPage.benefits.freeInsight.description",
  },
  {
    icon: "ClockCircleOutlined",
    titleKey: "newsletterPage.benefits.weeklyUpdate.title",
    descriptionKey: "newsletterPage.benefits.weeklyUpdate.description",
  },
  {
    icon: "StarOutlined",
    titleKey: "newsletterPage.benefits.exclusiveContent.title",
    descriptionKey: "newsletterPage.benefits.exclusiveContent.description",
  },
] as const;

const interests = [
  { key: "technology", labelKey: "newsletterPage.interests.technology" },
  { key: "business", labelKey: "newsletterPage.interests.business" },
  { key: "design", labelKey: "newsletterPage.interests.design" },
  { key: "caseStudies", labelKey: "newsletterPage.interests.caseStudies" },
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
  subscribeCard: css`
    max-width: 640px;
    margin: 32px auto 0;
    border: 1px solid #dfe6f1;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 10px 28px rgba(12, 24, 48, 0.05);

    :global(.ant-card-body) {
      padding: 32px !important;
    }

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      :global(.ant-card-body) {
        padding: 24px !important;
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
  checkboxGroup: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  `,
  checkbox: css`
    .ant-checkbox-wrapper {
      border: 1px solid #dfe6f1;
      border-radius: 8px;
      padding: 6px 12px;
      transition: border-color 0.2s;

      &:hover {
        border-color: #1677ff;
      }
    }

    .ant-checkbox-wrapper-checked {
      border-color: #1677ff;
      background: #edf5ff;
    }
  `,
  submitBtn: css`
    height: 46px !important;
    padding-inline: 24px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
  `,
  benefitsGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;

    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      grid-template-columns: 1fr;
    }
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
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleInterestChange = (interest: string, checked: boolean) => {
    setSelectedInterests((prev) =>
      checked ? [...prev, interest] : prev.filter((i) => i !== interest)
    );
  };

  const handleSubmit = async () => {
    if (!email || !name) return;
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail("");
      setName("");
      setSelectedInterests([]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <MarketingHero
        backgroundSrc="/images/ilustrations/Digital_Contract_Signing.png"
        backgroundAlt="Newsletter Vistara"
        eyebrow={t("newsletterPage.hero.eyebrow")}
        titlePrefix={<><span>{t("newsletterPage.hero.titlePrefix")}</span></>}
        titleAccent={null}
        titleSuffix={null}
        description={t("newsletterPage.hero.description")}
      />

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>{t("newsletterPage.signup.label")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("newsletterPage.signup.title")}
        </Title>
        <Text className={styles.sectionDescription}>
          {t("newsletterPage.signup.description")}
        </Text>

        <Card className={styles.subscribeCard}>
          <div className={styles.formField}>
            <Text style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 }}>
              {t("form.name")}
            </Text>
            <Input
              placeholder={t("newsletterPage.signup.namePlaceholder")}
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formField}>
            <Text style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 }}>
              {t("form.email")}
            </Text>
            <Input
              placeholder={t("newsletterPage.signup.emailPlaceholder")}
              className={styles.formInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formField}>
            <Text style={{ display: "block", marginBottom: 10, fontWeight: 700, fontSize: 13 }}>
              {t("newsletterPage.signup.interestsLabel")}
            </Text>
            <div className={styles.checkboxGroup}>
              {interests.map((interest) => (
                <span key={interest.key} className={styles.checkbox}>
                  <Checkbox
                    checked={selectedInterests.includes(interest.key)}
                    onChange={(e) => handleInterestChange(interest.key, e.target.checked)}
                  >
                    {t(interest.labelKey)}
                  </Checkbox>
                </span>
              ))}
            </div>
          </div>

          <Button
            type="primary"
            className={styles.submitBtn}
            loading={submitting}
            onClick={handleSubmit}
            icon={<Icon type="SendOutlined" />}
          >
            {t("newsletterPage.signup.action")}
          </Button>
        </Card>
      </MarketingSection>

      <MarketingSection className={styles.section}>
        <Text className={styles.sectionLabel}>{t("newsletterPage.benefits.label")}</Text>
        <Title level={2} className={styles.sectionTitle}>
          {t("newsletterPage.benefits.title")}
        </Title>
        <Text className={styles.sectionDescription}>
          {t("newsletterPage.benefits.description")}
        </Text>

        <div className={styles.benefitsGrid} style={{ marginTop: 24 }}>
          {benefits.map((benefit) => (
            <Card key={benefit.titleKey} className={styles.benefitCard}>
              <span className={styles.benefitIcon}>
                <Icon type={benefit.icon as IconName} />
              </span>
              <Title level={4} className={styles.benefitTitle}>
                {t(benefit.titleKey)}
              </Title>
              <Text className={styles.benefitDescription}>{t(benefit.descriptionKey)}</Text>
            </Card>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection className={styles.ctaSection}>
        <Card className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <Text className={styles.ctaLabel}>{t("newsletterPage.cta.label")}</Text>
            <Title level={2} className={styles.ctaTitle}>
              {t("newsletterPage.cta.title")}
            </Title>
            <Text className={styles.ctaDescription}>
              {t("newsletterPage.cta.description")}
            </Text>
            <Flex className={styles.ctaActions} justify="space-between" gap={16} wrap="wrap">
              <Button type="primary" size="large" href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
                {t("newsletterPage.cta.action")}
              </Button>
            </Flex>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
