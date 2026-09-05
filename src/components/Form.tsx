import React from "react"
import { Form as AntForm, FormProps as AntFormProps } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  form: css`
    .ant-form-item-label > label {
      font-weight: 600;
      color: ${designSystem.palette.text};
    }
  `,
}))

export interface CustomFormProps extends AntFormProps {
  className?: string
}

export const Form: React.FC<CustomFormProps> & {
  Item: typeof AntForm.Item
  useForm: typeof AntForm.useForm
  useWatch: typeof AntForm.useWatch
  List: typeof AntForm.List
  ErrorList: typeof AntForm.ErrorList
  Provider: typeof AntForm.Provider
} = ({ className, ...props }: any) => {
  const { styles } = useStyles()
  return <AntForm className={classNames(styles.form, className)} {...props} />
}

Form.Item = AntForm.Item
Form.useForm = AntForm.useForm
Form.useWatch = AntForm.useWatch
Form.List = AntForm.List
Form.ErrorList = AntForm.ErrorList
Form.Provider = AntForm.Provider

export default Form
