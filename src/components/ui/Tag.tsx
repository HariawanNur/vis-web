import React from "react"
import { Tag as AntTag, TagProps as AntTagProps } from "antd"

export interface CustomTagProps extends AntTagProps {
  className?: string
}

export const Tag: React.FC<CustomTagProps> & {
  CheckableTag: typeof AntTag.CheckableTag
} = ({ children, ...props }: any) => {
  return <AntTag {...props}>{children}</AntTag>
}

Tag.CheckableTag = AntTag.CheckableTag

export default Tag
