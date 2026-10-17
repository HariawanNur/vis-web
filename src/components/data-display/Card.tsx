import React from "react"
import classNames from "classnames"
import {
  Card as AntCard,
  CardProps as AntCardProps,
} from "antd"
import { createStyles } from "antd-style"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  card: css`
    border-radius: 16px !important;
    position: relative;
  `,
  cardWrapped: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    width: 100%;
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  `,
  title: css`
    color: ${designSystem.palette.text} !important;
    font-size: 15px !important;
    font-weight: 800 !important;
    margin: 0 !important;
  `,
  extra: css`
    color: ${designSystem.palette.primary} !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    white-space: nowrap;
  `,
  body: css`
    min-width: 0;
  `,
  bodyWrapped: css`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  bodyWithFooter: css`
    padding-bottom: 56px;
  `,
  centered: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  footer: css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 16px 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  `,
  footerText: css`
    color: ${designSystem.palette.primary} !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    white-space: nowrap;
  `,
}))

export interface CustomCardProps extends AntCardProps {
  className?: string
  footer?: React.ReactNode
  bodyClassName?: string
  headerClassName?: string
  footerClassName?: string
  contentCentered?: boolean
}

export const Card: React.FC<CustomCardProps> & {
  Grid: typeof AntCard.Grid
  Meta: typeof AntCard.Meta
} = ({
  className,
  footer,
  bodyClassName,
  headerClassName,
  footerClassName,
  contentCentered,
  title,
  extra,
  children,
  ...props
}: any) => {
  const { styles } = useStyles()

  const useWrapLayout = footer !== undefined || contentCentered || bodyClassName || headerClassName || footerClassName
  const hasFooter = footer !== undefined

  if (!useWrapLayout) {
    return (
      <AntCard className={classNames(styles.card, className)} title={title} extra={extra} {...props}>
        {children}
      </AntCard>
    )
  }

  return (
    <AntCard className={classNames(styles.card, styles.cardWrapped, className)} {...props}>
      {(title || extra) && (
        <div className={classNames(styles.header, headerClassName)}>
          <div className={styles.title}>{title}</div>
          {extra && <span className={styles.extra}>{extra}</span>}
        </div>
      )}

      <div className={classNames(styles.body, hasFooter && styles.bodyWithFooter, hasFooter && styles.bodyWrapped, bodyClassName, contentCentered && styles.centered)}>
        {children}
      </div>

      {footer && (
        <div className={classNames(styles.footer, footerClassName)}>
          {typeof footer === "string"
            ? <span className={styles.footerText}>{footer}</span>
            : footer
          }
        </div>
      )}
    </AntCard>
  )
}

Card.Grid = AntCard.Grid
Card.Meta = AntCard.Meta

export default Card
