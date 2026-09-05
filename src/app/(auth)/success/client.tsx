"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  createStyles,
  Flex,
  Icon,
  Progress,
  Typography,
} from "@/components";
import { useAuth } from "@/context/auth-context";
import { useI18n } from "@/i18n";

const { Text, Title } = Typography;
const REDIRECT_DELAY_MS = 1500;

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
      radial-gradient(circle at 12% 8%, rgba(157,108,255,.35), transparent 30%),
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
  statusRail: css`position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; color: #d8d3e4; font-size: 12px;`,
  statusDot: css`width: 9px; height: 9px; border-radius: 50%; background: #4ade9b; box-shadow: 0 0 0 6px rgba(74,222,155,.12);`,
  mainPanel: css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    padding: 34px;
    background: radial-gradient(circle at 50% 22%, rgba(31, 181, 121, .07), transparent 28%), #f7f7fa;
    @media (max-width: 575px) { padding: 18px; }
  `,
  loading: css`grid-column: 1 / -1; display: grid; place-items: center; background: #f7f7fa;`,
  content: css`
    width: min(520px, 100%);
    padding: clamp(30px, 3.6vw, 48px);
    border: 1px solid #e5e7e9;
    border-radius: 18px;
    background: rgba(255,255,255,.96);
    box-shadow: 0 24px 70px rgba(29,23,52,.09), 0 2px 8px rgba(29,23,52,.04);
    text-align: center;
    animation: enter 420ms ease-out both;
    @keyframes enter {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @media (max-height: 680px) and (min-width: 992px) { transform: scale(.9); }
  `,
  celebration: css`
    position: relative;
    width: 82px;
    height: 82px;
    margin: 0 auto 24px;
  `,
  successIcon: css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c9eddf;
    border-radius: 22px;
    background: linear-gradient(145deg, #e6f8f1, #d7f2e8);
    color: #16a56d;
    font-size: 40px;
    animation: pop 500ms 80ms cubic-bezier(0.2, 0.9, 0.3, 1.25) both;
    @keyframes pop {
      from { opacity: 0; transform: scale(0.55); }
      to { opacity: 1; transform: scale(1); }
    }
  `,
  spark: css`
    position: absolute;
    font-size: 11px;
    &:nth-child(2) { left: -22px; top: 48%; color: #20bd80; }
    &:nth-child(3) { right: -27px; top: 3px; color: #527ded; }
    &:nth-child(4) { right: -38px; top: 54%; color: #f2aa2b; font-size: 8px; }
    &:nth-child(5) { left: -18px; bottom: -6px; color: #8d48e7; }
    &:nth-child(6) { right: -23px; bottom: 3px; color: #914ae8; font-size: 8px; }
  `,
  title: css`
    margin: 0 0 9px !important;
    color: #181429 !important;
    font-size: clamp(28px, 2.4vw, 36px) !important;
    line-height: 1.2 !important;
    font-weight: 800 !important;
  `,
  welcome: css`
    display: block;
    color: #716b7e !important;
    font-size: 15px;
  `,
  redirect: css`
    display: block;
    margin-top: 28px;
    color: #5f596b !important;
    font-size: 12px;
  `,
  progress: css`
    width: 100%;
    margin-top: 12px;
    .ant-progress-inner {
      height: 5px !important;
    }
    .ant-progress-bg {
      height: 5px !important;
      animation: fill ${REDIRECT_DELAY_MS}ms linear both;
    }
    @keyframes fill {
      from { width: 0 !important; }
      to { width: 100% !important; }
    }
  `,
  securityCard: css`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 28px;
    padding: 16px 18px;
    border: 1px solid #e4dafa;
    border-radius: 12px;
    background: #faf8ff;
    text-align: left;
  `,
  securityIcon: css`
    flex: 0 0 auto;
    color: #5420c7;
    font-size: 27px;
  `,
  securityTitle: css`
    display: block;
    color: #080e3c !important;
    font-size: 13px;
    font-weight: 800;
  `,
  securityDescription: css`
    display: block;
    margin-top: 6px;
    color: #4f5983 !important;
    font-size: 11px;
    line-height: 1.45;
  `,
}));

export default function SuccessPage() {
  const { styles } = useStyles();
  const router = useRouter();
  const { t } = useI18n();
  const { user, isLoading, getHomePath } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    const timer = window.setTimeout(() => {
      router.replace(getHomePath());
    }, REDIRECT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [getHomePath, isLoading, router, user]);

  if (isLoading || !user) {
    return (
      <main className={styles.page}>
        <section className={styles.loading}>
          {isLoading && <Text>{t("status.loading")}</Text>}
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <aside className={styles.brandPanel}>
        <Flex className={styles.brandHeader} align="center" gap={12}>
          <Image className={styles.brandLogo} src="/images/logo.webp" width={64} height={44} alt={t("app.logoAlt")} />
          <Text className={styles.brandName}>{t("login.brand")}</Text>
        </Flex>
        <div className={styles.brandBody}>
          <Text className={styles.eyebrow}>{t("success.eyebrow")}</Text>
          <Title level={2} className={styles.brandTitle}>{t("success.enterpriseTitle")}</Title>
          <Text className={styles.brandDescription}>{t("success.enterpriseDescription")}</Text>
        </div>
        <div className={styles.statusRail}><span className={styles.statusDot} />{t("success.systemStatus")}</div>
      </aside>
      <section className={styles.mainPanel}>
        <div className={styles.content}>
          <div className={styles.celebration} aria-hidden="true">
            <div className={styles.successIcon}><Icon type="CheckOutlined" /></div>
            <Icon className={styles.spark} type="PlusOutlined" />
            <Icon className={styles.spark} type="SmallDashOutlined" />
            <Icon className={styles.spark} type="PlusCircleFilled" />
            <Icon className={styles.spark} type="StarFilled" />
            <Icon className={styles.spark} type="PlusCircleFilled" />
          </div>

          <Title level={1} className={styles.title}>{t("success.title")}</Title>
          <Text className={styles.welcome}>{t("success.welcome")} {user.name}</Text>
          <Text className={styles.redirect}>{t("success.redirecting")}</Text>
          <Progress
            className={styles.progress}
            percent={100}
            showInfo={false}
            strokeColor="#5220c6"
            aria-label={t("success.redirectProgress")}
          />

          <div className={styles.securityCard}>
            <Icon className={styles.securityIcon} type="SafetyCertificateOutlined" />
            <div>
              <Text className={styles.securityTitle}>{t("success.securityTitle")}</Text>
              <Text className={styles.securityDescription}>{t("success.securityDescription")}</Text>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
