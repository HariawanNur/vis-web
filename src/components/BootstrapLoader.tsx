"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { createStyles } from "antd-style";
import { Button } from "./Button";
import { Card } from "./Card";
import { Col, Row } from "./Grid";
import { Flex } from "./Flex";
import { Icon, type IconName } from "./Icon";
import { Progress } from "./Progress";
import { Typography } from "./Typography";
import { useI18n, type TranslationKey } from "@/i18n";
import { designSystem } from "@/theme/antd-theme";

const { Paragraph, Text, Title } = Typography;

const steps: Array<{ icon: IconName; labelKey: TranslationKey }> = [
  { icon: "ApiOutlined", labelKey: "bootstrap.steps.auth" },
  { icon: "BankOutlined", labelKey: "bootstrap.steps.tenant" },
  {
    icon: "SafetyCertificateOutlined",
    labelKey: "bootstrap.steps.permissions",
  },
  { icon: "AppstoreOutlined", labelKey: "bootstrap.steps.workspace" },
];

export interface BootstrapLoaderProps {
  activeStep?: number;
  progress?: number;
  slow?: boolean;
  error?: Error | null;
  requestId?: string;
  onRetry?: () => void;
  brandSlot?: ReactNode;
}

const useStyles = createStyles(({ css }) => ({
  page: css`
    position: fixed;
    inset: 0;
    z-index: 9999;
    min-height: 100dvh;
    overflow: auto;
    background: linear-gradient(180deg, #fff 0%, #fdfcff 72%, #f5efff 100%);
  `,
  content: css`
    width: min(920px, calc(100% - 64px));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 72px 0 150px;
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      width: min(620px, calc(100% - 48px));
      padding-top: 56px;
    }
    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      width: calc(100% - 32px);
      padding: 38px 0 130px;
    }
  `,
  brand: css`
    position: relative;
    z-index: 2;
  `,
  mark: css`
    display: block;
    width: 132px;
    height: 88px;
    margin-bottom: 18px;
    object-fit: contain;
    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      width: 102px;
      height: 68px;
    }
  `,
  brandName: css`
    margin: 0 !important;
    color: #10152f !important;
    font-size: 34px !important;
    letter-spacing: 10px;
    font-weight: 800 !important;
    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      font-size: 27px !important;
      letter-spacing: 7px;
    }
  `,
  tagline: css`
    color: #55607d !important;
    font-size: 14px;
  `,
  heading: css`
    margin: 48px 0 0 !important;
    color: ${designSystem.palette.primaryDark}!important;
    font-size: 21px !important;
  `,
  subtitle: css`
    margin: 6px 0 0 !important;
    color: ${designSystem.palette.textSecondary}!important;
  `,
  progressArea: css`
    width: min(700px, 100%);
    margin: 36px auto 0;
  `,
  progress: css`
    .ant-progress-text {
      color: ${designSystem.palette.primary};
      font-weight: 700;
    }
    .ant-progress-inner {
      height: 7px !important;
    }
    .ant-progress-bg {
      height: 7px !important;
    }
  `,
  indeterminateTrack: css`
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: ${designSystem.palette.tintPrimary};
  `,
  indeterminateBar: css`
    width: 38%;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      ${designSystem.palette.primary},
      #a878ef
    );
    animation: bootstrap-slide 1.45s ease-in-out infinite;
    @keyframes bootstrap-slide {
      0% {
        transform: translateX(-110%);
      }
      50% {
        transform: translateX(165%);
      }
      100% {
        transform: translateX(380%);
      }
    }
  `,
  steps: css`
    width: 100%;
    margin-top: 42px;
  `,
  stepCol: css`
    position: relative;
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 31px;
      left: calc(50% + 40px);
      width: calc(100% - 80px);
      height: 1px;
      background: ${designSystem.palette.border};
    }
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      &:not(:last-child)::after {
        display: none;
      }
    }
  `,
  step: css`
    min-height: 150px;
    padding: 0 10px;
    text-align: center;
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      min-height: 76px;
      padding: 11px 8px;
      text-align: left;
      border-bottom: 1px solid ${designSystem.palette.borderSoft};
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
  `,
  stepMain: css`
    flex-direction: column;
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      flex-direction: row;
    }
  `,
  stepIcon: css`
    width: 62px;
    height: 62px;
    border-radius: 50%;
    color: ${designSystem.palette.primary};
    background: ${designSystem.palette.tintPrimary};
    font-size: 28px;
  `,
  stepLabel: css`
    max-width: 150px;
    color: ${designSystem.palette.text};
    font-size: 12px;
    line-height: 1.55;
    font-weight: 600;
  `,
  stateIcon: css`
    font-size: 18px;
  `,
  completed: css`
    color: ${designSystem.palette.success};
  `,
  active: css`
    color: ${designSystem.palette.primary};
  `,
  pending: css`
    color: ${designSystem.palette.textQuaternary};
  `,
  reassurance: css`
    width: min(560px, 100%);
    margin: 16px auto 0 !important;
    border-color: #ded0f5 !important;
    background: linear-gradient(135deg, #fbf8ff, #f5efff);
    .ant-card-body {
      padding: 19px 24px;
    }
  `,
  reassuranceIcon: css`
    color: ${designSystem.palette.primary};
    font-size: 32px;
  `,
  reassuranceTitle: css`
    display: block;
    color: ${designSystem.palette.text};
    font-size: 13px;
  `,
  reassuranceText: css`
    display: block;
    margin-top: 3px;
    color: ${designSystem.palette.textSecondary};
    font-size: 11px;
    line-height: 1.55;
  `,
  slow: css`
    width: min(620px, 100%);
    margin: 18px auto 0;
    text-align: center;
    color: ${designSystem.palette.warning};
    font-size: 12px;
  `,
  errorCard: css`
    width: min(620px, 100%);
    margin: 34px auto 0 !important;
    border-color: #fecaca !important;
    background: #fffafa;
    .ant-card-body {
      padding: 24px;
    }
  `,
  errorIcon: css`
    color: ${designSystem.palette.error};
    font-size: 32px;
  `,
  errorTitle: css`
    margin: 0 !important;
    color: ${designSystem.palette.text}!important;
    font-size: 17px !important;
  `,
  errorDescription: css`
    margin: 6px 0 12px !important;
    color: ${designSystem.palette.textSecondary}!important;
    font-size: 12px;
  `,
  requestId: css`
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: ${designSystem.palette.textSecondary};
    font-size: 11px;
  `,
  waves: css`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 145px;
    overflow: hidden;
    pointer-events: none;
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: -5%;
      width: 110%;
      height: 145px;
      border-radius: 50% 50% 0 0/55% 55% 0 0;
    }
    &::before {
      bottom: -75px;
      background: rgba(124, 58, 237, 0.16);
      transform: rotate(3deg);
    }
    &::after {
      bottom: -100px;
      background: rgba(124, 58, 237, 0.26);
      transform: rotate(-2deg);
    }
  `,
}));

