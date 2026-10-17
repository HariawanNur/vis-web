import React from "react"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

interface BottomWaveProps {
  fillColor?: string
  strokeColor?: string
  className?: string
}

const useStyles = createStyles(({ css }) => ({
  waveContainer: css`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    pointer-events: none;
  `,
  svgElement: css`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
  `,
}))

export const BottomWave: React.FC<BottomWaveProps> = ({
  fillColor = designSystem.palette.primary,
  strokeColor = designSystem.palette.secondary,
  className = "",
}) => {
  const { styles } = useStyles()
  const wavePath = "M 0,260 C 480,350 960,200 1440,110"

  return (
    <div className={classNames(styles.waveContainer, className)}>
      <svg
        viewBox="0 0 1440 320"
        className={styles.svgElement}
        preserveAspectRatio="none"
      >
        <path
          d={`${wavePath} L 1440,320 L 0,320 Z`}
          fill={fillColor}
        />
        <path
          d={wavePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
