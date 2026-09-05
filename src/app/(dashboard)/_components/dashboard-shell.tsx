"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  createStyles,
  Drawer,
  Dropdown,
  Flex,
  Icon,
  Input,
  Layout,
  SessionTimeoutModal,
  Skeleton,
  Typography,
  type IconName,
} from "@/components";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/auth-context";
import { useI18n, type TranslationKey } from "@/i18n";
import { designSystem } from "@/theme/antd-theme";

type NavItem = { href: string; icon: IconName; labelKey: TranslationKey };

const PLATFORM_NAV: NavItem[] = [
  {
    href: "/admin",
    icon: "AppstoreOutlined",
    labelKey: "dashboard.nav.overview",
  },
  {
    href: "/admin/tenants",
    icon: "ShopOutlined",
    labelKey: "dashboard.nav.tenants",
  },
  {
    href: "/admin/users",
    icon: "TeamOutlined",
    labelKey: "dashboard.nav.users",
  },
  {
    href: "/admin/packages",
    icon: "GiftOutlined",
    labelKey: "dashboard.nav.packages",
  },
  {
    href: "/admin/subscriptions",
    icon: "CreditCardOutlined",
    labelKey: "dashboard.nav.subscriptions",
  },
  {
    href: "/admin/billing",
    icon: "WalletOutlined",
    labelKey: "dashboard.nav.billing",
  },
  {
    href: "/admin/usage-quota",
    icon: "BarChartOutlined",
    labelKey: "dashboard.nav.usageQuota",
  },
  {
    href: "/admin/system-logs",
    icon: "FileTextOutlined",
    labelKey: "dashboard.nav.systemLogs",
  },
  {
    href: "/admin/audit-logs",
    icon: "FileSearchOutlined",
    labelKey: "dashboard.nav.auditLogs",
  },
  {
    href: "/admin/system-health",
    icon: "HeartOutlined",
    labelKey: "dashboard.nav.systemHealth",
  },
  {
    href: "/admin/settings",
    icon: "SettingOutlined",
    labelKey: "dashboard.nav.settings",
  },
];

const TENANT_NAV: NavItem[] = [
  {
    href: "/dashboard",
    icon: "AppstoreOutlined",
    labelKey: "dashboard.nav.overview",
  },
  {
    href: "/appointments",
    icon: "CalendarOutlined",
    labelKey: "dashboard.nav.booking",
  },
  {
    href: "/transactions",
    icon: "ShoppingCartOutlined",
    labelKey: "dashboard.nav.pos",
  },
  {
    href: "/customers",
    icon: "ContactsOutlined",
    labelKey: "dashboard.nav.crm",
  },
  {
    href: "/teams",
    icon: "TeamOutlined",
    labelKey: "dashboard.nav.staffCommission",
  },
  {
    href: "/inventory",
    icon: "InboxOutlined",
    labelKey: "dashboard.nav.inventory",
  },
  {
    href: "/sales",
    icon: "AccountBookOutlined",
    labelKey: "dashboard.nav.sales",
  },
  {
    href: "/store",
    icon: "ShoppingOutlined",
    labelKey: "dashboard.nav.onlineStore",
  },
  {
    href: "/marketing",
    icon: "MessageOutlined",
    labelKey: "dashboard.nav.marketing",
  },
  {
    href: "/reports",
    icon: "BarChartOutlined",
    labelKey: "dashboard.nav.analytics",
  },
  {
    href: "/outlets",
    icon: "ShopOutlined",
    labelKey: "dashboard.nav.outlets",
  },
  {
    href: "/setting",
    icon: "SettingOutlined",
    labelKey: "dashboard.nav.settings",
  },
];

