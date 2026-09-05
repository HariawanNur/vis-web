"use client";

import React from "react";
import Image from "next/image";
import { createStyles } from "antd-style";
import classNames from "classnames";
import { useI18n } from "@/i18n";
import { designSystem } from "@/theme/antd-theme";
import { Typography } from "./Typography";

export interface BrandProps {
  className?: string;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
}

const useStyles = createStyles(({ css }) => ({
  brandRow: css`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    @media (min-width: 1280px) {
      margin-bottom: 32px;
    }
  `,
  logoImg: css`
    width: 56px;
    height: 56px;
    object-fit: contain;
    @media (min-width: 1280px) {
      width: 68px;
      height: 68px;
    }
  `,
  brandTextContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  `,
  brandTitle: css`
    font-size: 24px !important;
    font-weight: 800 !important;
    color: ${designSystem.palette.primary} !important;
    line-height: 1.1 !important;
    margin: 0 !important;
    letter-spacing: -0.02em;
    @media (min-width: 1280px) {
      font-size: 28px !important;
    }
  `,
  brandSubtitle: css`
    font-size: 13px !important;
    font-weight: 600 !important;
    color: ${designSystem.palette.textSecondary} !important;
    letter-spacing: 0.2px;
    margin: 0 !important;
    @media (min-width: 1280px) {
      font-size: 14px !important;
    }
  `,
}));

export const Brand: React.FC<BrandProps> = ({
  className,
  title,
  subtitle,
  imageSrc = "/images/logo.webp",
}) => {
  const { styles } = useStyles();
  const { t } = useI18n();
  const displayTitle = title || t("app.brand");
  const displaySubtitle = subtitle || t("app.tagline");

  return (
    <div className={classNames(styles.brandRow, className)}>
      <Image
        src={imageSrc}
        alt={t("app.logoAlt")}
        width={40}
        height={40}
        unoptimized
        style={{ objectFit: "contain" }}
      />
      <div className={styles.brandTextContainer}>
        <Typography variant="title" level={4} className={styles.brandTitle}>
          {displayTitle}
        </Typography>
        <Typography variant="paragraph" className={styles.brandSubtitle}>
          {displaySubtitle}
        </Typography>
      </div>
    </div>
  );
};

export default Brand;
