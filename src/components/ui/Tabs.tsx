import React from "react"
import { Tabs as AntTabs, TabsProps as AntTabsProps } from "antd"

export interface CustomTabsProps extends AntTabsProps {
  className?: string
}

export const Tabs: React.FC<CustomTabsProps> = (props) => {
  return <AntTabs {...props} />
}

export default Tabs
