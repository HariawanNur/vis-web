import React from "react"
import { Button as AntButton, ButtonProps as AntButtonProps, Space } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"

const useStyles = createStyles(({ css }) => ({
  button: css`
    border-radius: 8px !important;
    font-weight: 600;
  `,
}))

export interface CustomButtonProps extends AntButtonProps {
  className?: string
}

const ButtonGroup: React.FC<React.ComponentProps<typeof Space.Compact>> = (props) => (
  <Space.Compact {...props} />
)

export const Button: React.FC<CustomButtonProps> & {
  Group: typeof ButtonGroup
} = ({ className, ...props }) => {
  const { styles } = useStyles()
  return <AntButton className={classNames(styles.button, className)} {...props} />
}

Button.Group = ButtonGroup

export default Button
