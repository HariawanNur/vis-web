"use client"

import { useEffect } from "react"
import { App, message as antdMessage, Modal as antdModal } from "antd"

type MessageApi = ReturnType<typeof App.useApp>["message"]
type ModalApi = ReturnType<typeof App.useApp>["modal"]

let messageApi: MessageApi | null = null
let modalApi: ModalApi | null = null

export function FeedbackBridge() {
  const app = App.useApp()
  useEffect(() => {
    messageApi = app.message
    modalApi = app.modal
  }, [app])
  return null
}

const messageOf = (): MessageApi => (messageApi ?? antdMessage) as MessageApi
const modalOf = (): ModalApi => (modalApi ?? antdModal) as ModalApi

export const message = {
  success: (content: Parameters<MessageApi["success"]>[0]) => messageOf().success(content),
  error: (content: Parameters<MessageApi["error"]>[0]) => messageOf().error(content),
  warning: (content: Parameters<MessageApi["warning"]>[0]) => messageOf().warning(content),
  info: (content: Parameters<MessageApi["info"]>[0]) => messageOf().info(content),
  loading: (content: Parameters<MessageApi["loading"]>[0]) => messageOf().loading(content),
  useMessage: antdMessage.useMessage,
}

export const modal = {
  confirm: (props: Parameters<ModalApi["confirm"]>[0]) => modalOf().confirm(props),
  info: (props: Parameters<ModalApi["info"]>[0]) => modalOf().info(props),
  success: (props: Parameters<ModalApi["success"]>[0]) => modalOf().success(props),
  error: (props: Parameters<ModalApi["error"]>[0]) => modalOf().error(props),
  warning: (props: Parameters<ModalApi["warning"]>[0]) => modalOf().warning(props),
}
