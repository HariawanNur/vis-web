"use client"

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  fetchCurrentSession,
  loginWithPassword,
  logoutSession,
  resendLoginMfaChallenge,
  verifyLoginMfa,
  type LoginMfaChallenge,
  type LoginOAuthHint,
  type LoginSessionResult,
} from "@/lib/auth-api"
import { recordAdminAuditLog } from "@/lib/admin-api"
import { getWorkspaceHomePath } from "@/lib/rbac/access-control"
import { getApiUrl } from "@/lib/runtime-env"
import { useI18n } from "@/i18n"

export type UserRole = string
export type UserScope = "platform" | "organization"

export interface UserSession {
  id: string
  name: string
  email: string
  role: UserRole
  scope?: UserScope
  mfaEnabled?: boolean
}

interface AuthSession {
  user: UserSession
  sessionToken: string
  accessToken?: string
  refreshToken?: string
  tokenType?: "Bearer"
  expiresInSession?: number
  oauth?: { clientId: string; authorizeUrl: string }
}

interface AuthContextType {
  user: UserSession | null
  sessionToken: string | null
  isLoading: boolean
  idleTimeoutOpen: boolean
  idleLogoutAt: number | null
  sessionWarning: { expiresInMs: number } | null
  sessionNotice: { kind: "success" | "error"; message: string } | null
  login: (email: string, password: string, oauth?: LoginOAuthHint) => Promise<AuthSession | LoginMfaChallenge>
  verifyTwoFactor: (code: string, options?: { backupCode?: boolean }) => Promise<AuthSession>
  resendTwoFactorCode: () => Promise<LoginMfaChallenge>
  logout: (options?: { broadcast?: boolean; revoke?: boolean; reason?: "manual" | "idle" | "expired" | "sync" }) => void
  updateUser: (user: UserSession) => void
  extendSession: () => Promise<void>
  hasAccess: (allowedRoles: UserRole[]) => boolean
  getHomePath: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const SESSION_KEY = "build_erp_session"
const SESSION_SYNC_KEY = "build_erp_session_sync"
const SESSION_SYNC_CHANNEL = "build_erp_session_channel"
const PENDING_MFA_KEY = "build_erp_pending_mfa"
const SESSION_WARNING_TIMEOUT_MS = 8 * 60 * 1000
const SESSION_IDLE_TIMEOUT_MS = 10 * 60 * 1000
const SESSION_REFRESH_THROTTLE_MS = 30 * 1000

type SessionSyncEvent =
  | { type: "activity"; sourceId: string }
  | { type: "logout"; sourceId: string }

const readSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(SESSION_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

const readPendingMfa = (): {
  challengeToken: string
  oauth?: LoginOAuthHint
  methods?: string[]
  maskedDestination?: string
  expiresInSeconds?: number
  resendAfterSeconds?: number
} | null => {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(PENDING_MFA_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as {
      challengeToken: string
      oauth?: LoginOAuthHint
      methods?: string[]
      maskedDestination?: string
      expiresInSeconds?: number
      resendAfterSeconds?: number
    }
  } catch {
    window.localStorage.removeItem(PENDING_MFA_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [idleTimeoutOpen, setIdleTimeoutOpen] = useState(false)
  const [idleLogoutAt, setIdleLogoutAt] = useState<number | null>(null)
  const [sessionWarning, setSessionWarning] = useState<{ expiresInMs: number } | null>(null)
  const [sessionNotice, setSessionNotice] = useState<{ kind: "success" | "error"; message: string } | null>(null)
  const sessionTokenRef = useRef<string | null>(null)
  const tabIdRef = useRef<string>("")
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null)
  const idleWarningTimerRef = useRef<number | null>(null)
  const idleLogoutTimerRef = useRef<number | null>(null)
  const refreshInFlightRef = useRef<Promise<void> | null>(null)
  const noticeTimerRef = useRef<number | null>(null)
  const lastRefreshAtRef = useRef(0)
  const sessionGenerationRef = useRef(0)
  const router = useRouter()
  const { t } = useI18n()

  const isMockMode = process.env.NEXT_PUBLIC_ENABLE_MSW === "true"

  const submitLogoutAudit = useCallback((reason: "manual" | "idle" | "expired") => {
    const token = sessionTokenRef.current
    const actor = user?.name ?? "Sistem"
    const role = user?.role ?? "SYSTEM"

    if (!token) {
      return
    }

    const action =
      reason === "idle"
        ? "Logout otomatis karena idle timeout"
        : reason === "expired"
          ? "Logout karena session expired"
          : "Logout dari aplikasi"

    const detail =
      reason === "idle"
        ? "Tidak ada aktivitas selama 10 menit"
        : reason === "expired"
          ? "Session habis saat refresh berkala"
          : "Pengguna keluar secara manual"

    void recordAdminAuditLog(token, {
      actor,
      role,
      action,
      detail,
      category: "login",
      ip: "—",
      status: "success",
    }).catch(() => {
      // best effort audit trail
    })
  }, [user?.name, user?.role])

  const getTabId = useCallback(() => {
    if (!tabIdRef.current) {
      tabIdRef.current = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }

    return tabIdRef.current
  }, [])

  const emitSessionSync = useCallback((event: SessionSyncEvent) => {
    if (typeof window === "undefined") {
      return
    }

    const payload = JSON.stringify({
      ...event,
      createdAt: Date.now(),
    })

    try {
      broadcastChannelRef.current?.postMessage(payload)
    } catch {
      // BroadcastChannel may be unavailable in some browsers.
    }

    try {
      window.localStorage.setItem(SESSION_SYNC_KEY, payload)
      window.localStorage.removeItem(SESSION_SYNC_KEY)
    } catch {
      // ignore storage quota / privacy errors
    }
  }, [])

  useEffect(() => {
    const bootstrap = async () => {
      const session = readSession()

      if (!session) {
        setIsLoading(false)
        return
      }

      try {
        const current = await fetchCurrentSession(session.sessionToken)
        setUser(current.user)
        setSessionToken(current.sessionToken)
        sessionTokenRef.current = current.sessionToken
        window.localStorage.setItem(SESSION_KEY, JSON.stringify({
          sessionToken: current.sessionToken,
          user: current.user,
          accessToken: current.accessToken,
          refreshToken: current.refreshToken,
          tokenType: current.tokenType,
          expiresInSession: current.expiresInSession,
          oauth: current.oauth,
        }))
      } catch {
        window.localStorage.removeItem(SESSION_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    void bootstrap()
  }, [])

  const clearIdleTimers = useCallback(() => {
    if (idleWarningTimerRef.current !== null) {
      window.clearTimeout(idleWarningTimerRef.current)
      idleWarningTimerRef.current = null
    }

    if (idleLogoutTimerRef.current !== null) {
      window.clearTimeout(idleLogoutTimerRef.current)
      idleLogoutTimerRef.current = null
    }
  }, [])

  const clearNoticeTimer = useCallback(() => {
    if (noticeTimerRef.current !== null) {
      window.clearTimeout(noticeTimerRef.current)
      noticeTimerRef.current = null
    }
  }, [])

  const logout = useCallback((options?: { broadcast?: boolean; revoke?: boolean; reason?: "manual" | "idle" | "expired" | "sync" }) => {
    sessionGenerationRef.current += 1
    const token = sessionTokenRef.current
    const shouldBroadcast = options?.broadcast ?? true
    const shouldRevoke = options?.revoke ?? true
    const reason = options?.reason ?? "manual"

    if (reason !== "sync" && reason !== "manual" && token) {
      submitLogoutAudit(reason)
    } else if (reason === "manual" && token) {
      submitLogoutAudit("manual")
    }

    clearIdleTimers()
    clearNoticeTimer()
    setUser(null)
    setSessionToken(null)
    sessionTokenRef.current = null
    setIdleTimeoutOpen(false)
    setIdleLogoutAt(null)
    setSessionWarning(null)
    setSessionNotice(null)
    window.localStorage.removeItem(SESSION_KEY)
    window.localStorage.removeItem(PENDING_MFA_KEY)
    router.replace("/login")
    if (shouldBroadcast && reason !== "sync") {
      emitSessionSync({ type: "logout", sourceId: getTabId() })
    }
    if (token && shouldRevoke && !isMockMode) {
      void logoutSession(token).catch(() => {
        // best effort revoke
      })
    }
  }, [clearIdleTimers, clearNoticeTimer, emitSessionSync, getTabId, isMockMode, router, submitLogoutAudit])

  const updateUser = useCallback((nextUser: UserSession) => {
    setUser(nextUser)
  }, [])

  const scheduleIdleTimers = useCallback(() => {
    clearIdleTimers()
    setIdleTimeoutOpen(false)

    const logoutAt = Date.now() + SESSION_IDLE_TIMEOUT_MS
    setIdleLogoutAt(logoutAt)

    idleWarningTimerRef.current = window.setTimeout(() => {
      setIdleTimeoutOpen(true)
    }, SESSION_WARNING_TIMEOUT_MS)

    idleLogoutTimerRef.current = window.setTimeout(() => {
      logout({ broadcast: true, revoke: true, reason: "idle" })
    }, SESSION_IDLE_TIMEOUT_MS)
  }, [clearIdleTimers, logout])

  const handleRemoteSync = useCallback((event: SessionSyncEvent) => {
    if (event.sourceId === getTabId()) {
      return
    }

    if (event.type === "logout") {
      clearIdleTimers()
      clearNoticeTimer()
      setUser(null)
      setSessionToken(null)
      sessionTokenRef.current = null
      setIdleTimeoutOpen(false)
      setIdleLogoutAt(null)
      setSessionWarning(null)
      setSessionNotice(null)
      window.localStorage.removeItem(SESSION_KEY)
      router.replace("/login")
      return
    }

    if (sessionTokenRef.current) {
      scheduleIdleTimers()
    }
  }, [clearIdleTimers, clearNoticeTimer, getTabId, router, scheduleIdleTimers])

  const storeSession = useCallback((payload: LoginSessionResult) => {
    const session: AuthSession = {
      sessionToken: payload.sessionToken,
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      tokenType: payload.tokenType,
      expiresInSession: payload.expiresInSession,
      oauth: payload.oauth,
    }

    setUser(session.user)
    setSessionToken(session.sessionToken)
    sessionTokenRef.current = session.sessionToken
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    window.localStorage.removeItem(PENDING_MFA_KEY)
    lastRefreshAtRef.current = Date.now()
    setIdleTimeoutOpen(false)
    setSessionWarning(null)
    setSessionNotice(null)
    clearNoticeTimer()
    scheduleIdleTimers()
    emitSessionSync({ type: "activity", sourceId: getTabId() })

    return session
  }, [clearNoticeTimer, emitSessionSync, getTabId, scheduleIdleTimers])

  const showSessionNotice = useCallback((notice: { kind: "success" | "error"; message: string }) => {
    clearNoticeTimer()
    setSessionNotice(notice)
    noticeTimerRef.current = window.setTimeout(() => {
      setSessionNotice(null)
      noticeTimerRef.current = null
    }, 5000)
  }, [clearNoticeTimer])

  const sessionExpiredMsg = t("session.expired")
  const sessionExtendedMsg = t("session.extended")

  const refreshSession = useCallback(async (options?: { silent?: boolean }) => {
    if (!sessionToken) {
      return
    }

    const generation = sessionGenerationRef.current

    const now = Date.now()

    if (options?.silent !== false && now - lastRefreshAtRef.current < SESSION_REFRESH_THROTTLE_MS) {
      return
    }

    if (refreshInFlightRef.current) {
      return refreshInFlightRef.current
    }

    const refreshPromise = (async () => {
      const response = await fetch(`${getApiUrl()}/sid-ms-auth/oauth/session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })

      if (!response.ok) {
        logout({ reason: "expired" })
        throw new Error(sessionExpiredMsg)
      }

      if (generation !== sessionGenerationRef.current) {
        return
      }

      lastRefreshAtRef.current = Date.now()
      setIdleTimeoutOpen(false)
      setSessionWarning(null)
      if (!options?.silent) {
        showSessionNotice({
          kind: "success",
          message: sessionExtendedMsg,
        })
      }
      scheduleIdleTimers()
      emitSessionSync({ type: "activity", sourceId: getTabId() })
    })()

    refreshInFlightRef.current = refreshPromise

    try {
      await refreshPromise
    } finally {
      refreshInFlightRef.current = null
    }
  }, [emitSessionSync, getTabId, logout, scheduleIdleTimers, sessionToken, showSessionNotice, sessionExpiredMsg, sessionExtendedMsg])

  const login = async (email: string, password: string, oauth?: LoginOAuthHint) => {
    const payload = await loginWithPassword(email, password, oauth)

    if ("mfaRequired" in payload) {
      window.localStorage.setItem(
        PENDING_MFA_KEY,
        JSON.stringify({
          challengeToken: payload.challengeToken,
          oauth,
          methods: payload.methods,
          maskedDestination: payload.maskedDestination,
          expiresInSeconds: payload.expiresInSeconds,
          resendAfterSeconds: payload.resendAfterSeconds,
        }),
      )

      return payload
    }

    return storeSession(payload)
  }

  const verifyTwoFactor = useCallback(async (code: string, options?: { backupCode?: boolean }) => {
    const pending = readPendingMfa()

    if (!pending) {
      throw new Error("Sesi verifikasi 2FA tidak ditemukan")
    }

    const session = await verifyLoginMfa(
      options?.backupCode
        ? { challengeToken: pending.challengeToken, backupCode: code }
        : { challengeToken: pending.challengeToken, code },
    )
    window.localStorage.removeItem(PENDING_MFA_KEY)

    return storeSession(session)
  }, [storeSession])

  const resendTwoFactorCode = useCallback(async () => {
    const pending = readPendingMfa()

    if (!pending) {
      throw new Error("Sesi verifikasi 2FA tidak ditemukan")
    }

    const refreshed = await resendLoginMfaChallenge(pending.challengeToken)
    window.localStorage.setItem(
      PENDING_MFA_KEY,
      JSON.stringify({
        ...pending,
        methods: refreshed.methods,
        maskedDestination: refreshed.maskedDestination,
        expiresInSeconds: refreshed.expiresInSeconds,
        resendAfterSeconds: refreshed.resendAfterSeconds,
      }),
    )

    return {
      mfaRequired: true as const,
      challengeToken: refreshed.challengeToken,
      methods: refreshed.methods,
      maskedDestination: refreshed.maskedDestination,
      expiresInSeconds: refreshed.expiresInSeconds,
      resendAfterSeconds: refreshed.resendAfterSeconds,
    }
  }, [])

  const extendSession = useCallback(async () => {
    await refreshSession({ silent: false })
  }, [refreshSession])

  const hasAccess = (allowedRoles: UserRole[]) => {
    if (!user) return false
    return allowedRoles.includes(user.role)
  }

  const getHomePath = useCallback(() => {
    return getWorkspaceHomePath(user)
  }, [user])

  useEffect(() => {
    if (!sessionToken) {
      return
    }

    const generation = sessionGenerationRef.current

    const eventSource = new EventSource(`${getApiUrl()}/events?session_token=${encodeURIComponent(sessionToken)}`)

    const handleSessionExpired = () => {
      logout({ reason: "expired" })
    }

    const handleSessionExpiring = (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data) as { expiresInMs?: number }
        if (payload.expiresInMs !== undefined) {
          setSessionWarning({ expiresInMs: payload.expiresInMs })
          console.warn(`Session akan habis dalam ${Math.max(0, Math.ceil(payload.expiresInMs / 1000))} detik`)
        }
      } catch {
        // ignore malformed SSE payloads
      }
    }

    eventSource.addEventListener("session-expired", handleSessionExpired)
    eventSource.addEventListener("session-expiring", handleSessionExpiring as EventListener)

    return () => {
      if (generation !== sessionGenerationRef.current) {
        eventSource.close()
        return
      }

      eventSource.removeEventListener("session-expired", handleSessionExpired)
      eventSource.removeEventListener("session-expiring", handleSessionExpiring as EventListener)
      eventSource.close()
    }
  }, [clearIdleTimers, logout, scheduleIdleTimers, sessionToken])

  useEffect(() => {
    if (!sessionToken) {
      clearIdleTimers()
      return
    }

    const generation = sessionGenerationRef.current
    let mounted = true

    const onActivity = () => {
      if (!mounted) {
        return
      }

      if (generation !== sessionGenerationRef.current) {
        return
      }

      scheduleIdleTimers()
      emitSessionSync({ type: "activity", sourceId: getTabId() })
    }

    const onVisibilityChange = () => {
      if (!document.hidden) {
        onActivity()
      }
    }

    const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "focus"]
    for (const eventName of events) {
      window.addEventListener(eventName, onActivity, { passive: true })
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    scheduleIdleTimers()

    return () => {
      mounted = false
      clearIdleTimers()
      for (const eventName of events) {
        window.removeEventListener(eventName, onActivity)
      }
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [clearIdleTimers, emitSessionSync, getTabId, scheduleIdleTimers, sessionToken])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const supportsBroadcastChannel = typeof BroadcastChannel !== "undefined"

    const onMessage = (message: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(message.data) as SessionSyncEvent
        if (payload && (payload.type === "activity" || payload.type === "logout")) {
          handleRemoteSync(payload)
        }
      } catch {
        // ignore malformed broadcast payloads
      }
    }

    if (supportsBroadcastChannel) {
      broadcastChannelRef.current = new BroadcastChannel(SESSION_SYNC_CHANNEL)
      broadcastChannelRef.current.addEventListener("message", onMessage)
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== SESSION_SYNC_KEY || !event.newValue) {
        return
      }

      try {
        const payload = JSON.parse(event.newValue) as SessionSyncEvent
        if (payload && (payload.type === "activity" || payload.type === "logout")) {
          handleRemoteSync(payload)
        }
      } catch {
        // ignore malformed storage payloads
      }
    }

    if (!supportsBroadcastChannel) {
      window.addEventListener("storage", onStorage)
    }

    return () => {
      if (!supportsBroadcastChannel) {
        window.removeEventListener("storage", onStorage)
      }
      broadcastChannelRef.current?.removeEventListener("message", onMessage)
      broadcastChannelRef.current?.close()
      broadcastChannelRef.current = null
    }
  }, [handleRemoteSync])

  return (
    <AuthContext.Provider value={{ user, sessionToken, isLoading, idleTimeoutOpen, idleLogoutAt, sessionWarning, sessionNotice, login, verifyTwoFactor, resendTwoFactorCode, logout, updateUser, extendSession, hasAccess, getHomePath }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
