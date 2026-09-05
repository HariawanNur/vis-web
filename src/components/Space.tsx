import React from "react"
import { Space as AntSpace, SpaceProps as AntSpaceProps } from "antd"

export const Space: React.FC<AntSpaceProps> & {
  Compact: typeof AntSpace.Compact
} = (props: any) => <AntSpace {...props} />

Space.Compact = AntSpace.Compact
export default Space
