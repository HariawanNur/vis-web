"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Button,
  Col,
  createStyles,
  Drawer,
  Flex,
  Icon,
  Input,
  Row,
  Select,
  Typography,
} from "@/components";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n, type Locale } from "@/i18n";
import { marketingTokens } from "@/theme";

const { Text, Title } = Typography;

const marketingNav = [
  { key: "nav.home", href: "/beranda" },
  { key: "nav.about", href: "/tentang-kami" },
  { key: "nav.services", href: "/layanan" },
  { key: "nav.solution", href: "/solusi" },
  { key: "nav.portfolio", href: "/portofolio" },
  { key: "nav.career", href: "/karir" },
  { key: "nav.contact", href: "/kontak" },
] as const;

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: min(
      ${marketingTokens.section.maxWidth}px,
      calc(100% - ${marketingTokens.section.desktopPadding * 2}px)
    );
    margin-inline: auto;

    @media (max-width: ${token.screenLG}px) {
      width: calc(100% - ${marketingTokens.section.tabletPadding * 2}px);
    }

    @media (max-width: ${token.screenSM}px) {
      width: calc(100% - ${marketingTokens.section.mobilePadding * 2}px);
    }
  `,
  header: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 60;
    min-height: 80px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 0 rgba(7, 17, 31, 0.04);

    @media (max-width: ${token.screenSM}px) {
      min-height: ${marketingTokens.header.mobileHeight}px;
    }
  `,
  headerInner: css`
    min-height: 80px;

    @media (max-width: ${token.screenSM}px) {
      min-height: ${marketingTokens.header.mobileHeight}px;
    }
  `,
  brand: css`
    color: ${token.colorText};
    text-decoration: none;
    min-width: 220px;
  `,
  logo: css`
    object-fit: contain;
    width: auto;
    height: 50px;

    @media (max-width: ${token.screenSM}px) {
      width: auto;
      height: 35px;
    }
  `,
  brandTitle: css`
    display: block;
    color: ${token.colorText};
    font-size: 16px;
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
  `,
  brandTagline: css`
    display: block;
    margin-top: 2px;
    color: ${token.colorTextSecondary};
    font-size: 11px;
  `,
  nav: css`
    a {
      position: relative;
      padding: 28px 0 24px;
      color: ${token.colorText};
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
    }

    a::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 16px;
      left: 0;
      height: 3px;
      border-radius: 999px;
      background: transparent;
    }

    a[data-active="true"] {
      color: ${token.colorPrimary};
    }

    a[data-active="true"]::after {
      background: ${token.colorPrimary};
    }

    @media (max-width: ${token.screenLG}px) {
      display: none;
    }
  `,
  navMobile: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      color: ${token.colorText};
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      border-bottom: 1px solid ${token.colorBorderSecondary};
    }

    a[data-active="true"] {
      color: ${token.colorPrimary};
    }
  `,
  controls: css`
    flex: 0 0 auto;
    @media (max-width: ${token.screenLG}px) {
      display: none;
    }
  `,
  locale: css`
    width: 76px;

    .ant-select-selector {
      height: 38px !important;
      border-color: ${token.colorBorderSecondary} !important;
      border-radius: 999px !important;
      padding-inline: 10px !important;
    }

    .ant-select-selection-item {
      display: flex;
      align-items: center;
      font-weight: 700;
      justify-content: center;
    }
  `,
  mobileActions: css`
    display: none;

    @media (max-width: ${token.screenLG}px) {
      display: flex;
    }
  `,
  mobileMenuButton: css`
    width: 42px !important;
    height: 42px !important;
  `,
  mobileDrawer: css`
    .ant-drawer-body {
      padding: 20px 18px 22px;
    }
  `,
  mobileDrawerHeader: css`
    padding-bottom: 14px;
    margin-bottom: 14px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  headerSpacer: css`
    height: 80px;

    @media (max-width: ${token.screenSM}px) {
      height: ${marketingTokens.header.mobileHeight}px;
    }
  `,
  footer: css`
    margin-top: auto;
    background: #07111f;
    color: rgba(226, 232, 240, 0.88);
  `,
  footerCta: css`
    position: relative;
    overflow: hidden;
    padding: 42px 0;
    background: linear-gradient(135deg, #08172b 0%, #0a2f6e 48%, #1677ff 100%);

    @media (max-width: ${token.screenSM}px) {
      padding: 34px 0;
    }
  `,
  footerCtaInner: css`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    @media (max-width: ${token.screenMD}px) {
      flex-direction: column;
      align-items: start;
    }
  `,
  footerCtaTitle: css`
    margin: 0 0 8px !important;
    color: #fff !important;
    font-size: 30px !important;
    line-height: 1.15 !important;
    letter-spacing: -0.03em;
  `,
  footerCtaDesc: css`
    color: rgba(226, 232, 240, 0.84);
    font-size: 16px;
    line-height: 1.75;
  `,
  footerCtaGlow: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 12% 28%, rgba(255, 255, 255, 0.12), transparent 20%),
      radial-gradient(circle at 84% 76%, rgba(255, 255, 255, 0.08), transparent 24%);
  `,
  footerMain: css`
    padding: 44px 0 26px;

    @media (max-width: ${token.screenSM}px) {
      padding: 30px 0 18px;
    }
  `,
  footerBrand: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  footerBrandName: css`
    color: #fff !important;
    font-size: 18px !important;
    font-weight: 800 !important;
    margin: 0 !important;
  `,
  footerBrandText: css`
    margin-top: 8px;
    color: rgba(226, 232, 240, 0.74);
    font-size: 13px;
    line-height: 1.75;
    max-width: 300px;
  `,
  footerList: css`
    margin: 0;
    padding: 0;
    list-style: none;
  `,
  footerTitle: css`
    margin: 0 0 14px !important;
    color: #fff !important;
    font-size: 14px !important;
    text-transform: uppercase;
    letter-spacing: 0.06em;

    @media (max-width: ${token.screenSM}px) {
      margin-bottom: 10px !important;
    }
  `,
  footerLink: css`
    display: block;
    width: fit-content;
    margin-bottom: 9px;
    color: rgba(226, 232, 240, 0.7);
    font-size: 13px;
    text-decoration: none;

    &:hover {
      color: #fff;
    }

    @media (max-width: ${token.screenSM}px) {
      margin-bottom: 7px;
    }
  `,
  footerContactLink: css`
    color: rgba(226, 232, 240, 0.84);
    font-size: 13px;
    line-height: 1.6;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  `,
  footerText: css`
    color: rgba(226, 232, 240, 0.72) !important;
    font-size: 13px;
    line-height: 1.75;
  `,
  contactItem: css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
    color: rgba(226, 232, 240, 0.84);
    font-size: 13px;
    line-height: 1.6;
  `,
  contactIcon: css`
    margin-top: 2px;
    color: ${token.colorPrimary};
    flex: 0 0 auto;
  `,
  newsletter: css`
    display: flex;
    width: 100%;

    .ant-input {
      height: 42px;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.12);
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      color: #fff;
    }

    .ant-input::placeholder {
      color: rgba(226, 232, 240, 0.52);
    }

    .ant-btn {
      height: 42px;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      margin-left: -1px;
      flex: 0 0 56px;
    }
  `,
  footerBottom: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 0 26px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    @media (max-width: ${token.screenSM}px) {
      padding: 16px 0 20px;
    }

    @media (max-width: ${token.screenMD}px) {
      flex-direction: column;
      align-items: start;
    }
  `,
  footerBottomLinks: css`
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  `,
  footerSocial: css`
    display: flex;
    gap: 10px;
    margin-top: 16px;

    @media (max-width: ${token.screenSM}px) {
      margin-top: 12px;
    }
  `,
  footerSocialButton: css`
    width: 34px !important;
    height: 34px !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
    color: rgba(255, 255, 255, 0.9) !important;
  `,
  section: css`
    padding-block: ${marketingTokens.section.desktopPadding}px;

    @media (max-width: ${token.screenMD}px) {
      padding-block: ${marketingTokens.section.mobilePadding}px;
    }
  `,
}));

export function MarketingContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { styles, cx } = useStyles();
  return <div className={cx(styles.container, className)}>{children}</div>;
}

export function MarketingSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { styles, cx } = useStyles();
  return (
    <section className={cx(styles.section, className)}>
      <MarketingContainer>{children}</MarketingContainer>
    </section>
  );
}

export function Header() {
  const { styles } = useStyles();
  const pathname = usePathname();
  const { locale, localeNames, setLocale, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
      <MarketingContainer>
        <Flex className={styles.headerInner} align="center" justify="space-between" gap={24} wrap="nowrap">
          <Link href="/beranda" className={styles.brand} onClick={() => setMobileOpen(false)}>
            <Flex align="center" gap={10}>
              <Image
                className={styles.logo}
                src="/images/branch.webp"
                alt={t("app.logoAlt")}
                width={42}
                height={42}
                priority
              />
              <span style={{ display: "none" }}>
                <Text strong className={styles.brandTitle}>
                  {t("app.brand")}
                </Text>
                <Text className={styles.brandTagline}>{t("app.tagline")}</Text>
              </span>
            </Flex>
          </Link>

          <Flex component="nav" className={styles.nav} align="center" justify="center" gap={34} aria-label={t("nav.openMenu")}>
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={pathname === item.href || (item.href === "/beranda" && pathname === "/")}
              >
                {t(item.key)}
              </Link>
            ))}
          </Flex>

          <Flex className={styles.controls} align="center" gap={8}>
            <Select
              className={styles.locale}
              aria-label={t("nav.changeLanguage")}
              value={locale}
              onChange={(value) => setLocale(value as Locale)}
              options={Object.entries(localeNames).map(([value, label]) => ({
                value,
                label: value.toUpperCase(),
                title: label,
              }))}
            />
            <Button type="primary" icon={<Icon type="ArrowRightOutlined" />} href="/kontak">
              {t("marketing.home.primaryAction")}
            </Button>
          </Flex>

          <Flex className={styles.mobileActions} align="center" gap={8}>
            <Button
              className={styles.mobileMenuButton}
              type="text"
              icon={<Icon type="MenuOutlined" size={18} />}
              aria-label={t("nav.openMenu")}
              onClick={() => setMobileOpen(true)}
            />
          </Flex>
        </Flex>
      </MarketingContainer>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="right"
        width={320}
        closable={false}
        className={styles.mobileDrawer}
      >
        <Flex className={styles.mobileDrawerHeader} align="center" justify="space-between" gap={12}>
          <Link href="/beranda" className={styles.brand} onClick={() => setMobileOpen(false)}>
            <Flex align="center" gap={10}>
              <Image src="/images/branch.webp" alt={t("app.logoAlt")} width={36} height={36} priority />
              <span>
                <Text strong className={styles.brandTitle}>
                  {t("app.brand")}
                </Text>
                <Text className={styles.brandTagline}>{t("app.tagline")}</Text>
              </span>
            </Flex>
          </Link>
          <Button type="text" aria-label={t("nav.closeMenu")} onClick={() => setMobileOpen(false)} icon={<Icon type="CloseOutlined" />} />
        </Flex>

        <nav className={styles.navMobile} aria-label={t("nav.openMenu")}>
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href || (item.href === "/beranda" && pathname === "/")}
              onClick={() => setMobileOpen(false)}
            >
              <span>{t(item.key)}</span>
              <Icon type="RightOutlined" size={12} />
            </Link>
          ))}
        </nav>

        <Flex vertical gap={14} style={{ width: "100%", marginTop: 18 }}>
          <Select
            aria-label={t("nav.changeLanguage")}
            value={locale}
            onChange={(value) => setLocale(value as Locale)}
            options={Object.entries(localeNames).map(([value, label]) => ({
              value,
              label: `${value.toUpperCase()} · ${label}`,
              title: label,
            }))}
          />
          <ThemeToggle />
          <Button type="primary" icon={<Icon type="MailOutlined" />} href="/kontak" block onClick={() => setMobileOpen(false)}>
            {t("marketing.home.primaryAction")}
          </Button>
        </Flex>
      </Drawer>
      </header>
      <div className={styles.headerSpacer} />
    </>
  );
}

export function Footer() {
  const { styles } = useStyles();
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const contactEmail = t("footer.contactEmail");
  const contactPhone = t("footer.contactPhone");
  const whatsappNumber = contactPhone.replace(/\D/g, "");

  return (
    <footer className={styles.footer}>
      <div className={styles.footerCta}>
        <MarketingContainer>
          <div className={styles.footerCtaInner}>
            <div>
              <Title level={2} className={styles.footerCtaTitle}>
                {t("marketing.home.cta.title")}
              </Title>
              <Text className={styles.footerCtaDesc}>{t("marketing.home.cta.description")}</Text>
            </div>
            <Button type="primary" size="large" href="/kontak" icon={<Icon type="ArrowRightOutlined" />}>
              {t("marketing.home.cta.action")}
            </Button>
          </div>
        </MarketingContainer>
        <div className={styles.footerCtaGlow} />
      </div>

      <MarketingContainer>
        <div className={styles.footerMain}>
          <Row gutter={[28, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Link href="/beranda" className={styles.footerBrand}>
                <Image src="/images/logo.webp" alt={t("app.logoAlt")} width={44} height={44} priority />
                <Title level={4} className={styles.footerBrandName}>
                  {t("app.brand")}
                </Title>
              </Link>
              <Text className={styles.footerBrandText}>{t("footer.summary")}</Text>
              <div className={styles.footerSocial}>
                <Button className={styles.footerSocialButton} type="text" shape="circle" aria-label={t("footer.social.linkedin")} icon={<Icon type="LinkedinFilled" />} />
                <Button className={styles.footerSocialButton} type="text" shape="circle" aria-label={t("footer.social.instagram")} icon={<Icon type="InstagramFilled" />} />
                <Button className={styles.footerSocialButton} type="text" shape="circle" aria-label={t("footer.social.youtube")} icon={<Icon type="YoutubeFilled" />} />
              </div>
            </Col>

            <Col xs={12} sm={8} lg={4}>
              <Title level={5} className={styles.footerTitle}>
                {t("footer.navigation")}
              </Title>
              <Link className={styles.footerLink} href="/beranda">{t("nav.home")}</Link>
              <Link className={styles.footerLink} href="/tentang-kami">{t("nav.about")}</Link>
              <Link className={styles.footerLink} href="/fitur">{t("nav.services")}</Link>
              <Link className={styles.footerLink} href="/solusi">{t("nav.solution")}</Link>
              <Link className={styles.footerLink} href="/portofolio">{t("nav.portfolio")}</Link>
              <Link className={styles.footerLink} href="/karir">{t("nav.career")}</Link>
            </Col>

            <Col xs={12} sm={8} lg={5}>
              <Title level={5} className={styles.footerTitle}>
                {t("footer.services")}
              </Title>
              <Link className={styles.footerLink} href="/fitur">{t("marketing.home.services.items.ecommerce.title")}</Link>
              <Link className={styles.footerLink} href="/fitur">{t("marketing.home.services.items.custom.title")}</Link>
              <Link className={styles.footerLink} href="/fitur">{t("marketing.home.services.items.consulting.title")}</Link>
            </Col>

            <Col xs={24} sm={8} lg={5}>
              <Title level={5} className={styles.footerTitle}>
                {t("footer.contact")}
              </Title>
              <div className={styles.contactItem}>
                <Icon className={styles.contactIcon} type="MailOutlined" />
                <a className={styles.footerContactLink} href={`mailto:${contactEmail}`}>
                  <span>{contactEmail}</span>
                </a>
              </div>
              <div className={styles.contactItem}>
                <Icon className={styles.contactIcon} type="PhoneOutlined" />
                <a className={styles.footerContactLink} href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
                  <span>{contactPhone}</span>
                </a>
              </div>
              <div className={styles.contactItem}>
                <Icon className={styles.contactIcon} type="EnvironmentOutlined" />
                <span>{t("footer.contactAddress")}</span>
              </div>
            </Col>

            <Col xs={24} sm={8} lg={4}>
              <Title level={5} className={styles.footerTitle}>
                {t("footer.newsletterTitle")}
              </Title>
              <Text className={styles.footerText}>{t("footer.newsletterNote")}</Text>
              <div className={styles.newsletter}>
                <Input aria-label={t("footer.newsletterPlaceholder")} placeholder={t("footer.newsletterPlaceholder")} />
                <Button type="primary" aria-label={t("footer.newsletterAction")} icon={<Icon type="ArrowRightOutlined" />} />
              </div>
            </Col>
          </Row>

          <Flex className={styles.footerBottom}>
            <Text className={styles.footerText}>
              © {year} {t("app.fullTitle")} {t("footer.copyright")}
            </Text>

            <div className={styles.footerBottomLinks}>
              <Link className={styles.footerLink} href="/privacy">{t("footer.privacy")}</Link>
              <Link className={styles.footerLink} href="/terms">{t("footer.terms")}</Link>
            </div>
          </Flex>
        </div>
      </MarketingContainer>
    </footer>
  );
}
