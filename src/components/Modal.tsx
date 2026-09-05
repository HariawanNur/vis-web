import React from "react"
import {
  Modal as AntModal,
  type ModalProps as AntModalProps,
} from "antd"
import { modal } from "./feedback"

const ModalComponent: React.FC<AntModalProps> = (props) => <AntModal {...props} />

export const Modal = Object.assign(ModalComponent, {
  confirm: modal.confirm,
  info: modal.info,
  success: modal.success,
  error: modal.error,
  warning: modal.warning,
})

export default Modal
