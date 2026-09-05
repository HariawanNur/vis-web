"use client"

import React from "react"
import { createStyles } from "antd-style"
import { Select as AntSelect } from "antd"
import type { SelectProps } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { designSystem } from "@/theme/antd-theme"

const palette = designSystem.palette
// Button variant token mapping
type SelectButtonVariant = "primary" | "secondary" | "track" | "surface"

const buttonVariantTokens = {
  primary: {
    backgroundColor: palette.primary,
    foregroundColor: palette.white,
    arrowColor: palette.white,
    borderColor: "transparent",
    shadow: "0 4px 14px rgba(22, 119, 255, 0.25)",
  },
  secondary: {
    backgroundColor: palette.secondary,
    foregroundColor: palette.white,
    arrowColor: palette.white,
    borderColor: "transparent",
    shadow: "0 4px 14px rgba(245, 166, 35, 0.24)",
  },
  track: {
    backgroundColor: palette.track,
    foregroundColor: palette.text,
    arrowColor: palette.textTertiary,
    borderColor: palette.track,
    shadow: "0 1px 2px rgba(13, 43, 104, 0.04)",
  },
  surface: {
    backgroundColor: palette.white,
    foregroundColor: palette.text,
    arrowColor: palette.textTertiary,
    borderColor: palette.border,
    shadow: "0 1px 2px rgba(13, 43, 104, 0.04)",
  },
} as const



export interface SelectOptionItem {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
}

export interface SelectButtonProps extends Omit<SelectProps, "options" | "variant"> {
  options: SelectOptionItem[]
  defaultIcon?: React.ReactNode
  staticLabel?: React.ReactNode
  staticValue?: string
  variant?: SelectButtonVariant
  allowValueChange?: boolean
}

export const SelectButton: React.FC<SelectButtonProps> = ({
  options,
  value,
  defaultValue,
  staticLabel,
  staticValue,
  variant,
  allowValueChange = false,
  onChange,
  defaultIcon,
  suffix,
  className,
  placeholder,
  ...restProps
}) => {
  const { styles, cx } = useStyles()

  const resolvedStaticValue = staticValue ?? "__static__"
  const resolvedStaticLabel = staticLabel ?? placeholder ?? "Pilih Opsi"
  const resolvedTokens = variant ? buttonVariantTokens[variant] : buttonVariantTokens.surface

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<string>(
    (defaultValue as string | undefined) ?? resolvedStaticValue,
  )

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(value as string)
    }
  }, [isControlled, value])

  const selectedValue = (isControlled ? value : internalValue) as string | undefined
  const optionLookup = React.useMemo(
    () => new Map(options.map((option) => [option.value, option])),
    [options],
  )

  const formattedOptions = React.useMemo(
    () =>
      options.map((opt) => ({
        value: opt.value,
        label: (
          <span className={styles.optionContent}>
            {opt.icon ?? defaultIcon}
            {opt.label}
          </span>
        ),
      })),
    [defaultIcon, options, styles.optionContent],
  )

  const handleChange: SelectProps["onChange"] = (nextValue, option) => {
    onChange?.(nextValue, option)

    if (!isControlled && allowValueChange) {
      setInternalValue(nextValue as string)
    }
  }

  return (
    <div
      className={cx(styles.buttonShell, className)}
      style={{
        ["--button-select-bg" as any]: resolvedTokens.backgroundColor,
        ["--button-select-border" as any]: resolvedTokens.borderColor,
        ["--button-select-shadow" as any]: resolvedTokens.shadow,
      }}
    >
      <span className={styles.buttonContent}>
        <span className={styles.buttonLabel} style={{ color: resolvedTokens.foregroundColor }}>
          {defaultIcon}
          <span>{resolvedStaticLabel}</span>
        </span>
        <DownOutlined className={styles.buttonArrow} style={{ color: resolvedTokens.arrowColor }} />
      </span>

      <AntSelect
        variant="borderless"
        value={selectedValue ?? resolvedStaticValue}
        onChange={handleChange}
        options={formattedOptions}
        suffix={suffix ?? <DownOutlined />}
        className={styles.selectOverlay}
        classNames={{ popup: { root: styles.popupMenu } }}
        optionRender={(option) => {
          const current = optionLookup.get(String(option.value))
          return (
            <span className={styles.optionContent}>
              {current?.icon ?? defaultIcon}
              {current?.label ?? option.data.label}
            </span>
          )
        }}
        {...restProps}
      />
    </div>
  )
}

const useStyles = createStyles(() => ({
  buttonShell: {
    position: "relative",
    display: "inline-block",
    minWidth: 170,
    width: "fit-content",
    height: 44,
    borderRadius: designSystem.radius.lg,
    overflow: "hidden",
    backgroundColor: `var(--button-select-bg, ${palette.white})`,
    boxShadow: `var(--button-select-shadow, 0 1px 2px rgba(13, 43, 104, 0.04))`,
    border: `1px solid var(--button-select-border, ${designSystem.palette.track})`,
  },
  buttonContent: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    fontWeight: 600,
  },
  buttonLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  buttonArrow: {
    flexShrink: 0,
  },
  selectOverlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: 2,

    ".ant-select-selector": {
      width: "100% !important",
      height: "100% !important",
    },

    ".ant-select-selection-item, .ant-select-selection-placeholder, .ant-select-arrow": {
      opacity: 0,
    },

    ".ant-select-selector, .ant-select-selection-search, .ant-select-selection-search-input": {
      cursor: "pointer",
    },
  },
  optionContent: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  popupMenu: {
    ".ant-select-item-option-selected": {
      fontWeight: 600,
    },
    ".ant-select-item-option-content": {
      color: palette.text,
    },
  },
}))
