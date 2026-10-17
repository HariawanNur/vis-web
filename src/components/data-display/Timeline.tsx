import React from "react"
import { CheckOutlined } from "@ant-design/icons"
import { Timeline as AntTimeline, type TimelineProps as AntTimelineProps } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

type TimelineStatus = "success" | "active" | "upcoming"

export type TimelineProps = AntTimelineProps

const useStyles = createStyles(({ css }) => ({
  root: css`
    width: 100%;

    .ant-steps-item-wrapper.ant-timeline-item-wrapper {
      row-gap: 20px;
    }

    .ant-timeline-horizontal {
      align-items: flex-start;
    }

    .ant-timeline-horizontal .ant-timeline-item {
      padding-inline: 12px;
    }

    .ant-timeline-horizontal .ant-timeline-item-rail {
      top: 17px;
      height: 2px;
      background: ${designSystem.palette.track};
    }

    .ant-timeline-horizontal .ant-timeline-item-icon {
      width: 28px;
      min-width: 28px;
      height: 28px;
      line-height: 1;
      aspect-ratio: 1;
    }

    .ant-timeline-horizontal .ant-timeline-item-content {
      min-height: 72px;
    }

    .ant-timeline-vertical .ant-timeline-item-rail {
      background: ${designSystem.palette.track};
    }

    .tl-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tl-item__title {
      margin: 0;
      color: ${designSystem.palette.text};
      font-size: 14px;
      font-weight: 700;
      line-height: 1.4;
    }

    .tl-item__date {
      margin: 0;
      color: ${designSystem.palette.textSecondary};
      font-size: 12px;
      font-weight: 500;
      line-height: 1.4;
    }

    .tl-item__status {
      margin: 0;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.4;
    }

    .tl-item__status--success {
      color: ${designSystem.palette.success};
    }

    .tl-item__status--active {
      color: ${designSystem.palette.primary};
    }

    .tl-item__status--upcoming {
      color: ${designSystem.palette.textSecondary};
    }

    .tl-dot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      min-width: 28px;
      height: 28px;
      border-radius: 50%;
      box-sizing: border-box;
      font-size: 13px;
      aspect-ratio: 1;
      flex-shrink: 0;
    }

    .tl-dot--success {
      background: ${designSystem.palette.success};
      color: ${designSystem.palette.white};
      border: 2px solid ${designSystem.palette.success};
    }

    .tl-dot--active {
      background: ${designSystem.palette.white};
      color: ${designSystem.palette.primary};
      border: 2px solid ${designSystem.palette.primary};
    }

    .tl-dot--upcoming {
      background: ${designSystem.palette.white};
      color: ${designSystem.palette.textQuaternary};
      border: 2px solid ${designSystem.palette.textQuaternary};
    }

    @media (max-width: ${designSystem.breakpoints.xs}px) {
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  `,
}))

const StatusDot: React.FC<{ statusType: TimelineStatus }> = ({ statusType }) => {
  if (statusType === "success") {
    return (
      <span className="tl-dot tl-dot--success">
        <CheckOutlined />
      </span>
    )
  }
  if (statusType === "active") {
    return <span className="tl-dot tl-dot--active" />
  }
  return <span className="tl-dot tl-dot--upcoming" />
}

export function createTimelineItems(
  items: Array<{
    title: string
    date: string
    status: string
    statusType: TimelineStatus
  }>,
): AntTimelineProps["items"] {
  return items.map((item) => ({
    icon: <StatusDot statusType={item.statusType} />,
    content: (
      <div className="tl-item">
        <p className="tl-item__title">{item.title}</p>
        <p className="tl-item__date">{item.date}</p>
        <p className={classNames("tl-item__status", `tl-item__status--${item.statusType}`)}>
          {item.status}
        </p>
      </div>
    ),
  }))
}

export const Timeline: React.FC<TimelineProps> = ({
  className,
  ...props
}) => {
  const { styles } = useStyles()
  return <AntTimeline className={classNames(styles.root, className)} {...props} />
}

export default Timeline
