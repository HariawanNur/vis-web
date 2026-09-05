import React from "react"
import { Breadcrumb, BreadcrumbProps } from "antd"
import { createStyles } from "antd-style"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  breadcrumb: css`
    font-size: 12px;
    font-weight: 600;
    color: ${designSystem.palette.textSecondary};
    .ant-breadcrumb-separator {
      color: ${designSystem.palette.textSecondary};
    }
    a {
      color: ${designSystem.palette.textSecondary};
    }
    span:last-child {
      color: ${designSystem.palette.primary};
    }
  `,
}))

export interface BreadcrumbsProps extends BreadcrumbProps {
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className, ...props }) => {
  const { styles } = useStyles()
  return <Breadcrumb className={`${styles.breadcrumb} ${className || ""}`} {...props} />
}

export default Breadcrumbs
