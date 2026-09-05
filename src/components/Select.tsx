import React from "react"
import { Select as AntSelect, SelectProps as AntSelectProps } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

export interface CustomSelectProps extends Omit<AntSelectProps, "dropdownMatchSelectWidth"> {
  className?: string
}

const useStyles = createStyles(({ css }) => ({
  select: css`
    min-width: 0;

    .ant-select-selector {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      border-radius: 12px !important;
      border-color: ${designSystem.palette.borderSoft} !important;
      box-shadow: 0 1px 2px rgba(13, 43, 104, 0.04) !important;
      height: 40px !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
      overflow: hidden !important;
    }

    .ant-select-selection-item {
      color: ${designSystem.palette.text} !important;
      font-weight: 600 !important;
      line-height: 38px !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .ant-select-selection-placeholder {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .ant-select-arrow {
      color: ${designSystem.palette.textTertiary} !important;
      right: 12px !important;
    }

    .ant-select-selection-search {
      overflow: hidden !important;
    }

    .ant-select-selection-search-input {
      min-width: 0 !important;
    }
  `,
  block: css`
    width: 100%;
    min-width: 0;
  `,
}))

export const Select: React.FC<CustomSelectProps> & {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Option: typeof AntSelect.Option
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  OptGroup: typeof AntSelect.OptGroup
} = (props: any) => {
  const { styles } = useStyles()
  return (
    <AntSelect
      className={classNames(styles.select, styles.block, props.className)}
      popupMatchSelectWidth={false}
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
Select.Option = AntSelect.Option
// eslint-disable-next-line @typescript-eslint/no-deprecated
Select.OptGroup = AntSelect.OptGroup

export default Select