const useStyles = createStyles(({ css }) => ({
  viewport: css`
    width: 100vw;
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
    background: #f6f7fb;
  `,
  sider: css`
    height: 100dvh !important;
    overflow: hidden !important;
    background:
      radial-gradient(circle at 24% 15%, rgba(22, 119, 255, 0.28), transparent 31%),
      linear-gradient(145deg, ${designSystem.palette.primaryDark} 0%, ${designSystem.palette.primary} 48%, ${designSystem.palette.primaryDark} 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0 14px 16px;
    @media (max-width: 991px) {
      display: none !important;
    }
  `,
  siderInner: css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  brand: css`
    height: 80px;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 10px;
    color: #fff;
  `,
  logo: css`
    width: 34px;
    height: 34px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  `,
  brandName: css`
    color: #fff !important;
    display: block;
    font-size: 14px;
    font-weight: 750;
    letter-spacing: 0.03em;
    line-height: 1.2;
  `,
  brandScope: css`
    margin-top: 3px;
    color: #c3bbdb !important;
    font-size: 10px;
    font-weight: 500;
  `,
  divider: css`
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  `,
  nav: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 2px;
    padding-top: 12px;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  `,
  navItem: css`
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
    border-radius: 9px;
    color: #d2cce3;
    font-size: 12px;
    font-weight: 600;
    padding: 0 12px;
    transition: 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
    }
  `,
  navItemActive: css`
    background: linear-gradient(100deg, ${designSystem.palette.primary} 0%, ${designSystem.palette.primaryDark} 100%) !important;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 8px 20px rgba(16,8,55,.22);
    color: #fff !important;
  `,
  support: css`
    border-radius: 10px;
    background: #fff;
    color: #4f4861;
    padding: 12px 11px;
    font-size: 10px;
    line-height: 1.5;
  `,
  supportTitle: css`color: #21163c; font-size: 11px; font-weight: 750;`,
  tenantFooter: css`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 62px;
    padding: 10px 8px 2px;
    border-top: 1px solid rgba(255,255,255,.09);
  `,
  tenantFooterName: css`display: block; color: #fff !important; font-size: 11px; font-weight: 700;`,
  tenantFooterRole: css`display: block; margin-top: 2px; color: #bcb4d2 !important; font-size: 9px;`,
  tenantFooterArrow: css`margin-left: auto; color: #bcb4d2;`,
  shellMain: css`
    height: 100dvh;
    min-width: 0;
    margin-left: 232px;
    overflow: hidden;
    background: #f6f7fb;
    @media (max-width: 991px) {
      margin-left: 0;
    }
  `,
  search: css`
    width: min(390px, 34vw);
    height: 38px;
    border-color: #dedfe7 !important;
    border-radius: 8px !important;
    @media (max-width: 767px) {
      display: none;
    }
  `,
  header: css`
    height: 70px !important;
    min-height: 70px;
    background: rgba(255, 255, 255, 0.94) !important;
    border-bottom: 1px solid #ececf2;
    padding: 0 28px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: normal !important;
    @media (max-width: 767px) {
      height: 64px !important;
      min-height: 64px;
      padding: 0 16px !important;
    }
  `,
  menuButton: css`
    display: none !important;
    @media (max-width: 991px) {
      display: inline-flex !important;
    }
  `,
  headerTitle: css`
    color: #17132d !important;
    font-size: 17px !important;
    font-weight: 800 !important;
    margin: 0 !important;
  `,
  headerSubtitle: css`
    color: #8a8797 !important;
    font-size: 11px;
    @media (max-width: 575px) {
      display: none;
    }
  `,
  notification: css`
    width: 36px !important;
    height: 36px !important;
    border: 0 !important;
    color: #413568 !important;
    position: relative;
  `,
  notificationBadge: css`
    position: absolute;
    right: 1px;
    top: 0;
    min-width: 16px;
    height: 16px;
    display: grid;
    place-items: center;
    padding: 0 4px;
    border: 2px solid #fff;
    border-radius: 999px;
    background: #ef3657;
    color: #fff;
    font-size: 8px;
    font-weight: 800;
  `,
  headerDivider: css`width: 1px; height: 30px; background: #ececf2;`,
  profileButton: css`
    height: 46px !important;
    padding: 0 4px 0 0 !important;
    color: inherit !important;
    &:hover { background: #f7f5fb !important; }
  `,
  profileText: css`
    display: flex;
    flex-direction: column;
    max-width: 150px;
    @media (max-width: 575px) {
      display: none;
    }
  `,
  profileName: css`
    color: #272238 !important;
    font-size: 12px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  profileRole: css`
    color: #918ca1 !important;
    font-size: 10px;
    text-transform: none;
  `,
  commandHint: css`color: #9791a4; font-size: 10px; font-weight: 600;`,
  content: css`
    height: calc(100dvh - 70px);
    min-height: 0;
    overflow: auto;
    padding: 22px 26px 26px;
    background: #f6f7fb;
    @media (max-width: 767px) {
      height: calc(100dvh - 64px);
      padding: 16px;
    }
  `,
  loader: css`
    width: 100vw;
    height: 100dvh;
    display: grid;
    place-items: center;
    background: #f6f7fb;
  `,
  loaderCard: css`
    width: min(360px, calc(100vw - 40px));
    padding: 24px;
    border-radius: 16px;
    background: #fff;
  `,
  drawerBody: css`
    .ant-drawer-body {
      padding: 0 14px 18px;
      background: ${designSystem.palette.primaryDark};
    }
    .ant-drawer-header {
      display: none;
    }
  `,
}));

