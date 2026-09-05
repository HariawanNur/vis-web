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
  Input,
  message,
  Row,
  Select,
  Typography,
  type IconName,
} from "@/components";
import { useI18n } from "@/i18n";
import {
  submitMarketingContact,
  type MarketingContactInput,
} from "@/lib/marketing-api";
import { useMarketingData } from "@/lib/use-marketing-data";
import { designSystem } from "@/theme/antd-theme";
import { MarketingContainer, MarketingSection } from "../_components/site";

const { Paragraph, Text, Title } = Typography;

const useStyles = createStyles(({ css }) => ({
  page: css`
    color: #111a3c;
    background: #fff;
  `,
  state: css`
    min-height: 360px;
    text-align: center;
  `,
  hero: css`
    position: relative;
    min-height: 360px;
    overflow: hidden;
    padding: 56px 0 34px;
    background:
      radial-gradient(
        ellipse at 40% 55%,
        rgba(103, 44, 196, 0.09),
        transparent 48%
      ),
      linear-gradient(
        105deg,
        #fbfaff 0%,
        #fbfaff 63%,
        #f2effa 63%,
        #f2effa 100%
      );

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      padding-top: 48px;
    }
  `,
  heroImageWrap: css`
    position: absolute;
    inset: 0 0 0 64%;
    overflow: hidden;

    &::after {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, #fbfaff, rgba(251, 250, 255, 0) 22%);
      content: "";
    }

    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      left: 40%;
      opacity: 0.18;
    }
  `,
  heroImage: css`
    object-fit: cover;
    object-position: center 38%;
  `,
  heroContent: css`
    position: relative;
    z-index: 1;
  `,
  heroCopy: css`
    max-width: 540px;
  `,
  eyebrow: css`
    color: #6124b7 !important;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  `,
  heroTitle: css`
    margin: 10px 0 12px !important;
    color: #111a3c !important;
    font-size: clamp(30px, 4vw, 44px) !important;
    line-height: 1.12 !important;
    letter-spacing: -0.035em;
  `,
  heroDescription: css`
    margin: 0 !important;
    color: #45506e !important;
    font-size: 14px;
    line-height: 1.7;
  `,
  promiseRow: css`
    margin-top: 36px;
  `,
  promiseCard: css`
    height: 100%;
    border: 1px solid #e8e5ef !important;
    border-radius: 10px !important;
    background: rgba(255, 255, 255, 0.94) !important;
    box-shadow: 0 6px 20px rgba(31, 17, 74, 0.04) !important;

    .ant-card-body {
      padding: 14px !important;
    }
  `,
  roundIcon: css`
    display: grid;
    width: 38px;
    height: 38px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: #6827c1;
    font-size: 18px;
    background: #f3edfc;
  `,
  itemTitle: css`
    display: block;
    color: #111a3c !important;
    font-size: 12px;
    line-height: 1.35;
  `,
  itemDescription: css`
    display: block;
    margin-top: 3px;
    color: #53607d !important;
    font-size: 11px;
    line-height: 1.45;
  `,
  section: css`
    padding-block: 34px !important;
  `,
  panelCard: css`
    height: 100%;
    border: 1px solid #ebe8f1 !important;
    border-radius: 10px !important;
    box-shadow: 0 5px 20px rgba(32, 23, 70, 0.05) !important;

    .ant-card-body {
      height: 100%;
      padding: 24px !important;
    }
  `,
  panelTitle: css`
    margin: 0 0 8px !important;
    color: #111a3c !important;
    font-size: 19px !important;
  `,
  panelDescription: css`
    margin: 0 0 20px !important;
    color: #53607d !important;
    font-size: 12px;
    line-height: 1.6;
  `,
  contactList: css`
    margin-top: 14px;
  `,
  contactItem: css`
    min-height: 78px;
    padding: 12px 0;
    border-bottom: 1px solid #eceaf1;

    &:last-child {
      border-bottom: 0;
    }
  `,
  contactValue: css`
    display: block;
    margin-top: 4px;
    color: #394462;
    font-size: 12px;
    font-weight: 600;
    overflow-wrap: anywhere;
    text-decoration: none;
  `,
  formCard: css`
    .ant-form-item {
      margin-bottom: 15px;
    }

    .ant-form-item-label {
      padding-bottom: 5px;
    }

    .ant-form-item-label > label {
      color: #303b5b;
      font-size: 12px;
    }

    .ant-input,
    .ant-select-selector {
      border-color: #dfe1e9 !important;
      border-radius: 7px !important;
      box-shadow: none !important;
      font-size: 12px !important;
    }

    .ant-input {
      min-height: 38px;
    }

    textarea.ant-input {
      min-height: 92px;
    }
  `,
  consent: css`
    display: block;
    margin: -1px 0 16px;
    color: #68728c !important;
    font-size: 11px;
  `,
  submitButton: css`
    min-width: 184px;
    height: 38px !important;
    border-color: #6426ba !important;
    background: linear-gradient(90deg, #6826bd, #5820a7) !important;

    @media (max-width: ${designSystem.breakpoints.sm - 1}px) {
      width: 100%;
    }
  `,
  lowerRow: css`
    margin-top: 16px;
  `,
  mapPanel: css`
    position: relative;
    min-height: 260px;
    overflow: hidden;
    border: 1px solid #e7e4ed;
    border-radius: 10px;
    background-color: #eeece4;
    background-image:
      repeating-linear-gradient(
        18deg,
        transparent 0 42px,
        rgba(205, 201, 188, 0.45) 43px 46px
      ),
      repeating-linear-gradient(
        103deg,
        transparent 0 58px,
        rgba(215, 211, 198, 0.55) 59px 62px
      );
  `,
  mapRoad: css`
    position: absolute;
    left: -8%;
    width: 116%;
    height: 32px;
    border: solid #d8d4c8;
    border-width: 1px 0;
    background: rgba(255, 255, 255, 0.9);
    transform: rotate(8deg);
  `,
  mapRoadVertical: css`
    position: absolute;
    top: -15%;
    left: 55%;
    width: 30px;
    height: 130%;
    border: solid #d8d4c8;
    border-width: 0 1px;
    background: rgba(255, 255, 255, 0.88);
    transform: rotate(-8deg);
  `,
  mapPin: css`
    position: absolute;
    z-index: 2;
    top: 54%;
    left: 55%;
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 3px solid #fff;
    border-radius: 50% 50% 50% 0;
    color: #fff;
    background: #6727bc;
    box-shadow: 0 5px 12px rgba(66, 25, 130, 0.3);
    transform: rotate(-45deg);

    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
    }
  `,
  mapInfo: css`
    position: absolute;
    z-index: 3;
    top: 22px;
    left: 22px;
    max-width: min(280px, calc(100% - 44px));
    padding: 14px 17px;
    border: 1px solid #ece8f2;
    border-radius: 8px;
    color: #3d4865;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 6px 20px rgba(26, 18, 55, 0.08);
  `,
  visitCard: css`
    border: 0 !important;
    background: linear-gradient(135deg, #fdfcff, #f7f5fc) !important;
  `,
  visitList: css`
    margin: 18px 0 22px;
  `,
  visitItem: css`
    .anticon {
      margin-top: 3px;
      color: #6a28c2;
    }
  `,
  routeButton: css`
    height: 38px !important;
    border-color: #6a28c2 !important;
    color: #5d20ad !important;
    background: transparent !important;
  `,
}));

