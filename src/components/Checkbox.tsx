import React from "react"
import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  checkbox: css`
    font-size: 13px;
    color: ${designSystem.palette.textSecondary};
  `,
}))

export interface CustomCheckboxProps extends AntCheckboxProps {
  className?: string
}

export const Checkbox: React.FC<CustomCheckboxProps> & {
  Group: typeof AntCheckbox.Group
} = ({ className, children, ...props }) => {
  const { styles } = useStyles()
  return (
    <AntCheckbox className={classNames(styles.checkbox, className)} {...props}>
      {children}
    </AntCheckbox>
  )
}

Checkbox.Group = AntCheckbox.Group

export default Checkbox
