"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  createStyles,
  Flex,
  Icon,
  Input,
  Select,
  Typography,
} from "@/components";
import { useAuth } from "@/context/auth-context";
import { useI18n, type Locale } from "@/i18n";

const { Text, Title } = Typography;
const PENDING_MFA_KEY = "build_erp_pending_mfa";

interface PendingMfaDisplay {
  maskedDestination?: string;
  resendAfterSeconds?: number;
}

const useStyles = createStyles(({ css }) => ({
  page: css`
    position: fixed;
    inset: 0;
    display: grid;
    grid-template-columns: minmax(340px, 38%) minmax(0, 1fr);
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background: #f4f5f8;
    @media (max-width: 991px) { grid-template-columns: 1fr; }
  `,
  brandPanel: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 8%, rgba(157, 108, 255, .35), transparent 30%),
      linear-gradient(145deg, #32136f 0%, #1c123d 58%, #120d29 100%);
    padding: clamp(38px, 4vw, 68px);
    color: #fff;
    &::after {
      content: "";
      position: absolute;
      width: 520px;
      height: 520px;
      right: -300px;
      bottom: -210px;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 50%;
      box-shadow: 0 0 0 90px rgba(255,255,255,.025), 0 0 0 180px rgba(255,255,255,.018);
    }
    @media (max-width: 991px) { display: none; }
  `,
  brandHeader: css`position: relative; z-index: 1;`,
  brandLogo: css`width: 64px; height: 44px; object-fit: contain; object-position: left; filter: brightness(0) invert(1);`,
  brandName: css`color: #fff !important; font-size: 15px; font-weight: 800; letter-spacing: .12em;`,
  brandBody: css`position: relative; z-index: 1; max-width: 430px;`,
  eyebrow: css`color: #c7adff !important; font-size: 11px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase;`,
  brandTitle: css`margin: 16px 0 14px !important; color: #fff !important; font-size: clamp(30px, 3vw, 46px) !important; line-height: 1.12 !important; font-weight: 750 !important;`,
  brandDescription: css`color: #c9c3d9 !important; font-size: 15px; line-height: 1.7;`,
  trustList: css`position: relative; z-index: 1; display: grid; gap: 12px;`,
  trustItem: css`display: flex; align-items: center; gap: 11px; color: #d8d3e4; font-size: 12px;`,
  trustIcon: css`width: 30px; height: 30px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.12); border-radius: 9px; background: rgba(255,255,255,.06); color: #c9aaff;`,
  mainPanel: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    padding: 76px 34px 34px;
    background: radial-gradient(circle at 50% 18%, rgba(110, 54, 200, .055), transparent 31%), #f7f7fa;
    @media (max-width: 575px) { padding: 72px 18px 24px; align-items: flex-start; overflow-y: auto; }
  `,
  backButton: css`
    position: absolute !important;
    z-index: 2;
    top: 24px;
    left: 28px;
    width: 38px !important;
    height: 38px !important;
    padding: 0 !important;
    border: 1px solid #e0e1e8 !important;
    background: #fff !important;
    color: #403951 !important;
    font-size: 16px !important;
    &:hover {
      background: #f5f1fd !important;
      color: #5920b8 !important;
    }
  `,
  localeControl: css`
    position: absolute;
    z-index: 2;
    top: 24px;
    right: 28px;
  `,
  localeSelect: css`
    width: 92px !important;
    .ant-select-selector {
      height: 38px !important;
      padding-inline: 8px !important;
      border: 1px solid #e0e1e8 !important;
      border-radius: 9px !important;
      background: #fff !important;
      box-shadow: none !important;
    }
    .ant-select-selection-item {
      line-height: 36px !important;
      color: #302a40 !important;
      font-size: 13px;
      font-weight: 700 !important;
    }
    .ant-select-prefix {
      color: #424b80;
      font-size: 15px;
    }
    .ant-select-arrow {
      color: #303866 !important;
    }
  `,
  content: css`
    width: min(510px, 100%);
    padding: clamp(28px, 3.3vw, 44px);
    border: 1px solid #e7e7ed;
    border-radius: 18px;
    background: rgba(255,255,255,.96);
    box-shadow: 0 24px 70px rgba(29, 23, 52, .09), 0 2px 8px rgba(29, 23, 52, .04);
    text-align: center;
    @media (max-width: 575px) { padding: 26px 20px; border-radius: 15px; }
  `,
  verificationIcon: css`
    display: flex;
    width: 58px;
    height: 58px;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    border: 1px solid #e7dcfb;
    border-radius: 15px;
    background: #f5f0ff;
    color: #632dc1;
    font-size: 27px;
  `,
  title: css`
    margin: 0 0 10px !important;
    color: #181429 !important;
    font-size: clamp(25px, 2.2vw, 32px) !important;
    line-height: 1.2 !important;
    font-weight: 800 !important;
  `,
  subtitle: css`
    display: block;
    color: #716b7e !important;
    font-size: 14px;
    line-height: 1.6;
  `,
  destination: css`
    display: block;
    margin-top: 2px;
    color: #5923b7;
    font-weight: 700;
  `,
  error: css`
    width: 100%;
    margin: 16px auto -6px;
    padding: 10px 14px;
    border: 1px solid #fecaca;
    border-radius: 9px;
    background: #fff1f2;
    color: #c32e3f;
    font-size: 13px;
  `,
  otp: css`
    display: flex !important;
    width: 100%;
    justify-content: center;
    gap: clamp(6px, 1vw, 12px) !important;
    margin: 28px auto 18px;
    input,
    .ant-input {
      width: clamp(40px, 4.1vw, 54px) !important;
      height: clamp(48px, 4.3vw, 58px) !important;
      border: 1px solid #dce0ec !important;
      border-radius: 11px !important;
      color: #181429 !important;
      font-size: 22px !important;
      font-weight: 700 !important;
      box-shadow: none !important;
    }
    input:hover,
    input:focus,
    .ant-input:hover,
    .ant-input:focus {
      border-color: #6325dc !important;
      box-shadow: 0 0 0 1px #6325dc !important;
    }
  `,
  resendRow: css`
    min-height: 22px;
    color: #716b7e !important;
    font-size: 12px;
  `,
  countdown: css`
    color: #5420bb;
    font-weight: 700;
  `,
  resendButton: css`
    height: auto !important;
    padding: 0 4px !important;
    color: #5420bb !important;
    font-size: inherit !important;
    font-weight: 700 !important;
  `,
  submitButton: css`
    width: 100%;
    height: 48px !important;
    margin-top: 24px;
    border: 0 !important;
    border-radius: 9px !important;
    background: linear-gradient(100deg, #4920ba, #6421c2) !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    box-shadow: none !important;
  `,
  divider: css`
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 22px 0 7px;
    color: #535d83;
    font-size: 12px;
    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #dce0ea;
    }
  `,
  altMethod: css`
    height: auto !important;
    color: #5721bd !important;
    font-size: 12px !important;
    font-weight: 600 !important;
  `,
  compact: css`
    @media (max-height: 680px) and (min-width: 992px) { transform: scale(.9); }
  `,
}));

export default function VerifyPage() {
  const { styles, cx } = useStyles();
  const router = useRouter();
  const { locale, localeNames, setLocale, t } = useI18n();
  const { verifyTwoFactor, resendTwoFactorCode } = useAuth();
  const submittingRef = useRef(false);

  const [code, setCode] = useState("");
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    const storedChallenge = localStorage.getItem(PENDING_MFA_KEY);
    if (!storedChallenge) {
      router.replace("/login");
      return;
    }

    try {
      const challenge = JSON.parse(storedChallenge) as PendingMfaDisplay;
      setDestination(challenge.maskedDestination ?? "");
      setCountdown(Math.max(0, challenge.resendAfterSeconds ?? 45));
    } catch {
      localStorage.removeItem(PENDING_MFA_KEY);
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = useCallback(async (value: string) => {
    if (value.length !== 6 || submittingRef.current) return;

    submittingRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      await verifyTwoFactor(value);
      router.replace("/success");
    } catch {
      setError(t("verify.error"));
      setCode("");
      submittingRef.current = false;
      setIsLoading(false);
    }
  }, [router, t, verifyTwoFactor]);

  const handleChange = useCallback((value: string) => {
    setCode(value);
    setError(null);
    if (value.length === 6) void handleSubmit(value);
  }, [handleSubmit]);

  const handleResend = useCallback(async () => {
    if (countdown > 0 || isLoading) return;

    setError(null);
    try {
      const challenge = await resendTwoFactorCode();
      setDestination(challenge.maskedDestination ?? "");
      setCountdown(Math.max(1, challenge.resendAfterSeconds ?? 45));
      setCode("");
    } catch {
      setError(t("verify.resendError"));
    }
  }, [countdown, isLoading, resendTwoFactorCode, t]);

  return (
    <main className={styles.page}>
      <aside className={styles.brandPanel}>
        <Flex className={styles.brandHeader} align="center" gap={12}>
          <Image className={styles.brandLogo} src="/images/logo.webp" width={64} height={44} alt={t("app.logoAlt")} />
          <Text className={styles.brandName}>{t("login.brand")}</Text>
        </Flex>
        <div className={styles.brandBody}>
          <Text className={styles.eyebrow}>{t("login.administration")}</Text>
          <Title level={2} className={styles.brandTitle}>{t("verify.enterpriseTitle")}</Title>
          <Text className={styles.brandDescription}>{t("verify.enterpriseDescription")}</Text>
        </div>
        <div className={styles.trustList}>
          <div className={styles.trustItem}><span className={styles.trustIcon}><Icon type="LockOutlined" /></span>{t("verify.encrypted")}</div>
          <div className={styles.trustItem}><span className={styles.trustIcon}><Icon type="SafetyCertificateOutlined" /></span>{t("verify.protected")}</div>
        </div>
      </aside>

      <section className={styles.mainPanel}>
        <Button
          type="text"
          className={styles.backButton}
          aria-label={t("verify.backToLogin")}
          icon={<Icon type="ArrowLeftOutlined" />}
          onClick={() => router.push("/login")}
        />

        <div className={styles.localeControl}>
          <Select
            className={styles.localeSelect}
            aria-label={t("nav.changeLanguage")}
            prefix={<Icon type="GlobalOutlined" />}
            value={locale}
            onChange={(value) => setLocale(value as Locale)}
            options={Object.entries(localeNames).map(([value, label]) => ({
              value,
              label: value.toUpperCase(),
              title: label,
            }))}
          />
        </div>

        <div className={cx(styles.content, styles.compact)}>
          <div className={styles.verificationIcon}>
            <Icon type="TeamOutlined" />
          </div>
          <Title level={1} className={styles.title}>{t("verify.title")}</Title>
          <Text className={styles.subtitle}>
            {t("verify.subtitle")}
            <strong className={styles.destination}>{destination || t("verify.destinationFallback")}</strong>
          </Text>

          {error && <div className={styles.error} role="alert">{error}</div>}

          <Input.OTP
            className={styles.otp}
            length={6}
            value={code}
            onChange={handleChange}
            disabled={isLoading}
            aria-label={t("verify.codeLabel")}
            autoFocus
          />

          <Text className={styles.resendRow}>
            {countdown > 0 ? (
              <>{t("verify.resendIn")} <span className={styles.countdown}>00:{countdown.toString().padStart(2, "0")}</span></>
            ) : (
              <Button type="link" className={styles.resendButton} onClick={() => void handleResend()}>
                {t("verify.resend")}
              </Button>
            )}
          </Text>

          <Button
            type="primary"
            className={styles.submitButton}
            loading={isLoading}
            disabled={code.length !== 6}
            icon={<Icon type="SafetyCertificateOutlined" />}
            onClick={() => void handleSubmit(code)}
          >
            {t("verify.submit")}
          </Button>

          <div className={styles.divider}>{t("common.or")}</div>
          <Button type="link" className={styles.altMethod} onClick={() => router.push("/login")}>
            {t("verify.altMethod")}
          </Button>
        </div>
      </section>
    </main>
  );
}
