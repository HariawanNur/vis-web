"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Button,
  Col,
  createStyles,
  Flex,
  Icon,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "@/components";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n, type Locale } from "@/i18n";
import { marketingTokens } from "@/theme";

const { Text, Title } = Typography;

const marketingNav = [
  { key: "nav.home", href: "/beranda" },
  { key: "nav.features", href: "/fitur" },
  { key: "nav.benefits", href: "/manfaat" },
  { key: "nav.pricing", href: "/harga" },
  { key: "nav.about", href: "/tentang-kami" },
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
    position: relative;
    z-index: 20;
    min-height: ${marketingTokens.header.desktopHeight}px;
    background: ${token.colorBgContainer};
    border-bottom: 1px solid ${token.colorBorderSecondary};

    @media (max-width: ${token.screenSM}px) {
      min-height: ${marketingTokens.header.mobileHeight}px;
    }
  `,
  headerInner: css`
    min-height: ${marketingTokens.header.desktopHeight}px;
    @media (max-width: ${token.screenLG}px) {
      padding-block: 10px;
    }

    @media (max-width: ${token.screenSM}px) {
      min-height: ${marketingTokens.header.mobileHeight}px;
    }
  `,
  brand: css`
    color: ${token.colorText};
    text-decoration: none;
    min-width: 260px;
  `,
  logo: css`
    object-fit: contain;
  `,
  brandTitle: css`
    display: block;
    color: ${token.colorText};
    font-size: 17px;
    line-height: 1.1;
  `,
  tagline: css`
    display: block;
    margin-top: 3px;
    color: ${token.colorTextSecondary};
    font-size: 11px;
  `,
  nav: css`
    a {
      position: relative;
      padding: 30px 0 25px;
      color: ${token.colorText};
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
    }
    a::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 18px;
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
      order: 3;
      width: 100%;
      overflow-x: auto;
      a {
        padding: 12px 0 16px;
      }
      a::after {
        bottom: 6px;
      }
    }
  `,
  controls: css`
    flex: 0 0 auto;
  `,
  locale: css`
    width: 72px;
    .ant-select-selector {
      border-color: ${token.colorBorderSecondary}!important;
    }
  `,
  footer: css`
    margin-top: auto;
    padding: 56px 0 24px;
    color: #d7d9e5;
    background: #11152f;
  `,
  footerTitle: css`
    margin: 0 0 14px !important;
    color: #fff !important;
    font-size: 14px !important;
  `,
  footerText: css`
    color: #b8bdcf !important;
    font-size: 12px;
    line-height: 1.75;
  `,
  footerLink: css`
    display: block;
    width: fit-content;
    margin-bottom: 10px;
    color: #cbd0df;
    font-size: 12px;
    text-decoration: none;
    &:hover {
      color: #fff;
    }
  `,
  newsletter: css`
    .ant-input {
      height: 40px;
      background: #1c2242;
      border-color: #333a5e;
      color: #fff;
    }
    .ant-btn {
      height: 40px;
    }
  `,
  footerBottom: css`
    margin-top: 38px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  return (
    <header className={styles.header}>
      <MarketingContainer>
        <Flex
          className={styles.headerInner}
          align="center"
          justify="space-between"
          gap={24}
          wrap="wrap"
        >
          <Link href="/beranda" className={styles.brand}>
            <Flex align="center" gap={10}>
              <Image
                className={styles.logo}
                src="/images/logo.webp"
                alt={t("app.logoAlt")}
                width={46}
                height={46}
                priority
              />
              <span>
                <Text strong className={styles.brandTitle}>
                  {t("app.brand")}
                </Text>
                <Text className={styles.tagline}>{t("app.tagline")}</Text>
              </span>
            </Flex>
          </Link>
          <Flex
            component="nav"
            className={styles.nav}
            align="center"
            justify="center"
            gap={40}
            aria-label={t("nav.openMenu")}
          >
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={
                  pathname === item.href ||
                  (item.href === "/beranda" && pathname === "/")
                }
              >
                {t(item.key)}
              </Link>
            ))}
          </Flex>
          <Flex className={styles.controls} align="center" gap={10}>
            <ThemeToggle />
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
            <Button
              icon={<Icon type="LoginOutlined" />}
              href="/login"
            >
              {t("nav.login")}
            </Button>
            <Button
              type="primary"
              icon={<Icon type="MailOutlined" />}
              href="/kontak"
            >
              {t("common.bookDemo")}
            </Button>
          </Flex>
        </Flex>
      </MarketingContainer>
    </header>
  );
}

export function Footer() {
  const { styles } = useStyles();
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <MarketingContainer>
        <Row gutter={[36, 36]}>
          <Col xs={24} md={9} lg={8}>
            <Space orientation="vertical" size={12}>
              <Flex align="center" gap={10}>
                <Image
                  className={styles.logo}
                  src="/images/logo.webp"
                  alt={t("app.logoAlt")}
                  width={42}
                  height={42}
                />
                <Title level={4} style={{ margin: 0, color: "#fff" }}>
                  {t("app.brand")}
                </Title>
              </Flex>
              <Text className={styles.footerText}>{t("footer.summary")}</Text>
            </Space>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Title level={5} className={styles.footerTitle}>
              {t("footer.product")}
            </Title>
            <Link className={styles.footerLink} href="/fitur">
              {t("nav.features")}
            </Link>
            <Link className={styles.footerLink} href="/manfaat">
              {t("nav.benefits")}
            </Link>
            <Link className={styles.footerLink} href="/harga">
              {t("nav.pricing")}
            </Link>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Title level={5} className={styles.footerTitle}>
              {t("footer.company")}
            </Title>
            <Link className={styles.footerLink} href="/tentang-kami">
              {t("nav.about")}
            </Link>
            <Link className={styles.footerLink} href="/kontak">
              {t("nav.contact")}
            </Link>
            <Link className={styles.footerLink} href="/kontak">
              {t("footer.support")}
            </Link>
          </Col>
          <Col xs={24} sm={8} md={7} lg={8}>
            <Title level={5} className={styles.footerTitle}>
              {t("footer.newsletterTitle")}
            </Title>
            <Space.Compact className={styles.newsletter} block>
              <Input
                aria-label={t("footer.newsletterPlaceholder")}
                placeholder={t("footer.newsletterPlaceholder")}
              />
              <Button type="primary">{t("footer.newsletterAction")}</Button>
            </Space.Compact>
          </Col>
        </Row>
        <Flex
          className={styles.footerBottom}
          justify="space-between"
          align="center"
          gap={16}
          wrap="wrap"
        >
          <Text className={styles.footerText}>
            © {year} {t("app.brand")}. {t("footer.copyright")}
          </Text>
          <Flex gap={20}>
            <Link className={styles.footerLink} href="/privacy">
              {t("footer.privacy")}
            </Link>
            <Link className={styles.footerLink} href="/terms">
              {t("footer.terms")}
            </Link>
          </Flex>
        </Flex>
      </MarketingContainer>
    </footer>
  );
}
