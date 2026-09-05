import React from "react"
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from "antd"

export const Badge: React.FC<AntBadgeProps> & { Ribbon: typeof AntBadge.Ribbon } = (props: any) => <AntBadge {...props} />
Badge.Ribbon = AntBadge.Ribbon
export default Badge