export function BootstrapLoader({
  activeStep = 0,
  progress,
  slow,
  error,
  requestId,
  onRetry,
  brandSlot,
}: BootstrapLoaderProps) {
  const { styles } = useStyles();
  const { t } = useI18n();
  const currentLabel =
    activeStep >= steps.length
      ? t("bootstrap.steps.ready")
      : t(steps[Math.max(0, activeStep)].labelKey);
  return (
    <div
      className={`bl-page ${styles.page}`}
      role={error ? "alert" : "status"}
      aria-live="polite"
      aria-busy={!error}
    >
      <Flex className={`bl-content ${styles.content}`} vertical align="center">
        {brandSlot ?? (
          <Flex className={`bl-brand ${styles.brand}`} vertical align="center">
            <Image
              className={`bl-mark ${styles.mark}`}
              src="/images/logo.webp"
              alt={t("app.logoAlt")}
              width={132}
              height={88}
              priority
            />
            <Title className={`bl-brandName ${styles.brandName}`}>
              {t("app.brand").toUpperCase()}
            </Title>
            <Text className={`bl-tagline ${styles.tagline}`}>
              {t("app.tagline")}
            </Text>
          </Flex>
        )}
        <Title level={2} className={`bl-heading ${styles.heading}`}>
          {error ? t("bootstrap.errorTitle") : currentLabel}
        </Title>
        <Paragraph className={`bl-subtitle ${styles.subtitle}`}>
          {error ? t("bootstrap.errorDescription") : t("bootstrap.subtitle")}
        </Paragraph>
        {!error && (
          <div className={`bl-progressArea ${styles.progressArea}`}>
            {typeof progress === "number" ? (
              <Progress
                className={styles.progress}
                percent={Math.max(0, Math.min(100, progress))}
              />
            ) : (
              <div
                className={`bl-indeterminateTrack ${styles.indeterminateTrack}`}
                role="progressbar"
                aria-label={currentLabel}
              >
                <div
                  className={`bl-indeterminateBar ${styles.indeterminateBar}`}
                />
              </div>
            )}
          </div>
        )}
        {!error && (
          <Row className={`bl-steps ${styles.steps}`} gutter={[12, 0]}>
            {steps.map((step, index) => {
              const state =
                index < activeStep
                  ? "completed"
                  : index === activeStep
                    ? "active"
                    : "pending";
              return (
                <Col
                  className={`bl-stepCol ${styles.stepCol}`}
                  xs={24}
                  lg={6}
                  key={step.labelKey}
                >
                  <Flex
                    className={`bl-step ${styles.step}`}
                    vertical
                    align="center"
                    justify="flex-start"
                    gap={12}
                  >
                    <Flex
                      className={`bl-stepMain ${styles.stepMain}`}
                      align="center"
                      gap={14}
                    >
                      <Flex
                        className={`bl-stepIcon ${styles.stepIcon}`}
                        align="center"
                        justify="center"
                      >
                        <Icon type={step.icon} />
                      </Flex>
                      <Text className={`bl-stepLabel ${styles.stepLabel}`}>
                        {t(step.labelKey)}
                      </Text>
                    </Flex>
                    <Icon
                      className={`bl-stateIcon bl-${state} ${styles.stateIcon} ${styles[state]}`}
                      type={
                        state === "completed"
                          ? "CheckCircleFilled"
                          : state === "active"
                            ? "LoadingOutlined"
                            : "ClockCircleOutlined"
                      }
                      spin={state === "active"}
                    />
                  </Flex>
                </Col>
              );
            })}
          </Row>
        )}
        {!error && slow && (
          <Flex
            className={`bl-slow ${styles.slow}`}
            vertical
            align="center"
            gap={12}
          >
            <Text>{t("bootstrap.slow")}</Text>
            {onRetry && (
              <Button onClick={onRetry} icon={<Icon type="ReloadOutlined" />}>
                {t("status.retry")}
              </Button>
            )}
          </Flex>
        )}
        {error && (
          <Card className={`bl-errorCard ${styles.errorCard}`}>
            <Flex gap={16} align="flex-start">
              <Icon
                type="WarningOutlined"
                className={`bl-errorIcon ${styles.errorIcon}`}
              />
              <Flex vertical align="flex-start">
                <Title
                  level={3}
                  className={`bl-errorTitle ${styles.errorTitle}`}
                >
                  {t("bootstrap.errorTitle")}
                </Title>
                <Paragraph
                  className={`bl-errorDescription ${styles.errorDescription}`}
                >
                  {t("bootstrap.errorDescription")}
                </Paragraph>
                {requestId && (
                  <Text className={`bl-requestId ${styles.requestId}`}>
                    {t("bootstrap.requestId")}: {requestId}
                  </Text>
                )}
                {onRetry && (
                  <Button
                    type="primary"
                    onClick={onRetry}
                    icon={<Icon type="ReloadOutlined" />}
                  >
                    {t("status.retry")}
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>
        )}
        {!error && (
          <Card className={`bl-reassurance ${styles.reassurance}`}>
            <Flex align="center" gap={16}>
              <Icon
                type="SafetyCertificateOutlined"
                className={`bl-reassuranceIcon ${styles.reassuranceIcon}`}
              />
              <span>
                <Text
                  strong
                  className={`bl-reassuranceTitle ${styles.reassuranceTitle}`}
                >
                  {t("bootstrap.securityTitle")}
                </Text>
                <Text
                  className={`bl-reassuranceText ${styles.reassuranceText}`}
                >
                  {t("bootstrap.securityDescription")}
                </Text>
              </span>
            </Flex>
          </Card>
        )}
      </Flex>
      <div className={`bl-waves ${styles.waves}`} />
    </div>
  );
}
