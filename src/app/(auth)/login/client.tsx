"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Checkbox,
  createStyles,
  Flex,
  Icon,
  Input,
  Select,
  Typography,
} from "@/components";
import { useI18n, type Locale, type TranslationKey } from "@/i18n";
import { useAuth } from "@/context/auth-context";
import { designSystem } from "@/theme/antd-theme";

const { Text, Title } = Typography;

const mswEnabled = process.env.NEXT_PUBLIC_ENABLE_MSW === "true";
const mockLoginShortcuts: Array<{ labelKey: TranslationKey; email: string; password: string }> = [
  { labelKey: "login.mock.platform", email: "admin@ovaryacorp.com", password: "admin123" },
  { labelKey: "login.mock.owner", email: "owner@ovaryasalon.local", password: "owner123" },
  { labelKey: "login.mock.manager", email: "manager@ovaryasalon.local", password: "manager123" },
];

const useStyles = createStyles(({ css }) => ({
  page: css`
    position: fixed;
    inset: 0;
    display: flex;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background: #fff;
  `,
  brandPanel: css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 54.5%;
    height: 100%;
    padding: clamp(30px, 5vh, 54px) 60px;
    overflow: hidden;
    background:
      radial-gradient(circle at 24% 15%, rgba(155, 105, 255, 0.38), transparent 31%),
      linear-gradient(145deg, #6228b7 0%, #391680 48%, #25105f 100%);
    color: #fff;
    &::before,
    &::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.035);
      pointer-events: none;
    }
    &::before {
      width: 610px;
      height: 610px;
      right: -255px;
      top: 185px;
    }
    &::after {
      width: 420px;
      height: 420px;
      right: -130px;
      top: 285px;
    }
    @media (max-width: ${designSystem.breakpoints.lg - 1}px) {
      display: none;
    }
  `,
  brandContent: css`
    position: relative;
    z-index: 2;
    width: min(420px, 100%);
  `,
  brandMark: css`
    display: block;
    width: 92px;
    height: 62px;
    margin-bottom: clamp(16px, 2.6vh, 28px);
    object-fit: contain;
    object-position: left center;
    filter: brightness(0) invert(1);
  `,
  brandName: css`
    display: block;
    color: #fff !important;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 800;
  `,
  brandSubtitle: css`
    display: block;
    margin-top: clamp(8px, 1.3vh, 14px);
    color: #fff !important;
    font-size: 20px;
    line-height: 1.3;
    font-weight: 700;
  `,
  brandDesc: css`
    display: block;
    max-width: 380px;
    margin-top: clamp(10px, 1.6vh, 17px);
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 16px;
    line-height: 1.65;
  `,
  deviceMockup: css`
    position: relative;
    z-index: 1;
    top: 2%;
    left: 30%;
    object-fit: contain;
    object-position: bottom right;
    height: auto;
    filter: drop-shadow(0 24px 34px rgba(13, 6, 43, 0.32));
  `,
  securityBadge: css`
    position: absolute;
    z-index: 3;
    left: 36px;
    bottom: clamp(62px, 9.5vh, 105px);
    display: flex;
    align-items: center;
    gap: 12px;
    width: 190px;
    padding: 16px 17px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 12px 30px rgba(24, 11, 67, 0.18);
  `,
  securityIcon: css`
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${designSystem.palette.primary};
    font-size: 24px;
  `,
  securityTitle: css`
    display: block;
    color: #171a3b !important;
    font-size: 11px;
    font-weight: 700;
  `,
  securityText: css`
    display: block;
    margin-top: 3px;
    color: #65708d !important;
    font-size: 9px;
    line-height: 1.45;
  `,
  formPanel: css`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 0;
    overflow: hidden;
    padding: clamp(62px, 8vh, 88px) 64px clamp(18px, 3vh, 34px);
    background:
      radial-gradient(circle at 48% 17%, rgba(128, 75, 220, 0.035), transparent 30%),
      #fff;
    @media (max-width: ${designSystem.breakpoints.md - 1}px) {
      padding: 64px 24px 18px;
    }
    @media (max-height: 650px) {
      padding-top: 46px;
      padding-bottom: 10px;
    }
  `,
  localeControl: css`
    position: absolute;
    top: clamp(18px, 3vh, 34px);
    right: 36px;
    color: #11183f;
  `,
  localeSelect: css`
    min-width: 85px !important;
    .ant-select-selector {
      height: 34px !important;
      padding-inline: 5px !important;
      border: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
    }
    .ant-select-selection-item {
      line-height: 32px !important;
      color: #11183f !important;
      font-size: 14px;
      font-weight: 700 !important;
    }
  `,
  formContainer: css`
    width: 100%;
    max-width: 550px;
  `,
  formHeader: css`
    text-align: center;
    margin-bottom: clamp(18px, 3.5vh, 38px);
    @media (max-height: 650px) {
      margin-bottom: 12px;
    }
  `,
  avatarIcon: css`
    width: clamp(64px, 9vh, 102px);
    height: clamp(64px, 9vh, 102px);
    margin: 0 auto clamp(10px, 1.8vh, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #f7f1ff, #eee6fb);
    border-radius: 50%;
    font-size: clamp(32px, 4.2vh, 48px);
    color: #6126b9;
    @media (max-height: 650px) {
      width: 52px;
      height: 52px;
      margin-bottom: 7px;
      font-size: 28px;
    }
  `,
  formTitle: css`
    margin: 0 0 clamp(6px, 1.3vh, 14px) !important;
    color: #11183f !important;
    font-size: clamp(27px, 3.4vh, 36px) !important;
    line-height: 1.2 !important;
    font-weight: 800 !important;
    @media (max-height: 650px) {
      margin-bottom: 4px !important;
      font-size: 24px !important;
    }
  `,
  formSubtitle: css`
    color: #5f6989 !important;
    font-size: clamp(14px, 1.8vh, 19px);
    @media (max-height: 650px) {
      font-size: 13px;
    }
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: clamp(12px, 2.2vh, 24px);
    @media (max-height: 650px) {
      gap: 8px;
    }
  `,
  field: css`
    display: flex;
    flex-direction: column;
    gap: clamp(6px, 0.9vh, 10px);
  `,
  label: css`
    color: #11183f;
    font-size: 16px;
    font-weight: 600;
    @media (max-height: 650px) {
      font-size: 13px;
    }
  `,
  input: css`
    height: clamp(46px, 5.8vh, 64px) !important;
    padding-inline: 18px !important;
    border-color: #d9ddea !important;
    border-radius: 10px !important;
    font-size: 17px !important;
    box-shadow: none !important;
    .ant-input-prefix {
      margin-right: 14px;
      color: #7d86a4;
      font-size: 21px;
    }
    .ant-input {
      color: #11183f;
      font-size: 17px;
    }
    .ant-input::placeholder {
      color: #8790ad;
    }
    .ant-input-password-icon {
      color: #697394;
      font-size: 20px;
    }
    &:hover,
    &:focus,
    &.ant-input-affix-wrapper-focused {
      border-color: ${designSystem.palette.primary} !important;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08) !important;
    }
    @media (max-height: 650px) {
      height: 40px !important;
      font-size: 14px !important;
      .ant-input {
        font-size: 14px;
      }
    }
  `,
  formRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    .ant-checkbox-wrapper {
      color: #171c43;
      font-size: 15px;
      font-weight: 500;
    }
    .ant-checkbox-inner {
      width: 19px;
      height: 19px;
    }
    @media (max-height: 650px) {
      .ant-checkbox-wrapper {
        font-size: 13px;
      }
    }
  `,
  forgotLink: css`
    color: #6727c0;
    font-size: 15px;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
    @media (max-height: 650px) {
      font-size: 13px;
    }
  `,
  submitButton: css`
    width: 100%;
    height: clamp(46px, 5.5vh, 60px);
    margin-top: clamp(2px, 0.8vh, 8px);
    border: 0;
    border-radius: 9px !important;
    background: linear-gradient(90deg, #5920ac, #6d2cc2) !important;
    font-size: 19px;
    font-weight: 700;
    box-shadow: none;
    @media (max-height: 650px) {
      height: 42px;
      margin-top: 0;
      font-size: 15px;
    }
  `,
  divider: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: clamp(18px, 3.2vh, 36px) 0;
    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: ${designSystem.palette.border};
    }
    span {
      padding-inline: 12px;
      color: #4d5777;
      font-size: 16px;
    }
    @media (max-height: 650px) {
      margin: 10px 0;
      span {
        font-size: 13px;
      }
    }
  `,
  googleButton: css`
    width: 100%;
    height: clamp(46px, 5.7vh, 62px);
    border-color: #d9ddea;
    border-radius: 9px !important;
    color: #11183f;
    font-size: 18px;
    font-weight: 700;
    &:hover {
      border-color: ${designSystem.palette.primary};
      color: ${designSystem.palette.primary};
    }
    @media (max-height: 650px) {
      height: 42px;
      font-size: 15px;
    }
  `,
  footer: css`
    margin-top: clamp(20px, 4vh, 48px);
    text-align: center;
    color: #66708f;
    font-size: 14px;
    @media (max-height: 650px) {
      margin-top: 12px;
      font-size: 11px;
    }
  `,
  error: css`
    padding: 12px;
    background: ${designSystem.palette.tintError};
    border: 1px solid #fecaca;
    border-radius: ${designSystem.radius.md}px;
    color: ${designSystem.palette.error};
    font-size: 13px;
    text-align: center;
    margin-bottom: 20px;
  `,
  mockPanel: css`
    padding: 10px 12px;
    border: 1px dashed #cfc3e7;
    border-radius: 10px;
    background: #faf8ff;
  `,
  mockLabel: css`
    color: #4f4664 !important;
    font-size: 11px;
    font-weight: 700;
  `,
  mockHint: css`
    color: #8a819c !important;
    font-size: 10px;
  `,
  mockButton: css`
    flex: 1;
    min-width: 110px;
    color: #6025b5 !important;
    font-size: 11px;
    font-weight: 700;
    @media (max-height: 650px) {
      height: 28px;
    }
  `,
}));

export default function LoginPage() {
  const { styles } = useStyles();
  const router = useRouter();
  const { locale, localeNames, setLocale, t } = useI18n();
  const { login, isLoading: authLoading, user, getHomePath } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      router.replace(getHomePath());
    }
  }, [authLoading, getHomePath, router, user]);

  const authenticate = useCallback(
    async (loginEmail: string, loginPassword: string) => {
      setError(null);
      setIsLoading(true);

      try {
        const result = await login(loginEmail, loginPassword);

        if ("mfaRequired" in result) {
          router.push("/verify");
          return;
        }

        router.push("/success");
      } catch (err) {
        setError(err instanceof Error ? err.message : t("status.error"));
      } finally {
        setIsLoading(false);
      }
    },
    [login, router, t],
  );

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      void authenticate(email, password);
    },
    [authenticate, email, password],
  );

  const handleMockLogin = useCallback(
    (shortcut: (typeof mockLoginShortcuts)[number]) => {
      setEmail(shortcut.email);
      setPassword(shortcut.password);
      void authenticate(shortcut.email, shortcut.password);
    },
    [authenticate],
  );

  if (authLoading) {
    return (
      <div className={styles.page}>
        <Flex align="center" justify="center" style={{ flex: 1 }}>
          <Text>{t("status.loading")}</Text>
        </Flex>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Image
            className={styles.brandMark}
            src="/images/logo.webp"
            alt={t("app.logoAlt")}
            width={92}
            height={62}
            priority
          />
          <Text className={styles.brandName}>{t("app.brand")}</Text>
          <Text className={styles.brandSubtitle}>
            {t("app.tagline")}
          </Text>
          <Text className={styles.brandDesc}>
            {t("app.description")}
          </Text>
        </div>
        <Image
          className={styles.deviceMockup}
          src="/images/ilustrations/Device_Mockup_2.png"
          alt={t("login.dashboardPreviewAlt")}
          width={450}
          height={300}
          priority
        />
        <div className={styles.securityBadge}>
          <Flex className={styles.securityIcon} align="center" justify="center">
            <Icon type="SafetyCertificateOutlined" />
          </Flex>
          <span>
            <Text className={styles.securityTitle}>
              {t("login.securityTitle")}
            </Text>
            <Text className={styles.securityText}>
              {t("login.securityDescription")}
            </Text>
          </span>
        </div>
      </div>

      <div className={styles.formPanel}>
        <Flex className={styles.localeControl} align="center" gap={2}>
          {/* <Icon type="GlobalOutlined" size={20} /> */}
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
        </Flex>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <Flex className={styles.avatarIcon} align="center" justify="center">
              <Icon type="UserOutlined" />
            </Flex>
            <Title level={3} className={styles.formTitle}>
              {t("login.title")}
            </Title>
            <Text className={styles.formSubtitle}>
              {t("login.subtitle")}
            </Text>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {mswEnabled && (
              <div className={styles.mockPanel}>
                <Flex justify="space-between" align="center" gap={8} wrap>
                  <Text className={styles.mockLabel}>{t("login.mock.title")}</Text>
                  <Text className={styles.mockHint}>{t("login.mock.otpHint")}</Text>
                </Flex>
                <Flex gap={6} wrap style={{ marginTop: 8 }}>
                  {mockLoginShortcuts.map((shortcut) => (
                    <Button
                      key={shortcut.email}
                      htmlType="button"
                      className={styles.mockButton}
                      disabled={isLoading}
                      onClick={() => handleMockLogin(shortcut)}
                    >
                      {t(shortcut.labelKey)}
                    </Button>
                  ))}
                </Flex>
              </div>
            )}
            <div className={styles.field}>
              <label className={styles.label}>{t("form.email")}</label>
              <Input
                className={styles.input}
                size="large"
                prefix={<Icon type="MailOutlined" />}
                type="email"
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t("form.password")}</label>
              <Input.Password
                className={styles.input}
                size="large"
                prefix={<Icon type="LockOutlined" />}
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formRow}>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                {t("login.rememberMe")}
              </Checkbox>
              <Link href="/forgot-password" className={styles.forgotLink}>
                {t("login.forgotPassword")}
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={isLoading}
              icon={<Icon type="LoginOutlined" />}
            >
              {t("login.submit")}
            </Button>
          </form>

          <div className={styles.divider}>
            <span>{t("login.divider")}</span>
          </div>

          <Button className={styles.googleButton} icon={<Icon type="GoogleOutlined" />}>
            {t("login.googleLogin")}
          </Button>

          <div className={styles.footer}>
            {t("login.copyright")}
          </div>
        </div>
      </div>
    </div>
  );
}