export function DashboardShell({ children }: { children: ReactNode }) {
  const { styles, cx } = useStyles();
  const { user, isLoading, getHomePath, logout } = useAuth();
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isPlatform = pathname.startsWith("/admin");
  const expectedScope = isPlatform ? "platform" : "organization";
  const navItems = isPlatform ? PLATFORM_NAV : TENANT_NAV;

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.scope !== expectedScope) router.replace(getHomePath());
  }, [expectedScope, getHomePath, isLoading, router, user]);

  if (isLoading || !user || user.scope !== expectedScope) {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderCard}>
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      </div>
    );
  }

  const sidebar = (
    <div className={styles.siderInner}>
      <div className={styles.brand}>
        <Image
          className={styles.logo}
          src="/images/logo.webp"
          width={36}
          height={36}
          alt={t("app.logoAlt")}
        />
        <div>
          <Typography className={styles.brandName}>
            {t(
              isPlatform
                ? "dashboard.platform.brand"
                : "dashboard.tenant.brand",
            )}
          </Typography>
          <Typography className={styles.brandScope}>
            {t(
              isPlatform
                ? "dashboard.platformConsole"
                : "dashboard.tenantWorkspace",
            )}
          </Typography>
        </div>
      </div>
      <nav
        className={styles.nav}
        aria-label={t("dashboard.nav.mainNavigation")}
      >
        {navItems.map((item) => {
          const active =
            item.href === pathname ||
            (item.href !== "/admin" &&
              item.href !== "/dashboard" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cx(styles.navItem, active && styles.navItemActive)}
            >
              <Icon type={item.icon} size={17} />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>
      {isPlatform ? (
        <div className={styles.support}>
          <Flex gap={9} align="center">
            <Icon type="SafetyCertificateOutlined" size={20} color="#6430d7" />
            <span className={styles.supportTitle}>{t("dashboard.support.title")}</span>
          </Flex>
          <div>{t("dashboard.support.description")}</div>
        </div>
      ) : (
        <div className={styles.tenantFooter}>
          <Avatar size={34} src="/images/avatar.png" icon={<Icon type="UserOutlined" />} />
          <div>
            <Typography className={styles.tenantFooterName}>{user.name}</Typography>
            <Typography className={styles.tenantFooterRole}>{user.role}</Typography>
          </div>
          <Icon className={styles.tenantFooterArrow} type="RightOutlined" size={11} />
        </div>
      )}
    </div>
  );

  return (
    <Layout className={styles.viewport}>
      <Layout.Sider width={232} className={styles.sider}>
        {sidebar}
      </Layout.Sider>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width={250}
        closable={false}
        className={styles.drawerBody}
      >
        {sidebar}
      </Drawer>
      <Layout className={styles.shellMain}>
        <Layout.Header className={styles.header}>
          <Flex align="center" gap={12}>
            <Button
              className={styles.menuButton}
              type="text"
              icon={<Icon type="MenuOutlined" size={20} />}
              onClick={() => setMobileOpen(true)}
              aria-label={t("dashboard.nav.openMenu")}
            />
            {isPlatform && (
              <Typography.Title level={4} className={styles.headerTitle}>
                {t("dashboard.platform.title")}
              </Typography.Title>
            )}
          </Flex>
          <Input
            className={styles.search}
            prefix={<Icon type="SearchOutlined" />}
            suffix={isPlatform ? <span className={styles.commandHint}>⌘ K</span> : undefined}
            placeholder={t(
              isPlatform
                ? "dashboard.platform.searchPlaceholder"
                : "dashboard.tenant.searchPlaceholder",
            )}
          />
          <Flex align="center" gap={6}>
            <ThemeToggle />
            {!isPlatform && (
              <>
                <Button
                  className={styles.notification}
                  type="text"
                  shape="circle"
                  icon={<Icon type="ClockCircleOutlined" size={17} />}
                  aria-label={t("dashboard.recentUpdates")}
                />
                <Button
                  className={styles.notification}
                  type="text"
                  shape="circle"
                  icon={<Icon type="MailOutlined" size={17} />}
                  aria-label={t("dashboard.messages")}
                >
                  <span className={styles.notificationBadge}>3</span>
                </Button>
              </>
            )}
            <Button
              className={styles.notification}
              type="text"
              shape="circle"
              icon={<Icon type="BellOutlined" size={17} />}
              aria-label={t("dashboard.notifications")}
            >
              <span className={styles.notificationBadge}>{isPlatform ? 8 : 1}</span>
            </Button>
            <span className={styles.headerDivider} />
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <Icon type="LogoutOutlined" />,
                    label: t("dashboard.signOut"),
                    onClick: () => logout(),
                  },
                ],
              }}
            >
              <Button type="text" className={styles.profileButton}>
                <Flex align="center" gap={10}>
                  <Avatar size={36} src="/images/avatar.png" icon={<Icon type="UserOutlined" />} />
                  <div className={styles.profileText}>
                    <Typography className={styles.profileName}>
                      {isPlatform ? user.name : t("dashboard.tenantWorkspace")}
                    </Typography>
                    <Typography className={styles.profileRole}>
                      {isPlatform ? t("dashboard.platformConsole") : t("dashboard.tenantLocation")}
                    </Typography>
                  </div>
                  <Icon type="DownOutlined" size={10} />
                </Flex>
              </Button>
            </Dropdown>
          </Flex>
        </Layout.Header>
        <Layout.Content className={styles.content}>{children}</Layout.Content>
        <SessionTimeoutModal />
      </Layout>
    </Layout>
  );
}
