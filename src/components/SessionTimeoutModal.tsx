"use client"

import { useEffect, useMemo, useState } from "react"
import { Modal } from "./Modal"
import { Typography } from "./Typography"
import { message } from "./message"
import { useAuth } from "@/context/auth-context"
import { useI18n } from "@/i18n"
import { designSystem } from "@/theme/antd-theme"

export function SessionTimeoutModal() {
  const { idleTimeoutOpen, idleLogoutAt, extendSession, logout } = useAuth()
  const { t, locale } = useI18n()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!idleTimeoutOpen) {
      return
    }

    const timer = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [idleTimeoutOpen])

  const remainingSeconds = useMemo(() => {
    if (!idleLogoutAt) {
      return 0
    }

    return Math.max(0, Math.ceil((idleLogoutAt - now) / 1000))
  }, [idleLogoutAt, now])

  const countdownLabel =
    locale === "en"
      ? `${remainingSeconds} seconds remaining before auto logout.`
      : locale === "ms"
        ? `${remainingSeconds} saat lagi sebelum log keluar automatik.`
        : `${remainingSeconds} detik lagi sebelum logout otomatis.`

  const showFinalWarning = remainingSeconds > 0 && remainingSeconds <= 30

  const handleStaySignedIn = async () => {
    setConfirmLoading(true)
    try {
      await extendSession()
      message.success(t("session.extended"))
    } catch {
      // logout already handled by context when refresh fails
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <Modal
      open={idleTimeoutOpen}
      title={t("session.idleWarningTitle")}
      centered
      closable={false}
      mask={{ closable: false }}
      keyboard={false}
      confirmLoading={confirmLoading}
      okText={t("session.idleWarningStaySignedIn")}
      cancelText={t("session.idleWarningLogoutNow")}
      onOk={() => void handleStaySignedIn()}
      onCancel={() => logout()}
      width={440}
    >
      <Typography variant="text" style={{ color: designSystem.palette.textSecondary, fontSize: 14, lineHeight: 1.7 }}>
        {t("session.idleWarningDescription")}
      </Typography>
      <Typography variant="text" style={{ display: "block", marginTop: 12, color: designSystem.palette.primary, fontSize: 13, fontWeight: 600 }}>
        {countdownLabel}
      </Typography>
      {showFinalWarning && (
        <Typography variant="text" style={{ display: "block", marginTop: 8, color: designSystem.palette.error, fontSize: 13, fontWeight: 600 }}>
          {t("session.idleWarningFinal")}
        </Typography>
      )}
    </Modal>
  )
}
