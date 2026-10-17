import React from "react"
import { createStyles } from "antd-style"
import { Button, Dropdown, Icon, type IconName } from "@/components"
import type { DropdownProps } from "antd"
import { designSystem } from "@/theme/antd-theme"

type DropdownButtonProps = {
  label: React.ReactNode
  menu: DropdownProps["menu"]
  placement?: DropdownProps["placement"]
  trigger?: DropdownProps["trigger"]
  iconType?: IconName
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
}

export function DropdownButton({
  label,
  menu,
  placement = "bottomLeft",
  trigger = ["click"],
  iconType = "DownOutlined",
  onClick,
  disabled,
  className,
}: DropdownButtonProps) {
  const { styles, cx } = useStyles()

  return (
    <Dropdown trigger={trigger} placement={placement} menu={menu}>
      <Button
        type="default"
        disabled={disabled}
        onClick={onClick}
        className={cx(styles.button, className)}
      >
        <span>{label}</span>
        <Icon type={iconType} style={{ marginLeft: 8 }} />
      </Button>
    </Dropdown>
  )
}

const useStyles = createStyles(({ css }) => ({
  button: css`
    height: 36px !important;
    border-radius: 10px !important;
    border-color: ${designSystem.palette.border} !important;
    color: ${designSystem.palette.text} !important;
    font-weight: 700 !important;
    background: ${designSystem.palette.white} !important;
    display: inline-flex;
    align-items: center;
  `,
}))

export default DropdownButton
