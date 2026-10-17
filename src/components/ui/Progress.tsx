import React from "react"
import classNames from "classnames"
import {
  Progress as AntProgress,
  ProgressProps as AntProgressProps,
} from "antd"
import { createStyles } from "antd-style"
import { designSystem } from "@/theme/antd-theme"

export interface CustomProgressProps extends Omit<AntProgressProps, "trailColor" | "strokeWidth"> {
  className?: string
}

const useStyles = createStyles(({ css }) => ({
  progressWrapper: css`
    .ant-progress-inner {
      background-color: ${designSystem.palette.tintPrimary} !important;
      border-radius: 9999px !important;
      height: 10px !important;
    }
    .ant-progress-bg {
      border-radius: 9999px !important;
      height: 10px !important;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
  `,
}))

export const Progress: React.FC<CustomProgressProps> = ({
  strokeColor = designSystem.palette.primary,
  railColor = designSystem.palette.tintPrimary,
  className,
  ...props
}) => {
  const { styles } = useStyles()
  return (
    <AntProgress
      strokeColor={strokeColor}
      railColor={railColor}
      className={classNames(styles.progressWrapper, className)}
      {...props}
    />
  )
}

export default Progress
