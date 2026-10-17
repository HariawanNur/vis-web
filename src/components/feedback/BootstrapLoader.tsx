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

const { Paragraph, Text, Title } = Typography;

const steps: Array<{ icon: IconName; labelKey: TranslationKey }> = [
  { icon: "ApiOutlined", labelKey: "bootstrap.steps.auth" },
  { icon: "BankOutlined", labelKey: "bootstrap.steps.tenant" },
  { icon: "SafetyCertificateOutlined", labelKey: "bootstrap.steps.permissions" },
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

const useStyles = createStyles(({ css, token }) => ({
  page: css`
    position: fixed;
    inset: 0;
    z-index: 9999;
    overflow: auto;
    background:
      radial-gradient(circle at 18% 18%, rgba(22, 119, 255, 0.14), transparent 28%),
      radial-gradient(circle at 84% 14%, rgba(56, 189, 248, 0.12), transparent 24%),
      linear-gradient(180deg, ${token.colorBgLayout} 0%, ${token.colorBgBase} 100%);
    color: ${token.colorText};
  `,
  backdrop: css`
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.26), transparent 18%),
      radial-gradient(circle at 50% 100%, rgba(7, 17, 31, 0.08), transparent 34%);
  `,
  shell: css`
    position: relative;
    width: min(1180px, calc(100% - 48px));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 28px 0 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    @media (max-width: ${token.screenLG}px) {
      width: min(960px, calc(100% - 32px));
    }

    @media (max-width: ${token.screenSM}px) {
      width: calc(100% - 24px);
      padding: 18px 0 24px;
      gap: 16px;
    }
  `,
  topBar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  `,
  brand: css`
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  `,
  mark: css`
    width: 72px;
    height: 48px;
    object-fit: contain;
    flex: 0 0 auto;

    @media (max-width: ${token.screenSM}px) {
      width: 58px;
      height: 40px;
    }
  `,
  brandText: css`
    min-width: 0;
  `,
  brandName: css`
    margin: 0 !important;
    color: ${token.colorText} !important;
    font-size: 20px !important;
    letter-spacing: 0.14em;
    font-weight: 800 !important;
    line-height: 1 !important;
  `,
  tagline: css`
    display: block;
    color: ${token.colorTextSecondary} !important;
    font-size: 12px;
    line-height: 1.4;
  `,
  statusPill: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 999px;
    background: ${token.colorBgContainer};
    color: ${token.colorTextSecondary};
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(7, 17, 31, 0.06);
  `,
  stage: css`
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
    gap: 20px;
    align-items: stretch;

    @media (max-width: ${token.screenLG}px) {
      grid-template-columns: 1fr;
    }
  `,
  heroPanel: css`
    padding: 34px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 28px;
    background: linear-gradient(180deg, ${token.colorBgContainer} 0%, ${token.colorBgElevated} 100%);
    box-shadow: ${token.boxShadowSecondary};

    @media (max-width: ${token.screenSM}px) {
      padding: 22px;
      border-radius: 22px;
    }
  `,
  eyebrow: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(22, 119, 255, 0.08);
    color: ${token.colorPrimary};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  title: css`
    margin: 14px 0 12px !important;
    color: ${token.colorText} !important;
    font-size: 42px !important;
    line-height: 1.06 !important;
    letter-spacing: -0.04em;
    font-weight: 800 !important;

    @media (max-width: ${token.screenSM}px) {
      font-size: 31px !important;
    }
  `,
  titleAccent: css`
    color: ${token.colorPrimary};
  `,
  subtitle: css`
    max-width: 560px;
    margin: 0 !important;
    color: ${token.colorTextSecondary} !important;
    font-size: 16px;
    line-height: 1.75;
  `,
  progressArea: css`
    margin-top: 28px;
    max-width: 640px;
  `,
  progress: css`
    .ant-progress-inner {
      height: 10px !important;
      background: ${token.colorFillSecondary};
    }

    .ant-progress-bg {
      height: 10px !important;
      background: linear-gradient(90deg, ${token.colorPrimary}, #60a5fa);
      box-shadow: 0 8px 16px rgba(22, 119, 255, 0.28);
    }

    .ant-progress-text {
      color: ${token.colorTextSecondary};
      font-weight: 700;
    }
  `,
  indeterminateTrack: css`
    height: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: ${token.colorFillSecondary};
  `,
  indeterminateBar: css`
    width: 36%;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, ${token.colorPrimary}, #60a5fa);
    animation: bootstrap-slide 1.5s ease-in-out infinite;

    @keyframes bootstrap-slide {
      0% {
        transform: translateX(-120%);
      }
      50% {
        transform: translateX(170%);
      }
      100% {
        transform: translateX(380%);
      }
    }
  `,
  helperRow: css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  `,
  helperChip: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 999px;
    background: ${token.colorFillQuaternary};
    color: ${token.colorTextSecondary};
    font-size: 12px;
  `,
  sidePanel: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  stepsCard: css`
    padding: 26px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 28px;
    background: linear-gradient(180deg, ${token.colorBgContainer} 0%, ${token.colorBgElevated} 100%);
    box-shadow: ${token.boxShadowSecondary};

    @media (max-width: ${token.screenSM}px) {
      padding: 20px;
      border-radius: 22px;
    }
  `,
  sectionTitle: css`
    margin: 0 0 14px !important;
    color: ${token.colorText} !important;
    font-size: 14px !important;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  stepCol: css`
    margin-bottom: 12px;
  `,
  stepItem: css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 16px 18px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 18px;
    background: ${token.colorBgContainer};
  `,
  stepMain: css`
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  `,
  stepIcon: css`
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(22, 119, 255, 0.1);
    color: ${token.colorPrimary};
    flex: 0 0 auto;
  `,
  stepLabel: css`
    color: ${token.colorText};
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
  `,
  stateIcon: css`
    flex: 0 0 auto;
    margin-top: 2px;
    font-size: 18px;
  `,
  completed: css`
    color: ${token.colorSuccess};
  `,
  active: css`
    color: ${token.colorPrimary};
  `,
  pending: css`
    color: ${token.colorTextQuaternary};
  `,
  reassurance: css`
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(22, 119, 255, 0.08), rgba(96, 165, 250, 0.05));
    box-shadow: ${token.boxShadow};

    .ant-card-body {
      padding: 18px 20px;
    }
  `,
  reassuranceIcon: css`
    color: ${token.colorPrimary};
    font-size: 30px;
  `,
  reassuranceTitle: css`
    display: block;
    color: ${token.colorText};
    font-size: 13px;
  `,
  reassuranceText: css`
    display: block;
    margin-top: 3px;
    color: ${token.colorTextSecondary};
    font-size: 12px;
    line-height: 1.55;
  `,
  slow: css`
    align-self: center;
    width: min(620px, 100%);
    padding: 14px 18px;
    border-radius: 18px;
    border: 1px solid rgba(250, 173, 20, 0.28);
    background: rgba(250, 173, 20, 0.08);
    color: ${token.colorWarning};
    text-align: center;
  `,
  errorCard: css`
    width: min(700px, 100%);
    margin: 0 auto;
    border: 1px solid rgba(255, 120, 117, 0.28);
    border-radius: 28px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadowSecondary};

    .ant-card-body {
      padding: 26px;
    }
  `,
  errorIcon: css`
    color: ${token.colorError};
    font-size: 32px;
  `,
  errorTitle: css`
    margin: 0 !important;
    color: ${token.colorText} !important;
    font-size: 18px !important;
  `,
  errorDescription: css`
    margin: 6px 0 12px !important;
    color: ${token.colorTextSecondary} !important;
    font-size: 13px;
  `,
  requestId: css`
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: ${token.colorTextSecondary};
    font-size: 12px;
  `,
  footerNote: css`
    margin-top: 4px;
    color: ${token.colorTextTertiary};
    font-size: 12px;
    text-align: center;
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
    <div className={styles.page} role={error ? "alert" : "status"} aria-live="polite" aria-busy={!error}>
      <div className={styles.backdrop} />
      <div className={styles.shell}>
        <div className={styles.topBar}>
          {brandSlot ?? (
            <Flex className={styles.brand} align="center">
              <Image className={styles.mark} src="/images/logo.webp" alt={t("app.logoAlt")} width={72} height={48} priority />
              <div className={styles.brandText}>
                <Title className={styles.brandName}>{t("app.brand").toUpperCase()}</Title>
                <Text className={styles.tagline}>{t("app.tagline")}</Text>
              </div>
            </Flex>
          )}

          <span className={styles.statusPill}>
            <Icon type={error ? "WarningOutlined" : "LoadingOutlined"} spin={!error} />
            {error ? t("status.error") : currentLabel}
          </span>
        </div>

        {error ? (
          <Card className={styles.errorCard}>
            <Flex gap={16} align="flex-start">
              <Icon type="WarningOutlined" className={styles.errorIcon} />
              <Flex vertical align="flex-start" gap={2}>
                <Title level={3} className={styles.errorTitle}>{t("bootstrap.errorTitle")}</Title>
                <Paragraph className={styles.errorDescription}>{t("bootstrap.errorDescription")}</Paragraph>
                {requestId && <Text className={styles.requestId}>{t("bootstrap.requestId")}: {requestId}</Text>}
                {onRetry && (
                  <Button type="primary" onClick={onRetry} icon={<Icon type="ReloadOutlined" />}>
                    {t("status.retry")}
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>
        ) : (
          <div className={styles.stage}>
            <Card className={styles.heroPanel}>
              <Text className={styles.eyebrow}>{t("marketing.home.eyebrow")}</Text>
              <Title level={2} className={styles.title}>
                {t("marketing.home.titlePrefix")} <span className={styles.titleAccent}>{t("marketing.home.titleAccent")}</span> {t("marketing.home.titleSuffix")}
              </Title>
              <Paragraph className={styles.subtitle}>{t("app.description")}</Paragraph>

              <div className={styles.progressArea}>
                {typeof progress === "number" ? (
                  <Progress className={styles.progress} percent={Math.max(0, Math.min(100, progress))} />
                ) : (
                  <div className={styles.indeterminateTrack} role="progressbar" aria-label={currentLabel}>
                    <div className={styles.indeterminateBar} />
                  </div>
                )}
              </div>

              <div className={styles.helperRow}>
                <span className={styles.helperChip}><Icon type="CheckCircleFilled" /> {t("bootstrap.securityTitle")}</span>
                <span className={styles.helperChip}><Icon type="SafetyCertificateOutlined" /> {t("bootstrap.securityDescription")}</span>
              </div>

              {slow && (
                <Flex className={styles.slow} vertical align="center" gap={10}>
                  <Text>{t("bootstrap.slow")}</Text>
                  {onRetry && (
                    <Button onClick={onRetry} icon={<Icon type="ReloadOutlined" />}>
                      {t("status.retry")}
                    </Button>
                  )}
                </Flex>
              )}
            </Card>

            <div className={styles.sidePanel}>
              <Card className={styles.stepsCard}>
                <Title level={5} className={styles.sectionTitle}>{t("bootstrap.subtitle")}</Title>
                <Row gutter={[12, 12]}>
                  {steps.map((step, index) => {
                    const state = index < activeStep ? "completed" : index === activeStep ? "active" : "pending";
                    return (
                      <Col xs={24} sm={12} key={step.labelKey} className={styles.stepCol}>
                        <div className={styles.stepItem}>
                          <div className={styles.stepMain}>
                            <div className={styles.stepIcon}><Icon type={step.icon} /></div>
                            <Text className={styles.stepLabel}>{t(step.labelKey)}</Text>
                          </div>
                          <Icon
                            className={`${styles.stateIcon} ${styles[state]}`}
                            type={state === "completed" ? "CheckCircleFilled" : state === "active" ? "LoadingOutlined" : "ClockCircleOutlined"}
                            spin={state === "active"}
                          />
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Card>

              <Card className={styles.reassurance}>
                <Flex align="center" gap={14}>
                  <Icon type="SafetyCertificateOutlined" className={styles.reassuranceIcon} />
                  <span>
                    <Text strong className={styles.reassuranceTitle}>{t("bootstrap.securityTitle")}</Text>
                    <Text className={styles.reassuranceText}>{t("bootstrap.securityDescription")}</Text>
                  </span>
                </Flex>
              </Card>
            </div>
          </div>
        )}

        {!error && <Text className={styles.footerNote}>{t("app.tagline")}</Text>}
      </div>
    </div>
  );
}
