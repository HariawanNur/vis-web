import React from "react"

import { designSystem } from "@/theme/antd-theme"

import { Flex } from "./Flex"
import { Icon, type IconName } from "./Icon"
import { Typography } from "./Typography"

const { Text } = Typography

export interface LegendItemProps {
  iconType: IconName
  iconColor: string
  title: string
  description?: string
  descriptionColor?: string
  titleColor?: string
  inline?: boolean
  iconOnly?: boolean
}

export const LegendItem: React.FC<LegendItemProps> = ({
  iconType,
  iconColor,
  title,
  description,
  descriptionColor,
  titleColor,
  inline,
  iconOnly,
}) => {
  if (iconOnly) {
    return <Icon type={iconType} size={13} color={iconColor} />
  }

  const content = (
    <>
      <Icon type={iconType} size={13} color={iconColor} style={{ marginTop: inline ? 0 : 1, flexShrink: 0 }} />
      <Text style={{ color: titleColor ?? designSystem.palette.textSecondary, fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>
        {title}
      </Text>
    </>
  )

  if (inline) {
    return (
      <Flex align="center" gap={5}>
        {content}
      </Flex>
    )
  }

  return (
    <Flex align="flex-start" gap={8}>
      <Icon type={iconType} size={13} color={iconColor} style={{ marginTop: 1, flexShrink: 0 }} />
      <div style={{ display: "grid", gap: 1 }}>
        <Text style={{ color: titleColor ?? designSystem.palette.textSecondary, fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </Text>
        {description ? (
          <Text style={{ color: descriptionColor ?? designSystem.palette.textTertiary, fontSize: 11, lineHeight: 1.35 }}>
            {description}
          </Text>
        ) : null}
      </div>
    </Flex>
  )
}

export default LegendItem
