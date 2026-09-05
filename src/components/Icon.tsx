import React from "react"
import * as Icons from "@ant-design/icons"

export type AntIconType = keyof typeof Icons

export type IconName = Extract<
  AntIconType,
  `${string}Outlined` | `${string}Filled` | `${string}TwoTone`
>

let iconNamesCache: IconName[] | null = null

export function getIconNames(): IconName[] {
  if (iconNamesCache) {
    return iconNamesCache
  }
  if (typeof window === "undefined") {
    return []
  }
  iconNamesCache = (Object.keys(Icons) as AntIconType[]).filter((name) =>
    /(Outlined|Filled|TwoTone)$/.test(name),
  ) as IconName[]
  return iconNamesCache
}

export interface CustomIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: IconName | React.ComponentType<any>
  size?: number | string
  color?: string
  spin?: boolean
  rotate?: number
  className?: string
  style?: React.CSSProperties
}

export const Icon: React.FC<CustomIconProps> = ({
  type,
  size,
  color,
  spin,
  rotate,
  className,
  style,
  ...props
}) => {
  const IconComponent = typeof type === "string" ? (Icons as Record<string, any>)[type] : type

  if (!IconComponent) {
    return null
  }

  const computedStyle: React.CSSProperties = {
    fontSize: size,
    color,
    ...(style || {}),
  }

  return (
    <IconComponent
      spin={spin}
      rotate={rotate}
      className={className}
      style={computedStyle}
      {...props}
    />
  )
}

export default Icon
