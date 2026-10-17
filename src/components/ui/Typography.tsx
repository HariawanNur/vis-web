import React from "react"
import { Typography as BaseTypography } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"

const { Text, Link, Title, Paragraph } = BaseTypography

export type TypographyVariant = "text" | "link" | "title" | "paragraph"

export interface CustomTypographyProps {
  variant?: TypographyVariant
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

const useStyles = createStyles(({ css }) => ({
  root: css`
    color: inherit;
  `,
}))

export const Typography: React.FC<CustomTypographyProps> & {
  Text: typeof Text
  Link: typeof Link
  Title: typeof Title
  Paragraph: typeof Paragraph
} = ({ variant = "text", className, children, ...props }) => {
  const { styles } = useStyles()

  const combinedClassName = classNames(styles.root, className)

  switch (variant) {
    case "link":
      return <Link className={combinedClassName} {...props}>{children}</Link>
    case "title":
      return <Title className={combinedClassName} {...props}>{children}</Title>
    case "paragraph":
      return <Paragraph className={combinedClassName} {...props}>{children}</Paragraph>
    case "text":
    default:
      return <Text className={combinedClassName} {...props}>{children}</Text>
  }
}

Typography.Text = Text
Typography.Link = Link
Typography.Title = Title
Typography.Paragraph = Paragraph

export default Typography
