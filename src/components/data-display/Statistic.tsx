import React from "react"
import { Statistic as AntStatistic, StatisticProps as AntStatisticProps } from "antd"

export interface CustomStatisticProps extends AntStatisticProps {
  className?: string
}

export const Statistic: React.FC<CustomStatisticProps> = (props) => {
  return <AntStatistic {...props} />
}

export default Statistic