export default function Page() {
  const { styles, cx } = useStyles();
  const { locale, t } = useI18n();
  const { data, error, loading, refetch } = useMarketingData(locale);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  if (loading && !data) {
    return (
      <MarketingSection className={styles.state}>
        <Text>{t("status.loading")}</Text>
      </MarketingSection>
    );
  }

  if (error || !data) {
    return (
      <MarketingSection className={styles.state}>
        <Flex vertical align="center" gap={16}>
          <Text>{t("status.error")}</Text>
          <Button onClick={refetch}>{t("status.retry")}</Button>
        </Flex>
      </MarketingSection>
    );
  }

  const contact = data.contact;
  const address = contact.info.find((item) => !item.href);
  const businessTypeOptions = contact.businessTypeOptions.map((option) => ({
    value: option.id,
    label: t(option.labelKey),
  }));
  const teamSizeOptions = contact.teamSizeOptions.map((option) => ({
    value: option.id,
    label: t(option.labelKey),
  }));
  const requiredRule = { required: true, message: t("form.required") };

  const onFinish = async (input: MarketingContactInput) => {
    setSubmitting(true);
    try {
      await submitMarketingContact(input, locale);
      form.resetFields();
      message.success(t("status.contactSent"));
    } catch {
      message.error(t("status.contactFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const openRoute = () => {
    if (!address) return;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.value)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/ilustrations/Office_Call.png"
            alt=""
            fill
            priority
            sizes="(max-width: 991px) 60vw, 36vw"
            className={styles.heroImage}
          />
        </div>
        <MarketingContainer className={styles.heroContent}>
          <Flex vertical className={styles.heroCopy}>
            <Text className={styles.eyebrow}>
              {t("marketing.contact.eyebrow")}
            </Text>
            <Title level={1} className={styles.heroTitle}>
              {t("marketing.contact.title")}
            </Title>
            <Paragraph className={styles.heroDescription}>
              {t("marketing.contact.description")}
            </Paragraph>
          </Flex>
          <Row gutter={[14, 14]} className={styles.promiseRow}>
            {contact.promises.map((item) => (
              <Col xs={24} sm={8} key={item.id}>
                <Card className={styles.promiseCard}>
                  <Flex align="center" gap={12}>
                    <span className={styles.roundIcon}>
                      <Icon type={item.icon as IconName} />
                    </span>
                    <span>
                      <Text strong className={styles.itemTitle}>
                        {t(item.titleKey)}
                      </Text>
                      <Text className={styles.itemDescription}>
                        {t(item.descriptionKey)}
                      </Text>
                    </span>
                  </Flex>
                </Card>
              </Col>
            ))}
          </Row>
        </MarketingContainer>
      </section>

      <MarketingSection className={styles.section}>
        <Row gutter={[16, 16]} align="stretch">
          <Col xs={24} lg={8}>
            <Card className={styles.panelCard}>
              <Title level={3} className={styles.panelTitle}>
                {t("nav.contact")}
              </Title>
              <Flex vertical className={styles.contactList}>
                {contact.info.map((item) => (
                  <Flex
                    className={styles.contactItem}
                    align="center"
                    gap={14}
                    key={item.id}
                  >
                    <span className={styles.roundIcon}>
                      <Icon type={item.icon as IconName} />
                    </span>
                    <span>
                      <Text strong className={styles.itemTitle}>
                        {t(item.labelKey)}
                      </Text>
                      {item.href ? (
                        <a className={styles.contactValue} href={item.href}>
                          {item.value}
                        </a>
                      ) : (
                        <Text className={styles.contactValue}>
                          {item.value}
                        </Text>
                      )}
                    </span>
                  </Flex>
                ))}
              </Flex>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card className={cx(styles.panelCard, styles.formCard)}>
              <Title level={3} className={styles.panelTitle}>
                {t("common.send")}
              </Title>
              <Paragraph className={styles.panelDescription}>
                {t("marketing.contact.description")}
              </Paragraph>
              <Form
                form={form}
                layout="vertical"
                requiredMark
                onFinish={onFinish}
              >
                <Row gutter={[18, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label={t("form.name")}
                      rules={[requiredRule]}
                    >
                      <Input placeholder={t("form.namePlaceholder")} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label={t("form.email")}
                      rules={[
                        requiredRule,
                        { type: "email", message: t("form.invalidEmail") },
                      ]}
                    >
                      <Input
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="phone" label={t("form.phone")}>
                      <Input placeholder={t("form.phonePlaceholder")} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="businessType"
                      label={t("form.businessType")}
                    >
                      <Select
                        placeholder={t("form.selectPlaceholder")}
                        options={businessTypeOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="teamSize" label={t("form.teamSize")}>
                      <Select
                        placeholder={t("form.selectPlaceholder")}
                        options={teamSizeOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="message"
                      label={t("form.message")}
                      rules={[requiredRule]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Text className={styles.consent}>
                  {t("form.privacyConsent")}
                </Text>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<Icon type="SendOutlined" />}
                  className={styles.submitButton}
                >
                  {submitting ? t("status.submitting") : t("common.send")}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} align="stretch" className={styles.lowerRow}>
          <Col xs={24} lg={16}>
            <div className={styles.mapPanel} aria-label={t("form.address")}>
              <div
                className={styles.mapRoad}
                style={{ top: "26%", transform: "rotate(-7deg)" }}
              />
              <div className={styles.mapRoad} style={{ top: "68%" }} />
              <div className={styles.mapRoadVertical} />
              {address && (
                <Flex vertical gap={4} className={styles.mapInfo}>
                  <Text strong>{t(address.labelKey)}</Text>
                  <Text>{address.value}</Text>
                </Flex>
              )}
              <div className={styles.mapPin}>
                <span />
              </div>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <Card className={cx(styles.panelCard, styles.visitCard)}>
              <Title level={3} className={styles.panelTitle}>
                {t("marketing.contact.visit.title")}
              </Title>
              <Flex vertical gap={14} className={styles.visitList}>
                {contact.visitBullets.map((item) => (
                  <Flex
                    gap={10}
                    className={styles.visitItem}
                    align="flex-start"
                    key={item.id}
                  >
                    <Icon type={item.icon as IconName} />
                    <span>
                      <Text strong className={styles.itemTitle}>
                        {t(item.titleKey)}
                      </Text>
                      <Text className={styles.itemDescription}>
                        {t(item.descriptionKey)}
                      </Text>
                    </span>
                  </Flex>
                ))}
              </Flex>
              <Button
                icon={<Icon type="EnvironmentOutlined" />}
                className={styles.routeButton}
                disabled={!address}
                onClick={openRoute}
              >
                {t("form.address")}
              </Button>
            </Card>
          </Col>
        </Row>
      </MarketingSection>
    </main>
  );
}
