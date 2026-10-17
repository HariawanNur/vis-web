import React from "react"
import { Button } from "./Button"
import { Flex } from "./Flex"
import { Icon } from "./Icon"
import { Modal } from "./Modal"
import { Typography } from "./Typography"
import { designSystem } from "@/theme/antd-theme"

const { Title, Text } = Typography

export type UploadModalProps = {
  open: boolean
  title: string
  subtitle: string
  dragTitle: string
  dragDesc: string
  browseLabel: string
  cancelLabel: string
  onCancel: () => void
  onUpload: () => void
  width?: number
}

export function UploadModal({
  open,
  title,
  subtitle,
  dragTitle,
  dragDesc,
  browseLabel,
  cancelLabel,
  onCancel,
  onUpload,
  width = 480,
}: UploadModalProps) {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={width} centered>
      <Flex vertical gap={20} style={{ padding: "8px 0" }}>
        <Flex vertical gap={4}>
          <Title level={4} style={{ margin: 0, fontSize: 18, color: designSystem.palette.text, fontWeight: 800 }}>
            {title}
          </Title>
          <Text style={{ fontSize: 13, color: designSystem.palette.textSecondary }}>{subtitle}</Text>
        </Flex>

        <div
          role="button"
          tabIndex={0}
          style={{
            border: `2px dashed ${designSystem.palette.border}`,
            borderRadius: 12,
            padding: "40px 24px",
            textAlign: "center",
            background: designSystem.palette.surface,
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = designSystem.palette.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = designSystem.palette.border)}
          onClick={onUpload}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onUpload()
            }
          }}
        >
          <Icon type="InboxOutlined" size={40} color={designSystem.palette.textTertiary} />
          <Text style={{ display: "block", marginTop: 12, fontSize: 14, fontWeight: 600, color: designSystem.palette.text }}>
            {dragTitle}
          </Text>
          <Text style={{ display: "block", marginTop: 4, fontSize: 12, color: designSystem.palette.textSecondary }}>
            {dragDesc}
          </Text>
          <Button
            type="link"
            style={{ marginTop: 8, fontWeight: 600, fontSize: 12 }}
            onClick={(e) => {
              e.stopPropagation()
              onUpload()
            }}
          >
            {browseLabel}
          </Button>
        </div>

        <Flex gap={8} justify="flex-end">
          <Button onClick={onCancel}>{cancelLabel}</Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default UploadModal
