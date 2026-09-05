import React from "react"
import { Input as AntInput, InputProps as AntInputProps, Space } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  input: css`
    border-radius: ${designSystem.radius.md}px !important;
    &:hover, &:focus {
      border-color: ${designSystem.palette.primary} !important;
    }
  `,
}))

export interface CustomInputProps extends AntInputProps {
  className?: string
}

const PasswordInput = ({ className, ...props }: React.ComponentProps<typeof AntInput.Password>) => {
  const { styles } = useStyles()
  return <AntInput.Password className={classNames(styles.input, className)} {...props} />
}
PasswordInput.displayName = "Input.Password"

const InputGroup: React.FC<React.ComponentProps<typeof Space.Compact>> = (props) => <Space.Compact {...props} />
InputGroup.displayName = "Input.Group"

export const Input: React.FC<CustomInputProps> & {
  Password: typeof PasswordInput
  TextArea: typeof AntInput.TextArea
  Search: typeof AntInput.Search
  Group: typeof InputGroup
  OTP: typeof AntInput.OTP
} = ({ className, ...props }) => {
  const { styles } = useStyles()
  return <AntInput className={classNames(styles.input, className)} {...props} />
}

Input.Password = PasswordInput
Input.TextArea = AntInput.TextArea
Input.Search = AntInput.Search
Input.Group = InputGroup
Input.OTP = AntInput.OTP

export default Input
